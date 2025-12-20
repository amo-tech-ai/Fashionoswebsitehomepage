# Event Command Center - Implementation Prompt List

**Reference Document:** `/docs/events/tasks/01-Event-Command-Center.md`  
**Priority:** 🔴 P0 - CRITICAL BLOCKER  
**Total Prompts:** 25 (Figma Make: 8, Cursor AI: 17)  
**Estimated Time:** 12-16 hours

---

## 📋 QUICK REFERENCE

**What This Document Is:**
- Sequential list of prompts to build Event Command Center
- Each prompt is copy-paste ready for Figma Make or Cursor AI
- References detailed specs in main Task 01 document
- Organized by implementation phase

**How to Use:**
1. Start with Phase 1 (Design)
2. Copy prompt to Figma Make/Cursor AI
3. Verify output matches acceptance criteria
4. Move to next prompt
5. Mark complete when validated

---

## PHASE 1: VISUAL DESIGN (FIGMA MAKE - 8 PROMPTS)

### Prompt 1.1: Event Header Component

**Tool:** Figma Make  
**Time:** 30 minutes  
**Reference:** Task 01, Section 4 "Screen: Event Command Center"

**Prompt:**
```
Create Event Command Center header component with three sections:

LEFT SECTION:
- Event name heading (32px font, bold)
- Event type badge (rounded, 12px font, subtle background)
- Status badge (colored: green=confirmed, yellow=planning, blue=in progress)

CENTER SECTION:
- Countdown timer with circular progress ring
- Display format: "45 days until event"
- Progress ring fills based on days remaining (red <7 days, yellow 7-30 days, green >30 days)

RIGHT SECTION:
- Four quick action buttons in horizontal row
- Button 1: "Edit Event" (primary blue)
- Button 2: "Share Dashboard" (secondary gray)
- Button 3: "Export Report" (secondary gray)
- Button 4: "Archive" (danger red, ghost style)

RESPONSIVE BEHAVIOR:
- Desktop: All three sections in one row
- Tablet: Stack center section below left+right
- Mobile: Full vertical stack, buttons 2×2 grid

SPACING:
- Header height: 120px desktop, 180px tablet, 240px mobile
- Padding: 24px all sides
- Gap between sections: 32px

OUTPUT: React component EventHeader.tsx ready for Figma Make generation
```

**Acceptance Criteria:**
- [ ] Header renders with all three sections
- [ ] Countdown timer updates dynamically
- [ ] All buttons clickable with hover states
- [ ] Responsive on all screen sizes

---

### Prompt 1.2: KPI Card Component (Reusable)

**Tool:** Figma Make  
**Time:** 45 minutes  
**Reference:** Task 01, Section 4 "Section 1: KPI Cards"

**Prompt:**
```
Create reusable KPI card component with these elements:

CARD STRUCTURE:
- Card dimensions: 320px width × 180px height
- Background: White with subtle shadow (elevation 1)
- Border radius: 12px
- Padding: 24px

CONTENT LAYOUT (vertical stack):

TOP ROW:
- Icon (left): 40×40px circle with colored background
- Label (right): 14px font, gray-600 color, uppercase
- Gap between: 12px

MIDDLE ROW:
- Large number: 48px font, bold, primary color
- Subtext below: 16px font, gray-500 (e.g., "68/150 tasks")

BOTTOM ROW:
- Trend indicator: Arrow icon (up/down) + percentage text
- Color: Green for positive trend, red for negative
- Mini sparkline chart (optional, 60px wide)

VARIANTS (6 cards):
1. Event Progress: Progress % with trend arrow
2. Tasks: Done/total with breakdown tooltip
3. Sponsors: Count + total $ value
4. Attendees: Registered/target with progress bar
5. Budget: % used with circular gauge
6. Deliverables: Complete/total with status icons

INTERACTIVE STATES:
- Hover: Slight lift (4px shadow increase)
- Click: Navigates to detail view (emit event)
- Loading: Skeleton animation

RESPONSIVE:
- Desktop: 3 columns (2 rows)
- Tablet: 2 columns (3 rows)
- Mobile: 1 column (6 rows stacked)

OUTPUT: KPICard.tsx component with props for customization
```

**Acceptance Criteria:**
- [ ] Card displays all content sections correctly
- [ ] 6 variants render with correct data
- [ ] Hover and click states work
- [ ] Grid layout responsive on all devices

---

### Prompt 1.3: 5-Phase Workflow Timeline

**Tool:** Figma Make  
**Time:** 1 hour  
**Reference:** Task 01, Section 4 "Section 2: 5-Phase Workflow Timeline"

**Prompt:**
```
Create horizontal workflow timeline showing 5 event phases:

TIMELINE STRUCTURE:
- Horizontal progress bar with 5 segments
- Each segment represents one phase with progress percentage
- Segments connect with thin line (2px, gray-300)

PHASE SEGMENTS (left to right):
1. Pre-Production (60-90 days before event)
2. Venue & Logistics (30-60 days)
3. Creative Design (15-30 days)
4. On-Site Operations (1-7 days + event day)
5. Post-Event (after event completion)

EACH PHASE SHOWS:
- Phase name label (14px font, above segment)
- Date range (12px font, gray-500, below name)
- Progress bar segment (height 40px)
- Progress percentage text inside bar
- Task count (e.g., "28/33 tasks" below bar)
- Checkmark icon if 100% complete

PROGRESS BAR COLORS:
- 100% complete: Green (#10B981)
- 50-99% in progress: Blue (#3B82F6)
- 1-49% started: Yellow (#F59E0B)
- 0% locked: Gray (#D1D5DB)

INTERACTIVE:
- Click phase: Expands to show task list for that phase
- Hover phase: Shows tooltip with phase details
- Locked phases show lock icon (cannot expand until previous complete)

RESPONSIVE:
- Desktop: Horizontal 5 segments side-by-side
- Tablet: Horizontal scrollable (overflow-x: auto)
- Mobile: Vertical stack, each phase full width

VISUAL ENHANCEMENTS:
- Animated progress fill when percentage changes
- Pulse animation on active phase
- Subtle gradient on progress bars

OUTPUT: WorkflowTimeline.tsx component
```

**Acceptance Criteria:**
- [ ] All 5 phases render with correct data
- [ ] Progress bars fill based on percentage
- [ ] Click to expand shows task list
- [ ] Locked phases display correctly
- [ ] Responsive and scrollable on mobile

---

### Prompt 1.4: Task Breakdown Section (Collapsible)

**Tool:** Figma Make  
**Time:** 1.5 hours  
**Reference:** Task 01, Section 4 "Section 3: Task Breakdown"

