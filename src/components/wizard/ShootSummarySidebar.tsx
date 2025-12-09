import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  ChevronLeft, 
  ShoppingBag, 
  Trash2, 
  MoreHorizontal, 
  Camera, 
  Video,
  Plus,
  Minus,
  X,
  Calendar,
  Clock
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// Reusing types from the parent, but defining interfaces here for props
interface WizardState {
  service: "photography" | "video" | null;
  category: string | null;
  subType: string | null;
  style: string | null;
  scenes: string[];
  talent: string | null;
  addOns: string[];
  channels: string[];
  date: Date | null;
  timeSlot: string | null;
}

interface ShootSummarySidebarProps {
  state: WizardState;
  onUpdateState: (newState: Partial<WizardState>) => void;
  serviceData: {
    services: any[];
    categories: any[];
    subTypes: Record<string, any[]>;
    styles: any[];
    scenes: { backdrops: any[]; lifestyle: any[] };
    talent: any[];
    addOns: any[];
  };
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function ShootSummarySidebar({ state, onUpdateState, serviceData, mobileOpen, onMobileClose }: ShootSummarySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Calculate totals
  const basePrice = state.service ? 1500 : 0;
  const addOnPrice = state.addOns.reduce((total, id) => {
    const addon = serviceData.addOns.find(a => a.id === id);
    return total + (addon?.price || 0);
  }, 0);
  const totalPrice = basePrice + addOnPrice;

  // Count selected items
  const selectedCount = [
    state.service,
    state.category,
    state.subType,
    state.style,
    state.talent,
    ...state.scenes,
    ...state.addOns
  ].filter(Boolean).length;

  // Helper to find label/image
  const getServiceLabel = () => serviceData.services.find(s => s.id === state.service)?.label;
  const getCategoryLabel = () => serviceData.categories.find(c => c.id === state.category)?.label;
  const getSubTypeItem = () => {
    if (!state.subType) return null;
    const allSubTypes = [
        ...serviceData.subTypes.fashion || [],
        ...serviceData.subTypes.beauty || [],
        ...serviceData.subTypes.jewelry || [],
        ...serviceData.subTypes.video || [],
        ...serviceData.subTypes.default || []
    ];
    return allSubTypes.find(t => t.id === state.subType);
  };
  const getStyleLabel = () => serviceData.styles.find(s => s.id === state.style)?.label;
  const getSceneItem = (id: string) => {
    return [...serviceData.scenes.backdrops, ...serviceData.scenes.lifestyle].find(s => s.id === id);
  };
  const getTalentLabel = () => serviceData.talent.find(t => t.id === state.talent)?.label;
  const getAddOnItem = (id: string) => serviceData.addOns.find(a => a.id === id);
  const getChannelItem = (id: string) => serviceData.channels?.find((c: any) => c.id === id);

  const SummaryItem = ({ 
    title, 
    subtitle, 
    price, 
    image, 
    onRemove 
  }: { 
    title: string; 
    subtitle?: string; 
    price?: number; 
    image?: string; 
    onRemove: () => void; 
  }) => (
    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-3 group hover:border-gray-200 transition-all">
      {image ? (
        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
          <ImageWithFallback src={image} className="w-full h-full object-cover" alt={title} />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-400">
          <ShoppingBag className="w-5 h-5" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-medium text-gray-900 truncate pr-2">{title}</h4>
          <button onClick={onRemove} className="text-gray-300 hover:text-red-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
        {price !== undefined && (
          <div className="mt-1 text-xs font-medium text-gray-900">${price}</div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 xl:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onMobileClose}
      />

      <motion.div
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 380,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed inset-y-0 right-0 z-50 flex flex-col border-l border-gray-200 bg-white h-full overflow-hidden
          xl:static xl:z-auto xl:shadow-none
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0 shadow-2xl" : "translate-x-full xl:translate-x-0"}
        `}
        style={{
          // On mobile (less than xl), we want a fixed width, not the animated width
          // But since we can't conditionally apply style easily without JS window check, 
          // we'll let the class override if possible, but inline styles usually win.
          // We will rely on the fact that 'width' in animate will set the style.
          // If we are on mobile, we might just want to ignore the 'isCollapsed' state.
        }}
      >
      
      {/* Close Button for Mobile */}
      <button 
        onClick={onMobileClose}
        className="xl:hidden absolute top-4 right-4 z-50 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Desktop Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden xl:flex absolute top-4 left-4 z-10 w-8 h-8 items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
      >
        {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Collapsed State */}
      <div
        className={`absolute inset-0 flex flex-col items-center pt-20 transition-opacity duration-300 ${
          isCollapsed ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-gray-900">${totalPrice}</span>
            <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">{selectedCount} items</span>
        </div>
      </div>

      {/* Expanded State */}
      <div
        className={`flex flex-col h-full transition-opacity duration-300 ${
          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
      >
        <div className="p-6 pt-6 border-b border-gray-100">
            <div className="flex items-center justify-end mb-2">
                {/* Spacer for toggle button */}
                <div className="w-8" />
            </div>
            <h2 className="text-xl font-serif font-bold text-gray-900">Shoot Summary</h2>
            <p className="text-sm text-gray-500 mt-1">Your selected services appear here.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Shoot Type */}
            {state.service && (
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Shoot Type</h3>
                    <div className="flex items-center gap-2 text-gray-900 bg-gray-50 p-3 rounded-xl">
                        {state.service === 'photography' ? <Camera className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                        <span className="font-medium capitalize">{state.service} Production</span>
                    </div>
                </div>
            )}

            {/* Scenes */}
            {state.scenes.length > 0 && (
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Scenes</h3>
                    <div className="flex flex-wrap gap-2">
                        {state.scenes.map(id => {
                            const scene = getSceneItem(id);
                            return scene ? (
                                <span key={id} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                    {scene.label}
                                    <button 
                                        onClick={() => onUpdateState({ scenes: state.scenes.filter(s => s !== id) })}
                                        className="ml-1.5 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ) : null;
                        })}
                    </div>
                </div>
            )}

            {/* Date & Time */}
            {(state.date || state.timeSlot) && (
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Date & Time</h3>
                    <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded-xl">
                        {state.date && (
                            <div className="flex items-center gap-2 text-gray-900">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-sm">
                                    {state.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                        )}
                        {state.timeSlot && (
                            <div className="flex items-center gap-2 text-gray-900">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-sm">{state.timeSlot}</span>
                            </div>
                        )}
                         <button 
                            onClick={() => onUpdateState({ date: null, timeSlot: null })}
                            className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 mt-1"
                        >
                            <X className="w-3 h-3" /> Clear Date
                        </button>
                    </div>
                </div>
            )}

            {/* Estimated Length */}
            <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Estimated Length</h3>
                <div className="text-sm font-medium text-gray-900">
                   {state.service ? "Up to 4 hours" : "TBD"}
                </div>
            </div>

            {/* Selected Services List */}
            <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Selected Services</h3>
                <div className="space-y-3">
                    {state.category && (
                        <SummaryItem 
                            title={getCategoryLabel() || state.category} 
                            subtitle="Category"
                            image={serviceData.categories.find(c => c.id === state.category)?.image}
                            onRemove={() => onUpdateState({ category: null })}
                        />
                    )}
                    {state.subType && (
                        <SummaryItem 
                            title={getSubTypeItem()?.label || state.subType} 
                            subtitle="Type"
                            image={getSubTypeItem()?.image}
                            onRemove={() => onUpdateState({ subType: null })}
                        />
                    )}
                    {state.style && (
                        <SummaryItem 
                            title={getStyleLabel() || state.style} 
                            subtitle="Visual Style"
                            image={serviceData.styles.find(s => s.id === state.style)?.image}
                            onRemove={() => onUpdateState({ style: null })}
                        />
                    )}
                    {state.talent && (
                        <SummaryItem 
                            title={getTalentLabel() || state.talent} 
                            subtitle="Talent"
                            onRemove={() => onUpdateState({ talent: null })}
                        />
                    )}
                    {state.addOns.map(id => {
                        const addon = getAddOnItem(id);
                        return addon ? (
                            <SummaryItem 
                                key={id}
                                title={addon.label} 
                                subtitle="Add-On"
                                price={addon.price}
                                onRemove={() => onUpdateState({ addOns: state.addOns.filter(a => a !== id) })}
                            />
                        ) : null;
                    })}
                    {state.channels.map(id => {
                        const channel = getChannelItem(id);
                        return channel ? (
                            <SummaryItem
                                key={id}
                                title={channel.label}
                                subtitle="Channel"
                                image={channel.image}
                                onRemove={() => onUpdateState({ channels: state.channels.filter(c => c !== id) })}
                            />
                        ) : null;
                    })}
                    
                    {selectedCount === 0 && (
                        <div className="text-sm text-gray-400 italic py-4 text-center border border-dashed border-gray-200 rounded-xl">
                            No services selected yet.
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
             <div className="flex justify-between items-end mb-4">
                 <span className="text-sm text-gray-500">Amount Due Today</span>
                 <span className="text-2xl font-serif font-bold text-gray-900">${totalPrice}</span>
             </div>
             <button className="w-full py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
                 Save Draft
             </button>
        </div>
      </div>
    </motion.div>
    </>
  );
}
