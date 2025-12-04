import { useState } from "react";
import { Sidebar } from "./components/shared/Sidebar";
import { NavigationBar } from "./components/shared/NavigationBar";
import AppHome from "./AppHome";
import Services from "./Services";
import Clothing from "./Clothing";
import Studios from "./Studios";
import Directory from "./Directory";
import DirectoryDetail from "./DirectoryDetail";
import Events from "./Events";
import EventDetail from "./EventDetail";
import { CommandCenter } from "./components/dashboards/CommandCenter";
import { RunwayStage } from "./components/dashboards/RunwayStage";
import { CastingModels } from "./components/dashboards/CastingModels";
import { DesignerCollection } from "./components/dashboards/DesignerCollection";
import { VenueProduction } from "./components/dashboards/VenueProduction";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeScreen) {
      // Marketing Pages
      case "home":
        return <AppHome />;
      case "photography":
        return <Services />;
      case "clothing":
        return <Clothing />;
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
      case "command":
        return <CommandCenter />;
      case "runway":
        return <RunwayStage />;
      case "casting":
        return <CastingModels />;
      case "designer":
        return <DesignerCollection />;
      case "venue":
        return <VenueProduction />;
      
      default:
        return <AppHome />;
    }
  };

  // Determine if current page is a marketing page (no top nav needed)
  const isMarketingPage = ["home", "photography", "clothing", "studio", "directory", "directorydetail", "events", "eventdetail"].includes(activeScreen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeScreen={activeScreen} 
        onNavigate={setActiveScreen}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Main Content Area */}
      <div className="lg:ml-64 transition-all duration-300">
        {/* Show NavigationBar only for dashboard pages */}
        {!isMarketingPage && (
          <NavigationBar 
            activeScreen={activeScreen}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        )}
        
        {/* Show mobile menu button for marketing pages */}
        {isMarketingPage && (
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
      </div>
    </div>
  );
}