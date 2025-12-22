# FASHIONOS — HOME PAGE DESIGN SYSTEM

**Purpose:** Luxury event orchestration platform landing page  
**Design Language:** Minimal, editorial, high-end fashion aesthetic  
**Target Audience:** Fashion brands, event producers, creative professionals

---

## DESIGN PRINCIPLES

### Visual Hierarchy
1. **Bold, minimal typography** (serif headlines, sans-serif body)
2. **High-contrast imagery** (black & white with selective color)
3. **Generous whitespace** (breathing room, luxury feel)
4. **Motion storytelling** (subtle animations guide attention)

### Responsive Strategy
- **Desktop:** Full-width hero, multi-column grids, horizontal scrolling
- **Tablet:** Stacked layouts, 2-column grids, touch-friendly spacing
- **Mobile:** Single column, vertical scroll, thumb-friendly CTAs

---

## PAGE STRUCTURE (10 SECTIONS)

```
1. Hero Section           → Full-screen video/image with CTA
2. Latest Campaigns       → Horizontal scroll gallery (3 cards)
3. About Studio           → Split layout (image + text)
4. Signature Project      → Full-width feature project
5. E-commerce Section     → Product grid (3 items)
6. Testimonial            → Centered quote with avatar
7. Creative Services      → Icon grid (6 services)
8. Fashion Directory      → Profile cards (4 people)
9. Marketplace Categories → Category tiles (3-4 tiles)
10. Behind The Scenes     → Image + video showcase
11. Final CTA             → Create profile prompt
12. Footer                → Links, contact, social
```

---

## SECTION 1: HERO SECTION

### Layout
```
Full viewport height (100vh)
- Background: High-contrast runway/fashion image (grayscale + overlay)
- Content: Center-aligned text + dual CTAs
- Scroll indicator at bottom
```

### Content
```
HEADING:
"The Operating System for Modern Luxury."

SUBHEADING:
"Intelligent production, event management, and network."

CTA 1: "Start New Project" → /wizard (primary, white button)
CTA 2: "Explore Services" → /services (secondary, outline button)

SCROLL INDICATOR: Animated chevron down
```

### Animations
```typescript
// On page load
Heading: Fade up + delay 0.2s
Subheading: Fade up + delay 0.4s
CTAs: Fade up + delay 0.6s
Scroll indicator: Fade in + delay 1s + bounce loop

// On scroll
Background: Parallax slow scroll (0.5x speed)
Content: Fade out as user scrolls down
```

### Responsive
```
Desktop (1024px+):
- Text: 7xl heading, xl subheading
- CTAs: Side-by-side
- Background: Fixed parallax

Tablet (768-1023px):
- Text: 5xl heading, lg subheading
- CTAs: Side-by-side (narrower)
- Background: Static

Mobile (< 768px):
- Text: 4xl heading, base subheading
- CTAs: Stacked (full width)
- Padding: 40px → 20px
```

### Images
```
Primary: Unsplash search "luxury fashion runway model black white"
Fallback: Grayscale fashion editorial
Aspect Ratio: 16:9 or wider
Optimization: WebP, lazy load, blur-up placeholder
```

---

## SECTION 2: LATEST CAMPAIGNS

### Layout
```
Horizontal scroll gallery (desktop)
Vertical stack (mobile)
- 3 campaign cards
- Overflow-x scroll with snap points
- No scrollbar (hidden)
```

### Content
```
SECTION HEADING: "Latest Campaigns"
SECTION SUBHEADING: "Recent work from our studio"

CARD 1:
Title: "Spring Awakening"
Label: "Editorial '25"
Image: Spring fashion editorial
Link: /gallery/spring-awakening

CARD 2:
Title: "Urban Elegance"
Label: "Milan Fashion Week"
Image: Urban street fashion
Link: /gallery/urban-elegance

CARD 3:
Title: "Minimal Mood"
Label: "Urban Capsule"
Image: Minimalist fashion
Link: /gallery/minimal-mood
```

