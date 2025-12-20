import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  MapPin, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  CloudRain, 
  Sun, 
  Zap,
  MoreVertical,
  Phone,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useBrandShoot, ScheduleBlock } from '../../context/BrandShootContext';
import { MOCK_MODELS } from '../casting/CuraCasting';

// --- Mock Data Extensions ---
interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'checked_in' | 'en_route' | 'delayed' | 'pending';
  avatar: string;
  eta?: string;
}

const INITIAL_CREW: TeamMember[] = [
  { id: 'c1', name: 'Elena R.', role: 'Photographer', status: 'checked_in', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: 'c2', name: 'Marcus T.', role: 'Stylist', status: 'delayed', eta: '25m', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
];

export function DynamicCallSheet({ onBack }: { onBack?: () => void }) {
  const { callSheetSchedule, setCallSheetSchedule, campaignPlan, bookedTalent } = useBrandShoot();
  
  // Simulation State
  const [currentTime, setCurrentTime] = useState<string>('09:30 AM'); // Start inside the first/second block
  const [weatherAlert, setWeatherAlert] = useState<boolean>(true);
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_CREW);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- Connect Logic: Hydrate Team from Context ---
  useEffect(() => {
    // Convert bookedTalent (ids) to TeamMember objects
    const bookedModels: TeamMember[] = bookedTalent.map(id => {
        const model = MOCK_MODELS.find(m => m.id === id);
        return {
            id: `model-${id}`,
            name: model?.name || 'Unknown Model',
            role: 'Talent',
            status: 'en_route', // Default status for models
            avatar: model?.image || '',
            eta: '15m'
        };
    });

    // Merge Crew + Booked Talent
    setTeam([...INITIAL_CREW, ...bookedModels]);
  }, [bookedTalent]);

  // Calculate status for each block based on "currentTime"
  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const currentMinutes = parseTime(currentTime);

  const getBlockStatus = (block: ScheduleBlock) => {
    const start = parseTime(block.time);
    const end = parseTime(block.endTime);
    
    if (currentMinutes >= end) return 'completed';
    if (currentMinutes >= start && currentMinutes < end) return 'active';
    if (currentMinutes < start && start - currentMinutes <= 30) return 'upcoming'; // 30m buffer
    return 'pending';
  };

  // Auto-scroll reference
  const activeBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeBlockRef.current) {
      activeBlockRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []); // Run on mount

  // Handlers
  const handleSwapSchedule = () => {
    const newSchedule = [...callSheetSchedule];
    const outdoorIdx = newSchedule.findIndex(b => b.type === 'outdoor');
    if (outdoorIdx !== -1) {
        newSchedule[outdoorIdx] = {
            ...newSchedule[outdoorIdx],
            title: '⚠️ Weather Hold: Rooftop',
            type: 'break',
            description: 'Holding for rain to pass. Prepare Studio B as backup.'
        };
        setCallSheetSchedule(newSchedule);
        setWeatherAlert(false); // Clear alert after action
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans text-[#111111] overflow-hidden flex flex-col">
      
      {/* --- Top App Header --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-xl font-bold text-[#111111]">{campaignPlan?.strategy?.title || "Campaign Shoot"}</h1>
              <Badge variant="secondary" className="bg-red-600 text-white border-0 animate-pulse px-2 py-0.5 text-[10px] uppercase tracking-wider">
                Live
              </Badge>
            </div>
            <p className="text-xs text-gray-500 font-medium tracking-wide mt-0.5 uppercase">
              Day 1 of 2 • New York, NY • <span className="text-gray-900 font-bold">{currentTime}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
             <div className="w-2 h-2 rounded-full bg-green-500" />
             All Systems Online
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex border-gray-300">
            View Contract
          </Button>
          <Button variant="destructive" size="sm" className="bg-[#111111] text-white hover:bg-black">
            <Phone className="w-3.5 h-3.5 mr-2" />
            Emergency
          </Button>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-[1800px] mx-auto flex flex-col md:flex-row">
            
            {/* LEFT COLUMN (Primary - 70%) */}
            <div className="flex-1 h-full overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide">
                
                {/* Weather & Environment Panel */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                            {weatherAlert ? <CloudRain className="w-8 h-8 text-indigo-500" /> : <Sun className="w-8 h-8 text-amber-500" />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg text-[#111111]">62°F / Rain</h3>
                                {weatherAlert && (
                                    <Badge variant="destructive" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 text-[10px] uppercase tracking-wider">
                                        Alert
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 max-w-md">
                                {weatherAlert 
                                    ? "Precipitation expected at 2:00 PM. Indoor block swap recommended for Scene 2." 
                                    : "Clear skies for the remainder of the day. Outdoor light optimal."}
                            </p>
                        </div>
                    </div>
                    {weatherAlert && (
                        <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                             <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 bg-indigo-50 px-2 py-1 rounded-md">
                                <Zap className="w-3 h-3" /> AI Recommendation
                             </div>
                             <Button onClick={handleSwapSchedule} className="w-full md:w-auto bg-[#111111] text-white hover:bg-black shadow-lg shadow-black/10">
                                Apply Schedule Adjustment
                             </Button>
                        </div>
                    )}
                </div>

                {/* Live Timeline */}
                <div>
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Today's Schedule
                    </h2>
                    
                    <div className="space-y-4 relative">
                        {/* Timeline Connector Line */}
                        <div className="absolute left-[88px] top-4 bottom-4 w-0.5 bg-gray-200 z-0 hidden md:block" />

                        {callSheetSchedule.map((block, index) => {
                            const status = getBlockStatus(block);
                            const isActive = status === 'active';
                            const isCompleted = status === 'completed';
                            const isAtRisk = block.type === 'outdoor' && weatherAlert; // Simple risk logic

                            return (
                                <div 
                                    key={block.id}
                                    ref={isActive ? activeBlockRef : null}
                                    className={`relative z-10 flex flex-col md:flex-row gap-6 transition-all duration-500 ${isCompleted ? 'opacity-60 grayscale' : 'opacity-100'}`}
                                >
                                    {/* Time Column */}
                                    <div className="w-24 shrink-0 text-right pt-4 hidden md:block">
                                        <p className={`text-sm font-bold ${isActive ? 'text-[#111111]' : 'text-gray-400'}`}>{block.time}</p>
                                        <p className="text-xs text-gray-400">{block.endTime}</p>
                                    </div>

                                    {/* Card */}
                                    <motion.div 
                                        layout
                                        className={`
                                            flex-1 rounded-2xl p-5 border transition-all duration-300
                                            ${isActive 
                                                ? 'bg-white border-[#111111] shadow-xl shadow-gray-200/50 scale-[1.02] ring-1 ring-[#111111]/5' 
                                                : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'}
                                            ${isAtRisk && !isCompleted ? 'border-amber-300 bg-amber-50/30' : ''}
                                        `}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                {/* Mobile Time */}
                                                <div className="md:hidden text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                    {block.time}
                                                </div>
                                                
                                                <Badge className={`
                                                    rounded-full border-0 font-bold tracking-wide uppercase text-[10px] px-2.5 py-0.5
                                                    ${isActive ? 'bg-[#111111] text-white animate-pulse' : 
                                                      isCompleted ? 'bg-gray-100 text-gray-500' : 
                                                      'bg-indigo-50 text-indigo-600'}
                                                `}>
                                                    {isCompleted ? 'Completed' : isActive ? 'Live Now' : 'Upcoming'}
                                                </Badge>
                                                
                                                {isAtRisk && !isCompleted && (
                                                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 flex items-center gap-1">
                                                        <AlertTriangle className="w-3 h-3" /> Risk
                                                    </Badge>
                                                )}
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <div className="flex flex-col md:flex-row justify-between gap-6">
                                            <div>
                                                <h3 className={`font-serif text-xl font-medium mb-1 ${isActive ? 'text-[#111111]' : 'text-gray-700'}`}>
                                                    {block.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-4">{block.description}</p>
                                                
                                                <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                                                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-md border border-gray-100">
                                                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                        {block.location}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-md border border-gray-100">
                                                        <Users className="w-3.5 h-3.5 text-gray-400" />
                                                        {block.talent}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right side stats/actions (only active block) */}
                                            {isActive && (
                                                <div className="flex flex-col justify-end items-end gap-3 min-w-[140px]">
                                                    <div className="text-right">
                                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Samples</p>
                                                        <p className="text-lg font-serif font-medium">12 Items</p>
                                                    </div>
                                                    <div className="w-full h-px bg-gray-100 my-1" />
                                                    <div className="text-right">
                                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Progress</p>
                                                        <p className="text-lg font-serif font-medium text-emerald-600">45%</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN (Secondary - 30%) */}
            <div className="w-full md:w-[400px] border-l border-gray-200 bg-white h-full overflow-y-auto p-6 space-y-8 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-20">
                
                {/* AI Producer Panel (Sticky) */}
                <div className="sticky top-0 bg-white z-20 pb-6 border-b border-gray-100">
                    <div className="bg-[#111111] text-white rounded-2xl p-5 shadow-xl shadow-gray-200/50 relative overflow-hidden">
                        {/* Abstract Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <div className="flex items-center gap-2 mb-3 text-indigo-300">
                            <Zap className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">AI Producer</span>
                        </div>
                        
                        <h4 className="font-medium text-lg mb-2 leading-tight">Delay Look 3 by 20 mins?</h4>
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                            Based on Marcus T.'s delayed arrival (ETA 25m), shifting the next block will maintain lighting consistency.
                        </p>

                        <div className="flex gap-2">
                            <Button size="sm" className="bg-white text-black hover:bg-gray-200 text-xs font-bold flex-1">
                                Apply Change
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs font-bold flex-1">
                                Dismiss
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Team Check-In */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">On-Set Status</h3>
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500">
                            View All
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {team.map(member => (
                            <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-gray-50/50">
                                <div className="relative">
                                    <Avatar className="w-10 h-10 border border-white shadow-sm">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center
                                        ${member.status === 'checked_in' ? 'bg-green-500' : 
                                          member.status === 'en_route' ? 'bg-blue-500' : 
                                          member.status === 'delayed' ? 'bg-amber-500' : 'bg-gray-300'}
                                    `}>
                                        {member.status === 'checked_in' && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                                        {member.status === 'delayed' && <Clock className="w-2.5 h-2.5 text-white" />}
                                    </div>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-gray-900 truncate">{member.name}</h4>
                                    <p className="text-xs text-gray-500 truncate">{member.role}</p>
                                </div>

                                <div className="text-right">
                                    <Badge variant="secondary" className={`
                                        text-[10px] font-bold uppercase tracking-wider border-0
                                        ${member.status === 'checked_in' ? 'bg-green-100 text-green-700' : 
                                          member.status === 'en_route' ? 'bg-blue-100 text-blue-700' : 
                                          member.status === 'delayed' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}
                                    `}>
                                        {member.status.replace('_', ' ')}
                                    </Badge>
                                    {member.eta && (
                                        <p className="text-[10px] text-gray-400 font-medium mt-1">ETA {member.eta}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {team.length === INITIAL_CREW.length && (
                            <div className="text-center p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                                <p className="text-xs text-gray-400">No talent booked yet.</p>
                                <Button variant="link" onClick={onBack} className="text-xs text-indigo-600 h-auto p-0 mt-1">
                                    Go to Casting
                                </Button>
                            </div>
                        )}
                    </div>

                    <Button className="w-full mt-6 bg-[#111111] text-white h-12 rounded-xl shadow-lg shadow-black/5 font-bold text-sm gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        I'm Here (Check-In)
                    </Button>
                </div>

            </div>

        </div>
      </div>

    </div>
  );
}
