import { 
  Camera, 
  Video, 
  Trash2 
} from 'lucide-react';
import { motion } from "motion/react";
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { ShotItem } from '../../../context/BrandShootContext';

interface ShotCardProps {
  shot: ShotItem;
  index: number;
  onDelete: () => void;
}

export function ShotCard({ shot, index, onDelete }: ShotCardProps) {
  return (
      <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 border border-gray-100"
      >
          {/* Image Header */}
          <div className="relative aspect-video bg-gray-100 overflow-hidden">
              {shot.image ? (
                  <ImageWithFallback 
                      src={shot.image} 
                      alt={shot.name} 
                      className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  />
              ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-gray-300 bg-[#F8F5F1]">
                      {shot.type === 'Photo' ? <Camera className="w-8 h-8" /> : <Video className="w-8 h-8" />}
                      <span className="text-xs font-medium uppercase tracking-widest text-gray-400">Placeholder</span>
                  </div>
              )}
              
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#111111] shadow-sm">
                      Shot #{index + 1}
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
                      shot.type === 'Video' ? 'bg-indigo-500/90 text-white' : 'bg-gray-900/90 text-white'
                  }`}>
                      {shot.type}
                  </span>
              </div>

              <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(); }}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all"
              >
                  <Trash2 className="w-4 h-4" />
              </button>
          </div>

          {/* Content Body */}
          <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-2xl text-[#111111] leading-tight">{shot.name}</h3>
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                      shot.status === 'Completed' ? 'bg-emerald-500' : 
                      shot.status === 'Shooting' ? 'bg-indigo-500' : 'bg-gray-300'
                  }`} />
              </div>
              
              <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">
                  {shot.notes}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#FAFAFA] rounded-xl p-3">
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Scene</span>
                      <span className="text-sm font-medium text-[#111111]">{shot.scene}</span>
                  </div>
                  <div className="bg-[#FAFAFA] rounded-xl p-3">
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Talent</span>
                      <span className="text-sm font-medium text-[#111111]">{shot.talent}</span>
                  </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex -space-x-2">
                       {/* Mock Team Avatars */}
                       <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />
                       <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white" />
                  </div>
                  <span className="text-sm font-serif font-medium text-[#111111]">${shot.price}</span>
              </div>
          </div>
      </motion.div>
  );
}
