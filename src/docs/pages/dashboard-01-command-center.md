# Dashboard Documentation - Event Command Center

**Page Name:** Event Command Center  
**Route:** `/command-center`  
**File:** `/components/dashboards/CommandCenter.tsx`  
**Version:** 1.0  
**Last Updated:** December 9, 2025

---

## A. Page Overview

### Purpose
The Event Command Center is the central mission control dashboard for managing fashion events. It provides real-time visibility into event progress, critical alerts, workflow status, and AI-powered insights across all event phases.

### Who Uses It
- **Event Planners** - Primary users who manage the entire event lifecycle
- **Event Producers** - Monitor production progress and bottlenecks
- **Team Leads** - Track their phase-specific tasks and deliverables
- **Executive Stakeholders** - High-level overview of event health

### Key Value Propositions
- **Real-time visibility** across all 5 event phases (Pre-Production → Post-Event)
- **Proactive risk detection** with AI-powered alerts
- **Centralized navigation** to all event management sub-systems
- **Executive dashboard** view with KPIs and progress tracking

---

## B. Page Structure

### Layout Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ [Sticky Header]                                         │
│  - Breadcrumb (Events / NYFW SS25)                     │
│  - Page Title: Event Command Center                    │
│  - Event Meta (Status, Venue, Dates)                   │
│  - KPI Row (6 metrics inline)                          │
│  - Primary CTA: "Go to Workflows"                      │
│  - Tab Navigation (6 tabs)                             │
├─────────────────────────────────────────────────────────┤
│ [Main Content Area]                                     │
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │ Event Workflow Overview (5-step progress)     │     │
│  │ [Card 1] [Card 2] [Card 3] [Card 4] [Card 5] │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
│  ┌────────────────────┬──────────────────────────┐     │
│  │ LEFT COLUMN (8/12) │ RIGHT COLUMN (4/12)      │     │
│  │                    │                          │     │
│  │ Critical Alerts    │ AI Insights Panel        │     │
│  │ Milestone Timeline │ Quick Actions            │     │
│  │ Sponsor Overview   │ Phase Progress           │     │
│  │ Upcoming Tasks     │                          │     │
│  └────────────────────┴──────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### Responsive Behavior

**Desktop (1024px+):**
- Full 12-column grid
- KPI metrics displayed inline in header (6 columns)
- Left-right split: 8 columns main content / 4 columns sidebar
- Workflow cards in 5-column grid

**Tablet (768px - 1023px):**
- KPI metrics: 3 columns × 2 rows
- Workflow cards: 2 columns × 3 rows
- Main content stacks on top of sidebar (full width)

**Mobile (<768px):**
- KPI metrics: 2 columns × 3 rows
- Workflow cards: 1 column, vertical stack
- All content sections stack vertically
- Tabs become horizontally scrollable

---

## C. Content Blocks (Section-by-Section)

### Header Section

**Breadcrumb Navigation**
```
Events / NYFW SS25
```
- Text: 10px, uppercase, medium weight, gray-500
- Separator: "/" in gray-300

**Page Title**
```
Event Command Center
```
- Font: 32px serif, bold, gray-900
- Margin-bottom: 8px

**Event Metadata**
- **Status Badge:** "Active" with green pulse indicator
  - Background: green-50
  - Text: green-700, 11px, medium
  - Border: green-100
  - Icon: Pulsing green dot (6px)
  
- **Venue:** "Skylight Clarkson, NYC"
- **Dates:** "Sep 10 - 12, 2025"
- Font: 14px, gray-500
- Separator: "•" between items

**KPI Metrics Row (6 Cards)**

| Metric | Value | Trend | Type |
|--------|-------|-------|------|
| Event Progress | 78% | +12% | Progress bar |
| Tasks Active | 112 | 14 Overdue (alert) | Alert state |
| Sponsors | 12 | 100% Active | Positive |
| Attendees | 1,540 | +15% | Positive |
| Deliverables | 23 | 5 Pending | Warning |
| Budget Used | 64% | On Track | Positive |

