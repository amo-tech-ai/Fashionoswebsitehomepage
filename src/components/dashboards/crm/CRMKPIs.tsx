import React from "react";
import { motion } from "motion/react";
import { useSponsor } from "../../../context/SponsorContext";

export function CRMKPIs() {
  const { sponsors, totalPipelineValue, closedWonValue } = useSponsor();

  const kpis = [
    { label: "Total Sponsors", value: sponsors.length.toString(), trend: "+12% vs last season", positive: true },
    { label: "Deals In Pipeline", value: sponsors.filter(s => s.status !== 'fulfilled' && s.status !== 'confirmed').length.toString(), trend: "4 closing this week", positive: true },
    { label: "Pipeline Value", value: `$${(totalPipelineValue/1000).toFixed(0)}k`, trend: "+5%", positive: true },
    { label: "Closed-Won", value: `$${(closedWonValue/1000).toFixed(0)}k`, trend: "Target: $1M", positive: true }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{kpi.label}</div>
          <div className="flex items-end gap-3">
            <div className="text-2xl font-bold text-[#1A1A1A]">{kpi.value}</div>
            <div className={`text-xs mb-1.5 font-bold ${kpi.positive ? 'text-[#166534]' : 'text-[#991B1B]'}`}>
              {kpi.trend}
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 mt-3 rounded-full overflow-hidden">
            <div className="h-full bg-[#1A1A1A] w-2/3 rounded-full group-hover:w-full transition-all duration-500" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
