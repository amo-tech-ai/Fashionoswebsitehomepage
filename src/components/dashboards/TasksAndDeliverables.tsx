import { useState } from "react";
import { 
  Plus, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreHorizontal, 
  Calendar,
  Sparkles,
  Search,
  ChevronRight,
  Columns,
  List,
  User,
  FileText,
  ArrowRight,
  Lightbulb,
  Palette,
  Settings,
  X,
  Loader2,
  Check,
  ClipboardCheck,
  Building2,
  Zap,
  BarChart3,
  LayoutTemplate,
  ArrowLeft,
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
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---

type Priority = 'High' | 'Medium' | 'Low';
type Status = 'Backlog' | 'In Progress' | 'Review' | 'Completed';
type DeliverableStatus = 'Pending' | 'In Progress' | 'Completed';
type ViewState = 'dashboard' | 'tasks-detail' | 'deliverables-detail';
type WorkflowCategory = 'event-planning' | 'sponsorship' | 'marketing' | 'operations' | 'media';

interface Task {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  owner: string;
  status: Status;
  category: string;
}

interface Deliverable {
  id: string;
  name: string;
  sponsor: string;
  event: string;
  dueDate: string;
  status: DeliverableStatus;
  type: string;
  owner: string;
}

interface FlowStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: any;
  tasks: Task[];
  deliverables: Deliverable[];
}

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

