/**
 * Supabase Status Indicator
 * 
 * Shows a banner when Supabase is not configured.
 * Helps users understand they need to set up the database.
 */

import { useState, useEffect } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase/client';
import { Database, AlertCircle, ExternalLink, X } from 'lucide-react';

export function SupabaseStatus() {
  const [isConfigured, setIsConfigured] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setIsConfigured(isSupabaseConfigured());
    
    // Check if user has dismissed this before
    const dismissed = localStorage.getItem('supabase-warning-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('supabase-warning-dismissed', 'true');
  };

  const handleRestore = () => {
    localStorage.removeItem('supabase-warning-dismissed');
    window.location.reload();
  };

  // Don't show if configured or dismissed
  if (isConfigured || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md">
      <div className="bg-amber-50 border-2 border-amber-200 rounded-lg shadow-xl p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-amber-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-amber-900">
                Supabase Not Connected
              </h3>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 text-amber-700 hover:text-amber-900 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-amber-700 text-sm mt-1">
              Running in mock mode. Data won't persist.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-xs">
              1
            </div>
            <p className="text-sm text-amber-800">
              Create a free Supabase project
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-xs">
              2
            </div>
            <p className="text-sm text-amber-800">
              Copy your credentials to <code className="text-xs bg-amber-100 px-1 rounded">/lib/supabase/client.ts</code>
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-xs">
              3
            </div>
            <p className="text-sm text-amber-800">
              Run database migrations
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href="https://supabase.com/dashboard/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm"
          >
            <span>Open Supabase</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => {
              const setupGuide = window.location.origin + '/docs/SUPABASE-SETUP-GUIDE.md';
              window.open(setupGuide, '_blank');
            }}
            className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors text-sm"
          >
            View Guide
          </button>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-amber-200">
          <p className="text-xs text-amber-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>Setup takes ~30 minutes</span>
          </p>
        </div>
      </div>
    </div>
  );
}
