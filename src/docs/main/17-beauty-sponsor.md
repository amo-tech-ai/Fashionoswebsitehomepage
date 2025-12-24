# Beauty Sponsor Page — Design Documentation

**Route:** `/sponsors/beauty`  
**Purpose:** Convert beauty brands into FashionOS sponsors with runway-to-retail attribution

---

## Sections Overview

1. Hero
2. Problem (3 cards)
3. System Map (hub-and-spoke)
4. How It Works (5 steps)
5. Activations Grid
6. Runway to Purchase (dark infographic)
7. ROI Proof
8. AI Insights
9. Final CTA
10. Footer

---

## 1. Hero Section

### Wireframe
```
┌────────────────────────────────────────┐
│                                        │
│         FOR BEAUTY BRANDS              │
│                                        │
│   The Beauty Sponsorship Operating    │
│   System                               │
│                                        │
│   Turn runway beauty moments into      │
│   measurable sell-through...           │
│                                        │
│   [Start Strategy] [See How It Works] │
│                                        │
│   • Looks tagged • Creators tracked   │
│                                        │
│   ┌──────────────────────────────┐    │
│   │ Moment→Tag→Content→Purchase  │    │
│   └──────────────────────────────┘    │
└────────────────────────────────────────┘
```

### Content
- **Badge:** "FOR BEAUTY BRANDS" (uppercase, tracked)
- **Headline:** "The Beauty Sponsorship Operating System" (Georgia serif, 5xl-7xl)
- **Subhead:** "Turn runway beauty moments into measurable sell-through, attribution, and retention."
- **CTAs:** 
  - Primary: "Start Beauty Strategy" (dark bg, light text)
  - Secondary: "See How It Works" (outlined, chevron down icon)
- **Trust Indicators:** "Looks tagged • Creators tracked • Shopify sales attributed"
- **Mini Flow:** Visual showing Moment→Tag→Content→Click→Purchase

### Animations
- **Entry:** Fade + slide up (stagger by 0.1s per element)
- **Vertical beam:** Scale Y from 0→1 over 0.8s
- **Flow diagram:** Fade in 0.5s delay
- **CTAs:** Hover scale (1.02), hover color shift

