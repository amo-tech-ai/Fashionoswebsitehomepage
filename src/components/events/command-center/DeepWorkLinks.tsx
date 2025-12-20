import { ArrowRight, LayoutGrid, DollarSign, Calendar, Users } from "lucide-react";

interface DeepWorkLinksProps {
  onNavigate: (section: string) => void;
}

export function DeepWorkLinks({ onNavigate }: DeepWorkLinksProps) {
  const links = [
    { id: "tasks", label: "Task Board", icon: LayoutGrid, count: 12 },
    { id: "budget", label: "Budget Detail", icon: DollarSign },
    { id: "schedule", label: "Run of Show", icon: Calendar },
    { id: "team", label: "Team & Staff", icon: Users },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-gray-100">
      {links.map(link => (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id)}
          className="flex flex-col items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors group text-center"
        >
          <div className="text-gray-400 group-hover:text-black transition-colors">
            <link.icon className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-gray-600 group-hover:text-black">
            {link.label}
          </span>
        </button>
      ))}
    </div>
  );
}
