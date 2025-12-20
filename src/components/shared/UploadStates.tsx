/**
 * Upload States Component - FashionOS
 * 
 * Complete file upload UI with 4 distinct states:
 * 1. Empty Upload Area (Drag & Drop)
 * 2. Uploading (In Progress)
 * 3. Upload Complete
 * 4. Multiple Files (Gallery View)
 * 
 * Features:
 * - Drag and drop files
 * - File type validation with type-specific icons
 * - File size validation (10MB limit)
 * - Upload progress tracking with smooth animations
 * - Multi-file support with gallery view
 * - Preview thumbnails
 * - Error handling
 * - Follows "Calm Luxury" design philosophy
 * 
 * Usage:
 * ```tsx
 * <FileUpload
 *   onUpload={handleUpload}
 *   acceptedTypes={['image/jpeg', 'image/png', 'application/pdf']}
 *   maxSize={10 * 1024 * 1024}
 *   multiple={true}
 * />
 * ```
 */

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  X, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Image as ImageIcon,
  File as FileIcon,
  Plus,
  Trash2
} from 'lucide-react';
import { uploadFile, type StorageBucket } from '../../lib/supabase/storage';
import { saveFileMetadata } from '../../lib/supabase/fileQueries';
import { compressImage, shouldCompress } from '../../lib/utils/imageCompression';

export interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  progress: number;
  error?: string;
}

export interface FileUploadProps {
  /** Callback when files are uploaded */
  onUpload: (files: File[]) => Promise<void>;
  
  /** Accepted file types (MIME types) */
  acceptedTypes?: string[]
  
  /** Max file size in bytes (default: 10MB) */
  maxSize?: number;
  
  /** Allow multiple files */
  multiple?: boolean;
  
  /** Maximum number of files */
  maxFiles?: number;
  
  /** Display mode: 'list' or 'gallery' */
  mode?: 'list' | 'gallery';
  
  /** Storage bucket (if using Supabase storage) */
  bucket?: StorageBucket;
  
  /** Storage folder path */
  folder?: string;
  
  /** Enable auto-compression for images */
  autoCompress?: boolean;
  
  /** Custom className */
  className?: string;
  
  /** Callback when upload completes with URLs */
  onUploadComplete?: (results: Array<{ file: File; url: string | null; path: string }>) => void;
}

/**
 * Get file type icon with proper color
 */
function getFileTypeIcon(type: string, size: number = 24) {
  const className = `w-${size === 24 ? '6' : size === 32 ? '8' : '12'} h-${size === 24 ? '6' : size === 32 ? '8' : '12'}`;
  
  if (type === 'application/pdf') {
    return <FileText className={`${className} text-red-600`} />;
  }
  
  if (type.startsWith('image/')) {
    return <ImageIcon className={`${className} text-blue-600`} />;
  }
  
  return <FileIcon className={`${className} text-gray-600`} />;
}

/**
 * Format bytes to human-readable format
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get formatted file type string
 */
function getFileTypeLabel(acceptedTypes: string[]): string {
  const types = acceptedTypes.map(type => {
    if (type === 'application/pdf') return 'PDF';
    if (type === 'image/jpeg' || type === 'image/jpg') return 'JPG';
    if (type === 'image/png') return 'PNG';
    if (type === 'image/webp') return 'WEBP';
    if (type.startsWith('image/')) return 'Images';
    return type.split('/')[1]?.toUpperCase() || 'Files';
  });
  
  // Remove duplicates
  return [...new Set(types)].join(', ');
}

/**
 * File Upload Component with Drag & Drop
 */
