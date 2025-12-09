# FashionOS Marketing Pages - Designer Directory Page Documentation

**Page:** Designer Directory  
**URL:** `/designers` or `/directory`  
**File:** `Directory.tsx`  
**Version:** 1.0  
**Last Updated:** December 9, 2025

---

## 1. Page Purpose

The Designer Directory page serves as a public-facing showcase and discovery platform for fashion designers. It aims to:
- Showcase the breadth and quality of designers in the FashionOS network
- Enable event planners to discover and evaluate designers
- Attract new designers to create profiles
- Demonstrate platform value through designer diversity

**Primary Goal:** Designer discovery → profile views → event invitations  
**Secondary Goal:** Recruit new designers to join platform  
**Target Audience:** Event planners, fashion brands, press, buyers, and designers

---

## 2. Core Messaging

### Brand Positioning
"Discover the world's most innovative fashion designers—from emerging talent to established names—all in one curated directory."

### Key Messages

**1. Curated Quality**
"Every designer profile is carefully curated to showcase exceptional talent. From sustainable pioneers to avant-garde visionaries, discover your next runway star."

**2. Comprehensive Profiles**
"Rich designer profiles include collections, brand stories, press coverage, sustainability practices, and event history—everything you need to make informed decisions."

**3. AI-Powered Discovery**
"Smart search and AI recommendations help you find designers that perfectly match your event's aesthetic, values, and audience."

### Value Propositions

**For Event Planners:**
- Discover designers you wouldn't find otherwise
- Filter by category, location, sustainability, awards
- View complete portfolios and brand stories
- Contact designers directly through platform
- AI suggests compatible designers for your events

**For Designers:**
- Professional platform to showcase your work
- Get discovered by event planners worldwide
- Receive event invitations directly
- Build credibility with verified profile
- Free tier to join and gain visibility

---

## 3. Layout Structure

### Page Blueprint

```
┌────────────────────────────────────────────────┐
│  [Navigation Bar]                              │
└────────────────────────────────────────────────┘
│                                                │
│  [HERO SECTION]                               │
│  - Headline                                   │
│  - Search bar (prominent)                     │
│  - Quick stats                                │
│                                                │
├────────────────────────────────────────────────┤
│  [FEATURED DESIGNERS CAROUSEL]                │
│  - 5-6 spotlight designers                    │
│                                                │
├────────────────────────────────────────────────┤
│  [FILTER & SEARCH BAR]                        │
│  - Category, Location, Tags filters           │
│  - Sort options                               │
│  - View toggle (grid/list)                    │
│                                                │
├────────────────────────────────────────────────┤
│  [DESIGNER GRID/LIST]                         │
│  - 12-24 designers per page                   │
│  - Pagination                                 │
│                                                │
├────────────────────────────────────────────────┤
│  [AI DISCOVERY INSIGHTS]                      │
│  - Trending categories                        │
│  - Emerging designers                         │
│  - Popular filters                            │
│                                                │
├────────────────────────────────────────────────┤
│  [CATEGORIES SHOWCASE]                        │
│  - Browse by category cards                   │
│                                                │
├────────────────────────────────────────────────┤
│  [SUCCESS STORIES]                            │
│  - Designers who got booked via platform      │
│                                                │
├────────────────────────────────────────────────┤
│  [JOIN AS DESIGNER CTA]                       │
│  - Recruitment section for new designers      │
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
│  Discover Exceptional Fashion Designers        │  ← H1
│                                                 │
│  ┌─────────────────────────────────────────┐  │
│  │  🔍 Search designers, styles, locations │  │  ← Search bar
│  └─────────────────────────────────────────┘  │
│                                                 │
│  248 Designers | 45 Countries | 12 Categories  │  ← Stats
│                                                 │
│  [Background: Faded designer photos mosaic]    │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Height: `60vh` (desktop)
- Background: Mosaic of designer photos (faded, 20% opacity) with gradient overlay
- Padding: `96px 64px`

**Headline (H1):**
```
Discover Exceptional Fashion Designers
```
- Font: Playfair Display Bold, `56px` (desktop), `36px` (mobile)
- Color: `#1A1A1A`
- Alignment: Center

