import React from "react";
import { Sparkles, Edit3, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface WizardModeSelectionProps {
  onSelectMode: (mode: 'manual' | 'ai') => void;
}

export function WizardModeSelection({ onSelectMode }: WizardModeSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Plan Your Campaign</h1>
          <p className="text-gray-500 text-lg">Choose how you would like to start your creative brief.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Manual Mode */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col h-full group"
            onClick={() => onSelectMode('manual')}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
              <Edit3 className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">Standard</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Manual Setup</h3>
            <p className="text-gray-500 leading-relaxed mb-8 flex-1">
              Configure every detail of your shoot from scratch. Perfect if you already have a specific vision in mind.
            </p>
            <button className="w-full py-4 rounded-xl border-2 border-gray-200 text-gray-900 font-bold hover:border-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              Start Manually
            </button>
          </motion.div>

          {/* AI Mode */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-black rounded-3xl p-8 border border-black shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col h-full overflow-hidden group"
            onClick={() => onSelectMode('ai')}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
            <div className="absolute top-0 right-0 p-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/20 transition-all">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-lg shadow-purple-500/30">Recommended</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-3">AI Creative Partner</h3>
              <p className="text-gray-400 leading-relaxed mb-8 flex-1">
                We analyze your brand & channels to suggest optimal talent, scenes, and styles. You approve every step.
              </p>
              <button className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10">
                Continue with AI <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
