import React from "react";
import { Calendar, Globe, Wand2, Sparkles } from "lucide-react";
import { SectionTitle, GeminiButton } from "../shared/WizardComponents";

interface Step1BasicsProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const themePrompts = ["Futuristic Minimalist", "Eco-Conscious Garden", "Urban Industrial", "Renaissance Reborn"];

export function Step1Basics({ formData, handleInputChange }: Step1BasicsProps) {
  return (
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
}
