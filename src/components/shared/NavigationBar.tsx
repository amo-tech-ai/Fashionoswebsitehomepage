import { 
  Sparkles, 
  Menu, 
  Search, 
  Bell, 
  ChevronRight,
  HelpCircle,
  Settings,
  Bot
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAgentContext } from "../../lib/ai/AgentContext";

interface NavigationBarProps {
  activeScreen: string;
  onMobileMenuToggle: () => void;
}

export function NavigationBar({ activeScreen, onMobileMenuToggle }: NavigationBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { toggleDrawer, allInsights } = useAgentContext();

  // Map screens to groups for breadcrumbs
  const getBreadcrumbs = () => {
    const map: Record<string, [string, string]> = {
      // Monitor
      "command-center": ["Monitor", "Command Center"],
      "overview": ["Monitor", "Pulse"],
      "analytics": ["Monitor", "Performance"],
      
      // Execute
      "tasks": ["Execute", "Tasks"],
      "production-timeline": ["Execute", "Timeline"],
      "events-list": ["Execute", "Events"],
      "shotlist": ["Execute", "Shot Lists"],
      "products": ["Execute", "Inventory"],
      
      // Network
      "casting": ["Network", "Casting"],
      "sponsors": ["Network", "Sponsors"],
      "clients": ["Network", "Clients"],
      "designers": ["Network", "Designers"],
      
      // Business
      "contracts": ["Business", "Contracts"],
      "billing": ["Business", "Finance"],
      
      // Digital / Other
      "website-brief-dashboard": ["Digital", "Web Projects"],
    };

    return map[activeScreen] || ["Dashboard", "Home"];
  };

  const [group, page] = getBreadcrumbs();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-30 h-16">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left: Mobile Menu + Breadcrumbs */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-gray-500 hover:text-black rounded-md hover:bg-gray-50"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-gray-400 hidden sm:inline">{group}</span>
            <ChevronRight className="w-4 h-4 text-gray-300 hidden sm:inline" />
            <span className="text-black">{page}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* AI Co-Pilot Trigger */}
          <button 
            onClick={toggleDrawer}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${
              allInsights.length > 0 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold hidden md:inline">Co-Pilot</span>
            {allInsights.length > 0 && (
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          <div className="h-6 w-px bg-gray-100 hidden md:block" />

          {/* Icons */}
          <button className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-50 transition-colors relative">
            <Bell className="w-5 h-5" />
            {/* <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" /> */}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2">
            <Avatar className="h-8 w-8 border border-gray-100 cursor-pointer hover:ring-2 hover:ring-gray-100 transition-all">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}