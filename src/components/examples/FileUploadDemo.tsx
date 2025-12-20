/**
 * File Upload Demo - FashionOS
 * 
 * Comprehensive demonstration of all 4 upload states:
 * 1. Empty Upload Area (Drag & Drop)
 * 2. Uploading (In Progress)
 * 3. Upload Complete
 * 4. Multiple Files (Gallery View)
 * 
 * Shows different use cases: Brand Shoot, Designer, Gallery, Contract Analyzer
 */

import React from 'react';
import { FileUpload, SimpleUploadButton } from '../shared/UploadStates';
import { Camera, FileText, Image as ImageIcon, Briefcase } from 'lucide-react';

export function FileUploadDemo() {
  
  const handleUpload = async (files: File[]) => {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Uploaded files:', files);
  };

  const handleSingleUpload = async (file: File) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Uploaded file:', file);
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-[#1F2125] mb-4">File Upload States</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive file upload UI system with drag & drop, progress tracking, 
            and gallery views. Designed for Brand Shoot Wizard, Designer Portfolio, 
            Gallery Management, and Contract Analyzer.
          </p>
        </div>

        {/* State Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F2ED] flex items-center justify-center">
                <span className="text-sm font-medium text-[#1F2125]">1</span>
              </div>
              <h3 className="text-[#1F2125]">Empty Upload Area</h3>
            </div>
            <p className="text-sm text-gray-600">
              Dashed border (2px), 64px upload icon, drag & drop zone. 
              Hover changes border to solid.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F2ED] flex items-center justify-center">
                <span className="text-sm font-medium text-[#1F2125]">2</span>
              </div>
              <h3 className="text-[#1F2125]">Uploading</h3>
            </div>
            <p className="text-sm text-gray-600">
              80px thumbnail, progress bar (4px, green fill), 
              percentage text, cancel button.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F2ED] flex items-center justify-center">
                <span className="text-sm font-medium text-[#1F2125]">3</span>
              </div>
              <h3 className="text-[#1F2125]">Upload Complete</h3>
            </div>
            <p className="text-sm text-gray-600">
              Thumbnail with green checkmark overlay, "Uploaded successfully" 
              message, remove button.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F2ED] flex items-center justify-center">
                <span className="text-sm font-medium text-[#1F2125]">4</span>
              </div>
              <h3 className="text-[#1F2125]">Gallery View</h3>
            </div>
            <p className="text-sm text-gray-600">
              3-column grid, 120px thumbnails, hover overlay with remove button, 
              "+ Add More" card.
            </p>
          </div>
        </div>

        {/* Use Case 1: Brand Shoot Wizard */}
        <section className="bg-white rounded-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-6 h-6 text-[#1F2125]" />
            <h2 className="text-[#1F2125]">Brand Shoot Wizard</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Upload campaign photos (JPG, PNG) with gallery view for easy management
          </p>
          <FileUpload
            onUpload={handleUpload}
            acceptedTypes={['image/jpeg', 'image/png']}
            maxSize={10 * 1024 * 1024}
            multiple={true}
            mode="gallery"
            maxFiles={12}
          />
        </section>

        {/* Use Case 2: Designer Portfolio */}
        <section className="bg-white rounded-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-[#1F2125]" />
            <h2 className="text-[#1F2125]">Designer Portfolio</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Upload portfolio images (JPG, PNG, WEBP) with list view and detailed progress
          </p>
          <FileUpload
            onUpload={handleUpload}
            acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
            maxSize={10 * 1024 * 1024}
            multiple={true}
            mode="list"
            maxFiles={8}
          />
        </section>

        {/* Use Case 3: Contract Analyzer */}
        <section className="bg-white rounded-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-[#1F2125]" />
            <h2 className="text-[#1F2125]">Contract Analyzer</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Upload contracts and documents (PDF) for AI analysis
          </p>
          <FileUpload
            onUpload={handleUpload}
            acceptedTypes={['application/pdf']}
            maxSize={10 * 1024 * 1024}
            multiple={true}
            mode="list"
            maxFiles={5}
          />
        </section>

        {/* Use Case 4: Mixed Files Gallery */}
        <section className="bg-white rounded-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-[#1F2125]" />
            <h2 className="text-[#1F2125]">Event Assets Gallery</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Upload mixed media files (Images, PDFs) with gallery layout
          </p>
          <FileUpload
            onUpload={handleUpload}
            acceptedTypes={['image/jpeg', 'image/png', 'application/pdf']}
            maxSize={10 * 1024 * 1024}
            multiple={true}
            mode="gallery"
            maxFiles={15}
          />
        </section>

        {/* Simple Upload Button Examples */}
        <section className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-[#1F2125] mb-6">Simple Upload Buttons</h2>
          <p className="text-sm text-gray-600 mb-6">
            For inline use in forms and compact layouts
          </p>
          <div className="flex flex-wrap gap-4">
            <SimpleUploadButton
              onUpload={handleSingleUpload}
              label="Upload Photo"
              acceptedTypes={['image/*']}
            />
            <SimpleUploadButton
              onUpload={handleSingleUpload}
              label="Upload Contract"
              acceptedTypes={['application/pdf']}
            />
            <SimpleUploadButton
              onUpload={handleSingleUpload}
              label="Upload Document"
              acceptedTypes={['application/pdf', 'image/*']}
            />
          </div>
        </section>

        {/* File Type Icons Reference */}
        <section className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-[#1F2125] mb-6">File Type Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
              <FileText className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">PDF Documents</p>
                <p className="text-xs text-gray-500">Red document icon</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
              <ImageIcon className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Images</p>
                <p className="text-xs text-gray-500">Blue image icon</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
              <FileText className="w-8 h-8 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Generic Files</p>
                <p className="text-xs text-gray-500">Gray file icon</p>
              </div>
            </div>
          </div>
        </section>

        {/* Design Specs */}
        <section className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-[#1F2125] mb-6">Design Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Progress Bar</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Height: 4px</li>
                <li>• Background: #E5E7EB</li>
                <li>• Fill: #10B981 (green)</li>
                <li>• Border radius: 2px</li>
                <li>• Transition: width 0.3s ease</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Thumbnail Sizes</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Empty state icon: 64px</li>
                <li>• List view thumbnail: 80px</li>
                <li>• Gallery view thumbnail: 120px</li>
                <li>• File type icons: 24-48px</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Border Styles</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Default: 2px dashed #D1D5DB</li>
                <li>• Hover: 2px solid #111111</li>
                <li>• Dragging: 2px solid #111111</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Error States</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• File too large: Red alert icon</li>
                <li>• Wrong format: Type validation</li>
                <li>• Max files: Alert dialog</li>
                <li>• Upload failed: Error overlay</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
