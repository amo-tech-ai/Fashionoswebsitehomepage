# FASHIONOS — E-COMMERCE FASHION PHOTOGRAPHY & VIDEO PAGE

**Purpose:** Convert online shoppers with high-impact fashion photography and video  
**Design Language:** Editorial meets commercial, conversion-optimized  
**Target Audience:** E-commerce fashion brands, online retailers, DTC brands

---

## TABLE OF CONTENTS

1. [Design Principles](#design-principles)
2. [Page Structure (10 Sections)](#page-structure)
3. [Section Details](#section-details)
4. [Multi-Step Implementation](#multi-step-implementation)
5. [Routes & Links](#routes--links)
6. [Responsive Strategy](#responsive-strategy)
7. [Animation Library](#animation-library)

---

## DESIGN PRINCIPLES

### Visual Strategy
```
1. EDITORIAL QUALITY → Commercial conversion
2. MINIMIZE FRICTION → Clear packages, fast CTAs
3. SOCIAL PROOF → Use cases, testimonials, portfolio
4. TECHNICAL CONFIDENCE → Show process, FAQs, deliverables
5. LUXURY AESTHETIC → Minimal, high-contrast, serif typography
```

### Color Palette
```
Primary:        #000000 (Black)
Secondary:      #FFFFFF (White)
Accent:         #F5F5F0 (Warm off-white)
Dark BG:        #1a1a1a (Charcoal)
Text Primary:   #000000 (Black)
Text Secondary: #666666 (Gray-600)
Text Tertiary:  #999999 (Gray-400)
```

### Typography Scale
```
Hero Headline:  6xl-7xl (60-72px) Serif, tracking-tight
Section Heads:  4xl-5xl (36-48px) Serif
Subheads:       3xl (30px) Serif
Body Large:     xl (20px) Light, gray-600
Body Regular:   base-lg (16-18px) Light, gray-600
Small Text:     sm (14px) Gray-500
Micro Text:     xs (11-12px) Uppercase, tracking-widest
```

---

## PAGE STRUCTURE (10 SECTIONS)

```
1. Hero Section                  → Full-width hero with asymmetrical image grid
2. Editorial Statement           → Text + 3x3 image grid
3. Horizontal Scrolling Gallery  → Parallax scroll gallery (6 images)
4. Video Services                → Split layout (text + video image)
5. Comprehensive Services Grid   → 6 cards (packages, pricing, process)
6. Quote Section                 → Testimonial with portrait
7. Use Cases                     → Alternating image/text rows (3 cases)
8. FAQ                           → Accordion-style Q&A (4 questions)
9. Final CTA                     → Centered conversion section
10. Footer                       → Links, contact, copyright
```

---

## SECTION DETAILS

### SECTION 1: HERO SECTION

#### Layout
```
Grid: 12-column layout (desktop)
- Left: 5 columns (text content)
- Right: 7 columns (asymmetrical image grid)

Mobile: Stacked (text top, images hidden or simplified)
Height: 600px (desktop), auto (mobile)
```

#### Content
```
HEADLINE:
"Ecommerce
Fashion
Photography
& Video"

Note: "& Video" in italic gray-400

SUBHEADLINE:
"High-impact visuals built to convert online shoppers. 
Editorial quality, optimized for the digital shelf."

CTA 1: "View Packages" → /packages (black button)
CTA 2: "How It Works" → #how-it-works (gray underline link)
```

#### Image Grid (Right Side)
```
Image 1 (Large):
- Position: Top right, 60% width, 90% height
- Parallax: Moves at 0.5x scroll speed
- Image: Studio model full-body shot
- Search: "fashion model studio white background full body"

Image 2 (Small):
- Position: Bottom left, 45% width, 60% height
- Z-index: Above Image 1
- White border/shadow for depth
- Image: Detail shot (fabric texture, accessory)
- Search: "luxury fashion detail close-up texture"
```

#### Animations
```typescript
// On page load
Headline: { opacity: 0, y: 30 } → { opacity: 1, y: 0 } (0.8s delay: 0s)
Subheadline: { opacity: 0, y: 30 } → { opacity: 1, y: 0 } (0.8s delay: 0.1s)
CTAs: { opacity: 0, y: 30 } → { opacity: 1, y: 0 } (0.8s delay: 0.2s)

// Parallax scroll
Image 1: translateY based on scroll position (0-50px range)

// Hover effects
CTA 1: background #000 → #333, padding-x 32px → 40px (0.3s)
CTA 2: color gray-500 → black, border-color gray-300 → black (0.3s)
```

#### Responsive
```
Desktop (1024px+):
- 12-column grid
- Images visible in asymmetrical layout
- Parallax active

Tablet (768-1023px):
- Images simplified or hidden
- Text centered
- CTAs stacked

Mobile (< 768px):
- Single column
- Images hidden
- Full-width CTAs
- Padding: 40px → 20px
```

---

### SECTION 2: EDITORIAL STATEMENT + IMAGE GRID

#### Layout
```
Grid: 2-column layout (50/50)
- Left: Text content
- Right: 3x3 image grid (9 images)

Gap: 48px (desktop), 32px (mobile)
```

#### Content
```
HEADING:
"Shooting Commercial
Fashion"

BODY (3 paragraphs):
1. "With a proven track record in ecommerce fashion photography 
   and video, we create high-quality visual content built for 
   modern brands and digital storefronts."

2. "Our in-house production facilities support end-to-end shoots — 
   from model direction to post-production — ensuring consistency, 
   accuracy, and speed."

3. "We focus on creating fashion imagery that performs across 
   ecommerce, campaigns, and social channels, while maintaining 
   a "right-first-time" production culture."

CTA: "Request a Quote" → /wizard (black button)
```

#### 3x3 Image Grid
```
Row 1:
- Red portrait (color accent)
- Blue studio (color accent)
- Male trench coat (neutral)

Row 2:
- Luxury handbag (product detail)
- B&W portrait (editorial)
- Yellow pose (color accent)

Row 3:
- Silver jacket (metallic)
- Beauty makeup (close-up)
- White dynamic (movement)

Search Queries:
"fashion editorial portrait color"
"luxury fashion product detail"
"fashion model studio pose dynamic"

Grid Styling:
- Gap: 0px (seamless grid)
- Aspect Ratio: 1:1 (square)
- Hover: scale 1.05, duration 0.7s
```

#### Animations
```typescript
// On scroll into view (50% threshold)
Heading: { opacity: 0, y: 20 } → { opacity: 1, y: 0 } (0.6s)
Paragraphs: { opacity: 0 } → { opacity: 1 } (0.8s delay: 0.2s)
CTA: { opacity: 0, y: 10 } → { opacity: 1, y: 0 } (0.6s delay: 0.4s)

// Grid images
Stagger: 0.1s between each image
Effect: { opacity: 0, scale: 0.95 } → { opacity: 1, scale: 1 }

// Grid hover
Image: scale 1.0 → 1.05 (0.7s ease)
```

#### Responsive
```
Desktop (1024px+):
- Side-by-side layout
- 3x3 grid intact

Tablet (768-1023px):
- Side-by-side (slightly narrower)
- 3x3 grid intact

Mobile (< 768px):
- Stacked (text top, grid bottom)
- Grid: 2x2 (show 4 images only)
- Or: 3x3 with smaller squares
```

---

### SECTION 3: HORIZONTAL SCROLLING GALLERY

#### Layout
```
Height: 300vh (creates scroll distance)
Sticky container: 100vh (viewport height)
Scroll trigger: Vertical scroll → horizontal movement
```

#### Content
```
IMAGES: 6 high-quality fashion images
- Wide format preferred (4:5 or 3:4 aspect)
- Grayscale on hover (or vice versa)

Search Queries:
1. "white studio fashion model full body"
2. "beige minimalist fashion editorial"
3. "clean denim fashion photography"
4. "high end fashion dress editorial"
5. "grey studio minimal fashion"
6. "male studio white background fashion"
```

#### Horizontal Scroll Mechanics
```typescript
// Scroll setup
Container height: 300vh
Sticky position: top: 0
Flex container: horizontal

// Transform calculation
scrollYProgress: [0, 1] (0% to 100% of section height)
x transform: ["0%", "-65%"] (move left as user scrolls down)

// Image dimensions
Desktop: 30vw width, 70vh height
Tablet: 40vw width, 70vh height
Mobile: 70vw width, 60vh height

Gap: 32px (desktop), 16px (mobile)
```

#### Animations
```typescript
// Scroll-triggered horizontal movement
motion.div style={{ x }}
x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"])

// Image hover
Grayscale: 0 → 100% (0.7s transition)
OR
Grayscale: 100% → 0 (color reveal on hover)

// Smooth scrolling
Use CSS: scroll-behavior: smooth
```

#### Responsive
```
Desktop (1024px+):
- 6 images visible during scroll
- Image width: 30vw
- Full parallax effect

Tablet (768-1023px):
- Image width: 40vw
- Reduced scroll distance

Mobile (< 768px):
- Image width: 70vw
- Simplified scroll (or static grid)
- Consider: Disable horizontal scroll, show as vertical grid
```

---

### SECTION 4: VIDEO SERVICES

#### Layout
```
Background: #F9F9F9 (light gray)
Grid: 2-column layout (50/50)
- Left: Text content with nested sections
- Right: Video still image

Padding: 96px vertical (desktop), 64px (mobile)
```

#### Content
```
HEADING:
"E-commerce Fashion
Video"

BODY (3 paragraphs):
"Our e-commerce fashion video service is designed to help your 
clothing stand out online—whether it's clean, crisp model walk-throughs, 
detailed close-ups that highlight fit and fabric or something a little 
more creative, we have it covered."

"We make it easy for you to create consistent, high-quality video 
content that works seamlessly alongside your product photography. 
Perfect for your website or social media."

"All shot and handled by our in-house team."

SUBHEADING:
"What we offer:"

OFFERINGS (3 items):
1. Catwalk-style videos
   "Full-length model walk-throughs"

2. Close-up detail shots
   "Show texture, fit, and features clearly"

3. Short-form video content
   "Ideal for social media and advertising"

FOOTER TEXT:
"If you'd like to discuss adding video to your next shoot, just get in touch."

CTA: "Let's Chat" → /contact (black button)
```

#### Image
```
Right column: Video still image
- Portrait orientation (3:4 aspect)
- Model in motion or posed
- High-quality production value

Search: "fashion video production model catwalk"
OR use imported asset: videoServiceImage
```

#### Animations
```typescript
// On scroll into view
Heading: fade in + slide up
Body: fade in (staggered paragraphs)
Offerings: fade in (staggered list items)
CTA: fade in + slide up

// Image
Fade in + scale from 0.95 to 1.0
```

#### Responsive
```
Desktop (1024px+):
- Side-by-side 50/50
- Image sticky while text scrolls (optional)

Tablet (768-1023px):
- Side-by-side (slightly adjusted)
- Image smaller

Mobile (< 768px):
- Stacked (image top, text bottom)
- Image full-width
```

---

### SECTION 5: COMPREHENSIVE SERVICES GRID

#### Layout
```
Grid: 3-column grid (6 cards total)
Cards: Rounded corners (2rem border-radius)
Min height: 500px per card
Hover: Translate Y -4px (lift effect)

Gap: 24px
```

#### Card Breakdown

##### Card 1: Featured Black Card
```
Background: Black (#000)
Text: White
Min height: 500px

CONTENT:
Heading: "E-commerce On-Model Fashion Packages"
Description: "Whether you need a few hours or a full day of shooting, 
we have a package that fits your needs. Our comprehensive services 
include both still images and video content, providing your brand 
with cohesive, on-brand visuals."

CTA: "Let's Chat" → /contact (outline button)
```

##### Card 2: Photography & Video
```
Background: #F5F5F0 (warm off-white)
Text: Black

CONTENT:
Heading: "Photography & Video"

Sections:
- Half-Day Session
  "Up to 4 hours of shooting
  Minimum of 40 selected still images and/or video files."

- Full-Day Session
  "From 9:00 AM to 5:00 PM
  Minimum of 70 selected still images and/or video files."

Footer note: 
"Photography and retouching are bundled as a package. If post-production 
isn't needed, there will be an additional charge for digital file export 
and handling. Minimums apply."
```

##### Card 3: Post-Production Services
```
Background: #F5F5F0
Text: Black

CONTENT:
Heading: "E-commerce Post-Production Services"

Description: "Our post-production services ensure your visuals are 
polished and ready for your e-commerce platform."

Services:
- Basic Editing
  "Stills per image
  Simple Video Edits per video file"

- Advanced Retouching
  "Detailed retouching for a refined, professional finish."
```

##### Card 4: What's Included
```
Background: #F5F5F0
Text: Black

CONTENT:
Heading: "What's Included"

List:
• Photographer and/or Videographer
• Studio Rental & Lighting
```

##### Card 5: What's Not Included
```
Background: #F5F5F0
Text: Black

CONTENT:
Heading: "What's Not Included"

List:
• Props
• Coloured backgrounds
• Set build
• Complex styling and art direction
• Model fees (including licensing, if applicable)
• Hair and make-up artist
• Clothing stylist
```

##### Card 6: How It Works
```
Background: #F5F5F0
Text: Black

CONTENT:
Heading: "How It Works"

Steps:
Step 1: Contact Us for an Initial Consultation
Step 2: Plan Your Shoot – Choose your package, additional services, and set your date.
Step 3: Shoot Day – Our team captures your vision.
Step 4: Post-Production – We'll polish your images and videos to perfection.
Step 5: Delivery – Receive your high-quality visuals, ready to boost your brand.
```

#### Animations
```typescript
// On scroll into view
Cards: Stagger fade in + slide up (0.1s delay between cards)

// Hover
Card: translateY(0) → translateY(-4px) (0.5s)
Card shadow: Increase shadow depth
```

#### Responsive
```
Desktop (1024px+):
- 3 columns, 2 rows
- Equal height cards

Tablet (768-1023px):
- 2 columns, 3 rows
- Card widths adjusted

Mobile (< 768px):
- 1 column
- Cards stack vertically
- Min height: 400px
```

---

### SECTION 6: QUOTE SECTION

#### Layout
```
Background: #1a1a1a (dark charcoal)
Text: White
Padding: 128px vertical (desktop), 80px (mobile)

Grid: 1/3 (image) + 2/3 (quote)
```

#### Content
```
IMAGE:
- Portrait of creative director
- Aspect ratio: 3:4
- Opacity: 0.8
- Search: "fashion creative director portrait professional"

QUOTE:
"We help fashion brands create visuals that sell — not just look good."

ATTRIBUTION:
— Sarah Jenkins, Creative Director
(Uppercase, tracking-widest, gray-400)
```

#### Animations
```typescript
// On scroll into view
Image: { opacity: 0, scale: 0.95 } → { opacity: 0.8, scale: 1 } (1s)
Quote: { opacity: 0, x: 20 } → { opacity: 1, x: 0 } (1s)
Attribution: fade in (delay: 0.3s)
```

#### Responsive
```
Desktop (1024px+):
- Side-by-side (1/3 + 2/3)
- Image height: Auto
- Quote: 5xl text

Tablet (768-1023px):
- Side-by-side (adjusted proportions)
- Quote: 4xl text

Mobile (< 768px):
- Stacked (image top, quote bottom)
- Image: Full width, reduced height
- Quote: 3xl text
```

---

### SECTION 7: USE CASES (3 Rows)

#### Layout
```
Alternating image/text rows
- Row 1: Image left, text right
- Row 2: Image right, text left (reversed)
- Row 3: Image left, text right

Each row: 50/50 split
Gap: 96px vertical between rows
```

#### Content

##### Use Case 1: Product Detail Pages
```
HEADING: "Product Detail Pages"

DESCRIPTION:
"High-fidelity shots that show texture, fit, and movement. 
Reduce returns by showing the customer exactly what they're buying."

IMAGE: Product detail shot (fabric texture, fit on model)
Search: "ecommerce fashion detail texture fit"

LAYOUT: Image left, text right
```

##### Use Case 2: Collection Launches
```
HEADING: "Collection Launches"

DESCRIPTION:
"Campaign imagery that sets the tone for your entire season. 
Cohesive, storytelling visuals that build brand equity."

IMAGE: Editorial campaign shot (multiple looks, styled)
Search: "fashion collection campaign editorial"

LAYOUT: Image right, text left (reversed)
```

##### Use Case 3: Social Campaigns
```
HEADING: "Social Campaigns"

DESCRIPTION:
"Video and stills optimized for Instagram and TikTok. 
Stop the scroll with visuals that demand attention."

IMAGE: Social-ready fashion content (dynamic, vertical format)
Search: "fashion social media content instagram"

LAYOUT: Image left, text right
```

#### Animations
```typescript
// On scroll into view (per row)
Image: { opacity: 0, scale: 0.95 } → { opacity: 1, scale: 1 } (0.8s)
Text (heading): { opacity: 0, y: 20 } → { opacity: 1, y: 0 } (0.6s delay: 0.1s)
Text (description): { opacity: 0, y: 20 } → { opacity: 1, y: 0 } (0.6s delay: 0.2s)
Divider line: width 0 → 48px (0.5s delay: 0.3s)
```

#### Responsive
```
Desktop (1024px+):
- Side-by-side alternating
- Image: 50% width
- Text: 50% width

Tablet (768-1023px):
- Stacked (all rows: image top, text bottom)
- No alternating

Mobile (< 768px):
- Stacked
- Full-width images
- Reduced padding
```

---

### SECTION 8: FAQ

#### Layout
```
Max width: 768px (centered)
Padding: 96px vertical (desktop), 64px (mobile)
Background: White
```

#### Content
```
HEADING: "Common Questions" (centered, serif, 4xl)

QUESTIONS (4 accordion items):

Q1: "What is the turnaround time?"
A1: "Standard turnaround is 5-7 business days from the shoot date. 
     Expedited 48-hour delivery is available for an additional fee."

Q2: "Can I attend the shoot?"
A2: "Absolutely. We encourage clients to be present either on-set or 
     virtually via our live-stream remote approval system."

Q3: "Do you handle model casting?"
A3: "Yes, we have a direct integration with top agencies in NY, London, 
     and Paris. We can handle the entire casting process based on your brief."

Q4: "What formats do you deliver?"
A4: "We deliver high-resolution TIFFs for print and optimized WEBPs/JPGs 
     for ecommerce, along with raw video files if requested."
```

#### Accordion Mechanics
```typescript
// State management
const [openIndex, setOpenIndex] = useState<number | null>(null);

// Toggle function
onClick={() => setOpenIndex(openIndex === index ? null : index)}

// Animation
Closed: height: 0, opacity: 0
Open: height: auto, opacity: 1
Transition: 0.3s ease

// Icons
Closed: Plus icon
Open: Minus icon
```

#### Animations
```typescript
// Accordion expand/collapse
initial: { height: 0, opacity: 0 }
animate: { height: "auto", opacity: 1 }
exit: { height: 0, opacity: 0 }
transition: { duration: 0.3 }

// Question hover
Color: black → gray-600 (0.2s)

// Icon rotation (optional)
Closed: rotate(0deg)
Open: rotate(180deg) (if using arrow)
```

#### Responsive
```
Desktop (1024px+):
- Max width: 768px
- Large text

Tablet (768-1023px):
- Max width: 600px
- Adjusted text size

Mobile (< 768px):
- Max width: 100%
- Padding: 20px
- Touch-friendly click areas (min 44px height)
```

---

### SECTION 9: FINAL CTA

#### Layout
```
Background: White
Padding: 128px vertical (desktop), 80px (mobile)
Text alignment: Center
Max width: 800px (centered)
```

#### Content
```
HEADING:
"Ready to elevate your
ecommerce visuals?"

SUBHEADING:
"Book your shoot today or schedule a consultation with our creative team."

CTA 1: "Book This Service" → /wizard (black button)
CTA 2: "Contact Us" → /contact (outline button)
```

#### Animations
```typescript
// On scroll into view
Container: { opacity: 0, y: 30 } → { opacity: 1, y: 0 } (0.8s)
Heading: Fade in
Subheading: Fade in (delay: 0.2s)
CTAs: Fade in (delay: 0.4s)

// Button hover
CTA 1: bg black → gray-800
CTA 2: border gray-200 → black
```

#### Responsive
```
Desktop (1024px+):
- CTAs side-by-side
- Heading: 5xl
- Max width: 800px

Tablet (768-1023px):
- CTAs side-by-side (narrower)
- Heading: 4xl

Mobile (< 768px):
- CTAs stacked (full width)
- Heading: 3xl
- Padding: 60px vertical
```

---

### SECTION 10: FOOTER

```
See /components/Footer.tsx for implementation
Standard footer with:
- Navigation links
- Contact information
- Social media links
- Copyright notice
```

---

## MULTI-STEP IMPLEMENTATION

### STEP 1: Structure & Layout (Foundation)

```
PROMPT:
"Create an e-commerce fashion photography page with 10 sections using 
React and Tailwind CSS. Structure includes:

1. Hero section with 12-column grid (5 cols text, 7 cols asymmetrical 
   images)
2. Editorial statement section with 2-column layout (text + 3x3 image grid)
3. Horizontal scrolling gallery section (300vh height, sticky container)
4. Video services section (2-column split layout)
5. Services grid section (3-column grid, 6 cards)
6. Quote section (dark background, 1/3 + 2/3 split)
7. Use cases section (3 alternating image/text rows)
8. FAQ section (accordion, max-width 768px)
9. Final CTA section (centered, max-width 800px)
10. Footer component

Use semantic HTML: <section>, <article>, <nav>. Apply Tailwind container 
class with responsive padding (px-6 lg:px-12). Background colors: white 
(default), #F9F9F9 (video section), #1a1a1a (quote section). Min-height 
500px for service cards."
```

### STEP 2: Typography & Content

```
PROMPT:
"Add typography and all content to the e-commerce photography page:

HERO SECTION:
- Heading: 'Ecommerce Fashion Photography & Video' (6xl-7xl serif, 
  tracking-tight, '& Video' in italic gray-400)
- Subheading: 'High-impact visuals built to convert online shoppers. 
  Editorial quality, optimized for the digital shelf.' (xl font-light 
  gray-600)
- CTAs: 'View Packages' (black button), 'How It Works' (underline link)

EDITORIAL SECTION:
- Heading: 'Shooting Commercial Fashion' (4xl-5xl serif)
- 3 paragraphs about track record, in-house facilities, performance focus
- CTA: 'Request a Quote' button

VIDEO SECTION:
- Heading: 'E-commerce Fashion Video' (4xl-5xl)
- 3 paragraphs + 'What we offer' subheading
- 3 offerings: Catwalk videos, Close-ups, Short-form content
- CTA: 'Let's Chat' button

SERVICES GRID:
- 6 cards with headings, descriptions, lists (see Card Breakdown)
- Use serif for headings (3xl), sans-serif for body (sm-base)

QUOTE SECTION:
- Quote: 'We help fashion brands create visuals that sell — not just 
  look good.' (4xl-5xl serif)
- Attribution: '— Sarah Jenkins, Creative Director' (xs uppercase)

USE CASES:
- 3 headings: 'Product Detail Pages', 'Collection Launches', 
  'Social Campaigns'
- Descriptions for each (gray-500 light)

FAQ:
- Heading: 'Common Questions' (4xl serif centered)
- 4 questions with answers (see FAQ content)

FINAL CTA:
- Heading: 'Ready to elevate your ecommerce visuals?' (5xl serif)
- Subheading: 'Book your shoot today...' (lg gray-500)
- CTAs: 'Book This Service', 'Contact Us'

Use tracking-tight for headlines, font-light for body, uppercase + 
tracking-widest for micro text."
```

### STEP 3: Images & Visual Assets

```
PROMPT:
"Add images using ImageWithFallback component to the e-commerce page:

HERO SECTION:
- Large image (right top): Studio model full-body shot, 60% width, 90% 
  height, parallax enabled
  Search: 'fashion model studio white background full body'
- Small image (left bottom): Detail shot (fabric/accessory), 45% width, 
  60% height, white border shadow
  Search: 'luxury fashion detail close-up texture'

EDITORIAL SECTION (3x3 grid):
- 9 square images (aspect-1) in seamless grid (gap-0)
- Mix of: portraits (color accents), products, editorial B&W, beauty
  Search: 'fashion editorial portrait color', 'luxury fashion product detail'

HORIZONTAL GALLERY:
- 6 wide images (30vw width, 70vh height)
  Searches: 'white studio fashion model full body', 'minimalist fashion 
  editorial', 'clean denim fashion', 'high end fashion dress', 'grey 
  studio minimal'
- Grayscale filter on hover

VIDEO SECTION:
- Portrait image (3:4 aspect): Video production still
  Search: 'fashion video production model catwalk'
  OR use: import videoServiceImage from 'figma:asset/...'

QUOTE SECTION:
- Portrait (3:4 aspect, opacity-80): Creative director headshot
  Search: 'fashion creative director portrait professional'

USE CASES (3 images):
1. Product detail (texture/fit): 'ecommerce fashion detail texture fit'
2. Collection campaign: 'fashion collection campaign editorial'
3. Social content: 'fashion social media content instagram'

Use ImageWithFallback component. Apply hover:scale-105 transition-duration-700 
to all images. Ensure alt text for accessibility."
```

### STEP 4: Animations & Interactions (Motion)

```
PROMPT:
"Add scroll animations and interactions using motion/react:

GLOBAL ANIMATIONS:
Create fadeIn variant:
{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, 
  transition: { duration: 0.8 } } }

Create staggerContainer variant:
{ hidden: { opacity: 0 }, visible: { opacity: 1, 
  transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }

HERO SECTION:
- Wrap text in motion.div with staggerContainer
- Apply fadeIn to heading, subheading, CTAs (staggered)
- Parallax: Use useScroll + useTransform for large image
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 50])
  Apply to image: style={{ y: yParallax }}

HORIZONTAL GALLERY:
- Container: height 300vh, sticky top-0
- Use useScroll + useTransform for horizontal movement
  const x = useTransform(scrollXProgress, [0, 1], ["0%", "-65%"])
  Apply to flex container: style={{ x }}

ACCORDION (FAQ):
- Use AnimatePresence for expand/collapse
  initial: { height: 0, opacity: 0 }
  animate: { height: 'auto', opacity: 1 }
  exit: { height: 0, opacity: 0 }
- Toggle with Plus/Minus icons from lucide-react

SCROLL TRIGGERS:
- Use whileInView on all sections
  whileInView='visible' viewport={{ once: true }}
- Apply fadeIn variants

HOVER EFFECTS:
- Images: hover:scale-105 transition-duration-700
- Service cards: hover:-translate-y-1 transition-duration-500
- Buttons: hover state with padding/color changes

BUTTON ANIMATIONS:
CTA hover: Expand padding-x on black button (px-8 → px-10)"
```

### STEP 5: Responsive & Polish

```
PROMPT:
"Make the e-commerce page fully responsive with breakpoints:

DESKTOP (1024px+):
- Hero: 12-column grid active, images visible
- Editorial: Side-by-side (50/50), 3x3 grid intact
- Horizontal gallery: Full parallax, 30vw image width
- Video: Side-by-side (50/50)
- Services grid: 3 columns
- Quote: 1/3 + 2/3 split
- Use cases: Alternating layouts
- FAQ: Max-width 768px centered

TABLET (768-1023px):
- Hero: Simplified image grid or hidden
- Editorial: Side-by-side adjusted
- Horizontal gallery: 40vw image width
- Video: Side-by-side adjusted
- Services grid: 2 columns
- Quote: Adjusted proportions
- Use cases: Stacked (no alternating)
- FAQ: Max-width 600px

MOBILE (< 768px):
- Hero: Stacked, images hidden, full-width CTAs
- Editorial: Stacked, 2x2 grid or 3x3 smaller
- Horizontal gallery: Disabled or simplified (vertical grid)
- Video: Stacked
- Services grid: 1 column
- Quote: Stacked
- Use cases: Stacked
- FAQ: Full width, padding 20px
- All CTAs: Full width
- Touch targets: Min 44px height
- Padding: Reduce from 96px to 60px vertical

Add focus states for accessibility (focus:outline focus:ring).
Ensure color contrast 7:1 (AAA). Test on actual mobile viewport (375px).
Use Tailwind responsive prefixes: sm:, md:, lg:, xl:."
```

### STEP 6: Routes, Links & Navigation

```
PROMPT:
"Wire up all links and navigation on the e-commerce page:

NAVIGATION HANDLER:
const handleNavigation = (href: string) => {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

HERO SECTION:
- 'View Packages' button → /packages
- 'How It Works' link → #how-it-works (scroll to services grid)

EDITORIAL SECTION:
- 'Request a Quote' button → /wizard (brand shoot wizard)

VIDEO SECTION:
- 'Let's Chat' button → /contact

SERVICES GRID:
- Card 1 CTA → /contact
- Other cards: No direct links (informational)

FINAL CTA:
- 'Book This Service' button → /wizard
- 'Contact Us' button → /contact

Add smooth scroll behavior for anchor links:
html { scroll-behavior: smooth; }

Ensure all buttons use onClick={handleNavigation} instead of <a> tags 
to maintain SPA routing. Add cursor-pointer to all interactive elements."
```

---

## ROUTES & LINKS

### On-Page Routes
```
Internal Section Links:
/ecommerce-photography#hero             → Hero section
/ecommerce-photography#editorial        → Editorial statement
/ecommerce-photography#gallery          → Horizontal gallery
/ecommerce-photography#video            → Video services
/ecommerce-photography#services         → Services grid
/ecommerce-photography#quote            → Quote section
/ecommerce-photography#use-cases        → Use cases
/ecommerce-photography#faq              → FAQ
/ecommerce-photography#cta              → Final CTA
```

### External Links (Navigation)
```
Header Navigation:
/                                       → Homepage
/services                               → Services overview
/ecommerce-photography                  → This page (current)
/clothing                               → Clothing photography
/product                                → Product photography
/video                                  → Video services
/studios                                → Studio rental

CTA Destinations:
/wizard                                 → Brand shoot wizard (booking)
/packages                               → Pricing packages page (planned)
/contact                                → Contact form (planned)

Footer Links:
/about                                  → About page
/portfolio                              → Portfolio/gallery
/blog                                   → Blog (planned)
/privacy                                → Privacy policy
/terms                                  → Terms of service
```

### Button-to-Route Mapping
```
"View Packages" (Hero)                  → /packages
"How It Works" (Hero)                   → #services (scroll)
"Request a Quote" (Editorial)           → /wizard
"Let's Chat" (Video)                    → /contact
"Let's Chat" (Services Card 1)          → /contact
"Book This Service" (Final CTA)         → /wizard
"Contact Us" (Final CTA)                → /contact
```

---

## RESPONSIVE STRATEGY

### Breakpoint System
```css
/* Mobile First Approach */
Base styles: < 640px (mobile)
sm: 640px (large mobile)
md: 768px (tablet)
lg: 1024px (desktop)
xl: 1280px (large desktop)
2xl: 1536px (extra large)
```

### Critical Responsive Changes

#### Hero Section
```
Desktop: Asymmetrical image grid visible, parallax active
Tablet: Images simplified, text centered
Mobile: Images hidden, single column, full-width CTAs
```

#### Horizontal Gallery
```
Desktop: Full horizontal scroll parallax, 30vw images
Tablet: 40vw images, reduced scroll distance
Mobile: Disabled OR converted to vertical grid (consider UX)
```

#### Services Grid
```
Desktop: 3 columns (2 rows)
Tablet: 2 columns (3 rows)
Mobile: 1 column (6 rows)
```

#### Typography Scale
```
Hero Heading:
- Desktop: 7xl (72px)
- Tablet: 5xl (48px)
- Mobile: 4xl (36px)

Body Text:
- Desktop: xl (20px)
- Tablet: lg (18px)
- Mobile: base (16px)
```

### Touch Targets (Mobile)
```
Minimum button height: 44px
Minimum click area: 44x44px
FAQ accordion: Full-width click areas
Increased padding on mobile buttons
```

---

## ANIMATION LIBRARY

### Core Variants
```typescript
// Fade in from bottom
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

// Stagger children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Fade in from side
const fadeInX = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1 } 
  }
};

// Scale in
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8 } 
  }
};
```

### Scroll Animations
```typescript
// Parallax
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"]
});
const yParallax = useTransform(scrollYProgress, [0, 1], [0, 50]);

// Horizontal scroll
const { scrollYProgress: scrollXProgress } = useScroll({
  target: horizontalRef,
  offset: ["start start", "end end"]
});
const x = useTransform(scrollXProgress, [0, 1], ["0%", "-65%"]);
```

### Hover Effects
```typescript
// Image zoom
className="transition-transform duration-700 hover:scale-105"

// Card lift
className="transition-transform duration-500 hover:-translate-y-1"

// Button expand
className="transition-all hover:px-10" // from px-8

// Grayscale toggle
className="grayscale-0 hover:grayscale transition-all duration-700"
```

### Accordion Animation
```typescript
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  )}
</AnimatePresence>
```

---

## ACCESSIBILITY CHECKLIST

```
✅ Semantic HTML (section, article, button, nav)
✅ Alt text on all images (descriptive, not decorative)
✅ ARIA labels on interactive elements
✅ Keyboard navigation (Tab, Enter, Space, Escape)
✅ Focus states visible (focus:outline, focus:ring)
✅ Color contrast 7:1 (AAA) for text
✅ Touch targets min 44x44px (mobile)
✅ Skip to content link (optional)
✅ Reduced motion support (prefers-reduced-motion)
✅ Screen reader friendly (sr-only classes for icons)
```

---

## PERFORMANCE OPTIMIZATION

```
✅ Lazy load images below fold (loading="lazy")
✅ Use ImageWithFallback component (built-in optimization)
✅ Optimize images: WebP format, < 200KB per image
✅ Use responsive srcset for multiple sizes (auto in Unsplash)
✅ Minimize animation on mobile (reduce motion)
✅ Defer non-critical animations
✅ Use CSS transforms (GPU-accelerated)
✅ Avoid layout shift (set aspect ratios)
✅ Debounce scroll events (built into motion/react)
✅ Code splitting (automatic in React)
```

---

## CONTENT WORKFLOW

### 1. Discovery & Brief
```
Client provides:
- Brand guidelines
- Product samples
- Target audience
- Budget range
- Timeline
```

### 2. Planning
```
Internal team:
- Model casting
- Location scouting
- Shot list creation
- Schedule booking
```

### 3. Production
```
Shoot day:
- Half-day (4 hours) or Full-day (8 hours)
- 40+ or 70+ deliverables
- Client approval (on-set or remote)
```

### 4. Post-Production
```
Editing:
- Basic editing (color correction, cropping)
- Advanced retouching (skin, fabric, background)
- Video editing (cuts, grading, sound)
```

### 5. Delivery
```
Formats:
- TIFF (print)
- WEBP/JPG (web)
- MP4 (video)
- Raw files (optional)

Turnaround: 5-7 business days (standard)
```

---

## QUICK REFERENCE

### Key Files
```
/EcommercePhotography.tsx               # Main page component (689 lines)
/components/Header.tsx                  # Site header
/components/Footer.tsx                  # Site footer
/components/figma/ImageWithFallback.tsx # Image component
```

### Key Sections by Line Number (Reference)
```
Lines 186-242:  Hero Section
Lines 244-309:  Editorial Statement + Image Grid
Lines 311-331:  Horizontal Scrolling Gallery
Lines 333-406:  Video Services
Lines 408-578:  Comprehensive Services Grid (6 cards)
Lines 580-607:  Quote Section
Lines 609-629:  Use Cases
Lines 633-656:  FAQ
Lines 658-683:  Final CTA
```

### Component Dependencies
```
motion/react:       Animations & scroll effects
lucide-react:       Icons (Check, Plus, Minus)
ImageWithFallback:  Optimized images
Header:             Site navigation
Footer:             Site footer
```

---

## TESTING CHECKLIST

```
Desktop (1920x1080):
□ All images load correctly
□ Parallax scroll smooth
□ Horizontal gallery works
□ Cards in 3-column grid
□ Text readable at all sizes
□ Hover effects work
□ CTAs functional

Tablet (768x1024):
□ Layout adapts to 2-column
□ Touch targets large enough
□ Horizontal gallery adjusted
□ Images maintain quality

Mobile (375x667):
□ Single column layout
□ Full-width CTAs
□ Accordion works smoothly
□ Images don't overflow
□ Text remains readable
□ No horizontal scroll (except gallery)

Cross-Browser:
□ Chrome (desktop + mobile)
□ Safari (desktop + iOS)
□ Firefox
□ Edge

Accessibility:
□ Keyboard navigation works
□ Screen reader compatible
□ Color contrast passes
□ Focus states visible
```

---

**Document Version:** 1.0  
**Lines:** 998  
**Last Updated:** December 22, 2024  
**Status:** Production Ready
