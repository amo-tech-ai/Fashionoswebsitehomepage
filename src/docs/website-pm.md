# Website Project Management (Website PM) Implementation Plan

## Project Overview
The Website Project Management module transforms the initial "Website Wizard" brief into a fully interactive project dashboard. This allows users to manage content, view site structure, organize media, and prepare for design handoff in a "luxury-tech" environment.

## 🌟 Success Criteria
- **Cohesive UX:** Seamless transition from Wizard to Dashboard.
- **Visual Hierarchy:** Clear progress tracking and actionable steps.
- **Completeness:** Users can manage all aspects of the brief (Branding, Content, Store, Features).
- **Responsiveness:** Fully functional on Desktop and Tablet (Mobile optimized).
- **Aesthetic:** Matches the "FashionOS" premium minimalist design system.

## 📋 Production Ready Checklist
- [ ] **State Management:** Ensure `WebsiteWizardState` flows correctly to all sub-views.
- [ ] **Error Handling:** Graceful empty states for lists/media.
- [ ] **Performance:** Lazy load heavy components (like Media Library).
- [ ] **Accessibility:** Proper ARIA labels for tabs and interactive elements.
- [ ] **Responsive Design:** Verify layout on < 768px viewports.

---

## 🏗 Architecture & Components

We will transition `WebsiteBriefDashboard.tsx` from a single view into a **Tabbed Interface** hosting multiple specialized components.

**Directory:** `/components/website-pm/`

### 1. Main Container
- **Component:** `WebsiteProjectDashboard.tsx` (formerly `WebsiteBriefDashboard`)
- **Responsibility:** Holds global state, renders navigation tabs, handles "Download/Share" global actions.
- **Features:**
  - Top Progress Tracker (Persistent)
  - Tab Navigation: Overview | Checklist | Sitemap | Media | Deliverables | Handoff

### 2. Views (Sub-components)

#### A. Overview (Step 1 & 2)
- **Component:** `BriefOverview.tsx`
- **Function:** The summary grid currently implemented.
- **Enhancement:** Add "Edit" modals for quick updates.

#### B. Content Checklist (Step 3)
- **Component:** `ContentChecklist.tsx`
- **Function:** Breakdown of pages and missing content.
- **UI:** Progress bars per page, "Fix" buttons.

#### C. Sitemap Preview (Step 4)
- **Component:** `SitemapVisualizer.tsx`
- **Function:** Tree visualization of the site structure.
- **UI:** React Flow or custom SVG tree.

#### D. Page Editor (Step 5)
- **Component:** `PageEditor.tsx`
- **Function:** Detailed content entry for specific pages.
- **UI:** Sidebar list of pages, main content form inputs.

#### E. Media Library (Step 6)
- **Component:** `MediaLibrary.tsx`
- **Function:** Asset management.
- **UI:** Masonry grid, tabs for Brand/Product/Inspiration.

#### F. Deliverables & Handoff (Step 7 & 8)
- **Component:** `DeliverablesHub.tsx`
- **Function:** Download links and final handoff summary.

---

## 📅 Implementation Tasks

### Phase 1: Structure & Refactor
1. [ ] Create `/components/website-pm` directory.
2. [ ] Extract current dashboard logic into `BriefOverview.tsx`.
3. [ ] Create shell components for Checklist, Sitemap, Media, Deliverables.
4. [ ] Implement `WebsiteProjectDashboard` with Tab navigation.

### Phase 2: Core Features
5. [ ] **Content Checklist:** Implement logic to check missing fields vs. requirements.
6. [ ] **Sitemap:** Create visual tree renderer based on `state.pages`.
7. [ ] **Media Library:** Implement grid view for `state.inspirationImages`, `state.moodboardImages`, `state.productImages`.

### Phase 3: Advanced Features
8. [ ] **Page Editor:** Create form interface for `state.pages` details.
9. [ ] **AI Insights:** Integrate the sidebar logic to be context-aware (change based on active tab).
10. [ ] **Animations:** Add `framer-motion` page transitions between tabs.

---

## 🛠 Navigation Structure

**Tabs:**
1. **Overview** (Home)
2. **Checklist** (Tasks)
3. **Sitemap** (Structure)
4. **Editor** (Content)
5. **Media** (Assets)
6. **Handoff** (Finalize)

## 🎨 Visual Guidelines
- **Background:** `#F7F7F5` (Warm Grey)
- **Cards:** White, `rounded-2xl`, subtle shadow.
- **Typography:** Serif headings (luxury), Sans-serif UI text.
- **Accents:** Black (Primary), Gray-400 (Secondary), Orange/Yellow (Warnings).
