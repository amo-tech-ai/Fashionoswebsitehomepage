# Directory Structure & Routing Rules — FashionOS
## Scalable, Predictable, Production-Safe Organization

**Last Updated:** December 20, 2024  
**Status:** ⚠️ Current structure violates these rules — migration needed

---

## CORE PRINCIPLE

**Structure follows user journeys, not developer preference.**

Every route maps to **one screen, one purpose, one primary action**.

- `/events` → See all events
- `/events/create` → Create new event
- `/events/:id` → View event details
- `/events/:id/edit` → Edit event

**Not:**
- `/events?mode=create` (state in URL)
- `/event-detail/:id` (inconsistent naming)
- `/dashboard/events/overview` (over-nested)

---

## DIRECTORY RULES (NON-NEGOTIABLE)

### Top-Level Structure

```
/src
├── routes/              → Route definitions, guards, grouping
├── layouts/             → Route-level layouts (Public, App, Wizard)
├── screens/             → Full pages tied 1:1 to routes
├── features/            → Feature logic (data, actions, AI)
├── components/          → Reusable UI only (NO business logic)
├── services/            → API + Edge Function clients
├── ai/                  → Agents, prompts, schemas
├── lib/                 → Shared utilities, config, types
├── types/               → Shared TypeScript types
├── assets/              → Static files (images, fonts)
└── docs/                → Rules and specifications
```

---

### Ownership Rules

```
Routes own screens
    ↓
Screens compose features
    ↓
Features own logic, data, AI actions
    ↓
Components never own logic
```

**Golden Rule:** If you don't know where something belongs → it goes in `features/`.

---

### Detailed Structure

#### `/routes` — Route Definitions
```
/routes
├── index.tsx            → Root router setup
├── public.tsx           → Public routes (marketing, auth)
├── app.tsx              → Authenticated app routes
├── wizards.tsx          → Multi-step wizard routes
├── guards/
│   ├── AuthGuard.tsx    → Requires authentication
│   ├── RoleGuard.tsx    → Requires specific role
│   └── FeatureGuard.tsx → Requires feature flag
└── RouteConfig.ts       → Centralized route constants
```

**Rules:**
- Routes NEVER contain UI
- Routes only define paths + guards
- Routes import screens, not components

---

#### `/layouts` — Route-Level Layouts

```
/layouts
├── PublicLayout.tsx     → Marketing pages, no auth required
├── AppLayout.tsx        → Main app (sidebar, header, footer)
├── WizardLayout.tsx     → Multi-step flows (progress bar, back/next)
├── DashboardLayout.tsx  → Dashboard-specific layout
└── MinimalLayout.tsx    → Full-screen (login, 404, etc.)
```

**Rules:**
- Layouts wrap routes, never duplicated inside screens
- Navigation defined at layout level
- Layouts handle global state (sidebar open/closed)
- Layouts show auth status, notifications

---

#### `/screens` — Full Pages (1:1 with Routes)

```
/screens
├── public/
│   ├── Home.tsx                    → /
│   ├── Services.tsx                → /services
│   ├── Login.tsx                   → /login
│   └── Signup.tsx                  → /signup
├── events/
│   ├── EventsList.tsx              → /events
│   ├── EventDetail.tsx             → /events/:id
│   ├── EventCreate.tsx             → /events/create
│   └── EventEdit.tsx               → /events/:id/edit
├── sponsors/
│   ├── SponsorsList.tsx            → /sponsors
│   ├── SponsorDetail.tsx           → /sponsors/:id
│   └── SponsorCreate.tsx           → /sponsors/create
├── tasks/
│   ├── TasksKanban.tsx             → /tasks
│   └── TaskDetail.tsx              → /tasks/:id
├── dashboards/
│   ├── CommandCenter.tsx           → /dashboard
│   ├── Analytics.tsx               → /analytics
│   └── Gallery.tsx                 → /gallery
└── wizards/
    ├── EventWizard.tsx             → /wizards/event
    ├── BrandShootWizard.tsx        → /wizards/brand-shoot
    └── DesignerWizard.tsx          → /wizards/designer
```

**Rules:**
- Screen = 1 route purpose
- Screens compose features (data, actions, AI)
- Screens handle loading/error/empty states
- Screens never have business logic (delegate to features)

**Screen Template:**
```tsx
// EventsList.tsx
export function EventsList() {
  const { events, loading, error } = useEvents(); // Feature hook

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;
  if (events.length === 0) return <EmptyState />;

  return (
    <>
      <EventsHeader />
      <EventsFilters />
      <EventsGrid events={events} />
    </>
  );
}
```

