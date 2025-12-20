/**
 * Shared type definitions for Navigation/Discovery
 * Extracted for modularity and reusability
 */

export interface UserActivity {
  visitedPages: string[];
  completedActions: string[];
  createdProjects: number;
  lastVisit: Date;
  accountAge: number; // days
}

export interface FeatureRecommendation {
  featureId: string;
  name: string;
  description: string;
  category: 'core' | 'productivity' | 'advanced' | 'automation';
  benefit: string;
  timeSaved?: string;
  priority: number; // 1-5, 1 being highest
  route: string;
}

export interface QuickWin {
  id: string;
  title: string;
  description: string;
  estimatedTime: string; // "2 min", "5 min"
  impact: 'high' | 'medium' | 'low';
  action: {
    label: string;
    route: string;
  };
}

export interface NextAction {
  title: string;
  description: string;
  reason: string;
  route: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}
