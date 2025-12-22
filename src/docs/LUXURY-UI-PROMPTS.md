# Luxury UI Enhancement Prompts — FashionOS
## Figma AI & Design System Prompts for Premium Experience

---

## 🎨 HERO SECTION — Calm Luxury Landing

```
Create a luxury fashion event landing page hero section with:

LAYOUT:
- Full viewport height (100vh)
- Split layout: 60% visual, 40% content
- Generous whitespace (80px padding minimum)

VISUAL LEFT SIDE:
- High-end fashion show photograph (runway, backstage, or event)
- Subtle parallax scroll effect (moves 0.5x scroll speed)
- Gradient overlay: linear-gradient(135deg, rgba(17,17,17,0.3), transparent)
- Grain texture overlay (10% opacity for organic feel)

CONTENT RIGHT SIDE:
- Eyebrow text: "Premium Event Orchestration" (12px, uppercase, tracking: 2px, #8B7355)
- Headline: "Elevate Every Detail" (72px, Crimson Pro serif, #111111)
- Subheading: "AI-powered luxury event management for fashion's finest" (18px, Inter, #666666, line-height: 1.6)
- CTA Button: "Begin Your Event" (16px, #111111 bg, #F9F9F9 text, 56px height, rounded-full)
  - Hover: Subtle lift (translateY: -2px), shadow expands
  - Micro-interaction: Button text fades, "→" arrow slides in from right

ANIMATIONS:
- Headline: Fade up on scroll (50px translateY → 0, opacity 0 → 1, 0.8s ease-out)
- CTA: Pulse glow effect (box-shadow animates every 3s)
- Background image: Ken Burns effect (slow zoom 100% → 105% over 20s)

COLOR PALETTE:
- Background: #F9F9F9 (Ivory)
- Text Primary: #111111 (Charcoal)
- Accent: #8B7355 (Bronze)
- Borders: rgba(17,17,17,0.1)

RESPONSIVE:
- Mobile (<768px): Stack vertically, image 50vh, content padding 40px
- Tablet (768-1024px): 50/50 split
- Desktop (>1024px): 60/40 split as described
```

---

## 📊 DASHBOARD COMMAND CENTER — Executive Overview

```
Design a luxury event management dashboard with:

LAYOUT STRUCTURE:
- 3-column grid: 2fr 1fr 1fr
- Gap: 24px
- Container: max-width 1600px, centered

LEFT COLUMN (Hero Event Card):
- Large card (600px height)
- Event hero image with gradient overlay
- Floating metrics badges (top-right): Budget health, Timeline status
- Event title (32px Crimson Pro)
- Animated progress ring (circular, 120px diameter)
  - Stroke: #8B7355, width: 8px
  - Percentage animates on scroll (counting up effect)
- Quick actions: Ghost buttons with icons (Edit, View Details, Share)

MIDDLE COLUMN (Critical Tasks):
- Stacked cards layout
- Each card:
  - Left accent bar (4px, color based on priority: red/amber/green)
  - Task title (16px Inter Medium)
  - Due date with countdown (14px, #666666)
  - Assignee avatar (32px circle)
  - Hover: Lift effect, shows "Mark Complete" checkbox
- AI Badge: "3 risks detected" (floating, pulsing amber dot)

RIGHT COLUMN (Sponsor Pipeline):
- Vertical funnel visualization
- Stages: Lead → Contacted → Proposal → Confirmed
- Each stage:
  - Count badge (24px circle, #111111)
  - Company logos (grayscale, hover → color)
  - Value total (bottom, large number with currency)
- Drag connector lines (animated bezier curves, #8B7355)

HEADER BAR:
- Event switcher dropdown (left)
- Search bar (center, expandable on focus)
- Notifications bell (right, red dot for unread)
- AI Assistant button (right, floating gradient orb)

MICRO-INTERACTIONS:
- Card hover: translateY(-4px), shadow elevation increases
- Metrics: Count-up animation on load
- Progress ring: Draws in (stroke-dashoffset animation)
- Task cards: Checkbox slide-in on hover
- Pipeline: Logos shuffle on drag

SCROLL EFFECTS:
- Header: Becomes sticky with blur backdrop
- Metrics: Parallax (moves slower than scroll)
- Cards: Stagger fade-in (cascade effect)

ANIMATIONS:
- Load sequence:
  1. Header fades in (200ms)
  2. Left column scales in (400ms, ease-out)
  3. Middle/right cascade in (stagger 100ms each)
  4. Metrics count up (1000ms)

COLOR SCHEME:
- Card backgrounds: #FFFFFF
- Page background: #F9F9F9
- Borders: rgba(17,17,17,0.08)
- Shadows: rgba(17,17,17,0.04)
- Accent: #8B7355 (bronze for important items)
```

