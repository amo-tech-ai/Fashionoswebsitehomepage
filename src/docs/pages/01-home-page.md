# FashionOS Marketing Pages - Home Page Documentation

**Page:** Home / Landing Page  
**URL:** `/` or `/home`  
**File:** `AppHome.tsx`  
**Version:** 1.0  
**Last Updated:** December 9, 2025

---

## 1. Page Purpose

The Home Page is the primary entry point for new visitors to FashionOS. It serves to:
- Introduce FashionOS as the premier luxury fashion event management platform
- Communicate core value propositions (AI-powered, all-in-one, premium)
- Guide visitors to key product areas (Events, Services, Designers)
- Convert visitors into trial users or demo requests

**Primary Goal:** Convert visitors → trial signups  
**Secondary Goal:** Educate visitors about platform capabilities  
**Target Audience:** Event planners, fashion brands, designers, venues

---

## 2. Core Messaging

### Brand Positioning Statement
"The premium platform where luxury fashion events meet intelligent technology."

### Value Propositions (The Big 3)

**1. All-in-One Event Management**
- Consolidate 10+ tools into one elegant platform
- Manage events, sponsors, designers, venues, casting—all in one place
- Real-time collaboration across entire team

**2. AI-Powered Intelligence**
- Gemini AI generates task lists, detects risks, predicts outcomes
- Smart sponsor matching based on brand compatibility
- Proactive alerts prevent last-minute crises

**3. Premium Fashion-First Design**
- Built specifically for fashion industry professionals
- Luxury-tech aesthetic (not generic project management)
- Integrates with fashion week workflows seamlessly

### Tone & Voice
- **Confident** but not arrogant
- **Intelligent** but not technical/jargon-heavy
- **Premium** but not pretentious
- **Helpful** but not robotic

---

## 3. Layout Structure

### Layout Blueprint

```
┌────────────────────────────────────────────────┐
│  [Navigation Bar]                              │
│  Logo | Events | Services | Pricing | Login   │
└────────────────────────────────────────────────┘
│                                                │
│  [HERO SECTION]                               │
│  - Headline                                   │
│  - Subheadline                                │
│  - CTA Buttons                                │
│  - Hero Visual                                │
│                                                │
├────────────────────────────────────────────────┤
│  [SOCIAL PROOF]                               │
│  - Logos: Vogue, NYFW, London Fashion Week    │
│                                                │
├────────────────────────────────────────────────┤
│  [VALUE PROPOSITIONS - 3 COLUMNS]            │
│  - All-in-One | AI-Powered | Premium Design   │
│                                                │
├────────────────────────────────────────────────┤
│  [PRODUCT SHOWCASE]                           │
│  - Command Center Screenshot                  │
│  - Feature Callouts                           │
│                                                │
├────────────────────────────────────────────────┤
│  [USE CASES]                                  │
│  - Event Planners | Designers | Sponsors      │
│                                                │
├────────────────────────────────────────────────┤
│  [KEY FEATURES GRID]                          │
│  - 6 Features with icons                      │
│                                                │
├────────────────────────────────────────────────┤
│  [TESTIMONIALS]                               │
│  - 3 User Quotes                              │
│                                                │
├────────────────────────────────────────────────┤
│  [PRICING PREVIEW]                            │
│  - 3 Tiers: Starter | Pro | Enterprise        │
│                                                │
├────────────────────────────────────────────────┤
│  [FINAL CTA]                                  │
│  - Strong conversion-focused section          │
│                                                │
├────────────────────────────────────────────────┤
│  [FOOTER]                                     │
│  - Links | Social | Newsletter                │
└────────────────────────────────────────────────┘
```

### Grid & Spacing

**Desktop (1024px+):**
- Container max-width: `1800px`
- Section padding: `96px 64px` (vertical, horizontal)
- Content max-width: `1200px` (for readability)
- Grid: 12 columns with `24px` gutters

