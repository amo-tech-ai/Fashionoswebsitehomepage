# Dashboard Documentation - Venue Management

**Page Name:** Venue Management  
**Route:** `/venues`  
**File:** `/components/dashboards/VenueManagement.tsx`  
**Related Component:** `/components/dashboards/VenueDetail.tsx`  
**Version:** 1.0  
**Last Updated:** December 9, 2025

---

## A. Page Overview

### Purpose
The Venue Management dashboard is a comprehensive venue discovery and booking platform for fashion events. It provides event planners with a visual gallery of premium fashion venues worldwide, detailed venue specifications, capacity planning, amenity listings, and booking functionality. The system supports two views: a browsable venue gallery and an immersive venue detail experience.

### Who Uses It
- **Event Planners** - Browse and select venues for fashion shows
- **Event Producers** - Review venue technical specifications and capacity
- **Venue Coordinators** - Manage venue availability and bookings
- **Creative Directors** - Visualize event spaces through venue galleries
- **Budget Managers** - Compare venue pricing and packages

### Key Value Propositions
- **Visual-first venue discovery** with high-quality photography
- **Detailed venue specifications** (capacity, amenities, dimensions)
- **Smart filtering** by location, capacity, type, and features
- **Immersive detail view** with multi-tab exploration (gallery, specs, floor plans, availability)
- **Seamless booking workflow** with venue comparison tools

---

## B. Page Structure

### Layout Hierarchy (List View)

```
┌─────────────────────────────────────────────────────────┐
│ [Sticky Header]                                         │
│  - Breadcrumb (Events / Venue Management)              │
│  - Page Title: "Find Your Perfect Venue"              │
│  - Search Bar                                           │
│  - Add Venue CTA                                        │
├─────────────────────────────────────────────────────────┤
│ [Filter Bar]                                            │
│  [Capacity][Location][Type] ... [Apply Filters]        │
├─────────────────────────────────────────────────────────┤
│ [Venue Grid - 3 Columns]                               │
│                                                         │
│  ┌──────────┬──────────┬──────────┐                   │
│  │ Venue 1  │ Venue 2  │ Venue 3  │                   │
│  │ [Image]  │ [Image]  │ [Image]  │                   │
│  │ Details  │ Details  │ Details  │                   │
│  └──────────┴──────────┴──────────┘                   │
│  ┌──────────┬──────────┬──────────┐                   │
│  │ Venue 4  │ Venue 5  │ Venue 6  │                   │
│  └──────────┴──────────┴──────────┘                   │
└─────────────────────────────────────────────────────────┘
```

### Layout Hierarchy (Detail View)

```
┌─────────────────────────────────────────────────────────┐
│ [Sticky Header]                                         │
│  - Breadcrumb (Events / Venue / Skylight Clarkson)    │
│  - Venue Name as Title                                 │
│  - Back to List / Select Venue CTAs                   │
├─────────────────────────────────────────────────────────┤
│ [Tab Navigation]                                        │
│  [Gallery][Specs][Floor Plans][Availability][Reviews] │
├─────────────────────────────────────────────────────────┤
│ [Active Tab Content]                                    │
│                                                         │
│  Gallery: Large image viewer with thumbnails           │
│  Specs: Detailed venue specifications                  │
│  Floor Plans: Interactive venue layouts                │
│  Availability: Calendar booking view                   │
│  Reviews: Rating and testimonials                      │
└─────────────────────────────────────────────────────────┘
```

### Responsive Behavior

**Desktop (1280px+):**
- List view: 3-column venue grid
- Filter bar: Horizontal row with all filters visible
- Detail view: Full-width with side-by-side content
- Image gallery: Large preview with thumbnail strip

**Tablet (768px - 1279px):**
- List view: 2-column venue grid
- Filter bar: Wrapped (2 rows if needed)
- Detail view: Full-width, stacked sections
- Tabs: Horizontal scroll

**Mobile (<768px):**
- List view: 1-column (stacked cards)
- Filter bar: Stacked (full-width dropdowns)
- Detail view: Full-width, mobile-optimized
- Image gallery: Swipeable carousel

