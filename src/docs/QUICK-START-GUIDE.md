# Quick Start Guide - FashionOS Development

**Last Updated:** December 20, 2024  
**Current Status:** Phase 1 Complete (UI States)  
**Next Phase:** Backend Infrastructure

---

## 🚀 GETTING STARTED

### 1. Review Current State (15 min)

Read these 3 documents in order:

1. **PHASE-1-COMPLETE-SUMMARY.md** ← START HERE
   - Understand what's been built
   - See component inventory (22 components)
   - Review quality metrics

2. **PRODUCTION-READINESS-ROADMAP.md**
   - Master implementation plan
   - 6-week timeline
   - Critical gaps identified

3. **IMPLEMENTATION-STATUS.md**
   - Real-time progress tracking
   - Next steps sequenced
   - Time estimates

### 2. Test Current Components (10 min)

```bash
# Run the dev server
npm run dev

# Navigate to the demo page
# (You may need to add a route for /demo first)
# Or import UIStatesDemo in your App.tsx
```

**View Demo Component:**
```tsx
// In App.tsx or create a new route
import UIStatesDemo from './components/UIStatesDemo';

// Navigate to see all 22 components in action
```

### 3. Understand File Structure (5 min)

```
/components/
├── shared/
│   ├── EmptyState.tsx          ← Base empty state
│   ├── LoadingSkeleton.tsx     ← 8 skeleton variants
│   └── ErrorState.tsx          ← 5 error variants
├── dashboards/
│   └── empty-states/
│       ├── EventsEmptyState.tsx
│       ├── SponsorsEmptyState.tsx
│       ├── TasksEmptyState.tsx
│       ├── GalleryEmptyState.tsx
│       ├── BudgetEmptyState.tsx
│       ├── ContractsEmptyState.tsx
│       ├── SearchEmptyState.tsx
│       └── index.ts            ← Import all from here
└── UIStatesDemo.tsx            ← Interactive showcase

/context/
├── EventContext.tsx            ← ⚠️ MOCK DATA (needs rewrite)
├── BrandShootContext.tsx       ← ⚠️ localStorage (needs Supabase)
└── SponsorContext.tsx          ← ❌ DOES NOT EXIST (needs creation)

/docs/
├── PHASE-1-COMPLETE-SUMMARY.md      ← Read first
├── PRODUCTION-READINESS-ROADMAP.md  ← Master plan
├── IMPLEMENTATION-STATUS.md         ← Progress tracker
└── progress/
    ├── 04-progress-tasks.md         ← Design vs Engineering matrix
    ├── 05-cursor-prompts.md         ← Copy-paste engineering tasks
    └── 05-figma-prompts.md          ← ⚠️ Corrupted (needs repair)
```

---

## 🎯 WHAT TO DO NEXT (Sequential)

### TODAY: Set Up Database (4 hours)

#### Step 1: Create Supabase Project (30 min)

```bash
# 1. Go to https://supabase.com
# 2. Sign up / Log in
# 3. Click "New Project"
# 4. Fill in:
#    - Name: fashionos-dev (or your choice)
#    - Database Password: (save this!)
#    - Region: Choose closest to you
# 5. Wait for project to initialize (~2 min)
# 6. Go to Settings > API
# 7. Copy:
#    - Project URL
#    - anon public key
```

#### Step 2: Configure Environment (5 min)

```bash
# Create .env.local in project root
touch .env.local
```

```env
# Add these to .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Step 3: Install Supabase Client (5 min)

```bash
npm install @supabase/supabase-js
```

#### Step 4: Create Supabase Client (10 min)

Create `/lib/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### Step 5: Create Database Schema (3 hours)

**Option A: SQL Editor (Recommended)**

1. Go to Supabase Dashboard > SQL Editor
2. Copy schema from `/docs/progress/05-cursor-prompts.md` (Task 29)
3. Paste into SQL Editor
4. Click "Run"
5. Verify tables created in Table Editor

**Option B: Migrations**

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize migrations
supabase init

# Create migration file
supabase migration new initial_schema

# Copy schema SQL to migration file
# Run migration
supabase db push
```

**Schema includes 14 tables:**
- users
- organizations
- events
- tasks
- phases
- sponsors
- campaigns
- website_projects
- designer_profiles
- assets
- budgets
- contracts
- newsletter_subscribers
- contact_submissions

#### Step 6: Add Seed Data (30 min)

Create test data:

```sql
-- In Supabase SQL Editor
-- Add 1 test organization
INSERT INTO organizations (name, slug, plan)
VALUES ('Test Organization', 'test-org', 'pro');

