/**
 * Automation Workflows - Barrel export for clean imports
 * 
 * All 5 automation workflows:
 * 1. Auto-Batch Samples (LogisticsSkill)
 * 2. Critical Path Auto-Update (EventsSkill)  
 * 3. Asset Quality Auto-Scoring
 * 4. Proactive Risk Alerts
 * 5. Smart Task Assignment
 */

// Workflow 3: Asset Quality
export { 
  scoreAssetQuality, 
  scoreAssetBatch, 
  processAssetUpload 
} from './AssetQualityScorer';

// Workflow 4: Proactive Risk Alerts
export { 
  performRiskScan, 
  formatRiskNotification 
} from './ProactiveRiskAlerts';
export type { Risk, RiskReport, RiskSeverity, RiskCategory } from './ProactiveRiskAlerts';

// Workflow 5: Smart Task Assignment
export {
  recommendAssignments,
  autoAssignTask,
  detectOverallocation,
  optimizeTeamAssignments,
} from './SmartTaskAssignment';
export type {
  TeamMember,
  TaskRequirements,
  AssignmentRecommendation,
} from './SmartTaskAssignment';

// Central Orchestrator
export {
  automationOrchestrator,
  runAutomations,
  runWorkflow,
  scheduledDailyRiskScan,
  getAutomationInsights,
} from './AutomationOrchestrator';
export type {
  AutomationTrigger,
  AutomationEvent,
  AutomationResult,
  AutomationReport,
} from './AutomationOrchestrator';
