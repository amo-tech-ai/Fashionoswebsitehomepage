import React from "react";

export function KPICard({ title, count, color, icon: Icon }: { title: string, count: number, color: string, icon: any }) {
  const colorClasses: Record<string, string> = {
    red: "bg-rose-50 border-rose-100 text-rose-900",
    amber: "bg-amber-50 border-amber-100 text-amber-900",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-900"
  };
  return (
    <div className={`p-5 rounded-xl border ${colorClasses[color]} shadow-sm flex flex-col justify-between min-h-[100px] relative overflow-hidden group`}>
      <div className="flex justify-between items-start z-10">
        <span className="text-xs font-bold uppercase tracking-wide opacity-80">{title}</span>
        <Icon className="w-4 h-4 opacity-80" />
      </div>
      <div className="mt-2 z-10"><span className="text-3xl font-serif font-medium">{count}</span></div>
    </div>
  );
}
