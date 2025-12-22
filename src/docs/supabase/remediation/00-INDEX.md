# Best Practices Remediation Plan — Index
## Database Schema Fixes for FashionOS

**Created:** December 20, 2024  
**Status:** 📋 Planning Phase  
**Total Stages:** 6  
**Affected Tables:** 8 existing + 44 proposed = 52 total

---

## 🚨 CRITICAL VIOLATIONS IDENTIFIED

### High-Priority Issues (Must Fix)

| Violation | Impact | Found In | Stage |
|-----------|--------|----------|-------|
| ❌ Uppercase SQL keywords | Style violation | All tables | 1 |
| ❌ `uuid_generate_v4()` instead of `gen_random_uuid()` | Deprecated, requires uuid-ossp | All tables | 1 |
| ❌ Missing table comments | Poor documentation | All tables | 1 |
| ❌ RLS missing `to authenticated` | Implicit role (bad) | All policies | 1 |
| ❌ INSERT policies missing `with check` | Wrong syntax | All insert policies | 1 |
| ❌ RLS uses `for all` | Over-permissive | Some policies | 1 |
| ❌ `auth.uid()` not wrapped | Can be null | All policies | 1 |
| ❌ Trigger function unsafe | No search_path | update_updated_at | 1 |
| ❌ Join-scoped RLS missing | Security gap | Child tables (proposed) | 3 |
| ❌ Array dependencies | Anti-pattern | tasks.dependency_task_ids | 4 |
| ❌ Plaintext tokens | Security risk | Social/commerce tables | 5 |
| ❌ date+time text fields | Data modeling issue | Proposed scheduling | 3 |

---

## 📊 STAGED REMEDIATION PLAN

### Stage 0: Foundation & Decisions
**Goal:** Establish canonical naming and non-breaking change policy  
**Risk Level:** 🟢 Low (documentation only)  
**Duration:** 1 day

| Deliverable | Description |
|-------------|-------------|
| Naming Decision | users vs profiles canonical choice |
| Compatibility Plan | Views/adapters for any future renames |
| Migration Convention | Filename, header, verification standards |
| Extension Check | Ensure pgcrypto enabled for gen_random_uuid() |

**Files Produced:**
- `docs/supabase/remediation/00-DECISIONS.md`

**Verification:**
- [ ] Naming convention documented
- [ ] Non-breaking change policy defined
- [ ] Extension requirements listed

---

### Stage 1: Fix Existing 8 Tables (Non-Breaking)
**Goal:** Bring production schema to best practices without behavior changes  
**Risk Level:** 🟡 Medium (production changes, but safe)  
**Duration:** 2-3 days

| Table | Fixes Required | Migration File |
|-------|----------------|----------------|
| organizations | lowercase, gen_random_uuid, comments, RLS fixes | 20241221100000_remediate_organizations.sql |
| users | lowercase, comments, RLS fixes | 20241221110000_remediate_users.sql |
| events | lowercase, gen_random_uuid, comments, RLS fixes | 20241221120000_remediate_events.sql |
| tasks | lowercase, gen_random_uuid, comments, RLS fixes | 20241221130000_remediate_tasks.sql |
| sponsors | lowercase, gen_random_uuid, comments, RLS fixes | 20241221140000_remediate_sponsors.sql |
| budget_items | lowercase, gen_random_uuid, comments, RLS fixes | 20241221150000_remediate_budget_items.sql |
| assets | lowercase, gen_random_uuid, comments, RLS fixes | 20241221160000_remediate_assets.sql |
| campaigns | lowercase, gen_random_uuid, comments, RLS fixes | 20241221170000_remediate_campaigns.sql |

**Common Fixes Per Table:**
1. ✅ Convert SQL keywords to lowercase
2. ✅ Replace `uuid_generate_v4()` → `gen_random_uuid()`
3. ✅ Add `comment on table`
4. ✅ Add `comment on column` for key fields
5. ✅ Fix RLS: add `to authenticated`
6. ✅ Fix RLS: use `with check` for INSERT
7. ✅ Fix RLS: wrap `(select auth.uid())`
8. ✅ Fix RLS: remove `for all`
9. ✅ Document trigger function with safe search_path

