# Proposed Supabase Schema — Future Expansion
## Core & Advanced Feature Tables

**Created:** December 20, 2024  
**Status:** 📋 Proposed (Not Yet Implemented)  
**Tables:** 44 additional tables  

---

## 📊 PROPOSED EXPANSION

### Overview

This document outlines **44 additional tables** to expand FashionOS from the current 8-table MVP to a full-featured luxury event orchestration platform.

**Current State:** 8 tables ✅  
**Proposed Addition:** 44 tables 📋  
**Future Total:** 52 tables

---

## 🎯 IMPLEMENTATION TIERS

### Tier 1: Core Features (14 tables) — MVP+
**Priority:** HIGH  
**Timeline:** Weeks 1-2  
**Adds:** Ticketing, venues, team management, event phases

### Tier 2: Production Features (16 tables) — Production Ready
**Priority:** MEDIUM  
**Timeline:** Weeks 3-4  
**Adds:** Model casting, designers, schedules, shoots

### Tier 3: Advanced Features (14 tables) — Full Platform
**Priority:** LOW  
**Timeline:** Weeks 5-8  
**Adds:** Social media, e-commerce, advanced media management

---

## TIER 1: CORE FEATURES (14 Tables)

### Ticketing & Registration (3 tables)

#### 1. ticket_tiers
**Purpose:** Ticket types and pricing for events

```sql
CREATE TABLE ticket_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('paid', 'comp', 'press', 'vip')),
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  quantity_total INTEGER NOT NULL,
  quantity_sold INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ticket_tiers_event_id ON ticket_tiers(event_id);
```

**Example:**
```json
{
  "event_id": "...",
  "name": "VIP Front Row",
  "type": "vip",
  "price": 500.00,
  "quantity_total": 50,
  "quantity_sold": 42
}
```

---

#### 2. registrations
**Purpose:** Attendee registrations and check-ins

```sql
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  ticket_tier_id UUID NOT NULL REFERENCES ticket_tiers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  attendee_email TEXT NOT NULL,
  attendee_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'attended')),
  qr_code_data TEXT NOT NULL UNIQUE,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_registrations_ticket_tier_id ON registrations(ticket_tier_id);
CREATE INDEX idx_registrations_user_id ON registrations(user_id);
CREATE UNIQUE INDEX idx_registrations_qr_code ON registrations(qr_code_data);
```

---

#### 3. payments
**Purpose:** Payment tracking for ticket purchases

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  payer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  provider TEXT CHECK (provider IN ('stripe', 'paypal', 'square')),
  provider_transaction_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_registration_id ON payments(registration_id);
CREATE INDEX idx_payments_status ON payments(status);
```

---

### Event Structure (4 tables)

#### 4. event_phases
**Purpose:** Workflow phases within an event

```sql
CREATE TABLE event_phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  phase_key TEXT NOT NULL,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'complete')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_phases_event_id ON event_phases(event_id);
CREATE INDEX idx_event_phases_order_index ON event_phases(order_index);
```

**Example:**
```json
{
  "event_id": "...",
  "phase_key": "pre_production",
  "title": "Pre-Production",
  "order_index": 1,
  "status": "complete"
}
```

---

#### 5. event_schedules
**Purpose:** Event timeline and schedule items

```sql
CREATE TABLE event_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_schedules_event_id ON event_schedules(event_id);
CREATE INDEX idx_event_schedules_start_time ON event_schedules(start_time);
```

---

#### 6. event_rehearsals
**Purpose:** Rehearsal scheduling

```sql
CREATE TABLE event_rehearsals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_rehearsals_event_id ON event_rehearsals(event_id);
CREATE INDEX idx_event_rehearsals_date ON event_rehearsals(date);
```

---

#### 7. event_assets
**Purpose:** Event-specific media gallery (alternative to generic assets table)

```sql
CREATE TABLE event_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video', 'document')),
  url TEXT NOT NULL,
  title TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_assets_event_id ON event_assets(event_id);
