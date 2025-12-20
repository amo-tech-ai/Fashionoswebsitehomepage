# 01 — Dashboard Routes Inventory

**Generated:** December 20, 2024  
**Source:** Systematic routing analysis + component inspection  
**Evidence Quality:** 🟢 HIGH

---

## 📋 COMPLETE DASHBOARD ROUTES MAPPING

| Route | Component | Layout | Major Cards/Sections | Data Source | Status |
|-------|-----------|--------|---------------------|-------------|--------|
| **CORE DASHBOARDS** |
| `/command-center` | CommandCenter.tsx | AppShell | HealthScore, PhaseTimeline, CriticalBlockers, DeepWorkLinks | EventContext, AgentContext, SponsorContext | ⚠️ Backend unknown |
| `/overview`<br>`/dashboard` | ProjectOverview.tsx | AppShell | Campaign Snapshot, Pulse Feed, Immediate Actions, Production Stages, Risks, Team | BrandShootContext + Mock Data | 🔴 Mock data |
| `/tasks`<br>`/tasks-*` | TasksAndDeliverables.tsx | AppShell | Workflow Steps, Tasks List/Kanban, Task Drawer | EventContext | ⚠️ Backend unknown |
| **EVENT MANAGEMENT** |
| `/events`<br>`/events-list` | Events.tsx | AppShell | Event cards, filters, search | ⚠️ Not inspected | ❓ Unknown |
| `/eventdetail` | EventDetail.tsx | AppShell | Event details, timeline, team | ⚠️ Not inspected | ❓ Unknown |
| **SPONSOR MANAGEMENT** |
| `/sponsors` | SponsorCRMv2.tsx | AppShell | CRM Pipeline/List, Inspector Panel, KPIs | SponsorContext | ⚠️ Backend unknown |
| `/sponsor-profile` | SponsorProfile.tsx | AppShell | Sponsor details, activations, analytics | SponsorContext | ⚠️ Not inspected |
| `sponsor-detail` (case) | SponsorDetail.tsx | AppShell | Sponsor detail view | ⚠️ Not inspected | ❓ Duplicate? |
| **PRODUCTION TOOLS** |
| `/shotlist` | ShotListBuilder.tsx | AppShell | Shot cards, AI suggestions | ⚠️ Not inspected | ❓ Unknown |
| `/products` | ProductsDashboard.tsx | AppShell | Product catalog, filters | ⚠️ Not inspected | ❓ Unknown |
| `/gallery` | GalleryDashboard.tsx | AppShell | Asset grid, approval UI, filters | Mock + in-memory | 🔴 No persistence |
| `/sample-tracker` | SmartSampleTracker.tsx | AppShell | Sample tracking table | ⚠️ Not inspected | ❓ Unknown |
| `/call-sheet` | DynamicCallSheet.tsx | AppShell | Call sheet generator | ⚠️ Not inspected | ❓ Unknown |
| **CASTING & TALENT** |
| `/casting` | CuraCasting.tsx | AppShell | Casting manager | ⚠️ Not inspected | ❓ Unknown |
| `/casting-availability` | CastingAvailability.tsx | AppShell | Availability calendar | ⚠️ Not inspected | ❓ Unknown |
| `/casting-matchmaker` | CastingMatchmaker.tsx | AppShell | AI-powered casting suggestions | ⚠️ Not inspected | ❓ AI unknown |
| **VENUE & ACTIVATIONS** |
| `/venues` | VenueManagement.tsx | AppShell | Venue list, bookings | ⚠️ Not inspected | ❓ Unknown |
| `/activations` | ActivationsManager.tsx | AppShell | Activation cards, calendar | ⚠️ Not inspected | ❓ Unknown |
| `/runway` | RunwayStage.tsx | AppShell | Runway timeline, heatmap | Mock data | 🔴 No backend |
| **FINANCE** |
| `/billing` | BudgetManager.tsx | AppShell | Budget breakdown, transactions | ⚠️ Not inspected | ❓ Unknown |
| `/contracts` | ContractAnalyzer.tsx | AppShell | Contract list, AI analysis | BrandShootContext + Mock | 🔴 No AI |
| `/analytics`<br>`/roi` | ROIAnalytics.tsx | AppShell | ROI metrics, charts | ⚠️ Not inspected | ❓ Unknown |
| **CLIENT & MISC** |
| `/clients` | ClientDashboard.tsx | AppShell | Client info, projects | BrandShootContext + Mock | 🔴 Mock data |
| `/designer` | DesignerCollection.tsx | AppShell | Designer portfolio | ⚠️ Not inspected | ❓ Unknown |
| `/brand-profile-dashboard` | BrandProfileDashboard.tsx | AppShell | Brand profile editor | ⚠️ Not inspected | ❓ May be empty |

