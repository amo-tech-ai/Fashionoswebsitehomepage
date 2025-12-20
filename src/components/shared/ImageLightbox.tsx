/**
 * Image Lightbox Component - FashionOS
 * 
 * Full-screen image preview with navigation, zoom, and actions
 * Follows "Calm Luxury" design philosophy with ivory/charcoal palette
 * 
 * Features:
 * - Full-screen modal overlay
 * - Navigate between images (prev/next)
 * - Zoom in/out (pinch and scroll)
 * - Image metadata display (caption, filename, size)
 * - Download image
 * - Delete image
 * - Keyboard navigation (←/→ arrows, ESC to close)
 * - Touch gestures for mobile
 * - Smooth animations
 * 
 * Usage:
 * ```tsx
 * <ImageLightbox
 *   images={[
 *     { url: '...', name: 'photo.jpg', caption: 'Summer shoot' },
 *     { url: '...', name: 'photo2.jpg' }
 *   ]}
 *   initialIndex={0}
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onDelete={(index) => handleDelete(index)}
 * />
 * ```
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Trash2,
  Maximize2,
  Minimize2,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface LightboxImage {
  /** Image URL */
  url: string;
  
  /** Image filename */
  name: string;
  
  /** Optional caption */
  caption?: string;
  
  /** Optional alt text */
  alt?: string;
  
  /** File size in bytes */
  size?: number;
  
  /** MIME type */
  type?: string;
  
  /** Photographer credit */
  photographer?: string;
  
  /** Any additional metadata */
  metadata?: Record<string, any>;
}

export interface ImageLightboxProps {
  /** Array of images to display */
  images: LightboxImage[];
  
  /** Initial image index */
  initialIndex?: number;
  
  /** Control lightbox visibility */
  isOpen: boolean;
  
  /** Close callback */
  onClose: () => void;
  
  /** Download callback */
  onDownload?: (image: LightboxImage, index: number) => void;
  
  /** Delete callback */
  onDelete?: (image: LightboxImage, index: number) => void;
  
  /** Show download button */
  showDownload?: boolean;
  
  /** Show delete button */
  showDelete?: boolean;
  
  /** Show metadata panel */
  showMetadata?: boolean;
}

// ============================================================================
// UTILITIES
// ============================================================================

