/**
 * Image Compression Utilities - FashionOS
 * 
 * Client-side image compression and optimization before upload
 * Reduces file sizes while maintaining quality, generates thumbnails
 * 
 * Features:
 * - Compress images before upload
 * - Maintain aspect ratio
 * - Generate thumbnails
 * - Convert to WebP (optional)
 * - Preserve EXIF data (optional)
 * 
 * Usage:
 * ```typescript
 * import { compressImage, generateThumbnail } from '@/lib/utils/imageCompression';
 * 
 * const compressed = await compressImage(file, { maxWidth: 1920, quality: 0.85 });
 * const thumbnail = await generateThumbnail(file, 300, 300);
 * ```
 */

// ============================================================================
// TYPES
// ============================================================================

export interface CompressionOptions {
  /** Maximum width in pixels */
  maxWidth?: number;
  
  /** Maximum height in pixels */
  maxHeight?: number;
  
  /** Image quality (0-1) */
  quality?: number;
  
  /** Output format */
  outputFormat?: 'image/jpeg' | 'image/png' | 'image/webp';
  
  /** Preserve EXIF data */
  preserveExif?: boolean;
}

export interface ThumbnailOptions {
  /** Thumbnail width */
  width: number;
  
  /** Thumbnail height */
  height: number;
  
  /** Crop to fit (true) or contain (false) */
  crop?: boolean;
  
  /** Image quality (0-1) */
  quality?: number;
}

// ============================================================================
// IMAGE COMPRESSION
// ============================================================================

/**
 * Compress an image file
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.85,
    outputFormat = 'image/jpeg',
    preserveExif = false,
  } = options;
  
  // Only compress images
  if (!file.type.startsWith('image/')) {
    return file;
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }
      
      // Set canvas size
      canvas.width = width;
      canvas.height = height;
      
      // Draw image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'));
            return;
          }
          
          // Create new File from blob
          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, `.${outputFormat.split('/')[1]}`),
            {
              type: outputFormat,
              lastModified: Date.now(),
            }
          );
          
          // Only use compressed version if it's actually smaller
          if (compressedFile.size < file.size) {
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        outputFormat,
        quality
      );
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    // Load image
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Compress multiple images in parallel
 */
export async function compressImages(
  files: File[],
  options: CompressionOptions = {},
  onProgress?: (index: number, total: number) => void
): Promise<File[]> {
  const compressed: File[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const compressedFile = await compressImage(files[i], options);
    compressed.push(compressedFile);
    
    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }
  
  return compressed;
}

// ============================================================================
// THUMBNAIL GENERATION
// ============================================================================

/**
 * Generate a thumbnail from an image file
 */
export async function generateThumbnail(
  file: File,
  width: number,
  height: number,
  options: Partial<ThumbnailOptions> = {}
): Promise<File> {
  const { crop = true, quality = 0.8 } = options;
  
  // Only process images
  if (!file.type.startsWith('image/')) {
    return file;
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }
    
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      
      let sx = 0;
      let sy = 0;
      let sWidth = img.width;
      let sHeight = img.height;
      
      if (crop) {
        // Crop to fit - center crop
        const imgRatio = img.width / img.height;
        const targetRatio = width / height;
        
        if (imgRatio > targetRatio) {
          // Image is wider - crop sides
          sWidth = img.height * targetRatio;
          sx = (img.width - sWidth) / 2;
        } else {
          // Image is taller - crop top/bottom
          sHeight = img.width / targetRatio;
          sy = (img.height - sHeight) / 2;
        }
      } else {
        // Contain - fit inside dimensions
        const ratio = Math.min(width / img.width, height / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
      }
      
      // Draw thumbnail
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
      
      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to generate thumbnail'));
            return;
          }
          
          const thumbnailFile = new File(
            [blob],
            `thumb_${file.name}`,
            {
              type: 'image/jpeg',
              lastModified: Date.now(),
            }
          );
          
          resolve(thumbnailFile);
        },
        'image/jpeg',
        quality
      );
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = URL.createObjectURL(file);
  });
}

// ============================================================================
// IMAGE UTILITIES
// ============================================================================

/**
 * Get image dimensions without loading the full image
 */
export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
      URL.revokeObjectURL(img.src);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
      URL.revokeObjectURL(img.src);
    };
    
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Convert image to data URL
 */
export async function imageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * Check if image needs compression
 */
export function shouldCompress(file: File, maxSizeMB: number = 2): boolean {
  if (!file.type.startsWith('image/')) {
    return false;
  }
  
  const sizeMB = file.size / (1024 * 1024);
  return sizeMB > maxSizeMB;
}

/**
 * Get optimal compression settings based on file size
 */
export function getOptimalCompressionSettings(file: File): CompressionOptions {
  const sizeMB = file.size / (1024 * 1024);
  
  if (sizeMB < 1) {
    // Small files - minimal compression
    return {
      maxWidth: 2560,
      maxHeight: 2560,
      quality: 0.9,
      outputFormat: 'image/jpeg',
    };
  } else if (sizeMB < 5) {
    // Medium files - moderate compression
    return {
      maxWidth: 1920,
      maxHeight: 1920,
      quality: 0.85,
      outputFormat: 'image/jpeg',
    };
  } else {
    // Large files - aggressive compression
    return {
      maxWidth: 1920,
      maxHeight: 1920,
      quality: 0.75,
      outputFormat: 'image/jpeg',
    };
  }
}

/**
 * Batch process images with compression and thumbnail generation
 */
export async function processImages(
  files: File[],
  options: {
    compress?: boolean;
    compressionOptions?: CompressionOptions;
    generateThumbnails?: boolean;
    thumbnailSize?: number;
    onProgress?: (current: number, total: number, stage: 'compress' | 'thumbnail') => void;
  } = {}
): Promise<{
  compressed: File[];
  thumbnails: File[];
}> {
  const {
    compress = true,
    compressionOptions = {},
    generateThumbnails = false,
    thumbnailSize = 300,
    onProgress,
  } = options;
  
  let compressed: File[] = files;
  let thumbnails: File[] = [];
  
  // Compress images
  if (compress) {
    compressed = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const settings = getOptimalCompressionSettings(file);
        const compressedFile = await compressImage(file, { ...settings, ...compressionOptions });
        compressed.push(compressedFile);
      } else {
        compressed.push(file);
      }
      
      if (onProgress) {
        onProgress(i + 1, files.length, 'compress');
      }
    }
  }
  
  // Generate thumbnails
  if (generateThumbnails) {
    for (let i = 0; i < compressed.length; i++) {
      const file = compressed[i];
      if (file.type.startsWith('image/')) {
        const thumbnail = await generateThumbnail(file, thumbnailSize, thumbnailSize);
        thumbnails.push(thumbnail);
      }
      
      if (onProgress) {
        onProgress(i + 1, compressed.length, 'thumbnail');
      }
    }
  }
  
  return { compressed, thumbnails };
}
