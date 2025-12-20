# 08 – One System Section: Complete Design Specification

**File:** `/components/pages/SponsorshipPageV2.tsx`  
**Section:** `TheSolution` (lines 186-266)  
**Design Philosophy:** Calm Luxury, Premium SaaS, Editorial Typography

---

## 📐 SECTION OVERVIEW

### Purpose
Communicate that FashionOS unifies four critical sponsorship functions into one cohesive platform—visually represented through a central hub with connected spoke modules.

### Visual Hierarchy
1. **Eyebrow Badge** → "THE SOLUTION"
2. **Headline** → "One System. Full Visibility."
3. **Subheadline** → Platform value proposition
4. **Central Diagram** → Interactive hub with 4 modules

### Frame Dimensions
- **Width:** 1440px (max-w-4xl → ~896px content)
- **Height:** ~700px (500px diagram + spacing)
- **Background:** `#FDFDFB` (warm off-white)
- **Padding:** `py-28` (112px top/bottom)

---

## 🎯 PROGRESS TRACKER

Use this checklist to track implementation:

```
□ Step 1: Section Structure & Container Setup
□ Step 2: Header Components (Badge, Headline, Subheadline)
□ Step 3: Central Hub Circle Design
□ Step 4: Four Module Cards Layout
□ Step 5: SVG Connector Lines (Spokes)
□ Step 6: Entry Animations (Sequential Stagger)
□ Step 7: Hover Interactions & Micro-animations
□ Step 8: Responsive Behavior (Mobile/Tablet)
□ Step 9: Accessibility (ARIA labels, keyboard nav)
□ Step 10: Performance Optimization
```

---

## 📝 COMPONENT BREAKDOWN

### 1. SECTION CONTAINER

**Specifications:**
```tsx
<Section className="bg-[#FDFDFB] overflow-hidden">
  <Container className="flex flex-col items-center">
```

**CSS Properties:**
- Background: `#FDFDFB` (warm ivory)
- Overflow: `hidden` (for animation clipping)
- Padding: `py-28` (112px vertical)
- Max-width: `1200px` (via Container)
- Center alignment: `flex flex-col items-center`

---

### 2. HEADER SECTION

#### A. Eyebrow Badge
**Component:** `<Badge>THE SOLUTION</Badge>`

**Design Specs:**
- Text: "THE SOLUTION"
- Font size: `10px`
- Letter spacing: `0.2em` (2px)
- Transform: `uppercase`
- Border: `1px solid #D4C5B0` (sand accent)
- Background: `#FDFDFB` (ivory)
- Padding: `3px 12px` (py-1 px-3)
- Border radius: `999px` (full rounded)
- Color: `#8C8070` (muted warm gray)
- Margin bottom: `24px` (mb-6)

**Motion:**
```tsx
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: EASING }}
```

---

#### B. Headline
**Text:** "One System. Full Visibility."

**Design Specs:**
- Font family: Georgia (serif)
- Font size: `3rem` (48px) on mobile, `3.5rem` (56px) on desktop
- Line height: `1.15` (tight)
- Color: `#1A1A1A` (charcoal)
- Font weight: `400` (regular serif weight)
- Text align: `center`
- Margin bottom: `24px` (mb-6)
- Max width: `48rem` (768px)

**Motion:**
```tsx
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: 0.1, ease: EASING }}
```

---

#### C. Subheadline
**Text:** "FashionOS connects event activations, commerce, marketing channels, and ROI reporting — in one unified platform."

**Design Specs:**
- Font family: Inter (sans-serif)
- Font size: `1.125rem` (18px) mobile, `1.25rem` (20px) desktop
- Line height: `1.6` (relaxed)
- Color: `#6B7280` (gray-500)
- Font weight: `300` (light)
- Text align: `center`
- Max width: `42rem` (672px)
- Margin bottom: `80px` (mb-20)

**Motion:**
```tsx
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: 0.2, ease: EASING }}
```

---

## 🎨 CENTRAL DIAGRAM ARCHITECTURE

