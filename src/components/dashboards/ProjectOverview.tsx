import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileImage, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { useBrandShoot } from '../../context/BrandShootContext';

export function ProjectOverview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { activeProjects } = useBrandShoot();
  const [activeTab, setActiveTab] = useState('all');

  const stats = [
    { label: "Active Projects", value: activeProjects.length.toString(), trend: "+2 this week", icon: TrendingUp },
    { label: "Pending Review", value: "8", trend: "Needs attention", icon: AlertCircle },
    { label: "Shoots this Week", value: "3", trend: "On schedule", icon: Calendar },
    { label: "Completed", value: "156", trend: "+12% vs last month", icon: CheckCircle2 },
  ];

  const activeShoots = activeProjects; // Use context data instead of hardcoded

  const deliverables = [
    { id: 1, name: "Hero Shot - Beige Trench", status: "Needs Editing", due: "Oct 28", assigned: "Alex M." },
    { id: 2, name: "Detail - Gold Buttons", status: "In Review", due: "Oct 27", assigned: "Sarah K." },
    { id: 3, name: "BTS Video - Studio A", status: "Approved", due: "Oct 25", assigned: "Mike R." },
    { id: 4, name: "Lifestyle - Street", status: "Delivered", due: "Oct 24", assigned: "Alex M." },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F1] p-6 lg:p-12 font-sans text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Project Overview</h1>
          <p className="text-gray-500">Manage your shoots, deliverables, and client progress.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 w-64 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onNavigate('brand-shoot-start')} // Link to new AI flow
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>New AI Shoot</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#F8F5F1] rounded-xl text-gray-900">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                stat.trend.includes('+') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-3xl font-serif font-medium text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Active Shoots Column */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-medium text-gray-900">Active Shoots</h2>
            <button className="text-sm text-gray-500 hover:text-gray-900 font-medium">View All</button>
          </div>

          <div className="space-y-4">
            {activeShoots.map((shoot) => (
              <div key={shoot.id} className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={shoot.image} alt={shoot.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{shoot.name}</h3>
                      <p className="text-sm text-gray-500">{shoot.client} • {shoot.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      shoot.status === 'Shooting' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      shoot.status === 'Editing' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                      'bg-gray-50 text-gray-700 border-gray-100'
                    }`}>
                      {shoot.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><FileImage className="w-3 h-3" /> {shoot.deliverables}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Due in 3 days</span>
                  </div>

                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900 rounded-full" style={{ width: `${shoot.progress}%` }}></div>
                  </div>
                </div>

                <button className="p-3 hover:bg-gray-50 rounded-full border border-transparent hover:border-gray-200 transition-colors">
                   <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Tracker Column */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-medium text-gray-900">Recent Deliverables</h2>
            <button className="text-sm text-gray-500 hover:text-gray-900 font-medium">View All</button>
          </div>

          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
            <div className="space-y-6">
              {deliverables.map((item) => (
                <div key={item.id} className="flex items-start justify-between pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-xs text-gray-500">Due {item.due} • {item.assigned}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    item.status === 'Approved' ? 'bg-green-50 text-green-700' :
                    item.status === 'Needs Editing' ? 'bg-amber-50 text-amber-700' :
                    item.status === 'Delivered' ? 'bg-gray-100 text-gray-600' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            
            <button 
                onClick={() => onNavigate('gallery')}
                className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
                Go to Gallery
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
             <button onClick={() => onNavigate('shotlist')} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group">
                <div className="w-10 h-10 bg-[#F8F5F1] rounded-xl flex items-center justify-center mb-3 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">Shot List</div>
             </button>
             <button onClick={() => onNavigate('products')} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group">
                <div className="w-10 h-10 bg-[#F8F5F1] rounded-xl flex items-center justify-center mb-3 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">Products</div>
             </button>
             <button onClick={() => onNavigate('billing')} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group">
                <div className="w-10 h-10 bg-[#F8F5F1] rounded-xl flex items-center justify-center mb-3 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">Billing</div>
             </button>
             <button onClick={() => onNavigate('clients')} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group">
                <div className="w-10 h-10 bg-[#F8F5F1] rounded-xl flex items-center justify-center mb-3 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <Users className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">Clients</div>
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function Users(props: any) {
    return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
}

function ShoppingBag(props: any) {
    return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}
