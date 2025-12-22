# FASHIONOS — FASHION VIDEO PRODUCTION SERVICES

**Purpose:** Professional video production for fashion brands and e-commerce  
**Design Language:** Cinematic, bold, storytelling-focused  
**Target Audience:** Fashion brands, product companies, content creators

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

### Visual Strategy
```
1. CINEMATIC FIRST → Full-screen hero with video/image
2. PORTFOLIO-LED → Show, don't tell (video examples)
3. TYPE DIVERSITY → 8 video types clearly explained
4. SOCIAL PROOF → Platform logos, client work, metrics
5. STREAMLINED BOOKING → Clear path to contact/quote
```

### Color Palette
```
Primary BG:     #FFFFFF (White)
Secondary BG:   #000000 (Black - for hero/impact sections)
Accent:         #FF3366 (Vibrant pink/red)
Text Primary:   #111111 (Gray-900)
Text Secondary: #666666 (Gray-600)
Highlight:      #F5F5F5 (Light gray)
```

### Typography
```
Hero:           6xl-8xl Sans-serif (bold, 700)
Section Heads:  4xl-5xl Sans-serif (bold)
Card Heads:     xl-2xl Sans-serif (medium, 500)
Body:           base-lg Sans-serif (normal, 400)
Small:          sm (400)
Micro:          xs Uppercase (tracking-widest)
```

---

## PAGE STRUCTURE (11 SECTIONS)

```
1. Hero (Video Background)  → Full-screen cinematic hero with CTA
2. Video Types Grid         → 8 video types with examples
3. Platform Support         → 6 platform logos (Amazon, Shopify, etc.)
4. Process Workflow         → 4-step production process
5. Recent Work Gallery      → Video portfolio grid (8 projects)
6. Pricing & Packages       → 3-tier pricing table
7. Value Propositions       → 4 key benefits with icons
8. Client Testimonials      → Video testimonials or quotes
9. Equipment & Studio       → Behind-the-scenes photos
10. Contact Form            → Booking form with project details
11. Footer                  → Standard footer
```

---

## WIREFRAMES

### Desktop Layout (1440px)
```
┌─────────────────────────────────────────────────────────┐
│  HERO (Full-screen, video background)                  │
│                                                         │
│           Headline                                      │
│           Subheadline                                   │
│           [ CTA Button ]                                │
│                                                         │
│  (Auto-playing background video or image)              │
└─────────────────────────────────────────────────────────┘
│  VIDEO TYPES (4x2 grid, 8 cards)                       │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐          │
│  │ Type 1 │ │ Type 2 │ │ Type 3 │ │ Type 4 │          │
│  └────────┘ └────────┘ └────────┘ └────────┘          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐          │
│  │ Type 5 │ │ Type 6 │ │ Type 7 │ │ Type 8 │          │
│  └────────┘ └────────┘ └────────┘ └────────┘          │
├─────────────────────────────────────────────────────────┤
│  PLATFORMS (6 logos in row)                            │
│  [Amazon] [Shopify] [Instagram] [Facebook] [TikTok] [YouTube]
├─────────────────────────────────────────────────────────┤
│  PROCESS (4 steps horizontal)                          │
│  1 ──→ 2 ──→ 3 ──→ 4                                  │
├─────────────────────────────────────────────────────────┤
│  PORTFOLIO (4x2 grid, 8 videos)                        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                         │
│  │ V1 │ │ V2 │ │ V3 │ │ V4 │                         │
│  └────┘ └────┘ └────┘ └────┘                         │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                         │
│  │ V5 │ │ V6 │ │ V7 │ │ V8 │                         │
│  └────┘ └────┘ └────┘ └────┘                         │
├─────────────────────────────────────────────────────────┤
│  PRICING (3 cards)                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐                           │
│  │Basic │ │ Pro  │ │Custom│                           │
│  └──────┘ └──────┘ └──────┘                           │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (375px)
```
┌─────────────────┐
│  HERO           │
│  (Full screen)  │
│  Headline       │
│  Subheadline    │
│  [ CTA ]        │
├─────────────────┤
│  VIDEO TYPE 1   │
│  ┌────────────┐ │
│  │  Card      │ │
│  └────────────┘ │
│  VIDEO TYPE 2   │
│  (Stacked 1col) │
├─────────────────┤
│  PLATFORMS      │
│  (2x3 grid)     │
├─────────────────┤
│  PROCESS        │
│  Step 1         │
│  ↓              │
│  Step 2         │
│  (Vertical)     │
├─────────────────┤
│  PORTFOLIO      │
│  (1-2 columns)  │
└─────────────────┘
```

---

## SECTION 1: HERO (VIDEO BACKGROUND)

### Layout
```
Full viewport height (100vh)
Background: Black with video/image overlay
Text: White, centered
Z-index layering: Video < Overlay < Content
```

### Content
```
HEADLINE:
"Fashion Video Production That Sells"