**KPI Card Specifications:**
- Background: gray-50 (mobile), transparent (desktop)
- Border-right: gray-200 (desktop divider)
- Padding: 12px (mobile), 24px horizontal (desktop)
- Label: 11px, gray-500
- Value: 20px, bold, gray-900
- Trend: 10px, conditional color (green/red/gray)
- Icons: TrendingUp (green), AlertCircle (red)

**Primary CTA Button**
```
[Go to Workflows →]
```
- Background: indigo-600
- Text: white, 14px, medium
- Padding: 10px 20px
- Border-radius: 12px
- Hover: indigo-700
- Shadow: sm shadow-indigo-200
- Icon: ArrowRight (16px)
- Navigation: → `/tasks-event-planning`

**Tab Navigation (6 Tabs)**

1. Overview (default)
2. Tasks Flow
3. Sponsors & Activations
4. Timeline
5. AI Insights
6. ROI Dashboard

- Active tab: indigo-600 text, 2px bottom border
- Inactive: gray-500, transparent border
- Hover: gray-800 text, gray-300 border
- Font: 14px, medium
- Bottom padding: 16px

---

### Section 1: Event Workflow Overview

**Section Header:**
- Title: "Event Workflow Overview"
- Font: 18px serif, bold, gray-900
- Action Link: "View All Flows" → `/tasks-event-planning`

**5 Workflow Phase Cards (Grid Layout)**

Each card represents one of the 5 event phases:

**Card 1: Pre-Production**
```
Icon: ClipboardCheck
Title: Pre-Production
Description: Goals, Budget, Team
Status: Completed
Progress: 100%
Overdue Tasks: 0
```

**Card 2: Venue & Logistics**
```
Icon: Building2
Title: Venue & Logistics
Description: Booking, Vendors, Safety
Status: In Progress
Progress: 65%
Overdue Tasks: 2
```

**Card 3: Creative Design**
```
Icon: Palette
Title: Creative Design
Description: Concept, Assets, Run-of-Show
Status: In Progress
Progress: 40%
Overdue Tasks: 1
```

**Card 4: On-Site Ops**
```
Icon: Zap
Title: On-Site Ops
Description: Install, Rehearsals, Show
Status: Pending
Progress: 0%
Overdue Tasks: 0
```

**Card 5: Post-Event**
```
Icon: BarChart3
Title: Post-Event
Description: Reporting, ROI, Analytics
Status: Pending
Progress: 0%
Overdue Tasks: 0
```

**Workflow Card Specifications:**
- Background: white
- Border: 1px gray-200
- Border-radius: 16px
- Padding: 16px
- Shadow: sm, hover: md
- Hover effect: Lift -4px (translateY)
- Cursor: pointer
- Click: Navigate to `/tasks-event-planning`

**Card Content Structure:**
```
┌────────────────────────────┐
│ [Icon]          [Status]   │  ← Header row
│                            │
│ Step X                     │  ← Step number (gray-400, 11px)
│ Phase Title                │  ← Bold, 16px, gray-900
│ Description text...        │  ← 12px, gray-500
│                            │
│ [Progress Bar]             │  ← 4px height, indigo-500
│                            │
│ [View Tasks] [Deliverable] │  ← Action buttons
└────────────────────────────┘
```

**Icon Circle:**
- Size: 40px × 40px
- Background: indigo-50
- Icon color: indigo-600
- Border-radius: 8px
- Hover: Background indigo-600, icon white

**Status Badge:**
- Completed: green-50 background, green-700 text
- In Progress: amber-50 background, amber-700 text
- Pending: gray-100 background, gray-500 text
- Font: 10px, bold, uppercase, tracking-wider
- Padding: 4px 8px
- Border-radius: full

**Progress Bar:**
- Height: 4px
- Background: gray-100
- Fill: indigo-500
- Border-radius: full
- Width: Dynamic based on progress percentage

**Action Buttons (2 buttons per card):**
- Button 1: "View Tasks" (dark, primary)
  - Background: gray-900
  - Text: white, 12px, medium
  - Hover: gray-800
  
- Button 2: "Deliverables" (light, secondary)
  - Background: gray-50
  - Text: gray-700, 12px, medium
  - Hover: gray-100

---

### Section 2: Critical Alerts (Left Column)

