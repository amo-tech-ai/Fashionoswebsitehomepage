/**
 * Event Management Type Definitions
 * All interfaces for Events module
 */

export interface Event {
  id: string;
  name: string;
  type: 'runway_show' | 'brand_activation' | 'pop_up' | 'trunk_show' | 'workshop' | 'exhibition' | 'gala' | 'conference' | 'meetup';
  description?: string;
  status: 'draft' | 'planning' | 'confirmed' | 'in_progress' | 'completed' | 'archived';
  start_date: string;
  end_date?: string;
  progress_percentage: number;
  venue_id?: string;
  budget_total: number;
  budget_actual: number;
  attendee_target: number;
  attendee_registered: number;
  
  // AI Context Fields - Enriched from Event Wizard
  theme?: string;
  mood_keywords?: string[];
  models_count?: number;
  looks_count?: number;
  venue_name?: string;
  
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EventTask {
  id: string;
  event_id: string;
  title: string;
  description?: string;
  status: 'to_do' | 'in_progress' | 'done' | 'cancelled';
  priority: 'critical' | 'high' | 'medium' | 'low';
  workflow_category: 'event_planning' | 'sponsorship' | 'marketing' | 'operations' | 'media';
  workflow_phase: 'pre_production' | 'venue_logistics' | 'creative_design' | 'on_site' | 'post_event';
  assigned_to?: string;
  deadline?: string;
  is_critical_path: boolean;
  dependency_task_ids: string[];
  completed_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface EventTeamMember {
  id: string;
  event_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  role: 'event_lead' | 'creative_director' | 'production_manager' | 'marketing_lead' | 'operations' | 'media_coordinator';
  permissions: 'admin' | 'edit' | 'view_only';
  assigned_at: string;
}

export interface EventSponsor {
  id: string;
  event_id: string;
  company_name: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  amount: number;
  status: 'lead' | 'qualified' | 'discovery' | 'proposal' | 'negotiation' | 'confirmed' | 'fulfilled';
  contact_name?: string;
  contact_email?: string;
  deliverables_required?: string[];
  contract_signed_at?: string;
  created_at: string;
  fit_score?: number; // Added for AI scoring
  notes?: string;
}

export interface EventBudgetCategory {
  id: string;
  event_id: string;
  category: 'venue' | 'catering' | 'av_tech' | 'marketing' | 'staff' | 'designers' | 'production' | 'other';
  budgeted: number;
  actual: number;
  notes?: string;
  updated_at: string;
}

export interface AIRisk {
  id: string;
  event_id: string;
  severity: 'critical' | 'warning' | 'suggestion';
  category: 'tasks' | 'budget' | 'staffing' | 'contracts' | 'venue' | 'weather' | 'other';
  title: string;
  description: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  urgency: 'now' | '3_days' | '7_days';
  recommended_actions: string[];
  risk_score: number;
  acknowledged_at?: string;
  resolved_at?: string;
  generated_at: string;
}

export interface ActivityLog {
  id: string;
  event_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  action_type: 'task_completed' | 'file_uploaded' | 'comment_added' | 'task_assigned' | 'ai_action' | 'sponsor_added' | 'budget_updated';
  description: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  amenities: string[];
  price_per_day: number;
  images: string[];
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  created_at: string;
}

export interface VenueBooking {
  id: string;
  venue_id: string;
  event_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  total_cost: number;
  notes?: string;
  created_at: string;
}

export interface Designer {
  id: string;
  name: string;
  brand_name?: string;
  specialty: string[];
  portfolio_url?: string;
  instagram?: string;
  location: string;
  price_range: 'budget' | 'mid_range' | 'luxury' | 'ultra_luxury';
  rating: number;
  projects_count: number;
  avatar?: string;
  bio?: string;
  created_at: string;
}

export interface Deliverable {
  id: string;
  event_id: string;
  title: string;
  type: 'photo' | 'video' | 'design' | 'document' | 'other';
  status: 'pending' | 'in_progress' | 'review' | 'approved' | 'delivered';
  assigned_to?: string;
  due_date?: string;
  file_url?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

// Aggregated data types for dashboard
export interface EventData {
  event: Event;
  tasks_summary: {
    total: number;
    done: number;
    in_progress: number;
    overdue: number;
    by_phase: Record<string, { total: number; done: number }>;
  };
  sponsors: EventSponsor[];
  budget_categories: EventBudgetCategory[];
  team: EventTeamMember[];
  deliverables_summary: {
    total: number;
    approved: number;
  };
  venue?: Venue;
}

// Workflow phase configuration
export interface WorkflowPhase {
  id: 'pre_production' | 'venue_logistics' | 'creative_design' | 'on_site' | 'post_event';
  name: string;
  dateRange: string;
  progress: number;
  tasksComplete: number;
  tasksTotal: number;
  status: 'complete' | 'active' | 'upcoming' | 'locked';
}

// Gemini AI types
export interface GeminiTaskGenerationRequest {
  event_type: string;
  start_date: string;
  budget: number;
  attendee_target: number;
}

export interface GeminiTaskGenerationResponse {
  tasks: Omit<EventTask, 'id' | 'event_id' | 'created_at'>[];
  critical_path_count: number;
  estimated_completion_days: number;
}

export interface GeminiRiskAnalysisRequest {
  event: Event;
  tasks: EventTask[];
  budget_categories: EventBudgetCategory[];
  team: EventTeamMember[];
}

export interface GeminiRiskAnalysisResponse {
  risks: AIRisk[];
  health_score: number;
  confidence: number;
  generated_at: string;
}

export interface GeminiSponsorMatch {
  company_name: string;
  match_score: number;
  rationale: string;
  typical_sponsorship_range: [number, number];
  contact_approach: string;
  past_partnerships: string[];
}

export interface GeminiBudgetForecast {
  predicted_total: number;
  variance_from_budget: number;
  confidence: number;
  category_forecasts: {
    category: string;
    predicted: number;
    variance: number;
    confidence: number;
  }[];
  recommendations: string[];
}
