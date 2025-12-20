import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, EventTask, WorkflowPhase, EventBudgetCategory } from '../lib/types/events.types';
import { toast } from 'sonner';

interface EventContextType {
  currentEvent: Event | null;
  tasks: EventTask[];
  phases: WorkflowPhase[];
  budgets: EventBudgetCategory[];
  isLoading: boolean;
  
  // Actions
  createEvent: (eventData: Partial<Event>) => void;
  updateEvent: (updates: Partial<Event>) => void;
  addTask: (task: Omit<EventTask, 'id' | 'created_at'>) => void;
  updateTask: (taskId: string, updates: Partial<EventTask>) => void;
  deleteTask: (taskId: string) => void;
  updatePhase: (phaseId: string, updates: Partial<WorkflowPhase>) => void;
  refreshData: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function useEvent() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
}

// Initial Mock Data
const MOCK_EVENT: Event = {
  id: 'evt-001',
  name: 'NYFW SS25',
  type: 'runway_show',
  status: 'planning',
  start_date: '2025-09-15',
  budget_total: 150000,
  budget_actual: 45000,
  attendee_registered: 120,
  attendee_target: 200,
  created_by: 'system',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  progress_percentage: 45
};

const MOCK_TASKS: EventTask[] = [
  { 
    id: 't1', 
    event_id: 'evt-001',
    title: 'Venue Contract', 
    is_critical_path: true, 
    status: 'to_do', 
    deadline: '2024-12-10', 
    workflow_phase: 'venue_logistics',
    workflow_category: 'operations',
    priority: 'critical',
    created_at: new Date().toISOString(),
    dependency_task_ids: []
  },
  { 
    id: 't2', 
    event_id: 'evt-001',
    title: 'Model Casting Call', 
    is_critical_path: true, 
    status: 'in_progress', 
    deadline: '2025-01-15', 
    workflow_phase: 'pre_production',
    workflow_category: 'event_planning',
    priority: 'high',
    created_at: new Date().toISOString(),
    dependency_task_ids: []
  },
  { 
    id: 't3', 
    event_id: 'evt-001',
    title: 'Send Save the Dates', 
    is_critical_path: false, 
    status: 'done', 
    deadline: '2024-11-01', 
    workflow_phase: 'pre_production',
    workflow_category: 'marketing',
    priority: 'medium',
    created_at: new Date().toISOString(),
    dependency_task_ids: []
  }
];

const MOCK_PHASES: WorkflowPhase[] = [
  { 
    id: 'pre_production', 
    name: 'Pre-Production', 
    status: 'active', 
    progress: 65, 
    dateRange: 'Oct - Dec',
    tasksComplete: 1,
    tasksTotal: 2
  },
  { 
    id: 'venue_logistics', 
    name: 'Venue Logistics', 
    status: 'active', 
    progress: 40, 
    dateRange: 'Jan - Mar',
    tasksComplete: 0,
    tasksTotal: 5
  },
  { 
    id: 'creative_design', 
    name: 'Creative Design', 
    status: 'upcoming', 
    progress: 10, 
    dateRange: 'Mar - May',
    tasksComplete: 0,
    tasksTotal: 8
  },
  { 
    id: 'on_site', 
    name: 'Event Execution', 
    status: 'locked', 
    progress: 0, 
    dateRange: 'Sep 15',
    tasksComplete: 0,
    tasksTotal: 12
  },
  { 
    id: 'post_event', 
    name: 'Wrap & Analysis', 
    status: 'locked', 
    progress: 0, 
    dateRange: 'Sep 16+',
    tasksComplete: 0,
    tasksTotal: 3
  }
];

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [tasks, setTasks] = useState<EventTask[]>([]);
  const [phases, setPhases] = useState<WorkflowPhase[]>([]);
  const [budgets, setBudgets] = useState<EventBudgetCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    // Simulate API fetch
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Network delay simulation
      
      setCurrentEvent(MOCK_EVENT);
      setTasks(MOCK_TASKS);
      setPhases(MOCK_PHASES);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const createEvent = (eventData: Partial<Event>) => {
    const newEvent: Event = {
      ...MOCK_EVENT, // Use mock as base for fields not provided
      ...eventData,
      id: `evt-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Event;
    
    setCurrentEvent(newEvent);
    toast.success("Event Created", { description: `${newEvent.name} is now active.` });
  };

  const updateEvent = (updates: Partial<Event>) => {
    if (!currentEvent) return;
    setCurrentEvent({ ...currentEvent, ...updates, updated_at: new Date().toISOString() });
  };

  const addTask = (task: Omit<EventTask, 'id' | 'created_at'>) => {
    const newTask: EventTask = {
      ...task,
      id: `task-${Date.now()}`,
      created_at: new Date().toISOString(),
      event_id: currentEvent?.id || 'unknown',
      dependency_task_ids: task.dependency_task_ids || []
    };
    setTasks(prev => [...prev, newTask]);
    toast.success("Task Added");
  };

  const updateTask = (taskId: string, updates: Partial<EventTask>) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates, updated_at: new Date().toISOString() } : t));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    toast.info("Task Deleted");
  };

  const updatePhase = (phaseId: string, updates: Partial<WorkflowPhase>) => {
    setPhases(prev => prev.map(p => p.id === phaseId ? { ...p, ...updates } : p));
  };

  const refreshData = () => {
    // Re-fetch logic would go here
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <EventContext.Provider value={{
      currentEvent,
      tasks,
      phases,
      budgets,
      isLoading,
      createEvent,
      updateEvent,
      addTask,
      updateTask,
      deleteTask,
      updatePhase,
      refreshData
    }}>
      {children}
    </EventContext.Provider>
  );
}
