# Figma Make AI Prompt — Audit Screen with Scoring System

**Role:** Senior Product Designer & UX Architect  
**Project:** FashionOS (Luxury Fashion SaaS Platform)  
**Component:** AI Audit Screen

## Purpose
Design an **Audit Screen** that evaluates a brand across four dimensions and presents **clear, visual scores** with actionable insights.

## Audit Dimensions (Required)
Include **4 scored categories**, each with a numeric score (0–100) and qualitative status:

1. **Website Score**
   - UX quality
   - Performance & speed
   - Visual consistency
   - Conversion readiness

2. **Social Score**
   - Instagram / TikTok presence
   - Posting consistency
   - Engagement quality
   - Brand voice alignment

3. **Brand Score**
   - Visual identity consistency
   - Storytelling clarity
   - Positioning (luxury / mass / niche)
   - Trust & credibility signals

4. **E-commerce Score**
   - Product presentation
   - Checkout flow
   - Mobile readiness
   - Conversion optimization

---

## Layout Structure

### Top Section — Audit Summary
- **Page title:** Brand Audit Overview
- **Subtitle:** *AI-evaluated readiness across key growth areas*
- **Overall Score:** Large circular or ring meter
- **Status badge:**
  - Excellent (80–100)
  - Good (60–79)
  - Needs Improvement (0–59)

### Score Cards Grid (Core)
Create **4 premium score cards** in a 2×2 grid.

**Card Elements:**
- Category name
- Circular or bar score indicator (0–100)
- Status label (color coded)
- 2–3 bullet insights
- “View Details” link or arrow

**Example Card Structure:**
> **Website — 72/100**
> * Status: Good
> * Insights:
>   - Clean layout but slow load time
>   - Weak CTA placement
>   - Mobile UX inconsistent

### Insight Panel (Right or Below)
- AI-generated recommendations per category
- Priority tags: High / Medium / Low
- Icons for clarity (speed, design, conversion, trust)

### Action Section
- **Primary CTA:** Improve Your Profile
- **Secondary CTA:** View Full Audit
- **Micro-copy:** *Personalized recommendations based on your data*

---

## Visual Style
- **Aesthetic:** Luxury SaaS
- **Background:** Soft neutral
- **Cards:** Rounded (12–16px), subtle shadows
- **Typography:** Elegant (Inter / Playfair)
- **Hierarchy:** Clear visual hierarchy
- **Motion:** Progress animation on scores

---

## Data & States
Design for:
- **Loading state:** Skeleton cards
- **Empty state:** No data yet
- **Completed audit state**
- **Improved score comparison:** Before / After

---

## Interaction Notes
- **Hover:** Score expands to show breakdown
- **Click:** Navigates to detailed audit page
- **Load:** Animated score fill

---

## Output Requirements
- Desktop frame (1440px)
- Mobile frame
- Components with auto-layout
- Reusable score card component
- Color-coded status tokens
