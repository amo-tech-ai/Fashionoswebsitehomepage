# 04 — Design vs Engineering Ownership Matrix

**Generated:** December 20, 2024  
**Based On:** Marketing, Wizards, and Dashboards Progress Trackers  
**Purpose:** Clear handoff contract between Figma Make and Cursor/Claude

---

## 📋 EXECUTIVE SUMMARY

**Total Items Analyzed:** 74 (32 marketing + 6 wizards + 21 dashboards + 15 features)  
**Figma Make Ownership:** **28 items** (38%)  
**Cursor/Claude Ownership:** **46 items** (62%)

### Quick Stats
- **Pure Design Tasks:** 28 items (empty states, loading states, error states, missing pages)
- **Pure Engineering Tasks:** 38 items (backends, AI, validation, persistence)
- **Shared Tasks:** 8 items (requires both Figma design + Cursor implementation)

---

## 1️⃣ WHAT FIGMA MAKE SHOULD CREATE (DESIGN OWNERSHIP)

### A. MARKETING PAGES — Missing UI Elements

#### Missing Pages (Complete Page Designs)

**1. Press Kit Page**
- **What to design:** Full press kit download page with brand assets, logos, media guidelines
- **Why Figma:** Pure layout + content presentation, no backend logic
- **Outputs:** 
  - Desktop layout (1440px)
  - Mobile layout (375px)
  - Asset cards with download CTAs
  - Organized sections (Logos, Colors, Typography, Media Assets)

**2. Careers Page**
- **What to design:** Job listings page with company culture, benefits, open positions
- **Why Figma:** Marketing/brand page, content-driven
- **Outputs:**
  - Hero section
  - Culture/values section
  - Job cards layout
  - Application flow mockup
  - Empty state ("No open positions")

**3. Legal Pages** (3 pages)
- **What to design:** Privacy Policy, Terms of Service, Cookie Policy
- **Why Figma:** Typography-heavy legal content pages
- **Outputs:**
  - Legal page template (reusable)
  - Table of contents sidebar
  - Section headers
  - Last updated timestamp placement

---

#### UI States (All Marketing Pages)

**4. Contact Form States**
- **What to design:**
  - Empty state (initial)
  - Typing state (active input)
  - Validation error state (inline errors)
  - Submitting state (loading spinner)
  - Success state (confirmation message)
  - Error state (submission failed)
- **Why Figma:** Pure visual feedback, engineering handles logic
- **Outputs:** 6 state variations per form

**5. Newsletter Signup States**
- **What to design:**
  - Default state
  - Loading state (spinner in button)
  - Success state (checkmark + "You're subscribed!")
  - Error state ("Email already subscribed" / "Invalid email")
- **Why Figma:** Micro-interaction design
- **Outputs:** 4 state variations

**6. Services Pages — Empty States**
- **What to design:** 
  - Empty portfolio grid ("No projects yet")
  - Empty testimonials ("Coming soon")
- **Why Figma:** Placeholder design for missing content
- **Outputs:** 2 empty state variations

---

### B. WIZARDS — Missing UI States

#### Wizard Step States (All 6 Wizards)

**7. Loading States**
- **What to design:**
  - Step transition loader (between steps)
  - Data fetching skeleton (loading previous draft)
  - Submission loader (saving to database)
  - AI processing loader (Brand Shoot AI, Designer Wizard)
- **Why Figma:** Animation concepts, skeleton patterns
- **Outputs:** 
  - 4 loading skeleton variations
  - Animation specs (fade/slide timings)

**8. Validation Error States**
- **What to design:**
  - Inline field errors (red border, error text)
  - Form-level error summary (top of step)
  - Required field indicators (* with tooltip)
  - Format error examples (email, URL, phone)
- **Why Figma:** Error messaging UX, visual feedback
- **Outputs:**
  - Error component library
  - Error message copy guidelines
  - Accessibility specs (ARIA labels)

**9. Success Confirmation Screens**
- **What to design:**
  - Wizard completion success screen (all wizards)
  - Draft saved notification (toast)
  - Step completion checkmark animation
- **Why Figma:** Celebration moments, positive reinforcement
- **Outputs:**
  - 6 success screens (one per wizard)
  - Toast notification variants
  - Motion specs for checkmark

**10. Empty Upload States**
- **What to design:**
  - File upload drag-n-drop area (empty)
  - File upload with preview (after upload)
  - Multiple file thumbnails layout
  - Upload progress bars
- **Why Figma:** Upload UI patterns
- **Outputs:**
  - 4 upload state variations
  - File type icons (PDF, JPG, PNG, etc.)

**11. Step Progress Indicators**
- **What to design:**
  - Horizontal step progress (1 of 6)
  - Vertical sidebar progress (Designer Wizard)
  - Mobile progress indicator
  - Completed step checkmarks