SUBHEADLINE:
"From product demos to brand films—high-quality video content 
optimized for e-commerce, social media, and campaigns."

CTA 1: "Get a Quote" → /contact (bright pink button)
CTA 2: "View Our Work" → #portfolio (white outline button)

SCROLL INDICATOR:
Animated chevron down (bounce loop)
```

### Background Video/Image
```
Option 1: Looping video (15-30s)
- Muted auto-play
- Fashion shoot behind-the-scenes
- Slow motion shots
- Fade to black at loop point

Option 2: Static hero image
- High-contrast fashion video production shot
- Camera, lights, model
- Cinematic framing

Search: "fashion video production behind scenes"
OR: "fashion film shooting studio lights"

Overlay: rgba(0,0,0,0.4) - dark overlay for text readability
```

### Animations
```typescript
// Hero entrance
Headline: { opacity: 0, y: 30 } → { opacity: 1, y: 0 } (1s delay: 0.3s)
Subheadline: { opacity: 0, y: 30 } → { opacity: 1, y: 0 } (1s delay: 0.5s)
CTAs: { opacity: 0, scale: 0.9 } → { opacity: 1, scale: 1 } (0.8s delay: 0.7s)
Scroll indicator: Bounce animation (infinite loop)

// Background video
Fade in from black (2s)
Parallax scroll effect (optional)

// CTA hover
Pink button: Glow effect, scale 1.05
Outline button: Fill with white, text black
```

### Responsive
```
Desktop (1024px+):
- Full viewport height
- Video background plays
- Large text (8xl)

Tablet (768-1023px):
- Reduced height (80vh)
- Video still plays (optional: disable for performance)
- Medium text (6xl)

Mobile (<768px):
- Auto height based on content
- Static image instead of video (performance)
- Smaller text (4xl)
- CTAs stacked full-width
```

---

## SECTION 2: VIDEO TYPES GRID

### Layout
```
Grid: 4 columns (desktop), 2 (tablet), 1 (mobile)
Gap: 24px
Background: White
Padding: 96px vertical
```

### 8 Video Types

#### Type 1: Product Overview Video
```
Icon: Video (lucide-react)
Title: "Product Overview Video"
Description: "A clear intro showing features and value."
Use Case: "Perfect for product pages and ads"
Duration: "30-60 seconds"
Price Range: "From $500"

Image: Product being filmed on white background
Search: "product video filming setup"
```

#### Type 2: Unboxing Video
```
Icon: Package
Title: "Unboxing Video"
Description: "Reveals packaging, scale, and first impressions."
Use Case: "Builds excitement and trust"
Duration: "1-3 minutes"
Price Range: "From $400"

Image: Hands unboxing luxury product
Search: "unboxing luxury product video"
```

#### Type 3: How-To / Setup Video
```
Icon: FileText
Title: "How-To / Setup Video"
Description: "Step-by-step usage or assembly instructions."
Use Case: "Reduces support tickets"
Duration: "2-5 minutes"
Price Range: "From $600"

Image: Tutorial-style demonstration
Search: "product tutorial video production"
```

#### Type 4: Explainer Video
```
Icon: Lightbulb
Title: "Explainer Video"
Description: "Highlights the problem, solution, and benefits."
Use Case: "Great for landing pages"
Duration: "60-90 seconds"
Price Range: "From $800"

Image: Animated or live-action explainer
Search: "explainer video production"
```

#### Type 5: Lifestyle Video
```
Icon: Users
Title: "Lifestyle Video"
Description: "Shows real-life usage that inspires customers."
Use Case: "Builds emotional connection"
Duration: "30-60 seconds"
Price Range: "From $1,200"

Image: Model using product in lifestyle setting
Search: "lifestyle fashion video shoot"
```

#### Type 6: Comparison Video
```
Icon: ShoppingBag
Title: "Comparison Video"
Description: "Side-by-side comparison to highlight advantages."
Use Case: "Converts undecided buyers"
Duration: "60-90 seconds"
Price Range: "From $700"

Image: Split-screen product comparison
Search: "product comparison video"
```

#### Type 7: Testimonial & UGC Video
```
Icon: MessageSquare
Title: "Testimonial & UGC Video"
Description: "Social-proof content from customers or influencers."
Use Case: "Builds trust and credibility"
Duration: "15-60 seconds"
Price Range: "From $300"

