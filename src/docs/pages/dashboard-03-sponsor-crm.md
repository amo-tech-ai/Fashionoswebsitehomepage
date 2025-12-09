# Dashboard Documentation - Sponsor CRM

**Page Name:** Sponsor CRM  
**Route:** `/sponsors`  
**File:** `/components/dashboards/SponsorCRM.tsx`  
**Version:** 1.0  
**Last Updated:** December 9, 2025

---

## A. Page Overview

### Purpose
The Sponsor CRM (Customer Relationship Management) dashboard is a comprehensive sales pipeline tool for managing fashion event sponsorships. It combines a kanban-style deal pipeline with traditional CRM table views, AI-powered fit scoring, and activity tracking to help event planners manage sponsor relationships from initial lead to closed deal.

### Who Uses It
- **Event Planners** - Manage sponsor pipeline and close deals
- **Sales Team** - Track leads, proposals, and negotiations
- **Sponsorship Directors** - Monitor overall sponsor performance
- **Account Managers** - Manage individual sponsor relationships
- **Executive Team** - View sponsorship revenue and pipeline health

### Key Value Propositions
- **Visual pipeline management** with 6-stage kanban board
- **AI-powered fit scoring** to identify best-match sponsors
- **Deal tracking** from lead to closed-won ($680k tracked)
- **Activity feed** for sponsor interaction history
- **Comprehensive sponsor database** with filterable table view

---

## B. Page Structure

### Layout Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ [Sticky Header]                                         │
│  - Breadcrumb (Sponsors / CRM Dashboard)               │
│  - Page Title: Sponsor CRM                             │
│  - Description                                          │
│  - Search Bar                                           │
│  - Import CSV / New Sponsor CTAs                       │
├─────────────────────────────────────────────────────────┤
│ [KPI Row - 4 Metrics]                                  │
│  [Total][Pipeline][Fit Score][Closed-Won]             │
├─────────────────────────────────────────────────────────┤
│ [Main Content - Two Column Layout]                     │
│                                                         │
│  ┌────────────────────────┬──────────────────────┐     │
│  │ LEFT COLUMN (9/12)     │ RIGHT COLUMN (3/12)  │     │
│  │                        │                      │     │
│  │ Kanban Pipeline Board  │ AI Insights          │     │
│  │ (6 Columns)            │                      │     │
│  │ ┌──┬──┬──┬──┬──┬──┐   │ Recent Activity      │     │
│  │ │  │  │  │  │  │  │   │                      │     │
│  │ └──┴──┴──┴──┴──┴──┘   │                      │     │
│  │                        │                      │     │
│  │ All Sponsors Table     │ Quick Actions        │     │
│  │ (Searchable/Sortable)  │                      │     │
│  │                        │                      │     │
│  └────────────────────────┴──────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### Responsive Behavior

**Desktop (1024px+):**
- Full 12-column grid
- KPI metrics: 4 columns (equal width)
- Kanban board: Horizontal scroll, 6 visible columns
- Main content: 9 columns left / 3 columns right
- Table: Full width with all 7 columns visible

**Tablet (768px - 1023px):**
- KPI metrics: 2 columns × 2 rows
- Kanban board: Horizontal scroll required
- Main content: Stacked (pipeline on top, sidebar below)
- Table: Horizontal scroll

**Mobile (<768px):**
- Header: Stacked layout
- KPI metrics: 1 column × 4 rows (stacked cards)
- Kanban: Horizontal swipe/scroll
- Table: Card-based view (transforms to mobile cards)
- Sidebar: Full width below main content

---

## C. Content Blocks (Section-by-Section)

### Header Section

**Breadcrumb Navigation**
```
Sponsors / CRM Dashboard
```
- Font: 14px, gray-500
- Active segment: indigo-600, medium
- Separator: "/" in gray-300

**Page Title**
```
Sponsor CRM
```
- Font: 24px serif, gray-900
- Margin-bottom: 4px

**Description**
```
Manage sponsors, leads, and partnerships
```
- Font: 14px, gray-500

**Search & Actions Row**

**Search Bar:**
- Width: 256px (desktop), full (mobile)
- Placeholder: "Search sponsors..."
- Icon: Search (left, 16px, gray-400)
- Background: gray-50
- Border: 1px gray-200
- Border-radius: 8px
- Focus: Ring 2px indigo-500, background white