**Tablet (768px - 1023px):**
- Section padding: `64px 32px`
- Grid: 8 columns with `20px` gutters

**Mobile (<768px):**
- Section padding: `48px 16px`
- Grid: 4 columns with `16px` gutters
- Stack all columns vertically

### Section Spacing
- Between major sections: `96px` (desktop), `64px` (mobile)
- Within sections: `48px` (desktop), `32px` (mobile)
- Between cards/elements: `24px` (desktop), `16px` (mobile)

---

## 4. Section-by-Section Breakdown

### 4.1 Navigation Bar

**Purpose:** Orient visitors, provide quick access to key pages

**Layout:**
```
[Logo] ─────── [Links] ─────────── [CTAs]
FashionOS    Events | Services    Login | Start Free Trial
```

**Specifications:**
- Height: `64px`
- Background: `#FFFFFF` with `1px` bottom border `#E5E5E5`
- Sticky on scroll (stays at top)
- Logo: Left-aligned, 24px height
- Navigation links: Center (desktop), hamburger menu (mobile)
- CTAs: Right-aligned, primary button for "Start Free Trial"

**Navigation Items:**
- Events
- Services
- Designer Directory
- Pricing
- About
- Blog (optional)

**CTA Buttons:**
- **Login:** Ghost button, `text-[#4A4A4A]`
- **Start Free Trial:** Primary gradient button

**Mobile Behavior:**
- Hamburger icon (☰) on left
- Logo center
- "Start Trial" button right

---

### 4.2 Hero Section

**Purpose:** Capture attention, communicate value, drive conversion

**Layout:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│     The Premium Platform for                   │  ← H1
│     Luxury Fashion Events                      │
│                                                 │
│     Manage runway shows, brand activations,    │  ← Subheadline
│     and designer showcases with AI-powered     │
│     intelligence and premium design.           │
│                                                 │
│     [Start Free Trial]  [Book a Demo]         │  ← CTAs
│                                                 │
│     [Hero Visual: Dashboard Screenshot]        │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Height: `90vh` (desktop), `auto` (mobile)
- Background: Subtle gradient `linear-gradient(135deg, #F8E8EE 0%, #FFFFFF 50%, #E8D5F2 100%)`
- Padding: `120px 64px 96px` (desktop)

**Headline (H1):**
```
The Premium Platform for
Luxury Fashion Events
```
- Font: Playfair Display Bold, `60px` (desktop), `36px` (mobile)
- Color: `#1A1A1A`
- Line-height: `1.2`
- Max-width: `800px`
- Alignment: Center

**Subheadline:**
```
Manage runway shows, brand activations, and designer showcases 
with AI-powered intelligence and premium design.
```
- Font: Inter Regular, `20px` (desktop), `16px` (mobile)
- Color: `#4A4A4A`
- Line-height: `1.6`
- Max-width: `700px`
- Alignment: Center
- Margin-top: `24px`

**CTA Buttons:**
- Margin-top: `48px`
- Display: Flex, gap `16px`, justify center
- **Primary:** "Start Free Trial" → gradient button, large size
- **Secondary:** "Book a Demo" → secondary button, large size

**Hero Visual:**
- Margin-top: `64px`
- Image: Command Center dashboard screenshot
- Width: `100%`, max-width `1200px`
- Shadow: `0 20px 60px rgba(0, 0, 0, 0.15)`
- Border-radius: `16px`
- Border: `1px solid #E5E5E5`

**Responsive:**
- Stack buttons vertically on mobile
- Hero visual scales to 100% width
- Reduce padding to `48px 16px`

---

### 4.3 Social Proof (Logos)

**Purpose:** Build credibility with recognizable brands/publications

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Trusted by leading fashion organizations       │
│                                                 │
│  [Vogue] [NYFW] [London FW] [Vogue Business]  │
│  [WWD] [Business of Fashion] [The Cut]        │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FAFAFA`
- Padding: `48px 64px`
- Text: "Trusted by leading fashion organizations"
  - Font: Inter Medium, `14px`
  - Color: `#9E9E9E`
  - Text-transform: `uppercase`
  - Letter-spacing: `0.05em`
  - Alignment: Center

