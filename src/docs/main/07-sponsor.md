# FASHIONOS — SPONSORSHIP OPERATING SYSTEM (V2)

**Purpose:** Convert brands into sponsors with measurable ROI  
**Design Language:** Luxury editorial meets data visualization  
**Target Audience:** Brand sponsors, marketing directors, event organizers

---

## TABLE OF CONTENTS

1. [Design Philosophy](#design-philosophy)
2. [Style Guide Reference](#style-guide-reference)
3. [Page Structure](#page-structure)
4. [Wireframes](#wireframes)
5. [Section-by-Section Design](#section-by-section-design)
6. [Visual System](#visual-system)
7. [Diagrams & Charts](#diagrams--charts)
8. [Animations & Scroll Effects](#animations--scroll-effects)
9. [Responsive Strategy](#responsive-strategy)
10. [Multi-Step Implementation](#multi-step-implementation)

---

## DESIGN PHILOSOPHY

### Core Principles
```
1. CREDIBILITY FIRST
   - Data-driven messaging
   - ROI-focused positioning
   - Social proof (logos, testimonials)

2. LUXURY AESTHETIC
   - Serif typography for headlines
   - Generous whitespace
   - Muted, sophisticated color palette
   - Editorial-quality imagery

3. SYSTEM THINKING
   - Show interconnections (diagrams)
   - Visualize workflows
   - Demonstrate platform ecosystem

4. CONVERSION OPTIMIZED
   - Clear CTAs in every section
   - Low-friction wizard entry
   - Multiple engagement points

5. VISUAL HIERARCHY
   - Hero → Problem → Solution → How It Works
   - Features → Social Proof → Pricing → CTA
```

### Design Inspiration
```
References:
- Apple product pages (clean, minimal)
- Stripe Atlas (system diagrams)
- Linear (modern SaaS design)
- Fashion editorials (photography, typography)
```

---

## STYLE GUIDE REFERENCE

### Colors (from /docs/main/06-style-guide.md)
```
PRIMARY PALETTE:
- Beige:        #F5F2ED (warm background)
- Off-white:    #FDFDFB (soft white)
- Charcoal:     #1A1A1A (near black)
- Accent:       #D4C5B0 (muted gold/beige)

TEXT:
- Primary:      #1A1A1A (near black)
- Secondary:    #666666 (gray-600)
- Tertiary:     #999999 (gray-400)

SEMANTIC:
- Success:      #10B981 (emerald)
- Warning:      #F59E0B (amber)
- Error:        #EF4444 (red)
- Info:         #3B82F6 (blue)
```

### Typography
```
HEADLINES (Marketing):
- H1: 6xl-8xl (60-96px) Serif, tracking-tight
- H2: 4xl-5xl (36-48px) Serif
- H3: 2xl-3xl (24-30px) Serif

BODY:
- Large: xl-2xl (20-24px) Sans-serif, font-light
- Regular: base-lg (16-18px) Sans-serif
- Small: sm (14px) Sans-serif
- Micro: xs (12px) Uppercase, tracking-widest

DASHBOARD ELEMENTS:
- Stats: 3xl-4xl (30-36px) Serif, font-bold
- Labels: xs uppercase tracking-widest
```

### Spacing
```
SECTIONS:
- Large: py-28 (112px vertical)
- Medium: py-20 (80px vertical)
- Small: py-12 (48px vertical)

CARDS:
- Padding: p-6 to p-10 (24-40px)
- Gap: gap-6 to gap-8 (24-32px)
- Border radius: rounded-sm (2px) or rounded-lg (8px)
```

---

## PAGE STRUCTURE (11 SECTIONS)

```
1. Hero                         → Full-screen immersive hero
2. The Problem                  → 3-card pain point grid
3. The Solution (Diagram)       → System architecture visualization
4. How It Works                 → 6-step horizontal timeline
5. Sponsor Strategy Wizard      → AI-powered wizard preview
6. Activations Gallery          → 6-image grid of activation types
7. Live Commerce Flow           → 4-step purchase journey diagram
8. ROI Dashboard Preview        → Analytics interface mockup
9. Pricing Tiers                → 3-tier pricing table
10. Social Proof                → Client logos + testimonials
11. Final CTA + Footer          → Conversion section
```

---

## WIREFRAMES

### Desktop Layout (1440px)
```
┌─────────────────────────────────────────────────────────┐
│  HERO (Full viewport height)                           │
│                                                         │
│         H1: "The Sponsorship Operating System"         │
│         Subtitle: "Turn brand exposure into ROI"       │
│         [CTA: Start Strategy] [Watch Demo]             │
│                                                         │
│  (Background: Faded runway image + gradient overlay)   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  THE PROBLEM (White bg)                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │Unmeasured   │ │Manual       │ │Zero         │      │
│  │Exposure     │ │Chaos        │ │Retention    │      │
│  └─────────────┘ └─────────────┘ └─────────────┘      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  THE SOLUTION (Beige bg)                                │
│                                                         │
│           ┌──────────┐                                 │
│      ┌────│ FashionOS│────┐                           │
│      │    │  System  │    │                           │
│      │    └──────────┘    │                           │
│  ┌───┴───┐            ┌───┴───┐                       │
│  │Events │            │Commerce│                       │
│  └───────┘            └───────┘                       │
│                                                         │
│  (SVG connecting lines between nodes)                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  HOW IT WORKS (White bg)                                │
│                                                         │
│  ●────────●────────●────────●────────●────────●        │
│  01       02       03       04       05       06        │
│  Discover SignUp  AI Strat Activate Measure  Renew     │
│                                                         │
│  (Animated progress line fills left to right)          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  WIZARD PREVIEW (Gray bg)                               │
│  ┌─────────────────┐  ┌────────────────────────┐       │
│  │ Text content:   │  │  Stacked wizard steps  │       │
│  │ "AI Strategy    │  │  ✓ Add Brand Profile   │       │
│  │  in Minutes"    │  │  ✓ Define Goals        │       │
│  │  [Try Demo]     │  │  ✓ Select Events       │       │
│  └─────────────────┘  │  ✓ Configure Activ.    │       │
│                       │  ✓ Preview ROI         │       │
│                       └────────────────────────┘       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ACTIVATIONS (White bg)                                 │
│  ┌────┐ ┌────┐ ┌────┐                                 │
│  │Img1│ │Img2│ │Img3│  (3x2 grid)                     │
│  └────┘ └────┘ └────┘                                 │
│  ┌────┐ ┌────┐ ┌────┐                                 │
│  │Img4│ │Img5│ │Img6│                                 │
│  └────┘ └────┘ └────┘                                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  LIVE COMMERCE (Black bg, white text)                   │
│                                                         │
│  ●─────────→ ●─────────→ ●─────────→ ●               │
│  Runway      Product     Mobile      Checkout          │
│  Look        Tag         Cart                          │
│                                                         │
│  [Live Clicks: 3,420] [Purchases: 312] [Rev: $82K]    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ROI DASHBOARD (Beige bg)                               │
│  ┌──────────────┐  ┌──────────────────────────┐        │
│  │ Text         │  │  Dashboard mockup:       │        │
│  │ "Defensible  │  │  - Progress bars         │        │
│  │  ROI"        │  │  - Charts                │        │
│  │              │  │  - Metrics cards         │        │
│  └──────────────┘  └──────────────────────────┘        │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (375px)
```
┌─────────────────┐
│  HERO           │
│  (Stacked)      │
│  Headline       │
│  Subtitle       │
│  [CTA]          │
├─────────────────┤
│  PROBLEM        │
│  Card 1         │
│  Card 2         │
│  Card 3         │
│  (Stacked 1col) │
├─────────────────┤
│  SOLUTION       │
│  (Simplified    │
│   diagram)      │
├─────────────────┤
│  HOW IT WORKS   │
│  (Vertical      │
│   timeline)     │
│  ● 01 Discover  │
│  ↓              │
│  ● 02 Sign Up   │
│  ↓              │
│  ● 03 Strategy  │
├─────────────────┤
│  ACTIVATIONS    │
│  (2 columns)    │
└─────────────────┘
```

---

## SECTION 1: HERO

### Layout
```
Height: 100vh (full viewport)
Background: #FDFDFB (off-white)
Text: Centered
Z-layering: Image (0) → Gradient (1) → Content (10)
```

### Content
```
HEADLINE:
"The Sponsorship
Operating System"

Note: "Operating System" in italic, font-light, gray-400

SUBTITLE:
"Turn brand exposure into measurable ROI—across live events 
and digital channels."

CTA 1: "Start Sponsor Strategy" → /wizard (black button)
CTA 2: "See How It Works" → #how-it-works (text link with play icon)
```

### Background Treatment
```
Layer 1: Runway photo
- Image: Fashion runway background
- Filter: opacity-20, grayscale, brightness-125
- Scale animation: 1.1 → 1.0 on load

Layer 2: Gradient overlay
- Top: #FDFDFB/80
- Middle: #FDFDFB/50
- Bottom: #FDFDFB (full)

Layer 3: Ambient shape
- Position: top-1/4 right-1/4
- Size: 384px circle
- Color: #D4C5B0
- Filter: blur-[120px], opacity-10
- Animation: Floating (x: 0-12px, y: 0-8px, 20s loop)

Search: "fashion runway show luxury event"
```

### Animations
```
ON LOAD:
- Background image: { scale: 1.1, opacity: 0 } → { scale: 1, opacity: 1 } (1.5s)
- Headline: { opacity: 0, scale: 0.98 } → { opacity: 1, scale: 1 } (0.6s)
- Subtitle: { opacity: 0, y: 12 } → { opacity: 1, y: 0 } (0.4s delay: 0.12s)
- CTAs: { opacity: 0, y: 8 } → { opacity: 1, y: 0 } (0.3s delay: 0.2s)

HOVER:
- CTA button: Arrow icon translates right 4px
- "See How It Works": Play icon scales 1.1x
```

### Responsive
```
Desktop (1024px+):
- H1: text-8xl (96px)
- Subtitle: text-2xl (24px)
- CTAs: Horizontal flex

Tablet (768-1023px):
- H1: text-6xl (60px)
- Subtitle: text-xl (20px)

Mobile (<768px):
- H1: text-5xl (48px)
- Subtitle: text-lg (18px)
- CTAs: Stacked vertical, full-width
```

---

## SECTION 2: THE PROBLEM

### Layout
```
Background: White
Grid: 3 columns (desktop), 1 column (mobile)
Gap: 32px (gap-8)
Padding: py-28 (112px vertical)
```

### Content
```
HEADING (centered):
"Why Sponsorship Underperforms"

CARDS (3):
1. Unmeasured Exposure
   "Logos on walls don't translate to data. You're flying blind 
   on actual impact."

2. Manual Chaos
   "Spreadsheets, PDFs, and disconnected emails make activations 
   inconsistent."

3. Zero Retention
   "Without clear ROI proof, sponsors view events as a one-time 
   expense, not an asset."
```

### Card Design
```
Background: #FAFAF9 (subtle gray)
Border: 1px border-gray-100
Border radius: rounded-sm (2px)
Padding: p-10 (40px)
Hover: shadow-[0_8px_30px_rgb(0,0,0,0.04)], -translate-y-1

Elements:
- Decorative line: w-8 h-[1px] bg-#D4C5B0 (expands to w-16 on hover)
- Title: text-xl font-serif text-#1A1A1A
- Description: text-sm text-gray-500 leading-relaxed
```

### Animations
```
ON SCROLL:
- Cards stagger fade in: { opacity: 0, y: 16 } → { opacity: 1, y: 0 }
- Delay: i * 0.08s (0s, 0.08s, 0.16s)
- Duration: 0.3s
- Viewport margin: -50px (triggers 50px before visible)

HOVER:
- Card lifts up 4px
- Shadow increases
- Decorative line expands from 32px to 64px
- All: transition-all duration-300
```

---

## SECTION 3: THE SOLUTION (DIAGRAM)

### Layout
```
Background: #FDFDFB (beige)
Centered content
Max-width: 1024px
Diagram height: 500px
Padding: py-28
```

### Content
```
BADGE: "The Solution"
HEADING: "One System. Full Visibility."
SUBHEADING: "FashionOS connects event activations, commerce, 
marketing channels, and ROI reporting — in one unified platform."
```

### System Diagram
```
CENTER NODE:
- Size: 256px circle
- Background: White
- Border: 1px #F0F0F0
- Shadow: 0_20px_50px_rgb(0,0,0,0.05)
- Content: "FashionOS" (text-3xl serif)
           "Sponsorship System" (text-xs uppercase tracking-widest)

OUTER NODES (4):
1. Top-left: "Event Activations"
2. Top-right: "Live Commerce"
3. Bottom-left: "Audience & Leads"
4. Bottom-right: "ROI Analytics"

Each outer node:
- Size: 192px × 128px
- Background: White
- Border: 1px gray-100
- Shadow: sm
- Rounded: rounded-lg
- Text: text-sm font-medium gray-800

CONNECTOR LINES (SVG):
- 4 lines from center to each outer node
- Stroke: #E5E5E5
- Stroke width: 1px
- Animated: pathLength 0 → 1 (0.8s delay: 0.2s)

Positions:
- Center: absolute center of container
- Top-left: left-0 top-10
- Top-right: right-0 top-10
- Bottom-left: left-0 bottom-10
- Bottom-right: right-0 bottom-10
```

### Animations
```
ON SCROLL:
- SVG lines draw in: { pathLength: 0 } → { pathLength: 1 } (0.8s delay: 0.2s)
- Center node: { opacity: 0, scale: 0.95 } → { opacity: 1, scale: 1 } (0.4s)
- Outer nodes: { opacity: 0, scale: 0.96 } → { opacity: 1, scale: 1 }
  Stagger delay: 0.2s + (i * 0.1s)
```

### Responsive
```
Desktop (1024px+):
- Full diagram with 4 outer nodes
- Connector lines visible

Tablet (768-1023px):
- Simplified: 2x2 grid with center
- Shorter connector lines

Mobile (<768px):
- Vertical stack:
  - Center node (full-width)
  - 4 outer nodes stacked below
  - No connector lines (or simplified vertical lines)
```

---

## SECTION 4: HOW IT WORKS

### Layout
```
Background: White
Padding: py-28
Timeline: Horizontal (desktop), vertical (mobile)
```

### Content
```
HEADING: "How It Works"

STEPS (6):
01. Discover
02. Sign Up
03. AI Strategy
04. Activate
05. Measure
06. Renew
```

### Timeline Design
```
HORIZONTAL (Desktop):
- Progress line background: 1px h-line gray-100
- Progress line fill: 1px h-line #1A1A1A (animates scaleX 0 → 1)
- Grid: 6 columns

Each step:
- Dot: 16px circle, white bg, 2px border-#1A1A1A
- Number: text-xs font-bold uppercase "01", "02", etc.
- Label: text-sm text-gray-500

VERTICAL (Mobile):
- Progress line: 1px v-line on left side
- Steps stacked vertically
- Connecting line animates top to bottom
```

### Animations
```
ON SCROLL:
- Progress line fills: { scaleX: 0 } → { scaleX: 1 } (0.8s)
  OR { scaleY: 0 } → { scaleY: 1 } (mobile)
- Steps stagger: { opacity: 0, y: 12 } → { opacity: 1, y: 0 }
  Delay: i * 0.07s
- Duration: 0.25s per step

HOVER:
- Step dot: scale-125
- Step label: text-gray-500 → text-#1A1A1A
- All: transition-colors duration-300
```

---

## SECTION 5: SPONSOR STRATEGY WIZARD

### Layout
```
Background: #FAFAF9 (gray)
Grid: 1/3 + 2/3 (desktop), stacked (mobile)
Padding: py-28
```

### Content
```
LEFT SIDE (1/3):
BADGE: "Efficiency"
HEADING: "A Sponsor Strategy in Minutes"
SUBHEADING: "AI suggests the best fit events and activations. 
Brands stay in control of approval and budget."
CTA: "Try The Demo" → /wizard (outline button)

RIGHT SIDE (2/3):
WIZARD STEPS (5 stacked cards):
1. Add Brand Profile
2. Define Goals (Awareness vs Conversion)
3. Select Matching Events
4. Configure Activations
5. Preview ROI Projection

Each card:
- Checkmark icon (emerald)
- Step text
- Cascading left margin (i * 20px)
```

### Card Design
```
Background: White
Padding: p-6 (24px)
Border: 1px border-gray-100
Border radius: rounded-lg
Shadow: sm
Margin-bottom: mb-4
Cascading effect: marginLeft: i * 20px

Elements:
- Text: text-sm font-medium gray-800
- Icon: 24px circle, emerald-50 bg, emerald-600 checkmark
```

### Animations
```
ON SCROLL:
- Cards stagger: { opacity: 0, y: 20 } → { opacity: 1, y: 0 }
  Delay: i * 0.1s
  Duration: 0.3s
- Cascading margin creates visual waterfall effect
```

---

## SECTION 6: ACTIVATIONS GALLERY

### Layout
```
Background: White
Grid: 3 columns × 2 rows (desktop), 2 columns (mobile)
Gap: gap-6 (24px)
Padding: py-28
```

### Content
```
HEADING: "Activations That Feel Native"
SUBHEADING: "Seamlessly integrated into the event experience."

ACTIVATION TYPES (6):
1. Runway Looks
2. VIP Moments
3. Influencer Content
4. Live Shopping
5. Post-Event Campaign
6. Digital Gift Bags

Each with:
- High-quality image (4:5 aspect ratio)
- Title overlay
- Hover reveal CTA
```

### Card Design
```
Aspect ratio: aspect-[4/5]
Border radius: rounded-sm
Overflow: hidden
Cursor: pointer

Image:
- Object-fit: cover
- Hover: scale-105 (duration-700)

Gradient overlay:
- Position: absolute inset-0
- Gradient: from-black/80 via-black/20 to-transparent
- Opacity: 90

Text content (bottom):
- Position: absolute bottom-0 left-0
- Padding: p-6
- Title: text-xl font-serif white
- CTA: text-xs white/60, opacity-0 (appears on hover)
```

### Image Search Queries
```
1. "luxury fashion runway show model walking"
2. "vip fashion event exclusive lounge"
3. "fashion influencer creating content phone"
4. "live shopping fashion ecommerce mobile"
5. "fashion marketing campaign photoshoot"
6. "luxury gift packaging unboxing experience"
```

### Animations
```
ON SCROLL:
- Cards stagger: { opacity: 0, y: 12 } → { opacity: 1, y: 0 }
  Delay: i * 0.08s
  Duration: 0.3s

HOVER:
- Image: scale 1.0 → 1.05 (duration-700)
- CTA text: opacity 0 → 100, translateY 8px → 0px
- All: transition duration-300
```

---

## SECTION 7: LIVE COMMERCE FLOW

### Layout
```
Background: #1A1A1A (black)
Text: White
Padding: py-28
Centered content
```

### Content
```
BADGE: "Commerce" (white border)
HEADING: "From Runway to Purchase" (white text)

FLOW STEPS (4):
1. Runway Look (Users icon)
2. Product Tag (Target icon)
3. Mobile Cart (Smartphone icon)
4. Checkout (ShoppingBag icon)

KPI CARDS (3):
- Live Clicks: 3,420
- Purchases: 312
- Revenue: $82,300
```

### Flow Diagram
```
HORIZONTAL STEPS:
Each step:
- Icon container: 64px circle
  Border: 1px white/20
  Background: white/5
- Icon: 24px white
- Label: text-sm uppercase tracking-wide

Connectors between steps:
- Horizontal line: 1px white/20
- Animates: width 0 → 100% (0.4s)
- Delay: Staggers with step appearance
```

### KPI Cards
```
Grid: 3 columns (desktop), 1 column (mobile)
Card design:
- Background: white/5
- Border: 1px white/10
- Padding: p-8
- Border radius: rounded-sm
- Text alignment: center

Content:
- Label: text-xs gray-400 uppercase tracking-widest
- Value: text-3xl font-serif white
```

### Animations
```
ON SCROLL:
- Steps: { opacity: 0, scale: 0.9 } → { opacity: 1, scale: 1 }
  Delay: i * 0.2s
  Duration: 0.4s
- Connector lines: { width: 0, opacity: 0 } → { width: 100%, opacity: 1 }
  Delay: i * 0.2s + 0.2s
- KPI cards: { opacity: 0, y: 10 } → { opacity: 1, y: 0 }
  Delay: 0.8s + (i * 0.1s)
```

---

## SECTION 8: ROI DASHBOARD PREVIEW

### Layout
```
Background: #FDFDFB (beige)
Grid: 1/2 + 1/2 (desktop), stacked (mobile)
Padding: py-28
```

### Content
```
LEFT SIDE:
BADGE: "Analytics"
HEADING: "Defensible ROI"
SUBHEADING: "Prove value to sponsors with granular data. Track 
everything from initial reach to final conversion."

PROGRESS BARS (3):
1. Sales Attribution Confidence: 94%
2. Engagement Rate: 78%
3. Repeat Sponsor Rate: 86%

RIGHT SIDE:
Dashboard mockup screenshot or styled div with:
- Chart visualization
- Metric cards
- Progress indicators
- Data tables
```

### Progress Bar Design
```
Container: space-y-6

Each bar:
- Label + percentage: flex justify-between
  Label: text-xs font-bold uppercase tracking-wider gray-500
  Percentage: text-xs gray-500
- Track: h-1 w-full bg-gray-200 rounded-full
- Fill: h-full bg-gradient-to-r from-emerald-500 to-emerald-600
  Width: {percentage}%
  Rounded: rounded-full
  Animation: { scaleX: 0 } → { scaleX: 1 } (1s ease-out delay: 0.5s)
```

### Dashboard Mockup
```
Option 1: Screenshot of actual dashboard
Option 2: Styled mockup div:
- Background: White
- Border: 1px gray-200
- Rounded: rounded-lg
- Shadow: lg
- Padding: p-6

Contains:
- Mini chart (bar chart or line chart)
- 3-4 metric cards with icons
- Table with sample data
- Use placeholder data or real event stats
```

---

## SECTION 9: PRICING TIERS

### Layout
```
Background: White
Grid: 3 columns (desktop), 1 column (mobile)
Gap: gap-8 (32px)
Padding: py-28
Max-width: 1200px centered
```

### Content
```
TIERS (3):

1. STARTER
   Price: "From $2,500/event"
   Target: "Small events & first-time sponsors"
   Features:
   - Up to 5 sponsors per event
   - Basic activation tracking
   - Email support
   - Standard reporting
   CTA: "Get Started"

2. PROFESSIONAL (Most Popular)
   Price: "From $7,500/event"
   Target: "Fashion weeks & multi-brand events"
   Badge: "Most Popular"
   Features:
   - Up to 20 sponsors per event
   - Advanced activation tracking
   - Live commerce integration
   - AI sponsor matching
   - Priority support
   - Custom reporting
   CTA: "Start Free Trial"

3. ENTERPRISE
   Price: "Custom Pricing"
   Target: "Multi-event series & agencies"
   Features:
   - Unlimited sponsors
   - Full platform access
   - White-label options
   - Dedicated account manager
   - API access
   - Custom integrations
   CTA: "Contact Sales"
```

### Card Design
```
Background: White
Border: 2px solid
  Starter: border-gray-200
  Professional: border-#1A1A1A (featured)
  Enterprise: border-gray-200
Border radius: rounded-lg
Padding: p-8
Shadow: Hover increases to lg

Professional card additions:
- Badge: "Most Popular"
  Position: absolute top right
  Background: #1A1A1A
  Text: white text-xs uppercase
  Padding: px-3 py-1
  Rounded: rounded-full

Elements:
- Tier name: text-xs uppercase tracking-widest gray-500
- Price: text-3xl font-serif font-bold #1A1A1A
- Target: text-sm text-gray-600
- Features: List with checkmark icons
  Icon: 16px emerald-600
  Text: text-sm gray-700
  Spacing: space-y-3
- CTA: Full-width button
  Starter/Enterprise: Outline
  Professional: Solid black
```

### Animations
```
ON SCROLL:
- Cards stagger: { opacity: 0, y: 20 } → { opacity: 1, y: 0 }
  Center card first, then outer cards
  Delay: Center: 0s, Left: 0.1s, Right: 0.1s
  Duration: 0.4s

HOVER:
- Card lifts: -translate-y-2
- Shadow increases
- Professional card: Glow effect
```

---

## SECTION 10: SOCIAL PROOF

### Layout
```
Background: #FAFAF9 (gray)
Padding: py-28
Centered content
```

### Content
```
HEADING: "Trusted by Leading Brands"

CLIENT LOGOS (6-8):
- Display as grayscale logos
- Hover: Color returns
- Grid: 6 columns (desktop), 3 (tablet), 2 (mobile)

Example brands:
CHANEL, GUCCI, PRADA, DIOR, VERSACE, BURBERRY

TESTIMONIALS (2-3 cards):
Each with:
- Quote (italic, text-lg)
- Author name + role
- Company logo (small)
- Optional: Avatar photo
```

### Logo Grid
```
Each logo:
- Height: 40px
- Filter: grayscale(1)
- Opacity: 0.5
- Hover: grayscale(0), opacity-100
- Transition: 0.3s
```

### Testimonial Card
```
Background: White
Border: 1px gray-200
Rounded: rounded-lg
Padding: p-8
Max-width: 600px

Quote: text-lg italic text-gray-700 leading-relaxed
Author: text-base font-medium #1A1A1A
Role: text-sm text-gray-600
Logo: h-6 grayscale opacity-40
```

---

## SECTION 11: FINAL CTA + FOOTER

### CTA Section
```
Background: #1A1A1A (black)
Text: White
Padding: py-32
Centered content
Max-width: 800px

HEADLINE: "Ready to Transform Your Sponsorship Program?"
SUBHEADLINE: "Start with our AI-powered wizard and see how FashionOS 
can increase sponsor ROI by 3-5x."

CTA: "Start Strategy Wizard" → /wizard (white button)
SECONDARY: "Schedule Demo" → /contact (outline button)
```

### Footer
```
See /components/Footer.tsx for implementation
Include:
- Navigation links
- Contact info
- Social media
- Copyright
```

---

## DIAGRAMS & CHARTS

### System Architecture Diagram (Section 3)
```
TYPE: Node network diagram
TOOL: SVG with motion/react

Elements:
- 1 center node (large circle)
- 4 outer nodes (rectangles)
- 4 connecting lines (paths)

Animation sequence:
1. Lines draw in (pathLength animation)
2. Center node fades + scales in
3. Outer nodes stagger in

SVG structure:
<svg className="absolute inset-0 w-full h-full">
  <path d="M450 250 L150 100" stroke="#E5E5E5" strokeWidth="1" />
  <!-- 3 more paths -->
</svg>
```

### Process Timeline (Section 4)
```
TYPE: Horizontal progress line with nodes
TOOL: CSS + motion/react

Elements:
- Background line (gray-100, 1px)
- Animated fill line (black, scaleX animation)
- 6 circular nodes
- Step numbers + labels

Animation:
- Line fills left to right
- Nodes appear as line reaches them
```

### Commerce Flow (Section 7)
```
TYPE: Step-by-step flow diagram
TOOL: Flex layout with animated connectors

Elements:
- 4 circular icon containers
- 3 connecting lines (between steps)
- Labels below each step

Animation:
- Steps fade + scale in (stagger)
- Connector lines draw (width 0 → 100%)
```

### Progress Bars (Section 8)
```
TYPE: Horizontal bar charts
TOOL: CSS with gradient fills

3 bars showing:
- Sales Attribution: 94%
- Engagement Rate: 78%
- Repeat Sponsors: 86%

Animation:
- Fill animates from 0% to target % (scaleX)
- Duration: 1s with ease-out
- Delay: 0.5s after scroll trigger
```

### ROI Dashboard (Section 8)
```
TYPE: Dashboard mockup/screenshot
OPTIONS:
1. Actual screenshot from dashboard
2. Styled mockup div

If mockup, include:
- Line chart (TrendingUp icon or simple SVG)
- 3-4 stat cards with numbers
- Mini table with data
- All using placeholder/demo data
```

---

## ANIMATIONS & SCROLL EFFECTS

### Global Animation Tokens
```
EASING: cubic-bezier(0.22, 1, 0.36, 1)
This creates smooth, natural motion

DURATION SCALE:
- Fast: 0.2-0.3s (micro-interactions)
- Medium: 0.4-0.6s (element transitions)
- Slow: 0.8-1.5s (section entrances)
```

### Scroll-Triggered Animations
```
PATTERN:
All sections use whileInView from motion/react

Standard entrance:
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 0.4, ease: EASING }}

Stagger pattern (for grids):
Parent container:
variants={{ 
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}}

Child items:
variants={{ 
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}}
```

### Specific Section Animations

#### Hero
```
Background image: Scale 1.1 → 1.0, fade in (1.5s)
Headline: Opacity + scale (0.6s)
Subtitle: Opacity + y (0.4s delay: 0.12s)
CTAs: Opacity + y (0.3s delay: 0.2s)
Floating shape: Continuous x/y loop (20s)
```

#### Problem Cards
```
Stagger fade + slide up
Delay: i * 0.08s (0s, 0.08s, 0.16s)
Hover: Lift + shadow + line expand
```

#### Solution Diagram
```
1. SVG paths draw (pathLength 0 → 1, 0.8s)
2. Center node appears (opacity + scale, 0.4s)
3. Outer nodes stagger in (delay: 0.2s + i*0.1s)
```

#### Timeline
```
Line fills (scaleX 0 → 1, 0.8s)
Dots appear as line reaches them
Stagger steps (delay: i * 0.07s)
```

#### Wizard Cards
```
Cascading entrance with marginLeft offset
Stagger: i * 0.1s delay
Creates waterfall visual effect
```

#### Activations
```
Image hover: scale-105 (duration-700)
Overlay CTA: opacity 0 → 100, slide up
Stagger grid: i * 0.08s
```

#### Commerce Flow
```
Steps fade + scale: i * 0.2s delay
Connector lines: width 0 → 100% (0.4s)
KPI cards: final stagger after flow completes
```

#### ROI Progress Bars
```
Bars fill: scaleX 0 → 1 (1s ease-out, delay: 0.5s)
Creates left-to-right fill effect
```

### Hover Effects
```
CARDS:
- Lift: -translate-y-1 or -translate-y-2
- Shadow: Increase from sm to lg
- Duration: 300ms

IMAGES:
- Scale: 1.05 or 1.1
- Duration: 700ms
- Origin: center

BUTTONS:
- Primary: Background darken, arrow translate-x
- Outline: Border color change
- Icon: Scale or rotate

DECORATIVE LINES:
- Width expand: w-8 → w-16
- Duration: 300ms
```

---

## RESPONSIVE STRATEGY

### Breakpoint System
```
sm:   640px   (Large mobile)
md:   768px   (Tablet)
lg:   1024px  (Desktop)
xl:   1280px  (Large desktop)
```

### Typography Scaling
```
HEADLINES:
Hero H1:     text-5xl md:text-6xl lg:text-8xl
Section H2:  text-3xl md:text-4xl lg:text-5xl

BODY:
Large:       text-lg md:text-xl lg:text-2xl
Regular:     text-base md:text-lg
Small:       text-sm
```

### Grid Adjustments
```
PROBLEM CARDS (3):
Desktop: grid-cols-3
Tablet: grid-cols-2 (third wraps)
Mobile: grid-cols-1

ACTIVATIONS (6):
Desktop: grid-cols-3 (2 rows)
Tablet: grid-cols-2 (3 rows)
Mobile: grid-cols-2 (3 rows, smaller)

PRICING (3):
Desktop: grid-cols-3
Tablet: grid-cols-2 (third below)
Mobile: grid-cols-1 (stacked)

CLIENT LOGOS (6-8):
Desktop: grid-cols-6
Tablet: grid-cols-3
Mobile: grid-cols-2
```

### Layout Changes
```
HERO:
Desktop: Full viewport, centered
Mobile: Reduced to 80vh, smaller text

WIZARD SECTION:
Desktop: Side-by-side (1/3 + 2/3)
Mobile: Stacked (text top, cards below)

COMMERCE FLOW:
Desktop: Horizontal 4-step flow
Mobile: Vertical flow OR simplified 2x2 grid

SOLUTION DIAGRAM:
Desktop: Full node network
Mobile: Simplified vertical stack
```

### Touch Optimization
```
BUTTONS:
- Min height: 44px
- Min width: 44px
- Padding: Increased on mobile

CARDS:
- Padding: Larger on mobile for touch
- Hover effects: Convert to tap/active states

NAVIGATION:
- Mobile menu: Full-screen overlay
- Touch-friendly spacing
```

---

## MULTI-STEP IMPLEMENTATION

### STEP 1: Structure & Layout
```
PROMPT:
"Create a sponsorship platform landing page with 11 sections:

1. Hero (full viewport, centered text, background image)
2. Problem cards (3-column grid)
3. Solution diagram (centered, max-w-4xl)
4. Timeline (horizontal, 6 steps)
5. Wizard preview (1/3 + 2/3 grid)
6. Activations gallery (3×2 grid)
7. Commerce flow (centered, max-w-5xl)
8. ROI dashboard (1/2 + 1/2 split)
9. Pricing (3-column grid)
10. Social proof (centered)
11. Final CTA + footer

Use semantic HTML sections. Container: max-w-[1200px] mx-auto px-6. 
Background colors alternate: #FDFDFB (beige), white, #FAFAF9 (gray), 
#1A1A1A (black for commerce section). Padding: py-28 for all sections."
```

### STEP 2: Typography & Content
```
PROMPT:
"Add all content using style guide typography:

HERO:
- H1: text-6xl md:text-8xl font-serif tracking-tight
  'The Sponsorship Operating System'
  ('Operating System' in italic font-light gray-400)
- Subtitle: text-xl md:text-2xl font-light gray-600
- CTAs: 'Start Sponsor Strategy', 'See How It Works'

PROBLEM (3 cards):
- Heading: 'Why Sponsorship Underperforms'
- Cards: 'Unmeasured Exposure', 'Manual Chaos', 'Zero Retention'
  (Each with description)

SOLUTION:
- Badge: 'The Solution'
- Heading: 'One System. Full Visibility.'
- Diagram labels: FashionOS (center), Event Activations, Live Commerce, 
  Audience & Leads, ROI Analytics

TIMELINE: 6 steps (Discover, Sign Up, AI Strategy, Activate, Measure, Renew)

WIZARD: 5 steps with checkmarks

ACTIVATIONS: 6 types (Runway Looks, VIP Moments, etc.)

COMMERCE: 4 steps + 3 KPIs

ROI: Progress bars with percentages

PRICING: 3 tiers with features

Use serif for headlines, sans-serif for body. Tracking-tight on h1/h2, 
font-light for paragraphs."
```

### STEP 3: Images & Visual Assets
```
PROMPT:
"Add images using ImageWithFallback component (if needed) or direct URLs:

HERO BACKGROUND:
- Fashion runway photo, opacity-20, grayscale
  Search: 'luxury fashion runway show event'

ACTIVATIONS (6 images):
1. 'luxury fashion runway model walking'
2. 'vip fashion event exclusive lounge'
3. 'fashion influencer content creation'
4. 'live shopping mobile ecommerce fashion'
5. 'fashion marketing campaign photoshoot'
6. 'luxury gift packaging unboxing'

Aspect ratio: 4:5 (vertical)
Hover: scale-105

CLIENT LOGOS:
- Use text or SVG logos (CHANEL, GUCCI, PRADA, DIOR, VERSACE, BURBERRY)
- Grayscale filter, hover: color

Icons from lucide-react: ArrowRight, CheckCircle2, Users, Target, 
Smartphone, ShoppingBag, TrendingUp, BarChart3, Globe, Sparkles, Play.

All images have alt text for accessibility."
```

### STEP 4: Diagrams & SVG Elements
```
PROMPT:
"Create system diagram with SVG and motion/react:

SOLUTION DIAGRAM (Section 3):
- SVG container: absolute inset-0, pointer-events-none
- 4 SVG paths connecting center to corners:
  path d='M450 250 L150 100' (top-left)
  path d='M450 250 L750 100' (top-right)
  path d='M450 250 L150 400' (bottom-left)
  path d='M450 250 L750 400' (bottom-right)
  Stroke: #E5E5E5, strokeWidth: 1
  Animation: pathLength 0 → 1 (duration: 0.8s, delay: 0.2s)
- Center node: 256px circle, white bg, shadow
- Outer nodes: 192×128px rectangles, positioned absolute

TIMELINE (Section 4):
- Background line: 1px horizontal, gray-100
- Animated line: 1px horizontal, #1A1A1A, scaleX 0 → 1
- 6 dots: 16px circles, white bg, 2px border-#1A1A1A
- Grid: grid-cols-6

COMMERCE FLOW (Section 7):
- 4 icon containers: 64px circles, border white/20
- Connector lines: 1px white/20, width animates 0 → 100%
- Use motion.div for step containers, motion.div for lines

ROI PROGRESS BARS (Section 8):
- Track: h-1 bg-gray-200 rounded-full
- Fill: h-full bg-gradient emerald-500 to emerald-600
  Width: data-driven percentage (94%, 78%, 86%)
  Animation: scaleX 0 → 1 (1s ease-out, delay: 0.5s)

Use motion/react for all animations."
```

### STEP 5: Animations & Interactions
```
PROMPT:
"Add scroll animations and hover effects using motion/react:

GLOBAL EASING: cubic-bezier(0.22, 1, 0.36, 1)

HERO:
- Background image: initial={{ scale: 1.1, opacity: 0 }} 
  animate={{ scale: 1, opacity: 1 }} (1.5s)
- Headline: initial={{ opacity: 0, scale: 0.98 }} 
  animate={{ opacity: 1, scale: 1 }} (0.6s)
- Subtitle: initial={{ opacity: 0, y: 12 }} 
  animate={{ opacity: 1, y: 0 }} (0.4s delay: 0.12s)
- Floating shape: animate={{ x: [0, 12, 0], y: [0, -8, 0] }} 
  (20s infinite loop)

SCROLL TRIGGERS (all sections):
- Use whileInView with viewport={{ once: true, margin: '-50px' }}
- Standard entrance: { opacity: 0, y: 20 } → { opacity: 1, y: 0 }

STAGGER GRIDS (Problem, Activations, Pricing):
- Parent: variants with staggerChildren: 0.08
- Children: opacity + y animation
- Delay: i * 0.08s per item

DIAGRAM ANIMATIONS:
- SVG paths: pathLength 0 → 1
- Nodes: opacity + scale stagger

TIMELINE:
- Line fills: scaleX 0 → 1
- Dots appear as line reaches them

HOVER EFFECTS:
- Cards: -translate-y-1, shadow increase (duration: 300ms)
- Images: scale-105 (duration: 700ms)
- Buttons: Arrow translate-x-1
- Decorative lines: width expand

Use motion/react for all animations. Add group classes for hover 
child elements."
```

### STEP 6: Responsive Design
```
PROMPT:
"Make page fully responsive:

HERO:
Desktop: h-screen, text-8xl
Tablet: h-[80vh], text-6xl
Mobile: h-auto min-h-[600px], text-5xl, CTAs stacked

GRIDS:
Problem: lg:grid-cols-3 md:grid-cols-2 grid-cols-1
Activations: lg:grid-cols-3 md:grid-cols-2 grid-cols-2
Pricing: lg:grid-cols-3 md:grid-cols-2 grid-cols-1
Logos: lg:grid-cols-6 md:grid-cols-3 grid-cols-2

TIMELINE:
Desktop: Horizontal (grid-cols-6)
Mobile: Vertical stack with left connecting line

WIZARD:
Desktop: flex-row (1/3 + 2/3)
Mobile: flex-col (stacked)

COMMERCE FLOW:
Desktop: Horizontal 4 steps with connectors
Mobile: 2×2 grid OR vertical stack

SOLUTION DIAGRAM:
Desktop: Full node network with SVG paths
Mobile: Simplified vertical stack (hide SVG paths)

Typography scaling:
H1: text-5xl md:text-6xl lg:text-8xl
H2: text-3xl md:text-4xl lg:text-5xl
Body: text-base md:text-lg lg:text-xl

Padding scaling:
Desktop: py-28
Tablet: py-20
Mobile: py-12

Touch targets mobile: min-h-[44px]

Use Tailwind responsive prefixes: sm:, md:, lg:, xl:"
```

### STEP 7: Final Polish & CTAs
```
PROMPT:
"Add final polish and wire up CTAs:

NAVIGATION:
const handleNavigate = (href: string) => {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

BUTTON MAPPING:
Hero 'Start Sponsor Strategy' → /wizard
Hero 'See How It Works' → #how-it-works (smooth scroll)
Wizard 'Try The Demo' → /wizard
All pricing CTAs → /contact (with tier parameter)
Final CTA 'Start Strategy Wizard' → /wizard
Final CTA 'Schedule Demo' → /contact

SMOOTH SCROLL:
html { scroll-behavior: smooth; }

LOADING STATES:
Add skeleton loaders for images
Add loading spinners for form submissions

ACCESSIBILITY:
- Alt text on all images
- ARIA labels on icon-only buttons
- Focus states: focus:ring-2 focus:ring-indigo-500
- Keyboard navigation support
- Screen reader text where needed

PERFORMANCE:
- Lazy load below-fold images
- Optimize animation performance (use transform/opacity only)
- Reduce motion for prefers-reduced-motion users

FINAL CHECKS:
- All sections have proper padding
- Colors match style guide
- Typography consistent
- Animations smooth (60fps)
- Mobile touch targets 44x44px minimum
- No horizontal scroll on mobile"
```

---

## FINAL CHECKLIST

### Design
```
□ Hero background image loads correctly
□ All 11 sections render properly
□ Color palette matches style guide (#FDFDFB, #1A1A1A, etc.)
□ Typography uses correct serif/sans-serif fonts
□ Spacing consistent (py-28, gap-8, etc.)
□ Cards have proper borders, shadows, hover states
□ Diagrams render correctly (SVG paths, nodes)
□ Charts/progress bars display data correctly
□ Images load with proper aspect ratios
□ Icons from lucide-react imported correctly
```

### Animations
```
□ Hero entrance sequence smooth
□ Scroll-triggered animations work (whileInView)
□ Stagger delays feel natural
□ SVG paths draw correctly
□ Timeline line fills properly
□ Progress bars animate from 0 to target %
□ Hover effects smooth (300-700ms)
□ No animation jank or lag
□ Reduced motion respected (prefers-reduced-motion)
```

### Responsive
```
□ Desktop (1440px) layouts correct
□ Tablet (768px) grids adjust properly
□ Mobile (375px) stacks vertically
□ Typography scales appropriately
□ Touch targets 44px minimum
□ No horizontal scroll
□ Images don't overflow
□ Diagrams simplify on mobile
□ CTAs full-width on mobile
□ Padding reduces on smaller screens
```

### Functionality
```
□ All CTAs navigate correctly
□ Smooth scroll to anchors works
□ Form validation (if applicable)
□ Hover states on all interactive elements
□ Focus states visible
□ Loading states for async actions
□ Error states handled
```

### Accessibility
```
□ Alt text on all images
□ ARIA labels on icon buttons
□ Keyboard navigation works
□ Focus visible (ring-2)
□ Color contrast AAA (7:1)
□ Screen reader friendly
□ Semantic HTML (section, nav, button)
```

### Performance
```
□ First Contentful Paint < 1.5s
□ Largest Contentful Paint < 2.5s
□ No layout shift (CLS < 0.1)
□ Images lazy loaded
□ Animations use GPU (transform/opacity)
□ Bundle size reasonable
```

---

**Document Version:** 1.0  
**Lines:** 995  
**Last Updated:** December 22, 2024  
**Status:** Implementation Ready