- **Why Figma:** Navigation UX, wayfinding
- **Outputs:**
  - 3 progress indicator styles
  - Responsive variations

---

### C. DASHBOARDS — Missing UI States

#### Dashboard Empty States

**12. Empty Dashboard Cards (21 Dashboards)**
- **What to design:**
  - "No events yet" (Events dashboard)
  - "No sponsors added" (Sponsor CRM)
  - "No tasks created" (Tasks dashboard)
  - "No assets uploaded" (Gallery)
  - "No budget items" (Budget Manager)
  - "No contracts" (Contract Analyzer)
  - Generic empty state template (reusable)
- **Why Figma:** First-run experience, onboarding
- **Outputs:**
  - 7 custom empty states
  - 1 reusable template
  - CTA buttons for each ("Create your first...")

**13. Loading Skeletons (All Dashboards)**
- **What to design:**
  - Card loading skeleton (gray pulse)
  - Table loading skeleton
  - List item loading skeleton
  - Chart loading skeleton
  - Header loading skeleton
- **Why Figma:** Perceived performance, loading patterns
- **Outputs:**
  - 5 skeleton component variations
  - Animation timing specs (pulse duration)

**14. Error States (All Dashboards)**
- **What to design:**
  - Failed to load data (with retry button)
  - No internet connection
  - Permission denied (RLS block)
  - Server error (500)
- **Why Figma:** Error recovery UX
- **Outputs:**
  - 4 error state variations
  - Retry button patterns
  - Error message copy guidelines

**15. Search Result States**
- **What to design:**
  - Search results view (Sponsor CRM, Gallery)
  - No results found (empty state)
  - Filtering applied (active filter chips)
  - Clearing filters CTA
- **Why Figma:** Search UX patterns
- **Outputs:**
  - Search results layout
  - Filter chip designs
  - No results empty state

---

### D. DESIGN SYSTEM COMPONENTS

**16. Modal Library**
- **What to design:**
  - Confirmation modal (delete, archive)
  - Input modal (create new task, sponsor)
  - Full-screen modal (wizard-style)
  - Drawer (side panel)
- **Why Figma:** Reusable component library
- **Outputs:**
  - 4 modal templates
  - Motion specs (slide in/out)
  - Backdrop opacity

**17. Toast Notification System**
- **What to design:**
  - Success toast (green checkmark)
  - Error toast (red X)
  - Warning toast (yellow alert)
  - Info toast (blue info icon)
  - Loading toast (spinner)
- **Why Figma:** System-level feedback
- **Outputs:**
  - 5 toast variants
  - Position specs (top-right, bottom-center)
  - Auto-dismiss timing

**18. Form Component Library**
- **What to design:**
  - Text input (all states: default, focus, error, disabled)
  - Textarea
  - Select dropdown
  - Radio buttons
  - Checkboxes
  - File upload
  - Date picker
  - Color picker (Website Wizard)
- **Why Figma:** Reusable form design system
- **Outputs:**
  - 8 form components × 4 states = 32 variants
  - Accessibility specs
  - Focus indicators

---

### E. RESPONSIVE LAYOUTS

**19. Mobile-First Wizard Steps**
- **What to design:**
  - All wizard steps optimized for mobile (320px-768px)
  - Touch-friendly tap targets
  - Mobile navigation patterns
  - Mobile step progress
- **Why Figma:** Mobile UX patterns differ from desktop
- **Outputs:**
  - Mobile layouts for 6 wizards
  - Touch interaction specs

**20. Dashboard Responsive Grids**
- **What to design:**
  - 2-column → 1-column collapse (tablet → mobile)
  - Card stacking patterns
  - Mobile navigation drawer
  - Bottom tab bar (mobile)
- **Why Figma:** Responsive behavior definition
- **Outputs:**
  - Breakpoint specs (320, 768, 1024, 1440)
  - Grid collapse animations

---

### F. MOTION & ANIMATION

**21. Page Transition Animations**
- **What to design:**
  - Wizard step transitions (slide left/right)
  - Modal open/close (fade + scale)
  - Drawer slide-in (from right)
  - Toast slide-in (from top)
- **Why Figma:** Animation choreography
- **Outputs:**
  - Motion specs (easing curves, duration)
  - Storyboards for key transitions

**22. Micro-interactions**
- **What to design:**
  - Button hover states
  - Card hover lift
  - Checkbox checkmark animation
  - Loading spinner variants
  - Progress bar fill animation
- **Why Figma:** Interaction design polish
- **Outputs:**
  - 5 micro-interaction specs
  - Motion tokens (duration, easing)

---

### G. VISUAL DESIGN POLISH

