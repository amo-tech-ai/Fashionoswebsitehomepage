-- ============================================================================
-- FILE STORAGE SCHEMA - FashionOS
-- ============================================================================
-- Comprehensive file metadata storage for Supabase Storage integration
-- Tracks uploaded files, associations, and metadata across all features
--
-- Tables:
-- 1. uploaded_files - Core file metadata
-- 2. brand_shoot_files - Brand shoot associations
-- 3. designer_portfolio_files - Designer portfolio associations
-- 4. contract_files - Contract document associations
-- 5. gallery_files - Gallery/event photo associations
--
-- Run this script in Supabase SQL Editor after connecting your project
-- ============================================================================

-- ============================================================================
-- 1. UPLOADED FILES (Core Table)
-- ============================================================================

CREATE TABLE IF NOT EXISTS uploaded_files (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Storage Information
  bucket TEXT NOT NULL CHECK (bucket IN ('brand-shoots', 'designer-portfolios', 'contracts', 'gallery')),
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  
  -- File Metadata
  original_filename TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  
  -- Optional Metadata
  caption TEXT,
  alt_text TEXT,
  tags TEXT[],
  
  -- User/Owner
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(bucket, storage_path)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_uploaded_files_bucket ON uploaded_files(bucket);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_uploaded_by ON uploaded_files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_created_at ON uploaded_files(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_mime_type ON uploaded_files(mime_type);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_uploaded_files_updated_at
  BEFORE UPDATE ON uploaded_files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;

-- Anyone can view files
CREATE POLICY "Anyone can view uploaded files"
  ON uploaded_files FOR SELECT
  USING (true);

-- Users can upload files
CREATE POLICY "Authenticated users can upload files"
  ON uploaded_files FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own files
CREATE POLICY "Users can update their own files"
  ON uploaded_files FOR UPDATE
  USING (uploaded_by = auth.uid());

-- Users can delete their own files
CREATE POLICY "Users can delete their own files"
  ON uploaded_files FOR DELETE
  USING (uploaded_by = auth.uid());

-- ============================================================================
-- 2. BRAND SHOOT FILES
-- ============================================================================

CREATE TABLE IF NOT EXISTS brand_shoot_files (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign Keys
  shoot_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  file_id UUID NOT NULL REFERENCES uploaded_files(id) ON DELETE CASCADE,
  
  -- Metadata
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  category TEXT, -- 'product', 'lifestyle', 'model', 'bts' (behind-the-scenes)
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(shoot_id, file_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_brand_shoot_files_shoot_id ON brand_shoot_files(shoot_id);
CREATE INDEX IF NOT EXISTS idx_brand_shoot_files_file_id ON brand_shoot_files(file_id);
CREATE INDEX IF NOT EXISTS idx_brand_shoot_files_display_order ON brand_shoot_files(shoot_id, display_order);

-- RLS
ALTER TABLE brand_shoot_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view brand shoot files"
  ON brand_shoot_files FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage brand shoot files"
  ON brand_shoot_files FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- 3. DESIGNER PORTFOLIO FILES
-- ============================================================================

CREATE TABLE IF NOT EXISTS designer_portfolio_files (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign Keys
  designer_id UUID NOT NULL, -- References designer profile
  file_id UUID NOT NULL REFERENCES uploaded_files(id) ON DELETE CASCADE,
  
  -- Metadata
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  collection_name TEXT,
  season TEXT, -- 'SS24', 'FW24', etc.
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(designer_id, file_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_designer_portfolio_files_designer_id ON designer_portfolio_files(designer_id);
CREATE INDEX IF NOT EXISTS idx_designer_portfolio_files_file_id ON designer_portfolio_files(file_id);
CREATE INDEX IF NOT EXISTS idx_designer_portfolio_files_display_order ON designer_portfolio_files(designer_id, display_order);

-- RLS
ALTER TABLE designer_portfolio_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view designer portfolio files"
  ON designer_portfolio_files FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage designer portfolio files"
  ON designer_portfolio_files FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- 4. CONTRACT FILES
-- ============================================================================

CREATE TABLE IF NOT EXISTS contract_files (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign Keys
  contract_id UUID, -- References contract/legal document
  file_id UUID NOT NULL REFERENCES uploaded_files(id) ON DELETE CASCADE,
  
  -- Metadata
  contract_type TEXT, -- 'vendor', 'sponsor', 'talent', 'venue'
  contract_status TEXT DEFAULT 'pending', -- 'pending', 'signed', 'executed'
  signed_date DATE,
  expiry_date DATE,
  
  -- AI Analysis Results
  ai_analyzed BOOLEAN DEFAULT false,
  ai_summary TEXT,
  ai_key_terms JSONB,
  ai_risk_score INTEGER, -- 0-100
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(file_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_contract_files_contract_id ON contract_files(contract_id);
CREATE INDEX IF NOT EXISTS idx_contract_files_file_id ON contract_files(file_id);
CREATE INDEX IF NOT EXISTS idx_contract_files_status ON contract_files(contract_status);
CREATE INDEX IF NOT EXISTS idx_contract_files_type ON contract_files(contract_type);

-- Updated timestamp trigger
CREATE TRIGGER update_contract_files_updated_at
  BEFORE UPDATE ON contract_files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE contract_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view contract files"
  ON contract_files FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage contract files"
  ON contract_files FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- 5. GALLERY FILES
-- ============================================================================

CREATE TABLE IF NOT EXISTS gallery_files (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign Keys
  gallery_id UUID, -- References gallery/album
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  file_id UUID NOT NULL REFERENCES uploaded_files(id) ON DELETE CASCADE,
  
  -- Metadata
  display_order INTEGER DEFAULT 0,
  is_cover_photo BOOLEAN DEFAULT false,
  album_name TEXT,
  photographer TEXT,
  shoot_date DATE,
  location TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(file_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_gallery_files_gallery_id ON gallery_files(gallery_id);
CREATE INDEX IF NOT EXISTS idx_gallery_files_event_id ON gallery_files(event_id);
CREATE INDEX IF NOT EXISTS idx_gallery_files_file_id ON gallery_files(file_id);
CREATE INDEX IF NOT EXISTS idx_gallery_files_display_order ON gallery_files(gallery_id, display_order);

-- RLS
ALTER TABLE gallery_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery files"
  ON gallery_files FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage gallery files"
  ON gallery_files FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get files for a brand shoot
CREATE OR REPLACE FUNCTION get_brand_shoot_files(shoot_id_param UUID)
RETURNS TABLE (
  file_id UUID,
  url TEXT,
  filename TEXT,
  size BIGINT,
  type TEXT,
  caption TEXT,
  category TEXT,
  display_order INTEGER,
  is_featured BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    uf.id,
    uf.public_url,
    uf.original_filename,
    uf.file_size,
    uf.mime_type,
    uf.caption,
    bsf.category,
    bsf.display_order,
    bsf.is_featured
  FROM uploaded_files uf
  JOIN brand_shoot_files bsf ON uf.id = bsf.file_id
  WHERE bsf.shoot_id = shoot_id_param
  ORDER BY bsf.display_order, uf.created_at;
END;
$$ LANGUAGE plpgsql;

-- Function to get files for a designer portfolio
CREATE OR REPLACE FUNCTION get_designer_portfolio_files(designer_id_param UUID)
RETURNS TABLE (
  file_id UUID,
  url TEXT,
  filename TEXT,
  size BIGINT,
  type TEXT,
  caption TEXT,
  collection_name TEXT,
  season TEXT,
  display_order INTEGER,
  is_featured BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    uf.id,
    uf.public_url,
    uf.original_filename,
    uf.file_size,
    uf.mime_type,
    uf.caption,
    dpf.collection_name,
    dpf.season,
    dpf.display_order,
    dpf.is_featured
  FROM uploaded_files uf
  JOIN designer_portfolio_files dpf ON uf.id = dpf.file_id
  WHERE dpf.designer_id = designer_id_param
  ORDER BY dpf.display_order, uf.created_at;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Uncomment to insert sample data
/*
INSERT INTO uploaded_files (bucket, storage_path, public_url, original_filename, file_size, mime_type)
VALUES 
  ('brand-shoots', 'summer-2024/hero-shot.jpg', 'https://example.com/hero-shot.jpg', 'hero-shot.jpg', 2048000, 'image/jpeg'),
  ('designer-portfolios', 'designer-1/collection-1.jpg', 'https://example.com/collection-1.jpg', 'collection-1.jpg', 1536000, 'image/jpeg'),
  ('contracts', 'vendor-contracts/contract-123.pdf', 'https://example.com/contract-123.pdf', 'contract-123.pdf', 512000, 'application/pdf'),
  ('gallery', 'event-photos/photo-001.jpg', 'https://example.com/photo-001.jpg', 'photo-001.jpg', 3072000, 'image/jpeg');
*/

-- ============================================================================
-- STORAGE BUCKET POLICIES (Run in Supabase Dashboard > Storage)
-- ============================================================================

-- These policies should be created in the Supabase Dashboard Storage section:
--
-- 1. brand-shoots bucket:
--    - Public: Yes
--    - INSERT: Authenticated users only
--    - SELECT: Public
--    - UPDATE: Owner only
--    - DELETE: Owner only
--
-- 2. designer-portfolios bucket:
--    - Public: Yes
--    - Same policies as brand-shoots
--
-- 3. contracts bucket:
--    - Public: No
--    - INSERT: Authenticated users only
--    - SELECT: Authenticated users only
--    - UPDATE: Owner only
--    - DELETE: Owner only
--
-- 4. gallery bucket:
--    - Public: Yes
--    - Same policies as brand-shoots

-- ============================================================================
-- CLEANUP (Optional - for development/testing)
-- ============================================================================

-- Uncomment to drop all tables (WARNING: This will delete all data!)
/*
DROP TABLE IF EXISTS gallery_files CASCADE;
DROP TABLE IF EXISTS contract_files CASCADE;
DROP TABLE IF EXISTS designer_portfolio_files CASCADE;
DROP TABLE IF EXISTS brand_shoot_files CASCADE;
DROP TABLE IF EXISTS uploaded_files CASCADE;
DROP FUNCTION IF EXISTS get_brand_shoot_files(UUID);
DROP FUNCTION IF EXISTS get_designer_portfolio_files(UUID);
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
*/
