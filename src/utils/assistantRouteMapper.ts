/**
 * Assistant Route Mapper Utility
 * 
 * Maps application routes to AI Assistant Page Kits with full configuration.
 * This utility provides type-safe route detection and kit selection.
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface AssistantKitConfig {
  kitName: KitName;
  pageName: string;
  primarySkill: SkillName;
  quickActions: string[];
  defaultInsights: string[];
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const KIT_NAMES = {
  MARKETING: 'marketing',
  SERVICES: 'services',
  EVENTS: 'events',
  LOGISTICS: 'logistics',
  PRODUCTION: 'production',
  MEDIA: 'media',
  EXECUTIVE: 'executive',
  CASTING: 'casting',
  SPONSORS: 'sponsors',
  DIRECTORY: 'directory',
  SUPPORT: 'support',
  BOOKING_WIZARD: 'booking-wizard',
  EVENT_WIZARD: 'event-wizard',
  PROPOSAL: 'proposal',
  TASKS: 'tasks',
  CONTRACTS: 'contracts',
  ANALYTICS: 'analytics',
  CLIENTS: 'clients',
  FINANCE: 'finance',
} as const;

export type KitName = typeof KIT_NAMES[keyof typeof KIT_NAMES];

export const SKILL_NAMES = {
  NAVIGATOR: 'Navigator',
  SERVICES_SKILL: 'Services Skill',
  EVENTS_SKILL: 'Events Skill',
  LOGISTICS_SKILL: 'Logistics Skill',
  PRODUCTION_SKILL: 'Production Skill',
  MEDIA_SKILL: 'Media Skill',
  EXECUTIVE_SKILL: 'Executive Skill',
  CASTING_SKILL: 'Casting Skill',
  SPONSORSHIP_SKILL: 'Sponsorship Skill',
  DIRECTORY_SKILL: 'Directory Skill',
  SUPPORT_SKILL: 'Support Skill',
  FINANCE_SKILL: 'Finance Skill',
  ANALYTICS_SKILL: 'Analytics Skill',
  TASKS_SKILL: 'Tasks Skill',
} as const;

export type SkillName = typeof SKILL_NAMES[keyof typeof SKILL_NAMES];

// ============================================================================
// ROUTE MAPPING CONFIGURATION
// ============================================================================

/**
 * Complete route-to-kit mapping based on FashionOS application routes
 */