**Import CSV Button:**
- Icon: Upload (16px)
- Text: "Import CSV"
- Background: white
- Border: 1px gray-200
- Hover: gray-50
- Size: 14px text

**New Sponsor Button:**
- Icon: Plus (16px)
- Text: "New Sponsor"
- Background: indigo-600
- Text: white, 14px
- Hover: indigo-700
- Shadow: sm
- Click: Opens new sponsor form/modal

---

### KPI Overview Row (4 Metrics)

**KPI Grid:**
- Grid: 4 columns (desktop), 2×2 (tablet), 1×4 (mobile)
- Gap: 16px
- Margin-bottom: 24px

**KPI Card Specifications:**
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Padding: 20px
- Shadow: sm
- Hover: Shadow md, progress bar expands
- Animation: Fade in with stagger (50ms delay each)

**Card Content Structure:**
- Label: 14px, gray-500, margin-bottom 8px
- Value: 24px, semibold, gray-900
- Trend: 12px, medium, green-600 (positive) / red-600 (negative)
- Progress bar: 4px height, gray-100 background, indigo-600 fill
- Progress animation: Expands from 66% to 100% on hover (500ms)

---

**KPI 1: Total Sponsors**
```
Label: Total Sponsors
Value: 84
Trend: +12% vs last season (green)
Progress: Animated bar
```

**KPI 2: Deals In Pipeline**
```
Label: Deals In Pipeline
Value: 32
Trend: 4 closing this week (green)
Progress: Animated bar
```

**KPI 3: Avg Fit Score**
```
Label: Avg Fit Score
Value: 82
Trend: +5 points (green)
Progress: Animated bar
```

**KPI 4: Closed-Won**
```
Label: Closed-Won
Value: $680k
Trend: Target: $1M (green)
Progress: Animated bar
```

---

### Kanban Pipeline Board (Main Section)

**Pipeline Structure:**

6-column kanban board representing the sponsorship sales funnel:

1. **New Leads** (12 deals) - Blue
2. **Qualified** (8 deals) - Indigo
3. **Discovery** (6 deals) - Purple
4. **Proposal Sent** (4 deals) - Amber
5. **Negotiation** (3 deals) - Orange
6. **Closed-Won** (14 deals) - Green

**Board Container:**
- Horizontal scroll required (min-width: 1200px)
- Gap: 16px between columns
- Padding-bottom: 16px (scroll indicator space)
- Overflow-x: auto
- Scroll behavior: smooth

**Column Specifications:**

**Column Header:**
- Background: white
- Border-top: 4px (color-coded by stage)
- Border-x and border-b: 1px gray-200
- Border-radius: 8px top
- Padding: 12px
- Shadow: sm
- Margin-bottom: 12px

**Header Content:**
- Label: 14px, medium, gray-900
- Count Badge: gray-100 background, gray-600 text, 11px, rounded-full, padding 4px 8px

**Color Coding:**
- New Leads: `border-t-blue-500`
- Qualified: `border-t-indigo-500`
- Discovery: `border-t-purple-500`
- Proposal Sent: `border-t-amber-500`
- Negotiation: `border-t-orange-500`
- Closed-Won: `border-t-green-500`

---

**Deal Card Specifications:**

Each sponsor deal card displays:
- Brand name
- Category badge
- Deal value
- AI fit score
- Next action step

**Card Structure:**
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Padding: 16px
- Shadow: sm
- Hover: Shadow md, border indigo-300
- Click: Navigate to `/sponsor-detail`
- Animation: layoutId for drag-drop (Framer Motion)
- Cursor: pointer

**Card Content:**

**Row 1: Brand & Category**
- Brand name: 18px serif, medium, gray-900
- Category badge: 10px, bold, uppercase, tracking-wide, rounded-full, padding 4px 8px
- Category colors:
  - Luxury: `bg-slate-100 text-slate-700`
  - Sportswear: `bg-orange-50 text-orange-700`
  - Beauty: `bg-pink-50 text-pink-700`
  - Tech: `bg-blue-50 text-blue-700`

**Row 2: Value & Fit Score**
- Deal value: 14px, medium, gray-900
- Fit score: Sparkles icon (12px, indigo-500) + number (12px, gray-500)
- Title attribute: "Fit Score" (tooltip)

