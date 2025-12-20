# Electronics Sponsorship Page — Figma Make AI Multi-Step Build Guide

## 📋 Page Sections Overview & Progress Tracker

- [ ] **Section 1:** Page Setup + Design Tokens + Responsive Frames
- [ ] **Section 2:** Hero Layout with Connection Hub
- [ ] **Section 3:** Hero Animation Sequence (6 frames)
- [ ] **Section 4:** How It Works Infographic (4 stages + 9 animation frames)
- [ ] **Section 5:** Sponsor Onboarding Timeline (expandable cards)
- [ ] **Section 6:** Activation Planning (2.5D isometric zones + hover popups)
- [ ] **Section 7:** Benefits Grid with Counter Animation
- [ ] **Section 8:** ROI Dashboard (KPI cards + charts)
- [ ] **Section 9:** Dark Process Flow (animated data packets)
- [ ] **Section 10:** Responsive Rebuild + Final QA

---

## 🎯 Strategy: How to Use These Prompts

**Run them in order**, and after each step:

1. ✅ **Check layer names** — Consistent naming is critical for animation
2. ✅ **Verify Auto Layout** — Ensures responsive behavior
3. ✅ **Test prototype transitions** — Confirm Smart Animate works
4. ✅ **Duplicate for tablet/mobile** — Adapt layout progressively

---

## 🤖 Figma Make AI — Multi-Step Natural Language Prompts

### Prompt 1 — Create page, frames, and global tokens

**Paste into Figma Make AI:**

```
Create a new Figma page named "Electronics Sponsor".
Build a design system section at the top with:

Color styles using these tokens: bg-primary #FAFAFA, bg-secondary #FFFFFF, bg-dark #0A0A0A, text-primary #0A0A0A, text-secondary #525252, text-tertiary #A3A3A3, accent-primary #2563EB, accent-secondary #8B5CF6, accent-success #10B981, accent-warning #F59E0B, border-subtle #E5E5E5.

Typography styles: Display = Founders Grotesk/Inter fallback, Body = Inter, Mono = JetBrains Mono. Create text styles for: Hero 72/56/40, Section H2 48/40/32, Card title 24/20/18, Body 18/16, Caption 12/14.

Spacing scale styles (4/8/12/16/24/32/48/64/96/128).

Now create 3 top-level responsive frames:

Desktop 1440 (width 1440, max content 1240, 12-col grid, 24px gap, 100px margins, vertical scroll ~9000px)

Tablet 1024 (width 1024, 12-col grid, 20px gap, 48px margins)

Mobile 390 (width 390, 4-col grid, 16px gap, 24px margins)

Add a sticky top scroll progress bar component (hidden at top initially) that appears after the hero.
```

**✅ Checkpoint:** Verify color styles, typography styles, and 3 responsive frames with proper grid settings.

---

### Prompt 2 — Build the HERO layout with exact layer structure

**Paste into Figma Make AI:**

```
Inside Desktop 1440, create a hero section frame named "Hero / Electronics" with height 1000px, background gradient #F5F5F5 → #FAFAFA.
Build the hero using this EXACT layer tree and names (must match across animation frames later):

Hero / Electronics
├── BG_Gradient
├── BG_Grid (subtle dot grid, opacity 0.03)
├── MID_Connection_Lines (4 dashed diagonal lines)
├── FG_Central_Hub
│   ├── Circle_Outer (240px stroke)
│   ├── Circle_Inner (200px fill)
│   ├── Logo_Badge ("FashionOS")
│   └── Subtext ("SPONSORSHIP SYSTEM")
├── Module_01_TopLeft
├── Module_02_TopRight
├── Module_03_BottomLeft
├── Module_04_BottomRight
├── Headline
└── Subhead

Content:

Headline: "One System. Full Visibility."

Subhead: "FashionOS connects event activations, commerce, marketing channels, and ROI reporting — in one unified platform."

Central hub styling:

Circle_Outer: 2px stroke #2563EB

Circle_Inner: white fill, subtle shadow, 1px border #E5E5E5

Logo_Badge: Founders Grotesk 24 semibold, #0A0A0A

Subtext: Inter 11 medium, tracking wide, #A3A3A3

Module cards (4): 280×160, white, 1px border #E5E5E5, radius 12, padding 24, subtle shadow.
Each has: Icon 40 line style, Title 18 semibold, Description 14 regular (2 lines max).

Module copy:

Event Activations — "Product placement & experiential moments at fashion events"

Live Commerce — "Direct purchase flows from runway to checkout"

Audience & Leads — "Tech-interested attendees identified & captured"

ROI Analytics — "Product-level attribution & performance forecast"

Create 4 diagonal dashed connector lines from hub to each module (stroke #2563EB opacity 0.2, dash 4/4, round caps).
```

