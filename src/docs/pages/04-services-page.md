# FashionOS Marketing Pages - Services Page Documentation

**Page:** Photography & Video Services  
**URL:** `/services`  
**File:** `Services.tsx`  
**Version:** 1.0  
**Last Updated:** December 9, 2025

---

## 1. Page Purpose

The Services page showcases FashionOS's photography and video production capabilities for fashion brands, e-commerce companies, and designers. It serves to:
- Present the full suite of photography/video services
- Educate visitors about specialized fashion photography offerings
- Showcase portfolio quality and expertise
- Convert visitors into service bookings or consultations

**Primary Goal:** Service discovery → booking inquiry  
**Secondary Goal:** Position as premium fashion photography studio  
**Target Audience:** Fashion brands, e-commerce businesses, designers, social media managers

---

## 2. Core Messaging

### Brand Positioning
"Premium fashion photography and video production that sells. From runway coverage to e-commerce product shots, we bring your vision to life."

### Key Messages

**1. Specialized Expertise**
"We speak fashion. Our photographers understand runway timing, model direction, and the aesthetic standards that make fashion brands stand out."

**2. Full-Service Production**
"From concept to delivery, we handle everything—studio, talent, styling, post-production, and platform optimization (Amazon, Instagram, Shopify)."

**3. Fast Turnaround**
"Fashion moves fast. We deliver edited images in 5-7 days (standard) or 24-48 hours (rush). No compromises on quality."

### Value Propositions
1. **Fashion-First:** Built for fashion, not generic photography
2. **One-Stop Shop:** Photography + video + styling + editing
3. **Platform-Optimized:** Amazon-compliant, Instagram-ready, e-commerce perfect
4. **Premium Quality:** Editorial standards at accessible pricing

---

## 3. Layout Structure

### Page Blueprint

```
┌────────────────────────────────────────────────┐
│  [Navigation Bar]                              │
└────────────────────────────────────────────────┘
│                                                │
│  [HERO SECTION]                               │
│  - Page headline                              │
│  - Subheadline                                │
│  - Service categories overview                │
│  - Hero gallery (carousel)                    │
│                                                │
├────────────────────────────────────────────────┤
│  [SERVICE CATEGORIES - 7 CARDS]               │
│  - Photography Services                       │
│  - Clothing Photography                       │
│  - Product Photography                        │
│  - Video Services                             │
│  - Amazon Services                            │
│  - E-Commerce Web Design                      │
│  - Instagram Services                         │
│                                                │
├────────────────────────────────────────────────┤
│  [DETAILED SERVICE SECTIONS]                  │
│  Each service gets dedicated section with:    │
│  - Service description                        │
│  - What's included                            │
│  - Portfolio examples                         │
│  - Pricing preview                            │
│  - Booking CTA                                │
│                                                │
├────────────────────────────────────────────────┤
│  [PROCESS OVERVIEW]                           │
│  - How booking works (5 steps)                │
│                                                │
├────────────────────────────────────────────────┤
│  [PORTFOLIO SHOWCASE]                         │
│  - Best work across all services              │
│  - Filterable by category                     │
│                                                │
├────────────────────────────────────────────────┤
│  [CLIENT TESTIMONIALS]                        │
│  - Brands we've worked with                   │
│                                                │
├────────────────────────────────────────────────┤
│  [PRICING OVERVIEW]                           │
│  - Package options                            │
│                                                │
├────────────────────────────────────────────────┤
│  [FINAL CTA]                                  │
│  - Book consultation                          │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 4. Section-by-Section Breakdown

### 4.1 Hero Section

**Layout:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Fashion Photography & Video Production        │  ← H1
│  That Sells                                     │
│                                                 │
│  From runway shows to e-commerce product       │  ← Subheadline
│  shots, we create imagery that captures        │
│  attention and drives conversions.             │
│                                                 │
│  [Book a Shoot]  [View Portfolio]             │  ← CTAs
│                                                 │
│  [Hero Gallery: 5-6 Rotating Images]          │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Height: `85vh` (desktop)
- Background: Subtle gradient `#F8E8EE` to `#FFFFFF`
- Padding: `96px 64px`

