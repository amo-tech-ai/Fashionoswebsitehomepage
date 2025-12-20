import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Sparkles, Target, Link as LinkIcon, RefreshCw, TrendingUp } from "lucide-react";

export default function AIIntelligenceLayer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isPulsing, setIsPulsing] = useState(false);

  // Subtle pulse animation every 6 seconds
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 1000);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // 5 AI nodes evenly spaced (72° apart, starting at top)
  const aiNodes = [
    {
      label: "Buyer Intent AI",
      desc: "Predicts readiness & demand",
      icon: Sparkles,
      angle: -90, // top
      color: "#C9A961"
    },
    {
      label: "Matching AI",
      desc: "Connects audiences to offers",
      icon: Target,
      angle: -18, // top-right (72° clockwise)
      color: "#8B9B7E"
    },
    {
      label: "Attribution AI",
      desc: "Tracks multi-touch journeys",
      icon: LinkIcon,
      angle: 54, // bottom-right
      color: "#4A7C59"
    },
    {
      label: "Revenue Intelligence AI",
      desc: "Forecasts ROI & outcomes",
      icon: TrendingUp,
      angle: 126, // bottom-left
      color: "#B8A99A"
    },
    {
      label: "Optimization AI",
      desc: "Improves performance continuously",
      icon: RefreshCw,
      angle: 198, // top-left
      color: "#8B9B7E"
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#FDFCFA]">
      <div className="max-w-5xl mx-auto">
        {/* ========== HEADER ========== */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow Badge */}
          <div className="flex justify-center mb-6">
            <span className="text-xs tracking-[0.15em] uppercase text-[#6B6B6B] border border-[#E8E5E0] rounded-full px-4 py-2">
              AI Intelligence Layer
            </span>
          </div>

          {/* Headline */}
          <h2 
            className="text-5xl md:text-6xl mb-6 text-[#1A1A1A]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            AI Orchestrates the Entire System
          </h2>

          {/* Subhead */}
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Five intelligent systems actively power every workflow in real time.
          </p>
        </motion.div>

        {/* ========== RADIAL DIAGRAM ========== */}
        <div className="relative w-full max-w-3xl mx-auto" style={{ minHeight: '700px' }}>
          
          {/* CENTER NODE */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-white flex flex-col items-center justify-center z-20"
            style={{
              boxShadow: isPulsing 
                ? '0 20px 80px rgba(201, 169, 97, 0.25), 0 0 1px rgba(0, 0, 0, 0.1)'
                : '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 1s ease'
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-center">
              <div 
                className="text-[28px] mb-2 text-[#1A1A1A]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                FashionOS
              </div>
              <div className="text-[9px] tracking-[0.15em] uppercase text-[#6B6B6B]">
                AI Intelligence Engine
              </div>
            </div>

            {/* Subtle pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#C9A961]/20"
              initial={{ scale: 1, opacity: 0 }}
              animate={isPulsing ? { 
                scale: 1.15, 
                opacity: [0, 0.5, 0] 
              } : { 
                scale: 1, 
                opacity: 0 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </motion.div>

          {/* 5 AI NODES (SPOKES) */}
          {aiNodes.map((node, i) => {
            const radius = 280;
            const x = Math.cos((node.angle * Math.PI) / 180) * radius;
            const y = Math.sin((node.angle * Math.PI) / 180) * radius;

            return (
              <div key={i}>
                {/* Connector Line */}
                <motion.div
                  className="absolute top-1/2 left-1/2 origin-bottom pointer-events-none"
                  style={{
                    width: '1px',
                    height: `${radius - 110}px`,
                    backgroundColor: '#E8E5E0',
                    transform: `translate(-50%, -100%) translate(0, 0) rotate(${node.angle + 180}deg)`,
                    zIndex: 1
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + i * 0.15, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                />

                {/* AI Node */}
                <motion.div
                  className="absolute top-1/2 left-1/2 flex flex-col items-center"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    zIndex: 10
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.0 + i * 0.15, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                >
                  {/* Node Circle */}
                  <div 
                    className="w-14 h-14 bg-white rounded-full border border-[#E8E5E0] flex items-center justify-center mb-3 hover:border-[#C9A961] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
                    style={{
                      boxShadow: '0 6px 20px rgba(26, 26, 26, 0.08)'
                    }}
                  >
                    <node.icon 
                      className="w-6 h-6" 
                      style={{ color: node.color }} 
                      strokeWidth={1.5} 
                    />
                  </div>

                  {/* Node Label */}
                  <div 
                    className="text-center max-w-[140px]"
                  >
                    <div className="text-sm text-[#1A1A1A] mb-1">
                      {node.label}
                    </div>
                    <div className="text-xs text-[#6B6B6B]">
                      {node.desc}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Bottom explanation text */}
        <motion.div
          className="text-center mt-20 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm text-[#6B6B6B] italic">
            Every activation, audience interaction, and revenue outcome flows through these five AI systems—continuously learning and optimizing without manual intervention.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