**Row 3: Next Step**
- Divider: Border-top 1px gray-50, padding-top 12px
- Label: "Next Step" (11px, gray-400)
- Action text: 12px, medium, indigo-600
- Chevron icon: Appears on hover (12px, opacity 0 → 100)

**Empty Column State:**
- Height: 96px
- Border: 2px dashed gray-100
- Border-radius: 12px
- Text: "No deals" (11px, gray-400)
- Center aligned

---

**Sample Deal Cards:**

**Card 1: Chanel (Proposal Sent)**
```
Brand: Chanel
Category: Luxury (slate badge)
Value: $75,000
Fit Score: 92 (excellent)
Next Step: Review proposal draft
```

**Card 2: Dior (Negotiation)**
```
Brand: Dior
Category: Luxury
Value: $150,000
Fit Score: 88 (excellent)
Next Step: Prepare contract
```

**Card 3: Puma (Qualified)**
```
Brand: Puma
Category: Sportswear (orange badge)
Value: $40,000
Fit Score: 71 (good)
Next Step: Set meeting
```

**Card 4: Glossier (New Leads)**
```
Brand: Glossier
Category: Beauty (pink badge)
Value: $25,000
Fit Score: 94 (excellent)
Next Step: Send initial outreach
```

**Card 5: Samsung (Discovery)**
```
Brand: Samsung
Category: Tech (blue badge)
Value: $100,000
Fit Score: 65 (fair)
Next Step: Schedule demo
```

---

### All Sponsors Table (Below Kanban)

**Table Container:**
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Shadow: sm
- Overflow: hidden

**Table Header:**
- Padding: 16px 24px
- Border-bottom: 1px gray-100
- Background: white
- Flex: Space-between

**Title:**
- Text: "All Sponsors"
- Font: 16px, medium, gray-900

**Action Buttons:**
- Filter button: Icon 16px, hover gray-50
- More options: Icon 16px, hover gray-50

**Table Structure:**

7 columns displaying comprehensive sponsor data:

| Column | Width | Alignment | Data Type |
|--------|-------|-----------|-----------|
| Brand | Auto | Left | Text (bold) |
| Category | Auto | Left | Text |
| Budget | Auto | Left | Range |
| Fit Score | Auto | Left | Badge (colored) |
| Owner | Auto | Left | Text |
| Status | Auto | Left | Dot + Text |
| Action | 120px | Right | Link (hover) |

**Table Header Row:**
- Background: gray-50/50
- Border-bottom: 1px gray-100
- Padding: 12px 24px per cell
- Font: 14px, medium, gray-500

**Table Body Rows:**
- Padding: 16px 24px per cell
- Border-bottom: 1px gray-50 (divider)
- Hover: gray-50/50 background
- Transition: colors 200ms

**Cell Specifications:**

**Brand Cell:**
- Font: 14px, medium, gray-900

**Category Cell:**
- Font: 14px, gray-600

**Budget Cell:**
- Font: 14px, gray-600
- Format: "75-100k", "150k+", "20-40k"

**Fit Score Cell:**
- Badge with conditional coloring:
  - 90+: `bg-green-50 text-green-700` (Excellent)
  - 80-89: `bg-indigo-50 text-indigo-700` (Good)
  - <80: `bg-amber-50 text-amber-700` (Fair)
- Font: 11px, medium
- Padding: 2px 8px
- Border-radius: full

**Owner Cell:**
- Font: 14px, gray-600

**Status Cell:**
- Dot indicator: 6px circle (colored by status)
- Text: 14px, gray-700
- Gap: 6px
- Status colors:
  - Proposal Sent: amber-500
  - Qualified: indigo-500
  - Discovery: purple-500
  - New Lead: gray-400
  - Negotiation: orange-500

**Action Cell:**
- Link: "View Profile"
- Font: 11px, medium, indigo-600
- Hover: indigo-800
- Opacity: 0 (shows on row hover → 100)
- Transition: opacity 200ms
- Click: Navigate to `/sponsor-detail`

---

**Sample Table Rows:**

**Row 1:**
```
Brand: Dior
Category: Luxury
Budget: 75-100k
Fit Score: 88 (indigo badge)
Owner: Sarah K.
Status: ● Proposal Sent (amber dot)
Action: View Profile
```

