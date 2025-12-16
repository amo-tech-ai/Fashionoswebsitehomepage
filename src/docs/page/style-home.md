# FashionOS Marketing Style Guide

**Version:** 1.0  
**Context:** Marketing Website (Home, About, Services, Pricing, Contact)  
**Theme:** Luxury Utility

---

## 1. Brand Foundations

FashionOS combines high-end editorial aesthetics with functional software tools. The design language is strict, minimal, and content-first.

### Brand Personality
*   **Intelligent:** Data-driven, smart, predictive.
*   **Editorial:** Curated, visual, storytelling-led.
*   **Premium Utility:** Functional but beautiful; "The tool is the luxury."
*   **Minimalist:** Rejects clutter; whitespace is a feature.

### Brand Tone
*   **Voice:** Authoritative, sophisticated, concise.
*   **Do:** "Orchestrate The Moment", "Operating System for Fashion".
*   **Don't:** "Easy to use app", "Get more sales fast", "Cheap solution".

### Visual Principles
*   **High Contrast:** Lean heavily on Black & White.
*   **Sharpness:** Clean lines, thin borders (1px), sharp corners (mostly).
*   **Rhythm:** Generous vertical spacing; give content room to breathe.

---

## 2. Color System

The palette is intentionally restrained to allow photography to stand out.

### Primary Palette
| Name | Hex / Class | Usage |
| :--- | :--- | :--- |
| **Luxury Black** | `#000000` / `bg-black` | Primary buttons, text, strong backgrounds. |
| **Paper White** | `#FFFFFF` / `bg-white` | Page backgrounds, card backgrounds. |
| **Off White** | `#F9FAFB` / `bg-gray-50` | Section backgrounds (subtle differentiation). |

### Secondary & UI
| Name | Hex / Class | Usage |
| :--- | :--- | :--- |
| **Dark Gray** | `#111827` / `text-gray-900` | Headings, strong UI borders. |
| **Mid Gray** | `#6B7280` / `text-gray-500` | Body text, secondary icons. |
| **Light Gray** | `#E5E7EB` / `border-gray-200` | Borders, dividers. |
| **Mist** | `#F3F4F6` / `bg-gray-100` | Image placeholders, subtle panels. |

### Accents (Use Sparingly)
*   **Intelligence Gradients:** Purple to Pink (`from-purple-500 to-pink-500`) or Yellow to Amber (`from-yellow-200 to-amber-500`). Used *only* for AI/Intelligence features.
*   **Status Green:** Emerald-500. Used for "Active", "Free to Join", or success states.

---

## 3. Typography

### Font Families
*   **Headings (Serif):** `Playfair Display` (via `font-serif`). Used for H1-H3 to convey luxury and editorial feel.
*   **Body / UI (Sans):** `Inter` (via `font-sans`). Used for body text, buttons, labels, and UI elements for readability.

### Type Scale

| Element | Size (Desktop) | Weight | Style | Class Example |
| :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `text-7xl` or `8xl` | Regular/Medium | Serif | `text-6xl lg:text-8xl font-serif` |
| **Page H1** | `text-6xl` | Regular | Serif | `text-5xl lg:text-6xl font-serif` |
| **Section H2** | `text-4xl` | Regular | Serif | `text-4xl font-serif` |
| **Card H3** | `text-lg` to `xl` | Medium | Serif/Sans | `text-lg font-serif` |
| **Body Large** | `text-xl` | Light (300) | Sans | `text-xl font-light text-gray-600` |
| **Body Default** | `text-base` | Regular (400) | Sans | `text-base text-gray-600` |
| **Label/Overline** | `text-xs` | Medium/Semi | Sans, Uppercase | `text-xs tracking-widest uppercase` |

### Line Height & Spacing
*   **Headings:** Tight leading (`leading-tight` or `leading-[1.1]`).
*   **Body:** Relaxed leading (`leading-relaxed`) for readability.
*   **Tracking:** All uppercase labels MUST use `tracking-widest` (0.2em - 0.3em).

---

## 4. Layout & Grid

### Dimensions
*   **Container:** `container mx-auto px-6 lg:px-12`.
*   **Max Width:** Typically constrained to `max-w-7xl` implicitly by container.

