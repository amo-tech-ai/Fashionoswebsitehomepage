# Known Failure Points & Fixes — Must Address
## Critical Issues That Will Break Production

**Created:** December 20, 2024  
**Priority:** 🔴 CRITICAL — Must fix before deployment  
**Status:** Audit Complete

---

## 🚨 SEVERITY LEVELS

| Symbol | Level | Impact | Action Required |
|--------|-------|--------|-----------------|
| 🔴 | CRITICAL | Security breach / Data loss | Fix immediately |
| 🟠 | HIGH | Feature breaks / Performance issue | Fix before prod |
| 🟡 | MEDIUM | Style violation / Maintenance issue | Fix in batch |
| 🟢 | LOW | Documentation / Nice-to-have | Fix when convenient |

---

## 🔴 CRITICAL FAILURES (Fix Immediately)

### 1. Missing RLS `to authenticated` Clause

**Severity:** 🔴 CRITICAL  
**Impact:** Implicit role binding, policies may not execute as expected  
**Found In:** All existing RLS policies

**❌ Current (Wrong):**
```sql
create policy "events_select"
  on events
  for select
  using (organization_id = auth.user_organization_id());
  -- ❌ Missing `to authenticated`
```

**✅ Correct:**
```sql
create policy "events_select"
  on events
  for select
  to authenticated  -- ✅ Explicit role
  using (organization_id = auth.user_organization_id());
```

**Why Critical:**
- Without `to authenticated`, policy applies to `public` role
- May allow anonymous access unintentionally
- Behavior is implicit and unpredictable

**Fix Required:** Add `to authenticated` or `to anon` to EVERY policy

---

### 2. INSERT Policies Missing `with check`

**Severity:** 🔴 CRITICAL  
**Impact:** INSERT policies will fail / not execute  
**Found In:** All INSERT policies

**❌ Current (Wrong):**
```sql
create policy "events_insert"
  on events
  for insert
  to authenticated
  using (organization_id = auth.user_organization_id());
  -- ❌ INSERT should use `with check`, not `using`
```

**✅ Correct:**
```sql
create policy "events_insert"
  on events
  for insert
  to authenticated
  with check (organization_id = auth.user_organization_id());
  -- ✅ INSERT uses `with check`
```

**Why Critical:**
- `using` is for SELECT/UPDATE/DELETE
- `with check` is for INSERT
- Wrong clause = policy doesn't work

**Fix Required:** Replace `using` with `with check` for ALL INSERT policies

---

### 3. Unwrapped `auth.uid()` Calls

**Severity:** 🔴 CRITICAL  
**Impact:** NULL comparison failures, bypassed security  
**Found In:** All policies using auth.uid()

**❌ Current (Wrong):**
```sql
create policy "events_update"
  on events
  for update
  to authenticated
  using (created_by = auth.uid());
  -- ❌ auth.uid() can return NULL
```

**✅ Correct:**
```sql
create policy "events_update"
  on events
  for update
  to authenticated
  using (created_by = (select auth.uid()));
  -- ✅ Wrapped in subquery
```

**Why Critical:**
- `auth.uid()` returns NULL if not authenticated
- NULL = NULL is always FALSE in SQL
- Can cause unexpected access denials or grants

**Fix Required:** Wrap ALL `auth.uid()` calls in subquery: `(select auth.uid())`

---

### 4. Missing Join-Scoped RLS for Child Tables

**Severity:** 🔴 CRITICAL  
**Impact:** Multi-tenant isolation broken on child tables  
**Found In:** tasks, sponsors, budget_items, assets (existing), ALL Tier 1-3 child tables (proposed)

**❌ Current (Wrong):**
```sql
-- For tables WITHOUT organization_id column
create policy "tasks_select"
  on tasks
  for select
  to authenticated
  using (organization_id = auth.user_organization_id());
  -- ❌ tasks table has NO organization_id column!
```

**✅ Correct:**
```sql
create policy "tasks_select"
  on tasks
  for select
  to authenticated
  using (
    event_id in (
      select id from events
      where organization_id = (select auth.user_organization_id())
    )
  );
  -- ✅ Join through parent table
```

**Why Critical:**
- Child tables don't have org_id
- Must join through parent (event → organization)
- Wrong policy = can access other org's data

