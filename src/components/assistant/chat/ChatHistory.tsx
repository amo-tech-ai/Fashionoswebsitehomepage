/**
 * ChatHistory - Container for displaying conversation history
 * 
 * Features:
 * - Auto-scroll to latest message
 * - Empty state
 * - Loading state
 * - Virtualized scrolling for performance (future)
 */

import { useEffect, useRef } from 'react';
import { ChatMessage, type ChatMessageProps } from './ChatMessage';
import { Sparkles } from 'lucide-react';

export interface ChatHistoryProps {
  messages: ChatMessageProps[];
  onActionClick?: (actionId: string) => void;
  isProcessing?: boolean;
}

export function ChatHistory({ 
  messages, 
  onActionClick, 
  isProcessing = false 
}: ChatHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Empty state
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-serif text-gray-900 mb-2">
            Hello! I'm Cura
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Your AI assistant for luxury brand production. Ask me anything about:
          </p>
          <div className="space-y-2 text-xs text-gray-500 text-left">
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5" />
              <span>Sample tracking & logistics</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5" />
              <span>Event planning & critical paths</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5" />
              <span>Asset quality & delivery</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5" />
              <span>Service packages & pricing</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
    >
      {/* Message List */}
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          {...message}
          onActionClick={onActionClick}
        />
      ))}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="flex gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
          </div>
          <div className="flex-1 max-w-[80%]">
            <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-tl-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
