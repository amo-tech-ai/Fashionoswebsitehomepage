import React from "react";
import { 
  ChevronRight, 
  ArrowLeft, 
  Lightbulb, 
  FileText, 
  MoreHorizontal, 
  Plus 
} from "lucide-react";
import { FlowStep } from "../types";
import { GeminiHeader } from "../components/GeminiHeader";
import { WorkflowMiniNav } from "../components/WorkflowMiniNav";

export function DeliverablesDetailPage({ 
  step, 
  siblings,
  onBack, 
  onSelectStep 
}: { 
  step: FlowStep, 
  siblings: FlowStep[],
  onBack: () => void,
  onSelectStep: (step: FlowStep) => void
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <button onClick={onBack} className="hover:text-indigo-600 transition-colors">Tasks & Deliverables</button>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium text-gray-900">{step.title}</span>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"><ArrowLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">{step.title} Deliverables</h1>
          <p className="text-sm text-gray-500">Track approvals and assets.</p>
        </div>
      </div>

      <WorkflowMiniNav steps={siblings} activeStepId={step.id} onSelectStep={onSelectStep} />

      <GeminiHeader 
        title="Deliverables Risk Analysis"
        description="Gemini has detected 1 overdue item. It can draft a follow-up email."
        actions={[{ label: "Suggest Deliverables", icon: Lightbulb, primary: true }, { label: "Draft Follow-up", icon: FileText }]}
      />

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-gray-500 font-medium">
              <th className="px-6 py-4 font-serif text-gray-900">Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {step.deliverables.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-gray-600">{item.type}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{item.dueDate}</td>
                <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">{item.owner.charAt(0)}</div>
                  {item.owner}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>{item.status}</span>
                </td>
                <td className="px-6 py-4 text-right"><button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100"><MoreHorizontal className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Deliverable</button>
        </div>
      </div>
    </div>
  );
}
