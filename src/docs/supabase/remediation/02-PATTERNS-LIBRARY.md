# RLS & SQL Patterns Library — Copy/Paste Ready
## Reusable Templates for FashionOS Database

**Created:** December 20, 2024  
**Purpose:** Prevent best practice violations through standardized templates  
**Status:** ✅ Production-ready templates

---

## 📋 HOW TO USE THIS LIBRARY

1. **Copy template** from this document
2. **Replace placeholders** (table names, columns, etc.)
3. **Verify SQL** compiles before committing
4. **Run verification queries** at end of each template

**Placeholders:**
- `{table_name}` — Your table name (singular or plural per convention)
- `{column_name}` — Your column name
- `{parent_table}` — Parent table for join-scoped RLS
- `{user_id_column}` — Column storing user reference

---

## 1. MIGRATION HEADER TEMPLATE

**Use for:** Every migration file

```sql
/*
 * Migration: {Short description}
 * Created: {YYYY-MM-DD HH:mm:ss UTC}
 * Author: FashionOS Engineering
 *
 * Purpose:
 *   {Detailed explanation of what this migration accomplishes.
 *    Describe the business requirement and technical solution.}
 *
 * Tables Affected:
 *   - {table_name} (create|modify|delete)
 *   - {table_name} (create|modify|delete)
 *
 * Dependencies:
 *   - Requires: {migration_name} (if depends on other migration)
 *   - Extension: {extension_name} (if requires Postgres extension)
 *
 * Indexes Created:
 *   - idx_{table}_{column}
 *
 * RLS Policies:
 *   - {policy_name} on {table}
 *
 * Rollback:
 *   To revert this migration:
 *   {SQL commands to undo changes}
 *
 * Notes:
 *   - {Special considerations}
 *   - {Performance impact}
 *   - {Breaking changes}
 *
 * Verification:
 *   {SQL queries to verify migration succeeded}
 */
```

**Example:**
```sql
/*
 * Migration: Create ticket tiers table
 * Created: 2024-12-22 10:00:00 UTC
 * Author: FashionOS Engineering
 *
 * Purpose:
 *   Creates the ticket_tiers table to support event ticketing.
 *   Stores ticket types, pricing, and quantity tracking.
 *
 * Tables Affected:
 *   - ticket_tiers (create)
 *
 * Dependencies:
 *   - Requires: 20241221120000_remediate_events.sql
 *
 * Indexes Created:
 *   - idx_ticket_tiers_event_id
 *   - idx_ticket_tiers_type
 *
 * RLS Policies:
 *   - ticket_tiers_select_anon (public read)
 *   - ticket_tiers_select_authenticated (public read)
 *   - ticket_tiers_insert_authenticated (org members)
 *   - ticket_tiers_update_authenticated (org organizers)
 *   - ticket_tiers_delete_authenticated (org admins)
 *
 * Rollback:
 *   drop table if exists public.ticket_tiers cascade;
 *
 * Notes:
 *   - Quantity sold cannot exceed quantity total
 *   - Price can be 0 for comp tickets
 *
 * Verification:
 *   select exists (
 *     select from information_schema.tables
 *     where table_schema = 'public'
 *       and table_name = 'ticket_tiers'
 *   );
 */
```

---

## 2. TABLE CREATION TEMPLATE

**Use for:** Creating new tables

```sql
-- ============================================================
-- Table: {table_name}
-- Purpose: {Brief description}
-- ============================================================

create table public.{table_name} (
  -- Primary key
  id uuid primary key default gen_random_uuid(),
  
  -- Foreign keys (if any)
  {parent_table}_id uuid not null references public.{parent_table}(id) on delete cascade,
  {user_id_column} uuid not null references public.users(id) on delete restrict,
  
  -- Core data columns
  name text not null,
  description text,
  status text not null default 'pending',
  
  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  -- Constraints
  constraint {table_name}_status_ck
    check (status in ('pending', 'active', 'completed', 'cancelled')),
  
  constraint {table_name}_name_uk
    unique ({parent_table}_id, name)
);

-- Table comment (REQUIRED)
comment on table public.{table_name} is
  '{Detailed description of table purpose, relationships, and use cases. Max 1024 characters.}';

-- Column comments (for key fields)
comment on column public.{table_name}.status is
  'Current status. Valid values: pending, active, completed, cancelled. Controls workflow state.';

-- Indexes (REQUIRED for foreign keys and frequent queries)
create index idx_{table_name}_{parent_table}_id
  on public.{table_name}({parent_table}_id);

create index idx_{table_name}_{user_id_column}
  on public.{table_name}({user_id_column});

create index idx_{table_name}_status
  on public.{table_name}(status);

create index idx_{table_name}_created_at
  on public.{table_name}(created_at desc);

-- Enable RLS (REQUIRED)
alter table public.{table_name} enable row level security;

-- RLS policies (see templates below)
-- [Add policies here]

-- Trigger for updated_at (if table has updated_at column)
create trigger update_{table_name}_updated_at
  before update on public.{table_name}
  for each row
  execute function public.update_updated_at_column();
```