### Animations
```typescript
// On scroll into view
Section heading: Fade in + slide up
Cards: Stagger fade in (0.1s delay each)

// On hover
Card image: Scale 1.05 (0.3s ease)
Card title: Fade in overlay gradient
Card label: Slide up 10px

// On horizontal scroll
Active card: Scale 1.0, opacity 1.0
Adjacent cards: Scale 0.95, opacity 0.7
```

### Responsive
```
Desktop (1024px+):
- Layout: Horizontal scroll (3 cards visible)
- Card width: 400px
- Gap: 24px
- Scroll: Mouse drag + trackpad

Tablet (768-1023px):
- Layout: Horizontal scroll (2 cards visible)
- Card width: 350px
- Gap: 16px

Mobile (< 768px):
- Layout: Vertical stack
- Card width: 100%
- Spacing: 32px
```

### Images
```
Search queries:
1. "luxury fashion editorial spring"
2. "milan fashion week street style"
3. "minimalist fashion photography"

Aspect Ratio: 3:4 (portrait)
Size: 800x1066px
Format: WebP with JPEG fallback
```

---

## SECTION 3: ABOUT STUDIO

### Layout
```
Split layout (50/50)
- Left: High-quality studio image
- Right: Text content + CTA
```

### Content
```
EYEBROW: "Who We Are"

HEADING:
"A Creative Studio for the Modern Fashion Industry"

BODY:
"FashionOS combines cutting-edge technology with editorial expertise. 
We've produced over 500 campaigns for luxury brands, delivering 
exceptional imagery and seamless event orchestration."

STATS:
- 500+ Campaigns Delivered
- 150+ Fashion Brands
- 50+ Fashion Weeks
- 24/7 Production Support

CTA: "Learn Our Story" → /about
```

### Animations
```typescript
// On scroll trigger (50% visible)
Image: Fade in + scale from 1.1 to 1.0 (1s ease)
Eyebrow: Fade in + slide right
Heading: Fade in + slide up (stagger 0.1s)
Body: Fade in (delay 0.3s)
Stats: Counter animation from 0 to value (1.5s)
CTA: Fade in (delay 0.5s)

// Image parallax
On scroll: Move up at 0.3x speed
```

### Responsive
```
Desktop (1024px+):
- Layout: Side-by-side (50/50)
- Image: Sticky position while text scrolls
- Text: Right column, max-width 600px

Tablet (768-1023px):
- Layout: Side-by-side (40/60)
- Image: Static

Mobile (< 768px):
- Layout: Stacked (image top, text bottom)
- Image: Full width
- Stats: 2x2 grid
```

### Images
```
Search: "fashion photography studio behind scenes"
Aspect Ratio: 3:4 or 1:1
Mood: Professional, modern, clean
```

---

## SECTION 4: SIGNATURE PROJECT

### Layout
```
Full-width showcase
- Large hero image (full bleed)
- Overlay text (bottom left)
- Hover reveals project details
```

### Content
```
PROJECT TITLE: "Nuit Parisienne"
PROJECT TYPE: "Editorial Campaign"
CLIENT: "Maison Lumière"

DESCRIPTION:
"A 14-look editorial campaign capturing the elegance of Parisian nights. 
Shot on location across iconic landmarks with a 20-person crew."

DELIVERABLES:
- 120 Final Images
- Behind-the-Scenes Video
- Social Media Assets
- Lookbook Design

CTA: "View Full Project" → /projects/nuit-parisienne
```

### Animations
```typescript
// On scroll into view
Image: Fade in + Ken Burns slow zoom (10s)
Overlay: Fade in from bottom

// On hover
Overlay: Expand from minimal to full details
Image: Darken (brightness 0.7)
CTA: Slide up + glow effect

// On exit hover
Overlay: Collapse back to title
Image: Return to original brightness
```

### Responsive
```
Desktop (1024px+):
- Image: Full width, 70vh height
- Overlay: Bottom left, 600px max width
- Hover: Expands to show full details

Tablet (768-1023px):
- Image: Full width, 60vh height
- Overlay: Bottom, centered
- Tap: Toggle details

Mobile (< 768px):
- Image: Full width, 50vh height
- Overlay: Always visible (no hover)
- Details: Accordion expand/collapse
```

