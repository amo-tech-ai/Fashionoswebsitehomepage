# 🚀 Events Module - Systematic Implementation Plan

**Status:** 52% Complete → Target: 100% Production Ready  
**Priority:** P0 - CRITICAL PATH  
**Timeline:** 4-6 weeks (systematic, no breaking changes)

---

## 📊 CURRENT STATE ANALYSIS

### ✅ WHAT EXISTS (52% Complete)

**Frontend UI Components (60%):**
- ✅ Events list page (`/Events.tsx`)
- ✅ Event detail page (`/EventDetail.tsx`)
- ✅ Event Creation Wizard (`/components/wizards/EventCreationWizard.tsx`)
- ✅ Sponsor CRM (`/components/dashboards/SponsorCRM.tsx`)
- ✅ Designer Directory (`/components/designers/DesignerDirectory.tsx`)
- ✅ Tasks & Deliverables (`/components/dashboards/TasksAndDeliverables.tsx`)
- ✅ Venue Management (`/components/dashboards/VenueManagement.tsx`)
- ✅ ROI Analytics (`/components/dashboards/ROIAnalytics.tsx`)

**AI Logic Components (39%):**
- ✅ EventsKit (`/components/assistant/kits/EventsKit.tsx`)
- ✅ EventsSkill (`/components/assistant/skills/EventsSkill.ts`)
- ✅ ProactiveRiskAlerts (`/components/assistant/automations/ProactiveRiskAlerts.ts`)
- ✅ AgentOrchestrator (`/components/assistant/skills/AgentOrchestrator.ts`)

**Documentation (100%):**
- ✅ All 6 task implementation guides
- ✅ Master Progress Tracker
- ✅ Complete PRD with use cases

### 🔴 CRITICAL GAPS (48% Missing)

**Backend Infrastructure (0%):**
- ❌ No Supabase database tables
- ❌ No API routes
- ❌ No real-time subscriptions
- ❌ No file storage setup
- ❌ No authentication/RLS policies

**Core Dashboard (0%):**
- ❌ Event Command Center does NOT exist
- ❌ No KPI cards component
- ❌ No 5-phase timeline
- ❌ No AI insights panel
- ❌ No activity feed

**Integration Gaps (40%):**
- ❌ Gemini API not connected
- ❌ Tasks not linked to events
- ❌ No real-time sync
- ❌ Wizard doesn't save data
- ❌ No Google Maps integration

---

## 🎯 SYSTEMATIC IMPLEMENTATION ROADMAP

### PHASE 1: FOUNDATION (Week 1) - P0 CRITICAL

**Goal:** Create Event Command Center + Database Foundation  
**Completion Target:** 52% → 70%

#### Step 1.1: Create Event Command Center Dashboard (Day 1-2, 12h)

**Files to Create:**
1. `/components/dashboards/EventCommandCenter.tsx` (main container)
2. `/components/events/EventHeader.tsx` (header with countdown)
3. `/components/events/KPICardsGrid.tsx` (6 KPI cards)
4. `/components/events/WorkflowTimeline.tsx` (5-phase progress)
5. `/components/events/AIInsightsPanel.tsx` (risk alerts)
6. `/components/events/ActivityFeed.tsx` (team updates)

**Component Architecture:**

```
EventCommandCenter/
├── EventHeader (sticky top)
│   ├── Event name + status badge
│   ├── Countdown timer (circular progress)
│   └── Quick actions (Edit, Share, Export, Archive)
├── KPICardsGrid (3×2 grid)
│   ├── Event Progress (percentage + trend)
│   ├── Tasks (done/total + breakdown)
│   ├── Sponsors (count + $ value)
│   ├── Attendees (registered/target)
│   ├── Budget (% used + gauge)
│   └── Deliverables (complete/total)
├── WorkflowTimeline (horizontal)
│   ├── Pre-Production (60-90 days before)
│   ├── Venue & Logistics (30-60 days)
│   ├── Creative Design (15-30 days)
│   ├── On-Site Operations (1-7 days + event day)
│   └── Post-Event (after completion)
├── TaskBreakdown (tabs + collapsible sections)
│   ├── Event Planning tab
│   ├── Sponsorship tab
│   ├── Marketing tab
│   ├── Operations tab
│   └── Media tab
├── AIInsightsPanel (bottom, 3 cards)
│   ├── Critical risk card (red)
│   ├── Warning card (yellow)
│   └── Suggestion card (blue)
└── ActivityFeed (right sidebar)
    └── Real-time team actions
```

**Acceptance Criteria:**
- [ ] All sections render without errors
- [ ] Layout responsive (desktop/tablet/mobile)
- [ ] Navigation routes work
- [ ] Mock data displays correctly
- [ ] Loading states implemented

---

#### Step 1.2: Setup Supabase Database Schema (Day 3, 8h)

