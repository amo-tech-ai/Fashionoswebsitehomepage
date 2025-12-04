import { motion } from "motion/react";
import { Calendar, Building2, DollarSign, FileCheck, ListChecks, BarChart3 } from "lucide-react";

export function ProcessNavigator() {
  const processes = [
    { icon: Calendar, label: "Event", color: "from-gray-100 to-gray-100", iconColor: "text-gray-700" },
    { icon: Building2, label: "Venue", color: "from-gray-100 to-gray-100", iconColor: "text-gray-700" },
    { icon: DollarSign, label: "Sponsors", color: "from-gray-100 to-gray-100", iconColor: "text-gray-700" },
    { icon: FileCheck, label: "Deliverables", color: "from-gray-100 to-gray-100", iconColor: "text-gray-700" },
    { icon: ListChecks, label: "Tasks", color: "from-gray-100 to-gray-100", iconColor: "text-gray-700" },
    { icon: BarChart3, label: "Analytics", color: "from-gray-100 to-gray-100", iconColor: "text-gray-700" }
  ];

  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-gray-900 mb-6">Event Management Process</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {processes.map((process, index) => {
          const Icon = process.icon;
          return (
            <motion.button
              key={process.label}
              className={`bg-gradient-to-br ${process.color} rounded-xl p-4 text-center hover:scale-105 transition-transform`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-6 h-6 ${process.iconColor} mx-auto mb-2`} />
              <div className="text-xs text-gray-700">{process.label}</div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}