**Prompt:**
```
Create task breakdown section with tabs and collapsible task cards:

TAB NAVIGATION (horizontal):
- 5 tabs: Event Planning | Sponsorship | Marketing | Operations | Media
- Active tab: Blue underline (3px thick)
- Tab counts: Badge showing task count (e.g., "23")
- Click tab: Switches content panel below

TASK LIST LAYOUT:
Group tasks by status with collapsible sections:

SECTION 1: Overdue (red)
- Header: "Overdue Tasks (12)" with expand/collapse icon
- Badge: Red with count
- Default: Expanded

SECTION 2: In Progress (yellow)
- Header: "In Progress (20)" with assignee avatars
- Badge: Yellow with count
- Default: Expanded

SECTION 3: Upcoming (blue)
- Header: "Upcoming (50)" with next deadline
- Badge: Blue with count
- Default: Collapsed

SECTION 4: Complete (green)
- Header: "Completed (68)" with checkmark
- Badge: Green with count
- Default: Collapsed (minimize visual clutter)

TASK CARD DESIGN (within each section):
- Card height: 80px
- Layout: 3 columns (name | assignee+deadline | actions)

COLUMN 1 - Task Name (60% width):
- Task name: 16px font, truncate if too long
- Priority badge: Small chip (Critical=red, High=orange, Medium=blue, Low=gray)
- Dependency icon: Chain link if task has dependencies

COLUMN 2 - Metadata (25% width):
- Assignee avatar: 32px circle with initials fallback
- Assignee name: 14px font below avatar
- Deadline: Relative format "in 3 days" or "2 days overdue"
- Deadline color: Red if overdue, yellow if <3 days, gray otherwise

COLUMN 3 - Quick Actions (15% width):
- Three icon buttons (horizontal):
  - Mark complete: Checkmark icon
  - Reassign: User icon
  - More options: Three dots (opens menu)

CRITICAL PATH HIGHLIGHTING:
- Tasks on critical path: Red left border (4px thick)
- Red "CRITICAL" badge next to task name
- Pulsing animation to draw attention

RESPONSIVE:
- Desktop: 3-column layout as described
- Tablet: 2-column (metadata stacks below name)
- Mobile: Single column, all info stacked vertically

INTERACTIONS:
- Click task card: Opens task detail modal
- Click assignee: Filters to tasks for that person
- Drag task card: Reorder within section (optional)

OUTPUT: TaskBreakdown.tsx component with tab state management
```

**Acceptance Criteria:**
- [ ] All 5 tabs render and switch correctly
- [ ] Tasks grouped by status with collapsible sections
- [ ] Critical path tasks highlighted in red
- [ ] Quick actions functional (mark complete, reassign)
- [ ] Responsive layout works on all devices

---

### Prompt 1.5: Team Activity Feed (Right Sidebar)

**Tool:** Figma Make  
**Time:** 45 minutes  
**Reference:** Task 01, Section 4 "Section 4: Team Activity Feed"

**Prompt:**
```
Create real-time activity feed sidebar showing team actions:

SIDEBAR CONTAINER:
- Position: Fixed right side of screen
- Width: 320px desktop, full-width mobile drawer
- Background: Light gray (#F9FAFB)
- Height: Full viewport with scroll
- Collapsible: Icon button to hide/show

HEADER:
- Title: "Team Activity" (18px font, bold)
- Filter dropdown: "All Activity" | "My Tasks" | "Mentions"
- Collapse button: Chevron icon (right-pointing when collapsed)

ACTIVITY ITEMS (vertical list):
Each item shows:
- User avatar: 40px circle (left)
- Action description: 2 lines max (middle)
- Timestamp: Relative time "5 min ago" (right, gray)
- Divider line below each item (1px, gray-200)

ACTIVITY TYPES:
1. Task completed: Green checkmark icon, "User completed 'Task Name'"
2. File uploaded: Blue upload icon, "User uploaded designer portfolio"
3. Comment added: Chat bubble icon, "User commented on 'Task Name'"
4. Task assigned: User icon, "User assigned 'Task' to Person"
5. AI action: Gemini sparkle icon, "AI detected budget variance"

SPECIAL FORMATTING:
- @mentions: Highlight in blue, bold font
- Task names: Clickable links (underlined on hover)
- User names: Bold, clickable (opens user profile)

AUTO-SCROLL BEHAVIOR:
- New items appear at top (reverse chronological)
- Auto-scroll to top when new activity arrives
- Unread indicator: Blue dot next to new items

RESPONSIVE:
- Desktop: Fixed sidebar, always visible
- Tablet: Collapsible, overlay on content when open
- Mobile: Bottom drawer, swipe up to open

LOADING STATE:
- Skeleton loader: 5 gray placeholder items while fetching

EMPTY STATE:
- Icon: Calendar icon
- Message: "No activity yet. Team actions will appear here."

OUTPUT: ActivityFeed.tsx component with real-time subscription
```

**Acceptance Criteria:**
- [ ] Activity items render in reverse chronological order
- [ ] All 5 activity types display correctly
- [ ] Auto-scroll to top on new activity
- [ ] Collapsible behavior works on mobile
- [ ] Clickable links navigate correctly

---

### Prompt 1.6: AI Insights Panel (Bottom Section)

**Tool:** Figma Make  
**Time:** 1 hour  
**Reference:** Task 01, Section 4 "Section 5: AI Insights Panel"

**Prompt:**
```
Create AI-powered insights panel showing top 3 risks/recommendations:

PANEL CONTAINER:
- Position: Bottom section of Command Center
- Background: Gradient (light blue to white)
- Border top: 2px solid blue-200
- Padding: 32px
- Collapsible: Accordion style (default expanded)

HEADER:
- Title: "AI Insights & Recommendations" (20px font, bold)
- Gemini icon: Sparkle icon (animated subtle shimmer)
- Subtitle: "Powered by Gemini" (12px font, gray)
- Last updated: "Updated 5 minutes ago" (right side)
- Refresh button: Icon only, spins on click

INSIGHT CARDS (3 max, horizontal row):

CARD STRUCTURE:
- Width: 33.33% each (3 columns)
- Height: 240px
- Background: White
- Border radius: 12px
- Shadow: Elevation 2
- Gap between cards: 24px

CARD SEVERITY COLORS:
1. Critical (red): Red left border (4px), red icon, red badge
2. Warning (yellow): Yellow left border, yellow icon, yellow badge
3. Suggestion (blue): Blue left border, blue icon, blue badge

CARD CONTENT (vertical layout):

TOP SECTION:
- Severity badge: "CRITICAL" | "WARNING" | "SUGGESTION" (12px, uppercase)
- Icon: Alert triangle (critical), exclamation (warning), lightbulb (suggestion)

MIDDLE SECTION:
- Title: 18px font, bold, 2 lines max
- Description: 14px font, gray-600, 4 lines max with ellipsis
- Impact label: "Impact: HIGH | MEDIUM | LOW" with icon
- Urgency label: "Urgency: NOW | 3 days | 7 days" with clock icon

BOTTOM SECTION:
- Primary action button: Full width, colored based on severity
- Button text examples:
  - "View 3 Overdue Tasks"
  - "Reallocate Budget"
  - "Review Recommendations"
- Secondary action: Text link below button (gray, underlined on hover)

EXPANDABLE DETAIL:
- Click card: Expands to show full analysis
- Expanded state: Card height grows to fit content (max 400px)
- Shows: Full description, recommended actions (bullet list), dismiss button

INTERACTIVE STATES:
- Hover card: Lift 4px (shadow increases)
- Click expand: Smooth height animation (300ms ease)
- Dismiss: Fade out, slide up, remove from list

RESPONSIVE:
- Desktop: 3 cards side-by-side
- Tablet: 2 cards (2 rows, middle card spans full width)
- Mobile: 1 card per row (vertical stack)

EMPTY STATE:
- Icon: Checkmark in circle (green)
- Message: "All clear! No critical insights right now."
- Subtext: "Your event is running smoothly."

OUTPUT: AIInsightsPanel.tsx component with expand/collapse logic
```

**Acceptance Criteria:**
- [ ] 3 insight cards render with correct severity colors
- [ ] Expand/collapse animation smooth
- [ ] Action buttons navigate to correct screens
- [ ] Dismiss functionality works
- [ ] Responsive layout on all devices

---

### Prompt 1.7: Mobile Responsive Layout

