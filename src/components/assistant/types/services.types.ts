/**
 * Shared type definitions for Services/Packages
 * Extracted for modularity and reusability
 */

export interface ServicePackage {
  id: string;
  name: string;
  category: 'clothing' | 'accessories' | 'footwear' | 'jewelry' | 'editorial' | 'campaign';
  tier: 'essential' | 'premium' | 'luxury';
  basePrice: number;
  includes: string[];
  deliverables: {
    editedImages: number;
    rawFiles: boolean;
    videoClips?: number;
    rushDelivery?: boolean;
  };
  typicalTimeline: number; // days
  idealFor: string[];
  minBudget: number;
  maxBudget: number;
}

export interface ClientRequirements {
  category: ServicePackage['category'];
  budget: number;
  timeline: number; // days
  assetsNeeded: number;
  priority: 'quality' | 'speed' | 'budget';
}

export interface PackageRecommendation {
  package: ServicePackage;
  fitScore: number; // 0-100
  reasons: string[];
  warnings: string[];
  estimatedCost: number;
  estimatedTimeline: number;
}

export interface PricingEstimate {
  basePrice: number;
  addOns: { name: string; cost: number }[];
  subtotal: number;
  discount: number;
  total: number;
  breakdown: string[];
}

export interface TimelineForecast {
  estimatedDays: number;
  breakdown: { phase: string; days: number }[];
  rushAvailable: boolean;
  rushCost: number;
  confidence: 'high' | 'medium' | 'low';
}
