# Error Recovery Flows — FashionOS
## Complete Error Handling & User Recovery Paths

**Purpose:** Define expected behavior for ALL error scenarios  
**Goal:** No error leaves user stuck; every error has recovery path  
**Principle:** Errors are opportunities to build trust

---

## ERROR CATEGORIES

### 1. Network Errors
- Connection timeout
- Request timeout  
- Offline mode
- Intermittent connectivity

### 2. Validation Errors
- Client-side validation
- Server-side validation
- Business rule violations
- Data integrity errors

### 3. Permission Errors
- Authentication required
- Insufficient permissions
- Token expired
- Account suspended

### 4. AI Service Errors
- Gemini API timeout
- Gemini API rate limit
- Invalid AI response
- AI service unavailable

### 5. Database Errors
- Connection failed
- Query timeout
- Constraint violation
- Deadlock/conflict

### 6. System Errors
- Edge Function timeout
- Out of memory
- Deployment in progress
- Maintenance mode

---

## NETWORK ERROR FLOWS

### ERROR 1: Connection Timeout (5 seconds)

**Trigger:** Network request takes >5 seconds to connect

```
WHEN: User submits form
  AND: No server response after 5 seconds
THEN: UI shows timeout indicator:
  - Stop loading spinner
  - Show: "Connection timeout. Check your internet."
  - Show buttons: [Retry] [Save Draft] [Cancel]

User Actions:
  1. Retry → Resends request with same idempotency key
  2. Save Draft → Saves form data to localStorage
  3. Cancel → Closes modal, returns to previous screen

Recovery Guarantee:
  - No data lost (form state preserved)
  - Can retry unlimited times
  - Draft auto-expires after 24 hours
```

---

### ERROR 2: Request Timeout (30 seconds)

**Trigger:** Request sent but no response after 30 seconds

```
WHEN: User submits complex request (e.g., bulk import)
  AND: Server processing takes >30 seconds
THEN: UI shows long-running task indicator:
  - Progress bar (if backend supports progress updates)
  - Message: "This is taking longer than expected..."
  - Estimated time: "~2 minutes remaining"
  - Show buttons: [Keep Waiting] [Cancel]

IF: Request completes after timeout warning
THEN: Success state shown normally

IF: Request exceeds 60 seconds (hard timeout)
THEN: UI shows:
  - Error: "Request timed out after 60 seconds"
  - Message: "Your request may still be processing. Check back in a few minutes."
  - Show buttons: [Check Status] [Start Over]

Recovery Path:
  - User clicks [Check Status]
  - System queries job status endpoint
  - If job completed → show success
  - If job failed → show error + retry option
  - If job still running → show progress
```

---

### ERROR 3: Offline Mode

**Trigger:** Network connection lost

```
WHEN: Browser detects offline (navigator.onLine === false)
THEN: UI enters offline mode:
  - Banner at top: "⚠ You're offline"
  - All forms continue working (data saved locally)
  - Background: Queue requests for sync
  - Show: "Changes will sync when online"

WHEN: User submits form while offline
THEN: Form appears to succeed:
  - Show optimistic success state
  - Store in IndexedDB queue
  - Mark as "pending sync" (yellow indicator)

WHEN: Connection restored
THEN: Auto-sync process begins:
  - Service worker processes queue
  - Each request sent with retry logic
  - On success: Update UI (yellow → green)
  - On failure: Show error + manual retry option

User sees:
  - Toast: "✓ Synced 3 changes while you were offline"
  OR
  - Toast: "⚠ 1 change failed to sync" + [Retry] button
```

---

### ERROR 4: Intermittent Connectivity

**Trigger:** Connection drops during upload

```
Scenario: User uploading 10 photos

WHEN: Connection drops after 4 photos uploaded
THEN: UI shows resumable upload:
  - Progress: "4 of 10 photos uploaded"
  - Status: "Connection lost. Retrying..."
  - Auto-retry: 3 attempts with exponential backoff
  - After 3 failures: Pause and show [Resume] button

WHEN: User clicks [Resume]
THEN: Upload continues from photo 5 (not photo 1)
  - Uses multipart upload with chunk tracking
  - No re-upload of successful chunks

Recovery Guarantee:
  - No duplicate uploads
  - No lost progress
  - Can resume even after browser restart (IndexedDB)
```

---

## VALIDATION ERROR FLOWS

### ERROR 5: Client-Side Validation (Instant)

**Trigger:** User enters invalid data

