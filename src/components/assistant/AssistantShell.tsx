import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, LayoutGrid } from 'lucide-react';
import { PanelHeader } from './core/PanelHeader';
import { LogisticsKit } from './kits/LogisticsKit';
import { EventsKit } from './kits/EventsKit';
import { MediaKit } from './kits/MediaKit';
import { ServicesKit } from './kits/ServicesKit';
import { MarketingKit } from './kits/MarketingKit';
import { ChatHistory, ChatInput } from './chat';
import type { ChatMessageProps } from './chat';
import { getKitForRoute, type AssistantKitConfig } from '../../utils/assistantRouteMapper';
import { executeDeepLink } from '../../utils/deepLinking';
import { orchestrateResponse } from './skills/AgentOrchestrator';
import type { OrchestratorContext } from './skills/AgentOrchestrator';
import { assistantAPI } from '../../lib/api';

interface AssistantShellProps {
  currentRoute: string;
  onNavigate: (screen: string) => void;
}

export function AssistantShell({ currentRoute, onNavigate }: AssistantShellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [kitConfig, setKitConfig] = useState<AssistantKitConfig | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<'kit' | 'chat'>('kit'); // Toggle between kit cards and chat

  // Map currentRoute to kitConfig using the route mapper utility
  useEffect(() => {
    const config = getKitForRoute(currentRoute);
    setKitConfig(config);
    
    // Debug logging
    console.log('🤖 AssistantShell: Route changed to', currentRoute, '→ Kit:', config.kitName, '| Page:', config.pageName);
  }, [currentRoute]);

  // Handle action clicks from kits (deep linking)
  const handleActionClick = (actionId: string, params?: any) => {
    console.log('🎬 Action clicked:', actionId, params);

    // Map action IDs to deep links
    const actionMap: Record<string, string> = {
      // Logistics Kit actions
      'show-missing': 'sample-tracker:delayed',
      'batching-plan': 'sample-tracker:batching',
      'prep-checklist': 'sample-tracker',
      'message-studio': 'sample-tracker',
      'fix-blockers': 'sample-tracker:blockers',
      'view-details': 'sample-tracker',
      'view-batching-plan': 'sample-tracker:batching',
      
      // Events Kit actions
      'critical-path': 'eventdetail:critical-path',
      'run-of-show': 'eventdetail:run-of-show',
      'staffing-check': 'eventdetail:staffing',
      'risk-scan': 'eventdetail:risks',
      'create-event': 'event-wizard',
      'view-calendar': 'events:calendar',
      'risk-scan-all': 'events:risks',
      'ai-recommendations': 'events:recommendations',
      'fix-blocker': 'eventdetail:blockers',
      'view-critical-path': 'eventdetail:critical-path',
      'generate-run-of-show': 'eventdetail:run-of-show',
      'action': 'eventdetail', // Generic action click
      
      // Media Kit actions
      'upload-assets': 'gallery:upload',
      'tag-by-shot': 'gallery:tag',
      'generate-selects': 'gallery:selects',
      'prep-delivery': 'gallery:delivery',
      'view-shot-list': 'gallery:shots',
      'review-quality': 'gallery:quality',
      'accelerate-delivery': 'gallery',
      
      // Services Kit actions
      'compare-packages': 'services:compare',
      'get-quote': 'services:quote',
      'book-consultation': 'services:booking',
      'view-portfolio': 'services:portfolio',
      'view-package': 'services',
      'pricing-breakdown': 'services:pricing',
      'enable-rush': 'services:rush',
      
      // Marketing Kit actions
      'explore-platform': 'tour',
      'view-services': 'services',
      'get-started-guide': 'tutorial',
      'next-action': 'default', // Will use params.route
      'discover-feature': 'default', // Will use params
      'whats-new': 'changelog',
      'popular-feature': 'sample-tracker',
    };

    const deepLink = actionMap[actionId];
    if (deepLink) {
      executeDeepLink(deepLink, {
        onNavigate,
        onFilterChange: (filters) => {
          console.log('🔍 Apply filters:', filters);
        },
        onStateUpdate: (state) => {
          console.log('📊 Update state:', state);
        }
      });
      
      // Close assistant after navigation
      setIsOpen(false);
    }
  };

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle chat input submission
  const handleChatSubmit = () => {
    if (chatInput.trim() === '') return;
    setIsProcessing(true);

    const userMessage: ChatMessageProps = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate AI response delay
    setTimeout(() => {
      // Build orchestrator context
      const context: OrchestratorContext = {
        currentKit: kitConfig?.kitName || 'marketing',
        currentRoute,
        userActivity: {
          visitedPages: [currentRoute],
          completedActions: [],
          createdProjects: 0,
          lastVisit: new Date(),
          accountAge: 2,
        },
      };

      const orchResponse = orchestrateResponse(userMessage.content, context);
      
      const assistantMessage: ChatMessageProps = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: orchResponse.content,
        timestamp: new Date(),
        actions: orchResponse.actions,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 800); // Small delay for better UX
  };

  return (
    <>
      {/* Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#111111] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-black transition-colors group"
            aria-label="Open FashionOS Intelligence"
          >
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            
            {/* Pulsing indicator */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ 
                opacity: 0, 
                y: 20, 
                scale: 0.95,
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
              }}
              exit={{ 
                opacity: 0, 
                y: 20, 
                scale: 0.95 
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30 
              }}
              className={`
                fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col font-sans
                
                /* Mobile: Bottom sheet */
                bottom-0 left-0 right-0 
                max-h-[85vh] rounded-b-none
                
                /* Desktop: Right drawer */
                lg:bottom-6 lg:right-6 lg:left-auto
                lg:rounded-2xl
                ${isExpanded ? 'lg:w-[600px] lg:h-[80vh]' : 'lg:w-[480px] lg:h-[600px]'}
                
                transition-all duration-300
              `}
            >
              {/* Header with tabs */}
              <div className="bg-white border-b border-gray-100 shrink-0">
                <PanelHeader
                  currentKit={kitConfig?.kitName || 'marketing'}
                  pageName={kitConfig?.pageName || 'Home'}
                  isExpanded={isExpanded}
                  onExpand={() => setIsExpanded(!isExpanded)}
                  onClose={() => setIsOpen(false)}
                />
                
                {/* View Mode Tabs */}
                <div className="flex border-t border-gray-100">
                  <button
                    onClick={() => setViewMode('kit')}
                    className={`
                      flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors
                      ${viewMode === 'kit' 
                        ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Quick Actions
                  </button>
                  <button
                    onClick={() => setViewMode('chat')}
                    className={`
                      flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors
                      ${viewMode === 'chat' 
                        ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                    {messages.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-indigo-600 text-white rounded-full text-xs">
                        {messages.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Body - Render Kit or Chat based on viewMode */}
              {viewMode === 'kit' ? (
                <div className="flex-1 overflow-y-auto bg-gray-50/30">
                  {kitConfig?.kitName === 'logistics' ? (
                    <LogisticsKit onActionClick={handleActionClick} />
                  ) : kitConfig?.kitName === 'events' ? (
                    <EventsKit onActionClick={handleActionClick} />
                  ) : kitConfig?.kitName === 'media' ? (
                    <MediaKit onActionClick={handleActionClick} />
                  ) : kitConfig?.kitName === 'services' ? (
                    <ServicesKit onActionClick={handleActionClick} />
                  ) : kitConfig?.kitName === 'marketing' ? (
                    <MarketingKit onActionClick={handleActionClick} />
                  ) : (
                    <div className="text-center py-12 px-6">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="font-serif text-lg text-gray-900 mb-2">
                        {kitConfig?.kitName.charAt(0).toUpperCase() + kitConfig?.kitName.slice(1)} Kit
                      </h4>
                      <p className="text-sm text-gray-500 mb-6">
                        This kit is coming soon. For now, try the Logistics Kit on the Sample Tracker page.
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        Kit detected: <span className="font-mono font-medium">{kitConfig?.kitName}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <ChatHistory
                    messages={messages}
                    onActionClick={handleActionClick}
                    isProcessing={isProcessing}
                  />
                  <ChatInput
                    value={chatInput}
                    onChange={setChatInput}
                    onSend={handleChatSubmit}
                    disabled={isProcessing}
                  />
                </>
              )}

              {/* Footer hint (only in kit view) */}
              {viewMode === 'kit' && (
                <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <div className="flex gap-2 items-center">
                      <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-600 font-mono">⌘ K</kbd>
                      <span>to toggle</span>
                    </div>
                    <div>Switch to Chat for Q&A →</div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}