**Verification Checklist:**
- [ ] All SQL lowercase
- [ ] All tables have comments
- [ ] All UUIDs use gen_random_uuid()
- [ ] RLS policies specify `to authenticated`
- [ ] INSERT policies use `with check`
- [ ] No `for all` policies remain
- [ ] auth.uid() wrapped in subquery
- [ ] Trigger function has `set search_path = ''`
- [ ] Run RLS test suite (select/insert/update/delete per table)
- [ ] No data access regression
- [ ] TypeScript types regenerated

**Rollback Plan:**
- Stage 1 changes are additive (comments, policy replacements)
- Rollback = drop new policies, recreate old ones
- gen_random_uuid() is backward compatible

---

### Stage 2: Patterns Library (Copy/Paste Ready)
**Goal:** Create reusable templates to prevent future violations  
**Risk Level:** 🟢 Low (documentation only)  
**Duration:** 1 day

| Pattern | Template | Use Case |
|---------|----------|----------|
| Migration Header | Metadata block | Every migration |
| Table Definition | Full create table | New tables |
| RLS: Org-scoped | Direct org_id check | organizations, events, campaigns |
| RLS: Join-scoped (1 level) | event_id → events.org_id | tasks, sponsors, budget_items, assets |
| RLS: Join-scoped (2 levels) | ticket_id → events → org_id | registrations, payments |
| INSERT Policy | `with check` syntax | All tables |
| UPDATE Policy | `using + with check` | Tables with ownership |
| Trigger Function | Safe search_path | updated_at triggers |
| Index Naming | idx_{table}_{columns} | All indexes |
| Constraint Naming | {table}_{column}_{type} | All constraints |

**Files Produced:**
- `docs/supabase/remediation/02-PATTERNS-LIBRARY.md`

**Verification:**
- [ ] All templates compile in Postgres
- [ ] Templates match best practices docs
- [ ] Copy/paste examples provided

---

### Stage 3: Tier 1 Tables (Core Operations)
**Goal:** Add core feature tables with correct join-scoped RLS  
**Risk Level:** 🟡 Medium (new tables, must get RLS right)  
**Duration:** 3-4 days

**Tables to Create (14 total):**

#### Ticketing (3 tables)
- ticket_tiers → events (1-level join)
- registrations → ticket_tiers → events (2-level join)
- payments → registrations → ticket_tiers → events (3-level join)

#### Event Structure (4 tables)
- event_phases → events (1-level join)
- event_schedules → events (1-level join)
- event_rehearsals → events (1-level join)
- event_assets → events (1-level join)

#### Venues (2 tables)
- venues (org-scoped)
- venue_availability → venues (org via venue)

#### Team Management (5 tables)
- stakeholders (user-scoped or org-scoped)
- event_stakeholders → events (1-level join)
- task_assignees → tasks → events (2-level join)
- organizer_teams (org-scoped)
- organizer_team_members → organizer_teams (org via team)

**Critical Requirements:**
- ✅ All policies MUST be join-scoped where org_id not present
- ✅ Replace `date + time text` with `timestamptz`
- ✅ Add conflict detection for scheduling (unique constraints)
- ✅ Include capacity/availability checks in constraints

**Migration Files:**
```
20241222100000_create_ticket_tiers.sql
20241222110000_create_registrations.sql
20241222120000_create_payments.sql
20241222130000_create_event_phases.sql
20241222140000_create_event_schedules.sql
20241222150000_create_event_rehearsals.sql
20241222160000_create_event_assets.sql
20241222170000_create_venues.sql
20241222180000_create_venue_availability.sql
20241223100000_create_stakeholders.sql
20241223110000_create_event_stakeholders.sql
20241223120000_create_task_assignees.sql
20241223130000_create_organizer_teams.sql
20241223140000_create_organizer_team_members.sql
```

