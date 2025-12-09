import React from "react";
import { motion } from "motion/react";
import { WebsiteWizardState } from "../../WebsiteWizard";
import { Home, GripVertical, Plus, Edit2, Trash2, GitFork } from "lucide-react";

interface SitemapVisualizerProps {
  state: WebsiteWizardState;
}

export const SitemapVisualizer: React.FC<SitemapVisualizerProps> = ({ state }) => {
  const selectedPages = state.pages.filter(p => p.selected);

  // Group pages roughly by type to simulate structure
  const mainNav = selectedPages.filter(p => ["About", "Services", "Portfolio", "Shop", "Blog", "Contact"].includes(p.name));
  const subPages = selectedPages.filter(p => !["About", "Services", "Portfolio", "Shop", "Blog", "Contact"].includes(p.name));

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-2xl font-serif text-gray-900 mb-2">Sitemap Structure</h2>
          <p className="text-gray-500">Visual hierarchy of your website pages.</p>
        </div>
        <button className="text-sm font-medium text-black hover:underline flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Page
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center overflow-x-auto pb-12">
        {/* Home Node */}
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative w-48 bg-gray-900 text-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-black transition-colors"
          >
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </div>
            <span className="text-[10px] text-gray-400">4 sections</span>

            {/* Hover Actions */}
            <div className="absolute -right-12 top-0 bottom-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-black hover:border-black shadow-sm" title="Edit">
                <Edit2 className="w-3 h-3" />
              </button>
              <button className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-black hover:border-black shadow-sm" title="Add Child">
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
          {/* Vertical Connector */}
          <div className="absolute left-1/2 top-full h-8 w-px bg-gray-300 -translate-x-1/2" />
        </div>

        {/* Main Branch Connector */}
        <div className="relative w-full max-w-5xl mt-8">
           {/* Horizontal Bar */}
           <div className="absolute top-0 left-4 right-4 h-px bg-gray-300" />

           {/* Level 1 Nodes */}
           <div className="flex justify-between pt-8 px-4 gap-4">
             {mainNav.map((page, index) => (
               <div key={page.id} className="relative flex flex-col items-center">
                 {/* Vertical Connector from Horizontal Bar */}
                 <div className="absolute -top-8 left-1/2 w-px h-8 bg-gray-300 -translate-x-1/2" />
                 
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="group relative w-36 bg-white border border-gray-200 p-3 rounded-lg shadow-sm flex flex-col items-center justify-center gap-1 hover:border-black hover:shadow-md transition-all cursor-pointer"
                 >
                   <span className="text-sm font-medium text-gray-700 group-hover:text-black">{page.name}</span>
                   <span className="text-[10px] text-gray-400">{Math.floor(Math.random() * 3) + 2} sections</span>

                   {/* Hover Actions */}
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded-lg shadow-sm border border-gray-100">
                     <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-black" title="Edit">
                       <Edit2 className="w-3 h-3" />
                     </button>
                     <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-red-600" title="Delete">
                       <Trash2 className="w-3 h-3" />
                     </button>
                     <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-blue-600" title="Add Child">
                       <GitFork className="w-3 h-3 rotate-180" />
                     </button>
                   </div>
                 </motion.div>

                 {/* Sub Pages for Portfolio/Shop (Mock logic) */}
                 {(page.name === "Portfolio" || page.name === "Shop") && subPages.length > 0 && (
                   <div className="mt-8 flex flex-col items-center gap-4">
                     <div className="absolute -top-8 left-1/2 w-px h-8 bg-gray-300 -translate-x-1/2" />
                     {subPages.slice(0, 2).map((sub, i) => (
                       <div key={sub.id} className="relative">
                         <div className="absolute -top-4 left-1/2 w-px h-4 bg-gray-300 -translate-x-1/2" />
                         <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.5 + (i * 0.1) }}
                           className="relative w-32 bg-gray-50 border border-gray-200 p-2 rounded-lg text-center hover:bg-white hover:border-gray-300 transition-colors cursor-pointer group"
                         >
                           <span className="text-xs text-gray-600 font-medium group-hover:text-black">{sub.name}</span>
                         </motion.div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      </div>
      
      <div className="mt-auto pt-8 border-t border-gray-100 flex justify-center text-sm text-gray-400">
        <p>Drag pages to reorder structure</p>
      </div>
    </div>
  );
};