**Headline (H1):**
```
Fashion Photography & Video Production
That Sells
```
- Font: Playfair Display Bold, `56px` (desktop), `36px` (mobile)
- Color: `#1A1A1A`
- Max-width: `900px`
- Alignment: Center

**Subheadline:**
- Font: Inter Regular, `20px`
- Color: `#4A4A4A`
- Max-width: `700px`
- Line-height: `1.6`

**CTAs:**
- Primary: "Book a Shoot" → Opens booking wizard
- Secondary: "View Portfolio" → Scrolls to portfolio section

**Hero Gallery:**
- Image carousel (auto-rotating every 5 seconds)
- 5-6 hero images showcasing different services:
  1. Runway show moment (model mid-walk)
  2. Product photography (handbag on white background)
  3. Behind-the-scenes video still
  4. Instagram-ready flat lay
  5. Designer portrait
  6. Campaign video frame
- Aspect ratio: `21:9` (ultra-wide cinematic)
- Smooth fade transitions
- Indicators (dots) below showing position

---

### 4.2 Service Categories Overview (7 Cards)

**Purpose:** Quick navigation to specific services

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Our Services                                  │  ← Headline
│                                                 │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌──────┐│
│  │Photo   │  │Clothing│  │Product │  │Video ││
│  │Services│  │Photo   │  │Photo   │  │Servs ││
│  └────────┘  └────────┘  └────────┘  └──────┘│
│                                                 │
│  ┌────────┐  ┌────────┐  ┌────────┐           │
│  │Amazon  │  │E-Comm  │  │Instagr.│           │
│  │Services│  │Web Des.│  │Services│           │
│  └────────┘  └────────┘  └────────┘           │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FFFFFF`
- Padding: `96px 64px`
- Grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)

**Each Card:**
- Background: `#FAFAFA`
- Border: `1px solid #E5E5E5`
- Border-radius: `16px`
- Padding: `32px`
- Hover: Shadow lift, border color `#D4A5A5`

**Icon:**
- Size: `48px × 48px`
- Background: Gradient circle
- Margin-bottom: `20px`

**Service Name:**
- Font: Inter SemiBold, `20px`
- Color: `#1A1A1A`
- Margin-bottom: `8px`

**Short Description:**
- Font: Inter Regular, `14px`
- Color: `#4A4A4A`
- 1-2 sentences max

**"Learn More" Link:**
- Font: Inter Medium, `14px`
- Color: `#D4A5A5`
- Arrow icon →
- Scrolls to detailed section

**Card Content:**

**1. Photography Services**
```
Icon: Camera
Name: Photography Services
Description: Editorial fashion photography for lookbooks, 
campaigns, and runway shows.
```

**2. Clothing Photography**
```
Icon: Shirt
Name: Clothing Photography
Description: Ghost mannequin, flat lay, and model shots 
optimized for e-commerce.
```

**3. Product Photography**
```
Icon: Package
Name: Product Photography
Description: Jewelry, accessories, and beauty product 
photography for online stores.
```

**4. Video Services**
```
Icon: Video
Name: Video Services
Description: Campaign videos, runway coverage, and social 
media content creation.
```

**5. Amazon Services**
```
Icon: ShoppingBag
Name: Amazon Services
Description: Amazon-compliant product photography with 
infographics and A+ content.
```

**6. E-Commerce Web Design**
```
Icon: Monitor
Name: E-Commerce Web Design
Description: Shopify and WooCommerce store design with 
product photography integration.
```

**7. Instagram Services**
```
Icon: Instagram
Name: Instagram Services
Description: Feed posts, Reels, and Stories optimized 
for maximum engagement.
```

---

### 4.3 Detailed Service Sections

**Pattern:** Alternating image-left / text-right layout

---

#### 4.3.1 Photography Services (General Fashion)

