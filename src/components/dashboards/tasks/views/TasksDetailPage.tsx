import React from "react";
import { 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  Search, 
  Check, 
  Calendar, 
  User, 
  MoreHorizontal, 
  Plus 
} from "lucide-react";
import { FlowStep } from "../types";
import { GeminiHeader } from "../components/GeminiHeader";
import { WorkflowMiniNav } from "../components/WorkflowMiniNav";

export function TasksDetailPage({ 
  step, 
  siblings,
  onBack, 
  onSelectStep,
  onNavigate
}: { 
  step: FlowStep, 
  siblings: FlowStep[],
  onBack: () => void,
  onSelectStep: (step: FlowStep) => void,
  onNavigate?: (page: string) => void
}) {

  const handleTaskClick = (task: any) => {
    if (!onNavigate) return;
    
    // Agentic routing based on task ID
    if (task.id === 'dynamic-shotlist') onNavigate('shotlist');
    if (task.id === 'dynamic-talent') onNavigate('cura-casting');
    if (task.id === 'dynamic-samples') onNavigate('sample-tracker');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <button onClick={onBack} className="hover:text-indigo-600 transition-colors">Tasks & Deliverables</button>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium text-gray-900">{step.title}</span>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"><ArrowLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">{step.title} Tasks</h1>
          <p className="text-sm text-gray-500">Manage tasks for this phase.</p>
        </div>
      </div>

      <WorkflowMiniNav steps={siblings} activeStepId={step.id} onSelectStep={onSelectStep} />

      <GeminiHeader 
        title="Gemini Insights"
        description="AI suggests adding 2 buffer days for approvals based on current task velocity."
        actions={[{ label: "Generate Tasks", icon: Sparkles, primary: true }, { label: "Analyze Timeline", icon: Clock }]}
      />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {["All", "High Priority", "Due Soon", "Completed"].map((f, i) => (
            <button key={f} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${i===0 ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200"}`}>{f}</button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
        </div>
      </div>

      <div className="space-y-3">
        {step.tasks.map((task) => (
          <div 
            key={task.id} 
            onClick={() => handleTaskClick(task)}
            className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group ${['dynamic-shotlist', 'dynamic-talent', 'dynamic-samples'].includes(task.id) ? 'cursor-pointer hover:bg-gray-50' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${task.status === 'Completed' ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                  {task.status === 'Completed' && <Check className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <h3 className={`text-base font-medium mb-1 ${task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className={`px-2 py-0.5 rounded font-medium ${task.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>{task.priority}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {task.dueDate}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {task.owner}</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{task.category}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-300 hover:text-gray-600 p-2 opacity-0 group-hover:opacity-100"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
        <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2 font-medium text-sm">
          <Plus className="w-4 h-4" /> Add New Task
        </button>
      </div>
    </div>
  );
}