**Section Header:**
- Icon: AlertTriangle (20px, red-500)
- Title: "Critical Alerts"
- Badge: "3 Active" (red-100 bg, red-700 text, 11px bold)
- Background: red-50/30
- Border-bottom: red-50

**Alert Card Structure:**

Each alert displays:
- Priority indicator (8px dot)
- Alert message
- Risk level badge
- Related phase
- Timestamp
- Action buttons

**Example Alert:**
```
● Backstage congestion risk detected for Runway A
  HIGH RISK • in On-Site Ops • 10m ago
  [Details] [Take Action]
```

**Alert Card Specifications:**
- Border-bottom: 1px gray-100
- Padding: 16px
- Hover: gray-50 background

**Priority Indicator:**
- Size: 8px circle
- High: red-500
- Medium: amber-500
- Low: gray-400
- Margin-top: 8px (aligns with first line of text)

**Alert Message:**
- Font: 14px, medium, gray-900
- Line-height: 1.4

**Metadata Row:**
- Risk Level: 11px bold, uppercase, red-600 (high) / amber-600 (medium)
- Phase: 11px, gray-500
- Timestamp: 11px, gray-400
- Separator: "•" in gray-300

**Action Buttons:**
- "Details" → Opens detail modal
- "Take Action" → Navigates to `/tasks-event-planning`
- Style: Small secondary buttons (12px text, border, rounded)

**Sample Alerts:**

1. **High Priority:**
   - "Backstage congestion risk detected for Runway A"
   - Related: On-Site Ops
   - Time: 10m ago

2. **High Priority:**
   - "Lighting test overdue · Stage 1"
   - Related: Venue & Logistics
   - Time: 45m ago

3. **Medium Priority:**
   - "VIP check-in desk understaffed on Day 2"
   - Related: On-Site Ops
   - Time: 2h ago

---

### Section 3: Milestone Timeline (Left Column)

**Section Header:**
- Icon: Clock (20px)
- Title: "Milestone Timeline"
- Action: "View Full Timeline →"

**Timeline Structure:**
Vertical timeline with 4 milestones showing event progression

**Timeline Item Specifications:**

Each milestone shows:
- Status indicator (icon/circle)
- Milestone name
- Date
- Phase association

**Status Visualization:**
- **Completed:** Green checkmark icon, solid green line
- **Active:** Blue pulse circle, solid blue line
- **Upcoming:** Gray circle outline, dashed gray line

**Example Timeline:**

```
✓ Casting Day
  Aug 28 • Pre-Production
  ────────────────────
● Stage Build (ACTIVE)
  Sep 02 • Venue & Logistics
  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
○ Tech Rehearsal
  Sep 08 • On-Site Ops
  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
○ Showtime
  Sep 10 • On-Site Ops
```

**Timeline Item Card:**
- Padding: 16px
- Border-left: 2px (color based on status)
- Background: Hover gray-50

**Milestone Name:**
- Font: 14px, semibold, gray-900

**Date & Phase:**
- Font: 12px, gray-500
- Format: "MMM DD • Phase Name"

---

### Section 4: Sponsor Overview (Left Column)

**Section Header:**
- Icon: Briefcase (20px)
- Title: "Sponsor Overview"
- Action: "View All Sponsors →" → `/sponsors`

**Sponsor Table/Cards:**

3-column table showing active sponsors:

| Sponsor | Tier | Status | Tasks | Pending |
|---------|------|--------|-------|---------|
| Chanel | Platinum | Active | 4 | 2 |
| Dior | Gold | On Track | 3 | 0 |
| Puma | Silver | Review | 5 | 3 |

**Table Specifications:**
- Row height: 64px
- Border-bottom: 1px gray-100
- Hover: gray-50 background
- Cursor: pointer
- Click: Navigate to sponsor detail

**Column Breakdown:**

1. **Sponsor Name**
   - Font: 14px, semibold, gray-900
   - Logo: 32px circle (if available)

2. **Tier Badge**
   - Platinum: indigo-600 background, white text
   - Gold: amber-500 background, white text
   - Silver: gray-400 background, white text
   - Font: 11px, bold, uppercase
   - Padding: 4px 12px
   - Border-radius: full

3. **Status**
   - Active: green-700 text, green dot
   - On Track: blue-700 text, blue dot
   - Review: amber-700 text, amber dot
   - Font: 13px, medium

