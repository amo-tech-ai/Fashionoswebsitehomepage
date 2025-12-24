# Real Estate Sponsor Page — Design Documentation

**Route:** `/sponsors/real-estate`  
**Purpose:** Convert luxury real estate brands into sponsors with event-to-viewing-to-sale attribution

---

## Sections Overview

1. Hero (decorative shapes, scroll progress)
2. Market Failure
3. How It Works
4. Activations Grid
5. Attribution Flow (dark)
6. Omnichannel Section
7. ROI Section
8. AI Intelligence Layer
9. Final CTA
10. Footer

---

## 1. Hero Section

### Wireframe
```
┌────────────────────────────────────────┐
│ [Scroll progress bar at top]          │
│                                        │
│     ○ Decorative circle (top-right)   │
│                                        │
│   ┌─────────────────────────┐         │
│   │ INTRODUCING FASHIONOS   │         │
│   └─────────────────────────┘         │
│                                        │
│   The Sponsorship                      │
│   Operating System                     │
│                                        │
│   Turn luxury real estate placements  │
│   into measurable sales...             │
│                                        │
│   [Request Access]  [Explore →]       │
│                                        │
│   • 3.2× ROI • 287 Viewings • $8.2M   │
│                                        │
│       ○ Decorative circle (bottom-left)│
└────────────────────────────────────────┘
```

