# Event Creation Journey — Acceptance Tests
## Complete User Flow with AI Assistance

**Feature:** Event Planner creates luxury fashion event  
**Actor:** Authenticated Event Planner with `create_events` permission  
**Context:** FashionOS production system with Supabase + Gemini AI  
**Goal:** Successfully create event, generate tasks, and start planning

---

## TEST 1: Happy Path — Event Creation with AI Task Generation

### Pre-Conditions
```
GIVEN: User is logged in
  AND: User has "create_events" permission
  AND: User's organization has active subscription
  AND: Gemini API is available
  AND: Supabase database is connected
```

### Steps

**Step 1: Navigate to Events**
```
WHEN: User clicks "Events" in navigation
THEN: Events list page loads
  AND: URL is "/events"
  AND: Page shows "Events" title
  AND: "Create Event" button is visible
```

**Step 2: Open Event Creation Wizard**
```
WHEN: User clicks "Create Event" button
THEN: Event wizard modal opens
  AND: Wizard shows "Step 1 of 6"
  AND: Form shows "Basic Information" fields:
    - Event Name (required)
    - Event Type (dropdown)
    - Description (textarea)
```

**Step 3: Fill Basic Information**
```
WHEN: User enters:
  - Event Name: "Spring Fashion Week 2024"
  - Event Type: "Runway Show"
  - Description: "Luxury runway show featuring emerging designers"
THEN: Form validates inputs
  AND: "Next" button becomes enabled
```

**Step 4: Select Date & Venue**
```
WHEN: User clicks "Next"
THEN: Wizard advances to "Step 2 of 6"
  AND: Form shows:
    - Event Date (date picker)
    - Venue (text input with autocomplete)
    - Expected Attendance (number input)
    - Budget (currency input)

WHEN: User enters:
  - Event Date: March 15, 2024
  - Venue: "Skylight Modern"
  - Expected Attendance: 300
  - Budget: $150,000
THEN: Form validates:
  - Date is in future ✓
  - Budget is positive number ✓
  AND: "Next" button enabled
```

**Step 5: Configure Casting**
```
WHEN: User clicks "Next"
THEN: Wizard advances to "Step 3 of 6"
  AND: Form shows:
    - Number of Models (number input)
    - Model Types (checkboxes: Runway, Fitting, Commercial)
    - Casting Director (dropdown)

WHEN: User enters:
  - Number of Models: 20
  - Model Types: [Runway, Fitting]
THEN: Form validates
  AND: "Next" button enabled
```

**Step 6: Add Sponsors**
```
WHEN: User clicks "Next"
THEN: Wizard advances to "Step 4 of 6"
  AND: Form shows:
    - Sponsor search field
    - "Add Sponsor" button
    - List of added sponsors (empty)

WHEN: User clicks "Skip for now"
THEN: Wizard advances (sponsors optional)
```

**Step 7: Define Deliverables**
```
WHEN: User reaches "Step 5 of 6"
THEN: Form shows:
    - Photography (checkbox)
    - Videography (checkbox)
    - Live Streaming (checkbox)
    - Social Media Content (checkbox)

WHEN: User selects:
    - Photography ✓
    - Videography ✓
THEN: "Next" button enabled
```

**Step 8: Review & Confirm**
```
WHEN: User clicks "Next"
THEN: Wizard shows "Step 6 of 6: Review"
  AND: Summary displays:
    - Event Name: "Spring Fashion Week 2024"
    - Date: March 15, 2024
    - Venue: Skylight Modern
    - Budget: $150,000
    - Models: 20
    - Deliverables: Photography, Videography
  AND: "Create Event" button is visible
  AND: Checkbox: "Generate tasks automatically with AI" (checked by default)
```

**Step 9: Create Event (Backend)**
```
WHEN: User clicks "Create Event"
THEN: UI shows loading spinner
  AND: "Creating event..." message displays

Backend Process:
  1. Validate user authentication
  2. Check user permissions
  3. Validate event data (schema check)
  4. Check organization has capacity
  5. Create event record in database
  6. Trigger: create_default_event_phases
  7. Generate 14 event phases
  8. Return event ID

Expected Duration: 2-3 seconds
```

