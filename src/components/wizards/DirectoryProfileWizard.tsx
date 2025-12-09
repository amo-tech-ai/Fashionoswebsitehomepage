import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  MapPin, 
  Globe, 
  Instagram, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Image as ImageIcon, 
  Tag, 
  Upload, 
  Link as LinkIcon, 
  Palette, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Wand2,
  AlertCircle,
  Camera,
  Loader2
} from "lucide-react";

// --- Reusable Components ---

function GeminiButton({ onClick, label, icon: Icon = Sparkles, className = "", disabled = false }: { onClick?: () => void, label: string, icon?: any, className?: string, disabled?: boolean }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      <Icon className={`w-4 h-4 ${disabled ? 'animate-spin' : 'animate-pulse'}`} />
      <span>{label}</span>
      {!disabled && <div className="absolute inset-0 rounded-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />}
    </button>
  );
}

function SectionTitle({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-serif font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1 max-w-2xl">{subtitle}</p>}
    </div>
  );
}

// --- Mock Data ---

const categoriesList = [
  "Womenswear", "Menswear", "Couture", "Accessories", "Footwear", "Swim", "Bridal", "Jewelry", "Streetwear"
];

const highlightsList = [
  "Sustainable", "Luxury", "Runway", "Emerging Designer", "Celebrity Dressing", "Handmade", "Tech-Enabled"
];

const mockAnalysis = {
  summary: "Aurelia Noir is a contemporary luxury label focusing on minimalist silhouettes with avant-garde detailing. The brand emphasizes sustainability and craftsmanship.",
  aesthetic: "Minimalist, Avant-garde, Monochromatic, Structured",
  colors: ["#1A1A1A", "#F5F5F5", "#D4AF37", "#708090"],
  tags: ["Luxury", "Minimalism", "Parisian"],
  images: [
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=300&h=400",
    "https://images.unsplash.com/photo-1550614000-4b9519e02d96?auto=format&fit=crop&q=80&w=300&h=400",
    "https://images.unsplash.com/photo-1509631179647-b8a262c9fb7d?auto=format&fit=crop&q=80&w=300&h=400"
  ]
};

// --- Main Component ---

