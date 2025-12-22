# Schema Assessment Summary — Red Flags & Recommendations
## Visual Dashboard of Violations, Risks, and Priority Actions

**Assessment Date:** December 20, 2024  
**Assessed By:** FashionOS Engineering Team  
**Schema Version:** 8 tables (production) + 44 tables (proposed)  
**Overall Grade:** 🔴 D+ (Critical violations found, must remediate)

---

## 🎯 ASSESSMENT SCORECARD

### Overall Metrics

| Category | Score | Status | Priority |
|----------|-------|--------|----------|
| **Security (RLS)** | 25/100 | 🔴 FAILING | CRITICAL |
| **Code Quality** | 40/100 | 🟠 POOR | HIGH |
| **Data Modeling** | 60/100 | 🟡 FAIR | MEDIUM |
| **Documentation** | 30/100 | 🟠 POOR | MEDIUM |
| **Performance** | 70/100 | 🟢 GOOD | LOW |
| **OVERALL** | **45/100** | 🔴 **FAILING** | **FIX ASAP** |

---

## 🚨 RED FLAGS IDENTIFIED (17 Total)

### 🔴 CRITICAL (Fix Immediately) — 5 Issues

| # | Issue | Impact | Found In | Fix Cost |
|---|-------|--------|----------|----------|
| 1 | RLS policies missing `to authenticated` | Security breach risk | All 8 tables × 4 policies = 32 policies | 2 hours |
| 2 | INSERT policies use `using` not `with check` | INSERTs don't work | All 8 tables × 1 policy = 8 policies | 1 hour |
| 3 | Unwrapped `auth.uid()` calls | NULL comparison fails | All policies = ~32 places | 1 hour |
| 4 | Missing join-scoped RLS | Tenant isolation broken | 4 child tables + all proposed | 4 hours |
| 5 | Plaintext OAuth tokens (proposed) | Credential leak | 4 integration tables (Tier 3) | 8 hours |
| **TOTAL** | - | - | - | **16 hours** |

**Risk if Not Fixed:**
- Users can access other organizations' data
- Authentication bypasses possible
- Third-party account takeovers
- Compliance violations (GDPR, SOC2)

**Recommendation:** 🚨 **STOP all new feature work until Stage 1 complete**

---

### 🟠 HIGH PRIORITY (Fix Before Expansion) — 5 Issues

| # | Issue | Impact | Found In | Fix Cost |
|---|-------|--------|----------|----------|
| 6 | Using deprecated `uuid_generate_v4()` | Requires old extension | All 8 tables | 1 hour |
| 7 | Unsafe trigger function | Security vulnerability | 1 function | 0.5 hours |
| 8 | Using `for all` instead of granular | Over-permissive | Some policies | 2 hours |
| 9 | Array dependency anti-pattern | Poor performance, no FK | tasks table | 6 hours |
| 10 | date+time text instead of timestamptz | Timezone bugs | Proposed tables | 3 hours |
| **TOTAL** | - | - | - | **12.5 hours** |

**Risk if Not Fixed:**
- Future Postgres compatibility issues
- Performance degradation
- Difficult to query dependencies
- International event bugs

**Recommendation:** Fix in Stage 1-4 before adding Tier 2-3 tables

---

### 🟡 MEDIUM PRIORITY (Fix in Batch) — 5 Issues

| # | Issue | Impact | Found In | Fix Cost |
|---|-------|--------|----------|----------|
| 11 | Uppercase SQL keywords | Style inconsistency | All SQL | 2 hours |
| 12 | Missing table comments | Poor docs | All 8 tables | 1 hour |
| 13 | Missing column comments | Unclear purpose | Key columns | 2 hours |
| 14 | Inconsistent index naming | Hard to manage | All indexes | 1 hour |
| 15 | Inconsistent constraint naming | Hard to debug | All constraints | 1 hour |
| **TOTAL** | - | - | - | **7 hours** |

**Risk if Not Fixed:**
- Harder maintenance
- Onboarding slower
- Debugging takes longer

**Recommendation:** Fix in Stage 1, enforce in Stages 3-6

---

### 🟢 LOW PRIORITY (Fix When Convenient) — 2 Issues