Image: Customer or influencer speaking to camera
Search: "customer testimonial video"
```

#### Type 8: 360° Product Video
```
Icon: RotateCw
Title: "360° Product Video"
Description: "Rotational product views for Amazon/ecommerce."
Use Case: "Increases conversion rates"
Duration: "10-30 seconds"
Price Range: "From $350"

Image: Product on turntable
Search: "360 product video turntable"
```

### Card Design
```
Background: White
Border: 1px gray-200
Border radius: xl
Padding: 24px
Aspect ratio: 4:3 (image)
Hover: Shadow increase, slight lift

Icon: 32px, accent color
Title: lg font-medium
Description: sm text-gray-600
Use case: xs text-gray-500 italic
Duration + Price: xs font-medium
CTA: "Learn More" or "Get Quote"
```

### Animations
```typescript
// Grid entrance
Stagger: 0.1s delay between cards
Effect: { opacity: 0, y: 20 } → { opacity: 1, y: 0 }

// Card hover
Image: Scale 1.05
Card: Lift -4px
Shadow: Increase depth
Border: Color change to accent
```

---

## SECTION 3: PLATFORM SUPPORT

### Layout
```
Background: #F5F5F5 (light gray)
Padding: 80px vertical
Centered content
Max-width: 1200px
```

### Content
```
HEADLINE: "Optimized for Every Platform"
SUBHEADLINE: "Video specs, formats, and aspect ratios tailored for each channel"

PLATFORMS (6):
1. Amazon (logo: 🛒)
   - 16:9 or 1:1
   - MP4, H.264
   - Max 5MB

2. Shopify (logo: 🛍️)
   - 16:9 recommended
   - MP4, WebM
   - Autoplay support

3. Instagram (logo: 📷)
   - 1:1, 4:5, 9:16
   - 60s max (feed)
   - MP4

4. Facebook (logo: 👥)
   - 1:1 or 16:9
   - 240 minutes max
   - MP4, MOV

5. TikTok (logo: 🎵)
   - 9:16 vertical
   - 60s max
   - MP4, MOV

6. YouTube (logo: ▶️)
   - 16:9
   - Unlimited length
   - 4K support
```

### Design
```
Logo size: 64px (emoji or actual logo)
Platform name: medium font-medium
Specs: sm text-gray-600
Grid: 6 columns (desktop), 3 (tablet), 2 (mobile)
Hover: Scale effect on logo
```

---

## SECTION 4: PROCESS WORKFLOW

### Layout
```
Background: White
Padding: 96px vertical
Max-width: 1200px
Horizontal timeline (desktop), vertical (mobile)
```

### 4 Steps

#### Step 1: Planning & Pre-Production
```
Number: "01"
Title: "Planning & Pre-Production"
Description: "We start with a creative brief to understand your brand, 
goals, and target audience."

Tasks:
- Creative brief & storyboarding
- Location scouting (if needed)
- Talent casting & scheduling
- Shot list creation

Duration: "1-3 days"
Icon: Lightbulb
```

#### Step 2: Production
```
Number: "02"
Title: "Production Day"
Description: "Our team handles all filming with professional equipment 
and experienced crew."

Tasks:
- Multi-camera setup
- Professional lighting
- Audio recording
- On-set direction

Duration: "1-2 days"
Icon: Video
```

#### Step 3: Post-Production
```
Number: "03"
Title: "Post-Production"
Description: "Editing, color grading, sound design, and motion graphics 
to polish your video."

Tasks:
- Video editing & cuts
- Color grading
- Sound mixing & music
- Graphics & titles

Duration: "5-10 days"
Icon: Settings
```

#### Step 4: Delivery & Optimization
```
Number: "04"
Title: "Delivery & Optimization"
Description: "We deliver in all required formats optimized for each platform."

Tasks:
- Format conversion (MP4, MOV, WebM)
- Platform-specific exports (Instagram, Amazon, etc.)
- Thumbnail creation
- Subtitle files (SRT)

Duration: "1-2 days"
Icon: Check
```

### Timeline Design
```
Desktop:
- Horizontal flow with connecting line
- Steps evenly spaced
- Number badge above, content below

Mobile:
- Vertical flow
- Connecting line on left
- Number badge left-aligned

Styling:
- Number: Circle badge, accent bg, white text
- Line: Dotted or solid, gray-300
- Card: White bg, border, padding
```

### Animations
```typescript
// Timeline draw
Line animates from left to right (or top to bottom)
Steps fade in as line reaches them
Stagger delay: 0.3s