const ROUTE_MAPPINGS: Record<string, AssistantKitConfig> = {
  // =========================================================================
  // MARKETING PAGES
  // =========================================================================
  'home': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'Home',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Explore FashionOS', 'View Services', 'Create Event', 'Get Started'],
    defaultInsights: ['Platform Overview', 'Popular Features', 'Quick Start Guide'],
  },
  'home-v2': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'Home',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Explore FashionOS', 'View Services', 'Create Event', 'Get Started'],
    defaultInsights: ['Platform Overview', 'Popular Features', 'Quick Start Guide'],
  },
  'home-v3': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'Home',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Explore FashionOS', 'View Services', 'Create Event', 'Get Started'],
    defaultInsights: ['Platform Overview', 'Popular Features', 'Quick Start Guide'],
  },
  'sponsorship': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'FashionOS Sponsorship',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Start Strategy', 'View ROI Demo', 'Contact Sales', 'Sponsor CRM'],
    defaultInsights: ['Sponsorship Overview', 'ROI Features', 'Case Studies'],
  },
  'sponsorship-v2': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'FashionOS Sponsorship V2',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Start Strategy', 'View ROI Demo', 'Contact Sales', 'Sponsor CRM'],
    defaultInsights: ['Sponsorship Overview', 'ROI Features', 'Case Studies'],
  },
  'sponsorship-v3': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'FashionOS Sponsorship V3',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Start Strategy', 'View ROI Demo', 'Contact Sales', 'Sponsor CRM'],
    defaultInsights: ['Sponsorship Overview', 'ROI Features', 'Case Studies'],
  },
  'sponsorship-v5': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'FashionOS Sponsorship V5',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Start Strategy', 'View Process', 'See ROI Dashboard', 'Get Brief'],
    defaultInsights: ['Sponsorship Strategy', 'AI-Powered Insights', 'Performance Tracking'],
  },
  'sponsors/cosmetics': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'Cosmetics & Makeup Sponsorship',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Start Beauty Strategy', 'View Shade Analytics', 'See MUA Partnerships', 'Get ROI Forecast'],
    defaultInsights: ['Shade Performance Tracking', 'Tutorial Engagement Metrics', 'Get-the-Look Conversion'],
  },
  'sponsors/electronics': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'Electronics & Tech Sponsorship',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['View Activation Zones', 'See ROI Dashboard', 'Plan Product Placement', 'Get Tech Forecast'],
    defaultInsights: ['Real-Time Tracking', 'Attribution Analytics', 'Purchase Conversion Flow'],
  },
  'sponsors/electronics-v2': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'Electronics & Tech Sponsorship V2',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['View Editorial Design', 'Explore Activations', 'See Performance Data', 'Schedule Demo'],
    defaultInsights: ['Editorial Storytelling', 'Calm Luxury Aesthetic', 'Data-Driven Results'],
  },
  'sponsors/beauty': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'Beauty Sponsorship System',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Start Beauty Strategy', 'View Shade Analytics', 'See MUA Partnerships', 'Track Attribution'],
    defaultInsights: ['Runway to Revenue', 'Look Tagging System', 'Creator Performance Tracking'],
  },
  'sponsors/automotive': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'Automotive Sponsorship System',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Start Auto Strategy', 'View Test Drive Analytics', 'See Event Activations', 'Calculate ROI'],
    defaultInsights: ['Event to Purchase Flow', 'Dealership Attribution', 'VIP Lounge Tracking'],
  },
  'sponsors/real-estate': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'Real Estate Sponsorship System',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Request Access', 'View Property Analytics', 'See Viewing Bookings', 'Download Playbook'],
    defaultInsights: ['Event to Purchase Attribution', 'Buyer Intent Scoring', 'Viewing Conversion Tracking'],
  },

  // =========================================================================
  // SERVICE PAGES
  // =========================================================================
  'photography': {
    kitName: KIT_NAMES.SERVICES,
    pageName: 'Photography Services',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['View Packages', 'Compare Options', 'Get Quote', 'Book Consultation'],
    defaultInsights: ['Popular Packages', 'Best Fit Recommendation', 'Estimated Timeline'],
  },
  'services': {
    kitName: KIT_NAMES.SERVICES,
    pageName: 'Services',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Compare Packages', 'Get Custom Quote', 'Book Consultation', 'View Portfolio'],
    defaultInsights: ['Popular Services', 'Best Fit', 'Service Timeline'],
  },
  'clothing': {
    kitName: KIT_NAMES.SERVICES,
    pageName: 'Clothing Photography',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['View Packages', 'Request Quote', 'See Examples'],
    defaultInsights: ['Clothing Packages', 'Best Fit'],
  },
  'product': {
    kitName: KIT_NAMES.SERVICES,
    pageName: 'Product Photography',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['View Packages', 'Request Quote', 'See Portfolio'],
    defaultInsights: ['Product Packages', 'Recommendations'],
  },
  'ecommerce-photography': {
    kitName: KIT_NAMES.SERVICES,
    pageName: 'E-commerce Photography',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['View Packages', 'Get Started', 'See Examples'],
    defaultInsights: ['E-commerce Solutions', 'Package Options'],
  },
  'video': {
    kitName: KIT_NAMES.SERVICES,
    pageName: 'Video Services',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Video Packages', 'Request Demo', 'View Reel'],
    defaultInsights: ['Video Production Info', 'Package Options'],
  },
  'amazon': {
    kitName: KIT_NAMES.SERVICES,
    pageName: 'Amazon Services',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Amazon Packages', 'A+ Content', 'Get Quote'],
    defaultInsights: ['Amazon Optimization', 'Best Practices'],
  },
  'instagram': {
    kitName: KIT_NAMES.SERVICES,
    pageName: 'Instagram Services',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Social Packages', 'Content Ideas', 'Get Quote'],
    defaultInsights: ['Instagram Strategy', 'Package Options'],
  },
  'webdesign': {
    kitName: KIT_NAMES.SERVICES,
    pageName: 'Web Design Services',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Web Packages', 'Portfolio Review', 'Get Quote'],
    defaultInsights: ['Web Design Info', 'Package Options'],
  },

  // =========================================================================
  // DIRECTORY PAGES
  // =========================================================================
  'studio': {
    kitName: KIT_NAMES.DIRECTORY,
    pageName: 'Studios',
    primarySkill: SKILL_NAMES.DIRECTORY_SKILL,
    quickActions: ['Find Studios', 'Compare Locations', 'Check Availability'],
    defaultInsights: ['Studio Availability', 'Featured Studios'],
  },
  'directory': {
    kitName: KIT_NAMES.DIRECTORY,
    pageName: 'Directory',
    primarySkill: SKILL_NAMES.DIRECTORY_SKILL,
    quickActions: ['Browse All', 'Filter by Type', 'Add to Favorites', 'Search'],
    defaultInsights: ['Featured Profiles', 'Top Matches'],
  },
  'directorydetail': {
    kitName: KIT_NAMES.DIRECTORY,
    pageName: 'Profile Details',
    primarySkill: SKILL_NAMES.DIRECTORY_SKILL,
    quickActions: ['Contact', 'Book Service', 'Save Profile', 'Share'],
    defaultInsights: ['Profile Summary', 'Availability', 'Reviews'],
  },
  'designers': {
    kitName: KIT_NAMES.DIRECTORY,
    pageName: 'Designer Directory',
    primarySkill: SKILL_NAMES.DIRECTORY_SKILL,
    quickActions: ['Filter', 'Recommend', 'Invite', 'Save List'],
    defaultInsights: ['Top Matches', 'New Arrivals', 'Featured Designers'],
  },
  'designer-profile': {
    kitName: KIT_NAMES.DIRECTORY,
    pageName: 'Designer Profile',
    primarySkill: SKILL_NAMES.DIRECTORY_SKILL,
    quickActions: ['Contact', 'Add to Event', 'Request Lookbook', 'View Collection'],
    defaultInsights: ['Fit Summary', 'Availability', 'Portfolio'],
  },

  // =========================================================================
  // EVENT PAGES
  // =========================================================================
  'events': {
    kitName: KIT_NAMES.EVENTS,
    pageName: 'Events List',
    primarySkill: SKILL_NAMES.EVENTS_SKILL,
    quickActions: ['Create Event', 'View Calendar', 'Filter Upcoming', 'Draft Run of Show'],
    defaultInsights: ['Upcoming Events', 'Risk Scan', 'Next Deadlines'],
  },
  'events-list': {
    kitName: KIT_NAMES.EVENTS,
    pageName: 'Events List',
    primarySkill: SKILL_NAMES.EVENTS_SKILL,
    quickActions: ['Create Event', 'View Calendar', 'Filter Upcoming', 'Draft Run of Show'],
    defaultInsights: ['Upcoming Events', 'Risk Scan', 'Next Deadlines'],
  },
  'eventdetail': {
    kitName: KIT_NAMES.EVENTS,
    pageName: 'Event Dashboard',
    primarySkill: SKILL_NAMES.EVENTS_SKILL,
    quickActions: ['Today\'s Priorities', 'Critical Path', 'Generate Run of Show', 'Send Update'],
    defaultInsights: ['Critical Blocker', 'Completion %', 'Staffing Gaps', 'Next Tasks'],
  },
  'event-wizard': {
    kitName: KIT_NAMES.EVENT_WIZARD,
    pageName: 'Event Creation Wizard',
    primarySkill: SKILL_NAMES.EVENTS_SKILL,
    quickActions: ['Generate Checklist', 'Suggest Timeline', 'Add Stakeholders', 'Create Tasks'],
    defaultInsights: ['Wizard Progress', 'Missing Fields', 'Suggested Defaults'],
  },
  'command-center': {
    kitName: KIT_NAMES.EVENTS,
    pageName: 'Command Center',
    primarySkill: SKILL_NAMES.EXECUTIVE_SKILL,
    quickActions: ['Today\'s Brief', 'Critical Alerts', 'Team Status', 'Quick Actions'],
    defaultInsights: ['System Health', 'Priority Actions', 'Key Metrics'],
  },
  'runway': {
    kitName: KIT_NAMES.EVENTS,
    pageName: 'Runway Stage',
    primarySkill: SKILL_NAMES.EVENTS_SKILL,
    quickActions: ['Manage Lineup', 'Timing Control', 'Cues', 'Music Control'],
    defaultInsights: ['Show Status', 'Next Model', 'Timing'],
  },
  'venues': {
    kitName: KIT_NAMES.EVENTS,
    pageName: 'Venue Management',
    primarySkill: SKILL_NAMES.EVENTS_SKILL,
    quickActions: ['Find Venues', 'Compare Options', 'Book Site Visit', 'Check Availability'],
    defaultInsights: ['Venue Matches', 'Availability', 'Recommendations'],
  },
  'activations': {
    kitName: KIT_NAMES.EVENTS,
    pageName: 'Activations Manager',
    primarySkill: SKILL_NAMES.EVENTS_SKILL,
    quickActions: ['Create Activation', 'Track Performance', 'Generate Report'],
    defaultInsights: ['Active Campaigns', 'ROI Preview', 'Next Steps'],
  },

  // =========================================================================
  // PRODUCTION & LOGISTICS PAGES
  // =========================================================================
  'sample-tracker': {
    kitName: KIT_NAMES.LOGISTICS,
    pageName: 'Smart Sample Tracker',
    primarySkill: SKILL_NAMES.LOGISTICS_SKILL,
    quickActions: ['Show Missing Samples', 'Generate Batching Plan', 'Create Prep Checklist', 'Message Studio'],
    defaultInsights: ['Total SKUs', 'Readiness %', 'Risk Status', 'Optimization Suggestions'],
  },
  'call-sheet': {
    kitName: KIT_NAMES.PRODUCTION,
    pageName: 'Dynamic Call Sheet',
    primarySkill: SKILL_NAMES.PRODUCTION_SKILL,
    quickActions: ['Send Updates', 'Track Check-ins', 'Adjust Schedule', 'View Timeline'],
    defaultInsights: ['Team Status', 'Timeline', 'Next Scene', 'Attendance'],
  },
  'ai-optimization': {
    kitName: KIT_NAMES.PRODUCTION,
    pageName: 'AI Optimization Center',
    primarySkill: SKILL_NAMES.PRODUCTION_SKILL,
    quickActions: ['Optimize Schedule', 'Resource Planning', 'Risk Scan', 'Generate Report'],
    defaultInsights: ['Optimization Suggestions', 'Savings', 'Efficiency Score'],
  },
  'production-timeline': {
    kitName: KIT_NAMES.PRODUCTION,
    pageName: 'Production Timeline',
    primarySkill: SKILL_NAMES.PRODUCTION_SKILL,
    quickActions: ['View Milestones', 'Adjust Dates', 'Export Schedule', 'Track Progress'],
    defaultInsights: ['Timeline Status', 'Next Milestone', 'Delays'],
  },

  // =========================================================================
  // DASHBOARD PAGES
  // =========================================================================
  'overview': {
    kitName: KIT_NAMES.EXECUTIVE,
    pageName: 'Project Overview (Executive HQ)',
    primarySkill: SKILL_NAMES.EXECUTIVE_SKILL,
    quickActions: ['Ask AI', 'Fix Blocker', 'Approve Change', 'View Timeline'],
    defaultInsights: ['Campaign Status', 'Critical Path', 'Today\'s Decisions', 'Production Progress'],
  },
  'shotlist': {
    kitName: KIT_NAMES.PRODUCTION,
    pageName: 'Shot List Builder',
    primarySkill: SKILL_NAMES.PRODUCTION_SKILL,
    quickActions: ['Generate Shots', 'Optimize Sequence', 'Export List', 'Link Products'],
    defaultInsights: ['Shot Progress', 'Coverage Analysis', 'Missing Shots'],
  },
  'products': {
    kitName: KIT_NAMES.PRODUCTION,
    pageName: 'Products Dashboard',
    primarySkill: SKILL_NAMES.PRODUCTION_SKILL,
    quickActions: ['Tag Products', 'Link to Shots', 'Export Catalog', 'Assign SKUs'],
    defaultInsights: ['Product Status', 'Missing Info', 'Coverage'],
  },

  // =========================================================================
  // MEDIA & ASSETS PAGES
  // =========================================================================
  'gallery': {
    kitName: KIT_NAMES.MEDIA,
    pageName: 'Gallery Dashboard',
    primarySkill: SKILL_NAMES.MEDIA_SKILL,
    quickActions: ['Upload Assets', 'Tag by SKU', 'Prep Social Pack', 'Generate Selects'],
    defaultInsights: ['Assets Delivered', 'Quality Score', 'Missing Shots', 'Delivery Timeline'],
  },

  // =========================================================================
  // CLIENT & BUSINESS PAGES
  // =========================================================================
  'clients': {
    kitName: KIT_NAMES.CLIENTS,
    pageName: 'Client Dashboard',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Send Update', 'Schedule Meeting', 'View History', 'Create Task'],
    defaultInsights: ['Client Status', 'Active Projects', 'Next Touchpoint'],
  },
  'billing': {
    kitName: KIT_NAMES.FINANCE,
    pageName: 'Billing Dashboard',
    primarySkill: SKILL_NAMES.FINANCE_SKILL,
    quickActions: ['Generate Invoice', 'Payment Status', 'Budget Review', 'Export Report'],
    defaultInsights: ['Revenue Summary', 'Outstanding Payments', 'Budget Health'],
  },

  // =========================================================================
  // TASKS & CONTRACTS PAGES
  // =========================================================================
  'tasks': {
    kitName: KIT_NAMES.TASKS,
    pageName: 'Tasks & Deliverables',
    primarySkill: SKILL_NAMES.TASKS_SKILL,
    quickActions: ['Create Task', 'Auto-group', 'Identify Overdue', 'Daily Plan'],
    defaultInsights: ['Overdue Tasks', 'Next 48h', 'Owners Missing'],
  },
  'contracts': {
    kitName: KIT_NAMES.CONTRACTS,
    pageName: 'Contracts Manager',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Draft Contract', 'Send for Signature', 'Track Status', 'View Templates'],
    defaultInsights: ['Pending Signatures', 'Expiring Soon', 'Contract Status'],
  },

  // =========================================================================
  // ANALYTICS & REPORTING PAGES
  // =========================================================================
  'analytics': {
    kitName: KIT_NAMES.ANALYTICS,
    pageName: 'ROI Analytics',
    primarySkill: SKILL_NAMES.ANALYTICS_SKILL,
    quickActions: ['Generate Report', 'Compare Periods', 'Export Data', 'Set Goals'],
    defaultInsights: ['Key Metrics', 'Trends', 'Insights', 'ROI Summary'],
  },

  // =========================================================================
  // SPONSORS PAGES
  // =========================================================================
  'sponsors': {
    kitName: KIT_NAMES.SPONSORS,
    pageName: 'Sponsor CRM',
    primarySkill: SKILL_NAMES.SPONSORSHIP_SKILL,
    quickActions: ['Build List', 'Draft Pitch', 'Track Follow-ups', 'Create Package'],
    defaultInsights: ['Pipeline Summary', 'Hot Leads', 'Next Actions'],
  },
  'sponsor-profile': {
    kitName: KIT_NAMES.SPONSORS,
    pageName: 'Sponsor Profile',
    primarySkill: SKILL_NAMES.SPONSORSHIP_SKILL,
    quickActions: ['Draft Email', 'Schedule Call', 'Log Activity', 'Update Status'],
    defaultInsights: ['Sponsor Status', 'Deal Stage', 'Next Steps'],
  },

  // =========================================================================
  // CASTING PAGES
  // =========================================================================
  'casting': {
    kitName: KIT_NAMES.CASTING,
    pageName: 'Cura Casting',
    primarySkill: SKILL_NAMES.CASTING_SKILL,
    quickActions: ['Find Talent', 'Check Availability', 'Send Offers', 'Create Lineup'],
    defaultInsights: ['Confirmed Talent', 'Pending Offers', 'Budget Status'],
  },
  'cura-casting': {
    kitName: KIT_NAMES.CASTING,
    pageName: 'Cura Casting',
    primarySkill: SKILL_NAMES.CASTING_SKILL,
    quickActions: ['Find Models', 'Availability Check', 'Send Contracts', 'AI Match'],
    defaultInsights: ['Casting Progress', 'Confirmations', 'Match Score'],
  },
  'casting-availability': {
    kitName: KIT_NAMES.CASTING,
    pageName: 'Casting Availability',
    primarySkill: SKILL_NAMES.CASTING_SKILL,
    quickActions: ['Check Dates', 'Send Holds', 'Confirm Bookings', 'View Calendar'],
    defaultInsights: ['Availability Summary', 'Confirmed', 'Pending'],
  },
  'casting-matchmaker': {
    kitName: KIT_NAMES.CASTING,
    pageName: 'Casting Matchmaker',
    primarySkill: SKILL_NAMES.CASTING_SKILL,
    quickActions: ['AI Match', 'Compare Talent', 'Create Lineup', 'Finalize'],
    defaultInsights: ['Match Score', 'Recommendations', 'Best Fit'],
  },
  'scout-setup': {
    kitName: KIT_NAMES.CASTING,
    pageName: 'Scout Setup',
    primarySkill: SKILL_NAMES.CASTING_SKILL,
    quickActions: ['Define Criteria', 'Set Budget', 'Start Search', 'Save Template'],
    defaultInsights: ['Search Parameters', 'Budget Allocation'],
  },
  'scout-finder': {
    kitName: KIT_NAMES.CASTING,
    pageName: 'Scout Finder',
    primarySkill: SKILL_NAMES.CASTING_SKILL,
    quickActions: ['Browse Talent', 'Filter', 'Shortlist', 'Compare'],
    defaultInsights: ['Search Results', 'Filters Active', 'Match Quality'],
  },
  'scout-shortlist': {
    kitName: KIT_NAMES.CASTING,
    pageName: 'Scout Shortlist',
    primarySkill: SKILL_NAMES.CASTING_SKILL,
    quickActions: ['Compare', 'Send Offers', 'Finalize', 'Export List'],
    defaultInsights: ['Shortlist Count', 'Budget Status', 'Next Steps'],
  },

  // =========================================================================
  // WIZARD FLOWS
  // =========================================================================
  'wizard': {
    kitName: KIT_NAMES.BOOKING_WIZARD,
    pageName: 'Shoot Wizard',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Save Progress', 'Get Recommendations', 'Preview Proposal', 'Skip Step'],
    defaultInsights: ['Wizard Progress', 'Missing Fields', 'Estimated Cost'],
  },
  'website-wizard': {
    kitName: KIT_NAMES.BOOKING_WIZARD,
    pageName: 'Website Wizard',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Design Tips', 'Preview Site', 'Complete Setup', 'Save Draft'],
    defaultInsights: ['Progress %', 'Next Steps', 'Recommendations'],
  },
  'designer-wizard': {
    kitName: KIT_NAMES.BOOKING_WIZARD,
    pageName: 'Designer Wizard',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Save Profile', 'Preview', 'Publish', 'Get Help'],
    defaultInsights: ['Completion Status', 'Missing Info'],
  },
  'directory-wizard': {
    kitName: KIT_NAMES.DIRECTORY,
    pageName: 'Directory Profile Wizard',
    primarySkill: SKILL_NAMES.DIRECTORY_SKILL,
    quickActions: ['Save Profile', 'Preview', 'Publish', 'Add Portfolio'],
    defaultInsights: ['Profile Completion', 'Missing Fields', 'Best Practices'],
  },

  // =========================================================================
  // PROPOSAL & BOOKING PAGES
  // =========================================================================
  'proposal': {
    kitName: KIT_NAMES.PROPOSAL,
    pageName: 'Proposal Preview',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Edit Scope', 'Accept Proposal', 'Request Changes', 'Download PDF'],
    defaultInsights: ['Proposal Summary', 'Pricing', 'Timeline'],
  },
  'proposal-confirmation': {
    kitName: KIT_NAMES.PROPOSAL,
    pageName: 'Proposal Confirmation',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Sign Contract', 'Download Proposal', 'Edit', 'Share'],
    defaultInsights: ['Proposal Status', 'Next Steps', 'Payment Info'],
  },
  'proposal-ready': {
    kitName: KIT_NAMES.PROPOSAL,
    pageName: 'Proposal Ready',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Review', 'Accept', 'Request Edit', 'Download'],
    defaultInsights: ['Proposal Summary', 'Pricing', 'Next Steps'],
  },
  'booking': {
    kitName: KIT_NAMES.BOOKING_WIZARD,
    pageName: 'Booking Flow',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Confirm Details', 'Payment Options', 'Contact Support', 'Save Draft'],
    defaultInsights: ['Booking Summary', 'Next Steps', 'Payment Status'],
  },

  // =========================================================================
  // BRAND SHOOT AI FLOW
  // =========================================================================
  'brand-shoot-start': {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'Brand Shoot Start',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Start Wizard', 'Learn More', 'View Examples', 'Get Help'],
    defaultInsights: ['Quick Start Guide', 'What to Expect'],
  },
  'brand-signal-capture': {
    kitName: KIT_NAMES.BOOKING_WIZARD,
    pageName: 'Brand Signal Capture',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Save Progress', 'AI Suggestions', 'Preview', 'Skip Step'],
    defaultInsights: ['Signals Captured', 'Confidence', 'Recommendations'],
  },
  'ai-thinking': {
    kitName: KIT_NAMES.BOOKING_WIZARD,
    pageName: 'AI Processing',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['View Progress', 'Adjust Inputs', 'Cancel'],
    defaultInsights: ['Processing Status', 'Estimated Time'],
  },
  'campaign-summary': {
    kitName: KIT_NAMES.PROPOSAL,
    pageName: 'Campaign Summary',
    primarySkill: SKILL_NAMES.SERVICES_SKILL,
    quickActions: ['Edit Campaign', 'Approve', 'Request Changes', 'Download'],
    defaultInsights: ['Campaign Overview', 'Deliverables', 'Timeline'],
  },

  // =========================================================================
  // SYSTEM & ADMIN PAGES
  // =========================================================================
  'architecture': {
    kitName: KIT_NAMES.SUPPORT,
    pageName: 'Site Architecture',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Explore Routes', 'View Components', 'API Docs', 'Tech Stack'],
    defaultInsights: ['System Map', 'Tech Stack', 'Documentation'],
  },
  'style-guide': {
    kitName: KIT_NAMES.SUPPORT,
    pageName: 'Style Guide',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['View Tokens', 'Component Library', 'Guidelines', 'Examples'],
    defaultInsights: ['Design System Info', 'Component Count'],
  },
  'brand-profile-dashboard': {
    kitName: KIT_NAMES.DIRECTORY,
    pageName: 'Brand Profile',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Edit Profile', 'Publish', 'Share', 'Preview'],
    defaultInsights: ['Profile Completeness', 'Visibility'],
  },
};

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Get kit configuration for a given route
 * 
 * @param activeScreen - Current route/screen identifier from App.tsx
 * @returns Complete kit configuration including name, page name, skill, actions, and insights
 */