---

## 🔍 ROUTING LOGIC

### App.tsx Routing (Lines 136-148, 232-285)

**Dashboard Detection:**
```typescript
// Line 136-145: Core dashboards
else if (path.includes("/tasks") || path.includes("/deliverables")) setActiveScreen("tasks");
else if (path.includes("/contracts")) setActiveScreen("contracts");
else if (path.includes("/analytics") || path.includes("/roi")) setActiveScreen("analytics");
else if (path.includes("/command-center")) setActiveScreen("command-center");
else if (path.includes("/overview") || path.includes("/dashboard")) setActiveScreen("overview");
else if (path.includes("/shotlist")) setActiveScreen("shotlist");
else if (path.includes("/products")) setActiveScreen("products");
else if (path.includes("/gallery")) setActiveScreen("gallery");
else if (path.includes("/clients")) setActiveScreen("clients");
else if (path.includes("/billing")) setActiveScreen("billing");

// Line 146-148: Sponsor routes with sub-routing
else if (path.includes("/sponsors")) {
  setActiveScreen(path.includes("profile") ? "sponsor-profile" : "sponsors");
}
```

**Rendering Logic:**
```typescript
// Line 237-284: Dashboard rendering
case "overview":
  return <ProjectOverview onNavigate={handleNavigate} />;
case "shotlist":
  return <ShotListBuilder onBack={() => handleNavigate('production-timeline')} />;
case "products":
  return <ProductsDashboard />;
case "gallery":
  return <GalleryDashboard />;
case "clients":
  return <ClientDashboard />;
case "billing":
  return <BudgetManager />;
case "command-center":
  return <CommandCenter onNavigate={handleNavigate} />;
case "runway":
  return <RunwayStage />;
case "casting":
  return <CuraCasting onNavigate={handleNavigate} />;
// ... more cases
```

---

## 📦 COMPONENT FILE LOCATIONS

### Core Dashboards
```
/components/dashboards/
├── CommandCenter.tsx                ✅ Inspected (130 lines)
├── ProjectOverview.tsx              ✅ Inspected (150+ lines)
├── TasksAndDeliverables.tsx         ✅ Inspected (150+ lines)
```

### Command Center Sub-components
```
/components/dashboards/command-center/
├── HealthScore.tsx                  ✅ Used (line 92)
├── PhaseTimeline.tsx                ✅ Used (line 101)
├── CriticalBlockers.tsx             ✅ Used (line 114)
└── DeepWorkLinks.tsx                ✅ Used (line 124)
```

### Project Overview Sub-components
```
/components/dashboards/
├── AIProducerDrawer.tsx             ✅ Used (line 23)
├── CriticalPathDetailModal.tsx      ✅ Used (line 24)
├── ProposalDiffModal.tsx            ✅ Used (line 25)
├── ProductionProgressStages.tsx     ✅ Used (line 26)
└── MobileStickyBar.tsx              ✅ Used (line 27)
```

### Tasks Dashboard Sub-components
```
/components/dashboards/tasks/
├── components/
│   ├── WorkflowSteps.tsx            ✅ Used (line 102)
│   ├── KanbanBoard.tsx              ✅ Used
│   ├── GeminiHeader.tsx
│   ├── KPICard.tsx
│   ├── ProjectFlowCard.tsx
│   └── WorkflowMiniNav.tsx
├── views/
│   └── CriticalTasksList.tsx        ✅ Used (line 146)
├── drawer/
│   ├── WorkDrawer.tsx               ✅ Used
│   ├── TaskDetailView.tsx
│   └── SummaryView.tsx
├── data.ts
└── types.ts
```

### Sponsor CRM Sub-components
```
/components/dashboards/crm/
├── CRMPipelinev2.tsx                ✅ Used (line 3)
├── CRMListv2.tsx                    ✅ Used (line 4)
├── CRMInspectorPanel.tsx            ✅ Used (line 5)
├── CRMKPIsv2.tsx                    ✅ Used (line 7)
├── CRMPipeline.tsx                  ⚠️ Legacy v1
├── CRMList.tsx                      ⚠️ Legacy v1
├── CRMKPIs.tsx                      ⚠️ Legacy v1
├── CRMSidebar.tsx
├── GlobalInsightsDrawer.tsx
├── SmartContactInput.tsx
└── SponsorDetailSidebar.tsx
```