// Hover
Step card: Lift effect
Number badge: Scale pulse
```

---

## SECTION 5: RECENT WORK GALLERY

### Layout
```
Grid: 4 columns (desktop), 2 (tablet), 1-2 (mobile)
Gap: 16px
Background: #F5F5F5
Padding: 96px vertical
```

### Projects (8)

```
1. "Beauty Campaign" - Fashion
   Image: Beauty product video still
   Category: Fashion
   Duration: 60s

2. "Product Launch" - Ecommerce
   Image: Product video filming
   Category: Ecommerce
   Duration: 45s

3. "Lifestyle Story" - Brand
   Image: Lifestyle video shoot
   Category: Brand
   Duration: 90s

4. "Fashion Film" - Editorial
   Image: Cinematic fashion film
   Category: Editorial
   Duration: 120s

5. "Unboxing Series" - Product
   Image: Unboxing video
   Category: Product
   Duration: 180s

6. "Tutorial Video" - How-To
   Image: Tutorial setup
   Category: How-To
   Duration: 240s

7. "Brand Story" - Commercial
   Image: Commercial shoot
   Category: Commercial
   Duration: 60s

8. "Product 360" - Ecommerce
   Image: 360 turntable
   Category: Ecommerce
   Duration: 15s
```

### Card Design
```
Aspect ratio: 16:9 (video standard)
Thumbnail: Video still or poster frame
Play icon overlay (optional)
Hover state:
  - Thumbnail: Slight zoom
  - Overlay: Darken with play button
  - Title + category slide up

Title: medium font-medium
Category: xs uppercase tracking-widest
Duration: xs text-gray-500
```

### Animations
```typescript
// Grid entrance
Stagger fade in (0.1s delay per card)

// Hover
Thumbnail: Scale 1.05
Overlay: Opacity 0 → 0.7
Play button: Scale pulse
Text: Slide up from bottom
```

---

## SECTION 6: PRICING & PACKAGES

### Layout
```
Grid: 3 columns (desktop), 1 (mobile)
Gap: 32px
Background: White
Padding: 96px vertical
Max-width: 1200px centered
```

### Packages

#### Basic Package
```
Name: "Single Video"
Price: "$500 - $1,500"
Best for: "Product demos & short clips"

Includes:
- 1 video (30-60 seconds)
- 1 concept/angle
- Basic editing & color grading
- 1 round of revisions
- Delivery in 2 formats (MP4, MOV)
- 7-10 day turnaround

Ideal for:
- Product overview videos
- Unboxing videos
- 360° product spins

CTA: "Get Started" → /contact
```

#### Professional Package
```
Name: "Multi-Video Bundle"
Price: "$2,500 - $5,000"
Best for: "Campaign content & social media"
Badge: "Most Popular"

Includes:
- 3-5 videos (30-90 seconds each)
- Multiple concepts/angles
- Professional editing & grading
- 2 rounds of revisions
- Delivery in 4 formats (all platforms)
- Licensed music & graphics
- 10-14 day turnaround

Ideal for:
- Lifestyle videos
- Testimonials
- Social media campaigns

CTA: "Get Started" → /contact
```

#### Enterprise Package
```
Name: "Custom Production"
Price: "Custom Quote"
Best for: "Brand films & complex projects"

Includes:
- Unlimited videos
- Full creative direction
- Advanced editing & VFX
- Unlimited revisions
- Multi-format delivery
- On-location shoots
- Dedicated producer
- Flexible timeline

Ideal for:
- Fashion films
- Brand documentaries
- Multi-platform campaigns

CTA: "Contact Sales" → /contact
```

### Card Design
```
Background: White
Border: 2px solid
Border color: gray-200 (Basic/Enterprise), accent (Professional)
Border radius: 2xl
Padding: 48px
Shadow: Hover increases

Badge: "Most Popular" (Professional only)
  - Position: Top right
  - Background: Accent pink
  - Text: White, xs uppercase

Price: 3xl serif font-bold
Features: Check icons + text list
CTA: Full-width button
```

### Animations
```typescript
// Cards entrance
Stagger from left to right
Scale from 0.95 to 1.0

