# FASHIONOS — BEAUTY SPONSORSHIP PAGE (COSMETICS)

**Purpose:** Convert beauty brands into event sponsors  
**Audience:** Beauty/cosmetics brands, marketing directors  
**Style:** Elegant, editorial, data-driven

---

## STYLE GUIDE

**Colors:**
- Background: #FAF8F5 (warm off-white)
- Accent: #D4C5A9 (gold/beige)
- Text Primary: #2D2D2D (charcoal)
- Text Secondary: #706F6C (warm gray)
- White: #FFFFFF
- Borders: #E5E1DA (light beige)

**Typography:**
- Headlines: Georgia serif, 5xl-7xl
- Body: Sans-serif, lg-xl
- Labels: xs uppercase, tracking-[0.2em]

**Spacing:**
- Sections: py-32 (128px)
- Grid gaps: gap-12 (48px)
- Card padding: p-8 to p-12

---

## PAGE STRUCTURE (9 SECTIONS)

```
1. Hero                    → Vertical beam effect + mini flow
2. Problem                 → 3-column pain points
3. System Map              → Hub-and-spoke diagram
4. How It Works            → 6-step stepper
5. Activations             → 4-card grid with icons
6. Runway to Purchase      → Dark section, 5-step journey
7. ROI Proof               → Dashboard preview + metrics
8. AI Insights             → Bento box grid (3 features)
9. Final CTA + Footer      → Conversion zone
```

---

## WIREFRAMES

### Desktop (1440px)
```
┌─────────────────────────────────┐
│  HERO (min-h-85vh)              │
│  [Vertical beam visual]         │
│  "Beauty Sponsorship OS"        │
│  "Turn runway beauty moments    │
│   into sell-through"            │
│  [Start Strategy] [How It Works]│
│  • Looks tagged • Tracked       │
└─────────────────────────────────┘
│  PROBLEM (3 cols)               │
│  ┌───┐  ┌───┐  ┌───┐           │
│  │ 1 │  │ 2 │  │ 3 │           │
│  └───┘  └───┘  └───┘           │
├─────────────────────────────────┤
│  SYSTEM MAP                     │
│      ┌──────┐                   │
│  ┌───│ Hub  │───┐               │
│  │   └──────┘   │               │
│  ○                ○              │
│  Node1          Node2            │
├─────────────────────────────────┤
│  HOW IT WORKS (Horizontal)      │
│  ●─→●─→●─→●─→●─→●              │
│  1  2  3  4  5  6               │
├─────────────────────────────────┤
│  ACTIVATIONS (2x2 grid)         │
│  ┌─────┐ ┌─────┐                │
│  │Icon │ │Icon │                │
│  └─────┘ └─────┘                │
│  ┌─────┐ ┌─────┐                │
│  │Icon │ │Icon │                │
│  └─────┘ └─────┘                │
├─────────────────────────────────┤
│  RUNWAY→PURCHASE (Dark bg)      │
│  ●─→●─→●─→●─→●                 │
│  Step1 → Purchase               │
└─────────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────┐
│  HERO        │
│  (stacked)   │
│  Headline    │
│  CTAs        │
├──────────────┤
│  PROBLEM     │
│  Card 1      │
│  Card 2      │
│  Card 3      │
├──────────────┤
│  SYSTEM      │
│  (simplified)│
│  Hub only    │
│  + 4 nodes   │
│  stacked     │
├──────────────┤
│  STEPPER     │
│  (vertical)  │
│  1 ↓ 2 ↓ 3   │
└──────────────┘
```

---

## SECTION 1: HERO

**Layout:** Min-h-85vh, centered, px-6 py-32

**Elements:**
- Vertical beam (2px gradient line from top to bottom)
- Mini flow diagram (Moment → Tag → Content → Click → Purchase)
- Headline: "The Beauty Sponsorship Operating System"
- Subheadline: "Turn runway beauty moments into measurable sell-through, attribution, and retention."
- CTAs: "Start Beauty Strategy", "See How It Works"
- Bottom micro-text: "Looks tagged • Creators tracked • Shopify sales attributed"

**Animations:**
- Beam: scaleY 0→1 (0.8s, delay 0.2s)
- Mini flow: opacity 0→0.5, y 20→0 (delay 0.5s)
- Headline: y 16→0, opacity 0→1 (delay 0.4s)
- CTAs: stagger (delay 0.6s)

**Responsive:**
- Desktop: text-7xl
- Mobile: text-5xl, CTAs stacked

---

## SECTION 2: PROBLEM

**Layout:** py-32, 3 columns, gap-12