CREATE INDEX idx_event_assets_is_featured ON event_assets(is_featured) WHERE is_featured = true;
```

---

### Venues (2 tables)

#### 8. venues
**Purpose:** Venue directory

```sql
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  country TEXT,
  capacity INTEGER,
  type TEXT CHECK (type IN ('indoor', 'outdoor', 'hybrid')),
  amenities JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_venues_city ON venues(city);
CREATE INDEX idx_venues_capacity ON venues(capacity);
```

**Example:**
```json
{
  "name": "Grand Palais",
  "address": "Avenue Winston Churchill",
  "city": "Paris",
  "country": "France",
  "capacity": 5000,
  "type": "indoor",
  "amenities": ["stage", "lighting", "sound", "dressing_rooms"]
}
```

---

#### 9. venue_availability
**Purpose:** Venue booking calendar

```sql
CREATE TABLE venue_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'tentative', 'blocked')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_venue_availability_venue_id ON venue_availability(venue_id);
CREATE INDEX idx_venue_availability_date ON venue_availability(date);
CREATE INDEX idx_venue_availability_status ON venue_availability(status);
```

---

### Team Management (5 tables)

#### 10. stakeholders
**Purpose:** External contacts (vendors, contractors, partners)

```sql
CREATE TABLE stakeholders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT,
  company TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_stakeholders_user_id ON stakeholders(user_id);
CREATE INDEX idx_stakeholders_email ON stakeholders(email);
```

---

#### 11. event_stakeholders
**Purpose:** Join table for events ↔ stakeholders

```sql
CREATE TABLE event_stakeholders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  stakeholder_id UUID NOT NULL REFERENCES stakeholders(id) ON DELETE CASCADE,
  role TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(event_id, stakeholder_id)
);

CREATE INDEX idx_event_stakeholders_event_id ON event_stakeholders(event_id);
CREATE INDEX idx_event_stakeholders_stakeholder_id ON event_stakeholders(stakeholder_id);
```

---

#### 12. task_assignees
**Purpose:** Many-to-many join for multi-assignee tasks

```sql
CREATE TABLE task_assignees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stakeholder_id UUID REFERENCES stakeholders(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CHECK ((user_id IS NOT NULL AND stakeholder_id IS NULL) OR (user_id IS NULL AND stakeholder_id IS NOT NULL))
);

CREATE INDEX idx_task_assignees_task_id ON task_assignees(task_id);
CREATE INDEX idx_task_assignees_user_id ON task_assignees(user_id);
CREATE INDEX idx_task_assignees_stakeholder_id ON task_assignees(stakeholder_id);
```

---

#### 13. organizer_teams
**Purpose:** Event production teams

```sql
CREATE TABLE organizer_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_organizer_teams_organization_id ON organizer_teams(organization_id);
CREATE INDEX idx_organizer_teams_owner_id ON organizer_teams(owner_id);
```

---

#### 14. organizer_team_members
**Purpose:** Team roster

```sql
CREATE TABLE organizer_team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES organizer_teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stakeholder_id UUID REFERENCES stakeholders(id) ON DELETE CASCADE,
  role TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CHECK ((user_id IS NOT NULL AND stakeholder_id IS NULL) OR (user_id IS NULL AND stakeholder_id IS NOT NULL))
);

CREATE INDEX idx_organizer_team_members_team_id ON organizer_team_members(team_id);
```

---

## TIER 2: PRODUCTION FEATURES (16 Tables)

### Model & Casting Management (5 tables)

#### 15. model_agencies
**Purpose:** Model agency directory

```sql
CREATE TABLE model_agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT,
  country TEXT,
  website TEXT,
  contact_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_model_agencies_name ON model_agencies(name);
```

---

#### 16. model_profiles
**Purpose:** Model portfolios

```sql
CREATE TABLE model_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agency_id UUID REFERENCES model_agencies(id) ON DELETE SET NULL,
  height TEXT,
  measurements TEXT,
  hair_color TEXT,
  eye_color TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_model_profiles_user_id ON model_profiles(user_id);
