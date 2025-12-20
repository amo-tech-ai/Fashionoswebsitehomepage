import { useState } from 'react';
import { CheckCircle2, Circle, Clock, User, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { EventTask } from '../../lib/types/events.types';
import { getTaskStatusColor, getTaskPriorityColor, isTaskOverdue } from '../../lib/adapters/taskAdapter';

interface TaskCardProps {
  task: EventTask;
  onComplete?: (taskId: string) => void;
  onUpdate?: (taskId: string, updates: Partial<EventTask>) => void;
  onClick?: (task: EventTask) => void;
  showCriticalPath?: boolean;
}

export function TaskCard({ task, onComplete, onUpdate, onClick, showCriticalPath = true }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleCheckboxClick = async () => {
    if (task.status === 'done' || isCompleting) return;
    
    setIsCompleting(true);
    try {
      await onComplete?.(task.id);
    } finally {
      setIsCompleting(false);
    }
  };

  const overdue = isTaskOverdue(task);
  const isDone = task.status === 'done';
  const isCritical = task.is_critical_path && !isDone;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${\n          isCritical && showCriticalPath ? 'border-l-4 border-l-red-500' : ''\n        } ${isDone ? 'opacity-60' : ''}`}
        onClick={() => onClick?.(task)}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              handleCheckboxClick();
            }}
            disabled={isDone || isCompleting}
            className="mt-1 shrink-0"
            aria-label={isDone ? 'Task completed' : 'Mark task as complete'}
          >
            {isDone ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : isCompleting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Circle className="w-5 h-5 text-blue-600" />
              </motion.div>
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className={`text-sm mb-2 ${isDone ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {/* Priority Badge */}
              <Badge className={`text-xs ${getTaskPriorityColor(task.priority)}`}>
                {task.priority.toUpperCase()}
              </Badge>

              {/* Status Badge */}
              <Badge variant="outline" className={`text-xs ${getTaskStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </Badge>

              {/* Critical Path Badge */}
              {isCritical && showCriticalPath && (
                <Badge className="text-xs bg-red-100 text-red-700 border-red-300">
                  CRITICAL PATH
                </Badge>
              )}

              {/* Overdue Badge */}
              {overdue && (
                <Badge className="text-xs bg-red-500 text-white">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  OVERDUE
                </Badge>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
              {/* Deadline */}
              {task.deadline && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span className={overdue ? 'text-red-600 font-medium' : ''}>
                    {formatDeadline(task.deadline)}
                  </span>
                </div>
              )}

              {/* Assigned User */}
              {task.assigned_to && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{task.assigned_to}</span>
                </div>
              )}

              {/* Phase */}
              <Badge variant="outline" className="text-xs">
                {formatPhase(task.workflow_phase)}
              </Badge>
            </div>

            {/* Expandable Description */}
            <AnimatePresence>
              {isExpanded && task.description && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 pt-3 border-t border-gray-200"
                >
                  <p className="text-sm text-gray-600">{task.description}</p>
                  
                  {/* Dependencies */}
                  {task.dependency_task_ids.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Blocked by: {task.dependency_task_ids.length} task(s)
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Expand Button */}
          {task.description && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// Helper functions
function formatDeadline(deadline: string): string {
  const date = new Date(deadline);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}

function formatPhase(phase: string): string {
  return phase
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}