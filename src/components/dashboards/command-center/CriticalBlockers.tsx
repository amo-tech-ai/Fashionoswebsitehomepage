import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

interface Blocker {
  id: string;
  title: string;
  subtitle: string;
  agent: string;
}

interface CriticalBlockersProps {
  blockers: Blocker[];
  onResolve: (id: string) => void;
}

export function CriticalBlockers({ blockers, onResolve }: CriticalBlockersProps) {
  if (blockers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[120px] bg-green-50 rounded-2xl border border-green-100">
        <div className="flex flex-col items-center gap-2 text-green-700">
          <CheckCircle2 className="w-6 h-6" />
          <span className="text-sm font-medium">All clear. No critical blockers.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-amber-600">
        <AlertTriangle className="w-4 h-4" />
        <h3 className="text-sm font-bold uppercase tracking-widest">Critical Attention Required</h3>
      </div>
      
      <div className="grid gap-4">
        {blockers.map((blocker) => (
          <div key={blocker.id} className="flex items-center justify-between p-5 bg-amber-50 rounded-xl border border-amber-100 group hover:border-amber-200 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-white rounded-full text-amber-800 border border-amber-100">
                  {blocker.agent}
                </span>
              </div>
              <h4 className="font-medium text-gray-900">{blocker.title}</h4>
              <p className="text-sm text-gray-600">{blocker.subtitle}</p>
            </div>
            
            <button 
              onClick={() => onResolve(blocker.id)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-amber-200 text-sm font-medium text-amber-900 shadow-sm hover:shadow hover:bg-amber-50 transition-all"
            >
              Resolve <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