```
WHEN: User types in "Event Name" field
  AND: Name is <3 characters
THEN: Real-time validation shows:
  - Red border on input field
  - Error below field: "Name must be at least 3 characters"
  - Submit button disabled

WHEN: User corrects error
THEN: Validation clears immediately:
  - Border returns to normal
  - Error message disappears
  - Submit button enables

No server request required (pure client-side)
```

---

### ERROR 6: Server-Side Validation

**Trigger:** Backend rejects data (business rules)

```
WHEN: User submits form with valid client data
  BUT: Backend validation fails
THEN: Server returns 400 Bad Request:
  {
    "error": "VALIDATION_ERROR",
    "message": "Event date conflicts with existing event",
    "field": "event_date",
    "details": {
      "conflicting_event": "Summer Fashion Week 2024",
      "conflicting_date": "2024-07-15"
    }
  }

UI Response:
  - Highlight "event_date" field (red border)
  - Show error below field:
    "This date conflicts with Summer Fashion Week 2024 (July 15)"
  - Suggest alternative: "Try: July 22 (next available Sunday)"
  - Keep modal open
  - User can edit and resubmit

Recovery Path:
  1. User changes date to suggested alternative
  2. Client validates new date
  3. Submit button re-enables
  4. User submits again
  5. Server accepts (no conflict)
```

---

### ERROR 7: Business Rule Violation

**Trigger:** User exceeds organization limits

```
Scenario: Organization has limit of 10 concurrent events

WHEN: User tries to create 11th event
THEN: Backend returns 409 Conflict:
  {
    "error": "LIMIT_EXCEEDED",
    "message": "Your organization has reached the maximum of 10 active events",
    "current_count": 10,
    "limit": 10,
    "action": "upgrade_plan"
  }

UI Response:
  - Modal shows error state:
    - Title: "Event Limit Reached"
    - Message: "Your plan allows 10 active events"
    - Show: List of active events (sortable by date)
    - Options:
      [Archive Old Event] → Select event to archive
      [Upgrade Plan] → Opens pricing page
      [Contact Sales] → Opens chat
    - [Cancel] returns to events list

Recovery Paths:
  1. Archive old event → frees slot → retry create
  2. Upgrade plan → increases limit → retry create
  3. Contact sales → negotiate custom limit
```

---

## PERMISSION ERROR FLOWS

### ERROR 8: Not Authenticated

**Trigger:** User not logged in

```
WHEN: User tries to access protected page
  AND: No valid session exists
THEN: Immediate redirect:
  - Save current URL to "redirect_after_login"
  - Redirect to /login
  - Show message: "Please log in to continue"

WHEN: User logs in successfully
THEN: Auto-redirect to original page
  - Restore form state (if any)
  - Show welcome toast: "Welcome back!"
```

---

### ERROR 9: Insufficient Permissions

**Trigger:** User lacks required permission

```
WHEN: User tries to create event
  BUT: User doesn't have "create_events" permission
THEN: Backend returns 403 Forbidden

UI Response:
  - Show permission denied modal:
    - Icon: Lock
    - Title: "Permission Required"
    - Message: "You need 'Create Events' permission"
    - Show: Your current role (e.g., "Viewer")
    - Options:
      [Request Permission] → Sends email to admin
      [Learn About Roles] → Opens documentation
    - [Close] → Returns to previous page

Recovery Path:
  1. User clicks [Request Permission]
  2. Modal shows: "Request sent to [admin email]"
  3. Admin receives email with approve/deny links
  4. Admin clicks approve
  5. User receives email: "Permission granted"
  6. User can now create events
```

---

### ERROR 10: Token Expired

**Trigger:** Session expired (inactive for 24 hours)

```
WHEN: User makes request
  AND: Token expired (401 Unauthorized)
THEN: UI shows session expired modal:
  - Title: "Session Expired"
  - Message: "For your security, you've been logged out"
  - Show: [Log In Again] button
  - Auto-redirect in 10 seconds

WHEN: User clicks [Log In Again]
THEN: Redirect to /login
  - Save current page URL
  - Save form state (localStorage)
  - After login: Restore state + retry request

Recovery Guarantee:
  - No data lost
  - Seamless re-authentication
  - Request auto-retries after login
```

---

## AI SERVICE ERROR FLOWS

### ERROR 11: Gemini API Timeout

**Trigger:** AI request takes >30 seconds