**✅ Checkpoint:** Verify exact layer naming hierarchy, module card styling, and connector lines positioned correctly.

---

### Prompt 3 — HERO animation frames (6 frames) + prototype wiring

**Paste into Figma Make AI:**

```
Duplicate the hero into 6 frames for Smart Animate, keeping layer names IDENTICAL across frames.
Create these frames (exact names):

Hero / 01_Load

Hero / 02_Grid

Hero / 03_Hub

Hero / 04_Lines

Hero / 05_Modules

Hero / 06_Text

Apply states:
01_Load: BG_Grid opacity 0; MID_Connection_Lines opacity 0; FG_Central_Hub opacity 0 scale 0.9; modules opacity 0 scale 0.95 y +12; Headline opacity 0 y +20; Subhead opacity 0 y +16.
02_Grid: BG_Grid opacity 0.03.
03_Hub: FG_Central_Hub opacity 1 scale 1; Circle_Outer uses stroke-draw effect via dashoffset illusion if possible; Logo_Badge + Subtext fade in with slight delays.
04_Lines: draw all 4 lines (dashoffset effect), stagger clockwise 01→02→04→03.
05_Modules: modules animate in (opacity 1, scale 1, y 0) stagger 100ms in same order.
06_Text: Headline + Subhead animate in (opacity 1, y 0).

Prototype: connect 01→02→03→04→05→06 using After Delay triggers with Smart Animate.
Use durations: 600ms, 800ms, 700ms, 500ms, 500ms.
Use custom "tech" ease feel (clean ease-out).

Create module hover variants (Default/Hover): scale 1.02, shadow stronger, border turns #2563EB, corresponding line opacity increases to 0.6, 200ms.
```

**✅ Checkpoint:** Test prototype flow from 01→06, verify Smart Animate works, check hover states on modules.

---

### Prompt 4 — How It Works section (4-stage infographic) + 9-frame sequence

**Paste into Figma Make AI:**

```
Under the hero, create a section frame "Section / How It Works" (height ~1200) with centered header:
Badge "THE SYSTEM" (12 uppercase, tracking wide, #2563EB)
Headline "How Electronics Sponsorship Works" (48 semibold)
Subhead "From product placement to purchase attribution in 4 connected steps" (18 regular #525252)

Build 4 horizontal stage cards (280×480, subtle gradient white→#FAFAFA, border #E5E5E5, radius 16, padding 32, shadow md).
Each card includes: Stage badge, 64px icon, Title 24, Description 16 (4–5 lines), 3 bullet key features, metric preview.
Stages:
01 Discover Opportunities (metric "87% tech audience match")
02 Plan Activations (metric "8 activation zones recommended")
03 Execute & Track (metric "2,400 product scans")
04 Measure ROI (metric "4.2× ROI confirmed")

Add 3 curved dashed arrows between cards with gradient accents (01→02 blue→purple, 02→03 purple→green, 03→04 green→amber).

Create animation frames:
HowItWorks_00_Initial … HowItWorks_08_Stage04 (9 frames total).
Animate: header fade → stage 1 appear → arrow draw → stage 2 appear → arrow draw → stage 3 appear → arrow draw → stage 4 appear.
Use Smart Animate with staggered delays so full sequence completes ~2.5s after section enters view.
Add card hover: lift -6px, border to accent, icon scale 1.05 (200ms).

Create a Mobile version as a vertical stepper with downward arrows (4 frames simplified).
```

**✅ Checkpoint:** Verify 9 animation frames, test sequence timing, check mobile vertical layout.

---

### Prompt 5 — Sponsor onboarding timeline (click-to-expand cards)

**Paste into Figma Make AI:**