**Logos:**
- Display: Flex, justify center, align center
- Gap: `48px` (desktop), `24px` (mobile)
- Logo height: `32px` (auto width)
- Grayscale filter: `100%` (opacity `0.5`)
- Hover: Grayscale `0%`, opacity `1.0`

**Logos to Include:**
- Vogue
- New York Fashion Week
- London Fashion Week
- Vogue Business
- Women's Wear Daily (WWD)
- Business of Fashion
- The Cut

**Responsive:**
- Wrap logos on smaller screens (2 rows if needed)
- Reduce gap to `24px` on tablet, `16px` on mobile

---

### 4.4 Value Propositions (3-Column)

**Purpose:** Explain the 3 core benefits of FashionOS

**Layout:**
```
┌──────────────┬──────────────┬──────────────┐
│   All-in-One │  AI-Powered  │   Premium    │
│   [Icon]     │   [Icon]     │   [Icon]     │
│   Headline   │   Headline   │   Headline   │
│   Body text  │   Body text  │   Body text  │
└──────────────┴──────────────┴──────────────┘
```

**Specifications:**
- Background: `#FFFFFF`
- Padding: `96px 64px`
- Max-width: `1200px`, centered

**Grid:**
- Desktop: 3 columns, equal width, gap `48px`
- Tablet: 2 columns (stack 3rd below)
- Mobile: 1 column, stack vertically

**Each Card:**

**Icon:**
- Size: `48px × 48px`
- Background: Gradient circle `linear-gradient(135deg, #F8E8EE, #E8D5F2)`
- Padding: `12px`
- Icon color: `#1A1A1A`
- Margin-bottom: `24px`

**Headline:**
- Font: Inter SemiBold, `20px`
- Color: `#1A1A1A`
- Margin-bottom: `12px`

**Body:**
- Font: Inter Regular, `16px`
- Color: `#4A4A4A`
- Line-height: `1.6`
- Max-width: `350px`

**Content Examples:**

**Column 1: All-in-One Event Management**
```
Icon: LayoutDashboard

Headline: All-in-One Event Management

Body: Consolidate events, sponsors, designers, venues, 
casting, and tasks into one elegant platform. Replace 
10+ tools with a single source of truth.
```

**Column 2: AI-Powered Intelligence**
```
Icon: Sparkles

Headline: AI-Powered Intelligence

Body: Gemini AI generates task lists, detects risks, 
matches sponsors, and predicts outcomes—so you can 
focus on creating unforgettable events.
```

**Column 3: Premium Fashion-First Design**
```
Icon: Palette

Headline: Premium Fashion-First Design

Body: Built exclusively for fashion professionals with 
luxury-tech aesthetics, industry-specific workflows, 
and seamless fashion week integration.
```

---

### 4.5 Product Showcase (Command Center)

**Purpose:** Show the platform in action with visual evidence

**Layout:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Your Event Command Center                     │  ← Headline
│  Everything you need to manage fashion         │  ← Subheadline
│  events in one intelligent dashboard           │
│                                                 │
│  [Large Screenshot: Command Center]            │
│                                                 │
│  Feature Callouts (4 corners):                 │
│  • KPI Cards                                   │
│  • AI Insights                                 │
│  • Task Progress                               │
│  • Timeline View                               │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FAFAFA`
- Padding: `96px 64px`

**Headline:**
- Font: Playfair Display SemiBold, `42px`
- Color: `#1A1A1A`
- Alignment: Center
- Margin-bottom: `16px`

**Subheadline:**
- Font: Inter Regular, `18px`
- Color: `#4A4A4A`
- Alignment: Center
- Max-width: `600px`, centered
- Margin-bottom: `64px`

