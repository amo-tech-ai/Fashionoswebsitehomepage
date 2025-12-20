/**
 * AutomationOrchestrator - Central coordinator for all automation workflows
 * 
 * Responsibilities:
 * 1. Trigger appropriate automations based on events
 * 2. Coordinate multi-workflow processes
 * 3. Track automation execution history
 * 4. Provide unified interface for automation insights
 */

import type { SampleItem } from '../skills/LogisticsSkill';
import type { Event } from '../skills/EventsSkill';
import type { Asset } from '../types/media.types';
import type { TeamMember, TaskRequirements } from './SmartTaskAssignment';

import { generateBatchingPlan } from '../skills/LogisticsSkill';
import { scoreAssetQuality, scoreAssetBatch, processAssetUpload } from './AssetQualityScorer';
import { performRiskScan, formatRiskNotification } from './ProactiveRiskAlerts';
import { recommendAssignments, autoAssignTask, detectOverallocation } from './SmartTaskAssignment';

// ============================================================================
// AUTOMATION EVENT TYPES
// ============================================================================

export type AutomationTrigger =
  | 'sample_status_changed'
  | 'asset_uploaded'
  | 'task_created'
  | 'team_availability_changed'
  | 'daily_scheduled_scan'
  | 'critical_change_detected'
  | 'manual_trigger';

export interface AutomationEvent {
  trigger: AutomationTrigger;
  timestamp: Date;
  context: {
    samples?: SampleItem[];
    assets?: Asset[];
    events?: Event[];
    tasks?: TaskRequirements[];
    team?: TeamMember[];
  };
}

export interface AutomationResult {
  workflowName: string;
  success: boolean;
  executionTime: number; // ms
  output: any;
  actions: string[];
  errors?: string[];
}

export interface AutomationReport {
  triggerEvent: AutomationEvent;
  executedWorkflows: AutomationResult[];
  totalExecutionTime: number;
  successCount: number;
  failureCount: number;
  recommendations: string[];
}

// ============================================================================
// WORKFLOW EXECUTION LOGIC
// ============================================================================

class AutomationEngine {
  private executionHistory: AutomationReport[] = [];

  /**
   * Execute Workflow 1: Auto-Batch Samples
   */
  private executeBatchingWorkflow(samples: SampleItem[]): AutomationResult {
    const startTime = Date.now();
    const actions: string[] = [];

    try {
      // Only batch samples that are on_set
      const readySamples = samples.filter(s => s.status === 'on_set');

      if (readySamples.length === 0) {
        return {
          workflowName: 'Auto-Batch Samples',
          success: true,
          executionTime: Date.now() - startTime,
          output: { message: 'No samples ready to batch' },
          actions: ['Wait for samples to arrive on set'],
        };
      }

      const batchingPlan = generateBatchingPlan(readySamples);

      actions.push(`Created ${batchingPlan.batches.length} optimized batches`);
      actions.push(`Estimated time savings: ${batchingPlan.estimatedTimeSavings} minutes`);

      return {
        workflowName: 'Auto-Batch Samples',
        success: true,
        executionTime: Date.now() - startTime,
        output: batchingPlan,
        actions,
      };
    } catch (error) {
      return {
        workflowName: 'Auto-Batch Samples',
        success: false,
        executionTime: Date.now() - startTime,
        output: null,
        actions: [],
        errors: [(error as Error).message],
      };
    }
  }

  /**
   * Execute Workflow 3: Asset Quality Auto-Scoring
   */
  private executeQualityScoringWorkflow(assets: Asset[]): AutomationResult {
    const startTime = Date.now();
    const actions: string[] = [];

    try {
      const batchReport = scoreAssetBatch(assets);

      actions.push(`Scored ${assets.length} assets (avg: ${Math.round(batchReport.averageScore)}/100)`);
      
      if (batchReport.excellentCount > 0) {
        actions.push(`${batchReport.excellentCount} assets auto-approved for selects`);
      }
      
      if (batchReport.flaggedAssets.length > 0) {
        actions.push(`${batchReport.flaggedAssets.length} assets flagged for review`);
      }

      return {
        workflowName: 'Asset Quality Auto-Scoring',
        success: true,
        executionTime: Date.now() - startTime,
        output: batchReport,
        actions,
      };
    } catch (error) {
      return {
        workflowName: 'Asset Quality Auto-Scoring',
        success: false,
        executionTime: Date.now() - startTime,
        output: null,
        actions: [],
        errors: [(error as Error).message],
      };
    }
  }