### Layout System
```
┌─────────────────────────────────────────┐
│                                         │
│    [Event Activations]                  │
│            ╲                            │
│             ╲                           │
│              ╲                          │
│               [FashionOS]   [Live Comm] │
│              ╱            ╱             │
│             ╱            ╱              │
│    [Audience & Leads]   ╱               │
│                    [ROI Analytics]      │
│                                         │
└─────────────────────────────────────────┘
```

**Container:**
- Width: `100%`
- Max width: `64rem` (1024px)
- Height: `500px` (fixed)
- Display: `flex items-center justify-center`
- Position: `relative`

---

### 3. CENTRAL HUB CIRCLE

**Design Specs:**
- Width: `256px` (16rem / w-64)
- Height: `256px` (16rem / h-64)
- Shape: Perfect circle (`rounded-full`)
- Background: `#FFFFFF` (pure white)
- Border: `1px solid #F0F0F0` (subtle gray border)
- Shadow: `0 20px 50px rgba(0,0,0,0.05)` (soft elevated shadow)
- Position: `absolute` at center
- Z-index: `10` (above connectors)

**Typography Inside Hub:**
- **Label:** "FashionOS"
  - Font: Georgia serif
  - Size: `1.875rem` (30px)
  - Weight: `400`
  - Color: `#1A1A1A`
  - Margin bottom: `8px`

- **Sublabel:** "Sponsorship System"
  - Font: Inter sans-serif
  - Size: `10px`
  - Transform: `uppercase`
  - Letter spacing: `0.15em`
  - Color: `#9CA3AF` (gray-400)

**Layout:**
```tsx
<div className="
  relative z-10 
  w-64 h-64 
  bg-white 
  rounded-full 
  shadow-[0_20px_50px_rgb(0,0,0,0.05)] 
  border border-[#F0F0F0] 
  flex flex-col items-center justify-center 
  text-center 
  p-6
">
  <div className="text-3xl font-serif text-[#1A1A1A] mb-2">
    FashionOS
  </div>
  <div className="text-[10px] uppercase tracking-widest text-gray-400">
    Sponsorship System
  </div>
</div>
```

**Motion:**
```tsx
initial={{ opacity: 0, scale: 0.92 }}
whileInView={{ opacity: 1, scale: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.6, ease: EASING, delay: 0.3 }}
```

**Hover State:**
```tsx
whileHover={{ 
  scale: 1.03,
  boxShadow: "0 25px 60px rgba(0,0,0,0.08)"
}}
transition={{ duration: 0.3 }}
```

---

### 4. MODULE CARDS (4 SPOKES)

**Positioning Map:**
```
Top-Left:    left-0 top-10     → Event Activations
Top-Right:   right-0 top-10    → Live Commerce
Bottom-Left: left-0 bottom-10  → Audience & Leads
Bottom-Right: right-0 bottom-10 → ROI Analytics
```

**Card Specifications:**
- Width: `192px` (12rem / w-48)
- Height: `128px` (8rem / h-32)
- Background: `#FFFFFF`
- Border: `1px solid #E5E5E5` (gray-200)
- Border radius: `8px` (rounded-lg)
- Shadow: `0 1px 3px rgba(0,0,0,0.05)` (subtle)
- Padding: `16px` (p-4)
- Display: `flex items-center justify-center`
- Position: `absolute`

**Typography:**
- Font: Inter sans-serif
- Size: `14px` (text-sm)
- Weight: `500` (medium)
- Color: `#1F2937` (gray-800)
- Text align: `center`
- Line height: `1.4`

**Array Data Structure:**
```tsx
const modules = [
  { 
    label: "Event Activations", 
    position: { x: "left-0", y: "top-10" },
    icon: Zap,
    color: "#C9A961"
  },
  { 
    label: "Live Commerce", 
    position: { x: "right-0", y: "top-10" },
    icon: ShoppingBag,
    color: "#8B9B7E"
  },
  { 
    label: "Audience & Leads", 
    position: { x: "left-0", y: "bottom-10" },
    icon: Users,
    color: "#B8A99A"
  },
  { 
    label: "ROI Analytics", 
    position: { x: "right-0", y: "bottom-10" },
    icon: BarChart3,
    color: "#4A7C59"
  }
];
```