**Row 2:**
```
Brand: Puma
Category: Sportswear
Budget: 20-40k
Fit Score: 71 (amber badge)
Owner: Daniel G.
Status: ● Qualified (indigo dot)
Action: View Profile
```

**Row 3:**
```
Brand: Gucci
Category: Luxury
Budget: 100-200k
Fit Score: 94 (green badge)
Owner: Maria R.
Status: ● Discovery (purple dot)
Action: View Profile
```

**Row 4:**
```
Brand: Sephora
Category: Beauty
Budget: 40-60k
Fit Score: 85 (indigo badge)
Owner: Elena M.
Status: ● New Lead (gray dot)
Action: View Profile
```

**Row 5:**
```
Brand: Tesla
Category: Auto
Budget: 150k+
Fit Score: 62 (amber badge)
Owner: James L.
Status: ● Negotiation (orange dot)
Action: View Profile
```

---

### Right Sidebar - AI Insights Panel

**Panel Structure:**
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Padding: 20px
- Shadow: sm
- Margin-bottom: 24px

**Panel Header:**
- Icon: Sparkles (20px, indigo-600)
- Title: "AI Insights"
- Font: 16px, medium, gray-900
- Margin-bottom: 16px

**Insight Cards:**

Each AI insight displays:
- Insight type icon
- Recommendation text
- Confidence score (optional)
- Action button

**Insight Card Specifications:**
- Background: indigo-50
- Border: 1px indigo-100
- Border-radius: 8px
- Padding: 12px
- Margin-bottom: 12px

**Sample Insights:**

**Insight 1: High-Value Lead**
```
💎 High-Value Lead Detected
Glossier matches 94% of your criteria
Recommended budget: $25-35k
[Contact Now]
```

**Insight 2: Follow-Up Reminder**
```
⏰ Follow-Up Recommended
3 sponsors haven't been contacted in 7+ days
[View List]
```

**Insight 3: Deal at Risk**
```
⚠️ Deal May Stall
Puma proposal viewed but no response (5 days)
[Send Follow-Up]
```

---

### Right Sidebar - Recent Activity Feed

**Panel Header:**
- Icon: Activity (20px, gray-600)
- Title: "Recent Activity"
- Font: 16px, medium, gray-900

**Activity List:**
- Space-y: 16px (gap between items)
- No dividers (clean list)

**Activity Item Specifications:**

Each item shows:
- Icon circle (left)
- Activity text
- Timestamp (right)

**Item Structure:**
- Flex row
- Gap: 12px
- Align-items: center

**Icon Circle:**
- Size: 32px × 32px
- Border-radius: full
- Background: Varies by type
- Icon: 16px, centered
- Padding: 8px

**Activity Types & Colors:**
- Phone call: `bg-green-100 text-green-600`
- Email sent: `bg-blue-100 text-blue-600`
- Document viewed: `bg-purple-100 text-purple-600`
- New lead: `bg-gray-100 text-gray-600`

**Text:**
- Font: 14px, gray-700
- Line-clamp: 1 (truncate long text)

**Timestamp:**
- Font: 11px, gray-400
- Format: "2:14 PM", "Yesterday", "2 days ago"

---

**Sample Activity Items:**

**Activity 1:**
```
🟢 Call with Gucci completed
   2:14 PM
```

**Activity 2:**
```
🔵 Proposal sent to Prada
   Yesterday
```

**Activity 3:**
```
🟣 Marie from Chanel viewed pitch deck
   Yesterday
```

**Activity 4:**
```
⚪ New sponsor lead added: Fendi
   2 days ago
```

---

### Right Sidebar - Quick Actions

**Panel Header:**
- Title: "Quick Actions"
- Font: 16px, medium, gray-900

**Action Buttons (Vertical Stack):**

1. **Add New Lead**
   - Icon: Plus
   - Text: "Add New Lead"
   - Action: Opens lead form modal

2. **Import Contacts**
   - Icon: Upload
   - Text: "Import from CSV"
   - Action: File upload dialog

3. **Generate Report**
   - Icon: FileText
   - Text: "Pipeline Report"
   - Action: Exports PDF/Excel

4. **AI Matching**
   - Icon: Sparkles
   - Text: "Find Match Sponsors"
   - Action: Opens AI matching tool