### Finance Sub-components
```
/components/dashboards/finance/
├── BudgetManager.tsx                ✅ Main component
└── ContractAnalyzer.tsx             ✅ Main component
```

### Other Dashboards
```
/components/dashboards/
├── GalleryDashboard.tsx             ✅ Inspected (partial)
├── RunwayStage.tsx                  ✅ Inspected (partial)
├── ClientDashboard.tsx              ✅ Inspected (partial)
├── SponsorCRMv2.tsx                 ✅ Inspected (100 lines)
├── SponsorProfile.tsx               ⚠️ Not inspected
├── ProductsDashboard.tsx            ⚠️ Not inspected
├── BillingDashboard.tsx             ⚠️ Not inspected
├── CastingModels.tsx                ⚠️ Not inspected
├── DesignerCollection.tsx           ⚠️ Not inspected
├── VenueManagement.tsx              ⚠️ Not inspected
├── ActivationsManager.tsx           ⚠️ Not inspected
├── ROIAnalytics.tsx                 ⚠️ Not inspected
├── BrandProfileDashboard.tsx        ⚠️ Not inspected
└── ShotListBuilder.tsx              ⚠️ Not inspected
```

---

## 🗄️ CONTEXT & STATE MANAGEMENT

### EventContext
**File:** `/context/EventContext.tsx` (⚠️ NOT VERIFIED)

**Used By:**
- CommandCenter (line 22): `currentEvent, tasks, phases, isLoading`
- TasksAndDeliverables (line 21): `tasks, phases, updateTask`

**Expected Methods:**
- `currentEvent` — Current event object
- `tasks` — Array of tasks
- `phases` — Array of workflow phases
- `isLoading` — Loading state
- `updateTask(task)` — Update task
- `createEvent(eventData)` — Create event (from wizard)

**⚠️ Implementation Not Verified** — needs full audit

---

### SponsorContext
**File:** `/context/SponsorContext.tsx` (⚠️ NOT VERIFIED)

**Used By:**
- CommandCenter (line 21): `sponsors`
- SponsorCRMv2 (line 14): `sponsors`
- SponsorProfile (likely)

**Expected Methods:**
- `sponsors` — Array of sponsor objects
- `addSponsor(sponsorData)` — Add new sponsor (from wizard)

**⚠️ Implementation Not Verified** — needs full audit

---

### BrandShootContext
**File:** `/context/BrandShootContext.tsx` (✅ VERIFIED from wizard audit)

**Used By:**
- ProjectOverview (line 30): `activeProjects, campaignPlan`
- ContractAnalyzer (line 125): `proposal, activeProjects`
- ClientDashboard (line 16): `activeProjects`

**Known State:**
```typescript
{
  wizardData: WizardState | null,
  proposal: CampaignPlan | null,
  activeProjects: any[],
  setWizardData(data: WizardState): void,
  setProposal(plan: CampaignPlan): void,
}
```

**🚨 Issue:** No Supabase queries found in context — all state is in-memory only

---

### AgentContext
**File:** `/lib/ai/AgentContext.tsx` (⚠️ NOT VERIFIED)

**Used By:**
- CommandCenter (line 20): `executiveInsight, runAnalysis, isAnalyzing`

**Expected Methods:**
- `executiveInsight` — AI-generated insight object
- `runAnalysis(data)` — Trigger AI analysis
- `isAnalyzing` — Loading state

**⚠️ Implementation Not Verified** — needs audit

---

## 📊 DATA FLOW PATTERNS

### Pattern 1: Context-Driven (Most Common)
```
Component → Context Hook → State
         ↓
    Supabase? (⚠️ NOT VERIFIED)
```

**Example:** TasksAndDeliverables
```typescript
const { tasks, phases, updateTask } = useEvent();
// tasks and phases come from context
// updateTask called on change
// Backend persistence unknown
```

---

### Pattern 2: Mock Data Fallback
```
Component → Context Hook → Fallback to Mock
```

**Example:** ProjectOverview
```typescript
const { activeProjects, campaignPlan } = useBrandShoot();
const activeProject = activeProjects[0] || {
  name: "Andrewmaitenyi Summer '25", // Mock fallback
  status: 'Shoot Day',
  // ...
};
```

---

### Pattern 3: Pure Mock (NO CONTEXT)
```
Component → Hardcoded Mock Data
```

**Example:** GalleryDashboard
```typescript
const generateMockAssets = (count: number): GalleryAsset[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: Date.now() + i,
    name: `CAM_${Math.floor(Math.random() * 1000)}.jpg`,
    // ...
  }));
}
```

---

## 🔧 SHARED DASHBOARD COMPONENTS

