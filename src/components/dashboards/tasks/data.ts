import { 
  ClipboardCheck, 
  Building2, 
  Palette, 
  Zap, 
  BarChart3,
  Compass,
  Presentation,
  FileSignature,
  Box,
  Target,
  Camera,
  Share2,
  Megaphone,
  LineChart,
  Store,
  Wrench,
  UserCheck,
  ShieldCheck,
  Upload,
  Globe,
  Archive,
  Briefcase,
  Settings
} from "lucide-react";
import { FlowStep, Task, Deliverable, WorkflowCategory } from "./types";

// --- Mock Data Generators ---

const generateTasks = (count: number, category: string): Task[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `t-${category}-${i}`,
    title: `${category} Task ${i + 1}: Review requirements`,
    priority: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
    dueDate: "Sep 15",
    owner: "Member",
    status: Math.random() > 0.7 ? 'Completed' : Math.random() > 0.4 ? 'In Progress' : 'Backlog',
    category: category
  }));
};

const generateDeliverables = (count: number, category: string): Deliverable[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `d-${category}-${i}`,
    name: `${category} Asset ${i + 1}`,
    sponsor: "Internal",
    event: "Main Event",
    dueDate: "Sep 20",
    status: Math.random() > 0.6 ? 'Completed' : 'Pending',
    type: "Document",
    owner: "Lead"
  }));
};

// --- Workflows Data ---

export const eventPlanningSteps: FlowStep[] = [
  {
    id: "ep-1", stepNumber: 1, title: "Pre-Production Planning", description: "Initial event goals, budgeting, timelines, team assignments.", icon: ClipboardCheck,
    tasks: generateTasks(4, "Planning"), deliverables: generateDeliverables(2, "Brief")
  },
  {
    id: "ep-2", stepNumber: 2, title: "Venue & Logistics", description: "Venue booking, layouts, safety plans, vendor scheduling.", icon: Building2,
    tasks: generateTasks(5, "Logistics"), deliverables: generateDeliverables(3, "Contract")
  },
  {
    id: "ep-3", stepNumber: 3, title: "Creative & Program Design", description: "Creative direction, run-of-show, visual assets, program flow.", icon: Palette,
    tasks: generateTasks(6, "Creative"), deliverables: generateDeliverables(4, "Design")
  },
  {
    id: "ep-4", stepNumber: 4, title: "On-Site Operations", description: "Installation, rehearsals, crew coordination, show execution.", icon: Zap,
    tasks: generateTasks(3, "Ops"), deliverables: generateDeliverables(1, "Checklist")
  },
  {
    id: "ep-5", stepNumber: 5, title: "Post-Event Reporting", description: "Performance analysis, sponsor reporting, media metrics, ROI.", icon: BarChart3,
    tasks: generateTasks(4, "Reporting"), deliverables: generateDeliverables(2, "Report")
  },
];

export const sponsorshipSteps: FlowStep[] = [
  {
    id: "sp-1", stepNumber: 1, title: "Prospecting & Outreach", description: "Identify potential sponsors, research fit, prepare outreach lists.", icon: Compass,
    tasks: generateTasks(5, "Outreach"), deliverables: generateDeliverables(1, "List")
  },
  {
    id: "sp-2", stepNumber: 2, title: "Pitches & Decks", description: "Prepare pitch decks, sponsorship bundles, tier pricing.", icon: Presentation,
    tasks: generateTasks(3, "Pitch"), deliverables: generateDeliverables(2, "Deck")
  },
  {
    id: "sp-3", stepNumber: 3, title: "Negotiation & Contracts", description: "Drafts, revisions, approvals, legal coordination.", icon: FileSignature,
    tasks: generateTasks(4, "Legal"), deliverables: generateDeliverables(3, "Contract")
  },
  {
    id: "sp-4", stepNumber: 4, title: "Activation Planning", description: "Plan activation zones, experiences, content deliverables.", icon: Box,
    tasks: generateTasks(6, "Activation"), deliverables: generateDeliverables(4, "Plan")
  },
  {
    id: "sp-5", stepNumber: 5, title: "Sponsor Reporting", description: "ROI reports, analytics, recap packages.", icon: BarChart3,
    tasks: generateTasks(2, "ROI"), deliverables: generateDeliverables(1, "Recap")
  },
];

