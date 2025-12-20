/**
 * Success Screen Component
 * 
 * Reusable success screen shown after completing wizards or important actions.
 * Follows "Calm Luxury" design with smooth animations and clear next steps.
 * 
 * Usage:
 * ```tsx
 * <SuccessScreen
 *   title="Event Created Successfully"
 *   message="NYFW SS25 is now live. We've generated 120 tasks to get you started."
 *   icon={<CheckCircle className="w-16 h-16" />}
 *   primaryAction={{ label: "View Event", onClick: () => navigate('/events/123') }}
 *   secondaryAction={{ label: "Create Another", onClick: () => reset() }}
 * />
 * ```
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

export interface SuccessScreenProps {
  /** Main headline */
  title: string;
  
  /** Supporting message with details */
  message: string;
  
  /** Optional custom icon (defaults to CheckCircle) */
  icon?: React.ReactNode;
  
  /** Primary call-to-action */
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  
  /** Secondary action (optional) */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  
  /** Optional stats to display */
  stats?: Array<{
    label: string;
    value: string | number;
  }>;
  
  /** Show confetti animation */
  showConfetti?: boolean;
  
  /** Custom className */
  className?: string;
}

/**
 * Success Screen Component
 */
export function SuccessScreen({
  title,
  message,
  icon,
  primaryAction,
  secondaryAction,
  stats,
  showConfetti = true,
  className = '',
}: SuccessScreenProps) {
  
  return (
    <div className={`flex flex-col items-center justify-center min-h-[600px] p-8 ${className}`}>
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
          delay: 0.1,
        }}
        className="mb-8"
      >
        <div className="relative">
          {/* Icon */}
          <div className="text-green-600">
            {icon || <CheckCircle className="w-20 h-20 md:w-24 md:h-24" />}
          </div>
          
          {/* Sparkle effect */}
          {showConfetti && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="absolute -top-2 -right-2 text-yellow-500"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="absolute -bottom-2 -left-2 text-yellow-500"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="font-serif text-3xl md:text-4xl text-[#111111] text-center mb-4"
      >
        {title}
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-base md:text-lg text-gray-600 text-center max-w-md mb-8"
      >
        {message}
      </motion.p>

      {/* Stats (if provided) */}
      {stats && stats.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-wrap gap-6 mb-8 justify-center"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-2xl md:text-3xl text-[#111111] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 mt-4"
      >
        {/* Primary Action */}
        {primaryAction && (
          <Button
            onClick={primaryAction.onClick}
            disabled={primaryAction.loading}
            className="bg-[#111111] text-white hover:bg-black h-11 px-8 rounded-lg font-medium transition-colors"
          >
            {primaryAction.loading ? 'Loading...' : primaryAction.label}
          </Button>
        )}

        {/* Secondary Action */}
        {secondaryAction && (
          <Button
            onClick={secondaryAction.onClick}
            variant="outline"
            className="h-11 px-8 rounded-lg font-medium border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {secondaryAction.label}
          </Button>
        )}
      </motion.div>
    </div>
  );
}

/**
 * Pre-configured Success Screens for Common Scenarios
 */

export function EventCreatedSuccess({
  eventName,
  tasksGenerated,
  onViewEvent,
  onCreateAnother,
}: {
  eventName: string;
  tasksGenerated: number;
  onViewEvent: () => void;
  onCreateAnother: () => void;
}) {
  return (
    <SuccessScreen
      title="Event Created Successfully"
      message={`${eventName} is now live. We've generated ${tasksGenerated} tasks to get you started.`}
      stats={[
        { label: 'Tasks Generated', value: tasksGenerated },
        { label: 'Workflow Phases', value: 5 },
        { label: 'Days to Event', value: 'TBD' },
      ]}
      primaryAction={{
        label: 'View Event Dashboard',
        onClick: onViewEvent,
      }}
      secondaryAction={{
        label: 'Create Another Event',
        onClick: onCreateAnother,
      }}
    />
  );
}

export function CampaignCreatedSuccess({
  campaignName,
  assetsPlanned,
  onViewCampaign,
  onAdjustPlan,
}: {
  campaignName: string;
  assetsPlanned: number;
  onViewCampaign: () => void;
  onAdjustPlan: () => void;
}) {
  return (
    <SuccessScreen
      title="Campaign Proposal Ready"
      message={`${campaignName} proposal is complete with ${assetsPlanned} assets planned across multiple channels.`}
      stats={[
        { label: 'Assets Planned', value: assetsPlanned },
        { label: 'Channels', value: 3 },
        { label: 'Est. Budget', value: '$12K' },
      ]}
      primaryAction={{
        label: 'View Campaign',
        onClick: onViewCampaign,
      }}
      secondaryAction={{
        label: 'Adjust Plan',
        onClick: onAdjustPlan,
      }}
    />
  );
}

export function SponsorAddedSuccess({
  sponsorName,
  onViewCRM,
  onAddAnother,
}: {
  sponsorName: string;
  onViewCRM: () => void;
  onAddAnother: () => void;
}) {
  return (
    <SuccessScreen
      title="Sponsor Added"
      message={`${sponsorName} has been added to your pipeline. We've calculated an initial fit score.`}
      stats={[
        { label: 'Fit Score', value: '92%' },
        { label: 'Status', value: 'Lead' },
      ]}
      primaryAction={{
        label: 'View Sponsor CRM',
        onClick: onViewCRM,
      }}
      secondaryAction={{
        label: 'Add Another Sponsor',
        onClick: onAddAnother,
      }}
    />
  );
}

export function DesignerProfileSuccess({
  designerName,
  onViewProfile,
  onBrowseEvents,
}: {
  designerName: string;
  onViewProfile: () => void;
  onBrowseEvents: () => void;
}) {
  return (
    <SuccessScreen
      title="Profile Created"
      message={`${designerName}'s profile is now live. Start browsing events or wait for match recommendations.`}
      stats={[
        { label: 'Profile Score', value: '95%' },
        { label: 'Available Events', value: 12 },
      ]}
      primaryAction={{
        label: 'View Profile',
        onClick: onViewProfile,
      }}
      secondaryAction={{
        label: 'Browse Events',
        onClick: onBrowseEvents,
      }}
    />
  );
}

export function WebsiteProjectSuccess({
  projectName,
  pagesPlanned,
  onViewProject,
  onStartDesign,
}: {
  projectName: string;
  pagesPlanned: number;
  onViewProject: () => void;
  onStartDesign: () => void;
}) {
  return (
    <SuccessScreen
      title="Website Project Created"
      message={`${projectName} is ready. We've outlined ${pagesPlanned} pages based on your requirements.`}
      stats={[
        { label: 'Pages', value: pagesPlanned },
        { label: 'Sections', value: 24 },
        { label: 'Timeline', value: '6 weeks' },
      ]}
      primaryAction={{
        label: 'View Project',
        onClick: onViewProject,
      }}
      secondaryAction={{
        label: 'Start Design',
        onClick: onStartDesign,
      }}
    />
  );
}

export function FormSubmittedSuccess({
  title = 'Submitted Successfully',
  message = 'We\'ve received your submission and will get back to you shortly.',
  onClose,
}: {
  title?: string;
  message?: string;
  onClose: () => void;
}) {
  return (
    <SuccessScreen
      title={title}
      message={message}
      primaryAction={{
        label: 'Close',
        onClick: onClose,
      }}
    />
  );
}
