# FashionOS Dashboard Style Guide
**Focus Areas:** All Dashboard Modules

## 1. Core Aesthetic: "Luxury Utility"

The dashboard pages must balance the **visual elegance** of a fashion editorial with the **dense utility** of a project management tool.

*   **Backgrounds:** Light gray (`#F7F7F5`) for the main canvas to reduce eye strain, white (`#FFFFFF`) for content cards.
*   **Shadows:** Soft, diffused shadows (`shadow-sm`, `shadow-md`) to create depth without clutter.
*   **Borders:** Thin, crisp borders (`border-gray-100` or `#E5E5E5`) to define structure.
*   **Typography:**
    *   *Headings:* **Playfair Display** (Serif) for page titles and major section headers to maintain the "luxury" feel.
    *   *UI Text:* **Inter** (Sans-serif) for all interface elements, tables, and data for maximum readability.

---

## 2. Color Palette (Dashboard Specific)

While drawing from the main FashionOS palette, these specific shades are prioritized for dashboard density and status indication.

### Interface Neutrals
*   **Canvas:** `#F7F7F5` (Warm Gray/Stone) - Main background.
*   **Surface:** `#FFFFFF` (White) - Cards, sidebars, modals.
*   **Text Primary:** `#1A1A1A` (Charcoal) - Headings, values.
*   **Text Secondary:** `#6B7280` (Cool Gray) - Labels, timestamps.
*   **Divider:** `#E5E7EB` (Gray 200) - Subtle separation.

### Status Indicators (Utility)
Used in Overview, Shot List, and Product tables.

*   **Success / Ready / Signed:**
    *   *Bg:* `#DCFCE7` (Green 100)
    *   *Text:* `#166534` (Green 800)
*   **In Progress / Pending / Negotiating:**
    *   *Bg:* `#FEF3C7` (Amber 100)
    *   *Text:* `#92400E` (Amber 800)
*   **Critical / Missing / Overdue:**
    *   *Bg:* `#FEE2E2` (Red 100)
    *   *Text:* `#991B1B` (Red 800)
*   **AI Suggestion / Insight:**
    *   *Bg:* `#F3E8FF` (Purple 100)
    *   *Text:* `#6B21A8` (Purple 800)
    *   *Icon:* `#A855F7` (Purple 500)

### Brand Accents
*   **Primary Action:** `#1A1A1A` (Black) - Primary buttons.
*   **Highlight/Select:** `#F3E8FF` (Soft Purple) - Selected rows, active states.

---

## 3. Page-Specific Guidelines

### A. Project Overview & Command Center
*Goal: High-level visibility, immediate status assessment, and "Next Best Action".*

**Layout Structure:**
1.  **Header:** Large serif title (H1), date/status on right.
2.  **KPI Grid:** Top row of 3-4 cards showing key metrics (Budget, Timeline, Tasks).
3.  **Main Content (2-Column):**
    *   *Left (2/3):* Activity timeline, recent deliverables, "Next Best Action" bar.
    *   *Right (1/3):* Team members, AI insights sidebar.

**Key Components:**
*   **"Next Best Action" Bar:** A prominent, dark-mode strip (`bg-black text-white`) identifying the single most important task.
*   **Live Metrics:** Real-time data points (Ticket Sales, RSVP count) should use large `Inter` numbers.

### B. Event Wizard
*Goal: Step-by-step guidance without overwhelm.*

**Layout Structure:**
*   **Split Screen:** Left side inputs (White), Right side preview/summary (Stone/Gray).
*   **Progress Stepper:** Minimalist dots or serif numbers (1, 2, 3) connected by thin lines.

**Key Components:**
*   **Big Input Cards:** Options presented as large selectable cards with icons (e.g., "Digital Only" vs "Hybrid" cards).
*   **Contextual AI:** Sidebar that updates based on the current step (e.g., suggesting venues when on the Location step).

### C. Sponsor CRM & Contracts
*Goal: Relationship management and document tracking.*

**Layout Structure:**
*   **Kanban View (Sponsors):** Columns for "Prospecting", "Negotiating", "Signed".
*   **List View (Contracts):** Dense data table with status pills.

**Key Components:**
*   **Tier Badges:** Metallic gradients for sponsor tiers (Gold, Platinum) to differentiate from standard status chips.
*   **Logo Avatars:** Circular or rounded-square avatars for sponsor logos.
*   **Document Icons:** Distinct icons for PDF/Docx with status indicators overlay (e.g., checkmark for signed).

### D. Designer Directory & Add Designer
*Goal: Visual portfolio management.*

**Layout Structure:**
*   **Grid View:** Large "Comp Card" style cards emphasizing the designer's hero image/collection.
*   **Profile Drawer:** Slide-out drawer for quick editing of designer details.

**Key Components:**
*   **Comp Card:**
    *   *Image:* Full bleed or high ratio.
    *   *Overlay:* Name and Category (e.g., "Couture") on hover.