**Full Example:**
```sql
-- ============================================================
-- Table: ticket_tiers
-- Purpose: Ticket types and pricing for events
-- ============================================================

create table public.ticket_tiers (
  -- Primary key
  id uuid primary key default gen_random_uuid(),
  
  -- Foreign key
  event_id uuid not null references public.events(id) on delete cascade,
  
  -- Core data
  name text not null,
  type text not null,
  price numeric(10,2) not null default 0,
  quantity_total integer not null,
  quantity_sold integer not null default 0,
  
  -- Metadata
  created_at timestamptz not null default now(),
  
  -- Constraints
  constraint ticket_tiers_type_ck
    check (type in ('paid', 'comp', 'press', 'vip')),
  
  constraint ticket_tiers_price_ck
    check (price >= 0),
  
  constraint ticket_tiers_quantity_ck
    check (
      quantity_total > 0 and
      quantity_sold >= 0 and
      quantity_sold <= quantity_total
    )
);

comment on table public.ticket_tiers is
  'Ticket types and pricing for events. Tracks available quantity and sales for each tier.';

comment on column public.ticket_tiers.type is
  'Ticket classification: paid, comp (complimentary), press (media), vip (special guests).';

comment on column public.ticket_tiers.quantity_sold is
  'Number of tickets sold. Cannot exceed quantity_total. Updated when registrations are created.';

create index idx_ticket_tiers_event_id on public.ticket_tiers(event_id);
create index idx_ticket_tiers_type on public.ticket_tiers(type);

alter table public.ticket_tiers enable row level security;

-- [RLS policies added separately]
```

---

## 3. RLS PATTERN: ORG-SCOPED (Direct org_id)

**Use for:** Tables with `organization_id` column (organizations, events, campaigns, venues, shoots, teams)

```sql
-- SELECT policy for authenticated users
create policy "{table_name}_select_authenticated"
  on public.{table_name}
  for select
  to authenticated
  using (
    organization_id = (
      select organization_id
      from public.users
      where id = (select auth.uid())
    )
  );

comment on policy "{table_name}_select_authenticated" on public.{table_name} is
  'Allow authenticated users to view records from their organization only. Multi-tenant isolation.';

-- INSERT policy for authenticated users
create policy "{table_name}_insert_authenticated"
  on public.{table_name}
  for insert
  to authenticated
  with check (
    organization_id = (
      select organization_id
      from public.users
      where id = (select auth.uid())
    )
  );

comment on policy "{table_name}_insert_authenticated" on public.{table_name} is
  'Allow authenticated users to create records in their organization.';

-- UPDATE policy for authenticated users (creator or admin)
create policy "{table_name}_update_authenticated"
  on public.{table_name}
  for update
  to authenticated
  using (
    created_by = (select auth.uid()) or
    organization_id in (
      select organization_id
      from public.users
      where id = (select auth.uid())
        and role in ('owner', 'admin')
    )
  );

comment on policy "{table_name}_update_authenticated" on public.{table_name} is
  'Allow users to update records they created, or if they are an admin/owner in the same organization.';

-- DELETE policy for authenticated users (admin only)
create policy "{table_name}_delete_authenticated"
  on public.{table_name}
  for delete
  to authenticated
  using (
    organization_id in (
      select organization_id
      from public.users
      where id = (select auth.uid())
        and role in ('owner', 'admin')
    )
  );

comment on policy "{table_name}_delete_authenticated" on public.{table_name} is
  'Only organization owners and admins can delete records. Prevents accidental deletion.';
```

---

## 4. RLS PATTERN: JOIN-SCOPED (1 Level)

**Use for:** Child tables with `event_id` (tasks, sponsors, budget_items, assets, ticket_tiers, event_phases, etc.)

