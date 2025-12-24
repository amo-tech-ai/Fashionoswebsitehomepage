# Automotive Sponsor Page — Design Documentation

**Route:** `/sponsors/automotive`  
**Purpose:** Convert luxury automotive brands into sponsors with event-to-purchase attribution

---

## Sections Overview

1. Hero (full-screen image with floating KPIs)
2. Problem
3. System Map
4. How It Works
5. Use Cases (automotive-specific)
6. Activations Grid
7. Event to Purchase Flow (dark)
8. ROI Section
9. Intelligence Section
10. Final CTA
11. Footer

---

## 1. Hero Section

### Wireframe
```
┌────────────────────────────────────────┐
│ [Full-screen background image]        │
│ ████████████████████████████████████  │
│                                        │
│   ┌────────┐                          │
│   │$2.4M   │ ← Floating KPI           │
│   │Attrib. │                          │
│   └────────┘                          │
│                                        │
│     FOR AUTOMOTIVE BRANDS              │
│                                        │
│   The Automotive Sponsorship           │
│   Operating System                     │
│                                        │
│   FashionOS connects luxury auto...   │
│                                        │
│   [Start Strategy]  [See How]         │
│                                        │
│         ┌────────┐                     │
│         │4,287   │ ← Floating KPI     │
│         │Tests   │                     │
│         └────────┘                     │
└────────────────────────────────────────┘
```