*   **Collection Preview:** Horizontal scroll of thumbnails within the profile view.

### E. Activations Manager
*Goal: Timeline and logistics coordination.*

**Layout Structure:**
*   **Timeline View:** Horizontal Gantt-style bars for activation durations.
*   **Resource List:** Sidebar showing assigned staff/assets per activation.

**Key Components:**
*   **Status Timeline Bars:** Colored bars matching the Status Indicators palette.
*   **Conflict Alerts:** Red outline/glow on overlapping activations (Collision detection).

### F. Tasks & Deliverables
*Goal: Clear accountability and deadlines.*

**Layout Structure:**
*   **Grouped Lists:** Tasks grouped by "Phase" (Pre-Event, During, Post-Event) or "Department".

**Key Components:**
*   **Checkbox Interaction:** Satisfying "check" animation, strikethrough text on complete.
*   **Owner Avatar:** Small circle avatar next to task description.
*   **Priority Flags:** Subtle flag icons colored by urgency.

### G. ROI Analytics
*Goal: Beautiful data visualization.*

**Layout Structure:**
*   **Dashboard Grid:** Mix of full-width charts (Revenue) and 1/3-width metric cards.

**Key Components:**
*   **Charts:** Use brand colors (Purple, Black, Gray) for data series. Avoid default library colors.
*   **Trend Indicators:** "↑ 12%" badges in Green/Red pill styles.
*   **Insight Text:** Natural language summary below charts ("Revenue is up 12% compared to last season").

### H. Venue Manager
*Goal: Space planning and capacity management.*

**Layout Structure:**
*   **Visual Map (Placeholder):** Large area for floor plan.
*   **Capacity Sidebar:** Progress bars showing "RSVP vs Capacity".

**Key Components:**
*   **Facility Icons:** Custom icon set for amenities (Wifi, Green Room, Runway).
*   **Capacity Bar:** Visual bar filling up as tickets are sold.

### I. Shot List Builder
*Goal: Visual organization of complex photography requirements.*

**Layout Structure:**
*   **Split View:**
    *   *Left Sidebar (Assets/products):* Draggable items.
    *   *Main Area (Shot Canvas):* List or grid of shots.
*   **Grouped Rows:** Shots grouped by "Look" or "Scene".

**Key Components:**
*   **Shot Card (Row):**
    *   *Thumbnail:* Large square aspect ratio (1:1).
    *   *Input Fields:* Minimalist, borderless until focused to reduce visual noise.
    *   *Drag Handle:* Subtle grip icon (`::`) on the left.
*   **AI Copilot:** A floating or sticky side panel offering suggestions (e.g., "Add a close-up for texture detail").
*   **Visual Tags:** Small, distinct badges for requirements (e.g., "Video", "Gif", "Macro").

### J. Products Page
*Goal: Inventory management with visual verification.*

**Layout Structure:**
*   **Header Actions:** Search bar, Filter toggles, "Add Product" button.
*   **View Toggle:** Switch between Grid (visual focus) and List (data focus).

**Key Components:**
*   **Product Card (Grid View):**
    *   *Image:* Dominant element, taking up 60% of card height.
    *   *Details:* Minimal text below image (Name, SKU, Price).
    *   *Status Dot:* Small colored dot indicating availability.
*   **Data Table (List View):**
    *   *Clean Lines:* Horizontal borders only.
    *   *Thumbnail:* Small (40px) image in first column.
    *   *Actions:* "Edit" and "Delete" icons appear on hover (opacity transition).
*   **Bulk Actions:** A floating bar that appears at the bottom when items are selected.

---

## 4. Typography Scale (Dashboard)

| Element | Font Family | Size / Leading | Weight | Color |
| :--- | :--- | :--- | :--- | :--- |
| **Page Title** | Playfair Display | `text-3xl` / `leading-tight` | Medium | Black |
| **Section Header** | Inter | `text-sm` / `leading-none` | Semibold | Gray-500 (Uppercase) |
| **Card Title** | Inter | `text-lg` / `leading-snug` | Semibold | Black |
| **Body Text** | Inter | `text-sm` / `leading-relaxed` | Regular | Gray-600 |
| **Data/Table** | Inter | `text-sm` / `leading-normal` | Medium | Gray-900 |
| **Label/Caption** | Inter | `text-xs` / `leading-none` | Medium | Gray-500 |

---

## 5. Interaction Patterns

*   **Hover States:**
    *   Cards should lift slightly (`-translate-y-1`) and gain a stronger shadow.
    *   Table rows should highlight with a very light gray background (`hover:bg-gray-50`).
*   **Modals:**
    *   Use distinct backdrops (`bg-black/20 backdrop-blur-sm`) to maintain focus.
    *   Modals should have rounded corners (`rounded-2xl`) to match the brand softness.
*   **Transitions:**
    *   All interactive changes should use `transition-all duration-200 ease-in-out` for a premium feel.
