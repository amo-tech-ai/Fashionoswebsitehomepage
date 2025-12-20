# Implementation Plan: FashionOS "Calm Luxury" Transition

**Date:** Dec 18, 2025
**Status:** Ready for Execution
**Objective:** Transition from "Dashboard" to "Decision Surface" architecture.

---

## 🛑 Gap Analysis (Current vs. Target)

| Feature | Current Implementation | Target "Calm Luxury" Spec | Action Required |
| :--- | :--- | :--- | :--- |
| **Navigation** | Grouped by Object (Workspace, Events, etc.) | **Mental Modes** (Monitor, Execute, Network) | Refactor `Sidebar.tsx` |
| **Command Center** | Tabbed Dashboard (Overview/Tasks/Insights) | **Decision Surface** (4 Layers: Pulse, Phase, Blockers, Deep Work) | Rebuild `EventCommandCenter.tsx` |
| **AI Experience** | Inline Widgets (`GeminiHeader`, `AIInsightsPanel`) | **Co-Pilot Drawer** (Global, collapsible, right-side) | Create `AICopilotDrawer.tsx`, remove inline widgets |
| **Tasks** | Kanban Board by default | **Execution List** ("My Critical Tasks") | Refactor `TasksAndDeliverables.tsx` |
| **AI Agents** | Old Intent/Skill System | **5 Specialist Agents** (Event Planner, Ops Risk, etc.) | Implement new Agent logic in `/lib/ai` |
| **Visuals** | Standard SaaS (Cards, Shadows, Blues) | **Editorial** (Serif, Whitespace, Signal Colors only) | Apply visual rules globally |

---

## 📋 Systematic Implementation Steps

### Phase 1: AI Architecture (The "Brain")
*   [ ] **Create Agent Types:** Define strict TypeScript interfaces for Agent outputs (`confidence`, `requires_action`).
*   [ ] **Implement Agents:** Create the 5 specialist agents in `/lib/ai/agents/`:
    *   `EventPlannerAgent`
    *   `OpsRiskAgent`
    *   `BudgetGuardianAgent`
    *   `SponsorIntelligenceAgent`
    *   `AttendeeFlowAgent`
*   [ ] **Build Orchestrator:** Implement `AgentOrchestrator` to filter insights and enforce the "Silence" rule.
*   [ ] **Create Drawer Component:** Build `AICopilotDrawer.tsx` that listens to the Orchestrator.

### Phase 2: Navigation & Layout (The "Skeleton")
*   [ ] **Update Sidebar:** Refactor `Sidebar.tsx` to the Monitor/Execute/Network structure.
*   [ ] **Global Layout:** Ensure `App.tsx` supports the global AI Drawer overlay.
*   [ ] **Visual Reset:** Remove "blue" accents and shadows from global CSS variables (if any) to enforce the Black/White/Signal palette.

### Phase 3: Command Center (The "Face")
*   [ ] **Scaffold Structure:** Create new 4-layer layout in `EventCommandCenter.tsx`.
*   [ ] **Layer 1 (Pulse):** Build `HealthScore` component (Typography-led).
*   [ ] **Layer 2 (Timeline):** Build `PhaseTimeline` component (Linear, non-interactive by default).
*   [ ] **Layer 3 (Critical Path):** Build `CriticalBlockers` list (Max 3 items).
*   [ ] **Layer 4 (Deep Work):** Add simple navigation links.

### Phase 4: Execution Surfaces (The "Hands")
*   [ ] **Refactor Tasks:** Change default view of `TasksAndDeliverables.tsx` to a sorted list of "Critical Tasks".
*   [ ] **Progressive Disclosure:** Hide "Completed" and "Future" tasks behind "Show More".
*   [ ] **Move Kanban:** Downgrade Kanban to a secondary view option.

### Phase 5: Cleanup & Polish
*   [ ] **Remove Old Components:** Delete `AIInsightsPanel`, `GeminiHeader`, and old `EventsSkill.ts`.
*   [ ] **Verify Flows:** specific user journey tests:
    *   User sees a "Venue Contract" blocker in Command Center → Clicks it → Taken to specific Task.
    *   AI Drawer opens only when high-confidence optimization is found.

---

## 🛠️ Tech Stack & Patterns
*   **State Management:** React Context for Agent state (`AgentContext`).
*   **Animation:** `motion/react` for the Drawer slide-over and Timeline expansion.
*   **Styling:** Tailwind CSS (Strict usage: `bg-white`, `text-black`, `border-gray-200`, `text-emerald-700` for success).

## 🚀 Immediate Next Step
Begin **Phase 1: AI Architecture**. This is the foundation that powers the screens.