**Layout:**
```
┌────────────────────┬──────────────────────────┐
│                    │  [Icon] Photography      │
│  [Large Gallery:   │         Services         │
│   3x3 Grid of      │                          │
│   Fashion Photos]  │  Headline                │
│                    │  Description             │
│                    │                          │
│                    │  What's Included:        │
│                    │  • Bullet 1              │
│                    │  • Bullet 2              │
│                    │  • Bullet 3              │
│                    │                          │
│                    │  Starting at $1,500      │
│                    │  [Book This Service]     │
└────────────────────┴──────────────────────────┘
```

**Content:**
```
Headline: Editorial Fashion Photography

Description: Create stunning imagery for lookbooks, campaigns, 
and brand storytelling. Our fashion photographers understand 
lighting, composition, and the editorial aesthetic that elevates 
luxury brands.

What's Included:
• Half-day or full-day studio/location shoots
• Professional model booking assistance
• Creative direction and styling coordination
• High-resolution edited images (300 DPI)
• 7-day standard delivery (rush available)
• Usage rights for marketing and social media

Services:
- Lookbook photography (seasonal collections)
- Campaign shoots (brand storytelling)
- Runway coverage (fashion shows)
- Designer portraits and brand imagery
- Behind-the-scenes documentation

Pricing:
• Half-Day: Starting at $1,500 (4 hours, 25-30 edited images)
• Full-Day: Starting at $2,500 (8 hours, 50-60 edited images)
• Custom packages available

CTA: Book This Service → (opens inquiry form with service pre-selected)
```

**Gallery Images:**
- 3×3 grid showing variety:
  - Lookbook shot (model, styled outfit, studio)
  - Editorial portrait (close-up, dramatic lighting)
  - Full-body runway shot
  - Campaign-style storytelling image
  - Behind-the-scenes moment
  - Designer portrait
  - Detail shot (fabric, texture)
  - Lifestyle/location shot
  - Group shot (multiple models)

---

#### 4.3.2 Clothing Photography

**Layout:** (Same alternating pattern, image on right this time)

**Content:**
```
Headline: Clothing Photography for E-Commerce

Description: Professional apparel photography that showcases 
fit, fabric, and details—optimized for online stores. Ghost 
mannequin, flat lay, or model shots—we deliver clean, 
conversion-focused imagery.

What's Included:
• Multiple angles (front, back, side, detail)
• Background options (white, lifestyle, custom)
• Professional styling and steaming
• Post-production retouching
• Consistent lighting across all products
• Amazon/Shopify-ready files

Photography Types:
1. Ghost Mannequin (Invisible Model)
   - Clean, professional look
   - Shows garment shape naturally
   - Perfect for e-commerce listings
   - Starting at $25/piece

2. Flat Lay Photography
   - Overhead styling shots
   - Instagram-ready aesthetic
   - Outfit combinations
   - Starting at $20/piece

3. Model On White Background
   - Shows fit and drape on body
   - Amazon/eBay compliant
   - Professional model included
   - Starting at $40/look

4. Lifestyle/Editorial
   - Storytelling imagery
   - Location or styled studio
   - Builds brand identity
   - Starting at $150/hour

Pricing:
• Volume Pricing: 25 pieces: $625 | 50 pieces: $1,800 | 100+ pieces: Custom quote
• Add-ons: Professional styling (+$200), Advanced retouching (+$15/image)

Turnaround: 5-7 days standard, 3-day rush available

CTA: Get a Quote → (opens form)
```

**Gallery Images:**
- Ghost mannequin examples (dress, jacket, shirt)
- Flat lay styled outfits
- Model shots on white background
- Lifestyle shots (outdoor, urban, studio lifestyle)
- Detail close-ups (stitching, buttons, fabric texture)

---

#### 4.3.3 Product Photography

**Layout:** (Image left)

