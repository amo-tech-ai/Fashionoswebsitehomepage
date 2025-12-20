/**
 * MediaSkill - AI algorithms for asset quality, delivery tracking, and post-production
 * 
 * Algorithms:
 * 1. Quality Scoring: Analyze assets for technical quality + composition + brand fit
 * 2. Missing Shots Detection: Compare shot list vs captured assets
 * 3. Selects Generation: Pick top N assets by quality + variety
 * 4. Delivery Timeline: Calculate progress and deadline tracking
 */

import type {
  Asset,
  ShotListItem,
  QualityScore,
  MissingShots,
  DeliveryTimeline,
} from '../types/media.types';

// Re-export types for backward compatibility
export type {
  Asset,
  ShotListItem,
  QualityScore,
  MissingShots,
  DeliveryTimeline,
};

// ============================================================================
// ALGORITHM 1: QUALITY SCORING
// ============================================================================

export function scoreAssetQuality(asset: Asset): QualityScore {
  let technicalScore = 0;
  let compositionScore = 0;
  let brandScore = 0;
  const suggestions: string[] = [];

  // --- TECHNICAL QUALITY (40 points max) ---
  
  // Resolution check (15 points)
  if (asset.width >= 3000 && asset.height >= 2000) {
    technicalScore += 15;
  } else if (asset.width >= 2000 && asset.height >= 1500) {
    technicalScore += 10;
    suggestions.push('Increase resolution to 3000x2000+ for maximum quality');
  } else {
    technicalScore += 5;
    suggestions.push('⚠️ Resolution too low - minimum 2000x1500 required');
  }

  // File size (quality indicator) (10 points)
  const fileSizeMB = asset.fileSize / (1024 * 1024);
  if (fileSizeMB > 5) {
    technicalScore += 10;
  } else if (fileSizeMB > 2) {
    technicalScore += 5;
    suggestions.push('Consider less compression for higher quality');
  } else {
    technicalScore += 2;
    suggestions.push('⚠️ File size very low - may indicate over-compression');
  }

  // Format quality (15 points)
  switch (asset.format) {
    case 'RAW':
      technicalScore += 15;
      break;
    case 'TIFF':
      technicalScore += 15;
      break;
    case 'PNG':
      technicalScore += 10;
      break;
    case 'JPG':
      technicalScore += 5;
      suggestions.push('Use RAW or TIFF format for archival quality');
      break;
  }

  // --- COMPOSITION (30 points max) ---
  
  // Aspect ratio (15 points) - check if fits standard deliverable specs
  const aspectRatio = asset.width / asset.height;
  const standardRatios = [
    { ratio: 16 / 9, name: '16:9' },
    { ratio: 4 / 3, name: '4:3' },
    { ratio: 1 / 1, name: '1:1 (square)' },
    { ratio: 9 / 16, name: '9:16 (vertical)' },
  ];

  const matchesStandard = standardRatios.some(
    std => Math.abs(aspectRatio - std.ratio) < 0.05
  );

  if (matchesStandard) {
    compositionScore += 15;
  } else {
    compositionScore += 10;
    suggestions.push('Aspect ratio non-standard - may need cropping for deliverables');
  }

  // Placeholder for future: brightness, focus, etc. (15 points)
  compositionScore += 12; // Assume decent composition

  // --- BRAND CONSISTENCY (30 points max) ---
  
  // Category tagging (15 points)
  if (asset.category) {
    brandScore += 15;
  } else {
    brandScore += 8;
    suggestions.push('Add category tag for better organization');
  }

  // Tags present (15 points)
  if (asset.tags && asset.tags.length >= 3) {
    brandScore += 15;
  } else if (asset.tags && asset.tags.length > 0) {
    brandScore += 10;
    suggestions.push('Add more descriptive tags for searchability');
  } else {
    brandScore += 5;
    suggestions.push('Add tags to improve asset discoverability');
  }

  // --- CALCULATE TOTAL ---
  const totalScore = technicalScore + compositionScore + brandScore;

  let quality: QualityScore['quality'];
  if (totalScore >= 90) quality = 'excellent';
  else if (totalScore >= 80) quality = 'good';
  else if (totalScore >= 70) quality = 'acceptable';
  else quality = 'needs-work';

  return {
    totalScore,
    quality,
    breakdown: {
      technical: technicalScore,
      composition: compositionScore,
      brand: brandScore,
    },
    suggestions,
  };
}

// ============================================================================
// ALGORITHM 2: MISSING SHOTS DETECTION
// ============================================================================

export function detectMissingShots(
  shotList: ShotListItem[],
  capturedAssets: Asset[]
): MissingShots {
  const requiredShots = shotList.filter(shot => shot.required);
  const totalRequired = requiredShots.length;

  // Match assets to shot list by shotNumber or description keywords
  const capturedShotNumbers = new Set(
    capturedAssets.map(a => a.shotNumber).filter(Boolean)
  );

  const missing = requiredShots.filter(
    shot => !capturedShotNumbers.has(shot.shotNumber)
  );

  const captured = totalRequired - missing.length;
  const completionPercentage = totalRequired > 0 
    ? Math.round((captured / totalRequired) * 100) 
    : 100;

  return {
    totalRequired,
    captured,
    missing,
    completionPercentage,
  };
}

