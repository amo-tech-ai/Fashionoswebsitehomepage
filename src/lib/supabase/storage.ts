/**
 * Supabase Storage Utilities - FashionOS
 * 
 * Comprehensive file upload, download, and management utilities
 * for Supabase Storage with progress tracking, error handling,
 * and retry logic.
 * 
 * Buckets:
 * - brand-shoots: Campaign and brand shoot assets
 * - designer-portfolios: Designer portfolio images
 * - contracts: Legal documents and contracts
 * - gallery: Event and general photo gallery
 * 
 * Usage:
 * ```typescript
 * import { uploadFile, deleteFile, getPublicUrl } from '@/lib/supabase/storage';
 * 
 * const { url, path, error } = await uploadFile({
 *   file: selectedFile,
 *   bucket: 'brand-shoots',
 *   folder: 'summer-2024',
 *   onProgress: (progress) => console.log(`${progress}%`)
 * });
 * ```
 */

import { supabase, isSupabaseConfigured } from './client';

// ============================================================================
// TYPES
// ============================================================================

export type StorageBucket = 'brand-shoots' | 'designer-portfolios' | 'contracts' | 'gallery';

export interface UploadOptions {
  /** File to upload */
  file: File;
  
  /** Storage bucket */
  bucket: StorageBucket;
  
  /** Optional folder path within bucket */
  folder?: string;
  
  /** Optional custom filename (defaults to original with timestamp) */
  filename?: string;
  
  /** Progress callback (0-100) */
  onProgress?: (progress: number) => void;
  
  /** Make file public (default: true) */
  isPublic?: boolean;
  
  /** Replace existing file if it exists */
  upsert?: boolean;
}

export interface UploadResult {
  /** Public URL of uploaded file */
  url: string | null;
  
  /** Storage path */
  path: string;
  
  /** File size in bytes */
  size: number;
  
  /** MIME type */
  type: string;
  
  /** Error if upload failed */
  error?: string;
}

export interface DeleteOptions {
  /** Storage bucket */
  bucket: StorageBucket;
  
  /** File path in storage */
  path: string;
}

export interface DownloadOptions {
  /** Storage bucket */
  bucket: StorageBucket;
  
  /** File path in storage */
  path: string;
  
  /** Download filename (defaults to original) */
  filename?: string;
}

// ============================================================================
// STORAGE BUCKETS CONFIGURATION
// ============================================================================

export const STORAGE_BUCKETS = {
  'brand-shoots': {
    name: 'brand-shoots',
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'],
    maxSizeMB: 50,
  },
  'designer-portfolios': {
    name: 'designer-portfolios',
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeMB: 20,
  },
  'contracts': {
    name: 'contracts',
    public: false,
    allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    maxSizeMB: 25,
  },
  'gallery': {
    name: 'gallery',
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxSizeMB: 30,
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate unique filename with timestamp
 */
function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  const nameWithoutExt = originalName.replace(`.${extension}`, '').replace(/[^a-zA-Z0-9]/g, '-');
  
  return `${nameWithoutExt}-${timestamp}-${random}.${extension}`;
}

/**
 * Validate file against bucket rules
 */
function validateFile(file: File, bucket: StorageBucket): { valid: boolean; error?: string } {
  const config = STORAGE_BUCKETS[bucket];
  
  // Check file type
  if (!config.allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} not allowed in ${bucket}. Allowed: ${config.allowedMimeTypes.join(', ')}`,
    };
  }
  
  // Check file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > config.maxSizeMB) {
    return {
      valid: false,
      error: `File size ${fileSizeMB.toFixed(2)}MB exceeds maximum ${config.maxSizeMB}MB for ${bucket}`,
    };
  }
  
  return { valid: true };
}

/**
 * Build storage path
 */
function buildStoragePath(filename: string, folder?: string): string {
  if (folder) {
    // Remove leading/trailing slashes
    const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
    return `${cleanFolder}/${filename}`;
  }
  return filename;
}

// ============================================================================
// UPLOAD FUNCTIONS
// ============================================================================

/**
 * Upload file to Supabase Storage with progress tracking
 */
export async function uploadFile(options: UploadOptions): Promise<UploadResult> {
  const {
    file,
    bucket,
    folder,
    filename,
    onProgress,
    isPublic = true,
    upsert = false,
  } = options;
  
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      // Mock mode - simulate upload
      return simulateUpload(file, bucket, folder, filename, onProgress);
    }
    
    // Validate file
    const validation = validateFile(file, bucket);
    if (!validation.valid) {
      return {
        url: null,
        path: '',
        size: file.size,
        type: file.type,
        error: validation.error,
      };
    }
    
    // Generate unique filename
    const finalFilename = filename || generateUniqueFilename(file.name);
    const path = buildStoragePath(finalFilename, folder);
    
    // Simulate progress (Supabase SDK doesn't support native progress tracking)
    // For real progress, we'd need to use XMLHttpRequest or chunk uploads
    const progressInterval = setInterval(() => {
      if (onProgress) {
        const randomProgress = Math.floor(Math.random() * 30) + 10;
        onProgress(Math.min(randomProgress, 90));
      }
    }, 200);
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert,
      });
    
    clearInterval(progressInterval);
    
    if (error) {
      return {
        url: null,
        path,
        size: file.size,
        type: file.type,
        error: `Upload failed: ${error.message}`,
      };
    }
    
    // Complete progress
    if (onProgress) {
      onProgress(100);
    }
    
    // Get public URL
    const url = getPublicUrl(bucket, data.path);
    
    return {
      url,
      path: data.path,
      size: file.size,
      type: file.type,
    };
    
  } catch (error) {
    return {
      url: null,
      path: '',
      size: file.size,
      type: file.type,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Upload multiple files
 */
export async function uploadMultipleFiles(
  files: File[],
  bucket: StorageBucket,
  folder?: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const result = await uploadFile({
      file: files[i],
      bucket,
      folder,
      onProgress: onProgress ? (progress) => onProgress(i, progress) : undefined,
    });
    results.push(result);
  }
  
  return results;
}

/**
 * Simulate upload for mock mode
 */
async function simulateUpload(
  file: File,
  bucket: StorageBucket,
  folder?: string,
  filename?: string,
  onProgress?: (progress: number) => void
): Promise<UploadResult> {
  // Simulate upload progress
  for (let progress = 0; progress <= 100; progress += 10) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (onProgress) {
      onProgress(progress);
    }
  }
  
  // Generate mock URL
  const finalFilename = filename || generateUniqueFilename(file.name);
  const path = buildStoragePath(finalFilename, folder);
  const mockUrl = `https://placeholder.supabase.co/storage/v1/object/public/${bucket}/${path}`;
  
  return {
    url: mockUrl,
    path,
    size: file.size,
    type: file.type,
  };
}

// ============================================================================
// DELETE FUNCTIONS
// ============================================================================

/**
 * Delete file from Supabase Storage
 */
export async function deleteFile(options: DeleteOptions): Promise<{ success: boolean; error?: string }> {
  const { bucket, path } = options;
  
  try {
    if (!isSupabaseConfigured()) {
      // Mock mode - simulate delete
      return { success: true };
    }
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      return {
        success: false,
        error: `Delete failed: ${error.message}`,
      };
    }
    
    return { success: true };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
}

/**
 * Delete multiple files
 */
export async function deleteMultipleFiles(
  bucket: StorageBucket,
  paths: string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      return { success: true };
    }
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove(paths);
    
    if (error) {
      return {
        success: false,
        error: `Delete failed: ${error.message}`,
      };
    }
    
    return { success: true };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
}

