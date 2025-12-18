import { useState, useEffect } from "react";
import { Sidebar } from "./components/shared/Sidebar";
import { NavigationBar } from "./components/shared/NavigationBar";
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
import { SponsorCRM } from "./components/dashboards/SponsorCRM";
import { SponsorProfile } from "./components/dashboards/SponsorProfile";

import { SponsorDetail } from "./components/sponsors/SponsorDetail";
import { DesignerDirectory } from "./components/designers/DesignerDirectory";
import { DesignerProfile } from "./components/designers/DesignerProfile";
import { BrandProfileDashboard } from "./components/dashboards/BrandProfileDashboard";
import { AIAssistant } from "./components/shared/AIAssistant";
import { Footer } from "./components/Footer";

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

import { BrandShootProvider } from "./context/BrandShootContext";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home-v3");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Add State for Wizard
  const [wizardState, setWizardState] = useState<WizardState | null>(null);

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
      else if (path.includes("/events") || path.includes("/event-wizard")) {
        if (path.includes("create") || path.includes("wizard")) setActiveScreen("event-wizard");
        else setActiveScreen(path.includes("detail") ? "eventdetail" : "events");
      }
      // Dashboard Routing
      else if (path.includes("/tasks") || path.includes("/deliverables")) setActiveScreen("tasks");
      else if (path.includes("/contracts")) setActiveScreen("contracts");
      else if (path.includes("/analytics") || path.includes("/roi")) setActiveScreen("analytics");
      else if (path.includes("/overview") || path.includes("/dashboard")) setActiveScreen("overview");
      else if (path.includes("/shotlist")) setActiveScreen("shotlist");
      else if (path.includes("/products")) setActiveScreen("products");
      else if (path.includes("/gallery")) setActiveScreen("gallery");
      else if (path.includes("/clients")) setActiveScreen("clients");
      else if (path.includes("/billing")) setActiveScreen("billing");
      else if (path.includes("/sponsors")) {
        setActiveScreen(path.includes("profile") ? "sponsor-profile" : "sponsors");
      }
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
        return <DesignerWizard onComplete={() => setActiveScreen("brand-profile-dashboard")} />;
      case "brand-profile-dashboard":
        return <BrandProfileDashboard onNavigate={setActiveScreen} />;
      case "website-brief-dashboard":
        return <WebsiteWizard initialStep={9} />;
      case "style-guide":
        return <StyleGuide />;
      case "wizard":
        return <ShootWizard onComplete={(data) => { setWizardState(data); setActiveScreen("proposal"); }} />;
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
        return <EventCreationWizard onComplete={() => setActiveScreen("events")} />;
      case "directory-wizard":
        return <DirectoryProfileWizard onComplete={() => setActiveScreen("overview")} />;
      case "overview":
        return <ProjectOverview onNavigate={setActiveScreen} />;
      case "shotlist":
        return <ShotListBuilder />;
      case "products":
        return <ProductsDashboard />;
      case "gallery":
        return <GalleryDashboard />;
      case "clients":
        return <ClientDashboard />;
      case "billing":
        return <BillingDashboard />;
      case "command-center":
        return <CommandCenter onNavigate={setActiveScreen} />;
      case "runway":
        return <RunwayStage />;
      case "casting":
        return <CastingModels />;
      case "designer":
        return <DesignerCollection />;
      case "venues":
        return <VenueManagement onNavigate={setActiveScreen} />;
      case "activations":
        return <ActivationsManager />;
      case "tasks":
      case "tasks-event-planning":
      case "tasks-sponsorship":
      case "tasks-marketing":
      case "tasks-operations":
      case "tasks-media":
        const taskTab = activeScreen.startsWith('tasks-') ? activeScreen.replace('tasks-', '') : 'event-planning';
        return <TasksAndDeliverables initialTab={taskTab} />;
      case "sponsor-detail":
        return <SponsorDetail onNavigate={setActiveScreen} />;
      case "contracts":
        return <ContractsManager />;
      case "analytics":
        return <ROIAnalytics onNavigate={setActiveScreen} />;
      case "events-list":
        return <Events />;
      case "sponsors":
        return <SponsorCRM onNavigate={setActiveScreen} />;
      case "sponsor-profile":
        return <SponsorProfile onNavigate={setActiveScreen} />;
      case "designers":
        return <DesignerDirectory onNavigate={setActiveScreen} />;
      case "designer-profile":
        return <DesignerProfile onNavigate={setActiveScreen} />;
      case "architecture":
        return <SiteArchitecture />;
      case "proposal":
        return <ProposalPreview onNavigate={setActiveScreen} proposalData={wizardState} />;
      case "booking":
        return <BookingFlow onNavigate={setActiveScreen} />;

      // Brand Shoot AI Flow
      case "brand-shoot-start":
        return <BrandShootStart onNavigate={setActiveScreen} />;
      case "brand-signal-capture":
        return <BrandSignalCapture onNavigate={setActiveScreen} />;
      case "ai-thinking":
        return <AIThinking onNavigate={setActiveScreen} />;
      case "campaign-summary":
        return <CampaignSummary onNavigate={setActiveScreen} />;
      case "proposal-confirmation":
        return <ProposalConfirmation onNavigate={setActiveScreen} />;
      case "ai-optimization":
        return <AIOptimizationCenter onNavigate={setActiveScreen} />;
      
      default:
        return <HomePageV3 />;
    }
  };

  // Determine if current page is a marketing page (no top nav needed)
  const isMarketingPage = ["home", "home-v2", "home-v3", "photography", "ecommerce-photography", "clothing", "product", "video", "amazon", "instagram", "webdesign", "studio", "directory", "directorydetail", "events", "eventdetail", "style-guide", "architecture"].includes(activeScreen);

  // Determine if we should hide the sidebar (e.g. for the full-screen wizard)
  const isFullScreen = activeScreen === "wizard" || activeScreen === "website-wizard" || activeScreen === "designer-wizard" || activeScreen === "event-wizard" || activeScreen === "directory-wizard" || activeScreen === "proposal" || activeScreen === "booking" || 
    activeScreen === "brand-shoot-start" || activeScreen === "brand-signal-capture" || activeScreen === "ai-thinking" || activeScreen === "campaign-summary" || activeScreen === "proposal-confirmation" || activeScreen === "ai-optimization";

  return (
    <BrandShootProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar Navigation */}
      {!isFullScreen && !isMarketingPage && (
        <Sidebar 
          activeScreen={activeScreen} 
          onNavigate={setActiveScreen}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Main Content Area */}
      <div className={`${!isFullScreen && !isMarketingPage ? 'lg:ml-64' : ''} transition-all duration-300`}>
        {/* Show NavigationBar only for dashboard pages */}
        {!isMarketingPage && !isFullScreen && (
          <NavigationBar 
            activeScreen={activeScreen}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        )}
        
        {/* Show mobile menu button for marketing pages (but not full screen wizard) */}
        {isMarketingPage && !isFullScreen && (
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
        )}
        
        {renderContent()}

        {/* Global AI Assistant */}
        <AIAssistant onNavigate={setActiveScreen} currentScreen={activeScreen} />

        {/* Footer for Dashboard Pages */}
        {!isMarketingPage && !isFullScreen && (
          <div className="mt-20">
            <Footer />
          </div>
        )}
      </div>
      </div>
    </BrandShootProvider>
  );
}