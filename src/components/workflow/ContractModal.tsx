import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Download, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useBrandShoot } from '../../context/BrandShootContext';
import { toast } from "sonner@2.0.3";

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSign: () => void;
}

export function ContractModal({ isOpen, onClose, onSign }: ContractModalProps) {
  const { campaignPlan, launchCampaign } = useBrandShoot();
  const [agreed, setAgreed] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  // Fallback data
  const plan = campaignPlan || {
    strategy: { title: "Andrewmajtenyi Summer '25", channels: ["Instagram", "Shopify", "Amazon"] },
    pricing: { total: 7620, deposit: 3810 },
    channelPacks: [{ outputCount: 26 }]
  };

  const totalAssets = plan.channelPacks?.reduce((acc: number, p: any) => acc + p.outputCount, 0) || 26;
  const deposit = plan.pricing?.deposit || 3810;
  const totalPrice = plan.pricing?.total || 7620;

  const handleSign = () => {
    setIsSigning(true);
    // Simulate processing
    setTimeout(() => {
        launchCampaign(); // Add to active projects
        toast.success("Contract signed & deposit processed successfully.");
        onSign(); // Navigate
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[20px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            
            {/* Header */}
            <div className="flex-none p-6 border-b border-gray-100 bg-white z-10">
                <div className="flex justify-between items-start mb-1">
                    <div>
                        <h2 className="font-serif text-2xl text-[#111111]">Digital Service Agreement</h2>
                        <div className="flex items-center gap-1.5 text-xs text-[#2FBF71] font-medium mt-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Securely generated via FashionOS Legal Engine
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-[#F8F5F1] p-6 space-y-6">
                
                {/* Client / Project Info */}
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                    <div>
                        <h3 className="font-serif text-xl text-[#111111] mb-2">Client</h3>
                        <p className="text-sm text-[#6B6B6B]">Acme Fashion Inc.</p>
                        <p className="text-sm text-[#6B6B6B]">123 Fashion Ave, NY</p>
                    </div>
                    <div className="sm:text-right">
                        <h3 className="font-serif text-xl text-[#111111] mb-2">Project Ref</h3>
                        <p className="text-sm text-[#6B6B6B]">{plan.strategy.title}</p>
                        <p className="text-sm text-[#6B6B6B]">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>

                {/* Section 1: Scope */}
                <div>
                    <h4 className="font-sans font-bold text-sm text-[#111111] mb-3 border-b border-gray-200 pb-2">1. Scope of Work</h4>
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-[#6B6B6B]">Total Asset Count</span>
                            <span className="font-bold text-[#111111]">{totalAssets} High-Res Files</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                            <div>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Distribution</span>
                                <p className="text-sm text-[#111111]">{plan.strategy.channels?.join(", ")}</p>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Usage License</span>
                                <p className="text-sm text-[#111111]">Organic, Paid, PDP (Perpetual)</p>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Section 2: Financials */}
                 <div>
                    <h4 className="font-sans font-bold text-sm text-[#111111] mb-3 border-b border-gray-200 pb-2">2. Financial Terms</h4>
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#6B6B6B]">Production Fee (Base + Assets)</span>
                            <span className="text-[#111111] tabular-nums">${totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#6B6B6B]">Platform & Processing</span>
                            <span className="text-[#6B6B6B] tabular-nums">$0.00 (Waived)</span>
                        </div>
                        <div className="h-px bg-gray-100 my-2" />
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-[#111111]">Total Project Value</span>
                            <span className="font-serif text-xl font-bold text-[#111111] tabular-nums">${totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Legal Text */}
                <p className="text-xs text-gray-400 leading-relaxed">
                    By signing this agreement, you authorize FashionOS to process the deposit immediately. The remaining balance will be automatically charged upon final asset delivery. Cancellations within 48 hours of the shoot date are non-refundable.
                </p>

            </div>

            {/* Footer Actions */}
            <div className="flex-none p-6 border-t border-gray-100 bg-white z-10">
                <div className="flex items-start gap-3 mb-4">
                    <input 
                        type="checkbox" 
                        id="agree" 
                        checked={agreed} 
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <label htmlFor="agree" className="text-sm text-[#6B6B6B] cursor-pointer select-none">
                        I agree to the <span className="font-medium text-[#111111]">Service Agreement</span> and authorize the deposit charge.
                    </label>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 h-12 text-base font-medium border-gray-200" onClick={onClose}>
                        Review Later
                    </Button>
                    <Button 
                        className="flex-[2] h-12 bg-[#0F172A] hover:bg-black text-white text-base font-medium shadow-lg shadow-gray-900/10"
                        disabled={!agreed || isSigning}
                        onClick={handleSign}
                    >
                        {isSigning ? (
                            "Processing..."
                        ) : (
                            `Sign & Pay Deposit ($${deposit.toLocaleString()})`
                        )}
                    </Button>
                </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
