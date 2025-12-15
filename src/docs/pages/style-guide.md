# FashionOS Style Guide

## 1. Style Guide Overview

### Purpose
This document serves as the single source of truth for the FashionOS visual language. It ensures consistency across our SaaS platform, marketing website, and mobile experiences.

### Audience
*   **Designers:** To maintain visual integrity when creating new features.
*   **Developers:** To implement standardized tokens and components.
*   **Marketing:** To ensure brand alignment in external communications.

### Problem Solved
FashionOS bridges the gap between high-fashion editorial aesthetics and functional SaaS utility. This guide prevents "utility drift" (becoming too boring) and "editorial chaos" (becoming unusable).

---

## 2. Brand Principles

**Personality:** Luxury Utility, Editorial, Intellectual, Minimal, Timeless.

### Do's
*   **Do** use ample whitespace to create breathing room.
*   **Do** use high-contrast black and white as the foundation.
*   **Do** treat typography as an image.
*   **Do** use motion to enhance feel, not just for show.

### Don'ts
*   **Don't** use cluttered layouts or "dense" dashboard aesthetics.
*   **Don't** use bright, primary "startup" colors (no default bootstrap blues).
*   **Don't** use drop shadows excessively; prefer borders and layout for hierarchy.
*   **Don't** compromise legibility for style in core workflow areas.

---

## 3. Color System

### Primary Palette
*   **Fashion Black:** `#000000` (Primary text, primary buttons, borders)
*   **Paper White:** `#FFFFFF` (Backgrounds, cards)
*   **Off White:** `#F9F9F9` (Secondary backgrounds, hover states)

### Neutral Palette
*   **Gray 100:** `#F3F4F6` (Dividers, light backgrounds)
*   **Gray 300:** `#D1D5DB` (Disabled states, subtle borders)
*   **Gray 500:** `#6B7280` (Secondary text, icons)
*   **Gray 900:** `#111827` (Headings, heavy emphasis)

### Semantic Palette
*   **Error:** `#EF4444` (Critical alerts, destructive actions) - *Use sparingly.*
*   **Success:** `#10B981` (Success states) - *Muted, not neon.*
*   **Warning:** `#F59E0B` (Attention needed)
*   **Info:** `#3B82F6` (System status)

### Usage Rules
*   **Buttons:** Primary actions are always Black background with White text. Secondary are Transparent with Black border.
*   **Borders:** Use thin, 1px borders for separation instead of shadows.

---

## 4. Typography

### Font Families
*   **Headings (Serif):** `Playfair Display`
    *   Usage: H1, H2, Landing page heros, Editorial moments.
*   **Body / UI (Sans-Serif):** `Inter`
    *   Usage: App UI, navigation, buttons, inputs, long-form text.

### Type Scale
| Level | Font Size | Line Height | Weight | Font Family | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | 60px+ | 1.1 | Regular | Playfair | Hero Headlines |
| **H1** | 48px | 1.2 | Regular | Playfair | Page Titles |
| **H2** | 36px | 1.2 | Regular | Playfair | Section Headers |
| **H3** | 24px | 1.3 | Medium | Inter | Card Titles |
| **Body L** | 18px | 1.6 | Regular | Inter | Lead Paragraphs |
| **Body M** | 16px | 1.5 | Regular | Inter | Default UI Text |
| **Small** | 14px | 1.5 | Medium | Inter | Labels, Metadata |
| **Tiny** | 12px | 1.4 | Medium | Inter | Captions, Hints |

---

## 5. Layout & Spacing

### Grid System
*   **Desktop:** 12 columns, 24px gutter, 1280px max-width container.
*   **Tablet:** 8 columns, 16px gutter.
*   **Mobile:** 4 columns, 16px gutter.

### Spacing Scale (4px Base)
*   `xs` (4px): Tight grouping.
*   `sm` (8px): Icon spacing, small padding.
*   `md` (16px): Standard component padding.
*   `lg` (24px): Section separation (internal).
*   `xl` (32px): Card padding.
*   `2xl` (64px): Section separation (major).
*   `3xl` (128px): Hero spacing.

---

## 6. Components Style Rules

### Buttons
*   **Primary:** Square corners (`rounded-sm`), Black BG, White Text, Uppercase, Tracking `0.05em`.
*   **Secondary:** Square corners, White BG, Black Border (1px), Black Text.
*   **Ghost:** No border, Black Text, Underline on hover.

### Forms & Inputs
*   **Style:** Minimalist, bottom border only OR thin 1px full border.
*   **Active:** Black border highlight.
*   **Error:** Red border, small red text below.
*   **Labels:** Uppercase, small, tracking wide (`text-xs`).

### Cards
*   **Style:** Flat, 1px border `Gray-200`, White BG.
*   **Hover:** Subtle lift or border color change to Black. No heavy shadows.

---

## 7. Imagery & Media

### Photography Style
*   **Editorial:** High fashion, artistic composition, emotional.
*   **Mix:** Combine Black & White portraits with Vibrant, rich color shots.
*   **Texture:** Grain and film aesthetic is welcome.

### Aspect Ratios
*   **Portrait:** 3:4 (Standard editorial)
*   **Landscape:** 16:9 (Cinematic)
*   **Square:** 1:1 (Product/Avatar)

### Rules
*   **Do:** Use full-bleed images for impact sections.
*   **Don't:** Use generic corporate stock photography.

---

## 8. Icons & UI Elements

### Icon Style
*   **Library:** Lucide React / Phosphor Icons.
*   **Style:** Stroke (Outline), 1.5px stroke width.
*   **Consistency:** Always use the same stroke width relative to size.

### Usage
*   Icons should support the text, not replace it (unless it's a standard pattern like a trash can).
*   Align icons optically with text cap-height.

---

## 9. Motion & Interaction

### Principles
*   **Sophisticated:** Slow, smooth easing (e.g., `easeOut`).
*   **Meaningful:** Motion guides the eye (e.g., parallax scrolling to show depth).
*   **Restrained:** Do not animate everything.

### Specifications
*   **Duration:** Fast (200ms) for UI interactions; Slow (800ms+) for entrance animations.
*   **Parallax:** Use for hero images to create the "magazine layer" effect.

---

## 10. Accessibility Standards

### Guidelines
*   **Contrast:** Ensure text meets WCAG AA standards (4.5:1 ratio).
*   **Focus:** Visible focus ring (styled, e.g., black outline offset) for keyboard users.
*   **Semantic HTML:** Proper use of `<button>`, `<a>`, and headings.
*   **Alt Text:** All decorative editorial images must have descriptive alt text.

---

## 11. Real-World Usage Examples

### Dashboard Screen
*   **Header:** Minimal text, breadcrumbs.
*   **Content:** Data tables with ample whitespace, serif headings for section titles.
*   **Action:** Primary "Create" button in top right.

### Marketing Landing
*   **Hero:** Large Serif Headline, split screen image (B&W + Color).
*   **Scroll:** Elements fade in slowly (`y: 20` -> `y: 0`).

---

## 12. Implementation Notes

### Design to Dev Handoff
*   **Tailwind:** Use standard Tailwind utility classes.
*   **Fonts:** Ensure `font-serif` maps to Playfair and `font-sans` maps to Inter.
*   **New Components:** Check `/components/ui` (Shadcn) first before building custom.

### Versioning
*   Style guide updates should be versioned alongside major UI releases.
