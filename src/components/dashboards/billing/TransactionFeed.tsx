import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export function TransactionFeed() {
  const transactions = [
    { id: 1, type: "Payment Received", client: "Velvet & Silk", amount: "+$4,200.00", date: "Oct 15", method: "Wire Transfer" },
    { id: 2, type: "Expense", client: "Studio Rental", amount: "-$1,200.00", date: "Oct 12", method: "Credit Card" },
    { id: 3, type: "Payment Received", client: "Luxe Life", amount: "+$3,500.00", date: "Sep 29", method: "Stripe" },
    { id: 4, type: "Expense", client: "Catering", amount: "-$450.00", date: "Sep 28", method: "Credit Card" },
    { id: 5, type: "Expense", client: "Models (Agency)", amount: "-$2,100.00", date: "Sep 27", method: "Wire" },
  ];

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
      <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-6 relative">
         {/* Connector Line */}
         <div className="absolute top-2 left-4 bottom-2 w-0.5 bg-gray-100" />

         {transactions.map((tx) => (
           <div key={tx.id} className="relative pl-10 group">
             <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10 transition-colors ${
                tx.amount.includes('+') ? 'bg-green-100 text-green-600 group-hover:bg-green-200' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
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
  );
}