**Tables Requiring Join-Scoped RLS:**

| Table | Join Path | Levels |
|-------|-----------|--------|
| tasks | tasks.event_id → events.organization_id | 1 |
| sponsors | sponsors.event_id → events.organization_id | 1 |
| budget_items | budget_items.event_id → events.organization_id | 1 |
| assets | assets.event_id → events.organization_id | 1 |
| ticket_tiers | ticket_tiers.event_id → events.organization_id | 1 |
| registrations | registrations.ticket_tier_id → ticket_tiers.event_id → events.org_id | 2 |
| payments | payments.registration_id → registrations → ticket_tiers → events.org_id | 3 |
| event_phases | event_phases.event_id → events.organization_id | 1 |
| event_schedules | event_schedules.event_id → events.organization_id | 1 |
| event_stakeholders | event_stakeholders.event_id → events.organization_id | 1 |
| task_assignees | task_assignees.task_id → tasks.event_id → events.org_id | 2 |

**Fix Required:** Rewrite ALL child table policies with join-scoped checks

---

### 5. Plaintext OAuth Tokens in Client-Readable Tables

**Severity:** 🔴 CRITICAL  
**Impact:** Credential leak, account takeover  
**Found In:** Proposed Tier 3 social/commerce integration tables

**❌ Current (Wrong):**
```sql
create table instagram_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  access_token text not null,  -- ❌ Plaintext token!
  refresh_token text,           -- ❌ Also leaked!
  created_at timestamptz not null default now()
);

-- RLS allows user to read their own row
create policy "instagram_connections_select"
  on instagram_connections
  for select
  to authenticated
  using (user_id = (select auth.uid()));
  -- ❌ User can now read their tokens from browser!
```

**✅ Correct:**
```sql
-- Table stores NO tokens
create table instagram_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  instagram_account_id text not null,  -- ✅ Account ID only
  status text not null default 'active',
  expires_at timestamptz,
  created_at timestamptz not null default now()
  -- ✅ NO access_token or refresh_token columns
);

-- Tokens stored in Supabase Vault (encrypted, server-only)
-- OR in separate encrypted_tokens table with no RLS read access
```

**Why Critical:**
- Frontend uses anon/authenticated key (not service_role)
- RLS allows users to read their own rows
- If token in row, user can read it from browser DevTools
- Attacker steals token, can impersonate user on external API

**Correct Architecture:**
```
User initiates OAuth flow
  ↓
Frontend redirects to provider
  ↓
Provider redirects back with code
  ↓
Edge Function exchanges code for token
  ↓
Edge Function stores token in Vault (encrypted)
  ↓
Edge Function writes connection metadata to DB (NO TOKEN)
  ↓
Frontend reads connection status (user can see)
  ↓
When API call needed:
  Edge Function reads token from Vault (user cannot access)
  Edge Function makes API call
  Edge Function returns result
```

**Fix Required:**
- Remove ALL token columns from client-readable tables
- Store tokens in Supabase Vault OR encrypted table with service_role-only access
- Update all Tier 3 integration tables

---

## 🟠 HIGH-PRIORITY FAILURES (Fix Before Production)

### 6. Using Deprecated `uuid_generate_v4()`

**Severity:** 🟠 HIGH  
**Impact:** Requires uuid-ossp extension, modern Postgres uses gen_random_uuid()  
**Found In:** All table primary key defaults

**❌ Current (Wrong):**
```sql
create table events (
  id uuid primary key default uuid_generate_v4()  -- ❌ Deprecated
);
```

**✅ Correct:**
```sql
create table events (
  id uuid primary key default gen_random_uuid()  -- ✅ Modern Postgres
);
```

**Why High Priority:**
- `uuid_generate_v4()` requires `uuid-ossp` extension
- `gen_random_uuid()` built into Postgres 13+ (uses pgcrypto)
- Future Postgres versions may deprecate uuid-ossp
- Best practice: use native functions

**Fix Required:** Replace ALL `uuid_generate_v4()` → `gen_random_uuid()`

---

### 7. Unsafe Trigger Function (Missing search_path)

**Severity:** 🟠 HIGH  
**Impact:** Security vulnerability, potential SQL injection  
**Found In:** update_updated_at_column() function

