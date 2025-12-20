# UX Restructuring Plan: FashionOS "Calm Luxury" System
**Date:** Dec 18, 2025
**Author:** Lead UX Architect
**Objective:** Reduce cognitive load, increase decision speed, transition from "Data Dump" to "Clarity Surface."

---

## 1. Global Dashboard Audit & Inventory

We have audited the current ecosystem. The primary issue is **Feature Parity Layout**—every feature gets equal visual weight, resulting in noise.

| Screen Name | Current State | Core Job-to-be-Done (JTBD) | Noise to Remove | Proposed Action |
| :--- | :--- | :--- | :--- | :--- |
| **Command Center** | Dense dashboard with 6+ widgets, timeline, tasks, alerts, AI card. | **"Are we safe?"** (Status Check) | Task lists, granular timeline, generic AI tips, generic sponsor lists. | **Purge.** Keep only Health Score, 1 Critical Action, and High-Level Phase Timeline. |
| **Project Overview** | Redundant with Command Center. Generic widgets. | **"Where do I start?"** (Navigation) | Duplicate KPI cards, redundant "Recent Activity." | **Merge** into Command Center or repurpose as a "Landing Pad" for junior staff. |
| **Tasks & Deliverables** | Kanban/List hybrid. High density. | **"What do I do today?"** (Execution) | Completed tasks (hide by default), future phase tasks. | Default to "My Critical Tasks." Use Progressive Disclosure for backlog. |
| **Sponsor CRM** | Grid of cards with status badges. | **"Who needs attention?"** (Relationship) | Generic contact info visible on cards. | Switch to "Pipeline View." Highlight only sponsors *at risk* or *pending approval*. |
| **Production Timeline** | Gantt chart. | **"Are we on schedule?"** (Logistics) | Granular sub-tasks in high-level view. | Group by Phase. Color-code by Risk only (not random colors). |
| **ROI / Analytics** | Charts and graphs. | **"Are we on budget?"** (Finance) | Vanity metrics (e.g., "Total Impressions" in planning phase). | Focus on **Burn Rate** and **Projected Overage**. |

---

## 2. Information Hierarchy Reset

**The Rule of 3:**
1.  **Status:** Is this Red, Yellow, or Green? (Visual Signal)
2.  **Metric:** The *one* number that explains the status. (Data Signal)
3.  **Action:** The button to fix it. (Interaction)

**Global Constraints:**
*   **Max 3 Primary KPIs** visible on any screen.
*   **Zero "Gray" Data:** If data is normal, it should recede. Color is reserved for *exceptions*.
*   **Visual Silence:** Remove all container borders and shadows unless interacting. Use whitespace for grouping.

---

## 3. Command Center Re-Architecture

The new Command Center is not a dashboard; it is a **Decision Surface**.

### Layer 1: The Executive Pulse (Hero Section)
*   **Visual:** Large, serif typography. Minimalist.
*   **Content:**
    *   **Event Health Score:** e.g., "94% / On Track".
    *   **The "One Thing":** The single most critical blocker. e.g., "Venue Contract Unsigned (Due Yesterday)."
    *   **Primary Action:** [Sign Contract Now] or [Nudge Legal].

### Layer 2: The Phase Timeline (The Map)
*   **Visual:** Horizontal linear rail.
*   **Content:**
    *   5 Phases: Concept -> Pre-Pro -> Logistics -> Run of Show -> Wrap.
    *   Current phase highlighted.
    *   Future phases dimmed.
    *   **Risk Flags:** Only show a red dot on a future phase if a prerequisite is missing.

### Layer 3: Critical Path (The Blockers)
*   **Visual:** A short, vertical list (Max 3 items).
*   **Content:**
    *   Items that *must* happen to unlock the next phase.
    *   *Not* a generic "To Do" list.
    *   *Example:* "Approve Final Guest List" (Blocks Seating Chart).

### Layer 4: Deep Work Entry Points (Navigation)
*   **Visual:** Simple text links or minimal icons.
*   **Content:** "Jump to: Budget, Full Schedule, Casting, Sponsors."

---

## 4. Alert & AI Signal Cleanup

**The Philosophy:** AI is a whisper, not a shout.

### The "Co-Pilot" Drawer
*   **Interaction:** AI does *not* live in a permanent card on the dashboard. It lives in a collapsed side drawer (right edge).
*   **Trigger:** The drawer pulse/glows *only* when high-confidence insights exist.
*   **Content:**
    *   **Constraint:** AI must offer a Trade-off.
    *   *Bad:* "You should email sponsors."
    *   *Good:* "Shift 2 PAs from Backstage to Front-of-House to reduce check-in wait time by 15m."
    *   **Actions:** [Apply Fix] | [Ignore] | [Edit].

### Notification Hygiene
*   **Critical (Red):** Immediate failure imminent. (Push + Banner)
*   **Warning (Amber):** Action needed within 48h. (Badge)
*   **Info (Gray):** Logged silently. No UI interruption.

---

## 5. Navigation & Grouping (Mental Models)

Re-organizing the Sidebar to match the user's mental mode:

### Group 1: MONITOR (The Brain)
*   *Command Center* (Health & Decisions)
*   *ROI / Analytics* (Financial Health)
*   *Live Pulse* (Day-of Event only)

### Group 2: EXECUTE (The Hands)
*   *Tasks* (The Work)
*   *Timeline* (The Schedule)
*   *Logistics* (Venues, Inventory, Call Sheets)

### Group 3: NETWORK (The People)
*   *Casting* (Models & Talent)
*   *Sponsors* (Revenue)
*   *Attendees* (Guests & Seating)
*   *Team* (Staff & Vendors)

---

## 6. Visual Simplification Rules (The "FashionOS" Look)

1.  **Typography:**
    *   Headers: *Playfair Display* (Serif). Elegant, editorial.
    *   Data/UI: *Inter* or *Geist* (Sans). Clean, legible.
2.  **Color Palette:**
    *   Base: White, Off-White (#F9F9F9), Black (#1A1A1A).
    *   Signal Green: #166534 (Deep Emerald) - *Success*.
    *   Signal Red: #991B1B (Crimson) - *Critical*.
    *   Signal Amber: #D97706 (Burnt Orange) - *Warning*.
    *   *No other colors allowed in UI chrome.*
3.  **Containers:**
    *   Remove card backgrounds where possible. Use lines/dividers.
    *   If cards are needed: 1px border `gray-100`, no shadow.
4.  **Data Viz:**
    *   Thin lines.
    *   Minimal labels.
    *   Sparklines instead of massive bar charts.

---

## 7. Recommendations for Next Sprint

1.  **Refactor `CommandCenter.tsx`**: Strip 60% of the content. Implement the "Layer 1 Pulse" header.
2.  **Consolidate Alerts**: Move the "Critical Alerts" red box into a dynamic "Notification Center" hook.
3.  **Sidebar Re-grouping**: Update `Sidebar.tsx` to match the Monitor/Execute/Network model.
4.  **AI Drawer**: Create a `GlobalAssistantDrawer` component that overlays the screen, replacing the inline AI cards.
