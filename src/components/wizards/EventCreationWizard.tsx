import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Users, 
  Layout, 
  Building2,
  Shirt,
  Camera,
  UserCheck,
  Clock,
  AlertCircle,
  Info,
  Globe,
  BarChart,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Wand2,
  ArrowRight
} from "lucide-react";

// --- Reusable Components ---

function GeminiButton({ onClick, label, icon: Icon = Sparkles, className = "" }: { onClick?: () => void, label: string, icon?: any, className?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#6B21A8] bg-[#F3E8FF] hover:bg-purple-100 transition-all shadow-sm ${className}`}
    >
      <Icon className="w-4 h-4 text-[#A855F7]" />
      <span>{label}</span>
    </button>
  );
}

function InsightBanner({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warning" | "success" }) {
  const styles = {
    info: "bg-blue-50 border-blue-100 text-blue-900",
    warning: "bg-[#FEF3C7] border-amber-100 text-[#92400E]",
    success: "bg-[#DCFCE7] border-green-100 text-[#166534]"
  };

  const icons = {
    info: Sparkles,
    warning: AlertTriangle,
    success: CheckCircle2
  };

  const Icon = icons[type];

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 ${styles[type]}`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-80" />
      <div className="text-sm leading-relaxed font-medium">{children}</div>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-serif font-medium text-[#1A1A1A] mb-2">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

// --- Mock Data ---

const venues = [
  { id: 1, name: "Skylight Clarkson", capacity: "3,200", location: "SoHo, NYC", image: "linear-gradient(135deg, #e0e7ff 0%, #f5f3ff 100%)", price: "$45,000" },
  { id: 2, name: "Spring Studios", capacity: "1,500", location: "Tribeca, NYC", image: "linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)", price: "$32,000" },
  { id: 3, name: "Brooklyn Navy Yard", capacity: "5,000", location: "Brooklyn, NY", image: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", price: "$28,000" },
];

const layouts = [
  { id: 'straight', name: "Straight Runway", icon: "I", desc: "Classic Linear Flow" },
  { id: 'u-shape', name: "U-Shape", icon: "U", desc: "Max Front Row" },
  { id: 'dual', name: "Dual Runway", icon: "II", desc: "High Volume" },
  { id: 'presentation', name: "Presentation", icon: "O", desc: "Immersive" },
];

const sponsors = [
  { id: 1, name: "Dior", tier: "Platinum", logo: "D", category: "Fashion" },
  { id: 2, name: "Chanel", tier: "Platinum", logo: "C", category: "Fashion" },
  { id: 3, name: "Sephora", tier: "Gold", logo: "S", category: "Beauty" },
  { id: 4, name: "Vogue", tier: "Media", logo: "V", category: "Media" },
  { id: 5, name: "Moët & Chandon", tier: "Gold", logo: "M", category: "Hospitality" },
];

const activations = [
  { id: 1, name: "VIP Lounge", type: "Hospitality" },
  { id: 2, name: "Photo Wall", type: "Social" },
  { id: 3, name: "Influencer Moment", type: "PR" },
  { id: 4, name: "Backstage Live Stream", type: "Digital" },
];

const themePrompts = ["Futuristic Minimalist", "Eco-Conscious Garden", "Urban Industrial", "Renaissance Reborn"];

// --- Main Component ---

export function EventCreationWizard({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "NYFW SS25 – Runway Revolution",
    type: "Runway Show",
    date: "",
    location: "",
    brandUrl: "",
    theme: "Modern minimalism with high-contrast lighting",
    venueId: null as number | null,
    layoutId: "straight",
    models: 25,
    looks: 40,
    selectedSponsors: [1, 2],
    activationTab: "Hospitality",
    selectedActivations: [1],
  });

  const steps = ["Basics", "Venue", "Casting", "Sponsors", "Deliverables", "Review"];

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- Step Renders ---

  const renderStep1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionTitle title="Event Basics" subtitle="Let's define the core identity of your event." />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Forms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Event Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] transition-shadow bg-white text-lg font-medium placeholder:font-normal text-[#1A1A1A]"
              placeholder="e.g. NYFW SS25 Showcase"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Event Type</label>
              <select 
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] transition-shadow bg-white text-[#1A1A1A] font-medium"
              >
                <option>Runway Show</option>
                <option>Showcase</option>
                <option>Presentation</option>
                <option>Pop-up</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date & Time</label>
              <div className="relative">
                <input 
                  type="datetime-local" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] transition-shadow bg-white pl-11 text-[#1A1A1A] font-medium"
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Theme & Vision</label>
                <GeminiButton label="Enhance Theme" onClick={() => handleInputChange("theme", "Ethereal future-tech fusion with bioluminescent accents and brutalist architecture.")} />
             </div>
             <textarea 
              rows={4}
              value={formData.theme}
              onChange={(e) => handleInputChange("theme", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] transition-shadow bg-white resize-none text-[#1A1A1A] leading-relaxed"
            />
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium text-gray-400 py-1.5">Starters:</span>
              {themePrompts.map(prompt => (
                <button 
                  key={prompt}
                  onClick={() => handleInputChange("theme", prompt)}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Assist */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-gray-900" />
                <h3 className="text-sm font-bold text-[#1A1A1A]">Brand Analysis</h3>
             </div>
             <p className="text-xs text-gray-500 mb-4 leading-relaxed">Paste a URL to have Gemini analyze the brand aesthetic automatically.</p>
             <div className="flex gap-2 mb-4">
               <input 
                  type="text" 
                  placeholder="instagram.com/brand"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-900 bg-[#F7F7F5]"
               />
               <button className="px-3 py-2 bg-[#1A1A1A] rounded-lg text-white hover:bg-gray-800 transition-colors">
                 <Wand2 className="w-4 h-4" />
               </button>
             </div>
             <div className="bg-[#F3E8FF] rounded-lg p-3 border border-purple-100">
               <p className="text-xs text-[#6B21A8] font-medium flex gap-2">
                 <Sparkles className="w-3 h-3 shrink-0 mt-0.5" />
                 "Tip: AI can suggest themes based on your last 3 Instagram posts."
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionTitle title="Venue & Layout" subtitle="Select the perfect space and configure your runway." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Venues */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {venues.map(venue => (
                <div 
                  key={venue.id}
                  onClick={() => handleInputChange("venueId", venue.id)}
                  className={`cursor-pointer group rounded-xl border overflow-hidden transition-all relative ${
                    formData.venueId === venue.id ? "border-[#1A1A1A] shadow-md ring-1 ring-[#1A1A1A]" : "border-gray-200 hover:border-gray-400 shadow-sm"
                  }`}
                >
                  <div className="h-40 w-full" style={{ background: venue.image }} />
                  <div className="p-5 bg-white">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-[#1A1A1A] text-lg font-serif">{venue.name}</h4>
                       {formData.venueId === venue.id && <div className="bg-[#1A1A1A] text-white p-1 rounded-full"><Check className="w-3 h-3"/></div>}
                    </div>
                    <p className="text-sm text-gray-500 mb-4 font-medium">{venue.location}</p>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-600 border-t border-gray-100 pt-4">
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {venue.capacity}</span>
                      <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {venue.price}</span>
                    </div>
                  </div>
                </div>
              ))}
           </div>

           <InsightBanner type="info">
              <strong>Gemini Insight:</strong> Based on your guest list of <strong>1,500</strong>, <em>Skylight Clarkson</em> offers the best capacity-to-flow ratio.
           </InsightBanner>
        </div>

        {/* Right Column: Layouts */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <h3 className="text-sm font-bold text-[#1A1A1A] mb-4">Runway Configuration</h3>
          <div className="space-y-3">
            {layouts.map(layout => (
              <div 
                key={layout.id}
                onClick={() => handleInputChange("layoutId", layout.id)}
                className={`cursor-pointer p-3 rounded-lg border transition-all flex items-center gap-3 ${
                  formData.layoutId === layout.id ? "border-[#1A1A1A] bg-gray-50" : "border-gray-100 hover:border-gray-300"
                }`}
              >
                <div className={`w-10 h-10 rounded-md flex items-center justify-center font-serif font-bold text-sm ${
                   formData.layoutId === layout.id ? "bg-[#1A1A1A] text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {layout.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">{layout.name}</p>
                  <p className="text-xs text-gray-500">{layout.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button className="w-full py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A] transition-colors">
              Compare Layouts
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
       <div className="flex justify-between items-center">
         <SectionTitle title="Casting & Flow" subtitle="Design the runway sequence and model lineup." />
         <GeminiButton label="Generate Sequence" />
       </div>

       {/* KPI Cards */}
       <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Models</span>
             <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#1A1A1A]" />
                <span className="text-3xl font-serif font-medium text-[#1A1A1A]">{formData.models}</span>
             </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Looks</span>
             <div className="flex items-center gap-2">
                <Shirt className="w-5 h-5 text-[#1A1A1A]" />
                <span className="text-3xl font-serif font-medium text-[#1A1A1A]">{formData.looks}</span>
             </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Runtime</span>
             <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1A1A1A]" />
                <span className="text-3xl font-serif font-medium text-[#1A1A1A]">18m</span>
             </div>
          </div>
       </div>

       {/* Timeline Visualization */}
       <div className="bg-white border border-gray-200 rounded-xl p-8 overflow-hidden relative group shadow-sm">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
             <button className="text-xs bg-[#1A1A1A] text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors font-medium">Edit Flow</button>
          </div>
          
          <div className="flex items-center justify-between relative">
             <div className="absolute left-0 top-1/2 w-full h-px bg-gray-200 -z-10" />
             
             {[
               { time: "0:00", label: "Intro", type: "Lighting" },
               { time: "0:45", label: "First Look", type: "Model" },
               { time: "5:30", label: "Theme Switch", type: "Music" },
               { time: "12:15", label: "Finale Start", type: "Group" },
               { time: "15:00", label: "Designer Bow", type: "Talent" }
             ].map((point, i) => (
               <div key={i} className="flex flex-col items-center gap-3 bg-white px-2 z-10 cursor-pointer hover:scale-105 transition-transform">
                  <span className="text-xs font-mono font-medium text-gray-400">{point.time}</span>
                  <div className={`w-3 h-3 rounded-full ring-4 ring-white ${i === 0 || i === 4 ? "bg-[#1A1A1A]" : "bg-purple-500"}`} />
                  <div className="text-center">
                     <p className="text-sm font-bold text-[#1A1A1A]">{point.label}</p>
                     <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">{point.type}</p>
                  </div>
               </div>
             ))}
          </div>
       </div>

       <InsightBanner type="warning">
          <strong>Pacing Alert:</strong> The transition between <em>Theme Switch</em> and <em>Finale</em> seems tight. Consider adding 30 seconds buffer.
       </InsightBanner>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionTitle title="Sponsors & Activations" subtitle="Manage partners and brand experiences." />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            {/* Category Tabs */}
            <div className="flex gap-2 border-b border-gray-100 pb-1 overflow-x-auto">
               {["All", "Fashion", "Beauty", "Media", "Hospitality"].map(cat => (
                 <button 
                   key={cat}
                   className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#1A1A1A] whitespace-nowrap"
                 >
                   {cat}
                 </button>
               ))}
            </div>

            {/* Sponsors List */}
            <div className="space-y-3">
               {sponsors.map(sponsor => {
                 const isSelected = formData.selectedSponsors.includes(sponsor.id);
                 return (
                   <div 
                     key={sponsor.id}
                     onClick={() => {
                       const newSelected = isSelected 
                         ? formData.selectedSponsors.filter(id => id !== sponsor.id)
                         : [...formData.selectedSponsors, sponsor.id];
                       handleInputChange("selectedSponsors", newSelected);
                     }}
                     className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all shadow-sm ${
                       isSelected ? "bg-gray-50 border-[#1A1A1A]" : "bg-white border-gray-100 hover:border-gray-300"
                     }`}
                   >
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center font-serif font-bold">
                            {sponsor.logo}
                         </div>
                         <div>
                            <h4 className="font-bold text-[#1A1A1A]">{sponsor.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                               <span>{sponsor.category}</span>
                               <span className="w-1 h-1 rounded-full bg-gray-300" />
                               <span>{sponsor.tier}</span>
                            </div>
                         </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                         isSelected ? "bg-[#1A1A1A] border-[#1A1A1A] text-white" : "border-gray-300 text-transparent"
                      }`}>
                         <Check className="w-3.5 h-3.5" />
                      </div>
                   </div>
                 );
               })}
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-[#F3E8FF] p-6 rounded-xl border border-purple-100 shadow-sm">
               <h3 className="font-bold text-[#6B21A8] mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Suggested Activations
               </h3>
               <p className="text-sm text-purple-900 mb-4 font-medium">Based on <strong>Dior</strong> participation:</p>
               <div className="space-y-2">
                  {["VIP Lounge Customization", "Backstage Beauty Bar", "Arrival Photo Moment"].map(idea => (
                     <div key={idea} className="flex items-center gap-2 bg-white/60 p-2 rounded-lg text-sm text-purple-900 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" /> {idea}
                     </div>
                  ))}
               </div>
               <button className="w-full mt-4 py-2 bg-white text-purple-700 font-medium text-sm rounded-lg shadow-sm hover:bg-purple-50 transition-colors">
                  Generate Sponsor Deck
               </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Analyze New Partner</label>
               <div className="flex gap-2">
                 <input type="text" placeholder="Brand URL" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1A1A1A] bg-[#F7F7F5]" />
                 <button className="p-2 bg-[#1A1A1A] rounded-lg text-white hover:bg-gray-800 transition-colors"><Wand2 className="w-4 h-4"/></button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <SectionTitle title="Deliverables Plan" subtitle="Track tasks across all production teams." />
        <GeminiButton label="Auto-Generate Plan" icon={FileText} />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
         <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
               <tr>
                  <th className="px-6 py-4 font-bold text-[#1A1A1A]">Item</th>
                  <th className="px-6 py-4 font-bold text-[#1A1A1A]">Team / Owner</th>
                  <th className="px-6 py-4 font-bold text-[#1A1A1A]">Deadline</th>
                  <th className="px-6 py-4 font-bold text-[#1A1A1A]">Status</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {[
                 { task: "Runway Floorplan Final", team: "Production", date: "Sep 10", status: "Done" },
                 { task: "Lighting Plot", team: "Tech Director", date: "Sep 12", status: "Pending" },
                 { task: "Casting Confirmed", team: "Casting Dir", date: "Sep 14", status: "Risk" },
                 { task: "Sponsor Logos Vector", team: "Design", date: "Sep 15", status: "Pending" },
               ].map((row, i) => (
                 <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#1A1A1A]">{row.task}</td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2 font-medium">
                       <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                          {row.team.charAt(0)}
                       </div>
                       {row.team}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{row.date}</td>
                    <td className="px-6 py-4">
                       {row.status === 'Done' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#166534]">Complete</span>}
                       {row.status === 'Pending' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF3C7] text-[#92400E]">Pending</span>}
                       {row.status === 'Risk' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEE2E2] text-[#991B1B]">At Risk</span>}
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>

      <InsightBanner type="warning">
         <strong>Risk Detected:</strong> <em>Casting Confirmed</em> is due in 2 days but only 60% of models are locked. Recommended action: Send urgent follow-ups.
      </InsightBanner>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
       <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-serif font-medium text-[#1A1A1A]">Review Event Plan</h2>
          <p className="text-gray-500">Verify all details before creating the event workspace.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="p-2 bg-gray-50 rounded-lg text-[#1A1A1A]"><Calendar className="w-5 h-5" /></div>
                <div>
                   <h3 className="font-bold text-[#1A1A1A]">Event Basics</h3>
                   <p className="text-xs text-gray-500">Overview</p>
                </div>
                <button onClick={() => setStep(1)} className="ml-auto text-xs text-[#1A1A1A] font-semibold underline">Edit</button>
             </div>
             <div className="space-y-2 text-sm text-gray-600 font-medium">
                <div className="flex justify-between"><span>Name:</span> <span className="font-medium text-[#1A1A1A]">{formData.name}</span></div>
                <div className="flex justify-between"><span>Type:</span> <span className="font-medium text-[#1A1A1A]">{formData.type}</span></div>
                <div className="flex justify-between"><span>Theme:</span> <span className="font-medium text-[#1A1A1A] truncate w-40">{formData.theme}</span></div>
             </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="p-2 bg-gray-50 rounded-lg text-[#1A1A1A]"><MapPin className="w-5 h-5" /></div>
                <div>
                   <h3 className="font-bold text-[#1A1A1A]">Venue & Layout</h3>
                   <p className="text-xs text-gray-500">Location</p>
                </div>
                <button onClick={() => setStep(2)} className="ml-auto text-xs text-[#1A1A1A] font-semibold underline">Edit</button>
             </div>
             <div className="space-y-2 text-sm text-gray-600 font-medium">
                <div className="flex justify-between"><span>Venue:</span> <span className="font-medium text-[#1A1A1A]">Skylight Clarkson</span></div>
                <div className="flex justify-between"><span>Layout:</span> <span className="font-medium text-[#1A1A1A]">Straight Runway</span></div>
                <div className="flex justify-between"><span>Capacity:</span> <span className="font-medium text-[#1A1A1A]">3,200 Guests</span></div>
             </div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="p-2 bg-gray-50 rounded-lg text-[#1A1A1A]"><Users className="w-5 h-5" /></div>
                <div>
                   <h3 className="font-bold text-[#1A1A1A]">Casting</h3>
                   <p className="text-xs text-gray-500">Models & Looks</p>
                </div>
                <button onClick={() => setStep(3)} className="ml-auto text-xs text-[#1A1A1A] font-semibold underline">Edit</button>
             </div>
             <div className="space-y-2 text-sm text-gray-600 font-medium">
                <div className="flex justify-between"><span>Models:</span> <span className="font-medium text-[#1A1A1A]">{formData.models} confirmed</span></div>
                <div className="flex justify-between"><span>Looks:</span> <span className="font-medium text-[#1A1A1A]">{formData.looks} styles</span></div>
             </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="p-2 bg-gray-50 rounded-lg text-[#1A1A1A]"><Zap className="w-5 h-5" /></div>
                <div>
                   <h3 className="font-bold text-[#1A1A1A]">Partners</h3>
                   <p className="text-xs text-gray-500">Sponsors</p>
                </div>
                <button onClick={() => setStep(4)} className="ml-auto text-xs text-[#1A1A1A] font-semibold underline">Edit</button>
             </div>
             <div className="space-y-2 text-sm text-gray-600 font-medium">
                <div className="flex justify-between"><span>Sponsors:</span> <span className="font-medium text-[#1A1A1A]">{formData.selectedSponsors.length} selected</span></div>
                <div className="flex justify-between"><span>Activations:</span> <span className="font-medium text-[#1A1A1A]">VIP Lounge +2</span></div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#F7F7F5] z-50 overflow-y-auto">
      <div className="min-h-screen flex flex-col max-w-5xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
             </div>
             <div>
                <h1 className="text-2xl font-serif font-medium text-[#1A1A1A]">New Event</h1>
                <p className="text-sm text-gray-500">AI-Powered Wizard</p>
             </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Step {step} of 6</span>
             <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#1A1A1A] transition-all duration-300" style={{ width: `${(step / 6) * 100}%` }} />
             </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 mb-24">
           {step === 1 && renderStep1()}
           {step === 2 && renderStep2()}
           {step === 3 && renderStep3()}
           {step === 4 && renderStep4()}
           {step === 5 && renderStep5()}
           {step === 6 && renderStep6()}
        </div>

        {/* Footer Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
           <div className="max-w-5xl mx-auto flex items-center justify-between">
              <button 
                onClick={prevStep}
                disabled={step === 1}
                className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                 <ChevronLeft className="w-5 h-5" /> Back
              </button>
              
              {step < 6 ? (
                <button 
                  onClick={nextStep}
                  className="px-8 py-3 bg-[#1A1A1A] text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex items-center gap-2"
                >
                   Next Step <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={onComplete}
                  className="px-8 py-3 bg-[#1A1A1A] text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex items-center gap-2"
                >
                   <Check className="w-5 h-5" /> Create Event Workspace
                </button>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}
