import { useState } from "react";
import { motion } from "motion/react";
import { 
  MapPin, 
  Users, 
  Star, 
  Download, 
  Calendar as CalendarIcon, 
  Check, 
  ChevronRight, 
  Sparkles,
  Box,
  Zap,
  Sun,
  Wifi,
  Mic2,
  Layout,
  FileText,
  Shield,
  Maximize2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from "lucide-react";

// Define shared types
export interface VenueData {
  id: string;
  name: string;
  location: string;
  city: string;
  capacity: number;
  rating: number;
  type: string;
  tags: string[];
  image: string;
  price: string;
}

interface VenueDetailProps {
  venue?: VenueData;
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

export function VenueDetail({ venue: propVenue, onBack, onNavigate }: VenueDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Default mock data if no venue prop provided
  const defaultVenue: VenueData = {
    id: "1",
    name: "Skylight Clarkson",
    location: "SoHo, NYC",
    city: "NYC",
    capacity: 3200,
    rating: 4.8,
    type: "Industrial",
    tags: ["Runway Ready", "High Ceiling"],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    price: "$45,000 / day"
  };

  const venue = propVenue || defaultVenue;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "gallery", label: "Gallery" },
    { id: "amenities", label: "Amenities" },
    { id: "specs", label: "Technical Specs" },
    { id: "floorplan", label: "Floorplan" },
    { id: "calendar", label: "Booking Calendar" },
    { id: "files", label: "Files" },
    { id: "ai", label: "AI Insights", icon: Sparkles }
  ];

  const files = [
    { name: "Venue Technical Specifications", type: "PDF", size: "2.4 MB", date: "Aug 12, 2025" },
    { name: "Floorplan & Elevations", type: "DWG", size: "14.2 MB", date: "Aug 10, 2025" },
    { name: "Safety & Compliance Docs", type: "PDF", size: "1.1 MB", date: "Jul 28, 2025" },
    { name: "Standard Rental Agreement", type: "PDF", size: "850 KB", date: "Jan 15, 2025" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans animate-in fade-in duration-500 pb-20">
      
      {/* 1. HERO HEADER (VENUE SUMMARY) */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden group">
        <img 
          src={venue.image} 
          alt={venue.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        {/* Breadcrumb */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-10">
          <div className="flex items-center gap-2 text-white/80 text-sm backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
            <button onClick={onBack} className="hover:text-white transition-colors flex items-center gap-1">
              Venues
            </button>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-white font-medium">{venue.name}</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex gap-2 mb-4">
                {venue.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium uppercase tracking-wider rounded border border-white/10 shadow-sm">
                    {tag}
                  </span>
                ))}
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-400/20 backdrop-blur-md text-amber-300 text-xs font-medium uppercase tracking-wider rounded border border-amber-400/30">
                  <Star className="w-3 h-3 fill-amber-300" /> {venue.rating}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-serif mb-3">{venue.name}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-300" /> {venue.location}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-300" /> Capacity {venue.capacity.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-900/20">
                <Check className="w-4 h-4" />
                Select Venue
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Request Booking
              </button>
              <button className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TABS NAVIGATION */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        
        {/* 3. OVERVIEW SECTION */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Left Column: Summary & Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-serif text-gray-900">Venue Overview</h3>
                  <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {venue.name} is a premier {venue.type.toLowerCase()} event space located in the heart of {venue.location}. 
                  Featuring soaring ceilings, industrial-chic aesthetics, and state-of-the-art infrastructure, it serves as 
                  an ideal canvas for high-impact runway shows, product launches, and immersive brand experiences.
                </p>
                
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Key Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Users className="w-5 h-5" /></div>
                    <div>
                      <div className="text-sm text-gray-500">Maximum Capacity</div>
                      <div className="font-medium text-gray-900">{venue.capacity.toLocaleString()} Guests</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><MapPin className="w-5 h-5" /></div>
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium text-gray-900">{venue.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Layout className="w-5 h-5" /></div>
                    <div>
                      <div className="text-sm text-gray-500">Event Compatibility</div>
                      <div className="font-medium text-gray-900">Runway, Presentation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600"><CalendarIcon className="w-5 h-5" /></div>
                    <div>
                      <div className="text-sm text-gray-500">Availability</div>
                      <div className="font-medium text-gray-900">Available Sep 9–12</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Amenities Preview */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="font-medium text-gray-900">Highlight Features</h4>
                   <button onClick={() => setActiveTab('amenities')} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">View All</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="p-3 bg-gray-50 rounded-lg text-center">
                     <Zap className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                     <div className="text-xs text-gray-600">Lighting Rig</div>
                   </div>
                   <div className="p-3 bg-gray-50 rounded-lg text-center">
                     <Box className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                     <div className="text-xs text-gray-600">Backstage</div>
                   </div>
                   <div className="p-3 bg-gray-50 rounded-lg text-center">
                     <Wifi className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                     <div className="text-xs text-gray-600">10Gbps Fiber</div>
                   </div>
                   <div className="p-3 bg-gray-50 rounded-lg text-center">
                     <Shield className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                     <div className="text-xs text-gray-600">Private Entry</div>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Column: AI Insights */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Sparkles className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Sparkles className="w-4 h-4 text-indigo-200" />
                    </div>
                    <h3 className="font-medium text-lg font-serif">Gemini Insights</h3>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <h5 className="text-xs text-indigo-200 uppercase tracking-wide mb-1">Capacity Analysis</h5>
                      <p className="text-sm text-white leading-snug">Optimal venue for expected attendance (1,540). 85% usage density creates high energy.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <h5 className="text-xs text-indigo-200 uppercase tracking-wide mb-1">Acoustics</h5>
                      <p className="text-sm text-white leading-snug">Strong acoustic performance for runway audio; minimal dampening needed.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <h5 className="text-xs text-indigo-200 uppercase tracking-wide mb-1">Recommendation</h5>
                      <p className="text-sm text-white leading-snug">Recommend backstage expansion into Suite B during peak traffic.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <button className="w-full py-2.5 bg-white text-indigo-900 text-sm font-medium rounded-lg hover:bg-indigo-50 transition-colors shadow-sm">
                      Generate Full Venue Report
                    </button>
                    <button className="w-full py-2.5 bg-indigo-900/50 text-white text-sm font-medium rounded-lg border border-white/20 hover:bg-indigo-900/70 transition-colors">
                      Compare With Other Venues
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-4">Venue Manager</h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">JD</div>
                  <div>
                    <div className="font-medium text-gray-900">James Dalton</div>
                    <div className="text-sm text-gray-500">Technical Director</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">Contact Host</button>
                  <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">Schedule Site Visit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. GALLERY SECTION */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className={`rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all group relative aspect-[4/3]`}>
                  <img 
                    src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1505236858219-8359eb29e329' : '1519167758481-83f550bb49b3'}?q=80&w=800&auto=format&fit=crop`}
                    alt="Venue Gallery"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900 shadow-sm">
                      {i % 3 === 0 ? "Main Hall" : i % 3 === 1 ? "Backstage" : "VIP Entrance"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button className="px-6 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                Open Full Gallery
              </button>
            </div>
          </div>
        )}

        {/* 5. AMENITIES SECTION */}
        {activeTab === 'amenities' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-serif text-gray-900">Venue Amenities</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {[
                { icon: Box, label: "Dressing Rooms", desc: "5 private suites with mirrors" },
                { icon: Zap, label: "Lighting Rig", desc: "Full truss system support" },
                { icon: Sun, label: "Climate Control", desc: "Industrial HVAC system" },
                { icon: Layout, label: "VIP Lounge", desc: "Dedicated mezzanine area" },
                { icon: Mic2, label: "Sound System", desc: "Integrated PA + Acoustics" },
                { icon: Wifi, label: "Connectivity", desc: "10Gbps fiber internet" },
                { icon: Maximize2, label: "Vendor Access", desc: "Wide double-door entry" },
                { icon: Shield, label: "Security", desc: "24/7 onsite surveillance" },
                { icon: Clock, label: "Access Hours", desc: "Flexible 24-hour booking" },
              ].map((item, i) => (
                <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{item.label}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. TECHNICAL SPECS SECTION */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-serif text-gray-900">Technical Specifications</h3>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center gap-1">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
              
              <div className="space-y-0 divide-y divide-gray-100">
                {[
                  { label: "Total Floor Area", value: "45,000 sq ft" },
                  { label: "Ceiling Height", value: "24 ft clear" },
                  { label: "Stage Depth", value: "40 ft (adjustable)" },
                  { label: "Power Load", value: "3 x 400 Amp 3-Phase" },
                  { label: "Connectivity", value: "10Gbps Fiber Optic" },
                  { label: "Load-in Access", value: "Drive-in dock (14' clearance)" },
                  { label: "Floor Load Capacity", value: "250 psf" },
                  { label: "Rigging Points", value: "56 points rated @ 2000lbs" },
                  { label: "Fire Exits", value: "8 dedicated exits" },
                  { label: "Acoustic Treatment", value: "Sound-dampening panels installed" },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-center py-4">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-medium text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-xl p-8 text-white shadow-lg">
                 <h3 className="text-lg font-serif mb-4">Production Notes</h3>
                 <p className="text-gray-300 leading-relaxed mb-6">
                   "The lighting grid is pre-installed, which typically saves 4-6 hours of load-in time. 
                   However, for heavy LED wall usage, additional generator power may be required as the house power is shared with the HVAC system."
                 </p>
                 <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                   <h4 className="text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
                     <AlertCircle className="w-4 h-4 text-amber-400" /> Important Limitation
                   </h4>
                   <p className="text-xs text-gray-400">Strict noise curfew applies after 11:00 PM. Any amplified sound must be reduced by 40% after this time.</p>
                 </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-4">Supported Configurations</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-gray-600">Runway (Seated)</span>
                     <span className="font-medium">850 pax</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: "85%" }}></div>
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2">
                     <span className="text-gray-600">Cocktail / Standing</span>
                     <span className="font-medium">1,200 pax</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: "100%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm pt-2">
                     <span className="text-gray-600">Dinner (Round Tables)</span>
                     <span className="font-medium">500 pax</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. FLOORPLAN SECTION */}
        {activeTab === 'floorplan' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl font-serif text-gray-900">Floorplan Layout</h3>
                <p className="text-sm text-gray-500">Standard Runway Configuration A</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                  View 3D Layout
                </button>
                <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download DWG
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-[16/9] bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden group">
               {/* SVG Floorplan */}
               <svg viewBox="0 0 800 450" className="w-full h-full text-gray-300 p-8">
                 <rect x="50" y="50" width="700" height="350" fill="white" stroke="currentColor" strokeWidth="2" />
                 {/* Runway */}
                 <rect x="150" y="180" width="500" height="90" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                 <text x="400" y="230" textAnchor="middle" fill="#4B5563" className="text-sm uppercase tracking-widest font-medium">Runway Zone</text>
                 
                 {/* Seating Blocks */}
                 <rect x="150" y="100" width="500" height="60" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1" />
                 <text x="400" y="135" textAnchor="middle" fill="#6366F1" className="text-xs uppercase tracking-widest font-medium">North Seating</text>
                 
                 <rect x="150" y="290" width="500" height="60" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1" />
                 <text x="400" y="325" textAnchor="middle" fill="#6366F1" className="text-xs uppercase tracking-widest font-medium">South Seating</text>

                 {/* Backstage */}
                 <rect x="50" y="50" width="100" height="350" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
                 <text x="100" y="225" textAnchor="middle" fill="#9CA3AF" className="text-xs uppercase tracking-widest" transform="rotate(-90 100 225)">Backstage</text>

                 {/* Control Booth */}
                 <rect x="650" y="180" width="60" height="90" fill="#FDF4FF" stroke="#F0ABFC" strokeWidth="1" />
                 <text x="680" y="230" textAnchor="middle" fill="#C026D3" className="text-[10px] uppercase tracking-widest" transform="rotate(90 680 230)">Control</text>
               </svg>
               
               {/* Minimap */}
               <div className="absolute bottom-6 right-6 w-32 h-20 bg-white border border-gray-200 shadow-md rounded p-1 opacity-90">
                 <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[8px] text-gray-400">Overall Map</div>
               </div>
            </div>
          </div>
        )}

        {/* 8. BOOKING CALENDAR SECTION */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-serif text-gray-900">Booking Availability</h3>
               <div className="flex gap-2">
                 <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors shadow-sm">
                   Request Booking
                 </button>
                 <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                   Add to Event Schedule
                 </button>
               </div>
             </div>

             <div className="flex flex-col lg:flex-row gap-8">
               <div className="flex-1">
                 {/* Calendar Grid UI Placeholder */}
                 <div className="border border-gray-200 rounded-xl overflow-hidden">
                   <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                     <span className="font-medium text-gray-900">September 2025</span>
                     <div className="flex gap-1">
                       <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeft className="w-4 h-4" /></button>
                       <button className="p-1 hover:bg-gray-200 rounded"><ChevronRightIcon className="w-4 h-4" /></button>
                     </div>
                   </div>
                   <div className="grid grid-cols-7 text-center text-xs text-gray-500 py-2 border-b border-gray-100">
                     <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                   </div>
                   <div className="grid grid-cols-7 text-sm">
                     {[...Array(30)].map((_, i) => {
                       const day = i + 1;
                       const isBooked = day >= 8 && day <= 10;
                       const isSelected = day === 12;
                       return (
                         <div key={i} className={`h-24 border-b border-r border-gray-50 p-2 relative ${
                           isBooked ? 'bg-red-50/50' : 'hover:bg-gray-50'
                         }`}>
                           <span className={`text-gray-900 ${isSelected ? 'font-bold' : ''}`}>{day}</span>
                           {isBooked && (
                             <div className="mt-2 text-[10px] bg-red-100 text-red-700 px-1 py-0.5 rounded border border-red-200 truncate">Booked</div>
                           )}
                           {isSelected && (
                             <div className="mt-2 text-[10px] bg-indigo-100 text-indigo-700 px-1 py-0.5 rounded border border-indigo-200 truncate">Selected</div>
                           )}
                         </div>
                       )
                     })}
                   </div>
                 </div>
               </div>

               <div className="w-full lg:w-80 space-y-4">
                 <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                   <h4 className="font-medium text-gray-900 mb-3 text-sm">Legend</h4>
                   <div className="space-y-2">
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                       <div className="w-3 h-3 bg-white border border-gray-300 rounded-sm"></div>
                       <span>Available</span>
                     </div>
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                       <div className="w-3 h-3 bg-red-100 border border-red-200 rounded-sm"></div>
                       <span>Booked / Unavailable</span>
                     </div>
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                       <div className="w-3 h-3 bg-amber-100 border border-amber-200 rounded-sm"></div>
                       <span>Tentative Hold</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        )}

        {/* 9. FILES SECTION */}
        {activeTab === 'files' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-serif text-gray-900">Venue Documents</h3>
               <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                 <Download className="w-4 h-4" /> Download All
               </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {files.map((file, i) => (
                 <div key={i} className="p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer flex items-start gap-4">
                   <div className="p-3 bg-gray-50 rounded-lg text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                     <FileText className="w-6 h-6" />
                   </div>
                   <div className="flex-1">
                     <h4 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-indigo-700">{file.name}</h4>
                     <div className="flex items-center gap-3 text-xs text-gray-400">
                       <span className="uppercase">{file.type}</span>
                       <span>•</span>
                       <span>{file.size}</span>
                       <span>•</span>
                       <span>{file.date}</span>
                     </div>
                   </div>
                   <button className="text-gray-300 hover:text-indigo-600">
                     <Download className="w-4 h-4" />
                   </button>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* AI SECTION (Fallback for the tab) */}
        {activeTab === 'ai' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            {/* Same AI content as in overview, repeated here if user clicks tab directly */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        <Sparkles className="w-5 h-5 text-indigo-200" />
                      </div>
                      <h3 className="font-serif text-2xl">Gemini Venue Analysis</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                        <h4 className="font-medium mb-2 text-indigo-100">Capacity Assessment</h4>
                        <p className="text-sm leading-relaxed text-indigo-50">
                          This venue has optimal capacity for your expected attendance of 2,800. 
                          With the runway configuration, you will have 85% occupancy, which creates a high-energy atmosphere without overcrowding.
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                         <h4 className="font-medium mb-2 text-indigo-100">Layout Recommendation</h4>
                         <p className="text-sm leading-relaxed text-indigo-50">
                           Based on past events of this type, we recommend adding temporary partitioning in the south wing to create a discrete celebrity entrance.
                         </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                   <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-3">Risk Factors</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-gray-600">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>Limited parking availability nearby</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-600">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>Strict noise curfew after 11 PM</span>
                      </li>
                    </ul>
                  </div>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}