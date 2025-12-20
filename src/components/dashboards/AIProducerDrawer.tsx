import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Send, 
  AlertTriangle,
  CheckCircle2,
  Calendar,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface AIProducerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onActionSelect?: (action: string) => void;
}

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string; icon?: React.ReactNode }[];
}

export function AIProducerDrawer({ isOpen, onClose, onActionSelect }: AIProducerDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Good morning. Here's what matters today for your campaign.",
      timestamp: '09:00 AM',
      suggestedActions: [
        { 
          label: 'Fix sample blocker', 
          action: 'fix-blocker',
          icon: <AlertTriangle className="w-3.5 h-3.5" />
        },
        { 
          label: 'Explain weather risk', 
          action: 'explain-risk',
          icon: <TrendingUp className="w-3.5 h-3.5" />
        },
        { 
          label: 'Adjust timeline', 
          action: 'adjust-timeline',
          icon: <Calendar className="w-3.5 h-3.5" />
        },
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: "I'm analyzing your request and checking all production systems. Based on current logistics data, I can help resolve this within the next 30 minutes.",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInputValue('');
  };

  const handleActionClick = (action: string) => {
    if (onActionSelect) {
      onActionSelect(action);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Drawer - Desktop: Right Panel, Mobile: Bottom Sheet */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full lg:w-[480px] bg-white shadow-2xl z-50 flex flex-col hidden lg:flex"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-[#111111] text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-serif text-lg">AI Producer</h2>
                  <p className="text-xs text-gray-300 font-medium">Cura Intelligence</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {/* Message Bubble */}
                    <div 
                      className={`
                        rounded-2xl p-4 
                        ${message.type === 'user' 
                          ? 'bg-[#111111] text-white ml-auto' 
                          : 'bg-white border border-gray-100 shadow-sm'}
                      `}
                    >
                      <p className={`text-sm leading-relaxed ${message.type === 'user' ? 'text-white' : 'text-gray-700'}`}>
                        {message.content}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <p className={`text-[10px] text-gray-400 mt-2 font-medium ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.timestamp}
                    </p>

                    {/* Suggested Actions (only for AI messages) */}
                    {message.type === 'ai' && message.suggestedActions && (
                      <div className="mt-4 space-y-2">
                        {message.suggestedActions.map((action, index) => (
                          <Button
                            key={index}
                            onClick={() => handleActionClick(action.action)}
                            variant="outline"
                            className="w-full justify-start gap-2 bg-white border-gray-200 hover:bg-gray-50 hover:border-[#111111] text-gray-700 hover:text-[#111111] rounded-full h-10 text-sm font-medium group"
                          >
                            {action.icon}
                            {action.label}
                            <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-[#111111] transition-colors" />
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Context Cards */}
              <div className="pt-4 space-y-3">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-emerald-900">Campaign Status</p>
                    <p className="text-xs text-emerald-700 mt-1">82% production ready. On track for delivery.</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-amber-900">Active Blocker</p>
                    <p className="text-xs text-amber-700 mt-1">1 high-priority sample delayed. Alternative ready.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about this campaign..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent transition-all"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-[#111111] hover:bg-black text-white rounded-xl px-5 disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-gray-400 mt-3 text-center">
                AI responses are suggestions. Final decisions require human approval.
              </p>
            </div>
          </motion.div>

          {/* Mobile Bottom Sheet */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 h-[85vh] bg-white shadow-2xl z-50 flex flex-col lg:hidden rounded-t-[32px] overflow-hidden"
          >
            {/* Mobile Handle */}
            <div className="w-full flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-serif text-lg text-[#111111]">AI Producer</h2>
                  <p className="text-xs text-gray-500 font-medium">Cura Intelligence</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages (Same as desktop) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAFA]">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div 
                      className={`
                        rounded-2xl p-4 
                        ${message.type === 'user' 
                          ? 'bg-[#111111] text-white ml-auto' 
                          : 'bg-white border border-gray-100 shadow-sm'}
                      `}
                    >
                      <p className={`text-sm leading-relaxed ${message.type === 'user' ? 'text-white' : 'text-gray-700'}`}>
                        {message.content}
                      </p>
                    </div>

                    <p className={`text-[10px] text-gray-400 mt-2 font-medium ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.timestamp}
                    </p>

                    {message.type === 'ai' && message.suggestedActions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestedActions.map((action, index) => (
                          <Button
                            key={index}
                            onClick={() => handleActionClick(action.action)}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start gap-2 bg-white border-gray-200 hover:bg-gray-50 rounded-full text-xs"
                          >
                            {action.icon}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-[#111111] hover:bg-black text-white rounded-xl px-5 disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
