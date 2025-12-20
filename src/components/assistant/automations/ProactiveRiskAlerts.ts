/**
 * ProactiveRiskAlerts - Daily automated risk scanning
 * 
 * Workflow 4: Proactive Risk Alerts
 * Trigger: Scheduled daily at 8am OR critical change detected
 * 
 * Scans:
 * 1. Logistics risks (missing samples, delays)
 * 2. Event risks (critical path blockers, deadline pressure)
 * 3. Asset risks (low quality, missing shots, deadline slips)
 * 4. Staffing risks (overallocation, skill gaps)
 * 
 * Output: Prioritized list of risks with recommended actions
 */

import type { SampleItem } from '../skills/LogisticsSkill';
import type { Event } from '../skills/EventsSkill';
import type { Asset } from '../types/media.types';
import { analyzeReadiness, identifyBlockers } from '../skills/LogisticsSkill';
import { analyzeCriticalPath } from '../skills/EventsSkill';
import { scoreAssetBatch } from './AssetQualityScorer';

// ============================================================================
// RISK TYPES
// ============================================================================

export type RiskSeverity = 'critical' | 'high' | 'medium' | 'low';
export type RiskCategory = 'logistics' | 'event' | 'asset' | 'staffing' | 'timeline';

export interface Risk {
  id: string;
  category: RiskCategory;
  severity: RiskSeverity;
  title: string;
  description: string;
  impact: string; // What happens if not addressed
  probability: number; // 0-100%
  estimatedCost: number; // $ impact
  daysUntilCritical: number; // Time sensitivity
  recommendedActions: string[];
  assignTo?: string;
  deadline?: Date;
}

export interface RiskReport {
  scanDate: Date;
  totalRisks: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  risks: Risk[];
  prioritizedActions: string[];
  estimatedTotalCost: number; // Total $ at risk
}

// ============================================================================
// LOGISTICS RISK SCANNING
// ============================================================================

function scanLogisticsRisks(
  samples: SampleItem[],
  daysUntilShoot: number
): Risk[] {
  const risks: Risk[] = [];
  
  // Get readiness analysis
  const readiness = analyzeReadiness(samples);
  const blockers = identifyBlockers(samples);

  // Risk 1: Low readiness with approaching deadline
  if (readiness.percentReady < 80 && daysUntilShoot <= 7) {
    risks.push({
      id: `LOG_${Date.now()}_1`,
      category: 'logistics',
      severity: daysUntilShoot <= 3 ? 'critical' : 'high',
      title: `Only ${readiness.percentReady}% of samples ready`,
      description: `${readiness.notReady} samples not ready with ${daysUntilShoot} days until shoot`,
      impact: `Shoot day chaos, potential 2-3 hour delay, frustrated team`,
      probability: 85,
      estimatedCost: 5000, // Cost of shoot delay
      daysUntilCritical: daysUntilShoot,
      recommendedActions: [
        'Call brands for missing samples',
        'Arrange courier pickup for delayed items',
        'Prep alternative products as backup',
      ],
      assignTo: 'Production Manager',
      deadline: new Date(Date.now() + (daysUntilShoot - 1) * 24 * 60 * 60 * 1000),
    });
  }

  // Risk 2: High-priority blockers
  const criticalBlockers = blockers.filter(b => b.severity === 'critical');
  if (criticalBlockers.length > 0) {
    risks.push({
      id: `LOG_${Date.now()}_2`,
      category: 'logistics',
      severity: 'critical',
      title: `${criticalBlockers.length} critical blocker${criticalBlockers.length > 1 ? 's' : ''}`,
      description: criticalBlockers.map(b => b.title).join(', '),
      impact: 'Cannot proceed with shoot, potential cancellation',
      probability: 95,
      estimatedCost: 15000, // Cost of shoot cancellation/delay
      daysUntilCritical: Math.min(...criticalBlockers.map(b => b.daysUntilDue)),
      recommendedActions: [
        'Escalate to brand contact immediately',
        'Consider alternative products',
        'Notify photographer of potential reschedule',
      ],
      assignTo: 'Producer',
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h deadline
    });
  }

  // Risk 3: Missing samples trend
  const missingCount = samples.filter(s => s.status === 'missing').length;
  if (missingCount > 0 && daysUntilShoot <= 14) {
    risks.push({
      id: `LOG_${Date.now()}_3`,
      category: 'logistics',
      severity: missingCount > 3 ? 'high' : 'medium',
      title: `${missingCount} samples missing/unconfirmed`,
      description: 'Samples with unknown status, may not arrive',
      impact: 'Incomplete shoot, unhappy client, reduced deliverables',
      probability: 60,
      estimatedCost: missingCount * 500, // Cost per missing shot
      daysUntilCritical: daysUntilShoot,
      recommendedActions: [
        'Contact brands to confirm shipping status',
        'Add tracking numbers to sample tracker',
        'Identify backup products',
      ],
      assignTo: 'Sample Coordinator',
    });
  }

  return risks;
}

// ============================================================================
// EVENT RISK SCANNING
// ============================================================================

