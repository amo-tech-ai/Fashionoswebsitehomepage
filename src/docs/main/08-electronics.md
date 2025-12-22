# FASHIONOS — ELECTRONICS SPONSORSHIP PAGE (V2)

**Purpose:** Convert tech/electronics brands into event sponsors  
**Audience:** Consumer electronics brands, tech marketing directors  
**Style:** Modern, data-driven, tech-forward

---

## STYLE GUIDE

**Colors:**
- Background: #FAFAFA (light gray)
- Accent: #2563EB (blue)
- Text Primary: #0A0A0A (near black)
- Text Secondary: #525252 (gray)
- Borders: #E5E5E5
- Dark sections: #0A0A0A with white text

**Typography:**
- Headlines: Georgia serif, 5xl-8xl
- Body: Sans-serif, lg-xl
- Labels: sm uppercase, tracking-[0.2em]

**Spacing:**
- Sections: py-24 (96px)
- Grid gaps: gap-12 (48px)
- Card padding: p-8

---

## PAGE STRUCTURE (10 SECTIONS)

```
1. Hero                    → Minimal centered text
2. Why Underperforms       → 3-column numbered reasons
3. One System              → Hub diagram with 4 nodes
4. How It Works            → 4-stage horizontal flow
5. Strategic Message       → Split layout text + visual
6. Activations Grid        → 6-photo grid (2x3)
7. Journey (Dark)          → 5-step purchase flow
8. ROI Metrics             → 3-stat cards + chart
9. Intelligence            → 3-feature cards
10. Performance CTA        → Final conversion
```

**Footer:** Standard footer component (see /components/Footer.tsx)

---

## WIREFRAMES

### Desktop (1440px)
```
┌──────────────────────────────────┐
│  HERO (min-h-85vh)               │
│  "Electronics & Tech"            │
│  "The Sponsorship                │
│   Operating System"              │
│  [Schedule Demo]                 │
└──────────────────────────────────┘
│  WHY UNDERPERFORMS (3 cols)      │
│  ┌────┐  ┌────┐  ┌────┐         │
│  │ ① │  │ ② │  │ ③ │         │
│  └────┘  └────┘  └────┘         │
├──────────────────────────────────┤
│  ONE SYSTEM (diagram)            │
│      ┌─────────┐                 │
│  ┌───│ FashionOS│───┐            │
│  ○   └─────────┘   ○             │
│  Node1          Node2             │
│  ○              ○                 │
│  Node3          Node4             │
├──────────────────────────────────┤
│  HOW IT WORKS (4 stages)         │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│  │ 1  │→│ 2  │→│ 3  │→│ 4  │    │
│  └────┘ └────┘ └────┘ └────┘    │
├──────────────────────────────────┤
│  ACTIVATIONS (3x2 grid)          │
│  [Img1] [Img2] [Img3]            │
│  [Img4] [Img5] [Img6]            │
├──────────────────────────────────┤
│  JOURNEY (Dark bg, 5 steps)      │
│  ●───→●───→●───→●───→●          │
└──────────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────┐
│  HERO        │
│  Headline    │
│  [CTA]       │
├──────────────┤
│  Card 1      │
│  Card 2      │
│  Card 3      │
│  (stacked)   │
├──────────────┤
│  SYSTEM      │
│  (simplified)│
├──────────────┤
│  WORKS       │
│  (vertical)  │
└──────────────┘
```

---

## SECTION 1: HERO

**Layout:** min-h-[85vh], centered, max-w-4xl

**Content:**
- Badge: "Electronics & Tech" (sm uppercase gray)
- H1: "The Sponsorship Operating System" (6xl-8xl serif)
- Subtitle: "A complete platform that connects product placement, audience data, and revenue attribution—designed for consumer electronics brands."
- CTA: "Schedule a Demo" → /contact

**Animations:**
- Container: opacity 0→1, y 30→0 (0.8s)
- Badge: opacity 0→1 (delay 0.2s)
- Button: scale 1.02 on hover

---

## SECTION 2: WHY UNDERPERFORMS