**Step 10: AI Task Generation (if enabled)**
```
WHEN: Event is created successfully
  AND: "Generate tasks automatically" was checked
THEN: AI workflow begins

Backend Process:
  1. Call Orchestrator Edge Function
  2. Orchestrator routes to Event Planner Agent
  3. Agent analyzes event data:
     - Event type: Runway Show
     - Date: March 15, 2024 (90 days from now)
     - Budget: $150,000
     - Models: 20
  4. Agent calls Gemini 3 Pro with prompt:
     "Generate comprehensive task list for luxury runway show
      with 20 models, $150K budget, 90 days timeline"
  5. Gemini returns structured output (120+ tasks)
  6. Agent validates task schema
  7. Agent maps tasks to 14 phases
  8. Agent calculates due dates (working backwards)
  9. Agent identifies dependencies (critical path)
  10. Bulk insert tasks to database
  11. Return task list to frontend

Expected Duration: 8-12 seconds
Total Tasks Generated: 120-150
```

**Step 11: Success Confirmation**
```
WHEN: Event creation completes
THEN: UI shows success state:
  - Modal closes
  - Success toast: "✓ Event created successfully!"
  - Second toast (if AI ran): "✓ 120 tasks generated!"
  - User redirected to: "/events/[event-id]"
```

**Step 12: Event Detail Page Loads**
```
WHEN: User lands on event detail page
THEN: Page displays:
  - Event name: "Spring Fashion Week 2024"
  - Status: "Planning"
  - Timeline widget (90 days remaining)
  - Budget widget ($0 spent / $150,000)
  - Task summary (120 tasks: 0 complete, 120 pending)
  - Quick actions: [View Tasks] [Add Sponsor] [Invite Team]
  AND: Real-time subscription is active (other users see this event)
```

**Step 13: Real-Time Verification**
```
WHEN: Another user (in same organization) has events list open
THEN: Their list updates automatically (within 2 seconds)
  AND: New event "Spring Fashion Week 2024" appears
  AND: No page refresh required
```

### Post-Conditions
```
VERIFY Database:
  - events table has new record
  - event_phases table has 14 phase records
  - tasks table has 120+ task records
  - task_dependencies table has dependency records
  - ai_actions table has log of AI task generation

VERIFY UI:
  - Event appears in events list
  - Event detail page accessible
  - Tasks visible in Kanban board
  - Real-time updates working
```

### Success Metrics
```
✓ Total time: <15 seconds (wizard + AI generation)
✓ User clicks: 8 clicks (one per step + create)
✓ Database writes: 1 event + 14 phases + 120 tasks = 135 records
✓ AI cost: ~$0.05 (task generation)
✓ User confidence: High (clear feedback at every step)
```

---

## TEST 2: Error Recovery — Network Timeout During Creation

### Scenario
```
GIVEN: User has completed event wizard
  AND: User clicks "Create Event"
  AND: Network is slow (>10s response time)
```

### Expected Behavior
```
WHEN: Request takes >10 seconds
THEN: UI shows timeout error:
  - "Request timed out. Please try again."
  - [Retry] button
  - [Save Draft] button

WHEN: User clicks [Retry]
THEN: Request sent again
  AND: Idempotency key prevents duplicate event
  AND: If event was created → returns existing event
  AND: If event not created → creates new event

WHEN: User clicks [Save Draft]
THEN: Wizard data saved to localStorage
  AND: User can resume later
  AND: Toast: "Draft saved. Resume anytime from Events page."
```

---

## TEST 3: Validation — Duplicate Event Name

### Scenario
```
GIVEN: Event "Spring Fashion Week 2024" already exists
  AND: User tries to create event with same name
```

### Expected Behavior
```
WHEN: User submits event with duplicate name
THEN: Backend validation fails:
  - Status: 409 Conflict
  - Error: "Event name already exists in your organization"

WHEN: Error returned to UI
THEN: Modal stays open
  AND: Error message displays above "Event Name" field:
    "This event name is already taken. Try: Spring Fashion Week 2024 V2"
  AND: Event Name field highlighted red
  AND: User can edit name and retry
```

---

## TEST 4: Permission Denied — User Lacks Permission

### Scenario
```
GIVEN: User is logged in
  BUT: User does NOT have "create_events" permission
```

### Expected Behavior
```
WHEN: User clicks "Create Event" button
THEN: Button is disabled (grayed out)
  AND: Tooltip shows: "Contact admin for permission"

IF: User somehow accesses wizard (direct URL):
WHEN: User submits event
THEN: Backend returns:
  - Status: 403 Forbidden
  - Error: "You don't have permission to create events"

WHEN: Error returned to UI
THEN: Modal shows error state:
  - "Permission Denied"
  - "Contact your organization admin to request access"
  - [Contact Admin] button (opens email)
  - [Close] button
```

