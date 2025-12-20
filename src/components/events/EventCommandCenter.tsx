import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EventHeader } from "./EventHeader";
import { KPICardsGrid } from "./KPICardsGrid";
import { WorkflowTimeline } from "./WorkflowTimeline";
import { AIInsightsPanel } from "./AIInsightsPanel";
import { TasksContainer } from "../tasks/TasksContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { fetchEventData } from "../../lib/api/events";
import { EventData } from "../../lib/types/events.types";

interface EventCommandCenterProps {
  eventId: string;
}

export function EventCommandCenter({ eventId }: EventCommandCenterProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [eventData, setEventData] = useState<EventData | null>(null);

  // Fetch event data on mount
  useEffect(() => {
    async function loadEventData() {
      try {
        setLoading(true);
        const data = await fetchEventData(eventId);
        setEventData(data);
      } catch (error) {
        console.error('Failed to load event data:', error);
        toast.error('Failed to load event data');
      } finally {
        setLoading(false);
      }
    }
    
    loadEventData();
  }, [eventId]);

  // Mock workflow phases
  const [workflowPhases] = useState([
    {
      id: "pre_production",
      name: "Pre-Production",
      dateRange: "60-90 days before",
      progress: 100,
      tasksComplete: 30,
      tasksTotal: 30,
      status: "complete" as const
    },
    {
      id: "venue_logistics",
      name: "Venue & Logistics",
      dateRange: "30-60 days before",
      progress: 72,
      tasksComplete: 20,
      tasksTotal: 28,
      status: "active" as const
    },
    {
      id: "creative_design",
      name: "Creative Design",
      dateRange: "15-30 days before",
      progress: 35,
      tasksComplete: 12,
      tasksTotal: 34,
      status: "active" as const
    },
    {
      id: "on_site",
      name: "On-Site Operations",
      dateRange: "1-7 days + event day",
      progress: 0,
      tasksComplete: 0,
      tasksTotal: 42,
      status: "locked" as const
    },
    {
      id: "post_event",
      name: "Post-Event",
      dateRange: "After completion",
      progress: 0,
      tasksComplete: 0,
      tasksTotal: 16,
      status: "locked" as const
    }
  ]);

  // Mock AI insights
  const [aiInsights] = useState([
    {
      id: "risk_1",
      severity: "critical" as const,
      category: "tasks",
      title: "3 Critical Path Tasks Overdue",
      description: "Tasks blocking event completion are past deadline. May delay event by 5 days if not resolved today.",
      impact: "HIGH",
      urgency: "now" as const,
      recommendedActions: [
        "Reassign 'Designer contracts' to assistant with urgent flag",
        "Upload venue floor plan to mark task complete",
        "Extend 'Lighting design' deadline by 2 days"
      ],
      riskScore: 95
    },
    {
      id: "risk_2",
      severity: "warning" as const,
      category: "budget",
      title: "Budget Variance Detected: Catering +15%",
      description: "Catering costs exceeding budget by $25K. May impact overall event profitability.",
      impact: "MEDIUM",
      urgency: "3_days" as const,
      recommendedActions: [
        "Review catering contract for cost overruns",
        "Negotiate menu adjustments with caterer",
        "Reallocate budget from marketing category"
      ],
      riskScore: 68
    },
    {
      id: "risk_3",
      severity: "suggestion" as const,
      category: "staffing",
      title: "2 Key Roles Unassigned",
      description: "Photographer and videographer positions still open. Recommend booking within 7 days for quality talent.",
      impact: "LOW",
      urgency: "7_days" as const,
      recommendedActions: [
        "Contact 3 recommended photographers from past events",
        "Post job on fashion industry job boards",
        "Reach out to university media departments"
      ],
      riskScore: 42
    }
  ]);

  // Calculate days until event
  const calculateDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilEvent = eventData ? calculateDaysUntil(eventData.start_date) : 0;

  // Navigation handlers
  const handleBack = () => {
    router.push("/events");
  };

  const handleEdit = () => {
    router.push(`/events/${eventId}/edit`);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleExport = () => {
    toast.info("Exporting event report...");
    // TODO: Implement PDF export
  };

  const handleArchive = () => {
    toast.warning("Archive functionality coming soon");
    // TODO: Implement archive with confirmation modal
  };

  const handleNavigate = (section: string) => {
    // Scroll to section or navigate to dedicated page
    switch (section) {
      case "tasks":
        setActiveTab("tasks");
        break;
      case "sponsors":
        router.push(`/events/${eventId}/sponsors`);
        break;
      case "budget":
        router.push(`/events/${eventId}/budget`);
        break;
      case "timeline":
        setActiveTab("overview");
        break;
      default:
        setActiveTab("overview");
    }
  };

  const handlePhaseClick = (phaseId: string) => {
    setActiveTab("tasks");
    toast.info(`Viewing tasks for ${phaseId} phase`);
    // TODO: Filter tasks by phase
  };

  const handleInsightRefresh = () => {
    toast.info("Analyzing event risks...");
    // TODO: Call Gemini API to regenerate insights
  };

  const handleInsightDismiss = (insightId: string) => {
    toast.success("Insight dismissed");
    // TODO: Mark insight as acknowledged in database
  };

  const handleInsightAction = (insightId: string, action: string) => {
    toast.info(`Taking action: ${action}`);
    // TODO: Navigate to relevant page or open modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Event Header (sticky) */}
      <EventHeader
        eventId={eventId}
        eventName={eventData?.name || "Loading..."}
        eventType={eventData?.type || "Loading..."}
        status={eventData?.status || "Loading..."}
        daysUntilEvent={daysUntilEvent}
        onBack={handleBack}
        onEdit={handleEdit}
        onShare={handleShare}
        onExport={handleExport}
        onArchive={handleArchive}
      />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-8">
            
            {/* KPI Cards Grid */}
            <section>
              <KPICardsGrid
                eventData={eventData}
                onNavigate={handleNavigate}
                loading={loading}
              />
            </section>

            {/* Workflow Timeline */}
            <section>
              <WorkflowTimeline
                phases={workflowPhases}
                onPhaseClick={handlePhaseClick}
              />
            </section>

            {/* AI Insights Panel */}
            <section>
              <AIInsightsPanel
                insights={aiInsights}
                loading={loading}
                lastUpdated={new Date()}
                onRefresh={handleInsightRefresh}
                onDismiss={handleInsightDismiss}
                onActionClick={handleInsightAction}
              />
            </section>
          </TabsContent>

          {/* TASKS TAB */}
          <TabsContent value="tasks">
            <TasksContainer
              eventId={eventId}
              onNavigate={handleNavigate}
            />
          </TabsContent>

          {/* INSIGHTS TAB */}
          <TabsContent value="insights">
            <AIInsightsPanel
              insights={aiInsights}
              loading={loading}
              lastUpdated={new Date()}
              onRefresh={handleInsightRefresh}
              onDismiss={handleInsightDismiss}
              onActionClick={handleInsightAction}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}