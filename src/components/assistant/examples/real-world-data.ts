/**
 * Real-World Example Data - Realistic scenarios for testing and demos
 * 
 * Purpose:
 * - Demonstrate automation workflows with real data
 * - Provide testing fixtures
 * - Enable realistic user journey demos
 */

import type { SampleItem } from '../skills/LogisticsSkill';
import type { Event, Task } from '../skills/EventsSkill';
import type { Asset } from '../types/media.types';
import type { TeamMember, TaskRequirements } from '../automations/SmartTaskAssignment';

// ============================================================================
// SCENARIO 1: LUXURY JEWELRY CAMPAIGN
// ============================================================================

export const jewelryCampaignSamples: SampleItem[] = [
  {
    id: 'JW001',
    name: 'Cartier Love Bracelet - Rose Gold',
    brand: 'Cartier',
    category: 'Jewelry',
    status: 'on_set',
    location: 'Studio A',
    dueDate: new Date('2025-12-22'),
    priority: 1,
    isHero: true,
  },
  {
    id: 'JW002',
    name: 'Tiffany T Wire Bracelet',
    brand: 'Tiffany & Co.',
    category: 'Jewelry',
    status: 'on_set',
    location: 'Studio A',
    dueDate: new Date('2025-12-22'),
    priority: 1,
  },
  {
    id: 'JW003',
    name: 'Van Cleef Alhambra Necklace',
    brand: 'Van Cleef & Arpels',
    category: 'Jewelry',
    status: 'in_transit',
    location: 'Courier - ETA 2pm',
    dueDate: new Date('2025-12-22'),
    priority: 1,
  },
  {
    id: 'BAG001',
    name: 'Hermès Birkin 30 - Black',
    brand: 'Hermès',
    category: 'Accessories',
    status: 'on_set',
    location: 'Studio A',
    dueDate: new Date('2025-12-22'),
    priority: 1,
    isHero: true,
  },
  {
    id: 'BAG002',
    name: 'Chanel Classic Flap - Navy',
    brand: 'Chanel',
    category: 'Accessories',
    status: 'delayed',
    location: 'Brand showroom',
    dueDate: new Date('2025-12-22'),
    priority: 2,
  },
  {
    id: 'SHOE001',
    name: 'Manolo Blahnik Hangisi - Crystal',
    brand: 'Manolo Blahnik',
    category: 'Footwear',
    status: 'on_set',
    location: 'Studio A',
    dueDate: new Date('2025-12-22'),
    priority: 2,
  },
];

export const jewelryCampaignAssets: Asset[] = [
  {
    id: 'AST001',
    name: 'CARTIER_LOVE_HERO_001.RAW',
    shotNumber: '001',
    fileSize: 45 * 1024 * 1024, // 45MB
    width: 6000,
    height: 4000,
    format: 'RAW',
    uploadedAt: new Date('2025-12-20T10:30:00'),
    status: 'uploaded',
    category: 'Jewelry',
    tags: ['hero', 'bracelet', 'rose-gold'],
  },
  {
    id: 'AST002',
    name: 'CARTIER_LOVE_DETAIL_002.RAW',
    shotNumber: '002',
    fileSize: 42 * 1024 * 1024,
    width: 6000,
    height: 4000,
    format: 'RAW',
    uploadedAt: new Date('2025-12-20T10:35:00'),
    status: 'uploaded',
    category: 'Jewelry',
    tags: ['detail', 'bracelet', 'rose-gold'],
  },
  {
    id: 'AST003',
    name: 'TIFFANY_T_LIFESTYLE_003.JPG',
    shotNumber: '003',
    fileSize: 3.2 * 1024 * 1024, // 3.2MB
    width: 4000,
    height: 3000,
    format: 'JPG',
    uploadedAt: new Date('2025-12-20T11:00:00'),
    status: 'selected',
    category: 'Jewelry',
    tags: ['lifestyle', 'bracelet'],
  },
  {
    id: 'AST004',
    name: 'HERMES_BIRKIN_HERO_004.TIFF',
    shotNumber: '004',
    fileSize: 85 * 1024 * 1024,
    width: 7000,
    height: 5000,
    format: 'TIFF',
    uploadedAt: new Date('2025-12-20T14:15:00'),
    status: 'edited',
    category: 'Accessories',
    tags: ['hero', 'bag', 'black'],
  },
];

