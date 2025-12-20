import { 
  Calendar, 
  Users, 
  DollarSign, 
  Settings, 
  Box,
  LayoutGrid,
  Command,
  MessageSquare
} from "lucide-react";
import { cn } from "../ui/utils";

interface GlobalRailProps {
  activeApp: string;
  onAppChange: (appId: string) => void;
}

export function GlobalRail({ activeApp, onAppChange }: GlobalRailProps) {
  const apps = [
    { id: "dashboard", icon: LayoutGrid, label: "Overview" },
    { id: "events", icon: Calendar, label: "Events" },
    { id: "crm", icon: Users, label: "CRM" },
    { id: "production", icon: Box, label: "Production" },
    { id: "finance", icon: DollarSign, label: "Finance" },
    { id: "messages", icon: MessageSquare, label: "Messages" },
    { id: "settings", icon: Settings, label: "Admin" },
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 bg-zinc-950 flex flex-col items-center py-6 border-r border-zinc-800 z-50">
      {/* Brand Icon */}
      <div className="mb-8 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-serif text-xl font-bold">
        F
      </div>

      {/* App Icons */}
      <div className="flex-1 flex flex-col gap-4 w-full px-2">
        {apps.map((app) => {
          const isActive = activeApp === app.id;
          return (
            <button
              key={app.id}
              onClick={() => onAppChange(app.id)}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group relative",
                isActive 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-zinc-500 hover:text-white hover:bg-white/5"
              )}
            >
              <app.icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute left-14 bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-zinc-800">
                {app.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <button className="w-10 h-10 rounded-full bg-zinc-900 text-zinc-500 hover:text-white flex items-center justify-center transition-colors mt-auto">
        <Command className="w-4 h-4" />
      </button>
    </div>
  );
}