**Motion (Staggered Entry):**
```tsx
{modules.map((module, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, scale: 0.94, y: 8 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.4, 
      delay: 0.5 + (i * 0.12), 
      ease: EASING 
    }}
    className={`absolute ${module.position.x} ${module.position.y} 
      w-48 h-32 bg-white rounded-lg shadow-sm border border-gray-100 
      flex items-center justify-center p-4`}
  >
    <span className="text-sm font-medium text-gray-800">
      {module.label}
    </span>
  </motion.div>
))}
```

**Hover State:**
```tsx
whileHover={{ 
  scale: 1.05,
  y: -4,
  borderColor: module.color,
  boxShadow: `0 8px 24px ${module.color}20`
}}
transition={{ duration: 0.25 }}
```

**Enhanced Card with Icon (Optional):**
```tsx
<motion.div className="...">
  <div className="flex flex-col items-center gap-3">
    <div 
      className="w-10 h-10 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: `${module.color}15` }}
    >
      <module.icon 
        className="w-5 h-5" 
        style={{ color: module.color }}
        strokeWidth={1.5}
      />
    </div>
    <span className="text-sm font-medium text-gray-800 text-center">
      {module.label}
    </span>
  </div>
</motion.div>
```

---

### 5. SVG CONNECTOR LINES (SPOKES)

**Purpose:** Visual connection from each module card to the central hub.

**SVG Container:**
```tsx
<svg 
  className="absolute inset-0 w-full h-full pointer-events-none z-0"
  viewBox="0 0 900 500"
>
```

**Path Calculations:**
- Center point: `(450, 250)` (hub center)
- Top-left card: `(150, 100)` → Path: `M450 250 L150 100`
- Top-right card: `(750, 100)` → Path: `M450 250 L750 100`
- Bottom-left card: `(150, 400)` → Path: `M450 250 L150 400`
- Bottom-right card: `(750, 400)` → Path: `M450 250 L750 400`

**Line Specifications:**
- Stroke: `#E5E5E5` (light gray)
- Stroke width: `1px`
- Stroke linecap: `round`
- Opacity: `0.6` (subtle)

**Animation (Draw-in Effect):**
```tsx
<motion.path 
  d="M450 250 L150 100" 
  stroke="#E5E5E5" 
  strokeWidth="1"
  strokeLinecap="round"
  fill="none"
  initial={{ pathLength: 0, opacity: 0 }} 
  whileInView={{ pathLength: 1, opacity: 0.6 }} 
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.4, ease: EASING }}
/>
```

**Complete SVG Structure:**
```tsx
<svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
  {/* Top-left connector */}
  <motion.path 
    d="M450 250 L150 100" 
    stroke="#E5E5E5" 
    strokeWidth="1" 
    strokeLinecap="round"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }} 
    whileInView={{ pathLength: 1, opacity: 0.6 }} 
    transition={{ duration: 0.8, delay: 0.4 }}
  />
  
  {/* Top-right connector */}
  <motion.path 
    d="M450 250 L750 100" 
    stroke="#E5E5E5" 
    strokeWidth="1" 
    strokeLinecap="round"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }} 
    whileInView={{ pathLength: 1, opacity: 0.6 }} 
    transition={{ duration: 0.8, delay: 0.5 }}
  />
  
  {/* Bottom-left connector */}
  <motion.path 
    d="M450 250 L150 400" 
    stroke="#E5E5E5" 
    strokeWidth="1" 
    strokeLinecap="round"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }} 
    whileInView={{ pathLength: 1, opacity: 0.6 }} 
    transition={{ duration: 0.8, delay: 0.6 }}
  />
  
  {/* Bottom-right connector */}
  <motion.path 
    d="M450 250 L750 400" 
    stroke="#E5E5E5" 
    strokeWidth="1" 
    strokeLinecap="round"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }} 
    whileInView={{ pathLength: 1, opacity: 0.6 }} 
    transition={{ duration: 0.8, delay: 0.7 }}
  />
</svg>
```

---

## 🎬 ANIMATION SEQUENCE TIMELINE

**Total Duration:** ~1.6 seconds