### Content
- **Badge:** "INTRODUCING FASHIONOS" (bordered pill)
- **Headline:** "The Sponsorship Operating System" (Georgia serif, 6xl-8xl, "Operating System" in italic)
- **Subhead:** "Turn luxury real estate placements into measurable sales through fashion event activations and full purchase attribution"
- **CTAs:**
  - Primary: "Request Access" (dark bg #1A1A1A, hover gold #C9A961)
  - Secondary: "or, explore features ↓" (outlined, hover gold border)
- **Trust Metrics:** 
  - Avg. 3.2× ROI
  - 287 Viewings Booked
  - $8.2M Attributed Sales

### Structure
- Centered layout, full viewport height
- 2 decorative circles (large, faded, positioned absolute)
  - Top-right: 384×384px, gold/5 opacity
  - Bottom-left: 320×320px, green/5 opacity
- Fixed scroll progress bar (2px height, gradient)

### Animations
- **Decorative circles:** Scale 0.8→1, fade in (1.2s, easing)
- **Content:** Sequential fade up (0.6s, stagger 0.1s per element)
- **Scroll progress:** Fills left-to-right as page scrolls
- **CTAs:** Hover translate -1px Y, shadow increase

### Images
- None (decorative shapes only)
- Background: #FDFCFA (warm off-white)

### Style
- Background: #FDFCFA
- Text: #1A1A1A (near-black)
- Secondary text: #6B6B6B (medium gray)
- Gold accent: #C9A961
- Green accent: #8B9B7E (secondary)
- Deep green: #4A7C59 (tertiary)
- Border: #E8E5E0 (soft gray)

---

## 2. Market Failure Section

### Wireframe
```
┌────────────────────────────────────────┐
│   Why Real Estate Sponsorship Fails   │
│                                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐│
│  │[Icon]   │  │[Icon]   │  │[Icon]   ││
│  │Brand    │  │Zero     │  │Manual   ││
│  │Fatigue  │  │Attrib.  │  │Tracking ││
│  │         │  │         │  │         ││
│  │"Same    │  │"Can't   │  │"Spread. ││
│  │logos"   │  │prove"   │  │chaos"   ││
│  └─────────┘  └─────────┘  └─────────┘│
└────────────────────────────────────────┘
```

### Content
**Headline:** "Why Real Estate Sponsorship Fails"

**3 Problems:**
1. **Brand Fatigue**
   - Icon: Eye (Lucide)
   - Title: "Same Logos Everywhere"
   - Description: "Banner ads blend into background noise"
2. **Zero Attribution**
   - Icon: TrendingUp (crossed out)
   - Title: "Can't Prove ROI"
   - Description: "No link between event presence and property viewings"
3. **Manual Tracking**
   - Icon: FileText
   - Title: "Spreadsheet Chaos"
   - Description: "Lead tracking via email, no automation"

### Structure
- 3-column grid (equal width)
- Cards: White bg, border, rounded corners
- Icon at top (48×48px), centered
- Title + description below

### Animations
- Cards: Fade + slide up (stagger 0.12s)
- Icons: Subtle shake on hover
- Trigger: When 25% in viewport

---

## 3. How It Works Section

### Wireframe
```
┌────────────────────────────────────────┐
│   How Real Estate Sponsorship Works   │
│                                        │
│   ┌──────────────────────────────┐    │
│   │  [Step 1]                    │    │
│   │  Property showcase at event  │    │
│   │  [Image/Illustration]        │    │
│   └──────────────────────────────┘    │
│            ↓                           │
│   ┌──────────────────────────────┐    │
│   │  [Step 2]                    │    │
│   │  QR code scan → landing page │    │
│   └──────────────────────────────┘    │
│            ↓                           │
│   ... (5 steps total)                 │
└────────────────────────────────────────┘
```

### Content
**5 Steps:**
1. **Property Showcase:** Digital displays or VR booths at event
2. **QR Tagging:** Guests scan to see property details
3. **Viewing Booking:** Instant scheduling via mobile form
4. **Event Attribution:** Track which event generated lead
5. **Sale Tracking:** Close loop to final transaction

### Structure
- Vertical timeline with arrows
- Alternating left/right content
- Each step: Number + title + description + visual

### Animations
- Timeline: Draw vertical line top-to-bottom (1s)
- Steps: Fade in sequentially (0.2s stagger)
- Arrows: Fade + drop animation

---

## 4. Activations Grid

### Wireframe
```
┌────────────────────────────────────────┐
│   Real Estate Activation Types         │
│                                        │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│  │[Img]│ │[Img]│ │[Img]│ │[Img]│     │
│  │VR   │ │Digi │ │VIP  │ │Btk. │     │
│  │Tour │ │Disp.│ │Evnt.│ │Netw.│     │
│  └─────┘ └─────┘ └─────┘ └─────┘     │
└────────────────────────────────────────┘
```

### Content
**4 Activation Types:**
1. **VR Property Tours:** Immersive walkthroughs at event
2. **Digital Displays:** High-res property showcases on screens
3. **VIP Preview Events:** Private showings post-fashion event
4. **Backstage Networking:** Real estate agents meet HNW guests

### Structure
- 4-column grid (2×2 on tablet, 1 column mobile)
- Cards: Image top, content below
- Aspect ratio: 3:2 for images

### Animations
- Cards: Scale 0.95→1 on view
- Hover: Lift -8px, shadow increase
- Image: Zoom 1→1.1 on hover (overflow hidden)

### Images
**Use Unsplash:**
1. "VR property tour headset"
2. "luxury real estate digital display"
3. "VIP property viewing"
4. "networking luxury event"

---

## 5. Attribution Flow (Dark Section)

### Wireframe
```
┌────────────────────────────────────────┐
│ ████████████████████████████████████  │
│ ██  From Event to Sale            ██  │
│ ████████████████████████████████████  │
│                                        │
│  ┌─────────────────────────────────┐  │
│  │                                 │  │
│  │    Event → Scan → Book →        │  │
│  │    View → Offer → Close         │  │
│  │                                 │  │
│  │  [Sankey diagram showing flow]  │  │
│  │                                 │  │
│  │  1,000 → 720 → 287 → 241 →     │  │
│  │  89 → 31 ($8.2M)                │  │
│  └─────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### Content
**Headline:** "From Event to Sale: Full Attribution Chain"

**6-Stage Funnel:**
1. Event Attendance: 1,000 HNW guests
2. QR Scans: 720 (72%)
3. Viewing Bookings: 287 (40% of scans)
4. Viewings Attended: 241 (84%)
5. Offers Made: 89 (37%)
6. Sales Closed: 31 (35% of offers) → $8.2M total

### Structure
- Dark background (#1A1A1A)
- Light text (#FDFCFA)
- Sankey diagram (flow visualization)
- Numbers prominent at each stage

### Animations
- Sankey flows: Animate from left to right (2s)
- Numbers: Count up sequentially (1.5s each)
- Percentages: Fade in after numbers

### Diagrams
**Sankey Diagram:**
- Flows get narrower at each stage
- Color: Gradient gold (#C9A961) to green (#8B9B7E)
- Hover: Highlight individual path
- Labels: Stage name + number + percentage

---

## 6. Omnichannel Section

### Wireframe
```
┌────────────────────────────────────────┐
│   Omnichannel Real Estate Integration  │
│                                        │
│       ┌──────┐                         │
│       │Event │                         │
│       └──┬───┘                         │
│          │                             │
│    ┌────┼────┐                         │
│    │    │    │                         │
│  ┌─▼─┐┌─▼─┐┌─▼─┐                       │
│  │Web││CRM││Eml│                       │
│  └───┘└───┘└───┘                       │
│                                        │
│  All channels synced in real-time     │
└────────────────────────────────────────┘
```

### Content
**Headline:** "Omnichannel Integration"

**3 Connected Channels:**
1. **Website:** Property pages auto-updated with event mentions
2. **CRM:** Leads flow directly into Salesforce/HubSpot
3. **Email:** Automated follow-ups to event attendees

**Subhead:** "All channels synced in real-time. No manual data entry."

### Structure
- Center: Event hub
- 3 branches to different channels
- Flow diagram with connecting lines

### Animations
- Lines: Pulse animation (data flow visualization)
- Channel icons: Fade in radially (0.15s stagger)
- Hover: Glow effect on connections

### Diagrams
- Event hub at center (circle)
- Lines branching to 3 channel boxes
- Animated dots moving along lines (infinite loop)

---

## 7. ROI Section

### Wireframe
```
┌────────────────────────────────────────┐
│   Real Estate ROI Metrics              │
│                                        │
│  ┌────────┐  ┌────────┐  ┌────────┐  │
│  │ $8.2M  │  │  287   │  │ 3.2×   │  │
│  │ Sales  │  │Viewings│  │ ROI    │  │
│  └────────┘  └────────┘  └────────┘  │
│                                        │
│  ┌─────────────────────────────────┐  │
│  │ [Bar chart: Sales by event]     │  │
│  │ Fashion Week: $4.1M              │  │
│  │ Gala: $2.8M                      │  │
│  │ Launch: $1.3M                    │  │
│  └─────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### Content
**3 KPIs:**
1. **$8.2M** Total Attributed Sales
2. **287** Property Viewings Booked
3. **3.2× ROI** Return on Sponsorship Investment

**Chart:** Sales by event type (bar chart)
- Fashion Week: $4.1M
- Charity Gala: $2.8M
- Product Launch: $1.3M

### Structure
- 3-column KPI grid
- Bar chart below (horizontal bars)
- Gold/green color scheme

### Animations
- KPIs: Count up from 0 (2s)
- Bars: Grow from left to right (1s, stagger 0.2s)
- Hover bars: Darken, show tooltip

### Charts
**Horizontal Bar Chart:**
- Y-axis: Event types
- X-axis: Sales ($0-$5M)
- Bars: Gradient fill (gold → green)
- Labels: Event name + dollar amount

---

## 8. AI Intelligence Layer Section

### Wireframe
```
┌────────────────────────────────────────┐
│   AI-Powered Real Estate Intelligence  │
│                                        │
│  ┌─────────────────────────────────┐  │
│  │ [Sparkles icon]                 │  │
│  │                                 │  │
│  │ • HNW guest identification      │  │
│  │ • Property matching by taste    │  │
│  │ • Optimal viewing scheduling    │  │
│  │ • Purchase propensity scoring   │  │
│  │                                 │  │
│  │ [Example: "John D. - 87% buy"] │  │
│  └─────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### Content
**Headline:** "AI-Powered Real Estate Intelligence"

**4 AI Features:**
1. **HNW Guest Identification:** AI flags high-net-worth attendees via LinkedIn, purchase history
2. **Property Matching:** Recommends properties based on attendee taste profile
3. **Optimal Viewing Scheduling:** AI suggests best times/days per lead
4. **Purchase Propensity:** Scores each lead 0-100% likelihood to buy

**Example Card:**
- "John D. identified at Fashion Week"
- "87% buy propensity"
- "Recommended properties: Penthouse A, Villa C"
- "Best viewing time: Sat 2pm"

### Structure
- Large feature card with AI icon
- 4 bullet points
- Example card below (light bg, bordered)

### Animations
- Sparkles icon: Rotate pulse (subtle, 3s loop)
- Bullets: Fade in sequentially (0.2s stagger)
- Example card: Slide up from bottom (0.8s)

---

## 9. Final CTA Section

### Wireframe
```
┌────────────────────────────────────────┐
│                                        │
│   Ready to Unlock Real Estate ROI?    │
│                                        │
│   [Request Access]                     │
│                                        │
│   Limited beta • Invite only           │
└────────────────────────────────────────┘
```

### Content
- **Headline:** "Ready to Unlock Real Estate Sponsorship ROI?"
- **CTA:** "Request Access"
- **Subtext:** "Limited beta • Invite only • Real estate specialists"

### Structure
- Centered text + button
- Light gray background (#F5F3F0)
- Generous padding (py-24)

### Animations
- Fade in on scroll
- Button: Scale on hover, add gold glow
- Background: Subtle gradient animation

---

## 10. Footer

Standard footer (3-column links, copyright, social).

---

## Responsive Behavior

### Desktop (1024px+)
- Hero: Full viewport, decorative circles positioned absolute
- Grids: 3-4 columns maintained
- Sankey: Full-width, horizontal

### Tablet (768px-1023px)
- Hero: Smaller circles, reduce font (6xl → 5xl)
- Grids: 2 columns
- Sankey: Simplified vertical flow

### Mobile (<768px)
- Hero: Stack CTAs, hide one decorative circle
- Grids: 1 column
- Sankey: Vertical list with arrows
- Timeline: Full vertical (no alternating)

---

## Scroll Effects

1. **Progress bar:** Fills 0→100% as you scroll page
2. **Decorative circles:** Parallax (slow movement)
3. **Sankey diagram:** Animates when 50% visible
4. **KPI numbers:** Count up once per visit
5. **Timeline:** Draws line on scroll progress
6. **Omnichannel pulses:** Continuous animation (not scroll-triggered)

---

## Style Guide

### Colors
- **Background:** #FDFCFA (warm white)
- **Light sections:** #FFFFFF
- **Dark sections:** #1A1A1A
- **Text primary:** #1A1A1A
- **Text secondary:** #6B6B6B
- **Gold accent:** #C9A961
- **Green accent:** #8B9B7E
- **Deep green:** #4A7C59
- **Border:** #E8E5E0

### Typography
- **Headlines:** Georgia serif | 6xl-8xl | line-height: 1.1 | tracking: tight
- **Body:** Sans-serif | base-lg | line-height: 1.6
- **Labels:** Sans-serif | xs-sm | uppercase | tracking: 0.15em

### Spacing
- **Section padding:** py-32 (desktop), py-16 (mobile)
- **Grid gaps:** 6 (24px)
- **Container:** max-w-6xl (1152px)

### Effects
- **Shadows:** shadow-sm (cards), shadow-lg (hover), shadow-2xl (CTA hover)
- **Borders:** 1px, rounded-lg (8px) or rounded-2xl (16px)
- **Gradients:** Gold to green (#C9A961 → #8B9B7E)

### Animations
- **Duration:** 0.3s (fast), 0.6-0.8s (standard), 1.2-2s (slow/pageload)
- **Easing:** [0.16, 1, 0.3, 1] (custom cubic bezier for smooth motion)
- **Stagger:** 0.1-0.15s per element

---

## Image Requirements

**Total images needed: 5**

1. VR Property Tours → "VR property tour headset"
2. Digital Displays → "luxury real estate digital display"
3. VIP Preview → "VIP property viewing"
4. Backstage Networking → "networking luxury event"
5. Optional background → "luxury real estate interior"

**Specs:**
- Format: JPG/WebP
- Size: 800×600px (landscape)
- Optimization: <200KB per image
- Alt text required

---

## Accessibility

- **Contrast:** 7:1 on dark sections (white text)
- **Focus states:** Gold outline (#C9A961, 2px)
- **Alt text:** All images and icons
- **ARIA labels:** On chart elements, icon buttons
- **Keyboard navigation:** All interactive elements accessible via Tab
- **Screen reader:** Descriptive labels for all sections

---

## Unique Features

1. **Scroll progress bar:** Fixed at top, fills as you scroll (gradient: gold → green → deep green)
2. **Decorative shapes:** Large faded circles add elegance without distraction
3. **Sankey diagram:** Advanced flow visualization (not just funnel)
4. **Omnichannel pulses:** Animated data flow between systems
5. **AI Intelligence:** Specific real estate use cases (HNW identification, property matching)

---

**Total Sections:** 10  
**Max Page Length:** ~8500px  
**Animations:** 35+ micro-interactions  
**Images:** 5 required  
**Load Time Target:** <3s (desktop), <5s (mobile)  
**Special Feature:** Scroll progress bar (fixed, gradient, animates with scroll)