**Tables to Create:**

**1. events** (core table)
```sql
id: uuid (PK)
name: text (event name)
type: text (runway_show | brand_activation | pop_up | trunk_show | etc.)
description: text
start_date: timestamptz
end_date: timestamptz
status: text (draft | planning | confirmed | in_progress | completed | archived)
progress_percentage: integer (0-100)
venue_id: uuid (FK → venues)
budget_total: decimal
budget_actual: decimal
attendee_target: integer
attendee_registered: integer
created_by: uuid (FK → auth.users)
created_at: timestamptz
updated_at: timestamptz
```

**2. event_tasks** (linked to events)
```sql
id: uuid (PK)
event_id: uuid (FK → events, cascade delete)
title: text
description: text
status: text (to_do | in_progress | done | cancelled)
priority: text (critical | high | medium | low)
workflow_category: text (event_planning | sponsorship | marketing | operations | media)
workflow_phase: text (pre_production | venue_logistics | creative_design | on_site | post_event)
assigned_to: uuid (FK → auth.users)
deadline: timestamptz
is_critical_path: boolean
dependency_task_ids: uuid[] (array of task IDs)
completed_at: timestamptz
created_at: timestamptz
```

**3. event_team** (team assignments)
```sql
id: uuid (PK)
event_id: uuid (FK → events)
user_id: uuid (FK → auth.users)
role: text (event_lead | creative_director | production_manager | etc.)
permissions: text (admin | edit | view_only)
assigned_at: timestamptz
```

**4. event_sponsors** (sponsor relationships)
```sql
id: uuid (PK)
event_id: uuid (FK → events)
company_name: text
tier: text (platinum | gold | silver | bronze)
amount: decimal
status: text (prospecting | negotiating | confirmed | fulfilled)
contract_signed_at: timestamptz
deliverables_required: jsonb
created_at: timestamptz
```

**5. event_budget_categories** (budget tracking)
```sql
id: uuid (PK)
event_id: uuid (FK → events)
category: text (venue | catering | av_tech | marketing | staff | etc.)
budgeted: decimal
actual: decimal
notes: text
updated_at: timestamptz
```

**6. event_risks** (AI-generated risks)
```sql
id: uuid (PK)
event_id: uuid (FK → events)
severity: text (critical | high | medium | low)
category: text (tasks | budget | staffing | contracts | venue | weather)
title: text (60 chars max)
description: text
impact: text
urgency: text (now | 3_days | 7_days)
recommended_actions: jsonb (array of strings)
risk_score: integer (0-100)
acknowledged_at: timestamptz
resolved_at: timestamptz
generated_at: timestamptz
```

**7. activity_logs** (team activity feed)
```sql
id: uuid (PK)
event_id: uuid (FK → events)
user_id: uuid (FK → auth.users)
action_type: text (task_completed | file_uploaded | comment_added | task_assigned | ai_action)
description: text (auto-generated)
metadata: jsonb
created_at: timestamptz
```

**8-12. Additional Tables:**
- `venues` (venue catalog)
- `venue_bookings` (event venue bookings)
- `designers` (designer directory)
- `event_designers` (designers linked to events)
- `deliverables` (media deliverables tracking)

**RLS Policies:**
- Users can SELECT events they created OR are team members of
- Users can UPDATE only events with admin permissions
- Event leads can DELETE (archive) their events

**Database Functions:**
- `recalculate_event_progress(event_id)` - auto-calc progress from tasks
- `log_activity(event_id, user_id, action_type, metadata)` - log team actions

**Acceptance Criteria:**
- [ ] All 12 tables created
- [ ] Foreign keys enforced
- [ ] RLS policies active
- [ ] Triggers working (progress auto-calc)
- [ ] Test data inserted (3 sample events)

---

### PHASE 2: BACKEND WIRING (Week 2) - P0 CRITICAL

**Goal:** Connect UI to Database + API Routes  
**Completion Target:** 70% → 85%

#### Step 2.1: Create API Routes (Day 4-5, 12h)

**Routes to Create:**

**1. GET /api/events** (list events)
- Returns: Array of events for current user
- Filters: status, type, date_range
- Pagination: limit, offset
- Joins: venue name, team count, progress %

**2. GET /api/events/:id** (single event detail)
- Returns: Full event object with:
  - Event data
  - Venue details
  - Team members
  - Tasks summary (by phase and status)
  - Sponsors list
  - Budget breakdown
  - Activity feed (last 20)
- Used by: Event Command Center

**3. POST /api/events** (create event)
- Input: Event Creation Wizard form data
- Logic:
  - Insert into events table
  - Create budget categories (7 default)
  - Assign creator as event_lead
  - Trigger AI task generation (optional)
- Returns: New event ID + redirect URL

