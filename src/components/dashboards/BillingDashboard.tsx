import React from 'react';
import { 
  DollarSign, 
  CreditCard, 
  FileText, 
  Download, 
  MoreHorizontal, 
  ArrowUpRight, 
  ArrowDownLeft,
  Settings,
  Plus
} from 'lucide-react';

export function BillingDashboard() {
  const metrics = [
    { label: "Outstanding Balance", value: "$12,450.00", trend: "Due within 30 days", color: "text-gray-900" },
    { label: "Paid Invoices", value: "$48,200.00", trend: "This month", color: "text-green-600" },
    { label: "Pending Approval", value: "$3,200.00", trend: "2 invoices", color: "text-amber-600" },
  ];

  const invoices = [
    { id: "INV-2024-001", project: "SS25 Campaign", client: "Acme Fashion", amount: "$8,500.00", status: "Pending", date: "Oct 24, 2025" },
    { id: "INV-2024-002", project: "Winter Lookbook", client: "Velvet & Silk", amount: "$4,200.00", status: "Paid", date: "Oct 15, 2025" },
    { id: "INV-2024-003", project: "Product Refresh", client: "Basis", amount: "$1,250.00", status: "Overdue", date: "Oct 01, 2025" },
    { id: "INV-2024-004", project: "Social Content", client: "Luxe Life", amount: "$3,500.00", status: "Paid", date: "Sep 28, 2025" },
  ];

  const transactions = [
    { id: 1, type: "Payment Received", client: "Velvet & Silk", amount: "+$4,200.00", date: "Oct 15", method: "Wire Transfer" },
    { id: 2, type: "Expense", client: "Studio Rental", amount: "-$1,200.00", date: "Oct 12", method: "Credit Card" },
    { id: 3, type: "Payment Received", client: "Luxe Life", amount: "+$3,500.00", date: "Sep 29", method: "Stripe" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F1] p-6 lg:p-12 font-sans text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Billing & Payments</h1>
          <p className="text-gray-500">Manage invoices, payments, and financial settings.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 hover:bg-gray-50 shadow-sm">
             <Settings className="w-4 h-4" />
             <span>Pricing Settings</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10">
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-2">{metric.label}</div>
            <div className={`text-3xl font-serif font-medium mb-2 ${metric.color}`}>{metric.value}</div>
            <div className="text-xs text-gray-400 font-medium bg-gray-50 inline-block px-2 py-1 rounded-md border border-gray-100">
              {metric.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Invoices Table */}
        <div className="xl:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-serif font-bold text-gray-900">Recent Invoices</h2>
            <button className="text-sm text-gray-500 hover:text-gray-900 font-medium">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Invoice</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-4 font-mono text-sm text-gray-600">{inv.id}</td>
                    <td className="px-8 py-4">
                      <div className="font-medium text-gray-900">{inv.project}</div>
                      <div className="text-xs text-gray-500">{inv.client}</div>
                    </td>
                    <td className="px-8 py-4 font-medium text-gray-900">{inv.amount}</td>
                    <td className="px-8 py-4 text-sm text-gray-500">{inv.date}</td>
                    <td className="px-8 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        inv.status === 'Paid' ? 'bg-green-50 text-green-700' :
                        inv.status === 'Overdue' ? 'bg-red-50 text-red-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-900">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Recent Activity</h2>
          
          <div className="space-y-6 relative">
             {/* Connector Line */}
             <div className="absolute top-2 left-4 bottom-2 w-0.5 bg-gray-100" />

             {transactions.map((tx, i) => (
               <div key={tx.id} className="relative pl-10">
                 <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10 ${
                    tx.amount.includes('+') ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                 }`}>
                    {tx.amount.includes('+') ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                 </div>
                 <div className="flex justify-between items-start mb-1">
                   <span className="font-medium text-gray-900">{tx.type}</span>
                   <span className={`font-bold ${tx.amount.includes('+') ? 'text-green-600' : 'text-gray-900'}`}>
                     {tx.amount}
                   </span>
                 </div>
                 <div className="flex justify-between items-center text-sm text-gray-500">
                   <span>{tx.client}</span>
                   <span>{tx.date}</span>
                 </div>
               </div>
             ))}
          </div>
          
          <button className="w-full mt-8 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
             View All Transactions
          </button>
        </div>

      </div>
    </div>
  );
}