CREATE INDEX idx_model_profiles_agency_id ON model_profiles(agency_id);
```

---

#### 17. event_models
**Purpose:** Models cast in events

```sql
CREATE TABLE event_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  model_profile_id UUID NOT NULL REFERENCES model_profiles(id) ON DELETE CASCADE,
  walk_order INTEGER,
  is_opening BOOLEAN NOT NULL DEFAULT false,
  is_closing BOOLEAN NOT NULL DEFAULT false,
  fitting_status TEXT NOT NULL DEFAULT 'pending' CHECK (fitting_status IN ('pending', 'scheduled', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_models_event_id ON event_models(event_id);
CREATE INDEX idx_event_models_model_profile_id ON event_models(model_profile_id);
```

---

#### 18. model_availability
**Purpose:** Model availability calendar

```sql
CREATE TABLE model_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_profile_id UUID NOT NULL REFERENCES model_profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'tentative')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_model_availability_model_profile_id ON model_availability(model_profile_id);
CREATE INDEX idx_model_availability_date ON model_availability(date);
```

---

#### 19. call_times
**Purpose:** Call time schedules for models/crew

```sql
CREATE TABLE call_times (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  model_profile_id UUID REFERENCES model_profiles(id) ON DELETE CASCADE,
  stakeholder_id UUID REFERENCES stakeholders(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CHECK ((model_profile_id IS NOT NULL AND stakeholder_id IS NULL) OR (model_profile_id IS NULL AND stakeholder_id IS NOT NULL))
);

CREATE INDEX idx_call_times_event_id ON call_times(event_id);
CREATE INDEX idx_call_times_date ON call_times(date);
```

---

### Designer Management (4 tables)

#### 20. fashion_brands
**Purpose:** Designer brand directory

```sql
CREATE TABLE fashion_brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT,
  style TEXT,
  website TEXT,
  instagram TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_fashion_brands_name ON fashion_brands(name);
```

---

#### 21. designer_profiles
**Purpose:** Designer profiles linked to brands

```sql
CREATE TABLE designer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES fashion_brands(id) ON DELETE CASCADE,
  title TEXT,
  specialty TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_designer_profiles_user_id ON designer_profiles(user_id);
CREATE INDEX idx_designer_profiles_brand_id ON designer_profiles(brand_id);
```

---

#### 22. event_designers
**Purpose:** Designers showcasing at events

```sql
CREATE TABLE event_designers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  designer_profile_id UUID NOT NULL REFERENCES designer_profiles(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES fashion_brands(id) ON DELETE CASCADE,
  collection_order INTEGER,
  collection_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_designers_event_id ON event_designers(event_id);
CREATE INDEX idx_event_designers_designer_profile_id ON event_designers(designer_profile_id);
```

---

#### 23. designer_availability
**Purpose:** Designer availability calendar

```sql
CREATE TABLE designer_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  designer_profile_id UUID NOT NULL REFERENCES designer_profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'tentative')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_designer_availability_designer_profile_id ON designer_availability(designer_profile_id);
CREATE INDEX idx_designer_availability_date ON designer_availability(date);
```

---

### Sponsorship Management (3 tables)

#### 24. sponsor_organizations
**Purpose:** Sponsor company directory

```sql
CREATE TABLE sponsor_organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  industry TEXT,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sponsor_organizations_name ON sponsor_organizations(name);
```

---

#### 25. event_sponsors_junction
**Purpose:** Join table for events ↔ sponsor organizations

```sql
CREATE TABLE event_sponsors_junction (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  sponsor_org_id UUID NOT NULL REFERENCES sponsor_organizations(id) ON DELETE CASCADE,
  tier TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_sponsors_junction_event_id ON event_sponsors_junction(event_id);
CREATE INDEX idx_event_sponsors_junction_sponsor_org_id ON event_sponsors_junction(sponsor_org_id);
```

---

#### 26. sponsorship_packages
**Purpose:** Predefined sponsorship tiers

```sql
CREATE TABLE sponsorship_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  tier TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  benefits JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### Photo Shoot Management (4 tables)

#### 27. shoots
**Purpose:** Photo shoot jobs

```sql
CREATE TABLE shoots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  designer_id UUID REFERENCES designer_profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'cancelled')),
  scheduled_date DATE,
  location TEXT,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shoots_organization_id ON shoots(organization_id);
CREATE INDEX idx_shoots_status ON shoots(status);
CREATE INDEX idx_shoots_scheduled_date ON shoots(scheduled_date);
```

---

#### 28. shoot_items
**Purpose:** Items being photographed in shoot

```sql
CREATE TABLE shoot_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shoot_id UUID NOT NULL REFERENCES shoots(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT,
  quantity INTEGER DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shoot_items_shoot_id ON shoot_items(shoot_id);
```

---

#### 29. shoot_assets
**Purpose:** Photos produced from shoot

```sql
CREATE TABLE shoot_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shoot_id UUID NOT NULL REFERENCES shoots(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_final BOOLEAN NOT NULL DEFAULT false,
  approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shoot_assets_shoot_id ON shoot_assets(shoot_id);
CREATE INDEX idx_shoot_assets_is_final ON shoot_assets(is_final) WHERE is_final = true;
```

---

#### 30. shoot_payments
**Purpose:** Shoot invoicing

```sql
CREATE TABLE shoot_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shoot_id UUID NOT NULL REFERENCES shoots(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'invoiced', 'paid', 'overdue')),
  invoice_url TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shoot_payments_shoot_id ON shoot_payments(shoot_id);
CREATE INDEX idx_shoot_payments_status ON shoot_payments(status);
```

---

## TIER 3: ADVANCED FEATURES (14 Tables)

### Advanced Media Management (4 tables)

#### 31. media_size_specs
**Purpose:** Platform-specific size requirements

```sql
CREATE TABLE media_size_specs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  use_case TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  aspect_ratio TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_media_size_specs_platform ON media_size_specs(platform);
```

**Example:**
```json
{
  "platform": "instagram",
  "use_case": "feed_post",
  "width": 1080,
  "height": 1080,
  "aspect_ratio": "1:1"
}
```

---

#### 32. asset_variants
**Purpose:** Multiple sizes/formats of same asset

```sql
CREATE TABLE asset_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  size_spec_id UUID NOT NULL REFERENCES media_size_specs(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_size_bytes INTEGER,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_asset_variants_asset_id ON asset_variants(asset_id);
CREATE INDEX idx_asset_variants_size_spec_id ON asset_variants(size_spec_id);
```

---

#### 33. cloudinary_assets
**Purpose:** Cloudinary CDN metadata

```sql
CREATE TABLE cloudinary_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  public_id TEXT NOT NULL UNIQUE,
  folder TEXT,
  format TEXT,
  width INTEGER,
  height INTEGER,
  bytes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_cloudinary_assets_public_id ON cloudinary_assets(public_id);
CREATE INDEX idx_cloudinary_assets_asset_id ON cloudinary_assets(asset_id);
```

---

#### 34. asset_links
**Purpose:** Polymorphic asset-entity links

```sql
CREATE TABLE asset_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  role TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_asset_links_asset_id ON asset_links(asset_id);
CREATE INDEX idx_asset_links_entity ON asset_links(entity_type, entity_id);
```

---

### Social Media Integration (4 tables)

#### 35. instagram_connections
**Purpose:** Instagram account OAuth

```sql
CREATE TABLE instagram_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  instagram_account_id TEXT NOT NULL UNIQUE,
  access_token TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_instagram_connections_user_id ON instagram_connections(user_id);
```

---

#### 36. instagram_posts
**Purpose:** Instagram post scheduling

```sql
CREATE TABLE instagram_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connection_id UUID NOT NULL REFERENCES instagram_connections(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  caption TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  instagram_media_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_instagram_posts_connection_id ON instagram_posts(connection_id);
CREATE INDEX idx_instagram_posts_status ON instagram_posts(status);
```

---

#### 37. facebook_connections
**Purpose:** Facebook page OAuth

```sql
CREATE TABLE facebook_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  facebook_page_id TEXT NOT NULL UNIQUE,
  page_name TEXT,
  access_token TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_facebook_connections_user_id ON facebook_connections(user_id);
```

---

#### 38. facebook_posts
**Purpose:** Facebook post scheduling

```sql
CREATE TABLE facebook_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connection_id UUID NOT NULL REFERENCES facebook_connections(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  facebook_post_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_facebook_posts_connection_id ON facebook_posts(connection_id);
CREATE INDEX idx_facebook_posts_status ON facebook_posts(status);
```

---

### E-Commerce Integration (6 tables)

#### 39. shopify_shops
**Purpose:** Shopify store connections

```sql
CREATE TABLE shopify_shops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shop_domain TEXT NOT NULL UNIQUE,
  access_token TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shopify_shops_user_id ON shopify_shops(user_id);
```

---

#### 40. shopify_products
**Purpose:** Synced Shopify products

```sql
CREATE TABLE shopify_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID NOT NULL REFERENCES shopify_shops(id) ON DELETE CASCADE,
  shopify_product_id TEXT NOT NULL,
  title TEXT NOT NULL,
  handle TEXT,
  status TEXT NOT NULL,
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shopify_products_shop_id ON shopify_products(shop_id);
CREATE INDEX idx_shopify_products_shopify_product_id ON shopify_products(shopify_product_id);
```

---

#### 41. shopify_media_links
**Purpose:** Assets linked to Shopify products

```sql
CREATE TABLE shopify_media_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  shopify_product_id UUID NOT NULL REFERENCES shopify_products(id) ON DELETE CASCADE,
  shopify_media_id TEXT,
  position INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shopify_media_links_asset_id ON shopify_media_links(asset_id);
CREATE INDEX idx_shopify_media_links_product_id ON shopify_media_links(shopify_product_id);
```

---

#### 42. amazon_connections
**Purpose:** Amazon Seller Central OAuth

```sql
CREATE TABLE amazon_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seller_id TEXT NOT NULL UNIQUE,
  marketplace_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_amazon_connections_user_id ON amazon_connections(user_id);
```

---

#### 43. amazon_products
**Purpose:** Synced Amazon products

```sql
CREATE TABLE amazon_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connection_id UUID NOT NULL REFERENCES amazon_connections(id) ON DELETE CASCADE,
  sku TEXT NOT NULL,
  asin TEXT,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_amazon_products_connection_id ON amazon_products(connection_id);
CREATE INDEX idx_amazon_products_sku ON amazon_products(sku);
```

---

#### 44. amazon_media_links
**Purpose:** Assets linked to Amazon products

```sql
CREATE TABLE amazon_media_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  amazon_product_id UUID NOT NULL REFERENCES amazon_products(id) ON DELETE CASCADE,
  position INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_amazon_media_links_asset_id ON amazon_media_links(asset_id);
CREATE INDEX idx_amazon_media_links_product_id ON amazon_media_links(amazon_product_id);
```

---

## 📊 IMPLEMENTATION SUMMARY

### By Tier

| Tier | Tables | Priority | Timeline | Core Features |
|------|--------|----------|----------|---------------|
| **Tier 1: Core** | 14 | HIGH | Weeks 1-2 | Ticketing, venues, teams |
| **Tier 2: Production** | 16 | MEDIUM | Weeks 3-4 | Models, designers, shoots |
| **Tier 3: Advanced** | 14 | LOW | Weeks 5-8 | Social, e-commerce, advanced media |
| **TOTAL** | **44** | | **2 months** | Full platform |

### Total Schema After Implementation

```
Current (Implemented): 8 tables
+ Tier 1 (Core): 14 tables
+ Tier 2 (Production): 16 tables
+ Tier 3 (Advanced): 14 tables
= TOTAL: 52 tables
```

---

## 🎯 RECOMMENDED IMPLEMENTATION ORDER

### Week 1-2: Tier 1 Core (14 tables)
1. `event_phases` — Enable phase-based workflow
2. `ticket_tiers`, `registrations`, `payments` — Enable ticketing
3. `venues`, `venue_availability` — Venue management
4. `stakeholders`, `event_stakeholders` — External contacts
5. `task_assignees` — Multi-assignee tasks
6. `organizer_teams`, `organizer_team_members` — Team management
7. `event_schedules`, `event_rehearsals` — Scheduling
8. `event_assets` — Event-specific media

**Result:** MVP → MVP+ with ticketing & venues

---

### Week 3-4: Tier 2 Production (16 tables)
1. `model_agencies`, `model_profiles` — Model directory
2. `event_models`, `model_availability`, `call_times` — Casting
3. `fashion_brands`, `designer_profiles` — Designer management
4. `event_designers`, `designer_availability` — Designer lineup
5. `sponsor_organizations`, `event_sponsors_junction`, `sponsorship_packages` — Enhanced sponsorship
6. `shoots`, `shoot_items`, `shoot_assets`, `shoot_payments` — Photo shoots

**Result:** MVP+ → Production-ready platform

---

### Week 5-8: Tier 3 Advanced (14 tables)
1. `media_size_specs`, `asset_variants` — Multi-format assets
2. `cloudinary_assets`, `asset_links` — Advanced media management
3. `instagram_connections`, `instagram_posts` — Instagram integration
4. `facebook_connections`, `facebook_posts` — Facebook integration
5. `shopify_shops`, `shopify_products`, `shopify_media_links` — Shopify
6. `amazon_connections`, `amazon_products`, `amazon_media_links` — Amazon

**Result:** Production → Full-featured platform

---

## 🔐 RLS POLICY TEMPLATE

All proposed tables should follow this pattern:

```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- SELECT: View if in same organization
CREATE POLICY "table_name_select" ON table_name FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

-- INSERT: Create if in organization
CREATE POLICY "table_name_insert" ON table_name FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

-- UPDATE: Creator or admin
CREATE POLICY "table_name_update" ON table_name FOR UPDATE
  USING (
    created_by = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- DELETE: Admin only
CREATE POLICY "table_name_delete" ON table_name FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );
```

---

## 📈 ESTIMATED EFFORT

### Development Time

| Task | Tier 1 | Tier 2 | Tier 3 | Total |
|------|--------|--------|--------|-------|
| SQL Schema | 4h | 5h | 4h | 13h |
| RLS Policies | 3h | 4h | 3h | 10h |
| TypeScript Types | 2h | 2h | 2h | 6h |
| Frontend Integration | 8h | 12h | 16h | 36h |
| Testing | 3h | 5h | 7h | 15h |
| **TOTAL** | **20h** | **28h** | **32h** | **80h** |

**Total: 80 hours = 2 weeks full-time = 4 weeks part-time**

---

## ✅ VERIFICATION

After implementing each tier, run:

```sql
-- Count tables
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';
-- Expected: 8 + tier tables

-- Verify RLS
SELECT COUNT(*) FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = true;
-- Expected: All tables have RLS

-- Check foreign keys
SELECT COUNT(*) FROM information_schema.table_constraints 
WHERE constraint_type = 'FOREIGN KEY';
-- Expected: Increasing with each tier
```

---

*Last Updated: December 20, 2024*  
*Status: 📋 Proposed*  
*Tables: 44 additional (52 total with existing)*  
*Estimated Effort: 80 hours (2 months part-time)*