**Content:**
```
Headline: Product Photography That Converts

Description: Showcase your products with stunning imagery 
optimized for e-commerce. Jewelry, accessories, beauty 
products—we capture the details that drive sales.

What's Included:
• White background (Amazon-compliant)
• Multiple angles (front, back, side, top, details)
• Lifestyle shots (product in use)
• Scale/dimension shots
• 360° product spins (add-on)
• High-resolution files (web + print)

Specializations:
- Jewelry: Close-ups, reflections, detail shots
- Accessories: Handbags, shoes, belts, scarves
- Beauty Products: Skincare, cosmetics, packaging
- Home Goods: Decor, textiles, small furniture

Volume Pricing:
• 1-10 products: $50/product
• 11-50 products: $40/product
• 51-100 products: $30/product
• 100+ products: $25/product

Add-Ons:
• 360° product spins: +$75/product
• Video clips (15-30 sec): +$100/product
• Advanced retouching: +$20/product
• Infographic design: +$50/product

Turnaround:
• Standard: 7 days
• Rush: 3 days (+30%)
• Super Rush: 24 hours (+50%)

CTA: Book Product Photography →
```

**Gallery Images:**
- Jewelry on white (ring, necklace, earrings)
- Handbag multiple angles
- Shoe lineup
- Beauty product with reflection
- Lifestyle product in use
- 360° spin thumbnail (play button overlay)

---

#### 4.3.4 Video Services

**Layout:** (Image right - video thumbnails)

**Content:**
```
Headline: Video Content That Stops the Scroll

Description: From runway highlights to Instagram Reels, we 
create video content that captures attention and engages 
your audience across all platforms.

What's Included:
• Pre-production planning (storyboard, shot list)
• Professional crew (videographer, lighting, audio)
• On-location or studio shooting
• Post-production editing (color grading, music, graphics)
• Multiple format exports (16:9, 9:16, 1:1)
• Platform-optimized delivery (Instagram, TikTok, YouTube)

Video Services Offered:

1. Campaign Videos (30-60 sec brand stories)
   - Professional talent and locations
   - Cinematic quality
   - Full post-production
   - Starting at $5,000

2. Product Videos (360° rotations, close-ups)
   - Show product from all angles
   - Add to e-commerce listings
   - Boost conversions 30%+
   - Starting at $150/product

3. Runway Show Coverage (full show + highlights)
   - Multi-camera coverage
   - 5-minute highlight reel
   - Individual look videos
   - 24-hour delivery of selects
   - Starting at $3,000

4. Instagram Reels (15-30 sec vertical video)
   - 4-hour shoot session
   - 5 edited Reels
   - Trending audio and captions
   - Vertical format (9:16)
   - Starting at $1,500

5. TikTok Content (trend-based, authentic)
   - On-trend concepts
   - Fast turnaround
   - Platform-optimized
   - Starting at $1,200/5 videos

6. Behind-the-Scenes (documentary style)
   - Capture your creative process
   - Authentic brand storytelling
   - Starting at $2,000/day

7. Designer Interviews (talking head + B-roll)
   - Professional interview setup
   - B-roll footage
   - Subtitles included
   - Starting at $1,800

Deliverable Formats:
- MP4, MOV, ProRes
- 4K, 1080p, 720p options
- 16:9 (landscape), 9:16 (vertical), 1:1 (square)

CTA: Let's Create Your Video →
```

**Gallery Images:**
- Video thumbnails with play buttons:
  - Campaign video still
  - Runway show coverage
  - Instagram Reel vertical format
  - Product 360° video
  - BTS time-lapse
  - Designer interview frame

---

#### 4.3.5 Amazon Services

**Layout:** (Image left)