**Search Bar:**
- Width: `100%`, max-width `700px`
- Height: `64px`
- Background: `#FFFFFF`
- Border-radius: `16px`
- Shadow: `0 4px 24px rgba(0, 0, 0, 0.12)`
- Placeholder: "Search designers, styles, locations..."
- Icon: Search icon (left side, 24px)
- Auto-suggest dropdown appears as user types

**Quick Stats:**
- Font: Inter Medium, `16px`
- Color: `#4A4A4A`
- Separator: `|` between stats
- Margin-top: `24px`
- Update numbers dynamically based on actual data

**Background Mosaic:**
- 20-30 designer photos in grid
- Grayscale with 20% opacity
- Gradient overlay: `linear-gradient(135deg, rgba(248,232,238,0.9) 0%, rgba(232,213,242,0.9) 100%)`

---

### 4.2 Featured Designers Carousel

**Purpose:** Highlight exceptional or new designers

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Featured Designers                            │  ← Headline
│                                                 │
│  ← [Designer 1] [Designer 2] [Designer 3] →   │
│     [Designer 4] [Designer 5]                  │
│                                                 │
│  ● ○ ○ ○                                       │  ← Indicators
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FFFFFF`
- Padding: `64px 64px`
- Carousel: Auto-rotate every 6 seconds, manual controls

**Each Featured Card:**
- Width: `320px`
- Height: `480px`
- Border-radius: `16px`
- Overflow: Hidden
- Hover: Lift shadow, scale 1.02

**Card Structure:**
```
┌────────────────┐
│                │
│  [Cover Image] │  ← Designer photo or collection image
│                │
│  ──────────────│
│  Designer Name │  ← Name
│  Category      │  ← Category
│  [Tags]        │  ← Emerging, Award Winner, etc.
│  [View Profile]│  ← CTA
└────────────────┘
```

**Cover Image:**
- Aspect ratio: `3:4` (portrait)
- Object-fit: Cover
- Height: `320px`

**Name:**
- Font: Playfair Display SemiBold, `24px`
- Color: `#1A1A1A`
- Margin: `16px 20px 4px`

**Category:**
- Font: Inter Regular, `14px`
- Color: `#9E9E9E`
- Margin: `0 20px 12px`

**Tags:**
- Small badges (e.g., "Emerging Talent", "Sustainable")
- Background: `#F8E8EE`
- Color: `#D4A5A5`
- Font: Inter SemiBold, `11px`, uppercase
- Padding: `4px 10px`
- Border-radius: `12px`
- Margin: `0 20px 16px`

**CTA Button:**
- Ghost button
- Text: "View Profile →"
- Margin: `0 20px 20px`

**Featured Designers Criteria:**
- Recently joined (last 30 days)
- Award winners
- High engagement (most viewed profiles)
- Event organizer recommendations
- Rotates weekly

---

### 4.3 Filter & Search Bar

**Purpose:** Powerful filtering to narrow down search

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  [Search] | [Category ▼] [Location ▼] [Tags ▼] │
│                                                 │
│  [Sort: Most Popular ▼]  [Grid/List Toggle]    │
│                                                 │
│  Showing 248 designers                         │
│                                                 │
│  Active Filters:                               │
│  [Luxury Womenswear ×] [Paris ×] [Sustainable ×]│
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FAFAFA`
- Padding: `24px`
- Border-bottom: `1px solid #E5E5E5`
- Sticky on scroll (stays at top when scrolling)

**Search Input:**
- Width: `300px` (desktop)
- Placeholder: "Search designers..."
- Real-time search (updates results as you type)

**Dropdown Filters:**

**Category:**
- Options: All, Luxury Womenswear, Menswear, Streetwear, Bridal, Sustainable, Jewelry, Accessories, Avant-Garde
- Multi-select (checkboxes inside dropdown)

**Location:**
- Options: All Locations, Paris, New York, London, Milan, Tokyo, Los Angeles, Berlin
- Single select or multi-select
- Country grouping (France → Paris, Lyon, etc.)

**Tags:**
- Options: Emerging Talent, Award Winner, Sustainable, BIPOC, LGBTQ+, Women-Owned, Fair Trade
- Multi-select

**Sort Dropdown:**
- Most Popular (default)
- Newest First
- A-Z (alphabetical)
- Most Events Participated

