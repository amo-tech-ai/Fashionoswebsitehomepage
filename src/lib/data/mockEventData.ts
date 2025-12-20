/**
 * Mock Event Data Generator
 * Realistic data for development until backend is connected
 */

import { Event, EventTask, AIRisk, EventSponsor, EventBudgetCategory, WorkflowPhase, EventTeamMember, Deliverable } from '../types/events.types';

// Helper to calculate days until event
export function daysUntilEvent(startDate: string): number {
  const today = new Date();
  const eventDate = new Date(startDate);
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Mock events
export const mockEvents: Event[] = [
  {
    id: 'event-001',
    name: 'Sustainable Fashion Week 2026',
    type: 'runway_show',
    description: 'Premier runway show featuring emerging sustainable designers',
    status: 'in_progress',
    start_date: '2026-02-15',
    end_date: '2026-02-20',
    progress_percentage: 45,
    venue_id: 'venue-001',
    budget_total: 500000,
    budget_actual: 190000,
    attendee_target: 800,
    attendee_registered: 412,
    created_by: 'user-001',
    created_at: '2025-11-01T00:00:00Z',
    updated_at: '2025-12-18T12:00:00Z'
  },
  {
    id: 'event-002',
    name: 'Luxury Brand Activation',
    type: 'brand_activation',
    status: 'planning',
    start_date: '2026-03-10',
    progress_percentage: 28,
    budget_total: 350000,
    budget_actual: 85000,
    attendee_target: 500,
    attendee_registered: 150,
    created_by: 'user-001',
    created_at: '2025-12-01T00:00:00Z',
    updated_at: '2025-12-18T10:00:00Z'
  },
  {
    id: 'event-003',
    name: 'Designer Trunk Show',
    type: 'trunk_show',
    status: 'confirmed',
    start_date: '2026-01-22',
    progress_percentage: 72,
    budget_total: 120000,
    budget_actual: 78000,
    attendee_target: 200,
    attendee_registered: 185,
    created_by: 'user-002',
    created_at: '2025-10-15T00:00:00Z',
    updated_at: '2025-12-17T15:00:00Z'
  }
];

// Generate tasks for an event
export function generateMockTasks(eventId: string): EventTask[] {
  const taskTemplates = [
    // Pre-Production (60-90 days before)
    { title: 'Book event venue', phase: 'pre_production', category: 'event_planning', priority: 'critical', is_critical: true },
    { title: 'Sign venue contract', phase: 'pre_production', category: 'event_planning', priority: 'critical', is_critical: true },
    { title: 'Create event budget breakdown', phase: 'pre_production', category: 'event_planning', priority: 'high', is_critical: false },
    { title: 'Assemble core team', phase: 'pre_production', category: 'event_planning', priority: 'critical', is_critical: true },
    { title: 'Define event concept and theme', phase: 'pre_production', category: 'event_planning', priority: 'high', is_critical: false },
    { title: 'Secure event insurance', phase: 'pre_production', category: 'operations', priority: 'high', is_critical: false },
    { title: 'Obtain necessary permits', phase: 'pre_production', category: 'operations', priority: 'critical', is_critical: true },
    
    // Venue & Logistics (30-60 days)
    { title: 'Finalize venue floor plan', phase: 'venue_logistics', category: 'operations', priority: 'critical', is_critical: true },
    { title: 'Book catering services', phase: 'venue_logistics', category: 'operations', priority: 'high', is_critical: false },
    { title: 'Arrange AV equipment', phase: 'venue_logistics', category: 'operations', priority: 'critical', is_critical: true },
    { title: 'Confirm transportation logistics', phase: 'venue_logistics', category: 'operations', priority: 'medium', is_critical: false },
    { title: 'Setup registration system', phase: 'venue_logistics', category: 'operations', priority: 'high', is_critical: false },
    
    // Creative Design (15-30 days)
    { title: 'Finalize designer lineup', phase: 'creative_design', category: 'event_planning', priority: 'critical', is_critical: true },
    { title: 'Create event branding', phase: 'creative_design', category: 'marketing', priority: 'high', is_critical: false },
    { title: 'Design invitations', phase: 'creative_design', category: 'marketing', priority: 'medium', is_critical: false },
    { title: 'Plan runway sequence', phase: 'creative_design', category: 'event_planning', priority: 'critical', is_critical: true },
    { title: 'Coordinate lighting design', phase: 'creative_design', category: 'media', priority: 'high', is_critical: false },
    { title: 'Arrange photography/videography', phase: 'creative_design', category: 'media', priority: 'critical', is_critical: true },
    
    // On-Site Operations (1-7 days)
    { title: 'Load-in and venue setup', phase: 'on_site', category: 'operations', priority: 'critical', is_critical: true },
    { title: 'Conduct technical rehearsal', phase: 'on_site', category: 'operations', priority: 'critical', is_critical: true },
    { title: 'Final walk-through with team', phase: 'on_site', category: 'operations', priority: 'high', is_critical: false },
    { title: 'Brief volunteers and staff', phase: 'on_site', category: 'operations', priority: 'medium', is_critical: false },
    
    // Post-Event
    { title: 'Venue load-out and cleanup', phase: 'post_event', category: 'operations', priority: 'high', is_critical: false },
    { title: 'Collect and review media assets', phase: 'post_event', category: 'media', priority: 'medium', is_critical: false },
    { title: 'Send thank-you communications', phase: 'post_event', category: 'marketing', priority: 'low', is_critical: false },
    { title: 'Conduct post-event debrief', phase: 'post_event', category: 'event_planning', priority: 'medium', is_critical: false }
  ];

  const statusOptions: EventTask['status'][] = ['to_do', 'in_progress', 'done'];
  
  return taskTemplates.map((template, index) => ({
    id: `task-${eventId}-${String(index + 1).padStart(3, '0')}`,
    event_id: eventId,
    title: template.title,
    description: `Complete ${template.title.toLowerCase()} for the event`,
    status: index < 15 ? 'done' : index < 22 ? 'in_progress' : 'to_do',
    priority: template.priority as EventTask['priority'],
    workflow_category: template.category as EventTask['workflow_category'],
    workflow_phase: template.phase as EventTask['workflow_phase'],
    assigned_to: index % 3 === 0 ? 'user-001' : index % 3 === 1 ? 'user-002' : undefined,
    deadline: new Date(Date.now() + (30 - index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    is_critical_path: template.is_critical,
    dependency_task_ids: index > 0 && template.is_critical ? [`task-${eventId}-${String(index).padStart(3, '0')}`] : [],
    completed_at: index < 15 ? new Date(Date.now() - (15 - index) * 24 * 60 * 60 * 1000).toISOString() : undefined,
    created_at: '2025-11-01T00:00:00Z'
  }));
}

// Mock AI risks
export const mockRisks: Record<string, AIRisk[]> = {
  'event-001': [
    {
      id: 'risk-001-1',
      event_id: 'event-001',
      severity: 'critical',
      category: 'tasks',
      title: '3 Critical Path Tasks Overdue',
      description: 'Tasks blocking event completion are past deadline. May delay event by 5 days if not resolved today.',
      impact: 'HIGH',
      urgency: 'now',
      recommended_actions: [
        'Reassign "Designer contracts" to assistant with urgent flag',
        'Upload venue floor plan to mark task complete',
        'Extend "Lighting design" deadline by 2 days'
      ],
      risk_score: 95,
      generated_at: new Date().toISOString()
    },
    {
      id: 'risk-001-2',
      event_id: 'event-001',
      severity: 'warning',
      category: 'budget',
      title: 'Budget Variance Detected: Catering +15%',
      description: 'Catering costs exceeding budget by $25K. May impact overall event profitability.',
      impact: 'MEDIUM',
      urgency: '3_days',
      recommended_actions: [
        'Review catering contract for cost overruns',
        'Negotiate menu adjustments with caterer',
        'Reallocate budget from marketing category'
      ],
      risk_score: 68,
      generated_at: new Date().toISOString()
    },
    {
      id: 'risk-001-3',
      event_id: 'event-001',
      severity: 'suggestion',
      category: 'staffing',
      title: '2 Key Roles Unassigned',
      description: 'Photographer and videographer positions still open. Recommend booking within 7 days for quality talent.',
      impact: 'LOW',
      urgency: '7_days',
      recommended_actions: [
        'Contact 3 recommended photographers from past events',
        'Post job on fashion industry job boards',
        'Reach out to university media departments'
      ],
      risk_score: 42,
      generated_at: new Date().toISOString()
    }
  ]
};

// Mock workflow phases
export function generateMockWorkflowPhases(eventId: string): WorkflowPhase[] {
  const tasks = generateMockTasks(eventId);
  
  const phaseIds: WorkflowPhase['id'][] = ['pre_production', 'venue_logistics', 'creative_design', 'on_site', 'post_event'];
  const phaseNames = ['Pre-Production', 'Venue & Logistics', 'Creative Design', 'On-Site Operations', 'Post-Event'];
  const dateRanges = ['60-90 days before', '30-60 days before', '15-30 days before', '1-7 days + event day', 'After completion'];
  
  return phaseIds.map((id, index) => {
    const phaseTasks = tasks.filter(t => t.workflow_phase === id);
    const completeTasks = phaseTasks.filter(t => t.status === 'done');
    const progress = phaseTasks.length > 0 ? Math.round((completeTasks.length / phaseTasks.length) * 100) : 0;
    
    return {
      id,
      name: phaseNames[index],
      dateRange: dateRanges[index],
      progress,
      tasksComplete: completeTasks.length,
      tasksTotal: phaseTasks.length,
      status: progress === 100 ? 'complete' : progress > 0 ? 'active' : 'locked'
    };
  });
}

// Mock sponsors
export const mockSponsors: EventSponsor[] = [
  {
    id: 'sponsor-001',
    event_id: 'event-001',
    company_name: 'Patagonia',
    tier: 'platinum',
    amount: 150000,
    status: 'confirmed',
    contact_name: 'Sarah Chen',
    contact_email: 'sarah@patagonia.com',
    deliverables_required: ['Logo on all materials', 'Keynote speaking slot', 'Exhibition booth'],
    contract_signed_at: '2025-11-15T00:00:00Z',
    created_at: '2025-11-01T00:00:00Z'
  },
  {
    id: 'sponsor-002',
    event_id: 'event-001',
    company_name: 'Everlane',
    tier: 'gold',
    amount: 75000,
    status: 'confirmed',
    contact_name: 'Michael Torres',
    contact_email: 'michael@everlane.com',
    deliverables_required: ['Logo on website', 'Social media mentions'],
    contract_signed_at: '2025-11-20T00:00:00Z',
    created_at: '2025-11-05T00:00:00Z'
  }
];

// Mock budget categories
export function generateMockBudget(eventId: string): EventBudgetCategory[] {
  return [
    { id: 'budget-001', event_id: eventId, category: 'venue', budgeted: 45000, actual: 45000, updated_at: new Date().toISOString() },
    { id: 'budget-002', event_id: eventId, category: 'catering', budgeted: 60000, actual: 68000, updated_at: new Date().toISOString() },
    { id: 'budget-003', event_id: eventId, category: 'av_tech', budgeted: 35000, actual: 28000, updated_at: new Date().toISOString() },
    { id: 'budget-004', event_id: eventId, category: 'marketing', budgeted: 50000, actual: 22000, updated_at: new Date().toISOString() },
    { id: 'budget-005', event_id: eventId, category: 'staff', budgeted: 40000, actual: 15000, updated_at: new Date().toISOString() },
    { id: 'budget-006', event_id: eventId, category: 'designers', budgeted: 80000, actual: 0, updated_at: new Date().toISOString() },
    { id: 'budget-007', event_id: eventId, category: 'production', budgeted: 30000, actual: 12000, updated_at: new Date().toISOString() }
  ];
}

// Mock team members
export const mockTeam: EventTeamMember[] = [
  {
    id: 'team-001',
    event_id: 'event-001',
    user_id: 'user-001',
    user_name: 'Emma Rodriguez',
    role: 'event_lead',
    permissions: 'admin',
    assigned_at: '2025-11-01T00:00:00Z'
  },
  {
    id: 'team-002',
    event_id: 'event-001',
    user_id: 'user-002',
    user_name: 'James Kim',
    role: 'production_manager',
    permissions: 'edit',
    assigned_at: '2025-11-05T00:00:00Z'
  },
  {
    id: 'team-003',
    event_id: 'event-001',
    user_id: 'user-003',
    user_name: 'Sofia Martinez',
    role: 'creative_director',
    permissions: 'edit',
    assigned_at: '2025-11-10T00:00:00Z'
  }
];

// Mock deliverables
export function generateMockDeliverables(eventId: string): Deliverable[] {
  return [
    {
      id: 'deliv-001',
      event_id: eventId,
      title: 'Event highlight reel',
      type: 'video',
      status: 'in_progress',
      assigned_to: 'user-media-001',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      created_at: new Date().toISOString()
    },
    {
      id: 'deliv-002',
      event_id: eventId,
      title: 'Runway photos (200+ shots)',
      type: 'photo',
      status: 'approved',
      assigned_to: 'user-photo-001',
      file_url: 'https://example.com/photos.zip',
      created_at: new Date().toISOString()
    }
  ];
}

// Full event data aggregator
export function getMockEventData(eventId: string) {
  const event = mockEvents.find(e => e.id === eventId) || mockEvents[0];
  const tasks = generateMockTasks(eventId);
  const budget = generateMockBudget(eventId);
  const deliverables = generateMockDeliverables(eventId);
  
  const tasksDone = tasks.filter(t => t.status === 'done').length;
  const tasksInProgress = tasks.filter(t => t.status === 'in_progress').length;
  const tasksOverdue = tasks.filter(t => {
    if (!t.deadline || t.status === 'done') return false;
    return new Date(t.deadline) < new Date();
  }).length;
  
  const tasksByPhase = tasks.reduce((acc, task) => {
    if (!acc[task.workflow_phase]) {
      acc[task.workflow_phase] = { total: 0, done: 0 };
    }
    acc[task.workflow_phase].total++;
    if (task.status === 'done') acc[task.workflow_phase].done++;
    return acc;
  }, {} as Record<string, { total: number; done: number }>);
  
  const deliverablesDone = deliverables.filter(d => d.status === 'approved').length;
  
  return {
    event,
    tasks_summary: {
      total: tasks.length,
      done: tasksDone,
      in_progress: tasksInProgress,
      overdue: tasksOverdue,
      by_phase: tasksByPhase
    },
    sponsors: mockSponsors.filter(s => s.event_id === eventId),
    budget_categories: budget,
    team: mockTeam.filter(t => t.event_id === eventId),
    deliverables_summary: {
      total: deliverables.length,
      approved: deliverablesDone
    },
    tasks,
    risks: mockRisks[eventId] || [],
    workflow_phases: generateMockWorkflowPhases(eventId),
    deliverables
  };
}