```
Create "Section / Onboarding Flow" (height ~900) with gradient background #FAFAFA→#FFFFFF and centered header:
Badge "GET STARTED", Headline "Sponsor Onboarding in 4 Weeks", Subhead "From first conversation to live campaign — here's how we work together".

Build a horizontal timeline: base bar #E5E5E5 (1000×4), progress fill gradient #2563EB→#8B5CF6 (scaleX 0→1).
Add 5 nodes: Week 0..Week 4 (24px circles, white fill, 2px stroke #2563EB; active fill #2563EB).

Under nodes, create 5 cards aligned to each week with Auto Layout and two states: Collapsed (240×100) and Expanded (240×320).
Each expanded state includes: description, deliverables bullets, success metric.
Make interaction: On Click toggles expanded; only one expanded at a time (auto-collapse others).
Animate timeline fill and sequential node activation on section enter (data-viz smooth feel, ~1200ms).

Create Mobile variant: vertical timeline bar on left + stacked cards full width.
```

**✅ Checkpoint:** Test click-to-expand behavior, verify only one card expanded at a time, check mobile vertical timeline.

---

### Prompt 6 — Activation Planning (2.5D isometric zones + hover popups + data packets)

**Paste into Figma Make AI:**

```
Create "Section / Activation Planning" (height ~1100) on white background with header:
Badge "ACTIVATIONS", Headline "Every Placement. Fully Trackable.", Subhead "See how we map tech products to event spaces and track every interaction".

Build a 1000×600 isometric event space illustration (2.5D, 30° angle) with labeled zones: Runway, Backstage Lounge, VIP Seating, Gift Suite, Entrance/Registration, Photo Wall.
Add 8 interactive hotspots (zones) with hover popups (white card, border #E5E5E5, shadow xl, radius 12, padding 20).
Each hotspot hover: border turns #2563EB, lift -4, popup fades in (opacity 0→1, y +8→0), connected lines opacity increases.
Include zone copy + metric for each hotspot (Runway scans, Charging lounge dwell time, VIP conversion, gift suite reach, registration tech-interest, photo wall shares, mobile commerce layer purchases, real-time dashboard ROI).

Add animated "data packets" (12px glowing dots) looping along connector paths toward the Mobile Commerce hotspot (linear loop ~2000ms, stagger 400ms).

Create Mobile variant: replace isometric with accordion list of 8 zones (tap to expand).
```

**✅ Checkpoint:** Test hover popups on all 8 zones, verify data packet animation loops smoothly, check mobile accordion.

---

### Prompt 7 — Benefits grid + counter animation

**Paste into Figma Make AI:**

```
Create "Section / Benefits" (height ~1000) with background gradient #FAFAFA→white and header:
Badge "BENEFITS", Headline "Why Electronics Brands Choose FashionOS", Subhead "Data-proven advantages across 100+ tech sponsor campaigns".

Build a 3×2 grid of benefit cards (380×320, white, 1px border #E5E5E5, radius 16, padding 32).
Each card: gradient icon 48px, metric 56 bold, title 20 semibold, description 16 (3 lines), data source 12 tertiary.
Benefits: 87% audience match, 94% attribution accuracy, 4 weeks launch speed, 92% forecast accuracy, 6.8% conversion, 3.2× cross-sell.

Animate on scroll: cards fade/raise in (y +20→0, opacity 0→1, scale 0.96→1) stagger by row; then animate metric counters 0→value (data-viz smooth, ~1200ms).
Hover: lift -6, border to accent, icon rotate 5° and scale 1.08.
```

**✅ Checkpoint:** Test scroll-triggered animation, verify counter animation from 0 to value, check hover effects.

---

### Prompt 8 — ROI dashboard (KPI cards + bar chart + line chart + tooltips)

**Paste into Figma Make AI:**

```
Create "Section / ROI Dashboard" (height ~1200) with header:
Badge "PERFORMANCE", Headline "Real Sponsor Results", Subhead "Live data from electronics brands using FashionOS".

Layout: Row 1 = 4 KPI cards (280×200). Row 2 = 2 charts side-by-side (590×400). Gap 20px.
KPI cards: subtle gradient, border #E5E5E5, radius 12, padding 24, small icon 32, label 14 uppercase, metric 48 bold, change indicator, comparison text 12.
KPIs: Total Revenue $487K (+127%), Avg ROI 4.2× (+180%), Product Activations 2,847 (+340%), Conversion 6.8% (+467% vs 1.2%).

Chart 1: horizontal bar chart "Revenue by Product Category" with 5 bars and animated fill left→right (scaleX 0→1, stagger 150ms).
Chart 2: line chart "ROI Progression (6 Campaigns)" line draw + points pop after.
Add hover tooltip behavior on points (dark tooltip #0A0A0A with light text) and point scale 1.3 on hover.
Animate sequence on scroll: KPI appear → KPI count → bars fill → line draw + points.
```