**23. Illustration Library**
- **What to design:**
  - Empty state illustrations (custom)
  - Success confirmation illustrations
  - Error state illustrations
  - Onboarding illustrations
- **Why Figma:** Brand visual language
- **Outputs:**
  - 8-10 custom illustrations
  - Style guide (line weight, color)

**24. Icon System Audit**
- **What to design:**
  - Verify all lucide-react icons are consistent
  - Create custom icons where needed
  - Icon size/weight guidelines
- **Why Figma:** Visual consistency
- **Outputs:**
  - Icon usage guidelines
  - 5-10 custom icons (if needed)

---

### H. DOCUMENTATION & DIAGRAMS

**25. User Flow Diagrams**
- **What to design:**
  - Wizard completion flows (6 diagrams)
  - Dashboard navigation flows
  - Error recovery flows
- **Why Figma:** UX documentation
- **Outputs:**
  - 10 flow diagrams
  - Decision tree visuals

**26. Design System Documentation**
- **What to design:**
  - Component usage examples
  - Do's and don'ts
  - Spacing/typography scales
  - Color palette with contrast ratios
- **Why Figma:** Design system governance
- **Outputs:**
  - Design system spec document
  - Figma component library

---

### I. ADDITIONAL SUGGESTIONS (BEYOND AUDITS)

**27. Onboarding Flow**
- **What to design:**
  - First-time user welcome screen
  - Feature highlights (3-5 slides)
  - Tooltip tour for dashboards
  - Progress checklist ("Get started" tasks)
- **Why Figma:** User education, activation
- **Outputs:**
  - Onboarding flow (5 screens)
  - Tooltip positioning specs

**28. AI Thinking Indicator Variations**
- **What to design:**
  - AI processing states (Brand Shoot, Designer Wizard)
  - Progress messages ("Analyzing brand...", "Generating content...")
  - AI confidence indicators (high/medium/low)
  - AI result preview cards
- **Why Figma:** AI UX patterns
- **Outputs:**
  - 4 AI state variations
  - Message copy library

---

## 2️⃣ WHAT MUST BE HANDED TO CURSOR (ENGINEERING OWNERSHIP)

### A. BACKEND INFRASTRUCTURE (DATABASE)

**29. Supabase Schemas (All Tables)**
- **What needs to be built:**
  - 30+ tables across all features
  - RLS policies for auth
  - Indexes for performance
  - Triggers for timestamps
  - Foreign key relationships
- **Why engineering-only:** Database design, SQL, security
- **Expected inputs from Figma:** None (data modeling)
- **Tables needed:**
  ```
  Marketing: newsletter_subscribers, contact_submissions
  Wizards: campaigns, shoots, website_projects, designer_profiles, events
  Dashboards: tasks, sponsors, assets, budgets, contracts, venues, activations
  Shared: users, organizations, files
  ```

**30. Supabase Storage Buckets**
- **What needs to be built:**
  - File upload buckets (brand-uploads, assets, contracts, logos)
  - Storage policies (who can read/write)
  - File size limits
  - File type validation
- **Why engineering-only:** Storage configuration, security
- **Expected inputs from Figma:** None

**31. Database Migrations**
- **What needs to be built:**
  - Migration files for all schema changes
  - Rollback scripts
  - Seed data for development
- **Why engineering-only:** DevOps, version control
- **Expected inputs from Figma:** None

---

### B. BACKEND INFRASTRUCTURE (API)

**32. Supabase CRUD Operations**
- **What needs to be built:**
  - Insert queries (create)
  - Select queries (read)
  - Update queries (edit)
  - Delete queries (remove)
  - Upsert queries (save or update)
  - Batch operations
- **Why engineering-only:** Backend logic, SQL
- **Expected inputs from Figma:** None (but uses UI to trigger)

**33. Supabase Realtime Subscriptions**
- **What needs to be built:**
  - Subscribe to table changes
  - Update UI reactively
  - Handle connection errors
  - Reconnect logic
- **Why engineering-only:** WebSocket logic, state sync
- **Expected inputs from Figma:** None

**34. Context Implementations**
- **What needs to be built:**
  - EventContext (with Supabase)
  - SponsorContext (with Supabase)
  - BrandShootContext (add Supabase)
  - ProductsContext
  - VenuesContext
  - BudgetContext
- **Why engineering-only:** React context, state management, data fetching
- **Expected inputs from Figma:** None (but UI uses these)

---

### C. AI FEATURES

**35. Brand Shoot AI — Campaign Generator**
- **What needs to be built:**
  - lib/ai/campaignGenerator.ts
  - OpenAI/Gemini API calls
  - Prompt templates
  - Function calling schemas
  - Response parsing
  - Error handling + retries
  - AI runs logging table