// Hover
Professional package: Glow effect
All cards: Lift + shadow increase
```

---

## SECTION 7: VALUE PROPOSITIONS

### Layout
```
Grid: 2x2 (desktop), 1 column (mobile)
Background: Black
Text: White
Padding: 96px vertical
Max-width: 1200px
```

### 4 Benefits

#### Benefit 1: Fast Turnaround
```
Icon: Zap
Title: "Fast Turnaround"
Description: "Most projects delivered in 7-14 days, with rush options available."
Stat: "7-14 days avg"
```

#### Benefit 2: Professional Equipment
```
Icon: Video
Title: "Professional Equipment"
Description: "4K cameras, professional lighting, and cinema-grade audio."
Stat: "4K quality"
```

#### Benefit 3: Platform Optimization
```
Icon: Globe
Title: "Platform Optimization"
Description: "Every video optimized for Amazon, Instagram, TikTok, and more."
Stat: "6+ platforms"
```

#### Benefit 4: Unlimited Revisions
```
Icon: RotateCw
Title: "Unlimited Revisions"
Description: "We don't stop until you're 100% happy with the final result."
Stat: "100% satisfaction"
```

### Card Design
```
Background: Transparent with border (white/20)
Padding: 32px
Border radius: xl
Hover: Background white/10

Icon: 48px white
Title: xl font-bold white
Description: base text-gray-300
Stat: 2xl font-bold accent pink
```

---

## SECTION 8: CLIENT TESTIMONIALS

### Layout
```
Carousel or 3-column grid
Background: #F5F5F5
Padding: 96px vertical
Max-width: 1200px
```

### Testimonials (3-6)

```
Testimonial 1:
Quote: "FashionOS created stunning product videos that tripled our 
Amazon conversion rate. Professional, fast, and worth every penny."
Author: "Emma Chen"
Role: "Founder, Silk & Stone Jewelry"
Avatar: Professional headshot
Rating: 5 stars

Testimonial 2:
Quote: "The lifestyle videos they produced perfectly captured our 
brand essence. Our Instagram engagement increased 200%."
Author: "Marcus Rodriguez"
Role: "Creative Director, Urban Threads"
Avatar: Professional headshot
Rating: 5 stars

Testimonial 3:
Quote: "From concept to delivery, the process was seamless. The 
final fashion film exceeded all expectations."
Author: "Sophie Laurent"
Role: "CEO, Maison Lumière"
Avatar: Professional headshot
Rating: 5 stars
```

### Card Design
```
Background: White
Padding: 32px
Border radius: xl
Shadow: sm

Quote: lg text, italic
Stars: 5x star icons, accent color
Author: medium font-medium
Role: sm text-gray-600
Avatar: 56px circle
```

---

## SECTION 9: EQUIPMENT & STUDIO

### Layout
```
2-column split (desktop), stacked (mobile)
Background: White
Padding: 96px vertical
```

### Content
```
Left side (50%):
HEADLINE: "Professional Studio & Equipment"

BODY:
"Our in-house studio is equipped with everything needed for 
high-quality video production—from 4K cameras to professional 
lighting, green screens, and audio recording equipment."

EQUIPMENT LIST:
- Sony A7S III 4K cameras (3x)
- Professional lighting kit (Aputure 600D)
- Wireless lavalier microphones
- Motorized slider & gimbal
- Teleprompter
- Green screen cyclorama
- Product turntable
- Editing suite (Adobe Premiere Pro, DaVinci Resolve)

Right side (50%):
IMAGE GRID (2x2):
- Camera setup
- Lighting rig
- Studio space
- Behind-the-scenes
```

### Images
```
Search queries:
1. "professional video production studio camera setup"
2. "video lighting rig professional"
3. "fashion video studio space"
4. "video production behind scenes equipment"

Grid: 2x2, gap 16px, aspect 1:1
Hover: Slight zoom on each image
```

---

## SECTION 10: CONTACT FORM

### Layout
```
Background: #F5F5F5
Padding: 96px vertical
Max-width: 600px centered
```

### Form Fields
```
HEADLINE: "Ready to Start Your Video Project?"
SUBHEADLINE: "Fill out the form below and we'll send you a custom quote."

Fields:
1. Name (text input, required)
2. Email (email input, required)
3. Brand/Company (text input, required)
4. Video Type (dropdown, required)
   - Product Overview
   - Unboxing
   - Lifestyle
   - Fashion Film
   - Other
5. Quantity (number input, default: 1)
6. Budget Range (dropdown)
   - Under $1,000
   - $1,000 - $3,000
   - $3,000 - $5,000
   - $5,000+
   - Not sure
7. Project Details (textarea, optional)
8. Deadline (date picker, optional)

Submit button: "Get Custom Quote" → POST /api/contact

Success message: "Thanks! We'll send you a quote within 24 hours."
```

### Form Design
```
Background: White
Border radius: xl
Padding: 48px
Shadow: lg

