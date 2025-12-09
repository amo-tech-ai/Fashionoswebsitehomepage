# FashionOS Style Guide

**Version:** 1.0  
**Last Updated:** December 9, 2025  
**Status:** Production Ready

---

## Introduction

FashionOS is a luxury fashion event management platform that combines sophisticated event planning tools with AI-powered intelligence. Our design system reflects this duality—**premium fashion aesthetics meet intelligent technology**—through carefully crafted visual language, interaction patterns, and content principles.

### Design Philosophy

**Luxury-Tech Aesthetic:**
- Premium, high-end visual design worthy of the fashion industry
- Intelligent, data-driven interfaces that feel effortless
- Soft, approachable elegance (not cold corporate tech)
- Confidence without arrogance

**Core Design Principles:**

1. **Clarity Over Complexity**
   - Every element serves a purpose
   - Information hierarchy is always clear
   - Users never have to guess what to do next

2. **Premium Quality**
   - No element is an afterthought
   - Attention to micro-interactions and details
   - Consistent polish across every screen

3. **AI as Partner, Not Feature**
   - AI insights feel collaborative, not pushy
   - Suggestions enhance workflows naturally
   - Users always remain in control

4. **Scalable Sophistication**
   - System works from mobile to 4K displays
   - Complexity reveals itself progressively
   - Power users and beginners both feel at home

---

## 1. Brand Identity

### Logo & Wordmark

**Primary Logo:**
```
FashionOS
```
- Wordmark only (no icon/symbol)
- Font: **Inter Bold** (custom letterspacing +2%)
- Style: Title case ("FashionOS" not "FASHIONOS")
- Color: Use primary brand color or adapt to context

**Logo Spacing:**
- Minimum clear space: Logo height × 0.5 on all sides
- Never stretch, skew, or rotate logo
- Minimum size: 120px width (digital), 0.75" (print)

**Logo Variants:**

| Variant | Use Case | Color |
|---------|----------|-------|
| **Primary Dark** | Light backgrounds, marketing pages | `#1A1A1A` (Charcoal) |
| **Primary Light** | Dark backgrounds, photography overlays | `#FFFFFF` (White) |
| **Gradient** | Hero sections, premium touchpoints | Linear gradient (see Color System) |
| **Monochrome** | Watermarks, backgrounds | 40% opacity of context color |

**Logo Don'ts:**
- ❌ Don't add drop shadows or effects
- ❌ Don't place on busy photographic backgrounds without overlay
- ❌ Don't use brand colors other than approved variants
- ❌ Don't recreate logo in different fonts
- ❌ Don't use acronym "FOS" standalone

### Brand Voice

**Tone Attributes:**
- **Intelligent** but not condescending
- **Professional** but not stuffy
- **Helpful** but not robotic
- **Confident** but not arrogant
- **Warm** but not casual

**Voice Examples:**

✅ **Good:** "Your event is on track. We've identified 3 small risks you can address today."  
❌ **Bad:** "WARNING: Multiple critical failures detected in your event."

✅ **Good:** "Based on similar events, we predict 1,540 attendees (±120)."  
❌ **Bad:** "Our AI algorithm has calculated attendance projections."

✅ **Good:** "Add 2 sustainable designers to attract eco-conscious sponsors."  
❌ **Bad:** "You should really add more sustainable designers."

### Brand Personality

