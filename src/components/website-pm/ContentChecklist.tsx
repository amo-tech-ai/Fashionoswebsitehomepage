import React from "react";
import { motion } from "motion/react";
import { 
  CheckCircle, 
  Circle, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Image as ImageIcon,
  Layout,
  List
} from "lucide-react";
import { WebsiteWizardState, PageConfig } from "../../WebsiteWizard";

interface ContentChecklistProps {
  state: WebsiteWizardState;
  onEditPage: (pageId: string) => void;
}

export const ContentChecklist: React.FC<ContentChecklistProps> = ({ state, onEditPage }) => {
  const selectedPages = state.pages.filter(p => p.selected);
  const totalPages = selectedPages.length;
  const completedPages = selectedPages.filter(p => p.hasContent).length;
  const progress = totalPages > 0 ? (completedPages / totalPages) * 100 : 0;
  const missingCount = totalPages - completedPages;

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Content Checklist */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-serif text-gray-900 mb-2">Content Checklist</h2>
                <p className="text-gray-500">Track content completion for each page.</p>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{completedPages} of {totalPages} Complete</div>
                  <div className="text-xs text-gray-500">{Math.round(progress)}% Ready</div>
                </div>
                <div className="relative w-12 h-12">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle cx="24" cy="24" r="20" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                     <circle cx="24" cy="24" r="20" stroke="black" strokeWidth="4" fill="none" strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * progress) / 100} strokeLinecap="round" />
                   </svg>
                </div>
              </div>
            </div>

            {/* Page List */}
            <div className="space-y-4">
              {selectedPages.map((page, index) => (
                <motion.div 
                  key={page.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white"
                >
                  {/* Status Icon */}
                  <div className="mt-1 md:mt-0">
                    {page.hasContent ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300 group-hover:text-black transition-colors" />
                    )}
                  </div>

                  {/* Page Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900">{page.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        page.hasContent 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {page.hasContent ? "Complete" : "Content Pending"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Layout className="w-3 h-3" />
                        {page.needsAI ? "AI Drafted" : "Manual"}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {page.contentNeeded?.length || 0} Sections
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <button 
                    onClick={() => onEditPage(page.id)}
                    className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {page.hasContent ? "Edit Content" : "Add Content"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Missing Assets Dark Card */}
          {missingCount > 0 && (
            <div className="bg-black text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Missing Assets</h3>
                  <p className="text-sm text-gray-400">You have {missingCount} pages requiring text or images before design generation.</p>
                </div>
              </div>
              <button 
                onClick={() => onEditPage(selectedPages.find(p => !p.hasContent)?.id || "")}
                className="px-6 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors"
              >
                View Missing Items
              </button>
            </div>
          )}
        </div>
        
      </div>

    </div>
  );
};
