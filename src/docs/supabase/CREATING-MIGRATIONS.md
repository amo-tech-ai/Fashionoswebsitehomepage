# Creating Database Migrations — FashionOS
## Postgres Migration Guidelines for Supabase CLI

**Last Updated:** December 20, 2024  
**Status:** Production Standards  
**Applies To:** All database schema changes in FashionOS

---

## 📋 TABLE OF CONTENTS

1. [Migration File Naming Convention](#1-migration-file-naming-convention)
2. [Creating a Migration File](#2-creating-a-migration-file)
3. [SQL Guidelines](#3-sql-guidelines)
4. [Migration Header Template](#4-migration-header-template)
5. [Row Level Security (RLS)](#5-row-level-security-rls)
6. [Common Migration Patterns](#6-common-migration-patterns)
7. [Destructive Operations](#7-destructive-operations)
8. [Testing Migrations](#8-testing-migrations)
9. [Migration Checklist](#9-migration-checklist)
10. [Examples](#10-examples)

---

## 1. Migration File Naming Convention

### 1.1 **Naming Format**

The file **MUST** be named in the format:

```
YYYYMMDDHHmmss_short_description.sql
```

**Proper casing for months, minutes, and seconds in UTC time:**

1. `YYYY` — Four digits for the year (e.g., `2024`)
2. `MM` — Two digits for the month (01 to 12)
3. `DD` — Two digits for the day of the month (01 to 31)
4. `HH` — Two digits for the hour in 24-hour format (00 to 23)
5. `mm` — Two digits for the minute (00 to 59)
6. `ss` — Two digits for the second (00 to 59)
7. `_short_description` — Brief description using snake_case

### 1.2 **Examples**

```
✅ CORRECT:
20240906123045_create_profiles.sql
20241220151530_add_venue_fields_to_events.sql
20241220160000_create_ticket_tiers_table.sql
20241220170000_enable_rls_on_campaigns.sql
20250115093000_add_model_profiles_and_agencies.sql

❌ WRONG:
create_profiles.sql                           # Missing timestamp
2024-09-06-create-profiles.sql                # Wrong separator
20240906_create_profiles.sql                  # Missing time
20240906123045_CreateProfiles.sql             # PascalCase description
20240906123045_create profiles.sql            # Spaces instead of underscores
```

### 1.3 **Description Guidelines**

**✅ Good descriptions:**
- `create_events_table`
- `add_venue_capacity_to_events`
- `create_ticket_tiers_and_registrations`
- `update_sponsors_add_fit_score`
- `enable_rls_on_all_tables`
- `create_event_progress_function`
- `add_indexes_to_tasks_table`

**❌ Bad descriptions:**
- `update` (too vague)
- `fix` (not descriptive)
- `changes` (meaningless)
- `migration_1` (no context)
- `new_stuff` (unprofessional)

---

## 2. Creating a Migration File

### 2.1 **File Location**

All migration files **MUST** be created in:

```
supabase/migrations/
```

### 2.2 **Generation Methods**

#### Method 1: Automatic (Recommended)

```bash
# 1. Update schema files in supabase/schemas/
nano supabase/schemas/03_events.sql

# 2. Stop local Supabase
supabase stop

# 3. Generate migration from schema diff
supabase db diff -f add_venue_fields_to_events

# Result: Creates file like:
# supabase/migrations/20241220151530_add_venue_fields_to_events.sql
```

#### Method 2: Manual

```bash
# Create file manually with correct timestamp
touch supabase/migrations/20241220151530_add_venue_fields_to_events.sql

# Edit file
nano supabase/migrations/20241220151530_add_venue_fields_to_events.sql
```

#### Method 3: Using Template

```bash
# Use helper script (create this once)
./scripts/create-migration.sh "add_venue_fields_to_events"

# Script generates timestamp automatically
```

**Helper Script Example:**

```bash
#!/bin/bash
# scripts/create-migration.sh

TIMESTAMP=$(date -u +"%Y%m%d%H%M%S")
DESCRIPTION=$1
FILENAME="supabase/migrations/${TIMESTAMP}_${DESCRIPTION}.sql"

cat > "$FILENAME" << 'EOF'
/*
 * Migration: [DESCRIPTION]
 * Created: [DATE]
 * Author: FashionOS Team
 *
 * Purpose:
 *   [Describe what this migration does]
 *
 * Tables Affected:
 *   - [table_name]
 *
 * Rollback:
 *   [How to revert this migration]
 */

-- Migration SQL goes here
EOF

echo "Created migration: $FILENAME"
```

---

## 3. SQL Guidelines

### 3.1 **Core Principles**

You are a **Postgres Expert** who loves creating secure database schemas.

Write **Postgres-compatible SQL** code for Supabase migration files that:

- ✅ Includes a **header comment** with metadata about the migration
- ✅ Includes **thorough comments** explaining the purpose and expected behavior
- ✅ Write **all SQL in lowercase**
- ✅ Add **copious comments** for any destructive SQL commands
- ✅ **Enable Row Level Security (RLS)** on all new tables
- ✅ Create **granular RLS policies** for each operation and role
- ✅ Include **rollback instructions** in comments

### 3.2 **SQL Formatting**

```sql
-- ✅ CORRECT: Lowercase, well-formatted
create table public.events (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  status text not null default 'planning',
  created_at timestamptz not null default now()
);

-- ❌ WRONG: Uppercase, poor formatting
CREATE TABLE Events (
  ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  OrganizationID UUID NOT NULL REFERENCES Organizations(ID),
  Name TEXT NOT NULL
);
```

### 3.3 **Comment Requirements**

**Every migration MUST include:**

1. **Header comment** with metadata
2. **Purpose** explanation
3. **Tables affected** list
4. **Rollback** instructions
5. **Inline comments** for complex logic
6. **Warning comments** for destructive operations

---

## 4. Migration Header Template

### 4.1 **Standard Header**

```sql
/*
 * Migration: [Short Description]
 * Created: YYYY-MM-DD HH:mm:ss UTC
 * Author: FashionOS Team
 *
 * Purpose:
 *   [Detailed explanation of what this migration accomplishes]
 *
 * Tables Affected:
 *   - [table_name_1] (create/modify/delete)
 *   - [table_name_2] (create/modify/delete)
 *
 * Indexes Created:
 *   - idx_[table]_[column]
 *
 * RLS Policies:
 *   - [policy_name] on [table]
 *
 * Rollback:
 *   To revert this migration:
 *   [SQL commands to undo changes]
 *
 * Notes:
 *   - [Any special considerations]
 *   - [Dependencies on other migrations]
 *   - [Performance impact]
 */
```

### 4.2 **Example Header**

```sql
/*
 * Migration: Add venue fields to events table
 * Created: 2024-12-20 15:15:30 UTC
 * Author: FashionOS Team
 *
 * Purpose:
 *   Adds venue-related fields to the events table to support
 *   venue management without requiring a separate venues table.
 *   Includes capacity, address, and contact information.
 *
 * Tables Affected:
 *   - public.events (modify - add 4 columns)
 *
 * Indexes Created:
 *   - idx_events_venue_name
 *
 * RLS Policies:
 *   - None (existing RLS policies still apply)
 *
 * Rollback:
 *   To revert this migration:
 *   alter table public.events drop column venue_name;
 *   alter table public.events drop column venue_address;
 *   alter table public.events drop column venue_capacity;
 *   alter table public.events drop column venue_contact;
 *   drop index if exists idx_events_venue_name;
 *
 * Notes:
 *   - Existing events will have NULL values for new fields
 *   - Frontend should handle NULL gracefully
 *   - No data migration needed
 */
```

---

## 5. Row Level Security (RLS)

### 5.1 **RLS Requirements**

**When creating a new table, you MUST:**

- ✅ Enable Row Level Security (RLS) **even if the table is intended for public access**
- ✅ Create **granular policies**: one policy per operation (select, insert, update, delete)
- ✅ Create **separate policies** for each Supabase role (`anon` and `authenticated`)
- ❌ **DO NOT** combine policies even if functionality is the same for both roles
- ✅ Include **comments** explaining the rationale and intended behavior

### 5.2 **RLS Template**

```sql
-- Enable RLS on table
alter table public.table_name enable row level security;

-- SELECT policy for anonymous users
create policy "table_name_select_anon"
  on public.table_name
  for select
  to anon
  using (true);  -- Public read access

comment on policy "table_name_select_anon" on public.table_name is
  'Allow anonymous users to view all records. This table contains public data that does not require authentication.';

-- SELECT policy for authenticated users
create policy "table_name_select_authenticated"
  on public.table_name
  for select
  to authenticated
  using (true);  -- Public read access

comment on policy "table_name_select_authenticated" on public.table_name is
  'Allow authenticated users to view all records.';

-- INSERT policy for authenticated users
create policy "table_name_insert_authenticated"
  on public.table_name
  for insert
  to authenticated
  with check (
    organization_id in (
      select organization_id
      from public.users
      where id = auth.uid()
    )
  );

comment on policy "table_name_insert_authenticated" on public.table_name is
  'Allow authenticated users to create records only within their own organization. Ensures multi-tenant data isolation.';

-- UPDATE policy for authenticated users
create policy "table_name_update_authenticated"
  on public.table_name
  for update
  to authenticated
  using (
    created_by = auth.uid() or
    organization_id in (
      select organization_id
      from public.users
      where id = auth.uid()
        and role in ('owner', 'admin')
    )
  );

comment on policy "table_name_update_authenticated" on public.table_name is
  'Allow authenticated users to update records they created, or if they are an admin/owner in the same organization.';

-- DELETE policy for authenticated users
create policy "table_name_delete_authenticated"
  on public.table_name
  for delete
  to authenticated
  using (
    organization_id in (
      select organization_id
      from public.users
      where id = auth.uid()
        and role in ('owner', 'admin')
    )
  );

comment on policy "table_name_delete_authenticated" on public.table_name is
  'Only organization owners and admins can delete records. Prevents accidental data loss.';
```

### 5.3 **Public Table RLS**

For tables with **public read access**:

```sql
-- Enable RLS even for public tables
alter table public.public_data enable row level security;

-- Public read for anonymous users
create policy "public_data_select_anon"
  on public.public_data
  for select
  to anon
  using (true);  -- Allow all to read

comment on policy "public_data_select_anon" on public.public_data is
  'Public read access for anonymous users. This table contains publicly accessible data.';

-- Public read for authenticated users
create policy "public_data_select_authenticated"
  on public.public_data
  for select
  to authenticated
  using (true);  -- Allow all to read

comment on policy "public_data_select_authenticated" on public.public_data is
  'Public read access for authenticated users.';

-- Only authenticated users can insert
create policy "public_data_insert_authenticated"
  on public.public_data
  for insert
  to authenticated
  with check (true);  -- Any authenticated user

comment on policy "public_data_insert_authenticated" on public.public_data is
  'Allow any authenticated user to create records.';
```

---

## 6. Common Migration Patterns

### 6.1 **Create Table**

```sql
/*
 * Create new table: events
 */

-- Create table with proper structure
create table public.events (
  -- Primary key
  id uuid primary key default uuid_generate_v4(),
  
  -- Foreign keys
  organization_id uuid not null references public.organizations(id) on delete cascade,
  created_by uuid not null references public.users(id) on delete restrict,
  
  -- Core data
  name text not null,
  description text,
  status text not null default 'planning',
  
  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  -- Constraints
  constraint events_status_ck check (status in ('planning', 'active', 'completed', 'cancelled'))
);

-- Add comment
comment on table public.events is 'Core event data for fashion shows, photoshoots, and brand activations.';

-- Create indexes
create index idx_events_organization_id on public.events(organization_id);
create index idx_events_created_by on public.events(created_by);
create index idx_events_status on public.events(status);
create index idx_events_created_at on public.events(created_at desc);

-- Enable RLS
alter table public.events enable row level security;

-- Create RLS policies
-- [See section 5.2 for full RLS template]

-- Create trigger for updated_at
create trigger update_events_updated_at
  before update on public.events
  for each row
  execute function public.update_updated_at_column();
```

### 6.2 **Add Column**

```sql
/*
 * Add venue_capacity column to events table
 */

-- Add new column
alter table public.events
  add column venue_capacity integer;

-- Add constraint
alter table public.events
  add constraint events_venue_capacity_ck
    check (venue_capacity > 0);

-- Add comment
comment on column public.events.venue_capacity is
  'Maximum attendee capacity for the event venue. Must be positive integer.';

-- Create index if needed for filtering
create index idx_events_venue_capacity
  on public.events(venue_capacity)
  where venue_capacity is not null;
```

### 6.3 **Modify Column**

```sql
/*
 * Change status column to use different enum values
 */

-- ⚠️ WARNING: This will fail if existing data contains values not in new list
-- Ensure data migration is complete before running this

-- Remove old constraint
alter table public.events
  drop constraint if exists events_status_ck;

-- Add new constraint with updated values
alter table public.events
  add constraint events_status_ck
    check (status in ('draft', 'planning', 'active', 'completed', 'cancelled', 'archived'));

-- Update comment
comment on column public.events.status is
  'Current event status. Valid values: draft, planning, active, completed, cancelled, archived.';
```

### 6.4 **Create Index**

```sql
/*
 * Add indexes for common query patterns
 */

-- Index for organization + status queries
create index idx_events_org_status
  on public.events(organization_id, status);

-- Partial index for active events only
create index idx_events_active
  on public.events(organization_id, start_date)
  where status = 'active';

-- Full-text search index
create index idx_events_search
  on public.events
  using gin(to_tsvector('english', name || ' ' || coalesce(description, '')));
```

### 6.5 **Create Function**

```sql
/*
 * Create function to calculate event progress
 */

create or replace function public.calculate_event_progress(event_uuid uuid)
returns integer as $$
declare
  total_tasks integer;
  completed_tasks integer;
  progress integer;
begin
  -- Count total and completed tasks
  select
    count(*),
    count(*) filter (where status = 'done')
  into total_tasks, completed_tasks
  from public.tasks
  where event_id = event_uuid;
  
  -- Calculate percentage
  if total_tasks > 0 then
    progress := round((completed_tasks::numeric / total_tasks) * 100);
  else
    progress := 0;
  end if;
  
  return progress;
end;
$$ language plpgsql stable;

comment on function public.calculate_event_progress(uuid) is
  'Calculates event completion percentage based on task completion. Returns integer 0-100.';
```

### 6.6 **Add Foreign Key**

```sql
/*
 * Add foreign key relationship between tasks and events
 */

-- Add foreign key with cascading delete
alter table public.tasks
  add constraint tasks_event_id_fk
    foreign key (event_id)
    references public.events(id)
    on delete cascade;

-- Create index on foreign key (important for joins)
create index idx_tasks_event_id
  on public.tasks(event_id);
```

---

## 7. Destructive Operations

### 7.1 **Drop Column**

```sql
/*
 * ⚠️ DESTRUCTIVE OPERATION: Drop unused column
 * 
 * WARNING: This will permanently delete data!
 * 
 * Before running:
 *   1. Ensure no application code references this column
 *   2. Create backup of production database
 *   3. Verify column is truly unused via query logs
 * 
 * Rollback:
 *   Cannot restore data once dropped. Must restore from backup.
 */

-- Drop column (data will be lost)
alter table public.events
  drop column if exists old_field_name;

-- Drop related index if exists
drop index if exists idx_events_old_field_name;
```

### 7.2 **Drop Table**

```sql
/*
 * ⚠️⚠️⚠️ EXTREMELY DESTRUCTIVE OPERATION: Drop entire table
 * 
 * WARNING: This will permanently delete ALL data in the table!
 * 
 * Before running:
 *   1. Export all data to backup
 *   2. Verify no foreign key dependencies
 *   3. Confirm with team lead
 *   4. Create full database backup
 * 
 * Rollback:
 *   Must restore from backup. Data cannot be recovered.
 */

-- Drop dependent objects first
drop trigger if exists update_old_table_updated_at on public.old_table;

-- Drop indexes
drop index if exists idx_old_table_organization_id;
drop index if exists idx_old_table_created_at;

-- Drop RLS policies
drop policy if exists "old_table_select_authenticated" on public.old_table;
drop policy if exists "old_table_insert_authenticated" on public.old_table;

-- Drop table (data will be permanently lost)
drop table if exists public.old_table cascade;
```

### 7.3 **Truncate Table**

```sql
/*
 * ⚠️ DESTRUCTIVE OPERATION: Clear all data from table
 * 
 * WARNING: This will delete ALL rows but preserve table structure!
 * 
 * Before running:
 *   1. Export data to backup
 *   2. Confirm this is intentional
 *   3. Verify dependent tables handle empty state
 * 
 * Rollback:
 *   Must restore from backup or re-import data.
 */

-- Truncate table (removes all rows, preserves structure)
truncate table public.old_data restart identity cascade;
```

### 7.4 **Data Migration**

```sql
/*
 * Migrate data from old column to new column
 */

-- Create new column
alter table public.events
  add column new_status text;

-- Migrate data with transformation
update public.events
set new_status = case
  when old_status = 'pending' then 'planning'
  when old_status = 'in_progress' then 'active'
  when old_status = 'done' then 'completed'
  else 'cancelled'
end;

-- Verify migration (should return 0)
select count(*)
from public.events
where new_status is null and old_status is not null;

-- Add not null constraint after migration
alter table public.events
  alter column new_status set not null;

-- ⚠️ Drop old column after verifying new column works
-- alter table public.events drop column old_status;
```

---

## 8. Testing Migrations

### 8.1 **Local Testing**

```bash
# 1. Reset local database
supabase db reset

# 2. Verify all migrations run successfully
# (migrations run automatically on reset)

# 3. Check for errors in logs
supabase status

# 4. Verify tables created
psql postgresql://postgres:postgres@localhost:54322/postgres -c "\dt public.*"

# 5. Verify RLS enabled
psql postgresql://postgres:postgres@localhost:54322/postgres -c "
  select tablename, rowsecurity
  from pg_tables
  where schemaname = 'public'
  order by tablename;
"

# 6. Test RLS policies work
# Create test users and verify isolation
```

### 8.2 **Migration Validation**

```sql
-- Verify table exists
select exists (
  select from information_schema.tables
  where table_schema = 'public'
    and table_name = 'events'
);

-- Verify columns exist
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'events'
order by ordinal_position;

-- Verify indexes exist
select indexname, indexdef
from pg_indexes
where schemaname = 'public'
  and tablename = 'events';

-- Verify constraints exist
select constraint_name, constraint_type
from information_schema.table_constraints
where table_schema = 'public'
  and table_name = 'events';

-- Verify RLS enabled
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename = 'events';

-- Verify RLS policies exist
select policyname, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'events';
```

---

## 9. Migration Checklist

### 9.1 **Pre-Migration Checklist**

- [ ] Migration file follows naming convention `YYYYMMDDHHmmss_description.sql`
- [ ] Header comment with metadata included
- [ ] Purpose and affected tables documented
- [ ] Rollback instructions included
- [ ] All SQL is lowercase
- [ ] Inline comments explain complex logic
- [ ] Destructive operations have warning comments
- [ ] RLS enabled on all new tables
- [ ] RLS policies created for all roles and operations
- [ ] Indexes created for foreign keys and common queries
- [ ] Constraints include clear check conditions
- [ ] Functions include comments and return types
- [ ] Migration tested locally with `supabase db reset`

### 9.2 **Post-Migration Checklist**

- [ ] Migration runs without errors
- [ ] Tables created successfully
- [ ] Indexes created successfully
- [ ] RLS policies working as expected
- [ ] Data migrated correctly (if applicable)
- [ ] Application code compatible with schema changes
- [ ] TypeScript types regenerated (`supabase gen types typescript`)
- [ ] No breaking changes for existing queries
- [ ] Performance impact acceptable
- [ ] Documentation updated

---

## 10. Examples

### 10.1 **Example: Create Table Migration**

**File:** `supabase/migrations/20241220160000_create_ticket_tiers_table.sql`

```sql
/*
 * Migration: Create ticket tiers table
 * Created: 2024-12-20 16:00:00 UTC
 * Author: FashionOS Team
 *
 * Purpose:
 *   Creates the ticket_tiers table to support event ticketing functionality.
 *   Stores ticket types, pricing, and quantity tracking for events.
 *
 * Tables Affected:
 *   - public.ticket_tiers (create)
 *
 * Indexes Created:
 *   - idx_ticket_tiers_event_id
 *   - idx_ticket_tiers_type
 *
 * RLS Policies:
 *   - ticket_tiers_select_anon (public read)
 *   - ticket_tiers_select_authenticated (public read)
 *   - ticket_tiers_insert_authenticated (org members)
 *   - ticket_tiers_update_authenticated (org admins)
 *   - ticket_tiers_delete_authenticated (org admins)
 *
 * Rollback:
 *   To revert this migration:
 *   drop table if exists public.ticket_tiers cascade;
 *
 * Notes:
 *   - Quantity sold cannot exceed quantity total
 *   - Price can be 0 for comp tickets
 *   - Type includes: paid, comp, press, vip
 */

-- Create table
create table public.ticket_tiers (
  -- Primary key
  id uuid primary key default uuid_generate_v4(),
  
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
    check (quantity_total > 0 and quantity_sold >= 0 and quantity_sold <= quantity_total)
);

-- Add table comment
comment on table public.ticket_tiers is
  'Ticket types and pricing for events. Tracks available quantity and sales for each tier (paid, comp, press, vip).';

-- Add column comments
comment on column public.ticket_tiers.name is
  'Display name for ticket tier (e.g., "VIP Front Row", "General Admission").';

comment on column public.ticket_tiers.type is
  'Ticket classification: paid (regular purchase), comp (complimentary), press (media), vip (special guests).';

comment on column public.ticket_tiers.quantity_sold is
  'Number of tickets sold. Cannot exceed quantity_total. Updated when registrations are created.';

-- Create indexes
create index idx_ticket_tiers_event_id
  on public.ticket_tiers(event_id);

create index idx_ticket_tiers_type
  on public.ticket_tiers(type);

-- Enable RLS
alter table public.ticket_tiers enable row level security;

-- SELECT policy for anonymous users (public events)
create policy "ticket_tiers_select_anon"
  on public.ticket_tiers
  for select
  to anon
  using (true);

comment on policy "ticket_tiers_select_anon" on public.ticket_tiers is
  'Allow anonymous users to view all ticket tiers. Enables public event pages to display ticket options.';

-- SELECT policy for authenticated users
create policy "ticket_tiers_select_authenticated"
  on public.ticket_tiers
  for select
  to authenticated
  using (true);

comment on policy "ticket_tiers_select_authenticated" on public.ticket_tiers is
  'Allow authenticated users to view all ticket tiers.';

-- INSERT policy for authenticated users (org members)
create policy "ticket_tiers_insert_authenticated"
  on public.ticket_tiers
  for insert
  to authenticated
  with check (
    event_id in (
      select e.id
      from public.events as e
      where e.organization_id in (
        select organization_id
        from public.users
        where id = auth.uid()
      )
    )
  );

comment on policy "ticket_tiers_insert_authenticated" on public.ticket_tiers is
  'Allow authenticated users to create ticket tiers for events in their organization.';

-- UPDATE policy for authenticated users (org admins)
create policy "ticket_tiers_update_authenticated"
  on public.ticket_tiers
  for update
  to authenticated
  using (
    event_id in (
      select e.id
      from public.events as e
      where e.organization_id in (
        select organization_id
        from public.users
        where id = auth.uid()
          and role in ('owner', 'admin', 'organizer')
      )
    )
  );

comment on policy "ticket_tiers_update_authenticated" on public.ticket_tiers is
  'Allow organization admins and organizers to update ticket tiers for their events.';

-- DELETE policy for authenticated users (org admins only)
create policy "ticket_tiers_delete_authenticated"
  on public.ticket_tiers
  for delete
  to authenticated
  using (
    event_id in (
      select e.id
      from public.events as e
      where e.organization_id in (
        select organization_id
        from public.users
        where id = auth.uid()
          and role in ('owner', 'admin')
      )
    )
  );

comment on policy "ticket_tiers_delete_authenticated" on public.ticket_tiers is
  'Only organization owners and admins can delete ticket tiers. Prevents accidental deletion by organizers.';
```

### 10.2 **Example: Add Column Migration**

**File:** `supabase/migrations/20241220170000_add_venue_fields_to_events.sql`

```sql
/*
 * Migration: Add venue fields to events table
 * Created: 2024-12-20 17:00:00 UTC
 * Author: FashionOS Team
 *
 * Purpose:
 *   Adds venue-related fields to events table for basic venue tracking
 *   without requiring a separate venues table. Supports single-venue events.
 *
 * Tables Affected:
 *   - public.events (modify - add 4 columns)
 *
 * Indexes Created:
 *   - idx_events_venue_name
 *
 * RLS Policies:
 *   - None (existing RLS policies still apply)
 *
 * Rollback:
 *   To revert this migration:
 *   alter table public.events drop column venue_name;
 *   alter table public.events drop column venue_address;
 *   alter table public.events drop column venue_capacity;
 *   alter table public.events drop column venue_contact;
 *   drop index if exists idx_events_venue_name;
 *
 * Notes:
 *   - All new columns are nullable (backward compatible)
 *   - Existing events will have NULL values
 *   - Frontend should handle NULL gracefully
 *   - For multi-venue events, will need separate venues table (future)
 */

-- Add venue name
alter table public.events
  add column venue_name text;

comment on column public.events.venue_name is
  'Name of the event venue (e.g., "Grand Palais", "Studio 54"). Nullable for events without confirmed venue.';

-- Add venue address
alter table public.events
  add column venue_address text;

comment on column public.events.venue_address is
  'Full address of the event venue. Nullable until venue is confirmed.';

-- Add venue capacity
alter table public.events
  add column venue_capacity integer;

comment on column public.events.venue_capacity is
  'Maximum attendee capacity of the venue. Used for ticket sales limits and space planning.';

-- Add venue contact
alter table public.events
  add column venue_contact text;

comment on column public.events.venue_contact is
  'Contact information for venue coordinator. Nullable for public venues.';

-- Add constraint for capacity (must be positive if provided)
alter table public.events
  add constraint events_venue_capacity_ck
    check (venue_capacity is null or venue_capacity > 0);

-- Create index for venue name searches
create index idx_events_venue_name
  on public.events(venue_name)
  where venue_name is not null;
```

### 10.3 **Example: Enable RLS Migration**

**File:** `supabase/migrations/20241220180000_enable_rls_on_campaigns.sql`

```sql
/*
 * Migration: Enable RLS on campaigns table
 * Created: 2024-12-20 18:00:00 UTC
 * Author: FashionOS Team
 *
 * Purpose:
 *   Enables Row Level Security on campaigns table and creates
 *   organization-scoped policies to ensure multi-tenant isolation.
 *
 * Tables Affected:
 *   - public.campaigns (add RLS)
 *
 * RLS Policies:
 *   - campaigns_select_authenticated (org members can view)
 *   - campaigns_insert_authenticated (org members can create)
 *   - campaigns_update_authenticated (creator or admin can update)
 *   - campaigns_delete_authenticated (admin only can delete)
 *
 * Rollback:
 *   To revert this migration:
 *   drop policy if exists "campaigns_select_authenticated" on public.campaigns;
 *   drop policy if exists "campaigns_insert_authenticated" on public.campaigns;
 *   drop policy if exists "campaigns_update_authenticated" on public.campaigns;
 *   drop policy if exists "campaigns_delete_authenticated" on public.campaigns;
 *   alter table public.campaigns disable row level security;
 *
 * Notes:
 *   - No anon policies (campaigns are private to organizations)
 *   - Creators can edit their own campaigns
 *   - Only admins can delete campaigns
 */

-- Enable RLS
alter table public.campaigns enable row level security;

-- SELECT policy for authenticated users
create policy "campaigns_select_authenticated"
  on public.campaigns
  for select
  to authenticated
  using (
    organization_id in (
      select organization_id
      from public.users
      where id = auth.uid()
    )
  );

comment on policy "campaigns_select_authenticated" on public.campaigns is
  'Allow authenticated users to view campaigns from their organization only. Ensures multi-tenant data isolation.';

-- INSERT policy for authenticated users
create policy "campaigns_insert_authenticated"
  on public.campaigns
  for insert
  to authenticated
  with check (
    organization_id in (
      select organization_id
      from public.users
      where id = auth.uid()
    )
  );

comment on policy "campaigns_insert_authenticated" on public.campaigns is
  'Allow authenticated users to create campaigns in their organization. Organization ID is enforced at insert.';

-- UPDATE policy for authenticated users (creator or admin)
create policy "campaigns_update_authenticated"
  on public.campaigns
  for update
  to authenticated
  using (
    created_by = auth.uid() or
    organization_id in (
      select organization_id
      from public.users
      where id = auth.uid()
        and role in ('owner', 'admin')
    )
  );

comment on policy "campaigns_update_authenticated" on public.campaigns is
  'Allow users to update campaigns they created, or if they are an admin/owner in the same organization.';

-- DELETE policy for authenticated users (admin only)
create policy "campaigns_delete_authenticated"
  on public.campaigns
  for delete
  to authenticated
  using (
    organization_id in (
      select organization_id
      from public.users
      where id = auth.uid()
        and role in ('owner', 'admin')
    )
  );

comment on policy "campaigns_delete_authenticated" on public.campaigns is
  'Only organization owners and admins can delete campaigns. Prevents accidental deletion by regular users.';
```

---

## 📚 QUICK REFERENCE

### Migration File Template

```sql
/*
 * Migration: [Description]
 * Created: YYYY-MM-DD HH:mm:ss UTC
 * Author: FashionOS Team
 *
 * Purpose:
 *   [What this migration does]
 *
 * Tables Affected:
 *   - [table] (create/modify/delete)
 *
 * Rollback:
 *   [SQL to revert]
 *
 * Notes:
 *   - [Important considerations]
 */

-- Your migration SQL here
```

### Commands

```bash
# Generate migration from schema
supabase db diff -f migration_name

# Reset local database (runs all migrations)
supabase db reset

# Apply migrations to production
supabase db push

# Generate TypeScript types
supabase gen types typescript --local > lib/supabase/types.ts
```

---

*Last Updated: December 20, 2024*  
*Version: 1.0*  
*Maintained by: FashionOS Engineering Team*