---

#### `/features` — Feature Logic (Data, Actions, AI)

```
/features
├── events/
│   ├── hooks/
│   │   ├── useEvents.ts            → Fetch, subscribe, cache
│   │   ├── useEventMutations.ts    → Create, update, delete
│   │   └── useEventAI.ts           → AI task generation
│   ├── components/
│   │   ├── EventCard.tsx           → Event-specific UI
│   │   ├── EventFilters.tsx
│   │   └── EventForm.tsx
│   ├── services/
│   │   ├── eventsApi.ts            → Supabase queries
│   │   └── eventsAI.ts             → AI agent calls
│   ├── types.ts
│   ├── validation.ts               → Zod schemas
│   └── index.ts                    → Public exports
├── sponsors/
│   ├── hooks/
│   │   ├── useSponsors.ts
│   │   └── useSponsorAI.ts
│   ├── components/
│   │   ├── SponsorCard.tsx
│   │   └── SponsorPipeline.tsx
│   ├── services/
│   │   ├── sponsorsApi.ts
│   │   └── sponsorsAI.ts
│   ├── types.ts
│   └── index.ts
└── tasks/
    ├── hooks/
    ├── components/
    ├── services/
    └── index.ts
```

**Rules:**
- Feature = self-contained domain (events, sponsors, tasks)
- Features expose hooks, never direct API calls
- Features handle their own AI logic
- Features validate their own data
- Components inside features are feature-specific

**Feature Hook Example:**
```tsx
// /features/events/hooks/useEvents.ts
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await eventsApi.getAll();
      if (error) setError(error);
      else setEvents(data);
      setLoading(false);
    };

    fetchEvents();

    // Real-time subscription
    const subscription = eventsApi.subscribe((payload) => {
      // Update events array
    });

    return () => subscription.unsubscribe();
  }, []);

  return { events, loading, error };
}
```

---

#### `/components` — Reusable UI Only

```
/components
├── ui/                  → shadcn/ui primitives
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ...
├── shared/              → App-wide shared components
│   ├── AppShell.tsx
│   ├── NavigationBar.tsx
│   ├── LoadingSkeleton.tsx
│   ├── ErrorState.tsx
│   ├── EmptyState.tsx
│   └── Modal.tsx
├── forms/               → Generic form components
│   ├── FormField.tsx
│   ├── FormSelect.tsx
│   └── FormDatePicker.tsx
└── data-display/        → Generic data display
    ├── DataTable.tsx
    ├── StatCard.tsx
    └── ChartWrapper.tsx
```

**Rules:**
- Components are **pure UI** (no business logic)
- Components accept props, never fetch data
- Components are feature-agnostic
- Components never import from `/features`

**Component Example:**
```tsx
// LoadingSkeleton.tsx (reusable)
export function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton h-20 w-full" />
      ))}
    </div>
  );
}

// ❌ BAD — has business logic
export function EventsSkeleton() {
  const { events } = useEvents(); // NO! Fetching data
  return <div>...</div>;
}

// ✅ GOOD — pure UI
export function EventsSkeleton({ count = 3 }) {
  return <LoadingSkeleton rows={count} />;
}
```

---

#### `/services` — API Clients

```
/services
├── supabase/
│   ├── client.ts        → Supabase client singleton
│   ├── auth.ts          → Auth methods
│   ├── storage.ts       → File storage
│   └── realtime.ts      → Real-time subscriptions
├── ai/
│   ├── gemini.ts        → Gemini API client
│   └── edgeFunctions.ts → AI Edge Function calls
└── external/
    ├── unsplash.ts      → Image search
    └── maps.ts          → Maps API
```

**Rules:**
- Services are pure API clients
- Services don't know about UI
- Services return raw data (no transformation)
- Features transform service data for UI

---

#### `/ai` — AI Agents & Prompts

```
/ai
├── agents/
│   ├── Orchestrator.ts          → Routes AI requests
│   ├── EventPlannerAgent.ts
│   ├── SponsorIntelligenceAgent.ts
│   └── BrandShootAgent.ts
├── prompts/
│   ├── eventPlanning.ts         → Prompt templates
│   ├── sponsorScoring.ts
│   └── brandAnalysis.ts
├── schemas/
│   ├── taskSchema.ts            → Structured output schemas
│   ├── sponsorSchema.ts
│   └── brandSchema.ts
├── types.ts
└── config.ts                    → AI model configs
```

**Rules:**
- AI agents are called by features, not screens
- Prompts are versioned templates
- Schemas define exact output structure
- Config centralizes model selection

---

## ROUTING RULES

