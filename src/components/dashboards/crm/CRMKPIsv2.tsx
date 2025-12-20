import React from "react";
import { motion } from "motion/react";
import { useSponsor } from "../../../context/SponsorContext";
import { ArrowUpRight, DollarSign, Briefcase, Activity, AlertTriangle } from "lucide-react";

export function CRMKPIsv2() {
  const { sponsors, totalPipelineValue, closedWonValue } = useSponsor();

  // "At Risk": Fit score < 70
  const atRiskCount = sponsors.filter(s => s.fit_score && s.fit_score < 70).length;

  const metrics = [
    { 
      label: "Pipeline Value", 
      value: `$${(totalPipelineValue/1000).toFixed(0)}k`, 
      subtext: "+12% vs last month",
      icon: DollarSign,
      primary: true
    },
    { 
      label: "Closed-Won", 
      value: `$${(closedWonValue/1000).toFixed(0)}k`, 
      subtext: "85% to target",
      icon: Briefcase,
      primary: true
    },
    { 
      label: "Active Sponsors", 
      value: sponsors.length.toString(), 
      subtext: "Total active deals",
      icon: Activity,
      primary: false
    },
    { 
      label: "At Risk", 
      value: atRiskCount.toString(), 
      subtext: "Low fit score",
      icon: AlertTriangle,
      primary: false,
      alert: atRiskCount > 0
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`
            relative p-5 rounded-xl border transition-all hover:shadow-md bg-white
            ${metric.alert ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200'}
          `}
        >
          <div className="flex justify-between items-start mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${metric.alert ? 'text-amber-700' : 'text-gray-400'}`}>
              {metric.label}
            </span>
            {metric.primary && (
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {metric.subtext.split(' ')[0]}
              </span>
            )}
            {metric.icon && !metric.primary && (
               <metric.icon className={`w-4 h-4 ${metric.alert ? 'text-amber-500' : 'text-gray-300'}`} />
            )}
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className={`font-serif font-bold text-[#1A1A1A] text-2xl`}>
              {metric.value}
            </span>
          </div>
          
          {!metric.primary && (
            <div className={`mt-1 text-[10px] font-medium ${metric.alert ? 'text-amber-600' : 'text-gray-400'}`}>
              {metric.subtext}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
