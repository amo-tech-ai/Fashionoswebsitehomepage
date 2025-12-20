import React from "react";
import { Calendar, MapPin, Users, Zap } from "lucide-react";

interface Step6ReviewProps {
  formData: any;
  setStep: (step: number) => void;
}

export function Step6Review({ formData, setStep }: Step6ReviewProps) {
  return (
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
}