---

## C. Content Blocks (Section-by-Section)

### Header Section (List View)

**Breadcrumb Navigation**
```
Events / Venue Management
```
- Font: 14px, gray-500
- Active: indigo-600
- Clickable: Links to Events list
- Separator: "/"

**Page Title**
```
Find Your Perfect Venue
```
- Font: 24px serif, gray-900
- Descriptive, action-oriented

**Search Bar:**
- Width: 256px (desktop), full (mobile)
- Placeholder: "Search venues..."
- Icon: Search (left, 16px, gray-400)
- Background: gray-50
- Border: 1px gray-200
- Focus: Ring 2px indigo-500, background white

**Add Venue Button:**
- Icon: Plus (16px)
- Text: "Add Venue"
- Background: indigo-600
- Text: white, 14px
- Hover: indigo-700
- Shadow: sm
- Click: Opens venue creation form

---

### Header Section (Detail View)

**Breadcrumb Navigation**
```
Events / Venue Management / Skylight Clarkson
```
- Shows full path with current venue name
- Venue name: indigo-600, medium

**Venue Name as Title**
```
Skylight Clarkson
```
- Font: 24px serif, gray-900
- Dynamically changes based on selected venue

**Action Buttons:**

**Back to List Button:**
- Icon: ArrowLeft (16px)
- Text: "Back to List"
- Background: white
- Border: 1px gray-200
- Hover: gray-50
- Click: Returns to list view

**Select Venue Button:**
- Text: "Select Venue"
- Background: gray-900
- Text: white
- Hover: gray-800
- Shadow: sm
- Click: Initiates booking workflow

---

### Filter Bar (List View)

**Filter Container:**
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Padding: 16px
- Shadow: sm
- Flex: Responsive (column on mobile, row on desktop)

**Filter Dropdowns (3 main filters):**

**Filter 1: Capacity**
- Icon: Users (16px, gray-500)
- Display: "Capacity: 200-5000"
- Background: gray-50
- Border: 1px gray-200
- Padding: 8px 12px
- Font: 14px, gray-700
- Min-width: 140px

**Filter 2: Location**
- Icon: MapPin (16px, gray-500)
- Select dropdown: "Location: All"
- Options:
  - All
  - New York
  - Paris
  - Milan
  - London
- Background: transparent (within gray-50 container)
- Focus: No ring (clean inline dropdown)

**Filter 3: Type**
- Icon: Layout (16px, gray-500)
- Select dropdown: "Type: All"
- Options:
  - All
  - Runway
  - Presentation
  - Gala
  - Studio
  - Industrial
  - Historic

**Apply Filters Button:**
- Icon: Filter (16px)
- Text: "Apply Filters"
- Background: gray-900
- Text: white
- Full width (mobile), auto width (desktop)
- Hover: gray-800

---

### Venue Grid (List View)

**Grid Specifications:**
- Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gap: 24px
- Animation: Fade in with stagger (50ms delay per card)

**Venue Card Specifications:**

Each venue card is a vertically-oriented card displaying:
- Hero image (top)
- Venue details (bottom)
- Tag overlays (on image)
- Favorite button (top-right)

**Card Container:**
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Shadow: sm
- Hover: Shadow lg, image scale 1.05
- Overflow: hidden
- Height: Full (flex column)
- Cursor: pointer
- Click: Navigate to venue detail view

---

**Venue Image Section:**

**Image Container:**
- Height: 256px
- Position: relative
- Overflow: hidden

**Hero Image:**
- Size: Full container (100% width × 256px height)
- Object-fit: cover
- Transform: Scale 1.00 (default) → 1.05 (hover)
- Transition: 700ms smooth

**Favorite Button (Top-Right Overlay):**
- Position: Absolute (top 12px, right 12px)
- Size: 32px × 32px circle
- Background: white/90 with backdrop-blur
- Icon: Heart (16px, gray-600)
- Hover: Icon red-500
- Shadow: sm
- Click: Toggles favorite status

