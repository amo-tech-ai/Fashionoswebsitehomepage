# FASHIONOS — COMPLETE STYLE GUIDE & DESIGN SYSTEM

**Version:** 1.0  
**Last Updated:** December 22, 2024  
**Platform:** React + TypeScript + Tailwind CSS v4.0  
**Framework:** Vite

---

## TABLE OF CONTENTS

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Buttons](#buttons)
7. [Forms & Inputs](#forms--inputs)
8. [Cards](#cards)
9. [Navigation](#navigation)
10. [Dashboards](#dashboards)
11. [Wizards](#wizards)
12. [Marketing Pages](#marketing-pages)
13. [Animations](#animations)
14. [Icons](#icons)
15. [Best Practices](#best-practices)

---

## DESIGN PHILOSOPHY

### Core Principles

```
1. CLARITY OVER COMPLEXITY
   - Simple, intuitive interfaces
   - Clear visual hierarchy
   - Obvious interactive elements

2. CONSISTENCY EVERYWHERE
   - Reusable component patterns
   - Predictable behavior
   - Unified design language

3. PERFORMANCE FIRST
   - Lightweight components
   - Optimized animations
   - Fast load times

4. ACCESSIBILITY ALWAYS
   - WCAG 2.1 AAA compliance
   - Keyboard navigation
   - Screen reader support

5. MOBILE-RESPONSIVE
   - Mobile-first approach
   - Touch-friendly targets (44px min)
   - Adaptive layouts
```

### Design Contexts

```
MARKETING PAGES
- Goal: Convert visitors into customers
- Style: Editorial, high-impact visuals
- Typography: Serif headlines, sans-serif body
- Spacing: Generous whitespace

DASHBOARDS
- Goal: Efficient data visualization and actions
- Style: Clean, minimal, data-dense
- Typography: Sans-serif throughout
- Spacing: Compact, functional

WIZARDS
- Goal: Guide users through complex processes
- Style: Step-by-step, progressive disclosure
- Typography: Clear labels, helpful hints
- Spacing: Focused, single-task layouts
```

---

## COLOR SYSTEM

### Brand Colors

```css
/* Primary Palette */
--color-beige: rgb(245, 242, 237);      /* #F5F2ED - Warm background */
--color-charcoal: rgb(31, 33, 37);      /* #1F2125 - Dark accents */
--color-soft-gray: rgb(246, 246, 246);  /* #F6F6F6 - Subtle background */

/* Semantic Colors */
--color-black: #000000;                 /* Pure black */
--color-white: #FFFFFF;                 /* Pure white */
--color-text-primary: #1a1a1a;          /* Near black for text */
--color-text-secondary: #666666;        /* Gray for secondary text */
--color-text-tertiary: #999999;         /* Light gray for tertiary */
```

### Tailwind Color Usage

```typescript
// Background Colors
bg-white              // Pure white backgrounds
bg-[#F5F2ED]         // Beige (marketing pages)
bg-[#F6F6F6]         // Soft gray (subtle backgrounds)
bg-black             // Black (headers, CTAs)
bg-gray-50           // Lightest gray
bg-gray-100          // Very light gray
bg-gray-900          // Near black

// Text Colors
text-gray-900        // Primary text (#111827)
text-gray-700        // Secondary text (#374151)
text-gray-600        // Tertiary text (#4B5563)
text-gray-500        // Muted text (#6B7280)
text-gray-400        // Placeholder text (#9CA3AF)
text-black           // Pure black emphasis
text-white           // White on dark backgrounds

// Border Colors
border-gray-200      // Default borders (#E5E7EB)
border-gray-300      // Slightly darker borders
border-white/50      // Semi-transparent white
border-black/10      // Semi-transparent black
```

### Dashboard-Specific Colors

```typescript
// Status Colors
bg-emerald-50        // Success background
text-emerald-600     // Success text
border-emerald-200   // Success border

bg-amber-50          // Warning background
text-amber-600       // Warning text
border-amber-200     // Warning border

bg-red-50            // Error background
text-red-600         // Error text
border-red-200       // Error border

bg-blue-50           // Info background
text-blue-600        // Info text
border-blue-200      // Info border

bg-indigo-600        // Primary action
hover:bg-indigo-700  // Primary action hover
```

### Marketing-Specific Colors

```typescript
// E-commerce Photography
bg-white             // Clean, minimal
bg-gray-900          // Dark sections (quote, hero)
text-gray-500        // Muted copy

// Web Design Services
bg-[#F8F5F1]        // Warm beige background
bg-black             // CTAs, emphasis
text-gray-600        // Body text

// Video Production
bg-black             // Cinematic hero
bg-white             // Content sections
accent: #FF3366      // Vibrant pink/red (CTAs)
```

### Color Contrast Guidelines

```
AAA Compliance:
- Body text: 7:1 minimum contrast ratio
- Large text (18pt+): 4.5:1 minimum
- UI elements: 3:1 minimum

Examples (Pass AAA):
✓ #000000 on #FFFFFF (21:1)
✓ #1a1a1a on #FFFFFF (17.9:1)
✓ #666666 on #FFFFFF (5.74:1)
✓ #FFFFFF on #000000 (21:1)

Examples (Fail):
✗ #999999 on #FFFFFF (2.85:1) - Too low for body text
✗ #CCCCCC on #FFFFFF (1.61:1) - Too low for any text
```

---

## TYPOGRAPHY

### Font Families

```css
/* Serif (Headlines) */
font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;

/* Sans-Serif (Body & UI) */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", 
             "Helvetica Neue", Arial, sans-serif;
```

### Type Scale (Desktop)

```css
/* Marketing Pages */
h1 {
  font-family: serif;
  font-size: 4.5rem;        /* 72px */
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.02em;  /* tracking-tight */
}

h2 {
  font-family: serif;
  font-size: 3rem;          /* 48px */
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.02em;
}

h3 {
  font-family: serif;
  font-size: 2rem;          /* 32px */
  line-height: 1.25;
  font-weight: 600;
}

h4 {
  font-family: sans-serif;
  font-size: 1.5rem;        /* 24px */
  line-height: 1.4;
  font-weight: 500;
}

p {
  font-family: sans-serif;
  font-size: 1rem;          /* 16px */
  line-height: 1.75;        /* 28px */
  font-weight: 400;
}

/* Dashboards */
Dashboard h1 {
  font-family: sans-serif;
  font-size: 1.25rem;       /* 20px */
  line-height: 1.4;
  font-weight: 600;
}

Dashboard body {
  font-size: 0.875rem;      /* 14px */
  line-height: 1.5;
}
```

### Type Scale (Mobile)

```css
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;      /* 40px */
  }
  
  h2 {
    font-size: 2rem;        /* 32px */
  }

  h3 {
    font-size: 1.5rem;      /* 24px */
  }
}
```

### Tailwind Typography Classes

```typescript
// Headlines (Marketing)
className="text-7xl font-serif tracking-tight"       // Hero (desktop)
className="text-5xl font-serif tracking-tight"       // H1 (desktop)
className="text-4xl font-serif"                      // H2
className="text-3xl font-serif"                      // H3
className="text-2xl font-serif"                      // H4

// Headlines (Dashboards)
className="text-xl font-serif"                       // Dashboard title
className="text-lg font-medium"                      // Section heading
className="text-base font-medium"                    // Card heading

// Body Text
className="text-xl font-light text-gray-600"        // Large body (marketing)
className="text-lg leading-relaxed"                 // Medium body
className="text-base"                                // Default body
className="text-sm text-gray-600"                    // Small text
className="text-xs uppercase tracking-widest"        // Micro text / labels

// Special
className="font-light"                               // Thin weight (marketing)
className="font-normal"                              // Regular (400)
className="font-medium"                              // Medium (500)
className="font-semibold"                            // Semibold (600)
className="font-bold"                                // Bold (700)

className="italic"                                   // Italic
className="tracking-tight"                           // Tight letter spacing
className="tracking-wide"                            // Wide letter spacing
className="tracking-widest"                          // Widest (labels)
className="leading-tight"                            // Tight line height
className="leading-relaxed"                          // Relaxed line height
```

### Typography Patterns

```typescript
// Marketing Hero Headline
<h1 className="text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight text-gray-900">
  Fashion E-Commerce <br/>
  <span className="italic text-gray-400">Web Design</span>
</h1>

// Marketing Subheadline
<p className="text-xl font-light text-gray-600 max-w-lg leading-relaxed">
  Beautiful, fast, conversion-driven experiences for modern brands.
</p>

// Dashboard Title
<h1 className="font-serif text-xl text-black">
  Event Command Center
</h1>

// Dashboard Section
<h2 className="text-lg font-medium text-gray-900 mb-4">
  Critical Blockers
</h2>

// Card Title
<h3 className="text-base font-medium text-gray-900">
  Studio Booking
</h3>

// Label / Eyebrow
<div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">
  In Progress
</div>

// Micro Label
<span className="text-xs text-gray-400">
  Last updated 2 hours ago
</span>
```

---

## SPACING & LAYOUT

### Spacing Scale

```typescript
// Tailwind Spacing (4px base unit)
gap-1   // 4px
gap-2   // 8px
gap-3   // 12px
gap-4   // 16px   ← Most common
gap-6   // 24px   ← Card padding
gap-8   // 32px   ← Section spacing
gap-12  // 48px   ← Large section spacing
gap-16  // 64px   ← Page section spacing
gap-20  // 80px
gap-24  // 96px   ← Major section spacing

// Padding patterns
p-4     // 16px - Compact card
p-6     // 24px - Default card
p-8     // 32px - Spacious card
p-12    // 48px - Marketing card

// Margin patterns
mb-4    // 16px - Element spacing
mb-8    // 32px - Section spacing
mb-16   // 64px - Major section spacing
```

### Container System

```typescript
// Marketing Pages
<div className="container mx-auto px-6 lg:px-12 max-w-7xl">
  {/* Content */}
</div>

// Dashboards
<div className="max-w-7xl mx-auto px-6 pb-20">
  {/* Content */}
</div>

// Wizards (Centered)
<div className="max-w-3xl mx-auto px-6">
  {/* Content */}
</div>

// Forms (Narrow)
<div className="max-w-lg mx-auto px-6">
  {/* Content */}
</div>
```

### Grid Patterns

```typescript
// 2 Column (50/50)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  <div>{/* Left */}</div>
  <div>{/* Right */}</div>
</div>

// 3 Column (Services, Pricing)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>

// 4 Column (Portfolio)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>

// 12 Column (Complex layouts)
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 lg:col-span-8">{/* Main */}</div>
  <div className="col-span-12 lg:col-span-4">{/* Sidebar */}</div>
</div>

// Dashboard Grid (Auto-fit)
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {/* Auto-responsive */}
</div>
```

### Responsive Breakpoints

```typescript
// Tailwind Breakpoints
sm:   640px   // Large mobile
md:   768px   // Tablet
lg:   1024px  // Desktop
xl:   1280px  // Large desktop
2xl:  1536px  // Extra large

// Usage
<div className="
  text-4xl          /* Mobile: 36px */
  md:text-5xl       /* Tablet: 48px */
  lg:text-6xl       /* Desktop: 60px */
  xl:text-7xl       /* Large: 72px */
">
  Headline
</div>

<div className="
  grid-cols-1       /* Mobile: 1 column */
  md:grid-cols-2    /* Tablet: 2 columns */
  lg:grid-cols-3    /* Desktop: 3 columns */
">
```

---

## COMPONENTS

### Component Architecture

```typescript
// File Structure
/components
  /shared           // Reusable UI components
    /Button.tsx
    /Card.tsx
    /Modal.tsx
    /Input.tsx
  /dashboards       // Dashboard-specific
  /wizards          // Wizard-specific
  /marketing        // Marketing page components

// Component Pattern
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled,
  className = ''
}: ButtonProps) {
  // Implementation
}
```

---

## BUTTONS

### Button Variants

```typescript
// Primary Button (Marketing)
<button className="
  bg-black text-white 
  px-8 py-4 
  rounded-full 
  hover:bg-gray-800 
  transition-all duration-300
  shadow-lg shadow-gray-900/20
  group
">
  Get Started
  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
</button>

// Secondary Button (Marketing)
<button className="
  bg-white border border-gray-200 
  text-gray-900 
  px-8 py-4 
  rounded-full 
  hover:bg-gray-50 
  transition-all
  shadow-sm
">
  Learn More
</button>

// Primary Button (Dashboard)
<button className="
  bg-indigo-600 text-white 
  px-4 py-2 
  rounded-md 
  hover:bg-indigo-700 
  transition-colors
  text-sm font-medium
">
  Create Event
</button>

// Outline Button (Dashboard)
<button className="
  border border-gray-300 
  text-gray-700 
  px-4 py-2 
  rounded-md 
  hover:bg-gray-50 
  transition-colors
  text-sm
">
  Cancel
</button>

// Ghost Button
<button className="
  text-gray-600 
  hover:text-gray-900 
  hover:bg-gray-100 
  px-3 py-2 
  rounded-md 
  transition-colors
  text-sm
">
  Edit
</button>

// Icon Button
<button className="
  p-2 
  hover:bg-gray-100 
  rounded-md 
  transition-colors
">
  <X className="w-4 h-4" />
</button>

// Destructive Button
<button className="
  bg-red-600 text-white 
  px-4 py-2 
  rounded-md 
  hover:bg-red-700 
  transition-colors
">
  Delete
</button>
```

### Button Sizes

```typescript
// Small
className="px-3 py-1.5 text-xs"

// Medium (Default)
className="px-4 py-2 text-sm"

// Large
className="px-6 py-3 text-base"

// Extra Large (Marketing)
className="px-8 py-4 text-base"
```

### Button States

```typescript
// Disabled
<button 
  disabled 
  className="
    bg-gray-300 text-gray-500 
    cursor-not-allowed 
    opacity-50
  "
>
  Disabled
</button>

// Loading
<button 
  disabled 
  className="
    bg-indigo-600 text-white 
    flex items-center gap-2
  "
>
  <Loader2 className="w-4 h-4 animate-spin" />
  Processing...
</button>

// Active/Selected
<button className="
  bg-indigo-100 text-indigo-700 
  border border-indigo-200
">
  Active
</button>
```

### Button Best Practices

```typescript
✓ Use semantic HTML <button> tags
✓ Include aria-label for icon-only buttons
✓ Minimum 44x44px touch target on mobile
✓ Provide loading/disabled states
✓ Clear hover/focus states
✓ Use button elements for actions, links for navigation
✓ Group related actions (primary + secondary)

Example:
<div className="flex gap-4">
  <button className="primary-button">
    Save Changes
  </button>
  <button className="secondary-button">
    Cancel
  </button>
</div>
```

---

## FORMS & INPUTS

### Input Fields

```typescript
// Text Input
<input 
  type="text"
  className="
    w-full 
    px-4 py-2.5 
    border border-gray-300 
    rounded-md 
    focus:outline-none 
    focus:ring-2 
    focus:ring-indigo-500 
    focus:border-indigo-500
    text-base
    placeholder:text-gray-400
  "
  placeholder="Enter event name"
/>

// Text Input (Dashboard style)
<input 
  type="text"
  className="
    w-full 
    px-3 py-2 
    border border-gray-300 
    rounded-md 
    text-sm
    focus:outline-none 
    focus:ring-1 
    focus:ring-indigo-500
  "
/>

// Textarea
<textarea 
  className="
    w-full 
    px-4 py-3 
    border border-gray-300 
    rounded-md 
    focus:outline-none 
    focus:ring-2 
    focus:ring-indigo-500
    min-h-[120px]
    resize-y
  "
/>

// Select Dropdown
<select 
  className="
    w-full 
    px-4 py-2.5 
    border border-gray-300 
    rounded-md 
    focus:outline-none 
    focus:ring-2 
    focus:ring-indigo-500
    bg-white
    cursor-pointer
  "
>
  <option>Select an option</option>
  <option value="1">Option 1</option>
</select>
```

### Input with Label

```typescript
<div className="space-y-2">
  <label 
    htmlFor="event-name" 
    className="block text-sm font-medium text-gray-700"
  >
    Event Name
  </label>
  <input 
    id="event-name"
    type="text" 
    className="input-class"
  />
  <p className="text-xs text-gray-500">
    This will appear on all event materials
  </p>
</div>
```

### Input States

```typescript
// Error State
<div className="space-y-2">
  <input 
    className="
      w-full px-4 py-2.5 
      border-2 border-red-500 
      rounded-md 
      focus:outline-none 
      focus:ring-2 
      focus:ring-red-500
    "
  />
  <p className="text-sm text-red-600 flex items-center gap-1">
    <AlertCircle className="w-4 h-4" />
    This field is required
  </p>
</div>

// Success State
<div className="space-y-2">
  <input 
    className="
      w-full px-4 py-2.5 
      border-2 border-emerald-500 
      rounded-md
    "
  />
  <p className="text-sm text-emerald-600 flex items-center gap-1">
    <Check className="w-4 h-4" />
    Looks good!
  </p>
</div>

// Disabled State
<input 
  disabled 
  className="
    w-full px-4 py-2.5 
    border border-gray-200 
    rounded-md 
    bg-gray-50 
    text-gray-500 
    cursor-not-allowed
  "
/>
```

### Checkbox & Radio

```typescript
// Checkbox
<label className="flex items-center gap-3 cursor-pointer">
  <input 
    type="checkbox" 
    className="
      w-4 h-4 
      text-indigo-600 
      border-gray-300 
      rounded 
      focus:ring-indigo-500
    "
  />
  <span className="text-sm text-gray-700">
    I agree to the terms and conditions
  </span>
</label>

// Radio Group
<div className="space-y-3">
  {options.map(option => (
    <label key={option.id} className="flex items-center gap-3 cursor-pointer">
      <input 
        type="radio" 
        name="option-group"
        value={option.id}
        className="
          w-4 h-4 
          text-indigo-600 
          border-gray-300 
          focus:ring-indigo-500
        "
      />
      <span className="text-sm text-gray-700">
        {option.label}
      </span>
    </label>
  ))}
</div>
```

### Form Layouts

```typescript
// Single Column Form
<form className="max-w-lg mx-auto space-y-6">
  {/* Form fields */}
</form>

// Two Column Form
<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>{/* Field 1 */}</div>
  <div>{/* Field 2 */}</div>
  <div className="md:col-span-2">{/* Full width field */}</div>
</form>

// Inline Form
<form className="flex gap-3">
  <input className="flex-1" placeholder="Enter email" />
  <button className="px-6">Subscribe</button>
</form>
```

---

## CARDS

### Card Variants

```typescript
// Basic Card (Marketing)
<div className="
  bg-white 
  border border-gray-200 
  rounded-xl 
  p-6 
  hover:shadow-lg 
  transition-shadow duration-300
">
  <h3 className="text-xl font-medium mb-2">Card Title</h3>
  <p className="text-gray-600">Card content</p>
</div>

// Featured Card (Marketing)
<div className="
  bg-black text-white 
  rounded-2xl 
  p-10 
  shadow-2xl
  hover:-translate-y-1 
  transition-transform duration-500
">
  <h3 className="text-3xl font-bold mb-6">Featured Card</h3>
  <p className="text-gray-300">Premium content</p>
</div>

// Dashboard Card
<div className="
  bg-white 
  border border-gray-200 
  rounded-lg 
  p-6
">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-base font-medium text-gray-900">Stats</h3>
    <span className="text-sm text-gray-500">This month</span>
  </div>
  <div className="space-y-4">
    {/* Card content */}
  </div>
</div>

// Interactive Card (Portfolio)
<div className="
  group 
  relative 
  overflow-hidden 
  rounded-lg 
  cursor-pointer
">
  <img 
    src="/image.jpg" 
    alt="Project"
    className="
      w-full h-full 
      object-cover 
      transition-transform duration-700 
      group-hover:scale-105
    "
  />
  <div className="
    absolute inset-0 
    bg-black/0 
    group-hover:bg-black/70 
    transition-colors duration-300
    flex items-center justify-center
  ">
    <div className="
      opacity-0 
      group-hover:opacity-100 
      transition-opacity
      text-white text-center
    ">
      <h3 className="text-xl font-serif mb-2">Project Name</h3>
      <p className="text-sm">View Case Study →</p>
    </div>
  </div>
</div>

// Stat Card
<div className="
  bg-gradient-to-br from-indigo-50 to-white 
  border border-indigo-100 
  rounded-lg 
  p-6
">
  <div className="text-xs text-indigo-600 uppercase tracking-widest font-bold mb-2">
    Total Revenue
  </div>
  <div className="text-3xl font-bold text-gray-900 mb-1">
    $124,500
  </div>
  <div className="text-sm text-emerald-600 flex items-center gap-1">
    <TrendingUp className="w-4 h-4" />
    +12.5% from last month
  </div>
</div>
```

### Card Patterns

```typescript
// Card with Icon
<div className="bg-white border border-gray-200 rounded-xl p-6">
  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
    <Icon className="w-6 h-6 text-indigo-600" />
  </div>
  <h3 className="text-lg font-medium mb-2">Feature Name</h3>
  <p className="text-sm text-gray-600">Feature description</p>
</div>

// Card with Image
<div className="bg-white rounded-xl overflow-hidden shadow-sm">
  <div className="aspect-video bg-gray-100">
    <img src="/image.jpg" alt="" className="w-full h-full object-cover" />
  </div>
  <div className="p-6">
    <h3 className="text-lg font-medium mb-2">Card Title</h3>
    <p className="text-sm text-gray-600">Description</p>
  </div>
</div>

// Card with Header & Footer
<div className="bg-white border border-gray-200 rounded-lg">
  <div className="px-6 py-4 border-b border-gray-200">
    <h3 className="text-base font-medium">Header</h3>
  </div>
  <div className="p-6">
    {/* Content */}
  </div>
  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
    <button className="text-sm text-indigo-600">Action</button>
  </div>
</div>
```

---

## NAVIGATION

### Header (Marketing)

```typescript
<header className="
  fixed top-0 left-0 right-0 z-50 
  bg-white/90 backdrop-blur-md 
  border-b border-gray-200
">
  <div className="container mx-auto px-6 lg:px-12">
    <div className="flex items-center justify-between h-20">
      {/* Logo */}
      <a href="/" className="text-2xl tracking-tight font-serif">
        FashionOS
      </a>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-10">
        <a href="#services" className="text-sm text-gray-700 hover:text-black">
          Services
        </a>
        {/* More links */}
      </nav>

      {/* CTAs */}
      <div className="hidden lg:flex items-center gap-4">
        <button className="text-sm">Log In</button>
        <button className="bg-black text-white px-6 py-3 rounded-full">
          Sign Up
        </button>
      </div>

      {/* Mobile Menu */}
      <button className="lg:hidden">
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </div>
</header>
```

### Sidebar (Dashboard)

```typescript
<aside className="
  w-64 
  bg-white 
  border-r border-gray-200 
  h-screen 
  fixed left-0 top-0
  overflow-y-auto
">
  {/* Logo */}
  <div className="h-16 border-b border-gray-200 flex items-center px-6">
    <span className="font-serif text-xl">FashionOS</span>
  </div>

  {/* Navigation */}
  <nav className="p-4 space-y-1">
    <a 
      href="/dashboard" 
      className="
        flex items-center gap-3 
        px-3 py-2 
        rounded-md 
        bg-indigo-50 text-indigo-700 
        font-medium text-sm
      "
    >
      <Home className="w-4 h-4" />
      Dashboard
    </a>
    
    <a 
      href="/events" 
      className="
        flex items-center gap-3 
        px-3 py-2 
        rounded-md 
        text-gray-700 
        hover:bg-gray-50 
        text-sm
      "
    >
      <Calendar className="w-4 h-4" />
      Events
    </a>
  </nav>
</aside>
```

### Breadcrumbs

```typescript
<nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
  <a href="/events" className="hover:text-indigo-600">Events</a>
  <ChevronRight className="w-3 h-3" />
  <a href="/events/123" className="hover:text-indigo-600">Fashion Week 2024</a>
  <ChevronRight className="w-3 h-3" />
  <span className="text-gray-900">Command Center</span>
</nav>
```

### Tabs

```typescript
<div className="border-b border-gray-200">
  <nav className="flex gap-8">
    <button 
      className="
        pb-3 
        border-b-2 border-indigo-600 
        text-sm font-medium text-indigo-600
      "
    >
      Overview
    </button>
    <button 
      className="
        pb-3 
        border-b-2 border-transparent 
        text-sm text-gray-500 
        hover:text-gray-700 
        hover:border-gray-300
      "
    >
      Tasks
    </button>
    <button 
      className="
        pb-3 
        border-b-2 border-transparent 
        text-sm text-gray-500 
        hover:text-gray-700
      "
    >
      Budget
    </button>
  </nav>
</div>
```

---

## DASHBOARDS

### Dashboard Layout Pattern

```typescript
<div className="min-h-screen bg-white">
  {/* Sticky Header */}
  <header className="
    sticky top-0 z-10 
    bg-white/80 backdrop-blur-md 
    border-b border-gray-100 
    px-6 py-4 
    flex items-center justify-between
  ">
    <div>
      <h1 className="font-serif text-xl text-black">Event Name</h1>
      <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
        Command Center
      </p>
    </div>
    <div className="text-right">
      <div className="text-sm font-medium">December 22, 2024</div>
      <div className="text-xs text-gray-400">45 Days to Show</div>
    </div>
  </header>

  {/* Main Content */}
  <main className="max-w-7xl mx-auto px-6 pb-20 space-y-16">
    {/* Sections */}
  </main>
</div>
```

### Dashboard Metrics

```typescript
// Metric Card
<div className="bg-white border border-gray-200 rounded-lg p-6">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-sm font-medium text-gray-500">Health Score</h3>
    <TrendingUp className="w-4 h-4 text-emerald-600" />
  </div>
  <div className="text-4xl font-bold text-gray-900 mb-2">94%</div>
  <div className="flex items-center gap-2 text-sm">
    <span className="text-emerald-600">+2.5%</span>
    <span className="text-gray-500">from last week</span>
  </div>
</div>

// Progress Bar
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-gray-700">Pre-Production</span>
    <span className="text-gray-500">75%</span>
  </div>
  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
    <div 
      className="h-full bg-indigo-600 rounded-full transition-all"
      style={{ width: '75%' }}
    />
  </div>
</div>
```

### Dashboard Tables

```typescript
<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-200">
        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
          Task
        </th>
        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
          Status
        </th>
        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
          Due Date
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      <tr className="hover:bg-gray-50">
        <td className="py-4 text-sm text-gray-900">Book venue</td>
        <td className="py-4">
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
            Complete
          </span>
        </td>
        <td className="py-4 text-sm text-gray-500">Dec 15, 2024</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## WIZARDS

### Wizard Layout

```typescript
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
    {/* Header */}
    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-serif">Create Event</h2>
        <p className="text-sm text-gray-500">Step {currentStep} of 6</p>
      </div>
      <button onClick={onClose}>
        <X className="w-5 h-5" />
      </button>
    </div>

    {/* Progress Bar */}
    <div className="px-6 py-4">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${(currentStep / 6) * 100}%` }}
        />
      </div>
    </div>

    {/* Step Content */}
    <div className="px-6 py-6">
      {/* Dynamic step component */}
    </div>

    {/* Footer */}
    <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between">
      <button onClick={handleBack} disabled={currentStep === 1}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>
      <button onClick={handleNext} className="bg-indigo-600 text-white">
        {currentStep === 6 ? 'Create Event' : 'Next'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  </DialogContent>
</Dialog>
```

### Step Indicator

```typescript
<div className="flex items-center justify-between mb-8">
  {steps.map((step, index) => (
    <div key={step.id} className="flex items-center">
      <div 
        className={`
          w-10 h-10 rounded-full 
          flex items-center justify-center 
          ${index + 1 === currentStep 
            ? 'bg-indigo-600 text-white' 
            : index + 1 < currentStep 
            ? 'bg-emerald-600 text-white' 
            : 'bg-gray-200 text-gray-500'
          }
        `}
      >
        {index + 1 < currentStep ? (
          <Check className="w-5 h-5" />
        ) : (
          <span>{index + 1}</span>
        )}
      </div>
      {index < steps.length - 1 && (
        <div 
          className={`
            w-20 h-1 
            ${index + 1 < currentStep ? 'bg-emerald-600' : 'bg-gray-200'}
          `}
        />
      )}
    </div>
  ))}
</div>
```

---

## MARKETING PAGES

### Hero Patterns

```typescript
// Full-Width Hero with Image
<section className="relative min-h-screen flex items-center">
  <div className="absolute inset-0">
    <img 
      src="/hero.jpg" 
      alt="" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40" />
  </div>
  
  <div className="relative z-10 container mx-auto px-6 text-white text-center">
    <h1 className="text-7xl font-serif mb-6">
      Transform Your Brand
    </h1>
    <p className="text-xl mb-8 max-w-2xl mx-auto">
      Professional photography and video production for fashion brands
    </p>
    <div className="flex gap-4 justify-center">
      <button className="primary-button">Get Started</button>
      <button className="secondary-button">Learn More</button>
    </div>
  </div>
</section>

// Split Hero (Text + Image)
<section className="container mx-auto px-6 py-20 lg:py-32">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <h1 className="text-6xl lg:text-7xl font-serif mb-6">
        Fashion E-Commerce<br/>
        <span className="italic text-gray-500">Web Design</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Beautiful, fast, conversion-driven experiences.
      </p>
      <div className="flex gap-4">
        <button>Get Started</button>
        <button>View Portfolio</button>
      </div>
    </div>
    <div>
      <img src="/mockup.jpg" alt="" className="rounded-2xl shadow-2xl" />
    </div>
  </div>
</section>
```

### Section Spacing

```typescript
// Standard Section
<section className="py-24 bg-white">
  <div className="container mx-auto px-6 lg:px-12">
    {/* Content */}
  </div>
</section>

// Large Section
<section className="py-32 bg-white">
  {/* Extra breathing room */}
</section>

// Compact Section
<section className="py-16 bg-gray-50">
  {/* Tighter spacing */}
</section>
```

---

## ANIMATIONS

### Motion Library (motion/react)

```typescript
import { motion } from 'motion/react';

// Fade In
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Scroll-Triggered
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>

// Stagger Children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>

// Hover Effects
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>

// Parallax Scroll
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

<motion.div style={{ y }}>
  Parallax content
</motion.div>
```

### CSS Transitions

```typescript
// Hover Transitions
className="transition-all duration-300 hover:scale-105"
className="transition-colors duration-200 hover:bg-gray-100"
className="transition-transform duration-500 hover:-translate-y-1"

// State Transitions
className="transition-opacity duration-300"
className="transition-shadow duration-200"
className="transition-[height] duration-300"
```

### Animation Guidelines

```
✓ Use 0.2-0.3s for quick UI feedback
✓ Use 0.6-0.8s for page section animations
✓ Use ease-out for entrances
✓ Use ease-in for exits
✓ Respect prefers-reduced-motion
✓ Don't animate more than 3 properties at once
✓ Use transform/opacity for performance (GPU-accelerated)
✗ Avoid animating width/height directly
```

---

## ICONS

### Lucide React

```typescript
import { 
  ArrowRight, 
  Check, 
  X, 
  Menu, 
  ChevronDown,
  User,
  Calendar,
  Settings
} from 'lucide-react';

// Usage
<ArrowRight className="w-4 h-4" />              // 16px
<Check className="w-5 h-5 text-emerald-600" />  // 20px
<Menu className="w-6 h-6" />                    // 24px

// Animated Icon
<motion.div
  animate={{ rotate: isOpen ? 180 : 0 }}
  transition={{ duration: 0.2 }}
>
  <ChevronDown className="w-4 h-4" />
</motion.div>

// Icon with Text
<button className="flex items-center gap-2">
  <Plus className="w-4 h-4" />
  Add Event
</button>
```

### Icon Sizes

```
w-3 h-3   // 12px - Tiny (inline text)
w-4 h-4   // 16px - Small (buttons, inline)
w-5 h-5   // 20px - Medium (default)
w-6 h-6   // 24px - Large (headers)
w-8 h-8   // 32px - Extra large (feature cards)
w-12 h-12 // 48px - Hero icons
```

---

## BEST PRACTICES

### Accessibility

```typescript
// Semantic HTML
✓ Use <button> for actions
✓ Use <a> for navigation
✓ Use <nav> for navigation sections
✓ Use <main> for main content
✓ Use <header> and <footer>

// ARIA Labels
<button aria-label="Close modal">
  <X className="w-4 h-4" />
</button>

<img src="/photo.jpg" alt="Fashion model wearing evening gown" />

// Keyboard Navigation
✓ All interactive elements focusable
✓ Visible focus states
✓ Logical tab order
✓ Escape key closes modals

// Screen Readers
<span className="sr-only">
  Loading...
</span>

// Color Contrast
✓ AAA compliance (7:1 for text)
✓ Test with contrast checker tools
✓ Don't rely on color alone
```

### Performance

```typescript
// Image Optimization
<ImageWithFallback 
  src="https://images.unsplash.com/..."
  alt="..."
  loading="lazy"
  className="w-full h-full object-cover"
/>

// Code Splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Memoization
const MemoizedComponent = React.memo(ExpensiveComponent);

// Debounce
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  []
);
```

### Responsive Design

```typescript
// Mobile-First Approach
className="text-4xl md:text-5xl lg:text-7xl"

// Touch Targets (44px minimum on mobile)
className="p-3 min-h-[44px] min-w-[44px]"

// Breakpoint Strategy
- Design for 375px (mobile)
- Test at 768px (tablet)
- Optimize for 1440px (desktop)

// Use Container Queries (future)
@container (min-width: 400px) {
  .card {
    grid-template-columns: 2fr 1fr;
  }
}
```

### Code Organization

```
/components
  /shared           // Reusable UI primitives
  /dashboards       // Dashboard-specific
  /wizards          // Wizard flows
  /marketing        // Marketing pages
  
/lib
  /api              // API client
  /validation       // Zod schemas
  /utils            // Helper functions
  
/styles
  /globals.css      // Global styles + tokens
  
/docs
  /main             // Design documentation
```

---

## USAGE EXAMPLES

### Complete Marketing Hero

```typescript
<section className="relative px-6 py-20 lg:py-32 lg:px-12 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Text */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <div className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500">
        FashionOS Design Studio
      </div>
      
      <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] tracking-tight">
        Fashion E-Commerce<br/>
        <span className="italic text-gray-500">Web Design</span>,<br/>
        Done Right.
      </h1>
      
      <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-light">
        Beautiful, fast, conversion-driven e-commerce experiences crafted 
        specifically for modern fashion brands.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg group">
          Get a Free Consultation
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-full hover:bg-gray-50 transition-all shadow-sm">
          View Our Work
        </button>
      </div>
    </motion.div>

    {/* Image */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <div className="rounded-[2rem] overflow-hidden shadow-2xl">
        <ImageWithFallback 
          src="https://images.unsplash.com/..." 
          alt="Website mockup"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  </div>
</section>
```

### Complete Dashboard Card

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="bg-white border border-gray-200 rounded-lg p-6"
>
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
        <Calendar className="w-5 h-5 text-indigo-600" />
      </div>
      <div>
        <h3 className="text-base font-medium text-gray-900">Upcoming Events</h3>
        <p className="text-xs text-gray-500">Next 30 days</p>
      </div>
    </div>
    <button className="text-sm text-indigo-600 hover:text-indigo-700">
      View All
    </button>
  </div>

  {/* Content */}
  <div className="space-y-4">
    {events.map(event => (
      <div key={event.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
        <div className="flex-shrink-0">
          <div className="text-sm font-medium text-gray-900">{event.date}</div>
          <div className="text-xs text-gray-500">{event.month}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {event.name}
          </div>
          <div className="text-xs text-gray-500">{event.venue}</div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded ${
          event.status === 'confirmed' 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          {event.status}
        </span>
      </div>
    ))}
  </div>
</motion.div>
```

---

## QUICK REFERENCE

### Common Patterns

```typescript
// Primary CTA (Marketing)
className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all shadow-lg"

// Secondary CTA (Marketing)
className="bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-full hover:bg-gray-50"

// Primary Button (Dashboard)
className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm"

// Card (Marketing)
className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"

// Card (Dashboard)
className="bg-white border border-gray-200 rounded-lg p-6"

// Input Field
className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"

// Label
className="block text-sm font-medium text-gray-700 mb-2"

// Badge
className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded"

// Divider
className="border-t border-gray-200 my-6"
```

---

**Document Version:** 1.0  
**Lines:** 997  
**Last Updated:** December 22, 2024  
**Status:** Production Ready