**Screenshot:**
- Full-width browser window mockup
- Command Center dashboard visible
- Shadow: `0 20px 60px rgba(0, 0, 0, 0.15)`
- Border-radius: `12px`
- Border: `1px solid #E5E5E5`

**Feature Callouts:**
- Position: Absolute overlays on screenshot corners
- Background: `#FFFFFF`
- Border: `2px solid #D4A5A5`
- Border-radius: `12px`
- Padding: `12px 16px`
- Shadow: `0 4px 12px rgba(0, 0, 0, 0.1)`
- Font: Inter Medium, `14px`
- Include icon (20px) + text

**Callout Positions:**
- Top-left: "Real-Time KPI Tracking"
- Top-right: "AI-Powered Insights"
- Bottom-left: "5-Phase Workflow"
- Bottom-right: "Smart Alerts"

**Responsive:**
- Remove callouts on mobile (too cluttered)
- Show screenshot full-width
- Reduce padding

---

### 4.6 Use Cases (3 User Types)

**Purpose:** Help visitors see themselves using the platform

**Layout:**
```
┌────────────────────────────────────────────────┐
│  Built for Fashion Professionals               │  ← Headline
│                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────┐│
│  │ Event        │  │ Designers    │  │ Spons││
│  │ Planners     │  │              │  │ ors  ││
│  │ [Image]      │  │ [Image]      │  │ [Img]││
│  │ Description  │  │ Description  │  │ Desc ││
│  │ [Learn More] │  │ [Learn More] │  │ [Btn]││
│  └──────────────┘  └──────────────┘  └──────┘│
└────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FFFFFF`
- Padding: `96px 64px`
- Max-width: `1200px`, centered

**Section Headline:**
- Font: Playfair Display SemiBold, `42px`
- Color: `#1A1A1A`
- Alignment: Center
- Margin-bottom: `64px`

**Grid:**
- Desktop: 3 columns, equal width, gap `32px`
- Tablet: 2 columns (stack 3rd below)
- Mobile: 1 column

**Each Card:**

**Image:**
- Aspect ratio: `16:9`
- Border-radius: `12px`
- Object-fit: `cover`
- Margin-bottom: `24px`

**User Type Label:**
- Font: Inter SemiBold, `12px`
- Color: `#D4A5A5`
- Text-transform: `uppercase`
- Letter-spacing: `0.08em`
- Margin-bottom: `8px`

**Headline:**
- Font: Inter SemiBold, `24px`
- Color: `#1A1A1A`
- Margin-bottom: `12px`

**Description:**
- Font: Inter Regular, `16px`
- Color: `#4A4A4A`
- Line-height: `1.6`
- Margin-bottom: `20px`

**CTA Button:**
- Ghost button
- Text: "Learn More →"

**Content Examples:**

**Card 1: Event Planners**
```
Label: FOR EVENT PLANNERS
Headline: Manage 3x More Events
Description: Consolidate spreadsheets, reduce admin 
time by 60%, and prevent last-minute crises with 
AI-powered alerts and intelligent workflows.
CTA: Learn More → (links to Events page)
Image: Event planner using Command Center dashboard
```

**Card 2: Designers**
```
Label: FOR DESIGNERS
Headline: Get Discovered & Booked
Description: Create a professional profile, receive 
event invitations, and manage assignments—all in 
one premium platform built for fashion creatives.
CTA: Learn More → (links to Designer Directory)
Image: Designer portfolio page or runway moment
```

**Card 3: Sponsors**
```
Label: FOR SPONSORS
Headline: Maximize Your ROI
Description: Discover compatible events, track 
real-time metrics, and prove sponsorship value 
with data-driven ROI analytics.
CTA: Learn More → (links to Sponsors/ROI page)
Image: ROI dashboard or sponsor activation
```

---

### 4.7 Key Features Grid (6 Features)