Input styling:
- Border: 1px gray-300
- Border radius: md
- Padding: 12px
- Focus: Border accent pink, ring
- Font size: base

Button:
- Full width
- Background: Accent pink
- Text: White
- Padding: 16px
- Border radius: md
- Hover: Darken
```

---

## SECTION 11: FOOTER

```
See /components/Footer.tsx for implementation
Standard footer with navigation, contact, social, copyright
```

---

## MULTI-STEP IMPLEMENTATION

### STEP 1: Structure & Foundation
```
PROMPT:
"Create a fashion video production services page with React, TypeScript, 
and Tailwind CSS. Structure includes:

1. Hero section (full viewport height, video/image background, centered text)
2. Video types grid (4 columns, 8 cards with icons)
3. Platform support (6 platform logos in row)
4. Process workflow (4 steps, horizontal timeline)
5. Recent work gallery (4 columns, 8 video thumbnails)
6. Pricing packages (3 columns, 3 tiers)
7. Value propositions (2x2 grid, dark background)
8. Client testimonials (carousel or 3 columns)
9. Equipment & studio (2-column split with image grid)
10. Contact form (centered, max-width 600px)
11. Footer

Backgrounds: White, Black (hero + value props), #F5F5F5 (alternating). 
Use motion/react for animations. Container: max-w-7xl mx-auto. Padding: 
px-6 lg:px-12."
```

### STEP 2: Typography & Content
```
PROMPT:
"Add all content to the video production page:

HERO:
- Headline: 'Fashion Video Production That Sells' (6xl-8xl bold)
- Subheadline: 'From product demos to brand films...' (lg-xl)
- CTAs: 'Get a Quote', 'View Our Work'

VIDEO TYPES (8 cards):
Each with icon, title, description, use case, duration, price range
(See Section 2 for all 8 types)

PLATFORMS (6):
Amazon, Shopify, Instagram, Facebook, TikTok, YouTube
(Each with emoji/logo, specs, format details)

PROCESS (4 steps):
1. Planning & Pre-Production (1-3 days)
2. Production Day (1-2 days)
3. Post-Production (5-10 days)
4. Delivery & Optimization (1-2 days)
(Each with tasks list)

PRICING (3 packages):
- Single Video: $500-$1,500
- Multi-Video Bundle: $2,500-$5,000 ('Most Popular' badge)
- Custom Production: Custom Quote
(Each with includes list, ideal for, CTA)

VALUE PROPS (4):
Fast Turnaround, Professional Equipment, Platform Optimization, 
Unlimited Revisions

TESTIMONIALS (3):
Emma Chen, Marcus Rodriguez, Sophie Laurent (with quotes, roles, ratings)

Use sans-serif throughout. Bold headlines, normal body text."
```

### STEP 3: Images & Visual Assets
```
PROMPT:
"Add images using ImageWithFallback:

HERO BACKGROUND:
- Option 1: Auto-playing looping video (muted, 15-30s)
- Option 2: Static cinematic image
- Dark overlay: rgba(0,0,0,0.4)
  Search: 'fashion video production behind scenes' or 
  'fashion film shooting studio lights'

VIDEO TYPES (8 thumbnail images):
Searches:
1. 'product video filming setup'
2. 'unboxing luxury product video'
3. 'product tutorial video production'
4. 'explainer video production'
5. 'lifestyle fashion video shoot'
6. 'product comparison video'
7. 'customer testimonial video'
8. '360 product video turntable'

PORTFOLIO GALLERY (8 video stills):
- 16:9 aspect ratio thumbnails
- Play icon overlay
  Searches: 'beauty product commercial', 'fashion video production', 
  'lifestyle brand video', 'cinematic fashion film'

EQUIPMENT GRID (4 images, 2x2):
Searches: 'professional video camera setup', 'video lighting rig', 
'fashion video studio', 'video production equipment'

TESTIMONIAL AVATARS (3):
Search: 'professional entrepreneur portrait'

Icons from lucide-react: Video, Package, FileText, Lightbulb, Users, 
ShoppingBag, MessageSquare, RotateCw, ArrowRight, Play, Check, Zap, 
Globe, Settings.

All images: hover:scale-105 transition. Alt text for accessibility."
```

### STEP 4: Animations & Interactions
```
PROMPT:
"Add animations using motion/react:

HERO:
- Headline: { opacity: 0, y: 30 } → { opacity: 1, y: 0 } (1s delay: 0.3s)
- Subheadline: { opacity: 0, y: 30 } → { opacity: 1, y: 0 } (1s delay: 0.5s)
- CTAs: { opacity: 0, scale: 0.9 } → { opacity: 1, scale: 1 } (0.8s delay: 0.7s)
- Background video: Fade in from black (2s)
- CTA hover: Pink button glow + scale 1.05