```
0.0s  → Badge fades in (0.4s)
0.1s  → Headline fades in (0.5s)
0.2s  → Subheadline fades in (0.5s)
0.3s  → Central hub scales in (0.6s)
0.4s  → Connector line 1 draws (0.8s)
0.5s  → Connector line 2 draws + Card 1 appears (0.8s + 0.4s)
0.6s  → Connector line 3 draws + Card 2 appears (0.8s + 0.4s)
0.7s  → Connector line 4 draws + Card 3 appears (0.8s + 0.4s)
0.8s  → Card 4 appears (0.4s)
1.2s  → All animations complete
```

**Easing Function:**
```tsx
const EASING = [0.22, 1, 0.36, 1]; // Smooth, premium ease-out
```

---

## 📱 RESPONSIVE BEHAVIOR

### Desktop (≥1024px)
- Container: `max-w-[1200px]`
- Diagram: `w-full max-w-4xl h-[500px]`
- Cards: Full positioning with `absolute`
- Hub: `w-64 h-64` (256px)

### Tablet (768px - 1023px)
- Container: `max-w-[900px]`
- Diagram: `h-[450px]`
- Cards: `w-40 h-28` (slightly smaller)
- Hub: `w-56 h-56` (224px)
- Font sizes: Reduce by 10%

### Mobile (< 768px)
**Switch to Vertical Stack:**
```tsx
<div className="flex flex-col gap-6 md:hidden">
  {/* Center Hub */}
  <div className="w-48 h-48 bg-white rounded-full ...">
    FashionOS
  </div>
  
  {/* Cards in vertical list */}
  {modules.map(module => (
    <div className="w-full h-24 bg-white rounded-lg border ...">
      {module.label}
    </div>
  ))}
</div>
```

**Hide SVG connectors on mobile:**
```tsx
<svg className="hidden md:block absolute inset-0 ...">
```

---

## ♿ ACCESSIBILITY SPECIFICATIONS

### ARIA Labels
```tsx
<section 
  aria-labelledby="solution-heading"
  className="bg-[#FDFDFB] overflow-hidden"
>
  <h2 id="solution-heading" className="...">
    One System. Full Visibility.
  </h2>
  
  <div 
    role="img" 
    aria-label="FashionOS system architecture diagram showing central hub connected to Event Activations, Live Commerce, Audience & Leads, and ROI Analytics modules"
  >
    {/* Diagram content */}
  </div>
</section>
```

### Keyboard Navigation
```tsx
{modules.map((module, i) => (
  <motion.div
    key={i}
    tabIndex={0}
    role="button"
    aria-label={`Learn more about ${module.label}`}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // Handle interaction
      }
    }}
    className="..."
  >
```

### Focus States
```css
.module-card:focus {
  outline: 2px solid #C9A961;
  outline-offset: 4px;
}
```

---

## 🚀 SEQUENTIAL IMPLEMENTATION PROMPTS

Copy these prompts one at a time to implement the section step-by-step:

---

### **PROMPT 1: Section Structure & Header**
```
Update the TheSolution section in /components/pages/SponsorshipPageV2.tsx:

1. Keep existing Section and Container structure
2. Update header section with:
   - Badge: "THE SOLUTION" (uppercase, 10px, tracking-[0.2em], border-[#D4C5B0])
   - Heading: "One System. Full Visibility." (text-5xl serif, text-[#1A1A1A])
   - Subheading: "FashionOS connects event activations, commerce, marketing channels, and ROI reporting — in one unified platform." (text-xl, text-gray-500, max-w-3xl, mx-auto)
3. Add staggered fade-in animations:
   - Badge: opacity 0→1, y -10→0, duration 0.4s
   - Heading: opacity 0→1, y 12→0, duration 0.5s, delay 0.1s
   - Subheading: opacity 0→1, y 12→0, duration 0.5s, delay 0.2s
4. Use viewport={{ once: true }} for all animations
5. Margin bottom mb-20 after header group

Use Motion/React for animations with EASING = [0.22, 1, 0.36, 1]
```

---