### Route Design Principles

1. **One route = one screen purpose**
   ```
   ✅ /events → List all events
   ✅ /events/create → Create event
   ✅ /events/:id → View event
   ❌ /events?action=create → State in URL
   ```

2. **Routes reflect user workflows**
   ```
   ✅ /sponsors → /sponsors/:id → /sponsors/:id/edit
   ❌ /crm → /customer-detail → /update-customer
   ```

3. **Layouts wrap routes**
   ```tsx
   <AppLayout>
     <Routes>
       <Route path="/events" element={<EventsList />} />
     </Routes>
   </AppLayout>
   ```

4. **URLs are human-readable and stable**
   ```
   ✅ /events/spring-fashion-week-2024
   ✅ /sponsors/chanel
   ❌ /e/123abc
   ❌ /view?type=sponsor&id=456
   ```

5. **Params = identity, Query = state**
   ```
   /events/:id → Identity (which event)
   /events?filter=active&sort=date → State (how to display)
   ```

---

### Route Groups

#### Public Routes (No Auth)
```tsx
// /routes/public.tsx
<PublicLayout>
  <Route path="/" element={<Home />} />
  <Route path="/services" element={<Services />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
</PublicLayout>
```

#### App Routes (Requires Auth)
```tsx
// /routes/app.tsx
<AuthGuard>
  <AppLayout>
    <Route path="/dashboard" element={<CommandCenter />} />
    <Route path="/events" element={<EventsList />} />
    <Route path="/events/:id" element={<EventDetail />} />
    <Route path="/sponsors" element={<SponsorsList />} />
    <Route path="/tasks" element={<TasksKanban />} />
  </AppLayout>
</AuthGuard>
```

#### Wizard Routes (Multi-Step)
```tsx
// /routes/wizards.tsx
<WizardLayout>
  <Route path="/wizards/event/*" element={<EventWizard />} />
  <Route path="/wizards/brand-shoot/*" element={<BrandShootWizard />} />
</WizardLayout>
```

---

### Navigation Rules

1. **UI controls navigation**
   ```tsx
   // ✅ Explicit navigation
   <Button onClick={() => navigate('/events/create')}>
     Create Event
   </Button>

   // ❌ Hidden navigation
   <div onClick={handleClick}>Click me</div> // Where does it go?
   ```

2. **User always knows:**
   - Where they are (breadcrumbs, active nav)
   - What to do next (CTAs, empty states)
   - How to go back (back button, cancel)

3. **Deep links work**
   ```tsx
   // ✅ User can bookmark this
   /events/spring-2024/tasks?filter=critical

   // ❌ Requires session state
   /wizard/step-3 (only works if you started at step 1)
   ```

4. **Back/forward browser buttons work**
   - No broken states
   - No lost data (use query params or session storage)

---

## LAYOUT RULES

