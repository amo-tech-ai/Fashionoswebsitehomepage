# Dashboard Documentation - Project Overview

**Page Name:** Project Overview (Photography Management)  
**Route:** `/overview` or `/dashboard`  
**File:** `/components/dashboards/ProjectOverview.tsx`  
**Version:** 1.0  
**Last Updated:** December 9, 2025

---

## A. Page Overview

### Purpose
The Project Overview dashboard is the central hub for photography project management. It provides photographers, studios, and clients with real-time visibility into active shoots, upcoming sessions, deliverable tracking, and project status across all photography services.

### Who Uses It
- **Photographers** - Track active shoots and deliverables
- **Studio Managers** - Monitor multiple concurrent projects
- **Clients** - View their project status and deliverables
- **Editors** - See pending review work
- **Account Managers** - Oversee client portfolio

### Key Value Propositions
- **Consolidated project view** across all photography services
- **Progress tracking** with visual indicators and percentages
- **Deliverable management** with status tracking
- **Quick shoot booking** via integrated wizard

---

## B. Page Structure

### Layout Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ [Header Section]                                        │
│  - Page Title & Description                             │
│  - Search Bar                                           │
│  - Filter Button                                        │
│  - "New Shoot" CTA                                      │
├─────────────────────────────────────────────────────────┤
│ [Quick Stats Row - 4 Metrics]                          │
│  [Active][Pending][Shoots][Completed]                  │
├─────────────────────────────────────────────────────────┤
│ [Main Content - 3 Column Grid]                         │
│                                                         │
│  ┌──────────────────────────┬──────────────────┐       │
│  │ LEFT COLUMN (2/3)        │ RIGHT COLUMN     │       │
│  │                          │ (1/3)            │       │
│  │ Active Shoots (3 cards)  │ Recent           │       │
│  │                          │ Deliverables     │       │
│  │ [Shoot Card 1]          │ (List)           │       │
│  │ [Shoot Card 2]          │                  │       │
│  │ [Shoot Card 3]          │ [Item 1]         │       │
│  │                          │ [Item 2]         │       │
│  │                          │ [Item 3]         │       │
│  │                          │ [Item 4]         │       │
│  └──────────────────────────┴──────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Responsive Behavior

**Desktop (1280px+):**
- Header: Flex row, title left, actions right
- Stats: 4 columns (equal width)
- Main content: 2/3 left column + 1/3 right sidebar
- Shoot cards: Full horizontal layout with images

**Tablet (768px - 1279px):**
- Stats: 2 columns × 2 rows
- Main content: Single column (shoots stack on top of deliverables)
- Shoot cards: Horizontal layout maintained

**Mobile (<768px):**
- Header: Stacked (title, then search/actions)
- Stats: 1 column × 4 rows (stacked cards)
- Shoot cards: Vertical layout (image stacks on top of content)
- Deliverables: Remains in sidebar format

---

## C. Content Blocks (Section-by-Section)

### Header Section

**Page Title**
```
Project Overview
```
- Font: 36px serif, gray-900
- Margin-bottom: 8px

**Description**
```
Manage your shoots, deliverables, and client progress.
```
- Font: 16px, regular, gray-500
- Margin-bottom: 40px

**Search & Actions Row**

**Search Bar:**
- Width: 256px (desktop)
- Placeholder: "Search projects..."
- Icon: Search (left-aligned, 16px, gray-400)
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Padding: 10px 16px, 40px left (for icon)
- Focus: Ring 1px gray-300
- Shadow: sm

**Filter Button:**
- Icon: Filter (16px)
- Size: 40px × 40px
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Hover: gray-50 background

**New Shoot Button:**
- Background: gray-900
- Text: white, 14px, medium
- Icon: Plus (16px, left)
- Padding: 10px 20px
- Border-radius: 12px
- Hover: gray-800
- Shadow: lg shadow-gray-900/10
- Click: Navigate to `/wizard` (Shoot Wizard)

---

### Quick Stats Row (4 Metric Cards)