**4. PUT /api/events/:id** (update event)
- Input: Partial event object
- Logic: Update fields, track changes in activity log
- Returns: Updated event

**5. DELETE /api/events/:id** (archive event)
- Logic: Set status = 'archived' (soft delete)
- Returns: Success message

**6. GET /api/events/:id/tasks** (event tasks)
- Returns: All tasks for event
- Filters: status, priority, workflow_category, assigned_to
- Includes: Critical path flag

**7. POST /api/events/:id/tasks** (create task)
- Input: Task object
- Logic: Insert, trigger progress recalc
- Returns: New task

**8. PUT /api/tasks/:id** (update task)
- Input: Task fields (especially status)
- Logic:
  - Update task
  - Recalculate event progress
  - Log activity
  - Check for critical path changes
- Returns: Updated task

**9. POST /api/events/:id/generate-tasks** (AI task generation)
- Input: Event details
- Logic:
  - Call Gemini API with event context
  - Generate 80-150 tasks across 5 phases
  - Insert bulk into event_tasks
  - Calculate dependencies (critical path)
- Returns: Task count generated

**10. GET /api/events/:id/risks** (AI risk analysis)
- Logic:
  - Fetch event + tasks + budget + team
  - Call Gemini Thinking for analysis
  - Return top 3 risks with recommendations
- Returns: Array of risk objects

**Acceptance Criteria:**
- [ ] All 10 routes created and tested
- [ ] Auth checks enforced (JWT verification)
- [ ] Error handling (400, 401, 403, 404, 500)
- [ ] Response times <500ms
- [ ] Postman collection created

---

#### Step 2.2: Setup Real-Time Subscriptions (Day 6, 6h)

**Real-Time Channels:**

**1. Task Updates Channel**
- Subscribe to: event_tasks (INSERT, UPDATE, DELETE)
- Filter: WHERE event_id = :id
- Use case: Multi-user task management
- Updates: KPI cards, task breakdown, progress %

**2. Activity Feed Channel**
- Subscribe to: activity_logs (INSERT)
- Filter: WHERE event_id = :id
- Use case: Team activity feed auto-scroll
- Updates: Activity sidebar

**3. Budget Updates Channel**
- Subscribe to: event_budget_categories (UPDATE)
- Filter: WHERE event_id = :id
- Use case: Budget variance alerts
- Updates: Budget KPI card

**React Hook:** `useEventRealTime(eventId)`
```typescript
const { tasks, activityFeed, budget, connectionStatus } = useEventRealTime(eventId);
```

**Acceptance Criteria:**
- [ ] WebSocket connection stable
- [ ] Updates arrive within 1 second
- [ ] Auto-reconnect works
- [ ] No duplicate messages
- [ ] Connection status indicator

---

### PHASE 3: AI INTEGRATION (Week 3) - P1 HIGH

**Goal:** Connect Gemini API for Intelligent Features  
**Completion Target:** 85% → 95%

#### Step 3.1: Gemini Edge Functions (Day 7-9, 16h)

**Edge Function 1: generate-event-tasks**
- Input: { eventId, eventType, startDate, budget, teamSize }
- Gemini Feature: Text Generation + Code Execution
- Logic:
  1. Analyze event parameters
  2. Generate 80-150 tasks across 5 workflow phases
  3. Calculate dependencies (critical path)
  4. Assign priorities and deadlines
- Output: Array of task objects (bulk insert)

**Edge Function 2: analyze-event-risks**
- Input: { eventId }
- Gemini Feature: Gemini Thinking + Function Calling
- Logic:
  1. Fetch event data (tasks, budget, team, contracts)
  2. Ask Gemini to identify top 3 risks
  3. Calculate risk scores (0-100)
  4. Generate recommended actions
- Output: Array of 3 risk objects

**Edge Function 3: match-sponsors**
- Input: { eventId, eventType, audienceDemographics }
- Gemini Feature: Deep Research + Grounding (Search)
- Logic:
  1. Search for relevant sponsors in database
  2. Use Gemini to analyze brand alignment
  3. Calculate match scores
  4. Return top 10 sponsor recommendations
- Output: Array of sponsor matches with scores

**Edge Function 4: match-designers**
- Input: { eventId, eventStyle, budgetRange }
- Gemini Feature: Text Generation + Search
- Logic:
  1. Search designer directory
  2. Analyze portfolio fit
  3. Match aesthetic to event
  4. Return top 10 designer recommendations
- Output: Array of designer matches

**Edge Function 5: critical-path-analyzer**
- Input: { eventId }
- Gemini Feature: Gemini Thinking + Code Execution
- Logic:
  1. Fetch all tasks with dependencies
  2. Build dependency graph
  3. Calculate critical path (longest chain)
  4. Identify bottlenecks
  5. Predict event completion date