### Public Layout
```tsx
// /layouts/PublicLayout.tsx
export function PublicLayout({ children }) {
  return (
    <div>
      <PublicHeader /> {/* Logo, Login button */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

**Used for:**
- Marketing pages
- Login/Signup
- Public docs

---

### App Layout
```tsx
// /layouts/AppLayout.tsx
export function AppLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Main navigation */}
      <div className="flex-1 overflow-auto">
        <Header /> {/* Search, notifications, user menu */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

**Used for:**
- All authenticated screens
- Dashboards, lists, detail pages

---

### Wizard Layout
```tsx
// /layouts/WizardLayout.tsx
export function WizardLayout({ children, currentStep, totalSteps }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <WizardHeader /> {/* Logo, Save & Exit */}
      <ProgressBar current={currentStep} total={totalSteps} />
      <main className="max-w-4xl mx-auto py-12">
        {children}
      </main>
      <WizardFooter /> {/* Back, Next buttons */}
    </div>
  );
}
```

**Used for:**
- Multi-step flows (Event Wizard, Brand Shoot Wizard)
- Onboarding

---

### Dashboard Layout
```tsx
// /layouts/DashboardLayout.tsx
export function DashboardLayout({ children, title, actions }) {
  return (
    <div>
      <DashboardHeader title={title} actions={actions} />
      <div className="grid grid-cols-12 gap-6">
        {children}
      </div>
    </div>
  );
}
```

**Used for:**
- Command Center, Analytics dashboards

---

## AI + ROUTING RULES

### 1. AI Never Changes Routes Automatically
```tsx
// ❌ BAD — AI redirects user
const result = await aiGenerateTasks(eventId);
navigate('/tasks'); // User didn't ask to go here

// ✅ GOOD — AI output leads to clear next step
const result = await aiGenerateTasks(eventId);
showModal({
  title: "AI generated 120 tasks",
  actions: [
    { label: "View Tasks", onClick: () => navigate('/tasks') },
    { label: "Stay Here", onClick: closeModal }
  ]
});
```

---

### 2. Long AI Tasks Route to Status Screen
```tsx
// User triggers long-running AI task (30-60s)
<Button onClick={async () => {
  const jobId = await startDeepResearch(sponsorId);
  navigate(`/ai/status/${jobId}`); // Shows progress
}}>
  Research Sponsor
</Button>

// /screens/ai/AIStatus.tsx
export function AIStatus({ jobId }) {
  const { status, result } = useAIJob(jobId);
  
  if (status === 'running') return <ProgressIndicator />;
  if (status === 'complete') return <ResultsSummary result={result} />;
  if (status === 'error') return <ErrorState />;
}
```

---

### 3. AI Actions Belong to Features
```tsx
// /features/events/hooks/useEventAI.ts
export function useEventAI(eventId: string) {
  const generateTasks = async () => {
    const result = await eventsAI.generateTasks(eventId);
    return result;
  };

  const analyzeRisks = async () => {
    const result = await eventsAI.analyzeRisks(eventId);
    return result;
  };

  return { generateTasks, analyzeRisks };
}

// Screen uses it:
const { generateTasks } = useEventAI(eventId);
```

---

## STATES (MANDATORY)

Every screen must define:

### 1. Loading State
```tsx
if (loading) return <LoadingSkeleton rows={5} />;
```

### 2. Empty State
```tsx
if (events.length === 0) {
  return (
    <EmptyState
      icon={CalendarIcon}
      title="No events yet"
      description="Create your first luxury event"
      action={
        <Button onClick={() => navigate('/events/create')}>
          Create Event
        </Button>
      }
    />
  );
}
```

### 3. Error State
```tsx
if (error) {
  return (
    <ErrorState
      message={error}
      action={
        <Button onClick={retry}>Try Again</Button>
      }
    />
  );
}
```

### 4. Success State
```tsx
// Normal UI
return <EventsList events={events} />;
```

**No blank screens. Ever.**

---

## ROUTE CONSTANTS

```tsx
// /routes/RouteConfig.ts
export const ROUTES = {
  // Public
  HOME: '/',
  SERVICES: '/services',
  LOGIN: '/login',
  SIGNUP: '/signup',

  // App
  DASHBOARD: '/dashboard',
  EVENTS: '/events',
  EVENT_DETAIL: (id: string) => `/events/${id}`,
  EVENT_CREATE: '/events/create',
  EVENT_EDIT: (id: string) => `/events/${id}/edit`,
  
  SPONSORS: '/sponsors',
  SPONSOR_DETAIL: (id: string) => `/sponsors/${id}`,
  
  TASKS: '/tasks',
  TASK_DETAIL: (id: string) => `/tasks/${id}`,

  // Wizards
  WIZARD_EVENT: '/wizards/event',
  WIZARD_BRAND_SHOOT: '/wizards/brand-shoot',
  WIZARD_DESIGNER: '/wizards/designer',
} as const;

// Usage:
navigate(ROUTES.EVENT_DETAIL(eventId));
```

**Benefits:**
- Centralized route management
- Type-safe navigation
- Easy to refactor URLs

---

## MIGRATION FROM CURRENT STATE

### Current Issues (from Forensic Audit)

1. **❌ 250+ line switch statement in App.tsx**
2. **❌ Manual routing with `useState('activeScreen')`**
3. **❌ No React Router**
4. **❌ Components mixed with business logic**
5. **❌ No clear feature boundaries**

---

### Migration Steps

#### Phase 1: Install React Router
```bash
npm install react-router-dom@6
```

#### Phase 2: Create Route Structure
```tsx
// /routes/index.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* App (Authenticated) */}
        <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
          <Route path="/dashboard" element={<CommandCenter />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

#### Phase 3: Move Screens
```bash
# Move existing components to /screens
mv HomePageV3.tsx → /screens/public/Home.tsx
mv Events.tsx → /screens/events/EventsList.tsx
mv EventDetail.tsx → /screens/events/EventDetail.tsx
```

#### Phase 4: Extract Features
```bash
# Create feature directories
mkdir -p /features/events/{hooks,components,services}

# Extract hooks
# EventContext.tsx → /features/events/hooks/useEvents.ts
```

#### Phase 5: Update App.tsx
```tsx
// Before: 250 lines of switch/case
// After: 5 lines
import { AppRouter } from './routes';

export default function App() {
  return <AppRouter />;
}
```

---

## VALIDATION CHECK

This rule is followed if:

### ✅ Every URL maps to a screen
```bash
/events → /screens/events/EventsList.tsx
/sponsors/:id → /screens/sponsors/SponsorDetail.tsx
```

### ✅ Deep links work
```bash
# User can bookmark and share:
https://app.fashionos.com/events/spring-2024
https://app.fashionos.com/sponsors/chanel
```

### ✅ Back/forward navigation works
- Browser buttons don't break app
- State is preserved or restored

### ✅ New features don't require refactoring
```bash
# Adding new feature:
1. Create /features/budgets/
2. Create /screens/budgets/BudgetsList.tsx
3. Add route: <Route path="/budgets" element={<BudgetsList />} />
Done. No other files touched.
```

### ✅ No screen is a dead end
- Every screen has clear next action
- Empty states show "Create first X"
- Error states show "Try again"

---

## ANTI-PATTERNS (NEVER DO THIS)

### ❌ Business Logic in Components
```tsx
// BAD
export function EventCard({ eventId }) {
  const [event, setEvent] = useState();
  
  useEffect(() => {
    supabase.from('events').select('*').eq('id', eventId)
      .then(({ data }) => setEvent(data));
  }, [eventId]);
  
  return <div>{event?.name}</div>;
}
```

**Fix:** Use feature hook
```tsx
// GOOD
export function EventCard({ event }) {
  return <div>{event.name}</div>;
}

// Screen uses hook
const { event } = useEvent(eventId);
return <EventCard event={event} />;
```

---

### ❌ Routes in Multiple Files
```tsx
// BAD — routes scattered everywhere
// App.tsx has some routes
// EventsPage.tsx has nested routes
// SponsorCRM.tsx has more routes
```

**Fix:** Centralize in `/routes`

---

### ❌ Layouts Inside Screens
```tsx
// BAD
export function EventsList() {
  return (
    <div>
      <Sidebar /> {/* Layout duplicated */}
      <Header />
      <main>Events list</main>
    </div>
  );
}
```

**Fix:** Layout wraps route
```tsx
<AppLayout>
  <Route path="/events" element={<EventsList />} />
</AppLayout>
```

---

### ❌ Feature Code in `/components`
```tsx
// BAD — /components/EventCard.tsx
export function EventCard({ eventId }) {
  const { event } = useEvent(eventId); // Feature logic!
  return <div>...</div>;
}
```

**Fix:** Move to `/features/events/components/EventCard.tsx`

---

## FOLDER STRUCTURE EXAMPLE (CORRECT)

```
/src
├── /routes
│   ├── index.tsx                   → Main router
│   ├── public.tsx                  → Public routes
│   ├── app.tsx                     → App routes
│   └── RouteConfig.ts              → Route constants
│
├── /layouts
│   ├── PublicLayout.tsx
│   ├── AppLayout.tsx
│   └── WizardLayout.tsx
│
├── /screens
│   ├── /public
│   │   ├── Home.tsx
│   │   └── Login.tsx
│   ├── /events
│   │   ├── EventsList.tsx
│   │   ├── EventDetail.tsx
│   │   └── EventCreate.tsx
│   └── /sponsors
│       ├── SponsorsList.tsx
│       └── SponsorDetail.tsx
│
├── /features
│   ├── /events
│   │   ├── /hooks
│   │   │   ├── useEvents.ts
│   │   │   └── useEventAI.ts
│   │   ├── /components
│   │   │   ├── EventCard.tsx
│   │   │   └── EventFilters.tsx
│   │   ├── /services
│   │   │   ├── eventsApi.ts
│   │   │   └── eventsAI.ts
│   │   ├── types.ts
│   │   └── index.ts
│   └── /sponsors
│       ├── /hooks
│       ├── /components
│       └── /services
│
├── /components
│   ├── /ui (shadcn)
│   └── /shared (reusable, no logic)
│
├── /services
│   ├── /supabase
│   └── /ai
│
├── /ai
│   ├── /agents
│   ├── /prompts
│   └── /schemas
│
└── /lib
    ├── utils.ts
    └── config.ts
```

---

## SUCCESS CRITERIA

✅ **Developer can find any file in <10 seconds**  
✅ **New feature = new folder in `/features`, new file in `/screens`, new route**  
✅ **Routes are stable URLs users can bookmark**  
✅ **No business logic in `/components`**  
✅ **AI logic lives in features, not screens**  
✅ **Every screen has loading/error/empty states**  

**If any rule is violated, refactor before adding new features.**
