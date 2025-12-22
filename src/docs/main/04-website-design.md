# FASHIONOS — FASHION E-COMMERCE WEB DESIGN SERVICES

**Purpose:** Premium web design services for fashion e-commerce brands  
**Design Language:** Modern, clean, conversion-focused  
**Target Audience:** Fashion brands, DTC companies, luxury retailers

---

## TABLE OF CONTENTS

1. [Design Principles](#design-principles)
2. [Page Structure](#page-structure)
3. [Wireframes](#wireframes)
4. [Section Details](#section-details)
5. [Multi-Step Implementation](#multi-step-implementation)
6. [User Journeys](#user-journeys)
7. [Routes & Workflows](#routes--workflows)

---

## DESIGN PRINCIPLES

### Visual Hierarchy
```
1. CREDIBILITY FIRST → Show results, metrics, proof
2. SERVICE CLARITY → Clear packages, transparent pricing
3. MOBILE-OPTIMIZED → 60%+ traffic from mobile devices
4. CONVERSION-FOCUSED → Every section leads to action
5. PORTFOLIO-LED → Visual proof of quality work
```

### Color Palette
```
Primary BG:     #F8F5F1 (Warm beige)
Secondary BG:   #FFFFFF (White)
Accent:         #1a1a1a (Near black)
Text Primary:   #111111 (Gray-900)
Text Secondary: #666666 (Gray-600)
Success:        #10B981 (Green)
Border:         #E5E7EB (Gray-200)
```

### Typography
```
Hero:           5xl-7xl Serif (medium weight)
Section Heads:  3xl-4xl Serif
Card Heads:     xl-2xl Sans-serif (medium)
Body:           lg-xl Sans-serif (light, 400)
Small:          sm-base (400)
Micro:          xs Uppercase (tracking-widest)
```

---

## PAGE STRUCTURE (12 SECTIONS)

```
1. Hero                     → Full-width hero with mockup + stats overlay
2. Problem Statement        → Why fashion brands need better websites
3. Services Grid            → 6 service cards with icons
4. Design Process           → 4-step timeline
5. Portfolio Showcase       → Project grid (6-8 projects)
6. Technology Stack         → Platform logos + descriptions
7. Features Comparison      → Before/After or feature list
8. Pricing Packages         → 3-tier pricing cards
9. Client Testimonials      → Carousel or grid of quotes
10. Case Study Highlight    → Deep-dive into one project
11. FAQ                     → Accordion (6-8 questions)
12. Final CTA + Footer      → Contact form + footer
```

---

## WIREFRAMES

### Desktop Layout (1440px)
```
┌─────────────────────────────────────────────────────────┐
│  HEADER (Logo, Nav, CTA)                                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐  ┌─────────────────────────────┐│
│  │                  │  │  HERO TEXT                  ││
│  │   Mockup Image   │  │  • Headline                 ││
│  │   + Stats Badge  │  │  • Subheadline              ││
│  │                  │  │  • CTA Buttons              ││
│  └──────────────────┘  └─────────────────────────────┘│
│                                                         │
├─────────────────────────────────────────────────────────┤
│  PROBLEM STATEMENT (Centered, max-width 768px)         │
├─────────────────────────────────────────────────────────┤
│  SERVICES GRID                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                  │
│  │ Icon    │ │ Icon    │ │ Icon    │                  │
│  │ Service │ │ Service │ │ Service │                  │
│  └─────────┘ └─────────┘ └─────────┘                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                  │
│  │ Icon    │ │ Icon    │ │ Icon    │                  │
│  │ Service │ │ Service │ │ Service │                  │
│  └─────────┘ └─────────┘ └─────────┘                  │
├─────────────────────────────────────────────────────────┤
│  DESIGN PROCESS (Horizontal timeline)                   │
│  1 ────→ 2 ────→ 3 ────→ 4                            │
├─────────────────────────────────────────────────────────┤
│  PORTFOLIO (Masonry grid 3 columns)                     │
│  ┌────┐ ┌──────┐ ┌────┐                               │
│  │ P1 │ │  P2  │ │ P3 │                               │
│  └────┘ │      │ └────┘                               │
│  ┌──────┐─────┘ ┌──────┐                             │
│  │  P4  │       │  P5  │                             │
│  └──────┘       └──────┘                             │
├─────────────────────────────────────────────────────────┤
│  PRICING (3 cards side-by-side)                         │
│  ┌──────┐ ┌──────┐ ┌──────┐                           │
│  │Basic │ │ Pro  │ │Enter.│                           │
│  └──────┘ └──────┘ └──────┘                           │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (375px)
```
┌─────────────────┐
│  HEADER         │
│  ☰ Menu         │
├─────────────────┤
│  HERO TEXT      │
│  • Headline     │
│  • Subheadline  │
│  • CTA (full)   │
├─────────────────┤
│  Mockup Image   │
│  + Stats Badge  │
├─────────────────┤
│  PROBLEM        │
│  (Centered)     │
├─────────────────┤
│  SERVICE 1      │
│  ┌────────────┐ │
│  │ Icon + Text│ │
│  └────────────┘ │
│  SERVICE 2      │
│  ┌────────────┐ │
│  └────────────┘ │
│  (Stacked 1col) │
├─────────────────┤
│  PROCESS        │
│  1              │
│  ↓              │
│  2              │
│  ↓              │
│  3              │
│  ↓              │
│  4              │
├─────────────────┤
│  PORTFOLIO      │
│  (1 column)     │
└─────────────────┘
```

---

## SECTION 1: HERO

### Layout
```
Grid: 2-column (desktop), stacked (mobile)
- Left: Mockup image (50%)
- Right: Text content (50%)
Background: #F8F5F1 (warm beige)
Padding: 80px vertical (desktop), 40px (mobile)
```

### Content
```
BADGE (Small tag):
"FashionOS Design Studio"
(Uppercase, xs, tracking-widest, gray-500)

HEADLINE:
"Fashion E-Commerce
Web Design, Done Right."

Note: "Web Design" in italic gray-500

SUBHEADLINE:
"Beautiful, fast, conversion-driven e-commerce experiences 
crafted specifically for modern fashion brands."

CTA 1: "Get a Free Consultation" → /contact (black rounded button)
CTA 2: "View Our Work" → #portfolio (white outline button)
```

### Mockup Image
```
Right side: Desktop/mobile mockup preview
- Rounded corners (2rem)
- Shadow (2xl)
- Aspect ratio: 4:3
- Overlay stats badge at bottom

Stats Badge (overlay on image):
- Background: white/90 with backdrop blur
- Content: "Conversion Rate +42.8%"
- Icons: Trend up, Users +1.2K, Speed 0.8s
- Border radius: xl

Search: "fashion ecommerce website interface mockup"
```

### Animations
```typescript
// Hero entrance
Text container: { opacity: 0, x: -20 } → { opacity: 1, x: 0 } (0.8s)
Image: { opacity: 0, scale: 0.95 } → { opacity: 1, scale: 1 } (0.8s delay: 0.2s)

// Badge
Slide in from top with bounce

// Hover effects
CTA 1: Arrow icon translates right on hover
Mockup: Scale 1.05 on hover (0.7s)
```

### Responsive
```
Desktop (1024px+):
- Side-by-side 50/50
- Text left, image right
- CTAs horizontal

Mobile (< 768px):
- Stacked (text top, image bottom)
- CTAs full-width stacked
- Reduced padding
```

---

## SECTION 2: PROBLEM STATEMENT

### Layout
```
Centered content
Max-width: 768px
Background: White
Padding: 96px vertical (desktop), 64px (mobile)
```

### Content
```
EYEBROW:
"The Challenge"

HEADLINE:
"Most Fashion Websites Fail to Convert"

BODY (3 pain points):
1. "Slow load times drive away customers before they see your products"
2. "Poor mobile experience loses 60% of potential sales"
3. "Generic templates fail to represent luxury brand identity"

CTA: "See How We Solve This" → #services (underline link)
```

### Design Pattern
```
Icon + Text list:
- X icon (red) for each pain point
- Gray text (600)
- Font size: lg
- Line height: relaxed
- Spacing: 24px between items
```

### Animations
```typescript
// Scroll trigger
Eyebrow: Fade in
Headline: Slide up + fade
List items: Stagger fade (0.1s delay each)
```

---

## SECTION 3: SERVICES GRID

### Layout
```
Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
Gap: 32px
Background: #F8F5F1
Padding: 96px vertical
```

### Services (6 cards)

#### Card 1: Custom Design
```
Icon: PenTool (lucide-react)
Title: "Custom Design System"
Description: "Bespoke UI/UX tailored to your brand identity and target audience."
Features:
- Brand guidelines integration
- Component library
- Style guide documentation
```

#### Card 2: E-commerce Development
```
Icon: ShoppingBag
Title: "E-commerce Development"
Description: "Shopify, WooCommerce, or custom platform—built for performance."
Features:
- Product catalog optimization
- Cart & checkout flow
- Payment gateway integration
```

#### Card 3: Mobile-First Approach
```
Icon: Smartphone
Title: "Mobile-First Design"
Description: "60% of traffic is mobile. We design for phones first."
Features:
- Responsive layouts
- Touch-optimized UI
- Fast mobile performance
```

#### Card 4: SEO & Performance
```
Icon: Search
Title: "SEO & Performance"
Description: "Rank higher, load faster, convert better."
Features:
- Core Web Vitals optimization
- Schema markup
- Page speed under 2s
```

#### Card 5: A/B Testing
```
Icon: BarChart
Title: "A/B Testing & Analytics"
Description: "Data-driven decisions to maximize conversions."
Features:
- Heatmap integration
- Conversion tracking
- Multivariate testing
```

#### Card 6: Ongoing Support
```
Icon: Settings
Title: "Maintenance & Support"
Description: "We don't disappear after launch. Ongoing updates and fixes."
Features:
- Monthly updates
- Bug fixes
- Feature additions
```

### Card Design
```
Background: White
Border: 1px gray-200
Border radius: xl (1rem)
Padding: 32px
Shadow: Subtle on hover
Hover: Lift effect (-translate-y-2)

Icon: 48px, gray-700
Title: xl font-medium
Description: base text-gray-600
Features: List with Check icons
```

### Animations
```typescript
// Stagger grid items
variants={staggerContainer}
Each card: { opacity: 0, y: 20 } → { opacity: 1, y: 0 }
Delay: 0.1s between cards

// Hover
Card lift + shadow increase
Icon: Subtle rotate or scale
```

---

## SECTION 4: DESIGN PROCESS

### Layout
```
Horizontal timeline (desktop)
Vertical timeline (mobile)
Background: White
Max-width: 1200px
Padding: 96px vertical
```

### 4 Steps

#### Step 1: Discovery
```
Number: "01"
Title: "Discovery & Strategy"
Description: "Brand audit, competitor analysis, and user research"
Duration: "1-2 weeks"
Icon: Lightbulb

Deliverables:
- Brand guidelines review
- Market research report
- User personas
- Sitemap & wireframes
```

#### Step 2: Design
```
Number: "02"
Title: "Design & Prototyping"
Description: "High-fidelity mockups and interactive prototypes"
Duration: "2-3 weeks"
Icon: Layout

Deliverables:
- Desktop designs
- Mobile designs
- Interactive prototype
- Design system
```

#### Step 3: Development
```
Number: "03"
Title: "Development & Integration"
Description: "Build, integrate, and optimize for performance"
Duration: "4-6 weeks"
Icon: Code

Deliverables:
- Responsive website
- CMS integration
- E-commerce setup
- Payment gateway
```

#### Step 4: Launch
```
Number: "04"
Title: "Testing & Launch"
Description: "QA testing, optimization, and deployment"
Duration: "1-2 weeks"
Icon: Zap

Deliverables:
- Cross-browser testing
- Performance audit
- SEO setup
- Launch & training
```

### Timeline Design
```
Desktop:
- Horizontal flow (left to right)
- Connected with arrows or dotted line
- Cards with number badge

Mobile:
- Vertical flow (top to bottom)
- Cards stacked
- Connecting line on left side
```

### Animations
```typescript
// Timeline reveal
Line draws from left to right (or top to bottom)
Cards fade in as line reaches them
Stagger delay: 0.3s
```

---

## SECTION 5: PORTFOLIO SHOWCASE

### Layout
```
Masonry grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
Gap: 24px
Background: #F8F5F1
Padding: 96px vertical
```

### Projects (6-8 items)

#### Project Card Structure
```
Image: Portfolio screenshot
Aspect ratio: Variable (masonry)
Overlay on hover:
  - Project name
  - Category
  - "View Case Study" link

Categories:
- Fashion E-commerce
- Luxury Retail
- DTC Brand
- Editorial
```

### Project Examples
```
1. "Maison Lumière" - Luxury fashion boutique
2. "NOIR Collection" - Contemporary menswear
3. "Silk & Stone" - Jewelry e-commerce
4. "Urban Threads" - Streetwear brand
5. "Atelier Rose" - Wedding fashion
6. "Minimal Edit" - Minimalist lifestyle brand
```

### Card Design
```
Hover overlay:
- Background: rgba(0,0,0,0.7)
- Text: White
- Transition: 0.3s ease
- Link: Underline on hover
```

### Animations
```typescript
// Masonry stagger
Cards fade in as user scrolls
Stagger: 0.1s per card

// Hover
Image: Scale 1.1
Overlay: Opacity 0 → 1
Text: Slide up from bottom
```

---

## SECTION 6: TECHNOLOGY STACK

### Layout
```
Grid: 6 columns (desktop), 3 (tablet), 2 (mobile)
Background: White
Padding: 80px vertical
Centered logos
```

### Platforms (6)
```
1. Shopify (logo + description)
2. WordPress + WooCommerce
3. React + Next.js
4. Webflow
5. BigCommerce
6. Custom Solutions

Each with:
- Platform logo (or icon)
- Name
- Short description (1 line)
```

### Design
```
Logo: 60px height
Name: Medium weight, lg
Description: sm, gray-600
Hover: Slight scale effect
```

---

## SECTION 7: FEATURES COMPARISON

### Layout
```
2-column comparison (desktop), stacked (mobile)
Background: #F8F5F1
Padding: 96px vertical
```

### Before vs After
```
Left Column: "Before" (with X icons, red)
- Slow load times (5+ seconds)
- Generic template design
- Poor mobile experience
- Low conversion rate (1-2%)
- No SEO optimization
- Abandoned carts

Right Column: "After" (with Check icons, green)
- Lightning-fast (< 2s load)
- Custom brand design
- Mobile-first experience
- High conversion rate (4-6%)
- Top Google rankings
- Optimized checkout flow
```

### Design
```
Icons: 24px X (red) or Check (green)
Text: base, gray-700
Spacing: 16px between items
Divider: Vertical line between columns (desktop)
```

---

## SECTION 8: PRICING PACKAGES

### Layout
```
Grid: 3 columns (desktop), 1 column (mobile)
Gap: 32px
Background: White
Padding: 96px vertical
```

### Packages

#### Starter Package
```
Price: "$4,999"
Billing: "One-time"
Best for: "Small brands & startups"

Includes:
- 5-10 page website
- Mobile-responsive design
- Basic SEO setup
- 1 month support
- Shopify/WordPress

CTA: "Get Started" → /contact
```

#### Professional Package
```
Price: "$12,999"
Billing: "One-time"
Best for: "Established fashion brands"
Badge: "Most Popular"

Includes:
- 10-25 page website
- Custom design system
- Advanced SEO
- 3 months support
- E-commerce optimization
- A/B testing setup

CTA: "Get Started" → /contact
```

#### Enterprise Package
```
Price: "Custom"
Billing: "Contact us"
Best for: "Luxury & international brands"

Includes:
- Unlimited pages
- Fully custom platform
- Headless CMS
- 6 months support
- Multi-language
- Advanced integrations

CTA: "Contact Sales" → /contact
```

### Card Design
```
Background: White
Border: 2px gray-200
Border radius: 2xl
Padding: 48px
Most Popular: Border gradient or shadow

Price: 4xl serif font-bold
Features: Check icons + text
CTA: Full-width button
```

### Animations
```typescript
// Cards entrance
Stagger from center outward
Scale from 0.95 to 1.0
Fade in

// Hover
Lift effect
Shadow increase
Border color change
```

---

## SECTION 9: CLIENT TESTIMONIALS

### Layout
```
Carousel or 3-column grid
Background: #F8F5F1
Padding: 96px vertical
Max-width: 1200px centered
```

### Testimonials (3-6)

#### Testimonial Card
```
Quote: "FashionOS transformed our outdated site into a conversion 
machine. Sales increased 45% in the first month."

Author: Sophie Martinez
Role: Founder, Maison Lumière
Avatar: Professional headshot
Logo: Brand logo (optional)
```

### Card Design
```
Background: White
Padding: 32px
Border radius: xl
Quote: lg text, italic
Author: medium font-medium
Role: sm text-gray-600
Avatar: 64px circle
```

### Animations
```typescript
// If carousel
Auto-rotate: 5s interval
Slide transition
Pause on hover

// If grid
Stagger fade in on scroll
```

---

## SECTION 10: CASE STUDY HIGHLIGHT

### Layout
```
Full-width section
Background: White
Padding: 120px vertical
```

### Content Structure
```
Left side (50%):
- Client logo
- Project title
- Challenge description
- Solution approach
- Results metrics

Right side (50%):
- Large project screenshot
- Or image carousel (3-5 images)
```

### Metrics Display
```
3 Key Metrics:
1. "+42% Conversion Rate"
2. "+89% Mobile Traffic"
3. "1.8s Page Load Time"

Display as:
- Large number (4xl)
- Label below (sm)
- Icon or graph
```

### CTA
```
"Read Full Case Study" → /case-studies/[slug]
(Button or link)
```

---

## SECTION 11: FAQ

### Layout
```
Accordion-style
Max-width: 768px centered
Background: #F8F5F1
Padding: 96px vertical
```

### Questions (8)

```
Q1: "How long does it take to build a website?"
A1: "Typically 8-12 weeks from discovery to launch, depending on 
     complexity and scope."

Q2: "Do you work with Shopify or custom platforms?"
A2: "We work with Shopify, WordPress/WooCommerce, and can build 
     custom solutions. We recommend based on your needs."

Q3: "What's included in ongoing support?"
A3: "Bug fixes, security updates, minor content changes, and 
     performance monitoring."

Q4: "Can you migrate my existing website?"
A4: "Yes, we handle full migrations including products, content, 
     and SEO redirects."

Q5: "Do you provide content creation?"
A5: "We write core website copy. For product descriptions and blog 
     content, we can connect you with our copywriting partners."

Q6: "What if I need changes after launch?"
A6: "All packages include support period. After that, we offer 
     monthly retainers or hourly rates."

Q7: "Do you handle hosting and domain?"
A7: "We set up hosting and can manage domains. Monthly hosting fees 
     are separate from design/development."

Q8: "Can I update content myself?"
A8: "Yes, we build on CMS platforms (Shopify, WordPress, etc.) and 
     provide training on how to update content."
```

### Accordion Design
```
Button: Full-width, left-aligned
Icon: Plus (closed), Minus (open)
Answer: Slide down animation
Border: Bottom border between items
```

---

## SECTION 12: FINAL CTA + FOOTER

### CTA Section
```
Background: Black or gradient
Text: White
Padding: 120px vertical
Centered content

Headline: "Ready to Transform Your Fashion Brand?"
Subheadline: "Let's build an e-commerce experience that converts."

CTA: "Schedule Free Consultation" → /contact (white button)
Secondary: "View Pricing" → #pricing (outline button)
```

### Footer
```
See /components/Footer.tsx
Standard footer with:
- Navigation links
- Contact info
- Social media
- Copyright
```

---

## MULTI-STEP IMPLEMENTATION

### STEP 1: Structure & Foundation
```
PROMPT:
"Create a fashion e-commerce web design services page with React, 
TypeScript, and Tailwind CSS. Structure includes:

1. Hero section (2-column grid, mockup + text)
2. Problem statement (centered, max-width 768px)
3. Services grid (3 columns, 6 cards with icons)
4. Design process timeline (4 steps, horizontal desktop, vertical mobile)
5. Portfolio masonry grid (3 columns, 6-8 projects)
6. Technology stack logos (6 columns)
7. Before/After comparison (2 columns)
8. Pricing packages (3 columns, 3 tiers)
9. Client testimonials (carousel or 3 columns)
10. Case study highlight (2-column split)
11. FAQ accordion (max-width 768px)
12. Final CTA section + footer

Background colors: #F8F5F1 (warm beige) and white alternating. 
Container: max-w-7xl mx-auto. Padding: px-6 lg:px-12. Use semantic 
HTML and Tailwind responsive classes."
```

### STEP 2: Typography & Content
```
PROMPT:
"Add all content and typography to the web design services page:

HERO:
- Badge: 'FashionOS Design Studio' (xs uppercase tracking-widest)
- Headline: 'Fashion E-Commerce Web Design, Done Right.' 
  (5xl-7xl serif, 'Web Design' in italic gray-500)
- Subheadline: 'Beautiful, fast, conversion-driven e-commerce experiences...'
  (xl light gray-600)
- CTAs: 'Get a Free Consultation', 'View Our Work'

PROBLEM STATEMENT:
- Eyebrow: 'The Challenge'
- Headline: 'Most Fashion Websites Fail to Convert'
- 3 pain points about slow load times, poor mobile, generic templates

SERVICES (6 cards):
1. Custom Design System (PenTool icon)
2. E-commerce Development (ShoppingBag icon)
3. Mobile-First Design (Smartphone icon)
4. SEO & Performance (Search icon)
5. A/B Testing & Analytics (BarChart icon)
6. Maintenance & Support (Settings icon)
(Each with title, description, 3 feature bullets)

PROCESS (4 steps):
1. Discovery & Strategy (1-2 weeks)
2. Design & Prototyping (2-3 weeks)
3. Development & Integration (4-6 weeks)
4. Testing & Launch (1-2 weeks)
(Each with deliverables list)

PRICING (3 tiers):
- Starter: $4,999 (5-10 pages)
- Professional: $12,999 (10-25 pages, 'Most Popular' badge)
- Enterprise: Custom (unlimited pages)
(Each with feature list and CTA)

FAQ: 8 questions with answers (see content)

Use serif for headlines, sans-serif for body. Tracking-tight on headlines, 
font-light on body text."
```

### STEP 3: Images & Visual Assets
```
PROMPT:
"Add images using ImageWithFallback component:

HERO MOCKUP:
- Desktop/mobile interface mockup
- Rounded corners (2rem), shadow-2xl
- Aspect ratio: 4:3
- Stats overlay badge at bottom (white/90 backdrop-blur)
  Search: 'fashion ecommerce website interface mockup'

PORTFOLIO GRID (6-8 images):
- Masonry layout, variable aspect ratios
- Hover overlay with project name + category
  Searches:
  1. 'luxury fashion ecommerce website'
  2. 'minimalist online boutique'
  3. 'jewelry ecommerce design'
  4. 'streetwear brand website'
  5. 'wedding dress boutique'
  6. 'sustainable fashion site'

TESTIMONIALS (3 avatars):
- Professional headshots, circular crop
  Search: 'professional woman entrepreneur portrait'

CASE STUDY:
- Full website screenshot
- Desktop or mobile view
  Search: 'fashion ecommerce website design'

Icons from lucide-react: PenTool, ShoppingBag, Smartphone, Search, 
BarChart, Settings, Code, Layout, Zap, Lightbulb, ArrowRight, Check, 
Monitor, Globe.

All images: hover:scale-105 transition-duration-700. Ensure alt text."
```

### STEP 4: Animations & Interactions
```
PROMPT:
"Add animations using motion/react:

GLOBAL VARIANTS:
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

HERO:
- Text: { opacity: 0, x: -20 } → { opacity: 1, x: 0 } (0.8s)
- Mockup: { opacity: 0, scale: 0.95 } → { opacity: 1, scale: 1 } (0.8s delay: 0.2s)
- Stats badge: Slide up from bottom with bounce
- CTA button: Arrow icon translates right on hover

SERVICES GRID:
- Stagger cards (0.1s delay each)
- Hover: Card lifts (-translate-y-2), shadow increases
- Icons: Subtle rotate or pulse on hover

TIMELINE:
- Line draws from left to right (desktop) or top to bottom (mobile)
- Cards fade in as line reaches them
- Stagger delay: 0.3s

PORTFOLIO:
- Masonry stagger (0.1s per card)
- Hover: Image scale 1.1, overlay opacity 0 → 1

ACCORDION (FAQ):
- Use AnimatePresence for smooth expand/collapse
  initial: { height: 0, opacity: 0 }
  animate: { height: 'auto', opacity: 1 }
  exit: { height: 0, opacity: 0 }
- Icons: Plus (closed) → Minus (open)

PRICING CARDS:
- Stagger from center outward
- Scale from 0.95 to 1.0
- Hover: Lift + shadow + border color change

All scroll-triggered animations use whileInView with viewport={{ once: true }}."
```

### STEP 5: Responsive Design
```
PROMPT:
"Make the page fully responsive with mobile-first approach:

HERO:
Desktop (1024px+): Side-by-side, mockup right, text left
Tablet (768-1023px): Adjusted proportions
Mobile (<768px): Stacked, text top, mockup bottom, full-width CTAs

SERVICES GRID:
Desktop: 3 columns
Tablet: 2 columns
Mobile: 1 column (stacked cards)

TIMELINE:
Desktop: Horizontal (left to right)
Mobile: Vertical (top to bottom with connecting line)

PORTFOLIO:
Desktop: 3-column masonry
Tablet: 2-column masonry
Mobile: 1-column stacked

PRICING:
Desktop: 3 cards side-by-side
Tablet: 2 cards + 1 below
Mobile: Stacked (1 column)

TESTIMONIALS:
Desktop: 3 columns or carousel
Mobile: Carousel (1 at a time)

CASE STUDY:
Desktop: 50/50 split
Mobile: Stacked

FAQ:
All breakpoints: Max-width 768px centered, full-width on mobile

Typography scaling:
Hero: 7xl → 5xl → 4xl
Sections: 4xl → 3xl → 2xl
Body: xl → lg → base

Touch targets: Min 44px height on mobile
Padding: 96px → 64px → 40px (desktop → tablet → mobile)
Use Tailwind responsive prefixes: sm:, md:, lg:, xl:"
```

### STEP 6: Routes, Links & CTAs
```
PROMPT:
"Wire up all navigation and CTAs:

NAVIGATION HANDLER:
const handleNavigate = (href: string) => {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

HERO:
- 'Get a Free Consultation' → /contact
- 'View Our Work' → #portfolio (smooth scroll)

SERVICES:
- Optional: Each card links to detailed service page

PROCESS:
- Informational (no links)

PORTFOLIO:
- Each project → /case-studies/[slug]
- Or modal overlay with project details

PRICING:
- All 'Get Started' / 'Contact Sales' → /contact (with package param)

FAQ:
- Accordion toggle (local state)

FINAL CTA:
- 'Schedule Free Consultation' → /contact
- 'View Pricing' → #pricing (smooth scroll)

Anchor links smooth scroll:
html { scroll-behavior: smooth; }

All buttons use onClick={handleNavigate} for SPA routing."
```

---

## USER JOURNEYS

### Journey 1: Research & Discovery
```
1. User lands on page from Google search "fashion ecommerce web design"
2. Reads hero headline, scans stats overlay (+42% conversion)
3. Scrolls to problem statement (resonates with pain points)
4. Reviews services grid (finds "Custom Design System")
5. Checks design process timeline (understands workflow)
6. Browses portfolio (impressed by quality)
7. Clicks "View Case Study" → Reads full project details
8. Returns to pricing section
9. Compares packages (selects Professional)
10. Clicks "Get Started" → Fills contact form
```

### Journey 2: Quick Price Check
```
1. User arrives from Instagram ad
2. Immediately scrolls to pricing section
3. Compares 3 packages
4. Opens FAQ to check "What's included in support?"
5. Reads testimonials for social proof
6. Clicks "Contact Sales" for Enterprise package
7. Submits inquiry form
```

### Journey 3: Portfolio Browse
```
1. User clicks "View Our Work" in hero
2. Smooth scrolls to portfolio section
3. Clicks first project in masonry grid
4. Views full case study with metrics
5. Browses 2-3 more case studies
6. Returns to main page
7. Clicks "Schedule Free Consultation"
```

---

## ROUTES & WORKFLOWS

### On-Page Routes
```
/web-design                     → Main service page
/web-design#hero               → Hero section
/web-design#problem            → Problem statement
/web-design#services           → Services grid
/web-design#process            → Design process
/web-design#portfolio          → Portfolio showcase
/web-design#technology         → Tech stack
/web-design#features           → Before/After comparison
/web-design#pricing            → Pricing packages
/web-design#testimonials       → Client testimonials
/web-design#case-study         → Case study highlight
/web-design#faq                → FAQ accordion
/web-design#cta                → Final CTA
```

### External Links
```
Header:
/                              → Homepage
/services                      → Services overview
/web-design                    → This page
/portfolio                     → Full portfolio
/case-studies                  → All case studies
/about                         → About page
/contact                       → Contact form

Portfolio Projects:
/case-studies/maison-lumiere   → Case study detail
/case-studies/noir-collection  → Case study detail
/case-studies/silk-stone       → Case study detail

CTAs:
/contact                       → Contact form
/contact?package=starter       → Contact with package pre-selected
/contact?package=professional  → Contact with package pre-selected
/contact?package=enterprise    → Contact with package pre-selected
```

### Workflow: Contact Form Submission
```
1. User clicks CTA → Navigates to /contact
2. Form appears with fields:
   - Name
   - Email
   - Brand name
   - Website (optional)
   - Package interest (dropdown pre-filled if from pricing)
   - Project details (textarea)
   - Budget range (dropdown)
3. User fills form
4. Clicks "Submit"
5. Form validation (client-side with Zod)
6. POST to /api/contact (future: Supabase)
7. Success message: "We'll be in touch within 24 hours"
8. Email notification sent to sales team
9. Auto-reply email sent to user
```

---

## MOBILE OPTIMIZATION

### Mobile-Specific Considerations
```
✓ Touch targets: Min 44x44px for all buttons/links
✓ Font sizes: Larger base size (16px minimum)
✓ Spacing: Increased padding for better readability
✓ Images: Lazy loading, optimized sizes
✓ Forms: Large input fields, native keyboards
✓ Navigation: Hamburger menu, full-screen overlay
✓ CTAs: Full-width buttons, sticky bottom bar option
✓ Carousels: Swipe gestures, touch-friendly controls
```

### Performance Targets (Mobile)
```
First Contentful Paint: < 1.5s
Largest Contentful Paint: < 2.5s
Time to Interactive: < 3s
Cumulative Layout Shift: < 0.1
Total Page Weight: < 2MB
```

---

## TESTING CHECKLIST

```
Desktop (1920x1080):
□ All sections render correctly
□ Images load properly
□ Animations smooth
□ CTAs functional
□ Portfolio grid masonry works
□ Timeline displays horizontally
□ Pricing cards aligned

Tablet (768x1024):
□ Grid adjusts to 2 columns
□ Touch targets adequate
□ Images maintain aspect ratios
□ Timeline still readable

Mobile (375x667):
□ Single column layout
□ Full-width CTAs
□ Accordion works smoothly
□ Portfolio stacks vertically
□ Timeline vertical
□ Forms easy to fill
□ No horizontal scroll

Cross-Browser:
□ Chrome (desktop + mobile)
□ Safari (desktop + iOS)
□ Firefox
□ Edge

Accessibility:
□ Keyboard navigation
□ Screen reader compatible
□ Alt text on images
□ ARIA labels
□ Color contrast AAA
□ Focus states visible
```

---

**Document Version:** 1.0  
**Lines:** 996  
**Last Updated:** December 22, 2024  
**Status:** Implementation Ready