```sql
-- SELECT policy for authenticated users
create policy "{table_name}_select_authenticated"
  on public.{table_name}
  for select
  to authenticated
  using (
    {parent_table}_id in (
      select id
      from public.{parent_table}
      where organization_id = (
        select organization_id
        from public.users
        where id = (select auth.uid())
      )
    )
  );

comment on policy "{table_name}_select_authenticated" on public.{table_name} is
  'Allow authenticated users to view records linked to events in their organization. Join-scoped multi-tenant isolation.';

-- INSERT policy for authenticated users
create policy "{table_name}_insert_authenticated"
  on public.{table_name}
  for insert
  to authenticated
  with check (
    {parent_table}_id in (
      select id
      from public.{parent_table}
      where organization_id = (
        select organization_id
        from public.users
        where id = (select auth.uid())
      )
    )
  );

comment on policy "{table_name}_insert_authenticated" on public.{table_name} is
  'Allow authenticated users to create records for events in their organization.';

-- UPDATE policy for authenticated users
create policy "{table_name}_update_authenticated"
  on public.{table_name}
  for update
  to authenticated
  using (
    {parent_table}_id in (
      select id
      from public.{parent_table}
      where organization_id in (
        select organization_id
        from public.users
        where id = (select auth.uid())
          and role in ('owner', 'admin', 'organizer')
      )
    )
  );

comment on policy "{table_name}_update_authenticated" on public.{table_name} is
  'Allow organizers and admins to update records for events in their organization.';

-- DELETE policy for authenticated users (admin only)
create policy "{table_name}_delete_authenticated"
  on public.{table_name}
  for delete
  to authenticated
  using (
    {parent_table}_id in (
      select id
      from public.{parent_table}
      where organization_id in (
        select organization_id
        from public.users
        where id = (select auth.uid())
          and role in ('owner', 'admin')
      )
    )
  );

comment on policy "{table_name}_delete_authenticated" on public.{table_name} is
  'Only admins can delete records for events in their organization.';
```

**Example (tasks):**
```sql
create policy "tasks_select_authenticated"
  on public.tasks
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
```

---

## 5. RLS PATTERN: JOIN-SCOPED (2 Levels)

**Use for:** Grandchild tables (registrations → ticket_tiers → events, task_assignees → tasks → events)

```sql
-- SELECT policy for authenticated users
create policy "{table_name}_select_authenticated"
  on public.{table_name}
  for select
  to authenticated
  using (
    {parent_table}_id in (
      select id
      from public.{parent_table}
      where {grandparent_table}_id in (
        select id
        from public.{grandparent_table}
        where organization_id = (
          select organization_id
          from public.users
          where id = (select auth.uid())
        )
      )
    )
  );

comment on policy "{table_name}_select_authenticated" on public.{table_name} is
  'Allow authenticated users to view records linked through {parent_table} to {grandparent_table} in their organization. 2-level join-scoped isolation.';

-- INSERT policy
create policy "{table_name}_insert_authenticated"
  on public.{table_name}
  for insert
  to authenticated
  with check (
    {parent_table}_id in (
      select id
      from public.{parent_table}
      where {grandparent_table}_id in (
        select id
        from public.{grandparent_table}
        where organization_id = (
          select organization_id
          from public.users
          where id = (select auth.uid())
        )
      )
    )
  );

-- [UPDATE and DELETE follow same pattern]
```

**Example (registrations):**
```sql
create policy "registrations_select_authenticated"
  on public.registrations
  for select
  to authenticated
  using (
    ticket_tier_id in (
      select id
      from public.ticket_tiers
      where event_id in (
        select id
        from public.events
        where organization_id = (
          select organization_id
          from public.users
          where id = (select auth.uid())
        )
      )
    )
  );
```

---

## 6. RLS PATTERN: PUBLIC READ (Anon + Authenticated)

**Use for:** Tables with public data (ticket_tiers for public event pages, venues directory)

