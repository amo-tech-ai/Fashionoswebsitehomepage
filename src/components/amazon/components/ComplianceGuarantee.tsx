import React from "react";
import { Check, ShieldCheck } from "lucide-react";

export function ComplianceGuarantee() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="bg-blue-50/50 rounded-3xl p-8 md:p-12 border border-blue-100 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif text-gray-900 mb-8">100% Amazon-Compliant Visuals.</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              "Pure white backgrounds (255,255,255)",
              "No watermarks or text overlays",
              "Approved apparel photography rules",
              "Correct file dimensions (min 1000px)",
              "Mobile-optimized cropping",
              "Rejection prevention guarantee"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
