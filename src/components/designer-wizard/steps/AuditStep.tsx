import { motion } from "motion/react";
import { ScoreCard, Insight } from "../components/ScoreCard";
import { Layout, Share2, Star, ShoppingBag, ArrowRight, TrendingUp, AlertTriangle, Zap, Calendar } from "lucide-react";

interface AuditStepProps {
  onComplete?: () => void;
}

export function AuditStep({ onComplete }: AuditStepProps) {
  const overallScore = 78;

  // Circle Config
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto w-full space-y-12"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <motion.button 
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-xs text-gray-400 hover:text-black mb-2 transition-colors flex items-center gap-1"
           >
             ← Back to Overview
           </motion.button>
           <h1 className="text-3xl md:text-4xl font-serif text-gray-900">Brand Audit Overview</h1>
           <p className="text-gray-500 mt-2 font-light">AI-evaluated readiness across key growth areas.</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-xs font-medium text-gray-500 shadow-sm flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            Last updated: Today
        </div>
      </div>

      {/* TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* OVERALL SCORE CARD (Left Col) */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center h-full min-h-[400px]"
        >
            <div className="relative mb-8">
                {/* SVG Ring */}
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90"
                >
                    <circle
                        stroke="#f3f4f6"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <motion.circle
                        stroke="#10b981" // Emerald 500
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        strokeLinecap="round"
                        style={{ strokeDashoffset: circumference }} // Start empty
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-5xl font-serif font-bold text-gray-900"
                    >
                        {overallScore}
                    </motion.span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Overall</span>
                </div>
                
                {/* Decorators */}
                <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ delay: 1 }}
                    className="absolute top-0 right-0 bg-gray-100 p-1.5 rounded-full"
                >
                    <Zap className="w-4 h-4 text-gray-400" />
                </motion.div>
            </div>

            <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Good - Improving
            </div>
            <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed">
                Audit based on your public brand visuals and market performance.
            </p>
        </motion.div>

        {/* DOMAIN SCORES (Right Col - 2x2 Grid) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScoreCard 
                title="Website Score" 
                score={72} 
                status="Good"
                icon={<Layout className="w-5 h-5" />}
                delay={0.1}
                insights={[
                    { text: "Clean layout but slow load time", type: "neutral" },
                    { text: "Weak CTA placement above fold", type: "negative" },
                    { text: "Mobile UX inconsistent", type: "negative" }
                ]}
            />
            <ScoreCard 
                title="Social Score" 
                score={85} 
                status="Excellent"
                icon={<Share2 className="w-5 h-5" />}
                delay={0.2}
                insights={[
                    { text: "High engagement on Reels", type: "positive" },
                    { text: "Consistent visual identity", type: "positive" },
                    { text: "Bio link optimized for conversion", type: "positive" }
                ]}
            />
            <ScoreCard 
                title="Brand Score" 
                score={88} 
                status="Excellent"
                icon={<Star className="w-5 h-5" />}
                delay={0.3}
                insights={[
                    { text: "Strong narrative consistency", type: "positive" },
                    { text: "Premium typography usage", type: "positive" },
                    { text: "Clear luxury positioning", type: "positive" }
                ]}
            />
            <ScoreCard 
                title="E-commerce Score" 
                score={64} 
                status="Good" // Actually 64 is barely good, but let's stick to prompt example
                icon={<ShoppingBag className="w-5 h-5" />}
                delay={0.4}
                insights={[
                    { text: "Product presentation lacks detail", type: "neutral" },
                    { text: "Checkout flow has friction", type: "negative" },
                    { text: "Mobile cart interaction issues", type: "negative" }
                ]}
            />
        </div>
      </div>

      {/* ACTION BANNER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#111] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
                <h2 className="text-2xl md:text-3xl font-serif">Ready to optimize?</h2>
                <p className="text-gray-400 font-light leading-relaxed">
                    We've generated a personalized growth plan based on these audit scores. Unlock higher conversion and brand perception today.
                </p>
                <div className="flex gap-6 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> 3 High Priority Actions</span>
                    <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-400" /> +12 Score Potential</span>
                </div>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
                <button 
                    onClick={onComplete}
                    className="bg-white text-black h-12 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group"
                >
                    <span>Improve Your Profile</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="text-sm text-gray-400 hover:text-white transition-colors text-center">
                    View Full Audit Report
                </button>
            </div>
        </div>
        {/* Abstract bg visual */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800/20 to-transparent pointer-events-none" />
      </motion.div>

      {/* RECOMMENDATIONS & TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Timeline */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Brand Health Timeline</h3>
            <div className="space-y-8 relative pl-4 border-l border-gray-100">
                <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white" />
                    <div className="bg-emerald-50 px-3 py-1 rounded text-[10px] font-bold uppercase text-emerald-700 w-fit mb-2">Current Milestone</div>
                    <h4 className="font-bold text-gray-900">Visual Merchandising Update</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">Standardized product photography across collections. Improved visual consistency score by 12 points.</p>
                    
                    {/* Before/After Thumbnails */}
                    <div className="flex items-center gap-4 mt-4">
                        <div className="space-y-1">
                             <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&fit=crop" className="w-full h-full object-cover grayscale opacity-50" />
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white bg-black/30">BEFORE</div>
                             </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300" />
                        <div className="space-y-1">
                             <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&fit=crop" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white bg-black/30">AFTER</div>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="relative opacity-50">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
                    <div className="text-[10px] font-bold uppercase text-gray-400 mb-1">Oct 12, 2024</div>
                    <h4 className="font-bold text-gray-900">Initial Brand Audit</h4>
                    <p className="text-sm text-gray-500 mt-1">Established baseline brand health score of 72.</p>
                </div>
            </div>
          </div>

          {/* AI Recs */}
          <div className="space-y-4">
               <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">AI Recommendations</h3>
               
               <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                   <div className="flex items-start gap-4">
                       <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                           <Zap className="w-5 h-5" />
                       </div>
                       <div>
                           <div className="text-[10px] font-bold uppercase text-amber-600 mb-1">High Priority</div>
                           <h4 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">Fix Mobile Checkout Friction</h4>
                           <p className="text-sm text-gray-500 mt-2 leading-relaxed">Cart abandonment is 15% higher on mobile. Simplifying the form could reclaim lost revenue.</p>
                           <span className="text-xs font-medium text-gray-900 underline mt-3 block">View Solution</span>
                       </div>
                   </div>
               </div>

               <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                   <div className="flex items-start gap-4">
                       <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                           <Layout className="w-5 h-5" />
                       </div>
                       <div>
                           <div className="text-[10px] font-bold uppercase text-blue-600 mb-1">Medium Priority</div>
                           <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Enhance Product Detail Pages</h4>
                           <p className="text-sm text-gray-500 mt-2 leading-relaxed">Adding lifestyle imagery can increase conversion by up to 20% for your category.</p>
                           <span className="text-xs font-medium text-gray-900 underline mt-3 block">See Examples</span>
                       </div>
                   </div>
               </div>
          </div>
      </div>
    </motion.div>
  );
}
