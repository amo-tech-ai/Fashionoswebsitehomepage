import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Menu, 
  Search, 
  Bell, 
  ChevronRight,
  HelpCircle,
  Settings
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NavigationBarProps {
  activeScreen: string;
  onMobileMenuToggle: () => void;
}

export function NavigationBar({ activeScreen, onMobileMenuToggle }: NavigationBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  // Map screens to groups for breadcrumbs
  const getBreadcrumbs = () => {
    const map: Record<string, [string, string]> = {
      "overview": ["Workspace", "Overview"],
      "command-center": ["Workspace", "Command Center"],
      "shotlist": ["Production", "Shot Lists"],
      "products": ["Production", "Inventory"],
      "casting": ["Production", "Casting"],
      "gallery": ["Production", "Gallery"],
      "events-list": ["Events", "Schedule"],
      "venues": ["Events", "Venues"],
      "activations": ["Events", "Run of Show"],
      "sponsors": ["Events", "Sponsors"],
      "clients": ["Network", "Clients"],
      "designers": ["Network", "Designers"],
      "contracts": ["Business", "Contracts"],
      "billing": ["Business", "Finance"],
      "analytics": ["Business", "Performance"],
      "website-brief-dashboard": ["Digital", "Web Projects"],
    };

    return map[activeScreen] || ["Dashboard", "Home"];
  };

  const [group, page] = getBreadcrumbs();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 h-16">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left: Mobile Menu + Breadcrumbs */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 hidden sm:inline">{group}</span>
            <ChevronRight className="w-4 h-4 text-gray-400 hidden sm:inline" />
            <span className="font-medium text-gray-900">{page}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Search (Desktop) */}
          <div className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
            />
          </div>

          <div className="h-6 w-px bg-gray-200 hidden md:block" />

          {/* Icons */}
          <button className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
          
          <button className="hidden md:block p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden md:block">
              <div className="text-sm font-medium text-gray-900">Alex Chen</div>
              <div className="text-xs text-gray-500">Producer</div>
            </div>
            <Avatar className="h-8 w-8 border border-gray-200 cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}