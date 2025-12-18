import React from "react";
import { Task } from "../types";

export function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const columns = ['Backlog', 'In Progress', 'Review', 'Completed'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] overflow-hidden">
      {columns.map(col => (
        <div key={col} className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-gray-900">{col}</h3>
            <span className="text-xs text-gray-400">{tasks.filter(t => t.status === col).length}</span>
          </div>
          <div className="flex-1 bg-gray-50/50 rounded-xl p-2 border border-gray-100 overflow-y-auto space-y-2">
            {tasks.filter(t => t.status === col).map(t => (
              <div key={t.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-sm">
                <div className="font-medium text-gray-900 mb-1">{t.title}</div>
                <div className="flex items-center justify-between">
                   <span className={`text-[10px] px-1.5 py-0.5 rounded ${t.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-500'}`}>{t.priority}</span>
                   <span className="text-[10px] text-gray-400">{t.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