- Output: { criticalPathTasks, bottlenecks, predictedCompletion }

**Edge Function 6: proactive-risk-scanner** (cron job)
- Schedule: Daily at 8:00 AM
- Gemini Feature: Gemini Thinking
- Logic:
  1. Scan all active events
  2. Check for: overdue tasks, budget variance, staffing gaps, weather risks
  3. Generate alert if risk detected
  4. Send email/notification
- Output: Risk alerts inserted into event_risks table

**Acceptance Criteria:**
- [ ] All 6 edge functions deployed
- [ ] Gemini API key configured
- [ ] Response times <15 seconds
- [ ] Error handling (retry 3x)
- [ ] Logs sent to monitoring

---

#### Step 3.2: Integrate AI into UI (Day 10-11, 8h)

**AI Integration Points:**

**1. Event Creation Wizard**
- After Step 1 (Basic Info):
  - Show "Generate Tasks with AI" button
  - Call `generate-event-tasks` edge function
  - Display loading spinner (5-10 seconds)
  - Show task count generated
  - Navigate to Command Center

**2. Event Command Center - AI Insights Panel**
- On page load:
  - Check if risks exist (< 1 hour old)
  - If not: Call `analyze-event-risks` edge function
  - Display top 3 risk cards
  - Refresh button: Manual trigger
  - Auto-refresh: Every 4 hours

**3. Sponsor CRM**
- "Find Sponsors" button:
  - Opens modal with event parameters
  - Calls `match-sponsors` edge function
  - Displays top 10 matches with scores
  - Click sponsor: Navigate to sponsor detail

**4. Designer Directory**
- "Recommend Designers" button:
  - Similar to sponsor matching
  - Calls `match-designers` edge function
  - Displays matches with aesthetic scores

**5. Tasks Detail Page**
- "Analyze Critical Path" button:
  - Calls `critical-path-analyzer` edge function
  - Highlights critical tasks in red
  - Shows predicted completion date
  - Displays dependency graph

**6. Proactive Alerts**
- Background process (cron):
  - Runs `proactive-risk-scanner` daily
  - Inserts alerts into database
  - Displays toast notification on login
  - Shows red badge on Command Center

**Acceptance Criteria:**
- [ ] All AI buttons trigger edge functions
- [ ] Loading states shown during API calls
- [ ] Results display correctly
- [ ] Error messages user-friendly
- [ ] AI features feel magical, not clunky

---

### PHASE 4: POLISH & PRODUCTION (Week 4) - P2 MEDIUM

**Goal:** Optimize, Test, Deploy  
**Completion Target:** 95% → 100%

#### Step 4.1: Connect Existing Components (Day 12-13, 8h)

**Integration Tasks:**

**1. Link Tasks to Events**
- Update `TasksAndDeliverables.tsx`:
  - Add `eventId` prop
  - Filter tasks: WHERE event_id = :id
  - Update task counts in tabs
  - Show event name in header breadcrumb

**2. Connect Wizard to API**
- Update `EventCreationWizard.tsx`:
  - On submit: Call POST /api/events
  - Save form data to database
  - Trigger AI task generation (optional)
  - Redirect to: /events/:id (Command Center)

**3. Wire KPI Cards to Live Data**
- Update `KPICardsGrid.tsx`:
  - Fetch from: GET /api/events/:id
  - Display real progress percentage
  - Calculate trends (week-over-week)
  - Navigate on click (to detail pages)

**4. Activity Feed Real-Time**
- Update `ActivityFeed.tsx`:
  - Subscribe to activity_logs channel
  - Auto-scroll on new activity
  - Format descriptions (templates)
  - Infinite scroll (load more)

**5. Sponsor/Designer CRM**
- Update `SponsorCRM.tsx` and `DesignerDirectory.tsx`:
  - Fetch from database (not mock data)
  - Add event filter dropdown
  - Show only sponsors/designers for this event

**6. Venue Management**
- Update `VenueManagement.tsx`:
  - Connect to venue_bookings table
  - Show events booked per venue
  - Calendar view with event names

**Acceptance Criteria:**
- [ ] All components use real data
- [ ] No hardcoded mock data
- [ ] Navigation flows complete
- [ ] Real-time updates work
- [ ] Filters functional

---

#### Step 4.2: Testing & QA (Day 14, 8h)

**Test Coverage:**

**1. Integration Tests**
- Test: Event creation → Command Center → Task completion
- Test: Real-time updates with 2 users
- Test: AI task generation (80-150 tasks)
- Test: Risk analysis returns 3 risks
- Test: Sponsor matching returns 10 results

**2. Performance Tests**
- Test: Page load <2 seconds (3G network)
- Test: 150 tasks render without lag
- Test: Real-time updates <1 second latency
- Test: API response times <500ms