**Button Specifications:**
- Full width
- Background: white
- Border: 1px gray-200
- Padding: 12px
- Border-radius: 8px
- Hover: gray-50 background, border indigo-300
- Icon: 16px, gray-600
- Text: 14px, gray-900
- Gap: 8px
- Margin-bottom: 8px

---

## D. UI Actions

### Primary Actions

| Action | Trigger | Behavior | Destination |
|--------|---------|----------|-------------|
| **New Sponsor** | Click header button | Open modal | New sponsor form |
| **Import CSV** | Click header button | File upload | Import dialog |
| **Search Sponsors** | Type in search bar | Filter results | Current page (filtered) |
| **View Sponsor Profile** | Click deal card or table row | Navigate | `/sponsor-detail` |
| **Move Deal** | Drag deal card | Update pipeline stage | Kanban board (same page) |
| **Filter Table** | Click filter icon | Open filter panel | Filter modal |
| **Sort Table** | Click column header | Sort data | Current page (sorted) |
| **AI Matching** | Click quick action | Open AI tool | AI matching modal |

### Kanban Interactions

**Drag & Drop:**
- Grab deal card
- Drag to new column
- Drop to update stage
- Animation: Smooth transition (Framer Motion)
- Update: Backend PUT request
- Feedback: Success toast

**Card Click:**
- Click anywhere on card
- Navigate to sponsor detail page
- Show: Full sponsor profile, deal history, ROI data

### Table Interactions

**Row Hover:**
- Background: gray-50/50
- Action link: Fade in (opacity 0 → 100)

**Sort:**
- Click column header
- Toggle: Ascending ↑ / Descending ↓ / Default
- Visual: Arrow icon next to header

**Filter:**
- Click filter icon
- Modal opens with options:
  - Category (multi-select)
  - Budget range (slider)
  - Fit score range (slider)
  - Owner (dropdown)
  - Status (multi-select)
- Apply filters
- Badge shows active filter count

---

## E. Data Requirements

### Backend Data Structure

**Sponsor Object:**
```typescript
interface Sponsor {
  id: string;
  brand: string;
  category: 'Luxury' | 'Sportswear' | 'Beauty' | 'Tech' | 'Auto' | 'Other';
  budget: {
    min: number;
    max: number;
    display: string; // "75-100k"
  };
  fitScore: number; // 0-100 (AI-calculated)
  dealValue: number;
  stage: 'leads' | 'qualified' | 'discovery' | 'proposal' | 'negotiation' | 'closed';
  owner: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: string;
  nextAction: string;
  contacts: Contact[];
  dealHistory: DealEvent[];
  createdAt: string;
  updatedAt: string;
}
```

**Pipeline Stats:**
```typescript
interface PipelineStats {
  totalSponsors: {
    count: number;
    trend: string;
    positive: boolean;
  };
  dealsInPipeline: {
    count: number;
    trend: string;
  };
  avgFitScore: {
    value: number;
    trend: string;
  };
  closedWon: {
    value: number; // dollars
    target: number;
    trend: string;
  };
}
```

**Activity Event:**
```typescript
interface ActivityEvent {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'document' | 'note' | 'new_lead';
  text: string;
  timestamp: string; // ISO 8601
  relativeTime: string; // "2:14 PM", "Yesterday"
  userId: string;
  sponsorId?: string;
  metadata?: Record<string, any>;
}
```

**AI Insight:**
```typescript
interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  confidence: number; // 0-100
  actionLabel: string;
  actionUrl?: string;
  actionHandler?: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}
```

### API Endpoints Required

```
GET /api/sponsors
  → Returns paginated sponsor list with filters
  Query params: category, stage, budget_min, budget_max, fit_min, search, sort

GET /api/sponsors/:sponsorId
  → Returns detailed sponsor profile

GET /api/sponsors/pipeline
  → Returns pipeline stats and kanban data

POST /api/sponsors
  → Creates new sponsor lead

PATCH /api/sponsors/:sponsorId
  → Updates sponsor details

PATCH /api/sponsors/:sponsorId/stage
  → Moves sponsor to new pipeline stage (drag-drop)

POST /api/sponsors/import
  → Bulk import from CSV

GET /api/sponsors/activity
  → Returns recent activity feed (limit 10)

GET /api/sponsors/ai-insights
  → Returns AI-generated insights and recommendations

GET /api/sponsors/:sponsorId/fit-score
  → Returns AI fit score calculation details

POST /api/sponsors/ai-match
  → Finds potential sponsor matches based on event criteria
```

