import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Layout, 
  Users, 
  Palette, 
  Building2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Camera,
  Shirt,
  Video,
  BookUser,
  UserCircle,
  Calendar,
  CalendarCheck
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ activeScreen, onNavigate, isMobileOpen, onMobileClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const marketingPages = [
    { id: "home", label: "Home", icon: Home, description: "Main Website" },
    { id: "photography", label: "Photography Services", icon: Camera, description: "Services Overview" },
    { id: "clothing", label: "Clothing Photography", icon: Shirt, description: "Fashion Photography" },
    { id: "studio", label: "Studio Hire", icon: Video, description: "Studio Rental" },
    { id: "directory", label: "Directory", icon: BookUser, description: "Fashion Creatives" },
    { id: "directorydetail", label: "Profile Detail", icon: UserCircle, description: "Creator Profile" },
    { id: "events", label: "Events", icon: Calendar, description: "Fashion Events" },
    { id: "eventdetail", label: "Event Details", icon: CalendarCheck, description: "Event Info" }
  ];

  const dashboardPages = [
    { id: "command", label: "Command Center", icon: LayoutDashboard, description: "Event Overview" },
    { id: "runway", label: "Runway & Stage", icon: Layout, description: "Layout Planning" },
    { id: "casting", label: "Casting & Models", icon: Users, description: "Model Management" },
    { id: "designer", label: "Designer & Collection", icon: Palette, description: "Collection Planning" },
    { id: "venue", label: "Venue & Production", icon: Building2, description: "Logistics & Crew" }
  ];

  const handleNavigation = (id: string) => {
    onNavigate(id);
    onMobileClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Brand */}
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-5">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="text-lg tracking-tight text-gray-900">FashionOS</div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                  <Sparkles className="w-3 h-3 text-gray-600" />
                  <span className="text-xs text-gray-700">AI</span>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="w-full flex justify-center">
                <Sparkles className="w-5 h-5 text-gray-700" />
              </div>
            )}
            
            {/* Mobile Close Button */}
            <button
              onClick={onMobileClose}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            {/* Marketing Pages Section */}
            {!isCollapsed && (
              <div className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2">
                Marketing
              </div>
            )}
            <div className="space-y-1 mb-6">
              {marketingPages.map((item) => {
                const Icon = item.icon;
                const isActive = activeScreen === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <div className="text-sm">{item.label}</div>
                        {item.description && (
                          <div className={`text-xs ${
                            isActive ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {item.description}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Dashboard Section */}
            {!isCollapsed && (
              <div className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2 mt-4">
                Dashboard
              </div>
            )}
            {isCollapsed && (
              <div className="h-px bg-gray-200 mb-4" />
            )}
            <div className="space-y-1">
              {dashboardPages.map((item) => {
                const Icon = item.icon;
                const isActive = activeScreen === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <div className="text-sm">{item.label}</div>
                        <div className={`text-xs ${
                          isActive ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* Event Info & Collapse Toggle */}
          <div className="border-t border-gray-200">
            {!isCollapsed && (
              <div className="p-4 bg-gray-50">
                <div className="text-xs text-gray-500 mb-1">Current Event</div>
                <div className="text-sm text-gray-900 mb-1">NYFW SS25</div>
                <div className="text-xs text-gray-600">42 days until show</div>
              </div>
            )}
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex w-full h-12 items-center justify-center border-t border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}