import { useState, useEffect } from "react";
import { AppShell } from "./components/shared/AppShell";
import { NavigationBar } from "./components/shared/NavigationBar";
import { Footer } from "./components/Footer";
import AppHome from "./AppHome";
import HomePageV2 from "./HomePageV2";
import HomePageV3 from "./HomePageV3";
import Services from "./Services";
import Clothing from "./Clothing";
import Product from "./Product";
import VideoServices from "./Video";
import AmazonServices from "./Amazon";
import InstagramServices from "./Instagram";
import WebDesignServices from "./WebDesignServices";
import WebsiteWizard from "./WebsiteWizard";
import { DesignerWizard } from "./components/designer-wizard/DesignerWizard";
import Studios from "./Studios";
import ShootWizard, { WizardState } from "./ShootWizard";
import Directory from "./Directory";
import DirectoryDetail from "./DirectoryDetail";
import EventDetail from "./EventDetail";
import Events from "./Events";
import { ProjectOverview } from "./components/dashboards/ProjectOverview";
import { ShotListBuilder } from "./components/dashboards/ShotListBuilder";
import { ProductsDashboard } from "./components/dashboards/ProductsDashboard";
import { GalleryDashboard } from "./components/dashboards/GalleryDashboard";
import { ClientDashboard } from "./components/dashboards/ClientDashboard";
import { BillingDashboard } from "./components/dashboards/BillingDashboard";
import { CommandCenter } from "./components/dashboards/CommandCenter";
import { RunwayStage } from "./components/dashboards/RunwayStage";
import { CastingModels } from "./components/dashboards/CastingModels";
import { DesignerCollection } from "./components/dashboards/DesignerCollection";
import { VenueManagement } from "./components/dashboards/VenueManagement";
import { ROIAnalytics } from "./components/dashboards/ROIAnalytics";
import { EventCreationWizard } from "./components/wizards/EventCreationWizard";
import { DirectoryProfileWizard } from "./components/wizards/DirectoryProfileWizard";
import { ContractsManager } from "./components/dashboards/ContractsManager";
import { ActivationsManager } from "./components/dashboards/ActivationsManager";
import { TasksAndDeliverables } from "./components/dashboards/TasksAndDeliverables";
import { SponsorCRMv2 } from "./components/dashboards/SponsorCRMv2";
import { SponsorProfile } from "./components/dashboards/SponsorProfile";

import { SponsorDetail } from "./components/sponsors/SponsorDetail";
import { DesignerDirectory } from "./components/designers/DesignerDirectory";
import { DesignerProfile } from "./components/designers/DesignerProfile";
import { BrandProfileDashboard } from "./components/dashboards/BrandProfileDashboard";

import { BudgetManager } from "./components/dashboards/finance/BudgetManager";
import { ContractAnalyzer } from "./components/dashboards/finance/ContractAnalyzer";

import EcommercePhotography from "./EcommercePhotography";
import StyleGuide from "./components/StyleGuide";

import { SiteArchitecture } from "./components/SiteArchitecture";
import { ProposalPreview } from "./components/commerce/ProposalPreview";
import { BookingFlow } from "./components/commerce/BookingFlow";

import { BrandShootStart } from "./components/brand-shoot/BrandShootStart";
import { BrandSignalCapture } from "./components/brand-shoot/BrandSignalCapture";
import { AIThinking } from "./components/brand-shoot/AIThinking";
import { CampaignSummary } from "./components/brand-shoot/CampaignSummary";
import { ProposalConfirmation } from "./components/brand-shoot/ProposalConfirmation";
import { AIOptimizationCenter } from "./components/brand-shoot/AIOptimizationCenter";
import { SmartSampleTracker } from "./components/production/SmartSampleTracker";
import { DynamicCallSheet } from "./components/production/DynamicCallSheet";
import { CuraCasting } from "./components/casting/CuraCasting";
import { CastingAvailability } from "./components/casting/CastingAvailability";
import { CastingMatchmaker } from "./components/casting/CastingMatchmaker";
import { ScoutSetup } from "./components/scout/ScoutSetup";
import { ScoutFinder } from "./components/scout/ScoutFinder";
import { ScoutShortlist } from "./components/scout/ScoutShortlist";
import { ProposalReady } from "./components/workflow/ProposalReady";
import { ProductionTimeline } from "./components/workflow/ProductionTimeline";

