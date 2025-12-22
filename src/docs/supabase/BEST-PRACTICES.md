# Supabase Best Practices — FashionOS
## Database Management, Security & Performance Guidelines

**Last Updated:** December 20, 2024  
**Status:** Production Standards  
**Applies To:** All FashionOS database operations

---

## 📋 TABLE OF CONTENTS

1. [Declarative Database Schema](#1-declarative-database-schema)
2. [Row Level Security (RLS)](#2-row-level-security-rls)
3. [Performance Optimization](#3-performance-optimization)
4. [Security Guidelines](#4-security-guidelines)
5. [Data Modeling](#5-data-modeling)
6. [TypeScript Integration](#6-typescript-integration)
7. [Testing & Validation](#7-testing--validation)
8. [Deployment Procedures](#8-deployment-procedures)
9. [Monitoring & Maintenance](#9-monitoring--maintenance)
10. [Common Pitfalls](#10-common-pitfalls)

---

## 1. Declarative Database Schema

### Mandatory Instructions for Supabase Declarative Schema Management

#### 1.1 **Exclusive Use of Declarative Schema**

- ✅ **All database schema modifications must be defined within `.sql` files located in the `supabase/schemas/` directory**
- ❌ **Do not** create or modify files directly in the `supabase/migrations/` directory unless the modification is about the known caveats below
- Migration files are to be generated automatically through the CLI

#### 1.2 **Schema Declaration**

- For each database entity (e.g., tables, views, functions), create or update a corresponding `.sql` file in the `supabase/schemas/` directory
- Ensure that each `.sql` file accurately represents the desired final state of the entity

**Example Structure:**
```
supabase/
├── schemas/
│   ├── 01_organizations.sql
│   ├── 02_users.sql
│   ├── 03_events.sql
│   ├── 04_tasks.sql
│   ├── 05_sponsors.sql
│   ├── 06_budget_items.sql
│   ├── 07_assets.sql
│   ├── 08_campaigns.sql
│   └── functions/
│       ├── update_timestamps.sql
│       └── calculate_event_progress.sql
└── migrations/
    └── (auto-generated files only)
```

#### 1.3 **Migration Generation**

**CRITICAL: Always stop the local environment before generating migrations**

```bash
# 1. Stop local Supabase
supabase stop

# 2. Generate migration file
supabase db diff -f <migration_name>

# Example:
supabase db diff -f add_ticket_tiers_table

# 3. Review the generated migration
cat supabase/migrations/[timestamp]_add_ticket_tiers_table.sql

# 4. Start environment and test
supabase start
```

**Migration Naming Convention:**
```
✅ Good: add_ticket_tiers_table
✅ Good: update_events_add_venue_fields
✅ Good: create_event_progress_function
❌ Bad: migration_1
❌ Bad: update
❌ Bad: fix_stuff
```

#### 1.4 **Schema File Organization**

- Schema files are executed in **lexicographic order**
- To manage dependencies (e.g., foreign keys), name files to ensure correct execution order
- When adding new columns, **append them to the end** of the table definition to prevent unnecessary diffs

**Naming Strategy:**
```
01_organizations.sql     # Base table (no dependencies)
02_users.sql            # Depends on: organizations
03_events.sql           # Depends on: organizations, users
04_tasks.sql            # Depends on: events, users
...
```

**Column Addition Example:**
```sql
-- ✅ CORRECT: Append new columns at end
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- NEW COLUMNS ADDED HERE
  venue_capacity INTEGER,        -- Added Week 3
  ticket_sales_enabled BOOLEAN   -- Added Week 4
);

-- ❌ WRONG: Inserting columns in middle
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  venue_capacity INTEGER,        -- ❌ Breaks diff
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### 1.5 **Rollback Procedures**

To revert changes:

1. **Manually update** the relevant `.sql` files in `supabase/schemas/` to reflect the desired state
2. **Generate a new migration** file capturing the rollback:
   ```bash
   supabase db diff -f rollback_<original_migration_name>
   ```
3. **Review the generated migration file carefully** to avoid unintentional data loss

**Example Rollback:**
```bash
# 1. Edit schema file to remove changes
nano supabase/schemas/03_events.sql

# 2. Generate rollback migration
supabase stop
supabase db diff -f rollback_add_venue_fields

# 3. Review generated SQL
cat supabase/migrations/[timestamp]_rollback_add_venue_fields.sql

# 4. Apply rollback
supabase db reset
```

#### 1.6 **Known Caveats**

The `migra` diff tool used for generating schema diff is capable of tracking most database changes. However, there are edge cases where it can fail.

**If you need to use any of the entities below, add them through versioned migrations instead:**

##### Data Manipulation Language (DML)
- ❌ `INSERT`, `UPDATE`, `DELETE` statements are not captured by schema diff
- ✅ Use manual migrations for data changes:
  ```sql
  -- supabase/migrations/20241220_seed_default_roles.sql
  INSERT INTO roles (name, permissions) VALUES
    ('owner', '["all"]'),
    ('admin', '["manage_events", "manage_users"]');
  ```

##### View Ownership
- ❌ View owner and grants
- ❌ Security invoker on views
- ❌ Materialized views
- ❌ Doesn't recreate views when altering column type

##### RLS Policies
- ❌ `ALTER POLICY` statements
- ❌ Column privileges
- ✅ Always use `DROP POLICY` + `CREATE POLICY` pattern:
  ```sql
  -- ✅ CORRECT
  DROP POLICY IF EXISTS "events_select" ON events;
  CREATE POLICY "events_select" ON events FOR SELECT
    USING (organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid()
    ));
  ```

##### Other Entities Not Tracked
- ❌ Schema privileges (each schema is diffed separately)
- ❌ Comments
- ❌ Partitions
- ❌ `ALTER PUBLICATION ... ADD TABLE ...`
- ❌ `CREATE DOMAIN` statements
- ❌ Duplicate grant statements from default privileges

---

**⚠️ NON-COMPLIANCE WARNING:**  
Failure to follow these instructions may lead to inconsistent database states and is strictly prohibited.

---

## 2. Row Level Security (RLS)

### 2.1 **Always Enable RLS**

```sql
-- ✅ Enable RLS on ALL tables
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- ❌ NEVER leave tables without RLS in production
```

### 2.2 **Organization-Scoped Access Pattern**

FashionOS uses multi-tenant organization isolation. All policies should follow this pattern:

```sql
-- SELECT: View if in same organization
CREATE POLICY "table_name_select" ON table_name FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

-- INSERT: Create if user belongs to organization
CREATE POLICY "table_name_insert" ON table_name FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

-- UPDATE: Creator or admin can update
CREATE POLICY "table_name_update" ON table_name FOR UPDATE
  USING (
    created_by = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- DELETE: Only admins can delete
CREATE POLICY "table_name_delete" ON table_name FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );
```

### 2.3 **Role-Based Access Control**

**FashionOS Roles:**
- `owner` — Full access to organization
- `admin` — Manage events, users, settings
- `organizer` — Create/manage events
- `viewer` — Read-only access

**Example Policy with Role Check:**
```sql
-- Only organizers can create events
CREATE POLICY "events_insert" ON events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
        AND organization_id = events.organization_id
        AND role IN ('owner', 'admin', 'organizer')
    )
  );
```

### 2.4 **Performance Considerations**

**❌ BAD: Subquery in every row check**
```sql
CREATE POLICY "slow_policy" ON events FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );
-- This runs a subquery for EVERY row
```

**✅ BETTER: Use security definer function**
```sql
-- Create helper function
CREATE OR REPLACE FUNCTION auth.user_organization_id()
RETURNS UUID AS $$
  SELECT organization_id FROM users WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Use in policy
CREATE POLICY "fast_policy" ON events FOR SELECT
  USING (organization_id = auth.user_organization_id());
-- Function result is cached per query
```

### 2.5 **Testing RLS Policies**

**Test as different users:**
```sql
-- Switch to user context
SET request.jwt.claims.sub = 'user-uuid-here';

-- Test queries
SELECT * FROM events;  -- Should only see org events

-- Reset
RESET request.jwt.claims.sub;
```

**Use Supabase SQL Editor:**
```sql
-- Test policy logic directly
SELECT 
  e.id,
  e.name,
  e.organization_id,
  u.organization_id as user_org,
  CASE 
    WHEN e.organization_id = u.organization_id THEN 'ALLOWED'
    ELSE 'DENIED'
  END as access
FROM events e
CROSS JOIN users u
WHERE u.id = auth.uid();
```

---

## 3. Performance Optimization

### 3.1 **Indexing Strategy**

**Always Index:**
- ✅ Primary keys (automatic)
- ✅ Foreign keys
- ✅ `organization_id` (for multi-tenant isolation)
- ✅ Columns in `WHERE` clauses
- ✅ Columns in `ORDER BY` clauses
- ✅ Columns in `JOIN` conditions

**FashionOS Index Pattern:**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  created_by UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Required indexes
CREATE INDEX idx_events_organization_id ON events(organization_id);  -- Multi-tenancy
CREATE INDEX idx_events_created_by ON events(created_by);            -- Join
CREATE INDEX idx_events_status ON events(status);                    -- Filter
CREATE INDEX idx_events_start_date ON events(start_date);            -- Sort
CREATE INDEX idx_events_created_at ON events(created_at DESC);       -- Recent items

-- Full-text search (if needed)
CREATE INDEX idx_events_search ON events 
  USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
```

### 3.2 **Partial Indexes**

Use partial indexes to reduce index size:

```sql
-- Index only critical path tasks
CREATE INDEX idx_tasks_critical_path ON tasks(is_critical_path) 
WHERE is_critical_path = true;

-- Index only active events
CREATE INDEX idx_events_active ON events(organization_id, start_date)
WHERE status IN ('planning', 'active');

-- Index only featured assets
CREATE INDEX idx_assets_featured ON assets(event_id)
WHERE is_featured = true;
```

### 3.3 **Query Optimization**

**❌ BAD: N+1 Queries**
```typescript
// Fetches events, then loops to fetch tasks
const events = await supabase.from('events').select('*');
for (const event of events.data) {
  const tasks = await supabase
    .from('tasks')
    .select('*')
    .eq('event_id', event.id);
}
```

**✅ GOOD: Use Joins**
```typescript
const { data } = await supabase
  .from('events')
  .select(`
    *,
    tasks (*),
    sponsors (*),
    budget_items (*)
  `);
```

**✅ BETTER: Select Only What You Need**
```typescript
const { data } = await supabase
  .from('events')
  .select(`
    id,
    name,
    status,
    tasks (
      id,
      title,
      status
    )
  `)
  .eq('status', 'active')
  .order('start_date', { ascending: true })
  .limit(10);
```

### 3.4 **Avoid SELECT * in Production**

```sql
-- ❌ BAD: Fetches unnecessary columns
SELECT * FROM events;

-- ✅ GOOD: Explicit columns
SELECT 
  id,
  name,
  status,
  start_date,
  organization_id
FROM events
WHERE status = 'active';
```

### 3.5 **Use EXPLAIN ANALYZE**

```sql
EXPLAIN ANALYZE
SELECT 
  e.*,
  COUNT(t.id) as task_count
FROM events e
LEFT JOIN tasks t ON t.event_id = e.id
WHERE e.organization_id = '...'
GROUP BY e.id;

-- Look for:
-- ✅ Index Scan (good)
-- ❌ Seq Scan (bad - add index)
-- ✅ Hash Join (good for large tables)
-- ❌ Nested Loop (bad for large tables)
```

---

## 4. Security Guidelines

### 4.1 **API Keys**

**❌ NEVER expose service_role key in frontend:**
```typescript
// ❌ DANGER: Full database access
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // ❌ Backend only!
);
```

**✅ Use anon key in frontend:**
```typescript
// ✅ SAFE: RLS enforced
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!  // ✅ Public key
);
```

### 4.2 **Environment Variables**

```bash
# .env.local (frontend)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  # ✅ Public

# .env (backend/server actions)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...      # ❌ Private - never commit
```

### 4.3 **Storage Bucket Security**

```sql
-- Make avatars public
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- RLS policy for avatars
CREATE POLICY "Avatar upload policy"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Make event assets private (org-scoped)
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-assets', 'event-assets', false);

CREATE POLICY "Event asset access"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'event-assets' AND
  EXISTS (
    SELECT 1 FROM events
    WHERE id::text = (storage.foldername(name))[1]
      AND organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
      )
  )
);
```

### 4.4 **SQL Injection Prevention**

**✅ Supabase client sanitizes automatically:**
```typescript
// ✅ SAFE: Parameterized query
const { data } = await supabase
  .from('events')
  .select('*')
  .eq('name', userInput);  // Automatically escaped
```

**⚠️ Be careful with raw SQL:**
```typescript
// ❌ DANGER: SQL injection risk
const { data } = await supabase.rpc('search_events', {
  query: `name LIKE '%${userInput}%'`  // ❌ Never interpolate
});

// ✅ SAFE: Pass as parameter
const { data } = await supabase.rpc('search_events', {
  search_term: userInput  // ✅ Function handles escaping
});
```

---

## 5. Data Modeling

### 5.1 **UUID Primary Keys**

```sql
-- ✅ Always use UUID for primary keys
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- ...
);

-- ❌ Avoid serial/bigserial in multi-tenant systems
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,  -- ❌ Sequential IDs leak data
  -- ...
);
```

### 5.2 **Timestamps**

```sql
-- ✅ Always include created_at and updated_at
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- ... columns ...
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update trigger
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 5.3 **Soft Deletes**

```sql
-- For sensitive data that shouldn't be permanently deleted
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- ... columns ...
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for active records
CREATE INDEX idx_events_active ON events(organization_id)
WHERE deleted_at IS NULL;

-- RLS policy excludes soft-deleted
CREATE POLICY "events_select" ON events FOR SELECT
  USING (
    deleted_at IS NULL AND
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );
```

### 5.4 **JSONB for Flexible Data**

**✅ Good use cases:**
- Settings/preferences
- API response cache
- Audit logs
- Feature flags

```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand_signals JSONB DEFAULT '{}'::jsonb,
  strategy JSONB DEFAULT '{}'::jsonb,
  channel_packs JSONB DEFAULT '[]'::jsonb
);

-- Index JSONB fields
CREATE INDEX idx_campaigns_brand_signals ON campaigns 
  USING gin(brand_signals);

-- Query JSONB
SELECT * FROM campaigns
WHERE brand_signals->>'website' = 'https://example.com';
```

**❌ Bad use cases:**
- Relational data (use foreign keys)
- Frequently queried fields (use columns)
- Data that needs strict validation

### 5.5 **Constraints**

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Enum-like constraints
  status TEXT NOT NULL CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  
  -- Range constraints
  progress_percentage INTEGER CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  budget_total NUMERIC(12,2) CHECK (budget_total >= 0),
  
  -- Date validation
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  CONSTRAINT valid_date_range CHECK (end_date IS NULL OR end_date >= start_date),
  
  -- Unique constraints
  CONSTRAINT unique_event_name_per_org UNIQUE (organization_id, name)
);
```

---

## 6. TypeScript Integration

### 6.1 **Generate Types Automatically**

```bash
# Generate types from remote database
supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts

# Generate from local database
supabase gen types typescript --local > lib/supabase/types.ts
```

### 6.2 **Type-Safe Client**

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Usage with full type safety
const { data, error } = await supabase
  .from('events')
  .select('id, name, status')
  .eq('organization_id', orgId);

// data is typed as:
// { id: string; name: string; status: string }[] | null
```

### 6.3 **Helper Types**

```typescript
// lib/supabase/helpers.ts
import { Database } from './types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type Inserts<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type Updates<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Usage
type Event = Tables<'events'>;
type NewEvent = Inserts<'events'>;
type EventUpdate = Updates<'events'>;
```

---

## 7. Testing & Validation

### 7.1 **Local Development**

```bash
# Start local Supabase
supabase start

# Reset database to clean state
supabase db reset

# Run migrations
supabase migration up

# Run tests
npm test
```

### 7.2 **Test RLS Policies**

```typescript
// tests/rls.test.ts
import { createClient } from '@supabase/supabase-js';

describe('RLS Policies', () => {
  it('users can only view events from their organization', async () => {
    // Create test user 1 (Org A)
    const user1Client = createClient(/* ... */);
    
    // Create test user 2 (Org B)
    const user2Client = createClient(/* ... */);
    
    // User 1 creates event
    const { data: event } = await user1Client
      .from('events')
      .insert({ name: 'Org A Event' })
      .single();
    
    // User 2 tries to access
    const { data } = await user2Client
      .from('events')
      .select('*')
      .eq('id', event.id);
    
    // Should be empty (no access)
    expect(data).toHaveLength(0);
  });
});
```

### 7.3 **Migration Testing**

```bash
# Test migration on fresh database
supabase db reset
supabase migration up

# Verify schema
supabase db diff

# Should output: "No schema changes detected"
```

---

## 8. Deployment Procedures

### 8.1 **Pre-Deployment Checklist**

- [ ] All migrations tested locally
- [ ] TypeScript types regenerated
- [ ] RLS policies verified
- [ ] Indexes added for new queries
- [ ] Backup current production database
- [ ] Rollback plan prepared

### 8.2 **Deploy Migrations**

```bash
# Link to production project
supabase link --project-ref YOUR_PROJECT_ID

# Push migrations
supabase db push

# Verify in Supabase Dashboard
# Settings → Database → Migrations
```

### 8.3 **Rollback Procedure**

```bash
# Option 1: Create rollback migration
supabase db diff -f rollback_migration_name
supabase db push

# Option 2: Restore from backup
# Use Supabase Dashboard → Database → Backups
```

---

## 9. Monitoring & Maintenance

### 9.1 **Query Performance**

Monitor slow queries in Supabase Dashboard:
- **Database → Query Performance**
- Look for queries taking > 1000ms
- Add indexes for frequently slow queries

### 9.2 **Database Size**

```sql
-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 9.3 **Index Usage**

```sql
-- Check unused indexes
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;

-- Consider dropping indexes with 0 scans
```

### 9.4 **Connection Pooling**

```typescript
// For serverless functions, use connection pooler
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'public',
    },
    auth: {
      persistSession: false,  // Important for serverless
    },
  }
);
```

---

## 10. Common Pitfalls

### 10.1 **Forgetting RLS**

```sql
-- ❌ Table created without RLS
CREATE TABLE events (...);
-- Anyone can access all data!

-- ✅ Always enable RLS
CREATE TABLE events (...);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
```

### 10.2 **Missing Indexes**

```sql
-- ❌ Query without index
SELECT * FROM events WHERE organization_id = '...';
-- Seq Scan on events (cost=0.00..1000000.00)

-- ✅ Add index
CREATE INDEX idx_events_organization_id ON events(organization_id);
-- Index Scan using idx_events_organization_id (cost=0.00..8.27)
```

### 10.3 **Exposing Service Role Key**

```typescript
// ❌ NEVER in frontend
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // ❌ Full access!
);
```

### 10.4 **Not Using Transactions**

```typescript
// ❌ Multiple operations without transaction
await supabase.from('events').insert(event);
await supabase.from('tasks').insert(tasks);
// If second insert fails, first is still committed

// ✅ Use RPC with transaction
await supabase.rpc('create_event_with_tasks', {
  event_data: event,
  tasks_data: tasks
});

// In Postgres function:
// BEGIN;
//   INSERT INTO events...
//   INSERT INTO tasks...
// COMMIT;
```

### 10.5 **Inefficient JSONB Queries**

```sql
-- ❌ Slow: No index
SELECT * FROM campaigns 
WHERE brand_signals->>'website' = 'https://example.com';

-- ✅ Add GIN index
CREATE INDEX idx_campaigns_brand_signals 
ON campaigns USING gin(brand_signals);
```

### 10.6 **Over-Fetching Data**

```typescript
// ❌ Fetching everything
const { data } = await supabase.from('events').select('*');
// Returns all columns for all events (slow!)

// ✅ Select only needed columns
const { data } = await supabase
  .from('events')
  .select('id, name, status')
  .eq('status', 'active')
  .order('start_date', { ascending: true })
  .limit(20);
```

---

## 📚 QUICK REFERENCE

### Essential Commands

```bash
# Local Development
supabase start              # Start local database
supabase stop               # Stop local database
supabase db reset           # Reset to clean state
supabase db diff -f name    # Generate migration
supabase migration up       # Apply migrations

# Type Generation
supabase gen types typescript --local > lib/supabase/types.ts

# Production
supabase link --project-ref ID    # Link to production
supabase db push                  # Deploy migrations
supabase db remote commit         # Pull remote migrations
```

### Policy Template

```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

CREATE POLICY "table_name_select" ON table_name FOR SELECT
  USING (organization_id = auth.user_organization_id());

CREATE POLICY "table_name_insert" ON table_name FOR INSERT
  WITH CHECK (organization_id = auth.user_organization_id());

CREATE POLICY "table_name_update" ON table_name FOR UPDATE
  USING (
    created_by = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "table_name_delete" ON table_name FOR DELETE
  USING (organization_id = auth.user_organization_id());
```

### Index Template

```sql
-- Foreign key indexes
CREATE INDEX idx_table_fk_column ON table_name(fk_column);

-- Multi-tenant indexes
CREATE INDEX idx_table_org ON table_name(organization_id);

-- Filtering indexes
CREATE INDEX idx_table_status ON table_name(status);
CREATE INDEX idx_table_date ON table_name(created_at DESC);

-- Composite indexes
CREATE INDEX idx_table_org_status ON table_name(organization_id, status);

-- Partial indexes
CREATE INDEX idx_table_active ON table_name(organization_id)
WHERE status = 'active';

-- Full-text search
CREATE INDEX idx_table_search ON table_name
USING gin(to_tsvector('english', searchable_text));
```

---

## 🔗 ADDITIONAL RESOURCES

- **Supabase Documentation:** https://supabase.com/docs
- **Postgres Documentation:** https://www.postgresql.org/docs/
- **RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security
- **Performance Tuning:** https://supabase.com/docs/guides/platform/performance
- **Migra Tool:** https://github.com/djrobstep/migra

---

*Last Updated: December 20, 2024*  
*Version: 1.0*  
*Maintained by: FashionOS Engineering Team*
