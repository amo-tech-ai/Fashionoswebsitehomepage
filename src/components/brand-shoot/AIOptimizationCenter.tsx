import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Wand2, 
  Maximize2, 
  RefreshCw,
  Layout
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

// Mock Data for Optimization
const OPTIMIZATIONS = [
  {
    id: 1,
    type: 'visual',
    severity: 'high',
    title: 'Low Contrast Detected',
    description: 'Product visibility is low on mobile screens. Increase contrast by 15%.',
    impact: 'High Impact',
    assetId: 'img_3',
    assetUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800&h=1000'
  },
  {
    id: 2,
    type: 'performance',
    severity: 'medium',
    title: 'Drop-off Risk',
    description: 'Video length (15s) is causing 40% drop-off. Trim to 8s loop.',
    impact: 'Medium Impact',
    assetId: 'vid_1',
    assetUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800&h=1000'
  }
];

interface AIOptimizationCenterProps {
  onNavigate: (screen: string) => void;
}

export function AIOptimizationCenter({ onNavigate }: AIOptimizationCenterProps) {
  const [activeOpt, setActiveOpt] = useState(OPTIMIZATIONS[0]);
  const [optimizationScore, setOptimizationScore] = useState(72);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleApplyFix = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setOptimizationScore(88);
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] pb-24 font-sans">
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-medium text-gray-900">AI Optimization Center</h1>
            <p className="text-xs text-gray-500">Live monitoring & automated improvement</p>
          </div>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" onClick={() => onNavigate('overview')}>Exit</Button>
           <Button className="bg-gray-900 text-white hover:bg-black">
             <RefreshCw className="w-4 h-4 mr-2" />
             Re-Analyze
           </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Stats & List */}
        <div className="space-y-6">
          
          {/* Score Card */}
          <Card className="border-0 shadow-lg shadow-indigo-100/50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Optimization Score</p>
                   <div className="flex items-baseline gap-2">
                     <span className="text-4xl font-serif font-bold text-gray-900">{optimizationScore}</span>
                     <span className="text-sm text-gray-400">/ 100</span>
                   </div>
                </div>
                {optimizationScore < 80 ? (
                  <Badge variant="destructive" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">Needs Attention</Badge>
                ) : (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">Healthy</Badge>
                )}
              </div>
              <Progress value={optimizationScore} className="h-2 bg-gray-100" />
              <p className="mt-4 text-xs text-gray-500">
                {optimizationScore < 80 
                  ? "2 critical issues detected affecting conversion." 
                  : "Campaign is performing within optimal range."}
              </p>
            </CardContent>
          </Card>

          {/* Insights List */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-gray-900">Detected Insights</h3>
            {OPTIMIZATIONS.map((opt) => (
              <div 
                key={opt.id}
                onClick={() => setActiveOpt(opt)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeOpt.id === opt.id 
                    ? 'bg-white border-indigo-600 shadow-md scale-[1.02]' 
                    : 'bg-white border-gray-100 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                   <Badge variant="outline" className={`
                     ${opt.severity === 'high' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'}
                   `}>
                     {opt.severity === 'high' ? 'Critical' : 'Warning'}
                   </Badge>
                   <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide bg-indigo-50 px-2 py-0.5 rounded-full">
                     {opt.impact}
                   </span>
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">{opt.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{opt.description}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Visualization & Action */}
        <div className="lg:col-span-2 space-y-6">
           
           <Card className="h-full border-0 shadow-xl shadow-black/5 flex flex-col">
             <CardHeader className="border-b border-gray-50 pb-4">
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-indigo-600" />
                   <CardTitle className="text-base font-medium">Smart Editor</CardTitle>
                 </div>
                 <div className="flex gap-2">
                   <Button variant="ghost" size="sm" className="text-xs">Original</Button>
                   <Button variant="secondary" size="sm" className="text-xs bg-indigo-50 text-indigo-700">AI Proposed</Button>
                 </div>
               </div>
             </CardHeader>
             
             <div className="flex-1 bg-gray-50 relative group overflow-hidden flex items-center justify-center p-8">
               
               {/* Before/After Visualization */}
               <div className="relative w-full max-w-md aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
                 <img 
                   src={activeOpt.assetUrl} 
                   alt="Asset" 
                   className={`w-full h-full object-cover transition-all duration-700 ${isOptimizing ? 'filter brightness-110 contrast-125' : ''}`}
                 />
                 
                 {/* Scanning Overlay Effect */}
                 {!isOptimizing && optimizationScore < 80 && (
                   <div className="absolute inset-0 bg-indigo-900/10 pointer-events-none">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/50 rounded-full animate-ping" />
                     <div className="absolute top-8 right-8 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm animate-bounce">
                       Contrast Issue
                     </div>
                   </div>
                 )}

                 {isOptimizing && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <RefreshCw className="w-8 h-8 text-white animate-spin mx-auto" />
                        <p className="text-white font-medium">Applying AI Fixes...</p>
                      </div>
                    </div>
                 )}
               </div>

             </div>

             <div className="p-6 bg-white border-t border-gray-100">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-gray-900">Proposed Change</p>
                   <p className="text-xs text-gray-500">{activeOpt.description}</p>
                 </div>
                 <Button 
                   onClick={handleApplyFix}
                   disabled={isOptimizing || optimizationScore > 80}
                   className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
                 >
                   {optimizationScore > 80 ? (
                     <>
                       <CheckCircle2 className="w-4 h-4 mr-2" />
                       Optimized
                     </>
                   ) : (
                     <>
                       <Wand2 className="w-4 h-4 mr-2" />
                       Apply Fix
                     </>
                   )}
                 </Button>
               </div>
             </div>
           </Card>

        </div>

      </div>
    </div>
  );
}