---

## TEST 5: AI Failure — Gemini API Down

### Scenario
```
GIVEN: User creates event with "Generate tasks automatically" checked
  AND: Gemini API is unavailable (503 Service Unavailable)
```

### Expected Behavior
```
WHEN: AI task generation fails
THEN: Event is still created successfully
  AND: AI generation fails gracefully

UI shows:
  - Success toast: "✓ Event created successfully!"
  - Warning toast: "⚠ AI task generation unavailable"
  - Modal with options:
    "AI is temporarily unavailable. What would you like to do?"
    - [Create Tasks Manually] (opens task form)
    - [Try AI Again Later] (can retry from event detail page)
    - [Use Template] (applies task template)

Database state:
  - Event created ✓
  - Phases created ✓
  - Tasks NOT created (user must add manually or retry)
  - ai_actions table logs failure
```

---

## TEST 6: Partial Success — Some Tasks Fail to Create

### Scenario
```
GIVEN: AI generates 120 tasks
  AND: Database insert succeeds for 100 tasks
  BUT: 20 tasks fail (validation error or DB constraint)
```

### Expected Behavior
```
WHEN: Bulk insert partially fails
THEN: UI shows partial success state:
  - Success toast: "✓ Event created!"
  - Warning toast: "⚠ 100 of 120 tasks created"
  - Modal with details:
    "Some tasks couldn't be created due to validation errors."
    - Show: 100 tasks created successfully
    - Show: 20 tasks failed (list reasons)
    - [View Created Tasks] button
    - [Retry Failed Tasks] button
    - [Continue Without Failed Tasks] button

Database state:
  - Event created ✓
  - 100 tasks created ✓
  - 20 tasks NOT created
  - ai_actions table logs partial success
```

---

## TEST 7: Concurrent Edit — Two Users Create Same Event

### Scenario
```
GIVEN: User A starts creating "Spring Show 2024"
  AND: User B starts creating "Spring Show 2024" simultaneously
  AND: Both click "Create Event" within 1 second
```

### Expected Behavior
```
WHEN: Both requests reach backend simultaneously
THEN: First request succeeds
  AND: Second request fails with 409 Conflict

User A sees:
  - Success toast: "✓ Event created successfully!"
  - Redirects to event detail page

User B sees:
  - Error: "This event name was just created by another user"
  - Modal stays open
  - Suggested name: "Spring Show 2024 - Copy"
  - User B can rename and retry
```

---

## TEST 8: Offline Mode — User Goes Offline During Creation

### Scenario
```
GIVEN: User is filling out event wizard
  AND: User loses internet connection
```

### Expected Behavior
```
WHEN: Connection lost detected
THEN: UI shows offline indicator:
  - Banner at top: "⚠ You're offline. Changes will save when reconnected."
  - Wizard continues working (data stored locally)

WHEN: User clicks "Create Event" while offline
THEN: Request queued:
  - UI shows: "Queued. Will create when online."
  - Draft saved to localStorage
  - Service worker queues request

WHEN: Connection restored
THEN: Service worker auto-retries request
  AND: Event created
  AND: UI updates: "✓ Event created successfully!"
  AND: User redirected to event detail page
```

---

## TEST 9: Budget Validation — Exceeds Organization Limit

### Scenario
```
GIVEN: Organization has budget limit: $100,000 per event
  AND: User enters budget: $150,000
```

### Expected Behavior
```
WHEN: User submits event with $150,000 budget
THEN: Backend validation fails:
  - Error: "Budget exceeds organization limit ($100,000)"

WHEN: Error returned to UI
THEN: Budget field highlighted red
  AND: Error message below field:
    "Your organization's event budget limit is $100,000.
     Contact admin to request increase."
  AND: [Request Increase] button (sends email to admin)
```

---

## TEST 10: Date Validation — Event in the Past

### Scenario
```
GIVEN: Today is January 1, 2024
  AND: User selects event date: December 1, 2023
```

### Expected Behavior
```
WHEN: User selects past date
THEN: Frontend validation triggers immediately:
  - Date picker highlights invalid date (red)
  - Error below field: "Event date must be in the future"
  - "Next" button remains disabled

WHEN: User selects valid future date
THEN: Error clears
  AND: "Next" button enables
```