const eventPlanningSteps: FlowStep[] = [
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

const sponsorshipSteps: FlowStep[] = [
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

const marketingSteps: FlowStep[] = [
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

const operationsSteps: FlowStep[] = [
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

const mediaSteps: FlowStep[] = [
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

const workflows: Record<WorkflowCategory, FlowStep[]> = {
  'event-planning': eventPlanningSteps,
  'sponsorship': sponsorshipSteps,
  'marketing': marketingSteps,
  'operations': operationsSteps,
  'media': mediaSteps
};

// --- Shared Components ---

function GeminiHeader({ 
  title, 
  description,
  actions 
}: { 
  title: string, 
  description: string,
  actions: { label: string, icon: any, primary?: boolean }[]
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden mb-8">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
            <Sparkles className="w-6 h-6 text-indigo-200" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-medium mb-1">{title}</h2>
                <p className="text-indigo-200 text-sm max-w-2xl">{description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {actions.map((action, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => setIsProcessing(false), 1500);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      action.primary 
                        ? "bg-white text-indigo-900 hover:bg-indigo-50 shadow-lg shadow-indigo-900/20" 
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    {isProcessing && action.primary ? <Loader2 className="w-4 h-4 animate-spin" /> : <action.icon className="w-4 h-4" />}
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowMiniNav({ 
  steps, 
  activeStepId, 
  onSelectStep 
}: { 
  steps: FlowStep[], 
  activeStepId: string, 
  onSelectStep: (step: FlowStep) => void 
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
      {steps.map((step) => {
        const isActive = step.id === activeStepId;
        const Icon = step.icon;
        return (
          <button
            key={step.id}
            onClick={() => onSelectStep(step)}
            className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all min-w-[200px] ${
              isActive 
                ? "bg-white border-indigo-200 shadow-md ring-1 ring-indigo-50" 
                : "bg-white/50 border-gray-200 hover:bg-white hover:border-gray-300"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isActive ? "bg-indigo-50 text-indigo-600" : "bg-gray-50 text-gray-500"
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className={`text-[10px] font-bold uppercase tracking-wider ${
                isActive ? "text-indigo-600" : "text-gray-400"
              }`}>
                Step {step.stepNumber}
              </div>
              <div className={`text-xs font-bold truncate max-w-[120px] ${
                isActive ? "text-gray-900" : "text-gray-600"
              }`}>
                {step.title}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ProjectFlowCard({ 
  step, 
  onViewTasks, 
  onViewDeliverables 
}: { 
  step: FlowStep, 
  onViewTasks: () => void, 
  onViewDeliverables: () => void 
}) {
  const Icon = step.icon;
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden h-full min-w-[240px]"
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex items-center justify-center mb-4 shadow-sm">
           <Icon className="w-5 h-5 text-indigo-600 stroke-1.5" />
        </div>
        <div className="mb-2">
           <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100">Step {step.stepNumber}</span>
        </div>
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{step.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">{step.description}</p>
        
        <div className="pt-4 border-t border-gray-50 space-y-3">
           <button 
             onClick={onViewTasks}
             className="w-full py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
           >
             View Tasks <ArrowRight className="w-3 h-3" />
           </button>
           <button 
             onClick={onViewDeliverables}
             className="w-full text-center text-xs text-gray-500 hover:text-indigo-600 transition-colors font-medium"
           >
             View {step.deliverables.length} Deliverables
           </button>
        </div>
      </div>
      <div className="h-1 w-full bg-gray-100">
         <div className="h-full bg-indigo-400 w-1/3 rounded-r-full" />
      </div>
    </motion.div>
  );
}

// --- Detail Pages ---

function TasksDetailPage({ 
  step, 
  siblings,
  onBack, 
  onSelectStep 
}: { 
  step: FlowStep, 
  siblings: FlowStep[],
  onBack: () => void,
  onSelectStep: (step: FlowStep) => void
}) {
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
          <div key={task.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group">
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

function DeliverablesDetailPage({ 
  step, 
  siblings,
  onBack, 
  onSelectStep 
}: { 
  step: FlowStep, 
  siblings: FlowStep[],
  onBack: () => void,
  onSelectStep: (step: FlowStep) => void
}) {
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
          <h1 className="text-2xl font-serif font-bold text-gray-900">{step.title} Deliverables</h1>
          <p className="text-sm text-gray-500">Track approvals and assets.</p>
        </div>
      </div>

      <WorkflowMiniNav steps={siblings} activeStepId={step.id} onSelectStep={onSelectStep} />

      <GeminiHeader 
        title="Deliverables Risk Analysis"
        description="Gemini has detected 1 overdue item. It can draft a follow-up email."
        actions={[{ label: "Suggest Deliverables", icon: Lightbulb, primary: true }, { label: "Draft Follow-up", icon: FileText }]}
      />

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-gray-500 font-medium">
              <th className="px-6 py-4 font-serif text-gray-900">Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {step.deliverables.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-gray-600">{item.type}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{item.dueDate}</td>
                <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">{item.owner.charAt(0)}</div>
                  {item.owner}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>{item.status}</span>
                </td>
                <td className="px-6 py-4 text-right"><button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100"><MoreHorizontal className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Deliverable</button>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---

function KPICard({ title, count, color, icon: Icon }: { title: string, count: number, color: string, icon: any }) {
  const colorClasses: Record<string, string> = {
    red: "bg-rose-50 border-rose-100 text-rose-900",
    amber: "bg-amber-50 border-amber-100 text-amber-900",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-900"
  };
  return (
    <div className={`p-5 rounded-xl border ${colorClasses[color]} shadow-sm flex flex-col justify-between min-h-[100px] relative overflow-hidden group`}>
      <div className="flex justify-between items-start z-10">
        <span className="text-xs font-bold uppercase tracking-wide opacity-80">{title}</span>
        <Icon className="w-4 h-4 opacity-80" />
      </div>
      <div className="mt-2 z-10"><span className="text-3xl font-serif font-medium">{count}</span></div>
    </div>
  );
}

function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const columns = ['Backlog', 'In Progress', 'Review', 'Completed'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] overflow-hidden">
      {columns.map(col => (
        <div key={col} className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-gray-900">{col}</h3>
            <span className="text-xs text-gray-400">{tasks.filter(t => t.status === col).length}</span>
          </div>
          <div className="flex-1 bg-gray-50/50 rounded-xl p-2 border border-gray-100 overflow-y-auto space-y-2">
            {tasks.filter(t => t.status === col).map(t => (
              <div key={t.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-sm">
                <div className="font-medium text-gray-900 mb-1">{t.title}</div>
                <div className="flex items-center justify-between">
                   <span className={`text-[10px] px-1.5 py-0.5 rounded ${t.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-500'}`}>{t.priority}</span>
                   <span className="text-[10px] text-gray-400">{t.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TasksAndDeliverables({ initialTab = 'event-planning' }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState<WorkflowCategory>(initialTab as WorkflowCategory);
  const [view, setView] = useState<ViewState>('dashboard');
  const [activeStep, setActiveStep] = useState<FlowStep | null>(null);

  // Helper: Get current workflow steps
  const currentSteps = workflows[activeTab];

  // Helper: Get ALL tasks from current workflow for global views
  const allCurrentTasks = currentSteps.flatMap(s => s.tasks);

  const tabs: { id: WorkflowCategory, label: string, icon: any }[] = [
    { id: 'event-planning', label: 'Event Planning', icon: ClipboardCheck },
    { id: 'sponsorship', label: 'Sponsorship', icon: Briefcase },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'operations', label: 'Operations', icon: Settings },
    { id: 'media', label: 'Media & Content', icon: Camera },
  ];

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
            <motion.div key="dashboard" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-8">
              
              {/* Workflow Row */}
              <div>
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-lg font-serif font-bold text-gray-900">{tabs.find(t => t.id === activeTab)?.label} Flow</h2>
                   <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                      <Sparkles className="w-3.5 h-3.5" /> Gemini Active
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
                   {currentSteps.map(step => (
                      <ProjectFlowCard 
                        key={step.id} 
                        step={step} 
                        onViewTasks={() => { setActiveStep(step); setView('tasks-detail'); }}
                        onViewDeliverables={() => { setActiveStep(step); setView('deliverables-detail'); }}
                      />
                   ))}
                </div>
              </div>

              <div className="h-px bg-gray-200 w-full" />

              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard title="High Priority" count={allCurrentTasks.filter(t => t.priority === 'High').length} color="red" icon={AlertCircle} />
                <KPICard title="In Progress" count={allCurrentTasks.filter(t => t.status === 'In Progress').length} color="amber" icon={Clock} />
                <KPICard title="Completed" count={allCurrentTasks.filter(t => t.status === 'Completed').length} color="emerald" icon={CheckCircle2} />
              </div>

              {/* Global Kanban */}
              <div>
                 <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Active Task Board</h3>
                 <KanbanBoard tasks={allCurrentTasks} />
              </div>
            </motion.div>
          )}

          {view === 'tasks-detail' && activeStep && (
            <motion.div key="tasks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <TasksDetailPage 
                step={activeStep} 
                siblings={currentSteps}
                onBack={() => { setView('dashboard'); setActiveStep(null); }} 
                onSelectStep={setActiveStep}
              />
            </motion.div>
          )}

          {view === 'deliverables-detail' && activeStep && (
            <motion.div key="deliverables" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <DeliverablesDetailPage 
                step={activeStep} 
                siblings={currentSteps}
                onBack={() => { setView('dashboard'); setActiveStep(null); }} 
                onSelectStep={setActiveStep}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