**❌ Current (Wrong):**
```sql
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;
-- ❌ No search_path set
```

**✅ Correct:**
```sql
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql
set search_path = '';  -- ✅ Safe search path
```

**Why High Priority:**
- Without `set search_path`, function uses caller's search path
- Attacker could create malicious schema with same function names
- Could lead to SQL injection or privilege escalation

**Fix Required:** Add `set search_path = ''` to ALL functions

---

### 8. Using `for all` Instead of Specific Operations

**Severity:** 🟠 HIGH  
**Impact:** Over-permissive policies, harder to audit  
**Found In:** Some existing policies (if any)

**❌ Current (Wrong):**
```sql
create policy "events_all"
  on events
  for all  -- ❌ Too broad
  to authenticated
  using (organization_id = auth.user_organization_id());
```

**✅ Correct:**
```sql
-- Separate policy per operation
create policy "events_select"
  on events
  for select
  to authenticated
  using (organization_id = auth.user_organization_id());

create policy "events_insert"
  on events
  for insert
  to authenticated
  with check (organization_id = auth.user_organization_id());

create policy "events_update"
  on events
  for update
  to authenticated
  using (organization_id = auth.user_organization_id());

create policy "events_delete"
  on events
  for delete
  to authenticated
  using (
    organization_id in (
      select organization_id from users
      where id = (select auth.uid())
        and role in ('owner', 'admin')
    )
  );
```

**Why High Priority:**
- `for all` applies same logic to select/insert/update/delete
- Different operations often need different permissions
- Example: everyone can SELECT, only admins can DELETE
- Granular policies = better security

**Fix Required:** Split ALL `for all` policies into separate operation policies

---

### 9. Array Dependency Anti-Pattern

**Severity:** 🟠 HIGH  
**Impact:** Poor query performance, can't use foreign keys, difficult to query  
**Found In:** tasks.dependency_task_ids uuid[]

**❌ Current (Wrong):**
```sql
create table tasks (
  id uuid primary key,
  dependency_task_ids uuid[] default array[]::uuid[]
  -- ❌ Array of task IDs
);

-- Queries are ugly:
select * from tasks
where 'some-uuid' = any(dependency_task_ids);
-- Can't use indexes efficiently
```

**✅ Correct:**
```sql
create table task_dependencies (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references tasks(id) on delete cascade,
  depends_on_task_id uuid not null references tasks(id) on delete cascade,
  created_at timestamptz not null default now(),
  
  constraint task_dependencies_no_self_reference
    check (task_id != depends_on_task_id),
  
  unique (task_id, depends_on_task_id)
);

-- Queries are clean:
select t.*
from tasks t
join task_dependencies td on td.depends_on_task_id = t.id
where td.task_id = 'some-uuid';
-- Uses indexes, foreign keys enforce referential integrity
```

**Why High Priority:**
- Arrays can't use foreign keys (no referential integrity)
- Array queries slow (can't use standard indexes)
- Difficult to join, filter, aggregate
- Can't prevent circular dependencies easily

**Fix Required:** Migrate tasks.dependency_task_ids to task_dependencies join table

---

### 10. date + time text Instead of timestamptz

**Severity:** 🟠 HIGH  
**Impact:** Timezone issues, difficult to query time ranges  
**Found In:** Proposed event_rehearsals, venue_availability tables

**❌ Current (Wrong):**
```sql
create table event_rehearsals (
  id uuid primary key,
  date date not null,          -- ❌ Separate date
  time_slot text not null      -- ❌ Text time like "14:00-16:00"
);
```

**✅ Correct:**
```sql
create table event_rehearsals (
  id uuid primary key,
  start_at timestamptz not null,  -- ✅ Includes date + time + timezone
  end_at timestamptz not null,
  
  constraint valid_time_range
    check (end_at > start_at)
);
```

**Why High Priority:**
- Text times can't be validated (could be "banana")
- Separate date/time makes range queries complex
- No timezone = can't handle international events
- timestamptz handles all edge cases (DST, etc.)

**Fix Required:** Replace ALL date+time_text patterns with timestamptz

---

## 🟡 MEDIUM-PRIORITY FAILURES (Fix in Batch)

### 11. Uppercase SQL Keywords

**Severity:** 🟡 MEDIUM  
**Impact:** Style inconsistency, harder to read  
**Found In:** All existing schema definitions

**❌ Current (Wrong):**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL
);
```

**✅ Correct:**
```sql
create table events (
  id uuid primary key default uuid_generate_v4(),
  name text not null
);
```

**Why Medium Priority:**
- Pure style issue, no functional impact
- Violates SQL style guide
- Modern convention: lowercase keywords

**Fix Required:** Convert ALL SQL to lowercase

---

### 12. Missing Table Comments

**Severity:** 🟡 MEDIUM  
**Impact:** Poor documentation, hard for new devs to understand  
**Found In:** All tables (likely missing or incomplete)

**❌ Current (Wrong):**
```sql
create table events (...);
-- No comment
```

**✅ Correct:**
```sql
create table events (...);

