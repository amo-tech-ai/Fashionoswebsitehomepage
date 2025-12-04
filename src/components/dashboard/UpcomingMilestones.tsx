import { motion } from "motion/react";
import { Calendar } from "lucide-react";

interface Milestone {
  date: string;
  title: string;
  daysUntil: number;
  color: string;
}

export function UpcomingMilestones() {
  const milestones: Milestone[] = [
    { date: "Mar 1", title: "Final Guest List", daysUntil: 8, color: "from-gray-100 to-gray-100" },
    { date: "Mar 5", title: "Sponsor Approvals", daysUntil: 12, color: "from-gray-100 to-gray-100" },
    { date: "Mar 10", title: "Final Walkthrough", daysUntil: 17, color: "from-gray-100 to-gray-100" },
    { date: "Mar 14", title: "Rehearsal Day", daysUntil: 21, color: "from-gray-100 to-gray-100" },
    { date: "Mar 15", title: "Show Day", daysUntil: 22, color: "from-gray-900 to-gray-900" }
  ];

  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-gray-900 mb-6">Upcoming Milestones</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className={`bg-gradient-to-br ${milestone.color} rounded-xl p-4 ${
              index === milestones.length - 1 ? 'text-white' : ''
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar className={`w-4 h-4 ${index === milestones.length - 1 ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className={`text-xs px-2 py-1 bg-white rounded-full ${
                index === milestones.length - 1 ? 'text-gray-900' : 'text-gray-700'
              }`}>
                {milestone.date}
              </span>
            </div>
            <p className={`text-sm mb-2 ${index === milestones.length - 1 ? 'text-white' : 'text-gray-900'}`}>
              {milestone.title}
            </p>
            <p className={`text-xs ${index === milestones.length - 1 ? 'text-gray-300' : 'text-gray-500'}`}>
              {milestone.daysUntil} days
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}