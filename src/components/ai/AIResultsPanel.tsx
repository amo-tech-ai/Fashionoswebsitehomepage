/**
 * AI Results Panel Component
 * 
 * Displays AI-generated insights, recommendations, and analysis results
 * with clear visual hierarchy and actionable next steps.
 * 
 * Features:
 * - Risk analysis display
 * - Recommendations list
 * - Health score visualization
 * - Task suggestions
 * - Brand analysis results
 * - Match scoring
 * 
 * Usage:
 * ```tsx
 * <AIResultsPanel
 *   type="event-analysis"
 *   data={aiResults}
 *   onAction={(action) => handleAction(action)}
 * />
 * ```
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Sparkles,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Target,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

// ============================================================================
// TYPES
// ============================================================================

export interface RiskItem {
  id: string;
  category: string;
  severity: 'critical' | 'warning' | 'suggestion';
  title: string;
  description: string;
  impact: string;
  action_required: string;
  urgency: 'now' | '3_days' | '7_days' | '14_days';
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
}

export interface AIResultsPanelProps {
  type: 'event-analysis' | 'brand-analysis' | 'designer-match' | 'task-plan';
  data: any;
  onAction?: (action: string, data?: any) => void;
  loading?: boolean;
  className?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AIResultsPanel({
  type,
  data,
  onAction,
  loading = false,
  className = '',
}: AIResultsPanelProps) {
  
  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-8 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-6 h-6 text-purple-600" />
          </motion.div>
          <div>
            <h3 className="font-serif text-lg text-gray-900">Analyzing...</h3>
            <p className="text-sm text-gray-500">AI is processing your data</p>
          </div>
        </div>
        <Progress value={60} className="h-2" />
      </div>
    );
  }

  // Render different panels based on type
  switch (type) {
    case 'event-analysis':
      return <EventAnalysisPanel data={data} onAction={onAction} className={className} />;
    case 'brand-analysis':
      return <BrandAnalysisPanel data={data} onAction={onAction} className={className} />;
    case 'designer-match':
      return <DesignerMatchPanel data={data} onAction={onAction} className={className} />;
    case 'task-plan':
      return <TaskPlanPanel data={data} onAction={onAction} className={className} />;
    default:
      return null;
  }
}

// ============================================================================
// EVENT ANALYSIS PANEL
// ============================================================================

function EventAnalysisPanel({
  data,
  onAction,
  className,
}: {
  data: any;
  onAction?: (action: string, data?: any) => void;
  className?: string;
}) {
  const { health_score, risks = [], recommendations = [], tasks = [] } = data;

  const criticalRisks = risks.filter((r: RiskItem) => r.severity === 'critical');
  const warnings = risks.filter((r: RiskItem) => r.severity === 'warning');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg border border-gray-200 ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-gray-900">AI Event Analysis</h3>
            <p className="text-sm text-gray-500">
              Powered by Gemini AI • Generated {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Health Score */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Event Health Score</span>
            <span className="font-serif text-2xl text-gray-900">{health_score}/100</span>
          </div>
          <Progress value={health_score} className="h-2 mb-2" />
          <p className="text-xs text-gray-600">
            {health_score >= 80 && 'Excellent - Event is on track'}
            {health_score >= 60 && health_score < 80 && 'Good - Some areas need attention'}
            {health_score >= 40 && health_score < 60 && 'Fair - Action required'}
            {health_score < 40 && 'Critical - Immediate intervention needed'}
          </p>
        </div>
      </div>

      {/* Critical Risks */}
      {criticalRisks.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Critical Risks ({criticalRisks.length})
          </h4>
          <div className="space-y-3">
            {criticalRisks.map((risk: RiskItem) => (
              <div
                key={risk.id}
                className="p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-red-900">{risk.title}</h5>
                  <span className="text-xs font-medium px-2 py-1 bg-red-600 text-white rounded">
                    {risk.urgency === 'now' ? 'ACT NOW' : `${risk.urgency.replace('_', ' ')}`}
                  </span>
                </div>
                <p className="text-sm text-red-700 mb-2">{risk.description}</p>
                <div className="flex items-center gap-4 text-xs text-red-600">
                  <span>Impact: {risk.impact}</span>
                  <span>•</span>
                  <span>{risk.category}</span>
                </div>
                {onAction && (
                  <Button
                    onClick={() => onAction('resolve-risk', risk)}
                    size="sm"
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {risk.action_required}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Warnings ({warnings.length})
          </h4>
          <div className="space-y-2">
            {warnings.slice(0, 3).map((risk: RiskItem) => (
              <div
                key={risk.id}
                className="p-3 bg-orange-50 border border-orange-200 rounded-lg"
              >
                <h5 className="font-medium text-orange-900 text-sm mb-1">{risk.title}</h5>
                <p className="text-xs text-orange-700">{risk.description}</p>
              </div>
            ))}
            {warnings.length > 3 && (
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                View {warnings.length - 3} more warnings →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            AI Recommendations ({recommendations.length})
          </h4>
          <div className="space-y-2">
            {recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Summary */}
      <div className="p-6">
        <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          Generated Task Plan
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-serif text-2xl text-gray-900">{tasks.length}</div>
            <div className="text-xs text-gray-500">Total Tasks</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="font-serif text-2xl text-purple-900">
              {tasks.filter((t: any) => t.priority === 'critical').length}
            </div>
            <div className="text-xs text-purple-600">Critical</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="font-serif text-2xl text-blue-900">
              {tasks.filter((t: any) => t.is_critical_path).length}
            </div>
            <div className="text-xs text-blue-600">Critical Path</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="font-serif text-2xl text-green-900">
              {Math.round(tasks.reduce((sum: number, t: any) => sum + (t.estimated_hours || 0), 0))}
            </div>
            <div className="text-xs text-green-600">Total Hours</div>
          </div>
        </div>
        {onAction && (
          <Button
            onClick={() => onAction('view-tasks', tasks)}
            className="w-full mt-4 bg-[#111111] hover:bg-black text-white"
          >
            View Full Task Plan
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================================
// BRAND ANALYSIS PANEL
// ============================================================================

function BrandAnalysisPanel({
  data,
  onAction,
  className,
}: {
  data: any;
  onAction?: (action: string, data?: any) => void;
  className?: string;
}) {
  const { brand_analysis, campaign_strategy, asset_plan, pricing } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg border border-gray-200 ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-gray-900">Brand Analysis Complete</h3>
            <p className="text-sm text-gray-500">AI-powered campaign strategy</p>
          </div>
        </div>
      </div>

      {/* Brand Insights */}
      <div className="p-6 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Brand Identity</h4>
        <div className="grid gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Voice</div>
            <div className="text-sm text-gray-900">{brand_analysis?.voice}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Aesthetic</div>
            <div className="text-sm text-gray-900">{brand_analysis?.aesthetic}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Target Audience</div>
            <div className="text-sm text-gray-900">{brand_analysis?.target_audience}</div>
          </div>
        </div>
      </div>

      {/* Campaign Strategy */}
      <div className="p-6 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Recommended Campaign</h4>
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg mb-4">
          <h5 className="font-serif text-lg text-gray-900 mb-2">{campaign_strategy?.title}</h5>
          <p className="text-sm text-gray-700 mb-3">{campaign_strategy?.goal}</p>
          <div className="flex flex-wrap gap-2">
            {campaign_strategy?.channels?.map((channel: string) => (
              <span
                key={channel}
                className="px-3 py-1 bg-white text-xs font-medium text-gray-700 rounded-full"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Plan */}
      <div className="p-6 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Recommended Assets</h4>
        <div className="space-y-2">
          {asset_plan?.map((asset: any) => (
            <div key={asset.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-900 capitalize">
                  {asset.type.replace('_', ' ')}
                </div>
                <div className="text-xs text-gray-500">{asset.rationale}</div>
              </div>
              <div className="text-right">
                <div className="font-serif text-lg text-gray-900">{asset.count}</div>
                <div className="text-xs text-gray-500">{asset.priority}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="p-6">
        <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-4">
          <DollarSign className="w-5 h-5 text-green-600" />
          Investment Estimate
        </h4>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm text-green-700">Total Investment</span>
            <span className="font-serif text-3xl text-green-900">
              ${pricing?.total?.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-green-600">
            Based on {asset_plan?.reduce((sum: number, a: any) => sum + a.count, 0)} assets across{' '}
            {campaign_strategy?.channels?.length} channels
          </div>
        </div>
        {onAction && (
          <Button
            onClick={() => onAction('view-proposal', data)}
            className="w-full bg-[#111111] hover:bg-black text-white"
          >
            View Full Proposal
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================================
// DESIGNER MATCH PANEL
// ============================================================================

function DesignerMatchPanel({
  data,
  onAction,
  className,
}: {
  data: any;
  onAction?: (action: string, data?: any) => void;
  className?: string;
}) {
  const { matches = [], portfolio_score, recommendations = [] } = data;
  const topMatches = matches.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg border border-gray-200 ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-gray-900">Matching Complete</h3>
            <p className="text-sm text-gray-500">Found {matches.length} relevant opportunities</p>
          </div>
        </div>
      </div>

      {/* Portfolio Score */}
      <div className="p-6 border-b border-gray-200">
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Portfolio Quality Score</span>
            <span className="font-serif text-2xl text-gray-900">{portfolio_score}/100</span>
          </div>
          <Progress value={portfolio_score} className="h-2" />
        </div>
      </div>

      {/* Top Matches */}
      <div className="p-6 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Top Opportunities</h4>
        <div className="space-y-3">
          {topMatches.map((match: any) => (
            <div key={match.event.id} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium text-gray-900">{match.event.name}</h5>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg text-purple-600">{match.fit_score}</span>
                  <span className="text-xs text-gray-500">/ 100</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(match.event.date).toLocaleDateString()}
                </span>
                <span className="capitalize">{match.event.type.replace('_', ' ')}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{match.match_reasons[0]}</p>
              {onAction && (
                <Button
                  onClick={() => onAction('view-event', match.event)}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  View Details
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-6">
        <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Career Advice
        </h4>
        <div className="space-y-2">
          {recommendations.map((rec: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// TASK PLAN PANEL
// ============================================================================

function TaskPlanPanel({
  data,
  onAction,
  className,
}: {
  data: any;
  onAction?: (action: string, data?: any) => void;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <h3 className="font-serif text-xl text-gray-900 mb-4">Task Plan</h3>
      <p className="text-sm text-gray-600">Task plan panel implementation...</p>
    </div>
  );
}
