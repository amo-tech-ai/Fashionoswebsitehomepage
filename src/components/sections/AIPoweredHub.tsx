import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Calendar, Building2, TrendingUp, Users } from "lucide-react";

interface AIPoweredHubProps {
  variant?: "real-estate" | "beauty" | "automotive" | "electronics" | "fashion";
}

export default function AIPoweredHub({ variant = "real-estate" }: AIPoweredHubProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isPulsing, setIsPulsing] = useState(false);
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  // Pulse animation loop every 6 seconds
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 1000);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Module configuration - positioned diagonally at 45° intervals
  const modules = [
    { 
      label: "Event Activations", 
      icon: Calendar, 
      color: "#C9A961", 
      angle: -135 // top-left
    },
    { 
      label: "Live Commerce", 
      icon: Building2, 
      color: "#8B9B7E", 
      angle: -45 // top-right
    },
    { 
      label: "Omnichannel Distribution", 
      icon: TrendingUp, 
      color: "#B8A99A", 
      angle: 135 // bottom-left
    },
    { 
      label: "ROI Analytics", 
      icon: Users, 
      color: "#4A7C59", 
      angle: 45 // bottom-right
    },
  ];

  // AI Functions - embedded inside core hub
  const aiFunctions = [
    "Predicts Buyer Intent",
    "Matches Products to Audiences",
    "Tracks Multi-Touch Attribution",
    "Continuously Optimizes Campaigns"
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#FDFCFA]">
      <div className="max-w-5xl mx-auto">
        {/* ========== SECTION HEADER ========== */}
        
        {/* Eyebrow Badge */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-[#6B6B6B] border border-[#E8E5E0] rounded-full px-4 py-2">
            The Solution
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-5xl md:text-6xl text-center mb-6 text-[#1A1A1A]"
          style={{ 
            fontFamily: 'Georgia, serif',
            lineHeight: '1.1',
            maxWidth: '800px',
            margin: '0 auto 24px'
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          One System. Full Visibility.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          className="text-center text-[#6B6B6B] max-w-2xl mx-auto mb-24"
          style={{ 
            fontSize: '20px',
            lineHeight: '1.6'
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          FashionOS uses embedded AI to coordinate activations, audiences, commerce, and ROI — in real time.
        </motion.p>

        {/* ========== AI-POWERED HUB DIAGRAM ========== */}
        <div className="relative w-full max-w-4xl mx-auto" style={{ minHeight: '600px' }}>
          
          {/* LAYER 1 — OUTER RING (SYSTEM BOUNDARY) */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E8E5E0]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* LAYER 2 — AI INTELLIGENCE RING */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #C9A961 0%, #8B9B7E 50%, #C9A961 100%)',
              opacity: isPulsing ? 0.5 : 0.35,
              padding: '6px',
              transition: 'opacity 1s ease'
            }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={isInView ? { 
              opacity: isPulsing ? 0.5 : 0.35,
              rotate: 360 
            } : {}}
            transition={{ 
              opacity: { duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 60, repeat: Infinity, ease: "linear" }
            }}
          >
            {/* Inner circle creates ring effect */}
            <div className="w-full h-full rounded-full bg-[#FDFCFA]" />
          </motion.div>

          {/* AI Ring Label */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.15em] uppercase text-[#6B6B6B]"
            style={{ transform: 'translate(-50%, -170px)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            AI Intelligence Engine
          </motion.div>

          {/* LAYER 3 — CORE HUB */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-white flex flex-col items-center justify-center z-10 cursor-default"
            style={{ 
              boxShadow: isPulsing 
                ? '0 20px 80px rgba(201, 169, 97, 0.25), 0 0 1px rgba(0, 0, 0, 0.1)'
                : '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 1s ease'
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Core Hub Text */}
            <div className="text-center mb-6">
              <div 
                className="text-[28px] mb-2 text-[#1A1A1A]" 
                style={{ fontFamily: 'Georgia, serif' }}
              >
                FashionOS
              </div>
              <div className="text-[9px] tracking-[0.15em] uppercase text-[#6B6B6B]">
                AI Sponsorship System
              </div>
            </div>

            {/* AI Functions Inside Core */}
            <div className="space-y-2 px-6 w-full max-w-[180px]">
              {aiFunctions.map((func, i) => (
                <motion.div
                  key={i}
                  className="text-[11px] text-[#6B6B6B] text-center py-1 hover:bg-[#FDFCFA] hover:text-[#1A1A1A] rounded transition-all relative cursor-default"
                  initial={{ opacity: 0, y: 6 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.8 + i * 0.12, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  title="Used across all campaigns"
                >
                  {func}
                  {/* Divider line */}
                  {i < aiFunctions.length - 1 && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-px bg-[#E8E5E0]" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* MODULE CARDS (DIAGONAL POSITIONS) */}
          {modules.map((module, i) => {
            const radius = 240;
            const x = Math.cos((module.angle * Math.PI) / 180) * radius;
            const y = Math.sin((module.angle * Math.PI) / 180) * radius;
            const isHovered = hoveredModule === i;

            return (
              <div key={i}>
                {/* Module Card */}
                <motion.div
                  className="absolute top-1/2 left-1/2 bg-white rounded-xl p-7 text-center transition-all duration-300 cursor-pointer"
                  style={{
                    width: '224px',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    border: isHovered ? `1px solid ${module.color}` : '1px solid #E8E5E0',
                    boxShadow: isHovered 
                      ? '0 12px 32px rgba(26, 26, 26, 0.12)' 
                      : '0 4px 16px rgba(26, 26, 26, 0.06)',
                    zIndex: isHovered ? 10 : 5
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1
                  } : {}}
                  whileHover={{ y: -4 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.4 + i * 0.15, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  onMouseEnter={() => setHoveredModule(i)}
                  onMouseLeave={() => setHoveredModule(null)}
                >
                  {/* Module Icon */}
                  <motion.div 
                    className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${module.color}15` }}
                    animate={{ 
                      scale: isHovered ? 1.1 : 1,
                      rotate: isHovered ? 3 : 0
                    }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <module.icon 
                      className="w-6 h-6" 
                      style={{ color: module.color }} 
                      strokeWidth={1.5} 
                    />
                  </motion.div>
                  
                  {/* Module Label */}
                  <div className="text-sm text-[#1A1A1A]">
                    {module.label}
                  </div>
                </motion.div>

                {/* CONNECTOR LINE FROM AI RING */}
                <motion.div
                  className="absolute top-1/2 left-1/2 origin-bottom pointer-events-none"
                  style={{
                    width: '1px',
                    height: `${radius - 140}px`,
                    borderLeft: `1px dashed ${module.color}`,
                    opacity: isHovered ? 1 : 0.5,
                    transform: `translate(-50%, -100%) translate(${x * 0.58}px, ${y * 0.58}px) rotate(${module.angle + 180}deg)`,
                    zIndex: 1,
                    transition: 'opacity 200ms ease'
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={isInView ? { 
                    scaleY: 1, 
                    opacity: isHovered ? 1 : 0.5
                  } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.6 + i * 0.15, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