### Images
```
Search: "luxury fashion editorial paris night"
Aspect Ratio: 21:9 (cinematic)
Resolution: 2400x1028px minimum
Style: Moody, cinematic, high contrast
```

---

## SECTION 5: E-COMMERCE SECTION

### Layout
```
3-column product grid
- Product images with hover zoom
- Subtle shadows on cards
- Equal height cards
```

### Content
```
SECTION HEADING: "E-Commerce Excellence"
SECTION SUBHEADING: "Product photography that converts"

CARD 1:
Title: "Luxury Goods"
Description: "High-end product photography with meticulous styling"
Image: Luxury watch/jewelry
CTA: "View Portfolio" → /product

CARD 2:
Title: "Apparel & Accessories"
Description: "Ghost mannequin, flat lays, and lifestyle shots"
Image: Clothing detail shot
CTA: "View Portfolio" → /clothing

CARD 3:
Title: "Beauty & Fragrance"
Description: "Editorial beauty photography with artistic direction"
Image: Perfume bottle or cosmetics
CTA: "View Portfolio" → /beauty
```

### Animations
```typescript
// On scroll into view (threshold 30%)
Heading: Fade in + slide up
Cards: Stagger fade in (0.15s delay each)

// On card hover
Image: Scale 1.1 (0.4s ease)
Card: Lift shadow (0-4 → 0-12)
Title: Color shift (gray → black)
CTA: Slide up 5px

// On card click
Scale down 0.98 → scale up 1.0 (spring animation)
```

### Responsive
```
Desktop (1024px+):
- Grid: 3 columns, equal width
- Gap: 32px
- Image height: 400px

Tablet (768-1023px):
- Grid: 2 columns
- Gap: 24px
- Card 3 spans 2 columns (centered)

Mobile (< 768px):
- Grid: 1 column
- Gap: 24px
- Full width cards
```

### Images
```
Product 1: "luxury product photography watch"
Product 2: "clothing photography detail haute couture"
Product 3: "luxury perfume bottle minimalist"

Aspect Ratio: 4:5 (portrait)
Style: Clean, white/neutral background
Lighting: Studio, high-key
```

---

## SECTION 6: TESTIMONIAL

### Layout
```
Centered quote card
- Large quote text (serif)
- Author info with avatar
- Subtle background gradient
```

### Content
```
QUOTE:
"FashionOS transformed our brand imagery with their exceptional 
attention to detail and creative vision. Every shoot exceeds expectations."

AUTHOR: "Sophie Martinez"
ROLE: "Creative Director, Maison Lumière"
AVATAR: Professional headshot
COMPANY LOGO: Maison Lumière (optional)
```

### Animations
```typescript
// On scroll into view
Quote: Fade in + type-in effect (character by character, fast)
Avatar: Fade in + scale from 0.8 to 1.0
Author: Fade in + slide up

// Background
Gradient: Slow shift (10s loop) between two tones

// On load
Quote marks: Pulse once (scale 1.0 → 1.2 → 1.0)
```

### Responsive
```
Desktop (1024px+):
- Max width: 900px
- Quote: 2xl text
- Padding: 120px vertical

Tablet (768-1023px):
- Max width: 700px
- Quote: xl text
- Padding: 80px vertical

Mobile (< 768px):
- Max width: 90%
- Quote: lg text
- Padding: 60px vertical
- Avatar: Smaller (40px)
```

### Images
```
Avatar: "professional headshot woman creative director"
Style: Editorial, professional, color
Aspect Ratio: 1:1 (square)
Size: 200x200px
```

---

## SECTION 7: CREATIVE SERVICES

### Layout
```
6-item icon grid (3x2)
- Icon + title + description
- Hover reveals full description
- Link to service page
```