### **PROMPT 2: Central Hub Circle**
```
In /components/pages/SponsorshipPageV2.tsx TheSolution section, create the central hub:

1. Create diagram container:
   - relative w-full max-w-4xl h-[500px]
   - flex items-center justify-center
   - Below the header section

2. Inside diagram container, add central hub circle:
   - absolute position (centered with top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2)
   - w-64 h-64 rounded-full
   - bg-white border border-[#F0F0F0]
   - shadow-[0_20px_50px_rgb(0,0,0,0.05)]
   - z-10 (above connectors)
   - flex flex-col items-center justify-center p-6

3. Hub content:
   - "FashionOS" (text-3xl font-serif text-[#1A1A1A] mb-2)
   - "Sponsorship System" (text-[10px] uppercase tracking-widest text-gray-400)

4. Motion animation:
   - initial: opacity 0, scale 0.92
   - animate: opacity 1, scale 1
   - transition: duration 0.6, delay 0.3, ease EASING
   - viewport: once true

5. Hover interaction:
   - whileHover: scale 1.03, boxShadow "0 25px 60px rgba(0,0,0,0.08)"
   - transition: duration 0.3
```

---

### **PROMPT 3: Four Module Cards**
```
In /components/pages/SponsorshipPageV2.tsx TheSolution section, add 4 module cards:

1. Create modules data array before the return statement:
```tsx
const modules = [
  { label: "Event Activations", x: "left-0", y: "top-10" },
  { label: "Live Commerce", x: "right-0", y: "top-10" },
  { label: "Audience & Leads", x: "left-0", y: "bottom-10" },
  { label: "ROI Analytics", x: "right-0", y: "bottom-10" }
];
```

2. Map over modules to create cards:
   - Position: absolute with dynamic className={`absolute ${module.x} ${module.y}`}
   - Size: w-48 h-32
   - Style: bg-white rounded-lg border border-gray-100 shadow-sm
   - Layout: flex items-center justify-center p-4
   - Text: text-sm font-medium text-gray-800 text-center

3. Staggered entry animation:
   - initial: opacity 0, scale 0.94, y 8
   - whileInView: opacity 1, scale 1, y 0
   - transition: duration 0.4, delay 0.5 + (i * 0.12), ease EASING
   - viewport: once true

4. Hover state:
   - whileHover: scale 1.05, y -4, borderColor "#C9A961"
   - transition: duration 0.25

5. Place cards in the diagram container (same level as central hub)
```

---

### **PROMPT 4: SVG Connector Lines**
```
In /components/pages/SponsorshipPageV2.tsx TheSolution section, add SVG connector spokes:

1. Add SVG container BEFORE the central hub (lower z-index):
   - <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
   - No viewBox needed, use percentage-based paths

2. Create 4 motion.path elements with these exact paths:
   - Top-left: d="M450 250 L150 100"
   - Top-right: d="M450 250 L750 100"
   - Bottom-left: d="M450 250 L150 400"
   - Bottom-right: d="M450 250 L750 400"

3. Path styling (all 4):
   - stroke="#E5E5E5"
   - strokeWidth="1"
   - strokeLinecap="round"
   - fill="none"

4. Draw-in animation (stagger each):
   - initial: pathLength 0, opacity 0
   - whileInView: pathLength 1, opacity 0.6
   - transition delays: 0.4s, 0.5s, 0.6s, 0.7s (respective paths)
   - duration: 0.8s each
   - viewport: once true

Keep existing central hub and cards. Lines should draw from center outward before cards appear.
```

---

### **PROMPT 5: Enhanced Cards with Icons**
```
Enhance the module cards in /components/pages/SponsorshipPageV2.tsx:

1. Import additional icons at top:
   - Zap, ShoppingBag, Users, BarChart3 from lucide-react

2. Update modules array with icons and colors:
```tsx
const modules = [
  { label: "Event Activations", x: "left-0", y: "top-10", icon: Zap, color: "#C9A961" },
  { label: "Live Commerce", x: "right-0", y: "top-10", icon: ShoppingBag, color: "#8B9B7E" },
  { label: "Audience & Leads", x: "left-0", y: "bottom-10", icon: Users, color: "#B8A99A" },
  { label: "ROI Analytics", x: "right-0", y: "bottom-10", icon: BarChart3, color: "#4A7C59" }
];
```

3. Update card content structure:
```tsx
<motion.div className="...">
  <div className="flex flex-col items-center gap-3">
    {/* Icon container */}
    <div 
      className="w-10 h-10 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: `${module.color}15` }}
    >
      <module.icon 
        className="w-5 h-5" 
        style={{ color: module.color }}
        strokeWidth={1.5}
      />
    </div>
    {/* Label */}
    <span className="text-sm font-medium text-gray-800 text-center">
      {module.label}
    </span>
  </div>