**Purpose:** Showcase platform capabilities at a glance

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Everything You Need to Manage Fashion Events  │  ← Headline
│                                                 │
│  ┌───────┐  ┌───────┐  ┌───────┐              │
│  │Feature│  │Feature│  │Feature│              │
│  └───────┘  └───────┘  └───────┘              │
│  ┌───────┐  ┌───────┐  ┌───────┐              │
│  │Feature│  │Feature│  │Feature│              │
│  └───────┘  └───────┘  └───────┘              │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FAFAFA`
- Padding: `96px 64px`
- Max-width: `1200px`, centered

**Grid:**
- Desktop: 3 columns × 2 rows, gap `32px`
- Tablet: 2 columns × 3 rows
- Mobile: 1 column × 6 rows

**Each Feature Card:**
- Background: `#FFFFFF`
- Border: `1px solid #E5E5E5`
- Border-radius: `16px`
- Padding: `32px`
- Hover: Shadow `0 4px 16px rgba(0, 0, 0, 0.08)`, lift `-2px`

**Icon:**
- Size: `32px × 32px`
- Color: `#D4A5A5`
- Margin-bottom: `16px`

**Feature Title:**
- Font: Inter SemiBold, `18px`
- Color: `#1A1A1A`
- Margin-bottom: `8px`

**Description:**
- Font: Inter Regular, `14px`
- Color: `#4A4A4A`
- Line-height: `1.6`

**6 Features:**

1. **Event Command Center**
   - Icon: LayoutDashboard
   - Description: "Real-time dashboard with KPIs, AI insights, and 5-phase workflow tracking."

2. **AI Risk Detection**
   - Icon: AlertTriangle
   - Description: "Proactive alerts for potential issues—backstage congestion, budget overruns, task delays."

3. **CRM & Partnerships**
   - Icon: Users
   - Description: "Manage sponsors, designers, venues, and vendors in one integrated system."

4. **Smart Task Management**
   - Icon: CheckSquare
   - Description: "Auto-generated task lists with dependencies, deadlines, and AI prioritization."

5. **Designer Directory**
   - Icon: Palette
   - Description: "Searchable database of 248+ designers with AI-powered compatibility matching."

6. **ROI Analytics**
   - Icon: BarChart3
   - Description: "Measure event success with attendance, media value, and sponsor ROI tracking."

---

### 4.8 Testimonials

**Purpose:** Build trust with social proof from real users

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  What Fashion Professionals Say                │  ← Headline
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Quote    │  │ Quote    │  │ Quote    │     │
│  │ - Name   │  │ - Name   │  │ - Name   │     │
│  │   Title  │  │   Title  │  │   Title  │     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FFFFFF`
- Padding: `96px 64px`
- Max-width: `1200px`, centered

**Headline:**
- Font: Playfair Display SemiBold, `42px`
- Color: `#1A1A1A`
- Alignment: Center
- Margin-bottom: `64px`

**Grid:**
- Desktop: 3 columns, gap `32px`
- Tablet: 2 columns (stack 3rd)
- Mobile: 1 column

**Each Testimonial Card:**
- Background: `#FAFAFA`
- Border: `1px solid #E5E5E5`
- Border-radius: `16px`
- Padding: `32px`

**Star Rating:**
- 5 stars (★★★★★)
- Color: `#D4A5A5`
- Size: `16px`
- Margin-bottom: `16px`

**Quote:**
- Font: Inter Regular, `16px`
- Color: `#4A4A4A`
- Line-height: `1.6`
- Margin-bottom: `20px`
- Italic style

**Name:**
- Font: Inter SemiBold, `16px`
- Color: `#1A1A1A`
- Margin-bottom: `4px`

**Title & Company:**
- Font: Inter Regular, `14px`
- Color: `#9E9E9E`

**Example Testimonials:**

**Testimonial 1:**
```
★★★★★
"FashionOS reduced our planning time by 60%. The AI 
insights caught a backstage congestion risk that would 
have delayed our show by 15 minutes. Absolutely essential 
for fashion week."

Sarah Chen
Event Producer, New York Fashion Week
```

