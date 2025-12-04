import { DashboardHeader } from "./components/dashboard/DashboardHeader";
import { LeftSidebar } from "./components/dashboard/LeftSidebar";
import { HeroEventCard } from "./components/dashboard/HeroEventCard";
import { CriticalTasksGrid } from "./components/dashboard/CriticalTasksGrid";
import { SponsorProgressCard } from "./components/dashboard/SponsorProgressCard";
import { DeliverablesStatus } from "./components/dashboard/DeliverablesStatus";
import { VenueStatusCard } from "./components/dashboard/VenueStatusCard";
import { CastingSection } from "./components/dashboard/CastingSection";
import { ProcessNavigator } from "./components/dashboard/ProcessNavigator";
import { UpcomingMilestones } from "./components/dashboard/UpcomingMilestones";
import { AiReasoningPanel } from "./components/dashboard/AiReasoningPanel";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />

      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-[calc(100vw-20rem-20rem)]">
          {/* 1. Hero Event Summary Card */}
          <HeroEventCard />

          {/* 2. Critical Tasks Grid */}
          <CriticalTasksGrid />

          {/* 3. Three Column Layout: Sponsor + Deliverables + Venue */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SponsorProgressCard />
            </div>
            <div>
              <DeliverablesStatus />
            </div>
          </div>

          {/* 4. Venue + Casting Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VenueStatusCard />
            <CastingSection />
          </div>

          {/* 5. Process Navigator */}
          <ProcessNavigator />

          {/* 6. Upcoming Milestones */}
          <UpcomingMilestones />
        </main>

        {/* Right Sidebar - AI Reasoning Panel */}
        <AiReasoningPanel />
      </div>
    </div>
  );
}