function scanEventRisks(event: Event, daysUntilEvent: number): Risk[] {
  const risks: Risk[] = [];

  // Get critical path analysis
  const criticalPath = analyzeCriticalPath(event);

  // Risk 1: Critical path blockers
  if (criticalPath.blockers.length > 0) {
    const criticalBlockers = criticalPath.blockers.filter(b => b.severity === 'critical');
    
    if (criticalBlockers.length > 0) {
      risks.push({
        id: `EVT_${Date.now()}_1`,
        category: 'event',
        severity: 'critical',
        title: `${criticalBlockers.length} task${criticalBlockers.length > 1 ? 's' : ''} blocking critical path`,
        description: criticalBlockers.map(b => b.task.title).join(', '),
        impact: `Event delayed by ${criticalPath.estimatedDelay} days if not resolved`,
        probability: 90,
        estimatedCost: 20000, // Cost of event delay
        daysUntilCritical: daysUntilEvent,
        recommendedActions: [
          'Unblock critical tasks immediately',
          'Add resources to accelerate',
          'Consider parallel workflows',
        ],
        assignTo: 'Event Manager',
        deadline: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48h deadline
      });
    }
  }

  // Risk 2: Timeline pressure
  const incompleteTasks = event.tasks?.filter(t => t.status !== 'completed').length || 0;
  const totalTasks = event.tasks?.length || 1;
  const completionRate = ((totalTasks - incompleteTasks) / totalTasks) * 100;

  if (completionRate < 75 && daysUntilEvent <= 7) {
    risks.push({
      id: `EVT_${Date.now()}_2`,
      category: 'timeline',
      severity: daysUntilEvent <= 3 ? 'critical' : 'high',
      title: `Only ${Math.round(completionRate)}% tasks complete`,
      description: `${incompleteTasks} tasks remaining with ${daysUntilEvent} days left`,
      impact: 'Event quality compromised, potential cancellation',
      probability: 75,
      estimatedCost: 30000,
      daysUntilCritical: daysUntilEvent,
      recommendedActions: [
        'Daily standup to track progress',
        'Add contractors for critical tasks',
        'Reduce scope if necessary',
      ],
      assignTo: 'Project Manager',
    });
  }

  // Risk 3: Dependencies not met
  const dependencyIssues = event.tasks?.filter(t => {
    if (t.status === 'blocked' || t.status === 'delayed') {
      return true;
    }
    return false;
  }).length || 0;

  if (dependencyIssues > 0) {
    risks.push({
      id: `EVT_${Date.now()}_3`,
      category: 'event',
      severity: dependencyIssues > 2 ? 'high' : 'medium',
      title: `${dependencyIssues} task${dependencyIssues > 1 ? 's' : ''} blocked by dependencies`,
      description: 'Tasks waiting on upstream completion',
      impact: 'Cascade delays throughout project',
      probability: 70,
      estimatedCost: dependencyIssues * 2000,
      daysUntilCritical: daysUntilEvent,
      recommendedActions: [
        'Resolve blocking dependencies first',
        'Parallelize where possible',
        'Escalate blockers to stakeholders',
      ],
      assignTo: 'Event Manager',
    });
  }

  return risks;
}

// ============================================================================
// ASSET RISK SCANNING
// ============================================================================

function scanAssetRisks(
  assets: Asset[],
  daysUntilDeadline: number
): Risk[] {
  const risks: Risk[] = [];

  // Get quality analysis
  const qualityReport = scoreAssetBatch(assets);

  // Risk 1: Low average quality
  if (qualityReport.averageScore < 70 && assets.length > 10) {
    risks.push({
      id: `AST_${Date.now()}_1`,
      category: 'asset',
      severity: qualityReport.averageScore < 50 ? 'critical' : 'high',
      title: `Asset quality below standards (avg: ${Math.round(qualityReport.averageScore)}/100)`,
      description: `${qualityReport.needsWorkCount} assets need rework, ${qualityReport.flaggedAssets.length} flagged`,
      impact: 'Client rejection, reshoot required, brand reputation damage',
      probability: 80,
      estimatedCost: 10000, // Cost of reshoot
      daysUntilCritical: daysUntilDeadline,
      recommendedActions: [
        'Review flagged assets immediately',
        'Schedule reshoot if needed',
        'Provide feedback to photographer',
      ],
      assignTo: 'Creative Director',
    });
  }

  // Risk 2: Missing deliverables
  const deliveredCount = assets.filter(a => a.status === 'delivered').length;
  const expectedCount = assets.length;
  const deliveryRate = (deliveredCount / expectedCount) * 100;

  if (deliveryRate < 50 && daysUntilDeadline <= 7) {
    risks.push({
      id: `AST_${Date.now()}_2`,
      category: 'timeline',
      severity: daysUntilDeadline <= 3 ? 'critical' : 'high',
      title: `Only ${Math.round(deliveryRate)}% of assets delivered`,
      description: `${expectedCount - deliveredCount} assets still in editing/processing`,
      impact: 'Client deadline missed, contract penalties',
      probability: 85,
      estimatedCost: 5000, // Penalty cost
      daysUntilCritical: daysUntilDeadline,
      recommendedActions: [
        'Accelerate editing workflow',
        'Add editors if budget allows',
        'Communicate delay to client proactively',
      ],
      assignTo: 'Post-Production Manager',
      deadline: new Date(Date.now() + (daysUntilDeadline - 1) * 24 * 60 * 60 * 1000),
    });
  }

  // Risk 3: Format inconsistencies
  const rawCount = assets.filter(a => a.format === 'RAW').length;
  const jpgCount = assets.filter(a => a.format === 'JPG').length;

  if (rawCount === 0 && assets.length > 20) {
    risks.push({
      id: `AST_${Date.now()}_3`,
      category: 'asset',
      severity: 'medium',
      title: 'No RAW files - limited editing flexibility',
      description: 'All assets in processed formats (JPG/PNG)',
      impact: 'Cannot make significant edits, quality degradation',
      probability: 60,
      estimatedCost: 3000,
      daysUntilCritical: daysUntilDeadline,
      recommendedActions: [
        'Request RAW files from photographer',
        'Verify camera settings for future shoots',
        'Document for post-mortem',
      ],
      assignTo: 'Photography Lead',
    });
  }

  return risks;
}

