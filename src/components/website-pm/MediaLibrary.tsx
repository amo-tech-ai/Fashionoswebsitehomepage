import React, { useState } from "react";
import { WebsiteWizardState } from "../../WebsiteWizard";
import { Image as ImageIcon, Upload, Trash2, Download, Eye, Filter } from "lucide-react";

interface MediaLibraryProps {
  state: WebsiteWizardState;
  onUpload: (files: File[]) => void;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ state, onUpload }) => {
  const [activeTab, setActiveTab] = useState<"brand" | "product" | "inspiration">("brand");
  const [filter, setFilter] = useState<"all" | "used" | "unused">("all");

  const getFiles = () => {
    switch(activeTab) {
      case "brand": return [state.logo, ...state.contentFiles].filter(Boolean);
      case "product": return state.productImages;
      case "inspiration": return [...state.inspirationImages, ...state.moodboardImages];
      default: return [];
    }
  };

  const files = getFiles();

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[600px]">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-serif text-gray-900 mb-2">Media Library</h2>
          <p className="text-gray-500">Manage all your project assets in one place.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Files
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 mb-8 pb-1">
        {/* Tabs */}
        <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto">
          {[
            { id: "brand", label: "Brand Assets" },
            { id: "product", label: "Products" },
            { id: "inspiration", label: "Inspiration" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? "border-black text-black" 
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
           <Filter className="w-4 h-4" />
           <select 
             value={filter}
             onChange={(e) => setFilter(e.target.value as any)}
             className="bg-transparent border-none focus:ring-0 cursor-pointer hover:text-black"
           >
             <option value="all">All Files</option>
             <option value="used">Used in Design</option>
             <option value="unused">Unused</option>
           </select>
        </div>
      </div>

      {/* Grid */}
      {files.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file, i) => (
            <div key={i} className="group relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
              {/* Thumbnail Placeholder */}
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                 <ImageIcon className="w-8 h-8" />
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-sm transition-colors" title="View">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-sm transition-colors" title="Download">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/20 hover:bg-red-500/80 text-white rounded-lg backdrop-blur-sm transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                 <p className="text-xs text-white truncate px-1">{(file as any).name || `Image ${i+1}`}</p>
              </div>
              
              {/* Usage Badge (Mock) */}
              {i % 2 === 0 && (
                <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/50 backdrop-blur-md rounded text-[10px] text-white font-medium">
                  Used
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
           <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
             <Upload className="w-6 h-6 text-gray-400" />
           </div>
           <h3 className="text-gray-900 font-medium mb-1">No files yet</h3>
           <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">Upload images for your {activeTab} section to see them here.</p>
           <button className="px-4 py-2 bg-white border border-gray-200 text-black rounded-lg text-sm font-medium hover:border-black transition-colors">
             Select Files
           </button>
        </div>
      )}
    </div>
  );
};
