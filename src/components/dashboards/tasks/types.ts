import { EventTask, EventSponsor, WorkflowPhase } from "../../../lib/types/events.types";

// Re-export core types to ensure consistency across the application
export type { EventTask, EventSponsor, WorkflowPhase };

// Alias EventTask to Task for backward compatibility, extending with UI-specific fields
export type Task = EventTask & {
  // Legacy fields for backward compatibility with UI components
  dueDate?: string;
  owner?: string;
  category?: string; // Mapped to workflow_category
  actionRoute?: string;
  actionLabel?: string;
};

// Map legacy internal types to the strict schema if needed, or simply alias them
export type Priority = EventTask['priority'];
export type Status = EventTask['status'];
export type WorkflowCategory = EventTask['workflow_category'];

// UI-specific types that extend the core data model
export interface FlowStep {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'upcoming' | 'pending';
  progress: number;
  tasks: Task[]; // Use Extended Task type
  // Optional UI-only fields
  stepNumber?: number;
  description?: string;
  icon?: any;
}

export type ViewState = 'dashboard' | 'tasks-detail' | 'deliverables-detail';
export type DrawerMode = 'summary' | 'detail' | null;

// Helper to map UI status strings to strict EventTask status
export const mapStatusToStrict = (status: string): EventTask['status'] => {
    const s = status.toLowerCase();
    if (s === 'completed' || s === 'done') return 'done';
    if (s === 'in progress' || s === 'active') return 'in_progress';
    if (s === 'cancelled') return 'cancelled';
    return 'to_do';
};

// Helper to map UI priority strings to strict EventTask priority
export const mapPriorityToStrict = (priority: string): EventTask['priority'] => {
    const p = priority.toLowerCase();
    if (p === 'critical') return 'critical';
    if (p === 'high') return 'high';
    if (p === 'medium') return 'medium';
    return 'low';
};
