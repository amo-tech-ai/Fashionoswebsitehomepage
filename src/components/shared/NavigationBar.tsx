import { motion } from "motion/react";
import { Sparkles, Menu } from "lucide-react";

interface NavigationBarProps {
  activeScreen: string;
  onMobileMenuToggle: () => void;
}

export function NavigationBar({ activeScreen, onMobileMenuToggle }: NavigationBarProps) {
  const getPageTitle = () => {
    switch (activeScreen) {
      case "command":
        return "Event Command Center";
      case "runway":
        return "Runway & Stage Layout";
      case "casting":
        return "Casting & Models Management";
      case "designer":
        return "Designer & Collection";
      case "venue":
        return "Venue & Production";
      default:
        return "Dashboard";
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu Button + Page Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden text-gray-700 hover:text-gray-900"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-base md:text-lg text-gray-900">{getPageTitle()}</h1>
        </div>

        {/* Right side - AI Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs md:text-sm">Gemini 3 Powered</span>
        </div>
      </div>
    </nav>
  );
}