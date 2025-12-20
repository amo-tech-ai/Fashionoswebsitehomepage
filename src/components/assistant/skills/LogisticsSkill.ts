/**
 * LogisticsSkill - AI Logic for Sample Tracking & Logistics Optimization
 * 
 * This is the "brain" for logistics intelligence - pure business logic,
 * no UI components. Calculates readiness, identifies risks, optimizes batching.
 */

import { SampleItem } from '../../../context/BrandShootContext';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ReadinessReport {
  overallPercentage: number;
  totalSamples: number;
  readySamples: number;
  awaitingSamples: number;
  onSetSamples: number;
  shotSamples: number;
  returnedSamples: number;
  status: 'critical' | 'warning' | 'good' | 'excellent';
  message: string;
  recommendations: string[];
}

export interface Blocker {
  id: string;
  sampleId: string;
  sampleName: string;
  sku: string;
  type: 'missing' | 'delayed' | 'damaged' | 'wrong_variant';
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  resolution: string;
  estimatedDelay: string;
}

export interface BatchingPlan {
  totalBatches: number;
  batches: {
    id: string;
    name: string;
    samples: SampleItem[];
    estimatedTime: string;
    rationale: string;
    order: number;
  }[];
  estimatedTimeSavings: string;
  optimizationTips: string[];
}

export interface LogisticsInsight {
  type: 'readiness' | 'risk' | 'optimization' | 'milestone';
  title: string;
  value: string | number;
  description: string;
  severity?: 'critical' | 'warning' | 'info' | 'success';
  action?: {
    label: string;
    target: string;
  };
}

// ============================================================================
// CORE AI ALGORITHMS
// ============================================================================

/**
 * Analyze readiness percentage and generate report
 * 
 * Algorithm:
 * - Ready samples = on_set + shot
 * - Total samples = all samples
 * - Readiness % = (ready / total) * 100
 * - Status determined by percentage thresholds
 */
export function analyzeReadiness(samples: SampleItem[]): ReadinessReport {
  const total = samples.length;
  
  if (total === 0) {
    return {
      overallPercentage: 0,
      totalSamples: 0,
      readySamples: 0,
      awaitingSamples: 0,
      onSetSamples: 0,
      shotSamples: 0,
      returnedSamples: 0,
      status: 'critical',
      message: 'No samples in system',
      recommendations: ['Add samples to begin tracking']
    };
  }

  // Count by status
  const awaiting = samples.filter(s => s.status === 'awaiting').length;
  const onSet = samples.filter(s => s.status === 'on_set').length;
  const shot = samples.filter(s => s.status === 'shot').length;
  const returned = samples.filter(s => s.status === 'returned').length;

  // Ready = on set + already shot
  const ready = onSet + shot;
  const percentage = Math.round((ready / total) * 100);

  // Determine status
  let status: ReadinessReport['status'];
  let message: string;
  const recommendations: string[] = [];

  if (percentage >= 95) {
    status = 'excellent';
    message = `Campaign is ${percentage}% ready. All systems go!`;
    recommendations.push('Review shot list one final time');
    recommendations.push('Confirm talent call times');
  } else if (percentage >= 80) {
    status = 'good';
    message = `Campaign is ${percentage}% ready. On track for shoot day.`;
    if (awaiting > 0) {
      recommendations.push(`Track ${awaiting} samples still in transit`);
    }
    recommendations.push('Prepare backup options for any late arrivals');
  } else if (percentage >= 60) {
    status = 'warning';
    message = `Campaign is ${percentage}% ready. Some items still pending.`;
    recommendations.push(`Expedite ${awaiting} samples to avoid delays`);
    recommendations.push('Consider adjusting shot sequence');
    recommendations.push('Notify creative team of potential timeline shifts');
  } else {
    status = 'critical';
    message = `Campaign is only ${percentage}% ready. Immediate action required.`;
    recommendations.push('URGENT: Contact vendors for missing samples');
    recommendations.push('Develop contingency plan for shoot day');
    recommendations.push('Consider rescheduling if critical items delayed');
  }

  return {
    overallPercentage: percentage,
    totalSamples: total,
    readySamples: ready,
    awaitingSamples: awaiting,
    onSetSamples: onSet,
    shotSamples: shot,
    returnedSamples: returned,
    status,
    message,
    recommendations
  };
}

/**
 * Identify blockers and high-risk items
 * 
 * Algorithm:
 * - Critical: Hero items (priority 1-3) still awaiting
 * - High: Any item with priority < 5 and status awaiting
 * - Medium: Standard items awaiting within 24h of shoot
 * - Low: Items already on set but not yet shot
 */
