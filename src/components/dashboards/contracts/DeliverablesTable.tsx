import { MoreHorizontal } from "lucide-react";

export type DeliverableStatus = 'Pending' | 'Completed' | 'In Progress';

export interface Deliverable {
  id: string;
  name: string;
  category: string;
  sponsor: string;
  event: string;
  dueDate: string;
  status: DeliverableStatus;
  owner: string;
}

export function DeliverablesTable({ data }: { data: Deliverable[] }) {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#F8F5F1] border-b border-gray-100">
              <th className="px-6 py-5 font-medium text-gray-500 text-xs uppercase tracking-wider">Deliverable</th>
              <th className="px-6 py-5 font-medium text-gray-500 text-xs uppercase tracking-wider">Category</th>
              <th className="px-6 py-5 font-medium text-gray-500 text-xs uppercase tracking-wider">Sponsor</th>
              <th className="px-6 py-5 font-medium text-gray-500 text-xs uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-5 font-medium text-gray-500 text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-5 font-medium text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 font-medium text-[#111111]">{item.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-[#F8F5F1] rounded-md text-xs font-medium text-gray-600">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#111111]">{item.sponsor}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{item.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    item.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    'bg-indigo-50 text-indigo-700 border-indigo-100'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-300 hover:text-[#111111] opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
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
