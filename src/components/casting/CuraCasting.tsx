import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  X, 
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  Info,
  ArrowLeft,
  ArrowRight,
  Search,
  MoreHorizontal,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { useBrandShoot } from '../../context/BrandShootContext';

// Exporting MOCK_MODELS so it can be used by other components
export const MOCK_MODELS = [
  {
    id: 1,
    name: "Elara V.",
    agency: "Elite Management",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800&h=1000",
    location: "New York, NY",
    tags: ["High Fashion", "Editorial", "Streetwear"],
    rate: "$2,500/day",
    matchScore: 98,
    matchReason: "Perfect alignment with the 'Effortless' campaign tone.",
    availability: "Available",
    reasoning: {
        summary: "Perfect alignment with the 'Effortless' campaign tone.",
        points: [
          "Historical data shows 20% higher engagement on similar luxury campaigns.",
          "Strong facial structure compliments the high-contrast lighting requested.",
          "Previously booked by 3 similar brands in Q3."
        ]
    },
    stats: {
        height: "5'10\"",
        instagram: "@elara_v",
        engagement: "4.8%"
    },
    portfolio: [
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=400"
    ]
  },
  {
    id: 2,
    name: "Julian K.",
    agency: "IMG Models",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800&h=1000",
    location: "Brooklyn, NY",
    tags: ["Commercial", "Lifestyle", "Athleisure"],
    rate: "$1,800/day",
    matchScore: 92,
    matchReason: "Great energy for lifestyle shots.",
    availability: "Available",
    reasoning: {
        summary: "Top performer for 'Product Sales' goals.",
        points: [
          "Exceptional conversion metrics on Shopify PDPs.",
          "Versatile look fits both 'Lifestyle' and 'Studio' recipes.",
          "High affinity with the 25-34 demographic target."
        ]
      },
      stats: {
        height: "6'1\"",
        instagram: "@julian_k",
        engagement: "3.2%"
      },
      portfolio: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
      ]
  },
  {
    id: 3,
    name: "Sasha M.",
    agency: "Ford Models",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800&h=1000",
    location: "New York, NY",
    tags: ["Editorial", "Avant Garde"],
    rate: "$3,000/day",
    matchScore: 85,
    matchReason: "Strong editorial look, best for studio.",
    availability: "Limited",
    reasoning: {
        summary: "Strong candidate for beauty/detail shots.",
        points: [
          "Consistent aesthetic match for 'Warm' tone requirements.",
          "Excellent skin texture for macro photography.",
          "Rising star with high availability next month."
        ]
      },
      stats: {
        height: "5'9\"",
        instagram: "@sasha.m",
        engagement: "5.1%"
      },
      portfolio: [
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400"
      ]
  },
  {
    id: 4,
    name: "Kai R.",
    agency: "Wilhelmina",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
    location: "Jersey City, NJ",
    tags: ["Streetwear", "Urban"],
    rate: "$2,000/day",
    matchScore: 78,
    matchReason: "Good backup option.",
    availability: "Available",
    reasoning: {
        summary: "Budget-friendly option with good range.",
        points: [
            "Matches the 'Urban' keyword strongly.",
            "Available on short notice.",
            "Portfolio shows versatility in streetwear."
        ]
    },
    stats: {
        height: "6'0\"",
        instagram: "@kai_r",
        engagement: "2.5%"
    },
    portfolio: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500&q=80",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80"
    ]
  }
];