export function identifyBlockers(samples: SampleItem[]): Blocker[] {
  const blockers: Blocker[] = [];

  samples.forEach(sample => {
    // Critical blockers: Hero items not yet on set
    if (sample.isHero && (sample.status === 'awaiting')) {
      blockers.push({
        id: `blocker-${sample.id}`,
        sampleId: sample.id,
        sampleName: sample.name,
        sku: sample.sku,
        type: 'missing',
        severity: 'critical',
        impact: `HERO ITEM missing. Cannot shoot primary campaign assets without this item.`,
        resolution: `Contact vendor immediately. If not arriving today, develop alternative creative approach.`,
        estimatedDelay: sample.priority <= 2 ? '4-8 hours production delay' : '2-4 hours delay'
      });
    }
    
    // High priority blockers: Priority items still awaiting
    else if (sample.priority <= 3 && sample.status === 'awaiting') {
      blockers.push({
        id: `blocker-${sample.id}`,
        sampleId: sample.id,
        sampleName: sample.name,
        sku: sample.sku,
        type: 'delayed',
        severity: 'high',
        impact: `High-priority item (Priority ${sample.priority}) not yet on set. May affect shot sequence.`,
        resolution: `Check tracking. If delayed beyond 10am, reschedule shots requiring this item to afternoon.`,
        estimatedDelay: '1-2 hours potential delay'
      });
    }
    
    // Medium priority: Standard items still awaiting
    else if (sample.priority <= 5 && sample.status === 'awaiting') {
      blockers.push({
        id: `blocker-${sample.id}`,
        sampleId: sample.id,
        sampleName: sample.name,
        sku: sample.sku,
        type: 'delayed',
        severity: 'medium',
        impact: `Item not yet on set. May need to adjust shot order.`,
        resolution: `Monitor delivery. Shoot other items first if this arrives late.`,
        estimatedDelay: '30-60 min potential delay'
      });
    }
  });

  // Sort by severity
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  blockers.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return blockers;
}

/**
 * Generate optimized batching plan for shoot efficiency
 * 
 * Algorithm:
 * - Group samples by category (inferred from name/SKU pattern)
 * - Prioritize hero items first
 * - Batch similar items together (same lighting setup)
 * - Estimate time savings from reduced setup changes
 */
