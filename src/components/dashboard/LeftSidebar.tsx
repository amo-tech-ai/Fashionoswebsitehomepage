import { motion } from "motion/react";
import { 
  LayoutDashboard, 
  Command, 
  Calendar, 
  PlusSquare, 
  Layers, 
  Users, 
  Briefcase, 
  Settings, 
  LogOut,
  Monitor
} from "lucide-react";

interface NavItem {
  icon: any;
  label: string;
  active?: boolean;
}

export function LeftSidebar() {
  const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Command, label: "Command Center", active: true },
    { icon: Calendar, label: "Event Dashboard" },
    { icon: PlusSquare, label: "Create Event Wizard" },
    { icon: Monitor, label: "Website Design Wizard" },
    { icon: Layers, label: "Runway & Layout" },
    { icon: Users, label: "Casting & Models" },
    { icon: Briefcase, label: "Designer & Sponsors" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Logout" }
  ];

  return (
    <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                item.active
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}