**Stats Grid:**
- Grid: 4 columns (desktop), 2×2 (tablet), 1×4 (mobile)
- Gap: 24px
- Margin-bottom: 48px

**Stat Card Structure:**

Each card displays:
- Icon (top-left)
- Trend badge (top-right)
- Value (large number)
- Label (description)

**Card Specifications:**
- Background: white
- Border: 1px gray-100/50
- Border-radius: 16px
- Padding: 24px
- Shadow: sm
- Hover: Shadow md

**Icon Circle:**
- Size: 48px × 48px
- Background: #F8F5F1 (cream/beige)
- Icon: 20px, gray-900
- Border-radius: 12px
- Padding: 12px

**Trend Badge:**
- Font: 11px, medium
- Padding: 4px 10px
- Border-radius: full
- Positive (+): green-50 background, green-700 text
- Warning: amber-50 background, amber-700 text

**Value:**
- Font: 32px serif, medium, gray-900
- Margin-bottom: 4px

**Label:**
- Font: 14px, gray-500

---

**Stat Card 1: Active Projects**
```
Icon: TrendingUp
Value: 12
Trend: +2 this week (green)
Label: Active Projects
```

**Stat Card 2: Pending Review**
```
Icon: AlertCircle
Value: 8
Trend: Needs attention (amber)
Label: Pending Review
```

**Stat Card 3: Shoots this Week**
```
Icon: Calendar
Value: 3
Trend: On schedule (green)
Label: Shoots this Week
```

**Stat Card 4: Completed**
```
Icon: CheckCircle2
Value: 156
Trend: +12% vs last month (green)
Label: Completed
```

---

### Active Shoots Section (Left Column 2/3)

**Section Header:**
- Title: "Active Shoots"
- Font: 20px serif, medium, gray-900
- Action: "View All" link (14px, gray-500, hover gray-900)
- Flex: Space-between

**Shoot Cards (Horizontal Layout):**

Each shoot displays:
- Project image (left)
- Project details (center)
- Progress bar
- Action button (right)

**Shoot Card Specifications:**
- Background: white
- Border: 1px gray-100
- Border-radius: 16px
- Padding: 20px
- Shadow: sm
- Hover: Shadow md, image scale 105%
- Gap: 24px
- Layout: Flex row (desktop), column (mobile)

**Project Image:**
- Width: 192px (desktop), full (mobile)
- Height: 128px
- Border-radius: 12px
- Object-fit: cover
- Background: gray-100 (while loading)
- Hover: Scale 1.05 (500ms transition)
- Shrink: 0 (maintains size)

**Project Details Section:**

**Project Title:**
- Font: 18px, medium, gray-900
- Margin-bottom: 4px

**Client & Date:**
- Font: 14px, gray-500
- Format: "Client Name • Date"
- Separator: "•"

**Status Badge:**
- Position: Top-right of details section
- Padding: 4px 12px
- Border-radius: full
- Font: 11px, medium
- Border: 1px

**Status Variants:**
- **Shooting:** blue-50 bg, blue-700 text, blue-100 border
- **Editing:** purple-50 bg, purple-700 text, purple-100 border
- **Scheduled:** gray-50 bg, gray-700 text, gray-100 border

**Deliverables & Due Date Row:**
- Font: 11px, gray-500
- Icons: 12px (FileImage, Clock)
- Gap: 16px
- Margin-bottom: 16px

**Progress Bar:**
- Height: 6px
- Background: gray-100
- Fill: gray-900
- Border-radius: full
- Width: Dynamic percentage

**Action Button:**
- Size: 48px × 48px
- Icon: ArrowRight (20px, gray-400)
- Border-radius: full
- Hover: gray-50 background, gray-200 border, icon gray-900
- Click: Navigate to shoot detail page

---

**Sample Shoot Cards:**

**Shoot 1: SS25 Campaign**
```
Image: Fashion editorial photo
Title: SS25 Campaign
Client: Acme Fashion
Status: Shooting (blue)
Date: Oct 24, 2025
Deliverables: 18 Photos, 3 Videos
Due: Due in 3 days
Progress: 65%
```

