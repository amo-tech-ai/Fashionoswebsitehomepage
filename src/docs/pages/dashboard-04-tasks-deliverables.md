# Dashboard Documentation - Tasks & Deliverables

**Page Name:** Tasks & Deliverables  
**Route:** `/tasks`, `/tasks-event-planning`, `/tasks-sponsorship`, `/tasks-marketing`, `/tasks-operations`, `/tasks-media`  
**File:** `/components/dashboards/TasksAndDeliverables.tsx`  
**Version:** 1.0  
**Last Updated:** December 9, 2025

---

## A. Page Overview

### Purpose
The Tasks & Deliverables dashboard is a comprehensive workflow management system that breaks down complex fashion event production into 5 distinct workflow categories, each with multi-step execution frameworks. It combines AI-powered task generation, deliverable tracking, and phase-based progress monitoring to ensure nothing falls through the cracks during event planning and execution.

### Who Uses It
- **Event Planners** - Manage entire event workflow across all phases
- **Team Leads** - Track department-specific tasks (marketing, ops, media)
- **Sponsors** - Monitor deliverable completion and ROI tracking
- **Vendors** - View operational tasks and requirements
- **Creative Teams** - Track creative and media production workflows

### Key Value Propositions
- **5 distinct workflow categories** with step-by-step execution frameworks
- **AI-powered task generation** based on event type and past events
- **Multi-phase tracking** (Pre-Production → Post-Event)
- **Deliverable management** with sponsor assignment and status tracking
- **Real-time progress monitoring** across all workflow categories

---

## B. Page Structure

