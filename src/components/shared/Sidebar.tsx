import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Users, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Package,
  DollarSign,
  Image as ImageIcon,
  ListOrdered,
  Calendar,
  Activity,
  Handshake,
  FileSignature,
  Zap,
  CheckSquare,
  BarChart3,
  MapPin,
  UserCheck,
  Scissors,
  Monitor
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

  const dashboardPages = [
    { id: "home", label: "Home V1", icon: Monitor, description: "Original" },
    { id: "home-v2", label: "Home V2", icon: Monitor, description: "Previous" },
    { id: "home-v3", label: "Home V3", icon: Sparkles, description: "Latest Concept" },
    { id: "wizard", label: "Start New Shoot", icon: Sparkles, description: "Shoot Builder" },
    { id: "website-wizard", label: "Website Wizard", icon: Monitor, description: "New Web Project" },
    { id: "website-brief-dashboard", label: "Website Brief", icon: Monitor, description: "Review Website Plan" },
    { id: "overview", label: "Project Overview", icon: LayoutDashboard, description: "Bookings & Tracker" },
    { id: "shotlist", label: "Shot List Builder", icon: ListOrdered, description: "Creative Planning" },
    { id: "products", label: "Products", icon: Package, description: "Inventory Management" },
    { id: "gallery", label: "Gallery & Delivery", icon: ImageIcon, description: "Assets Review" },
    { id: "clients", label: "Client Dashboard", icon: Users, description: "CRM & Profiles" },
    { id: "billing", label: "Billing & Payments", icon: DollarSign, description: "Invoices & Finance" },
    { id: "events-list", label: "Events List", icon: Calendar, description: "Manage Events" },
    { id: "event-wizard", label: "Event Wizard", icon: Sparkles, description: "Create New Event" },
    { id: "command-center", label: "Command Center", icon: Activity, description: "Event Operations" },
    { id: "sponsors", label: "Sponsor CRM", icon: Handshake, description: "Manage Partnerships" },
    { id: "designers", label: "Designer Directory", icon: Scissors, description: "Brand Management" },
    { id: "directory-wizard", label: "Add Designer", icon: UserCheck, description: "New Profile" },
    { id: "contracts", label: "Contracts", icon: FileSignature, description: "Legal & Agreements" },
    { id: "activations", label: "Activations", icon: Zap, description: "Brand Experiences" },
    { id: "tasks", label: "Tasks & Deliverables", icon: CheckSquare, description: "Project Management" },
    { id: "analytics", label: "ROI & Analytics", icon: BarChart3, description: "Performance Metrics" },
    { id: "venues", label: "Venue Manager", icon: MapPin, description: "Locations & Spaces" },
    { id: "casting", label: "Casting", icon: UserCheck, description: "Models & Talent" },
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
            {/* Dashboard Section */}
            {!isCollapsed && (
              <div className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2">
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