**Tool:** Figma Make  
**Time:** 1 hour  
**Reference:** Task 01, Section 4 "Responsive Behavior"

**Prompt:**
```
Optimize Event Command Center for mobile devices:

MOBILE LAYOUT STRATEGY:
Transform desktop 3-column layout to single-column mobile stack

TOP TO BOTTOM ORDER:
1. Event Header (sticky at top)
2. Quick Stats Summary (compact version of KPIs)
3. Progress Overview (mini version of timeline)
4. Critical Actions Panel (most urgent items only)
5. Task Summary (collapsed by default)
6. AI Insights (swipe carousel, 1 card visible)
7. Team Activity (bottom drawer, swipe up to open)

COMPONENT ADAPTATIONS:

EVENT HEADER:
- Stack vertically (name → countdown → buttons)
- Buttons: 2×2 grid instead of row
- Height: 240px (from 120px desktop)

KPI CARDS:
- Swipe carousel instead of grid
- Show 1.2 cards at a time (peek next card)
- Dots indicator below (show position)
- Compact design: 280px wide × 140px tall

WORKFLOW TIMELINE:
- Vertical stack (not horizontal)
- Each phase: Full width bar
- Tap phase: Expands accordion-style
- Active phase highlighted

TASK BREAKDOWN:
- Tabs become dropdown select
- Default: Collapsed (show count only)
- Tap "View Tasks": Opens full-screen modal
- Modal: Swipe down to close

AI INSIGHTS:
- Horizontal swipe carousel
- 1 card visible at a time
- Swipe left/right to see next insight
- Page dots indicator

ACTIVITY FEED:
- Bottom drawer (like iOS Maps)
- Drag handle at top
- 3 states: Minimized (peek 80px), Half (50% screen), Full (90% screen)
- Swipe down to minimize

NAVIGATION:
- Sticky header with back button (left)
- Event name truncated with ellipsis
- Quick actions menu (hamburger, right)

TOUCH TARGETS:
- Minimum 44×44px for all tappable elements
- Increased padding on buttons (16px vs 12px desktop)
- Larger fonts for better readability (16px base vs 14px)

PERFORMANCE:
- Lazy load sections below fold
- Infinite scroll on activity feed
- Debounce search inputs (300ms)

OUTPUT: Mobile-optimized EventCommandCenter.tsx with responsive breakpoints
```

**Acceptance Criteria:**
- [ ] All sections stack vertically on mobile
- [ ] Touch targets minimum 44px
- [ ] Swipe gestures work smoothly
- [ ] Bottom drawer opens/closes correctly
- [ ] Lazy loading improves performance

---

### Prompt 1.8: Loading States & Skeletons

**Tool:** Figma Make  
**Time:** 30 minutes  
**Reference:** Task 01, Section 13 "Troubleshooting"

**Prompt:**
```
Create loading skeletons for all Event Command Center sections:

SKELETON DESIGN PRINCIPLES:
- Match actual component dimensions
- Pulse animation (opacity 0.5 to 1.0, 1.5s duration, infinite)
- Background: Gray-200 gradient
- Border radius matches real component

HEADER SKELETON:
- Rectangle for event name (300×32px)
- Circle for countdown (120×120px)
- 4 rectangles for buttons (100×40px each)

KPI CARD SKELETON (6 cards):
- Card outline: 320×180px
- Icon circle: 40×40px (top left)
- Label rectangle: 100×14px (top right)
- Large number: 200×48px (middle)
- Trend line: 150×24px (bottom)

TIMELINE SKELETON:
- 5 connected rectangles (horizontal)
- Each segment: Width 20%, height 40px
- Connecting lines between segments

TASK LIST SKELETON:
- 5 task card placeholders
- Each card: 3 rectangles (name, assignee, actions)
- Stagger animation (delay 100ms per card)

AI INSIGHTS SKELETON:
- 3 card outlines
- Each with: Badge, title, description, button shapes

LOADING SEQUENCE:
1. Show header skeleton first (instant)
2. KPI cards fade in (200ms delay)
3. Timeline appears (400ms delay)
4. Other sections cascade (600ms, 800ms, etc.)

ERROR STATE (if data fails to load):
- Replace skeleton with error message
- Icon: Alert circle (red)
- Message: "Failed to load dashboard data"
- Retry button: Primary blue
- Support link: "Contact support if issue persists"

OUTPUT: LoadingSkeleton.tsx component with animation timing
```

**Acceptance Criteria:**
- [ ] Skeletons match real component dimensions
- [ ] Pulse animation smooth and subtle
- [ ] Cascade loading feels natural
- [ ] Error state displays correctly
- [ ] Retry button functional

---

## PHASE 2: BACKEND API (CURSOR AI - 6 PROMPTS)

### Prompt 2.1: Create Supabase Tables for Command Center

**Tool:** Cursor AI  
**Time:** 1 hour  
**Reference:** Task 01, Section 15 "Data Model"

**Prompt:**
```
Create Supabase migration for Event Command Center data:

Generate SQL migration file with these tables:

TABLE: events
Fields:
- id (uuid, primary key, default gen_random_uuid())
- name (text, not null)
- type (text, check constraint: runway_show | brand_activation | pop_up | etc.)
- description (text)
- start_date (timestamptz, not null)
- end_date (timestamptz)
- status (text, check: draft | planning | confirmed | in_progress | completed | archived)
- progress_percentage (integer, check: 0 to 100, default 0)
- venue_id (uuid, foreign key to venues)
- created_by (uuid, foreign key to auth.users, not null)
- created_at (timestamptz, default now())
- updated_at (timestamptz, default now())

Indexes:
- idx_events_created_by on created_by
- idx_events_status on status
- idx_events_start_date on start_date

RLS Policies:
- Users can SELECT events they created OR are team members of
- Users can UPDATE only events they created
- Event leads can DELETE (archive) their events

TABLE: event_team
Fields:
- id (uuid, primary key)
- event_id (uuid, foreign key to events, on delete cascade)
- user_id (uuid, foreign key to auth.users)
- role (text, check: event_lead | creative_director | production_manager | etc.)
- permissions (text, check: admin | edit | view_only)
- assigned_at (timestamptz, default now())

Unique constraint: (event_id, user_id)

RLS Policies:
- Users can SELECT team members for events they have access to
- Event leads can INSERT team members
- Event leads can DELETE team members

Include trigger for updated_at auto-update on events table.

OUTPUT: Migration file with complete schema, constraints, indexes, RLS policies
```

**Acceptance Criteria:**
- [ ] Migration runs without errors
- [ ] All tables created in Supabase
- [ ] RLS policies prevent unauthorized access
- [ ] Indexes improve query performance

---

### Prompt 2.2: Create API Route GET /api/events/:id

**Tool:** Cursor AI  
**Time:** 1 hour  
**Reference:** Task 01, Section 5 "API Routes"