**Tag Pills (Bottom-Left Overlay):**
- Position: Absolute (bottom 12px, left 12px)
- Background: black/60 with backdrop-blur
- Text: white, 10px, bold, uppercase, tracking-wider
- Padding: 4px 8px
- Border-radius: 4px
- Gap: 8px between multiple tags
- Examples: "Runway Ready", "High Ceiling", "Waterfront"

---

**Venue Details Section:**

**Content Container:**
- Padding: 20px
- Flex: Column
- Flex-grow: 1 (fills remaining card space)

**Venue Name:**
- Font: 20px, semibold, gray-900
- Margin-bottom: 8px
- Line-height: 1.2

**Location Row:**
- Icon: MapPin (14px, gray-400)
- Text: 14px, gray-600
- Format: "SoHo, NYC"
- Margin-bottom: 12px

**Specs Row (Capacity, Rating, Type):**
- Flex: Space-between
- Margin-bottom: 12px

**Capacity:**
- Icon: Users (14px, gray-500)
- Text: "3,200" (14px, gray-700)
- Format: Comma-separated number

**Rating:**
- Icon: Star (14px, amber-400, filled)
- Text: "4.8" (14px, gray-700, semibold)

**Type Badge:**
- Text: "Industrial" (11px, medium, gray-700)
- Background: gray-100
- Padding: 4px 10px
- Border-radius: full

**Divider:**
- Height: 1px
- Background: gray-100
- Margin: 12px 0

**Price Row:**
- Flex: Space-between
- Align-items: center

**Price:**
- Text: "$45,000 / day" (18px, bold, gray-900)
- Format: Currency with frequency

**View Details Button:**
- Text: "View Details" (13px, medium)
- Icon: ChevronRight (14px)
- Color: indigo-600
- Hover: indigo-700, underline
- Click: Opens venue detail view

---

**Sample Venue Cards:**

**Card 1: Skylight Clarkson**
```
Image: Industrial loft space
Tags: "Runway Ready", "High Ceiling"
Name: Skylight Clarkson
Location: SoHo, NYC
Capacity: 3,200
Rating: 4.8
Type: Industrial
Price: $45,000 / day
```

**Card 2: Pier 59 Studios**
```
Image: Waterfront studio
Tags: "Waterfront", "Lighting Rig"
Name: Pier 59 Studios
Location: Chelsea Piers, NYC
Capacity: 1,800
Rating: 4.6
Type: Studio
Price: $32,000 / day
```

**Card 3: Carrousel du Louvre**
```
Image: Historic venue interior
Tags: "Luxury", "Iconic"
Name: Carrousel du Louvre
Location: Paris, France
Capacity: 2,400
Rating: 4.9
Type: Historic
Price: €55,000 / day
```

**Card 4: The Glasshouse**
```
Image: Modern glass venue
Tags: "Panoramic Views", "Terrace"
Name: The Glasshouse
Location: Hell's Kitchen, NYC
Capacity: 1,500
Rating: 4.7
Type: Modern
Price: $38,000 / day
```

**Card 5: Duggal Greenhouse**
```
Image: Industrial waterfront space
Tags: "Waterfront", "Large Scale"
Name: Duggal Greenhouse
Location: Brooklyn Navy Yard
Capacity: 3,000
Rating: 4.5
Type: Industrial
Price: $40,000 / day
```

**Card 6: Spring Studios**
```
Image: Fashion Week venue
Tags: "Fashion Week Staple", "Rooftop"
Name: Spring Studios
Location: Tribeca, NYC
Capacity: 1,200
Rating: 4.8
Type: Studio
Price: $28,000 / day
```

---

### Venue Detail View

**Tab Navigation:**

5 tabs for exploring venue details:

1. **Gallery** (default)
2. **Specs**
3. **Floor Plans**
4. **Availability**
5. **Reviews**

**Tab Button Specifications:**
- Padding: 12px 24px
- Font: 14px, medium
- Border-bottom: 2px
- Active: indigo-600 border, indigo-600 text
- Inactive: transparent border, gray-500 text
- Hover: gray-800 text, gray-300 border

---

**Tab 1: Gallery**

**Image Viewer:**
- Large preview image (full width)
- Aspect ratio: 16:9 or 3:2
- Border-radius: 12px
- Object-fit: cover

