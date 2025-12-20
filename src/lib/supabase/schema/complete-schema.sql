-- ============================================================================
-- FashionOS Complete Database Schema
-- ============================================================================
-- Production-ready schema with RLS policies, indexes, and constraints
-- Execute this in your Supabase SQL Editor
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- DROP EXISTING TABLES (for fresh install)
-- ============================================================================
-- Uncomment these lines if you need to recreate tables:
-- DROP TABLE IF EXISTS assets CASCADE;
-- DROP TABLE IF EXISTS budget_items CASCADE;
-- DROP TABLE IF EXISTS sponsors CASCADE;
-- DROP TABLE IF EXISTS tasks CASCADE;
-- DROP TABLE IF EXISTS campaigns CASCADE;
-- DROP TABLE IF EXISTS events CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS organizations CASCADE;

-- ============================================================================
-- ORGANIZATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);
CREATE INDEX IF NOT EXISTS idx_organizations_plan ON organizations(plan);

-- RLS Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Organizations are viewable by members" 
  ON organizations FOR SELECT 
  USING (
    id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid()
    )
  );

CREATE POLICY "Owners can update organizations" 
  ON organizations FOR UPDATE 
  USING (
    id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'owner'
    )
  );

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'organizer', 'viewer')),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view org members" 
  ON users FOR SELECT 
  USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid()
    )
  );

CREATE POLICY "Users can update own profile" 
  ON users FOR UPDATE 
  USING (id = auth.uid());

CREATE POLICY "Admins can update users" 
  ON users FOR UPDATE 
  USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('owner', 'admin')
    )
  );

-- ============================================================================
-- EVENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'runway_show' CHECK (type IN ('runway_show', 'photoshoot', 'activation', 'popup', 'campaign')),
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  venue_name TEXT,
  venue_address TEXT,
  budget_total NUMERIC(12,2) NOT NULL DEFAULT 0,
  budget_actual NUMERIC(12,2) NOT NULL DEFAULT 0,
  attendee_target INTEGER,
  attendee_registered INTEGER DEFAULT 0,
  progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_date_range CHECK (end_date IS NULL OR end_date >= start_date),
  CONSTRAINT valid_budget CHECK (budget_total >= 0 AND budget_actual >= 0)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_events_organization_id ON events(organization_id);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);

-- Full text search index
CREATE INDEX IF NOT EXISTS idx_events_search ON events USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- RLS Policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by org members" 
  ON events FOR SELECT 
  USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid()
    )
  );

CREATE POLICY "Organizers can create events" 
  ON events FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('owner', 'admin', 'organizer')
    )
  );

CREATE POLICY "Event creators can update their events" 
  ON events FOR UPDATE 
  USING (
    created_by = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Admins can delete events" 
  ON events FOR DELETE 
  USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('owner', 'admin')
    )
  );

-- ============================================================================
-- TASKS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'to_do' CHECK (status IN ('to_do', 'in_progress', 'done', 'blocked')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  workflow_phase TEXT NOT NULL DEFAULT 'pre_production' CHECK (workflow_phase IN ('pre_production', 'venue_logistics', 'creative_design', 'on_site', 'post_event')),
  workflow_category TEXT NOT NULL DEFAULT 'event_planning' CHECK (workflow_category IN ('event_planning', 'sponsorship', 'marketing', 'operations', 'media')),
  is_critical_path BOOLEAN NOT NULL DEFAULT false,
  deadline TIMESTAMPTZ,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  dependency_task_ids UUID[] DEFAULT ARRAY[]::UUID[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_event_id ON tasks(event_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_deadline ON tasks(deadline);
CREATE INDEX IF NOT EXISTS idx_tasks_workflow_phase ON tasks(workflow_phase);
CREATE INDEX IF NOT EXISTS idx_tasks_workflow_category ON tasks(workflow_category);
CREATE INDEX IF NOT EXISTS idx_tasks_critical_path ON tasks(is_critical_path) WHERE is_critical_path = true;

-- RLS Policies
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tasks are viewable by event org members" 
  ON tasks FOR SELECT 
  USING (
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users WHERE users.id = auth.uid()
      )
    )
  );

CREATE POLICY "Organizers can create tasks" 
  ON tasks FOR INSERT 
  WITH CHECK (
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('owner', 'admin', 'organizer')
      )
    )
  );

CREATE POLICY "Assigned users can update tasks" 
  ON tasks FOR UPDATE 
  USING (
    assigned_to = auth.uid() OR
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('owner', 'admin', 'organizer')
      )
    )
  );

CREATE POLICY "Organizers can delete tasks" 
  ON tasks FOR DELETE 
  USING (
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('owner', 'admin', 'organizer')
      )
    )
  );

-- ============================================================================
-- SPONSORS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  tier TEXT NOT NULL DEFAULT 'partner' CHECK (tier IN ('platinum', 'gold', 'silver', 'bronze', 'partner')),
  status TEXT NOT NULL DEFAULT 'lead' CHECK (status IN ('lead', 'contacted', 'negotiating', 'committed', 'confirmed', 'declined')),
  value NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (value >= 0),
  fit_score INTEGER CHECK (fit_score >= 0 AND fit_score <= 100),
  notes TEXT,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sponsors_event_id ON sponsors(event_id);
CREATE INDEX IF NOT EXISTS idx_sponsors_status ON sponsors(status);
CREATE INDEX IF NOT EXISTS idx_sponsors_tier ON sponsors(tier);
CREATE INDEX IF NOT EXISTS idx_sponsors_value ON sponsors(value DESC);
CREATE INDEX IF NOT EXISTS idx_sponsors_company_name ON sponsors(company_name);

