import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Edit2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Globe,
  Palette,
  Layout,
  FileText,
  ShoppingBag,
  Zap,
  Calendar,
  X,
  Save,
  AlertTriangle,
  Check,
  Plus
} from "lucide-react";
import { WebsiteWizardState, WebsiteType } from "../../WebsiteWizard";

interface BriefOverviewProps {
  state: WebsiteWizardState;
  setState: React.Dispatch<React.SetStateAction<WebsiteWizardState>>;
  onEditSection: (section: string) => void;
  readiness?: number;
}

type EditSection = "type" | "branding" | "pages" | "content" | "store" | "features" | "timeline" | null;

export const BriefOverview: React.FC<BriefOverviewProps> = ({ state, setState, readiness = 0 }) => {
  const [editingSection, setEditingSection] = useState<EditSection>(null);

  // Calculate progress
  const steps = [
    { id: "branding", label: "Branding", completed: !!state.visualStyle && !!state.brandWords },
    { id: "pages", label: "Pages", completed: state.pages.some(p => p.selected) },
    { id: "content", label: "Content", completed: state.textContent.length > 0 || state.contentFiles.length > 0 },
    { id: "store", label: "Store", completed: !state.websiteType || state.websiteType !== "ecommerce" || state.numProducts > 0 },
    { id: "features", label: "Features", completed: true },
    { id: "summary", label: "Summary", completed: true }
  ];
  
  const completedSteps = steps.filter(s => s.completed).length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  // Identify missing content for Action Items
  const actionItems = [];
  if (!state.logo) actionItems.push({ label: "Missing brand logo", action: "Upload Logo", section: "branding" });
  if (state.textContent.length < 50) actionItems.push({ label: "Missing Home page hero copy", action: "Add Hero Text", section: "content" });
  if (state.websiteType === "ecommerce" && state.productImages.length === 0) actionItems.push({ label: "No product photos uploaded", action: "Upload Product Images", section: "store" });
  if (state.pages.some(p => p.selected && !p.hasContent && !p.needsAI)) actionItems.push({ label: "Missing content for selected pages", action: "Add Page Content", section: "pages" });

  const brandAssetsCount = (state.logo ? 1 : 0) + (state.brandGuidelines ? 1 : 0) + state.inspirationImages.length + state.moodboardImages.length;

  const renderEditModal = () => {
    if (!editingSection) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h3 className="text-xl font-serif font-medium capitalize">Edit {editingSection}</h3>
            <button onClick={() => setEditingSection(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {editingSection === "branding" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Keywords</label>
                  <input 
                    type="text" 
                    value={state.brandWords}
                    onChange={(e) => setState(prev => ({ ...prev, brandWords: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emotions / Vibe</label>
                  <textarea 
                    value={state.emotions}
                    onChange={(e) => setState(prev => ({ ...prev, emotions: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none h-32"
                  />
                </div>
              </div>
            )}

            {editingSection === "timeline" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <select 
                    value={state.budget} 
                    onChange={(e) => setState(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none bg-white"
                  >
                    <option value={2500}>$2k - $5k</option>
                    <option value={5000}>$5k - $10k</option>
                    <option value={10000}>$10k - $20k</option>
                    <option value={20000}>$20k+</option>
                  </select>
                </div>
              </div>
            )}
            
            {editingSection !== "branding" && editingSection !== "timeline" && (
              <div className="text-center py-8 text-gray-500">
                <p>To edit {editingSection}, please navigate to the specific checklist or editor tabs for the full experience.</p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
            <button 
              onClick={() => setEditingSection(null)}
              className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => setEditingSection(null)}
              className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {renderEditModal()}
      </AnimatePresence>

      {/* Progress Tracker */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Brief Completion</h3>
          <span className="text-sm text-gray-500">{completedSteps} of {totalSteps} sections complete</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-black rounded-full"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-2 text-sm">
              {step.completed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
              <span className={step.completed ? "text-gray-900" : "text-gray-500"}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      {actionItems.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            Action Items
          </h3>
          <div className="space-y-3">
            {actionItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-black transition-colors bg-gray-50/50">
                <span className="text-sm text-gray-600">{item.label}</span>
                <button 
                  onClick={() => setEditingSection(item.section as EditSection)}
                  className="text-xs font-bold text-black flex items-center gap-1 hover:underline"
                >
                  {item.action} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Website Type */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <Globe className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-base">Website Type</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Complete</span>
              </div>
            </div>
            <button 
              onClick={() => setEditingSection("type")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1 pl-[52px]">
            <p className="text-sm text-black font-medium capitalize">{state.websiteType || "Not selected"}</p>
            <p className="text-xs text-gray-500">Goals: {state.goals.length > 0 ? state.goals.slice(0, 2).join(", ") : "None"}</p>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <Palette className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-base">Branding</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${state.logo ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>
                  {state.logo ? 'Complete' : 'Partial'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setEditingSection("branding")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1 pl-[52px]">
            <p className="text-sm text-black font-medium capitalize">{state.visualStyle || "Default"} Style</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{state.brandWords ? "Keywords set" : "No keywords"}</span>
              <span>•</span>
              <span>{state.logo ? "Logo uploaded" : "No logo"}</span>
            </div>
          </div>
        </div>

        {/* Pages */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <Layout className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-base">Pages</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                  {state.pages.filter(p => p.selected).length} Pages
                </span>
              </div>
            </div>
            <button 
              onClick={() => setEditingSection("pages")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1 pl-[52px]">
             <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-2">
               <div className="bg-black h-full rounded-full" style={{ width: '100%' }}></div>
             </div>
             <p className="text-xs text-gray-500">
               {state.pages.filter(p => p.selected).slice(0, 3).map(p => p.name).join(", ")}
               {state.pages.filter(p => p.selected).length > 3 && ` +${state.pages.filter(p => p.selected).length - 3}`}
             </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-base">Content</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${state.textContent ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>
                  {state.textContent ? 'Uploaded' : 'Pending'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setEditingSection("content")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1 pl-[52px]">
            <p className="text-sm text-black font-medium">{brandAssetsCount} Assets</p>
            <p className="text-xs text-gray-500">
              {state.contentFiles.length > 0 ? `${state.contentFiles.length} files attached` : "No files attached"}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-base">Features</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Complete</span>
              </div>
            </div>
            <button 
              onClick={() => setEditingSection("features")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1 pl-[52px]">
             <p className="text-sm text-black font-medium">{state.features.length} Integrations</p>
             <p className="text-xs text-gray-500 line-clamp-1">{state.features.join(", ")}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-base">Timeline</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Set</span>
              </div>
            </div>
            <button 
              onClick={() => setEditingSection("timeline")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1 pl-[52px]">
             <p className="text-sm text-black font-medium capitalize">{state.timeline}</p>
             <p className="text-xs text-gray-500">{state.budgetTier ? `~ $${state.budget.toLocaleString()}` : "Budget pending"}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