### Sample Data States

**Empty State (No Sponsors):**
```
[Empty state illustration]
"No sponsors yet"
"Add your first sponsor lead to get started"
[New Sponsor Button]
```

**Loading State:**
- Skeleton loaders for KPI cards
- Pulse animation on kanban columns
- Gray placeholder boxes for table rows

**Error State:**
```
[Alert banner]
"Failed to load sponsor data"
[Retry Button]
```

---

## F. Workflows

### Workflow 1: Adding a New Sponsor Lead

```
1. User clicks "New Sponsor" button
2. Modal opens with lead form:
   - Brand name
   - Category (dropdown)
   - Budget range
   - Contact information
   - Notes
3. User fills form and submits
4. Backend calculates AI fit score
5. New sponsor card appears in "New Leads" column
6. KPIs update:
   - Total Sponsors: +1
   - Deals In Pipeline: +1
7. Activity feed updates: "New sponsor lead added: [Brand]"
8. Success toast: "Sponsor lead added successfully"
```

### Workflow 2: Moving Deal Through Pipeline

```
1. User views kanban board
2. Identifies Glossier card in "New Leads" column
3. Grabs card with mouse/touch
4. Drags card to "Qualified" column
5. Drops card
6. Card animates to new position (Framer Motion)
7. Backend updates sponsor stage
8. Column counts update:
   - New Leads: 12 → 11
   - Qualified: 8 → 9
9. Activity feed: "Glossier moved to Qualified"
10. Next action updates to reflect new stage
```

### Workflow 3: Reviewing Sponsor Detail

```
1. User clicks "Dior" card in kanban (Negotiation column)
2. Navigate to /sponsor-detail
3. Page shows:
   - Sponsor profile (logo, category, contacts)
   - Deal value: $150,000
   - Fit score: 88 (with breakdown)
   - Current stage: Negotiation
   - Deal history timeline
   - Documents (proposal, contract draft)
   - ROI projections
   - Activity log
4. User uploads signed contract
5. User moves deal to "Closed-Won"
6. Returns to Sponsor CRM
7. Dior card moves to "Closed-Won" column
8. KPIs update: Closed-Won $680k → $830k
```

### Workflow 4: Using AI Matching

```
1. User clicks "Find Match Sponsors" in Quick Actions
2. AI Matching modal opens
3. User selects event type: "Fashion Week"
4. User inputs event details:
   - Venue: Skylight Clarkson NYC
   - Expected attendance: 1,500
   - Demographic: 25-45, luxury
   - Budget: $500k total sponsorship
5. Clicks "Find Matches"
6. AI analyzes database and returns:
   - 8 potential sponsors
   - Ranked by fit score (94 → 65)
   - Each with rationale:
     - "Glossier: 94% match - Target demo alignment, beauty category fit"
     - "Gucci: 91% match - Luxury positioning, past runway sponsorships"
7. User selects 3 sponsors
8. Clicks "Add to Pipeline"
9. 3 new cards appear in "New Leads" column
10. AI insights panel suggests outreach templates
```

### Workflow 5: Filtering & Searching

```
1. User types "luxury" in search bar
2. Table filters in real-time
3. Shows only luxury brands: Dior, Gucci, Chanel
4. User clears search
5. User clicks Filter icon
6. Filter modal opens
7. User selects:
   - Category: Luxury, Beauty
   - Fit Score: 80-100
   - Stage: Discovery, Proposal Sent
8. Applies filters
9. Table shows 6 matching sponsors
10. Kanban shows only relevant cards
11. Filter badge: "3 active filters"
12. User exports filtered list as CSV
```

---

## G. Image Usage

### Sponsor Logos

**Placement:** Deal cards (optional), sponsor detail page, table rows  
**Size:** 
- Card: 40px × 40px circle
- Table: 24px × 24px circle
- Detail page: 80px × 80px  
**Format:** PNG/SVG with transparency  
**Style:** Full color or monochrome  

**Examples:**
- Chanel logo
- Dior logo
- Puma logo
- Glossier logo
- Samsung logo