**3. Accessibility Tests**
- Test: Keyboard navigation (Tab, Enter, Escape)
- Test: Screen reader (VoiceOver/NVDA)
- Test: Color contrast (WCAG AA)
- Test: Focus visible (blue outline)

**4. Mobile Tests**
- Test: iOS Safari (iPhone 12+)
- Test: Android Chrome (Pixel 5+)
- Test: Touch targets >44px
- Test: Bottom drawer gestures

**5. Error Handling Tests**
- Test: 404 event not found
- Test: 403 access denied
- Test: Network offline
- Test: Gemini API timeout
- Test: Database connection lost

**Acceptance Criteria:**
- [ ] All tests pass
- [ ] Coverage >80%
- [ ] No critical bugs
- [ ] Performance targets met
- [ ] Accessibility score 100

---

#### Step 4.3: Code Quality & Refactoring (Day 15, 6h)

**Refactoring Tasks:**

**1. Split Large Files**
- Split `EventCommandCenter.tsx` (if >500 lines)
  - Extract: `EventHeader.tsx`
  - Extract: `KPICardsGrid.tsx`
  - Extract: `WorkflowTimeline.tsx`
  - Extract: `AIInsightsPanel.tsx`

**2. Create Shared Hooks**
- `useEventData(eventId)` - fetch event + cache
- `useEventRealTime(eventId)` - real-time subscriptions
- `useEventTasks(eventId, filters)` - fetch tasks with filters
- `useGeminiEdgeFunction(functionName)` - call edge functions

**3. Create Type Definitions**
- `/types/events.types.ts` - Event, EventTask, EventTeam, etc.
- `/types/ai.types.ts` - Risk, Recommendation, etc.
- `/types/api.types.ts` - API request/response types

**4. Add Error Boundaries**
- Wrap Command Center in ErrorBoundary
- Show fallback UI on crashes
- Log errors to Sentry

**5. Optimize Bundle Size**
- Lazy load: AI Insights Panel
- Lazy load: Activity Feed
- Code split by route
- Tree-shake unused Recharts components

**Acceptance Criteria:**
- [ ] No files >500 lines
- [ ] All types defined
- [ ] Shared hooks created
- [ ] Error boundaries added
- [ ] Bundle size <300KB

---

#### Step 4.4: Production Deployment (Day 16, 4h)

**Deployment Checklist:**

**Environment Setup:**
- [ ] Supabase project created (production)
- [ ] Database migrations run
- [ ] RLS policies enabled
- [ ] Environment variables set:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `GEMINI_API_KEY`

**Edge Functions:**
- [ ] All 6 edge functions deployed to Supabase
- [ ] Cron job scheduled (daily 8am)
- [ ] Secrets configured (Gemini API key)
- [ ] Logs enabled (monitoring)

**Frontend:**
- [ ] Build passes (`npm run build`)
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Lighthouse score >90

**Database:**
- [ ] Sample data inserted (5 test events)
- [ ] Backups enabled (daily)
- [ ] Monitoring alerts set

**Monitoring:**
- [ ] Sentry error tracking
- [ ] Analytics (PostHog/Mixpanel)
- [ ] Uptime monitoring (Pingdom)
- [ ] Performance monitoring (Web Vitals)

**Documentation:**
- [ ] README updated
- [ ] API docs published
- [ ] User guide created
- [ ] Troubleshooting guide

**Acceptance Criteria:**
- [ ] All checklist items complete
- [ ] No P0/P1 bugs in production
- [ ] Monitoring alerts firing correctly
- [ ] Rollback plan documented

---

## 🧩 MODULAR CODE ARCHITECTURE

### Component File Structure

```
/components/
├── events/                          # Event-specific components
│   ├── EventCommandCenter.tsx       # Main dashboard container
│   ├── EventHeader.tsx              # Header with countdown
│   ├── KPICardsGrid.tsx             # 6 KPI cards
│   ├── KPICard.tsx                  # Reusable card component
│   ├── WorkflowTimeline.tsx         # 5-phase progress
│   ├── TaskBreakdown.tsx            # Tasks grouped by phase
│   ├── AIInsightsPanel.tsx          # AI risk alerts
│   ├── ActivityFeed.tsx             # Team activity sidebar
│   └── index.ts                     # Barrel exports
│
├── wizards/
│   └── EventCreationWizard.tsx      # Existing, wire to API
│
├── dashboards/
│   ├── TasksAndDeliverables.tsx     # Existing, add event filter
│   ├── SponsorCRM.tsx               # Existing, connect to DB
│   ├── VenueManagement.tsx          # Existing, connect to DB
│   └── ROIAnalytics.tsx             # Existing, add event filter
│
└── designers/
    ├── DesignerDirectory.tsx        # Existing, connect to DB
    └── DesignerProfile.tsx          # Existing, connect to DB
```

