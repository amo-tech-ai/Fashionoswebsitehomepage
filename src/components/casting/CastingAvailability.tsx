import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MoreHorizontal, 
  ArrowLeft, 
  Filter, 
  Sparkles,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  RefreshCw,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { useBrandShoot } from '../../context/BrandShootContext';
import { MOCK_MODELS } from './CuraCasting';

// Extended status types for this specific dashboard
type AvailabilityStatus = 'checking' | 'available' | 'hold' | 'booked' | 'unavailable';

interface ModelStatus extends typeof MOCK_MODELS[0] {
  status: AvailabilityStatus;
  responseParams?: {
    time: string;
    agent: string;
    note: string;
  };
  confidence: number;
}

export function CastingAvailability({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { campaignPlan, bookedTalent } = useBrandShoot();
  const [models, setModels] = useState<ModelStatus[]>([]);
  const [isChecking, setIsChecking] = useState(true);
  const [sortBy, setSortBy] = useState<'fit' | 'availability' | 'potential'>('fit');
  const [progress, setProgress] = useState(0);

  // Initialize models based on shortlist or mock data if empty
  useEffect(() => {
    const baseList = bookedTalent.length > 0 
      ? MOCK_MODELS.filter(m => bookedTalent.includes(m.id))
      : MOCK_MODELS; // Fallback to all if none selected for demo

    const initialModels = baseList.map(m => ({
      ...m,
      status: 'checking' as AvailabilityStatus,
      confidence: m.matchScore
    }));
    
    setModels(initialModels);

    // Simulate AI checking process
    let completed = 0;
    const total = initialModels.length;

    const interval = setInterval(() => {
        if (completed >= total) {
            clearInterval(interval);
            setIsChecking(false);
            return;
        }

        // Randomly update one model's status
        setModels(current => {
            const next = [...current];
            // Find a model still 'checking'
            const pendingIndices = next.map((m, i) => m.status === 'checking' ? i : -1).filter(i => i !== -1);
            
            if (pendingIndices.length > 0) {
                const idxToUpdate = pendingIndices[Math.floor(Math.random() * pendingIndices.length)];
                
                // Determine random status
                const rand = Math.random();
                let newStatus: AvailabilityStatus = 'available';
                let note = "Confirmed for all dates.";
                
                if (rand > 0.8) {
                    newStatus = 'unavailable';
                    note = "Booked on another campaign.";
                } else if (rand > 0.6) {
                    newStatus = 'hold';
                    note = "On 2nd hold. Needs decision by Friday.";
                }

                next[idxToUpdate] = {
                    ...next[idxToUpdate],
                    status: newStatus,
                    responseParams: {
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        agent: "Elite Models",
                        note: note
                    }
                };
                completed++;
                setProgress((completed / total) * 100);
            }
            return next;
        });

    }, 1500); // Update every 1.5s

    return () => clearInterval(interval);
  }, [bookedTalent]);

  const getStatusColor = (status: AvailabilityStatus) => {
    switch (status) {
      case 'available': return 'bg-green-50 text-green-700 border-green-200';
      case 'hold': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'unavailable': return 'bg-red-50 text-red-700 border-red-200';
      case 'booked': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  const getStatusIcon = (status: AvailabilityStatus) => {
    switch (status) {
      case 'available': return <CheckCircle2 className="w-4 h-4" />;
      case 'hold': return <Clock className="w-4 h-4" />;
      case 'unavailable': return <XCircle className="w-4 h-4" />;
      case 'booked': return <CheckCircle2 className="w-4 h-4" />;
      default: return <RefreshCw className="w-4 h-4 animate-spin" />;
    }
  };

  const sortedModels = [...models].sort((a, b) => {
      if (sortBy === 'fit') return b.confidence - a.confidence;
      if (sortBy === 'availability') {
          const score = (s: string) => s === 'available' ? 3 : s === 'hold' ? 2 : 1;
          return score(b.status) - score(a.status);
      }
      return 0;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => onNavigate('cura-casting')}>
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Button>
                    <div>
                        <h1 className="font-serif text-2xl text-gray-900">Casting Status</h1>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Oct 24 - 26</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span>{campaignPlan?.strategy?.tone || "Editorial Campaign"}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                        {['fit', 'availability', 'potential'].map((sort) => (
                            <button
                                key={sort}
                                onClick={() => setSortBy(sort as any)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
                                    sortBy === sort ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {sort}
                            </button>
                        ))}
                    </div>
                    <Button className="bg-gray-900 text-white hover:bg-black">
                        Export List
                    </Button>
                </div>
            </div>

            {/* AI Action Panel / Progress Bar */}
            <AnimatePresence>
                {isChecking && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-3 flex items-center gap-4 overflow-hidden"
                    >
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                            <Zap className="w-4 h-4 text-indigo-600 animate-pulse" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-xs font-medium text-indigo-900 mb-1.5">
                                <span>AI Agent is contacting agencies...</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-indigo-600 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
                {sortedModels.map((model) => (
                    <motion.div
                        layout
                        key={model.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Card className={`
                            group overflow-hidden border transition-all duration-300
                            ${model.status === 'checking' ? 'border-gray-100' : 
                              model.status === 'available' ? 'border-green-100 shadow-green-100/50 hover:shadow-green-100/80 hover:border-green-300' :
                              model.status === 'hold' ? 'border-amber-100 shadow-amber-100/50 hover:shadow-amber-100/80 hover:border-amber-300' :
                              'border-gray-100 opacity-80 grayscale-[0.5]'}
                            hover:shadow-lg
                        `}>
                            
                            {/* Header Image & Badge */}
                            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                                <img 
                                    src={model.image} 
                                    alt={model.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                
                                {/* Status Badge */}
                                <div className="absolute top-3 left-3">
                                    <motion.div 
                                        layout
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border ${getStatusColor(model.status)}`}
                                    >
                                        {getStatusIcon(model.status)}
                                        <span className="capitalize">{model.status}</span>
                                    </motion.div>
                                </div>

                                {/* Confidence Score */}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm">
                                    <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider text-center">Fit</div>
                                    <div className="text-sm font-bold text-gray-900 text-center">{model.confidence}%</div>
                                </div>

                                {/* Soft Pulse Overlay for New Update */}
                                {model.status !== 'checking' && (
                                    <motion.div 
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className="absolute inset-0 bg-white pointer-events-none"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4 bg-white relative">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-serif text-lg font-medium text-gray-900">{model.name}</h3>
                                    <button className="text-gray-400 hover:text-gray-900">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="text-xs text-gray-500 mb-3">{model.rate}</div>

                                {/* Agent Response Area */}
                                <div className={`
                                    rounded-lg p-3 text-xs leading-relaxed mb-4 transition-colors
                                    ${model.status === 'checking' ? 'bg-gray-50 text-gray-400 italic' : 
                                      model.status === 'available' ? 'bg-green-50 text-green-800' :
                                      model.status === 'hold' ? 'bg-amber-50 text-amber-800' :
                                      'bg-red-50 text-red-800'}
                                `}>
                                    {model.status === 'checking' ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" />
                                            Awaiting agency reply...
                                        </span>
                                    ) : (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 font-medium opacity-70">
                                                <MessageSquare className="w-3 h-3" />
                                                Reply from {model.responseParams?.agent} • {model.responseParams?.time}
                                            </div>
                                            <p>"{model.responseParams?.note}"</p>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="flex-1 text-xs h-8"
                                        disabled={model.status === 'checking' || model.status === 'unavailable'}
                                    >
                                        <Mail className="w-3 h-3 mr-2" />
                                        Contact
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        className={`flex-1 text-xs h-8 ${model.status === 'unavailable' ? 'bg-gray-100 text-gray-400 hover:bg-gray-100' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                                        disabled={model.status === 'checking' || model.status === 'unavailable'}
                                    >
                                        {model.status === 'booked' ? "View Contract" : "Book Now"}
                                    </Button>
                                </div>
                            </div>

                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {/* Empty State / No Shortlist */}
        {sortedModels.length === 0 && (
            <div className="text-center py-24">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-serif text-xl text-gray-900 mb-2">No models to check</h3>
                <p className="text-gray-500 mb-6">Return to Cura to shortlist models first.</p>
                <Button onClick={() => onNavigate('cura-casting')}>Go to Casting Agent</Button>
            </div>
        )}

      </div>
    </div>
  );
}