**Treatment:**
- Border-radius: full (circle)
- Object-fit: contain
- Padding: 4px (inside circle)
- Background: white or transparent

### Empty State Illustration

**Placement:** Center of empty table or empty kanban column  
**Size:** 200px × 200px  
**Style:** Minimalist line art, luxury aesthetic  
**Colors:** gray-300 (outline), indigo-100 (accent)  

### Icon Usage

**Header Icons:**
- Search, Plus, Upload, MoreHorizontal

**Activity Icons:**
- Phone (calls)
- Mail (emails)
- FileText (documents)
- Plus (new leads)
- CheckCircle (completed tasks)
- AlertCircle (issues)

**KPI Icons:**
- TrendingUp, DollarSign, Users, Activity

**Action Icons:**
- Sparkles (AI features, fit score)
- ChevronRight (navigate)
- Filter (table filtering)

**Icon Specifications:**
- Size: 16px (standard), 20px (headers)
- Stroke width: 1.5-2px
- Color: Varies by context (gray-400 default)

---

## H. Wireframe Summary

```
┌──────────────────────────────────────────────────────────────┐
│ Sponsors / CRM Dashboard                  [Search] [CSV] [+] │
│ Sponsor CRM                                                  │
│ Manage sponsors, leads, and partnerships                     │
│                                                              │
│ ┌──────────┬──────────┬──────────┬──────────┐              │
│ │ 84       │ 32       │ 82       │ $680k    │              │
│ │ Total    │ Pipeline │ Fit Score│ Closed   │              │
│ │ Sponsors │ Deals    │          │          │              │
│ └──────────┴──────────┴──────────┴──────────┘              │
│                                                              │
│ ┌────────────────────────────────┬─────────────────────────┐│
│ │ KANBAN BOARD (Scroll →)        │ AI INSIGHTS             ││
│ │ ┌───┬───┬───┬───┬───┬───┐     │ 💎 High-Value Lead      ││
│ │ │New│Qua│Dis│Pro│Neg│Won│     │ ⏰ Follow-Up Due        ││
│ │ │ 12│ 8 │ 6 │ 4 │ 3 │ 14│     │ ⚠️ Deal at Risk         ││
│ │ ├───┼───┼───┼───┼───┼───┤     │                         ││
│ │ │[C]│[P]│[S]│[C]│[D]│   │     │ RECENT ACTIVITY         ││
│ │ │[G]│   │   │   │   │   │     │ 🟢 Call completed       ││
│ │ │   │   │   │   │   │   │     │ 🔵 Proposal sent        ││
│ │ └───┴───┴───┴───┴───┴───┘     │ 🟣 Deck viewed          ││
│ │                                │ ⚪ New lead added        ││
│ │ ALL SPONSORS TABLE             │                         ││
│ │ ┌──────────────────────────┐   │ QUICK ACTIONS           ││
│ │ │Brand │Cat │Budget│Fit│...│   │ [+ Add New Lead]        ││
│ │ ├──────────────────────────┤   │ [↑ Import CSV]          ││
│ │ │Dior  │Lux │75-100│88 │...│   │ [📄 Pipeline Report]    ││
│ │ │Puma  │Spo │20-40 │71 │...│   │ [✨ AI Matching]        ││
│ │ │Gucci │Lux │100-20│94 │...│   │                         ││
│ │ └──────────────────────────┘   │                         ││
│ └────────────────────────────────┴─────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

---

## I. Component Hierarchy

```
SponsorCRM
├── Header (Sticky)
│   ├── Breadcrumb
│   ├── TitleBlock
│   │   ├── PageTitle
│   │   └── Description
│   └── ActionsRow
│       ├── SearchBar
│       ├── ImportButton
│       └── NewSponsorButton
│
├── KPIRow
│   └── KPICard × 4
│       ├── Label
│       ├── ValueTrendRow
│       │   ├── Value
│       │   └── Trend
│       └── ProgressBar
│
└── MainGrid (12 columns)
    ├── LeftColumn (9/12)
    │   ├── KanbanBoard
    │   │   └── PipelineColumn × 6
    │   │       ├── ColumnHeader
    │   │       │   ├── Label
    │   │       │   └── CountBadge
    │   │       └── DealCardList
    │   │           └── DealCard × N
    │   │               ├── BrandCategory
    │   │               ├── ValueFitRow
    │   │               └── NextActionRow
    │   │
    │   └── AllSponsorsTable
    │       ├── TableHeader
    │       ├── TableFilters
    │       └── TableBody
    │           └── SponsorRow × N
    │
    └── RightColumn (3/12)
        ├── AIInsightsPanel
        │   └── InsightCard × 3
        ├── ActivityFeed
        │   └── ActivityItem × 4
        │       ├── IconCircle
        │       ├── Text
        │       └── Timestamp
        └── QuickActions
            └── ActionButton × 4
