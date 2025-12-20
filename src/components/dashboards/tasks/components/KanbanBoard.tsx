import React from "react";
import { Task } from "../types";

interface KanbanBoardProps {
    tasks: Task[];
    onTaskClick?: (task: Task) => void;
}

export function KanbanBoard({ tasks, onTaskClick }: KanbanBoardProps) {
  const columns = ['Backlog', 'In Progress', 'Review', 'Completed'];
  
  // Helper to map API status to Kanban columns roughly
  const getTasksForColumn = (col: string) => {
      if (col === 'Backlog') return tasks.filter(t => t.status === 'Backlog' || t.status === 'Pending');
      if (col === 'Completed') return tasks.filter(t => t.status === 'Completed');
      if (col === 'Review') return tasks.filter(t => t.status === 'Review');
      if (col === 'In Progress') return tasks.filter(t => t.status === 'In Progress');
      return [];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px] overflow-hidden">
      {columns.map(col => {
        const columnTasks = getTasksForColumn(col);
        return (
            <div key={col} className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-bold text-gray-900">{col}</h3>
                <span className="text-xs text-gray-400">{columnTasks.length}</span>
            </div>
            <div className="flex-1 bg-gray-50/50 rounded-xl p-2 border border-gray-100 overflow-y-auto space-y-2">
                {columnTasks.map(t => (
                <div 
                    key={t.id} 
                    onClick={() => onTaskClick?.(t)}
                    className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-sm cursor-pointer hover:border-black hover:shadow-md transition-all"
                >
                    <div className="font-medium text-gray-900 mb-1">{t.title}</div>
                    <div className="flex items-center justify-between">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${t.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-500'}`}>{t.priority}</span>
                    <span className="text-[10px] text-gray-400">{t.category}</span>
                    </div>
                </div>
                ))}
            </div>
            </div>
        );
      })}
    </div>
  );
}