### Layout Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ [AI Gemini Header]                                      │
│  - Sparkles Icon + AI Branding                         │
│  - Workflow Title & Description                        │
│  - AI Action Buttons (Generate Tasks, Smart Assign)   │
├─────────────────────────────────────────────────────────┤
│ [Workflow Category Tabs - 5 Categories]                │
│  [Event Planning][Sponsorship][Marketing][Ops][Media] │
├─────────────────────────────────────────────────────────┤
│ [Workflow Navigation]                                   │
│  Step 1 → Step 2 → Step 3 → Step 4 → Step 5          │
│  (Visual progress indicators)                          │
├─────────────────────────────────────────────────────────┤
│ [Main Content - Active Step Detail]                    │
│                                                         │
│  ┌────────────────────────┬──────────────────────┐     │
│  │ TASKS SECTION (Left)   │ DELIVERABLES (Right) │     │
│  │                        │                      │     │
│  │ [Task List]           │ [Deliverable Cards]  │     │
│  │ □ Task 1 (High)       │                      │     │
│  │ □ Task 2 (Medium)     │ ☑ Deliverable 1     │     │
│  │ ☑ Task 3 (Completed)  │ □ Deliverable 2     │     │
│  │                        │                      │     │
│  │ [+ Add Task]          │ [+ Add Deliverable]  │     │
│  └────────────────────────┴──────────────────────┘     │
│                                                         │
│ [Progress Summary Bar]                                 │
│  ████████░░ 78% Complete                               │
└─────────────────────────────────────────────────────────┘
```

### Responsive Behavior

**Desktop (1024px+):**
- AI header: Full width with gradient background
- Workflow tabs: Horizontal row (5 tabs visible)
- Step navigation: Horizontal timeline with connecting lines
- Main content: Two-column layout (tasks left, deliverables right)
- Progress bar: Full width at bottom

**Tablet (768px - 1023px):**
- AI header: Stacked (title/description on top, actions below)
- Workflow tabs: Horizontal scroll
- Step navigation: Horizontal scroll with dots
- Main content: Stacked (tasks on top, deliverables below)

**Mobile (<768px):**
- AI header: Compact (icon + title, actions as dropdown)
- Workflow tabs: Horizontal swipe scroll
- Step navigation: Dots with active step name
- Main content: Full-width stacked sections
- Progress bar: Sticky at top

---

## C. Content Blocks (Section-by-Section)

### Gemini AI Header

**Header Container:**
- Background: Gradient `from-indigo-900 to-violet-900`
- Border-radius: 12px
- Padding: 24px
- Text: white
- Shadow: lg
- Position: relative (for overlay effects)
- Margin-bottom: 32px

**Gradient Overlay Effects:**
- Top-right: White circle (64px, opacity 10%, blur 3xl)
- Bottom-left: Indigo circle (40px, opacity 20%, blur 2xl)
- Creates depth and visual interest

**Content Structure:**

**Icon Box (Left):**
- Size: 48px × 48px
- Background: white/10 (semi-transparent)
- Border: 1px white/20
- Border-radius: 8px
- Backdrop-filter: blur (glassmorphism)
- Icon: Sparkles (24px, indigo-200)
- Padding: 10px

**Title & Description (Center):**
- Title: 20px serif, medium, white
- Description: 14px, indigo-200, max-width 512px
- Margin-bottom: 4px (between title and description)

**AI Action Buttons (Right):**
- Flex wrap (responsive)
- Gap: 12px

**Primary Button:**
- Background: white
- Text: indigo-900, 14px, medium
- Padding: 8px 16px
- Border-radius: 8px
- Shadow: lg shadow-indigo-900/20
- Hover: indigo-50
- Icon: Left (16px)
- Loading state: Spinner replaces icon

**Secondary Button:**
- Background: white/10
- Text: white, 14px, medium
- Border: 1px white/10
- Hover: white/20
- Icon: Left (16px)

**Sample Actions:**
1. **Generate Tasks** (primary)
   - Icon: Sparkles
   - Click: AI generates tasks for current step
   - Loading: Shows spinner for 1.5s

2. **Smart Assign** (secondary)
   - Icon: UserCheck
   - Click: AI assigns tasks based on team capacity

3. **Auto-Schedule** (secondary)
   - Icon: Calendar
   - Click: AI optimizes task timeline

---

### Workflow Category Tabs (5 Tabs)

**Tab Navigation:**
- Background: white
- Border-bottom: 2px gray-200
- Sticky: top-0 (scrolls with page)
- Z-index: 20

**Tab Specifications:**

Each tab represents one of 5 workflow categories:

1. **Event Planning** - 5 steps
2. **Sponsorship** - 5 steps
3. **Marketing** - 5 steps
4. **Operations** - 4 steps
5. **Media** - 4 steps

**Tab Button:**
- Padding: 12px 24px
- Font: 14px, medium
- Border-bottom: 2px
- Active state:
  - Border: indigo-600
  - Text: indigo-600
- Inactive state:
  - Border: transparent
  - Text: gray-500
  - Hover: gray-800, border gray-300

**Tab Icons & Labels:**

| Tab | Icon | Label | Steps |
|-----|------|-------|-------|
| Event Planning | ClipboardCheck | Event Planning | 5 |
| Sponsorship | Briefcase | Sponsorship | 5 |
| Marketing | Megaphone | Marketing | 5 |
| Operations | Wrench | Operations | 4 |
| Media | Camera | Media | 4 |

---

### Workflow Step Navigation (Mini Timeline)

**Navigation Container:**
- Horizontal scroll
- Overflow-x: auto
- Scrollbar-hide
- Gap: 8px
- Padding-bottom: 8px
- Margin-bottom: 24px

**Step Indicators:**

Visual timeline showing progression through workflow steps (1-5):

**Step Card (Inactive):**
- Background: white
- Border: 2px gray-200
- Border-radius: 8px
- Padding: 12px 16px
- Cursor: pointer
- Hover: border indigo-300

**Step Card (Active):**
- Background: indigo-50
- Border: 2px indigo-600
- Shadow: sm

**Step Card (Completed):**
- Background: green-50
- Border: 2px green-500
- Checkmark icon overlay

**Card Content:**
- Step number: 11px, bold, uppercase, gray-500
- Title: 14px, medium, gray-900
- Icon: 20px (varies by step)
- Progress indicator: Dot (active) or checkmark (completed)

**Connecting Lines:**
- Between step cards
- 2px solid gray-200
- Changes to indigo-600 when step is completed
- Arrow icon at end

---

### Event Planning Workflow (5 Steps)

**Step 1: Pre-Production Planning**
```
Icon: ClipboardCheck
Title: Pre-Production Planning
Description: Initial event goals, budgeting, timelines, team assignments.
Tasks: 4 planning tasks
Deliverables: 2 briefs
```

**Step 2: Venue & Logistics**
```
Icon: Building2
Title: Venue & Logistics
Description: Venue booking, layouts, safety plans, vendor scheduling.
Tasks: 5 logistics tasks
Deliverables: 3 contracts
```

**Step 3: Creative & Program Design**
```
Icon: Palette
Title: Creative & Program Design
Description: Creative direction, run-of-show, visual assets, program flow.
Tasks: 6 creative tasks
Deliverables: 4 design files
```

**Step 4: On-Site Operations**
```
Icon: Zap
Title: On-Site Operations
Description: Installation, rehearsals, crew coordination, show execution.
Tasks: 3 operations tasks
Deliverables: 1 checklist
```

**Step 5: Post-Event Reporting**
```
Icon: BarChart3
Title: Post-Event Reporting
Description: Performance analysis, sponsor reporting, media metrics, ROI.
Tasks: 4 reporting tasks
Deliverables: 2 reports
```

---

### Sponsorship Workflow (5 Steps)

**Step 1: Prospecting & Outreach**
```
Icon: Compass
Description: Identify potential sponsors, research fit, prepare outreach lists.
Tasks: 5 outreach tasks
Deliverables: 1 sponsor list
```

**Step 2: Pitches & Decks**
```
Icon: Presentation
Description: Prepare pitch decks, sponsorship bundles, tier pricing.
Tasks: 3 pitch tasks
Deliverables: 2 decks
```

**Step 3: Negotiation & Contracts**
```
Icon: FileSignature
Description: Drafts, revisions, approvals, legal coordination.
Tasks: 4 legal tasks
Deliverables: 3 contracts
```

**Step 4: Activation Planning**
```
Icon: Box
Description: Plan activation zones, experiences, content deliverables.
Tasks: 6 activation tasks
Deliverables: 4 activation plans
```

**Step 5: Sponsor Reporting**
```
Icon: BarChart3
Description: ROI reports, analytics, recap packages.
Tasks: 2 ROI tasks
Deliverables: 1 recap package
```

---

### Marketing Workflow (5 Steps)

**Step 1: Campaign Strategy**
```
Icon: Target
Description: Messaging, audiences, promo timeline.
Tasks: 3 strategy tasks
Deliverables: 1 marketing plan
```

**Step 2: Creative Production**
```
Icon: Camera
Description: Graphics, videos, press photos, brand assets.
Tasks: 5 production tasks
Deliverables: 5 creative assets
```

**Step 3: Social Media & Influencers**
```
Icon: Share2
Description: Scheduling posts, coordinating influencers, publishing.
Tasks: 8 social media tasks
Deliverables: 10 posts
```

**Step 4: Press & Communications**
```
Icon: Megaphone
Description: Press releases, media outreach, journalist coordination.
Tasks: 4 PR tasks
Deliverables: 2 press releases
```

**Step 5: Performance & Analytics**
```
Icon: LineChart
Description: Engagement metrics, impressions, conversion analysis.
Tasks: 2 analytics tasks
Deliverables: 1 performance report
```

---

### Operations Workflow (4 Steps)

**Step 1: Vendor Management**
```
Icon: Store
Description: Catering, security, cleaning, transport.
Tasks: 4 vendor tasks
Deliverables: 3 vendor contracts
```

**Step 2: Equipment & Technical**
```
Icon: Wrench
Description: AV, lighting, staging, power supply.
Tasks: 5 technical tasks
Deliverables: 2 equipment manifests
```

**Step 3: Staffing & Scheduling**
```
Icon: UserCheck
Description: Shift planning, roles, uniforms, briefing.
Tasks: 6 staffing tasks
Deliverables: 1 staff roster
```

**Step 4: Safety & Compliance**
```
Icon: ShieldCheck
Description: Permits, insurance, emergency protocols.
Tasks: 3 safety tasks
Deliverables: 2 permits/insurance docs
```

---

### Media Workflow (4 Steps)

**Step 1: Asset Intake & Tagging**
```
Icon: Upload
Description: Raw footage upload, categorization, metadata.
Tasks: 5 intake tasks
Deliverables: 0 (processing stage)
```

**Step 2: Photo/Video Editing**
```
Icon: Palette
Description: Retouching, cutting, color grading, exporting.
Tasks: 8 editing tasks
Deliverables: 5 final cuts
```

**Step 3: Publishing & Distribution**
```
Icon: Globe
Description: Gallery upload, press kit distribution.
Tasks: 4 publishing tasks
Deliverables: 2 galleries
```

**Step 4: Archive & Licensing**
```
Icon: Archive
Description: Long-term storage, rights management.
Tasks: 2 archive tasks
Deliverables: 1 media catalog
```

---

### Task List Section (Left Column)

**Section Header:**
- Title: "Tasks" + step name (e.g., "Tasks: Pre-Production Planning")
- Font: 18px, semibold, gray-900
- Add Task button: Icon + "Add Task"
- Filter/sort buttons

**Task List Container:**
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Padding: 16px
- Shadow: sm

**Task Item Specifications:**

Each task displays:
- Checkbox (completion status)
- Priority indicator (colored border-left)
- Task title
- Due date
- Assignee
- Status badge
- More options menu

**Task Item Structure:**
- Padding: 12px
- Border-bottom: 1px gray-100
- Hover: gray-50 background
- Cursor: pointer

**Checkbox:**
- Size: 20px × 20px
- Border: 2px gray-300
- Border-radius: 4px
- Checked: indigo-600 background, white checkmark
- Click: Toggles task completion

**Priority Indicator:**
- Border-left: 3px solid
- High: red-500
- Medium: amber-500
- Low: gray-400
- Height: 100% (full task row)

**Task Title:**
- Font: 14px, medium, gray-900
- Line-clamp: 2
- Margin-bottom: 4px

**Metadata Row:**
- Font: 12px, gray-500
- Icons: 14px
- Format: "Due Sep 15 • Owner Name • Status"
- Separator: "•"

**Status Badge:**
- Padding: 2px 8px
- Border-radius: 6px
- Font: 10px, bold, uppercase
- Backlog: gray-100, gray-700
- In Progress: blue-50, blue-700
- Review: amber-50, amber-700
- Completed: green-50, green-700

**More Options:**
- Icon: MoreHorizontal (16px)
- Hover: Shows menu
- Options: Edit, Delete, Reassign, Change Priority

**Empty State:**
```
[Icon: CheckCircle2]
"No tasks yet"
"Add tasks to track progress"
[+ Add Task Button]
```

---

### Deliverables Section (Right Column)

**Section Header:**
- Title: "Deliverables"
- Font: 18px, semibold, gray-900
- Add Deliverable button

**Deliverables Container:**
- Grid: 2 columns (desktop), 1 column (mobile)
- Gap: 16px

**Deliverable Card Specifications:**

Each deliverable displays:
- Deliverable name
- Type badge
- Sponsor/Event
- Due date
- Status
- Owner
- Action button

**Card Structure:**
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Padding: 16px
- Shadow: sm
- Hover: Shadow md, border indigo-300

**Name:**
- Font: 14px, semibold, gray-900
- Margin-bottom: 8px

**Type Badge:**
- Small pill badge
- Font: 10px, uppercase, bold
- Colors: document (blue), asset (purple), report (green)

**Metadata:**
- Sponsor: 12px, gray-600
- Event: 12px, gray-600
- Due date: 12px, gray-500, icon Clock
- Owner: 12px, gray-500, icon User

**Status Indicator:**
- Large badge at top-right
- Pending: amber-50, amber-700
- In Progress: blue-50, blue-700, pulse animation
- Completed: green-50, green-700, checkmark icon

**Action Button:**
- Text: "View Details" or "Upload"
- Background: indigo-600
- Text: white, 12px
- Padding: 6px 12px
- Border-radius: 6px
- Hover: indigo-700

**Empty State:**
```
[Icon: FileText]
"No deliverables yet"
"Add deliverables to track outputs"
[+ Add Deliverable Button]
```

---

### Progress Summary Bar (Bottom)

**Progress Container:**
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Padding: 20px
- Shadow: sm
- Margin-top: 24px

**Progress Content:**

**Title:**
- Text: "Step Progress"
- Font: 16px, semibold, gray-900

**Progress Bar:**
- Height: 8px
- Background: gray-100
- Fill: indigo-600
- Border-radius: full
- Width: Dynamic (0-100%)
- Margin: 12px 0

**Stats Row:**
- Flex: Space-between
- Font: 14px, gray-600

**Stats:**
- Completed tasks: X / Y
- Completed deliverables: X / Y
- Overall progress: XX%

**Next Step Button:**
- Visible when current step 100% complete
- Text: "Continue to [Next Step Name] →"
- Background: indigo-600
- Text: white
- Padding: 10px 20px
- Border-radius: 8px

---

## D. UI Actions

### Primary Actions

| Action | Trigger | Behavior | Result |
|--------|---------|----------|--------|
| **Generate Tasks (AI)** | Click Gemini button | AI creates tasks for current step | Tasks added to list |
| **Smart Assign (AI)** | Click Gemini button | AI assigns based on capacity | Tasks auto-assigned |
| **Add Task** | Click + Add Task | Open task creation modal | New task form |
| **Complete Task** | Click checkbox | Mark task complete | Status updates to Completed |
| **Edit Task** | Click task row or Edit | Open task edit modal | Task details editable |
| **Delete Task** | More menu → Delete | Confirm and delete | Task removed |
| **Add Deliverable** | Click + Add Deliverable | Open deliverable form | New deliverable created |
| **View Deliverable** | Click card | Navigate to detail | Deliverable detail page |
| **Upload Deliverable** | Click Upload button | File upload dialog | File attached to deliverable |
| **Change Step** | Click step in nav | Switch to that step | View loads new step data |
| **Change Workflow** | Click workflow tab | Switch workflow category | New workflow loads |
| **Continue to Next Step** | Click Next Step button | Navigate to next step | Next step becomes active |

### AI-Powered Actions

**Generate Tasks:**
```
1. User clicks "Generate Tasks" in Gemini header
2. Loading spinner shows (1.5s)
3. AI analyzes:
   - Event type (Fashion Week, Runway Show, etc.)
   - Current step (e.g., Pre-Production)
   - Past similar events
   - Team capacity