comment on table events is
  'Core event data for fashion shows, photoshoots, and brand activations. Each event belongs to an organization and tracks budget, attendees, and production workflow across multiple phases.';
```

**Why Medium Priority:**
- Doesn't break functionality
- But makes maintenance harder
- Violates best practices

**Fix Required:** Add comments to ALL tables (max 1024 chars)

---

### 13. Missing Column Comments (For Key Fields)

**Severity:** 🟡 MEDIUM  
**Impact:** Unclear purpose of complex columns  
**Found In:** JSONB fields, calculated fields, status enums

**❌ Current (Wrong):**
```sql
create table tasks (
  dependency_task_ids uuid[],  -- No comment explaining format
  workflow_phase text           -- No comment explaining valid values
);
```

**✅ Correct:**
```sql
create table tasks (
  dependency_task_ids uuid[],
  workflow_phase text
);

comment on column tasks.dependency_task_ids is
  'Array of task IDs that must be completed before this task can start. Used for critical path analysis. NOTE: Will be migrated to task_dependencies join table in Stage 4.';

comment on column tasks.workflow_phase is
  'Current workflow phase. Valid values: pre_production, venue_logistics, creative_design, on_site, post_event. Determines task grouping in UI.';
```

**Why Medium Priority:**
- Not critical, but very helpful
- Especially important for:
  - JSONB columns (document structure)
  - Enum-like text fields (document valid values)
  - Calculated fields (document formula)
  - Foreign keys (document relationship)

**Fix Required:** Add comments to key columns (at minimum):
- All JSONB columns
- All status/enum fields
- All calculated/derived fields
- Complex business logic fields

---

### 14. Inconsistent Index Naming

**Severity:** 🟡 MEDIUM  
**Impact:** Harder to manage indexes  
**Found In:** Existing indexes (may vary)

**❌ Current (Various):**
```sql
create index events_org_id on events(organization_id);
create index idx_events_status on events(status);
create index events_created_at_idx on events(created_at);
```

**✅ Correct (Consistent):**
```sql
create index idx_events_organization_id on events(organization_id);
create index idx_events_status on events(status);
create index idx_events_created_at on events(created_at);
-- Pattern: idx_{table}_{column(s)}
```

**Why Medium Priority:**
- Functional impact: none
- Maintenance impact: makes it hard to find indexes
- Convention: idx_{table}_{columns}

**Fix Required:** Rename ALL indexes to follow: `idx_{table}_{columns}`

---

### 15. Inconsistent Constraint Naming

**Severity:** 🟡 MEDIUM  
**Impact:** Harder to debug constraint violations  
**Found In:** Check constraints, unique constraints

**❌ Current (Various):**
```sql
constraint events_check check (status in (...)),
constraint valid_date_range check (end_date >= start_date),
constraint unique_event_name unique (organization_id, name)
```

**✅ Correct (Consistent):**
```sql
constraint events_status_ck check (status in (...)),
constraint events_date_range_ck check (end_date >= start_date),
constraint events_org_name_uk unique (organization_id, name)
-- Pattern: {table}_{column}_{type}
-- Types: _pk (primary key), _fk (foreign key), _uk (unique), _ck (check)
```

**Why Medium Priority:**
- Error messages reference constraint names
- Consistent naming = easier debugging
- Convention: {table}_{column}_{type}

**Fix Required:** Rename ALL constraints to follow pattern

---

## 🟢 LOW-PRIORITY ISSUES (Fix When Convenient)

### 16. Schema Not Explicitly Specified

**Severity:** 🟢 LOW  
**Impact:** Relies on default search_path  
**Found In:** Queries without `public.` prefix

**❌ Current:**
```sql
select * from events;
```

**✅ Better:**
```sql
select * from public.events;
```

**Why Low Priority:**
- Works fine with default search_path
- But explicit is better than implicit
- Avoids confusion if schemas added later

**Fix Required:** Optional — add `public.` prefix to all queries

---

### 17. Missing Function Return Type Comments

**Severity:** 🟢 LOW  
**Impact:** Unclear what function returns  
**Found In:** Custom functions

**Fix Required:** Add comments to all functions explaining return value

---

## 📋 REMEDIATION CHECKLIST

Use this checklist during each stage:

### Code Quality ✅
- [ ] All SQL keywords lowercase
- [ ] All UUIDs use gen_random_uuid()
- [ ] All tables have comments
- [ ] Key columns have comments
- [ ] Indexes named: idx_{table}_{columns}
- [ ] Constraints named: {table}_{column}_{type}
- [ ] Functions have safe search_path
- [ ] Functions have return type comments

### Security (RLS) ✅
- [ ] All tables have RLS enabled
- [ ] All policies specify role (`to authenticated` or `to anon`)
- [ ] INSERT policies use `with check` (not `using`)
- [ ] UPDATE policies use `using + with check`
- [ ] No `for all` policies (split into separate operations)
- [ ] auth.uid() wrapped: `(select auth.uid())`
- [ ] Join-scoped policies for child tables without org_id
- [ ] NO plaintext OAuth tokens in client-readable tables

### Data Modeling ✅
- [ ] No uuid[] arrays for relationships (use join tables)
- [ ] No date+time_text (use timestamptz)
- [ ] Proper cascade deletes configured
- [ ] Unique constraints prevent duplicates
- [ ] Check constraints enforce business rules
- [ ] Indexes on all foreign keys
- [ ] Indexes on frequently queried columns

### Testing ✅
- [ ] Tenant isolation works (cross-org blocked)
- [ ] Role-based access works (viewer vs admin)
- [ ] Cascade deletes work correctly
- [ ] Constraint violations fail as expected
- [ ] RLS performance acceptable (no seq scans)
- [ ] TypeScript types regenerated
- [ ] App integration tests pass

---

## 🔧 AUTOMATED CHECKS

Run these queries to find violations:

### Find tables without RLS:
```sql
select tablename
from pg_tables
where schemaname = 'public'
  and tablename not in (
    select tablename
    from pg_tables pt
    join pg_class c on c.relname = pt.tablename
    where c.relrowsecurity = true
  );