---

## 🎯 TASKS KANBAN — AI-Enhanced Workflow

```
Create a luxury Kanban board for event tasks:

BOARD LAYOUT:
- Horizontal scroll (not vertical)
- Columns: Not Started | In Progress | Review | Complete
- Column width: 320px fixed
- Gap: 16px
- Smooth scroll snap

COLUMN DESIGN:
- Header:
  - Title (14px uppercase, tracking 1.5px, #666666)
  - Count badge (right, subtle #F3F4F6 bg)
  - Add button (+ icon, appears on hover)
- Body:
  - Vertical card stack
  - Drop zone: Dashed border on drag-over
  - Empty state: Illustrated icon + "No tasks yet"

TASK CARD:
- Card (280px width, auto height, min 120px)
- White background, 1px border #E5E7EB
- Padding: 16px
- Hover: Lift (translateY -2px), shadow expands
- Click: Drawer slides from right

CARD CONTENT:
- Priority indicator (left bar, 3px width):
  - Critical: #EF4444
  - High: #F59E0B
  - Normal: #10B981
  - Low: #6B7280
- Task title (16px Inter Medium, #111111)
- Metadata row:
  - Phase badge (12px, pill shape, muted color)
  - Due date (with relative time: "2 days left")
- Assignee avatars (stacked, -8px overlap)
- AI badge (if AI-generated): Sparkle icon + "AI"

DRAG & DROP:
- Pick up: Card scales to 1.02, shadow increases, cursor: grabbing
- Dragging: Card tilts 3deg, becomes 90% opacity
- Drop zones: Highlight with #8B7355 border
- Drop: Smooth ease-in animation to position
- Confetti burst on "Complete" drop

AI FEATURES VISUALIZATION:
- AI-generated tasks: Gradient border (subtle rainbow shimmer)
- Dependency lines: Curved connectors between linked tasks (show on hover)
- Critical path: Cards glow with amber border
- Risk indicators: Floating red triangle with "!" icon

ANIMATIONS:
- Card entrance: Fade + slide up (stagger 50ms per card)
- Drag: Spring physics (react-spring)
- Drop: Elastic ease
- Complete: Check mark draws in, card fades to green tint, then slides out

MOBILE ADAPTATION:
- Vertical scroll instead
- Full-width columns
- Swipe to switch columns
- Tap to expand card (modal)

INTERACTIONS:
- Double-click card: Open detail modal
- Right-click: Context menu (Edit, Delete, Duplicate, Move to...)
- Shift+Click: Multi-select cards
- Keyboard: Arrow keys to navigate, Enter to open
```

---

## 🤖 AI BRAND SHOOT WIZARD — Signal Capture

```
Design an AI brand analysis wizard step:

LAYOUT:
- Center card (720px width, auto height)
- Soft shadow, white background
- Progress bar top (filled segments, bronze #8B7355)

HEADER:
- Step indicator: "Step 2 of 5"
- Title: "Brand Signal Capture" (32px Crimson Pro)
- Subtitle: "We'll analyze your brand's visual language" (16px, #666666)
- AI badge: Floating "AI-Powered" pill (top-right, gradient bg)

INPUT SECTION (Left 60%):
- Website URL input:
  - Large input (56px height)
  - Icon left: Globe
  - Paste button right
  - Validation: Green checkmark or red X
  - Example hint: "e.g., fashionbrand.com"
- Instagram handle input:
  - Same style
  - Icon: Instagram logo
  - Auto @ prefix
- Logo upload:
  - Drag-drop zone (200px square)
  - Dashed border, #E5E7EB
  - Icon: Upload cloud
  - Preview: Thumbnail appears after upload
  - Format hint: "PNG, JPG, SVG up to 10MB"

AI PREVIEW (Right 40%):
- Floating card (glass morphism):
  - background: rgba(255,255,255,0.7)
  - backdrop-filter: blur(20px)
  - border: 1px solid rgba(255,255,255,0.3)
- Title: "Live Analysis" (16px)
- Color palette extraction:
  - 5 color swatches (circular, 40px)
  - Animate in as detected
  - Label: HEX codes underneath
- Brand vibe tags:
  - Pills: "Minimal", "Luxe", "Bold"
  - Fade in one by one
- Confidence meter:
  - Progress bar, fills to percentage
  - Label: "Brand confidence: 94%"

ANIMATIONS:
- URL paste: Ripple effect from paste button
- Analysis trigger: Sparkle particles from input to preview card
- Color extraction: Each swatch pops in (scale 0 → 1, stagger 100ms)
- Loading state: Shimmer gradient across preview card
- Success: Green checkmark draws in, card pulses once

THINKING STATE:
- Preview card shows animated dots pattern
- Text: "Analyzing your brand..."
- Circular progress spinner (bronze)
- Particle system: Dots float upward

CTA SECTION:
- Primary button: "Continue to Strategy" (full width)
  - Disabled until all inputs valid
  - Enabled: Bronze gradient background, white text
  - Hover: Slight lift, shadow expands
- Secondary: "Skip this step" (text link, #666666)

ERROR STATES:
- Invalid URL: Shake animation, red border, error message below
- Upload failed: Red toast notification, "Try again" button
- AI error: Fallback message, "Continue anyway" option

MOBILE:
- Stack vertically
- Preview card moves below inputs
- Inputs full width
- CTA sticky bottom
```

