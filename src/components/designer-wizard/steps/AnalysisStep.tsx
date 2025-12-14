import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Globe, Instagram, Link as LinkIcon, Edit2, RotateCcw } from "lucide-react";

interface AnalysisStepProps {
  brandName: string;
  onNext: () => void;
  onBack: () => void;
}

export function AnalysisStep({ brandName, onNext, onBack }: AnalysisStepProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
    >
      {/* LEFT COLUMN - Analysis Data */}
      <div className="lg:col-span-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-gray-900">How the Market Sees Your Brand</h1>
          <p className="text-gray-500 font-light">
            We analyzed your website, collections, and public market signals to summarize how your brand is positioned today.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium mt-2 border border-blue-100">
            <Edit2 className="w-3 h-3" />
            <span>You can edit anything before continuing</span>
          </div>
        </div>

        {/* Brand Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop" 
              alt="Brand Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{brandName}</h2>
              <p className="text-sm text-gray-500 max-w-lg">A contemporary womenswear brand focused on minimalist silhouettes and responsible production.</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>Copenhagen, Denmark</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>Est. 2021</span>
              <span className="flex items-center gap-1.5 text-green-600 font-medium"><Check className="w-3 h-3" />Sustainable</span>
            </div>
          </div>
          <div className="space-y-2 flex flex-col items-start min-w-[200px]">
            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">Brand Links</div>
            <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
              <Globe className="w-3.5 h-3.5" /> www.andrewmajtenyi.com
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
              <Instagram className="w-3.5 h-3.5" /> @andrewmajtenyi
            </a>
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
             <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase">Active Collections</h3>
             <button className="text-xs text-gray-500 hover:text-black">View Digital Showroom →</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 relative group">
                <img 
                   src={`https://images.unsplash.com/photo-${i === 1 ? '1539109136881-3be0616acf4b' : i === 2 ? '1550614000-4b9519e0912e' : i === 3 ? '1558769132-cb1aea458c5e' : '1509631179647-363417a16e87'}?w=400&fit=crop&q=80`}
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   alt="Collection Item"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* DNA Analysis */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
            <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                <h3 className="text-sm font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    Brand Position Summary
                </h3>
                <span className="text-xs text-gray-400 italic">Analyzed from your website, social, and collections</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Market Category</label>
                    <div className="text-xl font-serif text-gray-900">Contemporary Womenswear</div>
                    <p className="text-sm text-gray-500 leading-relaxed">This category reflects where your brand sits between mass market and luxury, based on pricing, materials, and presentation.</p>
                </div>
                
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Aesthetic DNA</label>
                    <div className="flex flex-wrap gap-2">
                        {["Minimalist", "Sustainable", "Structural"].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">{tag}</span>
                        ))}
                         <span className="px-3 py-1 border border-gray-200 border-dashed rounded-full text-xs font-medium text-gray-400 cursor-pointer hover:border-gray-400 hover:text-gray-600 transition-colors">+ Add trait</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price Positioning</label>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-medium text-gray-900">$$ - $$$</span>
                    </div>
                    <p className="text-sm text-gray-500">Your pricing appears slightly above the category average, signaling a premium but accessible position.</p>
                </div>
                
                 <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Brand Palette</label>
                    <div className="flex items-center gap-3">
                        {['#1a1a1a', '#D4AF37', '#f5f5f5'].map(color => (
                            <div key={color} className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: color }} />
                        ))}
                        <button className="w-8 h-8 rounded-full border border-gray-200 border-dashed flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors">+</button>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* RIGHT COLUMN - Sticky Action */}
      <div className="lg:col-span-4">
        <div className="sticky top-24 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] space-y-6">
                <div className="space-y-2">
                    <h3 className="font-serif text-xl text-gray-900">Does this look right?</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        This is our best summary of how your brand is currently perceived. You can edit any field now, or continue to see a deeper brand audit.
                    </p>
                </div>

                <button 
                    onClick={onNext}
                    className="w-full bg-black text-white h-12 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
                >
                    <Check className="w-4 h-4" />
                    <span>Confirm & View Audit</span>
                </button>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                     <button className="w-full flex items-center gap-3 text-sm text-gray-500 hover:text-black transition-colors px-2 py-1 rounded hover:bg-gray-50">
                        <Edit2 className="w-4 h-4" /> Edit Brand Info
                     </button>
                     <button className="w-full flex items-center gap-3 text-sm text-gray-500 hover:text-black transition-colors px-2 py-1 rounded hover:bg-gray-50">
                        <RotateCcw className="w-4 h-4" /> Retake Analysis
                     </button>
                </div>
            </div>
            
             <button 
                onClick={onBack}
                className="w-full flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
                <ArrowLeft className="w-3 h-3" /> Back to Input
            </button>
        </div>
      </div>
    </motion.div>
  );
}
