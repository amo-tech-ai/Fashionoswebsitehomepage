import { Activity } from "lucide-react";

interface HealthScoreProps {
  score: number;
  trend: "stable" | "up" | "down";
  status: string;
}

export function HealthScore({ score, trend, status }: HealthScoreProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">System Health</span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-5xl font-serif text-gray-900">{score}</span>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{status}</span>
            <span className="text-xs text-gray-500 capitalize">{trend} trend</span>
          </div>
        </div>
      </div>
    </div>
  );
}
