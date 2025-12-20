import { Task } from "../../types";

interface SummaryViewProps {
  tasks: Task[];
}

export function SummaryView({ tasks }: SummaryViewProps) {
  const total = tasks.length;
  const pending = tasks.filter(t => t.status !== 'Completed').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const atRisk = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length; // Simple proxy for risk

  return (
    <div className="h-full flex flex-col p-8 space-y-12">
      {/* 1. Workflow Health */}
      <section>
        <h3 className="font-serif text-2xl text-black leading-tight">
          {atRisk > 0 
            ? `${atRisk} critical items require attention.` 
            : "Workflow is currently on track."}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          {pending} active tasks remaining in this phase.
        </p>
      </section>

      {/* 2. Minimal Counts */}
      <section className="space-y-8">
        <div className="flex items-baseline justify-between border-b border-gray-100 pb-2">
            <span className="text-sm text-gray-400 uppercase tracking-widest">Total</span>
            <span className="font-serif text-2xl text-gray-900">{total}</span>
        </div>
        
        <div className="flex items-baseline justify-between border-b border-gray-100 pb-2">
            <span className="text-sm text-gray-400 uppercase tracking-widest">Pending</span>
            <span className="font-serif text-2xl text-gray-900">{pending}</span>
        </div>

        <div className="flex items-baseline justify-between border-b border-gray-100 pb-2">
            <span className="text-sm text-gray-400 uppercase tracking-widest">Completed</span>
            <span className="font-serif text-2xl text-gray-900">{completed}</span>
        </div>

        <div className="flex items-baseline justify-between border-b border-gray-100 pb-2">
            <span className={`text-sm uppercase tracking-widest ${atRisk > 0 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>At Risk</span>
            <span className={`font-serif text-2xl ${atRisk > 0 ? 'text-red-600' : 'text-gray-300'}`}>{atRisk}</span>
        </div>
      </section>
    </div>
  );
}