4. **Tasks Count**
   - Format: "4 tasks"
   - Font: 13px, gray-600

5. **Pending Count**
   - Red text if > 0
   - Gray text if 0
   - Font: 13px, medium

---

### Section 5: Upcoming Tasks (Left Column)

**Section Header:**
- Icon: CheckSquare (20px)
- Title: "Upcoming Tasks"
- Action: "View All Tasks →" → `/tasks-event-planning`

**Task Cards (List View):**

Each task shows:
- Priority indicator
- Task title
- Due date
- Owner
- Phase association

**Sample Tasks:**

**Task 1:**
```
🔴 Finalize model walk order
   Tomorrow • Ella • Creative Design
```

**Task 2:**
```
🔴 Approve stage lighting plan
   2 Days Left • Marco • Venue & Logistics
```

**Task 3:**
```
🟡 Confirm afterparty vendor
   Today • Events Team • Pre-Production
```

**Task Card Specifications:**
- Padding: 12px
- Border: 1px gray-200
- Border-radius: 8px
- Border-left: 3px solid (color = priority)
- Margin-bottom: 8px

**Priority Indicator:**
- High: red-500 (3px left border)
- Medium: amber-500
- Low: gray-400

**Task Title:**
- Font: 14px, medium, gray-900

**Metadata:**
- Due date: 12px, semibold, red-600 (if urgent) / gray-600
- Owner: 12px, gray-500
- Phase: 12px, gray-400
- Separator: "•"

---

### Section 6: AI Insights Panel (Right Column)

**Panel Header:**
- Icon: Sparkles (20px, indigo-600)
- Title: "AI Insights"
- Background: indigo-50
- Border: 1px indigo-100

**AI Insights Content:**

**Insight Cards (Stacked):**

1. **Risk Prediction**
   ```
   ⚠️ High Risk Detected
   Backstage flow may cause 15-min delay
   Suggested: Add 2 stage managers
   [View Solution]
   ```

2. **Budget Optimization**
   ```
   💡 Cost Saving Opportunity
   Consolidate vendor deliveries: Save $2,400
   [Review Details]
   ```

3. **Task Automation**
   ```
   ✨ 12 tasks can be auto-generated
   Based on similar past events
   [Generate Tasks]
   ```

**Insight Card Specifications:**
- Background: white
- Border: 1px indigo-200
- Border-radius: 12px
- Padding: 16px
- Margin-bottom: 12px

**Insight Types:**
- Risk Detection: Red icon, alert styling
- Optimization: Blue icon, info styling
- Automation: Purple icon, suggestion styling

**Card Content:**
- Icon: 24px emoji or icon
- Title: 14px, bold, gray-900
- Description: 13px, gray-600
- CTA Button: Small, outlined, indigo-600

---

### Section 7: Quick Actions (Right Column)

**Panel Title:** "Quick Actions"

**Action Buttons (Vertical Stack):**

1. **Add Designer**
   - Icon: Plus (16px)
   - Text: "Add Designer to Lineup"
   - Navigate: `/casting`

2. **Schedule Meeting**
   - Icon: Calendar (16px)
   - Text: "Schedule Team Meeting"
   - Action: Open calendar modal

3. **Generate Report**
   - Icon: BarChart3 (16px)
   - Text: "Generate Progress Report"
   - Action: Export PDF

4. **View Analytics**
   - Icon: TrendingUp (16px)
   - Text: "View ROI Analytics"
   - Navigate: `/analytics`

**Button Specifications:**
- Full width
- Background: white
- Border: 1px gray-200
- Padding: 12px 16px
- Border-radius: 8px
- Hover: gray-50 background
- Icon: Left-aligned, gray-600
- Text: 14px, medium, gray-900
- Margin-bottom: 8px

---

### Section 8: Phase Progress (Right Column)

**Panel Title:** "Phase Progress"

**Circular Progress Indicators (5 Phases):**

Visual representation of each phase's completion:

```
Pre-Production:     100% ●●●●●
Venue & Logistics:   65% ●●●○○
Creative Design:     40% ●●○○○
On-Site Ops:          0% ○○○○○
Post-Event:           0% ○○○○○
```