export function CuraCasting({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { campaignPlan, bookedTalent, setBookedTalent } = useBrandShoot();
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      sender: 'cura',
      text: `Hello. I've analyzed the "${campaignPlan?.strategy?.title || 'Summer Campaign'}" brief.`,
      timestamp: 'Just now'
    },
    {
      id: 2,
      sender: 'cura',
      text: "I've shortlisted 4 talent profiles that match the 'Editorial/Warm' aesthetic. Would you like to review them?",
      timestamp: 'Just now',
      action: 'review_models'
    }
  ]);
  const [showModels, setShowModels] = useState(false);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: 'Now'
    };
    
    setMessages([...messages, newMsg]);
    setInput('');

    setTimeout(() => {
        let responseText = "Understood. Refining the selection.";
        if (input.toLowerCase().includes('budget') || input.toLowerCase().includes('price')) {
            responseText = "Filtering for talent under $2,000/day.";
        } else if (input.toLowerCase().includes('editorial')) {
             responseText = "Prioritizing high-fashion editorial portfolios.";
        }

        setMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'cura',
            text: responseText,
            timestamp: 'Now'
        }]);
    }, 1500);
  };

  const handleBookToggle = (id: number) => {
    if (bookedTalent.includes(id)) {
        setBookedTalent(bookedTalent.filter(mId => mId !== id));
    } else {
        setBookedTalent([...bookedTalent, id]);
        setMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'cura',
            text: `Added ${MOCK_MODELS.find(m => m.id === id)?.name} to shortlist.`,
            timestamp: 'Now'
        }]);
    }
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden font-sans text-[#111111]">
      
      {/* Left Panel: Concierge Chat (Luxury Style) */}
      <div className="w-full md:w-[380px] bg-white border-r border-gray-100 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#111111] rounded-full flex items-center justify-center text-white shadow-lg shadow-black/10">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="font-serif text-lg font-medium text-[#111111]">Cura Agent</h1>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Casting Director</span>
                    </div>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onNavigate('overview')} className="hover:bg-gray-50 rounded-full">
                <X className="w-5 h-5 text-gray-400" />
            </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white scrollbar-hide">
            {messages.map((msg) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                    <div className={`
                        max-w-[85%] p-4 text-sm leading-relaxed
                        ${msg.sender === 'user' 
                            ? 'bg-[#111111] text-white rounded-[20px] rounded-br-sm' 
                            : 'bg-[#FAFAFA] text-gray-600 rounded-[20px] rounded-bl-sm border border-gray-100'}
                    `}>
                        {msg.text}
                    </div>
                    
                    {msg.action === 'review_models' && !showModels && (
                         <button 
                            onClick={() => setShowModels(true)}
                            className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all mt-1"
                         >
                            Review Shortlist <ArrowRight className="w-3 h-3" />
                         </button>
                    )}
                    
                    <span className="text-[10px] text-gray-300 font-medium px-1">{msg.timestamp}</span>
                </motion.div>
            ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-100">
            <div className="relative group">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type instructions..."
                    className="w-full pl-4 pr-12 py-4 bg-[#FAFAFA] border-transparent rounded-[18px] text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-200 focus:shadow-sm transition-all placeholder:text-gray-400"
                />
                <button 
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-[14px] flex items-center justify-center text-[#111111] shadow-sm hover:shadow-md hover:scale-105 transition-all"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>

      {/* Right Panel: Content (Editorial Grid) */}
      <div className="flex-1 overflow-y-auto bg-[#FAFAFA] p-6 lg:p-12 relative">
        <div className="max-w-[1200px] mx-auto">
            
            {/* Context Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                     <button onClick={() => onNavigate('overview')} className="text-gray-400 hover:text-[#111111] mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Dashboard
                     </button>
                     <h2 className="text-4xl font-serif text-[#111111] mb-3">Talent Shortlist</h2>
                     <p className="text-gray-500 max-w-lg">
                        Cura has pre-vetted these 4 profiles based on your visual direction and schedule availability.
                     </p>
                </div>
                <div className="flex items-center gap-4">
                     <div className="flex -space-x-3">
                        {bookedTalent.map(id => {
                            const m = MOCK_MODELS.find(mod => mod.id === id);
                            return (
                                <div key={id} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                                    <img src={m?.image} alt={m?.name} className="w-full h-full object-cover" />
                                </div>
                            );
                        })}
                        {bookedTalent.length > 0 && (
                            <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center border-2 border-white text-xs font-medium">
                                {bookedTalent.length}
                            </div>
                        )}
                     </div>
                     
                     <Button 
                       disabled={bookedTalent.length === 0}
                       onClick={() => onNavigate('casting-availability')}
                       className="bg-[#111111] text-white hover:bg-black rounded-xl px-6 h-12 shadow-lg shadow-black/10 disabled:opacity-50 disabled:shadow-none"
                     >
                       Confirm Selection
                       <ChevronRight className="w-4 h-4 ml-2" />
                     </Button>
                </div>
            </div>

            {/* Models Grid */}
            <AnimatePresence>
                {showModels ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                    >
                        {MOCK_MODELS.map((model, idx) => (
                            <ModelCard 
                                key={model.id}
                                model={model}
                                isSelected={bookedTalent.includes(model.id)}
                                onToggle={() => handleBookToggle(model.id)}
                                index={idx}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[50vh] text-center max-w-md mx-auto">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-gray-200/50 animate-pulse">
                            <Sparkles className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-serif text-[#111111] mb-3">Awaiting Agent Input</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Cura is standing by. Use the chat panel on the left to initiate the search or review the proposed shortlist.
                        </p>
                    </div>
                )}
            </AnimatePresence>

        </div>
      </div>

    </div>
  );
}

// --- Subcomponent: Model Card (Polaroid Style) ---

function ModelCard({ model, isSelected, onToggle, index }: { model: any, isSelected: boolean, onToggle: () => void, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
                group relative bg-white rounded-[20px] p-3 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500 cursor-pointer
                ${isSelected ? 'ring-2 ring-[#111111]' : ''}
            `}
            onClick={onToggle}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] rounded-[16px] overflow-hidden bg-gray-100 mb-4">
                <img 
                    src={model.image} 
                    alt={model.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[10%] group-hover:grayscale-0" 
                />
                
                {/* Match Score */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md pl-2 pr-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-white/20">
                     <div className="relative w-4 h-4 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-[#111111]" strokeDasharray={`${model.matchScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                     </div>
                     <span className="text-[10px] font-bold text-[#111111]">{model.matchScore}%</span>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                    <div className="absolute inset-0 bg-[#111111]/10 flex items-center justify-center backdrop-blur-[1px]">
                        <div className="bg-white text-[#111111] px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Selected
                        </div>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif text-lg text-[#111111] group-hover:text-indigo-600 transition-colors">{model.name}</h3>
                    <span className="text-xs font-medium text-gray-400 mt-1">{model.rate}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <MapPin className="w-3 h-3" />
                    {model.location}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {model.tags.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-[10px] uppercase tracking-wider font-medium">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Hidden Hover Action */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    <p className="text-[10px] text-gray-500 leading-snug bg-gray-50 p-3 rounded-xl mb-1">
                        "<span className="italic">{model.matchReason}</span>"
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
