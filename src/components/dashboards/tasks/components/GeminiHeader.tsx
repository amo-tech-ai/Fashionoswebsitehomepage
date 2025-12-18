import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

export function GeminiHeader({ 
  title, 
  description,
  actions 
}: { 
  title: string, 
  description: string,
  actions: { label: string, icon: any, primary?: boolean }[]
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden mb-8">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
            <Sparkles className="w-6 h-6 text-indigo-200" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-medium mb-1">{title}</h2>
                <p className="text-indigo-200 text-sm max-w-2xl">{description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {actions.map((action, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => setIsProcessing(false), 1500);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      action.primary 
                        ? "bg-white text-indigo-900 hover:bg-indigo-50 shadow-lg shadow-indigo-900/20" 
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    {isProcessing && action.primary ? <Loader2 className="w-4 h-4 animate-spin" /> : <action.icon className="w-4 h-4" />}
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