-- Add 1 test user
INSERT INTO users (email, full_name, role)
VALUES ('test@example.com', 'Test User', 'organizer');

-- Add 1 test event
INSERT INTO events (name, description, start_date, status, organization_id)
VALUES ('NYFW SS25', 'New York Fashion Week', '2025-09-15', 'planning', 
        (SELECT id FROM organizations WHERE slug = 'test-org'));
```

#### Step 7: Test Connection (10 min)

Create `/pages/test-db.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/client';

export default function TestDB() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('*');
      
      if (error) setError(error.message);
      else setEvents(data);
    }
    fetchEvents();
  }, []);

  return (
    <div className="p-8">
      <h1>Database Test</h1>
      {error && <p className="text-red-600">Error: {error}</p>}
      {events.length === 0 && <p>No events found</p>}
      {events.map((event) => (
        <div key={event.id} className="border p-4 mb-2">
          <h2>{event.name}</h2>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}
```

Navigate to `/test-db` and verify you see your test event.

---

### TOMORROW: Rewrite Contexts (8 hours)

#### Step 1: Rewrite EventContext (6 hours)

**Current State:** 100% mock data (lines 32-137)  
**Goal:** Replace with Supabase queries

**File:** `/context/EventContext.tsx`

**Tasks:**
1. Replace MOCK_EVENT with Supabase query
2. Replace MOCK_TASKS with Supabase query
3. Replace MOCK_PHASES with Supabase query
4. Add real CRUD operations:
   - createEvent → INSERT into events
   - updateEvent → UPDATE events
   - addTask → INSERT into tasks
   - updateTask → UPDATE tasks
   - deleteTask → DELETE from tasks
5. Add realtime subscriptions for tasks
6. Add error handling with ErrorState component
7. Add loading states with LoadingSkeleton
8. Test thoroughly

**Reference:** See Task 34 in `/docs/progress/05-cursor-prompts.md`

#### Step 2: Create SponsorContext (4 hours)

**Current State:** Does not exist  
**Goal:** Create from scratch with Supabase

**File:** `/context/SponsorContext.tsx` (NEW)

**Tasks:**
1. Define TypeScript types (Sponsor interface)
2. Create context structure
3. Add Supabase queries:
   - fetchSponsors
   - createSponsor
   - updateSponsor
   - deleteSponsor
4. Add pipeline movement logic
5. Add fit score calculation
6. Add realtime subscriptions
7. Test CRUD operations

---

### THIS WEEK: Validation + UI States (12 hours)

#### Step 1: Add Validation (6 hours)

```bash
# Install dependencies
npm install zod react-hook-form@7.55.0 @hookform/resolvers
```

**Create:** `/lib/validation/schemas.ts`

**Schemas needed:**
1. brandShootSchema (Brand Shoot Wizard)
2. designerProfileSchema (Designer Wizard)
3. websiteProjectSchema (Website Wizard)
4. eventSchema (Event Creation)
5. taskSchema (Task CRUD)
6. sponsorSchema (Sponsor CRUD)
7. contactSchema (Contact form)
8. newsletterSchema (Newsletter signup)
9. fileSchema (File upload validation)

**Reference:** See Task 41 in `/docs/progress/05-cursor-prompts.md`

#### Step 2: Complete Remaining UI States (6 hours)

**Design Tasks:**
1. Success screens (6 wizards) - 2h
2. Upload states (4 variants) - 1.5h
3. Progress indicators (3 styles) - 1h
4. Modal library (4 templates) - 2h (optional)

**Reference:** See Tasks 5-8 in `/docs/progress/05-figma-prompts.md`

---

## 📚 COPY-PASTE CODE SNIPPETS

### Import Empty States

```tsx
import {
  EventsEmptyState,
  SponsorsEmptyState,
  TasksEmptyState,
  GalleryEmptyState,
  BudgetEmptyState,
  ContractsEmptyState,
  SearchEmptyState,
} from '@/components/dashboards/empty-states';
```

### Import Loading Skeletons

```tsx
import {
  CardSkeleton,
  TableSkeleton,
  ListItemSkeleton,
  ChartSkeleton,
  HeaderSkeleton,
  DashboardSkeleton,
} from '@/components/shared/LoadingSkeleton';
```

### Import Error States

```tsx
import {
  ErrorState,
  FailedToLoadError,
  OfflineError,
  PermissionDeniedError,
  ServerError,
} from '@/components/shared/ErrorState';
```

### Typical Dashboard Pattern

```tsx
function MyDashboard() {
  const { data, isLoading, error, refetch } = useQuery();

  // Loading state
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Error state
  if (error) {
    return <FailedToLoadError onRetry={refetch} />;
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <EventsEmptyState
        onCreateEvent={() => navigate('/events/new')}
        onLearnMore={() => navigate('/docs/events')}
      />
    );
  }

  // Success state (render data)
  return <DataGrid data={data} />;
}
```

---

## 🔧 TROUBLESHOOTING

### Supabase Connection Issues

**Problem:** "Failed to connect to Supabase"

```typescript
// Check environment variables
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing');

// Test direct connection
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('your-url', 'your-key');
const { data, error } = await supabase.from('events').select('*');
console.log({ data, error });
```

**Solution:**
1. Verify .env.local exists in project root
2. Restart dev server after adding env vars
3. Check Supabase project is not paused
4. Verify API keys are correct

### TypeScript Errors

**Problem:** "Cannot find module '@/components/...'"

**Solution:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Component Import Issues

**Problem:** "Component is not exported"

**Solution:** Check the index.ts barrel export:
```typescript
// /components/dashboards/empty-states/index.ts
export { EventsEmptyState } from './EventsEmptyState';
// ... etc
```

---

## 📞 SUPPORT

### Documentation

- **Phase 1 Summary:** `/docs/PHASE-1-COMPLETE-SUMMARY.md`
- **Master Roadmap:** `/docs/PRODUCTION-READINESS-ROADMAP.md`
- **Progress Tracker:** `/docs/IMPLEMENTATION-STATUS.md`
- **Engineering Tasks:** `/docs/progress/05-cursor-prompts.md`

### Component Demos

- **Interactive Demo:** Run dev server and import `UIStatesDemo`
- **Storybook:** (Not set up yet - TODO)

### Questions?

- Check documentation first
- Review component JSDoc comments
- Test with UIStatesDemo component
- Verify types with TypeScript IntelliSense

---

## ✅ CHECKLIST

### Before You Start Coding

- [ ] Read PHASE-1-COMPLETE-SUMMARY.md
- [ ] Review PRODUCTION-READINESS-ROADMAP.md
- [ ] Understand current architecture
- [ ] Test existing components (UIStatesDemo)
- [ ] Supabase account ready
- [ ] Dependencies installed

### After Setting Up Database

- [ ] Supabase project created
- [ ] .env.local configured
- [ ] Supabase client working
- [ ] 14 tables created
- [ ] RLS policies set
- [ ] Seed data added
- [ ] Test query successful

### After Rewriting Contexts

- [ ] EventContext uses Supabase
- [ ] SponsorContext created
- [ ] CRUD operations tested
- [ ] Realtime subscriptions work
- [ ] Error handling added
- [ ] Loading states integrated

### Weekly Goals

- [ ] Week 1: Database + Contexts (CURRENT)
- [ ] Week 2: Validation + Dashboard Integration
- [ ] Week 3: Wizard Completion + File Uploads
- [ ] Week 4: AI Features Implementation
- [ ] Week 5: Auth + Security
- [ ] Week 6: Testing + Deployment

---

## 🎯 SUCCESS CRITERIA

### End of Week 1 (December 27)

- ✅ Database fully functional (14 tables)
- ✅ All contexts wired to Supabase
- ✅ Forms validated (9 Zod schemas)
- ✅ All UI states complete (empty/loading/error/success)
- ✅ Basic CRUD working end-to-end
- ✅ No more mock data

**Progress Target:** 70% (MVP)

### End of Month (December 31)

- ✅ All dashboards functional
- ✅ All wizards complete
- ✅ File uploads working
- ✅ Basic auth implemented
- ✅ AI features (at least 3/5)
- ✅ Deployed to staging

**Progress Target:** 85% (Beta)

---

**Good luck! You've got this! 🚀**

*Questions? Check the documentation or test with UIStatesDemo.*
