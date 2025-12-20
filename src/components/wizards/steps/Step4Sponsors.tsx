import React from "react";
import { Check, Sparkles, CheckCircle2, Wand2 } from "lucide-react";
import { SectionTitle } from "../shared/WizardComponents";

interface Step4SponsorsProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const sponsors = [
  { id: 1, name: "Dior", tier: "Platinum", logo: "D", category: "Fashion" },
  { id: 2, name: "Chanel", tier: "Platinum", logo: "C", category: "Fashion" },
  { id: 3, name: "Sephora", tier: "Gold", logo: "S", category: "Beauty" },
  { id: 4, name: "Vogue", tier: "Media", logo: "V", category: "Media" },
  { id: 5, name: "Moët & Chandon", tier: "Gold", logo: "M", category: "Hospitality" },
];

export function Step4Sponsors({ formData, handleInputChange }: Step4SponsorsProps) {
  return (
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
                         ? formData.selectedSponsors.filter((id: number) => id !== sponsor.id)
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
}
