import React, { useState } from "react";
import { WebsiteWizardState } from "../../WebsiteWizard";
import { FileText, Image as ImageIcon, Sparkles, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PageEditorProps {
  state: WebsiteWizardState;
  onUpdateContent: (pageId: string, content: any) => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({ state, onUpdateContent }) => {
  const selectedPages = state.pages.filter(p => p.selected);
  const [activePageId, setActivePageId] = useState(selectedPages[0]?.id || "");
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const activePage = selectedPages.find(p => p.id === activePageId);

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
      {/* Sidebar: Page List */}
      <div className="w-full lg:w-64 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">Pages</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {selectedPages.map(page => (
            <button
              key={page.id}
              onClick={() => setActivePageId(page.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                activePageId === page.id 
                  ? "bg-black text-white" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{page.name}</span>
              {activePageId === page.id && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col">
        {activePage ? (
          <>
            {/* Editor Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif text-gray-900">{activePage.name}</h2>
                <p className="text-gray-500 text-sm">Editing page content</p>
              </div>
              <div className="flex items-center gap-2">
                 <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm">
                   <Sparkles className="w-4 h-4" />
                   Generate Copy
                 </button>
              </div>
            </div>

            {/* Editor Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Hero Section */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => toggleSection('hero')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs">1</span>
                    Hero Section
                  </div>
                  {collapsedSections['hero'] ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronUp className="w-4 h-4 text-gray-500" />}
                </button>
                
                <AnimatePresence>
                  {!collapsedSections['hero'] && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-4 bg-white">
                        <div className="relative">
                          <label className="flex items-center justify-between text-xs font-medium text-gray-500 mb-1">
                            Headline
                            <Sparkles className="w-3 h-3 text-purple-400" />
                          </label>
                          <input 
                            type="text" 
                            placeholder={`Welcome to [Brand Name]`}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none pr-8"
                          />
                        </div>
                        <div className="relative">
                          <label className="flex items-center justify-between text-xs font-medium text-gray-500 mb-1">
                            Subheadline
                            <Sparkles className="w-3 h-3 text-purple-400" />
                          </label>
                          <textarea 
                            rows={2}
                            placeholder="Enter a brief description..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Hero Image</label>
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black transition-colors cursor-pointer bg-gray-50/50">
                            <ImageIcon className="w-8 h-8 mb-2" />
                            <span className="text-xs">Click to upload image</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Main Content Section */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => toggleSection('main')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs">2</span>
                    Main Content
                  </div>
                  {collapsedSections['main'] ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronUp className="w-4 h-4 text-gray-500" />}
                </button>

                <AnimatePresence>
                  {!collapsedSections['main'] && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-4 bg-white">
                        <div className="relative">
                          <label className="flex items-center justify-between text-xs font-medium text-gray-500 mb-1">
                            Body Text
                            <Sparkles className="w-3 h-3 text-purple-400" />
                          </label>
                          <textarea 
                            rows={6}
                            placeholder="Start writing or use AI to generate..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a page to edit content
          </div>
        )}
      </div>
    </div>
  );
};