```
WHEN: User triggers AI task generation
  AND: Gemini API doesn't respond within 30s
THEN: Edge Function times out

UI Response:
  - Stop loading spinner
  - Show AI timeout modal:
    - Icon: Clock
    - Title: "AI Taking Longer Than Expected"
    - Message: "Would you like to:"
    - Options:
      [Keep Waiting] → Extends timeout to 60s
      [Create Tasks Manually] → Opens task form
      [Use Template] → Applies pre-built task template
      [Try Again Later] → Saves event, no tasks
    - Default: Auto-select "Use Template" after 60s

Recovery Paths:
  1. Keep Waiting → If AI completes, show success
  2. Manual → User adds tasks one by one
  3. Template → 80 generic tasks added instantly
  4. Later → User can trigger AI from event detail page
```

---

### ERROR 12: Gemini API Rate Limit

**Trigger:** Too many AI requests (429 Too Many Requests)

```
WHEN: Organization exceeds AI quota (100 requests/hour)
THEN: Edge Function returns rate limit error

UI Response:
  - Show rate limit modal:
    - Icon: Speedometer
    - Title: "AI Quota Reached"
    - Message: "Your organization has used 100 AI requests this hour"
    - Show: Quota resets in: 23 minutes
    - Options:
      [Wait 23 min] → Sets timer + notification
      [Create Manually] → Opens task form
      [Upgrade Plan] → Increase quota to 500/hour
    - [Close]

Recovery Paths:
  1. Wait → Timer counts down, auto-retries when quota resets
  2. Manual → Bypass AI, user creates tasks
  3. Upgrade → Increase quota, immediate retry
```

---

### ERROR 13: Invalid AI Response

**Trigger:** AI returns malformed data

```
WHEN: Gemini API returns response
  BUT: Response doesn't match expected schema
THEN: Edge Function validation fails

Example Invalid Response:
  {
    "tasks": [
      { "title": "Book venue" }, // ❌ Missing required fields
      { "deadline": "tomorrow" }  // ❌ Invalid date format
    ]
  }

Backend Response:
  - Logs error to Sentry
  - Returns 503 Service Unavailable:
    {
      "error": "AI_VALIDATION_FAILED",
      "message": "AI generated invalid data"
    }

UI Response:
  - Show AI error modal:
    - Icon: Alert
    - Title: "AI Error"
    - Message: "AI generated unexpected data. This has been reported."
    - Options:
      [Try Again] → Retries AI generation
      [Create Manually] → Opens task form
      [Report Issue] → Opens support chat
    - [Close]

Recovery Guarantee:
  - Event still created successfully
  - User can retry AI or go manual
  - Engineering team notified (Sentry alert)
```

---

## DATABASE ERROR FLOWS

### ERROR 14: Connection Failed

**Trigger:** Supabase database unreachable

```
WHEN: User action requires database query
  AND: Supabase connection fails (network issue)
THEN: API returns 503 Service Unavailable

UI Response:
  - Show database error modal:
    - Icon: Database
    - Title: "Connection Error"
    - Message: "Unable to reach database. Check your connection."
    - Show: [Retry] [Check Status] [Cancel]
    - Auto-retry: 3 attempts (exponential backoff)

Retry Logic:
  1. Wait 1 second → Retry
  2. Wait 2 seconds → Retry
  3. Wait 4 seconds → Retry
  4. After 3 failures → Show manual retry option

IF: All retries fail
THEN: Show system status link:
  - "Check system status: status.fashionos.com"
  - "Or contact support: support@fashionos.com"
```

---

### ERROR 15: Constraint Violation

**Trigger:** Duplicate key or foreign key violation

```
Scenario: User tries to add sponsor that's already added

WHEN: User clicks "Add Sponsor" for "Chanel"
  BUT: "Chanel" already in event sponsors
THEN: Database returns unique constraint violation

Backend maps to user-friendly error:
  {
    "error": "DUPLICATE_ENTRY",
    "message": "Chanel is already a sponsor for this event",
    "existing_record_id": "sponsor_123"
  }

UI Response:
  - Show duplicate error:
    - "Chanel is already added"
    - [View Existing] → Scrolls to sponsor in list
    - [Edit Existing] → Opens sponsor edit modal
    - [Cancel] → Closes add modal

Recovery Path:
  - User clicks [View Existing]
  - UI highlights existing sponsor card
  - User can edit details instead of creating duplicate
```

---

## SYSTEM ERROR FLOWS

### ERROR 16: Edge Function Timeout

**Trigger:** Edge Function exceeds 60-second limit