---

## TEST 11: Mobile Experience — Event Creation on Phone

### Scenario
```
GIVEN: User on mobile device (375px width)
  AND: User opens event creation wizard
```

### Expected Behavior
```
WHEN: Wizard opens on mobile
THEN: Modal is full-screen
  AND: Step indicator shows at top
  AND: Form fields stack vertically
  AND: Date picker is mobile-friendly (native picker)
  AND: Touch targets are ≥44px
  AND: Keyboard covers inputs but page scrolls
  AND: "Next" button is fixed at bottom
  AND: Progress saved on each step (can close and resume)

WHEN: User completes wizard on mobile
THEN: Same functionality as desktop
  AND: Success toast visible
  AND: Redirects to mobile-optimized event detail page
```

---

## TEST 12: AI Task Customization — User Edits Generated Tasks

### Scenario
```
GIVEN: AI generated 120 tasks
  AND: User wants to review before adding to event
```

### Expected Behavior
```
WHEN: AI completes task generation
THEN: Before creating tasks, show preview modal:
  - "AI generated 120 tasks. Review before adding?"
  - Scrollable list of tasks (grouped by phase)
  - Each task shows: title, deadline, assignee (none), priority

WHEN: User clicks task
THEN: Edit modal opens:
  - Can change: title, description, deadline, priority
  - Can delete task
  - Can add custom fields

WHEN: User clicks "Add All Tasks"
THEN: All 120 tasks created (with edits applied)
  AND: Success toast: "✓ 120 tasks added to event"

WHEN: User clicks "Add Selected" (checkboxes)
THEN: Only selected tasks created
  AND: Success toast: "✓ 85 tasks added to event"
```

---

## ACCEPTANCE CRITERIA (All Tests Must Pass)

### Functional Requirements
- [x] User can create event in <8 clicks
- [x] Form validation prevents invalid data
- [x] AI generates tasks automatically (optional)
- [x] Event persists to database
- [x] Real-time updates notify other users
- [x] All error states handled gracefully
- [x] Mobile experience is complete

### Non-Functional Requirements
- [x] Event creation completes in <15 seconds (including AI)
- [x] AI cost per event: <$0.10
- [x] No data loss (even if partial failure)
- [x] Works offline (with sync when online)
- [x] Accessible (keyboard navigation, screen reader)
- [x] Secure (RLS policies enforced)

### User Experience Requirements
- [x] User receives feedback at every step
- [x] Errors are actionable (user knows what to fix)
- [x] Success states are celebratory
- [x] AI is helpful but not required
- [x] Can save draft and resume later
- [x] No blank screens or silent failures

---

## IMPLEMENTATION CHECKLIST

### Frontend
- [ ] Event creation wizard component
- [ ] 6-step form with validation
- [ ] Loading states for each step
- [ ] Error states with retry logic
- [ ] Success states with confetti/animation
- [ ] Offline detection and queueing
- [ ] Mobile-responsive modal
- [ ] Keyboard shortcuts (Esc to close, Enter to submit)

### Backend (Edge Functions)
- [ ] `/api/events/create` endpoint
- [ ] Input validation (Zod schema)
- [ ] Permission checks (RLS policies)
- [ ] Idempotency handling (duplicate prevention)
- [ ] Event record creation
- [ ] Phase generation trigger
- [ ] AI orchestration call (if enabled)
- [ ] Error handling and logging

### AI Layer
- [ ] Event Planner Agent implementation
- [ ] Gemini 3 Pro integration
- [ ] Task generation prompt engineering
- [ ] Structured output validation
- [ ] Dependency calculation
- [ ] Critical path identification
- [ ] Fallback for AI failure

### Database
- [ ] events table (with all fields)
- [ ] event_phases table (14 phases)
- [ ] tasks table (120+ tasks)
- [ ] task_dependencies table
- [ ] ai_actions table (audit log)
- [ ] RLS policies (tenant isolation)
- [ ] Database triggers (auto-create phases)

### Testing
- [ ] Unit tests (validation functions)
- [ ] Integration tests (API endpoints)
- [ ] E2E tests (full wizard flow)
- [ ] Error recovery tests (all 12 scenarios)
- [ ] Performance tests (15s target)
- [ ] Mobile tests (375px width)

---

**PRODUCTION READY:** When all 12 tests pass + implementation checklist complete ✅