| # | Issue | Impact | Found In | Fix Cost |
|---|-------|--------|----------|----------|
| 16 | Schema not explicitly specified | Relies on search_path | Queries | 1 hour |
| 17 | Missing function comments | Unclear return values | Functions | 0.5 hours |
| **TOTAL** | - | - | - | **1.5 hours** |

---

## 📊 VIOLATION DISTRIBUTION

### By Table

| Table | 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low | Total | Grade |
|-------|------------|---------|-----------|--------|-------|-------|
| organizations | 4 | 2 | 5 | 1 | 12 | 🔴 D |
| users | 4 | 2 | 5 | 1 | 12 | 🔴 D |
| events | 4 | 2 | 5 | 1 | 12 | 🔴 D |
| tasks | 5 | 3 | 5 | 1 | 14 | 🔴 F (has array anti-pattern) |
| sponsors | 4 | 2 | 5 | 1 | 12 | 🔴 D |
| budget_items | 4 | 2 | 5 | 1 | 12 | 🔴 D |
| assets | 4 | 2 | 5 | 1 | 12 | 🔴 D |
| campaigns | 4 | 2 | 5 | 1 | 12 | 🔴 D |

**Worst Offender:** `tasks` (14 violations including array anti-pattern)  
**Average Violations Per Table:** 12.25  
**Overall Grade:** 🔴 **D+ (Needs Immediate Attention)**

---

### By Category

```
Security (RLS)
██████████████████████████████ 30 violations (🔴 CRITICAL)
├─ Missing `to authenticated`: 32 policies
├─ Wrong INSERT syntax: 8 policies
├─ Unwrapped auth.uid(): 32 places
├─ Missing join-scoped: 4 tables
└─ Plaintext tokens: 4 tables (proposed)

Code Quality
████████████████ 16 violations (🟠 HIGH)
├─ Uppercase SQL: All tables
├─ Deprecated uuid_generate: 8 tables
├─ Unsafe trigger: 1 function
├─ for all policies: Some
└─ Inconsistent naming: All

Data Modeling
████████ 8 violations (🟡 MEDIUM)
├─ Array dependencies: 1 table
├─ date+time text: Proposed
└─ Missing indexes: Some

Documentation
██████ 6 violations (🟡 MEDIUM)
├─ Missing table comments: 8 tables
├─ Missing column comments: Many
└─ Missing function comments: Some
```

---

## 🎯 RECOMMENDED ACTION PLAN

### Phase 1: EMERGENCY FIXES (Week 1) — CRITICAL
**Goal:** Fix security violations in production

**Actions:**
1. ✅ Complete Stage 0 (naming decisions) — **1 day**
2. ✅ Complete Stage 1 (fix 8 existing tables) — **2-3 days**
3. ✅ Deploy to staging, test thoroughly
4. ✅ Deploy to production with monitoring

**Success Criteria:**
- [ ] All RLS policies have explicit roles
- [ ] All INSERT policies use `with check`
- [ ] All auth.uid() wrapped
- [ ] All child tables have join-scoped RLS
- [ ] 100% RLS test suite passes
- [ ] No access regression

**Effort:** 16 hours (2-3 days)  
**Risk:** 🟡 Medium (careful testing required)  
**Blocker for:** All future development

---

### Phase 2: PATTERNS & STANDARDS (Week 2) — HIGH
**Goal:** Create templates to prevent future violations

**Actions:**
1. ✅ Review patterns library (already created)
2. ✅ Train team on templates
3. ✅ Set up code review checklist
4. ✅ Document non-breaking change policy

**Success Criteria:**
- [ ] All engineers trained on patterns
- [ ] Code review checklist in use
- [ ] Templates accessible

**Effort:** 4 hours (0.5 days)  
**Risk:** 🟢 Low  
**Enables:** Safe expansion (Stages 3-6)

---

### Phase 3: CORE EXPANSION (Week 2-3) — MEDIUM
**Goal:** Add Tier 1 tables with correct patterns

**Actions:**
1. ✅ Complete Stage 3 (14 Tier 1 tables) — **3-4 days**
2. ✅ Use patterns library for all tables
3. ✅ Test tenant isolation rigorously
4. ✅ Deploy incrementally

