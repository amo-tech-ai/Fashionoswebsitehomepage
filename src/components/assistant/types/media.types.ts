/**
 * Shared type definitions for Media/Asset management
 * Extracted for modularity and reusability
 */

export interface Asset {
  id: string;
  name: string;
  shotNumber?: string;
  fileSize: number; // bytes
  width: number;
  height: number;
  format: 'RAW' | 'TIFF' | 'PNG' | 'JPG';
  uploadedAt: Date;
  status: 'uploaded' | 'selected' | 'edited' | 'delivered';
  category?: string;
  tags?: string[];
}

export interface ShotListItem {
  id: string;
  shotNumber: string;
  description: string;
  category: string;
  priority: number;
  required: boolean;
}

export interface QualityScore {
  totalScore: number; // 0-100
  quality: 'excellent' | 'good' | 'acceptable' | 'needs-work';
  breakdown: {
    technical: number; // 0-40
    composition: number; // 0-30
    brand: number; // 0-30
  };
  suggestions: string[];
}

export interface MissingShots {
  totalRequired: number;
  captured: number;
  missing: ShotListItem[];
  completionPercentage: number;
}

export interface DeliveryTimeline {
  totalAssets: number;
  delivered: number;
  inProgress: number;
  notStarted: number;
  progressPercentage: number;
  daysUntilDeadline: number;
  onTrack: boolean;
  estimatedCompletionDate: Date;
}
