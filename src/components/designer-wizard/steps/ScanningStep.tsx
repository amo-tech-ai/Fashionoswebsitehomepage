import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scan, Sparkles } from "lucide-react";

interface ScanningStepProps {
  onNext: () => void;
}

export function ScanningStep({ onNext }: ScanningStepProps) {
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("Initializing AI agents...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onNext, 500);
          return 100;
        }
        
        // Update labels based on progress
        if (prev === 20) setLabel("Scanning website architecture...");
        if (prev === 45) setLabel("Analyzing brand visuals & color theory...");
        if (prev === 70) setLabel("Comparing market positioning...");
        if (prev === 90) setLabel("Finalizing audit scores...");
        
        return prev + 1;
      });
    }, 40); // 4 seconds total

    return () => clearInterval(interval);
  }, [onNext]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full min-h-[50vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white p-12 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-gray-100 text-center relative overflow-hidden"
      >
        <div className="relative z-10">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <Scan className="w-8 h-8 text-black" />
                <motion.div 
                    className="absolute inset-0 border-2 border-black rounded-full border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <h2 className="text-2xl font-serif text-gray-900 mb-2">Analyzing Brand DNA</h2>
            
            <div className="h-6 mb-8">
                <AnimatePresence mode="wait">
                    <motion.p 
                        key={label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-gray-500 font-medium text-sm"
                    >
                        {label}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden max-w-xs mx-auto">
                <motion.div 
                    className="h-full bg-black rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <Sparkles className="absolute top-10 right-10 text-purple-100 w-12 h-12" />
        <Sparkles className="absolute bottom-10 left-10 text-yellow-100 w-8 h-8" />
      </motion.div>
    </div>
  );
}
