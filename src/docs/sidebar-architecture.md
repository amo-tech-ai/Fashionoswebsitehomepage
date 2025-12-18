# Sidebar Navigation Audit & Architecture

## 1. Sidebar Audit Summary

The current sidebar is a flat, unstructured list of 24 mixed items. It suffers from severe cognitive overload, mixing marketing pages, operational dashboards, and creation wizards without hierarchy.

**Current State Issues:**
*   **No Hierarchy:** "Billing" (Admin) is given same weight as "Home V1" (Marketing).
*   **Context Switching:** Users jump between "Event Operations" and "Website Creation" without visual separation.
*   **Legacy Clutter:** Includes links to `home-v1`, `home-v2`, `home-v3` which are marketing/demo concepts, not application screens.
*   **Wizard Pollution:** Creation flows (Wizards) are treated as persistent navigation items, confusing "Actions" with "Destinations".

---

## 2. Problems with Current Ordering

1.  **Marketing pages in App Sidebar:** `Home V1/V2/V3` should not exist in the logged-in application sidebar.
2.  **Buried Key Features:** `Command Center` (the flagship event feature) is buried at item #15.
3.  **Disjointed Workflows:**
    *   `Events List` (#13) is separated from `Venues` (#23) and `Casting` (#24).
    *   `Sponsors` (#16) is separated from `Activations` (#20).
4.  **Missing "Create" Distinction:** `Event Wizard` looks like a folder, but it's an action.

---

## 3. Proposed Sidebar Structure

The new structure reduces top-level noise by grouping related workflows.

### 🟢 Global Actions (Floating/Top)
*   **New Project** (Universal "Create" button - *Recommended to move out of list*)
    *   *Triggers: Shoot Wizard, Event Wizard, Website Wizard*

### 📁 Group 1: Workspace (Context)
*   **Overview** (Project Overview)
    *   *The "Home" base for producers.*
*   **Command Center**
    *   *High-priority dashboard for live operations.*

### 📸 Group 2: Production (Shoots)
*   **Shoots** (Shot List Builder)
    *   *Renamed from "Shot List Builder" to broader "Shoots" implied container.*
    *   *Sub-menu: Shot Lists, Call Sheets (Future)*
*   **Merchandise** (Products)
    *   *Renamed for clarity.*
*   **Assets** (Gallery & Delivery)
*   **Casting** (Models)

### 🗓️ Group 3: Events (Live Ops)
*   **Events Schedule** (Events List)
*   **Venues** (Venue Manager)
*   **Run of Show** (Activations)
    *   *Renamed "Activations" to "Run of Show" for broader utility, or keep "Activations" if specific.*
*   **Sponsors** (Sponsor CRM)

### 👥 Group 4: Network (CRM)
*   **Clients** (Client Dashboard)
*   **Designers** (Designer Directory)
    *   *Includes "Brand Scanner" as a sub-action.*

### 💼 Group 5: Business
*   **Contracts** (Legal)
*   **Finance** (Billing & Payments)
*   **Performance** (ROI & Analytics)

### 🛠️ Group 6: Tools (Secondary)
*   **Web Projects** (Website Brief)
    *   *Kept separate as it's a distinct service line.*

---

## 4. Sub-Menu Breakdown & Mapping

| Group | New Label | Route / ID | Icon | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Workspace** | Overview | `overview` | LayoutDashboard | Default landing |
| | Command Center | `command-center` | Activity | Live event mode |
| **Production** | Shot Lists | `shotlist` | ListOrdered | |
| | Inventory | `products` | Package | Renamed from "Products" |
| | Casting | `casting` | UserCheck | Moved from bottom |
| | Gallery | `gallery` | ImageIcon | |
| **Events** | All Events | `events-list` | Calendar | |
| | Venues | `venues` | MapPin | |
| | Activations | `activations` | Zap | |
| | Sponsors | `sponsors` | Handshake | |
| **Network** | Clients | `clients` | Users | |
| | Designers | `designers` | Scissors | |
| **Business** | Contracts | `contracts` | FileSignature | |
| | Finance | `billing` | DollarSign | |
| | Analytics | `analytics` | BarChart3 | |
| **Digital** | Web Projects | `website-brief-dashboard` | Monitor | |

**Items Removed from Main Nav:**
*   `home`, `home-v2`, `home-v3` (Marketing)
*   `wizard`, `event-wizard`, `website-wizard`, `directory-wizard` (Moved to "Create" button or Tools section)
*   `tasks` (Integrated into Overview/Command Center views, or kept as a utility link)

---

## 5. Role Visibility Notes

*   **Producer (Super Admin):** Sees ALL groups.
*   **Client:** Sees `Overview`, `Gallery`, `Finance`, `Web Projects`. *Hides CRM, Contracts, Command Center.*
*   **Sponsor:** Sees `Sponsors` (Portal View), `Activations`. *Hides everything else.*
*   **Creative/Talent:** Sees `Shot Lists`, `Schedule`, `Venues`. *Hides Finance, Contracts, CRM.*

---

## 6. UX Rationale

1.  **Workflow-First:** Users typically work in *modes* (e.g., "I am planning a shoot" or "I am managing an event"). Grouping by Production vs. Events respects these modes.
2.  **De-cluttered Top:** Moving generic marketing pages and wizards out creates a calm, professional workspace.
3.  **Terminology:** Renaming "Products" to "Inventory" and "Project Overview" to "Overview" aligns better with enterprise SaaS standards.
4.  **Scalability:** New features (e.g., "Make-up Artists" directory) can easily slot into "Production" or "Network" without expanding the top-level list.

---

## 7. Context Indicator Design (Concept)

**Location:** Bottom of Sidebar (Sticky) or Top Header.
**Content:**
*   **Project:** "NYFW SS25"
*   **Status:** "Live in 42 Days"
*   **Action:** Switch Project (Dropdown)

*This replaces the hardcoded "Current Event" footer with a functional workspace switcher.*