**Progress Item Specifications:**
- Phase name: 13px, gray-700
- Percentage: 18px, bold, gray-900
- Dots: 8px circles
- Filled: indigo-600
- Empty: gray-200
- Spacing: 4px gap between dots

---

## D. UI Actions

### Primary Actions

| Action | Trigger | Behavior | Destination |
|--------|---------|----------|-------------|
| **Go to Workflows** | Click CTA button | Navigate | `/tasks-event-planning` |
| **View All Flows** | Click link | Navigate | `/tasks-event-planning` |
| **View Workflow Phase** | Click phase card | Navigate | `/tasks-event-planning` with phase filter |
| **View Task Details** | Click task card | Navigate | `/tasks` with task detail modal |
| **View Sponsor** | Click sponsor row | Navigate | `/sponsor-detail` |
| **Take Action (Alert)** | Click alert button | Navigate | Related task/workflow page |
| **View All Sponsors** | Click link | Navigate | `/sponsors` |
| **Add Designer** | Click quick action | Navigate | `/casting` |
| **View Analytics** | Click quick action | Navigate | `/analytics` |

### Tab Navigation

| Tab | Content Shown |
|-----|---------------|
| **Overview** | Default view (current layout) |
| **Tasks Flow** | Kanban board of all tasks across phases |
| **Sponsors & Activations** | Sponsor pipeline and activation tracking |
| **Timeline** | Detailed Gantt-style timeline |
| **AI Insights** | Expanded AI recommendations and predictions |
| **ROI Dashboard** | Financial metrics and ROI tracking |

### Filter & Search

- **Search Bar:** Global search across events, tasks, sponsors
- **Phase Filter:** Filter alerts, tasks, milestones by phase
- **Priority Filter:** High / Medium / Low
- **Status Filter:** Active / Completed / Pending / Overdue

---

## E. Data Requirements

### Backend Data Structure

**Event Object:**
```typescript
interface Event {
  id: string;
  name: string;
  status: 'Active' | 'Planning' | 'Completed' | 'Cancelled';
  venue: {
    name: string;
    city: string;
    state: string;
  };
  startDate: string; // ISO 8601
  endDate: string;
  progress: number; // 0-100
  phases: EventPhase[];
  kpis: EventKPI[];
  alerts: Alert[];
  milestones: Milestone[];
  sponsors: Sponsor[];
  tasks: Task[];
}
```

**Event Phase:**
```typescript
interface EventPhase {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  progress: number; // 0-100
  overdueTasks: number;
  totalTasks: number;
  startDate: string;
  endDate: string;
}
```

**KPI Metric:**
```typescript
interface EventKPI {
  label: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  alert?: boolean;
  type?: 'progress' | 'metric';
}
```

**Alert:**
```typescript
interface Alert {
  id: string;
  message: string;
  level: 'High' | 'Medium' | 'Low';
  time: string; // "10m ago", "2h ago"
  relatedStep: string; // Phase name
  relatedTaskId?: string;
  dismissed: boolean;
  createdAt: string;
}
```

**Milestone:**
```typescript
interface Milestone {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'upcoming';
  date: string; // "Aug 28"
  phase: string;
  completedAt?: string;
}
```

**Sponsor:**
```typescript
interface Sponsor {
  id: string;
  name: string;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
  status: 'Active' | 'On Track' | 'Review' | 'At Risk';
  tasks: number;
  pending: number;
  logo?: string;
  dealValue: number;
}
```

**Task:**
```typescript
interface Task {
  id: string;
  title: string;
  due: string; // "Tomorrow", "2 Days Left"
  dueDate: string; // ISO 8601
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
  phase: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  assigneeId: string;
}
```

### API Endpoints Required

```
GET /api/events/:eventId/command-center
  → Returns complete Command Center data

GET /api/events/:eventId/kpis
  → Returns real-time KPI metrics

GET /api/events/:eventId/alerts
  → Returns active alerts with filters

GET /api/events/:eventId/phases
  → Returns all 5 phases with progress

GET /api/events/:eventId/milestones
  → Returns milestone timeline

GET /api/events/:eventId/sponsors
  → Returns sponsor overview

GET /api/events/:eventId/tasks/upcoming
  → Returns next 10 upcoming tasks

POST /api/events/:eventId/alerts/:alertId/dismiss
  → Dismisses an alert

POST /api/events/:eventId/ai/generate-tasks
  → Triggers AI task generation
```

