import { useState } from "react";
import { toast } from "sonner";
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
} from "lucide-react";
import { useSponsor } from "../../context/SponsorContext";
import { useEvent } from "../../context/EventContext";

// Import Steps
import { Step1Basics } from "./steps/Step1Basics";
import { Step2Venue } from "./steps/Step2Venue";
import { Step3Casting } from "./steps/Step3Casting";
import { Step4Sponsors } from "./steps/Step4Sponsors";
import { Step5Deliverables } from "./steps/Step5Deliverables";
import { Step6Review } from "./steps/Step6Review";

// Shared data for lookup (could be in a separate file)
const MOCK_SPONSORS_LOOKUP = [
  { id: 1, name: "Dior", tier: "Platinum", logo: "D", category: "Fashion", amount: 150000 },
  { id: 2, name: "Chanel", tier: "Platinum", logo: "C", category: "Fashion", amount: 125000 },
  { id: 3, name: "Sephora", tier: "Gold", logo: "S", category: "Beauty", amount: 80000 },
  { id: 4, name: "Vogue", tier: "Media", logo: "V", category: "Media", amount: 0 }, // Media partners often barter
  { id: 5, name: "Moët & Chandon", tier: "Gold", logo: "M", category: "Hospitality", amount: 60000 },
];

export function EventCreationWizard({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1);
  const { addSponsor } = useSponsor();
  const { createEvent } = useEvent();
  
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

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    // 1. Create the Event in EventContext
    createEvent({
      name: formData.name,
      type: 'runway_show', // Simple mapping for now
      status: 'planning',
      start_date: formData.date || new Date().toISOString(),
      attendee_target: 3000, // Based on venue selection
      budget_total: 500000,
      
      // Enriched Data for AI
      theme: formData.theme,
      models_count: formData.models,
      looks_count: formData.looks,
      venue_name: formData.location || "TBD",
      mood_keywords: formData.theme.split(' ').filter(w => w.length > 3), // Simple keyword extraction
    });

    // 2. Add selected sponsors to the CRM Context
    formData.selectedSponsors.forEach(sponsorId => {
        const sponsorData = MOCK_SPONSORS_LOOKUP.find(s => s.id === sponsorId);
        if (sponsorData) {
            addSponsor({
                event_id: 'new-event-001', // Ideally this ID comes from the created event
                company_name: sponsorData.name,
                tier: sponsorData.tier as any,
                amount: sponsorData.amount,
                status: 'proposal', // Start them at proposal stage
                contact_name: 'TBD',
                fit_score: 85 + Math.floor(Math.random() * 10), // Mock high fit score
                notes: `Added via Event Wizard for ${formData.name}`
            });
        }
    });

    // 3. Complete Wizard
    onComplete?.();
  };

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
           {step === 1 && <Step1Basics formData={formData} handleInputChange={handleInputChange} />}
           {step === 2 && <Step2Venue formData={formData} handleInputChange={handleInputChange} />}
           {step === 3 && <Step3Casting formData={formData} handleInputChange={handleInputChange} />}
           {step === 4 && <Step4Sponsors formData={formData} handleInputChange={handleInputChange} />}
           {step === 5 && <Step5Deliverables />}
           {step === 6 && <Step6Review formData={formData} setStep={setStep} />}
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
                  onClick={handleComplete}
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