### Shared Utilities

```
/lib/
├── api/
│   ├── events.ts                    # Event API calls
│   ├── tasks.ts                     # Task API calls
│   ├── gemini.ts                    # Gemini edge function calls
│   └── realtime.ts                  # Real-time subscriptions
│
├── hooks/
│   ├── useEventData.ts              # Fetch + cache event
│   ├── useEventRealTime.ts          # Real-time updates
│   ├── useEventTasks.ts             # Fetch tasks with filters
│   └── useGeminiEdgeFunction.ts     # Call edge functions
│
└── types/
    ├── events.types.ts              # Event, EventTask, etc.
    ├── ai.types.ts                  # Risk, Recommendation
    └── api.types.ts                 # API request/response
```

### Database Edge Functions

```
/supabase/functions/
├── generate-event-tasks/
│   └── index.ts                     # AI task generation
├── analyze-event-risks/
│   └── index.ts                     # AI risk analysis
├── match-sponsors/
│   └── index.ts                     # Sponsor recommendations
├── match-designers/
│   └── index.ts                     # Designer recommendations
├── critical-path-analyzer/
│   └── index.ts                     # Critical path calculation
└── proactive-risk-scanner/
    └── index.ts                     # Daily cron job
```

---

## 📋 USER JOURNEYS & WORKFLOWS

### Journey 1: Create Event → View Command Center

**Steps:**
1. User clicks "Create Event" button on /events
2. EventCreationWizard opens (6 steps)
3. User fills: Basic Info → Budget → Venue → Sponsors → Timeline → Review
4. User clicks "Generate Tasks with AI" (optional)
5. Wizard calls POST /api/events → saves to database
6. AI generates 80-150 tasks (if enabled)
7. Redirect to /events/:id (Event Command Center)
8. Command Center loads:
   - Fetches event data (GET /api/events/:id)
   - Displays 6 KPI cards with real data
   - Shows 5-phase timeline with progress
   - AI Insights Panel analyzes risks (3 cards)
   - Activity feed shows creation activity
9. User sees complete dashboard, ready to manage event

**Expected Outcome:** New event created, command center displays all data, user can manage event.

---

### Journey 2: Manage Tasks → Complete Critical Path

**Steps:**
1. User opens Event Command Center (/events/:id)
2. Clicks "View Tasks" on Tasks KPI card
3. Navigates to TaskBreakdown section (or /events/:id/tasks)
4. Tasks grouped by workflow category (5 tabs)
5. User clicks "Event Planning" tab
6. Sees tasks grouped by status: Overdue (12) | In Progress (20) | Upcoming (50)
7. Critical path tasks highlighted in red with pulsing animation
8. User clicks checkmark on critical task "Finalize Venue Contract"
9. Optimistic update: Task moves to "Completed" section
10. API call: PUT /api/tasks/:id { status: 'done' }
11. Backend triggers:
    - Recalculate event progress (45% → 46%)
    - Log activity: "User completed 'Finalize Venue Contract'"
    - Check if dependent tasks unlock
12. Real-time updates broadcast:
    - Progress KPI updates to 46%
    - Activity feed shows new entry
    - Critical path recalculated (if dependencies changed)
13. User sees progress bar fill, activity logged

**Expected Outcome:** Task completed, progress updated, team notified via activity feed.

---

### Journey 3: AI Risk Detection → Take Action

**Steps:**
1. Background cron job runs daily at 8:00 AM
2. `proactive-risk-scanner` edge function executes
3. Scans all active events for risks:
   - Event "Fashion Week 2026" has 3 overdue critical tasks
   - Budget variance 15% over in "Catering" category
   - 2 required roles unassigned (photographer, videographer)
4. Gemini Thinking analyzes event data:
   - Risk 1 (Critical): "3 Critical Path Tasks Overdue"
   - Risk 2 (High): "Budget Exceeds Plan by $25K"
   - Risk 3 (Medium): "2 Key Roles Unassigned"
5. Risks inserted into event_risks table
6. User logs in at 9:00 AM
7. Toast notification: "New risk alert for Fashion Week 2026"
8. User opens Event Command Center
9. AI Insights Panel shows 3 risk cards
10. User clicks "View 3 Overdue Tasks" button (Critical risk)
11. Navigates to /events/:id/tasks?filter=overdue
12. Task list filtered to show only overdue tasks
13. User reassigns tasks to available team members
14. Tasks completed within 2 hours
15. Next day: Risk scanner runs again, critical risk resolved
16. AI Insights Panel shows "All clear!" message

**Expected Outcome:** Risks detected proactively, user takes action, crisis averted.

---

### Journey 4: Sponsor Matching with AI