**Success Criteria:**
- [ ] All new tables follow patterns
- [ ] Join-scoped RLS verified
- [ ] Tenant isolation tests pass
- [ ] Performance acceptable

**Effort:** 24 hours (3-4 days)  
**Risk:** 🟡 Medium (new features)  
**Delivers:** Ticketing, venues, teams

---

### Phase 4: ANTI-PATTERN REFACTOR (Week 3) — HIGH
**Goal:** Fix array dependencies

**Actions:**
1. ✅ Complete Stage 4 (task dependencies refactor) — **2-3 days**
2. ✅ Create join table + migrate data
3. ✅ Add compatibility view
4. ✅ Update app code
5. ✅ Drop old column (later)

**Success Criteria:**
- [ ] task_dependencies table works
- [ ] Dependency queries efficient
- [ ] Circular detection works
- [ ] App updated

**Effort:** 16 hours (2-3 days)  
**Risk:** 🔴 High (data migration)  
**Fixes:** Performance, referential integrity

---

### Phase 5: PRODUCTION FEATURES (Week 4) — MEDIUM
**Goal:** Add Tier 2 tables (models, designers, shoots)

**Actions:**
1. ✅ Complete Stage 5 (16 Tier 2 tables) — **3-4 days**
2. ✅ Use patterns library
3. ✅ Test workflows end-to-end
4. ✅ Deploy

**Effort:** 24 hours (3-4 days)  
**Risk:** 🟡 Medium  
**Delivers:** Model casting, designer management, shoots

---

### Phase 6: ADVANCED FEATURES (Week 5-6) — CRITICAL SECURITY
**Goal:** Add Tier 3 tables (social, e-commerce)

**Actions:**
1. ⚠️ Security review BEFORE starting
2. ✅ Complete Stage 6 (14 Tier 3 tables) — **4-5 days**
3. ✅ NO tokens in client-readable tables
4. ✅ Use Supabase Vault for secrets
5. ✅ Test OAuth flows extensively
6. ✅ Deploy with monitoring

**Success Criteria:**
- [ ] Security review approved
- [ ] Client CANNOT read tokens
- [ ] OAuth flow works
- [ ] Webhook security works

**Effort:** 32 hours (4-5 days)  
**Risk:** 🔴 High (security-critical)  
**Delivers:** Social media, e-commerce integrations

---

## 🔍 DETAILED BREAKDOWN: EXISTING SCHEMA

### Table-by-Table Assessment

#### 1. organizations

**Status:** 🔴 12 violations  
**Grade:** D

| Violation | Severity | Description |
|-----------|----------|-------------|
| Uppercase SQL | 🟡 | CREATE TABLE, CHECK, etc. |
| uuid_generate_v4() | 🟠 | Should use gen_random_uuid() |
| Missing table comment | 🟡 | No description |
| RLS missing `to` | 🔴 | Policies don't specify role |
| Wrong INSERT syntax | 🔴 | Uses `using` not `with check` |
| Unwrapped auth.uid() | 🔴 | NULL comparison risk |

**Recommended Fix:**
```sql
-- Current (wrong)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ...
);

-- Fixed (correct)
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  ...
);

comment on table public.organizations is
  'Multi-tenant organization management...';

-- RLS fixed
create policy "organizations_select_authenticated"
  on public.organizations
  for select
  to authenticated  -- ✅ Added
  using (
    id in (
      select organization_id
      from public.users
      where id = (select auth.uid())  -- ✅ Wrapped
    )
  );
```

---

#### 2. users

**Status:** 🔴 12 violations  
**Grade:** D

**Same violations as organizations, plus:**
- References auth.users(id) correctly ✅
- Has proper role enum ✅
- Has proper organization FK ✅

**Recommended Fix:** Same pattern as organizations

---

#### 3. events

**Status:** 🔴 12 violations  
**Grade:** D

**Additional Issues:**
- Many columns (17 total) — good normalization ✅
- Proper constraints (date range, budget checks) ✅
- Full-text search index — good ✅

**Recommended Fix:** Same pattern as organizations

---