4. AI creates 5-10 tasks with:
   - Smart titles
   - Suggested owners
   - Estimated due dates
   - Priority levels
5. Tasks appear in task list
6. Toast notification: "8 tasks generated successfully"
```

**Smart Assign:**
```
1. User clicks "Smart Assign"
2. AI analyzes:
   - Team member workload
   - Skills and past assignments
   - Task requirements
   - Availability calendars
3. AI assigns unassigned tasks
4. Task owners update
5. Notification sent to assigned members
6. Toast: "12 tasks assigned"
```

---

## E. Data Requirements

### Backend Data Structure

**Task Object:**
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string; // ISO 8601
  owner: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'Backlog' | 'In Progress' | 'Review' | 'Completed';
  category: string; // "Planning", "Logistics", etc.
  workflowId: string;
  stepId: string;
  stepNumber: number;
  dependencies?: string[]; // Task IDs
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

**Deliverable Object:**
```typescript
interface Deliverable {
  id: string;
  name: string;
  type: 'Document' | 'Asset' | 'Report' | 'Media' | 'Other';
  sponsor: {
    id?: string;
    name: string;
  };
  event: {
    id: string;
    name: string;
  };
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  owner: {
    id: string;
    name: string;
  };
  fileUrl?: string;
  metadata?: Record<string, any>;
  workflowId: string;
  stepId: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

**Workflow Step:**
```typescript
interface FlowStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  tasks: Task[];
  deliverables: Deliverable[];
  progressPercentage: number; // 0-100
  isCompleted: boolean;
  estimatedDuration?: string; // "2 weeks"
}
```

**Workflow Category:**
```typescript
interface WorkflowCategory {
  id: 'event-planning' | 'sponsorship' | 'marketing' | 'operations' | 'media';
  name: string;
  icon: string;
  steps: FlowStep[];
  totalTasks: number;
  completedTasks: number;
  totalDeliverables: number;
  completedDeliverables: number;
}
```

### API Endpoints Required

```
GET /api/workflows
  → Returns all 5 workflow categories with steps

GET /api/workflows/:categoryId
  → Returns specific workflow with all steps and data

GET /api/workflows/:categoryId/steps/:stepId
  → Returns step detail with tasks and deliverables

POST /api/tasks
  → Creates new task

PATCH /api/tasks/:taskId
  → Updates task (status, owner, priority, etc.)

DELETE /api/tasks/:taskId
  → Deletes task

POST /api/tasks/ai-generate
  → AI generates tasks for specified step
  Body: { workflowId, stepId, eventType }

POST /api/tasks/ai-assign
  → AI assigns tasks to team members
  Body: { taskIds[], teamMembers[] }

POST /api/deliverables
  → Creates new deliverable

PATCH /api/deliverables/:deliverableId
  → Updates deliverable

POST /api/deliverables/:deliverableId/upload
  → Uploads file for deliverable

GET /api/workflows/:categoryId/progress
  → Returns progress summary for workflow
```

### Sample Data States

**Empty Workflow:**
```
No tasks or deliverables created yet
[Illustration]
"Get started by adding tasks or using AI"
[Generate Tasks Button]
```

**Loading State:**
- Skeleton loaders for task list
- Pulse animation on step cards
- Gray placeholder boxes

**Error State:**
```
[Alert banner]
"Failed to load workflow data"
[Retry Button]
```

---

## F. Workflows

### Workflow 1: Progressing Through Event Planning

```
1. User navigates to /tasks-event-planning
2. Lands on Step 1: Pre-Production Planning
3. Views 4 planning tasks, 2 deliverables
4. Clicks "Generate Tasks" (AI)
5. AI adds 6 more tasks based on event type
6. User assigns tasks to team members
7. Team completes tasks (checkboxes)
8. Progress bar updates: 40% → 65% → 100%
9. All tasks completed
10. "Continue to Venue & Logistics" button appears
11. User clicks button
12. Loads Step 2: Venue & Logistics
13. Process repeats for each step
14. After Step 5 complete, workflow marked done
```

### Workflow 2: Managing Sponsorship Deliverables

```
1. User switches to Sponsorship workflow tab
2. Navigates to Step 4: Activation Planning
3. Views deliverables section (right column)
4. Sees 4 activation plans needed:
   - Chanel Lounge Setup (Pending)
   - Dior Photo Booth Design (In Progress)
   - Puma VIP Experience (Completed)
   - Glossier Sample Station (Pending)
5. Clicks "Chanel Lounge Setup" card
6. Opens deliverable detail modal
7. User uploads floor plan PDF
8. Status changes: Pending → In Progress
9. User marks as complete
10. Status: Completed (green checkmark)
11. Returns to step view
12. Progress updates: 3/4 deliverables complete
13. Only 1 pending deliverable remains
```

### Workflow 3: Using AI Smart Assign

```
1. User on Marketing workflow, Step 3 (Social Media)
2. Views 8 unassigned social media tasks
3. Team: 3 social media managers available
4. Clicks "Smart Assign" in Gemini header
5. AI analyzes:
   - Sarah: Light workload (2 tasks), Instagram expert
   - Mike: Medium workload (5 tasks), TikTok specialist
   - Elena: Heavy workload (8 tasks)
6. AI assigns:
   - Sarah: 4 Instagram tasks
   - Mike: 3 TikTok tasks
   - Elena: 1 Facebook task (lightest load)
7. Tasks update with assignee names
8. Notifications sent to team members
9. Toast: "8 tasks assigned successfully"
10. Team members see tasks in their personal dashboards
```

---

## G. Image Usage

### Workflow Icons

All workflows use **Lucide React icons** (no images):

**Event Planning:**
- ClipboardCheck, Building2, Palette, Zap, BarChart3

**Sponsorship:**
- Compass, Presentation, FileSignature, Box, BarChart3

**Marketing:**
- Target, Camera, Share2, Megaphone, LineChart

**Operations:**
- Store, Wrench, UserCheck, ShieldCheck

**Media:**
- Upload, Palette, Globe, Archive

**Icon Specifications:**
- Size: 20px (step cards), 24px (Gemini header)
- Color: Varies by context (indigo-600, gray-600, white)
- Stroke width: 2px

### AI/Gemini Branding

**Sparkles Icon:**
- Used throughout for AI features
- Size: 24px (header), 16px (buttons)
- Color: indigo-200 (header), indigo-600 (buttons)

### No Photography
This dashboard is purely functional and uses no photographic images. All visuals are:
- Icons
- Progress bars
- Status indicators
- Gradient backgrounds

---

## H. Wireframe Summary

```
┌──────────────────────────────────────────────────────────────┐
│ [GEMINI AI HEADER - Gradient Indigo/Violet]                 │
│ ✨ AI-Powered Workflow Management                            │
│ Smart task generation and auto-assignment                    │
│                        [Generate Tasks] [Smart Assign]       │
├──────────────────────────────────────────────────────────────┤
│ [Event Planning][Sponsorship][Marketing][Operations][Media] │
├──────────────────────────────────────────────────────────────┤
│ Step 1 → Step 2 → Step 3 → Step 4 → Step 5                 │
│ ✓        ●        ○        ○        ○                       │
├──────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┬─────────────────────────────┐   │
│ │ TASKS: Step 2           │ DELIVERABLES                │   │
│ │ [+ Add Task]            │ [+ Add Deliverable]         │   │
│ │                         │                             │   │
│ │ □ 🔴 Confirm venue      │ ┌─────────────────────┐     │   │
│ │   Sep 15 • Sarah • WIP  │ │ Venue Contract      │     │   │
│ │                         │ │ Document • Chanel   │     │   │
│ │ □ 🟡 Floor plan review  │ │ Due Sep 20          │     │   │
│ │   Sep 18 • Mike • BL    │ │ ✓ Completed         │     │   │
│ │                         │ └─────────────────────┘     │   │
│ │ ☑ ⚪ Book catering     │                             │   │
│ │   Sep 12 • Elena • ✓   │ ┌─────────────────────┐     │   │
│ │                         │ │ Safety Plan         │     │   │
│ │ [Load More Tasks...]    │ │ Report • Internal   │     │   │
│ │                         │ │ Due Sep 22          │     │   │
│ └─────────────────────────┤ │ ⏳ In Progress      │     │   │
│                           │ └─────────────────────┘     │   │
│ PROGRESS SUMMARY          │                             │   │
│ ████████░░ 78% Complete   │                             │   │
│ 12/15 tasks • 2/3 deliver │                             │   │
│                           └─────────────────────────────┘   │
│ [Continue to Step 3: Creative Design →]                     │
└──────────────────────────────────────────────────────────────┘
```

---

## I. Component Hierarchy

```
TasksAndDeliverables
├── GeminiHeader
│   ├── OverlayEffects
│   ├── IconBox (Sparkles)
│   ├── TitleDescription
│   └── AIActions
│       ├── GenerateTasksButton
│       ├── SmartAssignButton
│       └── AutoScheduleButton
│
├── WorkflowTabs (5 tabs)
│   ├── EventPlanningTab
│   ├── SponsorshipTab
│   ├── MarketingTab
│   ├── OperationsTab
│   └── MediaTab
│
├── WorkflowMiniNav (Step Timeline)
│   └── StepIndicator × 5
│       ├── StepNumber
│       ├── StepIcon
│       ├── StepTitle
│       └── ProgressDot/Checkmark
│
├── MainContent (Two Columns)
│   ├── TasksSection (Left)
│   │   ├── SectionHeader
│   │   ├── AddTaskButton
│   │   └── TaskList
│   │       └── TaskItem × N
│   │           ├── Checkbox
│   │           ├── PriorityIndicator
│   │           ├── TaskTitle
│   │           ├── MetadataRow
│   │           ├── StatusBadge
│   │           └── MoreOptions
│   │
│   └── DeliverablesSection (Right)
│       ├── SectionHeader
│       ├── AddDeliverableButton
│       └── DeliverableGrid
│           └── DeliverableCard × N
│               ├── Name
│               ├── TypeBadge
│               ├── Metadata
│               ├── StatusIndicator
│               └── ActionButton
│
└── ProgressSummary (Bottom)
    ├── Title
    ├── ProgressBar
    ├── StatsRow
    └── NextStepButton
```

---

## J. Design Tokens & Styling

### Typography Scale
```css
/* Headers */
h1: 20px, serif, medium (Gemini header)
h2: 18px, sans, semibold (Section headers)
h3: 14px, sans, semibold (Card titles)

/* Body */
body: 14px, sans, regular
small: 12px, sans, regular
tiny: 10px, sans, bold (Badges)
```

### Color Palette
```css
/* Gemini AI Header */
--gradient-start: #312E81 (indigo-900)
--gradient-end: #5B21B6 (violet-900)
--overlay-white: rgba(255,255,255,0.1)
--overlay-indigo: rgba(99,102,241,0.2)

/* Primary */
--indigo-600: #4F46E5
--indigo-50: #EEF2FF

/* Priority Colors */
--high: #DC2626 (red-500)
--medium: #F59E0B (amber-500)
--low: #A8A29E (gray-400)

/* Status Colors */
--backlog: gray-100/700
--in-progress: blue-50/700
--review: amber-50/700
--completed: green-50/700
```

### Spacing System
```css
--gap-tasks: 12px
--gap-deliverables: 16px
--section-padding: 16px
--header-padding: 24px
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.07)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--shadow-gemini: 0 10px 25px rgba(79,70,229,0.2)
```

---

## K. Accessibility Notes

### Keyboard Navigation
- Tab through: Gemini actions → Workflow tabs → Step nav → Tasks → Deliverables
- Space: Toggle checkbox
- Enter: Open task/deliverable detail
- Arrow keys: Navigate step timeline

### Screen Reader Support
- Gemini header has descriptive ARIA labels
- Task checkboxes have labels
- Progress bar has aria-valuenow, aria-valuemin, aria-valuemax
- Status badges have descriptive text

---

## L. Performance Considerations

### Data Loading
- Lazy load tasks/deliverables per step (not all at once)
- Cache workflow structure
- Debounce AI generation requests
- Optimistic UI updates for task completion

---

**Document Version:** 1.0  
**Last Updated:** December 9, 2025  
**Next Review:** March 2026  
**Owner:** Product Team