```sql
-- SELECT policy for anonymous users (public read)
create policy "{table_name}_select_anon"
  on public.{table_name}
  for select
  to anon
  using (true);

comment on policy "{table_name}_select_anon" on public.{table_name} is
  'Public read access for anonymous users. This table contains publicly accessible data.';

-- SELECT policy for authenticated users (public read)
create policy "{table_name}_select_authenticated"
  on public.{table_name}
  for select
  to authenticated
  using (true);

comment on policy "{table_name}_select_authenticated" on public.{table_name} is
  'Public read access for authenticated users.';

-- INSERT policy for authenticated users (org-scoped)
create policy "{table_name}_insert_authenticated"
  on public.{table_name}
  for insert
  to authenticated
  with check (
    -- Still enforce org isolation for writes
    {parent_table}_id in (
      select id
      from public.{parent_table}
      where organization_id = (
        select organization_id
        from public.users
        where id = (select auth.uid())
      )
    )
  );

comment on policy "{table_name}_insert_authenticated" on public.{table_name} is
  'Allow authenticated users to create records for their organization events.';

-- [UPDATE and DELETE remain org-scoped]
```

---

## 7. RLS PATTERN: USER-SCOPED (Own Data Only)

**Use for:** User profile data, user preferences, personal settings

```sql
-- SELECT policy for authenticated users (own data only)
create policy "{table_name}_select_authenticated"
  on public.{table_name}
  for select
  to authenticated
  using (
    {user_id_column} = (select auth.uid())
  );

comment on policy "{table_name}_select_authenticated" on public.{table_name} is
  'Allow authenticated users to view only their own records.';

-- INSERT policy
create policy "{table_name}_insert_authenticated"
  on public.{table_name}
  for insert
  to authenticated
  with check (
    {user_id_column} = (select auth.uid())
  );

-- UPDATE policy
create policy "{table_name}_update_authenticated"
  on public.{table_name}
  for update
  to authenticated
  using (
    {user_id_column} = (select auth.uid())
  );

-- DELETE policy
create policy "{table_name}_delete_authenticated"
  on public.{table_name}
  for delete
  to authenticated
  using (
    {user_id_column} = (select auth.uid())
  );
```

---

## 8. TRIGGER FUNCTION TEMPLATE (Safe)

**Use for:** Auto-updating timestamps

```sql
-- ============================================================
-- Function: update_updated_at_column
-- Purpose: Automatically updates updated_at timestamp
-- ============================================================

create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql
set search_path = '';  -- ✅ REQUIRED: Safe search path

comment on function public.update_updated_at_column() is
  'Trigger function that automatically updates the updated_at timestamp to the current time whenever a row is modified. Used across all tables with updated_at columns.';

-- Apply to table
create trigger update_{table_name}_updated_at
  before update on public.{table_name}
  for each row
  execute function public.update_updated_at_column();
```

---

## 9. HELPER FUNCTION TEMPLATE (Security Definer)

**Use for:** Frequently used RLS checks (optimization)

```sql
-- ============================================================
-- Function: auth.user_organization_id
-- Purpose: Get current user's organization ID (cached)
-- ============================================================

create or replace function auth.user_organization_id()
returns uuid as $$
  select organization_id
  from public.users
  where id = auth.uid()
$$ language sql stable security definer
set search_path = '';

comment on function auth.user_organization_id() is
  'Returns the organization_id of the currently authenticated user. Result is cached per query for performance. Used in RLS policies.';

-- Usage in RLS policies:
create policy "events_select_authenticated"
  on public.events
  for select
  to authenticated
  using (organization_id = auth.user_organization_id());
  -- ✅ Function result cached, faster than subquery
```

---

## 10. INDEX TEMPLATES

### Foreign Key Index
```sql
create index idx_{table_name}_{fk_column}
  on public.{table_name}({fk_column});
```

### Multi-Column Index (Org + Status)
```sql
create index idx_{table_name}_org_status
  on public.{table_name}(organization_id, status);
```

### Partial Index (Active Only)
```sql
create index idx_{table_name}_active
  on public.{table_name}(organization_id)
  where status = 'active';
```

### Full-Text Search Index
```sql
create index idx_{table_name}_search
  on public.{table_name}
  using gin(to_tsvector('english', name || ' ' || coalesce(description, '')));
```

### Timestamp Index (Descending)
```sql
create index idx_{table_name}_created_at
  on public.{table_name}(created_at desc);
```

---

## 11. CONSTRAINT TEMPLATES

### Check Constraint (Enum-like)
```sql
constraint {table_name}_{column}_ck
  check ({column} in ('value1', 'value2', 'value3'))
```

### Check Constraint (Range)
```sql
constraint {table_name}_{column}_range_ck
  check ({column} >= 0 and {column} <= 100)
```

