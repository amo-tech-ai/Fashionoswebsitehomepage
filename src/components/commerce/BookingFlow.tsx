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
  FileText
} from "lucide-react";
import { useBrandShoot } from "../../context/BrandShootContext";
import { Button } from "../ui/button";

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
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-serif text-gray-900 mb-2">No Active Proposal</h2>
        <p className="text-gray-500 mb-8 max-w-md">Please create a project proposal first to proceed with booking.</p>
        <Button onClick={() => onNavigate('home')} className="bg-gray-900 text-white">
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
    <div className="min-h-screen bg-[#FDFBF9] py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
        
        {/* Left Column: Context & Summary */}
        <div className="lg:col-span-1 space-y-8">
            <div>
                <button 
                    onClick={handleBack}
                    className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-8 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to Proposal
                </button>
                
                <h1 className="font-serif text-3xl text-gray-900 mb-2">
                    {step === 'calendar' ? 'Select Date' : step === 'payment' ? 'Secure Booking' : 'Confirmed'}
                </h1>
                <p className="text-gray-500">
                    {step === 'calendar' ? 'Choose your preferred production window.' : 'Finalize your reservation securely.'}
                </p>
            </div>

            {/* Order Summary Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="font-medium text-gray-900">{proposal.service} Package</div>
                            <div className="text-xs text-gray-500 mt-0.5">Base production team</div>
                        </div>
                        <div className="text-sm font-medium text-gray-900">$1,500.00</div>
                    </div>
                    
                    {proposal.activeAddOns.map((addon, i) => (
                        <div key={i} className="flex justify-between items-start">
                            <div className="text-sm text-gray-600">{addon}</div>
                            <div className="text-sm text-gray-900">$300.00</div>
                        </div>
                    ))}
                    
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                        <div className="text-sm font-medium text-gray-500">Total Estimate</div>
                        <div className="text-2xl font-serif text-gray-900">${proposal.totalCost.toLocaleString()}.00</div>
                    </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Your deposit is fully refundable up to 7 days before the shoot date.
                    </p>
                </div>
            </div>
        </div>

        {/* Right Column: Active Step Content */}
        <div className="lg:col-span-2">
             <div className="flex items-center gap-2 mb-8">
                <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 'calendar' || step === 'payment' || step === 'confirmation' ? 'bg-gray-900' : 'bg-gray-200'}`} />
                <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 'payment' || step === 'confirmation' ? 'bg-gray-900' : 'bg-gray-200'}`} />
                <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 'confirmation' ? 'bg-gray-900' : 'bg-gray-200'}`} />
             </div>

            <AnimatePresence mode="wait">
                <motion.div 
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[500px]"
                >
                
                {step === 'calendar' && (
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-serif text-xl text-gray-900">October 2025</h2>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowRight className="w-5 h-5 text-gray-600" /></button>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-4 mb-8">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{d}</div>
                            ))}
                            {Array.from({ length: 31 }).map((_, i) => {
                                const day = i + 1;
                                // Simple mock availability: Weekdays available, weekends limited
                                const isWeekend = (day + 1) % 7 === 0 || (day + 1) % 7 === 1;
                                const isAvailable = !isWeekend && day > 5;
                                const isSelected = selectedDate === day;
                                
                                return (
                                    <button
                                        key={i}
                                        disabled={!isAvailable}
                                        onClick={() => setSelectedDate(day)}
                                        className={`
                                            aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all relative group
                                            ${isSelected 
                                                ? 'bg-gray-900 text-white shadow-lg scale-105 z-10' 
                                                : isAvailable 
                                                ? 'bg-white border border-gray-100 text-gray-700 hover:border-gray-300 hover:shadow-md' 
                                                : 'bg-gray-50 text-gray-300 cursor-not-allowed border border-transparent'
                                            }
                                        `}
                                    >
                                        <span>{day}</span>
                                        {isSelected && <span className="text-[10px] opacity-70 font-light">Selected</span>}
                                        {isAvailable && !isSelected && <span className="hidden group-hover:block text-[10px] text-green-600 font-medium">Open</span>}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="mt-auto flex justify-end pt-6 border-t border-gray-100">
                             <Button 
                                size="lg"
                                disabled={!selectedDate}
                                onClick={() => setStep('payment')}
                                className="bg-gray-900 text-white hover:bg-black px-8"
                             >
                                Confirm Date <ArrowRight className="w-4 h-4 ml-2" />
                             </Button>
                        </div>
                    </div>
                )}

                {step === 'payment' && (
                    <div className="h-full flex flex-col max-w-lg mx-auto">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full mb-4">
                                <Lock className="w-6 h-6 text-gray-900" />
                            </div>
                            <h2 className="font-serif text-xl text-gray-900">Payment Details</h2>
                            <p className="text-sm text-gray-500">Transactions are secure and encrypted.</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Cardholder Name</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" 
                                    placeholder="Jane Doe" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Card Number</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" 
                                        placeholder="0000 0000 0000 0000" 
                                    />
                                    <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Expiry Date</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" 
                                        placeholder="MM / YY" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">CVC</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" 
                                        placeholder="123" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                             <Button 
                                size="lg"
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full bg-gray-900 text-white hover:bg-black h-12 text-base"
                             >
                                {isProcessing ? (
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 animate-spin" /> Processing...
                                    </span>
                                ) : (
                                    `Pay $${proposal.totalCost.toLocaleString()}.00`
                                )}
                             </Button>
                             <div className="flex justify-center gap-4 mt-4 opacity-50">
                                 {/* Placeholders for payment icons */}
                                 <div className="h-6 w-10 bg-gray-200 rounded-md" />
                                 <div className="h-6 w-10 bg-gray-200 rounded-md" />
                                 <div className="h-6 w-10 bg-gray-200 rounded-md" />
                             </div>
                        </div>
                    </div>
                )}

                {step === 'confirmation' && (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.8 }}
                            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-green-200 shadow-xl"
                        >
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </motion.div>
                        
                        <h1 className="font-serif text-4xl text-gray-900 mb-4">Booking Confirmed</h1>
                        <p className="text-gray-500 max-w-md mx-auto text-lg mb-8">
                            Your shoot for <span className="font-medium text-gray-900">October {selectedDate}, 2025</span> has been successfully reserved. We've sent a detailed receipt to your email.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                            <Button 
                                onClick={() => onNavigate('overview')}
                                className="bg-gray-900 text-white hover:bg-black h-12"
                            >
                                Go to Project Dashboard
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => onNavigate('home')}
                                className="border-gray-200 h-12 hover:bg-gray-50"
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