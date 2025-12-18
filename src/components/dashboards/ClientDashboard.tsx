import React from 'react';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Edit2, 
  Clock,
  FileText,
  ArrowUpRight,
  Layout
} from 'lucide-react';
import { useBrandShoot } from '../../context/BrandShootContext';

export function ClientDashboard() {
  const { activeProjects } = useBrandShoot();

  const client = {
    name: "Acme Fashion",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200&h=200",
    website: "www.acmefashion.com",
    contact: "Sarah Miller",
    email: "sarah@acmefashion.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY"
  };

  const preferences = {
    audience: "Gen Z & Millennials, Urban, Trendy",
    personality: "Bold, Minimalist, Sustainable",
    styles: ["Editorial", "Street Style", "High Contrast"]
  };

  const history = activeProjects.map(project => ({
    id: project.id,
    name: project.name,
    date: project.date,
    items: Math.floor(Math.random() * 20) + 10, // Mock item count if not available
    image: project.image
  }));

  return (
    <div className="min-h-screen bg-[#F8F5F1] p-6 lg:p-12 font-sans text-gray-900">
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-serif text-gray-900">Client Profile</h1>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 hover:bg-gray-50 shadow-sm transition-colors">
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Profile Info */}
            <div className="space-y-8">
                {/* Main Card */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 text-center">
                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full overflow-hidden mb-6 border-4 border-gray-50">
                        <img src={client.logo} alt={client.name} className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">{client.name}</h2>
                    <p className="text-gray-500 mb-6 flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4" /> {client.location}
                    </p>

                    <div className="space-y-4 text-left border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <Globe className="w-4 h-4" />
                            </div>
                            <a href={`https://${client.website}`} className="hover:text-gray-900 underline decoration-gray-300 underline-offset-4 transition-all">{client.website}</a>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span>{client.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span>{client.phone}</span>
                        </div>
                    </div>
                </div>

                {/* Brand Preferences */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-6">Brand Identity</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Target Audience</div>
                            <p className="text-gray-700">{preferences.audience}</p>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Personality</div>
                            <div className="flex flex-wrap gap-2">
                                {preferences.personality.split(', ').map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-100">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                         <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Preferred Styles</div>
                            <div className="flex flex-wrap gap-2">
                                {preferences.styles.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-black text-white text-sm rounded-lg">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: History & Notes */}
            <div className="lg:col-span-2 space-y-8">
                {/* Shoot History */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                         <h3 className="text-lg font-serif font-bold text-gray-900">Shoot History</h3>
                         <button className="text-sm font-medium text-gray-500 hover:text-gray-900">View All</button>
                    </div>

                    <div className="space-y-4">
                        {history.map((shoot) => (
                            <div key={shoot.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer group">
                                <div className="w-20 h-14 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                                    <img src={shoot.image} alt={shoot.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-medium text-gray-900 mb-0.5">{shoot.name}</h4>
                                    <div className="text-sm text-gray-500 flex items-center gap-3">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {shoot.date}</span>
                                        <span className="flex items-center gap-1"><Layout className="w-3 h-3" /> {shoot.items} items</span>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div className="bg-amber-50/50 p-8 rounded-[2rem] border border-amber-100">
                     <div className="flex items-center gap-3 mb-4 text-amber-900">
                        <FileText className="w-5 h-5" />
                        <h3 className="text-lg font-serif font-bold">Important Notes</h3>
                     </div>
                     <p className="text-amber-800/80 leading-relaxed">
                        Client prefers high contrast editing style. Always ensure the logo color (#FF3300) is accurate in all final renders. Do not crop product images too tightly; leave room for text overlays.
                     </p>
                     <div className="mt-6 pt-6 border-t border-amber-200/50 flex gap-4">
                        <div className="text-xs text-amber-800/60 uppercase tracking-wider font-bold">Last Updated: 2 days ago</div>
                        <button className="text-xs text-amber-900 font-bold underline hover:no-underline ml-auto">Edit Notes</button>
                     </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
