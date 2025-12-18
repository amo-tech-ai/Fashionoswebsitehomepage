import React, { useState } from "react";
import { 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles, 
  Activity,
  Layers,
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import { useBrandShoot } from '../../context/BrandShootContext';

// --- Components ---

function ImpactGauge({ label, impact, description }: { label: string, impact: 'High' | 'Medium' | 'Low', description: string }) {
  const color = impact === 'High' ? 'bg-indigo-600' : impact === 'Medium' ? 'bg-amber-500' : 'bg-gray-400';
  const width = impact === 'High' ? 'w-3/4' : impact === 'Medium' ? 'w-1/2' : 'w-1/4';
  
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif font-medium text-gray-900">{label}</h3>
        <Badge variant="outline" className={`${
          impact === 'High' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 
          impact === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
          'bg-gray-50 text-gray-600'
        }`}>
          {impact} Impact
        </Badge>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: impact === 'High' ? '75%' : impact === 'Medium' ? '50%' : '25%' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`} 
        />
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

function InsightCard({ title, type }: { title: string, type: 'positive' | 'neutral' }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-gray-100 hover:bg-white transition-colors">
      <div className={`p-2 rounded-lg ${type === 'positive' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
        <Sparkles className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-1">AI detected pattern</p>
      </div>
    </div>
  );
}

// --- Main Component ---

export function ROIAnalytics({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { campaignPlan } = useBrandShoot();
  const [activeTab, setActiveTab] = useState('overview');

  // Derive insights from campaign plan if available
  const conversionImpact = campaignPlan?.roi?.conversion === 'high' ? 'High' : campaignPlan?.roi?.conversion === 'medium' ? 'Medium' : 'Low';
  const awarenessImpact = campaignPlan?.roi?.awareness === 'high' ? 'High' : campaignPlan?.roi?.awareness === 'medium' ? 'Medium' : 'Low';

  return (
    <div className="min-h-screen bg-[#FDFBF9] pb-20 font-sans">
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
             <div>
               <h1 className="text-3xl font-serif font-medium text-gray-900">Performance Pulse</h1>
               <p className="text-sm text-gray-500 mt-1">Directional analysis of campaign impact.</p>
             </div>
             <div className="flex gap-2">
               <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                 Export Report
               </button>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        
        {/* Top Section: Brand Health */}
        <div className="space-y-4">
          <h2 className="text-lg font-serif text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-400" />
            Brand Health Signals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImpactGauge 
              label="Brand Awareness" 
              impact={awarenessImpact} 
              description={campaignPlan ? `Projected impact for ${campaignPlan.strategy.title}` : "Significant uplift in mentions across key markets."} 
            />
            <ImpactGauge 
              label="Conversion Efficiency" 
              impact={conversionImpact} 
              description="Steady performance, optimizing for lower CAC." 
            />
            <ImpactGauge 
              label="Asset Retention" 
              impact="High" 
              description="Visuals are performing 2x above category average." 
            />
          </div>
        </div>

        {/* Middle Section: Channel Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           
           {/* Visual Map (Abstract) */}
           <div className="space-y-4">
              <h2 className="text-lg font-serif text-gray-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-gray-400" />
                Channel Impact Map
              </h2>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm aspect-video flex items-center justify-center relative overflow-hidden">
                 {/* Abstract "Heatmap" using circles */}
                 <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
                 <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                 <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
                 
                 <div className="relative z-10 grid grid-cols-2 gap-8 text-center">
                    <div>
                      <div className="text-2xl font-serif text-indigo-900">Instagram</div>
                      <Badge variant="secondary" className="mt-2 bg-indigo-50 text-indigo-700">Dominant</Badge>
                    </div>
                    <div>
                      <div className="text-xl font-serif text-gray-500">TikTok</div>
                      <Badge variant="outline" className="mt-2">Growing</Badge>
                    </div>
                    <div>
                      <div className="text-xl font-serif text-gray-500">Web</div>
                      <Badge variant="outline" className="mt-2">Stable</Badge>
                    </div>
                    <div>
                      <div className="text-xl font-serif text-gray-500">Email</div>
                      <Badge variant="outline" className="mt-2">Stable</Badge>
                    </div>
                 </div>
              </div>
           </div>

           {/* AI Insights List */}
           <div className="space-y-4">
              <h2 className="text-lg font-serif text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-gray-400" />
                Strategic Insights
              </h2>
              <div className="space-y-4">
                <InsightCard 
                  title="Video content is driving 60% of engagement." 
                  type="positive" 
                />
                <InsightCard 
                  title="Carousel posts show higher retention than single images." 
                  type="positive" 
                />
                <InsightCard 
                  title="Evening posting times (6pm-9pm) yield highest ROI." 
                  type="neutral" 
                />
              </div>
              
              <div className="bg-indigo-900 text-white p-6 rounded-xl mt-6 shadow-lg shadow-indigo-900/10">
                <h3 className="font-serif text-lg mb-2">Optimization Opportunity</h3>
                <p className="text-indigo-200 text-sm mb-4">
                  We detected 3 assets that could perform better with minor adjustments.
                </p>
                <button 
                  onClick={() => onNavigate('ai-optimization')}
                  className="text-sm font-medium bg-white text-indigo-900 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Go to AI Optimization Center
                </button>
              </div>
           </div>

        </div>

        {/* Bottom Section: Qualitative ROI Table */}
        <div className="space-y-4">
           <h2 className="text-lg font-serif text-gray-900">Campaign Performance Matrix</h2>
           <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
             <table className="w-full text-left text-sm">
               <thead>
                 <tr className="bg-gray-50/50 border-b border-gray-100">
                   <th className="px-6 py-4 font-medium text-gray-500">Campaign</th>
                   <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                   <th className="px-6 py-4 font-medium text-gray-500">Reach Impact</th>
                   <th className="px-6 py-4 font-medium text-gray-500">Brand Lift</th>
                   <th className="px-6 py-4 font-medium text-gray-500 text-right">Trend</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 <tr className="group hover:bg-gray-50/50 transition-colors">
                   <td className="px-6 py-4 font-bold text-gray-900">Summer '25 Editorial</td>
                   <td className="px-6 py-4"><Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">Active</Badge></td>
                   <td className="px-6 py-4"><span className="font-medium text-indigo-600">High</span></td>
                   <td className="px-6 py-4"><span className="font-medium text-indigo-600">High</span></td>
                   <td className="px-6 py-4 text-right flex justify-end gap-1 items-center text-green-600">
                     <TrendingUp className="w-4 h-4" /> Up
                   </td>
                 </tr>
                 <tr className="group hover:bg-gray-50/50 transition-colors">
                   <td className="px-6 py-4 font-medium text-gray-900">Holiday Lookbook</td>
                   <td className="px-6 py-4"><Badge variant="outline" className="bg-gray-50 text-gray-600">Completed</Badge></td>
                   <td className="px-6 py-4"><span className="font-medium text-amber-600">Medium</span></td>
                   <td className="px-6 py-4"><span className="font-medium text-indigo-600">High</span></td>
                   <td className="px-6 py-4 text-right flex justify-end gap-1 items-center text-gray-400">
                     Stable
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
}
