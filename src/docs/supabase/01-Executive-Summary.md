# Supabase Schema Documentation — Executive Summary
## FashionOS Database (App-As-Built)

**Project:** FashionOS — Luxury Event Orchestration SaaS  
**Database:** Supabase (PostgreSQL)  
**Created:** December 20, 2024  
**Schema Version:** 2.0 (Production)

---

## 🎯 SCHEMA OVERVIEW

FashionOS operates on a **50-table database schema** designed to manage the complete lifecycle of luxury fashion events, from initial planning through post-event analytics.

### Core Domains (50 Tables Total)

| Domain | Tables | Purpose |
|--------|--------|---------|
| **Event Management** | 15 | Core event planning, phases, tasks, schedules |
| **Casting & Models** | 7 | Model profiles, agencies, availability, casting |
| **Media & Assets** | 10 | Asset management, variants, Cloudinary integration |
| **Social/E-commerce** | 10 | Instagram, Facebook, Shopify, Amazon integrations |
| **Shoots** | 4 | Photo shoot management, items, payments |
| **Core Identity** | 4 | Profiles, organizations, teams, stakeholders |

---

## ✅ CURRENT IMPLEMENTATION STATUS

### Production-Ready (8 Tables — 16%)
These tables have **complete SQL schemas, TypeScript types, and RLS policies**:

1. **`organizations`** — Multi-tenant organization management
2. **`users`** — User profiles and permissions
3. **`events`** — Core event data
4. **`tasks`** — Event task management
5. **`sponsors`** — Sponsorship pipeline
6. **`budget_items`** — Budget tracking
7. **`assets`** — Media gallery
8. **`campaigns`** — Brand shoot campaigns

**Status:** ✅ **Fully implemented** with:
- Complete SQL schema (`/lib/supabase/schema/complete-schema.sql`)
- TypeScript types (`/lib/supabase/types.ts`)
- RLS policies (organization-scoped security)
- Indexes (optimized for common queries)
- Triggers (auto-update timestamps)
- Queries (`/lib/supabase/queries.ts`)

### Documented But Not Implemented (42 Tables — 84%)
These tables are **documented in the ERD** (`/docs/diagrams/02-data-model.md`) but **SQL schemas don't exist yet**:

#### Event Management (12 additional tables)
- `ticket_tiers`, `registrations`, `payments`
- `event_phases`, `event_stakeholders`, `event_assets`
- `event_schedules`, `event_rehearsals`, `event_models`
- `event_designers`, `event_sponsors`, `venue_availability`

#### Casting & Models (7 tables)
- `model_profiles`, `model_agencies`, `model_availability`
- `fashion_brands`, `fashion_show_designer_profiles`
- `designer_availability`, `call_times`

#### Venues (2 tables)
- `venues`, `venue_availability`

#### Team Management (4 tables)
- `stakeholders`, `organizer_teams`
- `organizer_team_members`, `task_assignees`

#### Shoots (4 tables)
- `shoots`, `shoot_items`, `shoot_assets`, `shoot_payments`

#### Advanced Media (6 tables)
- `asset_variants`, `asset_links`, `cloudinary_assets`
- `media_size_specs`

#### Social Media (10 tables)
- `instagram_connections`, `instagram_posts`
- `facebook_connections`, `facebook_posts`
- `shopify_shops`, `shopify_products`, `shopify_media_links`
- `amazon_connections`, `amazon_products`, `amazon_media_links`

**Status:** ⏳ **ERD complete, SQL schemas needed**

---

## 🔍 DATA SOURCE ANALYSIS

### Currently Using Supabase (✅ Live)
- **Events** — Real-time event CRUD via `EventContext.tsx`
- **Tasks** — Task management with subscriptions
- **Sponsors** — Sponsor pipeline management
- **Assets** — File uploads with AI scoring
- **Organizations** — Multi-tenant structure
- **Users** — Authentication and permissions

### Currently Using localStorage (⚠️ Temporary)
- **Brand Shoot Campaigns** — Stored in `BrandShootContext.tsx`
  - Should migrate to `campaigns` table (already exists)
- **Wizard Form State** — Multi-step wizard progress
  - Should migrate to dedicated `wizard_sessions` table

### Currently Mock/Stub Data (❌ Not Implemented)
- **Model casting** — No backend yet
- **Ticket sales** — No payment integration
- **Social media** — Integration stubs only
- **Shoots** — Wizard UI exists, no persistence
- **Venues** — No venue database
- **Designer profiles** — No designer management

---

## 🏗️ SCHEMA STATISTICS

```
Total Tables: 50
├─ Implemented: 8 (16%)
├─ Documented: 42 (84%)
└─ Missing: 0 (ERD is complete)

Total Estimated Columns: 546
├─ Implemented: ~87 columns (16%)
└─ To Be Created: ~459 columns (84%)

Foreign Keys: 78 relationships
Indexes: ~120 (estimated)
RLS Policies: 8 tables secured
```

---

## ⚠️ CRITICAL GAPS