**Thumbnail Strip:**
- Horizontal scrollable row below preview
- Thumbnail size: 120px × 80px
- Gap: 12px
- Border: 2px transparent (inactive) / indigo-600 (active)
- Hover: Opacity 80%
- Click: Updates main preview

**Image Gallery Features:**
- Fullscreen mode button (Maximize2 icon)
- Image counter: "3 / 12"
- Left/right arrows for navigation
- Keyboard support (arrow keys)

---

**Tab 2: Specs**

**Specifications Grid:**

Organized into sections:

**Capacity & Dimensions:**
- Max Capacity: 3,200 people
- Standing: 2,500
- Seated: 1,800
- Theater: 1,200
- Total Area: 15,000 sq ft
- Ceiling Height: 24 ft
- Runway Length: 100 ft

**Amenities:**
- Icon grid layout
- Each amenity with icon + label
- Examples:
  - Wifi (high-speed internet)
  - Zap (power supply)
  - Mic2 (audio system)
  - Layout (flexible configuration)
  - Box (load-in access)
  - Sun (natural lighting)

**Technical:**
- Load-in: Ground level, 12ft doors
- Power: 400 amp, 3-phase
- Climate Control: HVAC
- Rigging Points: Grid system
- AV: In-house lighting + sound

**Accessibility:**
- Wheelchair accessible
- ADA compliant restrooms
- Elevator access
- Accessible entrances: 2

---

**Tab 3: Floor Plans**

**Floor Plan Viewer:**
- High-resolution floor plan image
- Zoom controls (+/-)
- Pan/drag functionality
- Download button (PDF export)
- Dimension annotations
- Room labels

**Multiple Layouts:**
- Default layout
- Runway configuration
- Seated dinner setup
- Cocktail reception
- Custom setup options

**Interactive Features:**
- Clickable room annotations
- Capacity overlays (color-coded by section)
- Measurement tool

---

**Tab 4: Availability**

**Calendar View:**
- Month view calendar
- Available dates: white background
- Booked dates: gray background with red indicator
- Selected dates: indigo-600 background
- Hover: indigo-50 background

**Booking Form:**
- Event date selection (date picker)
- Event type (dropdown)
- Expected attendance (number input)
- Setup/breakdown dates (checkboxes)
- Request quote button

**Availability Legend:**
- Available: green dot
- Limited availability: amber dot
- Fully booked: red dot
- Your selection: indigo dot

---

**Tab 5: Reviews**

**Rating Summary:**
- Overall rating: 4.8 / 5.0
- 5-star rating breakdown (bar chart)
- Total reviews: 124

**Individual Reviews:**
- Reviewer name + role ("Event Planner, Vogue")
- Rating (5 stars)
- Date (posted 2 weeks ago)
- Review text (2-3 paragraphs)
- Helpful votes count
- "Was this helpful?" buttons

**Review Card:**
- Background: white
- Border: 1px gray-200
- Border-radius: 12px
- Padding: 20px
- Shadow: sm
- Margin-bottom: 16px

**Sort/Filter Reviews:**
- Most recent
- Highest rated
- Most helpful
- Verified events only

---

## D. UI Actions

### Primary Actions

| Action | Trigger | Behavior | Destination |
|--------|---------|----------|-------------|
| **Search Venues** | Type in search bar | Filter venue grid | Current page (filtered) |
| **Apply Filters** | Click Apply button | Filter by capacity, location, type | Current page (filtered) |
| **Favorite Venue** | Click heart icon | Toggle favorite status | Current page (visual update) |
| **View Venue Details** | Click venue card | Navigate to detail view | Detail view (same page) |
| **Back to List** | Click Back button | Return to venue grid | List view (same page) |
| **Select Venue** | Click Select button | Initiate booking | Booking flow/modal |
| **Change Gallery Image** | Click thumbnail | Update main preview | Current tab |
| **Fullscreen Gallery** | Click maximize icon | Open fullscreen viewer | Fullscreen overlay |
| **Download Floor Plan** | Click download button | Export PDF | File download |
| **Request Quote** | Submit availability form | Send quote request | Confirmation modal |