### Content
```
SERVICE 1: "Event Production"
Icon: Calendar/Event icon
Description: "End-to-end fashion event management"
Link: /events

SERVICE 2: "Photography"
Icon: Camera icon
Description: "Editorial, product, and campaign photography"
Link: /services/photography

SERVICE 3: "Videography"
Icon: Video camera icon
Description: "Fashion films, behind-the-scenes, and promos"
Link: /services/video

SERVICE 4: "Casting"
Icon: Users icon
Description: "Model casting and talent management"
Link: /casting

SERVICE 5: "Art Direction"
Icon: Palette icon
Description: "Creative direction and styling"
Link: /services/art-direction

SERVICE 6: "Post-Production"
Icon: Sliders icon
Description: "Retouching, grading, and editing"
Link: /services/post-production
```

### Animations
```typescript
// On scroll into view
Icons: Fade in + bounce (stagger 0.1s each)
Text: Fade in (delay after icon)

// On hover
Card: Scale 1.05 + shadow
Icon: Rotate 360° (0.5s)
Description: Expand from 2 lines to full text
```

### Responsive
```
Desktop (1024px+):
- Grid: 3 columns, 2 rows
- Gap: 48px
- Icon size: 48px

Tablet (768-1023px):
- Grid: 2 columns, 3 rows
- Gap: 32px
- Icon size: 40px

Mobile (< 768px):
- Grid: 1 column
- Gap: 24px
- Icon size: 36px
- Always show full description
```

---

## SECTION 8: FASHION DIRECTORY

### Layout
```
4-column profile grid
- Circular avatars
- Name + category label
- Hover reveals "View Profile" button
```

### Content
```
SECTION HEADING: "Fashion Directory"
SECTION SUBHEADING: "Connect with industry professionals"

PROFILE 1:
Name: "Elena Rousseau"
Category: "Model"
Image: Portrait headshot
Link: /directory/elena-rousseau

PROFILE 2:
Name: "Marcus Chen"
Category: "Photographer"
Image: Portrait headshot
Link: /directory/marcus-chen

PROFILE 3:
Name: "Isabella Durant"
Category: "Designer"
Image: Portrait headshot
Link: /directory/isabella-durant

PROFILE 4:
Name: "Julien Baptiste"
Category: "Stylist"
Image: Portrait headshot
Link: /directory/julien-baptiste

CTA: "Browse All Profiles" → /directory
```

### Animations
```typescript
// On scroll into view
Heading: Fade in + slide up
Profiles: Stagger fade in (0.1s delay, wave pattern)

// On hover
Avatar: Scale 1.1 + shadow glow
Name: Slide up 5px
Category: Fade out
Button: Fade in + slide up from bottom

// Avatar border
Gradient border: Rotate 360° (2s loop) on hover
```

### Responsive
```
Desktop (1024px+):
- Grid: 4 columns
- Avatar: 200px diameter
- Gap: 40px

Tablet (768-1023px):
- Grid: 2 columns
- Avatar: 180px diameter
- Gap: 32px

Mobile (< 768px):
- Grid: 2 columns
- Avatar: 120px diameter
- Gap: 16px
```

### Images
```
Search: "fashion model headshot", "fashion photographer portrait"
Aspect Ratio: 1:1 (square, cropped to circle)
Style: Professional, clean background
Size: 400x400px
```

---

## SECTION 9: MARKETPLACE CATEGORIES

### Layout
```
3-column category tiles
- Image background with overlay text
- Hover reveals category description
- Link to marketplace section
```

### Content
```
CATEGORY 1: "Wardrobe"
Description: "Discover curated fashion pieces"
Image: Luxury closet/wardrobe
Link: /marketplace/wardrobe

CATEGORY 2: "Equipment"
Description: "Professional photography gear"
Image: Camera equipment
Link: /marketplace/equipment

CATEGORY 3: "Props & Sets"
Description: "Rent backdrops and props"
Image: Studio props/backdrop
Link: /marketplace/props

(Optional 4th category)
CATEGORY 4: "Services"
Description: "Book freelance creatives"
Image: Creative workspace
Link: /marketplace/services
```

### Animations
```typescript
// On scroll into view
Tiles: Stagger slide up + fade in (0.15s delay)

// On hover
Image: Zoom 1.1 (0.5s ease)
Overlay: Darken (0 → 0.5 opacity)
Text: Slide up + increase size
Description: Fade in from bottom

// Continuous
Border: Subtle glow pulse (2s loop)
```

