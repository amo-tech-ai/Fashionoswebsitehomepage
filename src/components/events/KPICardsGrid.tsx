import { 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  DollarSign, 
  UserCheck, 
  FileCheck 
} from "lucide-react";
import { KPICard } from "./KPICard";
import { Progress } from "../ui/progress";
import { EventData } from "../../lib/types/events.types";

interface KPICardsGridProps {
  eventData: EventData | null;
  onNavigate?: (section: string) => void;
  loading?: boolean;
}

export function KPICardsGrid({ eventData, onNavigate, loading = false }: KPICardsGridProps) {
  
  // Return loading skeletons if no data
  if (loading || !eventData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <KPICard key={i} loading={true} icon={TrendingUp} iconColor="" label="" value="" />
        ))}
      </div>
    );
  }

  // Calculate derived values
  const budgetUsedPercentage = Math.round((eventData.event.budget_actual / eventData.event.budget_total) * 100);
  const attendeePercentage = Math.round((eventData.event.attendee_registered / eventData.event.attendee_target) * 100);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sponsorsTotal = eventData.sponsors.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      
      {/* Card 1: Event Progress */}
      <KPICard
        icon={TrendingUp}
        iconColor="bg-blue-500"
        label="Event Progress"
        value={`${eventData.event.progress_percentage}%`}
        trend={{
          value: 12,
          label: "vs last week"
        }}
        onClick={() => onNavigate?.('timeline')}
      />

      {/* Card 2: Tasks */}
      <KPICard
        icon={CheckCircle2}
        iconColor="bg-green-500"
        label="Tasks"
        value={`${eventData.tasks_summary.done}/${eventData.tasks_summary.total}`}
        subtext={eventData.tasks_summary.overdue > 0 ? `${eventData.tasks_summary.overdue} overdue` : 'On track'}
        visual={
          <div className="space-y-1">
            <Progress 
              value={(eventData.tasks_summary.done / eventData.tasks_summary.total) * 100} 
              className="h-2"
            />
            {eventData.tasks_summary.overdue > 0 && (
              <div className="text-xs text-red-600">
                {eventData.tasks_summary.overdue} tasks need attention
              </div>
            )}
          </div>
        }
        onClick={() => onNavigate?.('tasks')}
      />

      {/* Card 3: Sponsors */}
      <KPICard
        icon={Users}
        iconColor="bg-purple-500"
        label="Sponsors"
        value={`${eventData.sponsors.length} confirmed`}
        subtext={`${formatCurrency(sponsorsTotal)} committed`}
        onClick={() => onNavigate?.('sponsors')}
      />

      {/* Card 4: Attendees */}
      <KPICard
        icon={UserCheck}
        iconColor="bg-orange-500"
        label="Attendees"
        value={`${eventData.event.attendee_registered} / ${eventData.event.attendee_target}`}
        subtext={`${attendeePercentage}% capacity`}
        visual={
          <Progress 
            value={attendeePercentage} 
            className="h-2"
          />
        }
        onClick={() => onNavigate?.('attendees')}
      />

      {/* Card 5: Budget */}
      <KPICard
        icon={DollarSign}
        iconColor={budgetUsedPercentage > 90 ? "bg-red-500" : budgetUsedPercentage > 70 ? "bg-yellow-500" : "bg-green-500"}
        label="Budget"
        value={`${budgetUsedPercentage}% used`}
        subtext={`${formatCurrency(eventData.event.budget_actual)} / ${formatCurrency(eventData.event.budget_total)}`}
        visual={
          <div className="space-y-1">
            <Progress 
              value={budgetUsedPercentage} 
              className="h-2"
            />
            {budgetUsedPercentage > 90 && (
              <div className="text-xs text-red-600">
                Budget alert: {budgetUsedPercentage - 100}% over
              </div>
            )}
          </div>
        }
        onClick={() => onNavigate?.('budget')}
      />

      {/* Card 6: Deliverables */}
      <KPICard
        icon={FileCheck}
        iconColor="bg-indigo-500"
        label="Deliverables"
        value={`${eventData.deliverables_summary.approved}/${eventData.deliverables_summary.total}`}
        subtext={`${Math.round((eventData.deliverables_summary.approved / eventData.deliverables_summary.total) * 100)}% complete`}
        visual={
          <Progress 
            value={(eventData.deliverables_summary.approved / eventData.deliverables_summary.total) * 100} 
            className="h-2"
          />
        }
        onClick={() => onNavigate?.('deliverables')}
      />
    </div>
  );
}