import { motion, useInView } from "motion/react";
import { useRef } from "react";

const EASING = [0.22, 1, 0.36, 1];

export default function AIIntelligenceLayerV2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // 4 module cards positioned at corners
  const modules = [
    { label: "Event Activations", position: "top-left" },
    { label: "Live Commerce", position: "top-right" },
    { label: "Audience & Leads", position: "bottom-left" },
    { label: "ROI Analytics", position: "bottom-right" }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#FDFDFB]">
      <div className="max-w-5xl mx-auto">
        
        {/* ========== HEADER ========== */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASING }}
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-block px-4 py-2 rounded-full border border-[#D4C5B0] text-[#8C8070] text-[11px] uppercase tracking-[0.15em] bg-white">
              The Solution
            </span>
          </div>

          {/* Headline */}
          <h2 
            className="text-5xl md:text-6xl mb-6 text-[#1A1A1A]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            One System. Full Visibility.
          </h2>

          {/* Subheadline */}
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            FashionOS connects event activations, commerce, marketing channels, and ROI reporting — in one unified platform.
          </p>
        </motion.div>

        {/* ========== DIAGRAM ========== */}
        <div className="relative w-full max-w-4xl mx-auto" style={{ height: '500px' }}>
          
          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Top-left connector */}
            <motion.path 
              d="M 50% 50% L 20% 20%" 
              stroke="#E5E5E5" 
              strokeWidth="1" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }} 
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: EASING }}
            />
            
            {/* Top-right connector */}
            <motion.path 
              d="M 50% 50% L 80% 20%" 
              stroke="#E5E5E5" 
              strokeWidth="1" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }} 
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASING }}
            />
            
            {/* Bottom-left connector */}
            <motion.path 
              d="M 50% 50% L 20% 80%" 
              stroke="#E5E5E5" 
              strokeWidth="1" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }} 
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: EASING }}
            />
            
            {/* Bottom-right connector */}
            <motion.path 
              d="M 50% 50% L 80% 80%" 
              stroke="#E5E5E5" 
              strokeWidth="1" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }} 
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 0.8, delay: 0.7, ease: EASING }}
            />
          </svg>

          {/* CENTRAL HUB */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white flex flex-col items-center justify-center z-20"
            style={{
              border: '1px solid #F0F0F0',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASING }}
          >
            <div className="text-center">
              <div 
                className="text-3xl mb-2 text-[#1A1A1A]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                FashionOS
              </div>
              <div className="text-[10px] tracking-widest uppercase text-[#9CA3AF]">
                Sponsorship System
              </div>
            </div>
          </motion.div>

          {/* 4 MODULE CARDS */}
          {modules.map((module, i) => {
            const positions = {
              'top-left': 'top-10 left-0',
              'top-right': 'top-10 right-0',
              'bottom-left': 'bottom-10 left-0',
              'bottom-right': 'bottom-10 right-0'
            };

            return (
              <motion.div
                key={i}
                className={`absolute ${positions[module.position]} w-48 h-32 bg-white rounded-lg border border-[#E5E5E5] flex items-center justify-center p-4 z-10`}
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.8 + i * 0.1, 
                  ease: EASING 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  borderColor: '#C9A961',
                  transition: { duration: 0.25 }
                }}
              >
                <span className="text-sm font-medium text-[#1F2937] text-center">
                  {module.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}