**Verification Checklist:**
- [ ] Tenant isolation works (test cross-org access)
- [ ] Join-scoped policies correct (verify SQL execution plans)
- [ ] Schedule conflict detection works
- [ ] Capacity limits enforced
- [ ] Role-based permissions work (organizer vs admin)
- [ ] Cascade deletes work correctly

**Rollback Plan:**
- Each table drops cleanly with cascade
- No existing app dependencies

---

### Stage 4: Fix Data Modeling Anti-Patterns
**Goal:** Refactor array dependencies and sponsorship structure  
**Risk Level:** 🔴 High (data migration required)  
**Duration:** 2-3 days

#### Fix 1: Task Dependencies (Breaking Change)

**Problem:**
```sql
-- ❌ Current (anti-pattern)
tasks.dependency_task_ids uuid[]
```

**Solution:**
```sql
-- ✅ Proper join table
create table task_dependencies (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references tasks(id) on delete cascade,
  depends_on_task_id uuid not null references tasks(id) on delete cascade,
  created_at timestamptz not null default now(),
  
  -- Prevent circular dependencies
  constraint task_dependencies_no_self_reference_ck
    check (task_id != depends_on_task_id),
  
  -- Unique constraint
  constraint task_dependencies_unique_pair_uk
    unique (task_id, depends_on_task_id)
);
```

**Data Migration Steps:**
1. Create task_dependencies table
2. Migrate existing array data to join table
3. Add compatibility view: `task_dependency_ids_view`
4. Update app to use new table
5. Drop old column (future migration)

**Migration Files:**
```
20241224100000_create_task_dependencies_table.sql
20241224110000_migrate_task_dependency_data.sql
20241224120000_create_compatibility_view.sql
```

#### Fix 2: Sponsorship Structure (Optional)

**Decision Required:**

**Option A: Keep Current (Simpler)**
- Keep single `sponsors` table
- Add optional `sponsor_organization_id` FK for reuse

**Option B: Split Tables (More Flexible)**
- `sponsor_organizations` (reusable company directory)
- `event_sponsors` (junction: event + sponsor org)
- `sponsorship_packages` (tier templates)

**Recommendation:** Option A for Stage 4, Option B for future enhancement

**Verification:**
- [ ] Dependency graph queries work
- [ ] Circular dependency prevention works
- [ ] App updated to use new structure
- [ ] Old data migrated correctly

**Rollback Plan:**
- Keep old column until migration verified
- Compatibility view allows gradual migration

---

### Stage 5: Tier 2 Tables (Production Features)
**Goal:** Add model casting, designers, shoots  
**Risk Level:** 🟡 Medium (new features, no existing dependencies)  
**Duration:** 3-4 days

**Tables to Create (16 total):**

#### Model & Casting (5 tables)
- model_agencies (directory)
- model_profiles → users + agencies
- event_models → events + model_profiles (join-scoped)
- model_availability → model_profiles (scoped via profile → user)
- call_times → events (1-level join)

#### Designer Management (4 tables)
- fashion_brands (directory)
- designer_profiles → users + brands
- event_designers → events (1-level join)
- designer_availability → designer_profiles

#### Sponsorship Enhancement (3 tables - if Option B chosen)
- sponsor_organizations (directory)
- event_sponsors_junction → events (1-level join)
- sponsorship_packages (templates)

#### Photo Shoots (4 tables)
- shoots (org-scoped)
- shoot_items → shoots
- shoot_assets → shoots
- shoot_payments → shoots

**Migration Files:**
```
20241226100000_create_model_agencies.sql
20241226110000_create_model_profiles.sql
20241226120000_create_event_models.sql
20241226130000_create_model_availability.sql
20241226140000_create_call_times.sql
20241227100000_create_fashion_brands.sql
20241227110000_create_designer_profiles.sql
20241227120000_create_event_designers.sql
20241227130000_create_designer_availability.sql
20241228100000_create_shoots.sql
20241228110000_create_shoot_items.sql
20241228120000_create_shoot_assets.sql
20241228130000_create_shoot_payments.sql
```