### Responsive
```
Desktop (1024px+):
- Grid: 3 columns (or 4 if including Services)
- Tile height: 350px
- Gap: 24px

Tablet (768-1023px):
- Grid: 2 columns
- Tile height: 300px
- Gap: 16px

Mobile (< 768px):
- Grid: 1 column
- Tile height: 250px
- Gap: 16px
```

---

## SECTION 10: BEHIND THE SCENES

### Layout
```
Split layout (40/60)
- Left: Text content
- Right: Image/video montage (2x2 grid)
```

### Content
```
EYEBROW: "Our Process"

HEADING: "Behind Every Great Campaign"

BODY:
"Go inside our studio to see how we bring fashion visions to life. 
From concept to final delivery, we handle every detail with precision."

FEATURES:
✓ Professional studio spaces
✓ Expert creative team
✓ State-of-the-art equipment
✓ End-to-end production

CTA: "Tour Our Studio" → /studios

IMAGES/VIDEOS:
- Top left: Photographer shooting model
- Top right: Styling rack close-up
- Bottom left: Behind-the-scenes video (loop)
- Bottom right: Team reviewing images on screen
```

### Animations
```typescript
// On scroll into view
Text: Fade in + slide from left
Images: Stagger fade in (0.1s delay, clockwise)

// Video
Auto-play on scroll into view (muted loop)

// On hover (individual images)
Image: Scale 1.05
Border: Glow effect

// Parallax
Images: Move at different speeds (0.2x to 0.4x)
```

### Responsive
```
Desktop (1024px+):
- Layout: Side-by-side (40/60)
- Images: 2x2 grid
- Gap: 16px

Tablet (768-1023px):
- Layout: Stacked
- Images: 2x2 grid
- Gap: 12px

Mobile (< 768px):
- Layout: Stacked
- Images: 1x4 vertical stack
- Gap: 12px
```

---

## SECTION 11: FINAL CTA (Create Profile)

### Layout
```
Centered CTA card
- Gradient background
- Large heading + subheading
- Primary button
```

### Content
```
HEADING: "Join the FashionOS Network"

SUBHEADING:
"Create your profile and connect with top fashion brands, 
creatives, and production teams."

CTA: "Create Your Profile" → /signup
SECONDARY LINK: "Learn More" → /about

FEATURES (icon list):
- Connect with brands
- Showcase your work
- Book productions
- Manage projects
```

### Animations
```typescript
// On scroll into view
Background gradient: Fade in + subtle shift
Heading: Fade in + scale from 0.95
Subheading: Fade in + slide up
CTA button: Fade in + pulse once
Features: Fade in (stagger 0.1s)

// Button hover
Scale 1.05 + glow effect
Text: Letter spacing increase

// Background
Gradient: Slow shift animation (loop 10s)
```

### Responsive
```
Desktop (1024px+):
- Max width: 800px
- Padding: 100px vertical
- Button width: Auto

Tablet (768-1023px):
- Max width: 600px
- Padding: 80px vertical

Mobile (< 768px):
- Width: 90%
- Padding: 60px vertical
- Button: Full width
```

---

## ANIMATION LIBRARY

### Scroll Triggers
```typescript
// Use Intersection Observer or Motion scroll triggers
threshold: 0.3 // Trigger at 30% visible
rootMargin: "-100px" // Offset trigger point
```

### Common Animations
```typescript
// Fade in
{ opacity: 0 } → { opacity: 1 }
duration: 0.6s

// Slide up
{ y: 40, opacity: 0 } → { y: 0, opacity: 1 }
duration: 0.8s

// Scale in
{ scale: 0.9, opacity: 0 } → { scale: 1, opacity: 1 }
duration: 0.6s

// Stagger children
staggerChildren: 0.1s
delayChildren: 0.2s

// Parallax
scrollY → translateY (multiply by 0.3-0.5)
```

