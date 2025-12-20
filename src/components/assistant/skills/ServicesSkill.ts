/**
 * ServicesSkill - AI algorithms for service package recommendations and pricing
 * 
 * Algorithms:
 * 1. Package Recommendation: Match client needs to best service package
 * 2. Pricing Estimation: Calculate estimated cost with add-ons
 * 3. Timeline Forecasting: Predict delivery timeline based on scope
 */

import type {
  ServicePackage,
  ClientRequirements,
  PackageRecommendation,
  PricingEstimate,
  TimelineForecast,
} from '../types/services.types';

// Re-export types for backward compatibility
export type {
  ServicePackage,
  ClientRequirements,
  PackageRecommendation,
  PricingEstimate,
  TimelineForecast,
};

// ============================================================================
// MOCK SERVICE PACKAGES DATA
// ============================================================================

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'clothing-essential',
    name: 'Essential Clothing',
    category: 'clothing',
    tier: 'essential',
    basePrice: 1200,
    includes: ['Studio shoot', '25 edited images', 'Basic retouching', 'Digital delivery'],
    deliverables: {
      editedImages: 25,
      rawFiles: false,
    },
    typicalTimeline: 14,
    idealFor: ['Small collections', 'E-commerce basics', 'Seasonal updates'],
    minBudget: 1000,
    maxBudget: 1500,
  },
  {
    id: 'clothing-premium',
    name: 'Premium Clothing',
    category: 'clothing',
    tier: 'premium',
    basePrice: 2800,
    includes: ['Studio + location', '50 edited images', 'Advanced retouching', 'Model booking', 'RAW files'],
    deliverables: {
      editedImages: 50,
      rawFiles: true,
    },
    typicalTimeline: 21,
    idealFor: ['Major launches', 'Lookbooks', 'Brand campaigns'],
    minBudget: 2500,
    maxBudget: 3500,
  },
  {
    id: 'clothing-luxury',
    name: 'Luxury Clothing',
    category: 'clothing',
    tier: 'luxury',
    basePrice: 6500,
    includes: ['Premium locations', '100+ edited images', 'Full production', 'Top models', 'Video clips', 'Rush delivery'],
    deliverables: {
      editedImages: 100,
      rawFiles: true,
      videoClips: 5,
      rushDelivery: true,
    },
    typicalTimeline: 28,
    idealFor: ['Fashion shows', 'High-end campaigns', 'Editorial spreads'],
    minBudget: 6000,
    maxBudget: 10000,
  },
  {
    id: 'accessories-premium',
    name: 'Premium Accessories',
    category: 'accessories',
    tier: 'premium',
    basePrice: 1800,
    includes: ['Product photography', '40 edited images', 'Flat lays', 'Detail shots'],
    deliverables: {
      editedImages: 40,
      rawFiles: true,
    },
    typicalTimeline: 14,
    idealFor: ['Handbags', 'Belts', 'Small leather goods'],
    minBudget: 1500,
    maxBudget: 2500,
  },
  {
    id: 'jewelry-luxury',
    name: 'Luxury Jewelry',
    category: 'jewelry',
    tier: 'luxury',
    basePrice: 4500,
    includes: ['Macro photography', '60 edited images', 'Lifestyle shots', 'Model hands', 'Premium retouching'],
    deliverables: {
      editedImages: 60,
      rawFiles: true,
    },
    typicalTimeline: 21,
    idealFor: ['Fine jewelry', 'Watches', 'High-end pieces'],
    minBudget: 4000,
    maxBudget: 7000,
  },
  {
    id: 'editorial-luxury',
    name: 'Editorial Campaign',
    category: 'editorial',
    tier: 'luxury',
    basePrice: 8500,
    includes: ['Full creative direction', '150+ edited images', 'Multiple locations', 'Hair & makeup', 'Styling', 'Video content'],
    deliverables: {
      editedImages: 150,
      rawFiles: true,
      videoClips: 10,
    },
    typicalTimeline: 35,
    idealFor: ['Magazine features', 'Brand storytelling', 'Major campaigns'],
    minBudget: 8000,
    maxBudget: 15000,
  },
];

// ============================================================================
// ALGORITHM 1: PACKAGE RECOMMENDATION
// ============================================================================

