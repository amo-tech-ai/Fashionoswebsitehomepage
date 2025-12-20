import { useMemo } from 'react';
import { Calendar, Users, AlertTriangle, CheckCircle, Clock, TrendingUp, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useBrandShoot } from '../../../context/BrandShootContext';
import { useEvent } from '../../../context/EventContext';
import {
  analyzeCriticalPath,
  generateEventInsights,
  suggestNextActions,
  generateRunOfShow,
  type Event
} from '../skills/EventsSkill';

interface EventsKitProps {
  onActionClick: (actionId: string, params?: any) => void;
  eventId?: string; // If on event detail page
}

/**
 * EventsKit Component
 * 
 * AI-powered event planning intelligence.
 * Shows different content based on context:
 * - On /events (list): Overview of all events, risk scan, upcoming
 * - On /eventdetail: Specific event analysis, critical path, staffing
 * 
 * Features:
 * - Critical path analysis
 * - Blocker detection
 * - Staffing gap identification
 * - Run of show generation
 * - Next action suggestions
 */
export function EventsKit({ onActionClick, eventId }: EventsKitProps) {
  const { activeProjects } = useBrandShoot(); // Using projects as event proxy
  const { currentEvent, tasks } = useEvent(); // Get real event data if available

  // Mock event data (in production, would come from EventsContext)
  const activeEvent: Event = useMemo(() => {
    // If we have a real event in context, use it (enriched with tasks)
    if (currentEvent) {
       return {
          id: currentEvent.id,
          name: currentEvent.name,
          date: currentEvent.start_date,
          status: currentEvent.status as any,
          venue: currentEvent.venue_name || 'TBD',
          budget: currentEvent.budget_total,
          attendees: currentEvent.attendee_target,
          tasks: tasks.map(t => ({
             id: t.id,
             title: t.title,
             status: t.status === 'to_do' ? 'todo' : t.status === 'in_progress' ? 'in_progress' : 'done',
             priority: t.priority === 'critical' ? 1 : t.priority === 'high' ? 2 : 3,
             estimatedHours: 4, // Default as not in type yet
             deadline: t.deadline
          })),
          // Pass through enriched AI fields
          theme: currentEvent.theme,
          models_count: currentEvent.models_count,
          looks_count: currentEvent.looks_count
       };
    }

    // Fallback to mock/project data
    return {
      id: eventId || '1',
      name: activeProjects[0]?.name || 'Spring/Summer 2025 Show',
      date: activeProjects[0]?.date || '2025-03-15',
      status: 'planning',
      venue: 'Metropolitan Arts Center',
      budget: 150000,
      attendees: 300,
      tasks: [
        { id: '1', title: 'Secure Venue', status: 'done', priority: 1, estimatedHours: 8 },
        { id: '2', title: 'Book Talent', status: 'in_progress', priority: 1, estimatedHours: 16, deadline: '2025-02-01' },
        { id: '3', title: 'Design Run of Show', status: 'todo', priority: 2, estimatedHours: 12, deadline: '2025-02-15', dependencies: ['2'] },
        { id: '4', title: 'Order Catering', status: 'todo', priority: 2, estimatedHours: 4, deadline: '2025-03-01' },
        { id: '5', title: 'Send Invitations', status: 'blocked', priority: 1, estimatedHours: 6, deadline: '2025-02-20', dependencies: ['3'] },
        { id: '6', title: 'Confirm Guest List', status: 'todo', priority: 3, estimatedHours: 3, deadline: '2025-03-10', dependencies: ['5'] },
        { id: '7', title: 'Tech Rehearsal', status: 'todo', priority: 1, estimatedHours: 8, deadline: '2025-03-14', dependencies: ['2', '3'] },
        { id: '8', title: 'Final Walkthrough', status: 'todo', priority: 1, estimatedHours: 4, deadline: '2025-03-14', dependencies: ['7'] },
      ]
    };
  }, [eventId, activeProjects, currentEvent, tasks]);

  // Calculate insights using AI skill
  const insights = useMemo(() => generateEventInsights(activeEvent), [activeEvent]);
  const criticalPath = useMemo(() => analyzeCriticalPath(activeEvent), [activeEvent]);
  const nextActions = useMemo(() => suggestNextActions(activeEvent), [activeEvent]);

  // Determine context: list view or detail view
  const isDetailView = !!eventId;
  const hasCriticalBlockers = criticalPath.blockers.some(b => b.task.priority <= 2);

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 gap-2">
        {isDetailView ? (
          // Detail view actions
          <>
            <QuickActionButton
              icon={AlertTriangle}
              label="Critical Path"
              onClick={() => onActionClick('critical-path')}
              variant={hasCriticalBlockers ? 'critical' : 'default'}
            />
            <QuickActionButton
              icon={Zap}
              label="Run of Show"
              onClick={() => onActionClick('run-of-show')}
              variant="default"
            />
            <QuickActionButton
              icon={Users}
              label="Staffing Check"
              onClick={() => onActionClick('staffing-check')}
              variant="default"
            />
            <QuickActionButton
              icon={TrendingUp}
              label="Risk Scan"
              onClick={() => onActionClick('risk-scan')}
              variant="default"
            />
          </>
        ) : (
          // List view actions
          <>
            <QuickActionButton
              icon={Calendar}
              label="Create Event"
              onClick={() => onActionClick('create-event')}
              variant="default"
            />
            <QuickActionButton
              icon={Clock}
              label="View Calendar"
              onClick={() => onActionClick('view-calendar')}
              variant="default"
            />
            <QuickActionButton
              icon={AlertTriangle}
              label="Risk Scan All"
              onClick={() => onActionClick('risk-scan-all')}
              variant="default"
            />
            <QuickActionButton
              icon={Sparkles}
              label="AI Recommendations"
              onClick={() => onActionClick('ai-recommendations')}
              variant="default"
            />
          </>
        )}
      </div>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {insights.map((insight, index) => (
          <InsightCard key={index} insight={insight} onActionClick={onActionClick} />
        ))}
      </div>

      {/* Critical Blocker Alert (if exists) */}
      {hasCriticalBlockers && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-semibold text-red-900 mb-1">
                Critical Blocker Detected
              </h5>
              <p className="text-xs text-red-700 leading-relaxed mb-3">
                {criticalPath.blockers[0]?.impact}
              </p>
              <button
                onClick={() => onActionClick('fix-blocker', { blockerId: criticalPath.blockers[0]?.task.id })}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
              >
                Resolve Blocker
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Live Status Feed */}
      <div className="mt-2">
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          {isDetailView ? 'Event Status' : 'Upcoming Events'}
        </h4>

        {criticalPath.status === 'on_track' ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-semibold text-green-900 mb-1">
                  Event On Track
                </h5>
                <p className="text-xs text-green-700 leading-relaxed">
                  {criticalPath.message}
                </p>
              </div>
            </div>
          </motion.div>
        ) : criticalPath.status === 'at_risk' ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-semibold text-amber-900 mb-1">
                  Event At Risk
                </h5>
                <p className="text-xs text-amber-700 leading-relaxed mb-3">
                  {criticalPath.message}
                </p>
                <button
                  onClick={() => onActionClick('view-critical-path')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-medium hover:bg-amber-700 transition-colors"
                >
                  View Details
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          // Critical status already handled above
          <div className="text-xs text-gray-500">Status handled by critical blocker alert above</div>
        )}
      </div>

      {/* Next Actions */}
      {nextActions.length > 0 && (
        <div className="mt-2">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Suggested Next Actions
          </h4>
          <div className="space-y-2">
            {nextActions.slice(0, 3).map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2 text-xs bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onActionClick('action', { action: action.action })}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-semibold ${
                  action.priority === 1 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {action.priority}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 font-medium">{action.action}</div>
                  {action.deadline && (
                    <div className="text-gray-500 text-[10px] mt-0.5">
                      Due: {new Date(action.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      {criticalPath.recommendations.length > 0 && (
        <div className="mt-2">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            AI Recommendations
          </h4>
          <div className="space-y-2">
            {criticalPath.recommendations.slice(0, 2).map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2 text-xs text-gray-600 bg-indigo-50 rounded-lg p-2"
              >
                <Sparkles className="w-3 h-3 text-indigo-500 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Run of Show Preview (if detail view) */}
      {isDetailView && (
        <div className="mt-2 bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-600" />
            <h5 className="text-sm font-semibold text-purple-900">
              Run of Show Available
            </h5>
          </div>
          <p className="text-xs text-purple-700 mb-3">
            AI-generated timeline ready. Setup: 4h 45min | Show: 2h | Teardown: 2h
          </p>
          <button
            onClick={() => onActionClick('generate-run-of-show')}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors"
          >
            Generate Full Schedule
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * QuickActionButton - Reusable action button
 */
function QuickActionButton({
  icon: Icon,
  label,
  onClick,
  variant = 'default'
}: {
  icon: any;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'critical';
}) {
  const baseStyles = 'flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer';
  const variantStyles = variant === 'critical'
    ? 'bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300'
    : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300';

  const iconColor = variant === 'critical' ? 'text-red-600' : 'text-gray-600';
  const labelColor = variant === 'critical' ? 'text-red-900' : 'text-gray-700';

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles}`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
      <span className={`text-[10px] font-medium ${labelColor} text-center leading-tight`}>
        {label}
      </span>
    </button>
  );
}

/**
 * InsightCard - Reusable metric card
 */
function InsightCard({
  insight,
  onActionClick
}: {
  insight: any;
  onActionClick: (actionId: string, params?: any) => void;
}) {
  // Icon mapping
  const iconMap: Record<string, any> = {
    completion: CheckCircle,
    blocker: AlertTriangle,
    staffing: Users,
    timeline: Clock
  };

  const Icon = iconMap[insight.type] || CheckCircle;

  // Color mapping
  const colorMap: Record<string, any> = {
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
      valueColor: 'text-red-600'
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-900',
      valueColor: 'text-amber-600'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
      valueColor: 'text-green-600'
    },
    info: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
      textColor: 'text-gray-900',
      valueColor: 'text-gray-700'
    }
  };

  const colors = colorMap[insight.severity || 'info'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${colors.bg} ${colors.border} border rounded-xl p-3 flex flex-col`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center ${colors.iconColor} shrink-0`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className={`text-2xl font-bold ${colors.valueColor} mb-1`}>
        {insight.value}
      </div>

      <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
        {insight.title}
      </div>

      <div className={`text-xs ${colors.textColor} leading-relaxed`}>
        {insight.description}
      </div>

      {insight.action && (
        <button
          onClick={() => onActionClick(insight.action.target)}
          className="mt-3 text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          {insight.action.label}
          <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
}