**Content:**
```
Headline: Amazon Product Photography That Ranks & Converts

Description: Amazon-compliant imagery that meets strict 
requirements and maximizes your listing's visual appeal. 
From main images to infographics, we handle everything.

What's Included:
• 100% Amazon-compliant images
• Main image (pure white background, RGB 255,255,255)
• 6 additional images (lifestyle, features, scale, packaging, infographic)
• A+ Content enhanced brand images
• Organized delivery (files named per Amazon guidelines)
• Compliance checking (AI-verified)

Amazon Image Requirements (We Handle This):
- Main image: Pure white background, product fills 85% of frame
- 1000x1000 pixels minimum (for zoom feature)
- No text, logos, or graphics on main image
- Additional images showcase features, usage, size

Our Amazon Photo Package (7 images per product):
1. Main Image (compliant white background)
2. Lifestyle (product in use)
3. Feature Close-up (key detail)
4. Size/Scale Comparison
5. Packaging Shot
6. Infographic (features + benefits with text overlay)
7. Alternate Angle or Color Variant

Pricing:
• 1-20 products: $175/product (7 images each)
• 21-50 products: $150/product
• 51-100 products: $125/product
• 100+ products: Contact for custom quote

Infographic Design:
• Highlight key features with text overlays
• Compare to competitors
• Show dimensions and specs
• Include icons and branding
• Starting at $50/infographic

Amazon A+ Content:
• Enhanced brand content images
• Comparison charts
• Lifestyle imagery modules
• Brand story visuals
• Custom pricing

Why Amazon Sellers Choose Us:
✓ 100% Amazon compliant (zero rejections)
✓ Fast turnaround (5 days standard)
✓ Bulk processing (100+ SKUs)
✓ Organized delivery (Amazon-ready filenames)
✓ Proven to increase conversion rates (avg. 35% lift)

Case Study:
"We photographed 200 SKUs for an Amazon seller. Their 
conversion rate increased 38% and they became a Best Seller 
in their category within 60 days."

CTA: Get Amazon-Ready Images Now →
```

**Gallery Images:**
- Main image example (product on pure white)
- Lifestyle usage shot
- Infographic example (annotated with features)
- A+ Content module example
- Before/after (poor image vs. professional)
- Amazon listing screenshot showing all 7 images

---

#### 4.3.6 E-Commerce Web Design

**Layout:** (Image right - website mockups)

**Content:**
```
Headline: E-Commerce Websites That Showcase Your Products

Description: Beautiful, conversion-optimized online stores 
designed specifically for fashion brands. We integrate your 
product photography seamlessly into stunning Shopify or 
WooCommerce sites.

What's Included:
• Custom website design (not template)
• Mobile-responsive (looks perfect on all devices)
• Product page optimization (images, descriptions, CTAs)
• Shopping cart and checkout integration
• Payment gateway setup (Stripe, PayPal)
• Email marketing integration (Klaviyo, Mailchimp)
• Analytics setup (Google Analytics, Meta Pixel)
• SEO optimization (meta tags, alt text, speed)
• 3 months support and maintenance

Platform Options:

1. Shopify Store Design
   - Custom theme design
   - Product page templates
   - Collection pages
   - Mobile-optimized
   - Starting at $5,000

2. WooCommerce (WordPress)
   - Custom WordPress theme
   - Advanced e-commerce features
   - Blog integration
   - SEO-friendly
   - Starting at $7,000

3. Custom Development
   - Built from scratch
   - Unique features and integrations
   - Headless commerce options
   - Scalable architecture
   - Starting at $15,000

Photography + Website Packages:
Book product photography + website design together and save 15%

Example Package:
• 100 product photos ($3,000)
• Shopify store design ($5,000)
• Total: $8,000 (save $1,200)

Our Website Portfolio:
- 50+ fashion e-commerce sites built
- Average 300% increase in online sales for clients
- Award-winning design (Awwwards, CSS Design Awards)

CTA: Start Your Website Project →
```

**Gallery Images:**
- Desktop website mockups (3-4 examples)
- Mobile website screens
- Product page closeups
- Shopping cart/checkout screens
- Before/after (old site vs. new site)

---

#### 4.3.7 Instagram Services

**Layout:** (Image left - Instagram feed grid)