// ============================================================================
// ALGORITHM 3: SELECTS GENERATION (Top N by Quality + Variety)
// ============================================================================

export function generateSelects(
  assets: Asset[],
  count: number = 10
): Asset[] {
  // Score all assets
  const scoredAssets = assets.map(asset => ({
    asset,
    score: scoreAssetQuality(asset).totalScore,
  }));

  // Sort by score (highest first)
  scoredAssets.sort((a, b) => b.score - a.score);

  // Apply variety: Try to include mix of categories
  const selected: Asset[] = [];
  const categoriesUsed = new Set<string>();

  // First pass: Pick highest quality from each category
  for (const { asset, score } of scoredAssets) {
    if (selected.length >= count) break;
    
    const category = asset.category || 'uncategorized';
    if (!categoriesUsed.has(category)) {
      selected.push(asset);
      categoriesUsed.add(category);
    }
  }

  // Second pass: Fill remaining slots with highest quality
  for (const { asset } of scoredAssets) {
    if (selected.length >= count) break;
    if (!selected.includes(asset)) {
      selected.push(asset);
    }
  }

  return selected;
}

// ============================================================================
// ALGORITHM 4: DELIVERY TIMELINE TRACKING
// ============================================================================

export function calculateDeliveryTimeline(
  assets: Asset[],
  deadlineDate: Date
): DeliveryTimeline {
  const totalAssets = assets.length;
  const delivered = assets.filter(a => a.status === 'delivered').length;
  const inProgress = assets.filter(a => 
    a.status === 'selected' || a.status === 'edited'
  ).length;
  const notStarted = assets.filter(a => a.status === 'uploaded').length;

  const progressPercentage = totalAssets > 0 
    ? Math.round((delivered / totalAssets) * 100) 
    : 0;

  // Calculate days until deadline
  const now = new Date();
  const daysUntilDeadline = Math.ceil(
    (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Estimate completion based on current velocity
  // Assume 20 assets can be edited per day
  const assetsPerDay = 20;
  const daysNeeded = Math.ceil((inProgress + notStarted) / assetsPerDay);
  
  const estimatedCompletionDate = new Date();
  estimatedCompletionDate.setDate(estimatedCompletionDate.getDate() + daysNeeded);

  const onTrack = estimatedCompletionDate <= deadlineDate;

  return {
    totalAssets,
    delivered,
    inProgress,
    notStarted,
    progressPercentage,
    daysUntilDeadline,
    onTrack,
    estimatedCompletionDate,
  };
}

// ============================================================================
// NATURAL LANGUAGE Q&A (Intent Detection)
// ============================================================================

export function handleMediaQuery(
  message: string,
  assets: Asset[],
  shotList?: ShotListItem[],
  deadline?: Date
): string {
  const lower = message.toLowerCase();

  // Query: Quality check
  if (lower.includes('quality') || lower.includes('how good')) {
    const avgScore = assets.reduce((sum, asset) => {
      return sum + scoreAssetQuality(asset).totalScore;
    }, 0) / assets.length;

    const roundedAvg = Math.round(avgScore);
    const qualityLabel = 
      roundedAvg >= 90 ? 'excellent' :
      roundedAvg >= 80 ? 'good' :
      roundedAvg >= 70 ? 'acceptable' : 'needs improvement';

    return `Average asset quality: ${roundedAvg}/100 (${qualityLabel}). ${assets.length} assets analyzed.`;
  }

  // Query: Missing shots
  if ((lower.includes('missing') || lower.includes('need')) && shotList) {
    const missing = detectMissingShots(shotList, assets);
    
    if (missing.missing.length === 0) {
      return `✅ All required shots captured! ${missing.totalRequired}/${missing.totalRequired} complete.`;
    }
    
    return `${missing.missing.length} required shot${missing.missing.length > 1 ? 's' : ''} missing: ${missing.missing.slice(0, 3).map(s => s.shotNumber).join(', ')}${missing.missing.length > 3 ? ` +${missing.missing.length - 3} more` : ''}`;
  }

  // Query: Delivery status
  if (lower.includes('delivery') || lower.includes('deadline') || lower.includes('timeline')) {
    if (!deadline) {
      return `${assets.length} assets uploaded. Set a deadline to track delivery progress.`;
    }

    const timeline = calculateDeliveryTimeline(assets, deadline);
    const status = timeline.onTrack ? '✅ On track' : '⚠️ At risk';

    return `Delivery: ${timeline.progressPercentage}% complete (${timeline.delivered}/${timeline.totalAssets} delivered). ${status} for ${timeline.daysUntilDeadline}-day deadline.`;
  }

  // Query: Selects
  if (lower.includes('select') || lower.includes('best') || lower.includes('top')) {
    const selects = generateSelects(assets, 10);
    return `Generated ${selects.length} top selects based on quality + variety. Average score: ${Math.round(selects.reduce((sum, s) => sum + scoreAssetQuality(s).totalScore, 0) / selects.length)}/100`;
  }

  // Default
  return `I can help with: asset quality, missing shots, delivery timeline, and selects generation. What would you like to know?`;
}