**✅ Checkpoint:** Test KPI counter animation, verify bar chart fill animation, check line chart draw + tooltip hover.

---

### Prompt 9 — Dark "Under the hood" process flow (nodes + animated packets)

**Paste into Figma Make AI:**

```
Create "Section / Process Flow" (height ~1000) with dark gradient background #0A0A0A→#1A1A1A.
Add header in white: Badge "UNDER THE HOOD", Headline "How FashionOS Tracks Performance", Subhead "Real-time data flow from event activations to sponsor ROI dashboard".

Build a flowchart with 3 groups: Inputs (4 nodes), Processing (Engine + Attribution), Outputs (Dashboard + Optimization + Next Campaign).
Node style: rounded rect, glass effect (white 0.08 opacity + blur), 2px border, icon 24, label 16, data type 12 #A3A3A3.
Connectors: dashed gradient strokes with animated packet dots traveling along the paths (looping).
Entrance animation: inputs → connectors to engine → engine glow → attribution → connectors to outputs → outputs. Total ~3.5s.
Hover: node scale 1.05, connected paths opacity increase, packets speed up.
Create Mobile variant: vertical stacked flow (no packet animation on mobile for performance).
```

**✅ Checkpoint:** Test entrance animation sequence, verify packet animation loops, check mobile vertical flow.

---

### Prompt 10 — Responsive rebuild rules + final QA pass

**Paste into Figma Make AI:**

```
Now adapt the full page from Desktop into Tablet and Mobile frames:

Tablet: hero becomes hub + 2×2 modules below; reduce parallax to 2 layers; rebuild grids into 2 columns.

Mobile: stacked layout; remove hero connection lines; remove parallax; convert infographic and timeline into vertical steppers; convert isometric activations into accordion list; stack KPI + charts vertically; simplify animations to ~50% duration.

Enforce: minimum 44×44 touch targets, body text min 16px, consistent spacing tokens.
Add a "prefers-reduced-motion" variant frame where all sections are static (no parallax, no looping packets).
Run a final cleanup: consistent layer naming, components for cards and icons, and organized sections with clear headings.

Create a clean responsive footer with 2 columns: "Product" and "Company". Add clickable links with these exact routes:

Home → /

Features → /features

Pricing → /pricing

Electronics Sponsors → /sponsors/electronics

Contact → /contact

Also add a small "© FashionOS" line. Ensure links are real prototype links (not just labels).
```

**✅ Checkpoint:** Verify tablet 2-column layout, mobile stacked layout, reduced-motion variant, footer links working.

---

## 📐 Technical Specifications Summary

### Desktop (1440px)
- **Hero:** 1000px height, connection hub + 4 modules
- **How It Works:** 4 horizontal stage cards with animated arrows
- **Onboarding:** Horizontal timeline with expandable cards
- **Activations:** 1000×600 isometric illustration with 8 hotspots
- **Benefits:** 3×2 grid (380px cards)
- **ROI Dashboard:** 4 KPI cards + 2 charts side-by-side
- **Process Flow:** Horizontal flowchart with animated packets

### Tablet (1024px)
- Hero hub centered, modules 2×2 grid below
- Infographic 2-column layout
- Timeline remains horizontal (compact)
- Activations slightly smaller isometric
- Benefits 2×2 grid (wider cards)
- Dashboard stacks KPIs 2×2, charts below

### Mobile (390px)
- All sections stack vertically
- Hero: hub only, modules listed below
- Infographic: vertical stepper
- Timeline: vertical with left bar
- Activations: accordion list (no isometric)
- Benefits: single column
- Dashboard: single column stack
- Process flow: simplified vertical

---

## 🎨 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#FAFAFA` | Main background |
| `bg-secondary` | `#FFFFFF` | Cards, modules |
| `bg-dark` | `#0A0A0A` | Dark sections |
| `text-primary` | `#0A0A0A` | Headlines, body |
| `text-secondary` | `#525252` | Subheads |
| `text-tertiary` | `#A3A3A3` | Captions, labels |
| `accent-primary` | `#2563EB` | Primary CTA, hub |
| `accent-secondary` | `#8B5CF6` | Purple accent |
| `accent-success` | `#10B981` | Success states |
| `accent-warning` | `#F59E0B` | Warning states |
| `border-subtle` | `#E5E5E5` | Card borders |