### Check Constraint (Date Range)
```sql
constraint {table_name}_date_range_ck
  check (end_date is null or end_date >= start_date)
```

### Unique Constraint (Composite)
```sql
constraint {table_name}_{col1}_{col2}_uk
  unique ({col1}, {col2})
```

### Foreign Key Constraint (Named)
```sql
constraint {table_name}_{fk_column}_fk
  foreign key ({fk_column})
  references public.{parent_table}(id)
  on delete cascade
```

---

## 12. VERIFICATION QUERY TEMPLATES

### Verify Table Exists
```sql
select exists (
  select from information_schema.tables
  where table_schema = 'public'
    and table_name = '{table_name}'
);
-- Expected: true
```

### Verify RLS Enabled
```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename = '{table_name}';
-- Expected: rowsecurity = true
```

### Verify Policies Exist
```sql
select policyname, cmd
from pg_policies
where schemaname = 'public'
  and tablename = '{table_name}'
order by policyname;
-- Expected: 4 policies (select, insert, update, delete)
```

### Verify Indexes Exist
```sql
select indexname
from pg_indexes
where schemaname = 'public'
  and tablename = '{table_name}'
order by indexname;
```

### Verify Constraints Exist
```sql
select constraint_name, constraint_type
from information_schema.table_constraints
where table_schema = 'public'
  and table_name = '{table_name}'
order by constraint_name;
```

### Test Tenant Isolation
```sql
-- This should return 0 if isolation works
select count(*)
from public.{table_name}
where {parent_table}_id in (
  select id
  from public.{parent_table}
  where organization_id != (
    select organization_id
    from public.users
    where id = auth.uid()
  )
);
-- Expected: 0 (cannot see other org's data)
```

---

## 13. ROLLBACK TEMPLATES

### Drop Table
```sql
-- Drop dependent objects first
drop trigger if exists update_{table_name}_updated_at on public.{table_name};

-- Drop policies
drop policy if exists "{table_name}_select_authenticated" on public.{table_name};
drop policy if exists "{table_name}_insert_authenticated" on public.{table_name};
drop policy if exists "{table_name}_update_authenticated" on public.{table_name};
drop policy if exists "{table_name}_delete_authenticated" on public.{table_name};

-- Drop indexes
drop index if exists idx_{table_name}_{column};

-- Drop table (with cascade to drop foreign keys)
drop table if exists public.{table_name} cascade;
```

### Drop Column
```sql
-- Drop dependent indexes
drop index if exists idx_{table_name}_{column};

-- Drop dependent constraints
alter table public.{table_name}
  drop constraint if exists {table_name}_{column}_ck;

-- Drop column
alter table public.{table_name}
  drop column if exists {column};
```

---

## 14. COMPLETE EXAMPLE: ticket_tiers

This is a complete, copy-paste ready example showing all patterns:

