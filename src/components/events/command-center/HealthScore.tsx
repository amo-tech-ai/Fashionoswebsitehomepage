interface HealthScoreProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
  status: string;
}

export function HealthScore({ score, trend, status }: HealthScoreProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <h1 className="font-serif text-8xl text-black tracking-tighter">
          {score}
        </h1>
        <span className="absolute top-2 -right-6 text-xl text-gray-400 font-serif">%</span>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${score > 90 ? 'bg-emerald-500' : score > 70 ? 'bg-amber-500' : 'bg-red-500'}`} />
        <span className="text-sm font-medium tracking-widest uppercase text-gray-500">{status}</span>
      </div>
    </div>
  );
}
