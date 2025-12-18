import React, { useState, useEffect } from 'react';
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
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { useBrandShoot } from '../../context/BrandShootContext';

// Unified Model Data with Matchmaker fields
export const MOCK_MODELS = [
  {
    id: 1,
    name: "Elara V.",
    agency: "Elite Management",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800&h=1000",
    location: "New York, NY",
    tags: ["High Fashion", "Editorial", "Streetwear", "Luxury"],
    rate: "$2,500/day",
    matchScore: 98,
    matchReason: "Perfect alignment with the 'Effortless' campaign tone. Strong street style portfolio.",
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
    matchReason: "Great energy for lifestyle shots. Fits the demographic perfectly.",
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
    tags: ["Editorial", "Avant Garde", "Minimalist"],
    rate: "$3,000/day",
    matchScore: 85,
    matchReason: "Strong editorial look, but may be too high-fashion for casual sets.",
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
    tags: ["Streetwear", "Urban", "Tech"],
    rate: "$2,000/day",
    matchScore: 78,
    matchReason: "Good option for backup. Strong urban portfolio.",
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
      text: `Hello! I'm Cura, your casting director agent. I've analyzed your campaign "${campaignPlan?.strategy?.title || 'Project'}" and its "${campaignPlan?.strategy?.tone || 'Modern'}" tone.`,
      timestamp: 'Just now'
    },
    {
      id: 2,
      sender: 'cura',
      text: "Based on the 'Urban Morning' concept and New York location, I've found 4 models with high availability and style alignment. Shall we review them?",
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

    // Simulate AI Response
    setTimeout(() => {
        let responseText = "I can definitely help with that. Let me adjust the filters.";
        if (input.toLowerCase().includes('budget') || input.toLowerCase().includes('price')) {
            responseText = "I'll filter for models within the $1,500 - $2,000 range. One moment.";
        } else if (input.toLowerCase().includes('red') || input.toLowerCase().includes('hair')) {
             responseText = "Scanning database for models with red hair who match the editorial vibe...";
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
        // Add confirmation message
        setMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'cura',
            text: `Excellent choice! I've added ${MOCK_MODELS.find(m => m.id === id)?.name} to your shortlist. I'll check their specific availability for Oct 24th.`,
            timestamp: 'Now'
        }]);
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFBF9] overflow-hidden font-sans text-gray-900">
      
      {/* Left Panel: Chat Interface */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col z-20 shadow-xl shadow-gray-200/50">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="font-serif text-lg font-medium text-gray-900">Cura</h1>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Online
                    </p>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onNavigate('overview')}>
                <X className="w-5 h-5 text-gray-400" />
            </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50/50">
            {messages.map((msg) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                    {msg.sender === 'cura' && (
                        <Avatar className="w-8 h-8 border border-gray-200 bg-white">
                             <AvatarFallback className="bg-indigo-50 text-indigo-600"><Sparkles className="w-4 h-4" /></AvatarFallback>
                        </Avatar>
                    )}
                    <div className={`
                        max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
                        ${msg.sender === 'user' 
                            ? 'bg-gray-900 text-white rounded-tr-none' 
                            : 'bg-white border border-gray-200 text-gray-600 rounded-tl-none'}
                    `}>
                        {msg.text}
                        {msg.action === 'review_models' && !showModels && (
                            <Button 
                                size="sm" 
                                onClick={() => setShowModels(true)}
                                className="mt-3 w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-0 shadow-none"
                            >
                                View Matches <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Cura to refine results..."
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <button 
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>

      {/* Right Panel: Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#FDFBF9] p-6 lg:p-10 relative">
        <div className="max-w-5xl mx-auto">
            
            {/* Context Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                     <Button variant="ghost" onClick={() => onNavigate('overview')} className="pl-0 text-gray-400 hover:text-gray-900 mb-2">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Overview
                     </Button>
                     <h2 className="text-3xl font-serif text-gray-900 mb-2">Casting Recommendations</h2>
                     <p className="text-gray-500">AI-curated selection based on aesthetic alignment and availability.</p>
                </div>
                <div className="flex gap-3">
                     <Button 
                       variant="outline"
                       onClick={() => onNavigate('casting-availability')}
                       className="bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                     >
                       <CheckCircle2 className="w-4 h-4 mr-2" />
                       Check Availability ({bookedTalent.length})
                     </Button>
                     <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">Oct 24 - 26</span>
                     </div>
                     <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">New York, NY</span>
                     </div>
                </div>
            </div>

            {/* Models Grid */}
            <AnimatePresence>
                {showModels ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_MODELS.map((model, idx) => (
                            <motion.div
                                key={model.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`
                                    group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300
                                    ${bookedTalent.includes(model.id) ? 'ring-2 ring-indigo-600 border-transparent shadow-lg' : 'border-gray-100 hover:shadow-xl hover:-translate-y-1'}
                                `}
                            >
                                {/* Image Area */}
                                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                                    <img src={model.image} alt={model.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    
                                    {/* Match Badge */}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                                        <div className={`w-2 h-2 rounded-full ${model.matchScore > 90 ? 'bg-green-500' : 'bg-amber-500'}`} />
                                        <span className="text-xs font-bold text-gray-900">{model.matchScore}% Match</span>
                                    </div>

                                    {/* AI Insight Overlay (Hover) */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex items-center gap-2 mb-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                                                <Sparkles className="w-3 h-3" /> AI Insight
                                            </div>
                                            <p className="text-sm font-medium leading-relaxed mb-4 text-gray-100">
                                                "{model.matchReason}"
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {model.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Area */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-serif text-lg font-medium text-gray-900">{model.name}</h3>
                                        <span className="text-sm font-medium text-gray-500">{model.rate}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {model.location}
                                    </p>
                                    
                                    <Button 
                                        onClick={() => handleBookToggle(model.id)}
                                        variant={bookedTalent.includes(model.id) ? "default" : "outline"}
                                        className={`w-full ${bookedTalent.includes(model.id) ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                                    >
                                        {bookedTalent.includes(model.id) ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 mr-2" /> Shortlisted
                                            </>
                                        ) : (
                                            "Add to Shortlist"
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto">
                        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Sparkles className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-serif text-gray-900 mb-2">Waiting for Cura...</h3>
                        <p className="text-gray-500 text-sm">Use the chat on the left to review AI recommendations for your upcoming shoot.</p>
                    </div>
                )}
            </AnimatePresence>

        </div>
      </div>

    </div>
  );
}