/**
 * Image Lightbox Demo - FashionOS
 * 
 * Demonstrates the ImageLightbox component with sample images
 */

import React, { useState } from 'react';
import { ImageLightbox, LightboxTrigger, type LightboxImage } from './components/shared/ImageLightbox';

// Sample images for demonstration
const sampleImages: LightboxImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    name: 'summer-campaign-hero.jpg',
    caption: 'Summer 2024 Campaign - Hero Shot',
    alt: 'Fashion model in summer collection',
    size: 2048000,
    type: 'image/jpeg',
    photographer: 'Sarah Anderson',
  },
  {
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80',
    name: 'runway-show-01.jpg',
    caption: 'Paris Fashion Week - Spring Collection',
    alt: 'Runway fashion show',
    size: 3145728,
    type: 'image/jpeg',
    photographer: 'Michael Chen',
  },
  {
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80',
    name: 'editorial-portrait.jpg',
    caption: 'Editorial Portrait - Vogue Feature',
    alt: 'Fashion editorial portrait',
    size: 2621440,
    type: 'image/jpeg',
    photographer: 'Emma Williams',
  },
  {
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    name: 'product-detail.jpg',
    caption: 'Product Detail - Accessories Collection',
    alt: 'Fashion accessories detail shot',
    size: 1572864,
    type: 'image/jpeg',
    photographer: 'David Martinez',
  },
  {
    url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
    name: 'behind-the-scenes.jpg',
    caption: 'Behind The Scenes - Photoshoot Setup',
    alt: 'Behind the scenes fashion shoot',
    size: 2097152,
    type: 'image/jpeg',
    photographer: 'Lisa Thompson',
  },
  {
    url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920&q=80',
    name: 'lifestyle-shot.jpg',
    caption: 'Lifestyle Photography - Urban Collection',
    alt: 'Fashion lifestyle photography',
    size: 2359296,
    type: 'image/jpeg',
    photographer: 'James Wilson',
  },
];

export default function LightboxDemo() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  const handleDownload = (image: LightboxImage, index: number) => {
    console.log('Download:', image.name);
    // In production, this would trigger actual download
    alert(`Downloading: ${image.name}`);
  };

  const handleDelete = (image: LightboxImage, index: number) => {
    console.log('Delete:', image.name);
    // In production, this would delete from storage
    alert(`Deleted: ${image.name}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-light text-[#1F2125] mb-2">
            Image Lightbox Demo
          </h1>
          <p className="text-gray-600">
            Click any image to open the lightbox viewer with navigation, zoom, and actions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Features List */}
        <div className="bg-white rounded-lg p-6 mb-12 border border-gray-200">
          <h2 className="text-lg font-medium text-[#1F2125] mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Full-screen modal with overlay</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Navigate with arrows or keyboard (←/→)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Zoom in/out (up to 300%)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Pan zoomed images by dragging</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Download images</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Delete with confirmation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Display metadata (name, size, photographer)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Thumbnail strip navigation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Keyboard shortcuts (ESC, +, -, 0)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Smooth animations</span>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bg-white rounded-lg p-6 mb-12 border border-gray-200">
          <h2 className="text-lg font-medium text-[#1F2125] mb-4">Keyboard Shortcuts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded">
              <kbd className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-mono">ESC</kbd>
              <span className="text-xs text-gray-600 mt-2">Close</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded">
              <kbd className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-mono">← →</kbd>
              <span className="text-xs text-gray-600 mt-2">Navigate</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded">
              <kbd className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-mono">+ −</kbd>
              <span className="text-xs text-gray-600 mt-2">Zoom</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded">
              <kbd className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-mono">0</kbd>
              <span className="text-xs text-gray-600 mt-2">Reset Zoom</span>
            </div>
          </div>
        </div>

        {/* Image Gallery Grid */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#1F2125] mb-4">
            Gallery - Click to Preview
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleImages.map((image, index) => (
            <div key={index} className="group">
              <button
                onClick={() => openLightbox(index)}
                className="block w-full overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-zoom-in"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="font-medium text-[#1F2125] mb-1 truncate">
                    {image.name}
                  </p>
                  {image.caption && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {image.caption}
                    </p>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Using LightboxTrigger Component */}
        <div className="mt-16">
          <h2 className="text-lg font-medium text-[#1F2125] mb-4">
            Alternative: Using LightboxTrigger Component
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            You can also wrap images with the LightboxTrigger component for simpler integration
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sampleImages.slice(0, 4).map((image, index) => (
              <LightboxTrigger
                key={index}
                image={image}
                images={sampleImages}
                className="w-full"
              >
                <div className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </LightboxTrigger>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-16 bg-[#1F2125] rounded-lg p-6 text-white overflow-x-auto">
          <h2 className="text-lg font-medium mb-4">Usage Example</h2>
          <pre className="text-sm text-green-400">
{`import { ImageLightbox } from '@/components/shared/ImageLightbox';

const images = [
  {
    url: 'https://example.com/photo1.jpg',
    name: 'photo1.jpg',
    caption: 'Summer collection',
    photographer: 'Jane Doe',
    size: 2048000,
    type: 'image/jpeg'
  },
  // ... more images
];

function MyGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <button onClick={() => { 
        setSelectedIndex(0); 
        setIsOpen(true); 
      }}>
        View Gallery
      </button>

      <ImageLightbox
        images={images}
        initialIndex={selectedIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDownload={(img, idx) => console.log('Download', img)}
        onDelete={(img, idx) => console.log('Delete', img)}
        showDownload={true}
        showDelete={true}
        showMetadata={true}
      />
    </>
  );
}`}
          </pre>
        </div>
      </div>

      {/* Lightbox Component */}
      <ImageLightbox
        images={sampleImages}
        initialIndex={selectedIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onDownload={handleDownload}
        onDelete={handleDelete}
        showDownload={true}
        showDelete={true}
        showMetadata={true}
      />
    </div>
  );
}