export function recommendPackage(
  requirements: ClientRequirements
): PackageRecommendation[] {
  const recommendations: PackageRecommendation[] = [];

  for (const pkg of SERVICE_PACKAGES) {
    let fitScore = 0;
    const reasons: string[] = [];
    const warnings: string[] = [];

    // Category match (40 points)
    if (pkg.category === requirements.category) {
      fitScore += 40;
      reasons.push(`Specialized in ${requirements.category}`);
    } else {
      fitScore += 10;
      warnings.push(`Package designed for ${pkg.category}, not ${requirements.category}`);
    }

    // Budget fit (30 points)
    if (requirements.budget >= pkg.minBudget && requirements.budget <= pkg.maxBudget) {
      fitScore += 30;
      reasons.push(`Perfect budget fit ($${pkg.minBudget}-$${pkg.maxBudget})`);
    } else if (requirements.budget >= pkg.minBudget * 0.8 && requirements.budget <= pkg.maxBudget * 1.2) {
      fitScore += 20;
      reasons.push(`Budget slightly outside range, but workable`);
    } else if (requirements.budget < pkg.minBudget) {
      fitScore += 5;
      warnings.push(`Budget $${requirements.budget} below typical range ($${pkg.minBudget}+)`);
    } else {
      fitScore += 15;
      warnings.push(`Budget $${requirements.budget} exceeds package - consider upgrades`);
    }

    // Timeline fit (20 points)
    if (Math.abs(requirements.timeline - pkg.typicalTimeline) <= 7) {
      fitScore += 20;
      reasons.push(`Timeline matches typical ${pkg.typicalTimeline}-day delivery`);
    } else if (requirements.timeline < pkg.typicalTimeline) {
      fitScore += 10;
      warnings.push(`Requested ${requirements.timeline} days, typical is ${pkg.typicalTimeline} days`);
      if (pkg.deliverables.rushDelivery) {
        reasons.push(`Rush delivery available (+20% cost)`);
      }
    } else {
      fitScore += 15;
      reasons.push(`Extended timeline available`);
    }

    // Assets needed (10 points)
    const assetsRatio = requirements.assetsNeeded / pkg.deliverables.editedImages;
    if (assetsRatio >= 0.8 && assetsRatio <= 1.2) {
      fitScore += 10;
      reasons.push(`${pkg.deliverables.editedImages} images matches your needs`);
    } else if (assetsRatio < 0.8) {
      fitScore += 7;
      reasons.push(`Includes ${pkg.deliverables.editedImages} images (more than ${requirements.assetsNeeded} needed)`);
    } else {
      fitScore += 5;
      warnings.push(`Provides ${pkg.deliverables.editedImages} images, you need ${requirements.assetsNeeded}`);
    }

    // Calculate estimated cost and timeline
    let estimatedCost = pkg.basePrice;
    let estimatedTimeline = pkg.typicalTimeline;

    // Add rush fee if needed
    if (requirements.timeline < pkg.typicalTimeline && pkg.deliverables.rushDelivery) {
      estimatedCost *= 1.2;
      estimatedTimeline = requirements.timeline;
    }

    // Add extra assets cost
    if (requirements.assetsNeeded > pkg.deliverables.editedImages) {
      const extraAssets = requirements.assetsNeeded - pkg.deliverables.editedImages;
      const costPerExtraAsset = pkg.basePrice / pkg.deliverables.editedImages;
      estimatedCost += extraAssets * costPerExtraAsset * 0.5; // 50% rate for extras
    }

    recommendations.push({
      package: pkg,
      fitScore,
      reasons,
      warnings,
      estimatedCost: Math.round(estimatedCost),
      estimatedTimeline,
    });
  }

  // Sort by fit score (highest first)
  recommendations.sort((a, b) => b.fitScore - a.fitScore);

  return recommendations.slice(0, 3); // Return top 3
}

// ============================================================================
// ALGORITHM 2: PRICING ESTIMATION
// ============================================================================