export function FileUpload({
  onUpload,
  acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  maxFiles = 10,
  mode = 'list',
  className = '',
  bucket,
  folder,
  autoCompress,
  onUploadComplete,
}: FileUploadProps) {
  
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFiles = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadFile[] = Array.from(selectedFiles).map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      status: 'pending' as const,
      progress: 0,
    }));

    // Validate files
    const validatedFiles = newFiles.map((uploadFile) => {
      // Check file type
      if (!acceptedTypes.includes(uploadFile.type)) {
        return {
          ...uploadFile,
          status: 'error' as const,
          error: `Invalid file type. Accepted: ${getFileTypeLabel(acceptedTypes)}`,
        };
      }

      // Check file size
      if (uploadFile.size > maxSize) {
        return {
          ...uploadFile,
          status: 'error' as const,
          error: `File too large. Max size: ${formatBytes(maxSize)}`,
        };
      }

      return uploadFile;
    });

    // Check max files
    if (files.length + validatedFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setFiles((prev) => [...prev, ...validatedFiles]);

    // Auto-upload valid files
    validatedFiles
      .filter((f) => f.status === 'pending')
      .forEach((uploadFile) => {
        simulateUpload(uploadFile);
      });
  }, [acceptedTypes, maxSize, maxFiles, files.length]);

  // Simulate upload progress (replace with real upload logic)
  const simulateUpload = async (uploadFile: UploadFile) => {
    try {
      // Mark as uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: 'uploading' } : f
        )
      );

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 5) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, progress } : f
          )
        );
      }

      // Call onUpload callback
      await onUpload([uploadFile.file]);

      // Mark as complete
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? { ...f, status: 'complete', progress: 100 }
            : f
        )
      );
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? { ...f, status: 'error', error: 'Upload failed' }
            : f
        )
      );
    }
  };

  // Remove file
  const removeFile = (id: string) => {
    const file = files.find(f => f.id === id);
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Drag & drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`w-full ${className}`}>
      {/* STATE 1: Empty Upload Area (Drag & Drop) */}
      <motion.div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFilePicker}
        className={`
          relative rounded-lg p-12 text-center transition-all cursor-pointer
          ${isDragging 
            ? 'border-2 border-solid border-[#111111] bg-[#F5F2ED]/30' 
            : 'border-2 border-dashed border-[#D1D5DB] bg-white hover:border-solid hover:border-[#111111]'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Upload Icon - 64px */}
        <motion.div
          animate={{ scale: isDragging ? 1.1 : 1 }}
          className="mx-auto w-16 h-16 mb-6 text-gray-400"
        >
          <Upload className="w-full h-full" strokeWidth={1.5} />
        </motion.div>

        {/* Headline */}
        <p className="text-lg text-[#1F2125] mb-2">
          {isDragging ? 'Drop files here' : 'Drag and drop files here'}
        </p>
        
        {/* Subtext */}
        <p className="text-sm text-gray-500 mb-6">
          or click to browse
        </p>

        {/* Supported Formats */}
        <p className="text-xs text-gray-400">
          {getFileTypeLabel(acceptedTypes)} (max {formatBytes(maxSize)})
        </p>
      </motion.div>

      {/* File Display - List or Gallery Mode */}
      {files.length > 0 && (
        <div className="mt-6">
          {mode === 'list' ? (
            // List View
            <div className="space-y-3">
              <AnimatePresence>
                {files.map((uploadFile) => (
                  <UploadFileItem
                    key={uploadFile.id}
                    uploadFile={uploadFile}
                    onRemove={removeFile}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            // STATE 4: Gallery View (3 columns)
            <div className="grid grid-cols-3 gap-4">
              <AnimatePresence>
                {files.map((uploadFile) => (
                  <GalleryFileItem
                    key={uploadFile.id}
                    uploadFile={uploadFile}
                    onRemove={removeFile}
                  />
                ))}
              </AnimatePresence>
              
              {/* Add More Card */}
              {files.length < maxFiles && (
                <motion.button
                  onClick={openFilePicker}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-[#111111] hover:bg-[#F5F2ED]/30 transition-all flex flex-col items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center group-hover:border-[#111111] transition-colors">
                    <Plus className="w-5 h-5 text-gray-500 group-hover:text-[#111111]" />
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-[#111111]">Add More</span>
                </motion.button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * STATE 2 & 3: Upload File Item (List View)
 * - Uploading: Progress bar, percentage, cancel button
 * - Complete: Checkmark overlay, remove button
 */
function UploadFileItem({ 
  uploadFile, 
  onRemove 
}: { 
  uploadFile: UploadFile; 
  onRemove: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="border border-gray-200 rounded-lg p-4 bg-white"
    >
      <div className="flex items-start gap-4">
        {/* Thumbnail/Icon - 80px */}
        <div className="flex-shrink-0 relative">
          {uploadFile.preview ? (
            <div className="relative">
              <img
                src={uploadFile.preview}
                alt={uploadFile.name}
                className="w-20 h-20 rounded object-cover"
              />
              {/* Checkmark Overlay for Complete */}
              {uploadFile.status === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-green-600/80 rounded flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
                </motion.div>
              )}
            </div>
          ) : (
            <div className="w-20 h-20 rounded bg-gray-100 flex items-center justify-center">
              {getFileTypeIcon(uploadFile.type, 32)}
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate mb-1">
            {uploadFile.name}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            {formatBytes(uploadFile.size)}
          </p>

          {/* STATE 2: Uploading - Progress Bar */}
          {uploadFile.status === 'uploading' && (
            <div className="space-y-1">
              {/* Progress Bar - 4px height, green fill */}
              <div className="w-full h-1 bg-[#E5E7EB] rounded-sm overflow-hidden">
                <motion.div
                  className="h-full bg-[#10B981] rounded-sm"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadFile.progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-gray-500">
                Uploading... {uploadFile.progress}%
              </p>
            </div>
          )}

          {/* STATE 3: Upload Complete */}
          {uploadFile.status === 'complete' && (
            <p className="text-xs text-green-600 font-medium">
              Uploaded successfully
            </p>
          )}

          {/* Error Message */}
          {uploadFile.status === 'error' && uploadFile.error && (
            <div className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-red-600" />
              <p className="text-xs text-red-600">
                {uploadFile.error}
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          {uploadFile.status === 'complete' && (
            <button
              onClick={() => onRemove(uploadFile.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="Remove file"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          {uploadFile.status === 'uploading' && (
            <button
              onClick={() => onRemove(uploadFile.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Cancel upload"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {uploadFile.status === 'error' && (
            <button
              onClick={() => onRemove(uploadFile.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Gallery File Item (Grid View) - 120px square
 */
function GalleryFileItem({ 
  uploadFile, 
  onRemove 
}: { 
  uploadFile: UploadFile; 
  onRemove: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail - 120px square */}
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
        {uploadFile.preview ? (
          <img
            src={uploadFile.preview}
            alt={uploadFile.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {getFileTypeIcon(uploadFile.type, 48)}
          </div>
        )}

        {/* Status Overlays */}
        {uploadFile.status === 'uploading' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin mx-auto mb-2" />
              <p className="text-xs text-white font-medium">{uploadFile.progress}%</p>
            </div>
          </div>
        )}

        {uploadFile.status === 'complete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 right-2"
          >
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
          </motion.div>
        )}

        {uploadFile.status === 'error' && (
          <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
        )}

        {/* Hover Overlay with Remove Button */}
        <AnimatePresence>
          {isHovered && uploadFile.status !== 'uploading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <button
                onClick={() => onRemove(uploadFile.id)}
                className="w-10 h-10 rounded-full bg-white hover:bg-red-600 text-gray-700 hover:text-white transition-colors flex items-center justify-center"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* File Name - Truncated */}
      <p className="mt-2 text-xs text-gray-700 truncate" title={uploadFile.name}>
        {uploadFile.name}
      </p>

      {/* Error Message */}
      {uploadFile.status === 'error' && uploadFile.error && (
        <p className="mt-1 text-xs text-red-600 truncate" title={uploadFile.error}>
          {uploadFile.error}
        </p>
      )}
    </motion.div>
  );
}

/**
 * Simple Upload Button (for inline use)
 */
export function SimpleUploadButton({
  onUpload,
  label = 'Upload File',
  acceptedTypes = ['image/*'],
  className = '',
}: {
  onUpload: (file: File) => Promise<void>;
  label?: string;
  acceptedTypes?: string[];
  className?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await onUpload(file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className={`px-4 py-2 rounded-lg border border-[#1F2125] text-[#1F2125] hover:bg-[#1F2125] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {uploading ? 'Uploading...' : label}
      </button>
    </>
  );
}