export function generateBatchingPlan(samples: SampleItem[]): BatchingPlan {
  // Only consider samples that are on_set or shot (ready to work with)
  const availableSamples = samples.filter(s => s.status === 'on_set' || s.status === 'shot');

  if (availableSamples.length === 0) {
    return {
      totalBatches: 0,
      batches: [],
      estimatedTimeSavings: '0 min',
      optimizationTips: ['Wait for samples to arrive on set before generating batching plan']
    };
  }

  // Categorize samples by type (simple heuristic based on name patterns)
  const categorize = (sample: SampleItem): string => {
    const name = sample.name.toLowerCase();
    if (name.includes('jewelry') || name.includes('necklace') || name.includes('earring') || name.includes('ring')) {
      return 'Jewelry';
    }
    if (name.includes('bag') || name.includes('purse') || name.includes('clutch') || name.includes('handbag')) {
      return 'Bags';
    }
    if (name.includes('shoe') || name.includes('boot') || name.includes('heel') || name.includes('sneaker')) {
      return 'Footwear';
    }
    if (name.includes('dress') || name.includes('gown') || name.includes('skirt')) {
      return 'Dresses & Skirts';
    }
    if (name.includes('top') || name.includes('blouse') || name.includes('shirt') || name.includes('sweater')) {
      return 'Tops';
    }
    if (name.includes('pant') || name.includes('jean') || name.includes('trouser')) {
      return 'Bottoms';
    }
    if (name.includes('scarf') || name.includes('hat') || name.includes('glove') || name.includes('belt')) {
      return 'Accessories';
    }
    return 'Other';
  };

  // Group samples by category
  const categorized = new Map<string, SampleItem[]>();
  availableSamples.forEach(sample => {
    const category = categorize(sample);
    if (!categorized.has(category)) {
      categorized.set(category, []);
    }
    categorized.get(category)!.push(sample);
  });

  // Sort each category: hero items first, then by priority
  categorized.forEach((samples, category) => {
    samples.sort((a, b) => {
      if (a.isHero && !b.isHero) return -1;
      if (!a.isHero && b.isHero) return 1;
      return a.priority - b.priority;
    });
  });

  // Create batches
  const batches = Array.from(categorized.entries()).map(([category, items], index) => {
    // Estimate time per item (jewelry = 15min, bags = 20min, apparel = 25min)
    const timePerItem = category === 'Jewelry' ? 15 : category === 'Bags' || category === 'Footwear' ? 20 : 25;
    const totalMinutes = items.length * timePerItem;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const estimatedTime = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

    // Generate rationale
    const rationale = items.some(i => i.isHero)
      ? `Includes ${items.filter(i => i.isHero).length} hero item(s). Shoot these first for maximum creative flexibility.`
      : `Batch similar items together to minimize lighting/setup changes. Estimated ${timePerItem}min per item.`;

    return {
      id: `batch-${index + 1}`,
      name: `Batch ${index + 1}: ${category}`,
      samples: items,
      estimatedTime,
      rationale,
      order: index + 1
    };
  });

  // Sort batches: Hero batches first, then by sample count (larger batches first)
  batches.sort((a, b) => {
    const aHasHero = a.samples.some(s => s.isHero);
    const bHasHero = b.samples.some(s => s.isHero);
    if (aHasHero && !bHasHero) return -1;
    if (!aHasHero && bHasHero) return 1;
    return b.samples.length - a.samples.length;
  });

  // Reassign order numbers after sorting
  batches.forEach((batch, index) => {
    batch.order = index + 1;
  });

  // Calculate time savings
  // Assumption: Without batching, each category change costs 15min setup time
  const setupChanges = Math.max(0, batches.length - 1);
  const setupTimeSaved = setupChanges * 15;
  const timeSavingsText = setupTimeSaved >= 60 
    ? `${Math.floor(setupTimeSaved / 60)}h ${setupTimeSaved % 60}min`
    : `${setupTimeSaved}min`;

  // Optimization tips
  const tips: string[] = [];
  
  if (batches.length > 1) {
    tips.push(`Shoot all ${batches[0].name.split(':')[1].trim()} items together to save setup time`);
  }
  
  const heroBatches = batches.filter(b => b.samples.some(s => s.isHero));
  if (heroBatches.length > 0) {
    tips.push(`Prioritize hero items in ${heroBatches[0].name.split(':')[1].trim()} - shoot these first`);
  }
  
  if (batches.length >= 3) {
    tips.push(`Prep all items in each batch beforehand to minimize downtime between shots`);
  }

  tips.push(`Keep similar items (same material/color) nearby for quick swaps`);

  return {
    totalBatches: batches.length,
    batches,
    estimatedTimeSavings: timeSavingsText,
    optimizationTips: tips
  };
}

/**
 * Generate logistics insights for dashboard cards
 */
export function generateLogisticsInsights(samples: SampleItem[]): LogisticsInsight[] {
  const insights: LogisticsInsight[] = [];
  const readiness = analyzeReadiness(samples);
  const blockers = identifyBlockers(samples);
  const batching = generateBatchingPlan(samples);

  // Insight 1: Total SKUs
  insights.push({
    type: 'milestone',
    title: 'Total SKUs',
    value: samples.length,
    description: `${readiness.onSetSamples} on set, ${readiness.awaitingSamples} in transit`,
    severity: 'info'
  });

  // Insight 2: Readiness Percentage
  insights.push({
    type: 'readiness',
    title: 'Shoot Readiness',
    value: `${readiness.overallPercentage}%`,
    description: readiness.message,
    severity: readiness.status === 'excellent' || readiness.status === 'good' 
      ? 'success' 
      : readiness.status === 'warning' 
        ? 'warning' 
        : 'critical',
    action: readiness.status === 'critical' || readiness.status === 'warning'
      ? { label: 'Fix Blockers', target: 'sample-tracker:delayed' }
      : undefined
  });

  // Insight 3: Risk Status
  if (blockers.length > 0) {
    const criticalCount = blockers.filter(b => b.severity === 'critical').length;
    insights.push({
      type: 'risk',
      title: 'Risk Status',
      value: blockers.length,
      description: criticalCount > 0 
        ? `${criticalCount} critical blocker${criticalCount > 1 ? 's' : ''} detected`
        : `${blockers.length} item${blockers.length > 1 ? 's' : ''} at risk`,
      severity: criticalCount > 0 ? 'critical' : 'warning',
      action: { label: 'View Details', target: 'sample-tracker:blockers' }
    });
  } else {
    insights.push({
      type: 'risk',
      title: 'Risk Status',
      value: 'All Clear',
      description: 'No blockers detected. All samples on track.',
      severity: 'success'
    });
  }

  // Insight 4: Optimization
  if (batching.totalBatches > 0) {
    insights.push({
      type: 'optimization',
      title: 'Batching Optimization',
      value: batching.estimatedTimeSavings,
      description: `Group ${batching.totalBatches} batches to save ${batching.estimatedTimeSavings} setup time`,
      severity: 'info',
      action: { label: 'View Plan', target: 'sample-tracker:batching' }
    });
  }

  return insights;
}

