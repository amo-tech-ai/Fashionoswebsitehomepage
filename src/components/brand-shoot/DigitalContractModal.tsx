import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Shield, FileText, Download, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { CampaignPlan, useBrandShoot } from '../../context/BrandShootContext';

interface DigitalContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plan: CampaignPlan;
}

export function DigitalContractModal({ isOpen, onClose, onConfirm, plan }: DigitalContractModalProps) {
  const [isSigned, setIsSigned] = useState(false);
  const totalAssets = plan.channelPacks.reduce((acc, p) => acc + p.outputCount, 0);
  
  // Get unique usage rights
  const usageRights = Array.from(new Set(plan.channelPacks.flatMap(p => p.usage))).join(', ');
  const channels = plan.channelPacks.map(p => p.channel).join(', ');

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto z-50 w-full max-w-3xl h-[85vh] bg-[#FDFBF9] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <div>
                <h2 className="font-serif text-2xl text-gray-900">Digital Service Agreement</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span>Securely generated via FashionOS Legal Engine</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white/50">
              
              {/* Contract Header Details */}
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Client</h3>
                  <p className="text-gray-600">Acme Fashion Inc.</p>
                  <p className="text-gray-500">123 Fashion Ave, NY</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-gray-900 mb-1">Project Ref</h3>
                  <p className="text-gray-600">{plan.strategy.title}</p>
                  <p className="text-gray-500">{currentDate}</p>
                </div>
              </div>

              {/* 1. Scope of Work */}
              <section className="space-y-3">
                <h3 className="font-serif text-lg text-gray-900 border-b border-gray-200 pb-2">1. Scope of Work</h3>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                     <span className="font-medium text-gray-700">Total Asset Count</span>
                     <span className="font-bold text-gray-900">{totalAssets} High-Res Files</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                     <div>
                       <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Distribution</span>
                       {channels}
                     </div>
                     <div>
                       <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Usage License</span>
                       {usageRights} (Perpetual)
                     </div>
                  </div>
                </div>
              </section>

              {/* 2. Financial Terms */}
              <section className="space-y-3">
                <h3 className="font-serif text-lg text-gray-900 border-b border-gray-200 pb-2">2. Financial Terms</h3>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Production Fee (Base + Assets)</span>
                      <span>${plan.pricing.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Platform & Processing</span>
                      <span>$0.00 (Waived)</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                      <span className="font-medium text-gray-900">Total Project Value</span>
                      <span className="font-serif text-xl font-bold text-gray-900">${plan.pricing.total.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div className="text-sm">
                      <span className="block font-medium text-gray-900">Payment Schedule</span>
                      <span className="text-gray-500">
                        A deposit of <span className="text-gray-900 font-medium">${plan.pricing.deposit.toLocaleString()}</span> is required to commence production. 
                        The remaining balance is due upon asset delivery.
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Standard Legal */}
              <section className="space-y-3">
                <h3 className="font-serif text-lg text-gray-900 border-b border-gray-200 pb-2">3. Terms & Conditions</h3>
                <div className="text-xs text-gray-500 space-y-2 leading-relaxed h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                  <p><strong>3.1 Grant of Rights.</strong> Upon full payment, Creator grants Client a non-exclusive, perpetual, worldwide license to use the Deliverables for the purposes specified in the Scope of Work.</p>
                  <p><strong>3.2 Revisions.</strong> Client is entitled to one (1) round of minor revisions (color correction, cropping) at no additional cost. Structural changes requiring reshooting will incur additional fees.</p>
                  <p><strong>3.3 Cancellation.</strong> Deposits are non-refundable if the shoot is cancelled within 48 hours of the scheduled start time.</p>
                  <p><strong>3.4 Delivery.</strong> Final assets will be delivered via the FashionOS platform within 14 days of the shoot date.</p>
                </div>
              </section>
            </div>

            {/* Footer / Signature */}
            <div className="p-8 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-4 mb-6">
                 <div 
                   onClick={() => setIsSigned(!isSigned)}
                   className={`w-6 h-6 rounded border transition-colors cursor-pointer flex items-center justify-center ${isSigned ? 'bg-black border-black' : 'border-gray-300 bg-white'}`}
                 >
                   {isSigned && <Check className="w-4 h-4 text-white" />}
                 </div>
                 <label onClick={() => setIsSigned(!isSigned)} className="text-sm text-gray-600 cursor-pointer select-none">
                   I agree to the <strong>Service Agreement</strong> and authorize the deposit charge.
                 </label>
              </div>

              <div className="flex gap-4">
                 <Button variant="outline" className="flex-1 h-12 border-gray-200" onClick={onClose}>
                   Review Later
                 </Button>
                 <Button 
                   onClick={onConfirm}
                   disabled={!isSigned}
                   className="flex-[2] h-12 bg-gray-900 hover:bg-black text-white rounded-xl shadow-lg shadow-gray-900/20 disabled:opacity-50"
                 >
                   Sign & Pay Deposit (${plan.pricing.deposit.toLocaleString()})
                 </Button>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
