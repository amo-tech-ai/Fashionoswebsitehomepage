import { motion } from "motion/react";
import { Zap, Clock, AlertCircle, CheckCircle } from "lucide-react";

interface Task {
  title: string;
  status: "urgent" | "in-progress" | "pending" | "completed";
}

export function CriticalTasksGrid() {
  const tasks: Task[] = [
    { title: "Finalize Lighting Setup", status: "urgent" },
    { title: "Confirm Guest List", status: "in-progress" },
    { title: "Model Fitting Schedule", status: "pending" },
    { title: "Sponsor Logo Approvals", status: "urgent" }
  ];

  const getStatusConfig = (status: Task["status"]) => {
    switch (status) {
      case "urgent":
        return {
          color: "from-red-50 to-red-50",
          textColor: "text-red-900",
          borderColor: "border-red-200",
          icon: Zap,
          iconColor: "text-red-600",
          label: "Urgent"
        };
      case "in-progress":
        return {
          color: "from-amber-50 to-amber-50",
          textColor: "text-amber-900",
          borderColor: "border-amber-200",
          icon: Clock,
          iconColor: "text-amber-600",
          label: "In Progress"
        };
      case "pending":
        return {
          color: "from-gray-50 to-gray-50",
          textColor: "text-gray-900",
          borderColor: "border-gray-200",
          icon: AlertCircle,
          iconColor: "text-gray-600",
          label: "Pending"
        };
      case "completed":
        return {
          color: "from-green-50 to-green-50",
          textColor: "text-green-900",
          borderColor: "border-green-200",
          icon: CheckCircle,
          iconColor: "text-green-600",
          label: "Completed"
        };
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-gray-900">Critical Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task, index) => {
          const config = getStatusConfig(task.status);
          const Icon = config.icon;
          
          return (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${config.color} border ${config.borderColor} rounded-xl p-4 cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className={`w-5 h-5 ${config.iconColor}`} />
                <span className={`text-xs px-2 py-1 bg-white rounded-full ${config.textColor}`}>
                  {config.label}
                </span>
              </div>
              <p className={`text-sm ${config.textColor}`}>{task.title}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}