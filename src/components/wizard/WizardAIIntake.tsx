import React, { useState, useEffect } from "react";
import { Globe, Instagram, ShoppingBag, Search, Sparkles, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WizardAIIntakeProps {
  onAnalyze: (data: any) => void;
  onSkip: () => void;
}

export function WizardAIIntake({ onAnalyze, onSkip }: WizardAIIntakeProps) {
  const [url, setUrl] = useState("");
  const [instagram, setInstagram] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const analysisMessages = [
    "Connecting to URL context...",
    "Analyzing brand aesthetic...",
    "Scanning product catalog...",
    "Reviewing social engagement...",
    "Generating strategic recommendations..."
  ];

  const handleAnalyze = () => {
    if (!url && !instagram) return;
    
    setIsAnalyzing(true);
    
    // Simulate Analysis Steps
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnalysisStep(step);
      if (step >= analysisMessages.length) {
        clearInterval(interval);
        setTimeout(() => {
          onAnalyze({
            url,
            instagram,
            keywords,
            detectedCategory: "fashion", // Mock result
            detectedStyle: "editorial",   // Mock result
            brandColor: "minimal"         // Mock result
          });
        }, 800);
      }
    }, 1200);
  };

  const addKeyword = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentKeyword) {
      setKeywords([...keywords, currentKeyword]);
      setCurrentKeyword("");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-100 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {!isAnalyzing ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-200 shadow-2xl"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                  <Sparkles className="w-3 h-3" /> Powered by Gemini 3
                </div>
                <h1 className="text-4xl font-serif text-gray-900 mb-4">Tell us about your brand</h1>
                <p className="text-gray-500">We analyze public data to tailor your production plan.</p>
              </div>

              <div className="space-y-6">
                {/* Website Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Website URL</label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="www.yourbrand.com"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-gray-900"
                    />
                  </div>
                </div>

                {/* Instagram Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Instagram Handle</label>
                  <div className="relative group">
                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pink-600 transition-colors" />
                    <input 
                      type="text" 
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="@brandname"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium text-gray-900"
                    />
                  </div>
                </div>

                {/* Keywords Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Brand Keywords (Optional)</label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      value={currentKeyword}
                      onChange={(e) => setCurrentKeyword(e.target.value)}
                      onKeyDown={addKeyword}
                      placeholder="e.g. Minimal, Luxury, Streetwear (Press Enter)"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-900 transition-all font-medium text-gray-900"
                    />
                  </div>
                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {keywords.map((k, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          {k}
                          <button onClick={() => setKeywords(keywords.filter((_, idx) => idx !== i))}>
                            <X className="w-3 h-3 hover:text-red-500" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 flex flex-col gap-3">
                  <button 
                    onClick={handleAnalyze}
                    disabled={!url && !instagram}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Analyze Brand <Sparkles className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={onSkip}
                    className="w-full py-3 text-gray-500 font-medium text-sm hover:text-gray-900 transition-colors"
                  >
                    Skip to Manual Setup
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              {/* Analysis Animation */}
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                />
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <Sparkles className="w-10 h-10 text-indigo-600 animate-pulse" />
                </div>
              </div>

              <h2 className="text-2xl font-serif text-gray-900 mb-2">Analyzing Your Brand</h2>
              <div className="h-8 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={analysisStep}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-gray-500 font-mono text-sm"
                  >
                    {analysisMessages[Math.min(analysisStep, analysisMessages.length - 1)]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
