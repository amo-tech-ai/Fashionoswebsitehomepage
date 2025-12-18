import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles, 
  Check, 
  Edit2, 
  MessageSquare, 
  Info, 
  ChevronDown, 
  ChevronUp,
  Globe,
  Instagram,
  ShoppingBag,
  Search,
  Camera,
  Sun,
  CloudRain,
  Users,
  Zap,
  Clock,
  ArrowRight,
  Facebook,
  Youtube,
  Monitor,
  LayoutGrid
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// --- Types ---

interface AICardData {
  id: string;
  title: string;
  value: string | string[];
  rationale: string;
  confidence: 'High' | 'Medium' | 'Low';
  sources: ('Website' | 'Instagram' | 'Shopify' | 'Amazon' | 'Search')[];
  details?: string[];
}

interface ChannelData {
  name: string;
  icon: React.ElementType;
  types: string[];
  quantity: 'Low' | 'Medium' | 'High';
  note: string;
}

// --- Mock Data ---

const SECTION_1_DATA: AICardData[] = [
  {
    id: 'product-category',
    title: 'Product Category',
    value: "Women's Luxury Knitwear",
    rationale: "Detected from 'Cashmere Collection' keywords and Shopify product tags.",
    confidence: 'High',
    sources: ['Website', 'Shopify'],
    details: ['Focus on texture', 'Drape is key feature']
  },
  {
    id: 'material-needs',
    title: 'Material & Detail Needs',
    value: "High Texture Detail",
    rationale: "Knit patterns require macro-capable lighting to show quality.",
    confidence: 'High',
    sources: ['Instagram', 'Website'],
    details: ['Reflective risk: Low', 'Macro shots required']
  },
  {
    id: 'model-req',
    title: 'Model Requirement',
    value: "With Model (Lifestyle)",
    rationale: "Brand aesthetic relies heavily on 'lived-in luxury' human connection.",
    confidence: 'High',
    sources: ['Instagram'],
  },
  {
    id: 'movement',
    title: 'Movement Needs',
    value: "Static + Subtle Sway",
    rationale: "Video loops showing fabric movement are high-performing on this channel.",
    confidence: 'Medium',
    sources: ['Search'],
  }
];

const CHANNELS_DATA: ChannelData[] = [
  { name: 'Instagram', icon: Instagram, types: ['Feed Photos', 'Reels (9:16)'], quantity: 'High', note: 'Lifestyle focus, warm tones' },
  { name: 'TikTok', icon: Zap, types: ['BTS Short-form'], quantity: 'Medium', note: 'Authentic, less polished' },
  { name: 'Website', icon: Monitor, types: ['Hero Banners', 'Lookbook'], quantity: 'Medium', note: 'Wide landscape crops needed' },
  { name: 'Shopify', icon: ShoppingBag, types: ['PDP Listing Images'], quantity: 'High', note: 'Clean background, consistent lighting' },
];

const SECTION_3_DATA: AICardData[] = [
  {
    id: 'budget',
    title: 'Budget Range',
    value: "$2,500 - $4,000 / day",
    rationale: "Based on competitor analysis for 'Emerging Luxury' tier.",
    confidence: 'Medium',
    sources: ['Search'],
  },
  {
    id: 'environment',
    title: 'Environment',
    value: "Indoor (Architectural)",
    rationale: "Controlled lighting needed for texture, but 'home' vibe fits brand story.",
    confidence: 'High',
    sources: ['Website', 'Instagram'],
    details: ['Rain backup not required (Indoor)']
  },
  {
    id: 'light',
    title: 'Light Preference',
    value: "Natural + Fill",
    rationale: "Soft, diffused daylight matches the 'Calm Luxury' brand palette.",
    confidence: 'High',
    sources: ['Instagram'],
  },
  {
    id: 'walls',
    title: 'Surface/Wall Preference',
    value: "Warm Neutrals, Plaster, Wood",
    rationale: "Avoid sterile white; brand DNA is earthy and organic.",
    confidence: 'High',
    sources: ['Website'],
  }
];

const SECTION_4_DATA: AICardData[] = [
  {
    id: 'logistics',
    title: 'Logistics',
    value: ["Crew Size: Small (4-6)", "Travel: < 45 mins from CBD"],
    rationale: "Optimizing for budget and efficiency.",
    confidence: 'High',
    sources: ['Search'],
  }
];

// --- Component ---