**View Toggle:**
- Grid view icon (3×3 grid)
- List view icon (horizontal lines)
- Active state: `#D4A5A5` color

**Results Count:**
- Font: Inter Regular, `14px`
- Color: `#4A4A4A`
- Updates dynamically as filters change

**Active Filters:**
- Show as removable tags below filter bar
- Click `×` to remove filter
- "Clear All" link if 2+ filters active

---

### 4.4 Designer Grid/List

**Grid View:**
```
┌─────────────────────────────────────────────────┐
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │Design│  │Design│  │Design│  │Design│       │
│  │  er  │  │  er  │  │  er  │  │  er  │       │
│  └──────┘  └──────┘  └──────┘  └──────┘       │
│                                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │Design│  │Design│  │Design│  │Design│       │
│  └──────┘  └──────┘  └──────┘  └──────┘       │
│                                                 │
│  [Load More ▼] or [Pagination: 1 2 3 4 >]    │
└─────────────────────────────────────────────────┘
```

**Grid Specifications:**
- Desktop: 4 columns, gap `24px`
- Tablet: 3 columns, gap `20px`
- Mobile: 2 columns, gap `16px`

**Designer Card (Grid):**
```
┌────────────────────────┐
│                        │
│  [Profile Image/Logo]  │  ← Image
│                        │
│  ────────────────────  │
│  Designer Name         │  ← Name
│  Category              │  ← Category
│  📍 Location           │  ← Location
│  🏆 Tags               │  ← Tags
│  ────────────────────  │
│  4 Events | 2 Coll.    │  ← Stats
│  ★★★★★ 4.9 (12)        │  ← Rating
│  [View Profile]        │  ← CTA
└────────────────────────┘
```

**Card Specifications:**
- Background: `#FFFFFF`
- Border: `1px solid #E5E5E5`
- Border-radius: `16px`
- Padding: `20px`
- Hover: Shadow `0 4px 16px rgba(0, 0, 0, 0.08)`, border color `#D4A5A5`

**Profile Image:**
- Aspect ratio: `1:1` (square)
- Border-radius: `8px`
- Height: `200px`
- Object-fit: Cover
- If no image: Initials on gradient background

**Name:**
- Font: Inter SemiBold, `18px`
- Color: `#1A1A1A`
- Margin-top: `16px`

**Category:**
- Font: Inter Regular, `14px`
- Color: `#9E9E9E`

**Location:**
- Icon: MapPin (lucide-react), 14px
- Font: Inter Regular, `13px`
- Color: `#4A4A4A`

**Tags:**
- Small badges (same as featured cards)
- Max 2 visible, "... +2" if more

**Stats:**
- Font: Inter Regular, `13px`
- Color: `#4A4A4A`
- Separator: `|`

**Rating:**
- Stars: `#D4A5A5` (filled) or `#E5E5E5` (empty)
- Number: `4.9`
- Review count in parentheses: `(12)`

**CTA:**
- Ghost button
- Text: "View Profile"
- Full width

---

**List View:**
```
┌─────────────────────────────────────────────────┐
│  [Img] Designer Name          Category   [CTA] │
│        Location | 4 Events    Tags             │
│  ──────────────────────────────────────────────│
│  [Img] Designer Name          Category   [CTA] │
│        Location | 4 Events    Tags             │
└─────────────────────────────────────────────────┘
```

**List View Specifications:**
- Full width cards
- Image on left (120px × 120px square)
- Content in middle (flex, space-between)
- CTA button on right
- Divider between cards: `1px solid #E5E5E5`

---

**Pagination:**
- 12 designers per page (grid)
- 24 designers per page (list)
- Or "Load More" infinite scroll

**Pagination UI:**
```
[← Previous]  1  2  [3]  4  5  [Next →]
```

**Specifications:**
- Centered below grid
- Current page: Gradient background
- Other pages: Transparent, hover `#F5F5F5`
- Arrows: Ghost buttons

---

### 4.5 AI Discovery Insights Panel