### Navigation Flow

**List → Detail:**
```
1. User views venue grid
2. Clicks "Skylight Clarkson" card
3. Page transitions to detail view (fade animation)
4. Gallery tab active by default
5. Header updates: breadcrumb + venue name
6. CTAs change: Back to List + Select Venue
```

**Detail → List:**
```
1. User on venue detail view
2. Clicks "Back to List" button
3. Page transitions to list view (fade animation)
4. Scroll position preserved (if possible)
5. Venue grid visible with all cards
```

---

## E. Data Requirements

### Backend Data Structure

**Venue Object:**
```typescript
interface Venue {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state?: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  capacity: {
    max: number;
    standing?: number;
    seated?: number;
    theater?: number;
  };
  rating: number; // 0-5
  reviewCount: number;
  type: 'Industrial' | 'Studio' | 'Historic' | 'Modern' | 'Outdoor' | 'Other';
  tags: string[];
  pricing: {
    dayRate: number;
    currency: string;
    display: string; // "$45,000 / day"
  };
  images: {
    hero: string;
    gallery: string[];
    floorPlans: string[];
  };
  specifications: VenueSpecs;
  amenities: string[];
  availability: AvailabilityCalendar;
  reviews: Review[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}
```

**Venue Specifications:**
```typescript
interface VenueSpecs {
  totalArea: number; // sq ft
  ceilingHeight: number; // ft
  runwayLength?: number; // ft
  loadIn: {
    type: string; // "Ground level"
    doorSize: string; // "12ft"
  };
  power: {
    amperage: number;
    phases: number;
  };
  climateControl: boolean;
  rigging: string;
  av: string;
  accessibility: {
    wheelchairAccessible: boolean;
    adaRestrooms: boolean;
    elevatorAccess: boolean;
    accessibleEntrances: number;
  };
}
```

**Availability Calendar:**
```typescript
interface AvailabilityCalendar {
  bookedDates: string[]; // ISO dates
  limitedDates: string[]; // ISO dates
  blockedDates: string[]; // ISO dates
  minimumBooking: number; // days
}
```

**Review Object:**
```typescript
interface Review {
  id: string;
  rating: number; // 1-5
  reviewerName: string;
  reviewerRole?: string;
  reviewerCompany?: string;
  date: string;
  text: string;
  helpful: number; // count
  verified: boolean;
}
```

### API Endpoints Required

```
GET /api/venues
  → Returns paginated venue list with filters
  Query params: location, capacity_min, capacity_max, type, search, sort

GET /api/venues/:venueId
  → Returns detailed venue information

GET /api/venues/:venueId/availability
  → Returns availability calendar

POST /api/venues/:venueId/favorite
  → Toggles favorite status

POST /api/venues/:venueId/quote-request
  → Submits quote request
  Body: { eventDate, eventType, attendance, setupDates }

GET /api/venues/:venueId/reviews
  → Returns venue reviews (paginated)

POST /api/venues/:venueId/reviews
  → Submits new review

POST /api/venues
  → Creates new venue (admin only)
```

### Sample Data States

**Empty State (No Venues):**
```
[Empty illustration]
"No venues match your filters"
"Try adjusting your search criteria"
[Clear Filters Button]
```

**Loading State:**
- Skeleton cards in grid
- Pulse animation
- Gray placeholder images

**Error State:**
```
[Alert banner]
"Failed to load venues"
[Retry Button]
```

---

## F. Workflows

### Workflow 1: Discovering and Booking a Venue

```
1. User navigates to /venues
2. Venue grid loads with 6 featured venues
3. User applies filters:
   - Location: New York
   - Capacity: 1500-3500
   - Type: Industrial
4. Grid updates to show 3 matching venues
5. User sees: Skylight Clarkson, Duggal Greenhouse, Pier 59
6. User clicks "Skylight Clarkson" card
7. Detail view loads (Gallery tab)
8. User views 12 venue photos
9. Switches to "Specs" tab
10. Reviews capacity: 3,200 max, 24ft ceilings
11. Switches to "Floor Plans" tab
12. Downloads runway configuration PDF
13. Switches to "Availability" tab
14. Selects event date: Sep 10-12, 2025
15. Sees venue is available
16. Clicks "Request Quote"
17. Form appears with pre-filled dates
18. User adds: Event type, attendance (1,500)
19. Submits quote request
20. Confirmation modal: "Quote request sent"
21. Clicks "Select Venue"
22. Venue added to event booking
23. Returns to Command Center
```

