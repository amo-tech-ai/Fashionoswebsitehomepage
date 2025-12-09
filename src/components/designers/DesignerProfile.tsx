import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft,
  ArrowRight,
  Sparkles, 
  MapPin, 
  MoreHorizontal, 
  Plus, 
  Edit, 
  Share2, 
  Mail, 
  Phone, 
  Globe, 
  Instagram, 
  Twitter,
  Calendar,
  CheckCircle,
  Download,
  Image as ImageIcon,
  LayoutGrid,
  FileText,
  Users,
  Briefcase,
  Clock
} from "lucide-react";

interface DesignerProfileProps {
  onNavigate?: (screen: string) => void;
}

type Tab = 'overview' | 'collections' | 'contacts' | 'story' | 'media' | 'assignments';

export function DesignerProfile({ onNavigate }: DesignerProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const designer = {
    name: "Aurelia Noir",
    category: "Luxury Womenswear",
    city: "Paris, France",
    status: "Active",
    bio: "Aurelia Noir redefines modern luxury with a focus on architectural silhouettes and sustainable craftsmanship. Founded in 2018, the brand has quickly become a staple for the avant-garde fashion elite.",
    stats: {
      events: 12,
      engagement: "High",
      collections: 5
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'collections', label: 'Collections' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'story', label: 'Brand Story' },
    { id: 'media', label: 'Media Library' },
    { id: 'assignments', label: 'Assignments' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-6 pb-0">
          
          <div className="mb-6">
            <button 
              onClick={() => onNavigate?.('designers')}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Directory
            </button>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
            <div className="flex items-start gap-5">
               <div className="w-20 h-20 rounded-xl bg-zinc-900 text-white flex items-center justify-center text-3xl font-serif shadow-sm">
                  AN
               </div>
               <div>
                  <div className="flex items-center gap-3 mb-1">
                     <h1 className="text-3xl font-serif font-bold text-gray-900">{designer.name}</h1>
                     <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase border border-emerald-100">{designer.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                     <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {designer.category}</span>
                     <span className="text-gray-300">•</span>
                     <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {designer.city}</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
               <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-full border border-indigo-100 text-indigo-700 text-xs font-bold mr-2">
                  <Sparkles className="w-3 h-3" /> AI Powered Profile
               </div>
               <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Edit
               </button>
               <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share
               </button>
               <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Assign to Event
               </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
             {tabs.map(tab => (
                <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as Tab)}
                   className={`pb-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                      ? "border-gray-900 text-gray-900" 
                      : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                   }`}
                >
                   {tab.label}
                </button>
             ))}
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <OverviewTab designer={designer} />}
            {activeTab === 'collections' && <CollectionsTab />}
            {activeTab === 'contacts' && <ContactsTab />}
            {activeTab === 'story' && <BrandStoryTab />}
            {activeTab === 'media' && <MediaLibraryTab />}
            {activeTab === 'assignments' && <AssignmentsTab />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

// --- Sub Components ---

function OverviewTab({ designer }: { designer: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Col */}
      <div className="lg:col-span-2 space-y-6">
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-serif text-lg font-bold text-gray-900">Brand Summary</h3>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"><Instagram className="w-4 h-4" /></button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"><Twitter className="w-4 h-4" /></button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"><Globe className="w-4 h-4" /></button>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">{designer.bio}</p>
          
          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Design Focus</div>
              <div className="font-medium text-gray-900">Architectural</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Headquarters</div>
              <div className="font-medium text-gray-900">Paris, FR</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Founded</div>
              <div className="font-medium text-gray-900">2018</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-lg font-bold text-gray-900">Portfolio Preview</h3>
            <button className="text-sm text-indigo-600 font-medium hover:underline">View Full Collection</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white/90 rounded-full shadow-sm text-gray-900"><ArrowRight className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Col */}
      <div className="space-y-6">
        
        <div className="bg-gradient-to-br from-indigo-900 to-violet-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Sparkles className="w-24 h-24" />
          </div>
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
                   <Sparkles className="w-4 h-4 text-indigo-200" />
                </div>
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">AI Analysis</span>
             </div>
             <div className="space-y-4 mb-6">
                <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                   <p className="text-sm leading-relaxed">
                      Gemini analyzed portfolio mood: <span className="font-bold text-white">Modern minimalism</span> with high-contrast silhouettes.
                   </p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                   <p className="text-sm leading-relaxed">
                      Strong compatibility with <span className="font-bold text-white">Runway Show X</span> based on audience demographics.
                   </p>
                </div>
             </div>
             <div className="grid grid-cols-1 gap-2">
                <button className="w-full py-2 bg-white text-indigo-900 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">Generate Brand Summary</button>
                <button className="w-full py-2 bg-indigo-800/50 border border-indigo-700/50 text-indigo-100 rounded-lg text-xs font-bold hover:bg-indigo-800 transition-colors">Suggest Event Types</button>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
           <h3 className="font-serif font-bold text-gray-900 mb-4">Performance</h3>
           <div className="space-y-4">
              <div>
                 <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Event Participation</span>
                    <span className="font-medium text-gray-900">8/10</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                 </div>
              </div>
              <div>
                 <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Engagement Score</span>
                    <span className="font-medium text-gray-900">92%</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

function CollectionsTab() {
  const collections = [
    { id: 1, name: "SS25 Noir Lumière", season: "Spring/Summer 2025", items: 24, image: "bg-zinc-800" },
    { id: 2, name: "FW24 Midnight Geometry", season: "Fall/Winter 2024", items: 32, image: "bg-slate-800" },
    { id: 3, name: "Resort 24", season: "Resort 2024", items: 18, image: "bg-indigo-900" },
  ];

  return (
    <div className="space-y-6">
       <div className="flex justify-end">
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
             <Plus className="w-4 h-4" /> Add Collection
          </button>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(col => (
             <div key={col.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                <div className={`h-48 ${col.image} relative`}>
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium shadow-sm">View Looks</button>
                   </div>
                </div>
                <div className="p-5">
                   <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{col.season}</div>
                   <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{col.name}</h3>
                   <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-600">{col.items} Silhouettes</span>
                      <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

function ContactsTab() {
  const contacts = [
    { id: 1, name: "Isabelle Dubois", role: "Creative Director", email: "isabelle@aurelianoir.com", phone: "+33 6 12 34 56 78", bg: "bg-purple-100 text-purple-600" },
    { id: 2, name: "Marc Laurent", role: "Brand Manager", email: "marc@aurelianoir.com", phone: "+33 6 98 76 54 32", bg: "bg-blue-100 text-blue-600" },
    { id: 3, name: "Sophie Marceau", role: "PR Contact", email: "pr@aurelianoir.com", phone: "+33 6 55 44 33 22", bg: "bg-pink-100 text-pink-600" },
  ];

  return (
    <div>
       <div className="flex justify-end mb-6">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
             <Plus className="w-4 h-4" /> Add Contact
          </button>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map(contact => (
             <div key={contact.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${contact.bg}`}>
                   {contact.name.charAt(0)}
                </div>
                <div className="flex-1">
                   <h3 className="font-bold text-gray-900">{contact.name}</h3>
                   <p className="text-sm text-gray-500 mb-4">{contact.role}</p>
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                         <Mail className="w-3 h-3 text-gray-400" /> {contact.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                         <Phone className="w-3 h-3 text-gray-400" /> {contact.phone}
                      </div>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

function BrandStoryTab() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm max-w-4xl mx-auto">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-xl font-bold text-gray-900">Brand Narrative</h3>
          <div className="flex gap-2">
             <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-100 transition-colors">
                <Sparkles className="w-3 h-3" /> Rewrite Bio
             </button>
             <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-100 transition-colors">
                <Sparkles className="w-3 h-3" /> Enhance Storytelling
             </button>
          </div>
       </div>
       
       <div className="prose prose-gray max-w-none">
          <p className="text-lg leading-relaxed text-gray-600 mb-4">
             Aurelia Noir redefines modern luxury with a focus on architectural silhouettes and sustainable craftsmanship. Founded in 2018 in the heart of Paris, the brand has quickly become a staple for the avant-garde fashion elite, merging traditional couture techniques with futuristic materials.
          </p>
          <p className="text-lg leading-relaxed text-gray-600 mb-4">
             Our mission is to empower the modern individual through armor-like construction that doesn't compromise on comfort or fluidity. Each piece tells a story of resilience and elegance.
          </p>
          <div className="my-8 border-l-4 border-indigo-500 pl-6 italic text-gray-700 text-xl font-serif">
             "Fashion is not just about clothing; it is about the architecture of the self." — Aurelia Noir
          </div>
          <p className="text-lg leading-relaxed text-gray-600">
             Sustainability is at the core of our process. We source 100% recycled fabrics from Italy and Japan, ensuring that our footprint is as light as our silk chiffons.
          </p>
       </div>
    </div>
  );
}

function MediaLibraryTab() {
   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
               <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option>All Media</option>
                  <option>Campaigns</option>
                  <option>Runway</option>
                  <option>Lookbooks</option>
               </select>
               <span className="text-sm text-gray-500">24 items</span>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
               <Download className="w-4 h-4" /> Download All
            </button>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 text-center text-gray-500 hover:bg-gray-50 hover:border-indigo-300 transition-colors cursor-pointer bg-gray-50/50">
               <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
               <span className="text-sm font-medium">Upload Media</span>
               <span className="text-xs opacity-70">Drag & drop</span>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
               <div key={i} className="aspect-square bg-gray-200 rounded-xl relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-white text-xs font-medium">Campaign_0{i}.jpg</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

function AssignmentsTab() {
   return (
      <div className="space-y-6">
         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
               <h3 className="font-serif text-lg font-bold text-gray-900">Event Assignments</h3>
               <button className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Assign to Event
               </button>
            </div>
            <div className="divide-y divide-gray-100">
               {[
                  { event: "NYFW SS25", role: "Runway Show", status: "Confirmed", date: "Sep 10, 2025" },
                  { event: "Paris Couture Week", role: "Exhibition", status: "Pending", date: "Oct 05, 2025" },
                  { event: "Milan Fashion Week", role: "Showroom", status: "Completed", date: "Feb 20, 2025" },
               ].map((item, i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                           <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-900">{item.event}</h4>
                           <div className="text-sm text-gray-500 flex items-center gap-2">
                              <span>{item.role}</span>
                              <span className="w-1 h-1 bg-gray-300 rounded-full" />
                              <span>{item.date}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                           item.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' :
                           item.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                           'bg-gray-100 text-gray-600'
                        }`}>
                           {item.status}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                           <MoreHorizontal className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