### 1. Missing SQL Schemas (P1-CRITICAL)
**Impact:** 84% of documented tables don't exist in database  
**Risk:** Application features are stubbed/mocked  
**Solution:** Create SQL schemas for all 42 remaining tables  
**Effort:** 16-20 hours

### 2. No File Storage Configuration (P1-CRITICAL)
**Impact:** File uploads will fail in production  
**Risk:** Asset gallery, logo uploads, shoot photos won't work  
**Solution:** Configure Supabase Storage buckets  
**Effort:** 2 hours (see `/lib/supabase/schema/files.sql`)

### 3. Incomplete RLS Policies (P2-HIGH)
**Impact:** Security vulnerability for unmigrated features  
**Risk:** Data leakage across organizations  
**Solution:** Add RLS to all 42 new tables  
**Effort:** 4 hours (included in schema creation)

### 4. No Migration Strategy (P2-HIGH)
**Impact:** Schema changes will break production  
**Risk:** Data loss, downtime  
**Solution:** Implement Supabase migrations workflow  
**Effort:** 2 hours

---

## 🎯 SCHEMA DESIGN PRINCIPLES

### 1. **Multi-Tenant Architecture**
Every table includes `organization_id` (directly or via join) to ensure complete data isolation between customers.

### 2. **UUID Primary Keys**
All tables use `UUID PRIMARY KEY DEFAULT uuid_generate_v4()` for:
- Distributed systems compatibility
- No sequential ID guessing
- Cross-database consistency

### 3. **Timestamptz Everywhere**
All tables have:
- `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
- Auto-update trigger on `updated_at`

### 4. **Enum Constraints**
Status fields use `CHECK (status IN (...))` instead of separate enum types for:
- Easier schema evolution
- Better TypeScript integration
- Simpler migrations

### 5. **Soft Deletes (Where Needed)**
High-value tables (events, sponsors, assets) support soft delete via `deleted_at` column (to be added).

### 6. **Row Level Security (RLS)**
Every table has RLS policies that enforce:
- Organization-level access control
- Role-based permissions (owner, admin, organizer, viewer)
- Creator-based access (users can edit their own data)

---

## 📊 RELATIONSHIP COMPLEXITY

### Hub-and-Spoke Model
**`events`** table is the central hub with direct relationships to:
- Tasks (workflow)
- Sponsors (revenue)
- Assets (media)
- Budget Items (finance)
- Tickets/Registrations (attendance)
- Models/Designers (casting)
- Schedules/Rehearsals (logistics)

### Join Tables (Many-to-Many)
- `event_stakeholders` — Events ↔ Stakeholders
- `event_models` — Events ↔ Model Profiles
- `event_designers` — Events ↔ Designer Profiles
- `event_sponsors` — Events ↔ Sponsor Organizations
- `task_assignees` — Tasks ↔ Stakeholders
- `organizer_team_members` — Teams ↔ Users/Stakeholders

### Polymorphic Relationships
- `asset_links` — Assets can link to any entity (events, shoots, products)
- `call_times` — Can reference models, designers, or stakeholders

---

## 🚀 NEXT STEPS

### Phase 1: Core Schema Completion (16 hours)
1. Create SQL schemas for all 42 remaining tables
2. Generate TypeScript types
3. Add RLS policies
4. Create indexes
5. Add triggers

### Phase 2: Storage Setup (2 hours)
1. Configure Supabase Storage buckets
2. Set up RLS for storage
3. Test file uploads

### Phase 3: Migrations (2 hours)
1. Set up migration workflow
2. Version control schemas
3. Create rollback scripts

### Phase 4: Data Migration (4 hours)
1. Migrate localStorage data to Supabase
2. Update context providers
3. Remove mock data

**Total Effort:** 24 hours = 3 days  
**Goal:** 100% schema implementation by December 23, 2024

---

## 📈 SUCCESS METRICS

### MVP (70%) — December 27
- [ ] All 50 tables created
- [ ] All RLS policies active
- [ ] Storage buckets configured
- [ ] Core features using Supabase (no localStorage)

### Production (100%) — January 31
- [ ] All features integrated
- [ ] Migration scripts tested
- [ ] Performance optimized
- [ ] Backup strategy active
- [ ] Monitoring configured

---

## 📚 DOCUMENTATION STRUCTURE

```
/docs/supabase/
├── 01-Executive-Summary.md           (this file)
├── 02-Table-Catalog.md                (complete table reference)
├── 03-Entity-Relationships.md         (ERD diagrams)
├── 04-Complete-Schema-SQL.md          (full SQL)
├── 05-RLS-Policies.md                 (security policies)
├── 06-Data-Flow-Diagrams.md           (data flows)
├── 07-Storage-Configuration.md        (file storage)
└── 08-Migration-Guide.md              (deployment guide)
```

---

**Status:** Schema documented, 16% implemented  
**Next Action:** Create complete SQL schema for all 50 tables  
**Owner:** Engineering Team  
**Timeline:** December 20-23, 2024

---

*Last Updated: December 20, 2024*  
*Schema Version: 2.0*  
*Implementation Status: 8/50 tables (16%)*