**Purpose:** Show trending data and AI-powered recommendations

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  ✨ Discovery Insights                         │  ← Headline
│  ─────────────────────────────────────────────  │
│                                                 │
│  🔥 Trending This Month                        │
│  • Sustainable Streetwear (+45%)               │
│  • Bridal Couture (+32%)                       │
│  • Minimalist Menswear (+28%)                  │
│                                                 │
│  🌟 Emerging Designers to Watch                │
│  • Kaelo Studios (Tokyo) - Avant-garde        │
│  • Vesper Line (Berlin) - Minimalist          │
│  • Aurelia Noir (Paris) - Sustainable         │
│                                                 │
│  🔍 Popular Searches                           │
│  • Sustainable designers in Paris              │
│  • Award-winning streetwear                    │
│  • Emerging talent London                      │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: Gradient `linear-gradient(135deg, #F9F5FF, #FFF9F9)`
- Border: `1px solid #E8D5F2`
- Border-radius: `16px`
- Padding: `24px`
- Position: Right sidebar or below grid

**Panel Header:**
- Icon: Sparkles (✨)
- Font: Inter SemiBold, `16px`
- Color: `#1A1A1A`

**Section Divider:**
- Height: `1px`
- Background: `#E8D5F2`
- Margin: `16px 0`

**List Items:**
- Font: Inter Regular, `14px`
- Color: `#4A4A4A`
- Clickable (filters grid on click)
- Hover: Color `#D4A5A5`

**Trending Percentage:**
- Color: `#5FA87E` (green, positive)
- Font: Inter SemiBold, `14px`

---

### 4.6 Categories Showcase

**Purpose:** Browse by category visually

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Browse by Category                            │  ← Headline
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Luxury   │  │Streetwear│  │ Bridal   │     │
│  │Womenswear│  │          │  │ Couture  │     │
│  │ [Image]  │  │ [Image]  │  │ [Image]  │     │
│  │ 45 des.  │  │ 28 des.  │  │ 12 des.  │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                 │
│  [+6 more categories...]                       │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FAFAFA`
- Padding: `96px 64px`
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)

**Each Category Card:**
- Aspect ratio: `4:5` (portrait)
- Border-radius: `16px`
- Overflow: Hidden
- Hover: Scale 1.02, shadow

**Card Structure:**
```
┌────────────────┐
│                │
│  [Category     │  ← Background image (designer work)
│   Image]       │
│                │
│  ──────────────│
│  Gradient      │  ← Dark gradient overlay bottom
│  Overlay       │
│                │
│  Category Name │  ← White text
│  45 designers  │  ← Count
└────────────────┘
```

**Image:**
- Representative designer work from that category
- Dark gradient overlay: `linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)`

**Category Name:**
- Font: Playfair Display SemiBold, `28px`
- Color: `#FFFFFF`
- Position: Absolute bottom `40px`
- Padding: `0 24px`

**Designer Count:**
- Font: Inter Regular, `14px`
- Color: `rgba(255,255,255,0.9)`
- Position: Absolute bottom `20px`

**Categories to Include:**
1. Luxury Womenswear (45 designers)
2. Streetwear (28 designers)
3. Bridal Couture (12 designers)
4. Menswear (32 designers)
5. Sustainable Fashion (38 designers)
6. Jewelry & Accessories (24 designers)
7. Avant-Garde (18 designers)
8. Plus-Size Fashion (14 designers)
9. Gender-Neutral (16 designers)

**Interaction:**
- Click card → filters grid to that category
- Smooth scroll to grid
- Active filter appears in filter bar

---

### 4.7 Success Stories

**Purpose:** Show designers who got booked via platform

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Designer Success Stories                      │  ← Headline
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  [Designer Photo]                        │  │
│  │                                          │  │
│  │  "FashionOS gave me a professional       │  │
│  │  platform to showcase my work. I've      │  │
│  │  received 3 runway invitations in 6      │  │
│  │  months—opportunities I wouldn't have    │  │
│  │  had otherwise."                         │  │
│  │                                          │  │
│  │  - Aurelia Noir, Fashion Designer       │  │
│  │    Paris | Luxury Womenswear            │  │
│  │                                          │  │
│  │  Results: 3 events booked, 2 collections│  │
│  │  showcased, 1 award nomination          │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  [2 more success stories in carousel]          │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FFFFFF`
- Padding: `96px 64px`
- Carousel format (1 story visible at a time)

**Each Story Card:**
- Max-width: `900px`, centered
- Background: `#FAFAFA`
- Border-radius: `16px`
- Padding: `48px`

