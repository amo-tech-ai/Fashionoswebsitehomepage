import React from "react";
import { Check, Users, Building2 } from "lucide-react";
import { SectionTitle, InsightBanner } from "../shared/WizardComponents";

interface Step2VenueProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

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

export function Step2Venue({ formData, handleInputChange }: Step2VenueProps) {
  return (
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
}