**Testimonial 2:**
```
★★★★★
"We sponsored 8 events last year with inconsistent ROI 
data. FashionOS gave us real-time metrics and proved 
4.8x ROI across all sponsorships. Game-changer for 
justifying our budget."

Jennifer Park
Marketing Director, Luxury Watch Brand
```

**Testimonial 3:**
```
★★★★★
"As an emerging designer, FashionOS gave me a professional 
platform to showcase my work. I've received 3 runway 
invitations in 6 months—opportunities I wouldn't have 
had otherwise."

Aurelia Noir
Fashion Designer, Paris
```

---

### 4.9 Pricing Preview

**Purpose:** Show pricing options, drive visitors to pricing page

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Simple, Transparent Pricing                   │  ← Headline
│  Choose the plan that fits your needs          │  ← Subheadline
│                                                 │
│  ┌────────┐  ┌────────┐  ┌────────┐           │
│  │Starter │  │  Pro   │  │Enterpr.│           │
│  │ $99/mo │  │$299/mo │  │$999/mo │           │
│  │Features│  │Features│  │Features│           │
│  │[Button]│  │[Button]│  │[Button]│           │
│  └────────┘  └────────┘  └────────┘           │
│                                                 │
│  [View Full Pricing Details →]                │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FAFAFA`
- Padding: `96px 64px`
- Max-width: `1200px`, centered

**Headlines:**
- Main: Playfair Display SemiBold, `42px`, center
- Sub: Inter Regular, `18px`, center, `#4A4A4A`
- Gap: `16px`
- Margin-bottom: `64px`

**Grid:**
- Desktop: 3 columns, gap `32px`
- Tablet: 2 columns (stack 3rd)
- Mobile: 1 column

**Each Pricing Card:**

**Card Style:**
- Background: `#FFFFFF`
- Border: `2px solid #E5E5E5`
- Border-radius: `16px`
- Padding: `40px 32px`
- Shadow: `0 4px 12px rgba(0, 0, 0, 0.05)`

**"Pro" Card (Highlight):**
- Border: `2px solid #D4A5A5`
- Shadow: `0 8px 24px rgba(212, 165, 165, 0.2)`
- Badge: "Most Popular" (top-right corner)

**Plan Name:**
- Font: Inter SemiBold, `20px`
- Color: `#1A1A1A`
- Margin-bottom: `8px`

**Price:**
- Font: Inter Bold, `48px`
- Color: `#1A1A1A`
- Margin-bottom: `4px`
- Format: `$299`

**Billing Period:**
- Font: Inter Regular, `14px`
- Color: `#9E9E9E`
- Text: "/month, billed annually"
- Margin-bottom: `24px`

**Divider:**
- Height: `1px`
- Background: `#E5E5E5`
- Margin: `24px 0`

**Features List:**
- Font: Inter Regular, `14px`
- Color: `#4A4A4A`
- Line-height: `1.8`
- List style: Checkmarks (✓)
- Checkmark color: `#A8D5BA`
- Gap between items: `12px`

**CTA Button:**
- Margin-top: `32px`
- Full width
- Primary button (for Pro), Secondary (for others)
- Text: "Start Free Trial" or "Contact Sales"

**Pricing Tiers:**

**Starter - $99/month**
```
Features:
✓ 5 active events
✓ Event Command Center
✓ Basic AI features
✓ Task management
✓ 2 team members
✓ Email support

CTA: Start Free Trial
```

**Pro - $299/month** (MOST POPULAR)
```
Features:
✓ 20 active events
✓ Advanced AI insights
✓ Designer Directory access
✓ Sponsor CRM
✓ ROI analytics
✓ 10 team members
✓ Priority support

CTA: Start Free Trial
```

**Enterprise - $999/month**
```
Features:
✓ Unlimited events
✓ Custom integrations
✓ White-label options
✓ Dedicated account manager
✓ Unlimited team members
✓ 24/7 phone support

CTA: Contact Sales
```

