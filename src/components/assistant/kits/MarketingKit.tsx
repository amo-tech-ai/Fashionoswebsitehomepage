/**
 * MarketingKit - Onboarding, feature discovery, and platform navigation
 * 
 * Quick Actions:
 * 1. Explore FashionOS - Platform tour
 * 2. View All Services - Services marketplace
 * 3. Create First Event - Quick start wizard
 * 4. Get Started Guide - Tutorial walkthrough
 * 
 * Insight Cards:
 * 1. What's New - Recent features/updates
 * 2. Popular Features - Most used by others
 * 3. Your Next Step - Personalized suggestion
 * 4. Quick Win - Easy high-value action
 */

import { Compass, Briefcase, PlusCircle, BookOpen, Sparkles, TrendingUp, Target, Zap } from 'lucide-react';
import {
  discoverFeatures,
  detectQuickWins,
  suggestNextAction,
  type UserActivity,
} from '../skills/NavigatorSkill';

interface MarketingKitProps {
  onActionClick: (actionId: string, params?: any) => void;
}

export function MarketingKit({ onActionClick }: MarketingKitProps) {
  
  // ============================================================================
  // MOCK USER ACTIVITY - Replace with real data from context/analytics
  // ============================================================================
  
  const mockUserActivity: UserActivity = {
    visitedPages: ['/', '/sample-tracker'],
    completedActions: [],
    createdProjects: 0,
    lastVisit: new Date(),
    accountAge: 2, // 2 days old account
  };

  const currentRoute = '/'; // Homepage

  // ============================================================================
  // AI CALCULATIONS
  // ============================================================================

  // Discover recommended features
  const recommendedFeatures = discoverFeatures(mockUserActivity);
  const topFeature = recommendedFeatures[0];

  // Detect quick wins
  const quickWins = detectQuickWins(mockUserActivity);
  const topQuickWin = quickWins[0];

  // Suggest next action
  const nextAction = suggestNextAction(mockUserActivity, currentRoute);

  // Popular features (mock data)
  const popularFeature = {
    name: 'Sample Tracker',
    usage: '95%',
    description: 'Most used feature',
  };

  // What's new (mock data)
  const latestUpdate = {
    title: 'AI Assistant',
    date: 'This week',
    description: 'Your intelligent production companion',
  };

  // ============================================================================
  // QUICK ACTIONS
  // ============================================================================

  const quickActions = [
    {
      id: 'explore-platform',
      icon: Compass,
      label: 'Explore FashionOS',
      description: 'Take the tour',
    },
    {
      id: 'view-services',
      icon: Briefcase,
      label: 'View All Services',
      description: 'Browse packages',
    },
    {
      id: 'create-event',
      icon: PlusCircle,
      label: 'Create First Event',
      description: 'Quick start',
    },
    {
      id: 'get-started-guide',
      icon: BookOpen,
      label: 'Get Started Guide',
      description: 'Tutorial',
    },
  ];

  // ============================================================================
  // INSIGHT CARDS
  // ============================================================================

  const insightCards = [
    {
      id: 'whats-new',
      icon: Sparkles,
      label: "What's New",
      value: latestUpdate.title,
      status: 'info' as const,
      subtitle: latestUpdate.date,
      detail: 'Tap to learn more',
    },
    {
      id: 'popular',
      icon: TrendingUp,
      label: 'Popular Features',
      value: popularFeature.name,
      status: 'info' as const,
      subtitle: `${popularFeature.usage} of users`,
      detail: 'Try it now',
    },
    {
      id: 'next-step',
      icon: Target,
      label: 'Your Next Step',
      value: nextAction?.title.split(' ').slice(0, 2).join(' ') || 'Explore',
      status: 'success' as const,
      subtitle: 'Recommended',
      detail: '2 min',
    },
    {
      id: 'quick-win',
      icon: Zap,
      label: 'Quick Win',
      value: topQuickWin?.estimatedTime || '2 min',
      status: 'warning' as const,
      subtitle: topQuickWin?.title.split(' ').slice(0, 2).join(' ') || 'Get started',
      detail: `${topQuickWin?.impact || 'High'} impact`,
    },
  ];

  // ============================================================================
  // STATUS FEED
  // ============================================================================

  const statusItems = [];

  // Show next best action if available
  if (nextAction) {
    statusItems.push({
      icon: Target,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      title: nextAction.title,
      description: nextAction.reason,
      action: {
        label: 'Start Now',
        onClick: () => onActionClick('next-action', { route: nextAction.route }),
      },
    });
  }

  // Show top quick win
  if (topQuickWin) {
    statusItems.push({
      icon: Zap,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      title: `Quick Win: ${topQuickWin.title}`,
      description: `${topQuickWin.description} (${topQuickWin.estimatedTime})`,
      action: {
        label: topQuickWin.action.label,
        onClick: () => onActionClick(topQuickWin.id, { route: topQuickWin.action.route }),
      },
    });
  }

  // Show top recommended feature
  if (topFeature) {
    statusItems.push({
      icon: Sparkles,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      title: `Discover: ${topFeature.name}`,
      description: `${topFeature.benefit}${topFeature.timeSaved ? ` - Save ${topFeature.timeSaved}` : ''}`,
      action: {
        label: 'Learn More',
        onClick: () => onActionClick('discover-feature', { featureId: topFeature.featureId }),
      },
    });
  }

  // Show what's new
  statusItems.push({
    icon: Sparkles,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    title: `New: ${latestUpdate.title}`,
    description: latestUpdate.description,
    action: {
      label: 'Try It',
      onClick: () => onActionClick('whats-new'),
    },
  });

  // Show popular feature
  statusItems.push({
    icon: TrendingUp,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    title: `${popularFeature.usage} of users love ${popularFeature.name}`,
    description: popularFeature.description,
    action: {
      label: 'Explore',
      onClick: () => onActionClick('popular-feature', { route: '/sample-tracker' }),
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
                className={`text-lg font-serif mb-1 truncate ${
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
          Recommended For You
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
