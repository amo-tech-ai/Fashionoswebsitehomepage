import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useBrandShoot } from '../../context/BrandShootContext';

interface AIThinkingProps {
  onNavigate: (screen: string) => void;
}

const ANALYSIS_STEPS = [
  "Extracting brand DNA...",
  "Analyzing channel performance...",
  "Generating multi-channel output packs...",
  "Drafting ad hooks & creatives...",
  "Optimizing for conversion..."
];

export function AIThinking({ onNavigate }: AIThinkingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { generateMockPlan } = useBrandShoot();

  useEffect(() => {
    // Start Generation
    generateMockPlan();

    // Cycle through steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500); // 1.5s per step

    // Finish after all steps + buffer
    const finishTimeout = setTimeout(() => {
      onNavigate('campaign-summary');
    }, ANALYSIS_STEPS.length * 1500 + 1000);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(finishTimeout);
    };
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Abstract Background Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-[100px]"
      />

      <div className="z-10 flex flex-col items-center space-y-12">
        
        {/* Central Visualization */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border border-gray-200 flex items-center justify-center relative"
          >
             {/* Orbital Dot */}
             <motion.div 
               className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rounded-full shadow-lg shadow-indigo-500/50"
             />
          </motion.div>
          
          {/* Inner Pulsing Core */}
          <motion.div 
            animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 m-auto w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-md opacity-20"
          />
          <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Sparkles className="w-6 h-6 text-gray-900" />
          </div>
        </div>

        {/* Rotating Status Text */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode='wait'>
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-2xl text-gray-900 text-center"
            >
              {ANALYSIS_STEPS[currentStep]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Badge */}
        <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-gray-200 text-gray-500 px-4 py-1.5 rounded-full font-sans font-normal gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Powered by Gemini 3 Pro
        </Badge>
        
      </div>
    </div>
  );
}
