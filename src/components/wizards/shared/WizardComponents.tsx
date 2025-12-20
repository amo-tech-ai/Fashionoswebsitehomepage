import React from "react";
import { Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";

export function GeminiButton({ onClick, label, icon: Icon = Sparkles, className = "" }: { onClick?: () => void, label: string, icon?: any, className?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#6B21A8] bg-[#F3E8FF] hover:bg-purple-100 transition-all shadow-sm ${className}`}
    >
      <Icon className="w-4 h-4 text-[#A855F7]" />
      <span>{label}</span>
    </button>
  );
}

export function InsightBanner({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warning" | "success" }) {
  const styles = {
    info: "bg-blue-50 border-blue-100 text-blue-900",
    warning: "bg-[#FEF3C7] border-amber-100 text-[#92400E]",
    success: "bg-[#DCFCE7] border-green-100 text-[#166534]"
  };

  const icons = {
    info: Sparkles,
    warning: AlertTriangle,
    success: CheckCircle2
  };

  const Icon = icons[type];

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 ${styles[type]}`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-80" />
      <div className="text-sm leading-relaxed font-medium">{children}</div>
    </div>
  );
}

export function SectionTitle({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-serif font-medium text-[#1A1A1A] mb-2">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}