**Content:**
```
Headline: Instagram Content That Grows Your Following

Description: Consistent, high-quality content designed to 
stop the scroll and drive engagement. From feed posts to 
Reels, we create Instagram content that converts followers 
into customers.

What's Included:
• Professional photography and video
• Instagram-optimized aspect ratios (1:1, 4:5, 9:16)
• Content calendar planning
• Caption writing (AI-assisted)
• Hashtag research and recommendations
• Stories and Reels creation
• Feed aesthetic curation

Instagram Content Packages:

Monthly Content Package: $1,200/month
• 4-hour monthly studio session
• 40 edited images (feed + Stories)
• 5 Instagram Reels (15-30 sec each)
• Content calendar planning
• Optimized for engagement

Launch Campaign Package: $3,500 (one-time)
• 2 full-day shoots
• 100 images
• 15 Reels
• 60 days of content
• Perfect for product launches

What We Shoot:
- Product flatlays (styled beautifully)
- Lifestyle imagery (products in context)
- Model/influencer content
- Behind-the-scenes moments
- Stop-motion videos
- Carousel post sequences

Instagram Optimization:
• Aspect ratios: 1:1 (feed), 4:5 (portrait), 9:16 (Stories/Reels)
• Hashtag research (30 relevant hashtags)
• Caption writing (engaging, on-brand)
• Trending audio for Reels
• Posting schedule recommendations

Add-Ons:
• Caption writing service: +$200/month
• Posting service (we post for you): +$300/month
• Instagram Stories templates: +$150/month

Results:
"Our clients grow 2x faster with consistent professional content"

Case Study:
Brand grew from 5K → 50K followers in 6 months with our 
monthly content package.

CTA: Grow Your Instagram with Pro Content →
```

**Gallery Images:**
- Instagram feed grid mockup (9 images in 3×3)
- Individual Reels frames (vertical format)
- Stories template examples
- Flat lay product styling shots
- Before/after feed aesthetic transformation

---

### 4.4 Process Overview (How It Works)

**Purpose:** Demystify the booking and production process

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  How It Works: From Inquiry to Delivery        │  ← Headline
│                                                 │
│  [5-Step Visual Timeline]                      │
│                                                 │
│  1 → 2 → 3 → 4 → 5                             │
│  Inquiry | Plan | Shoot | Edit | Deliver      │
└─────────────────────────────────────────────────┘
```

**Step-by-Step:**

**Step 1: Inquiry & Consultation (Day 1)**
```
Icon: MessageSquare
Title: Book Your Shoot
Description: Fill out our inquiry form or call us. We'll 
discuss your project needs, timeline, and budget.
Duration: 15-30 min call
```

**Step 2: Planning & Preparation (Days 2-7)**
```
Icon: ClipboardList
Title: Pre-Production Planning
Description: We create a detailed shot list, book talent 
(if needed), coordinate styling, and schedule your shoot.
Deliverable: Shot list + shoot schedule
```

**Step 3: Shoot Day (Day 8)**
```
Icon: Camera
Title: Professional Shoot
Description: Our team captures your products or collection 
with professional lighting, styling, and creative direction.
Duration: Half-day (4hr) or Full-day (8hr)
```

**Step 4: Post-Production (Days 9-15)**
```
Icon: Edit
Title: Editing & Retouching
Description: Images are color-corrected, retouched, and 
optimized for your intended use (web, print, social).
Turnaround: 5-7 days standard
```

**Step 5: Delivery & Support (Day 16)**
```
Icon: Download
Title: Final Delivery
Description: Receive high-resolution files via secure download 
link. Organized, ready to use immediately.
Format: JPG, PNG, or TIFF (your choice)
```

**Timeline Summary:**
- Standard: 16 days from inquiry to delivery
- Rush: 7 days (+30% fee)
- Super Rush: 3 days (+50% fee)

---

### 4.5 Portfolio Showcase

**Purpose:** Visual proof of quality and range

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Our Work                                      │  ← Headline
│                                                 │
│  [Filter Tabs]                                 │
│  All | Fashion | Product | Video | E-Commerce │
│                                                 │
│  [Masonry Grid Gallery: 20-30 Images]         │
│                                                 │
│  [Load More ▼]                                 │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FAFAFA`
- Masonry grid (Pinterest-style, uneven heights)
- Desktop: 4 columns
- Tablet: 3 columns
- Mobile: 2 columns

**Image Hover:**
- Overlay appears: Service category tag
- Smooth zoom-in effect (1.05 scale)
- "View Project" button

