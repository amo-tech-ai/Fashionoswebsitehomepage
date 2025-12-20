import React from "react";
import { UserCheck, Shirt, Clock } from "lucide-react";
import { SectionTitle, GeminiButton, InsightBanner } from "../shared/WizardComponents";

interface Step3CastingProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

export function Step3Casting({ formData, handleInputChange }: Step3CastingProps) {
  return (
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
}
