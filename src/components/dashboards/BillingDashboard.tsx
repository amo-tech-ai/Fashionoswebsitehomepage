import React from 'react';
import { 
  Settings,
  Plus
} from 'lucide-react';

// Sub-Components
import { BillingMetrics } from './billing/BillingMetrics';
import { InvoicesTable } from './billing/InvoicesTable';
import { TransactionFeed } from './billing/TransactionFeed';
import { BudgetGuardianAlert } from './billing/BudgetGuardianAlert';

export function BillingDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F5F1] p-6 lg:p-12 font-sans text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Billing & Payments</h1>
          <p className="text-gray-500">Manage invoices, payments, and financial settings.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 hover:bg-gray-50 shadow-sm transition-colors">
             <Settings className="w-4 h-4" />
             <span>Pricing Settings</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10">
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* AI Alert Section */}
      <BudgetGuardianAlert />

      {/* Metrics Grid */}
      <BillingMetrics />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-20">
        
        {/* Invoices Table (2 Cols) */}
        <div className="xl:col-span-2">
           <InvoicesTable />
        </div>

        {/* Transaction History (1 Col) */}
        <div>
           <TransactionFeed />
        </div>

      </div>
    </div>
  );
}
