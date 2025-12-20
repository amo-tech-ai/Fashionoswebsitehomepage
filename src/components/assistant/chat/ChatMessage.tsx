/**
 * ChatMessage - Display individual chat messages from user or AI
 * 
 * Features:
 * - User vs Assistant styling
 * - Timestamp display
 * - Action buttons for suggested actions
 * - Copy message functionality
 * - Markdown-like formatting
 */

import { User, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export interface ChatMessageProps {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: {
    label: string;
    actionId: string;
  }[];
  onActionClick?: (actionId: string) => void;
}

export function ChatMessage({ 
  role, 
  content, 
  timestamp, 
  actions,
  onActionClick 
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
        ${isUser ? 'bg-indigo-100' : 'bg-purple-100'}
      `}>
        {isUser ? (
          <User className="w-4 h-4 text-indigo-600" />
        ) : (
          <Sparkles className="w-4 h-4 text-purple-600" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`
          px-4 py-3 rounded-2xl
          ${isUser 
            ? 'bg-indigo-600 text-white rounded-tr-md' 
            : 'bg-white border border-gray-200 text-gray-900 rounded-tl-md'
          }
        `}>
          {/* Message Content */}
          <div className="text-sm whitespace-pre-wrap break-words">
            {content}
          </div>

          {/* Actions (Assistant only) */}
          {!isUser && actions && actions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => onActionClick?.(action.actionId)}
                  className="w-full px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium transition-colors text-left"
                >
                  {action.label} →
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className={`
          flex items-center gap-2 mt-1 px-1
          ${isUser ? 'flex-row-reverse' : 'flex-row'}
        `}>
          <span className="text-xs text-gray-500">
            {formatTime(timestamp)}
          </span>

          {/* Copy Button (Assistant only) */}
          {!isUser && (
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-600" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
