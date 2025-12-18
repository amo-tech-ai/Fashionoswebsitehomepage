# FashionOS Brand Shoot AI Flow: Prompts & Implementation Plan
**Status:** Ready for Design Generation  
**Target:** Gemini 3 Pro / Claude 3.5 Sonnet  
**Context:** Premium AI-Native SaaS for Fashion Production  

---

## 🏗️ Implementation Progress Tracker

- [ ] **Phase 1: Design Language & Core Flow**
    - [ ] Define "Calm Luxury" Typography & Color System
    - [ ] Create Global Component Library (Cards, Badges, Buttons)
    - [ ] Map User Journey (Mermaid Diagram)
- [ ] **Phase 2: Screen Generation (AI Prompts)**
    - [ ] Screen 1: Plan Your Campaign (Route Selection)
    - [ ] Screen 2: Brand Intake (Minimal Input)
    - [ ] Screen 3: AI Thinking (Analysis State)
    - [ ] Screen 4: **Core** Campaign & Shot Plan Summary
    - [ ] Screen 5: Proposal Confirmation
- [ ] **Phase 3: Dashboard Ecosystem**
    - [ ] Screen 6: Campaign Overview
    - [ ] Screen 7: Media Library (DAM)
    - [ ] Screen 8: Performance Analytics
    - [ ] Screen 9: AI Optimization Center
- [ ] **Phase 4: Responsive & Interaction**
    - [ ] Mobile-Specific Card Behaviors
    - [ ] Tablet/Desktop Grid Adaptations
    - [ ] Micro-interactions & Transitions

---

## 🎨 Global Design Philosophy

**Visual Style:** "Calm Luxury"
*   **Aesthetic:** Editorial clarity, outcome-driven, soft shadows, rounded cards, generous spacing.
*   **Palette:** Calm neutral palette (Off-whites, Charcoals, Deep Blacks), used for hierarchy.
*   **Typography:**
    *   *Headings:* Elegant Display Serif (e.g., Playfair Display, Instrument Serif).
    *   *Body:* Clean Sans-Serif (e.g., Inter, Geist) for utility and data.
*   **Interaction Model:** AI suggests → User approves/adjusts. No auto-commit. No dead ends.

**Responsive Rules:**
*   **Mobile:** Stacked layout, single column.
*   **Tablet:** 2-column grid.
*   **Desktop:** 3-column max, high whitespace.

---

## 🗺️ System Architecture (Mermaid)

### The "AI-Only" User Journey
```mermaid
graph TD
    Start[User Start] --> Screen1[Plan Your Campaign]
    Screen1 -->|AI Path| Screen2[Brand Intake]
    Screen1 -->|Manual| ManualFlow[Legacy Wizard]
    
    Screen2 -->|Submit URLs| Screen3[AI Thinking / Analysis]
    
    subgraph "The Intelligence Engine (Gemini 3 Pro)"
        Screen3 -->|Analyze| Web[Website Structure]
        Screen3 -->|Scrape| Social[Instagram/Social Data]
        Screen3 -->|Parse| Products[Shopify/Amazon Products]
        Screen3 -->|Compare| Bench[Category Benchmarks]
    end
    
    Screen3 --> Screen4[Campaign & Shot Plan Summary]
    
    Screen4 -->|Adjust| Edit[Edit Recommendations]
    Screen4 -->|Approve| Screen5[Proposal Confirmation]
    
    Screen5 -->|Launch| Dashboard[Campaign Dashboard]
    
    Dashboard --> Screen7[Media Library]
    Dashboard --> Screen8[Performance]
    Dashboard --> Screen9[AI Optimization]
```

---

## 🖥️ Screen-by-Screen Design Prompts

### 1️⃣ Screen — Plan Your Campaign
**Route:** `/start`
**Figma Frame:** `Start_Campaign_Selection`

> **FIGMA PROMPT — Plan Your Campaign**
> **ROLE:** Senior Product Designer
> **PURPOSE:** Route users into an AI-powered creative flow vs manual setup.
> **LAYOUT:** Center-aligned, vertically balanced.
>
> **UI COMPONENTS:**
> 1.  **Primary Card (Hero):**
>     *   **Title:** "AI Creative Partner"
>     *   **Badge:** "Recommended" (Pill shape, subtle glow).
>     *   **Description:** "We analyze your brand, products, and channels to generate a sales-focused content plan."
>     *   **CTA:** Large Button "Continue with AI →" (Black, full width on mobile).
> 2.  **Secondary Action:**
>     *   **Text Link:** "Use manual setup" (Subtle, gray, underlined on hover).
>
> **RESPONSIVE:**
> *   *Mobile:* Cards stacked vertically. Full-width buttons.
> *   *Desktop:* Centered floating card with generous whitespace.

### 2️⃣ Screen — Brand Intake (Minimal)
**Route:** `/brand-intake`
**Figma Frame:** `Brand_Intake_Form`

> **FIGMA PROMPT — Create Brand Profile**
> **ROLE:** Senior UX Architect
> **PURPOSE:** Collect only what AI cannot infer.
> **STYLE:** Minimal, form-light, "Concierge" feel.
>
> **UI COMPONENTS:**
> 1.  **Header:** "Create Your Brand Profile" (Serif H1).
> 2.  **Input Group (Stacked):**
>     *   Website URL (Input field with globe icon).
>     *   Instagram Handle (Input field with @ symbol).
>     *   Shopify/Amazon Product URL.
>     *   Keywords (Optional tags).
> 3.  **Primary CTA:** "Analyze My Brand" (Sticky bottom on mobile).
> 4.  **Micro-copy:** "Everything else is inferred by AI" (Reassuring, small text).