```

### Find policies without explicit role:
```sql
select schemaname, tablename, policyname, roles
from pg_policies
where schemaname = 'public'
  and roles = '{public}';  -- Default role (missing `to authenticated`)
```

### Find functions without search_path:
```sql
select routine_name
from information_schema.routines
where routine_schema = 'public'
  and routine_type = 'FUNCTION'
  and routine_name not in (
    select proname
    from pg_proc
    where proconfig::text ilike '%search_path%'
  );
```

### Find uuid_generate_v4 usage:
```sql
select table_name, column_name, column_default
from information_schema.columns
where table_schema = 'public'
  and column_default ilike '%uuid_generate_v4%';
```

---

## 🚨 STAGE-SPECIFIC FAILURE WARNINGS

### Stage 1: Existing Schema Fixes
**Most Likely Failure:** Forgetting to test RLS after policy changes  
**Prevention:** Run full RLS test suite after each table

### Stage 3: Tier 1 Tables
**Most Likely Failure:** Join-scoped policies wrong (too many/few joins)  
**Prevention:** Test with `explain analyze` to verify join depth

### Stage 4: Anti-Pattern Fixes
**Most Likely Failure:** Data migration drops existing dependencies  
**Prevention:** Create compatibility view BEFORE dropping old column

### Stage 6: Security-Critical Tables
**Most Likely Failure:** Leaking tokens in client-readable tables  
**Prevention:** Test with anon key in browser DevTools

---

*Last Updated: December 20, 2024*  
*Use this checklist for EVERY migration*  
*Zero tolerance for critical failures in production*