### Workflow 2: Comparing Multiple Venues

```
1. User on venue list view
2. Favorites 3 venues (clicks heart icons):
   - Skylight Clarkson
   - The Glasshouse
   - Spring Studios
3. Hearts fill with red color
4. User clicks "View Favorites" filter
5. Grid shows only 3 favorited venues
6. User opens Skylight Clarkson detail
7. Notes: $45k/day, 3,200 capacity
8. Returns to list
9. Opens The Glasshouse detail
10. Notes: $38k/day, 1,500 capacity
11. Compares mentally or in spreadsheet
12. Decides on Skylight (larger, better for runway)
13. Selects Skylight Clarkson
14. Proceeds to booking
```

---

## G. Image Usage

### Venue Hero Images

**Type:** Professional architectural/interior photography  
**Size:** Minimum 1200px × 800px  
**Aspect Ratio:** 3:2 or 16:9  
**Format:** WebP with JPG fallback  
**Style:** High-quality, well-lit, shows space scale  

**Examples:**
- Industrial loft with exposed brick
- Studio with professional lighting rigs
- Historic venue with ornate details
- Modern glass-walled space with city views
- Waterfront space with natural lighting

**Image Treatment:**
- Object-fit: cover
- Border-radius: 12px (in grid), 0px (fullscreen)
- Hover: Scale 1.05 (smooth 700ms)
- Loading: Blur-up placeholder

### Gallery Images

**Type:** Multiple angles of venue  
**Count:** 8-20 images per venue  
**Subjects:**
- Wide shots showing full space
- Detail shots (ceiling, fixtures, unique features)
- Setup examples (runway, seated, cocktail)
- Exterior shots
- Backstage/prep areas

### Floor Plans

**Type:** Architectural drawings or rendered diagrams  
**Format:** PNG or SVG (vector preferred)  
**Resolution:** High (suitable for print)  
**Features:**
- Dimension annotations
- Room labels
- Scale indicator
- Door/window locations
- Capacity zones

---

## H. Wireframe Summary

### List View Wireframe

```
┌──────────────────────────────────────────────────────────────┐
│ Events / Venue Management              [Search] [+ Add Venue]│
│ Find Your Perfect Venue                                      │
│                                                              │
│ [Users 200-5000][📍 Location: All][⬜ Type: All][Apply]     │
│                                                              │
│ ┌──────────────┬──────────────┬──────────────┐             │
│ │ [IMAGE]      │ [IMAGE]      │ [IMAGE]      │             │
│ │ Skylight     │ Pier 59      │ Carrousel    │             │
│ │ SoHo, NYC    │ Chelsea, NYC │ Paris, FR    │             │
│ │ 👥 3,200 ⭐4.8│ 👥 1,800 ⭐4.6│ 👥 2,400 ⭐4.9│             │
│ │ $45k/day  →  │ $32k/day  →  │ €55k/day  →  │             │
│ └──────────────┴──────────────┴──────────────┘             │
│ ┌──────────────┬──────────────┬──────────────┐             │
│ │ [IMAGE]      │ [IMAGE]      │ [IMAGE]      │             │
│ │ Glasshouse   │ Duggal       │ Spring       │             │
│ └──────────────┴──────────────┴──────────────┘             │
└──────────────────────────────────────────────────────────────┘
```

### Detail View Wireframe

