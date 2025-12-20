import { useMemo } from 'react';
import { Package, TrendingUp, AlertTriangle, CheckCircle, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useBrandShoot } from '../../../context/BrandShootContext';
import {
  analyzeReadiness,
  identifyBlockers,
  generateBatchingPlan,
  generateLogisticsInsights,
  type LogisticsInsight
} from '../skills/LogisticsSkill';

interface LogisticsKitProps {
  onActionClick: (actionId: string, params?: any) => void;
}

/**
 * LogisticsKit Component
 * 
 * AI-powered logistics intelligence for sample tracking.
 * Replaces the old AI Logistics sidebar with integrated assistant experience.
 * 
 * Features:
 * - Real-time readiness calculation
 * - Risk detection and blocker identification  
 * - Batching optimization suggestions
 * - Contextual quick actions
 */
export function LogisticsKit({ onActionClick }: LogisticsKitProps) {
  const { sampleList } = useBrandShoot();

  // Calculate insights using AI skill
  const insights = useMemo(() => generateLogisticsInsights(sampleList), [sampleList]);
  const readiness = useMemo(() => analyzeReadiness(sampleList), [sampleList]);
  const blockers = useMemo(() => identifyBlockers(sampleList), [sampleList]);
  const batching = useMemo(() => generateBatchingPlan(sampleList), [sampleList]);

  // Determine if we have critical issues
  const hasCriticalBlockers = blockers.some(b => b.severity === 'critical');
  const hasWarnings = readiness.status === 'warning' || readiness.status === 'critical';

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 gap-2">
        <QuickActionButton
          icon={AlertTriangle}
          label="Missing Samples"
          onClick={() => onActionClick('show-missing')}
          variant={hasCriticalBlockers ? 'critical' : 'default'}
        />
        <QuickActionButton
          icon={TrendingUp}
          label="Batching Plan"
          onClick={() => onActionClick('batching-plan')}
          variant="default"
        />
        <QuickActionButton
          icon={CheckCircle}
          label="Prep Checklist"
          onClick={() => onActionClick('prep-checklist')}
          variant="default"
        />
        <QuickActionButton
          icon={Truck}
          label="Message Studio"
          onClick={() => onActionClick('message-studio')}
          variant="default"
        />
      </div>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {insights.map((insight, index) => (
          <InsightCard key={index} insight={insight} onActionClick={onActionClick} />
        ))}
      </div>

      {/* Live Status Feed */}
      <div className="mt-2">
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          Live Status
        </h4>
        
        {hasCriticalBlockers ? (
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
                  {blockers.filter(b => b.severity === 'critical').length} Critical Blocker{blockers.filter(b => b.severity === 'critical').length > 1 ? 's' : ''}
                </h5>
                <p className="text-xs text-red-700 leading-relaxed mb-3">
                  {blockers.filter(b => b.severity === 'critical')[0]?.impact}
                </p>
                <button
                  onClick={() => onActionClick('fix-blockers')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
                >
                  Fix Blockers
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : hasWarnings ? (
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
                  {readiness.awaitingSamples} Sample{readiness.awaitingSamples > 1 ? 's' : ''} Pending
                </h5>
                <p className="text-xs text-amber-700 leading-relaxed mb-3">
                  {readiness.message}
                </p>
                <button
                  onClick={() => onActionClick('view-details')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-medium hover:bg-amber-700 transition-colors"
                >
                  View Details
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
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
                  All Samples On Track
                </h5>
                <p className="text-xs text-green-700 leading-relaxed">
                  {readiness.message} Ready to shoot.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* AI Recommendations */}
      {readiness.recommendations.length > 0 && (
        <div className="mt-2">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            AI Recommendations
          </h4>
          <div className="space-y-2">
            {readiness.recommendations.slice(0, 2).map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-2"
              >
                <Sparkles className="w-3 h-3 text-indigo-500 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Batching Optimization Preview */}
      {batching.totalBatches > 0 && (
        <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <h5 className="text-sm font-semibold text-indigo-900">
              Optimization Available
            </h5>
          </div>
          <p className="text-xs text-indigo-700 mb-3">
            Batch {batching.totalBatches} groups to save {batching.estimatedTimeSavings} of setup time.
          </p>
          <button
            onClick={() => onActionClick('view-batching-plan')}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors"
          >
            View Full Plan
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * QuickActionButton - Action buttons at top of kit
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
 * InsightCard - Metric cards in 2x2 grid
 */
function InsightCard({
  insight,
  onActionClick
}: {
  insight: LogisticsInsight;
  onActionClick: (actionId: string, params?: any) => void;
}) {
  // Icon mapping
  const iconMap = {
    milestone: Package,
    readiness: CheckCircle,
    risk: AlertTriangle,
    optimization: TrendingUp
  };

  const Icon = iconMap[insight.type] || Package;

  // Color mapping based on severity
  const colorMap = {
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
          onClick={() => onActionClick(insight.action!.target)}
          className="mt-3 text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          {insight.action.label}
          <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
}