VIDEO TYPES GRID:
- Stagger cards (0.1s delay each)
- { opacity: 0, y: 20 } → { opacity: 1, y: 0 }
- Hover: Card lift -4px, image scale 1.05, border accent

TIMELINE (PROCESS):
- Line draws from left to right (desktop) or top to bottom (mobile)
- Steps fade in as line reaches them (stagger 0.3s)
- Hover: Step card lift, number badge scale pulse

PORTFOLIO:
- Stagger fade in (0.1s per card)
- Hover: Thumbnail zoom 1.05, overlay darken, play button pulse

PRICING:
- Stagger from left to right, scale 0.95 → 1.0
- Hover: Professional package glow, all cards lift + shadow

VALUE PROPS:
- Stagger 2x2 grid
- Hover: Background white/10

TESTIMONIALS:
- If carousel: Auto-rotate 5s, pause on hover
- If grid: Stagger fade in

CONTACT FORM:
- Input focus: Border accent pink, ring effect
- Submit button hover: Darken background

All scroll-triggered: whileInView with viewport={{ once: true }}."
```

### STEP 5: Responsive Design
```
PROMPT:
"Make fully responsive:

HERO:
Desktop: Full viewport (100vh), large text (8xl)
Tablet: 80vh, medium text (6xl), video plays
Mobile: Auto height, static image (not video), small text (4xl), 
stacked CTAs

VIDEO TYPES:
Desktop: 4 columns
Tablet: 2 columns
Mobile: 1 column

PLATFORMS:
Desktop: 6 columns (1 row)
Tablet: 3 columns (2 rows)
Mobile: 2 columns (3 rows)

TIMELINE:
Desktop: Horizontal (left to right)
Mobile: Vertical (top to bottom with left connecting line)

PORTFOLIO:
Desktop: 4 columns
Tablet: 2 columns
Mobile: 1-2 columns

PRICING:
Desktop: 3 cards side-by-side
Tablet: 2 cards + 1 below
Mobile: Stacked (1 column)

VALUE PROPS:
Desktop: 2x2 grid
Mobile: 1 column

EQUIPMENT:
Desktop: 50/50 split (text + image grid)
Mobile: Stacked

Typography scaling:
Hero: 8xl → 6xl → 4xl
Sections: 4xl → 3xl → 2xl
Body: lg → base

Touch targets: 44px minimum on mobile
Padding: 96px → 64px → 40px
Use Tailwind: sm:, md:, lg:, xl:"
```

### STEP 6: Routes, Links & Forms
```
PROMPT:
"Wire up navigation and forms:

