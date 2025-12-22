# SYSTEM RULES — FashionOS
## Single Source of Truth

**Last Updated:** December 20, 2024  
**Status:** Enforced on all code

---

## How to Use (Non-Negotiable)
1. ✅ Read this file FIRST before any changes
2. ✅ Reference `/rules/` for detailed guidelines
3. ✅ Check `SUCCESS_CRITERIA.md` before marking "done"
4. ✅ Never skip validation steps

---

## Core Principles

### 1. No Mock Data in Production
- ✅ All contexts use Supabase
- ✅ All wizards save to database
- ✅ All dashboards fetch real data
- ❌ No `useState` with fake arrays

### 2. Type Safety First
- ✅ All Supabase queries use generated types
- ✅ All props use TypeScript interfaces
- ✅ No `any` types without justification
- ✅ Zod schemas for all forms

### 3. Real-Time by Default
- ✅ Contexts subscribe to table changes
- ✅ UI updates without refresh
- ✅ Optimistic updates + rollback on error

### 4. Mobile-First Responsive
- ✅ All layouts test on 375px, 768px, 1440px
- ✅ Touch targets minimum 44px
- ✅ Tables collapse to cards on mobile
- ✅ Wizards adapt for small screens

### 5. Error Handling Everywhere
- ✅ Try/catch on all async operations
- ✅ User-friendly error messages
- ✅ Console errors for debugging
- ✅ Fallback UI for failures

---

## Required Output

### Every Component Must Have:
1. **Loading State** → `<LoadingSkeleton />`
2. **Error State** → `<ErrorState message={error} />`
3. **Empty State** → `<EmptyState />`
4. **Success State** → Actual content

### Every Form Must Have:
1. **Zod Schema** → `/lib/validation/schemas.ts`
2. **React Hook Form** → `useForm({ resolver: zodResolver })`
3. **Loading State** → Button shows spinner
4. **Error Display** → Field-level + form-level
5. **Success Feedback** → Toast notification

### Every Dashboard Must Have:
1. **Real Data** → From Supabase queries
2. **Real-Time Updates** → Subscription active
3. **Filters** → Where applicable
4. **Pagination** → For lists >20 items
5. **Export** → Where applicable

---

## Detective Mode (Troubleshooting)

When something breaks:

1. **State the symptom**
   - What error message?
   - What user action triggered it?
   - Can you reproduce it?

2. **Isolate the variable**
   - Does it happen in dev vs production?
   - Does it happen with different data?
   - Does it happen for all users?

3. **Check assumptions**
   - Is Supabase connected? (`<SupabaseStatus />`)
   - Is user authenticated? (Console: `supabase.auth.getUser()`)
   - Does table have data? (Supabase Dashboard)
   - Are environment variables set?

4. **Compare expected vs actual**
   - What should happen?
   - What actually happens?
   - Where does it diverge?

5. **Propose fix**
   - What's the root cause?
   - What's the safest fix?
   - What else could break?

6. **Define test to confirm**
   - How to verify it's fixed?
   - What edge cases to test?

---

## Backend & AI Rules

### Supabase
- ✅ RLS policies on ALL tables
- ✅ Foreign keys use proper naming: `table_column_fkey`
- ✅ All IDs are UUID, use `gen_random_uuid()`
- ✅ Timestamps auto-update with triggers
- ✅ Indexes on all foreign keys
- ❌ Never trust client-side data
- ❌ Never expose admin keys

### AI Features
- ✅ All AI outputs have fallback mock data
- ✅ All AI errors show user-friendly message
- ✅ All AI outputs are editable by user
- ✅ All AI reasoning is visible (not black box)
- ❌ Never make decisions without user confirmation
- ❌ Never assume AI is correct

---

## Performance Rules

### Images
- ✅ Use `<ImageWithFallback />` for new images
- ✅ Use `figma:asset` scheme for imports
- ✅ WebP format preferred
- ✅ Lazy load below fold

### Code Splitting
- ✅ Lazy load dashboards: `React.lazy(() => import(...))`
- ✅ Dynamic imports for heavy components
- ✅ Separate vendor bundles

### Queries
- ✅ Use `.select()` to limit columns
- ✅ Use `.limit()` for lists
- ✅ Use indexes for filters
- ❌ Never fetch all rows without pagination

---

## Validation (Before "Done")

### Checklist for Every Feature
- [ ] Works in Chrome, Safari, Firefox
- [ ] Works on mobile (375px)
- [ ] Works on tablet (768px)
- [ ] Works on desktop (1440px+)
- [ ] Loading state shows
- [ ] Error state shows (test by breaking it)
- [ ] Empty state shows (test with no data)
- [ ] Success state shows
- [ ] Real-time updates work (test in 2 tabs)
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Data persists on refresh

---

## Rules Folder (Referenced as Needed)

```
/rules/
├── ui-ux-design.md          → Design system, colors, typography
├── responsive-layout.md     → Breakpoints, mobile patterns
├── accessibility.md         → WCAG compliance, keyboard nav
├── animations-motion.md     → Motion tokens, transitions
├── troubleshooting.md       → Detective mode expanded
├── supabase-backend.md      → Schema patterns, RLS templates
├── ai-features.md           → Agent patterns, prompt templates
├── performance.md           → Optimization techniques
└── testing-success.md       → Test patterns, coverage goals
```

---

## Documentation Standards

### File Naming
```
/docs/
├── 00-START-HERE.md
├── 01-Feature-Name.md
├── 02-Another-Feature.md
└── category/
    ├── 00-INDEX.md
    └── 01-Specific-Topic.md
```

### Required Sections in Docs
1. **Purpose** (1 sentence)
2. **Current Status** (% complete)
3. **Quick Start** (3-5 steps)
4. **Verification** (how to test it works)
5. **Troubleshooting** (common issues)

---

## Non-Negotiable Rules

1. **Never commit**:
   - `.env.local` files
   - API keys
   - Supabase credentials
   - Mock data labeled as "real"

2. **Always commit**:
   - TypeScript types
   - Zod schemas
   - Error handling
   - Loading states

3. **Before deploying**:
   - [ ] Run `npm run build` (no errors)
   - [ ] Test in production mode
   - [ ] Check Lighthouse score >90
   - [ ] Verify Supabase RLS works
   - [ ] Test as non-admin user

---

**When in doubt, ask: "Is this production-ready?"**  
If answer is "not sure," it's not done.
