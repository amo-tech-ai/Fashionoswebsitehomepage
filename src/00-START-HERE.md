# 🚀 START HERE — FashionOS Developer Guide

**Last Updated:** December 20, 2024  
**Project Status:** 85% Complete, Ready for Database Setup

---

## ⚡ FIRST-TIME SETUP (5 Minutes)

### 1. Read These 3 Files (MANDATORY)
```bash
1. /SYSTEM_RULES.md           ← Single source of truth (5 min)
2. /SUCCESS_CRITERIA.md       ← Production checklist (3 min)
3. /FORENSIC_AUDIT.md         ← Current issues (2 min)
```

### 2. Understand Current State
- ✅ **UI:** 95% complete (excellent)
- ✅ **Database Schema:** 100% ready (8 tables defined)
- ❌ **Integration:** 20% complete (contexts use mock data)
- ❌ **Routing:** Manual switch statement (needs React Router)
- ⚠️ **Structure:** 35% compliant (needs reorganization)

### 3. Know the Rules
- `/rules/DIRECTORY-AND-ROUTING.md` → How code is organized
- `/rules/AGENTS.md` → How AI works in the system
- `/rules/ui-ux-design.md` → Design system & colors
- `/rules/supabase-backend.md` → Database patterns

---

## 🎯 YOUR FIRST 3 TASKS

### TASK 1: Create Supabase Project (1 hour)
```bash
# 1. Go to supabase.com → Create project "FashionOS"
# 2. Run schema:
#    Open /lib/supabase/schema/complete-schema.sql
#    Copy into Supabase SQL editor → Run
# 3. Add credentials:
echo "NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx" >> .env.local
# 4. Test:
npm run dev
# Check browser console: "Supabase connected ✓"
```

**Verification:** `/components/shared/SupabaseStatus.tsx` shows green

---

### TASK 2: Fix Contexts (6 hours)
```bash
# Replace mock data with Supabase queries
# See: /docs/SYSTEMATIC-NEXT-STEPS.md Tasks 2.1, 2.2, 2.3

1. EventContext → useEvents hook with Supabase
2. SponsorContext → useSponsors hook with Supabase
3. BrandShootContext → Save to campaigns table
```

**Verification:** Create event → refresh page → event still there

---

### TASK 3: Migrate to React Router (8 hours)
```bash
# Replace 250-line switch statement with React Router
# See: /rules/DIRECTORY-AND-ROUTING.md Phase 1

1. Install React Router v6
2. Create /routes directory
3. Create /layouts
4. Wire up routes
5. Test deep links work
```

**Verification:** Deep links work, browser back/forward works

---

## 📁 KEY DOCUMENTATION

### Core Rules (Read First)
```
/SYSTEM_RULES.md              ← Core principles, non-negotiable rules
/SUCCESS_CRITERIA.md          ← Binary checklist for "done"
/FORENSIC_AUDIT.md            ← Known issues & fixes
/QUICK_START.md               ← This file (quick reference)
```

### Structure & Organization
```
/rules/DIRECTORY-AND-ROUTING.md   ← File structure rules
/rules/AGENTS.md                  ← AI system architecture
/docs/DIRECTORY-AUDIT.md          ← Current vs. target state
/docs/00-MASTER-INDEX.md          ← Complete navigation
```

### Design & UI
```
/docs/LUXURY-UI-PROMPTS.md    ← Figma AI prompts for premium UI
/rules/ui-ux-design.md        ← Design system (colors, typography)
/docs/style-guide.md          ← Style guide
```

### Database & Backend
```
/rules/supabase-backend.md            ← Database patterns, RLS
/docs/supabase/00-START-HERE.md       ← Database overview
/docs/supabase/EXISTING-SCHEMA.md     ← Current 8 tables
/lib/supabase/schema/complete-schema.sql  ← SQL to run
```