### Content
- **Badge:** "FOR AUTOMOTIVE BRANDS" (white text, glass bg)
- **Headline:** "The Automotive Sponsorship Operating System" (white, 5xl-7xl)
- **Subhead:** "FashionOS connects luxury auto brands to high-net-worth fashion audiences with full attribution from event → test drive → purchase."
- **CTAs:**
  - Primary: "Start Sponsor Strategy" (blue #0066FF)
  - Secondary: "See How It Works" (glass morphism)
- **Trust Metrics:** "Event activations • Test drives tracked • Purchase attribution"

**3 Floating KPI Chips:**
1. **$2.4M** Attributed Revenue (top-right, 20% from top)
2. **4,287** Test Drives (top-left, 33% from top)
3. **47** Vehicles Attributed (bottom-right, 25% from bottom)

### Structure
- Full viewport height (100vh)
- Background image with gradient overlay (black/60 → black/40 → fade)
- Centered content with floating KPI cards
- Glass morphism cards (backdrop-blur-md, white/10 bg, white/20 border)

### Animations
- **Background:** Scale 1.05→1 over 1.2s on load
- **KPI chips:** Fade + slide from y:20 (stagger: 0.8s, 1.0s, 1.2s)
- **Content:** Fade up sequence (0.3-0.6s delays)
- **Hover KPIs:** Lift -4px, glow effect

### Images
**Hero Background:**
- Query: "luxury car fashion event"
- Specs: 1920×1080px, JPG, <500KB
- Overlay: Gradient from black/60 (top) → transparent (middle) → #FAFAFA (bottom)
- Grain texture: 5% opacity for premium feel

### Style
- Background: Dark with image
- Text: White (#FFFFFF)
- Primary CTA: Blue #0066FF
- Glass cards: white/10 bg, white/20 border, backdrop-blur-md
- Font: Sans-serif (modern, not serif)

---

## 2. Problem Section

### Wireframe
```
┌────────────────────────────────────────┐
│   The Luxury Auto Sponsorship Gap     │
│                                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐│
│  │[Icon]   │  │[Icon]   │  │[Icon]   ││
│  │Exposure │  │Test Dr. │  │No Attri.││
│  │Guess.   │  │Tracking │  │         ││
│  └─────────┘  └─────────┘  └─────────┘│
└────────────────────────────────────────┘
```

### Content
**Headline:** "The Luxury Auto Sponsorship Gap"

**3 Problems:**
1. **Exposure Guesswork:** "Event presence with zero measurement"
2. **Test Drive Tracking:** "Manual sign-up sheets, lost leads"
3. **No Attribution:** "Can't prove event led to purchase"

### Structure
- 3-column grid (equal width)
- Icons: Car, Users, BarChart3 (Lucide)
- Cards: Light bg, subtle shadow
- Centered text

### Animations
- Stagger fade + slide up (0.1s delay per card)
- Icons: Subtle pulse on hover
- Trigger: When 30% in view

---

## 3. System Map Section

### Wireframe
```
┌────────────────────────────────────────┐
│   Unified Automotive Sponsorship       │
│                                        │
│   ┌────────┐         ┌────────┐       │
│   │Event   │────┐    │Test    │────┐  │
│   │Display │    │    │Drive   │    │  │
│   └────────┘    ↓    └────────┘    ↓  │
│                                        │
│           ┌──────────────┐            │
│           │  FashionOS   │            │
│           │  Automotive  │            │
│           └──────────────┘            │
│                                        │
│   ┌────────┐    ↑    ┌────────┐    ↑ │
│   │CRM     │────┘    │Purchase│────┘ │
│   │Leads   │         │Track   │       │
│   └────────┘         └────────┘       │
└────────────────────────────────────────┘
```

### Content
**Headline:** "Unified Automotive Sponsorship Platform"

**5 Nodes:**
1. Event Display (vehicle showcase)
2. Test Drive Booking
3. CRM Lead Capture
4. Purchase Tracking
5. Central Hub: "FashionOS Automotive"

### Structure
- Hub-and-spoke layout
- Center circle: 280×280px
- Satellites: 240×120px rectangles
- Connector lines: Blue gradient (#0066FF)

### Animations
- Hub: Scale 0.9→1 (0.8s)
- Nodes: Fade in radially (0.6s stagger)
- Lines: Draw path (0.5s each)
- Hover: Pulse shadow

### Diagrams
- SVG connectors (animated)
- Blue accent color throughout
- Responsive: Stack vertically mobile

---

## 4. How It Works Section

### Wireframe
```
┌────────────────────────────────────────┐
│   How Automotive Sponsorship Works     │
│                                        │
│   1 → 2 → 3 → 4 → 5                   │
│                                        │
│   [Current step expanded content]     │
│                                        │
│   ┌──────────────────────────────┐    │
│   │ Step image/illustration      │    │
│   └──────────────────────────────┘    │
└────────────────────────────────────────┘
```

### Content
**5 Steps:**
1. **Vehicle Placement:** Brand places luxury vehicle at fashion event entrance
2. **QR Tagging:** Custom QR codes on displays → landing page
3. **Test Drive Booking:** Instant scheduling via mobile
4. **Event Attribution:** Track which event generated booking
5. **Purchase Tracking:** Close loop to final sale with dealer integration

### Structure
- Horizontal step indicator (1-5)
- Expanded detail for active step
- Image/illustration per step
- "Next" button to cycle

### Animations
- Step transition: Slide left/right (0.4s)
- Number highlights: Color shift on active
- Auto-advance: 4s timer (optional)

---

## 5. Use Cases Section (Automotive-Specific)

### Wireframe
```
┌────────────────────────────────────────┐
│   Automotive Use Cases                 │
│                                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐│
│  │[Image]  │  │[Image]  │  │[Image]  ││
│  │Fashion  │  │Launch   │  │VIP      ││
│  │Week     │  │Party    │  │Lounge   ││
│  └─────────┘  └─────────┘  └─────────┘│
└────────────────────────────────────────┘
```

### Content
**3 Use Cases:**
1. **Fashion Week Showcase**
   - Vehicle display outside main venue
   - 250+ test drive bookings per week
2. **Launch Party Sponsorship**
   - Exclusive vehicle unveils at brand events
   - VIP attendee targeting
3. **VIP Lounge Integration**
   - Test drive appointments from lounge
   - Concierge booking service

### Structure
- 3-column grid
- Image top, title + stats below
- Equal height cards

### Animations
- Cards: Scale 0.98→1 on view
- Hover: Lift -6px, shadow increase
- Image: Zoom 1→1.08 on hover

### Images
**Use Unsplash:**
1. "luxury car fashion week"
2. "car launch party event"
3. "VIP lounge luxury"

---

## 6. Activations Grid

### Wireframe
```
┌────────────────────────────────────────┐
│   Activation Types                     │
│                                        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐  │
│  │[1] │ │[2] │ │[3] │ │[4] │ │[5] │  │
│  │On. │ │Test│ │VIP │ │Btk.│ │Dlr.│  │
│  │Site│ │Drv.│ │Acc.│ │Tgs.│ │Int.│  │
│  └────┘ └────┘ └────┘ └────┘ └────┘  │
└────────────────────────────────────────┘
```

### Content
**5 Activation Types:**
1. **On-Site Display:** Vehicle at event entrance
2. **Test Drive Booking:** QR → instant scheduling
3. **VIP Access:** Private showings for HNW guests
4. **Backstage Tagging:** Models/designers with vehicle
5. **Dealer Integration:** Event booking → local dealer CRM

### Structure
- 5-column grid (stack on mobile)
- Icon + title + short description
- Light cards with hover effect

### Animations
- Stagger fade (0.08s delay)
- Icon: Bounce on hover
- Card: Lift + shadow

---

## 7. Event to Purchase Flow (Dark Section)

### Wireframe
```
┌────────────────────────────────────────┐
│ ████████████████████████████████████  │
│ ██  From Event to Purchase        ██  │
│ ████████████████████████████████████  │
│                                        │
│  Event → Book → Drive → Consider →    │
│  Finance → Purchase                    │
│                                        │
│  [Funnel diagram with conversion %]   │
│                                        │
│  87% book | 64% attend | 23% buy      │
└────────────────────────────────────────┘
```

### Content
**Headline:** "From Event to Purchase: Full Attribution"

**6-Step Funnel:**
1. Event Exposure (1,000 attendees)
2. QR Scan (870 scans - 87%)
3. Test Drive Booking (640 bookings - 64%)
4. Test Drive Attended (512 attended - 80%)
5. Finance Application (384 apps - 75%)
6. Purchase (230 sales - 23%)

### Structure
- Dark background (#1A1A1A)
- Light text (white)
- Funnel visualization (wide → narrow)
- Conversion % labels

### Animations
- Funnel: Fill animation top to bottom (1.5s)
- Numbers: Count up (1s each)
- Percentages: Fade in with delay

### Diagrams
**Funnel Chart:**
- SVG or CSS-based funnel
- Blue gradient fill (#0066FF → darker)
- Labels at each stage
- Hover: Highlight stage, show details

---

## 8. ROI Section

### Wireframe
```
┌────────────────────────────────────────┐
│   Automotive ROI Proof                 │
│                                        │
│  ┌───────┐  ┌───────┐  ┌───────┐     │
│  │$2.4M  │  │47     │  │$51K   │     │
│  │Rev.   │  │Vehicles│ │Avg.   │     │
│  └───────┘  └───────┘  └───────┘     │
│                                        │
│  [Line chart: Sales by event type]    │
└────────────────────────────────────────┘
```

### Content
**3 KPIs:**
1. **$2.4M** Attributed Revenue
2. **47** Vehicles Sold
3. **$51K** Average Sale Price

**Chart:** Sales by event type (Fashion Week, Launch Party, VIP Lounge)

### Structure
- 3-column KPI cards
- Line chart below (full width)
- Light background section

### Animations
- KPI numbers: Count up (2s)
- Chart line: Draw path (1.2s)
- Cards: Stagger fade (0.1s)

### Charts
**Line Chart:**
- X-axis: Event types
- Y-axis: Sales ($0-$1M)
- Line: Blue gradient
- Data points: Circles with hover tooltips

---

## 9. Intelligence Section

### Wireframe
```
┌────────────────────────────────────────┐
│   AI-Powered Automotive Intelligence   │
│                                        │
│  ┌──────────────┐  ┌──────────────┐   │
│  │[Icon]        │  │[Icon]        │   │
│  │Audience      │  │Predictive    │   │
│  │Matching      │  │Stocking      │   │
│  └──────────────┘  └──────────────┘   │
│                                        │
│  ┌──────────────┐  ┌──────────────┐   │
│  │[Icon]        │  │[Icon]        │   │
│  │Test Drive    │  │Purchase      │   │
│  │Optimization  │  │Propensity    │   │
│  └──────────────┘  └──────────────┘   │
└────────────────────────────────────────┘
```

### Content
**4 AI Features:**
1. **Audience Matching:** AI identifies HNW attendees likely to purchase
2. **Predictive Stocking:** Forecast which models to showcase
3. **Test Drive Optimization:** Best time slots, locations, vehicle configs
4. **Purchase Propensity:** Score leads by likelihood to buy

### Structure
- 2×2 grid
- Icon + title + description per card
- Gradient borders (blue)

### Animations
- Cards: Stagger fade + scale
- Icons: Glow pulse effect
- Hover: Border glow intensifies

---

## 10. Final CTA Section

### Wireframe
```
┌────────────────────────────────────────┐
│                                        │
│   Ready to Drive Automotive Sales?    │
│                                        │
│   [Start Your Strategy]                │
│                                        │
│   Talk to automotive specialist        │
└────────────────────────────────────────┘
```

### Content
- **Headline:** "Ready to Drive Automotive Sales Through Fashion Events?"
- **CTA:** "Start Your Strategy"
- **Subtext:** "Talk to an automotive sponsorship specialist"

### Structure
- Centered layout
- Blue CTA button (large)
- White/light gray background

### Animations
- Fade in on scroll
- Button: Glow on hover
- Subtle parallax on background

---

## 11. Footer

Standard footer with links, copyright, social icons.

---

## Responsive Behavior

### Desktop (1024px+)
- Hero: Full viewport with parallax
- Grids: 3-5 columns maintained
- KPI chips: Absolute positioning preserved

### Tablet (768px-1023px)
- Hero: Reduce font sizes, KPI chips smaller
- Grids: 2-3 columns
- Reduce padding

### Mobile (<768px)
- Hero: Stack CTAs, hide some KPI chips
- Grids: 1 column
- System map: Vertical list
- Funnel: Simplified vertical flow

---

## Scroll Effects

1. **Hero parallax:** Background moves slower than content
2. **KPI chips:** Fade in sequentially as you scroll
3. **Funnel animation:** Triggers once at 40% viewport
4. **Chart drawing:** Lines/bars animate on view
5. **Number counting:** Happens once per visit

---

## Style Guide

### Colors
- **Background:** #FAFAFA (light gray)
- **Dark sections:** #1A1A1A
- **Primary blue:** #0066FF
- **Secondary blue:** #0052CC (hover)
- **Text:** #1A1A1A (dark), #FFFFFF (on dark)
- **Accent:** #00D4FF (bright blue for highlights)

### Typography
- **Headlines:** Sans-serif | 5xl-7xl | tracking: tight | line-height: 0.95
- **Body:** Sans-serif | base-lg | line-height: 1.6
- **Labels:** Sans-serif | sm | uppercase | tracking: 0.1em

### Spacing
- **Section padding:** py-32 (desktop), py-16 (mobile)
- **Grid gaps:** 6-8 (24-32px)
- **Container:** max-w-7xl

### Effects
- **Glass morphism:** backdrop-blur-md, white/10 bg, white/20 border
- **Shadows:** shadow-lg standard, shadow-2xl on hover
- **Gradients:** Blue to darker blue (#0066FF → #0033CC)

### Animations
- **Duration:** 0.3-0.8s (fast interactions), 1.2-2s (page load)
- **Easing:** ease-out (standard)
- **Stagger:** 0.08-0.15s per element

---

## Image Requirements

**Total images needed: 5**

1. Hero background → "luxury car fashion event"
2. Fashion Week → "luxury car fashion week"
3. Launch Party → "car launch party event"
4. VIP Lounge → "VIP lounge luxury"
5. Optional: Vehicle detail shots → "luxury car interior"

**Specs:**
- Hero: 1920×1080px, <500KB
- Others: 800×600px, <200KB
- Format: JPG/WebP
- Alt text required

---

## Accessibility

- Contrast: 7:1 on dark backgrounds (white text)
- Focus states: Blue outline (#0066FF)
- Alt text on all images
- ARIA labels on icon buttons
- Keyboard navigation for all interactions

---

**Total Sections:** 11  
**Max Page Length:** ~9000px  
**Animations:** 40+ micro-interactions  
**Images:** 5 required  
**Load Time Target:** <3s (desktop), <5s (mobile)