**Verification:**
- [ ] Model booking flow works
- [ ] Designer showcase flow works
- [ ] Shoot workflow complete
- [ ] Multi-tenant isolation works

---

### Stage 6: Tier 3 Tables (Advanced Features)
**Goal:** Social media, e-commerce, advanced media  
**Risk Level:** 🔴 High (security-critical token handling)  
**Duration:** 4-5 days

**Tables to Create (14 total):**

#### Advanced Media (4 tables)
- media_size_specs (specs library)
- asset_variants → assets
- cloudinary_assets → assets (metadata only)
- asset_links (polymorphic)

#### Social Media (4 tables)
- instagram_connections (⚠️ NO tokens in table)
- instagram_posts → connections
- facebook_connections (⚠️ NO tokens in table)
- facebook_posts → connections

#### E-Commerce (6 tables)
- shopify_shops (⚠️ NO tokens in table)
- shopify_products → shops
- shopify_media_links → assets + products
- amazon_connections (⚠️ NO tokens in table)
- amazon_products → connections
- amazon_media_links → assets + products

**CRITICAL SECURITY RULE:**

❌ **DO NOT store plaintext OAuth tokens in tables**

✅ **Correct Pattern:**
```sql
-- ❌ WRONG
create table instagram_connections (
  access_token text not null  -- ❌ Client can read this!
);

-- ✅ CORRECT
create table instagram_connections (
  -- NO access_token column
  instagram_account_id text not null,
  status text not null default 'active',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

-- Tokens stored in:
-- 1. Supabase Secrets (for Edge Functions)
-- 2. Encrypted vault table (if must store in DB)
-- 3. Server-only environment variables
```

**Token Handling Architecture:**
```
Frontend
  ↓ (OAuth callback)
Edge Function
  ↓ (exchange code for token)
Store in Supabase Vault
  ↓ (encrypted)
Write connection metadata to DB (NO TOKEN)
  ↓
Client reads connection status only
  ↓
Edge Function uses Vault to call APIs
```

**Migration Files:**
```
20250102100000_create_media_size_specs.sql
20250102110000_create_asset_variants.sql
20250102120000_create_cloudinary_assets.sql
20250102130000_create_asset_links.sql
20250103100000_create_instagram_connections.sql
20250103110000_create_instagram_posts.sql
20250103120000_create_facebook_connections.sql
20250103130000_create_facebook_posts.sql
20250106100000_create_shopify_shops.sql
20250106110000_create_shopify_products.sql
20250106120000_create_shopify_media_links.sql
20250106130000_create_amazon_connections.sql
20250106140000_create_amazon_products.sql
20250106150000_create_amazon_media_links.sql
20250107100000_create_encrypted_tokens_vault.sql
```

**Additional Security Requirements:**
- [ ] Webhook idempotency (prevent replay attacks)
- [ ] Rate limiting on API endpoints
- [ ] Audit logging for token usage
- [ ] Token rotation policy

**Verification:**
- [ ] Client CANNOT read tokens (test with anon key)
- [ ] Edge Functions CAN access Vault
- [ ] OAuth flow works end-to-end
- [ ] Webhook replay protection works
- [ ] Rate limits enforced

**Rollback Plan:**
- Each integration table drops independently
- Vault encrypted, can restore if needed

---

## 📋 MASTER VERIFICATION CHECKLIST

### Code Quality
- [ ] All SQL keywords lowercase
- [ ] All tables have comments
- [ ] All important columns have comments
- [ ] All UUIDs use gen_random_uuid()
- [ ] All indexes named: idx_{table}_{columns}
- [ ] All constraints named: {table}_{column}_{type}
- [ ] All triggers documented
- [ ] All functions have comments + return types

