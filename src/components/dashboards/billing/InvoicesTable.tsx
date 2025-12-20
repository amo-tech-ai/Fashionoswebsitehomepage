import { Download } from "lucide-react";

export function InvoicesTable() {
  const invoices = [
    { id: "INV-2024-001", project: "SS25 Campaign", client: "Acme Fashion", amount: "$8,500.00", status: "Pending", date: "Oct 24, 2025" },
    { id: "INV-2024-002", project: "Winter Lookbook", client: "Velvet & Silk", amount: "$4,200.00", status: "Paid", date: "Oct 15, 2025" },
    { id: "INV-2024-003", project: "Product Refresh", client: "Basis", amount: "$1,250.00", status: "Overdue", date: "Oct 01, 2025" },
    { id: "INV-2024-004", project: "Social Content", client: "Luxe Life", amount: "$3,500.00", status: "Paid", date: "Sep 28, 2025" },
  ];

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden h-full">
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
  );
}