### Sample Data States

**Empty State (New Event):**
- All KPIs show 0% or 0 count
- No alerts
- All phases "Pending"
- Empty milestone timeline
- Prompt to "Set up your event"

**Loading State:**
- Skeleton loaders for KPI cards
- Pulse animation on workflow cards
- Loading spinner in AI panel

**Error State:**
- Alert banner: "Failed to load event data"
- Retry button
- Fallback to cached data (if available)

---

## F. Workflows

### Workflow 1: Event Planner Views Command Center

```
1. User navigates to /command-center
2. System loads event data for current active event
3. Page renders with:
   - Event metadata in header
   - 6 KPI metrics (real-time)
   - 5 workflow phase cards
   - Critical alerts (if any)
   - Milestone timeline
   - Sponsor overview
   - Upcoming tasks
   - AI insights panel
4. User can:
   - Click "Go to Workflows" → Navigate to Tasks
   - Click phase card → Filter tasks by phase
   - Click alert → View alert details + suggested actions
   - Click sponsor → View sponsor profile
   - Switch tabs → View different dashboard views
```

### Workflow 2: Responding to Critical Alert

```
1. User sees red alert in Critical Alerts section
2. Alert shows:
   - "Backstage congestion risk detected"
   - HIGH RISK level
   - Related phase: On-Site Ops
   - Time: 10m ago
3. User clicks "Details" button
4. Modal opens showing:
   - Full alert description
   - AI-detected risk factors
   - Suggested solutions
   - Related tasks
5. User clicks "Take Action"
6. Navigate to /tasks-event-planning
7. Pre-filtered to show:
   - Phase: On-Site Ops
   - Related tasks
   - Suggested new tasks from AI
8. User assigns tasks to resolve issue
9. Alert auto-dismisses when tasks completed
```

### Workflow 3: Tracking Phase Progress

```
1. User views "Event Workflow Overview" section
2. 5 phase cards displayed:
   - Pre-Production: 100% (Completed)
   - Venue & Logistics: 65% (In Progress, 2 overdue)
   - Creative Design: 40% (In Progress, 1 overdue)
   - On-Site Ops: 0% (Pending)
   - Post-Event: 0% (Pending)
3. User clicks "Venue & Logistics" card
4. Navigate to /tasks-event-planning
5. Tasks filtered to "Venue & Logistics" phase
6. User sees:
   - All tasks for this phase
   - 2 overdue tasks highlighted in red
   - Progress breakdown (65% complete)
7. User completes overdue tasks
8. Returns to Command Center
9. Venue & Logistics card updates:
   - Progress: 65% → 73%
   - Overdue: 2 → 0
   - Alert dismissed
```

### Workflow 4: AI Task Generation

```
1. User sees AI Insight card:
   "✨ 12 tasks can be auto-generated"
2. User clicks [Generate Tasks]
3. Modal opens showing:
   - List of suggested tasks
   - Based on similar event: "Paris Fashion Week 2024"
   - Grouped by phase
   - Checkboxes to select tasks
4. User reviews and selects 10 tasks
5. Clicks "Add Selected Tasks"
6. System creates 10 new tasks
7. Tasks appear in:
   - Command Center "Upcoming Tasks"
   - Tasks & Deliverables page
   - Assigned phases
8. KPI "Tasks Active" updates: 112 → 122
9. Success toast: "10 tasks added successfully"
```

---

## G. Image Usage

### Event Header Background
**Type:** Optional hero image  
**Placement:** Behind event title (if implemented)  
**Size:** 1800px × 200px  
**Style:** Subtle, low opacity overlay  
**Examples:** Venue exterior, past event highlight  

### Sponsor Logos
**Type:** Brand logos  
**Placement:** Sponsor Overview table  
**Size:** 32px × 32px circle  
**Format:** PNG with transparency  
**Style:** Full color or grayscale  