**Designer Photo:**
- Size: `120px × 120px` circle
- Border: `4px solid #D4A5A5`
- Centered

**Quote:**
- Font: Playfair Display Regular, `20px`, italic
- Color: `#4A4A4A`
- Line-height: `1.6`
- Max-width: `700px`, centered
- Margin: `32px auto`

**Attribution:**
- Font: Inter SemiBold, `16px`
- Color: `#1A1A1A`

**Details:**
- Font: Inter Regular, `14px`
- Color: `#9E9E9E`

**Results:**
- Font: Inter Medium, `14px`
- Color: `#4A4A4A`
- Bullet points or inline
- Highlights key achievements

**Stories to Include:**

**Story 1: Aurelia Noir**
```
Quote: "FashionOS gave me a professional platform to showcase 
my work. I've received 3 runway invitations in 6 months—
opportunities I wouldn't have had otherwise."

Designer: Aurelia Noir
Location: Paris
Category: Luxury Womenswear

Results:
• 3 fashion week invitations
• 2 collections showcased
• 1 LVMH Prize nomination
• 1 major sponsor partnership secured
```

**Story 2: Kaelo Studios**
```
Quote: "Being featured in FashionOS's Emerging Designers section 
brought international attention. We went from local shows to 
Tokyo Fashion Week in 8 months."

Designer: Kaelo Studios
Location: Tokyo
Category: Avant-Garde Streetwear

Results:
• Featured at Tokyo Fashion Week
• 5 international event invitations
• Press coverage in 4 major publications
• Collaborations with 2 brands
```

**Story 3: Vesper Line**
```
Quote: "Event planners can finally discover designers beyond 
the usual networks. FashionOS leveled the playing field for 
independent designers like me."

Designer: Vesper Line
Location: Berlin
Category: Minimalist Menswear

Results:
• 6 runway shows across 3 countries
• 40% revenue increase from event exposure
• Featured in Vogue Business
```

---

### 4.8 Join as Designer CTA

**Purpose:** Recruit designers to create profiles

**Layout:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Are You a Fashion Designer?                   │  ← Headline
│                                                 │
│  Join 248+ designers showcasing their work     │  ← Subheadline
│  on FashionOS. Get discovered by event         │
│  planners, receive runway invitations, and     │
│  grow your brand.                              │
│                                                 │
│  ✓ Professional profile                       │  ← Benefits
│  ✓ Unlimited collection uploads                │
│  ✓ Direct event invitations                   │
│  ✓ Analytics and insights                     │
│  ✓ Free to join                                │
│                                                 │
│  [Create Your Profile] [Learn More]           │  ← CTAs
│                                                 │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- Background: Gradient `linear-gradient(135deg, #F8E8EE 0%, #E8D5F2 100%)`
- Padding: `96px 64px`
- Text alignment: Center

**Headline:**
- Font: Playfair Display Bold, `42px`
- Color: `#1A1A1A`

**Subheadline:**
- Font: Inter Regular, `18px`
- Color: `#4A4A4A`
- Max-width: `700px`, centered

**Benefits List:**
- Font: Inter Regular, `16px`
- Color: `#4A4A4A`
- Checkmarks: `#A8D5BA` (green)
- Aligned left, max-width `400px`, centered

**CTAs:**
- Primary: "Create Your Profile" → Opens designer signup
- Secondary: "Learn More" → Scrolls to info section or opens modal

---

### 4.9 Footer (Same as other pages)

Standard FashionOS footer

---

## 5. Image Guidelines

### Hero Background Mosaic
**What:** 20-30 designer photos/collection images  
**Style:** Grayscale, grid layout, faded (20% opacity)  
**Treatment:** Gradient overlay for text readability  

### Featured Designer Cards
**What:** Designer portrait or hero collection image  
**Aspect Ratio:** 3:4 (portrait)  
**Style:** High-quality, editorial  
**Consistency:** Similar lighting and color treatment  

### Designer Profile Images (Grid Cards)
**What:** Designer logo, portrait, or signature piece  
**Aspect Ratio:** 1:1 (square)  
**Size:** 200px × 200px minimum  
**Fallback:** Initials on gradient if no image  

