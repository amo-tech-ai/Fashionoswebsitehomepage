import { motion } from "motion/react";

const metrics = [
  { label: "Outstanding Balance", value: "$12,450.00", trend: "Due within 30 days", color: "text-gray-900" },
  { label: "Paid Invoices", value: "$48,200.00", trend: "This month", color: "text-green-600" },
  { label: "Pending Approval", value: "$3,200.00", trend: "2 invoices", color: "text-amber-600" },
];

export function BillingMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {metrics.map((metric, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="text-sm text-gray-500 mb-2">{metric.label}</div>
          <div className={`text-3xl font-serif font-medium mb-2 ${metric.color}`}>{metric.value}</div>
          <div className="text-xs text-gray-400 font-medium bg-gray-50 inline-block px-2 py-1 rounded-md border border-gray-100">
            {metric.trend}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