```
WHEN: Complex operation (e.g., bulk import 1000 records)
  AND: Processing takes >60 seconds
THEN: Deno runtime terminates function

Backend Response:
  - Returns 504 Gateway Timeout
  - Logs: "Function timeout: bulk_import"

UI Response:
  - Show timeout modal:
    - Title: "Operation Timed Out"
    - Message: "This operation is too large to complete at once"
    - Options:
      [Split Into Batches] → Breaks into 10 batches of 100
      [Try With Fewer Items] → Reduce to 500 items
      [Contact Support] → Request batch processing help
    - [Cancel]

Recovery Path:
  1. User clicks [Split Into Batches]
  2. UI shows: "Processing batch 1 of 10..."
  3. Each batch completes in <10 seconds
  4. Progress bar shows overall completion
  5. Success: "✓ Imported 1000 records in 10 batches"
```

---

### ERROR 17: Maintenance Mode

**Trigger:** System update in progress

```
WHEN: User tries to access app during deployment
THEN: API returns 503 Service Unavailable:
  {
    "error": "MAINTENANCE_MODE",
    "message": "System update in progress",
    "estimated_duration": "5 minutes",
    "retry_after": 300
  }

UI Response:
  - Full-page maintenance screen:
    - Icon: Wrench
    - Title: "Scheduled Maintenance"
    - Message: "We're updating FashionOS to serve you better"
    - Estimated time: 5 minutes
    - Countdown timer: 4:35 remaining
    - Auto-refresh when done
    - Show: [Check Status] link

User Experience:
  - Countdown auto-refreshes
  - When maintenance ends: Page reloads automatically
  - User sees: "✓ Update complete! Welcome back."
```

---

## ERROR RECOVERY BEST PRACTICES

### 1. Progressive Disclosure
```
Level 1 (User-Friendly):
  "Something went wrong. Please try again."
  [Retry]

Level 2 (Actionable):
  "Event name already exists. Try: Spring Show 2024 V2"
  [Use Suggestion] [Edit Name]

Level 3 (Technical - Dev Mode Only):
  {
    "error": "UniqueViolation",
    "table": "events",
    "constraint": "events_name_org_key"
  }
```

### 2. Idempotent Operations
```
Every write operation includes idempotency key:
  - Key generated client-side (UUID)
  - Backend caches result for 24 hours
  - Duplicate requests return same response
  - User can safely retry without duplicates
```

### 3. Optimistic Updates
```
Pattern:
  1. Update UI immediately (optimistic)
  2. Send request to backend
  3. If success: Keep optimistic update
  4. If failure: Rollback + show error

Example:
  User marks task complete →
  UI shows checkmark immediately →
  Backend rejects (task has dependencies) →
  UI reverts checkmark →
  Shows: "Can't complete. 3 dependencies remain."
```

### 4. Context Preservation
```
On error, preserve:
  - Form data (localStorage)
  - Scroll position (restore after retry)
  - Selected filters (don't reset)
  - Modal state (keep open, don't close)

User shouldn't re-enter data after error
```

### 5. Clear Next Steps
```
Every error shows:
  - What happened (clear explanation)
  - Why it happened (context)
  - What user can do (actions)
  - Who can help (support link)

Bad: "Error 500"
Good: "Server error. Try again or contact support."
Better: "Server error. Saved your draft. Retry now or resume later."
```

---

## ERROR LOGGING & MONITORING

### Client-Side Logging
```typescript
function logError(error: Error, context: Record<string, any>) {
  // Send to Sentry
  Sentry.captureException(error, {
    contexts: {
      user_action: context.action,
      form_data: sanitize(context.data),
      network_status: navigator.onLine
    }
  });

  // Send to analytics
  analytics.track('Error Occurred', {
    error_type: error.name,
    error_message: error.message,
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  });
}
```

### Server-Side Logging
```typescript
function logServerError(error: Error, request: Request) {
  console.error({
    error: error.message,
    stack: error.stack,
    user_id: request.user?.id,
    endpoint: request.url,
    method: request.method,
    timestamp: new Date().toISOString()
  });

  // Alert on critical errors
  if (error instanceof DatabaseError) {
    alertOncall('Database error in production');
  }
}
```

---

## ACCEPTANCE CRITERIA

Error recovery is production-ready when:

- [x] Every error has user-friendly message
- [x] Every error has recovery path
- [x] No error causes data loss
- [x] All errors logged to monitoring
- [x] Retry logic includes exponential backoff
- [x] Idempotency prevents duplicate operations
- [x] Optimistic updates rollback gracefully
- [x] Offline mode queues requests for sync
- [x] Form state preserved on error
- [x] User never stuck without clear next step

---

**PRODUCTION READY:** When all error scenarios tested and all recovery paths work ✅