/**
 * Answer natural language questions about logistics
 * 
 * Simple NLP-like keyword detection and routing to appropriate analysis
 */
export function answerQuestion(query: string, samples: SampleItem[]): {
  answer: string;
  insights?: LogisticsInsight[];
  actions?: { label: string; target: string }[];
} {
  const lowerQuery = query.toLowerCase();

  // Readiness questions
  if (lowerQuery.includes('ready') || lowerQuery.includes('readiness') || lowerQuery.includes('prepared')) {
    const readiness = analyzeReadiness(samples);
    return {
      answer: readiness.message,
      insights: [
        {
          type: 'readiness',
          title: 'Detailed Breakdown',
          value: `${readiness.overallPercentage}%`,
          description: `${readiness.onSetSamples} on set, ${readiness.shotSamples} shot, ${readiness.awaitingSamples} awaiting`,
          severity: readiness.status === 'excellent' || readiness.status === 'good' ? 'success' : 'warning'
        }
      ],
      actions: readiness.status !== 'excellent'
        ? [{ label: 'Fix Blockers', target: 'sample-tracker:delayed' }]
        : []
    };
  }

  // Missing/delayed questions
  if (lowerQuery.includes('missing') || lowerQuery.includes('delayed') || lowerQuery.includes('late')) {
    const blockers = identifyBlockers(samples);
    if (blockers.length === 0) {
      return {
        answer: 'All samples accounted for. No delays detected.',
        actions: []
      };
    }

    const criticalBlockers = blockers.filter(b => b.severity === 'critical');
    const highBlockers = blockers.filter(b => b.severity === 'high');

    let answer = '';
    if (criticalBlockers.length > 0) {
      answer = `⚠️ CRITICAL: ${criticalBlockers.length} essential item${criticalBlockers.length > 1 ? 's are' : ' is'} missing:\n`;
      criticalBlockers.slice(0, 2).forEach(b => {
        answer += `• ${b.sampleName} (${b.sku}) - ${b.impact}\n`;
      });
    } else if (highBlockers.length > 0) {
      answer = `${highBlockers.length} high-priority item${highBlockers.length > 1 ? 's are' : ' is'} delayed:\n`;
      highBlockers.slice(0, 2).forEach(b => {
        answer += `• ${b.sampleName} (${b.sku}) - ${b.resolution}\n`;
      });
    } else {
      answer = `${blockers.length} item${blockers.length > 1 ? 's are' : ' is'} delayed but not critical.`;
    }

    return {
      answer,
      actions: [
        { label: 'View All Blockers', target: 'sample-tracker:blockers' },
        { label: 'Fix Critical Items', target: 'sample-tracker:delayed' }
      ]
    };
  }

  // Optimization/batching questions
  if (lowerQuery.includes('optimize') || lowerQuery.includes('batch') || lowerQuery.includes('efficient') || lowerQuery.includes('faster')) {
    const batching = generateBatchingPlan(samples);
    if (batching.totalBatches === 0) {
      return {
        answer: 'Samples not yet on set. Batching plan will be available once samples arrive.',
        actions: []
      };
    }

    return {
      answer: `💡 Batching ${batching.totalBatches} groups can save ${batching.estimatedTimeSavings} of setup time. ${batching.optimizationTips[0]}`,
      actions: [
        { label: 'View Full Plan', target: 'sample-tracker:batching' },
        { label: 'Apply to Shot List', target: 'shotlist:reorder' }
      ]
    };
  }

  // Status questions
  if (lowerQuery.includes('status') || lowerQuery.includes('how many') || lowerQuery.includes('count')) {
    const readiness = analyzeReadiness(samples);
    return {
      answer: `Campaign status: ${readiness.totalSamples} total SKUs\n• ${readiness.onSetSamples} on set\n• ${readiness.shotSamples} shot\n• ${readiness.awaitingSamples} in transit\n• ${readiness.returnedSamples} returned`,
      actions: [{ label: 'View Tracker', target: 'sample-tracker' }]
    };
  }

  // Default fallback
  return {
    answer: 'I can help with:\n• Readiness analysis ("Are we ready?")\n• Missing items ("What\'s missing?")\n• Optimization ("How can we be more efficient?")\n• Status updates ("What\'s the status?")',
    actions: [{ label: 'View Sample Tracker', target: 'sample-tracker' }]
  };
}