// ============================================================================
// COMPREHENSIVE RISK SCAN
// ============================================================================

export function performRiskScan(context: {
  samples?: SampleItem[];
  events?: Event[];
  assets?: Asset[];
  daysUntilShoot?: number;
  daysUntilDeadline?: number;
}): RiskReport {
  const allRisks: Risk[] = [];

  // Scan logistics
  if (context.samples && context.daysUntilShoot) {
    const logisticsRisks = scanLogisticsRisks(context.samples, context.daysUntilShoot);
    allRisks.push(...logisticsRisks);
  }

  // Scan events
  if (context.events) {
    for (const event of context.events) {
      const eventDate = new Date(event.date);
      const daysUntil = Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      const eventRisks = scanEventRisks(event, daysUntil);
      allRisks.push(...eventRisks);
    }
  }

  // Scan assets
  if (context.assets && context.daysUntilDeadline) {
    const assetRisks = scanAssetRisks(context.assets, context.daysUntilDeadline);
    allRisks.push(...assetRisks);
  }

  // Sort by severity and days until critical
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  allRisks.sort((a, b) => {
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return a.daysUntilCritical - b.daysUntilCritical;
  });

  // Calculate statistics
  const criticalCount = allRisks.filter(r => r.severity === 'critical').length;
  const highCount = allRisks.filter(r => r.severity === 'high').length;
  const mediumCount = allRisks.filter(r => r.severity === 'medium').length;
  const lowCount = allRisks.filter(r => r.severity === 'low').length;

  const estimatedTotalCost = allRisks.reduce((sum, r) => sum + r.estimatedCost, 0);

  // Generate prioritized actions (top 5)
  const prioritizedActions = allRisks
    .slice(0, 5)
    .flatMap(r => r.recommendedActions.slice(0, 2));

  return {
    scanDate: new Date(),
    totalRisks: allRisks.length,
    criticalCount,
    highCount,
    mediumCount,
    lowCount,
    risks: allRisks,
    prioritizedActions,
    estimatedTotalCost,
  };
}

// ============================================================================
// NOTIFICATION FORMATTING
// ============================================================================

export function formatRiskNotification(report: RiskReport): {
  subject: string;
  body: string;
  urgent: boolean;
} {
  const urgent = report.criticalCount > 0;

  const subject = urgent
    ? `🚨 URGENT: ${report.criticalCount} Critical Risk${report.criticalCount > 1 ? 's' : ''} Detected`
    : `📊 Daily Risk Scan: ${report.totalRisks} risk${report.totalRisks > 1 ? 's' : ''} identified`;

  let body = `Daily Risk Scan - ${report.scanDate.toLocaleDateString()}\n\n`;
  body += `Total Risks: ${report.totalRisks}\n`;
  body += `  • Critical: ${report.criticalCount}\n`;
  body += `  • High: ${report.highCount}\n`;
  body += `  • Medium: ${report.mediumCount}\n`;
  body += `  • Low: ${report.lowCount}\n\n`;
  body += `Estimated Cost at Risk: $${report.estimatedTotalCost.toLocaleString()}\n\n`;

  if (report.criticalCount > 0) {
    body += `⚠️ CRITICAL RISKS:\n\n`;
    const criticalRisks = report.risks.filter(r => r.severity === 'critical');
    criticalRisks.forEach((risk, idx) => {
      body += `${idx + 1}. ${risk.title}\n`;
      body += `   Impact: ${risk.impact}\n`;
      body += `   Action: ${risk.recommendedActions[0]}\n`;
      body += `   Assigned: ${risk.assignTo || 'Unassigned'}\n\n`;
    });
  }

  body += `TOP PRIORITIES:\n`;
  report.prioritizedActions.slice(0, 5).forEach((action, idx) => {
    body += `${idx + 1}. ${action}\n`;
  });

  return { subject, body, urgent };
}
