# Directory Structure Audit — Current vs. Target
## Gap Analysis & Migration Priority

**Audit Date:** December 20, 2024  
**Current Status:** ⚠️ Major violations found

---

## EXECUTIVE SUMMARY

**Current State:** 35% compliance with `/rules/DIRECTORY-AND-ROUTING.md`  
**Target State:** 100% compliance (production-ready)

**Critical Issues:**
1. ❌ No React Router (manual switch statement)
2. ❌ Business logic mixed in components
3. ❌ No clear feature boundaries
4. ❌ Routes scattered across files
5. ⚠️ Components directory is bloated (200+ files)

**Estimated Migration Time:** 12-16 hours

---

## CURRENT STRUCTURE VIOLATIONS

### ❌ VIOLATION 1: Routing Anti-Pattern

**Rule:** Use React Router with centralized route definitions

**Current State:**
```tsx
// App.tsx (lines 103-350+)
function AppContent() {
  const [activeScreen, setActiveScreen] = useState("home-v3");
  
  const renderContent = () => {
    switch (activeScreen) {
      case "home": return <AppHome />;
      case "home-v2": return <HomePageV2 />;
      case "home-v3": return <HomePageV3 />;
      // ... 80+ more cases
    }
  };
}
```

**Issues:**
- 250+ lines of manual routing
- No deep linking
- Browser back/forward broken
- Can't bookmark URLs
- No code splitting

**Target State:**
```tsx
// /routes/index.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/events" element={<EventsList />} />
  </Routes>
</BrowserRouter>
```

**Priority:** 🔴 CRITICAL  
**Effort:** 8 hours

---

### ❌ VIOLATION 2: No `/features` Directory

**Rule:** Feature logic lives in `/features/{domain}/hooks`

**Current State:**
```
/context
├── EventContext.tsx          → Mock data, business logic
├── SponsorContext.tsx        → Mock data, business logic
└── BrandShootContext.tsx     → Business logic
```

**Issues:**
- Business logic in contexts
- Mock data instead of Supabase
- No clear domain boundaries
- Hard to test

**Target State:**
```
/features
├── /events
│   ├── /hooks
│   │   ├── useEvents.ts      → Fetch from Supabase
│   │   ├── useEventMutations.ts
│   │   └── useEventAI.ts
│   └── /services
│       └── eventsApi.ts      → Supabase queries
└── /sponsors
    ├── /hooks
    └── /services
```

**Priority:** 🔴 CRITICAL  
**Effort:** 6 hours

---

### ⚠️ VIOLATION 3: Components Directory Bloat

**Rule:** `/components` = pure UI only, no business logic

**Current State:**
```
/components
├── /dashboards (21 files)    → Some have business logic
├── /wizards (6 files)        → Some fetch data
├── /brand-shoot (6 files)    → Business logic mixed in
├── /events (?)               → Unknown structure
├── /tasks (?)
├── /sponsors (?)
└── /ui (52 files)            → ✅ Correct (shadcn)
```

**Issues:**
- Business logic in dashboard components
- Wizard components fetch data directly
- No separation of concerns

**Target State:**
```
/components
├── /ui                       → shadcn primitives
└── /shared                   → Pure UI only
    ├── LoadingSkeleton.tsx
    ├── ErrorState.tsx
    └── EmptyState.tsx

/features
├── /events/components        → Event-specific UI
└── /sponsors/components      → Sponsor-specific UI
```

**Priority:** 🟡 HIGH  
**Effort:** 4 hours

---

### ⚠️ VIOLATION 4: No `/screens` Directory

**Rule:** Screens tied 1:1 to routes, compose features

**Current State:**
```
/ (root)
├── App.tsx
├── AppHome.tsx
├── HomePageV2.tsx
├── HomePageV3.tsx
├── Events.tsx
├── EventDetail.tsx
├── Services.tsx
├── Clothing.tsx
├── Product.tsx
├── ... (40+ more page components at root)
```

**Issues:**
- Pages scattered at root level
- No clear routing relationship
- Hard to find files

**Target State:**
```
/screens
├── /public
│   ├── Home.tsx              (was HomePageV3.tsx)
│   ├── Services.tsx
│   └── Login.tsx
├── /events
│   ├── EventsList.tsx        (was Events.tsx)
│   └── EventDetail.tsx
└── /dashboards
    ├── CommandCenter.tsx
    └── TasksKanban.tsx
```

**Priority:** 🟡 MEDIUM  
**Effort:** 2 hours (just moving files)

---

### ✅ COMPLIANCE: `/lib` Structure