**Content:**
- Heading: "Why Beauty Sponsorship Underperforms"
- 3 cards:
  1. Unmeasured Exposure - "Beautiful moments, no attribution"
  2. Manual Chaos - "Tags, creators, deliverables in spreadsheets"
  3. Zero Retention - "Post-show interest dies, no automation"

**Card Design:**
- Numbered circle icon (border-#D4C5A9)
- Title: text-xl
- Description: text-#706F6C

**Animations:**
- Stagger cards: y 20→0, delay i*0.08s

**Responsive:**
- Desktop: 3 columns
- Mobile: 1 column

---

## SECTION 3: SYSTEM MAP

**Layout:** py-32, bg-white, hub-and-spoke

**Diagram:**
- Center hub: 256px circle, "FashionOS Sponsorship System"
- 4 outer nodes (positioned absolute):
  - Top-left: Event Activations
  - Top-right: Live Commerce
  - Bottom-left: Audience & Leads
  - Bottom-right: ROI Analytics
- Connecting lines: SVG paths or CSS borders

**Animations:**
- Hub: scale 0.8→1, opacity 0→1 (delay 0.2s)
- Nodes: stagger y 20→0 (delay 0.4s + i*0.1s)
- Lines: Draw animation (if SVG)

**Responsive:**
- Desktop: Full hub-spoke layout
- Mobile: Simplified stack (hub + nodes vertical)

---

## SECTION 4: HOW IT WORKS

**Layout:** py-32, horizontal stepper (desktop), vertical (mobile)

**Steps (6):**
1. Discover
2. Sign Up
3. AI Strategy
4. Activate
5. Measure
6. Renew

**Design:**
- Progress line (gray-200 background, #D4C5A9 fill)
- Dots: 12px circles, numbered
- Labels: text-sm below each

**Animations:**
- Line fills: scaleX 0→1 (0.8s)
- Dots appear as line reaches them

**Responsive:**
- Desktop: Horizontal (6 cols)
- Mobile: Vertical with left line

---

## SECTION 5: ACTIVATIONS

**Layout:** py-32, 2x2 grid, gap-8

**Cards (4):**
1. Look Tagging (Sparkles icon)
   - "Tag products in runway looks with our AI-powered system"
2. Creator Tracking (Users icon)
   - "Track influencers, creators, and UGC at scale"
3. Live Commerce (ShoppingCart icon)
   - "Enable direct purchase from event moments"
4. Post-Event Automation (Target icon)
   - "Automated follow-up campaigns and retargeting"

**Card Design:**
- Icon: 48px, #D4C5A9 background circle
- Title: text-xl
- Description: text-sm #706F6C
- Border: 1px #E5E1DA
- Padding: p-12

**Animations:**
- Stagger cards: scale 0.95→1, opacity 0→1

**Responsive:**
- Desktop: 2x2 grid
- Mobile: 1 column

---

## SECTION 6: RUNWAY TO PURCHASE

**Layout:** py-32, bg-#2D2D2D (dark), text-white

**Flow (5 steps):**
1. Runway Moment (Eye icon)
2. Product Tag (Target icon)
3. Content Creation (Users icon)
4. Customer Click (TrendingUp icon)
5. Purchase (ShoppingCart icon)

**Design:**
- Horizontal flow with connecting arrows
- Icon containers: 64px circles, border-white/20
- Connector lines: 1px white/20
- Labels: text-sm uppercase

**Metrics Below:**
- 3 stat cards: Views, Clicks, Revenue
- Background: white/5, border: white/10

**Animations:**
- Steps fade in: stagger i*0.2s
- Arrows draw: width 0→100%

**Responsive:**
- Desktop: Horizontal flow
- Mobile: 2x3 grid OR vertical

---

## SECTION 7: ROI PROOF

**Layout:** py-32, split 50/50

**Left Side:**
- Heading: "Defensible ROI"
- Subheading: "Prove value with granular data"
- Progress bars (3):
  1. Sales Attribution: 94%
  2. Engagement Rate: 78%
  3. Repeat Sponsors: 86%

**Right Side:**
- Dashboard mockup (screenshot or styled div)
- Charts, metrics, data tables

**Progress Bar Design:**
- Track: h-1 bg-gray-200
- Fill: gradient emerald-500→emerald-600
- Animation: scaleX 0→1 (1s, delay 0.5s)

**Responsive:**
- Desktop: Side-by-side
- Mobile: Stacked

---

## SECTION 8: AI INSIGHTS

**Layout:** py-32, bento box grid (3 features)

**Features:**
1. AI-Powered Matching
   - "Match beauty brands with the right events"
2. Predictive ROI
   - "Forecast sponsorship performance before signing"
3. Automated Reporting
   - "Real-time dashboards sent to sponsors automatically"

**Card Design:**
- Background: white or #FAF8F5
- Border: #E5E1DA
- Icon: BarChart3, Sparkles, TrendingUp
- Padding: p-8

**Layout Pattern:**
- Card 1: Large (col-span-2)
- Card 2 & 3: Smaller (col-span-1 each)

**Responsive:**
- Desktop: Asymmetric bento
- Mobile: Stacked

---

## SECTION 9: FINAL CTA

**Layout:** py-32, bg-#2D2D2D, text-white, centered

**Content:**
- Heading: "Ready to Transform Your Beauty Sponsorship?"
- Subheadline: "See 3-5x ROI increase with FashionOS"
- CTA: "Start Beauty Strategy" → /wizard
- Secondary: "Schedule Demo" → /contact

**Responsive:**
- Desktop: Max-w-3xl centered
- Mobile: Full-width, stacked CTAs

---

## DIAGRAMS & CHARTS

### System Map (Section 3)
**Type:** Hub-and-spoke node diagram  
**Center:** 256px circle  
**Nodes:** 4 rectangles (positioned absolute)  
**Lines:** SVG paths or CSS pseudo-elements  
**Animation:** Center scales in, nodes stagger

### Stepper (Section 4)
**Type:** Horizontal progress line  
**Elements:** 6 dots + connecting line  
**Animation:** Line fills left→right, dots appear sequentially

### Flow Diagram (Section 6)
**Type:** Step-by-step journey  
**Elements:** 5 icon circles + arrows  
**Animation:** Stagger fade, arrows draw

### Progress Bars (Section 7)
**Type:** Horizontal bar charts  
**Data:** 94%, 78%, 86%  
**Animation:** Fill from 0% to value (scaleX)

---

## ANIMATIONS

**Global Easing:** cubic-bezier(0.22, 1, 0.36, 1)

**Scroll Triggers:**
- Use whileInView with { once: true }
- Viewport margin: -50px

**Standard Entrance:**
- opacity: 0→1, y: 20→0
- Duration: 0.4-0.6s

**Stagger Pattern:**
- Delay: i * 0.08s (grid items)
- Delay: i * 0.1s (larger elements)

**Hover Effects:**
- Cards: -translate-y-1, shadow increase
- Buttons: Background color change
- Icons: scale-110

---

## RESPONSIVE BREAKPOINTS

**Desktop:** 1024px+  
**Tablet:** 768-1023px  
**Mobile:** <768px

**Grid Changes:**
- 3 cols → 2 cols → 1 col
- 2x2 → 1 col
- Side-by-side → stacked

**Typography:**
- H1: 7xl → 5xl → 4xl
- H2: 5xl → 4xl → 3xl
- Body: xl → lg → base

**Spacing:**
- py-32 → py-20 → py-12
- gap-12 → gap-8 → gap-6

---

## MULTI-STEP PROMPTS

### STEP 1: Structure
Create 9 sections with proper spacing. Use bg-#FAF8F5 (default), white (System Map), #2D2D2D (Runway section, Final CTA). Container: max-w-6xl mx-auto px-6. Semantic HTML.

### STEP 2: Content
Add all headlines (Georgia serif), body text (sans-serif), CTAs. Include 3 problem cards, 6 stepper steps, 4 activation cards, 5 flow steps, 3 progress bars, 3 AI features.

### STEP 3: Diagrams
Create hub-spoke diagram (center + 4 nodes). Add horizontal stepper with progress line. Create 5-step flow with icons. Add 3 progress bars with gradient fills.

### STEP 4: Animations
Add scroll triggers (whileInView). Stagger grids. Animate beam (scaleY), progress bars (scaleX), diagrams (opacity + scale). Hover effects on cards.

### STEP 5: Responsive
Desktop: 3 cols, horizontal flows. Mobile: 1 col, vertical stacks. Typography scaling. Touch targets 44px minimum.

### STEP 6: CTAs
Wire buttons: "Start Strategy" → /wizard, "Schedule Demo" → /contact. Smooth scroll for "See How It Works" → #how-it-works.

---

## CHECKLIST

**Design:**
□ All colors match style guide  
□ Typography correct (serif headlines, sans body)  
□ Spacing consistent (py-32 sections)  
□ Icons from lucide-react  

**Diagrams:**
□ Hub-spoke renders correctly  
□ Stepper line animates  
□ Flow arrows connect  
□ Progress bars fill to correct %  

**Animations:**
□ Scroll triggers work  
□ Stagger timing natural  
□ Hover effects smooth  

**Responsive:**
□ Desktop: 3 cols, horizontal  
□ Mobile: 1 col, vertical  
□ No horizontal scroll  
□ Touch targets 44px+  

---

**Lines:** 586  
**Version:** 1.0  
**Status:** Ready
