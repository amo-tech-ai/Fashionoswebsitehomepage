# Website Design Wizard - Complete Documentation

**Component:** WebsiteWizard.tsx  
**Route:** `/website-wizard` or `/webdesign/wizard`  
**Version:** 1.0  
**Last Updated:** December 9, 2025  
**Status:** ✅ Complete

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Progress Tracker](#progress-tracker)
3. [Technical Architecture](#technical-architecture)
4. [Wizard Steps](#wizard-steps)
5. [Components](#components)
6. [State Management](#state-management)
7. [Conditional Logic](#conditional-logic)
8. [Image Specifications](#image-specifications)
9. [Interactions & Animations](#interactions--animations)
10. [Data Flow](#data-flow)

---

## Overview

### Purpose
The Website Design Wizard guides clients through a comprehensive brief creation process for custom website projects. It replaces lengthy forms and discovery calls with an interactive, visual experience that captures all necessary project details.

### Key Features
- ✅ 8 comprehensive wizard steps
- ✅ Conditional logic (e.g., e-commerce setup only shown when relevant)
- ✅ AI-powered brief generation
- ✅ Real-time progress tracking
- ✅ Image upload and preview
- ✅ Multi-select and toggle interactions
- ✅ Slide-in detail panels
- ✅ Export to PDF and Notion
- ✅ Responsive design (desktop-first)

### User Journey
```
Choose Website Type → Define Branding → Select Pages → Upload Content → 
Configure E-Commerce (if applicable) → Choose Features → Set Timeline/Budget → 
Review AI-Generated Brief → Export/Submit
```

---

## Progress Tracker

### Development Status

| Step | Screen Name | Status | Components | Images | Logic |
|------|-------------|--------|------------|--------|-------|
| 1 | Website Type & Goals | ✅ Complete | ✅ | ✅ | ✅ |
| 2 | Branding & Style | ✅ Complete | ✅ | ✅ | ✅ |
| 3 | Pages Needed | ✅ Complete | ✅ | ✅ | ✅ |
| 4 | Content & Images | ✅ Complete | ✅ | ✅ | ✅ |
| 5 | E-Commerce Setup | ✅ Complete | ✅ | ✅ | ✅ |
| 6 | Features & Integrations | ✅ Complete | ✅ | ✅ | ✅ |
| 7 | Timeline & Budget | ✅ Complete | ✅ | ✅ | ✅ |
| 8 | Summary & AI Brief | ✅ Complete | ✅ | ✅ | ✅ |

### Component Status

| Component | Status | File | Dependencies |
|-----------|--------|------|--------------|
| WizardHeader | ✅ Complete | WebsiteWizard.tsx | Motion, Lucide |
| ProgressBar | ✅ Complete | WebsiteWizard.tsx | Motion |
| PrimaryButton | ✅ Complete | WebsiteWizard.tsx | Motion |
| SecondaryButton | ✅ Complete | WebsiteWizard.tsx | Motion |
| IconCard | ✅ Complete | WebsiteWizard.tsx | Motion, ImageWithFallback |
| UploadBox | ✅ Complete | WebsiteWizard.tsx | Motion, Lucide |
| Toggle | ✅ Complete | WebsiteWizard.tsx | Motion |
| Checkbox | ✅ Complete | WebsiteWizard.tsx | Lucide |
| Dropdown | ✅ Complete | WebsiteWizard.tsx | Lucide |
| DrawerPanel | ✅ Complete | WebsiteWizard.tsx | Motion |
| ChipSelect | ✅ Complete | WebsiteWizard.tsx | Motion |

### Testing Checklist

- [✅] Step navigation (forward/backward)
- [✅] Conditional e-commerce screen
- [✅] Drawer panels (Pages & Features screens)
- [✅] Image upload and preview
- [✅] Form validation
- [✅] Save draft functionality
- [✅] AI brief generation
- [✅] PDF export
- [✅] Responsive layout (desktop)
- [✅] Animations and transitions
- [✅] Multi-select interactions
- [✅] Budget slider
- [✅] Calendar picker

---

## Technical Architecture

### File Structure
```
/WebsiteWizard.tsx (main component)
/components/website-wizard/
  └── (future: split into smaller components if needed)
/docs/
  └── website-wizard.md (this file)
```

### Core Technologies
- **React**: Component library
- **TypeScript**: Type safety
- **Motion (Framer Motion)**: Animations
- **Lucide React**: Icons
- **Tailwind CSS**: Styling
- **ImageWithFallback**: Image handling

### State Architecture
```typescript
interface WebsiteWizardState {
  // Step 1: Website Type
  websiteType: 'portfolio' | 'ecommerce' | 'landing' | 'creator' | null;
  goals: string[];
  audience: string;
  results: string;
  
  // Step 2: Branding
  logo: File | null;
  brandGuidelines: File | null;
  colorPalette: string[];
  fonts: string[];
  visualStyle: 'minimalist' | 'luxury' | 'bold' | 'dark' | null;
  inspirationImages: File[];
  brandWords: string;
  emotions: string;
  
  // Step 3: Pages
  pages: PageConfig[];
  
  // Step 4: Content
  textContent: string;
  contentFiles: File[];
  productImages: File[];
  moodboardImages: File[];
  aiCopywriting: boolean;
  
  // Step 5: E-Commerce
  numProducts: number;
  productCategories: string[];
  needPhotography: boolean;
  variants: boolean;
  inventoryTracking: boolean;
  discountCodes: boolean;
  customerLogin: boolean;
  wishlist: boolean;
  subscriptions: boolean;
  digitalProducts: boolean;
  paymentGateways: string[];
  currencies: string[];
  shippingRules: string;
  
  // Step 6: Features
  features: string[];
  
  // Step 7: Timeline & Budget
  timeline: string;
  customDate: Date | null;
  budget: number;
  budgetTier: 'starter' | 'growth' | 'pro' | 'enterprise' | null;
  finalNotes: string;
}

interface PageConfig {
  id: string;
  name: string;
  selected: boolean;
  hasContent: boolean;
  needsAI: boolean;
  description: string;
}
```

---

## Wizard Steps

### Step 1: Website Type & Goals
**Screen:** `WIZARD_01_WEBSITE_TYPE`

**Purpose:** Determine the primary website type and project goals

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Wizard Header - Step 1 of 7]              │
├─────────────────────────────────────────────┤
│                                             │
│   What type of website do you want to      │
│   create?                                   │
│   Choose the option that best matches       │
│   your project.                             │
│                                             │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐ │
│   │Portfolio│ │E-Comm│ │Landing│ │Creator│ │
│   │  [img] │ │[img] │ │ [img] │ │ [img] │ │
│   └──────┘  └──────┘  └──────┘  └──────┘ │
│                                             │
│   What is the main goal? (multi-select)    │
│   [chip] [chip] [chip] [chip]              │
│                                             │
│   Who is your primary audience?            │
│   [input field]                             │
│                                             │
│   What results should it achieve?          │
│   [textarea]                                │
│                                             │
│                      [Next: Branding →]    │
└─────────────────────────────────────────────┘
```

**Interactions:**
- Hover: Card elevation + shadow increase
- Click: Card selected (border + checkmark)
- Multi-select chips toggle on/off
- Next button enabled when type selected

**Data Captured:**
- Website type (required)
- Goals (multi-select)
- Primary audience (text)
- Desired results (text)

---

### Step 2: Branding & Style
**Screen:** `WIZARD_02_BRANDING_STYLE`

**Purpose:** Capture brand assets and define visual direction

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Wizard Header - Step 2 of 7]              │
├─────────────────────────────────────────────┤
│                                             │
│   Let's define your brand style            │
│                                             │
│   BRAND UPLOAD                              │
│   ┌──────────┐  ┌──────────┐               │
│   │Upload Logo│ │Brand Guide│               │
│   └──────────┘  └──────────┘               │
│                                             │
│   Color Palette                             │
│   [○][○][○][○][○] + Add Color             │
│                                             │
│   VISUAL STYLE                              │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│   │Minimal│Luxury│ Bold │ Dark │          │
│   │[img]│ │[img]│ │[img]│ │[img]│         │
│   └─────┘ └─────┘ └─────┘ └─────┘        │
│                                             │
│   INSPIRATION                               │
│   [Upload 3-6 reference images]            │
│                                             │
│   Describe your brand in 3-5 words:        │
│   [input]                                   │
│                                             │
│   What emotions should it convey?          │
│   [input]                                   │
│                                             │
│   [← Back]              [Next: Pages →]    │
└─────────────────────────────────────────────┘
```

**Interactions:**
- File upload: Drag & drop or click
- Color picker: Opens color selection modal
- Visual style cards: Single select
- Inspiration grid: Shows preview thumbnails

**Data Captured:**
- Logo file
- Brand guidelines file
- Color palette (array of hex codes)
- Visual style preference
- Inspiration images (3-6 files)
- Brand descriptor words
- Emotional keywords

---

### Step 3: Pages Needed
**Screen:** `WIZARD_03_PAGES_NEEDED`

**Purpose:** Select required pages and configure content needs

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Wizard Header - Step 3 of 7]              │
├─────────────────────────────────────────────┤
│                                             │
│   Which pages do you need?                 │
│                                             │
│   ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│   │Home│ │About│ │Shop│ │Blog│            │
│   └────┘ └────┘ └────┘ └────┘            │
│   ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│   │Port-│ │Serv-│ │Test-│ │Look-│          │
│   │folio│ │ices│ │imon.│ │book│           │
│   └────┘ └────┘ └────┘ └────┘            │
│                                             │
│   [When page selected → Right drawer opens]│
│                                             │
│   ┌──────────────────────────────────┐     │
│   │ HOME PAGE                    [×] │     │
│   │                                  │     │
│   │ Your main landing page with     │     │
│   │ hero section, features, CTA     │     │
│   │                                  │     │
│   │ Content Needed:                 │     │
│   │ • Hero headline & copy          │     │
│   │ • Featured images               │     │
│   │ • Call-to-action text           │     │
│   │                                  │     │
│   │ [Toggle] I have content         │     │
│   │ [Toggle] Generate with AI       │     │
│   └──────────────────────────────────┘     │
│                                             │
│   [← Back]            [Next: Content →]    │
└─────────────────────────────────────────────┘
```

**Interactions:**
- Click page card: Opens right drawer panel
- Drawer: Slides in from right with page details
- Toggles: Content availability & AI generation
- Multiple pages can be selected

**Data Captured:**
- Selected pages (array)
- Per page: hasContent, needsAI

---

### Step 4: Content & Images
**Screen:** `WIZARD_04_CONTENT_UPLOAD`

**Purpose:** Upload or generate website content

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Wizard Header - Step 4 of 7]              │
├─────────────────────────────────────────────┤
│                                             │
│   Upload your content                       │
│                                             │
│   TEXT CONTENT                              │
│   ┌───────────────────────────────────┐    │
│   │ Paste your content here...        │    │
│   │                                    │    │
│   │                                    │    │
│   └───────────────────────────────────┘    │
│   [Upload .docx/.txt] [Generate with AI]   │
│                                             │
│   IMAGES & MEDIA                            │
│   ┌─────────────────────────────────────┐  │
│   │   Drag & drop images here           │  │
│   │   or click to browse                │  │
│   └─────────────────────────────────────┘  │
│                                             │
│   PRODUCT PHOTOS (if e-commerce)           │
│   [Upload product images]                  │
│                                             │
│   REFERENCE MOODBOARD                       │
│   [Grid of uploaded images]                │
│                                             │
│   ⚠️ MISSING CONTENT ASSISTANT              │
│   • No hero banner images                  │
│   • Missing About page content             │
│   [Generate suggestions with AI]           │
│                                             │
│   [← Back]         [Next: E-Commerce →]    │
└─────────────────────────────────────────────┘
```

**Interactions:**
- Text area: Paste or type content
- File upload: Drag & drop with preview
- AI generation: Shows loading then populates
- Missing content: Auto-detected and highlighted

**Data Captured:**
- Text content (string)
- Content files (.docx, .txt)
- Product images (if e-commerce)
- Moodboard references
- AI copywriting preference

---

### Step 5: E-Commerce Setup
**Screen:** `WIZARD_05_ECOMMERCE_SETUP`

**Purpose:** Configure online store functionality (conditional)

**Display Logic:** Only shown if `websiteType === 'ecommerce'`

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Wizard Header - Step 5 of 7]              │
├─────────────────────────────────────────────┤
│                                             │
│   Set up your online store                 │
│                                             │
│   PRODUCT SETUP                             │
│   How many products?                        │
│   [Slider: 1 ──○──── 500+]                │
│                                             │
│   Product categories:                       │
│   [Chip: Women] [Chip: Men] [+Add]         │
│                                             │
│   Do you need product photography?         │
│   [Toggle: Yes/No]                          │
│                                             │
│   STORE FEATURES                            │
│   [✓] Variants (size/color)                │
│   [✓] Inventory tracking                   │
│   [ ] Discount codes                        │
│   [✓] Customer login                       │
│   [ ] Wishlist                              │
│   [ ] Subscriptions                         │
│   [ ] Digital products                      │
│                                             │
│   PAYMENTS & SHIPPING                       │
│   Payment gateways:                         │
│   [Dropdown: Stripe, PayPal, etc.]         │
│                                             │
│   Currencies:                               │
│   [Multi-select: USD, EUR, GBP, etc.]      │
│                                             │
│   Shipping:                                 │
│   [Textarea: Describe shipping rules]      │
│                                             │
│   [← Back]          [Next: Features →]     │
└─────────────────────────────────────────────┘
```

**Interactions:**
- Slider: Adjusts product count
- Checkboxes: Toggle store features
- Multi-select dropdowns
- Conditional visibility based on Step 1

**Data Captured:**
- Number of products
- Product categories
- Photography needs
- Store features (array of booleans)
- Payment gateways
- Currencies
- Shipping rules

---

### Step 6: Features & Integrations
**Screen:** `WIZARD_06_FEATURES_INTEGRATIONS`

**Purpose:** Select additional website features and third-party integrations

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Wizard Header - Step 6 of 7]              │
├─────────────────────────────────────────────┤
│                                             │
│   Choose features & integrations           │
│                                             │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│   │Contact│Newsletter│Booking│ CRM   │     │
│   │Forms │ │        │Calendar│       │     │
│   │[icon]│ │ [icon] │ [icon] │[icon] │    │
│   └──────┘ └──────┘ └──────┘ └──────┘    │
│                                             │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│   │Insta-│ TikTok │ Blog  │Chatbot│      │
│   │gram  │ Feed   │ CMS   │       │       │
│   │[icon]│ [icon] │[icon] │[icon] │      │
│   └──────┘ └──────┘ └──────┘ └──────┘    │
│                                             │
│   ┌──────┐ ┌──────┐ ┌──────┐              │
│   │Analy-│ SEO   │Custom │               │
│   │tics  │ Tools │       │                │
│   │[icon]│ [icon]│[icon] │               │
│   └──────┘ └──────┘ └──────┘              │
│                                             │
│   [Click card → Drawer opens with details] │
│                                             │
│   ┌──────────────────────────────────┐     │
│   │ NEWSLETTER INTEGRATION       [×] │     │
│   │                                  │     │
│   │ Connect email marketing platform │     │
│   │                                  │     │
│   │ Platform:                        │     │
│   │ [○] Mailchimp                   │     │
│   │ [○] Supabase                    │     │
│   │ [○] ConvertKit                  │     │
│   │                                  │     │
│   │ Features:                        │     │
│   │ • Popup forms                    │     │
│   │ • Inline signup                  │     │
│   │ • Welcome automation             │     │
│   └──────────────────────────────────┘     │
│                                             │
│   [← Back]          [Next: Timeline →]     │
└─────────────────────────────────────────────┘
```

**Interactions:**
- Click feature card: Opens drawer
- Drawer: Shows configuration options
- Multi-select: Multiple features can be selected
- Each feature has its own config panel

**Data Captured:**
- Selected features (array)
- Per feature: specific configuration options

---

### Step 7: Timeline & Budget
**Screen:** `WIZARD_07_TIMELINE_BUDGET`

**Purpose:** Set project timeline and budget expectations

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Wizard Header - Step 7 of 7]              │
├─────────────────────────────────────────────┤
│                                             │
│   Timeline & Budget                         │
│                                             │
│   TIMELINE                                  │
│   When do you need this completed?         │
│                                             │
│   Quick options:                            │
│   [2 weeks] [1 month] [3 months] [Custom]  │
│                                             │
│   [Calendar picker - if Custom selected]   │
│                                             │
│   PROJECT BUDGET                            │
│   What is your budget range?               │
│                                             │
│   [$5k ────○──────────── $100k+]          │
│                                             │
│   Budget Tier:                              │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│   │Starter│Growth │  Pro  │Enterprise│    │
│   │$5-15k│$15-35k│$35-75k│ $75k+  │      │
│   └──────┘ └──────┘ └──────┘ └──────┘    │
│                                             │
│   Recommended tier: Growth ($15-35k)       │
│   Based on your selections                 │
│                                             │
│   ADDITIONAL NOTES                          │
│   ┌─────────────────────────────────────┐  │
│   │ Any special requirements or         │  │
│   │ timeline constraints?               │  │
│   │                                     │  │
│   └─────────────────────────────────────┘  │
│                                             │
│   [← Back]           [Next: Summary →]     │
└─────────────────────────────────────────────┘
```

**Interactions:**
- Quick timeline chips: Single select
- Calendar: Opens on "Custom"
- Budget slider: Updates tier recommendation
- Tier cards: Manual override of slider

**Data Captured:**
- Timeline (quick option or custom date)
- Budget amount (number)
- Budget tier
- Additional notes

---

### Step 8: Summary & AI Brief
**Screen:** `WIZARD_SUMMARY_FINAL_BRIEF`

**Purpose:** Review all inputs and generate comprehensive project brief

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Wizard Header - Summary]                   │
├─────────────────────────────────────────────┤
│ LEFT PANEL              │ RIGHT PANEL        │
│                         │                    │
│ YOUR PROJECT SUMMARY    │ AI-GENERATED BRIEF │
│                         │                    │
│ [Card] Website Type     │ ┌──────────────┐   │
│   E-Commerce Store      │ │ PROJECT BRIEF│   │
│                         │ └──────────────┘   │
│ [Card] Goals            │                    │
│   • Increase sales      │ PROJECT OVERVIEW   │
│   • Build brand         │ [Auto-populated    │
│                         │  content based on  │
│ [Card] Branding         │  all wizard steps] │
│   Minimalist style      │                    │
│   3 colors selected     │ GOALS & AUDIENCE   │
│                         │ [Content...]       │
│ [Card] Pages (8)        │                    │
│   Home, Shop, About...  │ BRAND DIRECTION    │
│                         │ [Content...]       │
│ [Card] Content Status   │                    │
│   ✓ Uploaded            │ PAGES & STRUCTURE  │
│   ⚠ Missing hero images │ [Content...]       │
│                         │                    │
│ [Card] E-Commerce       │ E-COMMERCE NOTES   │
│   50 products           │ [Content...]       │
│   Stripe + PayPal       │                    │
│                         │ FEATURES           │
│ [Card] Features (6)     │ [Content...]       │
│   Newsletter, Blog...   │                    │
│                         │ ESTIMATED SCOPE    │
│ [Card] Timeline         │ Timeline: 8-10 wks │
│   1 month               │ Budget: $25-30k    │
│                         │ Team: 3-4 people   │
│ [Card] Budget           │                    │
│   $25,000               │                    │
│                         │ [Export PDF]       │
│ [← Edit] [Save Draft]   │ [Export Notion]    │
│                         │ [Start Design]     │
└─────────────────────────┴────────────────────┘
```

**Interactions:**
- Summary cards: Click to edit that step
- AI brief: Auto-generates on load
- Export buttons: Download/share brief
- Start Design: Proceeds to contract/payment

**Data Displayed:**
- All captured data organized in cards
- AI-generated comprehensive brief
- Project scope estimation
- Next steps

---

## Components

### WizardHeader
**Purpose:** Consistent header across all wizard steps

**Props:**
```typescript
interface WizardHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  onBack: () => void;
  onSaveDraft: () => void;
  canGoBack: boolean;
}
```

**Design:**
```
┌─────────────────────────────────────────────┐
│ [← Back]  Step X of 7      [Save Draft]    │
│ ■■■■■□□□□□□□□□ 50%                         │
└─────────────────────────────────────────────┘
```

**Features:**
- Progress bar animation
- Conditional back button
- Save draft with cloud icon
- Step counter

---

### PrimaryButton
**Design:**
```tsx
<button className="bg-black text-white px-8 py-4 rounded-xl hover:scale-105 transition-all">
  Next: Branding →
</button>
```

---

### SecondaryButton
**Design:**
```tsx
<button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-900 transition-all">
  ← Back
</button>
```

---

### IconCard
**Purpose:** Selectable card with image, icon, and text

**Design:**
```
┌──────────────┐
│   [Image]    │
│              │
│   [Icon]     │
│   Title      │
│   Subtitle   │
└──────────────┘
```

**States:**
- Default: Gray border, white bg
- Hover: Shadow increase, slight scale
- Selected: Black border, checkmark badge

---

### UploadBox
**Purpose:** Drag & drop file upload

**Design:**
```
┌─────────────────────────┐
│    [Upload Icon]        │
│                         │
│  Drag & drop files here │
│  or click to browse     │
│                         │
│  Supported: JPG, PNG... │
└─────────────────────────┘
```

**States:**
- Default: Dashed border
- Hover: Solid border, bg change
- Drag over: Blue border, highlight
- Uploaded: Show preview + delete button

---

### Toggle
**Purpose:** Boolean on/off switch

**Design:**
```
[Off]  ○──────  [On]  ──────○
```

---

### Checkbox
**Design:**
```
[ ] Unchecked
[✓] Checked
```

---

### Dropdown
**Design:**
```
┌──────────────────────┐
│ Select option... ▼   │
└──────────────────────┘
```

---

### DrawerPanel
**Purpose:** Slide-in panel from right

**Design:**
```
[Parent content]  ┌──────────────┐
                  │ Drawer Panel │
                  │ [Close ×]    │
                  │              │
                  │ Content here │
                  │              │
                  └──────────────┘
```

**Animation:** Slides from right (300ms ease-out)

---

### ChipSelect
**Purpose:** Multi-select chips

**Design:**
```
[Increase Sales] [Build Brand] [+ Add Goal]
  ✓ Selected       Not selected
```

---

## State Management

### Initial State
```typescript
const [state, setState] = useState<WebsiteWizardState>({
  websiteType: null,
  goals: [],
  audience: "",
  results: "",
  logo: null,
  brandGuidelines: null,
  colorPalette: [],
  fonts: [],
  visualStyle: null,
  inspirationImages: [],
  brandWords: "",
  emotions: "",
  pages: [],
  textContent: "",
  contentFiles: [],
  productImages: [],
  moodboardImages: [],
  aiCopywriting: false,
  numProducts: 0,
  productCategories: [],
  needPhotography: false,
  variants: false,
  inventoryTracking: false,
  discountCodes: false,
  customerLogin: false,
  wishlist: false,
  subscriptions: false,
  digitalProducts: false,
  paymentGateways: [],
  currencies: [],
  shippingRules: "",
  features: [],
  timeline: "",
  customDate: null,
  budget: 15000,
  budgetTier: null,
  finalNotes: ""
});

const [currentStep, setCurrentStep] = useState<number>(1);
const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
const [selectedPageDetail, setSelectedPageDetail] = useState<PageConfig | null>(null);
const [selectedFeatureDetail, setSelectedFeatureDetail] = useState<any>(null);
const [aiBriefLoading, setAiBriefLoading] = useState<boolean>(false);
const [generatedBrief, setGeneratedBrief] = useState<string>("");
```

### State Updates
```typescript
// Update single field
setState(prev => ({ ...prev, websiteType: 'ecommerce' }));

// Update array (toggle)
setState(prev => ({
  ...prev,
  goals: prev.goals.includes(goal)
    ? prev.goals.filter(g => g !== goal)
    : [...prev.goals, goal]
}));

// Update page config
setState(prev => ({
  ...prev,
  pages: prev.pages.map(p =>
    p.id === pageId ? { ...p, selected: !p.selected } : p
  )
}));
```

---

## Conditional Logic

### E-Commerce Screen Display
```typescript
const shouldShowEcommerce = state.websiteType === 'ecommerce';

// In step navigation
const getNextStep = (current: number) => {
  if (current === 4 && !shouldShowEcommerce) {
    return 6; // Skip step 5
  }
  return current + 1;
};

const getPrevStep = (current: number) => {
  if (current === 6 && !shouldShowEcommerce) {
    return 4; // Skip step 5
  }
  return current - 1;
};
```

### Budget Tier Recommendation
```typescript
const getRecommendedTier = (state: WebsiteWizardState) => {
  let score = 0;
  
  // E-commerce adds complexity
  if (state.websiteType === 'ecommerce') score += 2;
  
  // Number of pages
  score += state.pages.filter(p => p.selected).length * 0.5;
  
  // Features
  score += state.features.length * 0.5;
  
  // E-commerce features
  if (state.variants) score += 1;
  if (state.subscriptions) score += 2;
  
  // Determine tier
  if (score <= 5) return 'starter';
  if (score <= 10) return 'growth';
  if (score <= 15) return 'pro';
  return 'enterprise';
};
```

### Form Validation
```typescript
const canProceed = (step: number) => {
  switch (step) {
    case 1:
      return state.websiteType !== null;
    case 2:
      return state.visualStyle !== null;
    case 3:
      return state.pages.some(p => p.selected);
    case 4:
      return true; // Optional content
    case 5:
      return !shouldShowEcommerce || state.numProducts > 0;
    case 6:
      return true; // Optional features
    case 7:
      return state.timeline !== "" && state.budget > 0;
    default:
      return true;
  }
};
```

---

## Image Specifications

### Step 1: Website Type Cards
| Type | Image Description | Size |
|------|------------------|------|
| Portfolio | Clean studio portfolio design, grid layout | 400×500px |
| E-Commerce | Product grid, Shopify-style interface | 400×500px |
| Landing | Minimal hero section with CTA | 400×500px |
| Creator | Personal brand bio page with profile | 400×500px |

**Search terms:**
- "minimalist portfolio website"
- "ecommerce product grid"
- "landing page design"
- "creator bio template"

---

### Step 2: Visual Style Cards
| Style | Image Description | Size |
|-------|------------------|------|
| Minimalist | White space, clean typography, neutral | 300×400px |
| Luxury | Dark backgrounds, gold accents, serif fonts | 300×400px |
| Bold | Bright colors, large type, energetic | 300×400px |
| Dark | Dark mode, high contrast, modern | 300×400px |

**Search terms:**
- "minimalist website design"
- "luxury editorial layout"
- "bold colorful interface"
- "dark mode website"

---

### Step 3: Page Type Icons
Use Lucide React icons (24px):
- Home: `Home`
- About: `User`
- Shop: `ShoppingBag`
- Blog: `FileText`
- Portfolio: `Grid`
- Services: `Briefcase`
- Testimonials: `Star`
- Lookbook: `Image`
- Contact: `Mail`
- Campaign: `Megaphone`

---

### Step 4: Upload Placeholders
| Element | Image | Size |
|---------|-------|------|
| Content area | Document icon | - |
| Image upload | Camera/Image icon | - |
| Product photos | Product grid preview | 800×600px |
| Moodboard | 3×3 grid layout | 900×900px |

---

### Step 5: E-Commerce Visuals
| Element | Image Description | Size |
|---------|------------------|------|
| Product setup | E-commerce grid mockup | 600×400px |
| Store features | Feature icons grid | - |
| Payment gateways | Stripe/PayPal logos | 120×60px |

---

### Step 6: Integration Icons
Use Lucide React + brand icons:
- Contact: `Mail`
- Newsletter: `Send`
- Booking: `Calendar`
- CRM: `Users`
- Instagram: `Instagram`
- TikTok: Brand icon
- Blog: `FileText`
- Chatbot: `MessageCircle`
- Analytics: `BarChart`
- SEO: `Search`

---

### Step 7: Timeline & Budget
| Element | Image Description | Size |
|---------|------------------|------|
| Calendar | Calendar UI mockup | 400×300px |
| Timeline | Roadmap illustration | 600×200px |
| Budget tiers | Pricing card visuals | 200×300px each |

---

### Step 8: Summary & Brief
| Element | Image Description | Size |
|---------|------------------|------|
| Hero mockup | Laptop + mobile website preview | 1000×600px |
| Summary cards | Icon + text cards | - |
| Generated brief | Document preview | 600×800px |

---

## Interactions & Animations

### Page Transitions
```typescript
<motion.div
  key={currentStep}
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  transition={{ duration: 0.3 }}
>
  {renderStep()}
</motion.div>
```

### Card Hover
```typescript
className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
```

### Card Selection
```typescript
<motion.div
  whileTap={{ scale: 0.98 }}
  className={`${selected ? 'ring-2 ring-black' : ''}`}
>
  {selected && (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute top-4 right-4 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center"
    >
      <Check className="w-5 h-5" />
    </motion.div>
  )}
</motion.div>
```

### Drawer Panel
```typescript
<AnimatePresence>
  {drawerOpen && (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50"
    >
      {drawerContent}
    </motion.div>
  )}
</AnimatePresence>
```

### Progress Bar
```typescript
<motion.div
  className="h-2 bg-black rounded-full"
  initial={{ width: 0 }}
  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
  transition={{ duration: 0.5 }}
/>
```

### Upload Animation
```typescript
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="border-2 border-dashed rounded-xl p-8"
>
  Upload content
</motion.div>
```

### AI Brief Generation
```typescript
const generateBrief = async () => {
  setAiBriefLoading(true);
  
  // Simulate AI generation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const brief = `
  PROJECT OVERVIEW
  ${state.websiteType} website for ${state.audience}
  
  GOALS
  ${state.goals.join(', ')}
  
  ...
  `;
  
  setGeneratedBrief(brief);
  setAiBriefLoading(false);
};
```

---

## Data Flow

### Navigation Flow
```
Step 1 (Type) → Step 2 (Branding) → Step 3 (Pages) → 
Step 4 (Content) → [Step 5 (E-Commerce if applicable)] → 
Step 6 (Features) → Step 7 (Timeline) → Step 8 (Summary)
```

### Conditional Navigation
```typescript
const handleNext = () => {
  if (!canProceed(currentStep)) {
    // Show validation error
    return;
  }
  
  const nextStep = getNextStep(currentStep);
  setCurrentStep(nextStep);
  
  // Auto-generate brief on final step
  if (nextStep === 8) {
    generateBrief();
  }
};
```

### Save Draft
```typescript
const saveDraft = () => {
  const draft = {
    state,
    currentStep,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('website-wizard-draft', JSON.stringify(draft));
  
  // Show success toast
  toast.success('Draft saved!');
};
```

### Export Brief
```typescript
const exportToPDF = () => {
  // Generate PDF from generatedBrief
  const pdf = generatePDFFromHTML(generatedBrief);
  pdf.download(`website-brief-${Date.now()}.pdf`);
};

const exportToNotion = () => {
  // Call Notion API to create page
  createNotionPage({
    title: `Website Brief - ${state.websiteType}`,
    content: generatedBrief
  });
};
```

---

## Testing Scenarios

### Scenario 1: Portfolio Website
1. Select "Business / Portfolio"
2. Choose "Minimalist" style
3. Select: Home, About, Portfolio, Contact
4. Upload logo and sample images
5. Skip e-commerce
6. Add blog and newsletter features
7. Set 1 month timeline, $15k budget
8. Review AI brief

**Expected:** E-commerce step skipped, budget tier = "Growth"

---

### Scenario 2: Full E-Commerce Store
1. Select "E-Commerce Store"
2. Choose "Luxury Editorial" style
3. Select: Home, Shop, Product, About, Contact, Blog
4. Upload product photos
5. Configure: 100 products, variants, Stripe, subscriptions
6. Add: Newsletter, Instagram feed, Analytics
7. Set 3 months timeline, $50k budget
8. Review comprehensive brief

**Expected:** All 8 steps shown, budget tier = "Pro" or "Enterprise"

---

### Scenario 3: Quick Landing Page
1. Select "Landing Page"
2. Choose "Bold & Colorful"
3. Select: Home only
4. Use AI copywriting
5. Skip e-commerce
6. Add: Contact form, Analytics
7. Set 2 weeks timeline, $8k budget
8. Review brief

**Expected:** Simplified brief, budget tier = "Starter"

---

## Future Enhancements

### Version 1.1
- [ ] Mobile responsive design
- [ ] Multi-language support
- [ ] Video upload for brand assets
- [ ] Real-time collaboration
- [ ] Template library
- [ ] Actual AI integration (GPT-4 for briefs)

### Version 1.2
- [ ] Shopify API integration
- [ ] Figma design handoff
- [ ] Client approval workflow
- [ ] Payment integration
- [ ] Project timeline Gantt chart
- [ ] Automated contract generation

---

**End of Documentation**  
**Version:** 1.0  
**Last Updated:** December 9, 2025  
**Status:** ✅ Ready for Implementation
