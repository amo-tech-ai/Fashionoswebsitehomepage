import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "../ui/card";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface KPICardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: number;
    label: string;
  };
  visual?: ReactNode; // For progress bars, gauges, etc.
  onClick?: () => void;
  loading?: boolean;
}

export function KPICard({
  icon: Icon,
  iconColor,
  label,
  value,
  subtext,
  trend,
  visual,
  onClick,
  loading = false
}: KPICardProps) {
  
  const isClickable = !!onClick;
  const trendIsPositive = trend && trend.value > 0;

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="w-20 h-4 bg-gray-200 rounded" />
          </div>
          <div className="w-32 h-12 bg-gray-200 rounded mb-2" />
          <div className="w-24 h-4 bg-gray-200 rounded" />
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      whileHover={isClickable ? { scale: 1.02 } : {}}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`p-6 ${isClickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
        onClick={onClick}
      >
        {/* TOP ROW: Icon + Label */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${iconColor}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>

          {/* Label */}
          <div className="text-xs uppercase tracking-wide text-gray-500">
            {label}
          </div>
        </div>

        {/* MIDDLE ROW: Large Value */}
        <div className="mb-2">
          <div className="text-4xl">
            {value}
          </div>
          {subtext && (
            <div className="text-sm text-gray-500 mt-1">
              {subtext}
            </div>
          )}
        </div>

        {/* BOTTOM ROW: Trend or Visual */}
        {trend && (
          <div className="flex items-center gap-1 text-sm">
            {trendIsPositive ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={trendIsPositive ? 'text-green-600' : 'text-red-600'}>
              {trendIsPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-gray-500">
              {trend.label}
            </span>
          </div>
        )}

        {visual && (
          <div className="mt-3">
            {visual}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