**Shoot 2: Holiday Lookbook**
```
Image: Fashion lookbook photo
Title: Holiday Lookbook
Client: Velvet & Silk
Status: Editing (purple)
Date: Oct 20, 2025
Deliverables: 45 Photos
Progress: 80%
```

**Shoot 3: Minimalist Essentials**
```
Image: Product photography
Title: Minimalist Essentials
Client: Basis
Status: Scheduled (gray)
Date: Nov 02, 2025
Deliverables: 12 Photos
Progress: 15%
```

---

### Recent Deliverables Section (Right Column 1/3)

**Section Header:**
- Title: "Recent Deliverables"
- Font: 20px serif, medium, gray-900
- Action: "View All" link

**Container:**
- Background: white
- Border: 1px gray-100
- Border-radius: 24px (1.5rem)
- Padding: 24px
- Shadow: sm

**Deliverable List:**

Each item displays:
- Deliverable name
- Status badge
- Due date
- Assigned person

**Deliverable Item Specifications:**
- Padding-bottom: 24px
- Border-bottom: 1px gray-50
- Last item: No border, no padding-bottom
- Gap: 24px between items

**Item Structure:**

**Deliverable Name:**
- Font: 14px, medium, gray-900
- Margin-bottom: 4px

**Metadata Row:**
- Font: 12px, gray-500
- Format: "Due Date • Assigned Person"
- Separator: "•"

**Status Badge:**
- Position: Right-aligned, top
- Padding: 4px 8px
- Font: 10px, bold, uppercase
- Border-radius: 6px

**Status Variants:**
- **Needs Editing:** amber-50 bg, amber-700 text
- **In Review:** blue-50 bg, blue-700 text
- **Approved:** green-50 bg, green-700 text
- **Delivered:** gray-50 bg, gray-700 text

---

**Sample Deliverables:**

**Item 1:**
```
Name: Hero Shot - Beige Trench
Status: Needs Editing (amber)
Due: Oct 28
Assigned: Alex M.
```

**Item 2:**
```
Name: Detail - Gold Buttons
Status: In Review (blue)
Due: Oct 27
Assigned: Sarah K.
```

**Item 3:**
```
Name: BTS Video - Studio A
Status: Approved (green)
Due: Oct 25
Assigned: Mike R.
```

**Item 4:**
```
Name: Lifestyle - Street
Status: Delivered (gray)
Due: Oct 24
Assigned: Alex M.
```

---

## D. UI Actions

### Primary Actions

| Action | Trigger | Behavior | Destination |
|--------|---------|----------|-------------|
| **New Shoot** | Click button | Navigate | `/wizard` (Shoot Wizard) |
| **Search Projects** | Type in search bar | Filter project list | Current page (filtered) |
| **Filter Projects** | Click filter button | Open filter modal | Modal overlay |
| **View Shoot Detail** | Click shoot card or arrow | Navigate | Shoot detail page |
| **View All Shoots** | Click "View All" link | Navigate | Full project list page |
| **View Deliverable** | Click deliverable item | Open | Deliverable detail modal |
| **View All Deliverables** | Click "View All" link | Navigate | `/gallery` |

### Secondary Actions

- **Edit Shoot:** Hover shoot card → "Edit" button appears
- **Delete Shoot:** More options menu → Delete
- **Mark Deliverable Complete:** Status dropdown → Select "Delivered"
- **Assign Deliverable:** Click assignee → Reassign modal

---

## E. Data Requirements

### Backend Data Structure

**Project Object:**
```typescript
interface Project {
  id: string;
  name: string;
  client: {
    id: string;
    name: string;
    logo?: string;
  };
  status: 'Scheduled' | 'Shooting' | 'Editing' | 'Review' | 'Delivered' | 'Completed';
  shootDate: string; // ISO 8601
  dueDate: string;
  deliverables: {
    photos: number;
    videos: number;
  };
  progress: number; // 0-100
  image?: string; // Project hero image
  assignedPhotographer?: string;
  assignedEditor?: string;
}
```