```

---

## J. Design Tokens & Styling

### Typography Scale
```css
/* Headers */
h1: 24px, serif (Page Title)
h2: 16px, sans, medium (Section Headers)
h3: 18px, serif, medium (Brand Names)

/* Body */
body: 14px, sans, regular
small: 12px, sans, regular
tiny: 10-11px, sans, medium/bold (Badges, Labels)
```

### Color Palette
```css
/* Primary */
--indigo-600: #4F46E5 (Primary buttons, links)
--indigo-700: #4338CA (Hover state)
--indigo-500: #6366F1 (Qualified stage)
--indigo-50: #EEF2FF (AI panel background)

/* Pipeline Stage Colors */
--blue-500: #3B82F6 (New Leads)
--purple-500: #A855F7 (Discovery)
--amber-500: #F59E0B (Proposal Sent)
--orange-500: #F97316 (Negotiation)
--green-500: #22C55E (Closed-Won)

/* Category Colors */
--slate-100/700: Luxury
--orange-50/700: Sportswear
--pink-50/700: Beauty
--blue-50/700: Tech

/* Fit Score Colors */
--green-50/700: 90+ (Excellent)
--indigo-50/700: 80-89 (Good)
--amber-50/700: <80 (Fair)

/* Neutrals */
--gray-50: #FAFAF9 (Background)
--gray-100: #F5F5F4 (Borders, badges)
--gray-200: #E7E5E4
--gray-400: #A8A29E (Icons)
--gray-500: #78716C (Secondary text)
--gray-600: #57534E
--gray-700: #44403C
--gray-900: #1C1917 (Primary text)
```

### Spacing System
```css
/* Gaps */
--gap-sm: 12px
--gap-md: 16px
--gap-lg: 24px
--gap-xl: 32px

/* Padding */
--padding-card: 16px
--padding-table-cell: 16px 24px
--padding-panel: 20px
```

### Border Radius
```css
--radius-sm: 6px (badges)
--radius-md: 8px (buttons, inputs)
--radius-lg: 12px (cards, panels)
--radius-xl: 16px
--radius-full: 9999px (badges, icon circles)
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.07)
```

---

## K. Accessibility Notes

### Keyboard Navigation
- Tab order: Search → Import → New Sponsor → KPIs → Kanban cards → Table rows → Sidebar
- Enter/Space to activate buttons and cards
- Arrow keys to navigate kanban columns
- Escape to close modals

### Drag & Drop Accessibility
- Keyboard alternative: Right-click → Move to [Stage]
- ARIA live region announces stage changes
- Focus indicator on grabbed card

### Screen Reader Support
- Kanban columns have `aria-label`: "New Leads column, 12 deals"
- Fit scores have descriptive labels: "Fit score 88, good match"
- Table has proper `<thead>`, `<tbody>` structure
- Activity feed uses `<ul>` with semantic list items

### Color Contrast
- All text meets WCAG AA
- Pipeline stage colors tested for visibility
- Fit score badges have sufficient contrast

---

## L. Performance Considerations

### Data Loading
- Initial load: KPIs + kanban (first 20 deals)
- Lazy load additional kanban cards on scroll
- Table pagination: 25 rows per page
- Debounce search: 300ms

### Optimizations
- Virtual scrolling for large kanban columns (50+ cards)
- Memoize fit score calculations
- Cache sponsor list for 5 minutes
- Lazy load activity feed (below fold)

### Drag & Drop Performance
- Use Framer Motion `layoutId` for smooth animations
- Optimistic UI updates (update immediately, sync later)
- Rollback on API failure

---

**Document Version:** 1.0  
**Last Updated:** December 9, 2025  
**Next Review:** March 2026  
**Owner:** Product Team
