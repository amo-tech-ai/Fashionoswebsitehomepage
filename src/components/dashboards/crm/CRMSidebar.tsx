import React from "react";
import { Sparkles, AlertCircle, Activity, Phone, Mail, FileText, Plus } from "lucide-react";
import { useAgentContext } from "../../../lib/ai/AgentContext";

export function CRMSidebar() {
  const { allInsights } = useAgentContext();
  const sponsorInsights = allInsights.filter(i => i.agentId === 'sponsor-intelligence');

  const activities = [
    { text: "Call with Gucci completed", time: "2:14 PM", icon: Phone, color: "bg-[#DCFCE7] text-[#166534]" },
    { text: "Proposal sent to Prada", time: "Yesterday", icon: Mail, color: "bg-blue-50 text-blue-700" },
    { text: "Marie from Chanel viewed pitch deck", time: "Yesterday", icon: FileText, color: "bg-[#F3E8FF] text-[#6B21A8]" },
    { text: "New sponsor lead added: Fendi", time: "2 days ago", icon: Plus, color: "bg-gray-100 text-gray-600" },
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights Card */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#333333] rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Sparkles className="w-24 h-24" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-purple-200" />
            </div>
            <h3 className="font-serif font-bold text-lg">AI Insights</h3>
          </div>

          <div className="space-y-4 mb-8">
            {sponsorInsights.length > 0 ? (
              sponsorInsights.slice(0, 3).map((insight, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 transition-transform hover:scale-[1.02]">
                  {insight.requires_action && (
                     <div className="flex items-center gap-2 mb-1 text-[#FEF3C7] text-[10px] font-bold uppercase tracking-wider">
                       <AlertCircle className="w-3 h-3" />
                       Action Required
                     </div>
                  )}
                  <p className="text-sm text-gray-200 leading-relaxed font-medium">
                    {insight.requires_action ? (
                        <span>{insight['blocking_item'] || insight['risk_description']}</span>
                    ) : (
                        <span className="text-white font-bold">{insight['sponsor_name'] || 'Sponsor'} trend updated.</span>
                    )}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 transition-transform hover:scale-[1.02]">
                  <p className="text-sm text-gray-200 leading-relaxed font-medium">
                    <span className="text-white font-bold">Dior</span> has a <span className="text-[#DCFCE7] font-bold">92%</span> probability of conversion based on recent engagement.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-2 mb-1 text-[#FEF3C7] text-[10px] font-bold uppercase tracking-wider">
                    <AlertCircle className="w-3 h-3" />
                    Risk Alert
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed font-medium">
                    <span className="text-white font-bold">Adidas</span> shows risk: no interaction in 14 days.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-3">
            <button className="w-full py-2.5 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm">
              Generate Proposal Suggestions
            </button>
            <button className="w-full py-2.5 bg-transparent border border-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
              View Sponsor Fit Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-serif font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-gray-500" />
          Recent Activity
        </h3>
        <div className="space-y-6 relative pl-2">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-100" />
          
          {activities.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="relative flex gap-3 group">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 relative z-10 border-2 border-white shadow-sm ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="pt-1">
                  <div className="text-sm text-[#1A1A1A] font-medium group-hover:text-black transition-colors">
                    {item.text}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 font-medium">{item.time}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="w-full mt-4 py-2 text-xs text-gray-500 hover:text-black font-bold border-t border-gray-50 pt-3 uppercase tracking-wide">
          View All Activity
        </button>
      </div>
    </div>
  );
}
