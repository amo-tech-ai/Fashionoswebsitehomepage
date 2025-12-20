import { motion } from 'motion/react';
import { Sparkles, X, Maximize2, Minimize2 } from 'lucide-react';

interface PanelHeaderProps {
  currentKit: string;
  pageName: string;
  onClose: () => void;
  onExpand: () => void;
  isExpanded: boolean;
}

/**
 * PanelHeader Component
 * 
 * Displays the header for the AssistantPanel with:
 * - FashionOS Intelligence branding
 * - Active status indicator
 * - Context chip showing current page
 * - Expand/minimize and close controls
 * 
 * @component
 */
export function PanelHeader({
  currentKit,
  pageName,
  onClose,
  onExpand,
  isExpanded,
}: PanelHeaderProps) {
  // Kit-specific colors for visual distinction
  const getKitColor = (kit: string): string => {
    const colors: Record<string, string> = {
      logistics: 'text-amber-600',
      events: 'text-purple-600',
      media: 'text-blue-600',
      services: 'text-indigo-600',
      production: 'text-orange-600',
      executive: 'text-rose-600',
      casting: 'text-pink-600',
      marketing: 'text-green-600',
      sponsors: 'text-teal-600',
    };
    return colors[kit] || 'text-gray-600';
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50 backdrop-blur-sm shrink-0">
      {/* Left Section: Branding + Context */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center text-white shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Title + Status + Context */}
        <div className="min-w-0">
          {/* Title */}
          <h3 className="font-serif font-medium text-gray-900 text-sm leading-tight">
            FashionOS Intelligence
          </h3>

          {/* Status + Context Row */}
          <div className="flex items-center gap-2 mt-0.5">
            {/* Active Status */}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-500 font-medium">Active</span>
            </div>

            {/* Separator */}
            <span className="text-gray-300 text-[10px]">•</span>

            {/* Context Chip */}
            <motion.div
              key={currentKit} // Re-mount on kit change for animation
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-gray-200 rounded-full"
            >
              <span className="text-[10px] text-gray-400 font-medium">You're on:</span>
              <span className="text-[10px] text-gray-900 font-semibold truncate max-w-[120px]">
                {pageName}
              </span>
              <span className={`text-[10px] font-medium ${getKitColor(currentKit)}`}>
                ({currentKit})
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Section: Controls */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Expand/Minimize Button (Desktop Only) */}
        <button
          onClick={onExpand}
          className="hidden lg:flex p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          aria-label={isExpanded ? 'Minimize panel' : 'Expand panel'}
        >
          {isExpanded ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Close assistant"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
