import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  Share,
  RefreshCw,
  Sparkles,
  Lightbulb,
  AlertCircle,
  ImageIcon,
  ChevronRight,
  LayoutDashboard,
  CheckSquare,
  Network,
  Edit,
  Images,
  PackageCheck,
  Zap
} from "lucide-react";
import { WebsiteWizardState } from "../../WebsiteWizard";

// Import Sub-Components
import { BriefOverview } from "../website-pm/BriefOverview";
import { ContentChecklist } from "../website-pm/ContentChecklist";
import { SitemapVisualizer } from "../website-pm/SitemapVisualizer";
import { PageEditor } from "../website-pm/PageEditor";
import { MediaLibrary } from "../website-pm/MediaLibrary";
import { DeliverablesHub } from "../website-pm/DeliverablesHub";

interface WebsiteBriefDashboardProps {
  state: WebsiteWizardState;
  setState: React.Dispatch<React.SetStateAction<WebsiteWizardState>>;
  onDownload: () => void;
  onShare: () => void;
  onRegenerate: () => void;
}

type DashboardTab = "overview" | "checklist" | "sitemap" | "editor" | "media" | "deliverables";

export const WebsiteBriefDashboard: React.FC<WebsiteBriefDashboardProps> = ({
  state,
  setState,
  onDownload,
  onShare,
  onRegenerate
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "checklist", label: "Checklist", icon: CheckSquare },
    { id: "sitemap", label: "Sitemap", icon: Network },
    { id: "editor", label: "Page Editor", icon: Edit },
    { id: "media", label: "Media Library", icon: Images },
    { id: "deliverables", label: "Deliverables", icon: PackageCheck }
  ];

  // Calculate Design Readiness
  const calculateReadiness = () => {
    let score = 0;
    const maxScore = 5; // Branding, Pages, Content, Features, Summary

    if (state.visualStyle && state.brandWords) score += 1;
    if (state.pages.some(p => p.selected)) score += 1;
    if (state.textContent.length > 0 || state.contentFiles.length > 0) score += 1;
    if (state.websiteType) score += 1;
    // Bonus for logos
    if (state.logo) score += 0.5;
    // Bonus for products if ecommerce
    if (state.websiteType === 'ecommerce' && state.numProducts > 0) score += 0.5;

    return Math.min(100, Math.round((score / maxScore) * 100));
  };

  const readiness = calculateReadiness();
  const missingItemsCount = (state.logo ? 0 : 1) + (state.textContent.length === 0 ? 1 : 0);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <BriefOverview state={state} setState={setState} onEditSection={() => {}} readiness={readiness} />;
      case "checklist":
        return <ContentChecklist state={state} onEditPage={(id) => setActiveTab("editor")} />;
      case "sitemap":
        return <SitemapVisualizer state={state} />;
      case "editor":
        return <PageEditor state={state} onUpdateContent={() => {}} />;
      case "media":
        return <MediaLibrary state={state} onUpload={() => {}} />;
      case "deliverables":
        return <DeliverablesHub state={state} />;
      default:
        return <BriefOverview state={state} setState={setState} onEditSection={() => {}} readiness={readiness} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-serif text-gray-900">Website Dashboard</h1>
             <p className="text-gray-500 text-sm">Manage your project from brief to handoff.</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Design Readiness Badge */}
            <div className="hidden md:flex flex-col items-end mr-4">
               <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Design Readiness</span>
               <span className={`text-lg font-bold ${readiness > 80 ? 'text-green-600' : 'text-black'}`}>{readiness}%</span>
            </div>

            <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as DashboardTab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-black text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Next Best Action Bar */}
        {missingItemsCount > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black text-white rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3 md:mb-0">
               <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                 <Zap className="w-4 h-4 text-yellow-400" />
               </div>
               <p className="font-medium">You have <span className="text-yellow-400 font-bold">{missingItemsCount} missing items</span> before design generation.</p>
            </div>
            <button 
              onClick={() => setActiveTab("checklist")}
              className="px-4 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              Fix All Issues <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN - MAIN CONTENT */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderActiveTab()}
            </motion.div>
          </div>

          {/* RIGHT COLUMN - AI SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1A1A1A] text-white rounded-3xl p-6 sticky top-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">AI Insights</h2>
                  <p className="text-white/50 text-xs">Context: {tabs.find(t => t.id === activeTab)?.label}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-white/40 uppercase mb-3">Recommendations</h3>
                  <div className="space-y-3">
                    {/* Dynamic Recommendations based on active tab */}
                    {activeTab === 'sitemap' ? (
                      <>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-sm">
                          <div className="flex items-start gap-2">
                            <LayoutDashboard className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                            <span className="text-white/90">Your structure is shallow. Consider grouping pages under "Services".</span>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-sm">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                            <span className="text-white/90">Most ecommerce sites include a ‘Contact’ page and ‘FAQ’ page.</span>
                          </div>
                        </div>
                      </>
                    ) : activeTab === 'media' ? (
                      <>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-sm">
                          <div className="flex items-start gap-2">
                            <ImageIcon className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                            <span className="text-white/90">High-res images (2MB+) recommended for hero sections.</span>
                          </div>
                        </div>
                        {!state.logo && (
                           <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-sm">
                             <div className="flex items-start gap-2">
                               <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                               <span className="text-white/90">Your brand section has no logo yet.</span>
                             </div>
                           </div>
                        )}
                      </>
                    ) : activeTab === 'checklist' ? (
                      <>
                        {!state.textContent && (
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-sm">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                              <span className="text-white/90">Home page is missing hero text.</span>
                            </div>
                          </div>
                        )}
                        {!state.logo && (
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-sm">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                              <span className="text-white/90">No logo uploaded yet.</span>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-sm">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                          <span className="text-white/90">Add a <span className="font-semibold text-white">Blog</span> page to improve SEO and organic traffic.</span>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'overview' && !state.logo && (
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-sm">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span className="text-white/90">Upload a brand logo for consistent branding.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-white/40 uppercase mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-sm text-left">
                      <span>Generate Homepage Copy</span>
                      <ChevronRight className="w-4 h-4 text-white/40" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-sm text-left">
                      <span>Improve Brand Story</span>
                      <ChevronRight className="w-4 h-4 text-white/40" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-sm text-left">
                      <span>Suggest Page Structure</span>
                      <ChevronRight className="w-4 h-4 text-white/40" />
                    </button>
                  </div>
                </div>

              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-white/10">
                   <h4 className="font-medium text-sm mb-1">Ready for design?</h4>
                   <p className="text-xs text-white/70 mb-3">Your brief is comprehensive enough for our AI to start generating layouts.</p>
                   <button className="w-full py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
                     Start Design Generation
                   </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