export const jewelryCampaignEvent: Event = {
  id: 'EVT_JEWELRY_001',
  name: 'Holiday Jewelry Campaign 2025',
  type: 'campaign',
  date: '2025-12-22',
  location: 'Studio A - Manhattan',
  status: 'in_progress',
  description: 'Luxury jewelry and accessories holiday campaign for 3 major brands',
  tasks: [
    {
      id: 'T001',
      title: 'Secure all jewelry samples',
      status: 'in_progress',
      priority: 1,
      dueDate: '2025-12-21',
      assignee: 'Sarah Chen',
      estimatedHours: 8,
      dependencies: [],
    },
    {
      id: 'T002',
      title: 'Lighting setup - high-key for jewelry',
      status: 'blocked',
      priority: 1,
      dueDate: '2025-12-21',
      assignee: 'Marcus Lee',
      estimatedHours: 4,
      dependencies: ['T001'],
    },
    {
      id: 'T003',
      title: 'Hand model casting',
      status: 'completed',
      priority: 2,
      dueDate: '2025-12-20',
      assignee: 'Emma Rodriguez',
      estimatedHours: 6,
      dependencies: [],
    },
    {
      id: 'T004',
      title: 'Shoot day - Jewelry',
      status: 'pending',
      priority: 1,
      dueDate: '2025-12-22',
      assignee: 'Alex Kim',
      estimatedHours: 8,
      dependencies: ['T001', 'T002', 'T003'],
    },
    {
      id: 'T005',
      title: 'Post-production retouching',
      status: 'pending',
      priority: 1,
      dueDate: '2025-12-24',
      assignee: 'Jordan Park',
      estimatedHours: 16,
      dependencies: ['T004'],
    },
  ],
};

// ============================================================================
// SCENARIO 2: FASHION WEEK EVENT
// ============================================================================

export const fashionWeekEvent: Event = {
  id: 'EVT_FW_2025',
  name: 'New York Fashion Week SS26',
  type: 'fashion_show',
  date: '2026-02-15',
  location: 'Skylight Modern - NYC',
  status: 'planning',
  description: 'Spring/Summer 2026 runway show for emerging designer',
  tasks: [
    {
      id: 'FW001',
      title: 'Venue booking and deposit',
      status: 'completed',
      priority: 1,
      dueDate: '2025-12-01',
      assignee: 'Production Manager',
      estimatedHours: 4,
      dependencies: [],
    },
    {
      id: 'FW002',
      title: 'Model casting (30 models)',
      status: 'in_progress',
      priority: 1,
      dueDate: '2026-01-15',
      assignee: 'Casting Director',
      estimatedHours: 20,
      dependencies: ['FW001'],
    },
    {
      id: 'FW003',
      title: 'Collection completion (48 looks)',
      status: 'delayed',
      priority: 1,
      dueDate: '2026-01-30',
      assignee: 'Designer',
      estimatedHours: 200,
      dependencies: [],
    },
    {
      id: 'FW004',
      title: 'Run of show creation',
      status: 'blocked',
      priority: 1,
      dueDate: '2026-02-01',
      assignee: 'Creative Director',
      estimatedHours: 12,
      dependencies: ['FW002', 'FW003'],
    },
    {
      id: 'FW005',
      title: 'Lighting & sound design',
      status: 'pending',
      priority: 2,
      dueDate: '2026-02-10',
      assignee: 'Technical Director',
      estimatedHours: 16,
      dependencies: ['FW004'],
    },
    {
      id: 'FW006',
      title: 'Dress rehearsal',
      status: 'pending',
      priority: 1,
      dueDate: '2026-02-14',
      assignee: 'Production Manager',
      estimatedHours: 8,
      dependencies: ['FW002', 'FW003', 'FW005'],
    },
    {
      id: 'FW007',
      title: 'Show day execution',
      status: 'pending',
      priority: 1,
      dueDate: '2026-02-15',
      assignee: 'Event Manager',
      estimatedHours: 12,
      dependencies: ['FW006'],
    },
  ],
};

// ============================================================================
// SCENARIO 3: TEAM ASSIGNMENT DATA
// ============================================================================

export const productionTeam: TeamMember[] = [
  {
    id: 'TM001',
    name: 'Alex Kim',
    role: 'Lead Photographer',
    skills: ['photography', 'lighting', 'retouching'],
    skillLevels: {
      'photography': 9,
      'lighting': 8,
      'retouching': 7,
    },
    availability: 40, // hours/week
    currentWorkload: 32,
    hourlyRate: 150,
    location: 'New York',
    preferredTaskTypes: ['photography', 'creative direction'],
  },
  {
    id: 'TM002',
    name: 'Sarah Chen',
    role: 'Sample Coordinator',
    skills: ['logistics', 'sample-tracking', 'vendor-relations'],
    skillLevels: {
      'logistics': 10,
      'sample-tracking': 9,
      'vendor-relations': 8,
    },
    availability: 40,
    currentWorkload: 25,
    hourlyRate: 75,
    location: 'New York',
  },
  {
    id: 'TM003',
    name: 'Jordan Park',
    role: 'Retoucher',
    skills: ['retouching', 'color-grading', 'compositing'],
    skillLevels: {
      'retouching': 10,
      'color-grading': 9,
      'compositing': 8,
    },
    availability: 40,
    currentWorkload: 38, // Near capacity
    hourlyRate: 100,
    location: 'Los Angeles',
  },
  {
    id: 'TM004',
    name: 'Emma Rodriguez',
    role: 'Stylist',
    skills: ['styling', 'fashion-direction', 'model-casting'],
    skillLevels: {
      'styling': 9,
      'fashion-direction': 8,
      'model-casting': 7,
    },
    availability: 40,
    currentWorkload: 15, // Underutilized
    hourlyRate: 125,
    location: 'New York',
  },
  {
    id: 'TM005',
    name: 'Marcus Lee',
    role: 'Lighting Tech',
    skills: ['lighting', 'grip', 'technical-setup'],
    skillLevels: {
      'lighting': 9,
      'grip': 8,
      'technical-setup': 9,
    },
    availability: 40,
    currentWorkload: 30,
    hourlyRate: 80,
    location: 'New York',
  },
];

