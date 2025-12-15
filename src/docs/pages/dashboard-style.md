# FashionOS Dashboard Style Guide

## 1. Overview
The FashionOS Dashboard experience blends high-functionality SaaS tools with an editorial aesthetic. Unlike traditional admin panels which are often dense and cluttered, our dashboards prioritize **clarity, whitespace, and visual hierarchy**.

The goal is to make managing a fashion week event feel as elegant as the event itself.

---

## 2. Layout Structure

### The Frame
*   **Sidebar Navigation:** Fixed left, width `280px`. Minimal icons, uppercase text `text-xs tracking-widest`.
*   **Top Bar:** Minimal height `64px`. Breadcrumbs (Serif), clear primary action button (Top Right).
*   **Main Content:** max-width `1600px` centered. Padding `px-8 py-8`.

### The Grid
*   **Standard Dashboard:** 12-column grid.
*   **Widget Spacing:** `gap-6` or `gap-8`.
*   **Visual Rhythm:** Align distinct functional areas (e.g., metrics vs. lists) horizontally.

---

## 3. Typography & Hierarchy

### Headers
*   **Page Title:** `Playfair Display`, 32px-40px, Regular weight.
*   **Section Title:** `Inter`, 14px, Uppercase, Tracking `0.1em`, Text Gray-500.

### Data
*   **Numbers (Metrics):** `Inter`, Light/Thin weight, Large scale (48px+).
*   **Table Headers:** `Inter`, 12px, Medium, Gray-500.
*   **Table Data:** `Inter`, 14px, Regular, Gray-900.

---

## 4. Common Components

### A. Metric Cards
*   **Appearance:** Pure white background, 1px border `gray-200`. No shadow.
*   **Layout:** Label top-left (uppercase, small), Value center-left (large).
*   **Trend:** Small arrow icon + percentage in bottom-right (muted green/red).

### B. Data Tables
*   **Style:** Minimalist.
*   **Borders:** Only horizontal dividers (`border-b border-gray-100`). No vertical lines.
*   **Header:** Transparent background.
*   **Rows:** Tall height (`64px`) to allow image thumbnails to breathe.
*   **Hover:** Very subtle gray background (`bg-gray-50/50`).

### C. Status Badges
*   **Shape:** Pill shape, fully rounded.
*   **Style:** 1px border, transparent background, colored text OR very light background.
    *   *Draft:* Gray border, Gray text.
    *   *Active:* Black border, Black text.
    *   *Completed:* Green-100 bg, Green-800 text (Muted).

---

## 5. Specific View Guidelines

### 1. Project Overview
*   **Purpose:** At-a-glance health of the event/project.
*   **Key Elements:**
    *   **Hero Stat:** Days until show / Budget status.
    *   **Recent Activity:** Text-only list, time-stamped, minimal style.
    *   **Team:** Avatar pile, small size.
*   **Layout:** Top row metrics (4 cols), Middle row Timeline/Calendar (8 cols) + Activity (4 cols).

### 2. Shot List Builder
*   **Purpose:** Organizing the sequence of looks for the runway.
*   **Interaction:** Drag-and-drop heavy.
*   **Card Style:**
    *   **Image:** Large aspect ratio `2:3` (Portrait).
    *   **Look Number:** Big serif number overlay (e.g., "01").
    *   **Details:** Minimal text below image (Model name, outfit code).
*   **Grid:** Masonry or strict columns.

### 3. Products Gallery
*   **Purpose:** Visual database of clothing items.
*   **Layout:** Grid view (default) vs List view toggles.
*   **Card:**
    *   Image focused (Square or 3:4).
    *   Quick actions appear on hover (Edit, Archive).
    *   Selection state: Thick black border (`2px`).

### 4. Deliverables & Assets
*   **Purpose:** File management and sharing.
*   **Visuals:**
    *   **Folders:** Minimal black outline icons.
    *   **Files:** Large preview thumbnails for images; clear type icons for docs.
*   **Typography:** Filenames in `Inter Medium`.
*   **Actions:** "Download" and "Share" buttons prominent in top right of selected item.

---

## 6. Interaction Patterns

### Selection
*   **Active Item:** When selecting a look or product, apply a **2px Solid Black Border**. This is the primary "active" indicator, replacing the typical blue glow of standard SaaS.

### Hover States
*   **Cards:** Lift slightly (`-y-1`) or darken border `gray-200` -> `gray-900`.
*   **Buttons:** Standard primary/secondary hover rules apply.

### Empty States
*   **Illustration:** Use a minimal line-art icon or a washed-out fashion illustration.
*   **Text:** Serif headline ("No Looks Added Yet") + Sans body.
*   **CTA:** Centered, Primary Button.