**Deliverable Object:**
```typescript
interface Deliverable {
  id: string;
  projectId: string;
  name: string;
  type: 'Photo' | 'Video' | 'BTS' | 'Other';
  status: 'Needs Editing' | 'In Review' | 'Approved' | 'Delivered';
  dueDate: string; // ISO 8601
  assignedTo: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Dashboard Stats:**
```typescript
interface DashboardStats {
  activeProjects: {
    count: number;
    trend: string; // e.g., "+2 this week"
    trendDirection: 'up' | 'down' | 'neutral';
  };
  pendingReview: {
    count: number;
    trend: string;
  };
  shootsThisWeek: {
    count: number;
    trend: string;
  };
  completed: {
    count: number;
    trend: string;
  };
}
```

### API Endpoints Required

```
GET /api/projects/overview
  → Returns dashboard stats + active projects list

GET /api/projects
  → Returns paginated project list with filters
  Query params: status, client, date_range, search

GET /api/projects/:projectId
  → Returns detailed project information

GET /api/deliverables/recent
  → Returns recent deliverables (limit 10)

GET /api/deliverables
  → Returns paginated deliverable list

POST /api/projects
  → Creates new project (called from wizard)

PATCH /api/projects/:projectId
  → Updates project details

PATCH /api/deliverables/:deliverableId
  → Updates deliverable status

GET /api/stats/dashboard
  → Returns real-time dashboard statistics
```

### Sample Data States

**Empty State (No Projects):**
```
Active Projects: 0
Pending Review: 0
Shoots this Week: 0
Completed: 0

[Empty state illustration]
"No active projects yet"
"Start your first shoot"
[New Shoot Button]
```

**Loading State:**
- Skeleton loaders for stat cards
- Pulse animation on shoot cards
- Gray placeholder boxes for images

**Error State:**
```
[Alert banner]
"Failed to load projects"
[Retry Button]
"Try again"
```

---

## F. Workflows

### Workflow 1: Creating a New Shoot

```
1. User clicks "New Shoot" button
2. Navigate to /wizard (Shoot Wizard)
3. User completes 6-step wizard:
   - Step 1: Service selection
   - Step 2: Project details
   - Step 3: Date & location
   - Step 4: Requirements
   - Step 5: Contact info
   - Step 6: Confirmation
4. Shoot created and added to Project Overview
5. New project appears in "Active Shoots" section
6. Stats update:
   - Active Projects: +1
   - Shoots this Week: +1 (if this week)
```

### Workflow 2: Tracking Shoot Progress

```
1. User views "Active Shoots" section
2. Three shoots displayed:
   - SS25 Campaign: 65% progress (Shooting)
   - Holiday Lookbook: 80% progress (Editing)
   - Minimalist Essentials: 15% progress (Scheduled)
3. User clicks "SS25 Campaign" card
4. Navigate to shoot detail page
5. User sees:
   - Full shot list
   - Deliverable breakdown
   - Team assignments
   - Client notes
6. User marks shots as complete
7. Progress bar updates: 65% → 73%
8. Status changes: Shooting → Editing (when all shots done)
9. Returns to Project Overview
10. Card reflects new status and progress
```

### Workflow 3: Managing Deliverables

```
1. User views "Recent Deliverables" sidebar
2. Sees 4 deliverables:
   - Hero Shot: Needs Editing (due Oct 28)
   - Detail Shot: In Review (due Oct 27)
   - BTS Video: Approved (due Oct 25)
   - Lifestyle: Delivered (due Oct 24)
3. User clicks "Hero Shot - Beige Trench"
4. Deliverable detail modal opens showing:
   - Full-size preview
   - Metadata (resolution, format, file size)
   - Edit history
   - Comments
   - Status workflow: Needs Editing → In Review → Approved → Delivered
5. User uploads edited version
6. Status changes: Needs Editing → In Review
7. Modal closes
8. Deliverable list updates with new status
9. Stats update: Pending Review +1
```

### Workflow 4: Searching & Filtering Projects

```
1. User types "campaign" in search bar
2. Project list filters in real-time
3. Shows only matching projects:
   - SS25 Campaign
   - [Other campaign projects]
