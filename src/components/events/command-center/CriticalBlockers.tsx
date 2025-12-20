import { AlertCircle, ArrowRight } from "lucide-react";

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
  if (blockers.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl text-black">Critical Decisions</h3>
        <p className="text-gray-400 text-sm mt-1">Requires executive attention</p>
      </div>
      
      {blockers.map(blocker => (
        <div 
          key={blocker.id}
          className="group flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl cursor-pointer"
          onClick={() => onResolve(blocker.id)}
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-black group-hover:text-red-600 transition-colors">
                {blocker.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1">{blocker.subtitle}</p>
              <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Source: {blocker.agent}
              </div>
            </div>
          </div>
          
          <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-100 text-gray-300 group-hover:bg-black group-hover:border-black group-hover:text-white transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