**Prompt:**
```
Create Next.js API route to fetch full event data for Command Center:

File: /app/api/events/[id]/route.ts

Endpoint: GET /api/events/:id

Logic:
1. Extract event ID from URL params
2. Verify user has access (check auth.users + event_team)
3. Fetch event with joins:
   - Join venues table (get venue name, location)
   - Join event_team (get team members with roles)
   - Aggregate event_tasks:
     - Total count
     - Count by status (done, in_progress, overdue)
     - Group by phase (pre_production, venue_logistics, etc.)
   - Aggregate event_sponsors:
     - Count sponsors
     - Sum sponsorship amounts
   - Aggregate event_budget_categories:
     - Total budgeted
     - Total actual
     - Calculate variance percentage
   - Join activity_logs (last 20 entries for team feed)

4. Calculate derived metrics:
   - Progress percentage: (done_tasks / total_tasks) × 100
   - Budget variance: (actual - budgeted) / budgeted × 100
   - Days until event: start_date - today

5. Structure response JSON:
{
  event: {
    id, name, type, description, start_date, status, progress_percentage,
    venue: { id, name, location, capacity },
    team: [
      { user_id, name, avatar_url, role, permissions }
    ],
    tasks_summary: {
      total: 150,
      done: 68,
      in_progress: 20,
      overdue: 12,
      by_phase: {
        pre_production: { total: 30, done: 30 },
        venue_logistics: { total: 28, done: 20 },
        // ... other phases
      }
    },
    sponsors: [
      { id, company_name, tier, amount, status }
    ],
    budget: {
      total_budgeted: 500000,
      total_actual: 190000,
      variance_percentage: -62,
      categories: [
        { category: "venue", budgeted: 45000, actual: 45000 }
      ]
    },
    activity_feed: [
      { user_name, action, description, created_at }
    ]
  }
}

6. Error handling:
   - 401 if not authenticated
   - 403 if user not team member
   - 404 if event not found
   - 500 for database errors

7. Performance optimization:
   - Single query with joins (avoid N+1)
   - Cache response for 5 minutes
   - Return only needed fields

OUTPUT: Complete API route with types, error handling, caching
```

**Acceptance Criteria:**
- [ ] API returns correct data structure
- [ ] Auth checks prevent unauthorized access
- [ ] Query optimized (single database hit)
- [ ] Response time <500ms

---

### Prompt 2.3: Setup Supabase Real-Time Subscriptions

**Tool:** Cursor AI  
**Time:** 1.5 hours  
**Reference:** Task 01, Section 6 "Real-Time Sync"

**Prompt:**
```
Setup Supabase real-time for Event Command Center live updates:

Create React hook: useEventRealTime(eventId)

Hook Logic:
1. Establish WebSocket connection to Supabase real-time
2. Subscribe to multiple channels for this event:

CHANNEL 1: event_tasks changes
- Listen to: INSERT, UPDATE, DELETE on event_tasks table
- Filter: WHERE event_id = eventId
- On message: Update local task state
- Trigger: Recalculate progress percentage

CHANNEL 2: activity_logs inserts
- Listen to: INSERT on activity_logs table
- Filter: WHERE event_id = eventId
- On message: Prepend to activity feed array
- Auto-scroll feed to top

CHANNEL 3: event_budget_categories updates
- Listen to: UPDATE on event_budget_categories
- Filter: WHERE event_id = eventId
- On message: Update budget KPI card
- Trigger: Check for variance alerts

3. Connection management:
   - Auto-reconnect on disconnect (exponential backoff)
   - Show connection status indicator (green dot = connected)
   - Queue updates if offline (localStorage)
   - Replay queue on reconnect

4. Return hook values:
{
  tasks: Array<Task>,
  activityFeed: Array<Activity>,
  budget: BudgetSummary,
  connectionStatus: 'connected' | 'connecting' | 'disconnected',
  error: Error | null
}

5. Cleanup on unmount:
   - Unsubscribe from all channels
   - Close WebSocket connection
   - Clear local state

Edge Cases:
- Handle duplicate messages (deduplicate by ID + timestamp)
- Handle out-of-order messages (sort by timestamp)
- Handle large batch updates (debounce UI updates to 500ms)

Performance:
- Limit activity feed to last 50 items (pagination for older)
- Throttle progress recalculation (max once per second)

OUTPUT: useEventRealTime.ts hook with connection management
```

**Acceptance Criteria:**
- [ ] Real-time updates arrive within 1 second
- [ ] Connection auto-recovers after network drop
- [ ] No duplicate updates in UI
- [ ] Memory leaks prevented (cleanup works)

---

### Prompt 2.4: Integrate Gemini AI for Insights Panel

**Tool:** Cursor AI  
**Time:** 2 hours  
**Reference:** Task 01, Section 6 "AI Features"

**Prompt:**
```
Create Supabase Edge Function for AI insights generation:

Function Name: analyze-event-risks
Trigger: Called when Command Center loads OR daily at 8am (cron)

Input:
{
  eventId: string
}

Process:
1. Fetch event data:
   - All tasks with status, deadline, dependencies
   - Budget categories with actual vs budgeted
   - Team assignments vs required roles
   - Contract expiration dates

2. Call Gemini Thinking API for risk analysis:

Prompt:
"Analyze this event for risks and recommend actions.

Event: [event name], [days until event] days away
Tasks: [total] total, [done] done, [overdue] overdue, [critical_path_count] on critical path
Budget: [budgeted] budgeted, [actual] spent ([variance]% variance)
Team: [required_roles] roles needed, [assigned_count] assigned ([gaps] gaps)

Identify top 3 risks with:
- Severity (critical | high | medium | low)
- Category (tasks | budget | staffing | contracts | venue | weather)
- Title (60 chars max)
- Description (200 chars max)
- Impact assessment
- Urgency (now | 3 days | 7 days)
- Recommended actions (array of 1-3 specific steps)

Return Structured Output as JSON."

3. Gemini Thinking response (example):
{
  risks: [
    {
      severity: "critical",
      category: "tasks",
      title: "3 Critical Path Tasks Overdue",
      description: "Tasks blocking event completion are past deadline. May delay event by 5 days if not resolved today.",
      impact: "Event timeline at risk",
      urgency: "now",
      recommended_actions: [
        "Reassign 'Designer contracts' to assistant with urgent flag",
        "Upload venue floor plan to mark task complete",
        "Extend 'Lighting design' deadline by 2 days"
      ],
      risk_score: 95
    },
    // ... 2 more risks
  ],
  confidence: 0.93
}

4. Save risks to database:
   - Insert into event_risks table
   - Mark previous risks as resolved if no longer present
   - Calculate event_health_score (0-100)

5. Return response:
{
  success: true,
  risks: [...],
  health_score: 68,
  generated_at: timestamp
}

6. Error handling:
   - Retry Gemini API call 3 times if fails
   - Fallback to rule-based analysis if Gemini unavailable
   - Log errors for monitoring

OUTPUT: Edge function with Gemini integration, deployed to Supabase
```

**Acceptance Criteria:**
- [ ] Gemini API called successfully
- [ ] Risks returned with correct severity levels
- [ ] Edge function deploys without errors
- [ ] Fallback logic works when Gemini down

---

### Prompt 2.5: Create Progress Calculation Logic

**Tool:** Cursor AI  
**Time:** 45 minutes  
**Reference:** Task 01, Section 16 "AI Functions"

**Prompt:**
```
Create database function to auto-calculate event progress:

Function Name: recalculate_event_progress(event_id uuid)

Logic:
1. Count tasks for this event:
   - total_tasks: COUNT(*) FROM event_tasks WHERE event_id = $1 AND status != 'cancelled'
   - done_tasks: COUNT(*) WHERE status = 'done'

2. Calculate progress percentage:
   - progress = (done_tasks / total_tasks) × 100
   - Round to integer (no decimals)
   - Handle edge case: If total_tasks = 0, return 0

3. Update events table:
   UPDATE events 
   SET progress_percentage = calculated_progress,
       updated_at = now()
   WHERE id = event_id

4. Return updated progress value

Create database trigger:
- Trigger name: task_completion_updates_progress
- Trigger on: event_tasks table
- Events: AFTER INSERT, UPDATE, DELETE
- Condition: When status changes to/from 'done' OR task deleted
- Action: Call recalculate_event_progress(event_id)

Benefits:
- Progress always accurate (auto-updated)
- No manual recalculation needed
- Updates in real-time when tasks complete
- Efficient (only runs when tasks change)

OUTPUT: SQL function + trigger definition
```