**Filter Functionality:**
- Click filter → Grid re-arranges to show only that category
- Smooth animation (fade out/in)
- URL updates for sharing (e.g., `/services#portfolio-fashion`)

**Portfolio Images:**
- Mix of all service types
- Variety of styles (editorial, e-commerce, lifestyle)
- Show range: runway, product, video stills, web design screenshots

---

### 4.6 Client Testimonials & Logos

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Trusted by Leading Fashion Brands             │  ← Headline
│                                                 │
│  [Client Logos: 12-16 Brands]                  │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │Testimon. │  │Testimon. │  │Testimon. │     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────┘
```

**Client Logos to Include:**
- Fashion brands you've worked with
- E-commerce companies
- Designers
- Magazines/Publications

**Testimonials:**

**Testimonial 1:**
```
★★★★★
"FashionOS photographed 200 products for our holiday collection. 
The quality is exceptional and our conversion rate increased 42%. 
Worth every penny."

Elena Rodriguez
E-Commerce Director, Luxe Accessories
```

**Testimonial 2:**
```
★★★★★
"We needed Amazon-compliant images for 150 SKUs on a tight 
deadline. FashionOS delivered flawlessly in 5 days. Zero 
image rejections from Amazon."

Michael Chen
Amazon Seller, Beauty & Cosmetics
```

**Testimonial 3:**
```
★★★★★
"Their Instagram content package transformed our feed. We 
went from sporadic posts to consistent, professional content. 
Followers grew 3x in 4 months."

Aurelia Noir
Fashion Designer, Paris
```

---

### 4.7 Pricing Overview

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Transparent, Straightforward Pricing          │  ← Headline
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │  Service              Starting Price      │ │
│  │  Photography Services    $1,500/day       │ │
│  │  Clothing Photography    $25/piece        │ │
│  │  Product Photography     $50/product      │ │
│  │  Video Services          $1,500           │ │
│  │  Amazon Services         $175/product     │ │
│  │  E-Commerce Design       $5,000           │ │
│  │  Instagram Package       $1,200/month     │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Volume discounts available. Custom packages   │
│  for large projects. [Get Custom Quote →]     │
└─────────────────────────────────────────────────┘
```

**Pricing Table:**
- Simple, scannable format
- "Starting at" pricing (encourages inquiry for details)
- Link to full pricing page or inquiry form

**Trust Badges:**
- No hidden fees
- Satisfaction guaranteed
- Fast turnaround
- Professional quality

---

### 4.8 Final CTA

**Layout:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Ready to Elevate Your Brand Imagery?          │  ← Headline
│                                                 │
│  Book a free 30-minute consultation to         │  ← Subheadline
│  discuss your project and get a custom quote.  │
│                                                 │
│  [Book Free Consultation]  [View Pricing]     │  ← CTAs
│                                                 │
│  Or call us: (555) 123-4567                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Styling:**
- Background: Gradient
- Large CTAs
- Phone number clickable (tel: link on mobile)

---

## 5. Image Guidelines

### Hero Gallery Images
**What:** 5-6 stunning hero images showcasing service range  
**Style:** Cinematic, editorial quality, diverse subjects  
**Aspect Ratio:** 21:9 (ultra-wide)  
**Treatment:** Slight vignette, color grading for consistency  

**Specific Images:**
1. Runway moment (model walking, dramatic lighting)
2. Product shot (luxury handbag on white, perfect lighting)
3. Video production BTS (crew filming, professional setup)
4. Flat lay (beautifully styled product arrangement)
5. Designer portrait (professional, editorial)
6. Campaign still (lifestyle, storytelling)

### Service Section Images

**Photography Services:**
- Lookbook shots (editorial styling, clean backgrounds)
- Runway coverage (action shots, professional quality)
- Designer portraits (professional headshots or creative)

**Clothing Photography:**
- Ghost mannequin examples (dress, jacket, shirt)
- Flat lay styled outfits (overhead, beautifully arranged)
- Model on white (clean, e-commerce ready)
- Lifestyle shots (natural settings, authentic moments)

