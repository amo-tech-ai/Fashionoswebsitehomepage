# CTA Component Design & Implementation Guide
**Component:** `CreateProfileCTA`  
**Location:** `/components/shared/CreateProfileCTA.tsx`  
**Target Route:** `/designer-wizard`

## 1. Overview
The "Create Your Profile" CTA is the primary conversion point on the marketing landing page. It acts as the gateway to the **AI Brand Designer Wizard**. The design philosophy is "Editorial Elegance" — combining high-fashion typography with calm, sophisticated motion to invite users rather than pressure them.

## 2. UI/UX Layout Strategy

### Desktop Layout (Grid System)
*   **Structure:** 2-Column Asymmetric Grid.
    *   **Left Column (Content):** Editorial narrative, benefits, and value proposition.
    *   **Right Column (Visuals):** High-impact imagery stacked with the primary action card.
*   **Whitespace:** Generous padding (`py-32`, `gap-24`) to create a sense of luxury and breathability.

### Mobile Layout
*   **Structure:** Single Column Stack.
*   **Order:** Visuals/Action first (or second depending on emphasis), Content follows.
*   **Adjustments:** Reduced padding (`py-24`), simplified parallax (disabled for performance).

## 3. Visual & Branding Elements

### Typography
*   **Headline:** `Playfair Display` (Serif). Large scale (4xl-6xl). Leading tight (`1.1`) to mimic magazine headers.
*   **Body:** `Inter` (Sans-serif). Light font weight, high readability for value props.
*   **Badge:** "Free to Join" — Small, uppercase, tracking-widest. Green indicator dot for "Active/Go" signal.

### Imagery
*   **Style:** High-fashion portraiture with dramatic lighting.
*   **AspectRatio:** `4:3` or `16:10` depending on viewport.
*   **Overlay:** Subtle gradient overlay (`black/20`) to ensure image depth.

## 4. Actions & Routing Logic

### Primary Action: "Create Profile"
*   **Element:** Dark Pill Button (High Contrast).
*   **Route:** `/designer-wizard`
*   **Logic:**
    1.  User clicks CTA.
    2.  `handleNavigation` function pushes state to history.
    3.  App router detects path change and mounts `DesignerWizard`.
    4.  Sidebar/Nav UI may hide to focus user on the wizard task (Focus Mode).

### Secondary Action: "View Example Profile"
*   **Element:** Text Link with animated underline.
*   **Route:** `/directory`
*   **Purpose:** Social proof. Allows hesitant users to see the end result before committing.

## 5. Animation & Motion Design

We use `framer-motion` (Motion) for all interactions to ensure fluid, 60fps performance.

### 1. Staggered Entrance
Elements enter the viewport sequentially to guide the eye:
1.  **Headline** (t=0s)
2.  **Subtext/Badge** (t=0.1s)
3.  **Benefits List** (t=0.2s)
4.  **CTA Card** (t=0.3s)

*   **Effect:** `y: 20 -> 0`, `opacity: 0 -> 1`.
*   **Easing:** `easeOut` cubic bezier.

### 2. Parallax Scroll Effect (Desktop Only)
To add depth without "scroll-jacking," the main image moves slightly slower than the scroll speed.

*   **Implementation:**
    ```tsx
    const { scrollYProgress } = useScroll({ target: imageRef });
    const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
    ```
*   **Result:** The image appears to float behind the content plane.

### 3. Micro-Interactions
*   **Button Hover:**
    *   Scale up slightly.
    *   Shadow expands/diffuses (`boxShadow` bloom).
    *   Arrow icon translates right (`x: 0 -> 4px`).
*   **Button Tap:**
    *   Scale down (`0.98`) for tactile feedback.

## 6. Implementation Steps

### Step 1: Component Structure
Create the container and grid.
```tsx
<section className="py-32 bg-[#F9F9F7]">
  <div className="container grid lg:grid-cols-2 gap-24">
    {/* Columns */}
  </div>
</section>
```

### Step 2: Content Population
Add the "FashionOS" branding copy. Use the `lucide-react` library for icons (Checkmarks, Arrows).

### Step 3: The "Floating" CTA Card
Instead of placing the button directly in the layout, place it inside a white "Card" with a shadow. This elevates the call to action, making it feel like a tangible object.
```tsx
<div className="bg-white rounded-2xl p-10 shadow-lg">
  <Button>Create Profile</Button>
</div>
```

### Step 4: Wire up Routing
Connect the button to the `DesignerWizard` route.
```tsx
onClick={() => handleNavigation("/designer-wizard")}
```

### Step 5: Add Motion
Wrap elements in `<motion.div>` and apply the `viewport={{ once: true }}` prop so animations only trigger on the first scroll.
