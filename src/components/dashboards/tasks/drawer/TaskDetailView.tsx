import { Task } from "../../types";
import { CheckCircle2, AlertCircle, Clock, User, Sparkles, Paperclip, ArrowRight } from "lucide-react";

interface TaskDetailViewProps {
  task: Task;
  onClose: () => void;
  onNavigate?: (page: string) => void;
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskDetailView({ task, onClose, onNavigate, onUpdateTask }: TaskDetailViewProps) {
  const isComplete = task.status === 'done' || task.status === 'Completed'; // Handle strict and loose types

  const handleComplete = () => {
      onUpdateTask?.(task.id, { status: 'done', completed_at: new Date().toISOString() });
      onClose();
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-1 overflow-y-auto p-8 space-y-8 pb-32">
        
        {/* Header */}
        <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-medium text-gray-400">
                <span>{task.workflow_category || task.category}</span>
                <span>•</span>
                <span className={isComplete ? 'text-emerald-600' : 'text-gray-900'}>
                    {task.status}
                </span>
            </div>
            <h2 className="font-serif text-3xl text-black leading-tight">
                {task.title}
            </h2>
        </div>

        {/* Blocking Info (Conditional) */}
        {task.priority === 'critical' && !task.actionRoute && (
             <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-gray-900">Critical Task</p>
                    <p className="text-xs text-gray-500 mt-1">Must be resolved immediately.</p>
                </div>
            </div>
        )}

        {/* Description */}
        <div className="prose prose-sm prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed">
                {task.description || "Review final vendor agreements and ensure all liability clauses match the production insurance requirements. Coordinate with Legal if any discrepancies are found."}
            </p>
        </div>

        {/* Deep Work Action (New) */}
        {task.actionRoute && (
             <div className="p-5 bg-[#FAFAFA] border border-gray-200 rounded-xl relative overflow-hidden group">
                 {/* Decorative */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                 
                 <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Recommended Tool</span>
                 </div>
                 
                 <h4 className="text-lg font-serif text-[#111111] mb-1">{task.actionLabel || 'Launch Tool'}</h4>
                 <p className="text-sm text-gray-500 mb-4">Use the specialist agent to complete this task efficiently.</p>

                 <button 
                    onClick={() => onNavigate?.(task.actionRoute!)}
                    className="w-full bg-white border border-gray-200 hover:border-black text-[#111111] h-10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                 >
                    Launch Agent <ArrowRight className="w-4 h-4" />
                 </button>
             </div>
        )}

        {/* Checklist */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Subtasks</h4>
            <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                    <label key={i} className="flex items-start gap-3 group cursor-pointer">
                        <input type="checkbox" className="mt-1 rounded-full border-gray-300 text-black focus:ring-black" />
                        <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                            Verify item ({i}/3)
                        </span>
                    </label>
                ))}
            </div>
        </div>

        {/* Meta Data */}
        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
                <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Due Date</span>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {task.deadline || task.dueDate || 'ASAP'}
                </div>
            </div>
            <div>
                <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Owner</span>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                    <User className="w-4 h-4 text-gray-400" />
                    {task.assigned_to || task.owner || 'Unassigned'}
                </div>
            </div>
             <div>
                <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Attachments</span>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Paperclip className="w-4 h-4 text-gray-400" />
                    <span>Contract_v2.pdf</span>
                </div>
            </div>
        </div>

      </div>

      {/* Sticky Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="flex gap-3">
            <button 
                onClick={handleComplete}
                disabled={isComplete}
                className="flex-1 bg-black text-white h-12 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
                <CheckCircle2 className="w-4 h-4" />
                {isComplete ? 'Completed' : 'Mark Complete'}
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg hover:border-black text-gray-400 hover:text-black transition-colors">
                <User className="w-4 h-4" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg hover:border-red-500 text-gray-400 hover:text-red-500 transition-colors">
                <AlertCircle className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
}