**Acceptance Criteria:**
- [ ] Progress updates when task marked done
- [ ] Progress decreases when task unmarked
- [ ] Trigger fires only on relevant changes
- [ ] Performance acceptable (<50ms)

---

### Prompt 2.6: Setup Activity Feed Broadcasting

**Tool:** Cursor AI  
**Time:** 1 hour  
**Reference:** Task 01, Section 8 "Workflows"

**Prompt:**
```
Create activity logging system for team feed:

TABLE: activity_logs
Fields:
- id (uuid, primary key)
- event_id (uuid, foreign key to events)
- user_id (uuid, foreign key to auth.users)
- action_type (text, check: task_completed | file_uploaded | comment_added | etc.)
- description (text, generated from template)
- metadata (jsonb, additional context)
- created_at (timestamptz, default now())

Index: idx_activity_event_created on (event_id, created_at DESC)

Function: log_activity(event_id, user_id, action_type, metadata)

Logic:
1. Fetch user name from auth.users
2. Generate description based on action_type:
   - task_completed: "[User] completed '[Task Name]'"
   - file_uploaded: "[User] uploaded [file_name]"
   - comment_added: "[User] commented on '[Task Name]'"
   - task_assigned: "[User] assigned '[Task]' to [Assignee]"
   - ai_action: "AI detected [risk_title]"

3. Insert into activity_logs
4. Broadcast via Supabase real-time to activity_logs channel
5. Clients subscribed to channel receive update instantly

Database Triggers (auto-log activities):
1. After task UPDATE (status = 'done'):
   - Call log_activity(event_id, user_id, 'task_completed', {task_name})

2. After file upload to Supabase Storage:
   - Call log_activity(event_id, user_id, 'file_uploaded', {file_name})

3. After comment INSERT:
   - Call log_activity(event_id, user_id, 'comment_added', {task_name})

Retention policy:
- Keep last 1000 activities per event
- Auto-delete older entries (scheduled job)

OUTPUT: Activity logging system with auto-triggers
```

**Acceptance Criteria:**
- [ ] Activities logged automatically on actions
- [ ] Real-time broadcast to team feed works
- [ ] Description templates generate correctly
- [ ] Retention policy prevents table bloat

---

## PHASE 3: FRONTEND INTEGRATION (CURSOR AI - 7 PROMPTS)

### Prompt 3.1: Build Event Command Center Container

**Tool:** Cursor AI  
**Time:** 1.5 hours  
**Reference:** Task 01, Section 4 "UI/UX Screens"

**Prompt:**
```
Create main Event Command Center container component:

File: /app/events/[id]/page.tsx

Component Structure:
1. Fetch event data on load:
   - Call API: GET /api/events/:id
   - Show loading skeleton while fetching
   - Handle errors (404, 403, 500)

2. Subscribe to real-time updates:
   - Use hook: useEventRealTime(eventId)
   - Update local state when changes arrive
   - Show connection status indicator

3. Layout (sections top to bottom):
   - EventHeader (sticky top)
   - KPICardsGrid (6 cards, 3×2 grid)
   - WorkflowTimeline (horizontal progress)
   - TaskBreakdown (tabbed, collapsible)
   - ActivityFeed (right sidebar, collapsible)
   - AIInsightsPanel (bottom, collapsible)

4. State management:
   - Event data (fetched from API)
   - Real-time updates (from useEventRealTime)
   - UI state (expanded sections, active tab)
   - Filter state (task filters, activity filters)

5. Navigation:
   - Back button: Navigate to /events
   - Quick actions from header:
     - Edit Event: Navigate to /events/:id/edit
     - Share Dashboard: Copy link to clipboard
     - Export Report: Download PDF
     - Archive: Confirm modal then update status

6. Responsive behavior:
   - Desktop: All sections visible
   - Tablet: Activity feed collapsible
   - Mobile: Sections stack, use mobile optimizations

7. Performance:
   - Lazy load sections below fold
   - Memoize expensive calculations (progress %)
   - Debounce filter changes (300ms)
   - Virtual scrolling for long task lists

OUTPUT: Complete EventCommandCenter.tsx page component
```

**Acceptance Criteria:**
- [ ] Page loads data correctly
- [ ] All sections render without errors
- [ ] Real-time updates work
- [ ] Navigation functional
- [ ] Performance acceptable (60fps)

---

### Prompt 3.2: Connect KPI Cards to Live Data

**Tool:** Cursor AI  
**Time:** 1 hour  
**Reference:** Task 01, Section 9 "Real-World Use Cases"

**Prompt:**
```
Wire KPI cards to real event data:

Component: KPICardsGrid.tsx

Props:
- eventData: Full event object from API
- realtimeUpdates: Updates from useEventRealTime hook

Card 1: Event Progress
- Value: eventData.progress_percentage (e.g., "45%")
- Trend: Calculate week-over-week change
  - Query: Progress 7 days ago vs today
  - Display: "+12% vs last week" (green if positive)
- Click action: Scroll to workflow timeline

Card 2: Tasks
- Value: "68/150" (done / total)
- Breakdown tooltip on hover:
  - "12 overdue" (red)
  - "20 in progress" (yellow)
  - "50 upcoming" (blue)
- Click action: Navigate to /events/:id/tasks

Card 3: Sponsors
- Value: "8 confirmed"
- Subtext: "$420K committed"
- Click action: Navigate to /sponsors?event=:id

Card 4: Attendees
- Value: "412 / 800" (registered / target)
- Progress bar: 52% filled
- Click action: Navigate to /events/:id/attendees

Card 5: Budget
- Value: "38% used"
- Subtext: "$190K / $500K"
- Visual: Circular gauge (38% filled)
- Color: Green if <70%, yellow 70-90%, red >90%
- Click action: Navigate to /events/:id/budget

Card 6: Deliverables
- Value: "14/30"
- Breakdown: "5 overdue" (red badge)
- Click action: Navigate to /events/:id/deliverables

Real-time updates:
- Subscribe to task changes: Update Card 2 and Card 1 (progress)
- Subscribe to sponsor changes: Update Card 3
- Subscribe to budget changes: Update Card 5
- Animate value changes (count-up animation, 500ms)

OUTPUT: KPICardsGrid.tsx with data bindings and real-time updates
```

**Acceptance Criteria:**
- [ ] All 6 cards display correct data
- [ ] Click actions navigate correctly
- [ ] Real-time updates animate smoothly
- [ ] Tooltips show on hover

---

### Prompt 3.3: Integrate Task Breakdown with Event Tasks

**Tool:** Cursor AI  
**Time:** 1.5 hours  
**Reference:** Task 01, Section 10 "Workflows"