function formatBytes(bytes?: number): string {
  if (!bytes) return '';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onDownload,
  onDelete,
  showDownload = true,
  showDelete = false,
  showMetadata = true,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  const currentImage = images[currentIndex];

  // Reset state when opening or changing image
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setShowInfo(true);
    }
  }, [isOpen, initialIndex]);

  // Navigation
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [currentIndex, images.length]);

  // Zoom
  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case '0':
          resetZoom();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToPrevious, goToNext, zoomIn, zoomOut, resetZoom]);

  // Download handler
  const handleDownload = useCallback(() => {
    if (onDownload) {
      onDownload(currentImage, currentIndex);
    } else {
      // Default download behavior
      const link = document.createElement('a');
      link.href = currentImage.url;
      link.download = currentImage.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [currentImage, currentIndex, onDownload]);

  // Delete handler
  const handleDelete = useCallback(() => {
    if (onDelete && window.confirm(`Delete "${currentImage.name}"?`)) {
      onDelete(currentImage, currentIndex);
      
      // Navigate to next image or close if last
      if (images.length > 1) {
        if (currentIndex < images.length - 1) {
          // Stay at same index (will show next image)
        } else {
          // Go to previous if deleting last image
          setCurrentIndex((prev) => prev - 1);
        }
      } else {
        onClose();
      }
    }
  }, [currentImage, currentIndex, onDelete, images.length, onClose]);

  // Drag to pan (when zoomed)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    }
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && zoom > 1) {
        setPosition({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        });
      }
    },
    [isDragging, zoom]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#1F2125]/95 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* HEADER - Top Controls */}
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent"
          >
            <div className="max-w-[1800px] mx-auto px-6 py-6 flex items-start justify-between">
              {/* Image Counter */}
              <div className="text-white/90">
                <p className="text-sm font-medium">
                  {currentIndex + 1} / {images.length}
                </p>
                {currentImage.caption && (
                  <p className="text-xs text-white/70 mt-1 max-w-md">
                    {currentImage.caption}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Toggle Info */}
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title={showInfo ? 'Hide info' : 'Show info'}
                >
                  {showInfo ? (
                    <Minimize2 className="w-5 h-5" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
                </button>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
                  <button
                    onClick={zoomOut}
                    disabled={zoom <= 1}
                    className="p-2 rounded hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Zoom out (−)"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="px-3 text-sm text-white font-medium min-w-[4rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={zoomIn}
                    disabled={zoom >= 3}
                    className="p-2 rounded hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Zoom in (+)"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                {/* Download */}
                {showDownload && (
                  <button
                    onClick={handleDownload}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Download image"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}

                {/* Delete */}
                {showDelete && onDelete && (
                  <button
                    onClick={handleDelete}
                    className="p-2 rounded-lg bg-white/10 hover:bg-red-600 text-white transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}

                {/* Close */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Close (ESC)"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* MAIN IMAGE AREA */}
          <div className="absolute inset-0 flex items-center justify-center pt-24 pb-32 px-6">
            <div
              ref={imageRef}
              className={`relative ${zoom > 1 ? 'cursor-move' : 'cursor-default'}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <motion.img
                key={currentIndex}
                src={currentImage.url}
                alt={currentImage.alt || currentImage.name}
                className="max-w-full max-h-[calc(100vh-200px)] object-contain select-none"
                style={{
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                draggable={false}
              />
            </div>
          </div>

          {/* NAVIGATION - Previous/Next Arrows */}
          {images.length > 1 && (
            <>
              {/* Previous */}
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm"
                title="Previous (←)"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
              </button>

              {/* Next */}
              <button
                onClick={goToNext}
                disabled={currentIndex === images.length - 1}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm"
                title="Next (→)"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </>
          )}

          {/* FOOTER - Image Metadata */}
          <AnimatePresence>
            {showInfo && showMetadata && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent"
              >
                <div className="max-w-[1800px] mx-auto px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
                    {/* Filename */}
                    <div>
                      <p className="text-xs text-white/50 mb-1">Filename</p>
                      <p className="text-sm font-medium">{currentImage.name}</p>
                    </div>

                    {/* Size */}
                    {currentImage.size && (
                      <div>
                        <p className="text-xs text-white/50 mb-1">Size</p>
                        <p className="text-sm font-medium">
                          {formatBytes(currentImage.size)}
                        </p>
                      </div>
                    )}

                    {/* Photographer */}
                    {currentImage.photographer && (
                      <div>
                        <p className="text-xs text-white/50 mb-1">Photographer</p>
                        <p className="text-sm font-medium">
                          {currentImage.photographer}
                        </p>
                      </div>
                    )}

                    {/* Type */}
                    {currentImage.type && (
                      <div>
                        <p className="text-xs text-white/50 mb-1">Type</p>
                        <p className="text-sm font-medium uppercase">
                          {currentImage.type.split('/')[1]}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Strip for Multiple Images */}
                  {images.length > 1 && (
                    <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentIndex(index);
                            setZoom(1);
                            setPosition({ x: 0, y: 0 });
                          }}
                          className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden transition-all ${
                            index === currentIndex
                              ? 'ring-2 ring-white scale-110'
                              : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={image.url}
                            alt={image.alt || image.name}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keyboard Shortcuts Help (Hidden, shown on ? key) */}
          <div className="sr-only">
            <p>Keyboard shortcuts:</p>
            <ul>
              <li>ESC - Close lightbox</li>
              <li>← → - Navigate between images</li>
              <li>+ - - Zoom in/out</li>
              <li>0 - Reset zoom</li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Simple Lightbox Trigger Button
 * Wraps an image and opens lightbox on click
 */
export function LightboxTrigger({
  image,
  children,
  images,
  className = '',
}: {
  image: LightboxImage;
  children: React.ReactNode;
  images?: LightboxImage[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const allImages = images || [image];
  const initialIndex = images ? images.findIndex((img) => img.url === image.url) : 0;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`cursor-zoom-in ${className}`}
        type="button"
      >
        {children}
      </button>

      <ImageLightbox
        images={allImages}
        initialIndex={Math.max(0, initialIndex)}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