export function ScoutSetup({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFBF9] pb-24 font-sans text-gray-900 relative">
      
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Button variant="ghost" size="icon" onClick={() => onNavigate('overview')}>
                <ArrowLeft className="w-5 h-5 text-gray-500" />
             </Button>
             <div>
               <h1 className="font-serif text-lg font-medium text-gray-900">Scout Setup</h1>
               <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  <span>AI Analysis Complete</span>
               </div>
             </div>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex text-xs h-8">
            View Source Data
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">

        {/* Intro */}
        <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 flex items-start gap-4">
           <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-purple-600" />
           </div>
           <div>
              <h2 className="font-serif text-lg text-purple-900 mb-1">Analysis Report</h2>
              <p className="text-sm text-purple-800/80 leading-relaxed">
                I've analyzed your brand signals from <strong>Website</strong>, <strong>Instagram</strong>, and <strong>Shopify</strong>. 
                Below are the recommended requirements for your upcoming shoot location to ensure high-performing content.
              </p>
           </div>
        </div>

        {/* SECTION 1: What are we shooting? */}
        <section>
          <SectionHeader title="01. What are we shooting?" />
          <div className="grid gap-4">
            {SECTION_1_DATA.map((card) => (
              <AICard key={card.id} data={card} />
            ))}
          </div>
        </section>

        {/* SECTION 2: Where will this live? */}
        <section>
          <SectionHeader title="02. Where will this content live?" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {CHANNELS_DATA.map((channel) => (
              <ChannelCard key={channel.name} data={channel} />
            ))}
          </div>
        </section>

        {/* SECTION 3: Location Requirements */}
        <section>
          <SectionHeader title="03. Location Requirements" />
          <div className="grid gap-4">
            {SECTION_3_DATA.map((card) => (
              <AICard key={card.id} data={card} />
            ))}
          </div>
        </section>

         {/* SECTION 4: Constraints */}
         <section>
          <SectionHeader title="04. Constraints & Logistics" />
          <div className="grid gap-4">
            {SECTION_4_DATA.map((card) => (
              <AICard key={card.id} data={card} />
            ))}
          </div>
        </section>

      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent z-30">
        <div className="max-w-3xl mx-auto flex gap-3">
            <Button 
                variant="outline" 
                className="flex-1 bg-white h-12 text-base shadow-sm border-gray-200"
                onClick={() => {}} // Save as default
            >
                Save Draft
            </Button>
            <Button 
                className="flex-[2] bg-gray-900 text-white h-12 text-base hover:bg-black shadow-xl shadow-gray-900/10"
                onClick={() => onNavigate('scout-finder')}
            >
                Continue to Location Finder <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </div>

    </div>
  );
}

// --- Sub-Components ---

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">{title}</h3>
      <div className="h-[1px] bg-gray-100 flex-1" />
    </div>
  );
}

function AICard({ data }: { data: AICardData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState<'pending' | 'accepted'>('pending');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`
        bg-white rounded-xl border transition-all duration-300 overflow-hidden relative
        ${status === 'accepted' ? 'border-green-200 shadow-sm' : 'border-gray-100 shadow-sm hover:shadow-md'}
      `}
    >
        {status === 'accepted' && (
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 z-10" />
        )}

        <div className="p-5">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{data.title}</span>
                <div className="flex gap-2">
                    <ConfidenceBadge level={data.confidence} />
                </div>
            </div>

            <h3 className="font-serif text-xl text-gray-900 mb-3 leading-tight">
                {Array.isArray(data.value) ? data.value.join(", ") : data.value}
            </h3>

            <div className="flex items-start gap-2 mb-4 bg-gray-50 p-3 rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-purple-500 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed italic">"{data.rationale}"</p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                    {data.sources.map(source => (
                        <Badge key={source} variant="secondary" className="text-[10px] h-5 bg-gray-100 text-gray-500 hover:bg-gray-200 font-normal border-0">
                            {source}
                        </Badge>
                    ))}
                </div>
                
                <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setStatus(status === 'pending' ? 'accepted' : 'pending')}
                        className={`
                            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                            ${status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-gray-900 text-white hover:bg-black'}
                        `}
                    >
                        {status === 'accepted' ? (
                            <><Check className="w-3.5 h-3.5" /> Accepted</>
                        ) : (
                            "Accept"
                        )}
                    </button>
                </div>
            </div>
        </div>
        
        {/* Expandable Details */}
        {data.details && (
            <div className="px-5 pb-4">
                 <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 font-medium"
                 >
                    {isExpanded ? 'Hide Details' : 'Show Details'}
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                 </button>
                 <AnimatePresence>
                    {isExpanded && (
                        <motion.ul 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-1 mt-2 overflow-hidden"
                        >
                            {data.details.map((detail, i) => (
                                <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                                    {detail}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                 </AnimatePresence>
            </div>
        )}

    </motion.div>
  );
}

function ChannelCard({ data }: { data: ChannelData }) {
    return (
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:border-indigo-100 hover:shadow-md transition-all">
            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center mb-2 text-gray-700">
                <data.icon className="w-4 h-4" />
            </div>
            <div className="text-sm font-medium text-gray-900 mb-1">{data.name}</div>
            <div className="text-[10px] text-gray-500 leading-tight mb-2 h-8 flex items-center justify-center">
                {data.types[0]}
            </div>
            <Badge variant="outline" className="text-[9px] h-5 border-gray-100 bg-gray-50/50 font-normal">
                {data.quantity} Output
            </Badge>
        </div>
    );
}

function ConfidenceBadge({ level }: { level: AICardData['confidence'] }) {
    const styles = {
        High: "bg-green-50 text-green-700 border-green-100",
        Medium: "bg-amber-50 text-amber-700 border-amber-100",
        Low: "bg-red-50 text-red-700 border-red-100",
    };
    
    return (
        <div className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${styles[level]} flex items-center gap-1`}>
            {level === 'High' && <div className="w-1 h-1 rounded-full bg-green-500" />}
            {level === 'Medium' && <div className="w-1 h-1 rounded-full bg-amber-500" />}
            {level === 'Low' && <div className="w-1 h-1 rounded-full bg-red-500" />}
            {level} Confidence
        </div>
    );
}