### Hover Effects
```typescript
// Image zoom
transform: scale(1) → scale(1.1)
transition: 0.4s ease

// Card lift
boxShadow: 0-2-10 → 0-8-30
transform: translateY(0) → translateY(-8px)
transition: 0.3s ease

// Text color shift
color: gray-600 → black
transition: 0.2s ease
```

---

## RESPONSIVE BREAKPOINTS

```css
/* Mobile */
@media (max-width: 767px) {
  /* Single column layouts */
  /* Full-width CTAs */
  /* Increased touch targets (44px min) */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* 2-column grids */
  /* Adjusted spacing */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Multi-column layouts */
  /* Hover states active */
  /* Parallax effects */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Max-width containers (1400px) */
  /* Increased spacing */
}
```

---

## IMAGE OPTIMIZATION

### Best Practices
```
1. Use WebP with JPEG fallback
2. Lazy load all images below fold
3. Blur-up placeholder (LQIP)
4. Responsive srcset for multiple sizes
5. Compress to < 200KB per image
6. Use CDN (Unsplash, Cloudinary)
```

### Aspect Ratios
```
Hero: 21:9 or 16:9 (cinematic)
Campaigns: 3:4 (portrait)
Products: 4:5 (product)
Portraits: 1:1 (square → circle crop)
Showcase: 16:9 (landscape)
```

---

## ACCESSIBILITY

### ARIA Labels
```html
<button aria-label="Start new project">Start New Project</button>
<img alt="Spring fashion editorial campaign" />
<section aria-labelledby="services-heading">
```

### Keyboard Navigation
```
- All CTAs: Tab accessible
- Focus states: Visible outline
- Skip to content link
- Escape to close modals
```

### Color Contrast
```
Text on light bg: 7:1 (AAA)
Text on dark bg: 7:1 (AAA)
Interactive elements: 4.5:1 minimum (AA)
```

---

## MULTI-STEP IMPLEMENTATION PROMPT

### STEP 1: Structure & Layout
```
Prompt: "Create a luxury fashion homepage with 10 sections: 
full-screen hero, horizontal scroll gallery, split about section, 
full-width showcase, product grid, centered testimonial, services grid, 
profile cards, category tiles, and BTS split layout. Use Tailwind CSS 
with generous spacing and minimal design. Mobile-first responsive."
```

### STEP 2: Typography & Content
```
Prompt: "Add typography system with serif headings (text-5xl to text-7xl) 
and sans-serif body text. Include all content: hero tagline 'The Operating 
System for Modern Luxury', service descriptions, testimonial quote from 
Sophie Martinez, directory profiles. Use tracking-tight for headlines, 
font-light for body text."
```

### STEP 3: Images & Media
```
Prompt: "Integrate images using ImageWithFallback component. Hero: 
grayscale runway shot with 0.6 opacity. Campaigns: 3 portrait images 
(3:4 ratio). About: studio BTS shot. Products: 3 clean product photos. 
Testimonial: professional headshot. Directory: 4 circular portraits. 
Use Unsplash with searches: 'luxury fashion runway', 'editorial 
fashion', 'product photography minimalist'."
```

### STEP 4: Animations (Motion)
```
Prompt: "Add scroll animations using motion/react. Hero: fade-up sequence 
with stagger (0.2s, 0.4s, 0.6s delays). Campaigns: horizontal scroll 
with snap points. About: parallax image at 0.5x speed. Services: stagger 
fade-in on icons. Cards: scale 1.05 on hover with 0.3s ease. Use 
Intersection Observer for scroll triggers at 30% threshold."
```

### STEP 5: Responsive & Polish
```
Prompt: "Make fully responsive: Desktop (1024px+) = multi-column grids, 
side-by-side layouts. Tablet (768-1023px) = 2-column grids. Mobile 
(<768px) = single column, full-width CTAs, vertical stacks. Add focus 
states, ARIA labels, min 44px touch targets. Test on mobile viewport."
```

---

**Total Sections:** 12  
**Total Animations:** 30+  
**Total Images:** 20+  
**Implementation Time:** 8-12 hours  
**Lines of Code:** ~1,500-2,000
