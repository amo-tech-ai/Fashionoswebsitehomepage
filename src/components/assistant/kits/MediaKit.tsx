/**
 * MediaKit - Asset quality, delivery tracking, and post-production intelligence
 * 
 * Quick Actions:
 * 1. Upload Assets - Open asset uploader
 * 2. Tag by Shot - Auto-tag workflow
 * 3. Generate Selects - AI picks best assets
 * 4. Prep Delivery Pack - Export for client
 * 
 * Insight Cards:
 * 1. Assets Delivered - Progress with count/total
 * 2. Quality Score - Average quality 0-100
 * 3. Missing Shots - Count of uncaptured required shots
 * 4. Next Deadline - Days until delivery
 */

import { AlertCircle, Upload, Tag, Sparkles, Package, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { 
  scoreAssetQuality, 
  detectMissingShots, 
  generateSelects,
  calculateDeliveryTimeline,
  type Asset,
  type ShotListItem
} from '../skills/MediaSkill';

interface MediaKitProps {
  onActionClick: (actionId: string, params?: any) => void;
}

export function MediaKit({ onActionClick }: MediaKitProps) {
  
  // ============================================================================
  // MOCK DATA - Replace with real data from props/context
  // ============================================================================
  
  const mockAssets: Asset[] = [
    {
      id: 'ast-001',
      name: 'IMG_0001.RAW',
      shotNumber: 'SHOT-001',
      fileSize: 25 * 1024 * 1024, // 25MB
      width: 4000,
      height: 3000,
      format: 'RAW',
      uploadedAt: new Date('2025-12-10'),
      status: 'delivered',
      category: 'Apparel',
      tags: ['hero', 'wide-shot', 'lifestyle'],
    },
    {
      id: 'ast-002',
      name: 'IMG_0002.RAW',
      shotNumber: 'SHOT-002',
      fileSize: 23 * 1024 * 1024,
      width: 4000,
      height: 3000,
      format: 'RAW',
      uploadedAt: new Date('2025-12-10'),
      status: 'delivered',
      category: 'Accessories',
      tags: ['detail', 'product'],
    },
    {
      id: 'ast-003',
      name: 'IMG_0003.JPG',
      shotNumber: 'SHOT-003',
      fileSize: 3 * 1024 * 1024,
      width: 2500,
      height: 2000,
      format: 'JPG',
      uploadedAt: new Date('2025-12-11'),
      status: 'edited',
      category: 'Footwear',
      tags: ['product'],
    },
    {
      id: 'ast-004',
      name: 'IMG_0004.RAW',
      shotNumber: 'SHOT-004',
      fileSize: 26 * 1024 * 1024,
      width: 4000,
      height: 3000,
      format: 'RAW',
      uploadedAt: new Date('2025-12-11'),
      status: 'selected',
      category: 'Apparel',
      tags: ['lifestyle', 'model'],
    },
    {
      id: 'ast-005',
      name: 'IMG_0005.RAW',
      fileSize: 24 * 1024 * 1024,
      width: 4000,
      height: 3000,
      format: 'RAW',
      uploadedAt: new Date('2025-12-12'),
      status: 'uploaded',
      category: 'Accessories',
    },
  ];

  const mockShotList: ShotListItem[] = [
    { id: 's1', shotNumber: 'SHOT-001', description: 'Hero apparel wide shot', category: 'Apparel', priority: 1, required: true },
    { id: 's2', shotNumber: 'SHOT-002', description: 'Accessories detail', category: 'Accessories', priority: 2, required: true },
    { id: 's3', shotNumber: 'SHOT-003', description: 'Footwear product shot', category: 'Footwear', priority: 2, required: true },
    { id: 's4', shotNumber: 'SHOT-004', description: 'Lifestyle with model', category: 'Apparel', priority: 1, required: true },
    { id: 's5', shotNumber: 'SHOT-005', description: 'Flat lay composition', category: 'All', priority: 3, required: true },
    { id: 's6', shotNumber: 'SHOT-006', description: 'Behind the scenes', category: 'Editorial', priority: 4, required: false },
  ];

  const mockDeadline = new Date('2025-12-20');

  // ============================================================================
  // AI CALCULATIONS
  // ============================================================================

  // Calculate average quality score
  const qualityScores = mockAssets.map(scoreAssetQuality);
  const avgQuality = Math.round(
    qualityScores.reduce((sum, score) => sum + score.totalScore, 0) / qualityScores.length
  );

  // Detect missing shots
  const missingShots = detectMissingShots(mockShotList, mockAssets);

  // Delivery timeline
  const timeline = calculateDeliveryTimeline(mockAssets, mockDeadline);

  // Generate selects (for action preview)
  const topSelects = generateSelects(mockAssets, 3);

  // ============================================================================
  // QUICK ACTIONS
  // ============================================================================

  const quickActions = [
    {
      id: 'upload-assets',
      icon: Upload,
      label: 'Upload Assets',
      description: 'Add new photos',
    },
    {
      id: 'tag-by-shot',
      icon: Tag,
      label: 'Tag by Shot',
      description: 'Auto-tag workflow',
    },
    {
      id: 'generate-selects',
      icon: Sparkles,
      label: 'Generate Selects',
      description: 'AI picks best',
    },
    {
      id: 'prep-delivery',
      icon: Package,
      label: 'Prep Delivery Pack',
      description: 'Export for client',
    },
  ];

  // ============================================================================
  // INSIGHT CARDS
  // ============================================================================

  const insightCards = [
    {
      id: 'assets-delivered',
      icon: Package,
      label: 'Assets Delivered',
      value: `${timeline.delivered}/${timeline.totalAssets}`,
      status: timeline.progressPercentage >= 80 ? 'success' : timeline.progressPercentage >= 50 ? 'warning' : 'critical',
      subtitle: `${timeline.progressPercentage}% complete`,
    },
    {
      id: 'quality-score',
      icon: CheckCircle,
      label: 'Quality Score',
      value: `${avgQuality}/100`,
      status: avgQuality >= 85 ? 'success' : avgQuality >= 70 ? 'warning' : 'critical',
      subtitle: avgQuality >= 85 ? 'Excellent' : avgQuality >= 70 ? 'Good' : 'Needs work',
    },
    {
      id: 'missing-shots',
      icon: AlertTriangle,
      label: 'Missing Shots',
      value: missingShots.missing.length.toString(),
      status: missingShots.missing.length === 0 ? 'success' : missingShots.missing.length <= 2 ? 'warning' : 'critical',
      subtitle: `${missingShots.completionPercentage}% captured`,
    },
    {
      id: 'next-deadline',
      icon: Clock,
      label: 'Next Deadline',
      value: `${timeline.daysUntilDeadline}d`,
      status: timeline.onTrack ? 'success' : 'critical',
      subtitle: timeline.onTrack ? 'On track' : 'At risk',
    },
  ];

  // ============================================================================
  // STATUS FEED
  // ============================================================================

  const statusItems = [];

  // Show missing shots alert if any
  if (missingShots.missing.length > 0) {
    statusItems.push({
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      title: `${missingShots.missing.length} Required Shot${missingShots.missing.length > 1 ? 's' : ''} Missing`,
      description: missingShots.missing.slice(0, 2).map(s => s.shotNumber).join(', ') + 
        (missingShots.missing.length > 2 ? ` +${missingShots.missing.length - 2} more` : ''),
      action: {
        label: 'View Shot List',
        onClick: () => onActionClick('view-shot-list'),
      },
    });
  }

  // Show quality alert if low average
  if (avgQuality < 70) {
    const lowQualityAssets = qualityScores.filter(s => s.totalScore < 70);
    statusItems.push({
      icon: AlertCircle,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-50',
      title: `${lowQualityAssets.length} Asset${lowQualityAssets.length > 1 ? 's' : ''} Below Quality Threshold`,
      description: 'Review and reshoot or enhance in post-production',
      action: {
        label: 'Review Assets',
        onClick: () => onActionClick('review-quality'),
      },
    });
  }

  // Show delivery status
  if (timeline.daysUntilDeadline <= 7 && !timeline.onTrack) {
    statusItems.push({
      icon: Clock,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-50',
      title: 'Delivery At Risk',
      description: `${timeline.inProgress + timeline.notStarted} assets not delivered with ${timeline.daysUntilDeadline} days until deadline`,
      action: {
        label: 'Accelerate',
        onClick: () => onActionClick('accelerate-delivery'),
      },
    });
  } else if (timeline.progressPercentage === 100) {
    statusItems.push({
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
      title: 'All Assets Delivered',
      description: `${timeline.totalAssets} assets complete and ready for client`,
      action: {
        label: 'Create Delivery Pack',
        onClick: () => onActionClick('prep-delivery'),
      },
    });
  }

  // Show selects preview
  if (topSelects.length > 0) {
    statusItems.push({
      icon: Sparkles,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      title: 'Top Selects Ready',
      description: `AI identified ${topSelects.length} highest quality assets for client review`,
      action: {
        label: 'View Selects',
        onClick: () => onActionClick('generate-selects'),
      },
    });
  }

  // Default message if everything is good
  if (statusItems.length === 0) {
    statusItems.push({
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
      title: 'Assets Looking Great',
      description: `${timeline.delivered} delivered, ${avgQuality}/100 avg quality, all required shots captured`,
    });
  }

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
                  : 'bg-red-50/50 border-red-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <card.icon
                  className={`w-5 h-5 ${
                    card.status === 'success'
                      ? 'text-green-600'
                      : card.status === 'warning'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                />
              </div>
              <div
                className={`text-2xl font-serif mb-1 ${
                  card.status === 'success'
                    ? 'text-green-900'
                    : card.status === 'warning'
                    ? 'text-amber-900'
                    : 'text-red-900'
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
          Status
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