  /**
   * Execute Workflow 4: Proactive Risk Alerts
   */
  private executeRiskScanWorkflow(context: AutomationEvent['context']): AutomationResult {
    const startTime = Date.now();
    const actions: string[] = [];

    try {
      const riskReport = performRiskScan({
        samples: context.samples,
        events: context.events,
        assets: context.assets,
        daysUntilShoot: 7, // Default - should be calculated
        daysUntilDeadline: 14, // Default - should be calculated
      });

      actions.push(`Scanned for risks: ${riskReport.totalRisks} identified`);
      
      if (riskReport.criticalCount > 0) {
        actions.push(`⚠️ ${riskReport.criticalCount} CRITICAL risks require immediate attention`);
      }
      
      if (riskReport.estimatedTotalCost > 0) {
        actions.push(`Estimated cost at risk: $${riskReport.estimatedTotalCost.toLocaleString()}`);
      }

      // Generate notification
      const notification = formatRiskNotification(riskReport);
      if (notification.urgent) {
        actions.push('🚨 Urgent notification sent');
      }

      return {
        workflowName: 'Proactive Risk Alerts',
        success: true,
        executionTime: Date.now() - startTime,
        output: { riskReport, notification },
        actions,
      };
    } catch (error) {
      return {
        workflowName: 'Proactive Risk Alerts',
        success: false,
        executionTime: Date.now() - startTime,
        output: null,
        actions: [],
        errors: [(error as Error).message],
      };
    }
  }

  /**
   * Execute Workflow 5: Smart Task Assignment
   */
  private executeTaskAssignmentWorkflow(
    tasks: TaskRequirements[],
    team: TeamMember[]
  ): AutomationResult {
    const startTime = Date.now();
    const actions: string[] = [];

    try {
      // Check for overallocation first
      const workloadAnalysis = detectOverallocation(team);
      
      if (workloadAnalysis.overallocated.length > 0) {
        actions.push(
          `⚠️ ${workloadAnalysis.overallocated.length} team members overallocated`
        );
      }

      // Attempt auto-assignment for each task
      const assignments: any[] = [];
      const manualReview: TaskRequirements[] = [];

      for (const task of tasks) {
        const result = autoAssignTask(task, team);
        
        if (result.assigned && result.assignedTo) {
          assignments.push({
            task,
            assignedTo: result.assignedTo,
            reason: result.reason,
          });
          actions.push(`Assigned task to ${result.assignedTo.name}`);
        } else {
          manualReview.push(task);
        }
      }

      if (manualReview.length > 0) {
        actions.push(`${manualReview.length} tasks require manual assignment`);
      }

      return {
        workflowName: 'Smart Task Assignment',
        success: true,
        executionTime: Date.now() - startTime,
        output: {
          assignments,
          manualReview,
          workloadAnalysis,
        },
        actions,
      };
    } catch (error) {
      return {
        workflowName: 'Smart Task Assignment',
        success: false,
        executionTime: Date.now() - startTime,
        output: null,
        actions: [],
        errors: [(error as Error).message],
      };
    }
  }

  /**
   * Main orchestration method - triggers appropriate workflows
   */
  public async execute(event: AutomationEvent): Promise<AutomationReport> {
    const results: AutomationResult[] = [];
    const startTime = Date.now();

    // Determine which workflows to run based on trigger
    switch (event.trigger) {
      case 'sample_status_changed':
        if (event.context.samples) {
          results.push(this.executeBatchingWorkflow(event.context.samples));
        }
        break;

      case 'asset_uploaded':
        if (event.context.assets) {
          results.push(this.executeQualityScoringWorkflow(event.context.assets));
        }
        break;

      case 'task_created':
      case 'team_availability_changed':
        if (event.context.tasks && event.context.team) {
          results.push(
            this.executeTaskAssignmentWorkflow(event.context.tasks, event.context.team)
          );
        }
        break;

      case 'daily_scheduled_scan':
      case 'critical_change_detected':
        // Run comprehensive risk scan
        results.push(this.executeRiskScanWorkflow(event.context));
        break;

      case 'manual_trigger':
        // Run all applicable workflows
        if (event.context.samples) {
          results.push(this.executeBatchingWorkflow(event.context.samples));
        }
        if (event.context.assets) {
          results.push(this.executeQualityScoringWorkflow(event.context.assets));
        }
        if (event.context.tasks && event.context.team) {
          results.push(
            this.executeTaskAssignmentWorkflow(event.context.tasks, event.context.team)
          );
        }
        results.push(this.executeRiskScanWorkflow(event.context));
        break;
    }

    const totalExecutionTime = Date.now() - startTime;
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    // Generate recommendations based on all workflow outputs
    const recommendations = this.generateRecommendations(results);

    const report: AutomationReport = {
      triggerEvent: event,
      executedWorkflows: results,
      totalExecutionTime,
      successCount,
      failureCount,
      recommendations,
    };

    // Store in history
    this.executionHistory.push(report);

    return report;
  }

