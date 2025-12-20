import { motion } from "motion/react";

interface KPICardProps {
  title: string;
  value: string;
  icon: any;
  trend?: string;
}

export function KPICard({ title, value, icon: Icon, trend }: KPICardProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden group"
    >
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">{title}</p>
          <h3 className="text-3xl font-serif font-medium text-[#111111]">{value}</h3>
        </div>
        <div className="p-3 bg-[#F8F5F1] rounded-full text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 font-medium relative z-10">
           <span>{trend}</span>
        </div>
      )}
    </motion.div>
  );
}