**Current State:**
```
/lib
├── /supabase
│   ├── client.ts             ✅
│   ├── queries.ts            ✅
│   ├── storage.ts            ✅
│   └── types.ts              ✅
├── /ai
│   ├── gemini.ts             ✅
│   ├── orchestrator.ts       ✅
│   └── /agents               ✅
└── /validation
    └── schemas.ts            ✅
```

**Status:** ✅ CORRECT — follows rules

---

### ✅ COMPLIANCE: `/components/ui` (shadcn)

**Current State:**
```
/components/ui (52 components)
├── button.tsx                ✅
├── input.tsx                 ✅
├── dialog.tsx                ✅
└── ... (all correct)
```

**Status:** ✅ CORRECT — pure UI primitives

---

## MIGRATION ROADMAP

### Phase 1: Routing (8 hours) — CRITICAL
**Goal:** Replace switch statement with React Router

**Tasks:**
1. Install React Router v6 (10 min)
2. Create `/routes` directory (30 min)
3. Define route structure (1 hour)
4. Create layouts (2 hours)
5. Wire up routes (3 hours)
6. Test all routes (1.5 hours)

**Deliverables:**
- `/routes/index.tsx`
- `/routes/public.tsx`
- `/routes/app.tsx`
- `/layouts/PublicLayout.tsx`
- `/layouts/AppLayout.tsx`

**Verification:**
- [ ] Deep links work
- [ ] Browser back/forward works
- [ ] Can bookmark URLs
- [ ] No console errors

---

### Phase 2: Features Extraction (6 hours) — CRITICAL
**Goal:** Move business logic from contexts to features

**Tasks:**
1. Create `/features` directory structure (30 min)
2. Migrate EventContext → `/features/events` (2 hours)
3. Migrate SponsorContext → `/features/sponsors` (2 hours)
4. Migrate BrandShootContext → `/features/campaigns` (1.5 hours)

**Deliverables:**
- `/features/events/hooks/useEvents.ts`
- `/features/events/services/eventsApi.ts`
- `/features/sponsors/hooks/useSponsors.ts`
- `/features/campaigns/hooks/useCampaign.ts`

**Verification:**
- [ ] All hooks use Supabase (no mock data)
- [ ] Data persists on refresh
- [ ] Real-time updates work
- [ ] Components use hooks, not contexts

---

### Phase 3: Component Reorganization (4 hours) — HIGH
**Goal:** Separate pure UI from feature-specific components

**Tasks:**
1. Audit each component (1 hour)
2. Move feature-specific to `/features/{domain}/components` (2 hours)
3. Keep only pure UI in `/components/shared` (1 hour)

**Deliverables:**
- `/components/shared` (10-15 files max)
- `/features/events/components/EventCard.tsx`
- `/features/sponsors/components/SponsorPipeline.tsx`

**Verification:**
- [ ] `/components/shared` has no business logic
- [ ] Feature components grouped by domain
- [ ] Components accept props, never fetch data

---

### Phase 4: Screens Organization (2 hours) — MEDIUM
**Goal:** Move page components to `/screens`

**Tasks:**
1. Create `/screens` directory (10 min)
2. Move pages to appropriate subdirectories (1 hour)
3. Update imports (50 min)

**Deliverables:**
- `/screens/public/Home.tsx`
- `/screens/events/EventsList.tsx`
- `/screens/dashboards/CommandCenter.tsx`

**Verification:**
- [ ] All screens in `/screens`
- [ ] Screens tied 1:1 to routes
- [ ] No page components at root

---

## PRIORITY MATRIX

```
┌──────────────────────────────────────┐
│ CRITICAL (Do First)                 │
├──────────────────────────────────────┤
│ 1. React Router migration      8h   │
│ 2. Features extraction         6h   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ HIGH (Do This Week)                  │
├──────────────────────────────────────┤
│ 3. Component reorganization    4h   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ MEDIUM (Do Next Week)                │
├──────────────────────────────────────┤
│ 4. Screens organization        2h   │
└──────────────────────────────────────┘

Total: 20 hours
```

---

## BEFORE/AFTER COMPARISON

### File Organization

**Before:**
```
/ (root)
├── App.tsx (350+ lines)
├── AppHome.tsx
├── HomePageV2.tsx
├── HomePageV3.tsx
├── Events.tsx
├── EventDetail.tsx
├── ... (40+ more pages)
├── /components (200+ files, mixed concerns)
├── /context (3 files with mock data)
└── /lib (organized ✅)
```

