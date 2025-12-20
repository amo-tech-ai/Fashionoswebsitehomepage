import { useState } from "react";
import { motion } from "motion/react";
import { BrandData } from "../DesignerWizard";
import { Sparkles, Globe, Instagram, PenTool, Image as ImageIcon, X } from "lucide-react";
import { FileUpload } from "../../shared/UploadStates";
import { ImageLightbox, type LightboxImage } from "../../shared/ImageLightbox";

interface InputStepProps {
  onNext: (data: BrandData & { portfolioFiles?: LightboxImage[] }) => void;
}

export function InputStep({ onNext }: InputStepProps) {
  const [formData, setFormData] = useState<BrandData>({
    name: "Andrew Majtenyi",
    website: "https://www.andrewmajtenyi.com/",
    instagram: "@andrewmajtenyi"
  });

  const [portfolioFiles, setPortfolioFiles] = useState<LightboxImage[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ ...formData, portfolioFiles });
  };

  const handleUploadComplete = (results: Array<{ file: File; url: string | null; path: string }>) => {
    // Add uploaded files to portfolio preview
    const newFiles: LightboxImage[] = results
      .filter(r => r.url)
      .map(r => ({
        url: r.url!,
        name: r.file.name,
        size: r.file.size,
        type: r.file.type,
        alt: `Portfolio image: ${r.file.name}`,
      }));
    
    setPortfolioFiles(prev => [...prev, ...newFiles]);
  };

  const removePortfolioFile = (index: number) => {
    setPortfolioFiles(prev => prev.filter((_, i) => i !== index));
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full"
    >
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] w-full border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3">Create Your Designer Profile</h1>
          <p className="text-gray-500 font-light">Share your brand presence and portfolio. We'll analyze everything.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Brand Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Designer/Brand Name</label>
            <div className="relative group">
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all group-hover:bg-white"
                placeholder="e.g. Andrew Majtenyi"
                required
              />
              <PenTool className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Website URL */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Website URL</label>
            <div className="relative group">
              <input 
                type="url" 
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all group-hover:bg-white"
                placeholder="https://www.yourwebsite.com"
                required
              />
              <Globe className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Instagram Handle */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Instagram Handle</label>
            <div className="relative group">
              <input 
                type="text" 
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all group-hover:bg-white"
                placeholder="@yourhandle"
                required
              />
              <Instagram className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Portfolio Upload Section */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-gray-400" />
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Portfolio Images <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 ml-6">
              Upload 3-10 images that showcase your design aesthetic, collections, or past work
            </p>

            <FileUpload
              onUpload={async (files: File[]) => {
                // This is called when files are selected but not yet uploaded
                // The actual upload happens in the component
              }}
              onUploadComplete={handleUploadComplete}
              bucket="designer-portfolios"
              folder={formData.name.toLowerCase().replace(/\s+/g, '-')}
              acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
              maxSize={10 * 1024 * 1024} // 10MB
              multiple={true}
              maxFiles={10}
              mode="gallery"
              autoCompress={true}
              className="mt-3"
            />

            {/* Portfolio Gallery Preview */}
            {portfolioFiles.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-gray-700">
                    {portfolioFiles.length} {portfolioFiles.length === 1 ? 'image' : 'images'} uploaded
                  </p>
                  <button
                    type="button"
                    onClick={() => setPortfolioFiles([])}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear all
                  </button>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {portfolioFiles.map((image, index) => (
                    <div key={index} className="relative group aspect-square">
                      <button
                        type="button"
                        onClick={() => openLightbox(index)}
                        className="w-full h-full rounded-lg overflow-hidden cursor-zoom-in"
                      >
                        <img
                          src={image.url}
                          alt={image.alt || image.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </button>
                      
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePortfolioFile(index);
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-black text-white h-14 rounded-full font-medium text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Analyze My Brand</span>
              <Sparkles className="w-5 h-5" />
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-purple-600 font-medium bg-purple-50 py-1.5 px-3 rounded-full w-fit mx-auto">
              <Sparkles className="w-3 h-3" />
              <span>Free AI brand audit + portfolio analysis included</span>
            </div>
          </div>
        </form>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        images={portfolioFiles}
        initialIndex={selectedImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onDelete={(image, index) => {
          removePortfolioFile(index);
          setIsLightboxOpen(false);
        }}
        showDownload={true}
        showDelete={true}
        showMetadata={true}
      />
    </motion.div>
  );
}