import { BrandShootProvider, useBrandShoot } from "./context/BrandShootContext";
import { SponsorProvider } from "./context/SponsorContext";
import { EventProvider } from "./context/EventContext";
import { AgentProvider } from "./lib/ai/AgentContext";
import { AssistantShell } from "./components/assistant/AssistantShell";
import { AICopilotDrawer } from "./components/shared/AICopilotDrawer";

import SponsorshipPage from "./components/pages/SponsorshipPage";
import SponsorshipPageV2 from "./components/pages/SponsorshipPageV2";
import SponsorshipPageV3 from "./components/pages/SponsorshipPageV3";
import SponsorshipPageV5 from "./components/pages/SponsorshipPageV5";
import ElectronicsSponsorshipPage from "./components/pages/ElectronicsSponsorshipPage";
import ElectronicsSponsorshipPageV2 from "./components/pages/ElectronicsSponsorshipPageV2";
import BeautySponsorshipPage from "./components/pages/BeautySponsorshipPage";
import AutomotiveSponsorshipPage from "./components/pages/AutomotiveSponsorshipPage";
import RealEstateSponsorshipPage from "./components/pages/RealEstateSponsorshipPage";

function AppContent() {
  const { setWizardData, wizardData } = useBrandShoot();
  const [activeScreen, setActiveScreen] = useState("home-v3");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation function that updates BOTH state and URL
  const handleNavigate = (screen: string) => {
    setActiveScreen(screen);
    window.history.pushState({}, "", `/${screen}`);
  };

  // Handle initial URL load and browser back/forward
  useEffect(() => {
    const handlePathChange = () => {
      const path = window.location.pathname.toLowerCase();
      // Simple routing logic based on path
      if (path === "/" || path === "/home") setActiveScreen("home-v3");
      else if (path === "/home-v2" || path === "/v2") setActiveScreen("home-v2");
      else if (path === "/home-v3" || path === "/v3") setActiveScreen("home-v3");
      else if (path.includes("/services") || path === "/photography") setActiveScreen("photography");
      else if (path.includes("/clothing")) setActiveScreen("clothing");
      else if (path.includes("/product") && !path.includes("products")) setActiveScreen("product");
      else if (path.includes("/ecommerce-photography")) setActiveScreen("ecommerce-photography");
      else if (path.includes("/video")) setActiveScreen("video");
      else if (path.includes("/amazon")) setActiveScreen("amazon");
      else if (path.includes("/instagram")) setActiveScreen("instagram");
      else if (path.includes("/website-brief")) setActiveScreen("website-brief-dashboard");
      else if (path.includes("/website-wizard")) setActiveScreen("website-wizard");
      else if (path.includes("/style-guide")) setActiveScreen("style-guide");
      else if (path.includes("/designer-wizard")) setActiveScreen("designer-wizard");
      else if (path.includes("/brand-profile-dashboard")) setActiveScreen("brand-profile-dashboard");
      else if (path.includes("/web-design")) setActiveScreen("webdesign");
      else if (path.includes("/wizard") || path.includes("/shoot")) setActiveScreen("wizard");
      else if (path.includes("/studios") || path === "/studio") setActiveScreen("studio");
      else if (path.includes("/directory")) {
        setActiveScreen(path.includes("detail") ? "directorydetail" : "directory");
      }
      // Explicit dashboard route for Events Schedule
      else if (path === "/events-list") setActiveScreen("events-list");
      else if (path.includes("/events") || path.includes("/event-wizard")) {
        if (path.includes("create") || path.includes("wizard")) setActiveScreen("event-wizard");
        else setActiveScreen(path.includes("detail") ? "eventdetail" : "events");
      }
      // Dashboard Routing
      else if (path.includes("/tasks") || path.includes("/deliverables")) setActiveScreen("tasks");
      else if (path.includes("/contracts")) setActiveScreen("contracts");
      else if (path.includes("/analytics") || path.includes("/roi")) setActiveScreen("analytics");
      else if (path.includes("/command-center")) setActiveScreen("command-center");
      else if (path.includes("/overview") || path.includes("/dashboard")) setActiveScreen("overview");
      else if (path.includes("/shotlist")) setActiveScreen("shotlist");
      else if (path.includes("/products")) setActiveScreen("products");
      else if (path.includes("/gallery")) setActiveScreen("gallery");
      else if (path.includes("/clients")) setActiveScreen("clients");
      else if (path.includes("/billing")) setActiveScreen("billing");
      else if (path.includes("/sponsors")) {
        setActiveScreen(path.includes("profile") ? "sponsor-profile" : "sponsors");
      }
      else if (path === "/sponsorship") setActiveScreen("sponsorship");
      else if (path === "/sponsorship-v2") setActiveScreen("sponsorship-v2");
      else if (path === "/sponsorship-v3") setActiveScreen("sponsorship-v3");
      else if (path === "/sponsorship-v5") setActiveScreen("sponsorship-v5");
      else if (path === "/sponsors/cosmetics") setActiveScreen("sponsors/cosmetics");
      else if (path === "/sponsors/electronics") setActiveScreen("sponsors/electronics");
      else if (path === "/sponsors/electronics-v2") setActiveScreen("sponsors/electronics-v2");
      else if (path === "/sponsors/beauty") setActiveScreen("sponsors/beauty");
      else if (path === "/sponsors/automotive") setActiveScreen("sponsors/automotive");
      else if (path === "/sponsors/real-estate") setActiveScreen("sponsors/real-estate");
      else if (path.includes("/architecture")) setActiveScreen("architecture");
      else if (path.includes("/proposal")) setActiveScreen("proposal");
      else if (path.includes("/booking")) setActiveScreen("booking");
      
      // Brand Shoot AI Flow
      else if (path === "/start") setActiveScreen("brand-shoot-start");
      else if (path.includes("/brand-signal-capture")) setActiveScreen("brand-signal-capture");
      else if (path.includes("/ai-thinking")) setActiveScreen("ai-thinking");
      else if (path.includes("/campaign-summary")) setActiveScreen("campaign-summary");
      else if (path.includes("/proposal-confirmation")) setActiveScreen("proposal-confirmation");
      else if (path.includes("/ai-optimization")) setActiveScreen("ai-optimization");
      else if (path.includes("/sample-tracker")) setActiveScreen("sample-tracker");
      else if (path.includes("/call-sheet")) setActiveScreen("call-sheet");
      // Unified Casting Route
      else if (path.includes("/casting")) setActiveScreen("casting");
      else if (path.includes("/casting-availability")) setActiveScreen("casting-availability");
      else if (path.includes("/casting-matchmaker")) setActiveScreen("casting-matchmaker");
      else if (path.includes("/scout/setup")) setActiveScreen("scout-setup");
    };

    handlePathChange();
    window.addEventListener("popstate", handlePathChange);
    return () => window.removeEventListener("popstate", handlePathChange);
  }, []);

  const renderContent = () => {
    switch (activeScreen) {
      // Marketing Pages
      case "home":
        return <AppHome />;
      case "home-v2":
        return <HomePageV2 />;
      case "home-v3":
        return <HomePageV3 />;
      case "photography":
        return <Services />;
      case "clothing":
        return <Clothing />;
      case "product":
        return <Product />;
      case "ecommerce-photography":
        return <EcommercePhotography />;
      case "video":
        return <VideoServices />;
      case "amazon":
        return <AmazonServices />;
      case "instagram":
        return <InstagramServices />;
      case "webdesign":
        return <WebDesignServices />;
      case "website-wizard":
        return <WebsiteWizard />;
      case "designer-wizard":
        return <DesignerWizard onComplete={() => handleNavigate("brand-profile-dashboard")} />;
      case "brand-profile-dashboard":
        return <BrandProfileDashboard onNavigate={handleNavigate} />;
      case "website-brief-dashboard":
        return <WebsiteWizard initialStep={9} />;
      case "style-guide":
        return <StyleGuide />;
      case "wizard":
        return <ShootWizard onComplete={(data) => { setWizardData(data); handleNavigate("proposal"); }} />;
      case "studio":
        return <Studios />;
      case "directory":
        return <Directory />;
      case "directorydetail":
        return <DirectoryDetail />;
      case "events":
        return <Events />;
      case "eventdetail":
        return <EventDetail />;
      
      // Dashboard Pages
      case "event-wizard":
        return <EventCreationWizard onComplete={() => handleNavigate("events")} />;
      case "directory-wizard":
        return <DirectoryProfileWizard onComplete={() => handleNavigate("overview")} />;
      case "overview":
        return <ProjectOverview onNavigate={handleNavigate} />;
      case "shotlist":
        return <ShotListBuilder onBack={() => handleNavigate('production-timeline')} />;
      case "products":
        return <ProductsDashboard />;
      case "gallery":
        return <GalleryDashboard />;
      case "clients":
        return <ClientDashboard />;
      case "billing":
        return <BudgetManager />;
      case "command-center":
        return <CommandCenter onNavigate={handleNavigate} />;
      case "runway":
        return <RunwayStage />;
      case "casting":
        return <CuraCasting onNavigate={handleNavigate} />;
      case "designer":
        return <DesignerCollection />;
      case "venues":
        return <VenueManagement onNavigate={handleNavigate} />;
      case "activations":
        return <ActivationsManager />;
      case "tasks":
      case "tasks-event-planning":
      case "tasks-sponsorship":
      case "tasks-marketing":
      case "tasks-operations":
      case "tasks-media":
        const taskTab = activeScreen.startsWith('tasks-') ? activeScreen.replace('tasks-', '') : 'event-planning';
        return <TasksAndDeliverables initialTab={taskTab} onNavigate={handleNavigate} />;
      case "sponsor-detail":
        return <SponsorDetail onNavigate={handleNavigate} />;
      case "contracts":
        return <ContractAnalyzer />;
      case "analytics":
        return <ROIAnalytics onNavigate={handleNavigate} />;
      case "events-list":
        return <Events />;
      case "sponsors":
        return <SponsorCRMv2 onNavigate={handleNavigate} />;
      case "sponsor-profile":
        return <SponsorProfile onNavigate={handleNavigate} />;
      case "designers":
        return <DesignerDirectory onNavigate={handleNavigate} />;
      case "designer-profile":
        return <DesignerProfile onNavigate={handleNavigate} />;
      case "architecture":
        return <SiteArchitecture />;
      case "proposal":
        return <ProposalPreview onNavigate={handleNavigate} proposalData={wizardData} />;
      case "sponsorship":
        return <SponsorshipPage />;
      case "sponsorship-v2":
        return <SponsorshipPageV2 />;
      case "sponsorship-v3":
        return <SponsorshipPageV3 />;
      case "sponsorship-v5":
        return <SponsorshipPageV5 />;
      case "sponsors/cosmetics":
        return <SponsorshipPageV5 />; // Temporary - using V5 as placeholder
      case "sponsors/electronics":
        return <ElectronicsSponsorshipPage />;
      case "sponsors/electronics-v2":
        return <ElectronicsSponsorshipPageV2 />;
      case "sponsors/beauty":
        return <BeautySponsorshipPage />;
      case "sponsors/automotive":
        return <AutomotiveSponsorshipPage />;
      case "sponsors/real-estate":
        return <RealEstateSponsorshipPage />;
      case "booking":
        return <BookingFlow onNavigate={handleNavigate} />;

      // Brand Shoot AI Flow
      case "brand-shoot-start":
        return <BrandShootStart onNavigate={handleNavigate} />;
      case "brand-signal-capture":
        return <BrandSignalCapture onNavigate={handleNavigate} />;
      case "ai-thinking":
        return <AIThinking onNavigate={handleNavigate} />;
      case "campaign-summary":
        return <CampaignSummary onNavigate={handleNavigate} />;
      case "proposal-confirmation":
        return <ProposalConfirmation onNavigate={handleNavigate} />;
      case "ai-optimization":
        return <AIOptimizationCenter onNavigate={handleNavigate} />;
      case "sample-tracker":
        return <SmartSampleTracker onBack={() => handleNavigate('production-timeline')} />;
      case "call-sheet":
        return <DynamicCallSheet onBack={() => handleNavigate('production-timeline')} />;
      case "casting-availability":
        return <CastingAvailability onNavigate={handleNavigate} />;
      case "casting-matchmaker":
        return <CastingMatchmaker onNavigate={handleNavigate} />;
      case "scout-setup":
        return <ScoutSetup onNavigate={handleNavigate} />;
      case "scout-finder":
        return <ScoutFinder onNavigate={handleNavigate} />;
      case "scout-shortlist":
        return <ScoutShortlist onNavigate={handleNavigate} />;
      case "proposal-ready":
        return <ProposalReady onNavigate={handleNavigate} />;
      case "production-timeline":
        return <ProductionTimeline onNavigate={handleNavigate} />;
      
      default:
        return <HomePageV3 />;
    }
  };

  // Determine if current page is a marketing page (no top nav needed)
  const isMarketingPage = [
    "home", "home-v2", "home-v3", 
    "photography", "ecommerce-photography", "clothing", "product", 
    "video", "amazon", "instagram", "webdesign", "studio", 
    "directory", "directorydetail", "events", "eventdetail", 
    "style-guide", "architecture", 
    "sponsorship", "sponsorship-v2", "sponsorship-v3", "sponsorship-v5",
    "sponsors/cosmetics", "sponsors/electronics", "sponsors/electronics-v2", "sponsors/beauty", "sponsors/automotive", "sponsors/real-estate"
  ].includes(activeScreen);

  // Determine if we should hide the sidebar (e.g. for the full-screen wizard)
  const isFullScreen = activeScreen === "wizard" || activeScreen === "website-wizard" || activeScreen === "designer-wizard" || activeScreen === "event-wizard" || activeScreen === "directory-wizard" || activeScreen === "proposal" || activeScreen === "booking" || 
    activeScreen === "brand-shoot-start" || activeScreen === "brand-signal-capture" || activeScreen === "ai-thinking" || activeScreen === "campaign-summary" || activeScreen === "proposal-confirmation" || activeScreen === "ai-optimization" || activeScreen === "sample-tracker" || activeScreen === "casting-matchmaker" || activeScreen === "scout-setup" || activeScreen === "scout-finder" || activeScreen === "scout-shortlist" || activeScreen === "proposal-ready" || activeScreen === "production-timeline";

  // Use AppShell for application pages, standard layout for marketing pages
  if (isMarketingPage || isFullScreen) {
     return (
       <div className="min-h-screen bg-white">
          {/* Navigation Bar for Marketing Pages */}
          {!isFullScreen && (
            <>
               <NavigationBar 
                activeScreen={activeScreen}
                onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
              {/* Mobile Menu Button - Redundant if NavigationBar handles it, but keeping for safety if Nav is hidden */}
              <div className="lg:hidden fixed top-4 left-4 z-30">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 border border-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </>
          )}

          {renderContent()}

          {!isFullScreen && (
            <div className="mt-20">
               <Footer onNavigate={handleNavigate} activeScreen={activeScreen} />
            </div>
          )}
          
          <AssistantShell currentRoute={activeScreen} onNavigate={handleNavigate} />
          <AICopilotDrawer />
       </div>
     )
  }

  // Application / Dashboard Pages
  return (
    <AppShell 
      activeScreen={activeScreen} 
      onNavigate={handleNavigate}
      isFullScreen={isFullScreen}
    >
      {renderContent()}
    </AppShell>
  );
}

export default function App() {
  return (
    <BrandShootProvider>
      <SponsorProvider>
        <EventProvider>
          <AgentProvider>
            <AppContent />
          </AgentProvider>
        </EventProvider>
      </SponsorProvider>
    </BrandShootProvider>
  );
}