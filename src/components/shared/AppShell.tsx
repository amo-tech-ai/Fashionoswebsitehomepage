import { useState, useEffect } from "react";
import { GlobalRail } from "./GlobalRail";
import { ContextSidebar } from "./ContextSidebar";
import { NavigationBar } from "./NavigationBar";
import { Footer } from "../Footer";
import { AssistantShell } from "../assistant/AssistantShell";
import { AICopilotDrawer } from "./AICopilotDrawer";
import { Menu } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  activeScreen: string;
  onNavigate: (screen: string) => void;
  isFullScreen?: boolean;
}

export function AppShell({ 
  children, 
  activeScreen, 
  onNavigate,
  isFullScreen = false
}: AppShellProps) {
  const [activeApp, setActiveApp] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync activeApp with activeScreen
  useEffect(() => {
    const mapScreenToApp = (screen: string) => {
      // Events App
      if (['events', 'eventdetail', 'event-wizard', 'command-center', 'runway', 'production-timeline', 'venues'].some(s => screen.includes(s))) return 'events';
      
      // CRM App
      if (['sponsors', 'clients', 'designers', 'campaigns'].some(s => screen.includes(s))) return 'crm';
      
      // Finance App
      if (['billing', 'contracts', 'analytics', 'proposal'].some(s => screen.includes(s))) return 'finance';
      
      // Production App
      if (['shotlist', 'products', 'gallery', 'casting', 'scout', 'studio', 'wizard'].some(s => screen.includes(s))) return 'production';
      
      // Admin/Settings
      if (['architecture', 'style-guide'].some(s => screen.includes(s))) return 'settings';

      return 'dashboard';
    };

    setActiveApp(mapScreenToApp(activeScreen));
  }, [activeScreen]);

  const handleAppChange = (appId: string) => {
    setActiveApp(appId);
    // Optional: Navigate to the default screen for that app
    switch (appId) {
      case 'events': onNavigate('events'); break;
      case 'crm': onNavigate('sponsors'); break;
      case 'finance': onNavigate('billing'); break;
      case 'production': onNavigate('shotlist'); break;
      case 'dashboard': onNavigate('overview'); break;
    }
  };

  if (isFullScreen) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
        <AssistantShell currentRoute={activeScreen} onNavigate={onNavigate} />
        <AICopilotDrawer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 1. Global Rail (Fixed Left) */}
      <GlobalRail activeApp={activeApp} onAppChange={handleAppChange} />

      {/* 2. Context Sidebar (Fixed Left + 64px) */}
      <div className="hidden lg:block pl-16">
        <ContextSidebar 
          activeApp={activeApp} 
          activeScreen={activeScreen} 
          onNavigate={onNavigate}
        />
      </div>

      {/* Mobile Sidebar Handling */}
      <div className="lg:hidden">
        <ContextSidebar 
          activeApp={activeApp} 
          activeScreen={activeScreen} 
          onNavigate={onNavigate} 
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* 3. Main Content Area */}
      <div className="flex-1 lg:ml-[20rem] min-w-0 flex flex-col min-h-screen transition-all duration-300">
        
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-16 flex items-center gap-4">
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <span className="font-serif text-lg">FashionOS</span>
        </div>

        {/* Dashboard Top Bar (Breadcrumbs, Search, User) */}
        <div className="hidden lg:block">
           <NavigationBar 
             activeScreen={activeScreen}
             onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-0">
          {children}
        </main>

        {/* Global Footer */}
        <div className="mt-auto">
          <Footer onNavigate={onNavigate} activeScreen={activeScreen} />
        </div>
      </div>

      {/* 4. AI Assistant Layer */}
      <AssistantShell currentRoute={activeScreen} onNavigate={onNavigate} />
      <AICopilotDrawer />
    </div>
  );
}