NAVIGATION:
const handleNavigate = (href: string) => {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

HERO:
- 'Get a Quote' → /contact
- 'View Our Work' → #portfolio (smooth scroll)

VIDEO TYPES:
- Optional: Each card 'Learn More' → detail page or modal

PORTFOLIO:
- Each video → Opens lightbox/modal with full video player
- Or links to /portfolio/[slug]

PRICING:
- All CTAs → /contact (with package parameter)

CONTACT FORM:
- useState for form data
- handleSubmit: Validate with Zod
- POST to /api/contact (future: Supabase)
- Success: Show confirmation message
- Error: Display error state

Form validation:
- Name, email required
- Email format check
- Video type dropdown required
- Budget optional

Smooth scroll: html { scroll-behavior: smooth; }
All buttons: onClick={handleNavigate} for SPA routing."
```

---

## USER JOURNEYS

### Journey 1: Product Video Inquiry
```
1. User lands from Google search "product video production"
2. Watches hero video background (5 seconds)
3. Reads headline + subheadline
4. Scrolls to Video Types Grid
5. Clicks "Product Overview Video" card
6. Reads description, price range ($500-$1,500)
7. Continues to Portfolio Gallery
8. Watches 2-3 video examples
9. Scrolls to Pricing
10. Selects "Single Video" package
11. Clicks "Get Started" → Contact form
12. Fills form: Name, email, brand, video type (Product Overview)
13. Submits inquiry
14. Receives confirmation email
```

### Journey 2: Multi-Video Campaign
```
1. User arrives from Instagram ad
2. Immediately scrolls to Pricing
3. Compares packages
4. Sees "Multi-Video Bundle" is most popular
5. Opens FAQ (if available) or reads package details
6. Scrolls to Portfolio to see examples
7. Clicks 3-4 videos to preview
8. Reads Client Testimonials for social proof
9. Returns to Pricing
10. Clicks "Get Started" on Professional Package
11. Fills contact form with detailed project description
12. Submits inquiry
```

### Journey 3: Research & Compare
```
1. User exploring video production options
2. Lands on page from organic search
3. Scrolls through entire page top to bottom
4. Reads all Video Types (8 cards)
5. Checks Platform Support section
6. Reviews Process Workflow (4 steps)
7. Examines Equipment & Studio section
8. Reads all Testimonials
9. Compares Pricing packages
10. Bookmarks page for later
11. Leaves without submitting (consideration phase)
12. Returns in 2-3 days
13. Directly scrolls to Contact Form
14. Submits inquiry
```

---

## ROUTES & WORKFLOWS

### On-Page Routes
```
/video                          → Main service page
/video#hero                     → Hero section
/video#video-types              → Video types grid
/video#platforms                → Platform support
/video#process                  → Workflow
/video#portfolio                → Gallery
/video#pricing                  → Pricing packages
/video#value                    → Value propositions
/video#testimonials             → Testimonials
/video#equipment                → Equipment & studio
/video#contact                  → Contact form
```

### External Links
```
Header:
/                               → Homepage
/services                       → Services overview
/video                          → This page
/ecommerce-photography          → Photography services
/web-design                     → Web design services

Portfolio:
/portfolio                      → Full video portfolio
/portfolio/[slug]               → Individual video detail

CTAs:
/contact                        → Contact form
/contact?package=single         → Pre-selected Single Video
/contact?package=multi          → Pre-selected Multi-Video Bundle
/contact?package=custom         → Pre-selected Custom Production
```

### Workflow: Contact Form Submission
```
1. User fills form:
   - Name (required)
   - Email (required)
   - Brand (required)
   - Video Type dropdown (required)
   - Quantity (default: 1)
   - Budget Range (optional)
   - Project Details (optional)
   - Deadline (optional)

2. Client-side validation (Zod):
   - Check all required fields
   - Validate email format
   - Ensure video type selected

3. On submit:
   - POST to /api/contact
   - Payload: { name, email, brand, videoType, quantity, budget, 
                details, deadline, source: "video-services" }

4. Backend (future - Supabase):
   - Insert into inquiries table
   - Send email to sales team
   - Send auto-reply to user
   - Assign to salesperson

5. Success state:
   - Show confirmation: "Thanks! We'll send you a quote within 24 hours."
   - Hide form, show success message
   - Optional: Redirect to thank-you page

6. Error state:
   - Display error message above form
   - Keep form data intact
   - Allow retry
```

---

## MOBILE OPTIMIZATION

### Mobile-Specific Enhancements
```
✓ Touch targets: 44x44px minimum
✓ Font sizes: 16px base (prevents zoom on focus)
✓ Form inputs: Large, easy to tap
✓ Video background: Static image on mobile (performance)
✓ Carousels: Swipe gestures enabled
✓ CTAs: Full-width, prominent
✓ Sticky header: Collapsed/hamburger menu
✓ Portfolio: 1-2 columns, larger thumbnails
✓ Contact form: Native keyboard optimization
```

### Performance Targets (Mobile)
```
First Contentful Paint: < 1.5s
Largest Contentful Paint: < 2.5s
Time to Interactive: < 3s
Video load: Lazy, user-initiated
Total Page Weight: < 3MB (excluding video)
```

---

## TESTING CHECKLIST

```
Desktop (1920x1080):
□ Hero video autoplays (muted)
□ All sections render correctly
□ Images load properly
□ Animations smooth (60fps)
□ CTAs functional
□ Grid layouts correct
□ Timeline horizontal
□ Form validation works

Tablet (768x1024):
□ Grids adjust (4→2 columns)
□ Touch targets adequate
□ Video still plays (optional)
□ Timeline still readable

Mobile (375x667):
□ Hero uses static image
□ Single column layouts
□ Full-width CTAs
□ Portfolio 1-2 columns
□ Timeline vertical
□ Form easy to fill
□ No horizontal scroll
□ Native keyboards work

Cross-Browser:
□ Chrome (desktop + mobile)
□ Safari (desktop + iOS)
□ Firefox
□ Edge

Accessibility:
□ Keyboard navigation
□ Screen reader compatible
□ Alt text on all images
□ ARIA labels on form
□ Color contrast AAA
□ Focus states visible
□ Video controls accessible
```

---

**Document Version:** 1.0  
**Lines:** 997  
**Last Updated:** December 22, 2024  
**Status:** Implementation Ready