### Phase Icons
**Type:** Lucide React icons  
**Size:** 20px (default), 24px (cards)  
**Color:** indigo-600 (default), white (hover)  
**Icons Used:**
- ClipboardCheck (Pre-Production)
- Building2 (Venue & Logistics)
- Palette (Creative Design)
- Zap (On-Site Ops)
- BarChart3 (Post-Event)

### Alert Icons
**Type:** Lucide React icons  
**Size:** 20px  
**Icons:**
- AlertTriangle (Critical alerts header)
- AlertCircle (Individual alert indicators)

### No Photography
This dashboard does not use photographic images. All visuals are:
- Icons (Lucide React)
- Data visualizations (progress bars, charts)
- Status indicators (dots, badges)
- Typography hierarchy

---

## H. Wireframe Summary

```
┌─────────────────────────────────────────────────────────────────┐
│ STICKY HEADER                                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Events / NYFW SS25                                          │ │
│ │                                                             │ │
│ │ Event Command Center                    [Go to Workflows →]│ │
│ │ 🟢 Active • Skylight Clarkson, NYC • Sep 10-12, 2025      │ │
│ │                                                             │ │
│ │ ┌───────┬───────┬───────┬───────┬───────┬───────┐          │ │
│ │ │  78%  │  112  │  12   │ 1,540 │  23   │  64%  │          │ │
│ │ │Progress│Tasks │Spons. │Attend.│Deliv. │Budget │          │ │
│ │ └───────┴───────┴───────┴───────┴───────┴───────┘          │ │
│ │                                                             │ │
│ │ [Overview][Tasks][Sponsors][Timeline][AI][ROI]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                    │
│                                                                 │
│ Event Workflow Overview                    [View All Flows →]  │
│ ┌────────┬────────┬────────┬────────┬────────┐                │
│ │Step 1  │Step 2  │Step 3  │Step 4  │Step 5  │                │
│ │Pre-Prod│Venue   │Creative│On-Site │Post    │                │
│ │100%✓   │65% ⚠   │40% ⚠   │0%      │0%      │                │
│ └────────┴────────┴────────┴────────┴────────┘                │
│                                                                 │
│ ┌─────────────────────────────┬──────────────────────────────┐ │
│ │ LEFT COLUMN (8/12)          │ RIGHT COLUMN (4/12)          │ │
│ │                             │                              │ │
│ │ ⚠️ Critical Alerts [3]      │ ✨ AI Insights               │ │
│ │ ┌─────────────────────────┐ │ ┌──────────────────────────┐ │ │
│ │ │ 🔴 Alert 1              │ │ │ Risk Detection           │ │ │
│ │ │ 🔴 Alert 2              │ │ │ Budget Optimization      │ │ │
│ │ │ 🟡 Alert 3              │ │ │ Task Automation          │ │ │
│ │ └─────────────────────────┘ │ └──────────────────────────┘ │ │
│ │                             │                              │ │
│ │ ⏰ Milestone Timeline        │ ⚡ Quick Actions             │ │
│ │ ✓ Casting Day              │ [+ Add Designer]             │ │
│ │ ● Stage Build (Active)     │ [📅 Schedule Meeting]        │ │
│ │ ○ Tech Rehearsal           │ [📊 Generate Report]         │ │
│ │ ○ Showtime                 │ [📈 View Analytics]          │ │
│ │                             │                              │ │
│ │ 💼 Sponsor Overview         │ 📊 Phase Progress            │ │
│ │ Chanel    Platinum  Active │ Pre-Production:    100%      │ │
│ │ Dior      Gold      Track  │ Venue & Logistics:  65%      │ │
│ │ Puma      Silver    Review │ Creative Design:    40%      │ │
│ │                             │ On-Site Ops:         0%      │ │
│ │ ✓ Upcoming Tasks            │ Post-Event:          0%      │ │
│ │ 🔴 Model walk order        │                              │ │
│ │ 🔴 Lighting plan           │                              │ │
│ │ 🟡 Afterparty vendor       │                              │ │
│ └─────────────────────────────┴──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## I. Component Hierarchy

```
CommandCenter
├── Header (Sticky)
│   ├── Breadcrumb
│   ├── TitleBlock
│   │   ├── PageTitle
│   │   ├── EventMeta
│   │   └── StatusBadge
│   ├── KPIRow (6 KPI Cards)
│   ├── PrimaryCTA
│   └── TabNavigation (6 tabs)
│
├── MainContent
│   ├── WorkflowOverview
│   │   └── PhaseCard × 5
│   │       ├── IconCircle
│   │       ├── StatusBadge
│   │       ├── PhaseTitle
│   │       ├── ProgressBar
│   │       └── ActionButtons × 2
│   │
│   ├── TwoColumnGrid
│   │   ├── LeftColumn (8/12)
│   │   │   ├── CriticalAlerts
│   │   │   │   └── AlertCard × 3
│   │   │   ├── MilestoneTimeline
│   │   │   │   └── TimelineItem × 4
│   │   │   ├── SponsorOverview
│   │   │   │   └── SponsorRow × 3
│   │   │   └── UpcomingTasks
│   │   │       └── TaskCard × 3
│   │   │
│   │   └── RightColumn (4/12)
│   │       ├── AIInsightsPanel
│   │       │   └── InsightCard × 3
│   │       ├── QuickActions
│   │       │   └── ActionButton × 4
│   │       └── PhaseProgress
│   │           └── ProgressItem × 5
```

---

## J. Design Tokens & Styling

### Typography Scale
```css
/* Headers */
h1: 32px, serif, bold (Page Title)
h2: 18px, serif, bold (Section Headers)
h3: 16px, sans, semibold (Card Titles)