export function getKitForRoute(activeScreen: string): AssistantKitConfig {
  // Direct match
  if (ROUTE_MAPPINGS[activeScreen]) {
    return ROUTE_MAPPINGS[activeScreen];
  }

  // Pattern matching for dynamic routes
  
  // Tasks variations (tasks-event-planning, tasks-sponsorship, etc.)
  if (activeScreen.startsWith('tasks-')) {
    const taskType = activeScreen.replace('tasks-', '').replace(/-/g, ' ');
    return {
      kitName: KIT_NAMES.TASKS,
      pageName: `Tasks: ${taskType.charAt(0).toUpperCase() + taskType.slice(1)}`,
      primarySkill: SKILL_NAMES.TASKS_SKILL,
      quickActions: ['Create Task', 'Auto-group', 'Filter', 'Daily Plan'],
      defaultInsights: ['Overdue Tasks', 'Next 48h', 'Task Summary'],
    };
  }

  // Event detail variations
  if (activeScreen.includes('event') && activeScreen.includes('detail')) {
    return ROUTE_MAPPINGS['eventdetail'];
  }

  // Director variations
  if (activeScreen.includes('director') && activeScreen.includes('detail')) {
    return ROUTE_MAPPINGS['directorydetail'];
  }

  // Sponsor variations
  if (activeScreen.includes('sponsor') && (activeScreen.includes('detail') || activeScreen.includes('profile'))) {
    return ROUTE_MAPPINGS['sponsor-profile'];
  }

  // Designer variations
  if (activeScreen.includes('designer') && activeScreen.includes('profile')) {
    return ROUTE_MAPPINGS['designer-profile'];
  }

  // Default fallback - Marketing Kit
  console.warn(`⚠️ No kit mapping found for route: "${activeScreen}". Using Marketing Kit as fallback.`);
  
  return {
    kitName: KIT_NAMES.MARKETING,
    pageName: 'FashionOS',
    primarySkill: SKILL_NAMES.NAVIGATOR,
    quickActions: ['Explore Platform', 'Get Help', 'View Services'],
    defaultInsights: ['Getting Started', 'Platform Overview'],
  };
}

/**
 * Get all available kit names (useful for debugging and admin tools)
 */
export function getAllKitNames(): KitName[] {
  return Object.values(KIT_NAMES);
}

/**
 * Get all available skill names (useful for debugging and admin tools)
 */
export function getAllSkillNames(): SkillName[] {
  return Object.values(SKILL_NAMES);
}

/**
 * Debug utility: Get all route mappings
 */
export function getAllRouteMappings(): Record<string, AssistantKitConfig> {
  return ROUTE_MAPPINGS;
}