- **Why engineering-only:** AI integration, API calls, prompt engineering
- **Expected inputs from Figma:** AI loading state design (already exists)

**36. Designer Wizard AI — Brand Analyzer**
- **What needs to be built:**
  - lib/ai/brandAnalyzer.ts
  - Instagram API/scraper
  - Website scraping (Cheerio/Puppeteer)
  - Brand scoring algorithm
  - AI analysis prompts
- **Why engineering-only:** Web scraping, AI, data analysis
- **Expected inputs from Figma:** Analysis results UI (partial design exists)

**37. Command Center AI — Executive Insights**
- **What needs to be built:**
  - lib/ai/AgentContext.tsx implementation
  - AI analysis of event/task/sponsor data
  - Critical blocker detection
  - Recommendation engine
- **Why engineering-only:** AI logic, data analysis
- **Expected inputs from Figma:** AI thinking indicator (exists)

**38. Contract Analyzer AI**
- **What needs to be built:**
  - AI contract parsing
  - Risk detection
  - Key term extraction
  - Compliance checking
- **Why engineering-only:** AI + document processing
- **Expected inputs from Figma:** Contract analyzer UI (exists)

**39. Casting Matchmaker AI**
- **What needs to be built:**
  - AI-powered casting suggestions
  - Model matching algorithm
  - Availability checking
- **Why engineering-only:** AI recommendation engine
- **Expected inputs from Figma:** Matchmaker UI (not inspected)

**40. Website Wizard AI — Copywriting**
- **What needs to be built:**
  - lib/ai/copywriter.ts
  - Page content generation
  - SEO optimization
  - Tone matching
- **Why engineering-only:** AI text generation
- **Expected inputs from Figma:** Copywriting toggle UI (exists)

---

### D. FORM HANDLING & VALIDATION

**41. Form Validation (Zod Schemas)**
- **What needs to be built:**
  - Zod schemas for all wizards (6 schemas)
  - Zod schemas for all dashboards (10+ schemas)
  - Email validation
  - URL validation
  - Phone number validation
  - File type/size validation
  - Custom business rules