/* Body */
body: 14px, sans, regular
small: 12px, sans, regular
tiny: 10-11px, sans, medium (Labels, Badges)
```

### Color Palette
```css
/* Primary */
--primary: #4F46E5 (indigo-600)
--primary-hover: #4338CA (indigo-700)
--primary-light: #EEF2FF (indigo-50)

/* Status Colors */
--success: #16A34A (green-600)
--warning: #F59E0B (amber-500)
--danger: #DC2626 (red-600)
--info: #3B82F6 (blue-500)

/* Neutrals */
--gray-50: #FAFAF9
--gray-100: #F5F5F4
--gray-200: #E7E5E4
--gray-500: #78716C
--gray-600: #57534E
--gray-700: #44403C
--gray-900: #1C1917

/* Backgrounds */
--bg-primary: #FFFFFF
--bg-secondary: #FAFAF9
--bg-tertiary: #F5F5F4
```

### Spacing System
```css
/* Margins/Padding */
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px

/* Section Gaps */
--section-gap: 32px (8 on spacing scale)
--card-gap: 16px (lg)
--grid-gap: 16-24px
```

### Border Radius
```css
--radius-sm: 8px (buttons, small cards)
--radius-md: 12px (medium cards, inputs)
--radius-lg: 16px (large cards, modals)
--radius-full: 9999px (badges, pills)
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.07)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--shadow-indigo: 0 4px 12px rgba(79,70,229,0.15)
```

---

## K. Accessibility Notes

### Keyboard Navigation
- Tab order follows visual hierarchy (top to bottom, left to right)
- All interactive elements keyboard accessible
- Enter/Space to activate buttons
- Escape to close modals
- Arrow keys for tab navigation

### Screen Reader Support
- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`)
- ARIA labels on icon-only buttons
- ARIA live regions for alert updates
- Descriptive link text (no "Click here")

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Status colors have sufficient contrast
- Focus indicators visible on all interactive elements

### Responsive Tables
- Tables become card-based lists on mobile
- Horizontal scroll for wide tables (tablet)
- Sticky headers for long tables

---

## L. Performance Considerations

### Data Loading
- Initial page load: <2 seconds
- KPI metrics: Real-time WebSocket updates
- Lazy load right column (below fold)
- Infinite scroll for long task lists

### Optimizations
- Memoize expensive calculations (progress percentages)
- Debounce search inputs (300ms)
- Virtual scrolling for 100+ task lists
- Image lazy loading for sponsor logos

### Caching Strategy
- Cache event data for 5 minutes
- Invalidate on user action (task completion, alert dismiss)
- Offline mode: Show last cached state with "Offline" banner

---

**Document Version:** 1.0  
**Last Updated:** December 9, 2025  
**Next Review:** March 2026  
**Owner:** Product Team