**Prompt:**
```
Connect TaskBreakdown component to event tasks:

Component: TaskBreakdown.tsx

Data flow:
1. Fetch tasks: GET /api/events/:id/tasks
   - Returns: Array of tasks with all fields
   - Filter by event_id automatically

2. Group tasks by workflow category:
   - Event Planning tab: Tasks where workflow_category = 'event_planning'
   - Sponsorship tab: workflow_category = 'sponsorship'
   - Marketing tab: workflow_category = 'marketing'
   - Operations tab: workflow_category = 'operations'
   - Media tab: workflow_category = 'media'

3. Within each tab, group by status:
   - Overdue section: status != 'done' AND deadline < today
   - In Progress section: status = 'in_progress'
   - Upcoming section: status = 'to_do'
   - Completed section: status = 'done' (collapsed by default)

4. Highlight critical path:
   - For tasks where is_critical_path = true:
     - Red left border (4px)
     - Red "CRITICAL" badge
     - Pulsing animation (subtle)

5. Task card interactions:
   - Click card: Open TaskDetailModal
   - Click checkmark: Call PUT /api/tasks/:id (status = 'done')
   - Click reassign: Open AssigneeModal
   - Click more options: Show context menu (edit, delete, dependencies)

6. Real-time updates:
   - Subscribe to task changes for this event
   - Move task to correct section when status changes
   - Update counts in section headers
   - Recalculate critical path when dependencies change

7. Optimistic updates:
   - Mark task done: Update UI immediately
   - Send API request in background
   - Revert if API call fails (show error toast)

OUTPUT: TaskBreakdown.tsx fully integrated with event tasks
```

**Acceptance Criteria:**
- [ ] Tasks grouped correctly by category and status
- [ ] Critical path tasks highlighted
- [ ] Mark complete works with optimistic update
- [ ] Real-time updates move tasks between sections

---

### Prompt 3.4: Build AI Insights Panel with Gemini Integration

**Tool:** Cursor AI  
**Time:** 2 hours  
**Reference:** Task 01, Section 16 "AI Functions"

**Prompt:**
```
Integrate AI Insights Panel with Gemini edge function:

Component: AIInsightsPanel.tsx

Data fetching:
1. On component mount:
   - Check if risks exist in database (event_risks table)
   - If risks < 1 hour old: Display cached risks
   - If risks > 1 hour old OR none: Trigger edge function

2. Call edge function:
   - POST /api/analyze-event-risks
   - Body: { eventId }
   - Show loading spinner while waiting (5-15 seconds)

3. Handle response:
   - Success: Display top 3 risks as insight cards
   - Error: Show fallback message with retry button
   - Empty (no risks): Show "All clear" message

Insight card rendering:
- Map risk severity to colors:
  - critical: Red (#EF4444)
  - high: Yellow (#F59E0B)
  - medium: Blue (#3B82F6)
  - low: Gray (#6B7280)

- Display fields:
  - severity badge (top left)
  - title (18px font, 2 lines max)
  - description (14px font, 4 lines with ellipsis)
  - impact label with icon
  - urgency label with clock icon
  - Primary CTA button (full width)
  - Secondary action link

CTA button actions:
- Based on risk category:
  - tasks: Navigate to /events/:id/tasks?filter=overdue
  - budget: Navigate to /events/:id/budget
  - staffing: Navigate to /events/:id/team
  - contracts: Navigate to /events/:id/contracts
  - weather: Show weather contingency modal

Expand/collapse:
- Click card: Expand to show full description
- Expanded view shows:
  - Full description (no truncation)
  - Recommended actions (bullet list)
  - Dismiss button (marks risk as acknowledged)

Refresh:
- Refresh button in panel header
- Calls edge function again (bypasses cache)
- Shows loading spinner during refresh

Real-time alerts:
- Subscribe to event_risks inserts
- When new risk detected: Show toast notification
- Animate new card sliding in

OUTPUT: AIInsightsPanel.tsx with Gemini integration
```

**Acceptance Criteria:**
- [ ] Risks fetch from Gemini edge function
- [ ] Cards display with correct severity colors
- [ ] CTA buttons navigate to relevant screens
- [ ] Expand/collapse animation smooth
- [ ] Refresh button triggers new analysis

---

### Prompt 3.5: Implement Activity Feed Real-Time Updates

**Tool:** Cursor AI  
**Time:** 1 hour  
**Reference:** Task 01, Section 11 "Mermaid Diagrams"

**Prompt:**
```
Build real-time activity feed with auto-scroll:

Component: ActivityFeed.tsx

Data source:
- Initial load: GET /api/events/:id/activities (last 50)
- Real-time: Subscribe to activity_logs inserts

Display logic:
1. Render activity items (reverse chronological)
2. Each item shows:
   - User avatar (40px, left)
   - Action description (middle, 2 lines max)
   - Timestamp (relative, right, gray)
   - Divider line below

3. Activity type formatting:
   - task_completed: Green checkmark icon, bold task name
   - file_uploaded: Blue upload icon, clickable filename
   - comment_added: Chat bubble icon, preview first 50 chars
   - task_assigned: User icon, show assignee name
   - ai_action: Gemini sparkle icon, red/yellow based on severity

4. Interactive elements:
   - Click task name: Opens task detail modal
   - Click filename: Downloads file
   - Click user name: Shows user profile tooltip
   - @mentions: Highlight in blue, bold

Auto-scroll behavior:
1. New activity arrives via real-time
2. If user scrolled to top: Auto-scroll to show new item
3. If user scrolled down: Don't auto-scroll (add "New Activity" badge at top)
4. Click badge: Smooth scroll to top

Infinite scroll:
- Load more when scrolled to bottom
- Fetch next 50 activities
- Show loading spinner at bottom
- Stop when all activities loaded

Filters:
- Dropdown: "All Activity" | "My Tasks" | "Mentions"
- Filter client-side (all data already loaded)
- Update count badge on filter dropdown

Responsive:
- Desktop: Fixed sidebar (320px wide)
- Tablet: Collapsible overlay
- Mobile: Bottom drawer (swipe up to open)

OUTPUT: ActivityFeed.tsx with real-time subscription
```

**Acceptance Criteria:**
- [ ] Activities display in reverse chronological order
- [ ] Real-time updates appear instantly
- [ ] Auto-scroll works when at top
- [ ] Infinite scroll loads more activities
- [ ] Filters work correctly

---

### Prompt 3.6: Add Navigation and Routing

**Tool:** Cursor AI  
**Time:** 45 minutes  
**Reference:** Task 01, Section 7 "Routes & Navigation"

**Prompt:**
```
Setup navigation and routes for Event Command Center:

Routes to create:
1. /events/:id - Event Command Center (main page)
2. /events/:id/edit - Edit event details
3. /events/:id/tasks - Full task management page
4. /events/:id/budget - Budget breakdown
5. /events/:id/team - Team management
6. /events/:id/sponsors - Event-specific sponsor list
7. /events/:id/analytics - ROI analytics
8. /events/:id/critical-path - Dependency graph visualization

Navigation components:

BREADCRUMB (top of page):
- Format: Events > [Event Name] > [Section]
- Clickable: Each segment navigates
- Truncate event name if too long (max 40 chars)

QUICK ACTIONS MENU (header right):
- Hamburger icon (mobile only)
- Dropdown menu with links:
  - View Tasks
  - Manage Budget
  - Team Settings
  - Export Report
  - Archive Event

SECTION NAVIGATION:
- Click KPI card: Navigate to relevant section
  - Progress card → /events/:id
  - Tasks card → /events/:id/tasks
  - Sponsors card → /events/:id/sponsors
  - Budget card → /events/:id/budget
  - Deliverables card → /events/:id/deliverables

- Click AI insight CTA: Navigate based on risk category
  - Task risk → /events/:id/tasks?filter=overdue
  - Budget risk → /events/:id/budget?alert=variance

BACK BUTTON:
- Always visible (top left)
- Returns to: /events (events list)
- Confirm if unsaved changes

URL parameters:
- Support filters in URL query params
- Example: /events/abc123/tasks?status=overdue&phase=venue_logistics
- Persist filters across navigation

Deep linking:
- Share links to specific sections
- Example: /events/abc123?highlight=budget
- Scroll to highlighted section on load

OUTPUT: Complete routing setup with navigation components
```