**Layout:** py-24, 3-column grid (desktop), stacked (mobile)

**Content:**
Heading: "Why Sponsorship Underperforms" (4xl-5xl serif)

Cards (3):
1. No Attribution
   "Traditional sponsorships can't connect event exposure to actual purchases."
2. Manual Tracking
   "Spreadsheets and assumptions replace real-time performance data."
3. Delayed Insights
   "ROI reports arrive weeks after events end, too late to optimize."

**Card Design:**
- Numbered circle (48px): border-black, centered
- Title: xl text
- Description: gray-500 leading-relaxed

**Animations:**
- Stagger: delay i*0.15s
- Effect: opacity 0→1, y 20→0

---

## SECTION 3: ONE SYSTEM

**Layout:** py-24, centered diagram

**Content:**
- Badge: "The System" (blue-50 bg, blue text)
- Heading: "One Platform. Total Visibility."
- Description: "Track every touchpoint from product placement to final sale."

**Diagram:**
- Center: "FashionOS" circle (256px)
- 4 Outer nodes (192x128px rectangles):
  1. Top-left: "Event Placement"
  2. Top-right: "Audience Capture"
  3. Bottom-left: "Commerce Flow"
  4. Bottom-right: "ROI Analytics"
- Connector lines: SVG paths (gray)

**Animations:**
- Lines draw: pathLength 0→1 (0.8s)
- Center: opacity + scale
- Nodes: stagger opacity + scale

**Responsive:**
- Desktop: Full hub-spoke diagram
- Mobile: Vertical stack (center + 4 nodes below)

---

## SECTION 4: HOW IT WORKS

**Layout:** py-24, 4-column grid (desktop), stacked (mobile)

**Content:**
Heading: "How Electronics Sponsorship Works"

Stages (4):
1. **Placement**
   - Icon: Monitor
   - "Products showcased at events with unique tracking codes"

2. **Capture**
   - Icon: Users
   - "Attendees scan, share, and interact with products"

3. **Journey**
   - Icon: TrendingUp
   - "Platform tracks user activity from event to ecommerce"

4. **Attribution**
   - Icon: DollarSign
   - "Full revenue attribution back to sponsorship investment"

**Card Design:**
- Icon: 48px blue circle
- Number badge: "01", "02", etc.
- Title: xl font-bold
- Description: gray-600

**Animations:**
- Stagger cards: delay i*0.15s
- Hover: lift -4px, shadow increase

---

## SECTION 5: STRATEGIC MESSAGE

**Layout:** py-24, 50/50 split (desktop), stacked (mobile)

**Content:**
Left:
- Heading: "Built for High-Value Tech Products"
- Body: "Electronics sponsorships require precise attribution. Our platform tracks every interaction—from booth scan to online purchase—proving ROI at the SKU level."
- CTA: "See Demo" → /wizard

Right:
- Feature image or mockup
- Search: "consumer electronics trade show booth display"

**Animations:**
- Text: slide in from left
- Image: slide in from right
- Stagger: 0.2s delay

---

## SECTION 6: ACTIVATIONS GRID

**Layout:** py-24, 3x2 grid (desktop), 2x3 (mobile)

**Content:**
Heading: "Sponsorship Activations That Convert"

Images (6):
1. "tech product booth display trade show"
2. "electronics demo station event"
3. "vip tech lounge exclusive event"
4. "product launch tech presentation"
5. "influencer unboxing electronics"
6. "live tech demo audience"

**Card Design:**
- Aspect: 4/3
- Hover: scale 1.05, overlay darken
- Overlay text: activation type

**Animations:**
- Grid stagger: i*0.08s
- Hover: image zoom, text slide up

---

## SECTION 7: JOURNEY (DARK)