```sql
/*
 * Migration: Create ticket tiers table
 * Created: 2024-12-22 10:00:00 UTC
 * Author: FashionOS Engineering
 *
 * Purpose:
 *   Creates the ticket_tiers table to support event ticketing.
 *   Stores ticket types, pricing, and quantity tracking.
 *
 * Tables Affected:
 *   - ticket_tiers (create)
 *
 * Dependencies:
 *   - Requires: events table (existing)
 *
 * RLS Policies:
 *   - Public read (anon + authenticated)
 *   - Org-scoped write (authenticated, join through events)
 *
 * Rollback:
 *   drop table if exists public.ticket_tiers cascade;
 */

-- ============================================================
-- Create table
-- ============================================================

create table public.ticket_tiers (
  -- Primary key
  id uuid primary key default gen_random_uuid(),
  
  -- Foreign key
  event_id uuid not null references public.events(id) on delete cascade,
  
  -- Core data
  name text not null,
  type text not null,
  price numeric(10,2) not null default 0,
  quantity_total integer not null,
  quantity_sold integer not null default 0,
  
  -- Metadata
  created_at timestamptz not null default now(),
  
  -- Constraints
  constraint ticket_tiers_type_ck
    check (type in ('paid', 'comp', 'press', 'vip')),
  
  constraint ticket_tiers_price_ck
    check (price >= 0),
  
  constraint ticket_tiers_quantity_ck
    check (
      quantity_total > 0 and
      quantity_sold >= 0 and
      quantity_sold <= quantity_total
    ),
  
  constraint ticket_tiers_event_name_uk
    unique (event_id, name)
);

-- ============================================================
-- Comments
-- ============================================================

comment on table public.ticket_tiers is
  'Ticket types and pricing for events. Tracks available quantity and sales for each tier (paid, comp, press, vip).';

comment on column public.ticket_tiers.type is
  'Ticket classification: paid (regular purchase), comp (complimentary), press (media), vip (special guests).';

comment on column public.ticket_tiers.quantity_sold is
  'Number of tickets sold. Cannot exceed quantity_total. Updated when registrations are created.';

-- ============================================================
-- Indexes
-- ============================================================

create index idx_ticket_tiers_event_id
  on public.ticket_tiers(event_id);

create index idx_ticket_tiers_type
  on public.ticket_tiers(type);

-- ============================================================
-- Enable RLS
-- ============================================================

alter table public.ticket_tiers enable row level security;

-- ============================================================
-- RLS Policies
-- ============================================================

-- SELECT: Public read for anonymous users
create policy "ticket_tiers_select_anon"
  on public.ticket_tiers
  for select
  to anon
  using (true);

comment on policy "ticket_tiers_select_anon" on public.ticket_tiers is
  'Public read access for anonymous users. Enables public event pages to display ticket options.';

-- SELECT: Public read for authenticated users
create policy "ticket_tiers_select_authenticated"
  on public.ticket_tiers
  for select
  to authenticated
  using (true);

comment on policy "ticket_tiers_select_authenticated" on public.ticket_tiers is
  'Public read access for authenticated users.';

-- INSERT: Org members can create (join-scoped through events)
create policy "ticket_tiers_insert_authenticated"
  on public.ticket_tiers
  for insert
  to authenticated
  with check (
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

comment on policy "ticket_tiers_insert_authenticated" on public.ticket_tiers is
  'Allow authenticated users to create ticket tiers for events in their organization.';

-- UPDATE: Organizers can update (join-scoped through events)
create policy "ticket_tiers_update_authenticated"
  on public.ticket_tiers
  for update
  to authenticated
  using (
    event_id in (
      select id
      from public.events
      where organization_id in (
        select organization_id
        from public.users
        where id = (select auth.uid())
          and role in ('owner', 'admin', 'organizer')
      )
    )
  );

comment on policy "ticket_tiers_update_authenticated" on public.ticket_tiers is
  'Allow organization organizers and admins to update ticket tiers for their events.';

-- DELETE: Admins only can delete (join-scoped through events)
create policy "ticket_tiers_delete_authenticated"
  on public.ticket_tiers
  for delete
  to authenticated
  using (
    event_id in (
      select id
      from public.events
      where organization_id in (
        select organization_id
        from public.users
        where id = (select auth.uid())
          and role in ('owner', 'admin')
      )
    )
  );

comment on policy "ticket_tiers_delete_authenticated" on public.ticket_tiers is
  'Only organization owners and admins can delete ticket tiers.';

-- ============================================================
-- Verification
-- ============================================================

-- Verify table exists
select exists (
  select from information_schema.tables
  where table_schema = 'public'
    and table_name = 'ticket_tiers'
);

-- Verify RLS enabled
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename = 'ticket_tiers';

-- Verify policies (should return 5: 2 select + 1 insert + 1 update + 1 delete)
select count(*)
from pg_policies
where schemaname = 'public'
  and tablename = 'ticket_tiers';
```

---

## 📋 PATTERN SELECTION GUIDE

Use this flowchart to choose the right RLS pattern:

```
Does table have organization_id column?
├─ YES → Use "Org-Scoped (Direct)" pattern (#3)
└─ NO → Does table reference a parent with org_id?
   ├─ YES → How many levels to org_id?
   │  ├─ 1 level (e.g., event_id → events.org_id)
   │  │  └─ Use "Join-Scoped (1 Level)" pattern (#4)
   │  ├─ 2 levels (e.g., ticket_tier_id → event_id → org_id)
   │  │  └─ Use "Join-Scoped (2 Levels)" pattern (#5)
   │  └─ 3+ levels → Consider data model refactor
   └─ NO → Is this user-specific data (no org concept)?
      ├─ YES → Use "User-Scoped" pattern (#7)
      └─ NO → Is this public reference data?
         └─ YES → Use "Public Read" pattern (#6)
```

---

*Last Updated: December 20, 2024*  
*Status: ✅ Production-ready*  
*Copy templates freely — they're battle-tested*