### Category Cards
**What:** Representative work from that category  
**Examples:**
- Luxury Womenswear: Elegant evening gown
- Streetwear: Urban fashion, bold graphics
- Bridal: Wedding dress detail
- Sustainable: Natural fabrics, eco-friendly aesthetic

**Treatment:** Dark gradient overlay for text contrast  

### Success Story Photos
**What:** Designer headshot or portrait  
**Style:** Professional, authentic  
**Size:** 120px × 120px circle  
**Border:** 4px solid rose gold  

### General Rules
- Maintain consistent image quality across directory
- Use WebP format with JPG fallback
- Compress to <150KB per card image
- Lazy load images below fold
- Alt text: "Designer Name - Category - Location"

---

## 6. SEO & Meta

### Page Title
```
Fashion Designer Directory - Discover 248+ Designers | FashionOS
```

### Meta Description
```
Discover exceptional fashion designers from emerging talent to 
established names. Filter by category, location, and style. 
AI-powered search helps you find the perfect designer for your event.
```

### Keywords
- Fashion designer directory
- Emerging fashion designers
- Sustainable fashion designers
- Luxury fashion designers
- Independent fashion designers
- Fashion designer portfolio
- Find fashion designers
- Fashion week designers

### Structured Data (Schema.org)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "FashionOS Designer Directory",
  "description": "Curated directory of fashion designers",
  "numberOfItems": 248,
  "itemListElement": [
    {
      "@type": "Person",
      "name": "Designer Name",
      "jobTitle": "Fashion Designer",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressCountry": "France"
      }
    }
  ]
}
```

---

## 7. Interactive Features

### Search Functionality
- **Real-time search:** Results update as you type (debounced 300ms)
- **Auto-suggest:** Shows designer names, categories, locations as dropdown
- **Fuzzy matching:** Handles typos (e.g., "sustaniable" → "sustainable")
- **Keyboard navigation:** Arrow keys to navigate suggestions, Enter to select

### Filter Behavior
- **Multi-select:** Can apply multiple filters simultaneously
- **AND logic:** Filters narrow results (e.g., "Sustainable" AND "Paris")
- **Count updates:** Filter options show count (e.g., "Sustainable (38)")
- **Disabled states:** Gray out filters with 0 results

### Sorting
- **Most Popular:** Based on profile views + events participated
- **Newest First:** Recently joined designers
- **A-Z:** Alphabetical by designer name
- **Most Events:** Designers with most event participations

### View Toggle
- **Preference saved:** LocalStorage remembers user's choice
- **Smooth transition:** Fade animation when switching views (0.3s)

---

## 8. Conversion Optimization

### For Event Planners (Discovery)
- **Primary CTA:** "View Profile" on each card
- **Secondary CTA:** "Contact Designer" (requires login)
- **Tertiary CTA:** "Add to Event" (shortlist feature)

### For Designers (Recruitment)
- **Primary CTA:** "Create Your Profile" (bottom section)
- **Secondary CTA:** "Join as Designer" (top nav)
- **Value Props:** Free tier, visibility, event invitations

### Trust Signals
- Designer count (248+)
- Country count (45 countries)
- Success stories
- Featured designer badges
- Ratings and reviews

---

## 9. Accessibility Notes

- Landmark regions properly labeled (`<main>`, `<nav>`, `<aside>`)
- Filter dropdowns keyboard accessible (Tab, Enter, Esc)
- Search auto-suggest navigable by keyboard
- Images have descriptive alt text
- Color contrast meets WCAG AA
- Focus indicators visible on all interactive elements
- Screen reader announcements for filter changes ("Showing 12 designers in Sustainable category")

---

## 10. Performance Checklist

- [ ] Initial load shows 12 designers (lazy load more on scroll)
- [ ] Images lazy loaded (Intersection Observer)
- [ ] Filter changes update URL (shareable links)
- [ ] Total page size <2MB
- [ ] Lighthouse Performance 85+
- [ ] Search debounced (prevents excessive API calls)
- [ ] Skeleton loaders during data fetch

---

**Document Version:** 1.0  
**Last Updated:** December 9, 2025  
**Next Review:** March 2026