If FashionOS were a person:
- **Anna Wintour meets Tony Stark**
- Impeccable taste (fashion industry credibility)
- Sharp intelligence (AI-powered insights)
- Efficient and direct (respects user's time)
- Supportive partner (helps you succeed)

---

## 2. Color System

### Primary Colors

**Brand Gradient (Signature)**
```
Linear Gradient: 135deg
From: #F8E8EE (Blush Rose)
To: #E8D5F2 (Lavender Mist)
```
Used for: Hero sections, premium cards, feature highlights

**Primary Dark (Charcoal)**
```
HEX: #1A1A1A
RGB: 26, 26, 26
Use: Primary text, headings, icons
```

**Primary Accent (Rose Gold)**
```
HEX: #D4A5A5
RGB: 212, 165, 165
Use: CTAs, interactive elements, highlights
```

### Secondary Colors (Pastel Palette)

**Soft Pastels for Data Visualization & Accents:**

| Color | HEX | RGB | Use Case |
|-------|-----|-----|----------|
| **Blush** | `#F8E8EE` | 248, 232, 238 | Backgrounds, cards, soft highlights |
| **Lavender** | `#E8D5F2` | 232, 213, 242 | AI panels, suggestions, secondary accents |
| **Mint** | `#D5F2E8` | 213, 242, 232 | Success states, positive metrics |
| **Peach** | `#F2E0D5` | 242, 224, 213 | Warnings (soft), neutral highlights |
| **Sky** | `#D5E8F2` | 213, 232, 242 | Info states, links, metadata |

### Neutrals (Foundation)

**Grayscale for UI Structure:**

| Color | HEX | RGB | Use Case |
|-------|-----|-----|----------|
| **Charcoal** | `#1A1A1A` | 26, 26, 26 | Primary text, headings |
| **Graphite** | `#4A4A4A` | 74, 74, 74 | Secondary text, icons |
| **Silver** | `#9E9E9E` | 158, 158, 158 | Tertiary text, disabled states |
| **Smoke** | `#E5E5E5` | 229, 229, 229 | Borders, dividers |
| **Pearl** | `#F5F5F5` | 245, 245, 245 | Backgrounds, cards |
| **White** | `#FFFFFF` | 255, 255, 255 | Card surfaces, modals |

### Semantic Colors

**Functional Colors with Soft Execution:**

| State | Color Name | HEX | RGB | Use |
|-------|-----------|-----|-----|-----|
| **Success** | Soft Green | `#A8D5BA` | 168, 213, 186 | Completed tasks, confirmations |
| **Warning** | Soft Amber | `#F2D8A8` | 242, 216, 168 | Alerts, pending items |
| **Error** | Soft Coral | `#F2B8A8` | 242, 184, 168 | Errors, overdue tasks, critical alerts |
| **Info** | Soft Blue | `#A8C8F2` | 168, 200, 242 | Tips, information, metadata |

**Alert Levels (for AI Insights & System Alerts):**

| Level | Color | Border | Background | Icon Color |
|-------|-------|--------|------------|------------|
| **High Priority** | `#F2B8A8` | `2px solid` | `#FFF5F3` | `#D97760` |
| **Medium Priority** | `#F2D8A8` | `1px solid` | `#FFF9F0` | `#C9A860` |
| **Low Priority / Info** | `#A8C8F2` | `1px solid` | `#F3F8FF` | `#6B9FD9` |
| **Success / Positive** | `#A8D5BA` | `1px solid` | `#F0FFF5` | `#5FA87E` |

### Color Usage Guidelines

**Text Contrast Rules (WCAG AA Compliance):**
- Primary text (`#1A1A1A`) on White (`#FFFFFF`): ✅ 14.5:1 (AAA)
- Secondary text (`#4A4A4A`) on White: ✅ 9.2:1 (AAA)
- Tertiary text (`#9E9E9E`) on White: ✅ 4.6:1 (AA)
- Rose Gold (`#D4A5A5`) on White: ⚠️ 3.2:1 (use for non-critical elements only)

**Do's:**
- ✅ Use pastels for backgrounds and soft accents
- ✅ Use gradients sparingly for premium moments
- ✅ Pair dark text with light backgrounds (high contrast)
- ✅ Use semantic colors consistently (green = success, coral = error)
- ✅ Use 60-30-10 rule: 60% neutral, 30% primary, 10% accent

**Don'ts:**
- ❌ Don't use neon or highly saturated colors
- ❌ Don't use pure black (`#000000`)—use Charcoal (`#1A1A1A`)
- ❌ Don't use more than 3 colors in one component
- ❌ Don't use gradients on small text or icons
- ❌ Don't use low-contrast color combinations

### Gradients

**Primary Brand Gradient:**
```css
background: linear-gradient(135deg, #F8E8EE 0%, #E8D5F2 100%);
```

**Accent Gradients (Secondary):**

**Rose → Peach:**
```css
background: linear-gradient(135deg, #F8E8EE 0%, #F2E0D5 100%);
```

**Lavender → Sky:**
```css
background: linear-gradient(135deg, #E8D5F2 0%, #D5E8F2 100%);
```

**Gradient Usage:**
- Hero sections and feature cards
- Premium UI elements (VIP badges, highlighted stats)
- Hover states on CTAs (subtle shift)
- Never on body text or small UI elements

---

## 3. Typography

### Font Families

**Primary Font: Inter** (Body Copy, UI Elements)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- Used for: All body text, buttons, forms, navigation, data displays
- Weights available: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- Features: Variable font, excellent legibility, professional

**Display Font: Playfair Display** (Headings, Premium Moments)
```css
font-family: 'Playfair Display', Georgia, serif;
```
- Used for: Page headings (H1-H3), hero text, section titles
- Weights available: 400 (Regular), 600 (SemiBold), 700 (Bold)
- Features: Elegant, editorial, high-fashion aesthetic

**Monospace: JetBrains Mono** (Code, Technical Data)
```css
font-family: 'JetBrains Mono', 'Courier New', monospace;
```
- Used for: API keys, technical IDs, code snippets
- Rare usage in standard UI

### Type Scale (Desktop)

| Element | Font | Size | Weight | Line Height | Letter Spacing | Use Case |
|---------|------|------|--------|-------------|----------------|----------|
| **H1** | Playfair | 48px | Bold (700) | 1.2 (58px) | -0.02em | Page titles, hero headlines |
| **H2** | Playfair | 36px | SemiBold (600) | 1.3 (47px) | -0.01em | Section headings |
| **H3** | Playfair | 28px | SemiBold (600) | 1.4 (39px) | 0 | Subsection headings |
| **H4** | Inter | 20px | SemiBold (600) | 1.5 (30px) | 0 | Card titles, panel headings |
| **H5** | Inter | 18px | SemiBold (600) | 1.5 (27px) | 0 | Small headings, labels |
| **H6** | Inter | 16px | SemiBold (600) | 1.5 (24px) | 0.01em | Uppercase labels (all caps) |
| **Body Large** | Inter | 18px | Regular (400) | 1.6 (29px) | 0 | Intro paragraphs, key descriptions |
| **Body** | Inter | 16px | Regular (400) | 1.6 (26px) | 0 | Standard body text |
| **Body Small** | Inter | 14px | Regular (400) | 1.6 (22px) | 0 | Secondary text, metadata |
| **Caption** | Inter | 12px | Medium (500) | 1.5 (18px) | 0.02em | Timestamps, minor labels, helper text |
| **Overline** | Inter | 11px | SemiBold (600) | 1.5 (16px) | 0.08em | All-caps labels (CATEGORY, STATUS) |

### Type Scale (Mobile/Tablet)

Mobile scales down 20-25% from desktop:

| Element | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| **H1** | 48px | 36px | Reduce for readability |
| **H2** | 36px | 28px | |
| **H3** | 28px | 22px | |
| **H4** | 20px | 18px | |
| **Body** | 16px | 16px | Keep at 16px minimum for accessibility |
| **Body Small** | 14px | 14px | Never below 14px |
| **Caption** | 12px | 12px | Minimum 12px |

### Typography Guidelines

**Hierarchy Best Practices:**
- Use only 1-2 heading levels per screen (avoid H1→H2→H3→H4 cascades)
- Headings should never be alone—pair with supporting text
- Maintain consistent spacing between heading and body text (see Spacing Scale)

**Readability Rules:**
- Max line length: 70-80 characters (approx 600-700px)
- Minimum body text size: 16px (desktop), 16px (mobile)
- Never use all-caps for body text (only for labels/overlines)
- Use sentence case for headings (not title case)

**Do's:**
- ✅ Use Playfair for elegance and impact (H1-H3)
- ✅ Use Inter for clarity and readability (all UI, body text)
- ✅ Maintain 1.5-1.6 line-height for body text
- ✅ Use font weights to create hierarchy (don't only rely on size)
- ✅ Use proper quotation marks (" " not " ")

**Don'ts:**
- ❌ **Never use Tailwind font size classes** (`text-2xl`, `text-lg`, `font-bold`) unless user specifically requests
- ❌ Don't use more than 3 font weights in one view
- ❌ Don't use italic for large blocks of text
- ❌ Don't use letter-spacing on Playfair (except subtle -0.01 to -0.02em)
- ❌ Don't use justified text alignment

### Special Typography Patterns

**Stat Numbers (Large Metrics):**
```css
font-family: Inter;
font-size: 48px;
font-weight: 700 (Bold);
line-height: 1.0;
letter-spacing: -0.03em;
color: #1A1A1A;
```

**Currency & Percentages:**
```css
font-family: Inter;
font-weight: 600 (SemiBold);
color: #1A1A1A;
/* Example: $450,000 or 78% */
```

**Timestamps:**
```css
font-family: Inter;
font-size: 12px;
font-weight: 500 (Medium);
color: #9E9E9E;
letter-spacing: 0.02em;
/* Example: "2 hours ago" */
```

**Tags/Badges Text:**
```css
font-family: Inter;
font-size: 11px;
font-weight: 600 (SemiBold);
text-transform: uppercase;
letter-spacing: 0.08em;
/* Example: "EMERGING TALENT" */
```

---

## 4. Layout & Grid

### Grid System

**12-Column Grid (Desktop):**
- Container max-width: `1800px`
- Gutter: `24px` (1.5rem)
- Margin: `32px` (2rem) min, `64px` (4rem) preferred on large screens
- Column width: Fluid, based on container width

**8-Column Grid (Tablet 768-1024px):**
- Container max-width: `1024px`
- Gutter: `20px` (1.25rem)
- Margin: `24px` (1.5rem)

**4-Column Grid (Mobile <768px):**
- Container max-width: `100%` (full width)
- Gutter: `16px` (1rem)
- Margin: `16px` (1rem)

### Breakpoints

```css
/* Mobile First Approach */
/* xs: 0px (default) */
/* sm: 640px */
@media (min-width: 640px) { }

/* md: 768px */
@media (min-width: 768px) { }

/* lg: 1024px */
@media (min-width: 1024px) { }

/* xl: 1280px */
@media (min-width: 1280px) { }

/* 2xl: 1536px */
@media (min-width: 1536px) { }
```

### Spacing Scale (8px Base)

Use consistent spacing multipliers:

| Token | Value | Pixels | Rem | Use Case |
|-------|-------|--------|-----|----------|
| `xs` | 0.25rem | 4px | 0.25 | Tiny gaps, fine adjustments |
| `sm` | 0.5rem | 8px | 0.5 | Small padding, tight spacing |
| `base` | 1rem | 16px | 1 | Standard spacing between elements |
| `md` | 1.5rem | 24px | 1.5 | Card padding, section spacing |
| `lg` | 2rem | 32px | 2 | Generous padding, component separation |
| `xl` | 3rem | 48px | 3 | Large gaps, hero section padding |
| `2xl` | 4rem | 64px | 4 | Section dividers, hero spacing |
| `3xl` | 6rem | 96px | 6 | Major section breaks |

**Spacing Examples:**
- Card padding: `24px` (md)
- Gap between cards: `16px` (base) or `24px` (md)
- Section top/bottom padding: `64px` (2xl) desktop, `48px` (xl) mobile
- Form field spacing: `16px` (base)
- Button padding: `12px 24px` (0.75rem 1.5rem)

### Common Layouts

#### Dashboard Layout (Sidebar + Main Content)

```
┌────────────────────────────────────────────────┐
│ [Sidebar - 256px fixed]  │  [Main Content]    │
│                           │                    │
│  Logo                     │  [Top Nav Bar]     │
│  Navigation               │                    │
│  - Events                 │  [Page Content]    │
│  - Designers              │  - KPI Cards       │
│  - Sponsors               │  - Data Tables     │
│  - Analytics              │  - Visualizations  │
│                           │                    │
│  [User Menu]              │                    │
└────────────────────────────────────────────────┘
```

**Sidebar:**
- Width: `256px` (fixed on desktop)
- Background: `#FFFFFF` or `#FAFAFA`
- Border-right: `1px solid #E5E5E5`
- Mobile: Drawer (slides in from left)

**Main Content:**
- Width: `calc(100% - 256px)` on desktop
- Padding: `24px` (md) on mobile, `32px` (lg) on desktop
- Max-width: `1800px` (for readability on ultra-wide screens)

#### Two-Column Layout (Detail Page)

```
┌────────────────────────────────────┐
│  [Main Content - 66%]  │ [Sidebar] │
│                        │  - Quick  │
│  Tabs:                 │    Info   │
│  Overview | Details    │  - Actions│
│                        │  - AI     │
│  [Content Area]        │    Panel  │
│                        │           │
└────────────────────────────────────┘
```

**Proportions:**
- Main content: 2/3 width (66%)
- Sidebar: 1/3 width (33%)
- Gap: `32px` (lg)
- Mobile: Stack vertically (sidebar below main)

#### Grid of Cards

```
Desktop (4 columns):
[Card] [Card] [Card] [Card]
[Card] [Card] [Card] [Card]

Tablet (2 columns):
[Card] [Card]
[Card] [Card]

Mobile (1 column):
[Card]
[Card]
```

**Card Grid Settings:**
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: `24px` (md) desktop, `16px` (base) mobile

---

## 5. Components

### Buttons

#### Button Variants

**Primary Button (Main CTAs):**
```css
background: linear-gradient(135deg, #F8E8EE 0%, #E8D5F2 100%);
color: #1A1A1A;
border: none;
border-radius: 12px; /* rounded-xl */
padding: 12px 24px;
font-size: 16px;
font-weight: 600 (SemiBold);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
transition: all 0.2s ease;

hover:
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-1px);

active:
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transform: translateY(0);

disabled:
  background: #E5E5E5;
  color: #9E9E9E;
  cursor: not-allowed;
  box-shadow: none;
```

**Secondary Button (Alternative Actions):**
```css
background: transparent;
color: #1A1A1A;
border: 2px solid #E5E5E5;
border-radius: 12px;
padding: 10px 22px; /* 2px less to account for border */
font-size: 16px;
font-weight: 600;
transition: all 0.2s ease;

hover:
  border-color: #D4A5A5;
  background: #FFF9F9;

active:
  border-color: #C49494;
```

**Ghost Button (Tertiary Actions):**
```css
background: transparent;
color: #4A4A4A;
border: none;
border-radius: 12px;
padding: 12px 24px;
font-size: 16px;
font-weight: 500;
transition: all 0.2s ease;

hover:
  background: #F5F5F5;
  color: #1A1A1A;
```

**Destructive Button (Delete, Cancel):**
```css
background: #F2B8A8;
color: #8B2500;
border: none;
border-radius: 12px;
padding: 12px 24px;
font-size: 16px;
font-weight: 600;
box-shadow: 0 2px 8px rgba(242, 184, 168, 0.3);

hover:
  background: #F0A899;
  box-shadow: 0 4px 12px rgba(242, 184, 168, 0.4);
```

#### Button Sizes

| Size | Padding | Font Size | Height | Use Case |
|------|---------|-----------|--------|----------|
| **Small** | `8px 16px` | `14px` | `32px` | Table actions, compact UIs |
| **Default** | `12px 24px` | `16px` | `44px` | Standard buttons |
| **Large** | `16px 32px` | `18px` | `56px` | Hero CTAs, primary actions |

#### Icon Buttons

```css
width: 44px;
height: 44px;
border-radius: 12px;
display: flex;
align-items: center;
justify-content: center;
background: transparent;

hover:
  background: #F5F5F5;

/* Icon size: 20px x 20px */
```

#### Button Groups

Buttons side-by-side:
```
[Primary Button] [Secondary Button]
      16px gap
```

Buttons in toolbar:
```
[Icon] [Icon] [Icon] | [Button]
  8px gap        16px separator
```

### Form Elements

#### Text Input

```css
width: 100%;
height: 44px;
padding: 12px 16px;
border: 1px solid #E5E5E5;
border-radius: 8px; /* rounded-lg */
font-size: 16px;
font-weight: 400;
color: #1A1A1A;
background: #FFFFFF;
transition: all 0.2s ease;

focus:
  outline: none;
  border-color: #D4A5A5;
  box-shadow: 0 0 0 3px rgba(212, 165, 165, 0.15);

error:
  border-color: #F2B8A8;
  box-shadow: 0 0 0 3px rgba(242, 184, 168, 0.15);

disabled:
  background: #F5F5F5;
  color: #9E9E9E;
  cursor: not-allowed;

::placeholder:
  color: #9E9E9E;
  font-style: italic;
```

#### Select Dropdown

```css
/* Same as text input plus: */
background-image: url('chevron-down-icon.svg');
background-position: right 12px center;
background-repeat: no-repeat;
padding-right: 40px;
appearance: none; /* Hide default arrow */
```

#### Textarea

```css
/* Same as text input plus: */
min-height: 120px;
resize: vertical;
padding: 12px 16px;
line-height: 1.6;
```

#### Checkbox

```css
width: 20px;
height: 20px;
border: 2px solid #E5E5E5;
border-radius: 4px;
background: #FFFFFF;

checked:
  background: linear-gradient(135deg, #F8E8EE 0%, #E8D5F2 100%);
  border-color: #D4A5A5;
  /* Checkmark icon in center */

focus:
  box-shadow: 0 0 0 3px rgba(212, 165, 165, 0.15);
```

#### Radio Button

```css
width: 20px;
height: 20px;
border: 2px solid #E5E5E5;
border-radius: 50%; /* Full circle */

checked:
  border-color: #D4A5A5;
  /* Filled dot in center (8px diameter) */
```

#### Toggle Switch

```css
width: 48px;
height: 24px;
border-radius: 12px;
background: #E5E5E5;
position: relative;

/* Knob: */
width: 20px;
height: 20px;
border-radius: 50%;
background: #FFFFFF;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
transition: transform 0.2s ease;

on:
  background: linear-gradient(135deg, #F8E8EE 0%, #E8D5F2 100%);
  /* Knob slides right */
  transform: translateX(24px);
```

#### Form Labels

```css
font-size: 14px;
font-weight: 600 (SemiBold);
color: #4A4A4A;
margin-bottom: 8px;
display: block;
```

#### Helper Text

```css
font-size: 12px;
font-weight: 400;
color: #9E9E9E;
margin-top: 4px;
```

#### Error Messages

```css
font-size: 12px;
font-weight: 500;
color: #D97760; /* Darker coral for text contrast */
margin-top: 4px;
display: flex;
align-items: center;
gap: 4px;
/* Icon: alert-circle, 14px */
```

### Cards

#### Standard Card

```css
background: #FFFFFF;
border: 1px solid #E5E5E5;
border-radius: 16px; /* rounded-2xl */
padding: 24px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
transition: all 0.2s ease;

hover (if interactive):
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border-color: #D4A5A5;
```

#### Card Header Pattern

```
┌─────────────────────────────────────┐
│ [Icon] Title                   [•••]│ ← Header (flex, space-between)
│ Subtitle / Metadata                 │ ← Optional subtitle
├─────────────────────────────────────┤
│                                     │
│ Card Content                        │
│                                     │
└─────────────────────────────────────┘
```

```css
/* Card Header */
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 16px;

/* Title */
font-size: 18px;
font-weight: 600;
color: #1A1A1A;

/* Icon (if present) */
width: 24px;
height: 24px;
margin-right: 12px;
color: #D4A5A5;

/* Actions (•••) */
color: #9E9E9E;
```

#### KPI Card (Metrics Dashboard)

```
┌────────────────────┐
│ Label              │ ← Small text, uppercase
│ 1,540              │ ← Large number
│ +15% ↑             │ ← Trend indicator
└────────────────────┘
```

```css
background: #FFFFFF;
border-radius: 16px;
padding: 24px;
border: 1px solid #E5E5E5;

/* Label */
font-size: 11px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.08em;
color: #9E9E9E;
margin-bottom: 8px;

/* Value */
font-size: 36px;
font-weight: 700;
color: #1A1A1A;
letter-spacing: -0.02em;
margin-bottom: 4px;

/* Trend */
font-size: 14px;
font-weight: 600;
/* Green (#A8D5BA) if positive, Coral (#F2B8A8) if negative */
display: flex;
align-items: center;
gap: 4px;
/* Icon: arrow-up or arrow-down, 16px */
```

#### AI Insight Card (Signature Pattern)

```
┌─────────────────────────────────────────┐
│ ✨ AI Insight                      [×] │ ← Header with AI icon
│ ─────────────────────────────────────── │
│ Backstage congestion risk detected     │ ← Bold title
│ for Runway A                            │
│                                         │
│ 8 designers sharing 2 dressing rooms   │ ← Description
│ creates 78% likelihood of delays       │
│                                         │
│ Recommendation:                         │
│ • Add 2 temporary dressing areas       │ ← Bulleted suggestions
│ • Stagger designer arrival times       │
│                                         │
│ [Dismiss] [Implement Fix]              │ ← Action buttons
└─────────────────────────────────────────┘
```

```css
background: linear-gradient(135deg, #F3F0FF 0%, #FFF9F9 100%); /* Subtle gradient */
border: 1px solid #E8D5F2;
border-radius: 16px;
padding: 20px 24px;
box-shadow: 0 4px 12px rgba(232, 213, 242, 0.2);

/* Header */
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 12px;

/* AI Icon (✨) */
width: 20px;
height: 20px;
color: #D4A5A5;

/* Title */
font-size: 16px;
font-weight: 600;
color: #1A1A1A;
margin-bottom: 8px;

/* Description */
font-size: 14px;
color: #4A4A4A;
line-height: 1.6;
```

### Modals & Overlays

#### Modal (Dialog)

```css
/* Backdrop */
background: rgba(26, 26, 26, 0.6);
backdrop-filter: blur(4px);

/* Modal Container */
background: #FFFFFF;
border-radius: 16px;
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
max-width: 600px;
width: 90%;
padding: 32px;

/* Modal Header */
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 24px;

/* Title */
font-size: 24px;
font-weight: 600;
color: #1A1A1A;

/* Close Button */
width: 32px;
height: 32px;
border-radius: 8px;
background: transparent;
hover: background: #F5F5F5;
```

#### Drawer (Slide-out Panel)

```css
/* Drawer from Right */
position: fixed;
top: 0;
right: 0;
height: 100vh;
width: 480px;
background: #FFFFFF;
box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
z-index: 50;
transform: translateX(100%);
transition: transform 0.3s ease;

open:
  transform: translateX(0);

/* Drawer Header */
padding: 24px;
border-bottom: 1px solid #E5E5E5;

/* Drawer Content */
padding: 24px;
overflow-y: auto;
```

#### Toast Notification

```css
background: #1A1A1A;
color: #FFFFFF;
border-radius: 12px;
padding: 16px 20px;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
display: flex;
align-items: center;
gap: 12px;
max-width: 400px;

/* Success Toast */
background: #A8D5BA;
color: #1A1A1A;

/* Error Toast */
background: #F2B8A8;
color: #8B2500;

/* Icon */
width: 20px;
height: 20px;

/* Message */
font-size: 14px;
font-weight: 500;
flex: 1;
```

### Navigation

#### Top Navigation Bar

```css
height: 64px;
background: #FFFFFF;
border-bottom: 1px solid #E5E5E5;
padding: 0 24px;
display: flex;
align-items: center;
justify-content: space-between;

/* Left: Page Title or Breadcrumbs */
font-size: 18px;
font-weight: 600;
color: #1A1A1A;

/* Right: Search, Notifications, User Menu */
display: flex;
align-items: center;
gap: 16px;
```

#### Sidebar Navigation

```css
width: 256px;
height: 100vh;
background: #FFFFFF;
border-right: 1px solid #E5E5E5;
padding: 24px 16px;

/* Logo Area */
margin-bottom: 32px;

/* Nav Item */
display: flex;
align-items: center;
gap: 12px;
padding: 10px 16px;
border-radius: 8px;
font-size: 15px;
font-weight: 500;
color: #4A4A4A;
transition: all 0.2s ease;

hover:
  background: #F5F5F5;
  color: #1A1A1A;

active:
  background: linear-gradient(135deg, #F8E8EE 0%, #E8D5F2 100%);
  color: #1A1A1A;
  font-weight: 600;

/* Icon */
width: 20px;
height: 20px;
```

#### Breadcrumbs

```css
display: flex;
align-items: center;
gap: 8px;
font-size: 14px;
color: #9E9E9E;

/* Separator */
content: '/';
color: #E5E5E5;

/* Current Page */
color: #1A1A1A;
font-weight: 500;
```

#### Tabs

```css
/* Tab Container */
display: flex;
border-bottom: 2px solid #E5E5E5;
gap: 32px;

/* Tab Item */
padding: 12px 0;
font-size: 15px;
font-weight: 500;
color: #9E9E9E;
border-bottom: 2px solid transparent;
margin-bottom: -2px;
transition: all 0.2s ease;

hover:
  color: #4A4A4A;

active:
  color: #1A1A1A;
  border-bottom-color: #D4A5A5;
  font-weight: 600;
```

### Tables

#### Table Structure

```css
/* Table Container */
background: #FFFFFF;
border: 1px solid #E5E5E5;
border-radius: 16px;
overflow: hidden;

/* Table Header */
background: #FAFAFA;
border-bottom: 1px solid #E5E5E5;

/* TH */
padding: 16px 24px;
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
color: #9E9E9E;
text-align: left;

/* Table Row */
border-bottom: 1px solid #F5F5F5;

hover:
  background: #FAFAFA;

/* TD */
padding: 16px 24px;
font-size: 14px;
color: #4A4A4A;

/* Last Row */
border-bottom: none;
```

#### Table Variants

**Compact Table:**
- Padding: `12px 16px` (instead of `16px 24px`)
- Font size: `13px` (instead of `14px`)

**Striped Table:**
- Odd rows: `background: #FFFFFF`
- Even rows: `background: #FAFAFA`

**Bordered Table:**
- All cells have `border-right: 1px solid #F5F5F5` (except last column)

### Badges & Tags

#### Badge

```css
display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 12px;
font-size: 11px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;

/* Status Variants: */
/* Success / Active */
background: #E8F5ED;
color: #2D7A4F;

/* Warning / Pending */
background: #FFF4E6;
color: #C9A860;

/* Error / Overdue */
background: #FFE8E5;
color: #D97760;

/* Info / Neutral */
background: #E8F2FF;
color: #6B9FD9;
```

#### Tag (Removable)

```css
/* Same as badge plus: */
padding-right: 6px;
gap: 6px;

/* Remove Button (×) */
width: 16px;
height: 16px;
border-radius: 50%;
background: rgba(0, 0, 0, 0.1);
display: flex;
align-items: center;
justify-content: center;

hover:
  background: rgba(0, 0, 0, 0.2);
```

### Progress Indicators

#### Progress Bar

```css
width: 100%;
height: 8px;
background: #E5E5E5;
border-radius: 4px;
overflow: hidden;

/* Fill */
height: 100%;
background: linear-gradient(90deg, #A8D5BA 0%, #5FA87E 100%);
border-radius: 4px;
transition: width 0.3s ease;

/* Percentage Label (optional) */
font-size: 12px;
font-weight: 600;
color: #4A4A4A;
margin-top: 4px;
```

#### Circular Progress (Loading Spinner)

```css
width: 40px;
height: 40px;
border: 4px solid #E5E5E5;
border-top-color: #D4A5A5;
border-radius: 50%;
animation: spin 0.8s linear infinite;

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### Skeleton Loader

```css
background: linear-gradient(90deg, #F5F5F5 25%, #E5E5E5 50%, #F5F5F5 75%);
background-size: 200% 100%;
animation: loading 1.5s ease-in-out infinite;
border-radius: 4px;

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Skeleton Text Line */
height: 16px;
margin-bottom: 8px;

/* Skeleton Card */
height: 120px;
```

### Dividers

#### Horizontal Rule

```css
border: none;
border-top: 1px solid #E5E5E5;
margin: 24px 0;
```

#### Section Divider (with Text)

```css
display: flex;
align-items: center;
gap: 16px;
margin: 32px 0;

/* Line */
flex: 1;
height: 1px;
background: #E5E5E5;

/* Text */
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.08em;
color: #9E9E9E;
```

---

## 6. UI Patterns

### Empty States

```
┌─────────────────────────────┐
│                             │
│    [Illustration/Icon]      │
│                             │
│    No events yet            │ ← H3 heading
│    Get started by creating  │ ← Body text
│    your first event         │
│                             │
│    [+ Create Event]         │ ← Primary CTA
│                             │
└─────────────────────────────┘
```

```css
/* Container */
padding: 64px 32px;
text-align: center;
background: #FAFAFA;
border-radius: 16px;

/* Illustration */
width: 120px;
height: 120px;
margin: 0 auto 24px;
opacity: 0.6;

/* Heading */
font-size: 20px;
font-weight: 600;
color: #1A1A1A;
margin-bottom: 8px;

/* Description */
font-size: 16px;
color: #9E9E9E;
max-width: 400px;
margin: 0 auto 24px;
```

### Loading States

**Full-Page Loader:**
```
┌─────────────────────────────┐
│                             │
│         [Spinner]           │
│                             │
│    Loading your events...   │
│                             │
└─────────────────────────────┘
```

**Inline Loader (Button):**
```css
/* Button in Loading State */
pointer-events: none;
opacity: 0.7;
position: relative;

/* Spinner inside button */
width: 16px;
height: 16px;
margin-right: 8px;
```

**Skeleton Screens:**
- Use skeleton loaders for cards, tables, text
- Maintain layout structure
- Fade in real content when loaded

### Error States

```
┌─────────────────────────────────────┐
│  ⚠️ Something went wrong            │ ← Alert box
│  We couldn't load your events.      │
│  Please try again.                  │
│                                     │
│  [Try Again]                        │ ← Retry CTA
└─────────────────────────────────────┘
```

```css
background: #FFE8E5;
border: 1px solid #F2B8A8;
border-radius: 12px;
padding: 16px 20px;
display: flex;
align-items: flex-start;
gap: 12px;

/* Icon */
width: 20px;
height: 20px;
color: #D97760;
flex-shrink: 0;

/* Message */
font-size: 14px;
color: #8B2500;
```

### Search Pattern

```
┌───────────────────────────────────┐
│  🔍 Search events...              │
│                                   │
│  [Results Dropdown]               │
│  - Paris Fashion Week             │
│  - Milan Showcase                 │
│  - London Pop-Up                  │
└───────────────────────────────────┘
```

```css
/* Search Input */
width: 100%;
max-width: 400px;
padding-left: 40px; /* Space for search icon */
background-image: url('search-icon.svg');
background-position: 12px center;
background-repeat: no-repeat;

/* Results Dropdown */
position: absolute;
top: 100%;
left: 0;
right: 0;
margin-top: 4px;
background: #FFFFFF;
border: 1px solid #E5E5E5;
border-radius: 12px;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
max-height: 400px;
overflow-y: auto;

/* Result Item */
padding: 12px 16px;
font-size: 14px;
color: #4A4A4A;

hover:
  background: #F5F5F5;
  color: #1A1A1A;
```

### Filter & Sort Pattern

```
┌─────────────────────────────────────────────┐
│  [Filter] [Sort] [Search]         [+ New]  │
│                                             │
│  Filters Active:                            │
│  [Status: Active ×] [Date: This Month ×]   │
└─────────────────────────────────────────────┘
```

```css
/* Filter Bar */
display: flex;
justify-content: space-between;
align-items: center;
padding: 16px 24px;
background: #FAFAFA;
border-radius: 12px 12px 0 0;
border-bottom: 1px solid #E5E5E5;

/* Active Filters */
display: flex;
gap: 8px;
flex-wrap: wrap;
margin-top: 12px;

/* Filter Tag */
/* Use Tag component (see Badges & Tags) */
```

### Pagination

```
[← Previous]  1  2  [3]  4  5  [Next →]
```

```css
/* Container */
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
margin-top: 24px;

/* Page Number */
width: 36px;
height: 36px;
border-radius: 8px;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 500;
color: #4A4A4A;
background: transparent;

hover:
  background: #F5F5F5;

active:
  background: linear-gradient(135deg, #F8E8EE 0%, #E8D5F2 100%);
  color: #1A1A1A;
  font-weight: 600;

/* Previous/Next Buttons */
padding: 8px 16px;
border-radius: 8px;
font-weight: 500;
```

### Kanban Board Pattern

```
┌──────────┬──────────┬──────────┬──────────┐
│  To Do   │In Progress│ Review  │  Done    │
│   [23]   │   [14]   │   [5]   │   [89]   │
├──────────┼──────────┼──────────┼──────────┤
│ [Card]   │ [Card]   │ [Card]  │ [Card]   │
│ [Card]   │ [Card]   │         │ [Card]   │
│ [Card]   │          │         │ [Card]   │
└──────────┴──────────┴──────────┴──────────┘
```

```css
/* Board Container */
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 16px;
overflow-x: auto;

/* Column */
background: #FAFAFA;
border-radius: 12px;
padding: 16px;
min-width: 280px;

/* Column Header */
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 16px;
font-size: 14px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
color: #4A4A4A;

/* Count Badge */
background: #E5E5E5;
color: #4A4A4A;
padding: 2px 8px;
border-radius: 12px;
font-size: 12px;

/* Cards in Column */
display: flex;
flex-direction: column;
gap: 12px;
```

### Wizard/Stepper Pattern

```
Step 1 of 7: Event Basics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[●] Event Basics → [ ] Date & Location → [ ] Budget

[Form Fields]

[Cancel]                    [Next: Date & Location →]
```

```css
/* Progress Bar */
width: 100%;
height: 4px;
background: #E5E5E5;
border-radius: 2px;
margin-bottom: 24px;

/* Filled Portion */
height: 100%;
background: linear-gradient(90deg, #F8E8EE 0%, #E8D5F2 100%);
transition: width 0.3s ease;

/* Step Indicator */
display: flex;
align-items: center;
gap: 12px;
margin-bottom: 32px;

/* Step Bubble */
width: 32px;
height: 32px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 600;

/* Active Step */
background: linear-gradient(135deg, #F8E8EE 0%, #E8D5F2 100%);
color: #1A1A1A;

/* Completed Step */
background: #A8D5BA;
color: #FFFFFF;

/* Upcoming Step */
background: #E5E5E5;
color: #9E9E9E;

/* Step Label */
font-size: 12px;
color: #9E9E9E;

active:
  color: #1A1A1A;
  font-weight: 500;
```

---

## 7. AI Design System

### AI UI Principles

1. **AI is Helpful, Not Intrusive**
   - Suggestions appear contextually, not randomly
   - Users can dismiss or ignore AI features
   - AI learns from user preferences over time

2. **Transparency**
   - Always show why AI made a recommendation
   - Display confidence levels when applicable
   - Explain data sources ("Based on 50 past events...")

3. **Actionable**
   - Every AI insight includes clear next steps
   - Users can implement suggestions with 1 click
   - Show impact of taking (or not taking) action

4. **Visual Distinction**
   - AI elements have signature styling (gradients, sparkle icon)
   - Clear differentiation from manual data entry
   - Consistent AI brand across all features

### AI Components

#### AI Summary Panel (Signature Component)

```
┌─────────────────────────────────────────┐
│ ✨ AI Insights                          │
│ ─────────────────────────────────────── │
│                                         │
│ 🟢 Event is on track                   │
│ 78% progress, 12% ahead of schedule    │
│                                         │
│ ⚠️ 3 Risks Detected                    │
│ • Backstage congestion (High)          │
│ • Budget variance in Production (Med)  │
│ • Lighting test overdue (High)         │
│                                         │
│ 💡 Recommendations                     │
│ • Add 2 sustainable designers          │
│   to attract eco-sponsors              │
│ • Increase Instagram budget by $5K     │
│   for 15% more reach                   │
│                                         │
│ [View All Insights]                    │
└─────────────────────────────────────────┘
```

```css
/* AI Panel Container */
background: linear-gradient(135deg, #F9F5FF 0%, #FFF9F9 100%);
border: 1px solid #E8D5F2;
border-radius: 16px;
padding: 20px;
box-shadow: 0 4px 12px rgba(232, 213, 242, 0.15);

/* Panel Header */
display: flex;
align-items: center;
gap: 8px;
margin-bottom: 16px;
font-size: 16px;
font-weight: 600;
color: #1A1A1A;

/* AI Icon (✨ Sparkles) */
width: 20px;
height: 20px;
color: #D4A5A5;

/* Section Divider */
height: 1px;
background: #E8D5F2;
margin: 16px 0;

/* AI Item */
display: flex;
align-items: flex-start;
gap: 8px;
margin-bottom: 12px;

/* Status Icon */
width: 16px;
height: 16px;
flex-shrink: 0;

/* Item Text */
font-size: 14px;
color: #4A4A4A;
line-height: 1.5;
```

#### AI Alert Badge

```
┌──────────────────────────┐
│ ⚡️ AI Detected | High    │
└──────────────────────────┘
```

```css
display: inline-flex;
align-items: center;
gap: 6px;
padding: 4px 10px;
background: linear-gradient(135deg, #F8E8EE 0%, #E8D5F2 100%);
border-radius: 12px;
font-size: 11px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
color: #1A1A1A;

/* Icon (⚡️ or ✨) */
width: 14px;
height: 14px;
```

#### AI Suggestion Card (Inline)

```
┌─────────────────────────────────────────┐
│ 💡 AI Suggestion                        │
│                                         │
│ Add Aurelia Noir (sustainable designer)│
│ to attract eco-conscious sponsors.     │
│                                         │
│ Compatibility: 94/100                   │
│ Est. sponsor value: +$75K              │
│                                         │
│ [Add Designer] [Dismiss]               │
└─────────────────────────────────────────┘
```

```css
background: #FFF9F9;
border-left: 4px solid #D4A5A5;
border-radius: 8px;
padding: 16px;
margin: 16px 0;

/* Suggestion Title */
display: flex;
align-items: center;
gap: 8px;
font-size: 14px;
font-weight: 600;
color: #1A1A1A;
margin-bottom: 8px;

/* Suggestion Body */
font-size: 14px;
color: #4A4A4A;
margin-bottom: 12px;

/* Metrics (small text) */
font-size: 12px;
color: #9E9E9E;
margin-bottom: 12px;

/* Action Buttons */
display: flex;
gap: 8px;
```

#### AI Loading State

```
┌─────────────────────────────────────┐
│  ✨ AI is analyzing your event...  │
│  [Progress Bar Animation]          │
└─────────────────────────────────────┘
```

```css
background: linear-gradient(135deg, #F9F5FF 0%, #FFF9F9 100%);
border: 1px solid #E8D5F2;
border-radius: 12px;
padding: 20px;
text-align: center;

/* Loading Text */
font-size: 14px;
font-weight: 500;
color: #9E9E9E;
margin-bottom: 12px;

/* Loading Animation */
/* Use skeleton loader or animated gradient bar */
```

#### AI Confidence Indicator

```
Predicted Attendance: 1,540
Confidence: ████████░░ 85%
```

```css
/* Confidence Bar */
display: flex;
align-items: center;
gap: 8px;
font-size: 12px;
color: #9E9E9E;

/* Bar Container */
width: 100px;
height: 6px;
background: #E5E5E5;
border-radius: 3px;
overflow: hidden;

/* Fill */
height: 100%;
background: linear-gradient(90deg, #A8D5BA 0%, #5FA87E 100%);
transition: width 0.3s ease;

/* Percentage */
font-weight: 600;
color: #4A4A4A;
```

#### AI "Why This Suggestion" Tooltip

```
Hover over AI suggestion:

┌──────────────────────────────────┐
│ Why this suggestion?             │
│ ────────────────────────────────│
│ Based on analysis of 50 similar │
│ events, adding sustainable      │
│ designers increased sponsor     │
│ interest by avg. 42%.           │
│                                  │
│ Your event targets eco-conscious│
│ audience (78% match).           │
└──────────────────────────────────┘
```

```css
background: #1A1A1A;
color: #FFFFFF;
border-radius: 8px;
padding: 12px 16px;
max-width: 280px;
font-size: 13px;
line-height: 1.5;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

/* Arrow pointing to element */
/* Use CSS triangle or SVG */
```

### AI Interaction Patterns

**Progressive Disclosure:**
- Start with summary insight
- Click "Learn More" to see detailed analysis
- Expand to show data sources and methodology

**Opt-In by Default:**
- AI features enabled but not mandatory
- Users can disable AI suggestions per feature
- Preferences saved per user

**Feedback Loop:**
- "Was this helpful?" buttons on AI suggestions
- Track which suggestions users implement
- Use feedback to improve recommendations

**Contextual Triggers:**
- AI insights appear when relevant (not all at once)
- Example: Budget variance alert only when 10%+ over
- Risk alerts only when probability >60%

---

## 8. Content & Writing Guidelines

### Voice & Tone

**Voice (Consistent Personality):**
- Professional yet approachable
- Intelligent without jargon
- Confident but not arrogant
- Supportive, never condescending

**Tone (Adapts to Context):**
- **Success messages:** Celebratory, encouraging
- **Error messages:** Apologetic, helpful
- **AI insights:** Analytical, actionable
- **Empty states:** Friendly, motivating
- **Forms:** Clear, instructional

### Content Principles

1. **Clarity First**
   - Use simple, direct language
   - Avoid marketing speak and buzzwords
   - Say it in as few words as possible

2. **Active Voice**
   - ✅ "Create your first event"
   - ❌ "Your first event can be created"

3. **User-Centered**
   - Focus on user benefits, not features
   - ✅ "Find the perfect designer in minutes"
   - ❌ "Our AI-powered algorithm searches designers"

4. **Conversational**
   - Write like you're talking to a colleague
   - Use contractions (you're, we'll, don't)
   - Ask questions to engage

### Headline Formulas

**Page Titles (H1):**
- Format: `[Action] + [Object]`
- Examples:
  - "Manage Events"
  - "Create New Event"
  - "Designer Directory"
  - "ROI & Analytics"

**Section Headings (H2-H3):**
- Format: `[Descriptive Noun Phrase]`
- Examples:
  - "Upcoming Events"
  - "Recent Activity"
  - "AI Recommendations"
  - "Budget Overview"

**Feature Descriptions:**
- Format: `[Benefit] + [How It Works]`
- Example: "Find perfect designer matches using AI-powered compatibility scoring"

### UI Copy Patterns

#### Button Labels

**Primary Actions (Do This):**
- "Create Event"
- "Send Invitation"
- "Approve"
- "Publish"
- "Save Changes"

**Secondary Actions (Alternative):**
- "Cancel"
- "Go Back"
- "Skip for Now"
- "Learn More"

**Destructive Actions (Warning):**
- "Delete Event"
- "Remove Designer"
- "Cancel Contract"

**Always:**
- Use action verbs
- Be specific (not just "Submit" or "OK")
- Explain what happens next

#### Form Labels

✅ **Good:**
- "Event name"
- "Target attendees"
- "Budget (USD)"
- "Select date and time"

❌ **Bad:**
- "Name" (too vague)
- "Attendees number" (awkward)
- "Budget $" (confusing)
- "Date/Time" (unclear format)

**Guidelines:**
- Use sentence case (not Title Case)
- Keep labels short (1-3 words)
- Include units or format hints in parentheses
- Use placeholders to show examples

#### Placeholder Text

```
Event Name: e.g., "Paris Fashion Week - Emerging Designers"
Budget: e.g., "500000"
Email: e.g., "name@company.com"
Search: "Search events, designers, sponsors..."
```

**Guidelines:**
- Prefix with "e.g.," for examples
- Use realistic examples from fashion industry
- Show format expectations
- Keep it brief

#### Helper Text

```
Event Name
[Input Field]
Choose a memorable name that describes your event's theme or purpose.
```

**Guidelines:**
- Explain *why* or *how* to fill the field
- Keep to 1-2 sentences max
- Use neutral gray color (#9E9E9E)
- Place below input field

#### Error Messages

✅ **Good:**
- "Event name is required"
- "Budget must be a positive number"
- "Please select a date in the future"
- "This email is already registered"

❌ **Bad:**
- "Error"
- "Invalid input"
- "Field cannot be empty"
- "Something went wrong"

**Guidelines:**
- Be specific about what's wrong
- Suggest how to fix it
- Use plain language (no error codes)
- Never blame the user

#### Success Messages

✅ **Good:**
- "Event created successfully!"
- "Designer invitation sent"
- "Changes saved"
- "Contract uploaded and ready for review"

**Guidelines:**
- Confirm what just happened
- Keep it brief and positive
- Use present tense
- Include checkmark icon ✓

#### Empty States

```
No events yet
You haven't created any events. Get started by creating your first fashion show or brand activation.

[+ Create Event]
```

**Guidelines:**
- Acknowledge the empty state
- Explain why it's empty
- Provide clear next action
- Keep tone encouraging, not negative

#### Loading States

✅ **Good:**
- "Loading your events..."
- "Generating AI insights..."
- "Uploading images (3 of 10)..."
- "Analyzing compatibility..."

**Guidelines:**
- Tell users what's happening
- Show progress when possible
- Use present continuous tense (-ing)
- Never just say "Loading..."

### Microcopy Examples

**Navigation:**
- "Events" (not "Event Management")
- "Designers" (not "Designer Directory")
- "Analytics" (not "Reports & Analytics")

**Tabs:**
- "Overview"
- "Details"
- "Contracts"
- "ROI"

**Status Labels:**
- "Active" / "Inactive"
- "Confirmed" / "Pending"
- "On Track" / "At Risk"
- "Completed" / "In Progress"

**Action Confirmations:**
```
Delete this event?
This action cannot be undone. All data associated with "Paris Fashion Week" will be permanently deleted.

[Cancel] [Delete Event]
```

**Tooltips:**
- "Mark as complete"
- "Add to favorites"
- "Download as PDF"
- "Share with team"

### AI-Specific Content

**AI Insight Headlines:**
- "AI Insight: Backstage congestion risk"
- "Recommendation: Add sustainable designers"
- "Prediction: 1,540 attendees expected"

**AI Confidence Levels:**
- "High confidence (85%+)"
- "Medium confidence (60-84%)"
- "Low confidence (<60%)"

**AI Source Attribution:**
- "Based on 50 similar events"
- "Analyzed from historical data"
- "Using industry benchmarks"

**AI Disclaimers:**
- "AI predictions are estimates based on historical data and may vary."
- "Review AI suggestions before implementing."

---

## 9. Iconography & Imagery

### Icon System

**Icon Library:** Lucide React
```bash
import { Calendar, Users, MapPin, Sparkles } from 'lucide-react'
```

**Icon Sizes:**
- Small: `16px` (inline with text, compact UIs)
- Default: `20px` (buttons, nav items, most UI elements)
- Medium: `24px` (card headers, section icons)
- Large: `32px` (empty states, feature highlights)
- XLarge: `48px` (hero sections, major features)

**Icon Colors:**
- Primary: `#1A1A1A` (default state)
- Secondary: `#9E9E9E` (inactive/disabled)
- Accent: `#D4A5A5` (interactive, highlighted)
- Success: `#5FA87E`
- Warning: `#C9A860`
- Error: `#D97760`
- Info: `#6B9FD9`

**Common Icons:**

| Icon | Name | Use Case |
|------|------|----------|
| ✨ | Sparkles | AI features, suggestions |
| 📅 | Calendar | Events, dates, scheduling |
| 👥 | Users | Attendees, team, casting |
| 📍 | MapPin | Venues, locations |
| 💼 | Briefcase | Sponsors, partners |
| 🎨 | Palette | Designers, creative |
| 📊 | BarChart | Analytics, metrics, ROI |
| ✓ | CheckCircle | Success, completed, approved |
| ⚠️ | AlertTriangle | Warnings, risks, alerts |
| ⚙️ | Settings | Configuration, preferences |
| 🔍 | Search | Search functionality |
| + | Plus | Add new, create |
| × | X | Close, remove, delete |
| → | ArrowRight | Navigation, next step |
| ← | ArrowLeft | Back, previous |
| ⋮ | MoreVertical | Menu, more options |

**Icon Usage Guidelines:**
- Always pair icons with text labels (don't rely on icons alone)
- Use consistent icon size within same context
- Maintain minimum 44px touch target on mobile
- Use filled icons for active states, outlined for inactive
- Never rotate or skew icons

### Photography Direction

**Event Photography:**
- High-quality, professional fashion event images
- Focus on runway moments, backstage energy, VIP interactions
- Lighting: Well-lit, sharp focus, editorial quality
- Composition: Dynamic angles, capturing movement and emotion
- Color treatment: Slightly desaturated, premium feel

**Designer Portraits:**
- Professional headshots or creative portraits
- Black and white or muted color
- Clean backgrounds (studio or minimal location)
- Focus on designer's personality and aesthetic

**Product/Collection Images:**
- High-resolution lookbook quality
- Clean, editorial styling
- White background or contextual lifestyle shots
- Consistent lighting across collection

**Hero Images:**
- Cinematic, wide aspect ratio (16:9 or 21:9)
- Fashion-forward, aspirational
- High contrast, dramatic lighting acceptable
- Overlay gradient (135deg, rgba(0,0,0,0.3) to transparent) for text readability

**Do's:**
- ✅ Use professional, high-resolution images (min 1920px wide for hero)
- ✅ Compress for web (use WebP format where supported)
- ✅ Include alt text for accessibility
- ✅ Use consistent aspect ratios within same context

**Don'ts:**
- ❌ Don't use stock photos with watermarks
- ❌ Don't use overly trendy filters (no heavy vintage, neon)
- ❌ Don't use pixelated or low-quality images
- ❌ Don't mix photography styles (e.g., iPhone snapshots with editorial shots)

### Illustration Style

**When to Use Illustrations:**
- Empty states
- Onboarding flows
- Error pages (404, 500)
- Feature highlights (marketing pages)

**Style Guidelines:**
- Flat, modern vector style
- Use brand color palette (pastels, rose gold accents)
- Minimal detail, clean lines
- Consistent stroke width (2-3px)
- Subtle shadows for depth
- No gradients on illustrations (solid colors only)

**Illustration Library:**
- Use Undraw, Humaaans, or custom illustrations
- Customize colors to match brand palette
- Maximum 2-3 colors per illustration
- SVG format for scalability

**Example Scenarios:**
- Empty event list: Illustration of calendar with sparkles
- No designers found: Illustration of search with magnifying glass
- Error 404: Illustration of confused person looking at map
- Welcome onboarding: Illustration of fashion show stage

---

## 10. Responsive Design

### Mobile-First Approach

Design for mobile first, enhance for desktop.

**Mobile (320px - 767px):**
- Single column layouts
- Stacked cards
- Collapsible navigation (hamburger menu)
- Full-width buttons
- Larger touch targets (min 44px)
- Reduced padding/margins

**Tablet (768px - 1023px):**
- Two-column layouts where appropriate
- Sidebar becomes drawer (slide-in)
- Grid cards (2 columns)
- Hybrid navigation (some visible, some in menu)

**Desktop (1024px+):**
- Multi-column layouts
- Persistent sidebar navigation
- Grid cards (3-4 columns)
- Hover states active
- More generous spacing

### Touch Targets

**Minimum Sizes:**
- Buttons: `44px × 44px`
- Icon buttons: `44px × 44px`
- Form inputs: `44px` height
- Links: `44px` height (with padding)
- Checkboxes/Radio: `20px × 20px` (but 44px touch area)

**Spacing Between Targets:**
- Minimum `8px` between interactive elements
- Recommended `12px` for comfortable tapping

### Mobile Navigation

**Hamburger Menu:**
```
┌─────────────────────────┐
│ [☰] FashionOS     [👤] │ ← Top bar
├─────────────────────────┤
│                         │
│ [Main Content]          │
│                         │
└─────────────────────────┘

Menu Open:
┌─────────────────────────┐
│ [×] FashionOS           │
│ ─────────────────────── │
│ 📅 Events               │
│ 🎨 Designers            │
│ 💼 Sponsors             │
│ 📍 Venues               │
│ 📊 Analytics            │
│ ─────────────────────── │
│ ⚙️ Settings             │
│ 🚪 Logout               │
└─────────────────────────┘
```

### Breakpoint-Specific Patterns

**KPI Cards:**
- Desktop: 4-column grid
- Tablet: 2-column grid
- Mobile: 1-column stack

**Data Tables:**
- Desktop: Full table
- Tablet: Horizontal scroll with sticky first column
- Mobile: Card-based layout (stack rows as cards)

**Modals:**
- Desktop: Centered, max-width 600px
- Tablet: Centered, 90% width
- Mobile: Full-screen drawer from bottom

---

## 11. Accessibility

### WCAG AA Compliance

**Color Contrast:**
- Text: Minimum 4.5:1 contrast ratio (7:1 for AAA)
- Large text (18px+): Minimum 3:1
- UI components: Minimum 3:1

**Focus Indicators:**
```css
:focus {
  outline: 2px solid #D4A5A5;
  outline-offset: 2px;
}

/* Or custom focus ring: */
:focus-visible {
  box-shadow: 0 0 0 3px rgba(212, 165, 165, 0.3);
}
```

**Keyboard Navigation:**
- All interactive elements reachable via Tab
- Logical tab order
- Skip to main content link
- Modal focus trap
- Escape key closes modals/drawers

**Screen Reader Support:**
- Semantic HTML (use `<button>`, `<nav>`, `<main>`, etc.)
- ARIA labels where needed
- Alt text on all images
- Form labels associated with inputs
- Status messages announced (use `role="status"`)

**Animation Preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Best Practices

- Minimum font size: 16px (never below 14px)
- Clickable area: Minimum 44px × 44px
- Don't rely on color alone to convey information
- Provide text alternatives for icons
- Test with keyboard only
- Test with screen reader (NVDA, JAWS, VoiceOver)

---

## 12. Dark Mode (Optional)

### Color Tokens (Dark Mode)

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| **Background** | `#FFFFFF` | `#1A1A1A` |
| **Surface** | `#F5F5F5` | `#2A2A2A` |
| **Border** | `#E5E5E5` | `#3A3A3A` |
| **Text Primary** | `#1A1A1A` | `#E5E5E5` |
| **Text Secondary** | `#4A4A4A` | `#9E9E9E` |
| **Text Tertiary** | `#9E9E9E` | `#6A6A6A` |
| **Accent** | `#D4A5A5` | `#E8B8B8` |

**Shadow in Dark Mode:**
```css
/* Light Mode */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

/* Dark Mode */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
```

**Images in Dark Mode:**
- Use `filter: brightness(0.9)` on photos for better integration
- Logos: Provide white variant for dark backgrounds

---

## 13. Animation & Transitions

### Timing Functions

```css
/* Standard ease */
transition: all 0.2s ease;

/* Smooth cubic-bezier */
transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);

/* Bounce (for celebrations) */
animation: bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Common Transitions

**Hover States:**
```css
transition: all 0.2s ease;
/* Transform, box-shadow, background, border-color */
```

**Modal/Drawer Entry:**
```css
/* Fade + slide */
transition: opacity 0.3s ease, transform 0.3s ease;
```

**Loading Spinners:**
```css
animation: spin 0.8s linear infinite;
```

**Success Checkmark:**
```css
animation: scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animation Guidelines

**Do's:**
- ✅ Use animations to provide feedback (button click, success state)
- ✅ Keep animations subtle and fast (200-400ms)
- ✅ Respect `prefers-reduced-motion`
- ✅ Animate transform and opacity (GPU accelerated)

**Don'ts:**
- ❌ Don't animate layout properties (width, height, top, left)
- ❌ Don't use animations longer than 600ms (feels slow)
- ❌ Don't animate everything (animation fatigue)
- ❌ Don't use animations on page load (feels janky)

---

## 14. Code Examples

### Button Component (React + Tailwind)

```tsx
import { motion } from 'motion/react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'small' | 'default' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'default', 
  children, 
  onClick, 
  disabled 
}: ButtonProps) {
  const baseClasses = "rounded-xl font-semibold transition-all duration-200";
  
  const variantClasses = {
    primary: "bg-gradient-to-br from-[#F8E8EE] to-[#E8D5F2] text-[#1A1A1A] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:shadow-sm active:translate-y-0",
    secondary: "bg-transparent border-2 border-[#E5E5E5] text-[#1A1A1A] hover:border-[#D4A5A5] hover:bg-[#FFF9F9]",
    ghost: "bg-transparent text-[#4A4A4A] hover:bg-[#F5F5F5] hover:text-[#1A1A1A]",
    destructive: "bg-[#F2B8A8] text-[#8B2500] shadow-sm hover:shadow-md"
  };
  
  const sizeClasses = {
    small: "px-4 py-2 text-sm h-8",
    default: "px-6 py-3 text-base h-11",
    large: "px-8 py-4 text-lg h-14"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
```

### Card Component

```tsx
interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  onClick?: () => void;
}

export function Card({ children, hoverable, onClick }: CardProps) {
  const hoverClasses = hoverable 
    ? "hover:shadow-md hover:-translate-y-1 hover:border-[#D4A5A5] cursor-pointer" 
    : "";
  
  return (
    <div 
      className={`bg-white border border-[#E5E5E5] rounded-2xl p-6 shadow-sm transition-all duration-200 ${hoverClasses}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
```

### AI Insight Panel

```tsx
import { Sparkles } from 'lucide-react';

export function AIInsightPanel({ insights }: { insights: any[] }) {
  return (
    <div className="bg-gradient-to-br from-[#F9F5FF] to-[#FFF9F9] border border-[#E8D5F2] rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#D4A5A5]" />
          <h3 className="font-semibold text-[#1A1A1A]">AI Insights</h3>
        </div>
      </div>
      
      <div className="h-px bg-[#E8D5F2] mb-4" />
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-lg mt-0.5">{insight.icon}</span>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              {insight.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 15. Quality Checklist

Before shipping any screen or component, verify:

**Design:**
- [ ] Uses brand colors from palette (no custom colors)
- [ ] Typography follows type scale (no arbitrary sizes)
- [ ] Spacing uses 8px grid (4, 8, 16, 24, 32, etc.)
- [ ] Border radius is consistent (8px, 12px, or 16px)
- [ ] Shadows are subtle (no harsh drop shadows)
- [ ] Buttons have proper hover/active states
- [ ] Cards have rounded-2xl (16px) corners

**Content:**
- [ ] Headlines are clear and action-oriented
- [ ] Button labels explain what happens
- [ ] Error messages are helpful, not technical
- [ ] No placeholder text (Lorem Ipsum)
- [ ] Microcopy uses brand voice

**Accessibility:**
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Alt text on all images
- [ ] Form labels properly associated
- [ ] Touch targets are minimum 44px

**Responsive:**
- [ ] Works on mobile (320px+)
- [ ] Works on tablet (768px+)
- [ ] Works on desktop (1024px+)
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets sized appropriately

**Performance:**
- [ ] Images optimized (WebP, compressed)
- [ ] No layout shift on load
- [ ] Animations respect prefers-reduced-motion
- [ ] No unnecessary re-renders

---

## 16. Resources & Tools

### Design Tools
- **Figma:** For mockups and prototypes
- **ColorSpace:** Generate color palettes
- **Contrast Checker:** WCAG compliance testing

### Development
- **Tailwind CSS:** Utility-first CSS framework
- **Lucide React:** Icon library
- **Motion (Framer Motion):** Animation library
- **React Hook Form:** Form validation

### Testing
- **axe DevTools:** Accessibility testing
- **WAVE:** Web accessibility evaluation
- **Lighthouse:** Performance and SEO
- **BrowserStack:** Cross-browser testing

### Fonts
- **Google Fonts:** Inter, Playfair Display
- **Variable Fonts:** Enable for better performance

---

## Conclusion

This style guide is a living document. As FashionOS evolves, so will our design system. Always prioritize:

1. **User clarity** over visual flair
2. **Consistency** over individual creativity
3. **Accessibility** over aesthetics
4. **Performance** over heavy animations

**Questions or suggestions?** Contact the design team at [design@fashionos.com](mailto:design@fashionos.com)

---

**Last Updated:** December 9, 2025  
**Next Review:** March 2026  
**Maintained By:** FashionOS Design Team