export function estimatePricing(
  pkg: ServicePackage,
  requirements: ClientRequirements
): PricingEstimate {
  let basePrice = pkg.basePrice;
  const addOns: { name: string; cost: number }[] = [];
  const breakdown: string[] = [];

  breakdown.push(`${pkg.name} base package: $${basePrice}`);

  // Rush delivery add-on
  if (requirements.timeline < pkg.typicalTimeline && pkg.deliverables.rushDelivery) {
    const rushCost = Math.round(basePrice * 0.2);
    addOns.push({ name: 'Rush delivery', cost: rushCost });
    breakdown.push(`Rush delivery (${requirements.timeline} days): +$${rushCost}`);
  }

  // Extra assets
  if (requirements.assetsNeeded > pkg.deliverables.editedImages) {
    const extraAssets = requirements.assetsNeeded - pkg.deliverables.editedImages;
    const costPerAsset = Math.round((basePrice / pkg.deliverables.editedImages) * 0.5);
    const extraCost = extraAssets * costPerAsset;
    addOns.push({ name: `${extraAssets} extra edited images`, cost: extraCost });
    breakdown.push(`${extraAssets} additional images @ $${costPerAsset} each: +$${extraCost}`);
  }

  // Video add-on (if not included)
  if (!pkg.deliverables.videoClips && requirements.priority === 'quality') {
    const videoCost = 1500;
    addOns.push({ name: '5 video clips', cost: videoCost });
    breakdown.push(`Video content add-on: +$${videoCost}`);
  }

  const subtotal = basePrice + addOns.reduce((sum, addon) => sum + addon.cost, 0);

  // Apply discount for large projects
  let discount = 0;
  if (subtotal > 5000) {
    discount = Math.round(subtotal * 0.05); // 5% discount
    breakdown.push(`Volume discount (5%): -$${discount}`);
  }

  const total = subtotal - discount;

  return {
    basePrice,
    addOns,
    subtotal,
    discount,
    total,
    breakdown,
  };
}

// ============================================================================
// ALGORITHM 3: TIMELINE FORECASTING
// ============================================================================

export function forecastTimeline(
  pkg: ServicePackage,
  requirements: ClientRequirements
): TimelineForecast {
  const breakdown: { phase: string; days: number }[] = [];

  // Pre-production
  const preProduction = Math.ceil(pkg.deliverables.editedImages / 25); // 1 day per 25 images
  breakdown.push({ phase: 'Pre-production & planning', days: preProduction });

  // Shoot day(s)
  const shootDays = Math.ceil(pkg.deliverables.editedImages / 50); // 50 images per day
  breakdown.push({ phase: 'Photography shoot', days: shootDays });

  // Post-production
  const postProduction = Math.ceil(pkg.deliverables.editedImages / 10); // 10 images per day editing
  breakdown.push({ phase: 'Editing & retouching', days: postProduction });

  // Review & revisions
  const review = 3; // Standard 3 days
  breakdown.push({ phase: 'Client review & revisions', days: review });

  const estimatedDays = preProduction + shootDays + postProduction + review;

  // Rush available?
  const rushAvailable = pkg.deliverables.rushDelivery || false;
  const rushCost = rushAvailable ? Math.round(pkg.basePrice * 0.2) : 0;

  // Confidence based on complexity
  let confidence: TimelineForecast['confidence'] = 'high';
  if (pkg.tier === 'luxury' || pkg.deliverables.videoClips) {
    confidence = 'medium';
  }
  if (requirements.timeline < estimatedDays * 0.7) {
    confidence = 'low';
  }

  return {
    estimatedDays,
    breakdown,
    rushAvailable,
    rushCost,
    confidence,
  };
}

// ============================================================================
// NATURAL LANGUAGE Q&A
// ============================================================================

export function handleServicesQuery(
  message: string,
  requirements?: Partial<ClientRequirements>
): string {
  const lower = message.toLowerCase();

  // Query: Package recommendation
  if (lower.includes('recommend') || lower.includes('which package') || lower.includes('best fit')) {
    if (!requirements?.category || !requirements?.budget) {
      return "I can recommend the perfect package! Tell me: What type of shoot? (clothing/accessories/jewelry) Budget? Timeline?";
    }

    const recs = recommendPackage(requirements as ClientRequirements);
    const top = recs[0];

    return `✨ **${top.package.name}** is your best fit (${top.fitScore}/100 match).\n\n` +
           `Includes: ${top.package.deliverables.editedImages} edited images\n` +
           `Timeline: ~${top.estimatedTimeline} days\n` +
           `Estimated cost: $${top.estimatedCost}\n\n` +
           `Why it fits: ${top.reasons[0]}`;
  }

  // Query: Pricing
  if (lower.includes('cost') || lower.includes('price') || lower.includes('budget')) {
    return `Our packages range from $1,200 (Essential) to $8,500+ (Luxury). What's your budget and category? I'll find the perfect fit.`;
  }

  // Query: Timeline
  if (lower.includes('timeline') || lower.includes('how long') || lower.includes('delivery')) {
    return `Typical timelines: 14 days (Essential), 21 days (Premium), 28-35 days (Luxury). Rush delivery available for +20%. What's your deadline?`;
  }

  // Default
  return `I can help you find the perfect service package. Tell me about your project: category, budget, timeline, and number of images needed.`;
}