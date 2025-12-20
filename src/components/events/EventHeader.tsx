import { ArrowLeft, Edit, Share2, Download, Archive, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";

interface EventHeaderProps {
  eventId: string;
  eventName: string;
  eventType: string;
  status: "draft" | "planning" | "confirmed" | "in_progress" | "completed" | "archived";
  daysUntilEvent: number;
  onBack: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  onExport?: () => void;
  onArchive?: () => void;
}

export function EventHeader({
  eventId,
  eventName,
  eventType,
  status,
  daysUntilEvent,
  onBack,
  onEdit,
  onShare,
  onExport,
  onArchive
}: EventHeaderProps) {
  
  // Status badge colors
  const statusColors = {
    draft: "bg-gray-100 text-gray-700",
    planning: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-purple-100 text-purple-700",
    archived: "bg-gray-100 text-gray-500"
  };

  // Countdown ring color based on days remaining
  const getCountdownColor = () => {
    if (daysUntilEvent < 0) return "text-purple-600"; // Past event
    if (daysUntilEvent < 7) return "text-red-600"; // Urgent
    if (daysUntilEvent < 30) return "text-yellow-600"; // Soon
    return "text-green-600"; // Plenty of time
  };

  // Calculate countdown progress (0-100%)
  const getCountdownProgress = () => {
    const maxDays = 180; // 6 months
    const progress = Math.min((maxDays - daysUntilEvent) / maxDays * 100, 100);
    return Math.max(progress, 0);
  };

  const countdownColor = getCountdownColor();
  const progress = getCountdownProgress();

  return (
    <motion.header 
      className="sticky top-0 z-40 bg-white border-b border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        {/* Mobile Layout: Stack vertically */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* LEFT SECTION: Event Info */}
          <div className="flex items-start gap-4">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="shrink-0 mt-1"
              aria-label="Back to events"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="min-w-0 flex-1">
              {/* Event Name */}
              <h1 className="text-2xl sm:text-3xl truncate">
                {eventName}
              </h1>

              {/* Event Type & Status Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {eventType}
                </Badge>
                <Badge className={statusColors[status]}>
                  {status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* CENTER SECTION: Countdown Timer */}
          <div className="flex items-center justify-center lg:justify-start">
            <div className="relative flex items-center justify-center w-28 h-28">
              {/* Circular Progress Ring */}
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-gray-200"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className={countdownColor}
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ 
                    strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100)
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>

              {/* Countdown Text */}
              <div className="flex flex-col items-center justify-center">
                <Clock className={`w-5 h-5 mb-1 ${countdownColor}`} />
                <div className="text-center">
                  <div className={`text-xl ${countdownColor}`}>
                    {Math.abs(daysUntilEvent)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {daysUntilEvent < 0 ? "days ago" : "days"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            {/* Edit Button */}
            <Button
              variant="default"
              onClick={onEdit}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Edit Event</span>
            </Button>

            {/* Share Button */}
            <Button
              variant="outline"
              onClick={onShare}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>

            {/* Export Button */}
            <Button
              variant="outline"
              onClick={onExport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>

            {/* Archive Button (danger style) */}
            {status !== "archived" && (
              <Button
                variant="ghost"
                onClick={onArchive}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Archive className="w-4 h-4" />
                <span className="hidden sm:inline">Archive</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