### Implementation
```
/docs/SYSTEMATIC-NEXT-STEPS.md        ← Copy-paste code for each task
/docs/PRODUCTION-AUDIT-COMPLETE.md    ← Complete feature inventory
```

---

## 🚨 CRITICAL ISSUES (Fixed)

### ✅ FIXED: Missing Imports
- ❌ Was: App.tsx imported 3 files that didn't exist
- ✅ Now: All files created (RealTimeAssistant, ChatBubble, Modal)
- ✅ Build compiles successfully

### ⚠️ TODO: Mock Data in Contexts
- ❌ Current: EventContext, SponsorContext use hardcoded arrays
- ⚠️ Impact: Data disappears on refresh (not production-ready)
- 🔧 Fix: Task 2 (6 hours)

### ⚠️ TODO: Manual Routing
- ❌ Current: 250-line switch statement in App.tsx
- ⚠️ Impact: No deep links, browser navigation broken
- 🔧 Fix: Task 3 (8 hours)

---

## 📊 PRODUCTION READINESS

### Current: 65/100
```
✅ UI Components:      95/100 (excellent)
⚠️  Routing:            40/100 (needs React Router)
❌ Contexts:            20/100 (mock data, critical)
⚠️  Type Safety:        70/100 (needs verification)
❌ Error Handling:      30/100 (missing edge cases)
⚠️  Performance:        50/100 (no code splitting)
❌ Testing:              0/100 (no tests)
⚠️  Security:           40/100 (RLS not verified)
```

### Target: 100/100
```
✅ All items in /SUCCESS_CRITERIA.md checked
✅ No violations in /FORENSIC_AUDIT.md
✅ 100% compliance with /rules/DIRECTORY-AND-ROUTING.md
✅ All AI features working per /rules/AGENTS.md
```

---

## 🎨 DESIGN SYSTEM QUICK REFERENCE

### Colors
```css
Primary:    #111111 (Charcoal)
Background: #F9F9F9 (Ivory)
Accent:     #8B7355 (Bronze)
Success:    #10b981
Warning:    #f59e0b
Error:      #ef4444
```

### Typography
```css
Headings: 'Crimson Pro', serif
Body:     'Inter', sans-serif
```

### Component States (MANDATORY)
Every screen needs:
1. Loading state → `<LoadingSkeleton />`
2. Error state → `<ErrorState />`
3. Empty state → `<EmptyState />`
4. Success state → Actual content

---

## 🤖 AI SYSTEM QUICK REFERENCE

### Core Agents
1. **Orchestrator** → Routes requests to specialist agents
2. **Context & Memory** → Remembers session, prevents repeat questions
3. **Retrieval (RAG)** → Finds facts from docs + web
4. **Reasoning** → Plans multi-step solutions
5. **Execution** → Safely executes via Edge Functions

### Specialist Agents
- **Brand Shoot Agent** → Analyzes brand, generates strategy (15-20s)
- **Event Planner Agent** → Generates 120 tasks (2-3s)
- **Sponsor Intelligence Agent** → Scores fit 0-100 (30-45s)
- **Budget Guardian Agent** → Detects anomalies (3-5s)
- **Risk Analysis Agent** → Identifies timeline risks (5-8s)

### When Each Model Used
- **Gemini 3 Flash** → Fast UI (400ms) — chat, suggestions
- **Gemini 3 Pro** → Deep reasoning (1.5s) — planning, strategy
- **Gemini Thinking** → Multi-step decisions — risk analysis

**Full details:** `/rules/AGENTS.md`

---

## 📂 DIRECTORY STRUCTURE (TARGET)

```
/src
├── /routes              → Route definitions, guards
├── /layouts             → Public, App, Wizard layouts
├── /screens             → Full pages (1:1 with routes)
├── /features            → Feature logic (events, sponsors, tasks)
│   ├── /events
│   │   ├── /hooks           → useEvents, useEventAI
│   │   ├── /components      → EventCard, EventFilters
│   │   └── /services        → eventsApi, eventsAI
│   └── /sponsors
├── /components
│   ├── /ui              → shadcn primitives
│   └── /shared          → Reusable UI (no logic)
├── /services            → API clients (Supabase, Gemini)
├── /ai                  → Agents, prompts, schemas
└── /lib                 → Utils, config, types
```