**Steps:**
1. User creating new event "Sustainable Fashion Pop-up"
2. Completes Event Creation Wizard (Steps 1-3)
3. On Step 4 (Sponsors), clicks "Find Sponsors with AI"
4. Modal opens with event parameters:
   - Event type: Pop-up
   - Audience: Eco-conscious millennials
   - Budget: $50K
5. Calls `match-sponsors` edge function
6. Gemini searches sponsor database + web (Grounding)
7. Analyzes brand alignment:
   - Patagonia: 95% match (sustainability focus)
   - Everlane: 92% match (transparent supply chain)
   - Allbirds: 88% match (eco-friendly materials)
   - ... top 10 results
8. Modal displays sponsor cards with match scores
9. User clicks "Add Patagonia" button
10. Sponsor added to event_sponsors table (status: prospecting)
11. User sees sponsor in Step 4 list
12. Completes wizard, event created with pre-matched sponsors

**Expected Outcome:** AI recommends perfect sponsor matches, user adds them instantly.

---

### Journey 5: Real-Time Collaboration

**Steps:**
1. User A (Event Lead) opens Event Command Center
2. User B (Production Manager) opens same Command Center (different device)
3. Both subscribed to real-time channels:
   - event_tasks (task updates)
   - activity_logs (team feed)
4. User A marks task "Book DJ" as complete (checkmark click)
5. Task status updated in database
6. Real-time broadcast sent to all subscribers
7. User B's screen updates within 1 second:
   - Tasks KPI: 68/150 → 69/150
   - Activity feed: "User A completed 'Book DJ'"
   - Progress bar: 45% → 46%
8. User B clicks "Book DJ" task to see details
9. Sees completion timestamp + User A's name
10. User B adds comment: "Great! Let's confirm sound check time."
11. Comment logged to activity_logs
12. User A sees comment appear instantly in activity feed
13. Both users working in sync, no refresh needed

**Expected Outcome:** Multi-user collaboration feels seamless and instantaneous.

---

## 🤖 AI AGENTS & AUTOMATION LOGIC

### Agent 1: Task Generator

**Trigger:** User completes Event Creation Wizard, clicks "Generate Tasks"

**Input:**
- Event name, type, start date
- Budget total
- Team size
- Venue capacity

**Gemini Features:**
- Text Generation (task titles/descriptions)
- Code Execution (calculate dependencies)
- Structured Outputs (JSON task array)

**Logic:**
1. Analyze event parameters
2. Generate tasks for 5 workflow phases:
   - Pre-Production: 25-35 tasks (60-90 days before)
   - Venue & Logistics: 20-30 tasks (30-60 days)
   - Creative Design: 15-25 tasks (15-30 days)
   - On-Site Operations: 15-20 tasks (1-7 days)
   - Post-Event: 5-10 tasks (after completion)
3. Assign priorities (Critical, High, Medium, Low)
4. Calculate dependencies:
   - "Book venue" must complete before "Arrange catering"
   - "Sign designer contracts" before "Schedule fittings"
5. Build dependency graph (critical path)
6. Set deadlines working backward from event date
7. Return 80-150 tasks as JSON array

**Output:**
```json
{
  "tasks": [
    {
      "title": "Book event venue",
      "priority": "Critical",
      "workflow_phase": "venue_logistics",
      "deadline": "2026-01-15",
      "is_critical_path": true,
      "dependency_task_ids": []
    },
    // ... 149 more tasks
  ],
  "critical_path_count": 23
}
```

**Success Criteria:**
- Tasks cover all 5 phases
- Critical path identified correctly
- Deadlines logical (chronological order)
- No circular dependencies

---

### Agent 2: Risk Scanner (Proactive)

**Trigger:** Cron job (daily 8:00 AM)

**Gemini Features:**
- Gemini Thinking (analyze complex scenarios)
- Function Calling (fetch event data)
- Deep Research (weather, venue issues)

**Logic:**
1. Fetch all active events (status: planning | in_progress)
2. For each event:
   - Fetch tasks: Count overdue, critical path status
   - Fetch budget: Calculate variance (actual vs budgeted)
   - Fetch team: Identify role gaps
   - Fetch contracts: Check expiration dates
   - Fetch weather: If outdoor event, check forecast
3. Send to Gemini Thinking:
   - "Analyze this event for risks. Identify top 3 most urgent."
   - Provide event data as context
4. Gemini returns risks with:
   - Severity (critical | high | medium | low)
   - Category (tasks | budget | staffing | contracts | venue | weather)
   - Title (60 chars)
   - Description (200 chars)
   - Impact assessment
   - Recommended actions
5. Calculate risk score (0-100) based on:
   - Urgency (days until impact)
   - Severity (critical = 100, low = 25)
   - Impact scope (affects event success?)
6. Insert top 3 risks into event_risks table
7. Send notification:
   - Email to event lead
   - Push notification (if enabled)
   - Toast on next login

