import React, { useState } from 'react';
import { 
  CloudRain, 
  Sun, 
  Navigation, 
  AlertOctagon, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRightLeft, 
  CheckCircle2,
  History,
  MoreVertical,
  Coffee,
  Calendar,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useBrandShoot } from '../../context/BrandShootContext';
import { MOCK_MODELS } from '../casting/CuraCasting';

interface ScheduleBlock {
  id: string;
  time: string;
  endTime: string;
  title: string;
  location: string;
  talent: string;
  type: 'indoor' | 'outdoor' | 'break' | 'admin';
  description?: string;
}

export function DynamicCallSheet({ onBack }: { onBack?: () => void }) {
  const { bookedTalent, callSheetSchedule, setCallSheetSchedule, updateChecklist } = useBrandShoot();
  const [hasIntervention, setHasIntervention] = useState(true);
  const [changeLog, setChangeLog] = useState<{time: string, text: string}[]>([]);
  
  // Use context schedule
  const schedule = callSheetSchedule;
  const setSchedule = setCallSheetSchedule;

  const handlePublish = () => {
    updateChecklist('callSheetIssued', true);
    // Could add toast here
    onBack?.();
  };
  
  // Compute talent string
  const talentNames = bookedTalent.length > 0 
    ? bookedTalent.map(id => MOCK_MODELS.find(m => m.id === id)?.name).filter(Boolean).join(", ")
    : "Sarah, David"; // Default fallback

  const handleSwap = () => {
    // Swap the 9am and 1pm slots
    const newSchedule = [...schedule];
    const morningSlot = newSchedule[1];
    const afternoonSlot = newSchedule[3];
    
    // Swap times
    const tempTime = morningSlot.time;
    const tempEndTime = morningSlot.endTime;
    
    morningSlot.time = afternoonSlot.time;
    morningSlot.endTime = afternoonSlot.endTime;
    
    afternoonSlot.time = tempTime;
    afternoonSlot.endTime = tempEndTime;

    // Swap positions in array
    newSchedule[1] = afternoonSlot;
    newSchedule[3] = morningSlot;

    setSchedule(newSchedule);
    setHasIntervention(false);
    setChangeLog(prev => [...prev, {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: 'Schedule optimized by AI based on weather forecast.'
    }]);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50">
               <ChevronLeft className="w-5 h-5" />
             </button>
             <div>
                <h1 className="font-serif text-lg font-medium leading-none mb-1">Call Sheet</h1>
                <p className="text-xs text-gray-500">Oct 24, 2024 • Production Day 2</p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="hidden sm:flex h-8 text-xs">
                Download PDF
             </Button>
             <Button 
                onClick={handlePublish}
                size="sm" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white h-8 text-xs border-0"
             >
                Publish Call Sheet
             </Button>
             <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-serif text-sm">
                JS
             </div>
           </div>
        </div>

        {/* Status Strip */}
        <div className="bg-gray-50 border-b border-gray-100">
           <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-6 overflow-x-auto">
              
              {/* Weather Status */}
              <div className="flex items-center gap-3 pr-6 border-r border-gray-200 shrink-0">
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Weather</span>
                    <div className="flex items-center gap-2">
                       {hasIntervention ? (
                           <CloudRain className="w-4 h-4 text-indigo-500" />
                       ) : (
                           <Sun className="w-4 h-4 text-amber-500" />
                       )}
                       <span className="text-sm font-medium">62°F • {hasIntervention ? 'Rain at 3PM' : 'Clear Skies'}</span>
                    </div>
                 </div>
              </div>

              {/* Traffic Status */}
              <div className="flex items-center gap-3 shrink-0">
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Traffic Risk</span>
                    <div className="flex items-center gap-2">
                       <Navigation className="w-4 h-4 text-green-600" />
                       <span className="text-sm font-medium text-green-700">Low (12 mins to Loc)</span>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* AI Intervention Card */}
        <AnimatePresence>
          {hasIntervention && (
            <motion.div 
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex items-start gap-4 relative z-10">
                   <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600">
                      <AlertOctagon className="w-5 h-5" />
                   </div>
                   <div className="flex-1">
                      <h3 className="text-sm font-bold text-indigo-900 mb-1">Schedule Optimization Suggested</h3>
                      <p className="text-sm text-indigo-700/80 leading-relaxed mb-4">
                        Heavy rain is forecasted for 3:00 PM. AI suggests swapping the <strong>Morning Studio Block</strong> with the <strong>Afternoon Outdoor Block</strong> to ensure dry conditions for the rooftop scene.
                      </p>
                      <div className="flex gap-3">
                         <Button 
                           onClick={handleSwap}
                           className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/10 border-0 h-9"
                         >
                           <ArrowRightLeft className="w-4 h-4 mr-2" />
                           Apply Schedule Swap
                         </Button>
                         <Button 
                            variant="outline" 
                            onClick={() => setHasIntervention(false)}
                            className="bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 h-9"
                         >
                           Dismiss
                         </Button>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline */}
        <div className="relative space-y-6 before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gray-100">
           <AnimatePresence mode='popLayout'>
             {schedule.map((block) => (
               <motion.div 
                  layout
                  key={block.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative pl-12 group"
               >
                  {/* Time Node */}
                  <div className={`
                    absolute left-0 top-0 w-10 h-10 rounded-full border-4 border-[#FDFBF9] flex items-center justify-center shadow-sm z-10
                    ${block.type === 'break' ? 'bg-orange-50 text-orange-600' : 
                      block.type === 'admin' ? 'bg-gray-100 text-gray-500' :
                      'bg-white text-gray-900'}
                  `}>
                     {block.type === 'break' ? <Coffee className="w-4 h-4" /> : 
                      block.type === 'admin' ? <Clock className="w-4 h-4" /> :
                      <div className="w-2.5 h-2.5 bg-gray-900 rounded-full" />}
                  </div>

                  {/* Card */}
                  <div className={`
                    p-5 rounded-2xl border transition-all duration-300
                    ${block.type === 'indoor' ? 'bg-white border-gray-200 hover:border-gray-300' :
                      block.type === 'outdoor' ? 'bg-white border-gray-200 hover:border-indigo-300 shadow-sm' :
                      block.type === 'break' ? 'bg-orange-50/50 border-orange-100 border-dashed' :
                      'bg-gray-50 border-gray-100'}
                  `}>
                     <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-xs font-medium text-gray-500">{block.time} - {block.endTime}</span>
                              {block.type === 'indoor' && <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-0 h-5 text-[10px]">Indoor</Badge>}
                              {block.type === 'outdoor' && <Badge variant="secondary" className="bg-sky-50 text-sky-700 hover:bg-sky-100 border-0 h-5 text-[10px]">Outdoor</Badge>}
                           </div>
                           <h3 className="font-serif text-lg font-medium text-gray-900">{block.title}</h3>
                        </div>
                        <button className="text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                           <MoreVertical className="w-4 h-4" />
                        </button>
                     </div>

                     {block.description && (
                       <p className="text-sm text-gray-500 mb-4">{block.description}</p>
                     )}

                     {(block.type === 'indoor' || block.type === 'outdoor') && (
                       <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-100/50">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                             <MapPin className="w-3.5 h-3.5 text-gray-400" />
                             {block.location}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                             <Users className="w-3.5 h-3.5 text-gray-400" />
                             {block.talent}
                          </div>
                       </div>
                     )}
                  </div>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>

        {/* Change Log */}
        {changeLog.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
               <History className="w-3 h-3" />
               Change Log
             </h4>
             <div className="space-y-3">
               {changeLog.map((log, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="flex items-start gap-3 text-sm"
                 >
                    <span className="font-mono text-gray-400 text-xs mt-0.5">{log.time}</span>
                    <span className="text-gray-600">{log.text}</span>
                 </motion.div>
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
}