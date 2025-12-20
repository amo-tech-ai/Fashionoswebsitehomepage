/**
 * File Database Queries - FashionOS
 * 
 * Type-safe database operations for file metadata
 * Works with uploaded_files and association tables
 */

import { supabase } from './client';
import type { StorageBucket } from './storage';

// ============================================================================
// TYPES
// ============================================================================

export interface UploadedFile {
  id: string;
  bucket: StorageBucket;
  storage_path: string;
  public_url: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  caption?: string;
  alt_text?: string;
  tags?: string[];
  uploaded_by?: string;
  created_at: string;
  updated_at: string;
}

export interface BrandShootFile {
  id: string;
  shoot_id: string;
  file_id: string;
  display_order: number;
  is_featured: boolean;
  category?: string;
  created_at: string;
}

export interface DesignerPortfolioFile {
  id: string;
  designer_id: string;
  file_id: string;
  display_order: number;
  is_featured: boolean;
  collection_name?: string;
  season?: string;
  created_at: string;
}

export interface ContractFile {
  id: string;
  contract_id?: string;
  file_id: string;
  contract_type?: string;
  contract_status: string;
  signed_date?: string;
  expiry_date?: string;
  ai_analyzed: boolean;
  ai_summary?: string;
  ai_key_terms?: any;
  ai_risk_score?: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryFile {
  id: string;
  gallery_id?: string;
  event_id?: string;
  file_id: string;
  display_order: number;
  is_cover_photo: boolean;
  album_name?: string;
  photographer?: string;
  shoot_date?: string;
  location?: string;
  created_at: string;
}

// ============================================================================
// UPLOADED FILES (Core)
// ============================================================================

/**
 * Save file metadata to database after upload
 */
export async function saveFileMetadata(file: {
  bucket: StorageBucket;
  storage_path: string;
  public_url: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  caption?: string;
  alt_text?: string;
  tags?: string[];
}): Promise<{ data: UploadedFile | null; error: any }> {
  const { data, error } = await supabase
    .from('uploaded_files')
    .insert([file])
    .select()
    .single();

  if (error) {
    console.error('[FileQueries] Save file metadata error:', error);
  }

  return { data, error };
}

/**
 * Get file metadata by ID
 */
export async function getFileMetadata(fileId: string): Promise<{ data: UploadedFile | null; error: any }> {
  const { data, error } = await supabase
    .from('uploaded_files')
    .select('*')
    .eq('id', fileId)
    .single();

  if (error) {
    console.error('[FileQueries] Get file metadata error:', error);
  }

  return { data, error };
}

/**
 * Update file metadata
 */
export async function updateFileMetadata(
  fileId: string,
  updates: Partial<Pick<UploadedFile, 'caption' | 'alt_text' | 'tags'>>
): Promise<{ data: UploadedFile | null; error: any }> {
  const { data, error } = await supabase
    .from('uploaded_files')
    .update(updates)
    .eq('id', fileId)
    .select()
    .single();

  if (error) {
    console.error('[FileQueries] Update file metadata error:', error);
  }

  return { data, error };
}

/**
 * Delete file metadata (also deletes associations via CASCADE)
 */
export async function deleteFileMetadata(fileId: string): Promise<{ error: any }> {
  const { error } = await supabase
    .from('uploaded_files')
    .delete()
    .eq('id', fileId);

  if (error) {
    console.error('[FileQueries] Delete file metadata error:', error);
  }

  return { error };
}

// ============================================================================
// BRAND SHOOT FILES
// ============================================================================

/**
 * Associate file with brand shoot
 */
export async function addBrandShootFile(data: {
  shoot_id: string;
  file_id: string;
  display_order?: number;
  is_featured?: boolean;
  category?: string;
}): Promise<{ data: BrandShootFile | null; error: any }> {
  const { data: result, error } = await supabase
    .from('brand_shoot_files')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('[FileQueries] Add brand shoot file error:', error);
  }

  return { data: result, error };
}

/**
 * Get all files for a brand shoot
 */
export async function getBrandShootFiles(shootId: string): Promise<{
  data: Array<UploadedFile & { display_order: number; is_featured: boolean; category?: string }> | null;
  error: any;
}> {
  const { data, error } = await supabase
    .from('brand_shoot_files')
    .select(`
      display_order,
      is_featured,
      category,
      uploaded_files (*)
    `)
    .eq('shoot_id', shootId)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[FileQueries] Get brand shoot files error:', error);
    return { data: null, error };
  }

  // Flatten the structure
  const files = data?.map((item: any) => ({
    ...item.uploaded_files,
    display_order: item.display_order,
    is_featured: item.is_featured,
    category: item.category,
  })) || null;

  return { data: files, error: null };
}

/**
 * Update brand shoot file display order
 */
export async function updateBrandShootFileOrder(
  shootId: string,
  fileOrders: Array<{ file_id: string; display_order: number }>
): Promise<{ error: any }> {
  // Update each file's display order
  const promises = fileOrders.map(({ file_id, display_order }) =>
    supabase
      .from('brand_shoot_files')
      .update({ display_order })
      .eq('shoot_id', shootId)
      .eq('file_id', file_id)
  );

  const results = await Promise.all(promises);
  const error = results.find((r) => r.error)?.error;

  if (error) {
    console.error('[FileQueries] Update brand shoot file order error:', error);
  }

  return { error };
}