---

## 📝 Typography Scale

| Style | Font | Size/Leading | Weight | Use Case |
|-------|------|--------------|--------|----------|
| **Hero** | Founders Grotesk | 72/56/40 | 600 | Hero headlines |
| **H2** | Founders Grotesk | 48/40/32 | 600 | Section headers |
| **Card Title** | Inter | 24/20/18 | 600 | Module/card titles |
| **Body** | Inter | 18/16 | 400 | Body text |
| **Caption** | Inter | 12/14 | 500 | Labels, captions |
| **Mono** | JetBrains Mono | 14 | 400 | Data, metrics |

---

## 🎬 Animation Timing Reference

| Section | Animation Type | Duration | Easing |
|---------|---------------|----------|--------|
| Hero Load | Sequential entrance | 600-800ms | Ease-out |
| Connection Lines | Stroke draw | 700ms | Linear |
| Module Cards | Scale + fade | 500ms | Ease-out |
| Stage Cards | Stagger entrance | 150ms offset | Ease-out |
| Timeline Fill | Progress bar | 1200ms | Data-viz smooth |
| Counter Animation | Number 0→value | 1200ms | Ease-out |
| Bar Chart Fill | Scale X | 150ms stagger | Ease-in-out |
| Line Chart Draw | Path reveal | 800ms | Ease-out |
| Data Packets | Loop movement | 2000ms loop | Linear |
| Hover Effects | Scale + lift | 200ms | Ease-out |

---

## 🔗 Route Configuration

Add these routes to `/App.tsx` and `/utils/assistantRouteMapper.ts`:

```typescript
// App.tsx routing
else if (path === "/sponsors/electronics") setActiveScreen("sponsors/electronics");

// App.tsx render case
case "sponsors/electronics":
  return <ElectronicsSponsorshipPage />;

// Add to isMarketingPage array
"sponsors/electronics"

// assistantRouteMapper.ts
'sponsors/electronics': {
  kitName: KIT_NAMES.MARKETING,
  pageName: 'Electronics & Tech Sponsorship',
  primarySkill: SKILL_NAMES.NAVIGATOR,
  quickActions: [
    'View Activation Zones', 
    'See ROI Dashboard', 
    'Plan Product Placement', 
    'Get Tech Forecast'
  ],
  defaultInsights: [
    'Real-Time Tracking', 
    'Attribution Analytics', 
    'Purchase Conversion Flow'
  ],
}
```

---

## ✅ Final QA Checklist

- [ ] All 10 sections built and responsive
- [ ] Hero animation sequence works (6 frames)
- [ ] How It Works infographic animates (9 frames)
- [ ] Timeline cards expand/collapse on click
- [ ] Activation zone hovers show popups
- [ ] Data packets loop smoothly
- [ ] Counter animations work on scroll
- [ ] Charts animate properly (bars + line)
- [ ] Dark section contrast passes WCAG AA
- [ ] Footer links route correctly
- [ ] Tablet layout tested (2-column grids)
- [ ] Mobile layout tested (vertical stacking)
- [ ] Reduced-motion variant created
- [ ] Touch targets ≥44×44 on mobile
- [ ] Consistent layer naming across frames
- [ ] Components created for reusable elements

---

## 🚀 Implementation Order

**Week 1: Foundation + Hero**
- Day 1: Tokens + frames setup
- Day 2-3: Hero layout + animations
- Day 4: Mobile hero variant
- Day 5: QA + refinement

**Week 2: Core Sections**
- Day 1-2: How It Works infographic
- Day 3: Onboarding timeline
- Day 4-5: Activation planning isometric

**Week 3: Data Sections**
- Day 1-2: Benefits grid
- Day 3-4: ROI Dashboard
- Day 5: Process flow dark section

**Week 4: Polish + Ship**
- Day 1-2: Responsive variants (tablet/mobile)
- Day 3: Reduced-motion variants
- Day 4: Footer + routing
- Day 5: Final QA + handoff

---

## 📚 Related Documentation

- `/docs/website/01-v5-page.md` — V5 sponsorship foundation
- `/docs/website/03-beauty-page.md` — Beauty variant reference
- `/docs/features/01-chatbots.md` — AI Assistant integration
- `/utils/assistantRouteMapper.ts` — Route mapping config

---

**Last Updated:** December 20, 2025  
**Version:** 1.0  
**Status:** Ready for Implementation 🚀
