import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  FileText, 
  Camera, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  ChevronDown 
} from 'lucide-react';
import { Button } from '../ui/button';
import { useBrandShoot } from '../../context/BrandShootContext';
import { ContractModal } from './ContractModal';

// --- Types ---

interface ServiceOption {
  id: string;
  label: string;
  price: number; // 0 if included
  category: 'Pre-Production' | 'Production' | 'Post-Production';
  defaultSelected: boolean;
}

// --- Mock Data ---

const AVAILABLE_SERVICES: ServiceOption[] = [
  // Pre-Production
  { id: 'strategy', label: 'Creative Strategy & Moodboards', price: 0, category: 'Pre-Production', defaultSelected: true },
  { id: 'casting', label: 'Talent Casting & Booking', price: 500, category: 'Pre-Production', defaultSelected: true },
  { id: 'location', label: 'Location Scouting', price: 350, category: 'Pre-Production', defaultSelected: false },
  
  // Production
  { id: 'photo', label: 'Photography (1 Day)', price: 0, category: 'Production', defaultSelected: true },
  { id: 'video', label: 'Social Video Coverage', price: 1200, category: 'Production', defaultSelected: true },
  { id: 'stylist', label: 'Wardrobe Stylist', price: 0, category: 'Production', defaultSelected: true },
  { id: 'hmua', label: 'Hair & Makeup Artist', price: 800, category: 'Production', defaultSelected: true },
  
  // Post-Production
  { id: 'retouch', label: 'High-End Retouching (26 Assets)', price: 0, category: 'Post-Production', defaultSelected: true },
  { id: 'editing', label: 'Video Editing (Reels/TikTok)', price: 1000, category: 'Post-Production', defaultSelected: false },
];

export function ProposalReady({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { campaignPlan } = useBrandShoot();
  const [showContract, setShowContract] = useState(false);
  
  // Initialize state with default selected services
  const [selectedServices, setSelectedServices] = useState<Set<string>>(() => {
    return new Set(AVAILABLE_SERVICES.filter(s => s.defaultSelected).map(s => s.id));
  });

  // Base price from the context or default
  const basePrice = 3500; // Base fee not covering the itemized add-ons
  
  // Calculate totals
  const { total, deposit } = useMemo(() => {
    const servicesTotal = AVAILABLE_SERVICES.reduce((acc, service) => {
      if (selectedServices.has(service.id)) {
        return acc + service.price;
      }
      return acc;
    }, 0);
    
    const grandTotal = basePrice + servicesTotal;
    return {
      total: grandTotal,
      deposit: grandTotal * 0.5
    };
  }, [selectedServices]);

  const toggleService = (id: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedServices(newSelected);
  };

  const planTitle = campaignPlan?.strategy?.title || "Andrewmajtenyi Summer '25";

  // Group services
  const groupedServices = useMemo(() => {
    const groups: Record<string, ServiceOption[]> = {};
    AVAILABLE_SERVICES.forEach(s => {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    });
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans text-[#111111] pb-40">
      
      {/* Header Status */}
      <div className="pt-12 pb-8 text-center px-4">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 bg-[#2FBF71]/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-6 h-6 text-[#2FBF71]" />
        </motion.div>
        <h1 className="font-serif text-3xl md:text-4xl mb-2 text-[#111111]">Proposal Ready</h1>
        <p className="text-[#6B6B6B]">Everything is prepared. Review and launch your campaign.</p>
      </div>

      <div className="max-w-[800px] mx-auto px-4 md:px-6 space-y-6">
        
        {/* Main Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-50"
        >
          <div className="p-8 md:p-10">
            {/* Card Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-2">
              <div>
                <h2 className="font-serif text-3xl leading-tight mb-2">{planTitle}</h2>
                <p className="text-[10px] font-bold tracking-widest text-[#6B6B6B] uppercase">
                  INCLUDES {26} ASSETS • FULL PRODUCTION
                </p>
              </div>
              <div className="font-sans font-medium text-2xl tabular-nums">
                ${total.toLocaleString()}
              </div>
            </div>

            <div className="h-px bg-gray-100 my-8" />

            {/* Sections Grid */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-4">
              
              {/* Strategy */}
              <div className="flex md:flex-col gap-4 md:gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0 text-gray-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#111111] mb-1">Creative Strategy</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    AI-generated moodboards, shot list, and channel plan optimized for conversion.
                  </p>
                </div>
              </div>

              {/* Scope */}
              <div className="flex md:flex-col gap-4 md:gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0 text-gray-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#111111] mb-1">Production Scope</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    Photography & video • 1 studio day • 1 model • 2 stylists
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex md:flex-col gap-4 md:gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0 text-gray-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#111111] mb-1">Timeline</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    Kickoff: <span className="text-[#111111] font-medium">Today</span><br/>
                    Final Delivery: <span className="text-[#111111] font-medium">Jan 1</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* AI Trust Indicator */}
            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <p className="text-xs text-gray-400">
                Plan optimized by Gemini 3 Pro based on your brand guidelines.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Customize Scope Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden"
        >
          <div className="p-8 md:p-10">
            <div className="mb-6">
              <h3 className="font-serif text-xl text-[#111111] mb-1">Customize Scope</h3>
              <p className="text-sm text-[#6B6B6B]">Add or remove production services. Pricing updates instantly.</p>
            </div>

            <div className="space-y-8">
              {(Object.keys(groupedServices) as Array<keyof typeof groupedServices>).map((category) => (
                <div key={category}>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{category}</h4>
                  <div className="space-y-3">
                    {groupedServices[category].map((service) => {
                      const isSelected = selectedServices.has(service.id);
                      return (
                        <div 
                          key={service.id}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group ${
                            isSelected 
                              ? 'bg-[#FAF9F7] border-gray-200' 
                              : 'bg-white border-transparent hover:bg-gray-50'
                          }`}
                          onClick={() => toggleService(service.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              isSelected 
                                ? 'bg-[#111111] border-[#111111]' 
                                : 'bg-white border-gray-300 group-hover:border-gray-400'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className={`text-sm font-medium ${isSelected ? 'text-[#111111]' : 'text-gray-500'}`}>
                              {service.label}
                            </span>
                          </div>
                          {service.price > 0 && (
                            <div className="text-sm text-gray-500 tabular-nums">
                              +${service.price}
                            </div>
                          )}
                          {service.price === 0 && (
                            <div className="text-xs text-gray-400 font-medium px-2 py-0.5 bg-gray-100 rounded">
                              INCLUDED
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Live Summary */}
        <div className="text-center py-4">
           <p className="font-serif text-xl text-[#111111]">
              Updated total: ${total.toLocaleString()} · Deposit today: ${deposit.toLocaleString()}
           </p>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white/90 backdrop-blur-md border-t border-gray-100 z-20">
        <div className="max-w-[800px] mx-auto flex flex-col items-center gap-2">
            <Button 
                onClick={() => setShowContract(true)}
                className="w-full md:w-auto md:px-12 h-14 bg-[#0F172A] hover:bg-black text-white text-base font-medium rounded-xl shadow-lg shadow-gray-900/10 flex items-center justify-center gap-2"
            >
                Confirm & Launch Campaign <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-xs text-[#6B6B6B] mt-1">
              You’ll review and sign the service agreement next.
            </p>
        </div>
      </div>

      {/* Contract Modal */}
      <ContractModal 
        isOpen={showContract} 
        onClose={() => setShowContract(false)}
        onSign={() => onNavigate('production-timeline')}
      />

    </div>
  );
}
