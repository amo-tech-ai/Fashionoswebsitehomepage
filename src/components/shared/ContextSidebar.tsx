import { motion, AnimatePresence } from "motion/react";
import { 
  Activity,
  LineChart,
  CheckSquare,
  ListOrdered,
  Calendar,
  Camera,
  Package,
  UserCheck,
  Handshake,
  Users,
  FileSignature,
  DollarSign,
  Monitor,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Settings,
  Layout
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../ui/utils";

interface ContextSidebarProps {
  activeApp: string;
  activeScreen: string;
  onNavigate: (screen: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function ContextSidebar({ 
  activeApp, 
  activeScreen, 
  onNavigate, 
  isMobileOpen, 
  onMobileClose 
}: ContextSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Define menu groups based on the active 'App' context
  const getMenuGroups = () => {
    switch (activeApp) {
      case "events":
        return [
          {
            label: "Planning",
            items: [
              { id: "events", label: "All Events", icon: Calendar },
              { id: "event-wizard", label: "New Event", icon: Plus },
              { id: "command-center", label: "Command Center", icon: Activity },
            ]
          },
          {
            label: "Execution",
            items: [
              { id: "production-timeline", label: "Timeline", icon: ListOrdered },
              { id: "tasks", label: "Tasks", icon: CheckSquare },
              { id: "runway", label: "Runway", icon: Layout },
            ]
          },
          {
            label: "Venues",
            items: [
              { id: "venues", label: "Venue Manager", icon: Package },
            ]
          }
        ];
      
      case "crm":
        return [
          {
            label: "Relationships",
            items: [
              { id: "sponsors", label: "Sponsors", icon: Handshake },
              { id: "clients", label: "Clients", icon: Users },
              { id: "designers", label: "Designers", icon: UserCheck },
            ]
          },
          {
            label: "Outreach",
            items: [
              { id: "campaigns", label: "Campaigns", icon: Sparkles }, // Placeholder
            ]
          }
        ];

      case "finance":
        return [
          {
            label: "Financials",
            items: [
              { id: "billing", label: "Dashboard", icon: DollarSign },
              { id: "contracts", label: "Contracts", icon: FileSignature },
              { id: "analytics", label: "ROI Analytics", icon: LineChart },
            ]
          }
        ];

      case "production":
        return [
          {
            label: "Assets",
            items: [
              { id: "shotlist", label: "Shot Lists", icon: Camera },
              { id: "products", label: "Inventory", icon: Package },
              { id: "gallery", label: "Gallery", icon: Sparkles },
            ]
          },
          {
            label: "Casting",
            items: [
              { id: "casting", label: "Casting Board", icon: UserCheck },
              { id: "scout-finder", label: "Scout Talent", icon: Users },
            ]
          }
        ];
        
      case "dashboard":
      default:
        // Default to the comprehensive view if no specific app is selected
        return [
          {
            label: "Overview",
            items: [
              { id: "overview", label: "Pulse", icon: LineChart },
              { id: "command-center", label: "Command Center", icon: Activity },
            ]
          },
          {
            label: "Quick Links",
            items: [
              { id: "tasks", label: "My Tasks", icon: CheckSquare },
              { id: "events", label: "Events", icon: Calendar },
              { id: "sponsors", label: "Sponsors", icon: Handshake },
            ]
          }
        ];
    }
  };

  const groups = getMenuGroups();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      <div 
        className={cn(
          "fixed left-16 top-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 z-40 flex flex-col",
          isCollapsed ? "w-16" : "w-64",
          // Mobile handling: slide in from left (but after the global rail)
          "lg:translate-x-0", 
           isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 shrink-0 border-b border-gray-50">
          {!isCollapsed && (
            <span className="font-medium text-sm text-gray-500 uppercase tracking-wider">
              {activeApp === 'dashboard' ? 'Overview' : activeApp}
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-black ml-auto"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {groups.map((group, idx) => (
            <div key={idx}>
              {!isCollapsed && group.label && (
                <div className="px-2 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  {group.label}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        onMobileClose?.();
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-2 py-2 rounded-md transition-all text-sm group relative",
                        isActive
                          ? "bg-gray-100 text-black font-medium"
                          : "text-gray-500 hover:text-black hover:bg-gray-50",
                        isCollapsed ? "justify-center" : ""
                      )}
                    >
                      <Icon className={cn(
                        "w-4 h-4 transition-colors",
                        isActive ? "text-black" : "text-gray-400 group-hover:text-black"
                      )} />
                      
                      {!isCollapsed && <span>{item.label}</span>}
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                         <div className="absolute left-10 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                           {item.label}
                         </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