**After:**
```
/src
├── App.tsx (5 lines: just renders <AppRouter />)
├── /routes (4 files)
├── /layouts (3 files)
├── /screens (30 files, organized)
├── /features (6 domains, ~50 files)
├── /components/ui (52 files ✅)
├── /components/shared (15 files, pure UI)
├── /services (5 files)
└── /lib (organized ✅)
```

---

### Routing

**Before:**
```tsx
// Manual switch statement
const [activeScreen, setActiveScreen] = useState("home");

const renderContent = () => {
  switch (activeScreen) {
    case "events": return <Events />;
    // ... 80+ cases
  }
};
```

**After:**
```tsx
// React Router
<Routes>
  <Route path="/events" element={<EventsList />} />
  <Route path="/events/:id" element={<EventDetail />} />
</Routes>
```

**Benefits:**
- ✅ Deep linking
- ✅ Browser navigation
- ✅ Bookmarkable URLs
- ✅ Code splitting

---

### Data Fetching

**Before:**
```tsx
// EventContext.tsx
const [events, setEvents] = useState<Event[]>([
  // Mock data hardcoded
  { id: '1', name: 'Spring Show', ... },
  { id: '2', name: 'Fall Gala', ... }
]);
```

**After:**
```tsx
// /features/events/hooks/useEvents.ts
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await eventsApi.getAll();
      setEvents(data);
    };
    
    fetchEvents();
    
    // Real-time subscription
    const sub = eventsApi.subscribe(payload => {
      // Update events
    });
    
    return () => sub.unsubscribe();
  }, []);
  
  return { events };
}
```

**Benefits:**
- ✅ Real data from Supabase
- ✅ Real-time updates
- ✅ Data persists on refresh
- ✅ Testable

---

### Component Separation

**Before:**
```tsx
// /components/dashboards/CommandCenter.tsx
export function CommandCenter() {
  const [event, setEvent] = useState();
  
  useEffect(() => {
    // Fetch data inside component (bad)
    supabase.from('events').select('*').then(...)
  }, []);
  
  return <div>...</div>;
}
```

**After:**
```tsx
// /screens/dashboards/CommandCenter.tsx
export function CommandCenter() {
  const { event, loading, error } = useEvent(eventId); // Feature hook
  
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState />;
  
  return (
    <>
      <EventHeader event={event} />      {/* Pure UI */}
      <MetricsGrid event={event} />      {/* Pure UI */}
      <TasksPreview eventId={event.id} /> {/* Feature component */}
    </>
  );
}

// /features/events/components/TasksPreview.tsx
export function TasksPreview({ eventId }) {
  const { tasks } = useTasks({ eventId, limit: 5 });
  return <TaskList tasks={tasks} />;
}
```

**Benefits:**
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Easier testing
- ✅ Clearer dependencies

---

## COMPLIANCE SCORECARD

```
✅ /lib structure                    100% ✅
✅ /components/ui (shadcn)           100% ✅
⚠️ /components (other)                40% ⚠️
❌ /routes                             0% ❌
❌ /layouts                            0% ❌
❌ /screens                            0% ❌
❌ /features                           0% ❌
⚠️ /contexts (should be /features)    30% ⚠️

OVERALL: 35% Compliant
```

---

## VERIFICATION CHECKLIST

After migration, verify:

### Routing
- [ ] All routes work: `/`, `/events`, `/events/:id`, etc.
- [ ] Deep links work (copy URL, paste in new tab)
- [ ] Browser back/forward works
- [ ] 404 page shows for invalid routes
- [ ] Redirects work (e.g., `/` → `/dashboard` if logged in)

### Features
- [ ] No mock data anywhere
- [ ] All data fetched from Supabase
- [ ] Real-time updates work
- [ ] Data persists on refresh
- [ ] Forms save to database

### Components
- [ ] `/components/shared` has no business logic
- [ ] Feature components in `/features/{domain}/components`
- [ ] All components accept props (don't fetch data)
- [ ] Loading/error/empty states everywhere

### Structure
- [ ] Can find any file in <10 seconds
- [ ] Clear domain boundaries
- [ ] No circular dependencies
- [ ] Build succeeds with no warnings

---

## NEXT STEPS

1. **Week 1:** Complete Phase 1 (React Router) + Phase 2 (Features)
2. **Week 2:** Complete Phase 3 (Components) + Phase 4 (Screens)
3. **Week 3:** Verification + documentation updates

**Total Time:** 20 hours over 2 weeks

**Blocker:** Must complete Phases 1-2 before adding new features
