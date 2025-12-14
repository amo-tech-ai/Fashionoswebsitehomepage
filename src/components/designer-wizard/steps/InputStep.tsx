import { useState } from "react";
import { motion } from "motion/react";
import { BrandData } from "../DesignerWizard";
import { Sparkles, Globe, Instagram, PenTool } from "lucide-react";

interface InputStepProps {
  onNext: (data: BrandData) => void;
}

export function InputStep({ onNext }: InputStepProps) {
  const [formData, setFormData] = useState<BrandData>({
    name: "Andrew Majtenyi",
    website: "https://www.andrewmajtenyi.com/",
    instagram: "@andrewmajtenyi"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full"
    >
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] w-full border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3">Create Your Brand Profile</h1>
          <p className="text-gray-500 font-light">Paste your links. We'll do the work.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Brand Name</label>
            <div className="relative group">
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all group-hover:bg-white"
                placeholder="e.g. Acme Fashion"
                required
              />
              <PenTool className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Website URL</label>
            <div className="relative group">
              <input 
                type="url" 
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all group-hover:bg-white"
                placeholder="https://"
                required
              />
              <Globe className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Instagram Handle</label>
            <div className="relative group">
              <input 
                type="text" 
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all group-hover:bg-white"
                placeholder="@handle"
                required
              />
              <Instagram className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-black text-white h-14 rounded-full font-medium text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Analyze My Brand</span>
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-purple-600 font-medium bg-purple-50 py-1.5 px-3 rounded-full w-fit mx-auto">
              <Sparkles className="w-3 h-3" />
              <span>Free AI brand audit included</span>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
