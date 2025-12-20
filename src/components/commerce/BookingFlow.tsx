import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CreditCard, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  ArrowRight, 
  Lock,
  ChevronLeft,
  Clock,
  Sparkles,
  ShieldCheck,
  FileText,
  MapPin
} from "lucide-react";
import { useBrandShoot } from "../../context/BrandShootContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const CATEGORY_IMAGES: Record<string, string> = {
  "E-Commerce": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800&h=600",
  "Editorial": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800&h=600",
  "Lookbook": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800&h=600",
  "Social Media": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=600",
  "Campaign": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800&h=600",
  "default": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800&h=600"
};

export function BookingFlow({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const { proposal, setActiveProjects } = useBrandShoot();
  const [step, setStep] = useState<'calendar' | 'payment' | 'confirmation'>('calendar');
  const [selectedDate, setSelectedDate] = useState<number | null>(proposal?.date ? new Date(proposal.date).getDate() : null);
  const [isProcessing, setIsProcessing] = useState(false);

  // If no proposal data exists, redirect or show empty state
  if (!proposal) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-serif text-[#111111] mb-2">No Active Proposal</h2>
        <p className="text-gray-500 mb-8 max-w-md">Please create a project proposal first to proceed with booking.</p>
        <Button onClick={() => onNavigate('home')} className="bg-[#111111] text-white rounded-xl">
          Return Home
        </Button>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
        // Create new project
        const categoryKey = Object.keys(CATEGORY_IMAGES).find(k => proposal.category.includes(k)) || "default";
        const projectImage = CATEGORY_IMAGES[categoryKey] || CATEGORY_IMAGES["default"];

        const newProject = {
            id: Date.now(),
            name: `${proposal.category} ${proposal.service} Campaign`,
            client: "Acme Fashion", // Mock
            status: "Pre-Production",
            date: selectedDate ? `Oct ${selectedDate}, 2025` : "Oct 24, 2025",
            deliverables: `${proposal.scenes.length * 3} Assets, ${proposal.scenes.length} Videos`,
            progress: 0,
            image: projectImage
        };
        
        setActiveProjects(prev => [newProject, ...prev]);

        setIsProcessing(false);
        setStep('confirmation');
    }, 2500);
  };

  const handleBack = () => {
    if (step === 'payment') setStep('calendar');
    else onNavigate('proposal');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111111] overflow-x-hidden">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
               <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
               </button>
               <div>
                   <h1 className="font-serif text-xl text-[#111111]">{step === 'confirmation' ? 'Booking Confirmed' : 'Secure Booking'}</h1>
                   <p className="text-xs text-gray-500 font-medium">Step {step === 'calendar' ? '1' : step === 'payment' ? '2' : '3'} of 3</p>
               </div>
           </div>
           
           <div className="flex items-center gap-2">
               <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step === 'calendar' || step === 'payment' || step === 'confirmation' ? 'bg-[#111111]' : 'bg-gray-200'}`} />
               <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step === 'payment' || step === 'confirmation' ? 'bg-[#111111]' : 'bg-gray-200'}`} />
               <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step === 'confirmation' ? 'bg-[#111111]' : 'bg-gray-200'}`} />
           </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">
        
        {/* Left Column: Context & Summary */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Reservation Summary</h3>
                
                <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-start pb-6 border-b border-gray-50">
                        <div>
                            <div className="font-serif text-lg text-[#111111] mb-1">{proposal.service} Package</div>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-0">{proposal.category}</Badge>
                        </div>
                        <div className="text-lg font-medium text-[#111111]">$1,500.00</div>
                    </div>
                    
                    {proposal.activeAddOns.length > 0 && (
                        <div className="space-y-3 pb-6 border-b border-gray-50">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Add-Ons</span>
                            {proposal.activeAddOns.map((addon, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div className="text-sm text-gray-600">{addon}</div>
                                    <div className="text-sm text-[#111111] font-medium">$300.00</div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="flex justify-between items-end">
                        <div className="text-sm font-medium text-gray-500">Total Estimate</div>
                        <div className="text-3xl font-serif text-[#111111]">${proposal.totalCost.toLocaleString()}</div>
                    </div>
                </div>
                
                <div className="bg-[#F4F4F5] rounded-2xl p-4 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-gray-900 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-[#111111] mb-1">Guaranteed Satisfaction</p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Full refund available up to 7 days before shoot.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Active Step Content */}
        <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 min-h-[600px] relative overflow-hidden"
                >
                
                {step === 'calendar' && (
                    <div className="h-full flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                            <div>
                                <h2 className="font-serif text-3xl text-[#111111] mb-2">Select Production Date</h2>
                                <p className="text-gray-500">Available slots for {proposal.timeSlot || "Full Day"} booking.</p>
                            </div>
                            <div className="flex items-center gap-3 bg-[#FAFAFA] p-1.5 rounded-full border border-gray-100">
                                <button className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                                <span className="text-sm font-bold text-[#111111] px-4">October 2025</span>
                                <button className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all"><ArrowRight className="w-5 h-5 text-gray-600" /></button>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-4 mb-10">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider py-2">{d}</div>
                            ))}
                            {Array.from({ length: 31 }).map((_, i) => {
                                const day = i + 1;
                                const isWeekend = (day + 1) % 7 === 0 || (day + 1) % 7 === 1;
                                const isAvailable = !isWeekend && day > 5;
                                const isSelected = selectedDate === day;
                                
                                return (
                                    <button
                                        key={i}
                                        disabled={!isAvailable}
                                        onClick={() => setSelectedDate(day)}
                                        className={`
                                            aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-medium transition-all relative group
                                            ${isSelected 
                                                ? 'bg-[#111111] text-white shadow-xl shadow-black/20 scale-110 z-10' 
                                                : isAvailable 
                                                ? 'bg-white border border-gray-100 text-[#111111] hover:border-gray-300 hover:shadow-md' 
                                                : 'bg-gray-50/50 text-gray-300 cursor-not-allowed'
                                            }
                                        `}
                                    >
                                        <span className="text-lg">{day}</span>
                                        {isAvailable && !isSelected && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1 opacity-50 group-hover:opacity-100 transition-opacity" />}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="mt-auto flex justify-end pt-8 border-t border-gray-100">
                             <Button 
                                size="lg"
                                disabled={!selectedDate}
                                onClick={() => setStep('payment')}
                                className="bg-[#111111] text-white hover:bg-black px-10 h-14 rounded-full text-base font-bold shadow-lg shadow-black/10"
                             >
                                Continue to Payment <ArrowRight className="w-4 h-4 ml-2" />
                             </Button>
                        </div>
                    </div>
                )}

                {step === 'payment' && (
                    <div className="h-full flex flex-col max-w-lg mx-auto">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F4F4F5] rounded-full mb-6">
                                <Lock className="w-8 h-8 text-[#111111]" />
                            </div>
                            <h2 className="font-serif text-3xl text-[#111111] mb-2">Secure Reservation</h2>
                            <p className="text-gray-500">Encrypted payment processing for booking.</p>
                        </div>

                        <div className="space-y-6 bg-[#FAFAFA] p-8 rounded-3xl border border-gray-100">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Cardholder Name</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#111111]/10 focus:border-[#111111] transition-all font-medium" 
                                    placeholder="Jane Doe" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card Number</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#111111]/10 focus:border-[#111111] transition-all font-medium" 
                                        placeholder="0000 0000 0000 0000" 
                                    />
                                    <CreditCard className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Expiry</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#111111]/10 focus:border-[#111111] transition-all font-medium" 
                                        placeholder="MM / YY" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">CVC</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#111111]/10 focus:border-[#111111] transition-all font-medium" 
                                        placeholder="123" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                             <Button 
                                size="lg"
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full bg-[#111111] text-white hover:bg-black h-16 rounded-2xl text-lg font-bold shadow-xl shadow-black/10"
                             >
                                {isProcessing ? (
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 animate-spin" /> Processing...
                                    </span>
                                ) : (
                                    `Pay $${proposal.totalCost.toLocaleString()}.00`
                                )}
                             </Button>
                             <div className="flex justify-center items-center gap-2 mt-6 text-xs text-gray-400 font-medium">
                                 <Lock className="w-3 h-3" />
                                 Powered by Stripe
                             </div>
                        </div>
                    </div>
                )}

                {step === 'confirmation' && (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12 relative">
                        {/* Confetti-like elements could go here */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <motion.div 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 12 }}
                            className="w-24 h-24 bg-[#111111] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-black/20 relative z-10"
                        >
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <h1 className="font-serif text-5xl text-[#111111] mb-6">Booking Confirmed</h1>
                        
                        <div className="bg-[#FAFAFA] rounded-2xl p-6 mb-10 max-w-md w-full border border-gray-100">
                             <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200/50">
                                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                                     <CalendarIcon className="w-6 h-6 text-[#111111]" />
                                 </div>
                                 <div className="text-left">
                                     <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date</div>
                                     <div className="text-lg font-medium text-[#111111]">Oct {selectedDate}, 2025</div>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                                     <MapPin className="w-6 h-6 text-[#111111]" />
                                 </div>
                                 <div className="text-left">
                                     <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</div>
                                     <div className="text-lg font-medium text-[#111111]">Milk Studios, NYC</div>
                                 </div>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                            <Button 
                                onClick={() => onNavigate('production-timeline')}
                                className="bg-[#111111] text-white hover:bg-black h-14 rounded-xl font-bold shadow-lg shadow-black/10 text-base"
                            >
                                Open Production Dashboard
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => onNavigate('home')}
                                className="border-gray-200 h-14 rounded-xl font-bold text-gray-600 hover:text-[#111111] hover:bg-white"
                            >
                                Return Home
                            </Button>
                        </div>
                    </div>
                )}

                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