**Link to Full Pricing:**
- Below cards, centered
- Text: "View Full Pricing Details →"
- Font: Inter Medium, `16px`
- Color: `#D4A5A5`
- Hover: Underline

---

### 4.10 Final CTA (Conversion Section)

**Purpose:** Last chance to convert visitors before footer

**Layout:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Ready to Transform Your Fashion Events?       │  ← Headline
│                                                 │
│  Join 500+ event planners who've streamlined   │  ← Subheadline
│  their workflow and increased ROI with         │
│  FashionOS.                                     │
│                                                 │
│  [Start Free Trial]  [Book a Demo]            │  ← CTAs
│                                                 │
│  No credit card required • 14-day free trial   │  ← Trust badges
│                                                 │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: Gradient `linear-gradient(135deg, #F8E8EE 0%, #E8D5F2 100%)`
- Padding: `96px 64px`
- Text alignment: Center

**Headline:**
- Font: Playfair Display Bold, `48px` (desktop), `32px` (mobile)
- Color: `#1A1A1A`
- Margin-bottom: `24px`

**Subheadline:**
- Font: Inter Regular, `20px` (desktop), `16px` (mobile)
- Color: `#4A4A4A`
- Max-width: `700px`, centered
- Line-height: `1.6`
- Margin-bottom: `40px`

**CTA Buttons:**
- Flex, gap `16px`, justify center
- **Primary:** "Start Free Trial" (large, gradient)
- **Secondary:** "Book a Demo" (large, white background)

**Trust Badges:**
- Margin-top: `24px`
- Font: Inter Regular, `14px`
- Color: `#9E9E9E`
- Separator: `•` between items

---

### 4.11 Footer

**Purpose:** Navigation, legal links, newsletter signup

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  [Logo]                                         │
│                                                 │
│  [Product]  [Resources]  [Company]  [Newsletter]│
│   Events     Blog         About     Email input│
│   Services   Docs         Careers   [Subscribe]│
│   Pricing    Help         Contact              │
│                                                 │
│  ─────────────────────────────────────────────  │
│  © 2025 FashionOS  |  Privacy  |  Terms        │
│  [Social Icons]                                │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#1A1A1A` (dark)
- Color: `#FFFFFF` (light text)
- Padding: `64px 64px 32px` (desktop)

**Logo:**
- White version
- Height: `28px`
- Margin-bottom: `32px`

**Grid:**
- Desktop: 4 columns, gap `48px`
- Mobile: 1 column, stack sections

**Column Headings:**
- Font: Inter SemiBold, `14px`
- Color: `#FFFFFF`
- Text-transform: `uppercase`
- Letter-spacing: `0.05em`
- Margin-bottom: `16px`

**Links:**
- Font: Inter Regular, `14px`
- Color: `#9E9E9E`
- Line-height: `2.0`
- Hover: Color `#FFFFFF`

**Newsletter Section:**
- Heading: "Stay Updated"
- Input: Email field, `#2A2A2A` background
- Button: "Subscribe" (primary gradient)

**Bottom Bar:**
- Border-top: `1px solid #2A2A2A`
- Padding-top: `24px`
- Margin-top: `48px`
- Flex: Space-between (copyright left, links center, social right)

**Social Icons:**
- Instagram, LinkedIn, Twitter/X
- Size: `20px`
- Color: `#9E9E9E`
- Hover: Color `#FFFFFF`
- Gap: `16px`

---

## 5. Image Guidelines

### Hero Section
**What:** Dashboard screenshot (Command Center)  
**Style:** Clean, high-resolution browser mockup  
**Aspect Ratio:** 16:9  
**Content:** Show KPI cards, AI insights panel, workflow timeline  
**Do:** Use actual product screenshot with real data  
**Don't:** Use Lorem Ipsum or placeholder content  

### Product Showcase
**What:** Larger, detailed Command Center screenshot  
**Style:** Professional, editorial quality  
**Aspect Ratio:** 16:9 or 21:9 (wide)  
**Treatment:** Add callout annotations on corners  
**Do:** Highlight key features with arrows/boxes  
**Don't:** Make callouts too cluttered  

