import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, FileText, Camera, Calendar, Sparkles, Download, Edit2, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Switch } from '../ui/switch';
import { useBrandShoot } from '../../context/BrandShootContext';
import { DigitalContractModal } from './DigitalContractModal';

interface ProposalConfirmationProps {
  onNavigate: (screen: string) => void;
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } // Custom easing for "Calm" feel
  }
};

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export function ProposalConfirmation({ onNavigate }: ProposalConfirmationProps) {
  const { campaignPlan, launchCampaign, setAdjustMode, toggleCustomization } = useBrandShoot();
  const [isContractOpen, setIsContractOpen] = useState(false);
  
  // Price Animation State
  const [displayPrice, setDisplayPrice] = useState(0);
  
  // Load plan data
  if (!campaignPlan) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  const { strategy, pricing, channelPacks, customizations } = campaignPlan;

  // Calculate totals
  const totalAssets = channelPacks?.reduce((acc, p) => acc + p.outputCount, 0) || 0;
  const targetPrice = pricing.total;
  const deposit = pricing.deposit;

  // Animate Price on Mount
  useEffect(() => {
    let start = displayPrice || 0; // Start from current if exists to handle updates
    const duration = 1200; // Slightly slower for luxury feel
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = (targetPrice - start) / steps;
    
    // If change is small (customization toggle), just set it
    if (Math.abs(targetPrice - start) < 50) {
        setDisplayPrice(targetPrice);
        return;
    }

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= targetPrice) || (increment < 0 && current <= targetPrice)) {
        setDisplayPrice(targetPrice);
        clearInterval(timer);
      } else {
        setDisplayPrice(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetPrice]);

  const handleContractSign = () => {
    launchCampaign();
    setIsContractOpen(false);
    onNavigate('overview');
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans print:p-0 print:bg-white print:overflow-visible">
      
      {/* Background Ambience - Hide on Print */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white/50 to-transparent pointer-events-none print:hidden" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full relative z-10 print:max-w-none print:w-full"
      >
        
        {/* --- SECTION 1: CONFIRMATION SIGNAL --- */}
        <motion.div variants={itemVariants} className="text-center mb-8 print:hidden">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 15 }}
            className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-4 ring-green-50/50"
          >
            <Check className="w-6 h-6 text-green-600" strokeWidth={3} />
          </motion.div>
          
          <h1 className="font-serif text-3xl font-medium text-gray-900 mb-2 tracking-tight">
            Proposal Ready
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
            Everything is prepared. Review and launch your campaign.
          </p>
        </motion.div>

        {/* --- PRINT HEADER (Visible only on print) --- */}
        <div className="hidden print:block text-left mb-8 border-b border-gray-100 pb-6">
          <h1 className="font-serif text-3xl font-medium text-gray-900 mb-2">Campaign Proposal</h1>
          <p className="text-sm text-gray-500">Prepared for Client • {new Date().toLocaleDateString()}</p>
        </div>

        {/* --- SECTION 2: CAMPAIGN SUMMARY CARD --- */}
        <motion.div variants={itemVariants} className="print:shadow-none print:border print:border-gray-200 print:rounded-none">
          <Card className="border-0 shadow-2xl shadow-black/5 overflow-hidden rounded-[2rem] bg-white mb-6 hover:shadow-black/10 transition-shadow duration-500 print:shadow-none print:rounded-lg">
            <CardContent className="p-0">
              
              {/* Header Row */}
              <div className="p-8 pb-6">
                <div className="flex justify-between items-start mb-1">
                  <h2 className="font-serif text-2xl text-gray-900 leading-tight pr-4">
                    {strategy.title}
                  </h2>
                  <div className="text-right">
                    <span className="font-serif text-xl font-bold text-gray-900 block tabular-nums">
                      ${displayPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Includes {totalAssets} Assets • Full Production
                </p>
              </div>

              <Separator className="bg-gray-50" />

              {/* Stacked List */}
              <motion.div 
                variants={listContainerVariants}
                className="p-8 space-y-6"
              >
                
                {/* Row 1: Strategy */}
                <motion.div variants={listItemVariants} className="flex gap-4 group cursor-default">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors duration-300 print:border print:border-gray-100">
                    <FileText className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300 print:text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Creative Strategy</h3>
                    <p className="text-sm text-gray-500 leading-snug">
                      AI-generated moodboards, shot list, and channel plan
                    </p>
                  </div>
                </motion.div>

                {/* Row 2: Production */}
                <motion.div variants={listItemVariants} className="flex gap-4 group cursor-default">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors duration-300 print:border print:border-gray-100">
                    <Camera className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300 print:text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Production Scope</h3>
                    <p className="text-sm text-gray-500 leading-snug">
                      Photography & video • 1 studio day • 1 model • 2 stylists
                    </p>
                  </div>
                </motion.div>

                {/* Row 3: Timeline */}
                <motion.div variants={listItemVariants} className="flex gap-4 group cursor-default">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors duration-300 print:border print:border-gray-100">
                    <Calendar className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300 print:text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Timeline</h3>
                    <p className="text-sm text-gray-500 leading-snug">
                      Kickoff: <span className="text-gray-900">Today</span> • Final Delivery: <span className="text-gray-900">{new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </p>
                  </div>
                </motion.div>

              </motion.div>

              <Separator className="bg-gray-100" />

              {/* Deposit Footer */}
              <div className="bg-gray-50/50 p-8">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm font-medium text-gray-500">Estimated Deposit</span>
                  <span className="font-serif text-lg font-bold text-gray-900 tabular-nums">${deposit.toLocaleString()} (50%)</span>
                </div>
                <p className="text-right text-[10px] text-gray-400">Remaining balance due after delivery.</p>
              </div>

            </CardContent>
          </Card>
        </motion.div>

        {/* --- CUSTOMIZATION SECTION --- */}
        <motion.div variants={itemVariants} className="mb-6 print:hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="customization" className="border-0 bg-white rounded-xl shadow-sm px-4 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                     <Settings2 className="w-4 h-4 text-indigo-500"/>
                   </div>
                   <div className="text-left">
                     <div className="text-sm font-medium text-gray-900">Customize Scope</div>
                     <div className="text-[10px] text-gray-500 font-normal">Add or remove production services</div>
                   </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2 pb-4">
                   {customizations?.map(c => (
                     <div key={c.id} className="flex items-center justify-between group">
                        <div className="pr-4">
                           <div className="text-sm font-medium text-gray-900 mb-0.5">{c.label}</div>
                           <div className="text-xs text-gray-500">{c.description}</div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                           <span className={`text-xs font-medium ${c.selected ? 'text-gray-900' : 'text-gray-400'}`}>+${c.price}</span>
                           <Switch checked={c.selected} onCheckedChange={() => toggleCustomization(c.id)} />
                        </div>
                     </div>
                   ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* --- SECTION 3: AI TRANSPARENCY --- */}
        <motion.div 
          variants={itemVariants} 
          className="flex items-start gap-3 bg-white border border-gray-100 p-4 rounded-xl mb-8 shadow-sm hover:border-indigo-100 transition-colors print:hidden"
        >
          <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
             <div className="flex items-center gap-2">
               <span className="text-xs font-bold text-gray-900">Generated with AI Assistance</span>
             </div>
             <p className="text-xs text-gray-500 leading-relaxed">
               Campaign scope, asset mix, and timeline were generated using Gemini 3 Pro and reviewed by you.
             </p>
             <button onClick={() => onNavigate('campaign-summary')} className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
               View campaign details
             </button>
          </div>
        </motion.div>

        {/* --- SECTION 4: PRIMARY ACTION --- */}
        <motion.div variants={itemVariants} className="space-y-4 sticky bottom-6 z-20 print:hidden">
          <Button 
            onClick={() => setIsContractOpen(true)}
            className="w-full h-14 bg-[#1A1A1A] hover:bg-black text-white rounded-full font-medium shadow-xl shadow-gray-900/20 text-[15px] transition-all active:scale-95 group"
          >
            Confirm & Launch Campaign
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="flex justify-between px-4">
             <button 
               onClick={() => {
                 setAdjustMode(true);
                 onNavigate('campaign-summary');
               }}
               className="text-xs text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1.5 transition-colors"
             >
               <Edit2 className="w-3 h-3" />
               Edit Plan
             </button>
             <button 
                onClick={handleDownloadPDF}
                className="text-xs text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1.5 transition-colors"
             >
               <Download className="w-3 h-3" />
               Download PDF
             </button>
          </div>
        </motion.div>

      </motion.div>

      {/* Contract Modal Overlay */}
      <AnimatePresence>
        {isContractOpen && (
          <DigitalContractModal 
            isOpen={isContractOpen} 
            onClose={() => setIsContractOpen(false)}
            onConfirm={handleContractSign}
            plan={campaignPlan}
          />
        )}
      </AnimatePresence>

    </div>
  );
}