export function DirectoryProfileWizard({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "Aurelia Noir",
    city: "Paris",
    country: "France",
    type: "Luxury Womenswear",
    bio: "",
    website: "",
    instagram: "",
    tiktok: "",
    pinterest: "",
    colors: [] as string[],
    selectedCategories: [] as string[],
    selectedHighlights: [] as string[],
    images: [] as string[],
    tags: [] as string[]
  });

  const steps = ["Basics", "Brand Links", "Visual Identity", "Categories", "Review"];

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSelection = (field: "selectedCategories" | "selectedHighlights", item: string) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(item) 
        ? current.filter(i => i !== item) 
        : [...current, item];
      return { ...prev, [field]: updated };
    });
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setHasAnalyzed(true);
      setIsAnalyzing(false);
      setFormData(prev => ({
        ...prev,
        bio: mockAnalysis.summary,
        colors: mockAnalysis.colors,
        tags: mockAnalysis.tags,
        images: mockAnalysis.images,
        selectedCategories: ["Womenswear", "Couture"],
        selectedHighlights: ["Luxury", "Runway"]
      }));
    }, 2000);
  };

  // --- Step Renders ---

  const renderStep1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionTitle title="Designer Basics" subtitle="Start by providing the core details of the designer or brand profile." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Designer / Brand Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow bg-white text-lg"
              placeholder="e.g. Aurelia Noir"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <div className="relative">
                 <input 
                  type="text" 
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow bg-white pl-10"
                  placeholder="Paris"
                />
                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Brand Type</label>
              <select 
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow bg-white"
              >
                <option>Luxury Womenswear</option>
                <option>Menswear Label</option>
                <option>Couture House</option>
                <option>Accessory Studio</option>
                <option>Independent Designer</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Short Bio</label>
                <button 
                  onClick={() => handleInputChange("bio", "Founded in Paris, Aurelia Noir redefines modern luxury through architectural silhouettes and sustainable craftsmanship.")}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Generate Bio
                </button>
             </div>
             <textarea 
              rows={5}
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow bg-white resize-none leading-relaxed text-gray-600"
              placeholder="Tell the story of the brand..."
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 h-fit">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg shadow-sm text-gray-900"><User className="w-5 h-5" /></div>
              <h3 className="font-bold text-gray-900">Profile Preview</h3>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
              <div className="w-12 h-12 bg-gray-900 rounded-full mb-3 flex items-center justify-center text-white font-serif text-xl">
                 {formData.name.charAt(0)}
              </div>
              <h4 className="font-bold text-gray-900">{formData.name}</h4>
              <p className="text-xs text-gray-500 mb-2">{formData.city} • {formData.type}</p>
              <p className="text-xs text-gray-600 line-clamp-3">{formData.bio || "No bio provided yet."}</p>
           </div>
           <p className="text-xs text-gray-500 text-center">This is how the card will appear in the directory.</p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionTitle title="Brand Links & Analysis" subtitle="Connect social profiles and let Gemini extract brand intelligence." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Link Inputs */}
        <div className="lg:col-span-5 space-y-5">
           <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Instagram URL</label>
              <div className="relative">
                 <input 
                  type="text" 
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                  placeholder="instagram.com/brandname"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                />
                <Instagram className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Website URL</label>
              <div className="relative">
                 <input 
                  type="text" 
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="www.brand.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                />
                <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">TikTok (Optional)</label>
              <div className="relative">
                 <input 
                  type="text" 
                  value={formData.tiktok}
                  onChange={(e) => handleInputChange("tiktok", e.target.value)}
                  placeholder="tiktok.com/@brand"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                />
                <div className="w-5 h-5 flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">TT</div>
              </div>
           </div>
           
           <div className="pt-4">
              <GeminiButton 
                label={isAnalyzing ? "Analyzing Brand..." : "Analyze with Gemini"} 
                onClick={simulateAnalysis}
                disabled={isAnalyzing || hasAnalyzed}
                icon={isAnalyzing ? Loader2 : Wand2}
                className="w-full justify-center py-3"
              />
              <p className="text-xs text-gray-500 mt-3 text-center">
                Gemini will extract brand tone, aesthetic keywords, and visual assets.
              </p>
           </div>
        </div>

        {/* Analysis Results */}
        <div className="lg:col-span-7">
           <AnimatePresence mode="wait">
             {!hasAnalyzed ? (
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }}
                 className="h-full border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-12 text-center bg-gray-50"
               >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                     <Sparkles className="w-6 h-6 text-gray-300" />
                  </div>
                  <h3 className="font-bold text-gray-400 text-lg">Ready to Analyze</h3>
                  <p className="text-gray-400 text-sm max-w-xs mt-2">Enter URLs on the left and click Analyze to unlock AI insights.</p>
               </motion.div>
             ) : (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
               >
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 border-b border-indigo-100 flex items-center gap-2">
                     <Sparkles className="w-4 h-4 text-indigo-600" />
                     <span className="font-bold text-indigo-900 text-sm">Gemini Analysis Complete</span>
                  </div>
                  <div className="p-6 space-y-6">
                     <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Brand Summary</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{mockAnalysis.summary}</p>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Aesthetic</h4>
                           <div className="flex flex-wrap gap-2">
                              {mockAnalysis.aesthetic.split(', ').map(tag => (
                                 <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">{tag}</span>
                              ))}
                           </div>
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Top Collections</h4>
                           <ul className="text-sm text-gray-600 space-y-1">
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500"/> SS25 "Eclipse"</li>
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500"/> FW24 "Structure"</li>
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500"/> Resort '24</li>
                           </ul>
                        </div>
                     </div>

                     <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Extracted Assets</h4>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                           {mockAnalysis.images.map((img, i) => (
                              <div key={i} className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200 relative">
                                 <img src={img} alt="Asset" className="w-full h-full object-cover" />
                                 <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                              </div>
                           ))}
                           <div className="w-20 h-20 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-medium border border-dashed border-gray-200">
                              +5 More
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
       <SectionTitle title="Visual Identity" subtitle="Curate the imagery and colors that define the brand presence." />

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Imagery */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Brand Imagery</h3>
                <button className="text-xs font-medium text-indigo-600 flex items-center gap-1 hover:bg-indigo-50 px-2 py-1 rounded transition-colors">
                   <Upload className="w-3 h-3" /> Upload New
                </button>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                {formData.images.length > 0 ? formData.images.map((img, i) => (
                   <div key={i} className="aspect-[3/4] rounded-xl bg-gray-100 overflow-hidden relative group cursor-pointer">
                      <img src={img} alt="Brand visual" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <button className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                         <Check className="w-4 h-4 text-gray-900" />
                      </button>
                   </div>
                )) : (
                   [1, 2].map(i => (
                      <div key={i} className="aspect-[3/4] rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                         <ImageIcon className="w-8 h-8 mb-2" />
                         <span className="text-xs font-medium">Select Image</span>
                      </div>
                   ))
                )}
             </div>
          </div>

          {/* Right: Identity & Logo */}
          <div className="space-y-6">
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Brand Logo</h3>
                <div className="flex items-center gap-6">
                   <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-300 hover:border-gray-300 transition-colors cursor-pointer">
                      <Camera className="w-8 h-8" />
                   </div>
                   <div>
                      <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700">
                         Upload Logo
                      </button>
                      <p className="text-xs text-gray-400 mt-2">Recommended: 500x500px PNG</p>
                   </div>
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold text-gray-900">Gemini Style Summary</h3>
                   <Sparkles className="w-4 h-4 text-indigo-500" />
                </div>
                
                <div className="space-y-5">
                   <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Extracted Palette</h4>
                      <div className="flex gap-3">
                         {formData.colors.length > 0 ? formData.colors.map((color, i) => (
                            <div key={i} className="group relative">
                               <div className="w-12 h-12 rounded-full border border-gray-200 shadow-sm cursor-pointer transition-transform hover:scale-110" style={{ backgroundColor: color }} />
                               <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">{color}</span>
                            </div>
                         )) : (
                            <p className="text-sm text-gray-400 italic">Run analysis to extract colors.</p>
                         )}
                      </div>
                   </div>

                   <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Style Descriptors</h4>
                      <div className="flex flex-wrap gap-2">
                         {formData.tags.length > 0 ? formData.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                               # {tag}
                            </span>
                         )) : (
                            <span className="text-sm text-gray-400 italic">No tags generated yet.</span>
                         )}
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
       <div className="flex justify-between items-center">
         <SectionTitle title="Categories & Highlights" subtitle="Define where this brand fits in the directory ecosystem." />
         <GeminiButton label="Suggest Categories" onClick={() => toggleSelection("selectedCategories", "Womenswear")} />
       </div>

       <div className="space-y-8">
          {/* Categories */}
          <div>
             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" /> Market Categories
             </h3>
             <div className="flex flex-wrap gap-3">
                {categoriesList.map(cat => {
                   const isSelected = formData.selectedCategories.includes(cat);
                   return (
                      <button
                        key={cat}
                        onClick={() => toggleSelection("selectedCategories", cat)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                           isSelected 
                           ? "bg-gray-900 text-white border-gray-900 shadow-md transform scale-105" 
                           : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                      >
                         {cat}
                      </button>
                   );
                })}
             </div>
          </div>

          <div className="w-full h-px bg-gray-100" />

          {/* Highlights */}
          <div>
             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> Directory Highlights
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {highlightsList.map(highlight => {
                   const isSelected = formData.selectedHighlights.includes(highlight);
                   return (
                      <div
                        key={highlight}
                        onClick={() => toggleSelection("selectedHighlights", highlight)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                           isSelected 
                           ? "bg-indigo-50 border-indigo-200 text-indigo-900" 
                           : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                         <span className="font-medium">{highlight}</span>
                         {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                      </div>
                   );
                })}
             </div>
          </div>
       </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
       <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Review Profile</h2>
          <p className="text-gray-500">Confirm details before publishing to the directory.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overview Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <User className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-gray-900">Overview</h3>
                <button onClick={() => setStep(1)} className="ml-auto text-xs font-medium text-indigo-600">Edit</button>
             </div>
             <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">Name</dt> <dd className="font-medium">{formData.name}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Type</dt> <dd className="font-medium">{formData.type}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Location</dt> <dd className="font-medium">{formData.city}, {formData.country}</dd></div>
             </dl>
          </div>

          {/* Visuals Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <Palette className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-gray-900">Visual Identity</h3>
                <button onClick={() => setStep(3)} className="ml-auto text-xs font-medium text-indigo-600">Edit</button>
             </div>
             <div className="space-y-4">
                <div className="flex gap-2">
                   {formData.colors.map((c, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: c }} />
                   ))}
                   {formData.colors.length === 0 && <span className="text-sm text-gray-400">No colors extracted</span>}
                </div>
                <div className="flex gap-2">
                   {formData.images.slice(0, 3).map((img, i) => (
                      <div key={i} className="w-12 h-12 rounded bg-gray-100 overflow-hidden"><img src={img} className="w-full h-full object-cover" /></div>
                   ))}
                </div>
             </div>
          </div>

          {/* Categories Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all md:col-span-2">
             <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <Tag className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-gray-900">Categories & Highlights</h3>
                <button onClick={() => setStep(4)} className="ml-auto text-xs font-medium text-indigo-600">Edit</button>
             </div>
             <div className="flex flex-wrap gap-2">
                {formData.selectedCategories.map(c => (
                   <span key={c} className="px-2.5 py-1 bg-gray-100 rounded text-xs font-medium text-gray-800">{c}</span>
                ))}
                {formData.selectedHighlights.map(h => (
                   <span key={h} className="px-2.5 py-1 bg-indigo-50 rounded text-xs font-medium text-indigo-700">{h}</span>
                ))}
             </div>
          </div>
       </div>
       
       <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex gap-3 items-start">
          <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
             <h4 className="font-bold text-indigo-900 text-sm">AI Suggestion</h4>
             <p className="text-sm text-indigo-800 mt-1">Consider adding "Sustainable" to your highlights based on the detected fabric descriptions in your bio.</p>
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
                   <h1 className="text-xl font-bold text-gray-900">Create Designer Profile</h1>
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Directory Wizard</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>New Entry</span>
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
            {step === 5 && (
              <button className="px-6 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors">
                Save Draft
              </button>
            )}
            <button 
              onClick={() => step === 5 ? onComplete?.() : nextStep()}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 shadow-lg shadow-gray-900/20 transition-all flex items-center gap-2 group"
            >
              {step === 5 ? "Create Profile" : "Next Step"} 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