### 3️⃣ Screen — AI Thinking / Analysis State
**Route:** `/ai-thinking`
**Figma Frame:** `AI_Analysis_Loader`

> **FIGMA PROMPT — Analyzing Brand DNA**
> **ROLE:** Senior Product Designer
> **PURPOSE:** Build trust during AI reasoning without anxiety.
> **STYLE:** Calm, ethereal motion.
>
> **UI COMPONENTS:**
> 1.  **Central Visualization:** Abstract "Thinking" orb or wave (Gemini/Google colors or Monochrome).
> 2.  **Status Text (Rotating):**
>     *   "Analyzing website structure..."
>     *   "Extracting product imagery..."
>     *   "Studying Instagram performance..."
>     *   "Comparing category benchmarks..."
>     *   "Building campaign logic..."
> 3.  **Badge:** "Powered by Gemini 3 Pro" (Trust indicator).
> 4.  **Transition:** Smooth fade out when complete.

### 4️⃣ 🚨 CORE SCREEN — Campaign & Shot Plan Summary
**Route:** `/campaign-summary`
**Figma Frame:** `Campaign_Summary_Dashboard`

> **FIGMA PROMPT — Your Campaign Plan**
> **ROLE:** Senior Product Designer + AI UX Architect
> **PURPOSE:** The "Brain" of FashionOS. Presents the AI's strategy for approval.
> **LAYOUT:** Scrollable vertical sections. Masonry grid for assets.
>
> **SECTIONS:**
> 1.  **Section A: Strategy Card**
>     *   Campaign Type, Primary Goal (Conversion), Channels (auto-selected).
>     *   **Badge:** "AI Generated Strategy".
> 2.  **Section B: Extracted Brand Assets**
>     *   Grid of images from URL/Insta.
>     *   **Meta:** Source, Suggested Usage, Channel Fit overlay.
> 3.  **Section C: Shot List (The "Meat")**
>     *   *Photography Cards:* Packshots, Lifestyle, Detail. Include: Quantity, Channel, Rationale ("Why this shot?").
>     *   *Video Cards:* Product Demos, TikToks, Amazon Loops. Include: Format, Purpose (Ads/Organic).
> 4.  **Section D: Scenes & Services**
>     *   Styling direction, Props, Studio vs Location.
> 5.  **Section E: Channel Output Matrix**
>     *   Simple table: Channel (Row) x Content Type (Col) = Quantity.
> 6.  **Section F: ROI & Prioritization**
>     *   "Estimated Conversion Uplift", "Content Reuse Score".
>
> **ACTIONS:**
> *   **Primary CTA:** "Approve & Generate Proposal" (Floating or Sticky Bottom).
> *   **Secondary:** "Download PDF", "Adjust Recommendations".

### 5️⃣ Screen — Proposal Confirmation
**Route:** `/proposal`
**Figma Frame:** `Proposal_Ready`

> **FIGMA PROMPT — Proposal Ready**
> **PURPOSE:** Confirm execution readiness.
> **CONTENT:**
> *   Approved campaign summary (Visual recap).
> *   Services included list.
> *   Timeline snapshot.
> *   Estimated Investment (Price).
> **CTA:** "Confirm & Launch Campaign".

### 6️⃣ — 9️⃣ Dashboard Ecosystem (Post-Launch)
**Route:** `/dashboard/*`

> **FIGMA PROMPT — Campaign Dashboard Ecosystem**
> **SCREENS:**
> 1.  **Campaign Overview:** Active campaign status, timeline, shot list progress. AI Panel for "Next Best Action".
> 2.  **Media Library (DAM):** Grid of produced assets. Filters for Channel/Usage. AI suggestions for reuse.
> 3.  **Performance:** Charts for Conversion Uplift, Engagement, ROI. AI recommendations for scaling.
> 4.  **AI Optimization Center:** Cards for "New Video Ideas", "Channel Gaps", "Ad Optimization".

---

## 📱 Mobile-Only Card Behaviors & Responsive Rules

**Mobile Strategy:**
1.  **Stacking:** All horizontal grids convert to vertical stacks with 16px spacing.
2.  **Touch Targets:** All clickable elements minimum 44px height.
3.  **Sticky CTAs:** Primary actions fixed to bottom of viewport with backdrop blur.
4.  **Horizontal Scroll:** Use for "Asset Grids" or "Channel Matrix" to save vertical space.

**Figma Auto-Layout Specs:**
*   **Containers:** `Padding: 24px` (Desktop), `16px` (Mobile).
*   **Gap:** `32px` (Section), `16px` (Card internals).
*   **Corner Radius:** `24px` (Cards), `100px` (Buttons).
*   **Shadow:** `0px 4px 24px rgba(0,0,0,0.04)` (Soft luxury lift).

---

## ✅ Success Criteria & Production Checklist

### Acceptance Tests (The "Definition of Done")
- [ ] **Zero Config Start:** User can reach the "Analysis" state with just ONE input (URL).
- [ ] **Visual Hierarchy:** Strategy (Why) comes before Tactics (What).
- [ ] **Trust Signals:** Every AI decision has a visible "Rationale" or "Confidence Score".
- [ ] **Responsiveness:** Dashboard tables convert to card views on mobile.
- [ ] **Performance:** Analysis state animation plays smoothly (60fps) while data fetches.

### Production Ready Checklist
- [ ] **Routes:** All routes (`/start`, `/brand-intake`, `/campaign-summary`) configured in `App.tsx`.
- [ ] **State Management:** "Wizard State" persists via LocalStorage or URL params (shareable links).
- [ ] **Error Handling:** "Retry Analysis" option if scraping fails.
- [ ] **Empty States:** "No assets found" fallback UI for brand extraction.
- [ ] **Legal:** "Generated by AI - Check before publishing" disclaimer on all creative outputs.
