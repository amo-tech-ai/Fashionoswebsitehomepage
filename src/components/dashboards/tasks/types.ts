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
  Archive
} from "lucide-react";

// --- Types ---

export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Backlog' | 'In Progress' | 'Review' | 'Completed';
export type DeliverableStatus = 'Pending' | 'In Progress' | 'Completed';
export type ViewState = 'dashboard' | 'tasks-detail' | 'deliverables-detail';
export type WorkflowCategory = 'event-planning' | 'sponsorship' | 'marketing' | 'operations' | 'media';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  owner: string;
  status: Status;
  category: string;
}

export interface Deliverable {
  id: string;
  name: string;
  sponsor: string;
  event: string;
  dueDate: string;
  status: DeliverableStatus;
  type: string;
  owner: string;
}

export interface FlowStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: any;
  tasks: Task[];
  deliverables: Deliverable[];
}