### Use Case Cards
**Card 1 (Event Planners):**
- Image: Person using laptop with dashboard visible
- Style: Professional office setting, natural light
- Focus: Confident, organized event planner

**Card 2 (Designers):**
- Image: Designer portfolio page or runway moment
- Style: Editorial, fashion-forward
- Focus: Designer's work displayed beautifully

**Card 3 (Sponsors):**
- Image: ROI analytics dashboard or brand activation
- Style: Data visualization or event branding
- Focus: Metrics, graphs, professional setting

### Feature Grid
**Icons Only:** Use Lucide React icons (no images)  
**Colors:** `#D4A5A5` (rose gold accent)  

### Testimonials
**Optional:** Headshots of testimonial sources  
**Size:** `64px × 64px` circle  
**Style:** Professional portraits, grayscale  
**Placement:** Left of quote or top of card  

### General Image Rules
- **Format:** WebP with JPG fallback
- **Optimization:** Compress to <200KB per image
- **Resolution:** 2x for retina displays
- **Alt Text:** Always include descriptive alt text
- **Loading:** Lazy load below-the-fold images

---

## 6. SEO & Meta

### Page Title
```
FashionOS - Luxury Fashion Event Management Platform | AI-Powered
```
(55-60 characters)

### Meta Description
```
The premium platform for managing runway shows, brand activations, 
and designer showcases. AI-powered intelligence meets luxury-tech 
design. Trusted by leading fashion organizations. Start free trial.
```
(150-160 characters)

### Keywords
- Fashion event management software
- Runway show planning platform
- Fashion week management tool
- AI event planning
- Designer directory
- Sponsor CRM fashion
- Event management for fashion brands
- Luxury event platform

### Open Graph Tags
```html
<meta property="og:title" content="FashionOS - Luxury Fashion Event Management" />
<meta property="og:description" content="Manage fashion events with AI-powered intelligence and premium design." />
<meta property="og:image" content="https://fashionos.com/og-image.jpg" />
<meta property="og:url" content="https://fashionos.com" />
```

---

## 7. Accessibility Notes

- All images have descriptive `alt` text
- Color contrast meets WCAG AA (4.5:1 minimum)
- Headings follow semantic hierarchy (H1 → H2 → H3)
- Focus indicators visible on all interactive elements
- Skip to main content link for keyboard navigation
- All CTAs have clear, descriptive text (not just "Click Here")
- Form fields have associated labels
- Test with screen reader (NVDA, JAWS, VoiceOver)

---

## 8. Performance Checklist

- [ ] Hero loads in <2 seconds
- [ ] Images lazy-loaded below fold
- [ ] Total page size <2MB
- [ ] First Contentful Paint <1.5s
- [ ] Lighthouse score 90+ (Performance)
- [ ] No layout shift (CLS <0.1)
- [ ] Mobile-friendly (Google Mobile-Friendly Test)

---

## 9. A/B Testing Ideas

**Hero Headline Variants:**
- A: "The Premium Platform for Luxury Fashion Events"
- B: "Manage Fashion Events 3x Faster with AI"
- C: "Where Fashion Meets Intelligent Technology"

**CTA Button Text:**
- A: "Start Free Trial"
- B: "Try FashionOS Free"
- C: "Get Started Free"

**Social Proof:**
- A: Logo bar only
- B: Logos + "500+ events managed" stat
- C: Logos + user count + testimonial preview

---

## 10. Content Maintenance

**Update Frequency:**
- Stats (500+ events, etc.): Monthly
- Testimonials: Quarterly (add new ones)
- Screenshots: After major feature releases
- Pricing: As plans change

**Content Owner:** Marketing team  
**Technical Owner:** Frontend team  
**Review Cycle:** Quarterly

---

**Document Version:** 1.0  
**Last Updated:** December 9, 2025  
**Next Review:** March 2026
