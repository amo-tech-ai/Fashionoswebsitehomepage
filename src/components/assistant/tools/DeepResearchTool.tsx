import { useState, useEffect } from "react";
import { 
  Loader2, 
  Globe, 
  FileText, 
  CheckCircle2, 
  Search,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

interface ResearchStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'complete';
}

interface DeepResearchToolProps {
  initialQuery?: string;
  onComplete?: (result: any) => void;
  placeholder?: string;
}

export function DeepResearchTool({ 
  initialQuery = "", 
  onComplete, 
  placeholder = "Ask Gemini Deep Research..." 
}: DeepResearchToolProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [steps, setSteps] = useState<ResearchStep[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    
    setIsSearching(true);
    setResult(null);
    setSteps([
      { id: '1', label: 'Analyzing intent...', status: 'active' },
      { id: '2', label: 'Scanning trusted sources', status: 'pending' },
      { id: '3', label: 'Synthesizing findings', status: 'pending' },
    ]);

    // Step 1: Analyze
    await new Promise(r => setTimeout(r, 800));
    setSteps(prev => prev.map(s => s.id === '1' ? { ...s, status: 'complete' } : s.id === '2' ? { ...s, status: 'active' } : s));

    // Step 2: Scan (Simulate reading multiple sources)
    await new Promise(r => setTimeout(r, 1500));
    setSteps(prev => prev.map(s => s.id === '2' ? { ...s, status: 'complete' } : s.id === '3' ? { ...s, status: 'active' } : s));

    // Step 3: Synthesize
    await new Promise(r => setTimeout(r, 1000));
    setSteps(prev => prev.map(s => s.id === '3' ? { ...s, status: 'complete' } : s));

    // Complete
    const mockResult = `Based on your request "${query}", I've found 3 potential options that match your criteria. The market trend indicates a shift towards sustainable venues for this season.`;
    setResult(mockResult);
    setIsSearching(false);
    
    if (onComplete) onComplete({ query, summary: mockResult });
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Input Area */}
      <div className="p-4 border-b border-gray-100 flex gap-3">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
             <Globe className="w-4 h-4 text-white" />
          </div>
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-14 h-12 border-none bg-gray-50 focus-visible:ring-0 text-base"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch}
          disabled={!query || isSearching}
          className="h-12 px-6 bg-[#111111] hover:bg-black text-white rounded-lg font-medium"
        >
          {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>

      {/* Progress / Results Area */}
      <AnimatePresence mode="wait">
        {isSearching && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-gray-50 border-b border-gray-100"
          >
            <div className="space-y-3">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-3">
                  <div className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                    step.status === 'complete' ? 'bg-emerald-500 border-emerald-500' :
                    step.status === 'active' ? 'border-blue-500' : 'border-gray-300'
                  }`}>
                    {step.status === 'complete' && <CheckCircle2 className="w-3 h-3 text-white" />}
                    {step.status === 'active' && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
                  </div>
                  <span className={`text-sm ${
                    step.status === 'active' ? 'text-gray-900 font-medium' : 
                    step.status === 'complete' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {result && !isSearching && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="p-6 bg-white"
           >
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                 <FileText className="w-5 h-5 text-indigo-600" />
               </div>
               <div className="space-y-2">
                 <h4 className="font-serif text-lg font-medium text-gray-900">Research Summary</h4>
                 <p className="text-gray-600 leading-relaxed text-sm">
                   {result}
                 </p>
                 <div className="pt-2 flex gap-2">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">3 Sources</Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">Verified</Badge>
                 </div>
               </div>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper needed for standalone usage
import { Badge } from "../../ui/badge";
