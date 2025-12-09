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
      className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md ${className}`}
    >
      <Icon className="w-4 h-4 animate-pulse" />
      <span>{label}</span>
      <div className="absolute inset-0 rounded-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
    </button>
  );
}

function InsightBanner({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warning" | "success" }) {
  const styles = {
    info: "bg-indigo-50 border-indigo-100 text-indigo-900",
    warning: "bg-amber-50 border-amber-100 text-amber-900",
    success: "bg-emerald-50 border-emerald-100 text-emerald-900"
  };

  const icons = {
    info: Sparkles,
    warning: AlertTriangle,
    success: CheckCircle2
  };

  const Icon = icons[type];

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 ${styles[type]}`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-serif font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
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
            <label className="text-sm font-medium text-gray-700">Event Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow bg-white text-lg font-medium placeholder:font-normal"
              placeholder="e.g. NYFW SS25 Showcase"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Type</label>
              <select 
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow bg-white"
              >
                <option>Runway Show</option>
                <option>Showcase</option>
                <option>Presentation</option>
                <option>Pop-up</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date & Time</label>
              <div className="relative">
                <input 
                  type="datetime-local" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow bg-white pl-11"
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Theme & Vision</label>
                <GeminiButton label="Enhance Theme" onClick={() => handleInputChange("theme", "Ethereal future-tech fusion with bioluminescent accents and brutalist architecture.")} />
             </div>
             <textarea 
              rows={4}
              value={formData.theme}
              onChange={(e) => handleInputChange("theme", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow bg-white resize-none text-gray-600 leading-relaxed"
            />
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium text-gray-400 py-1.5">Starters:</span>
              {themePrompts.map(prompt => (
                <button 
                  key={prompt}
                  onClick={() => handleInputChange("theme", prompt)}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-gray-100 transition-colors"
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
                <Globe className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-gray-900">Brand Analysis</h3>
             </div>
             <p className="text-xs text-gray-500 mb-3">Paste a URL to have Gemini analyze the brand aesthetic automatically.</p>
             <div className="flex gap-2 mb-4">
               <input 
                  type="text" 
                  placeholder="instagram.com/brand"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-900"
               />
               <button className="px-3 py-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
                 <Wand2 className="w-4 h-4" />
               </button>
             </div>
             <div className="bg-indigo-50 rounded-lg p-3">
               <p className="text-xs text-indigo-800 italic">
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
                  className={`cursor-pointer group rounded-xl border-2 overflow-hidden transition-all relative ${
                    formData.venueId === venue.id ? "border-gray-900 shadow-lg ring-1 ring-gray-900" : "border-transparent hover:border-gray-200 shadow-sm"
                  }`}
                >
                  <div className="h-40 w-full" style={{ background: venue.image }} />
                  <div className="p-5 bg-white">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-gray-900 text-lg">{venue.name}</h4>
                       {formData.venueId === venue.id && <div className="bg-gray-900 text-white p-1 rounded-full"><Check className="w-3 h-3"/></div>}
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{venue.location}</p>
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
          <h3 className="text-sm font-bold text-gray-900 mb-4">Runway Configuration</h3>
          <div className="space-y-3">
            {layouts.map(layout => (
              <div 
                key={layout.id}
                onClick={() => handleInputChange("layoutId", layout.id)}
                className={`cursor-pointer p-3 rounded-lg border transition-all flex items-center gap-3 ${
                  formData.layoutId === layout.id ? "border-gray-900 bg-gray-50" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`w-10 h-10 rounded-md flex items-center justify-center font-mono font-bold text-sm ${
                   formData.layoutId === layout.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {layout.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{layout.name}</p>
                  <p className="text-xs text-gray-500">{layout.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button className="w-full py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors">
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
                <UserCheck className="w-5 h-5 text-gray-900" />
                <span className="text-3xl font-serif font-bold text-gray-900">{formData.models}</span>
             </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Looks</span>
             <div className="flex items-center gap-2">
                <Shirt className="w-5 h-5 text-gray-900" />
                <span className="text-3xl font-serif font-bold text-gray-900">{formData.looks}</span>
             </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Runtime</span>
             <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-900" />
                <span className="text-3xl font-serif font-bold text-gray-900">18m</span>
             </div>
          </div>
       </div>

       {/* Timeline Visualization */}
       <div className="bg-white border border-gray-200 rounded-xl p-8 overflow-hidden relative group">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
             <button className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-full">Edit Flow</button>
          </div>
          
          <div className="flex items-center justify-between relative">
             <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-100 -z-10" />
             
             {[
               { time: "0:00", label: "Intro", type: "Lighting" },
               { time: "0:45", label: "First Look", type: "Model" },
               { time: "5:30", label: "Theme Switch", type: "Music" },
               { time: "12:15", label: "Finale Start", type: "Group" },
               { time: "15:00", label: "Designer Bow", type: "Talent" }
             ].map((point, i) => (
               <div key={i} className="flex flex-col items-center gap-3 bg-white px-2 z-10 cursor-pointer hover:scale-110 transition-transform">
                  <span className="text-xs font-mono font-medium text-gray-400">{point.time}</span>
                  <div className={`w-4 h-4 rounded-full ring-4 ring-white ${i === 0 || i === 4 ? "bg-gray-900" : "bg-indigo-500"}`} />
                  <div className="text-center">
                     <p className="text-sm font-bold text-gray-900">{point.label}</p>
                     <p className="text-[10px] text-gray-500 uppercase tracking-wide">{point.type}</p>
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
                   className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap"
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
                     className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                       isSelected ? "bg-gray-50 border-gray-900" : "bg-white border-gray-100 hover:border-gray-200"
                     }`}
                   >
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-serif font-bold">
                            {sponsor.logo}
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900">{sponsor.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                               <span>{sponsor.category}</span>
                               <span className="w-1 h-1 rounded-full bg-gray-300" />
                               <span>{sponsor.tier}</span>
                            </div>
                         </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                         isSelected ? "bg-gray-900 border-gray-900 text-white" : "border-gray-300 text-transparent"
                      }`}>
                         <Check className="w-3.5 h-3.5" />
                      </div>
                   </div>
                 );
               })}
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
               <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Suggested Activations
               </h3>
               <p className="text-sm text-indigo-800 mb-4">Based on <strong>Dior</strong> participation:</p>
               <div className="space-y-2">
                  {["VIP Lounge Customization", "Backstage Beauty Bar", "Arrival Photo Moment"].map(idea => (
                     <div key={idea} className="flex items-center gap-2 bg-white/60 p-2 rounded-lg text-sm text-indigo-900">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" /> {idea}
                     </div>
                  ))}
               </div>
               <button className="w-full mt-4 py-2 bg-white text-indigo-600 font-medium text-sm rounded-lg shadow-sm hover:bg-indigo-50 transition-colors">
                  Generate Sponsor Deck
               </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Analyze New Partner</label>
               <div className="flex gap-2">
                 <input type="text" placeholder="Brand URL" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                 <button className="p-2 bg-gray-100 rounded-lg text-gray-600"><Wand2 className="w-4 h-4"/></button>
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
                  <th className="px-6 py-4 font-bold text-gray-900">Item</th>
                  <th className="px-6 py-4 font-bold text-gray-900">Team / Owner</th>
                  <th className="px-6 py-4 font-bold text-gray-900">Deadline</th>
                  <th className="px-6 py-4 font-bold text-gray-900">Status</th>
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
                    <td className="px-6 py-4 font-medium text-gray-900">{row.task}</td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                          {row.team.charAt(0)}
                       </div>
                       {row.team}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{row.date}</td>
                    <td className="px-6 py-4">
                       {row.status === 'Done' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Complete</span>}
                       {row.status === 'Pending' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">On Track</span>}
                       {row.status === 'Risk' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">At Risk</span>}
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
          <h2 className="text-3xl font-serif font-bold text-gray-900">Review Event Plan</h2>
          <p className="text-gray-500">Verify all details before creating the event workspace.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-900"><Calendar className="w-5 h-5" /></div>
                <div>
                   <h3 className="font-bold text-gray-900">Event Basics</h3>
                   <p className="text-xs text-gray-500">Overview</p>
                </div>
                <button onClick={() => setStep(1)} className="ml-auto text-xs text-indigo-600 font-medium">Edit</button>
             </div>
             <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between"><span>Name:</span> <span className="font-medium text-gray-900">{formData.name}</span></div>
                <div className="flex justify-between"><span>Type:</span> <span className="font-medium text-gray-900">{formData.type}</span></div>
                <div className="flex justify-between"><span>Theme:</span> <span className="font-medium text-gray-900 truncate w-40">{formData.theme}</span></div>
             </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-900"><MapPin className="w-5 h-5" /></div>
                <div>
                   <h3 className="font-bold text-gray-900">Venue & Layout</h3>
                   <p className="text-xs text-gray-500">Location</p>
                </div>
                <button onClick={() => setStep(2)} className="ml-auto text-xs text-indigo-600 font-medium">Edit</button>
             </div>
             <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between"><span>Venue:</span> <span className="font-medium text-gray-900">Skylight Clarkson</span></div>
                <div className="flex justify-between"><span>Layout:</span> <span className="font-medium text-gray-900">Straight Runway</span></div>
                <div className="flex justify-between"><span>Capacity:</span> <span className="font-medium text-gray-900">3,200</span></div>
             </div>
          </div>

           {/* Card 3 */}
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-900"><UserCheck className="w-5 h-5" /></div>
                <div>
                   <h3 className="font-bold text-gray-900">Production</h3>
                   <p className="text-xs text-gray-500">Casting & Tech</p>
                </div>
                <button onClick={() => setStep(3)} className="ml-auto text-xs text-indigo-600 font-medium">Edit</button>
             </div>
             <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between"><span>Models:</span> <span className="font-medium text-gray-900">{formData.models}</span></div>
                <div className="flex justify-between"><span>Looks:</span> <span className="font-medium text-gray-900">{formData.looks}</span></div>
                <div className="flex justify-between"><span>Runtime:</span> <span className="font-medium text-gray-900">18 mins</span></div>
             </div>
          </div>

           {/* Card 4 */}
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-900"><Handshake className="w-5 h-5" /></div>
                <div>
                   <h3 className="font-bold text-gray-900">Sponsors</h3>
                   <p className="text-xs text-gray-500">Partnerships</p>
                </div>
                <button onClick={() => setStep(4)} className="ml-auto text-xs text-indigo-600 font-medium">Edit</button>
             </div>
             <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between"><span>Partners:</span> <span className="font-medium text-gray-900">Dior, Chanel</span></div>
                <div className="flex justify-between"><span>Activations:</span> <span className="font-medium text-gray-900">VIP Lounge</span></div>
             </div>
          </div>
       </div>

       <div className="flex flex-col md:flex-row gap-4 items-stretch">
         <div className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-6 flex items-center justify-between shadow-lg">
            <div>
               <h4 className="font-bold text-lg mb-1">Generate Event Brief</h4>
               <p className="text-sm text-gray-300">Create a PDF summary for stakeholders.</p>
            </div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm backdrop-blur-sm transition-colors border border-white/20">
               Generate PDF
            </button>
         </div>
         <div className="flex-1 border border-gray-200 rounded-xl p-6 bg-white">
            <div className="flex items-start gap-3">
               <Info className="w-5 h-5 text-indigo-600 mt-0.5" />
               <div>
                  <h4 className="font-bold text-gray-900 text-sm">Final Suggestion</h4>
                  <p className="text-sm text-gray-600 mt-1">Your production timeline is aggressive. Consider moving <em>Lighting Plot</em> up by 2 days.</p>
               </div>
            </div>
         </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans text-gray-900">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <button onClick={() => onComplete?.()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                   <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <div>
                   <h1 className="text-xl font-bold text-gray-900">Create New Event</h1>
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>FashionOS Wizard</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>AI-Assisted</span>
                   </div>
                </div>
             </div>
             <div className="hidden md:block text-right">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Step {step} of {steps.length}</span>
                <p className="text-sm font-bold text-indigo-600">{steps[step-1]}</p>
             </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
             <motion.div 
                className="h-full bg-gray-900"
                initial={{ width: 0 }}
                animate={{ width: `${(step / steps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
             />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
        <AnimatePresence mode="wait">
           <motion.div
             key={step}
             initial={{ opacity: 0, x: 10 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -10 }}
             transition={{ duration: 0.3 }}
           >
             {step === 1 && renderStep1()}
             {step === 2 && renderStep2()}
             {step === 3 && renderStep3()}
             {step === 4 && renderStep4()}
             {step === 5 && renderStep5()}
             {step === 6 && renderStep6()}
           </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0 z-30 py-5 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors ${
              step === 1 
                ? "text-gray-300 cursor-not-allowed" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-3">
             <span className="text-xs text-gray-400 hidden sm:inline-block mr-4">
                {step === 6 ? "Ready to finalize?" : "Changes saved automatically"}
             </span>
            {step === 6 && (
              <button className="px-6 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors">
                Save Draft
              </button>
            )}
            <button 
              onClick={() => step === 6 ? onComplete?.() : nextStep()}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 shadow-lg shadow-gray-900/20 transition-all flex items-center gap-2 group"
            >
              {step === 6 ? "Create Event" : "Next Step"} 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Handshake(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11 17 2 2a2 2 0 0 0 2.83 0l3.58-3.59a2 2 0 0 0 0-2.83l-4-4a2 2 0 0 0-2.83 0L6 15" />
      <path d="m22 18-2 2-4-4" />
      <path d="m2 21 2-2 4 4" />
      <path d="M13 6l-4 4L2 3v11" />
    </svg>
  )
}
