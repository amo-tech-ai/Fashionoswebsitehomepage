/**
 * AssetQualityScorer - Automated quality scoring for uploaded assets
 * 
 * Workflow 3: Asset Quality Auto-Scoring
 * Trigger: When new asset uploaded
 * 
 * Algorithm:
 * 1. Technical Quality (40 points): Resolution, format, file size
 * 2. Composition Score (30 points): Rule of thirds, focus, lighting
 * 3. Brand Alignment (30 points): Style consistency, luxury feel
 * 
 * Total: 0-100 score
 * - 90-100: Excellent (auto-approve, add to selects)
 * - 70-89: Good (approve, monitor)
 * - 50-69: Acceptable (flag for review)
 * - 0-49: Needs Work (reject, provide feedback)
 */

import type { Asset, QualityScore } from '../types/media.types';

// ============================================================================
// TECHNICAL QUALITY SCORING (40 points)
// ============================================================================

function scoreTechnicalQuality(asset: Asset): {
  score: number;
  issues: string[];
} {
  let score = 0;
  const issues: string[] = [];

  // Resolution scoring (15 points)
  const megapixels = (asset.width * asset.height) / 1_000_000;
  if (megapixels >= 24) {
    score += 15; // Professional grade (24+ MP)
  } else if (megapixels >= 12) {
    score += 12; // High quality (12-24 MP)
  } else if (megapixels >= 6) {
    score += 8; // Acceptable (6-12 MP)
    issues.push('Resolution could be higher for print quality');
  } else {
    score += 4; // Low resolution
    issues.push('Resolution too low for professional use');
  }

  // Format scoring (15 points)
  if (asset.format === 'RAW') {
    score += 15; // Best - full editing flexibility
  } else if (asset.format === 'TIFF') {
    score += 12; // Excellent - lossless
  } else if (asset.format === 'PNG') {
    score += 8; // Good - lossless but compressed
    issues.push('RAW or TIFF format preferred for maximum quality');
  } else if (asset.format === 'JPG') {
    score += 5; // Acceptable - lossy compression
    issues.push('JPG is lossy - use RAW or TIFF for best quality');
  }

  // File size scoring (10 points)
  const sizeMB = asset.fileSize / 1_024 / 1_024;
  if (asset.format === 'RAW') {
    if (sizeMB >= 20) {
      score += 10; // Full sensor data
    } else if (sizeMB >= 10) {
      score += 7; // Compressed RAW
      issues.push('RAW file seems small - verify sensor settings');
    } else {
      score += 4; // Very small RAW
      issues.push('RAW file unusually small - check camera settings');
    }
  } else {
    // For processed formats
    if (sizeMB >= 5) {
      score += 10; // High quality export
    } else if (sizeMB >= 2) {
      score += 7; // Good quality
    } else {
      score += 4; // Over-compressed
      issues.push('File size small - may be over-compressed');
    }
  }

  return { score, issues };
}

// ============================================================================
// COMPOSITION SCORING (30 points)
// ============================================================================

function scoreComposition(asset: Asset): {
  score: number;
  suggestions: string[];
} {
  let score = 0;
  const suggestions: string[] = [];

  // Aspect ratio analysis (10 points)
  const aspectRatio = asset.width / asset.height;
  
  // Common professional ratios
  const ratios = [
    { ratio: 1.5, name: '3:2 (Classic)', score: 10 },
    { ratio: 1.33, name: '4:3 (Standard)', score: 9 },
    { ratio: 1.0, name: '1:1 (Square)', score: 10 },
    { ratio: 1.78, name: '16:9 (Widescreen)', score: 8 },
    { ratio: 0.8, name: '4:5 (Instagram)', score: 9 },
  ];

  let closestRatio = ratios[0];
  let minDiff = Math.abs(aspectRatio - ratios[0].ratio);

  for (const r of ratios) {
    const diff = Math.abs(aspectRatio - r.ratio);
    if (diff < minDiff) {
      minDiff = diff;
      closestRatio = r;
    }
  }

  if (minDiff < 0.05) {
    score += closestRatio.score;
  } else {
    score += 6;
    suggestions.push(`Non-standard aspect ratio. Consider ${closestRatio.name} for better composition`);
  }

  // Orientation suitability (10 points)
  const isLandscape = aspectRatio > 1.2;
  const isPortrait = aspectRatio < 0.9;
  const isSquare = aspectRatio >= 0.9 && aspectRatio <= 1.1;

  // Check if orientation matches typical use case
  const category = asset.category?.toLowerCase() || '';
  
  if (category.includes('jewelry') || category.includes('accessories')) {
    if (isSquare) {
      score += 10; // Perfect for jewelry detail shots
    } else {
      score += 7;
      suggestions.push('Square format works best for jewelry close-ups');
    }
  } else if (category.includes('apparel') || category.includes('outfit')) {
    if (isPortrait) {
      score += 10; // Perfect for full-body fashion
    } else {
      score += 6;
      suggestions.push('Portrait orientation recommended for apparel shots');
    }
  } else {
    score += 8; // Neutral scoring for other categories
  }

  // Rule of thirds heuristic (10 points)
  // Note: This is a simplified heuristic. Real implementation would use computer vision.
  // For now, we give a baseline score and suggest best practices
  score += 7;
  suggestions.push('Ensure subject follows rule of thirds for optimal composition');

  return { score, suggestions };
}

// ============================================================================
// BRAND ALIGNMENT SCORING (30 points)
// ============================================================================