### Grid System
*   **2-Column Split:** Common for Hero and Feature highlights (`grid-cols-1 lg:grid-cols-2 gap-16`).
*   **3-Column Cards:** Feature overviews (`grid-cols-1 md:grid-cols-3 gap-8`).
*   **4-Column Dense:** Timelines or data points.

### Spacing (Vertical Rhythm)
*   **Section Padding:** Generous. `py-24` (96px) or `py-32` (128px).
*   **Element Spacing:** `space-y-8` between distinct content blocks.

---

## 5. Components

### Navbar
*   **Height:** `h-20`.
*   **Style:** Fixed or sticky, transparent to white.
*   **Content:** Logo (Left), Navigation (Center/Right), Actions (Right).

### Cards (Feature / Service)
*   **Border:** 1px Solid Gray (`border border-gray-100`).
*   **Hover:** Darken border (`hover:border-gray-900`) or subtle lift.
*   **Padding:** `p-8` or `p-12`.
*   **Icon:** Thin stroke (`strokeWidth={1}`), large size (`size={32}` or `40`).

### Timeline / Process
*   **Style:** Horizontal flow with connecting lines.
*   **Typography:** Large numbers (`text-4xl font-serif`), clear titles.

---

## 6. Imagery & Media

### Style
*   **Subject:** High-fashion editorial, backstage production, minimal studio settings.
*   **Treatment:** 
    *   Black & White (Grayscale) for "System" or "Backstage" vibes.
    *   Color for "Results" or "Nature/Organic" contrast.
*   **Fallback:** Always use `ImageWithFallback` component.

### Components
*   **Parallax:** Subtle vertical movement on scroll.
*   **Overlays:** Black with opacity (`bg-black/40`) for text readability on background images.

---

## 7. Buttons & CTAs

### Primary Button
*   **Background:** Black (`bg-black`).
*   **Text:** White (`text-white`).
*   **Shape:** Rectangular (sharp) or Pill (rounded-full) depending on context (Home V3 uses both, aim for consistency based on section type). 
    *   *Standard:* `px-10 py-4`.
*   **Typography:** `text-xs uppercase tracking-widest font-semibold`.
*   **Hover:** `hover:bg-gray-800` or `transform hover:scale-105`.

### Secondary / Ghost Button
*   **Background:** Transparent or White.
*   **Border:** `border border-gray-300` (Hover: `border-gray-900`).
*   **Text:** Black or Gray-900.
*   **Typography:** Same as Primary.

### Text Link
*   **Style:** Underlined or with Arrow icon.
*   **Interaction:** Arrow moves on hover (`group-hover:gap-4`).

---

## 8. Motion & Interaction

### Animations (Framer Motion)
*   **Fade In:** `opacity: 0, y: 30` -> `opacity: 1, y: 0`.
*   **Stagger:** `staggerChildren: 0.1` for lists/grids.
*   **Duration:** `0.8s`, Ease: `easeOut`.
*   **Scroll:** `useScroll` for parallax effects on images.

### Hover States
*   **Cards:** Border color shift (Gray to Black).
*   **Images:** Grayscale to Color, or slight Scale Up (`scale-105`).

---

## 9. Content Guidelines

*   **Headings:** Editorial. Use Title Case.
    *   *Yes:* "World-Class Creative Talent"
    *   *No:* "Hire photographers and models"
*   **Subheadings:** Descriptive but brief. "Runway to Retail."
*   **Body Copy:** Professional, reassuring, high-level. Avoid getting bogged down in technical specs unless on a technical page.
*   **CTA Copy:** Action-oriented, commanding.
    *   "Start a Shoot"
    *   "Create Brand Profile"
    *   "Plan an Event"

---

## Developer Cheatsheet (Tailwind)

*   **Serif Font:** `font-serif`
*   **Sans Font:** `font-sans`
*   **Primary Black:** `bg-black` / `text-black`
*   **Primary White:** `bg-white`
*   **Subtle Border:** `border-gray-100` or `border-gray-200`
*   **Standard Section:** `py-24 container mx-auto px-6`
*   **Label Text:** `text-xs uppercase tracking-widest`