---

## 📈 SPONSOR CRM PIPELINE — Intelligent Tracking

```
Design a sponsor relationship management pipeline:

LAYOUT:
- Horizontal swimlane view
- Stages: Lead → Contacted → Proposal → Confirmed
- Full width, horizontal scroll
- Stage width: 360px

STAGE COLUMN:
- Header:
  - Stage name (18px Inter Semibold, #111111)
  - Total value (24px, currency format, #8B7355)
  - Count badge (12px, subtle bg)
  - Filter dropdown (icon button)
- Sponsor cards stack vertically
- Spacing: 12px between cards

SPONSOR CARD:
- Card (340px × 160px)
- White bg, subtle border
- Hover: Lift + shadow
- Click: Expands right-side panel

CARD LAYOUT:
- Header row:
  - Company logo (48px circle, left)
  - Company name (16px Medium)
  - Tier badge (Gold/Silver/Bronze pill)
- Metrics row:
  - Contact name + role (14px, #666666)
  - Sponsorship value (20px bold, #111111)
- AI insights row:
  - Fit score: Circular progress (0-100)
  - Next action: Text + icon
  - Last contact: Relative time
- Footer:
  - Tags (industry, event type)
  - Action icons: Email, Call, Notes

AI SCORING VISUALIZATION:
- Fit score ring (60px):
  - 90-100: Green gradient
  - 70-89: Amber
  - <70: Red
  - Animates on load (draws stroke)
- Conversion probability:
  - Percentage badge
  - Trend arrow (↑ improving, ↓ declining)
- Risk indicators:
  - Red flag icon if at-risk
  - Tooltip: "No contact in 14 days"

DRAG & DROP:
- Grab card: Scales 1.05, cursor changes
- Drag over stage: Stage highlights
- Drop: Card slides into position
- Backend: Updates status in Supabase

DETAIL PANEL (Slides from right):
- Width: 480px
- Header:
  - Company logo (large, 80px)
  - Company name (28px)
  - Edit button (top-right)
- Tabs: Overview | Activity | Deliverables | Notes
- Overview tab:
  - Contact details (editable fields)
  - Sponsorship tier selector
  - Value input (currency)
  - Event assignment (multi-select)
- Activity tab:
  - Timeline of interactions
  - Email threads
  - Call logs
  - Meeting notes
- AI section:
  - "Suggested outreach" card
  - "Best time to contact"
  - "Talking points"

ANIMATIONS:
- Card load: Cascade from left (stagger 60ms)
- Fit score: Count up + ring draw (1s)
- Stage value: Count up animation
- Drag: Smooth spring physics
- Panel: Slide from right (300ms ease-out)

FILTERS (Top bar):
- Tier filter: Gold | Silver | Bronze | All
- Event filter: Dropdown, multi-select
- Fit score: Range slider (0-100)
- Sort: Value (high/low), Fit score, Last contact

EMPTY STATES:
- No sponsors: Illustrated graphic + "Add your first sponsor" CTA
- Stage empty: Dashed outline + "Drag sponsors here"

MICRO-INTERACTIONS:
- Logo hover: Slight zoom
- Value: Tooltip shows breakdown on hover
- Tag hover: Shows full description
- Action icons: Tooltips + slight color shift
```

---

## 📸 GALLERY DASHBOARD — Asset Management