export const upcomingTasks: TaskRequirements[] = [
  {
    requiredSkills: ['photography', 'lighting'],
    estimatedHours: 8,
    priority: 1,
    deadline: new Date('2025-12-22'),
    location: 'New York',
    budget: 1200,
  },
  {
    requiredSkills: ['retouching', 'color-grading'],
    estimatedHours: 12,
    priority: 1,
    deadline: new Date('2025-12-24'),
    location: 'Remote',
    budget: 1200,
  },
  {
    requiredSkills: ['styling', 'fashion-direction'],
    estimatedHours: 6,
    priority: 2,
    deadline: new Date('2025-12-23'),
    location: 'New York',
    budget: 750,
  },
];

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

export const exampleUsageScenarios = {
  /**
   * Scenario 1: Shoot day readiness check
   */
  shootDayReadiness: {
    description: 'Producer checks if all samples ready 2 days before shoot',
    input: jewelryCampaignSamples,
    expectedActions: [
      'Identify 1 delayed sample (Chanel bag)',
      'Call brand to expedite shipping',
      'Prepare backup product',
      'Generate batching plan for on-set items',
    ],
  },

  /**
   * Scenario 2: Asset quality review
   */
  assetQualityReview: {
    description: 'Creative director reviews uploaded assets',
    input: jewelryCampaignAssets,
    expectedActions: [
      'Auto-approve RAW files (high quality)',
      'Flag JPG file for review (lower quality)',
      'Recommend TIFF for hero shots',
      'Add top 2 to selects pool',
    ],
  },

  /**
   * Scenario 3: Event risk scan
   */
  eventRiskScan: {
    description: 'Daily 8am scan for project risks',
    input: [jewelryCampaignEvent, fashionWeekEvent],
    expectedActions: [
      'Detect delayed task in Fashion Week (collection completion)',
      'Flag blocker in jewelry campaign (lighting setup)',
      'Estimate 2-day delay if not resolved',
      'Send urgent notification to stakeholders',
    ],
  },

  /**
   * Scenario 4: Team assignment
   */
  teamAssignment: {
    description: 'New task created - auto-assign to best person',
    input: { tasks: upcomingTasks, team: productionTeam },
    expectedActions: [
      'Assign photography task to Alex Kim (90% fit)',
      'Flag retouching task - Jordan near capacity',
      'Suggest Emma for styling (underutilized)',
      'Detect Marcus available for lighting',
    ],
  },
};

// ============================================================================
// DEMO WORKFLOW ORCHESTRATION
// ============================================================================

/**
 * Complete end-to-end workflow demonstration
 */
export const fullWorkflowDemo = {
  scenario: 'Luxury Jewelry Campaign - Complete Production Cycle',
  
  steps: [
    {
      day: 'Monday (D-2)',
      trigger: 'Samples arrive at studio',
      automations: ['Auto-Batch Samples', 'Proactive Risk Alerts'],
      expectedOutput: {
        batches: 3,
        risks: 2,
        actions: ['Call Chanel for delayed bag', 'Confirm Van Cleef arrival time'],
      },
    },
    {
      day: 'Tuesday (D-1)',
      trigger: 'Pre-shoot checklist',
      automations: ['Proactive Risk Alerts', 'Smart Task Assignment'],
      expectedOutput: {
        risks: 1,
        assignments: 2,
        actions: ['Final sample confirmation', 'Assign retoucher for next day'],
      },
    },
    {
      day: 'Wednesday (Shoot Day)',
      trigger: 'Assets uploading',
      automations: ['Asset Quality Auto-Scoring'],
      expectedOutput: {
        scored: 24,
        approved: 18,
        flagged: 2,
        actions: ['Review 2 flagged shots', '18 added to selects pool'],
      },
    },
    {
      day: 'Thursday (D+1)',
      trigger: 'Daily risk scan',
      automations: ['Proactive Risk Alerts'],
      expectedOutput: {
        risks: 1,
        actions: ['Accelerate retouching - deadline in 24h'],
      },
    },
    {
      day: 'Friday (Delivery)',
      trigger: 'Client delivery',
      automations: ['Asset Quality Auto-Scoring'],
      expectedOutput: {
        delivered: 24,
        quality: 92,
        actions: ['Client notification sent', 'Project marked complete'],
      },
    },
  ],
};