**Layout:** py-32, dark bg (#0A0A0A), white text

**Content:**
Heading: "From Event to Purchase in 5 Steps"

Flow (5 steps):
1. **Discover** (Eye icon)
   "Attendee sees product at event"
2. **Engage** (Smartphone icon)
   "Scans QR or taps NFC tag"
3. **Explore** (ShoppingCart icon)
   "Browses product details online"
4. **Purchase** (DollarSign icon)
   "Completes checkout"
5. **Attribute** (BarChart icon)
   "Revenue tracked to sponsor"

**Design:**
- Horizontal step flow (desktop)
- Connecting arrows between steps
- Icons: 64px white circles

**Metrics Row:**
3 stat cards below flow:
- "3.2K Scans"
- "847 Purchases"
- "$312K Revenue"

**Animations:**
- Steps fade in sequentially
- Arrows draw left to right
- Stats counter animation

**Responsive:**
- Desktop: Horizontal flow
- Mobile: Vertical stack

---

## SECTION 8: ROI METRICS

**Layout:** py-24, 50/50 split

**Content:**
Left:
- Heading: "Real-Time ROI Dashboard"
- Description: "Track performance live during events. See which products drive engagement and sales."
- 3 progress bars:
  - Engagement Rate: 82%
  - Conversion Rate: 26%
  - ROI Multiple: 4.2x

Right:
- Dashboard mockup or chart visual
- Bar/line chart showing performance

**Progress Bar Design:**
- Track: gray-200
- Fill: blue gradient
- Animate: scaleX 0→1

**Animations:**
- Bars animate on scroll
- Numbers count up
- Chart draws progressively

---

## SECTION 9: INTELLIGENCE

**Layout:** py-24, 3-column grid

**Content:**
Heading: "AI-Powered Intelligence"

Features (3):
1. **Smart Matching**
   - Icon: Sparkles
   - "AI suggests best-fit events for your products"

2. **Predictive Analytics**
   - Icon: TrendingUp
   - "Forecast ROI before committing to sponsorship"

3. **Automated Reporting**
   - Icon: FileText
   - "Real-time dashboards eliminate manual reporting"

**Card Design:**
- Light gray bg
- Icon: 48px blue
- Title: xl bold
- Description: gray-600

**Animations:**
- Stagger fade: i*0.1s
- Hover: lift + shadow

---

## SECTION 10: PERFORMANCE CTA

**Layout:** py-32, centered, max-w-3xl

**Content:**
- Heading: "Ready to Prove Electronics Sponsorship ROI?"
- Description: "Join leading tech brands using FashionOS to track every dollar."
- CTA Primary: "Start Free Trial" → /wizard
- CTA Secondary: "Schedule Demo" → /contact

**Design:**
- Clean centered layout
- Black button (primary)
- Outline button (secondary)

---

## DIAGRAMS & CHARTS

### Hub-Spoke Diagram (Section 3)
**Type:** SVG node network
- 1 center circle
- 4 outer rectangles
- Connecting paths
- Animation: Lines draw, nodes fade in

### Flow Diagram (Section 4)
**Type:** Horizontal card flow
- 4 stages with icons
- Numbered sequence
- Arrow connectors (optional)

### Purchase Journey (Section 7)
**Type:** Step flow with metrics
- 5 circular steps
- Connecting lines
- Icon + label each
- Stat cards below

### Progress Bars (Section 8)
**Type:** Horizontal bars
- 3 metrics with percentages
- Gradient fills
- Animated on scroll

---

## IMAGES

**Hero:** None (text-focused)

**Strategic Message:**
- "consumer electronics trade show booth"

**Activations Grid (6):**
1. "tech product display booth"
2. "electronics demo station"
3. "vip tech lounge event"
4. "product launch presentation"
5. "influencer unboxing tech"
6. "live tech demo"

**ROI Section:**
- Dashboard mockup or chart visual

---

## ANIMATIONS

**Global:**
- Easing: ease-out
- Duration: 0.6-0.8s
- Stagger: 0.1-0.15s per item

**Scroll Triggers:**
- useInView hook
- once: true
- Margin: -50px

**Common Patterns:**
- Fade: opacity 0→1
- Slide: y 20→0
- Scale: 0.98→1
- Lift hover: -4px

**Section-Specific:**
- Hero: Sequential fade (badge → headline → subtitle → CTA)
- Diagram: Lines draw → center → nodes
- Flow: Left-to-right sequential
- Grid: Stagger grid items
- Progress: Bars fill on scroll
- Dark section: Icons glow on hover

---

## RESPONSIVE

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768-1023px
- Desktop: 1024px+

**Adjustments:**

Grid Layouts:
- 3-col → 1-col (Problem, Intelligence)
- 4-col → 2-col → 1-col (How It Works)
- 3x2 → 2x3 (Activations)

Typography:
- 8xl → 6xl → 5xl (Hero)
- 5xl → 4xl → 3xl (Section heads)

Diagrams:
- Hub-spoke → Vertical stack
- Horizontal flow → Vertical

Spacing:
- py-24 → py-16 → py-12
- gap-12 → gap-8 → gap-6

Touch:
- Min 44px buttons
- Larger padding
- Full-width CTAs

---

## MULTI-STEP PROMPTS

### STEP 1: Structure
"Create electronics sponsorship page with 10 sections: Hero (centered text), Why Underperforms (3 cols), One System (diagram), How It Works (4 stages), Strategic (split), Activations (3x2 grid), Journey (dark, 5 steps), ROI (split), Intelligence (3 cols), CTA. Use semantic sections, py-24 spacing, max-w-6xl container."

### STEP 2: Content
"Add all text: Hero 'The Sponsorship Operating System' (Georgia serif, 6xl-8xl). Problem cards: No Attribution, Manual Tracking, Delayed Insights. System diagram labels. 4 stages (Placement, Capture, Journey, Attribution). Journey flow (Discover→Engage→Explore→Purchase→Attribute). Intelligence features. All copy included."

### STEP 3: Diagrams
"Create hub-spoke SVG diagram: center 256px circle 'FashionOS', 4 outer 192x128px rectangles (Event Placement, Audience Capture, Commerce Flow, ROI Analytics). SVG paths connecting. Journey flow: 5 icon circles with connecting arrows. Progress bars: 3 bars (82%, 26%, 4.2x) with gradient fills."

### STEP 4: Images
"Add 6 activation images (3x2 grid): tech booth, demo station, vip lounge, launch, influencer, live demo. Strategic section: trade show booth. All 4:3 aspect. Hover: scale 1.05."

### STEP 5: Animations
"Motion/react: Hero sequential fade (0.8s, delays). Scroll triggers: useInView once:true. Stagger grids (0.15s). Diagram: pathLength 0→1. Progress bars: scaleX 0→1. Dark section: sequential step fade. Hover: lift -4px, scale 1.05."

### STEP 6: Responsive
"Breakpoints: lg:1024px md:768px. Hero: 8xl→6xl→5xl. Grids: 3→2→1 cols. Diagram: full→simplified→vertical. Flow: horizontal→vertical. Spacing: py-24→16→12. Touch: 44px min, full-width CTAs mobile."

---

## CHECKLIST

**Design:**
- [ ] Hero centered, minimal
- [ ] 3-col problem cards
- [ ] Hub-spoke diagram renders
- [ ] 4-stage flow horizontal
- [ ] 6-image grid (3x2)
- [ ] Dark section contrast
- [ ] Progress bars show data
- [ ] All text serif/sans correct

**Animations:**
- [ ] Hero sequence smooth
- [ ] Scroll triggers work
- [ ] Diagram animates
- [ ] Grid staggers
- [ ] Bars fill on scroll
- [ ] Hover effects (lift/scale)

**Responsive:**
- [ ] Desktop: Full layouts
- [ ] Tablet: Adjusted grids
- [ ] Mobile: Stacked, vertical flows
- [ ] Typography scales
- [ ] Touch targets 44px+
- [ ] No horizontal scroll

**Content:**
- [ ] All copy in place
- [ ] CTAs link correctly
- [ ] Images load (6 activations)
- [ ] Icons from lucide-react
- [ ] Colors match guide

---

**Lines:** 600  
**Version:** 1.0  
**Status:** Ready