### UI Framework
```
/components/ui/
├── badge.tsx
├── button.tsx
├── card.tsx
├── table.tsx
├── tabs.tsx
├── dialog.tsx
├── drawer.tsx
└── ... (40+ UI components)
```

### Shared Dashboard Widgets
```
/components/shared/
├── AIThinkingIndicator.tsx      ✅ Used by CommandCenter
├── AppShell.tsx                 ✅ Main layout wrapper
├── NavigationBar.tsx            ✅ Top nav
├── Sidebar.tsx                  ✅ Left sidebar
├── GlobalRail.tsx               ⚠️ Not inspected
└── AICopilotDrawer.tsx          ⚠️ Not inspected
```

### Dashboard-Specific Shared
```
/components/dashboard/
├── AiReasoningPanel.tsx
├── CastingSection.tsx
├── CriticalTasksGrid.tsx
├── DashboardHeader.tsx
├── DeliverablesStatus.tsx
├── HeroEventCard.tsx
├── LeftSidebar.tsx
├── ProcessNavigator.tsx
├── SponsorProgressCard.tsx
├── UpcomingMilestones.tsx
└── VenueStatusCard.tsx
```

---

## 🚨 CRITICAL FINDINGS

### 1. No Supabase Queries Found
**Search Results:**
```bash
rg "supabase\." --type tsx components/dashboards/
# 0 results

rg "\.from\(" --type tsx components/dashboards/
# 5 results, all in mock data or Array.from
```

**Conclusion:** Zero database queries in any dashboard component

---

### 2. Context Implementations Unknown
**Files to Audit:**
- `/context/EventContext.tsx` — Used by 4 dashboards
- `/context/SponsorContext.tsx` — Used by 3 dashboards
- `/context/BrandShootContext.tsx` — Used by 3 dashboards
- `/lib/ai/AgentContext.tsx` — Used by 1 dashboard

**Impact:** Can't determine if backend integration exists

---

### 3. Mock Data Everywhere
**Evidence:**
- ProjectOverview: Lines 47-71 (pulse feed, actions)
- ClientDashboard: Lines 18-28 (client data)
- GalleryDashboard: Line 31 (asset generator)
- RunwayStage: Line 97 (heatmap data)

---

### 4. Many Dashboards Not Inspected
**Count:** 13 of 21 dashboards not fully inspected

**List:**
1. Events.tsx
2. EventDetail.tsx
3. SponsorProfile.tsx
4. SponsorDetail.tsx
5. ShotListBuilder.tsx
6. ProductsDashboard.tsx
7. SmartSampleTracker.tsx
8. DynamicCallSheet.tsx
9. CuraCasting.tsx
10. CastingAvailability.tsx
11. CastingMatchmaker.tsx
12. VenueManagement.tsx
13. ActivationsManager.tsx
14. RunwayStage.tsx (partial)
15. BudgetManager.tsx
16. ROIAnalytics.tsx
17. DesignerCollection.tsx
18. BrandProfileDashboard.tsx

---

### 5. Duplicate Routes/Components
**Potential Duplicates:**
- `sponsor-detail` vs `sponsor-profile` — May be same functionality
- CRMPipeline vs CRMPipelinev2 — v2 is likely current, v1 legacy
- CRMList vs CRMListv2 — Same as above
- CRMKPIs vs CRMKPIsv2 — Same as above

**Recommendation:** Consolidate or clarify purpose

---

## 📝 NEXT STEPS

### Immediate (Week 1)

1. [ ] **Inspect All Context Files**
   ```bash
   cat /context/EventContext.tsx
   cat /context/SponsorContext.tsx
   cat /lib/ai/AgentContext.tsx
   ```

2. [ ] **Check for Supabase in Contexts**
   ```bash
   rg "supabase" context/
   rg "from\(" context/
   ```

3. [ ] **Inspect Remaining Dashboards**
   - Start with high-priority: Events, SponsorProfile, BudgetManager
   - Document structure, data sources, features

### Short-term (Week 2-3)

4. [ ] **Create Database Schema**
   - Based on dashboard needs
   - Events, tasks, sponsors, assets, budgets, etc.

5. [ ] **Wire Contexts to Supabase**
   - Add queries to EventContext
   - Add queries to SponsorContext
   - Add queries to new contexts

6. [ ] **Replace Mock Data**
   - ProjectOverview pulse feed → real events
   - GalleryDashboard assets → Supabase Storage
   - ClientDashboard → real clients table

---

**END OF DASHBOARD INVENTORY**

*For detailed analysis, see:*
- `/docs/progress/03-dashboard-progress-tracker.md`
