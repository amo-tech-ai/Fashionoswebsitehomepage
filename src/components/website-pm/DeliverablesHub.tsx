import React from "react";
import { WebsiteWizardState } from "../../WebsiteWizard";
import { FileCheck, Download, ExternalLink, ShieldCheck, Code, Box, ArrowRight, Lock } from "lucide-react";

interface DeliverablesHubProps {
  state: WebsiteWizardState;
}

export const DeliverablesHub: React.FC<DeliverablesHubProps> = ({ state }) => {
  const deliverables = [
    {
      id: "brief",
      title: "Website Brief PDF",
      description: "Comprehensive summary of project requirements and goals.",
      icon: FileCheck,
      status: "Ready",
      cta: "Download"
    },
    {
      id: "sitemap",
      title: "Sitemap Structure",
      description: "Visual diagram of site hierarchy and navigation.",
      icon: Box,
      status: "Ready",
      cta: "Download"
    },
    {
      id: "branding",
      title: "Brand Guidelines",
      description: "Colors, typography, and logo usage rules.",
      icon: ShieldCheck,
      status: state.visualStyle ? "Coming Soon" : "Disabled",
      cta: "Coming Soon"
    },
    {
      id: "content",
      title: "Content Draft",
      description: "Compiled text content for all pages.",
      icon: Code,
      status: state.textContent.length > 0 ? "Ready" : "Disabled",
      cta: "Download Draft"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-serif text-gray-900 mb-2">Project Deliverables</h2>
        <p className="text-gray-500">Download assets and documentation generated from your brief.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deliverables.map((item) => {
          const Icon = item.icon;
          const isReady = item.status === "Ready";
          const isComingSoon = item.status === "Coming Soon";
          
          return (
            <div key={item.id} className={`p-6 rounded-2xl border ${isReady ? 'bg-white border-gray-100 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-900" />
                </div>
                {isReady ? (
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-md">
                    Ready
                  </span>
                ) : (
                  <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-md">
                    {item.status}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-6 min-h-[40px]">{item.description}</p>
              
              <div className="flex items-center gap-3">
                <button 
                  disabled={!isReady}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 transition-colors flex items-center justify-center gap-2"
                >
                  {!isReady && !isComingSoon && <Lock className="w-3 h-3" />}
                  {item.cta}
                  {isReady && <ExternalLink className="w-3 h-3" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Handoff Section */}
      <div className="bg-gray-900 text-white rounded-2xl p-8 mt-12 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-serif mb-2">Ready for Design Handoff?</h3>
            <p className="text-gray-400 max-w-md">Once you've reviewed all deliverables, generate a shareable link for your design team.</p>
          </div>
          <button className="whitespace-nowrap px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
            Start Design Phase
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
