import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { 
  PanelRight,
  List, 
  LayoutGrid
} from "lucide-react";

import { useEvent } from "../../context/EventContext";
import { WorkflowSteps } from "./tasks/components/WorkflowSteps";
import { CriticalTasksList } from "./tasks/views/CriticalTasksList";
import { KanbanBoard } from "./tasks/components/KanbanBoard";
import { WorkDrawer } from "./tasks/drawer/WorkDrawer";
import { Task, WorkflowCategory, FlowStep, DrawerMode } from "./tasks/types";

// --- Types ---
type ViewState = 'dashboard' | 'tasks-detail' | 'deliverables-detail';

// --- Main Component ---
export function TasksAndDeliverables({ initialTab = 'event-planning', onNavigate }: { initialTab?: string, onNavigate?: (page: string) => void }) {
  const { tasks, phases, updateTask } = useEvent();
  const [activeTab, setActiveTab] = useState<WorkflowCategory>(initialTab as WorkflowCategory);
  const [boardView, setBoardView] = useState<'list' | 'kanban'>('list');

  // Drawer State
  const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // --- Dynamic Data Construction ---
  const currentSteps: FlowStep[] = useMemo(() => {
    return phases.map(phase => ({
        id: phase.id,
        title: phase.name,
        status: (phase.status === 'active' || phase.status === 'complete' || phase.status === 'upcoming') ? phase.status : 'pending',
        progress: phase.progress,
        tasks: tasks.filter(t => t.workflow_phase === phase.id)
    }));
  }, [phases, tasks]);

  // Handle active step state (default to first active phase)
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  
  // Set default active step if none selected
  if (!activeStepId && currentSteps.length > 0) {
      const active = currentSteps.find(s => s.status === 'active') || currentSteps[0];
      setActiveStepId(active.id);
  }

  // Filter tasks for the view based on active step if we wanted to filter, 
  // but the design shows "All Tasks" often. 
  // For now, let's show all tasks for the current "category" if filtered, or just all.
  // The original code passed `allCurrentTasks` which was `currentSteps.flatMap`.
  const allCurrentTasks = tasks;

  // --- Handlers ---
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDrawerMode('detail');
  };

  const handleSummaryClick = () => {
    setDrawerMode('summary');
  };

  const handleCloseDrawer = () => {
    setDrawerMode(null);
    setSelectedTask(null);
  };

  const handleStepClick = (step: FlowStep) => {
      setActiveStepId(step.id);
      // Optional: scroll to section or filter list
  };

  return (
    <div className="min-h-screen bg-white pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="font-serif text-4xl text-black mb-2">Tasks & Deliverables</h1>
            <p className="text-gray-500">Manage your production workflow efficiently.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
                onClick={handleSummaryClick}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
             >
                <PanelRight className="w-4 h-4 text-gray-400 group-hover:text-black" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-black">Summary</span>
             </button>
             <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                New Task
             </button>
          </div>
        </div>

        {/* Workflow Stages (Top) */}
        <div className="mb-12">
            <WorkflowSteps 
                steps={currentSteps} 
                activeStepId={activeStepId}
                onStepClick={handleStepClick}
            />
        </div>

        {/* Main Content Area (Full Width) */}
        <motion.div 
            layout
            className="w-full"
        >
            {/* Controls */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <div className="flex gap-6">
                    <button className="text-sm font-medium text-black border-b-2 border-black pb-4 -mb-4.5">
                        All Tasks
                    </button>
                    <button className="text-sm font-medium text-gray-400 hover:text-gray-600 pb-4">
                        My Tasks
                    </button>
                    <button className="text-sm font-medium text-gray-400 hover:text-gray-600 pb-4">
                        Assigned
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setBoardView('list')}
                        className={`p-2 rounded-md transition-all ${boardView === 'list' ? 'text-black bg-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setBoardView('kanban')}
                        className={`p-2 rounded-md transition-all ${boardView === 'kanban' ? 'text-black bg-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Task View */}
            {boardView === 'list' ? (
                <CriticalTasksList 
                    tasks={allCurrentTasks} 
                    onTaskClick={handleTaskClick}
                />
            ) : (
                <KanbanBoard 
                    tasks={allCurrentTasks} 
                    onTaskClick={handleTaskClick}
                />
            )}

        </motion.div>

      </div>

      {/* The Work Drawer */}
      <WorkDrawer 
        isOpen={drawerMode !== null}
        onClose={handleCloseDrawer}
        mode={drawerMode}
        selectedTask={selectedTask}
        allTasks={allCurrentTasks}
        onNavigate={onNavigate}
        onUpdateTask={updateTask}
      />
    </div>
  );
}
