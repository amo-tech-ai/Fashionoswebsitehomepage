import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Task } from "../../types";
import { SummaryView } from "./SummaryView";
import { TaskDetailView } from "./TaskDetailView";

export type DrawerMode = 'summary' | 'detail' | null;

interface WorkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: DrawerMode;
  selectedTask: Task | null;
  allTasks: Task[];
  onNavigate?: (page: string) => void;
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void;
}

export function WorkDrawer({ isOpen, onClose, mode, selectedTask, allTasks, onNavigate, onUpdateTask }: WorkDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/5 z-40 lg:bg-transparent lg:pointer-events-none" 
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-16 bottom-0 w-full sm:w-[400px] bg-white border-l border-gray-100 shadow-xl z-50 flex flex-col"
          >
            {/* Header (Shared) */}
            <div className="h-14 flex items-center justify-between px-6 border-b border-gray-100 shrink-0">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {mode === 'summary' ? 'Workflow Summary' : 'Task Detail'}
               </span>
               <button 
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
               </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                {mode === 'summary' && <SummaryView tasks={allTasks} />}
                {mode === 'detail' && selectedTask && (
                    <TaskDetailView 
                        task={selectedTask} 
                        onClose={onClose} 
                        onNavigate={onNavigate} 
                        onUpdateTask={onUpdateTask}
                    />
                )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
