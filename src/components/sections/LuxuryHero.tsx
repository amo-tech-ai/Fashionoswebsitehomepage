import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play, Star, Disc } from 'lucide-react';

const EASING = [0.22, 1, 0.36, 1]; // cubic-bezier(0.22, 1, 0.36, 1)

export const LuxuryHero = () => {
  const { scrollY } = useScroll();

  // Parallax transformations
  const textY = useTransform(scrollY, [0, 500], [0, -40]);
  const subY = useTransform(scrollY, [0, 500], [0, -60]);
  const graphicRotate = useTransform(scrollY, [0, 1000], [0, 45]);
  
  // Opacity fade on scroll
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <div className="relative h-[950px] w-full flex items-center justify-center bg-[#FDFDFB] overflow-hidden">
      {/* --- Ambient Background Layers --- */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        
        {/* 1. Silk/Fabric Texture Base (Warmth) */}
        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-multiply bg-center bg-cover"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1666112512232-f763ceeb5ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000')` 
          }}
        />

        {/* 2. Soft Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-multiply z-10" />
        
        {/* 3. Vignette */}
        <div className="absolute inset-0 z-20" 
             style={{ background: 'radial-gradient(circle at center, transparent 30%, #FDFDFB 100%)' }} 
        />

        {/* 4. Abstract Light/Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden"
        >
          <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#EAE0D5] rounded-full blur-[150px] opacity-40" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#F0EBE5] rounded-full blur-[120px] opacity-40" />
        </motion.div>

        {/* 5. Precision Vector Graphics (The "System" Look) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-30">
          <svg width="800" height="800" viewBox="0 0 800 800" className="w-[120vw] h-[120vw] md:w-[800px] md:h-[800px]">
            {/* Outer Ring - Dashed */}
            <motion.circle 
              cx="400" cy="400" r="390" 
              stroke="#D4C5B0" strokeWidth="1" fill="none" 
              strokeDasharray="4 8"
              style={{ rotate: graphicRotate }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: EASING }}
            />
            {/* Middle Ring - Solid thin */}
            <motion.circle 
              cx="400" cy="400" r="300" 
              stroke="#1A1A1A" strokeWidth="0.5" fill="none" opacity="0.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 2, delay: 0.5, ease: EASING }}
            />
             {/* Inner Ring - Rotating slowly */}
             <motion.g animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "400px 400px" }}>
                <circle cx="400" cy="400" r="250" stroke="#D4C5B0" strokeWidth="1" fill="none" strokeDasharray="1 10" />
                <circle cx="400" cy="150" r="4" fill="#1A1A1A" />
                <circle cx="400" cy="650" r="4" fill="#1A1A1A" />
                <circle cx="150" cy="400" r="4" fill="#1A1A1A" />
                <circle cx="650" cy="400" r="4" fill="#1A1A1A" />
             </motion.g>
          </svg>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-30 container mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Animated Badge */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.8 }}
           className="mb-8 flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">System v2.0 Live</span>
        </motion.div>

        {/* Headline Group */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="mb-8 relative"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASING }}
            className="flex flex-col items-center leading-[0.9]"
          >
            {/* Fashion / Serif */}
            <span className="text-7xl md:text-[6.5rem] lg:text-[7.5rem] font-serif font-medium text-[#1A1A1A] tracking-tight block">
              The Sponsorship
            </span>
            {/* Tech / Light Italic */}
            <div className="flex items-center gap-4 md:gap-8">
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: 100 }} 
                 transition={{ duration: 1, delay: 0.5, ease: EASING }}
                 className="h-[1px] bg-gray-300 hidden md:block" 
               />
               <span className="text-5xl md:text-[5rem] lg:text-[5.5rem] font-serif font-light text-[#666] italic tracking-tight block">
                 Operating System
               </span>
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: 100 }} 
                 transition={{ duration: 1, delay: 0.5, ease: EASING }}
                 className="h-[1px] bg-gray-300 hidden md:block" 
               />
            </div>
          </motion.h1>
          
          {/* Decorative Floating Elements (Parallax) */}
          <motion.div 
            style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
            className="absolute -right-12 -top-12 hidden lg:block opacity-60"
          >
             <Star className="w-8 h-8 text-[#D4C5B0] rotate-12" strokeWidth={1} />
          </motion.div>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          style={{ y: subY, opacity: textOpacity }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: EASING }}
          className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-[560px] mb-12 relative"
        >
          Turn brand exposure into measurable ROI—across live events and digital channels.
          {/* Subtle underline decoration */}
          <motion.span 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASING }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-[#D4C5B0]" 
          />
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: EASING }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
        >
          {/* Primary Button */}
          <button className="group relative px-9 py-4 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-[0.15em] rounded-sm overflow-hidden transition-all duration-300 hover:bg-black hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1">
            <span className="relative z-10 flex items-center gap-3">
              Start Strategy
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

          {/* Secondary Button */}
          <button className="group flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#1A1A1A] transition-colors hover:text-black">
             <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:border-[#1A1A1A] group-hover:scale-105">
                <Play className="w-3 h-3 ml-0.5 fill-current" />
             </div>
             <span>See how it works</span>
          </button>
        </motion.div>

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
            Powering Sponsorship For
          </span>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale mix-blend-multiply">
             {/* Text Logos as Placeholders - Elegant Serif */}
             <span className="font-serif text-lg text-[#1A1A1A]">VOGUE</span>
             <span className="font-serif text-lg text-[#1A1A1A]">LVMH</span>
             <span className="font-serif text-lg text-[#1A1A1A]">FASHION WEEK</span>
             <span className="font-serif text-lg text-[#1A1A1A]">IMG</span>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator (Bottom) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none mix-blend-multiply opacity-40"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
      </motion.div>
    </div>
  );
};