**Output:**
```json
{
  "event_id": "abc123",
  "risks": [
    {
      "severity": "critical",
      "category": "tasks",
      "title": "3 Critical Path Tasks Overdue",
      "description": "Tasks blocking event completion are past deadline...",
      "risk_score": 95,
      "urgency": "now",
      "recommended_actions": [
        "Reassign 'Designer contracts' to assistant",
        "Upload venue floor plan to mark complete"
      ]
    }
  ]
}
```

---

### Agent 3: Critical Path Analyzer

**Trigger:** User clicks "Analyze Critical Path" button

**Gemini Features:**
- Gemini Thinking (graph analysis)
- Code Execution (longest path algorithm)

**Logic:**
1. Fetch all tasks for event with dependencies
2. Build directed acyclic graph (DAG):
   - Nodes = tasks
   - Edges = dependencies
3. Calculate all possible paths from start to finish
4. Identify longest path (critical path):
   - Tasks that cannot be delayed without delaying event
5. Calculate slack time for non-critical tasks
6. Identify bottlenecks:
   - Tasks with most dependencies downstream
   - Tasks with longest duration
7. Predict event completion date:
   - Sum of critical path task durations
   - Add to today's date
8. Generate recommendations:
   - "Fast-track task X to reduce timeline by 3 days"
   - "Task Y has 5 dependent tasks, prioritize completion"

**Output:**
```json
{
  "critical_path_tasks": [
    { "id": "task1", "title": "Book venue", "duration_days": 5 },
    { "id": "task2", "title": "Arrange catering", "duration_days": 3 }
  ],
  "predicted_completion": "2026-02-15",
  "bottlenecks": [
    { "task_id": "task1", "dependent_count": 12 }
  ]
}
```

---

## ✅ PRODUCTION READINESS CHECKLIST

### Code Quality
- [ ] No files >500 lines (modular)
- [ ] All TypeScript errors resolved
- [ ] ESLint 0 warnings
- [ ] Prettier formatting applied
- [ ] No console.log statements

### Functionality
- [ ] All user journeys complete end-to-end
- [ ] Event creation saves to database
- [ ] Command Center displays real data
- [ ] Real-time updates work (<1s latency)
- [ ] AI features functional (task gen, risk scan)

### Performance
- [ ] Initial load <2 seconds (3G)
- [ ] Bundle size <300KB (gzipped)
- [ ] Lighthouse score >90 (all categories)
- [ ] No memory leaks (30min session)
- [ ] Virtual scrolling for long lists

### Security
- [ ] RLS policies prevent unauthorized access
- [ ] API routes require authentication
- [ ] No sensitive data in logs
- [ ] XSS vulnerabilities patched
- [ ] CSRF protection enabled

### Accessibility
- [ ] Keyboard navigation complete
- [ ] Screen reader compatible
- [ ] Color contrast WCAG AA (4.5:1)
- [ ] Focus visible (blue outline)
- [ ] Touch targets >44px (mobile)

### Mobile
- [ ] iOS Safari tested (iPhone 12+)
- [ ] Android Chrome tested (Pixel 5+)
- [ ] Bottom drawer gestures work
- [ ] No horizontal scroll
- [ ] All modals closable

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (PostHog)
- [ ] Performance monitoring (Web Vitals)
- [ ] Uptime monitoring (Pingdom)
- [ ] Log aggregation (Supabase logs)

### Documentation
- [ ] README updated
- [ ] API routes documented
- [ ] User guide created
- [ ] Troubleshooting guide
- [ ] Video demo recorded

---

## 🚀 NEXT IMMEDIATE ACTIONS

### This Session (Next 2 Hours)

**Action 1:** Create Event Command Center Core Components (P0)
- File: `/components/events/EventCommandCenter.tsx`
- File: `/components/events/EventHeader.tsx`
- File: `/components/events/KPICardsGrid.tsx`
- File: `/components/events/WorkflowTimeline.tsx`
- Goal: Main dashboard structure with mock data

**Action 2:** Create Route Handler
- File: `/app/events/[id]/page.tsx`
- Route: /events/:id
- Load EventCommandCenter component
- Pass eventId from URL params

**Action 3:** Verify No Breaking Changes
- Test existing pages still load
- Verify no import errors
- Check responsive layout
- Mobile drawer functionality

### Tomorrow (Day 1-2)

**Action 4:** Complete Remaining Command Center Components
- AI Insights Panel
- Activity Feed
- Task Breakdown integration

**Action 5:** Add Navigation Links
- Link from Events list page
- Link from Event Creation Wizard (on complete)
- Breadcrumb navigation

---

**END OF IMPLEMENTATION PLAN**  
*Ready for systematic, modular, production-ready implementation*  
*No breaking changes, clean architecture, AI-powered intelligence*