#### 4. tasks

**Status:** 🔴 14 violations (WORST)  
**Grade:** F

**CRITICAL ISSUE:**
```sql
dependency_task_ids UUID[]  -- ❌ ANTI-PATTERN
```

**Why This is Bad:**
- No foreign key enforcement (can reference non-existent tasks)
- Can't index efficiently (slow queries)
- Difficult to query ("get all tasks that depend on X")
- Can't prevent circular dependencies easily
- Breaking normal form

**Recommended Fix:**
```sql
-- Create join table
create table public.task_dependencies (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  depends_on_task_id uuid not null references public.tasks(id) on delete cascade,
  
  constraint no_self_reference
    check (task_id != depends_on_task_id),
  
  unique (task_id, depends_on_task_id)
);

-- Circular dependency prevention (requires recursive query or app logic)
```

**Data Migration Required:** Stage 4

---

#### 5. sponsors

**Status:** 🔴 12 violations  
**Grade:** D

**Structure:** Good (fit_score, tier system, status pipeline)  
**RLS Issue:** Missing join-scoped (has event_id, not org_id)

**Recommended Fix:**
```sql
-- Current (wrong)
create policy "sponsors_select"
  on sponsors
  for select
  using (organization_id = ...);  -- ❌ sponsors has NO org_id!

-- Fixed (correct)
create policy "sponsors_select_authenticated"
  on public.sponsors
  for select
  to authenticated
  using (
    event_id in (
      select id
      from public.events
      where organization_id = (
        select organization_id
        from public.users
        where id = (select auth.uid())
      )
    )
  );
  -- ✅ Join through events
```

---

#### 6. budget_items

**Status:** 🔴 12 violations  
**Grade:** D

**Same issues as sponsors** (join-scoped RLS needed)

---

#### 7. assets

**Status:** 🔴 12 violations  
**Grade:** D

**Same issues as sponsors** (join-scoped RLS needed)  
**Additional:** AI scoring fields good ✅

---

#### 8. campaigns

**Status:** 🔴 12 violations  
**Grade:** D

**JSONB Usage:** Good (flexible brand signals, strategy)  
**RLS:** Has org_id, so direct org-scoped OK ✅

---

## 🔍 DETAILED BREAKDOWN: PROPOSED SCHEMA

### Tier 1 (Core Operations) — 14 Tables

**Status:** 📋 Not yet created  
**Violations:** Would inherit same issues if not using patterns

**Critical Issues to Prevent:**
- ✅ MUST use patterns library for all tables
- ✅ MUST use join-scoped RLS where org_id absent
- ✅ MUST use timestamptz (not date+time text)
- ✅ MUST add table comments
- ✅ MUST use lowercase SQL

**Examples of Correct Implementation:**

#### ticket_tiers (Public Read + Org Write)
```sql
-- ✅ Public can view tickets (for public event pages)
create policy "ticket_tiers_select_anon"
  on public.ticket_tiers
  for select
  to anon  -- ✅ Explicit
  using (true);  -- Public read

-- ✅ Org members can create (join-scoped through events)
create policy "ticket_tiers_insert_authenticated"
  on public.ticket_tiers
  for insert
  to authenticated  -- ✅ Explicit
  with check (  -- ✅ Correct syntax
    event_id in (
      select id from public.events
      where organization_id = (
        select organization_id from public.users
        where id = (select auth.uid())  -- ✅ Wrapped
      )
    )
  );
```

#### event_schedules (Proper Time Modeling)
```sql
-- ❌ WRONG
create table event_schedules (
  date date,
  time_slot text  -- "14:00-16:00"
);

-- ✅ CORRECT
create table public.event_schedules (
  start_at timestamptz not null,
  end_at timestamptz not null,
  
  constraint valid_time_range
    check (end_at > start_at)
);
```

---

### Tier 2 (Production Features) — 16 Tables

**Status:** 📋 Not yet created  
**Risk:** Low (no existing dependencies)

**Pattern to Follow:**
- model_profiles → users (user-scoped)
- event_models → events (join-scoped 1 level)
- shoots → organizations (org-scoped)
- shoot_items → shoots (join-scoped 1 level)

