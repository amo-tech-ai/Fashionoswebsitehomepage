import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  X,
  Info,
  TrendingUp,
  Instagram,
  Globe,
  Camera,
  ChevronRight
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetFooter 
} from "../ui/sheet";
import { toast } from "sonner@2.0.3";
import { useBrandShoot } from "../../context/BrandShootContext";
import { MOCK_MODELS } from './CuraCasting';

// --- Types ---
// Updated to match the shared MOCK_MODELS structure
interface Model {
  id: number | string;
  name: string;
  agency: string;
  image: string;
  matchScore: number;
  tags: string[];
  reasoning: {
    summary: string;
    points: string[];
  };
  stats: {
    height: string;
    instagram: string;
    engagement: string;
  };
  portfolio: string[];
}

export function CastingMatchmaker({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const { campaignPlan, bookedTalent, setBookedTalent } = useBrandShoot();
  const [selectedModel, setSelectedModel] = useState<any | null>(null);

  // Fallback context if no campaign plan exists
  const context = {
    goal: campaignPlan?.strategy.goal || "Product Sales",
    tone: campaignPlan?.strategy.tone || "Effortless, High Contrast",
    channels: campaignPlan?.strategy.channels.slice(0, 3).join(", ") || "Instagram, Shopify"
  };

  const isBooked = (id: number | string) => bookedTalent.includes(id as number);

  const handleRequest = (e: React.MouseEvent, model: any) => {
    e.stopPropagation();
    if (isBooked(model.id)) return;

    setBookedTalent([...bookedTalent, model.id]);
    toast.success(`Availability requested for ${model.name}`, {
      description: "We'll notify you within 24 hours.",
      icon: <CheckCircle2 className="w-4 h-4 text-green-600" />
    });
  };

  const handleConfirmSelection = () => {
    // Navigate to Casting Availability
    onNavigate('casting-availability');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans">
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-serif text-3xl text-gray-900 mb-2">Casting Matchmaker <span className="text-purple-600 text-lg align-top ml-1">AI</span></h1>
              <p className="text-gray-500 max-w-xl">
                Candidates selected by Cura AI based on your campaign's visual signature, historical performance data, and audience affinity.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onNavigate('overview')}>Cancel</Button>
              <Button 
                className="bg-gray-900 text-white hover:bg-black"
                disabled={bookedTalent.length === 0}
                onClick={handleConfirmSelection}
              >
                Confirm Selection ({bookedTalent.length})
              </Button>
            </div>
          </div>

          {/* Campaign Context Strip */}
          <div className="flex flex-wrap items-center gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="font-bold text-gray-400 uppercase tracking-wider text-xs mr-2">Campaign Context</span>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm text-gray-700">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
              <span>Goal: {context.goal}</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm text-gray-700">
              <Camera className="w-3.5 h-3.5 text-purple-500" />
              <span>Tone: {context.tone}</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm text-gray-700">
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>Channels: {context.channels}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_MODELS.map((model, index) => (
            <ModelCard 
              key={model.id} 
              model={model as any} 
              index={index}
              isRequested={isBooked(model.id)}
              onRequest={(e) => handleRequest(e, model)}
              onClick={() => setSelectedModel(model)}
            />
          ))}
        </div>
      </div>

      {/* AI Reasoning Drawer / Sheet */}
      <Sheet open={!!selectedModel} onOpenChange={(open) => !open && setSelectedModel(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          {selectedModel && (
            <div className="space-y-8 py-6">
              
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-serif text-3xl text-gray-900 mb-1">{selectedModel.name}</h2>
                  <p className="text-gray-500">{selectedModel.agency}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-2xl font-bold text-purple-600">{selectedModel.matchScore}%</div>
                  <span className="text-xs text-purple-600/60 font-medium uppercase tracking-wider">Match Score</span>
                </div>
              </div>

              {/* Main Image */}
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                <img 
                  src={selectedModel.image} 
                  alt={selectedModel.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* AI Analysis Section */}
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-purple-900">Why Cura selected {selectedModel.name.split(' ')[0]}</h3>
                </div>
                <p className="text-purple-900/80 mb-4 leading-relaxed">
                  {selectedModel.reasoning.summary}
                </p>
                <ul className="space-y-2">
                  {selectedModel.reasoning.points.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-purple-800">
                      <div className="min-w-[4px] h-[4px] bg-purple-400 rounded-full mt-2" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Height</div>
                  <div className="font-medium text-gray-900">{selectedModel.stats.height}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Social</div>
                  <div className="font-medium text-gray-900">{selectedModel.stats.instagram}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Engagement</div>
                  <div className="font-medium text-gray-900">{selectedModel.stats.engagement}</div>
                </div>
              </div>

              {/* Mini Portfolio */}
              <div>
                <h3 className="font-serif text-lg text-gray-900 mb-4">Recent Work</h3>
                <div className="grid grid-cols-3 gap-2">
                  {selectedModel.portfolio.map((img: string, i: number) => (
                    <div key={i} className="aspect-[4/5] rounded-lg overflow-hidden bg-gray-100">
                      <img src={img} alt="Portfolio" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>

              <SheetFooter className="pt-4 sticky bottom-0 bg-white border-t border-gray-100 pb-4">
                <Button 
                  className="w-full h-12 text-base bg-gray-900 text-white hover:bg-black"
                  onClick={() => {
                    if (!isBooked(selectedModel.id)) {
                        setBookedTalent([...bookedTalent, selectedModel.id]);
                        toast.success(`Availability requested for ${selectedModel.name}`);
                    }
                    setSelectedModel(null);
                  }}
                  disabled={isBooked(selectedModel.id)}
                >
                  {isBooked(selectedModel.id) ? (
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Request Sent</span>
                  ) : (
                    "Request Availability"
                  )}
                </Button>
              </SheetFooter>

            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}

// --- Sub-Components ---

function ModelCard({ 
  model, 
  index, 
  isRequested, 
  onRequest,
  onClick
}: { 
  model: Model, 
  index: number, 
  isRequested: boolean, 
  onRequest: (e: React.MouseEvent) => void,
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-sm bg-gray-200">
        <img 
          src={model.image} 
          alt={model.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Match Score Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/50">
          <Sparkles className="w-3 h-3 text-purple-600" />
          <span className="text-xs font-bold text-gray-900">{model.matchScore}% Match</span>
        </div>

        {/* Hover Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
             <Button 
               size="sm" 
               className="w-full bg-white text-gray-900 hover:bg-gray-100"
               onClick={onRequest}
             >
                {isRequested ? "Request Sent" : "Quick Request"}
             </Button>
        </div>
      </div>

      {/* Meta Data */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif text-xl text-gray-900 group-hover:underline decoration-1 underline-offset-4">{model.name}</h3>
            <p className="text-sm text-gray-500">{model.agency}</p>
          </div>
          {isRequested && (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {model.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* AI Snippet */}
        <div className="flex items-start gap-2 text-xs text-gray-500 bg-purple-50/50 p-2 rounded-lg border border-purple-100/50 mt-2">
           <Info className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />
           <p className="line-clamp-2">{model.reasoning.summary}</p>
        </div>
      </div>
    </motion.div>
  );
}
