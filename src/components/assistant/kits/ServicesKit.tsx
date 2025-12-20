/**
 * ServicesKit - Service package recommendations and pricing intelligence
 * 
 * Quick Actions:
 * 1. Compare Packages - Side-by-side comparison
 * 2. Get Custom Quote - Interactive quote builder
 * 3. Book Consultation - Schedule planning call
 * 4. View Portfolio - See sample work
 * 
 * Insight Cards:
 * 1. Recommended Package - AI-selected best fit
 * 2. Estimated Cost - Price range prediction
 * 3. Timeline - Typical delivery timeframe
 * 4. Popular Choice - Social proof/trending
 */

import { Scale, Calculator, Calendar, Eye, Sparkles, DollarSign, Clock, TrendingUp } from 'lucide-react';
import {
  recommendPackage,
  estimatePricing,
  forecastTimeline,
  SERVICE_PACKAGES,
  type ClientRequirements,
  type ServicePackage,
} from '../skills/ServicesSkill';

interface ServicesKitProps {
  onActionClick: (actionId: string, params?: any) => void;
}

export function ServicesKit({ onActionClick }: ServicesKitProps) {
  
  // ============================================================================
  // MOCK CLIENT REQUIREMENTS - Replace with real data from form/context
  // ============================================================================
  
  const mockClientRequirements: ClientRequirements = {
    category: 'clothing',
    budget: 2500,
    timeline: 21,
    assetsNeeded: 45,
    priority: 'quality',
  };

  // ============================================================================
  // AI CALCULATIONS
  // ============================================================================

  // Get package recommendations
  const recommendations = recommendPackage(mockClientRequirements);
  const topRecommendation = recommendations[0];

  // Estimate pricing for top recommendation
  const pricing = estimatePricing(topRecommendation.package, mockClientRequirements);

  // Forecast timeline
  const timeline = forecastTimeline(topRecommendation.package, mockClientRequirements);

  // Get popular package (most commonly chosen)
  const popularPackage = SERVICE_PACKAGES.find(p => p.id === 'clothing-premium') || SERVICE_PACKAGES[0];

  // ============================================================================
  // QUICK ACTIONS
  // ============================================================================

  const quickActions = [
    {
      id: 'compare-packages',
      icon: Scale,
      label: 'Compare Packages',
      description: 'Side-by-side view',
    },
    {
      id: 'get-quote',
      icon: Calculator,
      label: 'Get Custom Quote',
      description: 'Interactive builder',
    },
    {
      id: 'book-consultation',
      icon: Calendar,
      label: 'Book Consultation',
      description: 'Schedule call',
    },
    {
      id: 'view-portfolio',
      icon: Eye,
      label: 'View Portfolio',
      description: 'See our work',
    },
  ];

  // ============================================================================
  // INSIGHT CARDS
  // ============================================================================

  const insightCards = [
    {
      id: 'recommended',
      icon: Sparkles,
      label: 'Recommended',
      value: topRecommendation.package.name.split(' ')[0], // "Premium" or "Essential"
      status: 'success' as const,
      subtitle: `${topRecommendation.fitScore}/100 match`,
      detail: topRecommendation.package.tier,
    },
    {
      id: 'estimated-cost',
      icon: DollarSign,
      label: 'Estimated Cost',
      value: `$${(pricing.total / 1000).toFixed(1)}k`,
      status: pricing.total <= mockClientRequirements.budget * 1.1 ? 'success' as const : 'warning' as const,
      subtitle: pricing.total <= mockClientRequirements.budget ? 'Within budget' : 'Slightly over',
      detail: `${topRecommendation.package.deliverables.editedImages} images`,
    },
    {
      id: 'timeline',
      icon: Clock,
      label: 'Timeline',
      value: `${timeline.estimatedDays}d`,
      status: timeline.estimatedDays <= mockClientRequirements.timeline ? 'success' as const : 'warning' as const,
      subtitle: timeline.confidence === 'high' ? 'High confidence' : 'Estimated',
      detail: timeline.rushAvailable ? 'Rush available' : 'Standard',
    },
    {
      id: 'popular',
      icon: TrendingUp,
      label: 'Popular Choice',
      value: popularPackage.tier.charAt(0).toUpperCase() + popularPackage.tier.slice(1),
      status: 'info' as const,
      subtitle: '85% choose this',
      detail: `$${(popularPackage.basePrice / 1000).toFixed(1)}k`,
    },
  ];

  // ============================================================================
  // STATUS FEED
  // ============================================================================

  const statusItems = [];

  // Show top recommendation
  statusItems.push({
    icon: Sparkles,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    title: `${topRecommendation.package.name} - Perfect Fit`,
    description: topRecommendation.reasons[0] || 'Best match for your needs',
    action: {
      label: 'View Details',
      onClick: () => onActionClick('view-package', { packageId: topRecommendation.package.id }),
    },
  });

  // Show pricing breakdown
  statusItems.push({
    icon: DollarSign,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    title: `Estimated Cost: $${pricing.total.toLocaleString()}`,
    description: `${topRecommendation.package.deliverables.editedImages} edited images + ${pricing.addOns.length} add-on${pricing.addOns.length !== 1 ? 's' : ''}`,
    action: {
      label: 'See Breakdown',
      onClick: () => onActionClick('pricing-breakdown'),
    },
  });

  // Show timeline forecast
  statusItems.push({
    icon: Clock,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    title: `${timeline.estimatedDays}-Day Delivery`,
    description: timeline.breakdown.map(b => `${b.phase} (${b.days}d)`).join(', '),
    action: timeline.rushAvailable ? {
      label: 'Enable Rush (+$' + timeline.rushCost + ')',
      onClick: () => onActionClick('enable-rush'),
    } : undefined,
  });

  // Show warnings if any
  if (topRecommendation.warnings.length > 0) {
    statusItems.push({
      icon: Sparkles,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      title: 'Considerations',
      description: topRecommendation.warnings[0],
      action: {
        label: 'View Alternatives',
        onClick: () => onActionClick('compare-packages'),
      },
    });
  }

  // Show what's included
  const topPackageIncludes = topRecommendation.package.includes.slice(0, 3).join(', ');
  statusItems.push({
    icon: Sparkles,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    title: `Includes: ${topPackageIncludes}`,
    description: `+ ${topRecommendation.package.includes.length - 3} more features`,
    action: {
      label: 'Full Details',
      onClick: () => onActionClick('view-package', { packageId: topRecommendation.package.id }),
    },
  });

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="p-6 space-y-6">
      
      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className="group flex flex-col items-start gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <action.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{action.label}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Insight Cards Grid */}
      <div>
        <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
          Insights
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {insightCards.map((card) => (
            <div
              key={card.id}
              className={`p-4 rounded-xl border ${
                card.status === 'success'
                  ? 'bg-green-50/50 border-green-200'
                  : card.status === 'warning'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-indigo-50/50 border-indigo-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <card.icon
                  className={`w-5 h-5 ${
                    card.status === 'success'
                      ? 'text-green-600'
                      : card.status === 'warning'
                      ? 'text-amber-600'
                      : 'text-indigo-600'
                  }`}
                />
              </div>
              <div
                className={`text-2xl font-serif mb-1 ${
                  card.status === 'success'
                    ? 'text-green-900'
                    : card.status === 'warning'
                    ? 'text-amber-900'
                    : 'text-indigo-900'
                }`}
              >
                {card.value}
              </div>
              <div className="text-xs text-gray-600 mb-1">{card.label}</div>
              <div className="text-xs text-gray-500">{card.subtitle}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Feed */}
      <div>
        <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
          Recommendation
        </h3>
        <div className="space-y-3">
          {statusItems.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-3 p-4 bg-white border border-gray-200 rounded-xl"
            >
              <div className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {item.description}
                </p>
                {item.action && (
                  <button
                    onClick={item.action.onClick}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    {item.action.label} →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
