import { useState } from "react";
import { 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { useBrandShoot } from '../../context/BrandShootContext';
import { 
  Task, 
  ViewState, 
  WorkflowCategory, 
  FlowStep 
} from "./tasks/types";
import { 
  workflows, 
  tabs 
} from "./tasks/data";
import { GeminiHeader } from "./tasks/components/GeminiHeader";
import { ProjectFlowCard } from "./tasks/components/ProjectFlowCard";
import { KPICard } from "./tasks/components/KPICard";
import { KanbanBoard } from "./tasks/components/KanbanBoard";
import { TasksDetailPage } from "./tasks/views/TasksDetailPage";
import { DeliverablesDetailPage } from "./tasks/views/DeliverablesDetailPage";

export function TasksAndDeliverables({ initialTab = 'event-planning', onNavigate }: { initialTab?: string, onNavigate?: (page: string) => void }) {
  const { productionChecklist, shotList, sampleList } = useBrandShoot();
  const [activeTab, setActiveTab] = useState<WorkflowCategory>(initialTab as WorkflowCategory);
  const [view, setView] = useState<ViewState>('dashboard');
  const [activeStep, setActiveStep] = useState<FlowStep | null>(null);

  // --- Dynamic Task Injection ---
  // We inject tasks based on the BrandShootContext state into the 'operations' workflow
  // This simulates the "Agentic" behavior where the system creates work for humans.
  
  const dynamicOpsTasks: Task[] = [];
  
  if (!productionChecklist.shotListLocked) {
    dynamicOpsTasks.push({
      id: 'dynamic-shotlist',
      title: 'Finalize Shot List (Requires Approval)',
      priority: 'High',
      dueDate: 'Today',
      owner: 'Producer',
      status: 'In Progress',
      category: 'Production'
    });
  }

  if (!productionChecklist.talentConfirmed) {
    dynamicOpsTasks.push({
      id: 'dynamic-talent',
      title: 'Confirm Talent Booking',
      priority: 'High',
      dueDate: 'Tomorrow',
      owner: 'Casting Director',
      status: 'Backlog',
      category: 'Casting'
    });
  }

  if (sampleList.some(s => s.status === 'awaiting')) {
     dynamicOpsTasks.push({
      id: 'dynamic-samples',
      title: `Check-in ${sampleList.filter(s => s.status === 'awaiting').length} Samples`,
      priority: 'Medium',
      dueDate: 'This Week',
      owner: 'Stylist',
      status: 'In Progress',
      category: 'Logistics'
    });
  }

  // Inject into workflows object (specifically Operations for this demo)
  // We clone the steps to avoid mutation issues in strict mode
  const currentStepsRaw = workflows[activeTab];
  const currentSteps = currentStepsRaw.map(step => {
      if (activeTab === 'operations' && step.stepNumber === 1) {
          return { ...step, tasks: [...step.tasks, ...dynamicOpsTasks] };
      }
      return step;
  });

  // Helper: Get ALL tasks from current workflow for global views
  const allCurrentTasks = currentSteps.flatMap(s => s.tasks);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">Tasks & Deliverables</h1>
                <p className="text-sm text-gray-500">Centralized workflow management.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Search className="w-5 h-5" /></button>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> New Task</button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide -mb-4 pt-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setView('dashboard'); }}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-gray-900 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              
              {/* Top Section: Overview */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Workflow Progress */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Workflow Stages</h2>
                    <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                      {currentSteps.length} Steps
                    </span>
                  </div>
                  
                  {/* Scrollable Flow Cards */}
                  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {currentSteps.map((step) => (
                      <div key={step.id} className="snap-start h-full">
                        <ProjectFlowCard 
                          step={step}
                          onViewTasks={() => {
                            setActiveStep(step);
                            setView('tasks-detail');
                          }}
                          onViewDeliverables={() => {
                            setActiveStep(step);
                            setView('deliverables-detail');
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* KPI & Quick Stats */}
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-gray-900">At a Glance</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <KPICard title="Total Tasks" count={allCurrentTasks.length} color="amber" icon={CheckCircle2} />
                    <KPICard title="Pending" count={allCurrentTasks.filter(t => t.status !== 'Completed').length} color="red" icon={Clock} />
                    <KPICard title="Completed" count={allCurrentTasks.filter(t => t.status === 'Completed').length} color="emerald" icon={CheckCircle2} />
                    <KPICard title="At Risk" count={2} color="red" icon={AlertCircle} />
                  </div>
                  
                  {/* Gemini Card */}
                  <div className="pt-2">
                    <GeminiHeader 
                      title="Workflow Intelligence" 
                      description="3 tasks in 'Pre-Production' are blocking 'Logistics'. Recommend prioritizing vendor contracts."
                      actions={[{ label: "Auto-Prioritize", icon: Sparkles, primary: true }]}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Section: Kanban or List */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Task Board</h2>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    {/* View toggles could go here */}
                  </div>
                </div>
                <KanbanBoard tasks={allCurrentTasks} />
              </div>

            </motion.div>
          )}

          {view === 'tasks-detail' && activeStep && (
            <TasksDetailPage 
              key="tasks-detail"
              step={activeStep}
              siblings={currentSteps}
              onBack={() => setView('dashboard')}
              onSelectStep={(s) => setActiveStep(s)}
              onNavigate={onNavigate}
            />
          )}

          {view === 'deliverables-detail' && activeStep && (
            <DeliverablesDetailPage 
              key="deliverables-detail"
              step={activeStep}
              siblings={currentSteps}
              onBack={() => setView('dashboard')}
              onSelectStep={(s) => setActiveStep(s)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
