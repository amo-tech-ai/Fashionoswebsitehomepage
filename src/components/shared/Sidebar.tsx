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
  BarChart3,
  MapPin,
  UserCheck,
  Scissors,
  Monitor,
  Plus,
  Briefcase
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

  const groups = [
    {
      id: "workspace",
      label: "Workspace",
      items: [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "command-center", label: "Command Center", icon: Activity },
      ]
    },
    {
      id: "production",
      label: "Production",
      items: [
        { id: "shotlist", label: "Shot Lists", icon: ListOrdered },
        { id: "products", label: "Inventory", icon: Package },
        { id: "casting", label: "Casting", icon: UserCheck },
        { id: "gallery", label: "Gallery", icon: ImageIcon },
      ]
    },
    {
      id: "events",
      label: "Events",
      items: [
        { id: "events-list", label: "Schedule", icon: Calendar },
        { id: "venues", label: "Venues", icon: MapPin },
        { id: "activations", label: "Run of Show", icon: Zap },
        { id: "sponsors", label: "Sponsors", icon: Handshake },
      ]
    },
    {
      id: "network",
      label: "Network",
      items: [
        { id: "clients", label: "Clients", icon: Users },
        { id: "designers", label: "Designers", icon: Scissors },
      ]
    },
    {
      id: "business",
      label: "Business",
      items: [
        { id: "contracts", label: "Contracts", icon: FileSignature },
        { id: "billing", label: "Finance", icon: DollarSign },
        { id: "analytics", label: "Performance", icon: BarChart3 },
      ]
    },
    {
      id: "digital",
      label: "Digital",
      items: [
        { id: "website-brief-dashboard", label: "Web Projects", icon: Monitor },
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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 flex flex-col ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo Area */}
        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-5 shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center gap-2 font-serif text-xl tracking-tight text-gray-900 cursor-pointer" onClick={() => handleNavigation("home")}>
              FashionOS
            </div>
          ) : (
            <div className="w-full flex justify-center cursor-pointer" onClick={() => handleNavigation("home")}>
              <span className="font-serif text-xl">F</span>
            </div>
          )}
          
          <button
            onClick={onMobileClose}
            className="lg:hidden text-gray-400 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Create Action */}
        <div className="p-4 border-b border-gray-100 shrink-0 relative">
          <button
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className={`w-full flex items-center gap-2 bg-gray-900 hover:bg-black text-white rounded-lg transition-colors shadow-sm ${
              isCollapsed ? 'justify-center py-3' : 'px-4 py-2.5'
            }`}
          >
            <Plus className="w-4 h-4" />
            {!isCollapsed && <span className="text-sm font-medium">New Project</span>}
          </button>

          {/* Create Dropdown */}
          <AnimatePresence>
            {isCreateOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute left-4 right-4 top-[calc(100%+8px)] bg-white rounded-lg shadow-xl border border-gray-100 p-2 z-50 overflow-hidden ${
                  isCollapsed ? 'left-4 w-48' : ''
                }`}
              >
                {createOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleNavigation(opt.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black rounded-md transition-colors text-left"
                  >
                    <opt.icon className="w-4 h-4 text-gray-400" />
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {groups.map((group) => (
            <div key={group.id}>
              {!isCollapsed && (
                <div className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {group.label}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm group ${
                        isActive
                          ? 'bg-gray-100 text-gray-900 font-medium'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
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
        <div className="border-t border-gray-100 p-4 bg-gray-50/50 shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-100 p-2 -m-2 rounded-lg transition-colors">
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Active Event</div>
                <div className="text-sm font-semibold text-gray-900 truncate">NYFW SS25</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-10 border-t border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors shrink-0"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>
    </>
  );
}