4. User clears search
5. User clicks Filter button
6. Filter modal opens with options:
   - Status: [All][Scheduled][Shooting][Editing][Review]
   - Client: [Dropdown of clients]
   - Date Range: [Date picker]
   - Service Type: [Photos][Videos][Both]
7. User selects:
   - Status: Editing
   - Client: Acme Fashion
8. Applies filters
9. Project list shows only matching results
10. Filter badge appears: "2 active filters"
11. User can clear filters individually or all at once
```

---

## G. Image Usage

### Project Hero Images

**Placement:** Left side of shoot cards  
**Size:** 192px × 128px  
**Aspect Ratio:** 3:2  
**Format:** WebP with JPG fallback  
**Style:** Fashion photography (editorial, product, or lifestyle)  

**Image Examples:**
- **SS25 Campaign:** Editorial fashion shoot (model in styled outfit)
- **Holiday Lookbook:** Seasonal fashion photography
- **Minimalist Essentials:** Clean product photography on white/minimal background

**Image Treatment:**
- Border-radius: 12px
- Object-fit: cover
- Hover: Scale 1.05 (smooth 500ms transition)
- Loading: Gray-100 placeholder with pulse animation

### Deliverable Thumbnails

**Placement:** Deliverable detail modal (when clicked)  
**Size:** Variable (modal width)  
**Aspect Ratio:** Original (maintains aspect)  
**Format:** WebP with JPG fallback  

### Icon Usage

**Stat Card Icons:**
- TrendingUp (Active Projects)
- AlertCircle (Pending Review)
- Calendar (Shoots this Week)
- CheckCircle2 (Completed)

**Action Icons:**
- Search (search bar)
- Filter (filter button)
- Plus (new shoot button)
- FileImage (deliverables count)
- Clock (due date)
- ArrowRight (navigate to detail)
- MoreHorizontal (more options)

**Icon Specifications:**
- Size: 16-20px
- Color: gray-400 (inactive), gray-600 (active), gray-900 (hover)
- Stroke width: 1.5-2px

---

## H. Wireframe Summary

```
┌──────────────────────────────────────────────────────────────┐
│ Project Overview                              [Search] [≡] [+]│
│ Manage your shoots, deliverables, and client progress.      │
│                                                              │
│ ┌──────────┬──────────┬──────────┬──────────┐              │
│ │ 📈  12   │ ⚠️   8   │ 📅  3    │ ✓  156   │              │
│ │ Active   │ Pending  │ Shoots   │ Completed│              │
│ │ Projects │ Review   │ this Week│          │              │
│ └──────────┴──────────┴──────────┴──────────┘              │
│                                                              │
│ ┌────────────────────────────────┬─────────────────────────┐│
│ │ Active Shoots     [View All →] │ Recent Deliverables     ││
│ │                                │ [View All →]            ││
│ │ ┌────────────────────────────┐ │                         ││
│ │ │ [Img] SS25 Campaign        │ │ Hero Shot - Beige      ││
│ │ │       Acme Fashion         │ │ Needs Editing          ││
│ │ │       Shooting   65% ████  │ │ Oct 28 • Alex M.       ││
│ │ └────────────────────────────┘ │ ─────────────────      ││
│ │                                │ Detail - Gold Buttons  ││
│ │ ┌────────────────────────────┐ │ In Review              ││
│ │ │ [Img] Holiday Lookbook     │ │ Oct 27 • Sarah K.      ││
│ │ │       Velvet & Silk        │ │ ─────────────────      ││
│ │ │       Editing    80% █████ │ │ BTS Video - Studio A   ││
│ │ └────────────────────────────┘ │ Approved               ││
│ │                                │ Oct 25 • Mike R.       ││
│ │ ┌────────────────────────────┐ │ ─────────────────      ││
│ │ │ [Img] Minimalist Essentials│ │ Lifestyle - Street     ││
│ │ │       Basis                │ │ Delivered              ││
│ │ │       Scheduled  15% ██    │ │ Oct 24 • Alex M.       ││
│ │ └────────────────────────────┘ │                         ││
│ └────────────────────────────────┴─────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