function scoreBrandAlignment(asset: Asset): {
  score: number;
  suggestions: string[];
} {
  let score = 0;
  const suggestions: string[] = [];

  // Naming convention (10 points)
  const hasProperNaming = /^[A-Z0-9_-]+\.(raw|tiff|png|jpg)$/i.test(asset.name);
  if (hasProperNaming) {
    score += 10;
  } else {
    score += 5;
    suggestions.push('Use consistent naming: BRAND_CATEGORY_SHOT-NUMBER.ext');
  }

  // Metadata completeness (10 points)
  let metadataScore = 0;
  if (asset.category) metadataScore += 3;
  if (asset.shotNumber) metadataScore += 4;
  if (asset.tags && asset.tags.length > 0) metadataScore += 3;
  
  score += metadataScore;
  if (metadataScore < 10) {
    suggestions.push('Add category, shot number, and tags for better organization');
  }

  // Luxury feel indicators (10 points)
  // Based on resolution, format, and file size (proxy for quality)
  const isHighRes = (asset.width * asset.height) >= 12_000_000;
  const isRAWorTIFF = asset.format === 'RAW' || asset.format === 'TIFF';
  const isLargeFile = asset.fileSize >= 10 * 1024 * 1024;

  if (isHighRes && isRAWorTIFF && isLargeFile) {
    score += 10; // Premium quality indicators
  } else if (isHighRes && isRAWorTIFF) {
    score += 8; // Good quality
  } else if (isHighRes) {
    score += 6; // Acceptable
    suggestions.push('Use RAW or TIFF format for luxury brand standards');
  } else {
    score += 4; // Below luxury standards
    suggestions.push('Increase resolution and use RAW format for luxury brand quality');
  }

  return { score, suggestions };
}

// ============================================================================
// MAIN SCORING FUNCTION
// ============================================================================

export function scoreAssetQuality(asset: Asset): QualityScore & {
  autoApprove: boolean;
  flagForReview: boolean;
  improvements: string[];
} {
  const technical = scoreTechnicalQuality(asset);
  const composition = scoreComposition(asset);
  const brand = scoreBrandAlignment(asset);

  const totalScore = technical.score + composition.score + brand.score;

  // Determine quality level
  let quality: 'excellent' | 'good' | 'acceptable' | 'needs-work';
  let autoApprove = false;
  let flagForReview = false;

  if (totalScore >= 90) {
    quality = 'excellent';
    autoApprove = true;
  } else if (totalScore >= 70) {
    quality = 'good';
    autoApprove = false;
  } else if (totalScore >= 50) {
    quality = 'acceptable';
    flagForReview = true;
  } else {
    quality = 'needs-work';
    flagForReview = true;
  }

  // Combine all suggestions
  const improvements = [
    ...technical.issues,
    ...composition.suggestions,
    ...brand.suggestions,
  ];

  return {
    totalScore,
    quality,
    breakdown: {
      technical: technical.score,
      composition: composition.score,
      brand: brand.score,
    },
    suggestions: improvements,
    autoApprove,
    flagForReview,
    improvements,
  };
}

// ============================================================================
// BATCH SCORING
// ============================================================================

export function scoreAssetBatch(assets: Asset[]): {
  averageScore: number;
  excellentCount: number;
  goodCount: number;
  acceptableCount: number;
  needsWorkCount: number;
  topAssets: Asset[];
  flaggedAssets: Asset[];
} {
  const scores = assets.map(asset => ({
    asset,
    score: scoreAssetQuality(asset),
  }));

  // Calculate statistics
  const totalScore = scores.reduce((sum, s) => sum + s.score.totalScore, 0);
  const averageScore = totalScore / scores.length;

  const excellentCount = scores.filter(s => s.score.quality === 'excellent').length;
  const goodCount = scores.filter(s => s.score.quality === 'good').length;
  const acceptableCount = scores.filter(s => s.score.quality === 'acceptable').length;
  const needsWorkCount = scores.filter(s => s.score.quality === 'needs-work').length;

  // Get top assets (score >= 85)
  const topAssets = scores
    .filter(s => s.score.totalScore >= 85)
    .sort((a, b) => b.score.totalScore - a.score.totalScore)
    .slice(0, 10)
    .map(s => s.asset);

  // Get flagged assets (score < 70)
  const flaggedAssets = scores
    .filter(s => s.score.flagForReview)
    .map(s => s.asset);

  return {
    averageScore,
    excellentCount,
    goodCount,
    acceptableCount,
    needsWorkCount,
    topAssets,
    flaggedAssets,
  };
}

// ============================================================================
// AUTO-APPROVAL WORKFLOW
// ============================================================================

export function processAssetUpload(asset: Asset): {
  approved: boolean;
  action: 'auto_approve' | 'manual_review' | 'reject';
  score: QualityScore;
  nextSteps: string[];
} {
  const score = scoreAssetQuality(asset);
  
  let action: 'auto_approve' | 'manual_review' | 'reject';
  const nextSteps: string[] = [];

  if (score.autoApprove) {
    action = 'auto_approve';
    nextSteps.push('Asset added to selects pool');
    nextSteps.push('Available for client review');
  } else if (score.flagForReview) {
    if (score.totalScore < 50) {
      action = 'reject';
      nextSteps.push('Reshoot recommended');
      nextSteps.push('Photographer notified of issues');
    } else {
      action = 'manual_review';
      nextSteps.push('Manual review required');
      nextSteps.push('Apply suggested improvements');
    }
  } else {
    action = 'manual_review';
    nextSteps.push('Review for client delivery');
  }

  return {
    approved: action === 'auto_approve',
    action,
    score,
    nextSteps,
  };
}
