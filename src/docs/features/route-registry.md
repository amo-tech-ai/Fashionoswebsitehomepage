# Application Route Registry

**Version:** 1.0.0
**Status:** Approved
**Last Updated:** Dec 18, 2025

This document acts as the **Single Source of Truth** for all navigation routes in the application. All route identifiers (`routeId`) must be consistent across:
1.  **Sidebar** (`Sidebar.tsx`)
2.  **Navigation Logic** (`App.tsx` - `handlePathChange`)
3.  **Render Logic** (`App.tsx` - `renderContent`)
4.  **Breadcrumbs** (`NavigationBar.tsx`)

---

## 1. Dashboard & Workspace Routes
*Layout: Standard Dashboard (Sidebar + Top Nav)*

| Sidebar Group | Label | Route ID | URL Path | Component | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Workspace** | Overview | `overview` | `/overview` | `ProjectOverview` | Stable |
| | Tasks | `tasks` | `/tasks` | `TasksAndDeliverables` | Stable |
| | Command Center | `command-center` | `/command-center` | `CommandCenter` | Stable |
| **Production** | Timeline | `production-timeline` | `/production-timeline` | `ProductionTimeline` | FullScreen |
| | Shot Lists | `shotlist` | `/shotlist` | `ShotListBuilder` | Stable |
| | AI Optimization | `ai-optimization` | `/ai-optimization` | `AIOptimizationCenter` | FullScreen |
| | Inventory | `products` | `/products` | `ProductsDashboard` | Stable |
| | Casting | `casting` | `/casting` | `CuraCasting` | **Needs Fix** |
| | Gallery | `gallery` | `/gallery` | `GalleryDashboard` | Stable |
| **Events** | Schedule | `events-list` | `/events-list` | `Events` (Dashboard Mode) | **Needs Fix** |
| | Venues | `venues` | `/venues` | `VenueManagement` | Stable |
| | Run of Show | `activations` | `/activations` | `ActivationsManager` | Stable |
| | Sponsors | `sponsors` | `/sponsors` | `SponsorCRM` | Stable |
| **Network** | Clients | `clients` | `/clients` | `ClientDashboard` | Stable |
| | Designers | `designers` | `/designers` | `DesignerDirectory` | Stable |
| **Business** | Contracts | `contracts` | `/contracts` | `ContractsManager` | Stable |
| | Finance | `billing` | `/billing` | `BillingDashboard` | Stable |
| | Performance | `analytics` | `/analytics` | `ROIAnalytics` | Stable |
| **Digital** | Web Projects | `website-brief-dashboard` | `/website-brief` | `WebsiteWizard` (Step 9) | Stable |

---

## 2. Marketing Pages
*Layout: Marketing (No Sidebar, Public Header)*

| Label | Route ID | URL Path | Component | Note |
| :--- | :--- | :--- | :--- | :--- |
| Home | `home-v3` | `/` | `HomePageV3` | Default Entry |
| Photography | `photography` | `/photography` | `Services` | |
| Directory | `directory` | `/directory` | `Directory` | Public Listing |
| Events | `events` | `/events` | `Events` | Public Listing |
| Clothing | `clothing` | `/clothing` | `Clothing` | |
| Ecommerce | `ecommerce-photography` | `/ecommerce-photography` | `EcommercePhotography` | |

---

## 3. Full Screen Wizards
*Layout: Full Screen (Focused Flow)*

| Label | Route ID | URL Path | Component | Trigger |
| :--- | :--- | :--- | :--- | :--- |
| New Shoot | `wizard` | `/wizard` | `ShootWizard` | Sidebar (+) |
| New Event | `event-wizard` | `/event-wizard` | `EventCreationWizard` | Sidebar (+) |
| New Website | `website-wizard` | `/website-wizard` | `WebsiteWizard` | Sidebar (+) |
| Proposal | `proposal` | `/proposal` | `ProposalPreview` | Wizard Complete |
| Booking | `booking` | `/booking` | `BookingFlow` | Proposal Signed |

---

## 4. Implementation Requirements

### A. Fix "Casting" Disconnect
**Issue:** Sidebar sends `casting`, but App.tsx routing expects `cura-casting`.
**Fix:** Unify on `casting`.
```javascript
// App.tsx
else if (path.includes("/casting")) setActiveScreen("casting");
// ...
case "casting": return <CuraCasting ... />;
```

### B. Fix "Events" Ambiguity
**Issue:** Sidebar sends `events-list` for dashboard view, but URL logic defaults `/events` to marketing.
**Fix:** Add explicit dashboard route handler.
```javascript
// App.tsx
else if (path === "/events-list") setActiveScreen("events-list");
else if (path.includes("/events")) ... // Fallback to marketing
```

### C. Standardize Render Cases
Ensure `App.tsx` switch statement uses exactly the **Route ID** listed above. Do not use aliases or secondary IDs.
