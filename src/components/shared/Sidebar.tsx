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
  Sparkles
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
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // "Calm Luxury" Navigation Groups: Monitor / Execute / Network / Business
  const groups = [
    {
      id: "monitor",
      label: "Monitor",
      items: [
        { id: "command-center", label: "Command Center", icon: Activity },
        { id: "overview", label: "Pulse", icon: LineChart },
        { id: "analytics", label: "Performance", icon: Sparkles }, // AI/ROI
      ]
    },
    {
      id: "execute",
      label: "Execute",
      items: [
        { id: "tasks", label: "My Tasks", icon: CheckSquare },
        { id: "production-timeline", label: "Timeline", icon: ListOrdered },
        { id: "events-list", label: "Events", icon: Calendar },
        { id: "shotlist", label: "Shot Lists", icon: Camera },
        { id: "products", label: "Inventory", icon: Package },
      ]
    },
    {
      id: "network",
      label: "Network",
      items: [
        { id: "casting", label: "Casting", icon: UserCheck },
        { id: "sponsors", label: "Sponsors", icon: Handshake },
        { id: "clients", label: "Clients", icon: Users },
        { id: "designers", label: "Designers", icon: Users }, // Reusing Users for now
      ]
    },
    {
      id: "business",
      label: "Business",
      items: [
        { id: "contracts", label: "Contracts", icon: FileSignature },
        { id: "billing", label: "Finance", icon: DollarSign },
      ]
    }
  ];

  const createOptions = [
    { id: "wizard", label: "New Shoot", icon: Sparkles },
    { id: "event-wizard", label: "New Event", icon: Calendar },
    { id: "website-wizard", label: "New Website", icon: Monitor },
  ];

  const handleNavigation = (id: string) => {
    onNavigate(id);
    onMobileClose();
    setIsCreateOpen(false);
  };

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

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 z-50 flex flex-col ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 shrink-0 mt-2">
          {!isCollapsed ? (
            <div 
              className="font-serif text-2xl tracking-tighter text-black cursor-pointer" 
              onClick={() => handleNavigation("home")}
            >
              FashionOS
            </div>
          ) : (
            <div className="w-full flex justify-center cursor-pointer" onClick={() => handleNavigation("home")}>
              <span className="font-serif text-2xl tracking-tighter">F</span>
            </div>
          )}
          
          <button
            onClick={onMobileClose}
            className="lg:hidden text-gray-400 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Create Action */}
        <div className="p-4 shrink-0 relative">
          <button
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className={`w-full flex items-center gap-2 bg-black hover:bg-gray-900 text-white transition-all shadow-sm ${
              isCollapsed ? 'justify-center w-10 h-10 rounded-full mx-auto' : 'px-4 py-3 rounded-lg'
            }`}
          >
            <Plus className="w-4 h-4" />
            {!isCollapsed && <span className="text-sm font-medium tracking-wide">Create</span>}
          </button>

          {/* Create Dropdown */}
          <AnimatePresence>
            {isCreateOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute left-4 right-4 top-[calc(100%+8px)] bg-white rounded-lg shadow-xl ring-1 ring-black/5 p-1 z-50 overflow-hidden ${
                  isCollapsed ? 'left-14 w-48 top-0' : ''
                }`}
              >
                {createOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleNavigation(opt.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black rounded-md transition-colors text-left"
                  >
                    <opt.icon className="w-4 h-4" />
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-8 scrollbar-hide">
          {groups.map((group) => (
            <div key={group.id}>
              {!isCollapsed && (
                <div className="px-2 mb-3 text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">
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
                      onClick={() => handleNavigation(item.id)}
                      className={`w-full flex items-center gap-3 px-2 py-2 rounded-md transition-all text-sm group ${
                        isActive
                          ? 'text-black font-medium bg-gray-50'
                          : 'text-gray-500 hover:text-black hover:bg-gray-50/50'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-black' : 'text-gray-400 group-hover:text-black'
                      }`} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer / Context Switcher */}
        <div className="p-4 border-t border-gray-100 bg-white shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors">
              <div className="min-w-0">
                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Active Event</div>
                <div className="text-sm font-medium text-black truncate">NYFW SS25</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-12 border-t border-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-colors shrink-0"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>
    </>
  );
}