**Product Photography:**
- White background studio shots (jewelry, accessories, beauty)
- Multiple angles (front, back, side, top, detail)
- Lifestyle usage shots (product in context)
- 360° spin thumbnail (with play button icon)

**Video Services:**
- Video thumbnails with play buttons
- Campaign video stills (cinematic quality)
- Reels in vertical format (9:16 mockups)
- BTS time-lapse frames

**Amazon Services:**
- Main image example (pure white RGB 255,255,255)
- Infographic examples (annotated features)
- Complete 7-image set (main + 6 additional)
- Before/after comparison (amateur vs. professional)

**E-Commerce Web Design:**
- Desktop mockups (3-4 beautiful sites)
- Mobile screens (responsive design)
- Product page details (zoom, layout)
- Before/after site redesigns

**Instagram Services:**
- Feed grid mockup (3×3 or larger)
- Individual Reels (vertical format)
- Stories templates
- Flat lay product styling

### Portfolio Gallery
**Quantity:** 20-30 high-quality images  
**Variety:** Mix all service types  
**Quality:** Only best work (portfolio-grade)  
**Consistency:** Similar color grading across all images  

### General Image Rules
- **Format:** WebP with JPG fallback
- **Resolution:** 2x for retina (e.g., 2400px wide displayed at 1200px)
- **Compression:** Keep under 200KB per image
- **Alt Text:** Descriptive (e.g., "Ghost mannequin clothing photography example showing black dress on white background")
- **Lazy Loading:** All images below fold

---

## 6. SEO & Meta

### Page Title
```
Fashion Photography & Video Services - Premium Production | FashionOS
```

### Meta Description
```
Professional fashion photography and video production for brands, 
designers, and e-commerce. Runway coverage, product photography, 
Amazon services, and Instagram content. Book your shoot today.
```

### Keywords
- Fashion photography services
- Product photography e-commerce
- Clothing photography
- Amazon product photography
- Fashion video production
- Instagram content creation
- E-commerce photography
- Runway photography
- Ghost mannequin photography
- Fashion lookbook photography

### Structured Data (Schema.org)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "FashionOS Photography Services",
  "description": "Premium fashion photography and video production",
  "priceRange": "$$$",
  "image": "https://fashionos.com/services-og.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "New York",
    "addressRegion": "NY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.7128",
    "longitude": "-74.0060"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87"
  }
}
```

---

## 7. Conversion Optimization

### CTA Hierarchy
1. **Primary CTA:** "Book a Shoot" / "Get a Quote"
2. **Secondary CTA:** "View Portfolio"
3. **Tertiary CTA:** "Call Us"

### CTA Placement
- Hero: Book a Shoot, View Portfolio
- After each service section: Book This Service
- After portfolio: Book Consultation
- Final CTA: Book Free Consultation

### Trust Signals
- Client logo bar
- Testimonials with star ratings
- Portfolio showcasing real work
- Transparent pricing
- Fast turnaround guarantees
- Satisfaction guarantee badge

### Lead Capture
**Inquiry Form Fields:**
- Name
- Email
- Phone (optional)
- Service interested in (dropdown)
- Number of products/images needed
- Timeline
- Budget range
- Message/Additional details

---

## 8. Accessibility Notes

- All images have descriptive alt text
- Video thumbnails have play button indicators
- Filter tabs keyboard accessible
- Proper heading hierarchy (H1 → H2 → H3)
- Color contrast meets WCAG AA
- Form labels properly associated
- Phone number has `tel:` link for mobile click-to-call

---

## 9. Performance Checklist

- [ ] Hero gallery images optimized (<150KB each)
- [ ] Portfolio uses lazy loading
- [ ] Total page size <3MB
- [ ] Lighthouse Performance score 85+
- [ ] Images serve in next-gen formats (WebP)
- [ ] Videos are embedded (not auto-download)
- [ ] First Contentful Paint <2s

---

**Document Version:** 1.0  
**Last Updated:** December 9, 2025  
**Next Review:** March 2026