**Current Status:** 35% compliant (see `/docs/DIRECTORY-AUDIT.md`)

---

## ✅ VERIFICATION CHECKLIST

### Before Marking Anything "Done"
- [ ] Read `/SYSTEM_RULES.md` requirements
- [ ] Check against `/SUCCESS_CRITERIA.md`
- [ ] Test on mobile (375px), tablet (768px), desktop (1440px)
- [ ] No console errors
- [ ] Data persists on page refresh
- [ ] Loading/error/empty states show
- [ ] No TypeScript errors

---

## 🛠️ TROUBLESHOOTING

### Build fails?
1. Check `/FORENSIC_AUDIT.md` for known issues
2. Verify all imports exist
3. Run: `npm run build` and read errors

### Data doesn't persist?
- Expected: Contexts still use mock data
- Fix: Complete Task 2 (replace contexts with Supabase hooks)

### Supabase not connecting?
1. Check `.env.local` exists and has correct values
2. Verify URL and anon key are correct
3. Check `<SupabaseStatus />` component (should be green)

### Routes broken?
- Expected: Currently using manual switch statement
- Fix: Complete Task 3 (migrate to React Router)

---

## 🎯 MILESTONES

### Week 1: MVP (70%)
- [ ] Database operational
- [ ] Contexts use Supabase (no mock data)
- [ ] Forms save to database
- [ ] Real-time updates work

### Week 2: Core (80%)
- [ ] React Router implemented
- [ ] All dashboards show real data
- [ ] File uploads working
- [ ] Wizards save to database

### Week 3: AI (88%)
- [ ] Gemini API integrated
- [ ] All AI agents working
- [ ] Brand Shoot AI live
- [ ] Task generation working

### Week 4-6: Production (100%)
- [ ] Security verified (RLS tested)
- [ ] Tests written
- [ ] Performance optimized (Lighthouse >90)
- [ ] Deployed to production

---

## 📞 QUICK ANSWERS

**Q: Where do I start?**  
A: Task 1 (Create Supabase project) — 1 hour

**Q: What's blocking production?**  
A: Contexts use mock data (Task 2) + No real routing (Task 3)

**Q: Where's the database schema?**  
A: `/lib/supabase/schema/complete-schema.sql`

**Q: How do I add a new feature?**  
A: Create `/features/{domain}`, add screen to `/screens`, add route

**Q: Where are the design prompts?**  
A: `/docs/LUXURY-UI-PROMPTS.md` (for Figma AI, premium UI)

**Q: How does AI work in this app?**  
A: `/rules/AGENTS.md` (complete explanation)

**Q: What's the file structure supposed to be?**  
A: `/rules/DIRECTORY-AND-ROUTING.md` + `/docs/DIRECTORY-AUDIT.md`

**Q: How do I know if something is production-ready?**  
A: Check against `/SUCCESS_CRITERIA.md` (binary checklist)

---

## 🚀 START NOW

```bash
# 1. Read system rules (5 min)
open /SYSTEM_RULES.md

# 2. Create Supabase project (1 hour)
# Follow Task 1 above

# 3. Fix contexts (6 hours)
# See /docs/SYSTEMATIC-NEXT-STEPS.md

# 4. Verify build works
npm run build
```

**Goal:** MVP by end of week (22 hours total work)

---

**When in doubt, check:**
1. `/SYSTEM_RULES.md` → What are the rules?
2. `/SUCCESS_CRITERIA.md` → Is it done?
3. `/FORENSIC_AUDIT.md` → What's broken?
4. `/docs/00-MASTER-INDEX.md` → Where's the doc I need?

**Let's build! 🚀**
