import { motion } from "motion/react";
import { CheckCircle, Clock, Eye, AlertTriangle } from "lucide-react";

export function DeliverablesStatus() {
  const statuses = [
    { label: "Completed", count: 24, color: "from-green-50 to-green-50", textColor: "text-green-900", icon: CheckCircle, iconColor: "text-green-600" },
    { label: "In Progress", count: 12, color: "from-blue-50 to-blue-50", textColor: "text-blue-900", icon: Clock, iconColor: "text-blue-600" },
    { label: "In Review", count: 5, color: "from-gray-100 to-gray-100", textColor: "text-gray-900", icon: Eye, iconColor: "text-gray-600" },
    { label: "At Risk", count: 8, color: "from-red-50 to-red-50", textColor: "text-red-900", icon: AlertTriangle, iconColor: "text-red-600" }
  ];

  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-gray-900 mb-6">Deliverables Status</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((status, index) => {
          const Icon = status.icon;
          return (
            <motion.div
              key={status.label}
              className={`bg-gradient-to-br ${status.color} rounded-xl p-4 text-center`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Icon className={`w-6 h-6 ${status.iconColor} mx-auto mb-2`} />
              <div className={`text-3xl mb-1 ${status.textColor}`}>
                {status.count}
              </div>
              <div className={`text-xs ${status.textColor}`}>
                {status.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}