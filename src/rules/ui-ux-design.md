# UI/UX Design Rules

## Design System

### Colors
```css
Primary: #111111 (Charcoal)
Background: #F9F9F9 (Ivory)
Accent: #8B7355 (Bronze)
Success: #10b981
Warning: #f59e0b
Error: #ef4444
```

### Typography
```css
Headings: 'Crimson Pro', serif
Body: 'Inter', sans-serif

H1: 3rem (48px)
H2: 2rem (32px)
H3: 1.5rem (24px)
Body: 1rem (16px)
Small: 0.875rem (14px)
```

### Spacing Scale
```css
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

## Component Patterns

### Card
```tsx
<div className="bg-white rounded-lg border border-gray-200 p-6">
  <h3>Title</h3>
  <p className="text-gray-600">Content</p>
</div>
```

### Button Variants
```tsx
Primary: className="bg-[#111111] text-white"
Secondary: className="border border-gray-300 text-gray-700"
Ghost: className="text-gray-700 hover:bg-gray-100"
Destructive: className="bg-red-600 text-white"
```

### Input Fields
```tsx
<input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#111111]" />
```

## Layout Rules

### Max Width
```tsx
Container: max-w-7xl mx-auto px-4
Content: max-w-3xl
```

### Grid Systems
```tsx
2 columns: grid grid-cols-1 md:grid-cols-2 gap-6
3 columns: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
4 columns: grid grid-cols-2 md:grid-cols-4 gap-4
```

### Luxury Design Principles
1. **Whitespace:** Generous padding, never cramped
2. **Typography:** Large headings, elegant serifs
3. **Color:** Minimal palette, high contrast
4. **Motion:** Subtle, refined animations
5. **Imagery:** High-quality, curated photography