-- RLS Policies
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sponsors are viewable by event org members" 
  ON sponsors FOR SELECT 
  USING (
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users WHERE users.id = auth.uid()
      )
    )
  );

CREATE POLICY "Organizers can manage sponsors" 
  ON sponsors FOR ALL 
  USING (
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('owner', 'admin', 'organizer')
      )
    )
  );

-- ============================================================================
-- BUDGET_ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS budget_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  budgeted_amount NUMERIC(12,2) NOT NULL CHECK (budgeted_amount >= 0),
  actual_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (actual_amount >= 0),
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'committed', 'paid', 'overdue')),
  vendor TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_budget_items_event_id ON budget_items(event_id);
CREATE INDEX IF NOT EXISTS idx_budget_items_category ON budget_items(category);
CREATE INDEX IF NOT EXISTS idx_budget_items_status ON budget_items(status);

-- RLS Policies
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Budget items are viewable by event org members" 
  ON budget_items FOR SELECT 
  USING (
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users WHERE users.id = auth.uid()
      )
    )
  );

CREATE POLICY "Organizers can manage budget items" 
  ON budget_items FOR ALL 
  USING (
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('owner', 'admin', 'organizer')
      )
    )
  );

-- ============================================================================
-- ASSETS TABLE (Gallery)
-- ============================================================================
CREATE TABLE IF NOT EXISTS assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  ai_score INTEGER CHECK (ai_score >= 0 AND ai_score <= 100),
  ai_feedback TEXT,
  uploaded_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_assets_event_id ON assets(event_id);
CREATE INDEX IF NOT EXISTS idx_assets_uploaded_by ON assets(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_assets_type ON assets(type);
CREATE INDEX IF NOT EXISTS idx_assets_ai_score ON assets(ai_score DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_assets_created_at ON assets(created_at DESC);

-- RLS Policies
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Assets are viewable by event org members" 
  ON assets FOR SELECT 
  USING (
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users WHERE users.id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can upload assets" 
  ON assets FOR INSERT 
  WITH CHECK (
    uploaded_by = auth.uid() AND
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users WHERE users.id = auth.uid()
      )
    )
  );

CREATE POLICY "Uploaders and admins can update assets" 
  ON assets FOR UPDATE 
  USING (
    uploaded_by = auth.uid() OR
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('owner', 'admin', 'organizer')
      )
    )
  );

CREATE POLICY "Admins can delete assets" 
  ON assets FOR DELETE 
  USING (
    event_id IN (
      SELECT id FROM events 
      WHERE organization_id IN (
        SELECT organization_id FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('owner', 'admin')
      )
    )
  );

-- ============================================================================
-- CAMPAIGNS TABLE (Brand Shoot)
-- ============================================================================
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand_signals JSONB DEFAULT '{}'::jsonb,
  strategy JSONB DEFAULT '{}'::jsonb,
  assets JSONB DEFAULT '[]'::jsonb,
  channel_packs JSONB DEFAULT '[]'::jsonb,
  pricing JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'proposed', 'approved', 'in_production', 'completed')),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_campaigns_organization_id ON campaigns(organization_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_by ON campaigns(created_by);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON campaigns(created_at DESC);

-- RLS Policies
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Campaigns are viewable by org members" 
  ON campaigns FOR SELECT 
  USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid()
    )
  );

CREATE POLICY "Users can create campaigns" 
  ON campaigns FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    organization_id IN (
      SELECT organization_id FROM users WHERE users.id = auth.uid()
    )
  );

CREATE POLICY "Campaign creators can update" 
  ON campaigns FOR UPDATE 
  USING (
    created_by = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Admins can delete campaigns" 
  ON campaigns FOR DELETE 
  USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('owner', 'admin')
    )
  );

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON sponsors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budget_items_updated_at BEFORE UPDATE ON budget_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS
-- ============================================================================

-- Event Dashboard Summary View
CREATE OR REPLACE VIEW event_dashboard_summary AS
SELECT 
  e.id,
  e.name,
  e.type,
  e.status,
  e.start_date,
  e.budget_total,
  e.budget_actual,
  e.progress_percentage,
  e.organization_id,
  COUNT(DISTINCT t.id) as total_tasks,
  COUNT(DISTINCT CASE WHEN t.status = 'done' THEN t.id END) as completed_tasks,
  COUNT(DISTINCT CASE WHEN t.is_critical_path = true AND t.status != 'done' THEN t.id END) as critical_tasks_remaining,
  COUNT(DISTINCT s.id) as total_sponsors,
  SUM(s.value) as total_sponsor_value,
  COUNT(DISTINCT a.id) as total_assets,
  COUNT(DISTINCT CASE WHEN a.status = 'approved' THEN a.id END) as approved_assets
FROM events e
LEFT JOIN tasks t ON t.event_id = e.id
LEFT JOIN sponsors s ON s.event_id = e.id AND s.status IN ('committed', 'confirmed')
LEFT JOIN assets a ON a.event_id = e.id
GROUP BY e.id;

-- ============================================================================
-- SEED DATA (Optional - for development/testing)
-- ============================================================================
-- Uncomment to insert sample data:

/*
-- Insert sample organization
INSERT INTO organizations (name, slug, plan) 
VALUES ('Sample Fashion House', 'sample-fashion', 'pro')
ON CONFLICT DO NOTHING;

-- Note: Users require auth.users entries, so they should be created via 
-- Supabase Auth first, then added to this table via trigger or manual insert
*/

-- ============================================================================
-- SCHEMA COMPLETE
-- ============================================================================
-- Next steps:
-- 1. Execute this schema in Supabase SQL Editor
-- 2. Set up Storage buckets (see files.sql)
-- 3. Configure authentication providers
-- 4. Test with sample data
-- ============================================================================