/**
 * Remove file from brand shoot
 */
export async function removeBrandShootFile(
  shootId: string,
  fileId: string
): Promise<{ error: any }> {
  const { error } = await supabase
    .from('brand_shoot_files')
    .delete()
    .eq('shoot_id', shootId)
    .eq('file_id', fileId);

  if (error) {
    console.error('[FileQueries] Remove brand shoot file error:', error);
  }

  return { error };
}

// ============================================================================
// DESIGNER PORTFOLIO FILES
// ============================================================================

/**
 * Associate file with designer portfolio
 */
export async function addDesignerPortfolioFile(data: {
  designer_id: string;
  file_id: string;
  display_order?: number;
  is_featured?: boolean;
  collection_name?: string;
  season?: string;
}): Promise<{ data: DesignerPortfolioFile | null; error: any }> {
  const { data: result, error } = await supabase
    .from('designer_portfolio_files')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('[FileQueries] Add designer portfolio file error:', error);
  }

  return { data: result, error };
}

/**
 * Get all files for a designer portfolio
 */
export async function getDesignerPortfolioFiles(designerId: string): Promise<{
  data: Array<UploadedFile & { display_order: number; is_featured: boolean; collection_name?: string; season?: string }> | null;
  error: any;
}> {
  const { data, error } = await supabase
    .from('designer_portfolio_files')
    .select(`
      display_order,
      is_featured,
      collection_name,
      season,
      uploaded_files (*)
    `)
    .eq('designer_id', designerId)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[FileQueries] Get designer portfolio files error:', error);
    return { data: null, error };
  }

  const files = data?.map((item: any) => ({
    ...item.uploaded_files,
    display_order: item.display_order,
    is_featured: item.is_featured,
    collection_name: item.collection_name,
    season: item.season,
  })) || null;

  return { data: files, error: null };
}

// ============================================================================
// CONTRACT FILES
// ============================================================================

/**
 * Associate file with contract
 */
export async function addContractFile(data: {
  contract_id?: string;
  file_id: string;
  contract_type?: string;
  contract_status?: string;
  signed_date?: string;
  expiry_date?: string;
}): Promise<{ data: ContractFile | null; error: any }> {
  const { data: result, error } = await supabase
    .from('contract_files')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('[FileQueries] Add contract file error:', error);
  }

  return { data: result, error };
}

/**
 * Get all contract files
 */
export async function getContractFiles(contractId?: string): Promise<{
  data: Array<UploadedFile & Partial<ContractFile>> | null;
  error: any;
}> {
  let query = supabase
    .from('contract_files')
    .select(`
      *,
      uploaded_files (*)
    `);

  if (contractId) {
    query = query.eq('contract_id', contractId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('[FileQueries] Get contract files error:', error);
    return { data: null, error };
  }

  const files = data?.map((item: any) => ({
    ...item.uploaded_files,
    contract_id: item.contract_id,
    contract_type: item.contract_type,
    contract_status: item.contract_status,
    ai_analyzed: item.ai_analyzed,
    ai_summary: item.ai_summary,
    ai_key_terms: item.ai_key_terms,
    ai_risk_score: item.ai_risk_score,
  })) || null;

  return { data: files, error: null };
}

/**
 * Update contract AI analysis results
 */
export async function updateContractAnalysis(
  fileId: string,
  analysis: {
    ai_analyzed: boolean;
    ai_summary?: string;
    ai_key_terms?: any;
    ai_risk_score?: number;
  }
): Promise<{ error: any }> {
  const { error } = await supabase
    .from('contract_files')
    .update(analysis)
    .eq('file_id', fileId);

  if (error) {
    console.error('[FileQueries] Update contract analysis error:', error);
  }

  return { error };
}

// ============================================================================
// GALLERY FILES
// ============================================================================

/**
 * Associate file with gallery/event
 */
export async function addGalleryFile(data: {
  gallery_id?: string;
  event_id?: string;
  file_id: string;
  display_order?: number;
  is_cover_photo?: boolean;
  album_name?: string;
  photographer?: string;
  shoot_date?: string;
  location?: string;
}): Promise<{ data: GalleryFile | null; error: any }> {
  const { data: result, error } = await supabase
    .from('gallery_files')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('[FileQueries] Add gallery file error:', error);
  }

  return { data: result, error };
}

/**
 * Get all files for a gallery/event
 */
export async function getGalleryFiles(galleryId?: string, eventId?: string): Promise<{
  data: Array<UploadedFile & Partial<GalleryFile>> | null;
  error: any;
}> {
  let query = supabase
    .from('gallery_files')
    .select(`
      *,
      uploaded_files (*)
    `);

  if (galleryId) {
    query = query.eq('gallery_id', galleryId);
  }
  if (eventId) {
    query = query.eq('event_id', eventId);
  }

  const { data, error } = await query.order('display_order', { ascending: true });

  if (error) {
    console.error('[FileQueries] Get gallery files error:', error);
    return { data: null, error };
  }

  const files = data?.map((item: any) => ({
    ...item.uploaded_files,
    gallery_id: item.gallery_id,
    event_id: item.event_id,
    display_order: item.display_order,
    is_cover_photo: item.is_cover_photo,
    album_name: item.album_name,
    photographer: item.photographer,
    shoot_date: item.shoot_date,
    location: item.location,
  })) || null;

  return { data: files, error: null };
}
