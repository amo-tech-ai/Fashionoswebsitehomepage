import { motion } from "motion/react";
import { CheckCircle2, AlertCircle, Clock, ChevronRight, Filter } from "lucide-react";
import { Task } from "../types";

interface CriticalTasksListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function CriticalTasksList({ tasks, onTaskClick }: CriticalTasksListProps) {
  // Filter for high priority or critical path
  const criticalTasks = tasks.filter(t => t.priority === 'High' || t.status === 'In Progress');
  const otherTasks = tasks.filter(t => t.priority !== 'High' && t.status !== 'In Progress');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header / Filter */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-black">Execution List</h2>
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Critical Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-red-600 uppercase tracking-widest">Critical Attention</h3>
        {criticalTasks.map((task) => (
          <motion.div
            key={task.id}
            layoutId={task.id}
            onClick={() => onTaskClick(task)}
            className="group flex items-center justify-between p-4 bg-white border-l-4 border-l-red-500 border-y border-r border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-black transition-colors" />
              <div>
                <h4 className="font-medium text-black text-lg group-hover:text-red-600 transition-colors">
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.dueDate}
                  </span>
                  <span>•</span>
                  <span>{task.owner}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Standard Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upcoming</h3>
        {otherTasks.slice(0, 5).map((task) => (
          <motion.div
            key={task.id}
            layoutId={task.id}
            onClick={() => onTaskClick(task)}
            className="group flex items-center justify-between p-4 bg-white border border-gray-100 hover:border-gray-300 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-gray-400 transition-colors" />
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-black transition-colors">
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                   <span>{task.category}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {otherTasks.length > 5 && (
            <button className="w-full py-3 text-sm text-gray-400 hover:text-black transition-colors border border-dashed border-gray-200 hover:border-gray-400">
                Show {otherTasks.length - 5} More
            </button>
        )}
      </div>
    </div>
  );
}
