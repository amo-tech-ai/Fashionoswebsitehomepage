# Sitemap & UX Features Audit

## 1. Executive Summary

**FashionOS** is a comprehensive vertical SaaS platform designed for the fashion industry. It combines high-end editorial aesthetics with complex utility for managing photography shoots, website projects, events, and brand logistics.

The system is split into two primary environments:
1.  **Marketing & Discovery:** A public-facing luxury website for discovering services, studios, and directories.
2.  **FashionOS Application:** A suite of specialized dashboards and wizards for managing projects, assets, and operations.

**Key Strength:** The "Luxury Utility" design language successfully masks complex enterprise workflows (ERP/CRM) behind a minimalist, fashion-editorial interface.

---

## 2. Product Overview

| Area | Description | Primary User |
| :--- | :--- | :--- |
| **Commerce Services** | Booking photography, video, and web design. | Brands, Retailers |
| **Directory Network** | Listings for studios, designers, and creatives. | Industry Professionals |
| **Project Management** | Dashboards for managing shoots and website builds. | Clients, Project Managers |
| **Event Operations** | "Command Center" for running fashion shows/events. | Event Producers |
| **AI Automation** | Generative briefs, risk analysis, and brand scanning. | All Users |

---

## 3. Sitemap

### 🌐 Marketing & Public Website

| Page | Route | Purpose | Key Actions |
| :--- | :--- | :--- | :--- |
| **Home** | `/` | Brand introduction & entry point. | Navigate to Services or Login. |
| **Services Hub** | `/services` | Overview of all service offerings. | Select specific service. |
| **Ecommerce Photo** | `/ecommerce-photography` | Specialized service page. | View gallery, Book Shoot. |
| **Clothing Photo** | `/clothing` | Apparel-specific photography. | View portfolio. |
| **Product Photo** | `/product` | Hard goods/accessories photography. | View portfolio. |
| **Video Production** | `/video` | Video & campaign services. | View showreel. |
| **Web Design** | `/web-design` | Agency services for digital. | Start Website Wizard. |
| **Studios** | `/studios` | Physical studio locations & rental. | Book studio space. |
| **Directory** | `/directory` | Searchable creative directory. | Filter & find talent. |
| **Directory Detail** | `/directory/detail/:id` | Individual profile view. | Contact / Book. |
| **Events** | `/events` | Fashion event listings. | Register / Buy Tickets. |
| **Event Detail** | `/events/detail/:id` | Specific event information. | RSVP. |

### ⚡ Wizards (Complex Flows)

| Wizard Name | Route | Purpose | Output |
| :--- | :--- | :--- | :--- |
| **Shoot Builder** | `/wizard` | Configure a photo/video shoot. | Quote / Project Draft. |
| **Website Builder** | `/website-wizard` | Scope a new website project. | AI Project Brief. |
| **Brand Scanner** | `/designer-wizard` | Onboard new designer brands. | Brand Profile / Audit. |
| **Event Creator** | `/events/create` | Set up a new fashion event. | Event Dashboard. |
| **Directory Profile**| `/directory/create` | Create public directory listing. | Public Profile. |

### 🖥️ Application Dashboards

| Dashboard | Route | Purpose | Key Features |
| :--- | :--- | :--- | :--- |
| **Project Overview** | `/overview` | Client home screen. | Active shoots, deliverables status. |
| **Command Center** | `/command-center` | Event operations hub. | Real-time risk, timeline, KPIs. |
| **Shot List** | `/shotlist` | Photography management. | SKU tracking, shot status. |
| **Products** | `/products` | Inventory management. | Product tracking. |
| **Gallery** | `/gallery` | Asset delivery. | Review & approve images. |
| **Billing** | `/billing` | Financials. | Invoices, payments. |
| **Clients** | `/clients` | CRM (Agency view). | Client list. |
| **Task Flow** | `/tasks` | Task management. | Kanban/List views. |
| **Sponsor CRM** | `/sponsors` | Event sponsorship management. | Deal stages, deliverables. |
| **Venue Ops** | `/venues` | Logistics management. | Floor plans, access control. |
| **Analytics** | `/analytics` | ROI & Performance. | Campaign metrics. |