---

## I. Component Hierarchy

```
ProjectOverview
├── Header
│   ├── TitleBlock
│   │   ├── PageTitle
│   │   └── Description
│   └── ActionsRow
│       ├── SearchBar
│       ├── FilterButton
│       └── NewShootButton
│
├── StatsGrid (4 cards)
│   └── StatCard × 4
│       ├── IconCircle
│       ├── TrendBadge
│       ├── Value
│       └── Label
│
└── MainGrid (3 columns)
    ├── LeftColumn (2/3)
    │   ├── SectionHeader
    │   └── ShootCardList
    │       └── ShootCard × 3
    │           ├── ProjectImage
    │           ├── ProjectDetails
    │           │   ├── Title
    │           │   ├── ClientDate
    │           │   ├── StatusBadge
    │           │   ├── DeliverablesRow
    │           │   └── ProgressBar
    │           └── ActionButton
    │
    └── RightColumn (1/3)
        ├── SectionHeader
        └── DeliverablesPanel
            └── DeliverableItem × 4
                ├── Name
                ├── StatusBadge
                └── Metadata
```

---

## J. Design Tokens & Styling

### Typography Scale
```css
/* Headers */
h1: 36px, serif (Page Title)
h2: 20px, serif, medium (Section Headers)
h3: 18px, sans, medium (Card Titles)

/* Body */
body: 14px, sans, regular
small: 12px, sans, regular
tiny: 11px, sans, medium (Labels, Badges)
```

### Color Palette
```css
/* Primary */
--gray-900: #1C1917 (Dark text, buttons)
--gray-700: #44403C
--gray-500: #78716C (Secondary text)
--gray-400: #A8A29E (Icons)

/* Neutrals */
--white: #FFFFFF
--cream: #F8F5F1 (Background, icon circles)
--gray-50: #FAFAF9
--gray-100: #F5F5F4

/* Status Colors */
--blue-50: #EFF6FF (Shooting status)
--blue-700: #1D4ED8
--purple-50: #FAF5FF (Editing status)
--purple-700: #7C3AED
--green-50: #F0FDF4 (Completed/Approved)
--green-700: #15803D
--amber-50: #FFFBEB (Warning/Needs attention)
--amber-700: #B45309

/* Borders */
--border-gray: #E7E5E4 (gray-200)
--border-light: rgba(229, 231, 235, 0.5) (gray-100/50)
```

### Spacing System
```css
/* Gaps */
--gap-sm: 16px
--gap-md: 24px
--gap-lg: 32px
--gap-xl: 48px

/* Section Spacing */
--section-mb: 48px (between major sections)
--card-gap: 16px (between shoot cards)
```

### Border Radius
```css
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 24px (deliverables panel)
--radius-full: 9999px (badges, buttons)
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.07)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)
--shadow-dark: 0 10px 15px rgba(0,0,0,0.1) (New Shoot button)
```

---

## K. Accessibility Notes

### Keyboard Navigation
- Tab order: Search → Filter → New Shoot → Shoot cards → Deliverable items
- Enter/Space to activate buttons and cards
- Escape to close modals
- Arrow keys to navigate through card lists

### Screen Reader Support
- Semantic HTML (`<section>`, `<article>` for cards)
- ARIA labels on icon-only buttons
- Progress bars have `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Status badges have `aria-label` for screen readers

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Status badge colors tested for contrast
- Focus indicators visible (2px outline)

---

## L. Performance Considerations

### Image Optimization
- Lazy load images below fold
- WebP format with JPG fallback
- Responsive images (srcset for different screen sizes)
- Thumbnail caching

### Data Loading
- Initial load: Stats + 3 active shoots
- Lazy load additional shoots on scroll
- Debounce search input (300ms)
- Cache project list for 5 minutes

---

**Document Version:** 1.0  
**Last Updated:** December 9, 2025  
**Next Review:** March 2026  
**Owner:** Product Team