### Images
- None (uses gradient background + subtle grain texture)
- Background: gradient from #FAF8F5 → #F5F0E8 → #FAF8F5
- Decorative: 2px vertical line with gradient (soft gold #D4C5A9/30)

### Style
- Background: #FAF8F5 (warm off-white)
- Text primary: #2D2D2D (near-black)
- Text secondary: #706F6C (warm gray)
- Accent: #D4C5A9 (soft gold)
- Font: Georgia serif for headlines, sans for body

---

## 2. Problem Section

### Wireframe
```
┌────────────────────────────────────────┐
│                                        │
│   Why Beauty Sponsorship              │
│   Underperforms                        │
│                                        │
│  ┌─────┐    ┌─────┐    ┌─────┐       │
│  │  1  │    │  2  │    │  3  │       │
│  │Unm. │    │Man. │    │Zero │       │
│  │Expo │    │Chaos│    │Ret. │       │
│  └─────┘    └─────┘    └─────┘       │
└────────────────────────────────────────┘
```

### Content
**Headline:** "Why Beauty Sponsorship Underperforms"

**3 Problem Cards:**
1. **Unmeasured Exposure**
   - "Beautiful moments, no attribution."
2. **Manual Chaos**
   - "Tags, creators, deliverables tracked in spreadsheets."
3. **Zero Retention**
   - "Post-show interest dies with no automation."

### Structure
- 3-column grid (stack on mobile)
- Circular numbered badges (border: #D4C5A9, 48px diameter)
- Centered text alignment
- Equal spacing between cards

### Animations
- Stagger cards: 0.08s delay between each
- Fade + slide up from 20px below
- Trigger: On scroll into view

### Diagrams
- Numbered circles (1, 2, 3) with outlined borders
- No icons, just numbers

---

## 3. System Map Section

### Wireframe
```
┌────────────────────────────────────────┐
│   One System. Full Visibility.         │
│                                        │
│   ┌────────┐      ┌────────┐         │
│   │ Event  │──┐   │ Live   │──┐      │
│   │Activ.  │  │   │Commerce│  │      │
│   └────────┘  ↓   └────────┘  ↓      │
│                                        │
│           ┌──────────────┐            │
│           │  FashionOS   │            │
│           │  Sponsor     │            │
│           │  System      │            │
│           └──────────────┘            │
│                                        │
│   ┌────────┐  ↑   ┌────────┐  ↑      │
│   │Audience│──┘   │ROI     │──┘      │
│   │& Leads │      │Analytics│         │
│   └────────┘      └────────┘         │
│                                        │
│            ┌────────┐                 │
│            │AI      │                 │
│            │Agents  │                 │
│            └────────┘                 │
└────────────────────────────────────────┘
```

### Content
- **Headline:** "One System. Full Visibility."
- **Subhead:** "FashionOS connects event activations, commerce, marketing channels, and ROI reporting — in one unified platform."

**5 Nodes:**
1. Event Activations (top-left)
2. Live Commerce (top-right)
3. Audience & Leads (bottom-left)
4. ROI Analytics (bottom-right)
5. AI Agents (center-top)

**Central Hub:** "FashionOS Sponsorship System" (large circle, 256px diameter)

### Structure
- Hub-and-spoke layout
- Central circle: 256×256px, white bg, border
- Satellite boxes: 256×160px rectangles
- Connecting lines: 1px, #E5E1DA color

### Animations
- Central hub: Scale 0.8→1, fade in (0.6s, delay 0.2s)
- Satellites: Fade + slide from direction (0.5s, staggered 0.1s)
- Connector lines: Path length 0→1 (0.6s, staggered delays)
- Hover: Border color shifts to #D4C5A9

### Diagrams
- SVG lines connecting each satellite to hub
- Lines animate drawing from satellite to hub
- Responsive: Stack vertically on mobile

---

## 4. How It Works Section

### Wireframe
```
┌────────────────────────────────────────┐
│   How The System Works                 │
│                                        │
│   ●──────●──────●──────●──────●       │
│   │      │      │      │      │       │
│   Disc.  Plan   Act.   Meas.  Opt.   │
│   AI id. AI bu. Back.  Track  Insig. │
│                                        │
│   [1] [2] [3] [4] [5] ← Tabs          │
│                                        │
│   ┌──────────────────────────────┐    │
│   │ Step detail content here     │    │
│   │ with description             │    │
│   └──────────────────────────────┘    │
└────────────────────────────────────────┘
```

### Content
**5 Steps:**
1. **Discover:** "AI identifies beauty moments with high engagement potential"
2. **Plan:** "AI builds sponsor plan with shade/SKU recommendations"
3. **Activate:** "Backstage + runway tagging with MUA partnerships"
4. **Measure:** "Track performance by shade, channel, and creator"
5. **Optimize:** "Insight-driven re-activation and budget allocation"

### Structure
- Horizontal stepper with connected dots
- Active step: filled circle, darker text
- Inactive: outlined circle, lighter text
- Progress line between dots

### Animations
- Steps: Fade in with 0.15s stagger
- Active step: Scale pulse (1→1.05→1 loop)
- Click: Smooth transition to next step
- Auto-advance: Optional 3s timer per step

### Images
- None (text-based stepper)
- Could add: Beauty product thumbnails per step

---

## 5. Activations Grid

### Wireframe
```
┌────────────────────────────────────────┐
│   Activation Types                     │
│                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  │[Photo]  │ │[Photo]  │ │[Photo]  │ │
│  │Backstage│ │Runway   │ │Creator  │ │
│  │Beauty   │ │Tagging  │ │Partner. │ │
│  └─────────┘ └─────────┘ └─────────┘ │
│                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  │[Photo]  │ │[Photo]  │ │[Photo]  │ │
│  │Lookbook │ │Retail   │ │Post-Show│ │
│  │Content  │ │Experie. │ │Retarg.  │ │
│  └─────────┘ └─────────┘ └─────────┘ │
└────────────────────────────────────────┘
```

### Content
**6 Activation Cards:**
1. **Backstage Beauty:** Makeup artist tagging + product placement
2. **Runway Tagging:** Live tagging during show with QR codes
3. **Creator Partnerships:** Influencer unboxing + tutorials
4. **Lookbook Content:** Professional product photography
5. **Retail Experience:** Pop-up shops with tech integration
6. **Post-Show Retargeting:** Email + SMS campaigns to attendees

### Structure
- 3-column grid (2 rows)
- Cards: image on top, title + description below
- Equal height cards with aspect ratio 4:3
- Rounded corners (16px)

### Animations
- Cards: Fade + scale 0.95→1 on scroll
- Stagger: 0.1s delay between cards
- Hover: Lift up -4px, add shadow
- Image zoom: 1→1.05 scale on hover

### Images
**Use Unsplash:**
- Backstage Beauty: "makeup artist backstage fashion"
- Runway Tagging: "fashion show runway model"
- Creator Partnerships: "beauty influencer filming"
- Lookbook Content: "beauty product photography"
- Retail Experience: "beauty popup shop"
- Post-Show Retargeting: "woman shopping phone"

---

## 6. Runway to Purchase Section (Dark)

### Wireframe
```
┌────────────────────────────────────────┐
│ ████████████████████████████████████  │
│ ██  Runway → Purchase Journey    ██  │
│ ████████████████████████████████████  │
│                                        │
│  1. Moment    2. Tag      3. Content  │
│  ↓            ↓           ↓            │
│  Model wears  QR shown    Creator     │
│  lipstick     backstage   posts       │
│                                        │
│  4. Click     5. Purchase 6. Loyalty  │
│  ↓            ↓           ↓            │
│  User taps    Checkout    Repeat      │
│  link         complete    customer    │
└────────────────────────────────────────┘
```

### Content
**Headline:** "From Runway to Purchase in 6 Moments"

**6-Step Flow:**
1. **Moment:** Model wears sponsored beauty product
2. **Tag:** QR code/link shown backstage or on screen
3. **Content:** Creator posts tutorial using product
4. **Click:** User clicks tagged link
5. **Purchase:** Product added to cart + checkout
6. **Loyalty:** Retargeting + repeat purchase automation

### Structure
- Dark background (#1A1A1A or #2D2D2D)
- Light text (white/cream)
- Horizontal flow with arrows
- 2 rows of 3 steps each
- Equal-width columns

### Animations
- Sequential reveal: Each step fades in with 0.2s delay
- Arrows: Draw path animation (0.4s)
- Scroll-triggered: Starts when 30% in view
- Numbers: Count-up animation

### Diagrams
- Arrow connectors between steps (animated SVG paths)
- Icons per step (lipstick, QR, camera, cursor, cart, heart)
- Optional: Floating data points ("87% conversion lift")

### Images
- Background texture: Subtle grain or gradient
- Optional: Faded product images as background

---

## 7. ROI Proof Section

### Wireframe
```
┌────────────────────────────────────────┐
│   Defensible ROI                       │
│                                        │
│  ┌─────────────────────────────────┐  │
│  │ ┌───────┐  ┌───────┐  ┌───────┐ │  │
│  │ │$847K  │  │4.2×   │  │92%    │ │  │
│  │ │Rev.   │  │ROAS   │  │Attrib.│ │  │
│  │ └───────┘  └───────┘  └───────┘ │  │
│  │                                  │  │
│  │ [Bar Chart: ROI by Quarter]     │  │
│  └─────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### Content
- **Headline:** "Defensible ROI You Can Show Investors"

**3 KPI Cards:**
1. **$847K:** Attributed revenue (last 90 days)
2. **4.2× ROAS:** Return on ad spend
3. **92%:** Attribution confidence

**Chart:** Quarterly ROI trend (bar or line chart)

### Structure
- 3-column KPI grid
- Large number (48px), small label (14px)
- Chart below KPIs (full width)
- White cards on light background

### Animations
- Numbers: Count-up from 0 (1.5s duration)
- Cards: Fade + slide up (stagger 0.1s)
- Chart: Bars animate height 0→100% (0.8s, stagger 0.1s per bar)

### Charts
**Bar Chart:**
- X-axis: Q1, Q2, Q3, Q4
- Y-axis: Revenue ($0-$1M)
- Bars: Gradient fill (#D4C5A9 to darker)
- Hover: Show exact value tooltip

---

## 8. AI Insights Section

### Wireframe
```
┌────────────────────────────────────────┐
│   AI-Powered Intelligence              │
│                                        │
│  ┌──────────────────┐  ┌─────────┐   │
│  │[Sparkles Icon]   │  │Insight 1│   │
│  │                  │  │         │   │
│  │Real-time shade   │  │Insight 2│   │
│  │performance       │  │         │   │
│  │tracking          │  │Insight 3│   │
│  └──────────────────┘  └─────────┘   │
└────────────────────────────────────────┘
```

### Content
**Headline:** "AI-Powered Beauty Intelligence"

**3 AI Features:**
1. **Shade Performance:** Real-time tracking by shade, skin tone, lighting
2. **Creator Matching:** AI matches products to best-fit influencers
3. **Predictive Stocking:** Forecast demand by venue, season, demographic

### Structure
- Left: Large feature card with icon
- Right: 3 smaller insight cards stacked
- 2-column layout (stack on mobile)

### Animations
- Sparkles icon: Rotate pulse (subtle)
- Cards: Fade in with 0.15s stagger
- Hover: Lift + glow effect

### Images
- Sparkles icon (Lucide icon, 48px)
- Optional: Screenshot of AI dashboard

---

## 9. Final CTA Section

### Wireframe
```
┌────────────────────────────────────────┐
│                                        │
│   Ready to Transform Your              │
│   Beauty Sponsorships?                 │
│                                        │
│   [Start Your Strategy]                │
│                                        │
│   No credit card required              │
└────────────────────────────────────────┘
```

### Content
- **Headline:** "Ready to Transform Your Beauty Sponsorships?"
- **CTA:** "Start Your Strategy" (large button)
- **Subtext:** "No credit card required • 14-day trial"

### Structure
- Centered text + button
- White background or subtle gradient
- Generous padding (80px top/bottom)

### Animations
- Fade in on scroll
- Button: Scale on hover, add shadow
- Pulse effect on button (optional)

---

## 10. Footer

### Wireframe
```
┌────────────────────────────────────────┐
│ Product    Company    Resources        │
│ Features   About      Blog             │
│ Pricing    Careers    Case Studies     │
│                                        │
│ © 2024 FashionOS                       │
└────────────────────────────────────────┘
```

### Content
- 3-column link grid
- Copyright notice
- Social icons (optional)

---

## Responsive Behavior

### Desktop (1024px+)
- Hero: Full viewport height
- System map: Hub-and-spoke preserved
- Grids: 3 columns maintained
- Dark section: Full-width with padding

### Tablet (768px-1023px)
- Hero: Reduce font sizes (5xl → 4xl)
- System map: Slightly smaller nodes
- Grids: 2 columns
- Flow diagram: 2 rows × 3 columns

### Mobile (<768px)
- Hero: Stack CTAs vertically, 3xl text
- System map: Vertical stack (no spokes, just list)
- Grids: 1 column
- Flow diagram: Vertical 6-step list with downward arrows
- Reduce padding (py-32 → py-16)

---

## Scroll Effects

1. **Hero beam:** Appears on load, stays static
2. **Section triggers:** Animations start when 20% visible
3. **System map lines:** Draw when hub appears
4. **Stepper:** Progress bar fills as you scroll through section
5. **Dark section:** Parallax background (subtle)
6. **KPI numbers:** Count up once per visit (not on re-scroll)

---

## Style Guide

### Colors
- **Background:** #FAF8F5 (warm cream)
- **White sections:** #FFFFFF
- **Dark sections:** #2D2D2D
- **Text primary:** #2D2D2D
- **Text secondary:** #706F6C
- **Accent gold:** #D4C5A9
- **Borders:** #E5E1DA

### Typography
- **Headlines:** Georgia, serif | 5xl-7xl | line-height: 0.95
- **Subheads:** Sans-serif | xl-2xl | line-height: 1.4
- **Body:** Sans-serif | base-lg | line-height: 1.6
- **Labels:** Sans-serif | xs-sm | uppercase | tracking: 0.2em

### Spacing
- **Section padding:** py-32 (desktop), py-16 (mobile)
- **Element gaps:** 4-6 (16-24px)
- **Container max-width:** 1280px (7xl)

### Shadows
- **Cards:** shadow-sm (light), shadow-lg (hover)
- **CTA buttons:** shadow-xl on hover

### Borders
- **Radius:** 8px (small), 16px (medium), 24px (large)
- **Width:** 1px standard
- **Color:** #E5E1DA (default), #D4C5A9 (hover)

### Animations
- **Duration:** 0.3s (fast), 0.6s (medium), 1.2s (slow)
- **Easing:** ease-out (standard), ease-in-out (smooth)
- **Delays:** Stagger by 0.08-0.15s per element

---

## Image Requirements

**Total images needed: 7**

1. Backstage Beauty → "makeup artist backstage fashion"
2. Runway Tagging → "fashion show runway model"
3. Creator Partnerships → "beauty influencer filming"
4. Lookbook Content → "beauty product photography"
5. Retail Experience → "beauty popup shop"
6. Post-Show Retargeting → "woman shopping phone"
7. Optional hero background → "luxury beauty event"

**Specs:**
- Format: JPG/WebP
- Size: 1200×800px (landscape), 800×1200px (portrait)
- Optimization: <200KB per image
- Alt text: Required for accessibility

---

## Accessibility

- **Contrast ratio:** Minimum 4.5:1 (text on backgrounds)
- **Focus states:** Visible outlines on all interactive elements
- **Alt text:** All images and icons
- **Semantic HTML:** H1-H6 hierarchy maintained
- **ARIA labels:** On icon-only buttons

---

**Total Sections:** 10  
**Max Page Length:** ~8000px  
**Animations:** 30+ micro-interactions  
**Images:** 7 required  
**Load Time Target:** <3s (desktop), <5s (mobile)