**Acceptance Criteria:**
- [ ] All routes navigate correctly
- [ ] Breadcrumb shows current location
- [ ] URL parameters work for filters
- [ ] Deep links scroll to correct section
- [ ] Back button returns to events list

---

### Prompt 3.7: Add Error Handling and Edge Cases

**Tool:** Cursor AI  
**Time:** 1 hour  
**Reference:** Task 01, Section 14 "Troubleshooting"

**Prompt:**
```
Implement error handling for Event Command Center:

Error scenarios to handle:

1. EVENT NOT FOUND (404):
   - API returns 404
   - Show: Full-screen error state
   - Message: "Event not found. It may have been deleted or archived."
   - CTA: "Return to Events List" button
   - Don't show Command Center layout

2. ACCESS DENIED (403):
   - User not on event team
   - Show: Permission error state
   - Message: "You don't have access to this event. Contact the event organizer to request access."
   - CTA: "Return to Events List"

3. API TIMEOUT (500):
   - Request takes >30 seconds
   - Show: Loading skeleton with error overlay
   - Message: "Taking longer than usual. Retrying..."
   - Auto-retry: 3 attempts with exponential backoff (5s, 10s, 20s)
   - After 3 failures: Show error with manual retry button

4. NETWORK OFFLINE:
   - Detect: navigator.onLine = false
   - Show: Yellow banner at top
   - Message: "You're offline. Changes will sync when connection restored."
   - Queue changes: Save to localStorage
   - When online: Replay queued changes

5. REAL-TIME DISCONNECT:
   - WebSocket connection drops
   - Show: Red dot in header (connection status)
   - Auto-reconnect: Exponential backoff
   - When reconnected: Fetch latest data (may have missed updates)

6. GEMINI API FAILURE:
   - Edge function returns error
   - Show: AI Insights Panel with fallback
   - Message: "AI insights temporarily unavailable. Showing rule-based analysis."
   - Fallback logic:
     - Check overdue tasks (simple count)
     - Check budget variance (math only)
     - Show basic alerts without AI descriptions

7. DATA INCONSISTENCY:
   - Progress % doesn't match task count
   - Show: Warning banner
   - Message: "Data mismatch detected. Recalculating..."
   - Action: Call recalculate_event_progress function
   - Hide banner when resolved

8. EMPTY STATES:
   - No tasks: "No tasks yet. Create tasks via Event Wizard or manually."
   - No sponsors: "No sponsors added. Add sponsors to track ROI."
   - No activity: "No activity yet. Actions will appear here."
   - No AI insights: "All clear! No critical issues detected."

Logging:
- Send errors to monitoring service (Sentry)
- Include: User ID, Event ID, Error type, Stack trace
- Rate limit: Max 10 errors per minute (prevent spam)

User feedback:
- Toast notifications for non-critical errors
- Modal for critical errors (blocking actions)
- Inline messages for field-level errors

OUTPUT: Comprehensive error handling system
```

**Acceptance Criteria:**
- [ ] All error scenarios handled gracefully
- [ ] User sees helpful error messages
- [ ] Auto-retry works for transient errors
- [ ] Offline mode queues changes
- [ ] Errors logged to monitoring

---

## PHASE 4: TESTING & VALIDATION (CURSOR AI - 4 PROMPTS)

### Prompt 4.1: Create Integration Tests

**Tool:** Cursor AI  
**Time:** 1.5 hours  
**Reference:** Task 01, Section 13 "Acceptance Tests"

**Prompt:**
```
Write integration tests for Event Command Center:

Test framework: Vitest + React Testing Library

Test file: /tests/EventCommandCenter.test.tsx

Test Suite 1: Data Loading
- Test: Fetches event data on mount
  - Mock API: GET /api/events/:id returns sample event
  - Assert: Component renders all sections
  - Assert: KPI cards show correct values

- Test: Handles 404 error
  - Mock API: Returns 404
  - Assert: Error state displays
  - Assert: "Event not found" message shown

- Test: Handles loading state
  - Mock API: Delayed response (3 seconds)
  - Assert: Loading skeletons visible
  - Assert: Real content appears after load

Test Suite 2: Real-Time Updates
- Test: Task completion updates progress
  - Setup: Render component with initial data
  - Action: Simulate real-time message (task marked done)
  - Assert: Progress KPI updates (45% → 46%)
  - Assert: Tasks KPI updates (68 → 69 done)
  - Assert: Activity feed shows new entry

- Test: Activity feed auto-scrolls
  - Setup: Activity feed scrolled to top
  - Action: New activity arrives
  - Assert: Feed scrolls to show new item
  - Assert: New item appears at top of list

Test Suite 3: User Interactions
- Test: Clicking KPI card navigates
  - Action: Click "Tasks" KPI card
  - Assert: Navigates to /events/:id/tasks

- Test: Marking task complete
  - Action: Click checkmark on task card
  - Assert: Optimistic update (UI changes immediately)
  - Assert: API called PUT /api/tasks/:id
  - Assert: Success toast shown

- Test: Expanding AI insight
  - Setup: AI insights panel with 3 cards
  - Action: Click insight card to expand
  - Assert: Card height animates
  - Assert: Full description visible
  - Assert: Recommended actions list shown

Test Suite 4: Responsive Behavior
- Test: Mobile layout stacks vertically
  - Setup: Set viewport to 375px width
  - Assert: KPI cards in single column
  - Assert: Activity feed becomes bottom drawer
  - Assert: Timeline vertical (not horizontal)

Test Suite 5: Performance
- Test: Page loads in <2 seconds
  - Setup: Mock API with realistic delay (500ms)
  - Assert: Time to interactive <2000ms
  - Assert: All critical content visible

- Test: Handles 150 tasks without lag
  - Setup: Mock 150 tasks in task breakdown
  - Action: Switch between tabs
  - Assert: Tab switch <100ms
  - Assert: No frame drops (60fps)

OUTPUT: Comprehensive test suite with 15+ tests
```

**Acceptance Criteria:**
- [ ] All tests pass
- [ ] Coverage >80% for Command Center
- [ ] Tests run in <30 seconds
- [ ] CI/CD integration works

---

### Prompt 4.2: Performance Optimization

**Tool:** Cursor AI  
**Time:** 1 hour  
**Reference:** Task 01, Section 15 "Production Checklist"