```
Create a luxury media gallery for event assets:

LAYOUT:
- Masonry grid (Pinterest-style)
- Columns: 4 on desktop, 2 on tablet, 1 on mobile
- Gap: 16px
- Infinite scroll

TOOLBAR (Top):
- View switcher: Grid | List | Masonry (active state: bronze underline)
- Filter dropdown: Type (Image/Video), Event, Date
- Sort: Newest | Highest rated | Most used
- Search: Expandable search bar
- Upload button: Primary CTA (bronze, icon + text)

ASSET CARD (Masonry):
- Image thumbnail (auto height, maintains aspect ratio)
- Hover overlay (gradient from bottom):
  - Asset name (16px white)
  - Metadata (12px, 80% opacity): Upload date, file size
  - AI score badge (top-right): 0-100 with star icon
  - Quick actions (center): View | Download | Share | Delete
- Selection checkbox (top-left, appears on hover)

AI QUALITY SCORE:
- Badge: Circular (32px)
- Score 90-100: Green bg, gold star
- Score 70-89: Amber bg
- Score <70: Red bg
- Tooltip: "AI Quality Assessment" + criteria breakdown
- Click: Shows detailed analysis modal

LIGHTBOX (Click to expand):
- Full-screen modal
- Image: Centered, max 90vw/90vh
- Navigation: Left/right arrows
- Thumbnails: Bottom strip (scroll)
- Details panel (right):
  - File name (editable)
  - Dimensions, size, format
  - Upload date, uploader avatar
  - AI insights:
    - Subject detection: Tags
    - Quality score breakdown
    - Suggested improvements
  - Tags: Editable chips
  - Events: Associated events list
- Actions: Download | Share link | Delete

UPLOAD FLOW:
- Drag-drop zone (full-screen overlay on drag)
- Multi-file upload
- Progress indicators:
  - Individual file progress bars
  - Thumbnail previews during upload
  - AI processing spinner (after upload)
- Success: Cards animate into grid

BULK ACTIONS:
- Select multiple: Checkboxes visible
- Action bar (bottom, sticky):
  - Selected count
  - Download all
  - Move to event
  - Delete selected
  - Clear selection

FILTERS (Left sidebar, collapsible):
- Type: Checkboxes (Photo, Video, Raw, Edited)
- Event: List with checkboxes
- Upload date: Date range picker
- AI score: Range slider
- Tags: Chip selector
- Uploader: Avatar list

ANIMATIONS:
- Card load: Stagger fade-up (masonry order)
- Hover: Image zoom 1.05, overlay fades in
- Lightbox: Backdrop blur-in, image scale-in
- Upload: Progress bar fills, success checkmark
- Delete: Card shrinks and fades out, grid re-flows

EMPTY STATE:
- Illustration: Camera icon + sparkles
- Headline: "Your gallery awaits"
- Subheadline: "Upload your first event photos"
- CTA: "Upload Assets" button
- Helper: "or drag and drop files here"

MOBILE:
- Single column grid
- Swipe gestures in lightbox
- Bottom sheet for filters
- Floating upload button (bottom-right)
```

---

## 🎨 STYLE GUIDE SPECS

### Motion Tokens
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-luxury: 600ms cubic-bezier(0.16, 1, 0.3, 1); /* Smooth ease-out */

/* Spring physics (for react-spring) */
--spring-gentle: { tension: 120, friction: 14 }
--spring-bouncy: { tension: 300, friction: 10 }
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(17,17,17,0.05);
--shadow-md: 0 4px 6px -1px rgba(17,17,17,0.1);
--shadow-lg: 0 10px 15px -3px rgba(17,17,17,0.1);
--shadow-luxury: 0 20px 40px -12px rgba(17,17,17,0.15);
```

### Gradient Overlays
```css
--gradient-dark: linear-gradient(180deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.6) 100%);
--gradient-bronze: linear-gradient(135deg, #8B7355 0%, #A8906F 100%);
--gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
```

### Typography Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 2rem;      /* 32px */
--text-4xl: 2.5rem;    /* 40px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 4rem;      /* 64px */
```

---

## 🎬 SCROLL-DRIVEN ANIMATIONS

### Parallax Images
```javascript
// Slower scroll (0.5x)
useScroll({
  offset: ['start end', 'end start'],
  transform: y => `translateY(${y * 0.5}px)`
});
```

### Reveal on Scroll
```javascript
// Fade up as scrolls into view
useInView({
  threshold: 0.2,
  triggerOnce: true,
  variants: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }
});
```

### Progress Indicator
```javascript
// Circle draws as page scrolls
const scrollProgress = useScrollProgress();
strokeDashoffset = circumference * (1 - scrollProgress);
```

---

## 🎯 MICRO-INTERACTIONS LIBRARY

### Button Hover
```css
.button-luxury {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.button-luxury:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -8px rgba(17,17,17,0.2);
}
```

### Card Lift
```css
.card-interactive {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -12px rgba(17,17,17,0.15);
}
```

### Input Focus
```css
.input-luxury:focus {
  outline: none;
  border-color: #8B7355;
  box-shadow: 0 0 0 3px rgba(139,115,85,0.1);
}
```

### Loading Shimmer
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

---

**Use these prompts in Figma AI, v0.dev, or as briefs for implementation.**