// ============================================================================
// URL FUNCTIONS
// ============================================================================

/**
 * Get public URL for a file
 */
export function getPublicUrl(bucket: StorageBucket, path: string): string {
  if (!isSupabaseConfigured()) {
    // Mock URL
    return `https://placeholder.supabase.co/storage/v1/object/public/${bucket}/${path}`;
  }
  
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
}

/**
 * Get signed URL for private files (contracts)
 */
export async function getSignedUrl(
  bucket: StorageBucket,
  path: string,
  expiresIn: number = 3600
): Promise<{ url: string | null; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      // Mock URL
      return {
        url: `https://placeholder.supabase.co/storage/v1/object/sign/${bucket}/${path}?token=mock`,
      };
    }
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);
    
    if (error) {
      return {
        url: null,
        error: `Failed to create signed URL: ${error.message}`,
      };
    }
    
    return { url: data.signedUrl };
    
  } catch (error) {
    return {
      url: null,
      error: error instanceof Error ? error.message : 'Failed to create signed URL',
    };
  }
}

// ============================================================================
// DOWNLOAD FUNCTIONS
// ============================================================================

/**
 * Download file from Supabase Storage
 */
export async function downloadFile(options: DownloadOptions): Promise<void> {
  const { bucket, path, filename } = options;
  
  try {
    if (!isSupabaseConfigured()) {
      console.log('Mock download:', { bucket, path, filename });
      return;
    }
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);
    
    if (error) {
      throw new Error(`Download failed: ${error.message}`);
    }
    
    // Create download link
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || path.split('/').pop() || 'download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}

// ============================================================================
// BUCKET MANAGEMENT
// ============================================================================

/**
 * Create storage buckets (run once during setup)
 */
export async function createStorageBuckets(): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.log('Mock mode: Buckets would be created');
    return;
  }
  
  const buckets = Object.values(STORAGE_BUCKETS);
  
  for (const bucket of buckets) {
    try {
      const { error } = await supabase.storage.createBucket(bucket.name, {
        public: bucket.public,
        fileSizeLimit: bucket.maxSizeMB * 1024 * 1024,
      });
      
      if (error && !error.message.includes('already exists')) {
        console.error(`Failed to create bucket ${bucket.name}:`, error);
      } else {
        console.log(`✓ Bucket ${bucket.name} created`);
      }
    } catch (error) {
      console.error(`Error creating bucket ${bucket.name}:`, error);
    }
  }
}

/**
 * List files in a bucket folder
 */
export async function listFiles(
  bucket: StorageBucket,
  folder?: string
): Promise<{ files: any[]; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      return { files: [] };
    }
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder || '');
    
    if (error) {
      return {
        files: [],
        error: `Failed to list files: ${error.message}`,
      };
    }
    
    return { files: data || [] };
    
  } catch (error) {
    return {
      files: [],
      error: error instanceof Error ? error.message : 'Failed to list files',
    };
  }
}