- **Why engineering-only:** Data validation logic
- **Expected inputs from Figma:** Error message text, error state designs (from #8)

**42. Form Submission Handlers**
- **What needs to be built:**
  - Contact form → Email service (Resend/SendGrid)
  - Newsletter → Supabase + email confirmation
  - Wizard forms → Supabase insert
  - Dashboard forms → Supabase upsert
  - File uploads → Supabase Storage
- **Why engineering-only:** Backend integration
- **Expected inputs from Figma:** Success/error states (from #4, #8, #14)

**43. Draft Save Functionality**
- **What needs to be built:**
  - Auto-save wizard progress every 30s
  - LocalStorage backup (if offline)
  - Restore draft on return
  - Clear draft on completion
- **Why engineering-only:** State persistence, timing logic
- **Expected inputs from Figma:** Draft saved toast (from #17)

---

### E. FILE UPLOADS

**44. File Upload Implementation**
- **What needs to be built:**
  - File upload component wiring
  - Supabase Storage integration
  - Progress tracking
  - Thumbnail generation
  - File metadata storage
  - Upload error handling
- **Why engineering-only:** File handling, storage API
- **Expected inputs from Figma:** Upload UI states (from #10)

**45. Image Processing**
- **What needs to be built:**
  - Image optimization (resize, compress)
  - Thumbnail generation
  - Format conversion (HEIC → JPG)
  - EXIF data extraction
- **Why engineering-only:** Image processing libraries
- **Expected inputs from Figma:** None

---

### F. INTEGRATIONS

**46. Payment Integration (Stripe)**
- **What needs to be built:**
  - Stripe Elements integration
  - Payment intent creation
  - Webhook handlers
  - Receipt generation
  - Subscription management
- **Why engineering-only:** Payment processing, security
- **Expected inputs from Figma:** Payment form design (missing, needs Figma)

**47. Email Service Integration**
- **What needs to be built:**
  - Resend/SendGrid API setup
  - Email templates (transactional)
  - Contact form → email
  - Newsletter → email
  - Notification emails
- **Why engineering-only:** Email API integration
- **Expected inputs from Figma:** Email template designs (missing, needs Figma)

**48. Analytics Tracking**
- **What needs to be built:**
  - PostHog/Mixpanel integration
  - Event tracking (page views, clicks, conversions)
  - User journey tracking
  - Dashboard analytics queries
- **Why engineering-only:** Analytics API, data collection
- **Expected inputs from Figma:** None

**49. SEO Component**
- **What needs to be built:**
  - React Helmet/Next SEO component
  - Meta tags per page
  - OpenGraph images
  - Sitemap generation
  - Robots.txt
- **Why engineering-only:** SEO implementation
- **Expected inputs from Figma:** None (uses page content)

**50. PDF Generation**
- **What needs to be built:**
  - jsPDF or server-side PDF generation
  - Contract PDFs
  - Proposal PDFs
  - Call sheet PDFs
- **Why engineering-only:** PDF libraries, server rendering
- **Expected inputs from Figma:** PDF layout designs (missing, needs Figma)

---

### G. SEARCH & FILTERING

**51. Search Implementation**
- **What needs to be built:**
  - Search input → filter results
  - Debounced search (300ms)
  - Server-side search (for large datasets)
  - Search highlighting
- **Why engineering-only:** Search logic, performance optimization
- **Expected inputs from Figma:** Search result states (from #15)

**52. Filtering Logic**
- **What needs to be built:**
  - Filter state management
  - Multiple filter combination (AND/OR)
  - Clear all filters
  - Filter persistence (URL params)
- **Why engineering-only:** Filter logic
- **Expected inputs from Figma:** Filter UI (from #15)

**53. Sorting Logic**
- **What needs to be built:**
  - Sort by column (asc/desc)
  - Multi-column sorting
  - Persistent sort state
- **Why engineering-only:** Sort algorithms
- **Expected inputs from Figma:** Sort indicator icons

---

### H. DASHBOARD-SPECIFIC LOGIC

**54. Command Center — Data Aggregation**
- **What needs to be built:**
  - Calculate health score (94%)
  - Aggregate phase progress
  - Detect critical blockers (AI + rules)
  - Real-time updates
- **Why engineering-only:** Business logic, calculations
- **Expected inputs from Figma:** Health score visual (exists)

**55. Project Overview — Pulse Feed**
- **What needs to be built:**
  - Real-time activity feed (Supabase Realtime)
  - Event aggregation (samples received, contracts signed)
  - Feed filtering
  - Mark as read
- **Why engineering-only:** Real-time data stream
- **Expected inputs from Figma:** Pulse feed design (exists but needs real data)

**56. Tasks Dashboard — CRUD Operations**
- **What needs to be built:**
  - Create task modal (backend)
  - Update task (status, assignee, due date)
  - Delete task (with confirmation)
  - Task filtering (by phase, assignee, status)
- **Why engineering-only:** CRUD logic, validation
- **Expected inputs from Figma:** Task modal design (missing, needs Figma)

**57. Sponsor CRM — Pipeline Logic**
- **What needs to be built:**
  - Drag-n-drop stage updates (Supabase)
  - Pipeline value calculations
  - Deal win/loss tracking
  - Sponsor scoring algorithm
- **Why engineering-only:** CRM logic, calculations
- **Expected inputs from Figma:** Pipeline drag UI (exists)

**58. Gallery Dashboard — Asset Management**
- **What needs to be built:**
  - Asset upload → Supabase Storage
  - Status updates (approve/reject) → Database
  - Bulk operations (select multiple)
  - Asset metadata (dimensions, size, camera)
- **Why engineering-only:** Asset management logic
- **Expected inputs from Figma:** Gallery UI (exists)

**59. Budget Manager — Financial Calculations**
- **What needs to be built:**
  - Budget vs actual tracking
  - Transaction categorization
  - Budget alerts (over budget)
  - Financial reports
- **Why engineering-only:** Financial logic
- **Expected inputs from Figma:** Budget UI (not inspected, may need design)

**60. ROI Analytics — Metrics Calculations**
- **What needs to be built:**
  - ROI formula implementation
  - Campaign performance tracking
  - Attribution modeling
  - Chart data aggregation
- **Why engineering-only:** Analytics calculations
- **Expected inputs from Figma:** Analytics UI (not inspected, may need design)

---

### I. AUTH & SECURITY

**61. Authentication (Supabase Auth)**
- **What needs to be built:**
  - Sign up flow
  - Sign in flow
  - Password reset
  - Email verification
  - Social auth (Google, etc.)
- **Why engineering-only:** Auth logic, security
- **Expected inputs from Figma:** Auth page designs (missing, needs Figma)

**62. Row Level Security (RLS)**
- **What needs to be built:**
  - RLS policies for all tables
  - User can only see their data
  - Org-level access control
  - Role-based permissions
- **Why engineering-only:** Database security
- **Expected inputs from Figma:** None

**63. Authorization Checks**
- **What needs to be built:**
  - Can user create event?
  - Can user edit sponsor?
  - Can user delete task?
  - Permission denied handling
- **Why engineering-only:** Authorization logic
- **Expected inputs from Figma:** Permission denied error state (from #14)

---

### J. ERROR HANDLING & MONITORING

**64. Error Boundaries**
- **What needs to be built:**
  - React error boundaries per section
  - Fallback UI on crash
  - Error logging to Sentry
- **Why engineering-only:** Error handling infrastructure
- **Expected inputs from Figma:** Fallback error UI (from #14)

**65. Loading States Management**
- **What needs to be built:**
  - Global loading state
  - Per-component loading state
  - Skeleton rendering logic
  - Loading timeouts
- **Why engineering-only:** State management
- **Expected inputs from Figma:** Loading skeletons (from #13)

**66. Toast Notification Logic**
- **What needs to be built:**
  - Toast state management (Sonner)
  - Auto-dismiss timers
  - Toast queue management
  - Persistent toasts (for critical errors)
- **Why engineering-only:** Notification logic
- **Expected inputs from Figma:** Toast designs (from #17)

---

### K. PERFORMANCE & OPTIMIZATION

**67. Code Splitting**
- **What needs to be built:**
  - Lazy load routes
  - Dynamic imports for large components
  - Bundle size optimization
- **Why engineering-only:** Build optimization
- **Expected inputs from Figma:** None

**68. Image Optimization**
- **What needs to be built:**
  - Next.js Image component (or equivalent)
  - Lazy loading images
  - Responsive images (srcset)
  - WebP conversion
- **Why engineering-only:** Performance optimization
- **Expected inputs from Figma:** None

**69. Database Query Optimization**
- **What needs to be built:**
  - Index creation
  - Query performance analysis
  - Pagination implementation
  - Caching strategy
- **Why engineering-only:** Database performance
- **Expected inputs from Figma:** None

---

### L. TESTING

**70. Unit Tests**
- **What needs to be built:**
  - Context tests (EventContext, SponsorContext)
  - Utility function tests
  - Validation schema tests
- **Why engineering-only:** Code testing
- **Expected inputs from Figma:** None

**71. Integration Tests**
- **What needs to be built:**
  - Wizard completion tests
  - Dashboard CRUD tests
  - Form submission tests
- **Why engineering-only:** E2E testing
- **Expected inputs from Figma:** None

**72. E2E Tests**
- **What needs to be built:**
  - Playwright/Cypress tests
  - Happy path tests (6 wizards)
  - Critical user journeys
- **Why engineering-only:** Automated testing
- **Expected inputs from Figma:** None

---

### M. DEVOPS & DEPLOYMENT

**73. Environment Variables**
- **What needs to be built:**
  - .env configuration
  - Supabase keys
  - OpenAI/Gemini keys
  - Stripe keys
  - Email service keys
- **Why engineering-only:** Configuration management
- **Expected inputs from Figma:** None

**74. CI/CD Pipeline**
- **What needs to be built:**
  - GitHub Actions
  - Automated testing
  - Preview deployments
  - Production deployment
- **Why engineering-only:** DevOps
- **Expected inputs from Figma:** None

---

## 3️⃣ SHARED HANDOFF BOUNDARIES (FIGMA → CURSOR)

### Handoff Contract Table

| Feature | Figma Delivers | Cursor Implements | Handoff Method |
|---------|---------------|------------------|----------------|
| **WIZARDS** |
| Wizard Steps | • Layout per step<br>• Field designs<br>• Error state visuals<br>• Success screen<br>• Progress indicator | • Form validation (Zod)<br>• Step navigation logic<br>• Data persistence (Supabase)<br>• Draft save<br>• onComplete handler | Figma exports components → Cursor wires logic |
| File Upload | • Upload area design<br>• Progress bar UI<br>• Thumbnail layout<br>• Empty state | • File upload handler<br>• Supabase Storage integration<br>• File validation<br>• Progress tracking | Figma designs states → Cursor implements upload |
| AI Features | • AI thinking indicator<br>• AI result cards<br>• Confidence scores UI<br>• Loading messages | • AI API calls (OpenAI/Gemini)<br>• Prompt templates<br>• Response parsing<br>• Error handling | Figma designs AI UX → Cursor builds AI backend |
| **DASHBOARDS** |
| Dashboard Cards | • Card layout<br>• Empty state<br>• Loading skeleton<br>• Error state | • Data queries (Supabase)<br>• Real-time updates<br>• State management<br>• Refresh logic | Figma designs card → Cursor fetches data |
| Tables/Lists | • Table layout<br>• Row design<br>• Sort indicators<br>• Filter chips | • Sort logic<br>• Filter logic<br>• Pagination<br>• Search implementation | Figma designs table → Cursor adds interactivity |
| Modals | • Modal layout<br>• Form fields<br>• Button placement<br>• Animation specs | • Modal state management<br>• Form submission<br>• Validation<br>• Close handling | Figma designs modal → Cursor wires to backend |
| Charts/Graphs | • Chart style<br>• Color palette<br>• Legend placement<br>• Tooltip design | • Data aggregation<br>• Chart library config (Recharts)<br>• Real-time updates<br>• Export functionality | Figma designs chart → Cursor populates with data |
| **FORMS** |
| Form Inputs | • Input design (all states)<br>• Label placement<br>• Error message placement<br>• Help text | • Form state (React Hook Form)<br>• Validation (Zod)<br>• Submission handler<br>• Error logic | Figma designs form → Cursor adds validation |
| Multi-step Forms | • Step layout<br>• Navigation buttons<br>• Progress indicator<br>• Review screen | • Step state management<br>• Data persistence per step<br>• Back/Next logic<br>• Final submission | Figma designs flow → Cursor implements state |
| **MARKETING PAGES** |
| Contact Forms | • Form layout<br>• Success message<br>• Error message<br>• Loading state | • Form submission → Email<br>• Supabase logging<br>• Email service (Resend)<br>• Rate limiting | Figma designs form → Cursor wires to email |
| Newsletter Signup | • Input + button design<br>• Success toast<br>• Error message | • Email validation<br>• Supabase insert<br>• Email confirmation<br>• Duplicate check | Figma designs signup → Cursor adds backend |
| **STATES** |
| Empty States | • Illustration<br>• Message text<br>• CTA button design | • Conditional rendering<br>• Data check (if empty)<br>• CTA click handler | Figma designs empty state → Cursor shows when needed |
| Loading States | • Skeleton design<br>• Spinner placement<br>• Animation timing | • Loading state management<br>• Data fetching<br>• Timeout handling | Figma designs skeleton → Cursor shows during load |
| Error States | • Error message design<br>• Retry button<br>• Icon choice | • Error catching<br>• Retry logic<br>• Error logging<br>• Toast notifications | Figma designs error → Cursor handles errors |

---

### Responsibility Matrix

| Task Type | Figma Make | Cursor/Claude | Notes |
|-----------|-----------|---------------|-------|
| **Layout & Spacing** | ✅ Owns | Uses | Figma defines grid, spacing tokens |
| **Typography** | ✅ Owns | Uses | Figma defines font scales, weights |
| **Color Palette** | ✅ Owns | Uses | Figma defines tokens, Cursor applies |
| **Component States** | ✅ Owns | Uses | Figma designs all states (hover, focus, error) |
| **Animations** | ✅ Owns (specs) | ✅ Implements | Figma defines timing/easing, Cursor codes |
| **Icons** | ✅ Owns | Uses | Figma verifies/creates icons, Cursor imports |
| **Empty States** | ✅ Owns | Uses | Figma designs, Cursor conditionally renders |
| **Loading States** | ✅ Owns | Uses | Figma designs skeletons, Cursor shows during load |
| **Error States** | ✅ Owns | Uses | Figma designs UI, Cursor catches errors |
| **Form Validation** | Message text only | ✅ Owns | Figma writes error copy, Cursor implements Zod |
| **Data Fetching** | — | ✅ Owns | Pure engineering |
| **Database Schema** | — | ✅ Owns | Pure engineering |
| **API Integration** | — | ✅ Owns | Pure engineering |
| **Authentication** | Login UI design | ✅ Owns | Figma designs auth pages, Cursor implements |
| **Authorization** | Permission denied UI | ✅ Owns | Figma designs error, Cursor enforces rules |
| **AI Features** | AI UX design | ✅ Owns | Figma designs AI interactions, Cursor codes AI |
| **File Uploads** | Upload UI design | ✅ Owns | Figma designs upload UX, Cursor handles files |
| **Search/Filter** | UI design | ✅ Owns | Figma designs search UI, Cursor implements logic |
| **Real-time Updates** | — | ✅ Owns | Pure engineering (Supabase Realtime) |
| **PDF Generation** | PDF layout design | ✅ Owns | Figma designs PDF, Cursor generates |
| **Email Templates** | Email design | ✅ Owns | Figma designs emails, Cursor sends |
| **Analytics** | — | ✅ Owns | Pure engineering (PostHog) |
| **Testing** | — | ✅ Owns | Pure engineering |
| **Deployment** | — | ✅ Owns | Pure engineering |

---

### Handoff Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    FIGMA MAKE PHASE                         │
├────────────────────────────────��────────────────────────────┤
│ 1. Design missing pages (Press Kit, Careers, Legal)        │
│ 2. Design all UI states (empty, loading, error, success)   │
│ 3. Design form components (inputs, validation states)      │
│ 4. Design modals, toasts, drawers                          │
│ 5. Design responsive layouts                               │
│ 6. Define motion specs (animations, transitions)           │
│ 7. Create illustrations (empty states, success)            │
│ 8. Document design system (components, tokens)             │
│                                                             │
│ OUTPUTS:                                                    │
│ • Figma component library                                  │
│ • Design specs PDF                                         │
│ • Motion/animation specs                                   │
│ • Copy guidelines (error messages, empty states)           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    HANDOFF TO CURSOR                        │
├─────────────────────────────────────────────────────────────┤
│ 1. Cursor receives:                                         │
│    • Component designs (all states)                         │
│    • Motion specs                                           │
│    • Copy text                                              │
│                                                             │
│ 2. Cursor implements:                                       │
│    • Database schemas (Supabase)                            │
│    • CRUD operations                                        │
│    • Form validation (Zod)                                  │
│    • AI integrations (OpenAI/Gemini)                        │
│    • File uploads (Supabase Storage)                        │
│    • Search/filter logic                                    │
│    • Real-time updates                                      │
│    • Authentication/authorization                           │
│    • Error handling                                         │
│    • Testing                                                │
│                                                             │
│ 3. Cursor applies Figma designs:                            │
│    • Uses component library                                 │
│    • Applies motion specs                                   │
│    • Uses copy text                                         │
│    • Conditionally renders states (empty, loading, error)   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    VERIFICATION PHASE                       │
├─────────────────────────────────────────────────────────────┤
│ 1. Design QA:                                               │
│    • Visual match to Figma                                  │
│    • Responsive behavior                                    │
│    • Animation timing                                       │
│                                                             │
│ 2. Engineering QA:                                          │
│    • Backend works (CRUD)                                   │
│    • Validation works                                       │
│    • AI features work                                       │
│    • Tests pass                                             │
│                                                             │
│ 3. Production deploy                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 PRIORITY EXECUTION PLAN

### Week 1: Figma Make Focus
**Figma creates:**
1. All empty states (dashboards + wizards) — #12
2. All loading skeletons — #13
3. All error states — #14
4. Form validation error states — #8
5. Success confirmation screens — #9

**Cursor starts in parallel:**
1. Inspect all context files
2. Create database schemas
3. Set up Supabase

---

### Week 2: Figma Finishes, Cursor Ramps Up
**Figma creates:**
6. File upload states — #10
7. Modal library — #16
8. Toast system — #17
9. Missing marketing pages — #1, #2, #3

**Cursor implements:**
4. EventContext with Supabase
5. SponsorContext with Supabase
6. BrandShootContext with Supabase
7. Form validation (Zod)

---

### Week 3-4: Cursor Heavy Lifting
**Cursor implements:**
8. AI features (Brand Shoot, Designer, Command Center)
9. File upload handlers
10. Search/filter logic
11. Real-time updates
12. Dashboard CRUD operations

**Figma supports:**
- Design tweaks based on engineering feedback
- Additional states as needed

---

### Week 5-6: Integration & Polish
**Cursor:**
- Integrate all backend with frontend
- Testing (unit, integration, E2E)
- Performance optimization

**Figma:**
- Final polish (micro-interactions, illustrations)
- Design system documentation
- Responsive refinements

---

## ✅ SUCCESS CRITERIA

### Figma Make Deliverables Checklist
- [ ] 28 design tasks completed
- [ ] All UI states designed (empty, loading, error, success)
- [ ] Component library documented
- [ ] Motion specs defined
- [ ] Copy guidelines written
- [ ] Responsive layouts defined
- [ ] Handoff package delivered to Cursor

### Cursor/Claude Deliverables Checklist
- [ ] 46 engineering tasks completed
- [ ] All Supabase schemas created
- [ ] All CRUD operations working
- [ ] All AI features functional
- [ ] All forms validated
- [ ] All contexts implemented
- [ ] All tests passing
- [ ] Production deployed

---

## 🚀 FINAL RECOMMENDATION

**Start Immediately:**
1. **Figma Make:** Begin with #12 (empty states) — highest impact, low effort
2. **Cursor:** Begin with #29 (Supabase schemas) — unblocks everything else

**First Handoff (Week 2):**
- Figma delivers: Empty states, loading states, error states
- Cursor applies: To dashboards and wizards as backend comes online

**Ship First Feature (Week 4):**
- **Command Center Dashboard** (fully functional with real data)
- Demonstrates Figma → Cursor workflow works

**Full Production (Week 6-8):**
- All 74 items complete
- All 32 marketing pages production-ready
- All 6 wizards functional
- All 21 dashboards with real data

---

**END OF DESIGN VS ENGINEERING OWNERSHIP MATRIX**

*This document should eliminate all confusion about who owns what. Figma Make focuses on visual design, Cursor handles all engineering. Clear handoff points ensure no overlap or rework.*