```
┌──────────────────────────────────────────────────────────────┐
│ Events / Venue / Skylight Clarkson [← Back] [Select Venue]  │
│ Skylight Clarkson                                            │
│                                                              │
│ [Gallery][Specs][Floor Plans][Availability][Reviews]        │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │                                                          │ │
│ │              [LARGE VENUE IMAGE]                         │ │
│ │                                                          │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ [thumb][thumb][thumb][thumb][thumb][thumb][thumb][thumb]    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## I. Component Hierarchy

```
VenueManagement
├── Header (Sticky)
│   ├── Breadcrumb
│   ├── DynamicTitle (changes based on view)
│   └── ActionsRow
│       ├── SearchBar (list view)
│       ├── AddVenueButton (list view)
│       ├── BackButton (detail view)
│       └── SelectButton (detail view)
│
├── ListView
│   ├── FilterBar
│   │   ├── CapacityFilter
│   │   ├── LocationFilter
│   │   ├── TypeFilter
│   │   └── ApplyButton
│   │
│   └── VenueGrid
│       └── VenueCard × N
│           ├── ImageSection
│           │   ├── HeroImage
│           │   ├── FavoriteButton
│           │   └── TagPills
│           ├── DetailsSection
│           │   ├── VenueName
│           │   ├── LocationRow
│           │   ├── SpecsRow
│           │   ├── Divider
│           │   └── PriceRow
│           └── ViewDetailsButton
│
└── DetailView (VenueDetail component)
    ├── TabNavigation
    │   ├── GalleryTab
    │   ├── SpecsTab
    │   ├── FloorPlansTab
    │   ├── AvailabilityTab
    │   └── ReviewsTab
    │
    └── TabContent
        ├── GalleryViewer
        │   ├── MainImage
        │   ├── ThumbnailStrip
        │   └── FullscreenButton
        ├── SpecsGrid
        ├── FloorPlanViewer
        ├── AvailabilityCalendar
        └── ReviewsList
```

---

## J. Design Tokens & Styling

### Typography Scale
```css
/* Headers */
h1: 24px, serif (Venue name)
h2: 20px, sans, semibold (Card titles)
h3: 18px, sans, medium (Section headers)

/* Body */
body: 14px, sans, regular
price: 18px, sans, bold (Pricing)
small: 12px, sans, regular
tiny: 10-11px, sans, bold, uppercase (Tags, badges)
```

### Color Palette
```css
/* Primary */
--indigo-600: #4F46E5 (Active tabs, CTAs)
--indigo-700: #4338CA (Hover states)
--indigo-50: #EEF2FF (Selection highlights)

/* Venue Card */
--white: #FFFFFF (Card background)
--gray-900: #1C1917 (Venue names, select button)
--gray-700: #44403C (Specs text)
--gray-500: #78716C (Icons, secondary text)
--amber-400: #FBBF24 (Star rating)

/* Overlays */
--black-60: rgba(0,0,0,0.6) (Tag backgrounds)
--white-90: rgba(255,255,255,0.9) (Favorite button)
```

### Image Specifications
```css
/* Card Images */
--image-height: 256px
--image-transform-hover: scale(1.05)
--image-transition: 700ms

/* Detail Images */
--gallery-aspect: 16:9 or 3:2
--thumbnail-size: 120px × 80px
```

---

## K. Accessibility Notes

### Keyboard Navigation
- Tab through: Search → Filters → Venue cards → Detail tabs
- Enter: Activate cards, buttons, tabs
- Escape: Close fullscreen gallery
- Arrow keys: Navigate gallery thumbnails

### Screen Reader Support
- Image alt text: "[Venue Name] - [Type] venue in [City]"
- ARIA labels on icon-only buttons
- Landmark regions for sections
- Live region for filter updates

### Color Contrast
- All text meets WCAG AA
- Tag overlays have backdrop-blur for readability
- Focus indicators visible (2px indigo-600)

---

## L. Performance Considerations

### Image Optimization
- Lazy load images below fold
- Srcset for responsive images
- WebP with JPG fallback
- Blur-up placeholders while loading
- Progressive JPEG encoding

### Data Loading
- Paginated venue list (load more on scroll)
- Cache venue details for 10 minutes
- Prefetch detail view on card hover
- Debounce search input (300ms)

---

**Document Version:** 1.0  
**Last Updated:** December 9, 2025  
**Next Review:** March 2026  
**Owner:** Product Team