  /**
   * Generate consolidated recommendations from all workflows
   */
  private generateRecommendations(results: AutomationResult[]): string[] {
    const recommendations: string[] = [];

    for (const result of results) {
      if (result.success) {
        recommendations.push(...result.actions);
      }
    }

    // Deduplicate and prioritize
    return [...new Set(recommendations)].slice(0, 10);
  }

  /**
   * Get execution history
   */
  public getHistory(limit: number = 10): AutomationReport[] {
    return this.executionHistory.slice(-limit);
  }

  /**
   * Get statistics
   */
  public getStats(): {
    totalExecutions: number;
    successRate: number;
    averageExecutionTime: number;
    workflowCounts: Record<string, number>;
  } {
    const totalExecutions = this.executionHistory.length;
    const successCount = this.executionHistory.reduce(
      (sum, r) => sum + r.successCount,
      0
    );
    const totalWorkflows = this.executionHistory.reduce(
      (sum, r) => sum + r.executedWorkflows.length,
      0
    );
    const successRate = totalWorkflows > 0 ? (successCount / totalWorkflows) * 100 : 0;
    
    const totalTime = this.executionHistory.reduce(
      (sum, r) => sum + r.totalExecutionTime,
      0
    );
    const averageExecutionTime = totalExecutions > 0 ? totalTime / totalExecutions : 0;

    const workflowCounts: Record<string, number> = {};
    for (const report of this.executionHistory) {
      for (const workflow of report.executedWorkflows) {
        workflowCounts[workflow.workflowName] = 
          (workflowCounts[workflow.workflowName] || 0) + 1;
      }
    }

    return {
      totalExecutions,
      successRate,
      averageExecutionTime,
      workflowCounts,
    };
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const automationOrchestrator = new AutomationEngine();

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Trigger automation manually with full context
 */
export async function runAutomations(context: AutomationEvent['context']): Promise<AutomationReport> {
  const event: AutomationEvent = {
    trigger: 'manual_trigger',
    timestamp: new Date(),
    context,
  };

  return automationOrchestrator.execute(event);
}

/**
 * Trigger specific workflow
 */
export async function runWorkflow(
  workflowName: string,
  context: AutomationEvent['context']
): Promise<AutomationResult | null> {
  const triggerMap: Record<string, AutomationTrigger> = {
    'batching': 'sample_status_changed',
    'quality': 'asset_uploaded',
    'risk': 'daily_scheduled_scan',
    'assignment': 'task_created',
  };

  const trigger = triggerMap[workflowName];
  if (!trigger) return null;

  const event: AutomationEvent = {
    trigger,
    timestamp: new Date(),
    context,
  };

  const report = await automationOrchestrator.execute(event);
  return report.executedWorkflows[0] || null;
}

/**
 * Schedule daily risk scan (would be called by cron/scheduler)
 */
export async function scheduledDailyRiskScan(
  context: AutomationEvent['context']
): Promise<AutomationReport> {
  const event: AutomationEvent = {
    trigger: 'daily_scheduled_scan',
    timestamp: new Date(),
    context,
  };

  return automationOrchestrator.execute(event);
}

/**
 * Get automation insights for dashboard
 */
export function getAutomationInsights(): {
  stats: ReturnType<typeof automationOrchestrator.getStats>;
  recentActivity: AutomationReport[];
  suggestions: string[];
} {
  const stats = automationOrchestrator.getStats();
  const recentActivity = automationOrchestrator.getHistory(5);

  const suggestions: string[] = [];

  if (stats.successRate < 90) {
    suggestions.push('Some automations failing - review error logs');
  }

  if (stats.averageExecutionTime > 1000) {
    suggestions.push('Slow automation performance - consider optimization');
  }

  if (stats.totalExecutions === 0) {
    suggestions.push('No automations running - verify triggers are configured');
  }

  return {
    stats,
    recentActivity,
    suggestions,
  };
}