---

## 4. Wizards Breakdown

### 📸 Shoot Wizard
**Route:** `/wizard`
*   **Goal:** Convert a generic "inquiry" into a structured production brief.
*   **Steps:** Service -> Category -> Sub-Type -> Visual Style -> Scene Selection -> Talent -> Add-ons -> Channels -> Scheduling -> Summary.
*   **Key Feature:** Visual selection grids (images instead of checkboxes) to maintain editorial feel.

### 🌐 Website Wizard
**Route:** `/website-wizard`
*   **Goal:** Scoping complex web development projects without a sales call.
*   **Steps:** Project Type -> Brand Identity (Logo/Colors) -> Page Structure -> Content Assets -> E-commerce Config -> Features -> Budget/Timeline -> AI Brief Gen.
*   **AI Feature:** Generates a professional Markdown project brief automatically based on inputs.

### 🧠 Designer Wizard (Brand Scanner)
**Route:** `/designer-wizard`
*   **Goal:** Instant onboarding for brands using AI analysis.
*   **Steps:** Input URL/Handle -> System "Scans" Brand -> AI Analysis -> Audit Report.
*   **Outcome:** Populates the `BrandProfileDashboard` automatically.

---

## 5. Dashboard Breakdown

### 📂 Project Overview (Client View)
*   **Audience:** Brand Managers, Marketing Directors.
*   **Key Modules:**
    *   **Active Shoots:** Progress bars and status tags (e.g., "Shooting", "Editing").
    *   **Deliverables:** Itemized list of assets pending approval.
    *   **Quick Actions:** Deep links to specific tools (Shot List, Billing).

### 🎛️ Command Center (Event Ops)
*   **Audience:** Event Producers, Show Runners.
*   **Key Modules:**
    *   **KPI Strip:** Real-time attendance, budget, and task completion.
    *   **Workflow Map:** Visual progress of event phases (Pre-prod -> On-site).
    *   **Risk Alerts:** AI-detected issues (e.g., "Lighting test overdue").
    *   **Timeline:** Interactive Gannt-style view of milestones.

---

## 6. Core User Journeys

### Journey A: The Ecommerce Shoot
1.  **Discovery:** User lands on `/ecommerce-photography` and views gallery.
2.  **Intent:** User clicks "Request a Quote".
3.  **Configuration:** Enters `/wizard`, selects "Fashion" -> "On-Model" -> "White Background".
4.  **Conversion:** Completes wizard; project created in "Pending" state.
5.  **Management:** User logs in to `/overview` to track the shoot progress and approve photos in `/gallery`.

### Journey B: Event Production
1.  **Setup:** Producer uses `/events/create` to initialize "NYFW SS25".
2.  **Planning:** Uses `/tasks` to assign "Venue Logistics" to team.
3.  **Sponsorship:** Tracks "Chanel" deal in `/sponsors`.
4.  **Execution:** Monitor `/command-center` on show day for critical alerts and timeline adherence.

---

## 7. AI & Automation Touchpoints

| Feature | Location | Function |
| :--- | :--- | :--- |
| **Brand Scanner** | Designer Wizard | Scrapes website/socials to auto-fill brand profile and style preferences. |
| **Project Brief Gen** | Website Wizard | Synthesizes form inputs into a comprehensive text-based Scope of Work. |
| **Risk Prediction** | Command Center | Analyzes task delays and dependencies to predict operational bottlenecks (Gemini). |
| **Optimization** | Command Center | Suggests resource reallocation (e.g., "Move 2 staff to Check-in"). |

---

## 8. Gaps & Opportunities

*   **Mobile Experience:** While marketing pages are responsive, complex dashboards (Command Center) are dense and may require specialized mobile views for on-the-go event staff.
*   **Notifications:** No centralized notification center found in the top navigation; users rely on dashboard widgets.
*   **User Roles:** Explicit role management (Admin vs. Viewer) is implied but not visible in current interface screens.
*   **Search:** Global search exists in dashboards but scope (searching across assets, tasks, and contacts simultaneously) needs verification.