</motion.div>
```

4. Update hover to use dynamic color:
   - whileHover: borderColor module.color, boxShadow `0 8px 24px ${module.color}20`
```

---

### **PROMPT 6: Responsive Mobile Layout**
```
Add mobile responsive behavior to TheSolution section:

1. Wrap the diagram container with responsive visibility:
   - Add className="hidden md:flex" to the diagram (h-[500px] container)

2. Create mobile-only vertical layout after the header:
```tsx
<div className="flex md:hidden flex-col gap-6 w-full max-w-sm mx-auto">
  {/* Central Hub - Mobile */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="w-48 h-48 mx-auto bg-white rounded-full shadow-lg border border-[#F0F0F0] flex flex-col items-center justify-center"
  >
    <div className="text-2xl font-serif text-[#1A1A1A] mb-2">FashionOS</div>
    <div className="text-[10px] uppercase tracking-widest text-gray-400">System</div>
  </motion.div>

  {/* Module Cards - Stacked */}
  {modules.map((module, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
      className="w-full h-20 bg-white rounded-lg border border-gray-100 shadow-sm flex items-center justify-center gap-3 px-4"
    >
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${module.color}15` }}
      >
        <module.icon className="w-5 h-5" style={{ color: module.color }} strokeWidth={1.5} />
      </div>
      <span className="text-sm font-medium text-gray-800">{module.label}</span>
    </motion.div>
  ))}
</div>
```

3. This creates a clean vertical stack on mobile while preserving the spoke diagram on desktop
```

---

### **PROMPT 7: Accessibility & ARIA**
```
Add accessibility features to TheSolution section:

1. Add section-level ARIA:
```tsx
<Section 
  className="bg-[#FDFDFB] overflow-hidden"
  aria-labelledby="solution-heading"
>
```

2. Add ID to heading:
```tsx
<Heading id="solution-heading">One System. Full Visibility.</Heading>
```

3. Add diagram description:
```tsx
<div 
  className="relative w-full max-w-4xl h-[500px] flex items-center justify-center"
  role="img"
  aria-label="FashionOS system architecture diagram showing central hub connected to Event Activations, Live Commerce, Audience & Leads, and ROI Analytics modules"
>
```

4. Make module cards keyboard accessible:
```tsx
<motion.div
  // ... existing props
  tabIndex={0}
  role="button"
  aria-label={`Learn more about ${module.label} module`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      console.log(`${module.label} activated`);
      // Add modal/drawer logic here
    }
  }}
  className="... focus:outline-2 focus:outline-[#C9A961] focus:outline-offset-4"
>
```

5. Add screen reader text for SVG:
```tsx
<svg className="..." aria-hidden="true">
```
```

---

### **PROMPT 8: Performance Optimization**
```
Optimize TheSolution section performance:

1. Add useRef and useInView for viewport detection:
```tsx
const sectionRef = useRef(null);
const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
```

2. Apply to section:
```tsx
<Section ref={sectionRef} className="bg-[#FDFDFB] overflow-hidden">
```

3. Conditionally trigger animations only when in view:
   - Replace all whileInView with animate={isInView ? {...} : {}}
   - Remove viewport={{ once: true }} from individual elements

4. Add will-change hints to frequently animated elements:
```tsx
<motion.div
  style={{ willChange: isInView ? "transform, opacity" : "auto" }}
  // ... rest of props
>
```

5. Lazy load icons if needed (optional):
```tsx
const modules = [
  { label: "Event Activations", icon: lazy(() => import('lucide-react').then(m => ({ default: m.Zap }))), ... }
];
```

This reduces unnecessary animation calculations when section is off-screen.
```

---

### **PROMPT 9: Add Micro-interactions**
```
Add subtle micro-interactions to TheSolution section:

1. Pulse effect on central hub (idle state):
```tsx
<motion.div
  className="... central hub"
  animate={{
    boxShadow: [
      "0 20px 50px rgba(0,0,0,0.05)",
      "0 20px 50px rgba(201,169,97,0.15)",
      "0 20px 50px rgba(0,0,0,0.05)"
    ]
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
```

2. Connector line pulse on card hover:
   - Add state: const [hoveredCard, setHoveredCard] = useState(null);
   - On card: onHoverStart={() => setHoveredCard(i)} onHoverEnd={() => setHoveredCard(null)}
   - On matching path: animate={{ opacity: hoveredCard === i ? 1 : 0.6, strokeWidth: hoveredCard === i ? 2 : 1 }}

3. Sequential card glow on hub hover:
```tsx
<motion.div
  className="... central hub"
  onHoverStart={() => {
    // Trigger sequential card highlights
  }}
>
```

4. Add cursor: pointer to interactive elements

5. Smooth color transitions on all hover states (duration 0.25s)
```

---

### **PROMPT 10: Progress Tracker Component**
```
Create a visual progress tracker at the top of the section:

1. Add after the header, before the diagram:
```tsx
{/* Progress Tracker */}
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
  className="flex items-center justify-center gap-4 mb-16"
>
  {["Event", "Commerce", "Audience", "Analytics"].map((label, i) => (
    <div key={i} className="flex items-center gap-2">
      <motion.div
        className="w-8 h-8 rounded-full border-2 border-[#D4C5B0] flex items-center justify-center text-xs font-bold text-gray-600"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
      >
        {i + 1}
      </motion.div>
      <span className="text-xs uppercase tracking-wider text-gray-400 hidden md:inline">
        {label}
      </span>
      {i < 3 && (
        <motion.div
          className="w-12 h-[2px] bg-[#E5E5E5]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
          style={{ originX: 0 }}
        />
      )}
    </div>
  ))}
</motion.div>
```

2. Shows the 4-step system visually
3. Animates in sequence after header
4. Responsive: hides labels on mobile, shows only numbered circles
```

---

## 🎨 DESIGN TOKENS REFERENCE

### Colors
```tsx
const COLORS = {
  ivory: "#FDFDFB",        // Background
  charcoal: "#1A1A1A",     // Primary text
  sand: "#D4C5B0",         // Accent (badges, borders)
  warmGray: "#8C8070",     // Badge text
  lightGray: "#E5E5E5",    // Connectors, borders
  white: "#FFFFFF",        // Cards, hub
  
  // Module colors
  eventActivations: "#C9A961",
  liveCommerce: "#8B9B7E",
  audienceLeads: "#B8A99A",
  roiAnalytics: "#4A7C59"
};
```

### Typography
```tsx
const TYPOGRAPHY = {
  badge: {
    size: "10px",
    spacing: "0.2em",
    weight: "bold",
    transform: "uppercase"
  },
  headline: {
    size: { mobile: "48px", desktop: "56px" },
    family: "Georgia, serif",
    weight: "400",
    lineHeight: "1.15"
  },
  subheadline: {
    size: { mobile: "18px", desktop: "20px" },
    family: "Inter, sans-serif",
    weight: "300",
    lineHeight: "1.6"
  },
  cardLabel: {
    size: "14px",
    weight: "500",
    lineHeight: "1.4"
  }
};
```

### Spacing
```tsx
const SPACING = {
  sectionPadding: "112px", // py-28
  headerMargin: "80px",    // mb-20
  cardGap: "24px",
  diagramHeight: "500px"
};
```

### Shadows
```tsx
const SHADOWS = {
  hub: "0 20px 50px rgba(0,0,0,0.05)",
  hubHover: "0 25px 60px rgba(0,0,0,0.08)",
  card: "0 1px 3px rgba(0,0,0,0.05)",
  cardHover: (color) => `0 8px 24px ${color}20`
};
```

### Motion
```tsx
const MOTION = {
  easing: [0.22, 1, 0.36, 1],
  duration: {
    fast: 0.25,
    medium: 0.4,
    slow: 0.6,
    connector: 0.8
  },
  delays: {
    badge: 0,
    heading: 0.1,
    subheading: 0.2,
    hub: 0.3,
    connector: [0.4, 0.5, 0.6, 0.7],
    cards: [0.5, 0.62, 0.74, 0.86]
  }
};
```

---

## 📊 TECHNICAL SPECIFICATIONS

### Dependencies
```json
{
  "motion/react": "^11.x",
  "lucide-react": "latest",
  "react": "^18.x"
}
```

### Imports Required
```tsx
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Zap, ShoppingBag, Users, BarChart3 } from "lucide-react";
```

### File Structure
```
/components/pages/SponsorshipPageV2.tsx
  ├─ TheSolution Component (lines 186-266)
  │  ├─ Header Section
  │  ├─ Diagram Container
  │  │  ├─ SVG Connectors (z-0)
  │  │  ├─ Central Hub (z-10)
  │  │  └─ Module Cards (absolute positioned)
  │  └─ Mobile Vertical Layout
```

---

## ✅ COMPLETION CHECKLIST

Use this to verify implementation:

### Structure
- [ ] Section has bg-[#FDFDFB] and overflow-hidden
- [ ] Container uses flex-col and items-center
- [ ] Header section includes Badge, Heading, Subheading
- [ ] Diagram container is relative with h-[500px]
- [ ] Mobile layout hidden on desktop, visible on mobile

### Central Hub
- [ ] Circle is 256px × 256px (w-64 h-64)
- [ ] White background with subtle border
- [ ] Contains "FashionOS" and "Sponsorship System" text
- [ ] Centered with absolute positioning
- [ ] Scale-in animation from 0.92 to 1
- [ ] Hover effect scales to 1.03

### Module Cards
- [ ] Four cards positioned at corners
- [ ] Each card is 192px × 128px (w-48 h-32)
- [ ] Contains icon + label
- [ ] Staggered entry animation
- [ ] Hover lifts card up 4px
- [ ] Border color changes to module color on hover

### SVG Connectors
- [ ] Four paths from center to cards
- [ ] Light gray (#E5E5E5) color
- [ ] Draw-in animation with pathLength
- [ ] Staggered delays (0.4s, 0.5s, 0.6s, 0.7s)
- [ ] Behind hub and cards (z-0)

### Animations
- [ ] Badge fades in first
- [ ] Heading and subheading stagger after
- [ ] Hub appears before connectors
- [ ] Connectors draw before cards appear
- [ ] Cards appear in clockwise sequence
- [ ] All use EASING = [0.22, 1, 0.36, 1]

### Responsive
- [ ] Desktop shows spoke diagram
- [ ] Mobile shows vertical stack
- [ ] SVG hidden on mobile
- [ ] Typography scales appropriately
- [ ] Touch targets minimum 44px

### Accessibility
- [ ] Section has aria-labelledby
- [ ] Heading has unique ID
- [ ] Diagram has role="img" and aria-label
- [ ] Cards are keyboard focusable (tabIndex={0})
- [ ] Focus states visible (outline)
- [ ] SVG has aria-hidden="true"

### Performance
- [ ] useInView limits animation to viewport
- [ ] once: true prevents re-animation
- [ ] will-change hints on animated elements
- [ ] No layout shift during animations
- [ ] Smooth 60fps performance

---

## 🎯 SUCCESS CRITERIA

The section is complete when:

1. ✅ Visual fidelity matches the screenshot exactly
2. ✅ Animation sequence flows smoothly (1.6s total)
3. ✅ Hover states feel premium and responsive
4. ✅ Mobile layout is clean and functional
5. ✅ Keyboard navigation works perfectly
6. ✅ Performance is 60fps on mid-range devices
7. ✅ Code is clean, readable, and maintainable
8. ✅ All design tokens are consistently applied

---

## 📚 RELATED DOCUMENTATION

- Main spec: `/docs/sponsorship-v2-spec.md`
- Motion tokens: Section 3.2
- Color palette: Section 2.1
- Typography scale: Section 2.2
- Component library: `/components/sections/`

---

**Last Updated:** December 20, 2024  
**Version:** 1.0  
**Author:** FashionOS Design Team