export const marketingSteps: FlowStep[] = [
  {
    id: "mk-1", stepNumber: 1, title: "Campaign Strategy", description: "Messaging, audiences, promo timeline.", icon: Target,
    tasks: generateTasks(3, "Strategy"), deliverables: generateDeliverables(1, "Plan")
  },
  {
    id: "mk-2", stepNumber: 2, title: "Creative Production", description: "Graphics, videos, press photos, brand assets.", icon: Camera,
    tasks: generateTasks(5, "Production"), deliverables: generateDeliverables(5, "Asset")
  },
  {
    id: "mk-3", stepNumber: 3, title: "Social Media & Influencers", description: "Scheduling posts, coordinating influencers, publishing.", icon: Share2,
    tasks: generateTasks(8, "Social"), deliverables: generateDeliverables(10, "Post")
  },
  {
    id: "mk-4", stepNumber: 4, title: "Press & Communications", description: "Press releases, media outreach, journalist coordination.", icon: Megaphone,
    tasks: generateTasks(4, "PR"), deliverables: generateDeliverables(2, "Release")
  },
  {
    id: "mk-5", stepNumber: 5, title: "Performance & Analytics", description: "Engagement metrics, impressions, conversion analysis.", icon: LineChart,
    tasks: generateTasks(2, "Analytics"), deliverables: generateDeliverables(1, "Report")
  },
];

export const operationsSteps: FlowStep[] = [
  {
    id: "op-1", stepNumber: 1, title: "Vendor Management", description: "Catering, security, cleaning, transport.", icon: Store,
    tasks: generateTasks(4, "Vendor"), deliverables: generateDeliverables(3, "Contract")
  },
  {
    id: "op-2", stepNumber: 2, title: "Equipment & Technical", description: "AV, lighting, staging, power supply.", icon: Wrench,
    tasks: generateTasks(5, "Tech"), deliverables: generateDeliverables(2, "Manifest")
  },
  {
    id: "op-3", stepNumber: 3, title: "Staffing & Scheduling", description: "Shift planning, roles, uniforms, briefing.", icon: UserCheck,
    tasks: generateTasks(6, "Staff"), deliverables: generateDeliverables(1, "Roster")
  },
  {
    id: "op-4", stepNumber: 4, title: "Safety & Compliance", description: "Permits, insurance, emergency protocols.", icon: ShieldCheck,
    tasks: generateTasks(3, "Safety"), deliverables: generateDeliverables(2, "Permit")
  },
];

export const mediaSteps: FlowStep[] = [
  {
    id: "md-1", stepNumber: 1, title: "Asset Intake & Tagging", description: "Raw footage upload, categorization, metadata.", icon: Upload,
    tasks: generateTasks(5, "Intake"), deliverables: generateDeliverables(0, "")
  },
  {
    id: "md-2", stepNumber: 2, title: "Photo/Video Editing", description: "Retouching, cutting, color grading, exporting.", icon: Palette,
    tasks: generateTasks(8, "Editing"), deliverables: generateDeliverables(5, "Final Cut")
  },
  {
    id: "md-3", stepNumber: 3, title: "Publishing & Distribution", description: "Gallery upload, press kit distribution.", icon: Globe,
    tasks: generateTasks(4, "Publish"), deliverables: generateDeliverables(2, "Gallery")
  },
  {
    id: "md-4", stepNumber: 4, title: "Archive & Licensing", description: "Long-term storage, rights management.", icon: Archive,
    tasks: generateTasks(2, "Archive"), deliverables: generateDeliverables(1, "Catalog")
  },
];

export const workflows: Record<WorkflowCategory, FlowStep[]> = {
  'event-planning': eventPlanningSteps,
  'sponsorship': sponsorshipSteps,
  'marketing': marketingSteps,
  'operations': operationsSteps,
  'media': mediaSteps
};

export const tabs: { id: WorkflowCategory, label: string, icon: any }[] = [
  { id: 'event-planning', label: 'Event Planning', icon: ClipboardCheck },
  { id: 'sponsorship', label: 'Sponsorship', icon: Briefcase },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'operations', label: 'Operations', icon: Settings },
  { id: 'media', label: 'Media & Content', icon: Camera },
];
