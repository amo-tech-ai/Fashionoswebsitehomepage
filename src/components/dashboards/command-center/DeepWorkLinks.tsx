import { 
  ClipboardList, 
  Camera, 
  Users, 
  Package, 
  FileText, 
  ArrowRight 
} from "lucide-react";

interface DeepWorkLinksProps {
  onNavigate: (section: string) => void;
}

export function DeepWorkLinks({ onNavigate }: DeepWorkLinksProps) {
  const tools = [
    {
      id: 'tasks',
      title: 'Execution List',
      description: 'Manage production checklist and critical path.',
      icon: ClipboardList,
      route: 'tasks'
    },
    {
      id: 'shotlist',
      title: 'Creative Shot List',
      description: 'Build shot sequences and product grouping.',
      icon: Camera,
      route: 'shotlist'
    },
    {
      id: 'casting',
      title: 'Cura Casting',
      description: 'Review talent options and confirm bookings.',
      icon: Users,
      route: 'casting'
    },
    {
      id: 'samples',
      title: 'Sample Tracker',
      description: 'Monitor logistics and sample arrivals.',
      icon: Package,
      route: 'sample-tracker'
    },
    {
        id: 'callsheet',
        title: 'Call Sheet',
        description: 'Manage daily schedule and team status.',
        icon: FileText,
        route: 'call-sheet'
      }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Deep Work Zones</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onNavigate(tool.route)}
            className="group flex flex-col items-start p-5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:border-black/10 hover:shadow-lg hover:shadow-gray-200/50 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <tool.icon className="w-5 h-5 text-gray-900" />
            </div>
            <h4 className="font-serif text-lg text-gray-900 mb-1">{tool.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-4 min-h-[40px]">
              {tool.description}
            </p>
            <div className="mt-auto flex items-center gap-2 text-xs font-bold text-gray-900 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              Launch Tool <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
