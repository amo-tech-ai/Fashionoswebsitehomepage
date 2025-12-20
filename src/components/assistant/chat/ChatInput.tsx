/**
 * ChatInput - Message input field with send button
 * 
 * Features:
 * - Enter to send (Shift+Enter for newline)
 * - Auto-resize textarea
 * - Send button
 * - Disabled state when processing
 * - Character limit (optional)
 */

import { Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = 'Ask FashionOS Intelligence...',
  disabled = false,
  maxLength = 1000,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send (Shift+Enter for newline)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend();
    }
  };

  const remaining = maxLength - value.length;
  const showWarning = remaining < 50;

  return (
    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
      <div className="relative">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={`
            w-full pl-4 pr-12 py-3 
            bg-gray-50 border border-gray-200 
            rounded-xl text-sm 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white 
            transition-all 
            placeholder:text-gray-400 text-gray-900
            resize-none
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          rows={1}
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className={`
            absolute right-2 bottom-2
            w-8 h-8 rounded-lg
            flex items-center justify-center
            transition-all
            ${value.trim() && !disabled
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          title="Send message (Enter)"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Character Count Warning */}
      {showWarning && (
        <div className="mt-1 text-xs text-amber-600 text-right">
          {remaining} characters remaining
        </div>
      )}

      {/* Hint */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        Press <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Enter</kbd> to send, 
        <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs mx-1">Shift+Enter</kbd> for new line
      </div>
    </div>
  );
}