**Prompt:**
```
Optimize Event Command Center performance:

Optimization 1: Lazy Loading
- Lazy load sections below fold:
  - AIInsightsPanel (bottom of page)
  - ActivityFeed (sidebar, not critical)
- Use React.lazy + Suspense
- Show loading skeleton while loading

Optimization 2: Memoization
- Memoize expensive calculations:
  - Progress percentage calculation
  - Task grouping by status/phase
  - Budget variance calculations
- Use React.useMemo with correct dependencies

Optimization 3: Virtual Scrolling
- Implement for long lists (>50 items):
  - Task list (if >100 tasks)
  - Activity feed (if >100 activities)
- Use react-window library
- Render only visible items + buffer

Optimization 4: Debouncing
- Debounce filter changes:
  - Task search input: 300ms
  - Activity feed filter: 300ms
- Use useDebounce hook
- Show loading indicator during debounce

Optimization 5: Image Optimization
- User avatars: Lazy load with Intersection Observer
- Use next/image for automatic optimization
- Provide placeholder (blur hash)
- Sizes: 32px (activity feed), 40px (task cards)

Optimization 6: Code Splitting
- Split by route:
  - Command Center chunk
  - Task management chunk
  - Budget chunk
- Prefetch next likely route (predict user behavior)

Optimization 7: API Response Caching
- Cache event data for 5 minutes
- Use SWR (stale-while-revalidate)
- Revalidate on focus/reconnect
- Clear cache when data changes

Optimization 8: Bundle Size
- Tree-shake unused Recharts components
- Use dynamic imports for heavy libraries
- Target bundle size: <300KB initial load

Monitoring:
- Add performance marks:
  - mark('command-center-start')
  - mark('command-center-loaded')
  - measure('command-center-load-time')
- Send to analytics
- Alert if load time >3 seconds

OUTPUT: Optimized EventCommandCenter.tsx with performance improvements
```

**Acceptance Criteria:**
- [ ] Initial load <2 seconds
- [ ] Bundle size <300KB
- [ ] 60fps scrolling (no jank)
- [ ] Lighthouse score >90

---

### Prompt 4.3: Accessibility (A11y) Compliance

**Tool:** Cursor AI  
**Time:** 1 hour  
**Reference:** Task 01, Section 15 "Production Checklist"

**Prompt:**
```
Make Event Command Center WCAG 2.1 AA compliant:

Keyboard Navigation:
- All interactive elements focusable (Tab key)
- Focus order logical (top to bottom, left to right)
- Focus visible (blue outline, 2px)
- Escape key: Close modals/drawers
- Enter/Space: Activate buttons
- Arrow keys: Navigate tabs

Screen Reader Support:
- Add ARIA labels to all icons:
  - aria-label="Edit event"
  - aria-label="Progress: 45%"
- Add ARIA live regions for dynamic updates:
  - aria-live="polite" on activity feed
  - aria-live="assertive" on critical alerts
- Add ARIA landmarks:
  - role="main" on Command Center container
  - role="complementary" on Activity Feed
  - role="region" on AI Insights Panel

Semantic HTML:
- Use proper heading hierarchy (h1 → h2 → h3)
- Use <button> for actions (not <div onclick>)
- Use <nav> for breadcrumb
- Use <article> for task cards

Color Contrast:
- Check all text against backgrounds:
  - Normal text: 4.5:1 ratio minimum
  - Large text (18px+): 3:1 ratio
- Tool: Contrast checker (WebAIM)
- Fix low-contrast text (gray-400 → gray-600)

Focus Management:
- Trap focus in modals (Tab cycles within modal)
- Return focus after modal close (to trigger button)
- Skip to main content link (for screen readers)

Reduced Motion:
- Respect prefers-reduced-motion:
  - Disable animations if user preference set
  - Replace with instant state changes
  - Keep critical animations (loading spinners)

Form Accessibility:
- Labels for all inputs (visible or aria-label)
- Error messages associated with inputs (aria-describedby)
- Required fields marked (aria-required)
- Autocomplete attributes where appropriate

Testing:
- Lighthouse accessibility audit (target: 100 score)
- Screen reader test (VoiceOver on Mac, NVDA on Windows)
- Keyboard-only navigation test
- Color blindness simulation (use browser extension)

OUTPUT: Fully accessible EventCommandCenter.tsx
```

**Acceptance Criteria:**
- [ ] Lighthouse accessibility score 100
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader announces changes correctly
- [ ] Color contrast ratios meet WCAG AA

---

### Prompt 4.4: Final Production Checklist

**Tool:** Cursor AI  
**Time:** 30 minutes  
**Reference:** Task 01, Section 15 "Production Checklist"

**Prompt:**
```
Create pre-deployment checklist for Event Command Center:

Code Quality:
- [ ] No console.log statements (remove or use logger)
- [ ] No TODO comments (convert to tickets)
- [ ] All TypeScript errors resolved
- [ ] ESLint passes (0 warnings)
- [ ] Prettier formatting applied

Functionality:
- [ ] All user journeys complete end-to-end
- [ ] No 404 errors on navigation
- [ ] All API calls handle errors gracefully
- [ ] Real-time updates work (tested with 2+ users)
- [ ] Offline mode queues changes correctly

Performance:
- [ ] Initial load <2 seconds (tested on 3G)
- [ ] No memory leaks (tested 30-minute session)
- [ ] Lighthouse score >90 (all categories)
- [ ] Bundle size <300KB (gzipped)

Security:
- [ ] API endpoints require authentication
- [ ] RLS policies prevent unauthorized data access
- [ ] No sensitive data in client logs
- [ ] XSS vulnerabilities checked (sanitize user input)
- [ ] CSRF protection enabled

Data:
- [ ] Database migrations run without errors
- [ ] Sample data created for testing
- [ ] Data validation prevents invalid states
- [ ] Progress calculation always accurate

Mobile:
- [ ] Works on iOS Safari (iPhone 12+)
- [ ] Works on Android Chrome (Pixel 5+)
- [ ] Touch targets >44px
- [ ] No horizontal scroll
- [ ] All modals/drawers closable on mobile

Browser Support:
- [ ] Chrome (last 2 versions)
- [ ] Firefox (last 2 versions)
- [ ] Safari (last 2 versions)
- [ ] Edge (last 2 versions)

Monitoring:
- [ ] Error tracking enabled (Sentry)
- [ ] Analytics tracking events sent
- [ ] Performance monitoring (Web Vitals)
- [ ] Uptime monitoring (Pingdom/UptimeRobot)

Documentation:
- [ ] README updated with setup instructions
- [ ] API endpoints documented
- [ ] Component props documented (JSDoc)
- [ ] Troubleshooting guide created

Deployment:
- [ ] Environment variables set in production
- [ ] Supabase Edge Functions deployed
- [ ] Database backups enabled
- [ ] CDN caching configured
- [ ] SSL certificate valid

OUTPUT: Checklist with all items verified before launch
```

**Acceptance Criteria:**
- [ ] All checklist items marked complete
- [ ] No critical issues in production
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured

---

## 📋 IMPLEMENTATION SEQUENCE

**Day 1-2 (Design Phase):**
1. Execute Prompts 1.1-1.8 (Figma Make)
2. Validate all components render correctly
3. Conduct design review with stakeholders

**Day 3-4 (Backend Phase):**
1. Execute Prompts 2.1-2.6 (Cursor AI)
2. Test all API endpoints with Postman
3. Verify real-time subscriptions work

**Day 5-6 (Frontend Integration):**
1. Execute Prompts 3.1-3.7 (Cursor AI)
2. Connect UI to backend APIs
3. Test user journeys end-to-end

**Day 7 (Testing & Launch):**
1. Execute Prompts 4.1-4.4 (Cursor AI)
2. Run full test suite
3. Deploy to production

---

## ✅ VALIDATION CRITERIA

**After each prompt, verify:**
- [ ] Output matches acceptance criteria
- [ ] No errors in console/terminal
- [ ] Component renders on all devices
- [ ] Performance acceptable (<2s load)
- [ ] Accessibility score >90

**Mark complete only when all criteria met.**

---

**End of Implementation Prompt List**  
*Total Time Estimate: 12-16 hours*  
*25 Prompts: 8 Design + 17 Development*  
*Reference: /docs/events/tasks/01-Event-Command-Center.md for detailed specs*