### Security (RLS)
- [ ] All tables have RLS enabled
- [ ] All policies specify `to authenticated` or `to anon`
- [ ] INSERT policies use `with check`
- [ ] UPDATE policies use `using + with check`
- [ ] No `for all` policies
- [ ] auth.uid() always wrapped: `(select auth.uid())`
- [ ] Join-scoped policies correct for child tables
- [ ] No plaintext tokens in client-readable tables

### Data Modeling
- [ ] No uuid[] arrays for relationships (use join tables)
- [ ] No date+time text (use timestamptz)
- [ ] Proper cascade deletes
- [ ] Unique constraints prevent duplicates
- [ ] Check constraints enforce business rules
- [ ] Indexes on all foreign keys
- [ ] Indexes on frequently queried columns

### Testing
- [ ] Tenant isolation tests pass (cross-org blocked)
- [ ] Role-based access tests pass (viewer vs admin)
- [ ] Cascade delete tests pass
- [ ] Constraint violation tests pass
- [ ] RLS performance tests pass (no seq scans)
- [ ] TypeScript types regenerated and compile
- [ ] App integration tests pass

---

## 🔄 ROLLBACK STRATEGY

### Stage 1 (Existing Schema Fixes)
- **Risk:** Low
- **Rollback:** Drop new policies, recreate old ones
- **Data Loss:** None

### Stage 3 (Tier 1 New Tables)
- **Risk:** Medium
- **Rollback:** Drop tables with cascade
- **Data Loss:** New data only (no app dependencies yet)

### Stage 4 (Anti-Pattern Fixes)
- **Risk:** High
- **Rollback:** Keep compatibility view, revert app code
- **Data Loss:** Potential if migration not verified

### Stage 5 (Tier 2 New Tables)
- **Risk:** Medium
- **Rollback:** Drop tables with cascade
- **Data Loss:** New data only

### Stage 6 (Tier 3 + Security)
- **Risk:** High (tokens involved)
- **Rollback:** Drop tables + vault entries
- **Data Loss:** OAuth connections must re-authenticate

---

## 📊 PROGRESS TRACKING

| Stage | Status | Start Date | End Date | Migrations | Tables |
|-------|--------|------------|----------|------------|--------|
| 0: Foundation | 📋 Planned | - | - | 0 | 0 |
| 1: Fix Existing | 📋 Planned | - | - | 8 | 8 |
| 2: Patterns | 📋 Planned | - | - | 0 | 0 |
| 3: Tier 1 | 📋 Planned | - | - | 14 | 14 |
| 4: Anti-Patterns | 📋 Planned | - | - | 3 | 1 |
| 5: Tier 2 | 📋 Planned | - | - | 13 | 16 |
| 6: Tier 3 | 📋 Planned | - | - | 15 | 14 |
| **TOTAL** | - | - | - | **53** | **52** |

---

## 📚 DOCUMENTATION FILES

```
/docs/supabase/remediation/
├── 00-INDEX.md                           �� You are here
├── 00-DECISIONS.md                       ← Stage 0 output
├── 01-EXISTING-FIXES.md                  ← Stage 1 tasks
├── 02-PATTERNS-LIBRARY.md                ← Stage 2 templates
├── 03-TIER-1-TABLES.md                   ← Stage 3 tasks
├── 04-ANTI-PATTERN-FIXES.md              ← Stage 4 tasks
├── 05-TIER-2-TABLES.md                   ← Stage 5 tasks
├── 06-TIER-3-TABLES.md                   ← Stage 6 tasks
└── 99-FAILURE-POINTS.md                  ← Known issues checklist
```

---

## 🚀 NEXT STEPS

1. **Review this index** with team lead
2. **Complete Stage 0** (naming decisions)
3. **Test Stage 1** on local database first
4. **One stage at a time** — verify before proceeding
5. **Update progress table** after each stage

---

*Last Updated: December 20, 2024*  
*Created by: FashionOS Engineering*  
*Review Status: Pending approval*
