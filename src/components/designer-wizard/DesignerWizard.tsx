import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { InputStep } from "./steps/InputStep";
import { AnalysisStep } from "./steps/AnalysisStep";
import { AuditStep } from "./steps/AuditStep";

import { ScanningStep } from "./steps/ScanningStep";

export type WizardStep = "input" | "scanning" | "analysis" | "audit";

export interface BrandData {
  name: string;
  website: string;
  instagram: string;
}

export interface DesignerWizardProps {
  onComplete?: () => void;
}

export function DesignerWizard({ onComplete }: DesignerWizardProps) {
  const [step, setStep] = useState<WizardStep>("input");
  const [brandData, setBrandData] = useState<BrandData>({
    name: "",
    website: "",
    instagram: ""
  });

  const steps = [
    { id: "input", label: "Input" },
    { id: "analysis", label: "Analysis" },
    { id: "audit", label: "Audit" }
  ];

  const currentStepIndex = steps.findIndex(s => {
    if (step === "scanning") return 0; // Scanning counts as Input phase visually or between
    return s.id === step;
  });

  return (
    <div className="min-h-screen bg-[#F9F9F7] font-sans text-gray-900">
      {/* Header / Progress */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#F9F9F7]/80 backdrop-blur-md z-50 flex items-center justify-between px-6 lg:px-12 border-b border-gray-200/50">
        <div className="font-serif font-bold text-lg tracking-tight">FashionOS</div>
        
        {/* Progress Indicators */}
        <div className="hidden md:flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <span className={`text-xs font-medium uppercase tracking-widest ${
                i <= currentStepIndex ? "text-black" : "text-gray-300"
              }`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`w-8 h-px ${
                  i < currentStepIndex ? "bg-black" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        <button className="text-xs font-medium text-gray-400 hover:text-black transition-colors uppercase tracking-widest">
          Exit
        </button>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-20 px-6 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {step === "input" && (
            <InputStep 
              key="input" 
              onNext={(data) => {
                setBrandData(data);
                setStep("scanning");
              }} 
            />
          )}
          {step === "scanning" && (
            <ScanningStep 
              key="scanning"
              onNext={() => setStep("analysis")}
            />
          )}
          {step === "analysis" && (
            <AnalysisStep 
              key="analysis" 
              brandName={brandData.name}
              onNext={() => setStep("audit")}
              onBack={() => setStep("input")}
            />
          )}
          {step === "audit" && (
            <AuditStep key="audit" onComplete={onComplete} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