---

### Tier 3 (Advanced Features) — 14 Tables

**Status:** 📋 Not yet created  
**Risk:** 🔴 HIGH (security-critical)

**CRITICAL SECURITY REQUIREMENT:**

```sql
-- ❌ WRONG (DANGEROUS!)
create table instagram_connections (
  user_id uuid,
  access_token text,  -- ❌ Client can read this!
  refresh_token text  -- ❌ And this!
);

-- ✅ CORRECT (SECURE)
create table public.instagram_connections (
  user_id uuid,
  instagram_account_id text,  -- ✅ Just metadata
  status text,
  expires_at timestamptz
  -- ✅ NO tokens!
);

-- Tokens stored separately in Supabase Vault (encrypted)
```

**Failure Mode:**
If tokens in table → User opens DevTools → Reads token → Steals account

---

## 📈 PROGRESS TRACKING

### Current State (Week 0)

```
█░░░░░░░░░ 10% (Assessment complete)
```

**Completed:**
- ✅ Schema audit
- ✅ Violation identification
- ✅ Patterns library created
- ✅ Remediation plan written

**Remaining:**
- ⏳ Stage 0: Decisions
- ⏳ Stage 1: Fix existing
- ⏳ Stages 3-6: Add new tables

---

### Target State (Week 6)

```
██████████ 100% (All stages complete)
```

**Will Have:**
- ✅ 52 tables (8 fixed + 44 new)
- ✅ 0 security violations
- ✅ 100% best practices compliance
- ✅ Full ticketing, venues, teams, models, designers, shoots, integrations

---

## 🎯 IMMEDIATE ACTIONS (This Week)

### 1. Team Alignment (1 hour)
- [ ] Schedule kick-off meeting
- [ ] Review this assessment with team
- [ ] Assign stage owners
- [ ] Set timeline expectations

### 2. Stage 0: Decisions (4 hours)
- [ ] Decide: `users` vs `profiles` canonical naming
- [ ] Document non-breaking change policy
- [ ] Verify pgcrypto extension enabled
- [ ] Create 00-DECISIONS.md

### 3. Stage 1: Emergency Fixes (16 hours)
- [ ] Create 8 migration files (1 per table)
- [ ] Fix RLS policies (add `to`, `with check`, wrap auth.uid())
- [ ] Add table comments
- [ ] Replace uuid_generate_v4()
- [ ] Test thoroughly on local DB
- [ ] Deploy to staging
- [ ] Run RLS test suite
- [ ] Deploy to production

### 4. Communication (ongoing)
- [ ] Update stakeholders on timeline
- [ ] Block new feature work until Stage 1 done
- [ ] Schedule daily standups during remediation

---

## ✅ APPROVAL CHECKLIST

**Before proceeding, verify:**

- [ ] Engineering team reviewed assessment
- [ ] All 17 violations acknowledged
- [ ] Risk level understood (🔴 CRITICAL)
- [ ] Timeline approved (6 weeks)
- [ ] Resources allocated
- [ ] Stage 1 prioritized (security fixes)
- [ ] Stage 6 security review scheduled
- [ ] Patterns library reviewed
- [ ] Code review process updated
- [ ] Non-breaking change policy accepted

**Sign-off Required:**
- [ ] Engineering Lead
- [ ] Security Lead
- [ ] Product Lead
- [ ] CTO

---

## 📞 QUESTIONS & ESCALATION

### Have Questions?
1. Read the [full remediation plan](/docs/supabase/remediation/README.md)
2. Check [patterns library](/docs/supabase/remediation/02-PATTERNS-LIBRARY.md)
3. Review [failure points](/docs/supabase/remediation/99-FAILURE-POINTS.md)
4. Ask in #engineering-db channel

### Need to Escalate?
- **Security concerns:** Tag @security-lead
- **Timeline issues:** Tag @engineering-lead
- **Technical blockers:** Tag @senior-engineer
- **Production issues:** Page on-call

---

**Assessment Complete:** December 20, 2024  
**Next Review:** After Stage 1 deployment  
**Status:** 🔴 CRITICAL — Immediate action required  
**Recommendation:** Proceed with remediation plan
