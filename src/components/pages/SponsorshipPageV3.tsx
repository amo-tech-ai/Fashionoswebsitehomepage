import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Target, 
  Smartphone, 
  ShoppingBag, 
  Share2, 
  BarChart3, 
  Zap, 
  Layers,
  Globe,
  MessageCircle,
  Mail,
  Repeat
} from "lucide-react";

// --- Global Motion System ---
const EASING = [0.22, 1, 0.36, 1]; // Premium "Calm" Easing
const FADE_UP = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.6, ease: EASING }
};

// --- Reusable Components ---

const Section = ({ 
  children, 
  className = "", 
  id = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-28 relative ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-6 max-w-[1200px] ${className}`}>
    {children}
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 rounded-full border border-[#D4C5B0] text-[#8C8070] text-[10px] uppercase tracking-[0.2em] font-bold mb-6 bg-[#FDFDFB]">
    {children}
  </span>
);

const Heading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight mb-6 ${className}`}>
    {children}
  </h2>
);

const Subheading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-lg md:text-xl text-gray-500 font-light max-w-2xl leading-relaxed ${className}`}>
    {children}
  </p>
);

const ButtonPrimary = ({ children }: { children: React.ReactNode }) => (
  <button className="group px-8 py-4 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-black transition-all flex items-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-0.5">
    {children}
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
  </button>
);

const ButtonSecondary = ({ children }: { children: React.ReactNode }) => (
  <button className="group px-8 py-4 bg-transparent border border-gray-200 text-[#1A1A1A] text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:border-[#1A1A1A] transition-all hover:-translate-y-0.5">
    {children}
  </button>
);

// --- Section A: Hero (Cinematic Motion System) ---
const Hero = () => {
  const { scrollY } = useScroll();
  const [isStarting, setIsStarting] = useState(false);

  // Parallax Depth (Subtle, Luxury)
  // BG moves slowest (+16px equivalent at max scroll), FG moves fastest (+56px)
  const yBg = useTransform(scrollY, [0, 800], [0, 60]); 
  const yMid = useTransform(scrollY, [0, 800], [0, 120]);
  const yFg = useTransform(scrollY, [0, 800], [0, 200]);

  return (
    <div className="relative h-[900px] flex items-center justify-center bg-[#FDFDFB] overflow-hidden">
      
      {/* --- BG / Atmosphere --- */}
      {/* Story: "You've arrived in a premium fashion environment." */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }} // Frame 01: Arrival
      >
        <img 
          src="https://images.unsplash.com/photo-1575925251153-6953908bc215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000" 
          alt="Fashion Atmosphere" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Soft abstract gradients / low contrast overlay */}
        <div className="absolute inset-0 bg-[#FDFDFB] mix-blend-color opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFB] via-[#FDFDFB]/80 to-transparent" />
      </motion.div>

      {/* --- MID / System --- */}
      {/* Story: "Here's the connecting thread." */}
      <motion.div 
        style={{ y: yMid }}
        className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
      >
        <svg width="1200" height="400" viewBox="0 0 1200 400" className="w-full h-full opacity-40">
           {/* Horizontal Path */}
           <motion.path 
             d="M 200,200 L 1000,200" 
             stroke="#1A1A1A" 
             strokeWidth="1" 
             strokeDasharray="4 4"
             fill="none"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 1 }}
             transition={{ duration: 1.5, delay: 0.8, ease: EASING }} // Frame 02: Understanding
           />
           {/* Dots (Touchpoints) */}
           {[0, 1, 2, 3, 4].map((i) => (
             <motion.circle 
               key={i}
               cx={200 + i * 200} 
               cy="200" 
               r="3" 
               fill="#1A1A1A"
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.4, delay: 1.0 + i * 0.1, ease: "easeOut" }}
             />
           ))}
           {/* Highlight last dot (Intent) */}
           <motion.circle 
              cx="1000" cy="200" r="6" fill="#D4C5B0" opacity="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
           />
        </svg>
      </motion.div>

      {/* --- FG / Message --- */}
      <Container className="relative z-20 text-center">
        <motion.div style={{ y: yFg }} className="flex flex-col items-center">
          
          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASING }} // Frame 02
            className="text-6xl md:text-8xl font-serif text-[#1A1A1A] leading-[0.9] tracking-tight mb-8"
          >
            Turn Sponsorship <br />
            into <span className="italic font-light text-gray-400">Performance</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASING }} // Frame 02 delayed
            className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            FashionOS connects live events, commerce, and ROI into one intelligent system.
          </motion.p>

          {/* CTAs (Frame 03: Intent) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2, ease: EASING }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Primary CTA with Loading State */}
            <div className="relative">
              <button 
                onClick={() => setIsStarting(!isStarting)}
                className="group relative px-9 py-4 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-[0.15em] rounded-sm overflow-hidden transition-all duration-200 hover:bg-black active:translate-y-[2px] active:opacity-90"
              >
                <span className={`flex items-center gap-3 transition-opacity duration-300 ${isStarting ? "opacity-0" : "opacity-100"}`}>
                  Start Sponsor Strategy
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                
                {/* Loading Text */}
                <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isStarting ? "opacity-100" : "opacity-0"}`}>
                  Preparing Strategy...
                </span>
                
                {/* Progress Bar */}
                {isStarting && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 h-[2px] bg-[#D4C5B0] w-full origin-left"
                  />
                )}
              </button>
            </div>

            {/* Secondary CTA */}
            <button className="group relative px-6 py-4 text-[#1A1A1A] text-xs font-bold uppercase tracking-[0.15em] hover:text-black transition-colors">
               See How It Works
               {/* Underline Draw */}
               <span className="absolute bottom-3 left-6 right-6 h-[1px] bg-[#1A1A1A] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
            </button>
          </motion.div>

        </motion.div>
      </Container>
    </div>
  );
};

// --- Section B: The Problem ---
const Problem = () => {
  const cards = [
    { title: "Exposure without measurement", desc: "Logos on walls don't translate to data. You're flying blind on actual impact." },
    { title: "Manual & Inconsistent", desc: "Spreadsheets, PDFs, and disconnected emails make activations chaotic." },
    { title: "No Connection to ROI", desc: "Without clear sales data, sponsors view events as a one-time expense." }
  ];

  return (
    <Section className="bg-white">
      <Container>
        <motion.div {...FADE_UP} className="mb-16 text-center">
          <Badge>The Challenge</Badge>
          <Heading>Why Sponsorship Underperforms</Heading>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASING }}
              className="p-10 bg-[#FAFAF9] border border-gray-100 rounded-sm hover:shadow-lg transition-all duration-300 group cursor-default"
            >
              <div className="w-8 h-[1px] bg-[#D4C5B0] mb-8 group-hover:w-16 transition-all duration-300" />
              <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">{card.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Section C: The Solution (Hub Diagram) ---
const Solution = () => {
  return (
    <Section className="bg-[#FDFDFB] overflow-hidden">
      <Container className="flex flex-col items-center">
        <motion.div {...FADE_UP} className="text-center mb-20 max-w-3xl">
          <Badge>The Solution</Badge>
          <Heading>One System. Full Visibility.</Heading>
        </motion.div>

        {/* Hub Animation */}
        <div className="relative w-full max-w-3xl aspect-[16/9] flex items-center justify-center">
           {/* Center Node */}
           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, ease: EASING }}
             className="z-10 w-48 h-48 bg-white rounded-full shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center p-4 relative"
           >
             <div className="text-2xl font-serif text-[#1A1A1A]">FashionOS</div>
             <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Sponsorship System</div>
             {/* Pulse Ring */}
             <div className="absolute inset-0 rounded-full border border-[#D4C5B0] opacity-20 animate-ping" />
           </motion.div>

           {/* Satellites */}
           {[
             { label: "Activations", angle: 0 },
             { label: "Live Commerce", angle: 72 },
             { label: "Marketing", angle: 144 },
             { label: "Audience Data", angle: 216 },
             { label: "ROI Analytics", angle: 288 },
           ].map((item, i) => {
             const r = 180; // radius
             const x = r * Math.cos((item.angle * Math.PI) / 180 - Math.PI / 2);
             const y = r * Math.sin((item.angle * Math.PI) / 180 - Math.PI / 2);
             
             return (
               <React.Fragment key={i}>
                 {/* Connector Line */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                   <motion.line
                     x1="50%" y1="50%" x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`}
                     stroke="#E5E5E5" strokeWidth="1"
                     initial={{ pathLength: 0 }}
                     whileInView={{ pathLength: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                   />
                 </svg>
                 {/* Node */}
                 <motion.div
                   initial={{ opacity: 0, scale: 0 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: EASING }}
                   style={{ transform: `translate(${x}px, ${y}px)` }}
                   className="absolute bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-600 whitespace-nowrap"
                 >
                   {item.label}
                 </motion.div>
               </React.Fragment>
             );
           })}
        </div>
      </Container>
    </Section>
  );
};

// --- Section D: How It Works (Cinematic Sequential) ---
const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  // Auto-play sequence logic (simulates the "Motion Frames")
  React.useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev < 4 ? prev + 1 : 0));
      }, 2500); // Allow time to read each step before advancing
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const steps = [
    { 
      id: "01", 
      title: "Discover Opportunities", 
      points: ["Explore curated fashion events", "See audience, reach, and sponsor fit", "Compare sponsorship formats"] 
    },
    { 
      id: "02", 
      title: "AI Builds Strategy", 
      points: ["Brand + goals analyzed", "Activations recommended", "ROI projected before launch"] 
    },
    { 
      id: "03", 
      title: "Activate at Event", 
      points: ["Runway moments", "Branded experiences", "Live commerce enabled"] 
    },
    { 
      id: "04", 
      title: "Measure Performance", 
      points: ["Engagement and sales tracked", "Channel-level attribution", "Clear ROI dashboard"] 
    },
    { 
      id: "05", 
      title: "Optimize & Renew", 
      points: ["AI insights post-event", "What worked, what to improve", "Repeat or scale smarter"] 
    }
  ];

  return (
    <Section className="bg-[#FDFDFB] overflow-hidden">
      <Container>
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <Heading>How Sponsorship Works</Heading>
          <Subheading>A simple, intelligent path from brand intent to measurable performance.</Subheading>
          <div className="h-[1px] w-full bg-gray-200 mt-8 origin-left" />
        </div>

        {/* Cards Container */}
        <div 
          ref={containerRef}
          className="relative flex flex-col lg:flex-row items-stretch gap-0"
        >
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            const isPast = activeStep > i;

            return (
              <React.Fragment key={i}>
                {/* Step Card */}
                <motion.div
                  onHoverStart={() => setActiveStep(i)}
                  className={`relative flex-1 p-8 rounded-sm border transition-all duration-500 cursor-default flex flex-col min-h-[320px] ${
                    isActive 
                      ? "bg-white border-gray-100 shadow-[0_12px_24px_rgba(0,0,0,0.04)] z-10 opacity-100" 
                      : "bg-[#FAFAF9] border-transparent opacity-40 hover:opacity-60"
                  }`}
                  animate={{ 
                    scale: isActive ? 1 : 0.98,
                    y: isActive ? 0 : 8,
                  }}
                  transition={{ duration: 0.4, ease: EASING }}
                >
                  {/* Step Badge */}
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold mb-6 transition-all duration-500 ${
                    isActive 
                      ? "bg-[#1A1A1A] border-[#1A1A1A] text-white" 
                      : "bg-transparent border-gray-300 text-gray-400"
                  }`}>
                    {step.id}
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-serif mb-6 transition-colors duration-300 ${
                    isActive ? "text-[#1A1A1A]" : "text-gray-400"
                  }`}>
                    {step.title}
                  </h3>

                  {/* Bullet Points */}
                  <ul className="space-y-3 mt-auto">
                    {step.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`w-1 h-1 rounded-full mt-2 transition-colors duration-300 ${
                          isActive ? "bg-[#D4C5B0]" : "bg-gray-300"
                        }`} />
                        <span className={`text-xs font-medium leading-relaxed transition-colors duration-300 ${
                          isActive ? "text-gray-600" : "text-gray-400"
                        }`}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Active Indicator Line (Bottom) */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-step-line"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4C5B0]" 
                    />
                  )}
                </motion.div>

                {/* Arrow Connector (Desktop) - Between Cards */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center w-12 shrink-0 relative">
                    <svg width="48" height="24" viewBox="0 0 48 24" className="overflow-visible">
                      <motion.path 
                        d="M 0,12 L 40,12" 
                        fill="none" 
                        stroke="#D4C5B0" 
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: isPast || isActive ? 1 : 0,
                          opacity: isPast || isActive ? 1 : 0.2
                        }}
                        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                      />
                      <motion.path 
                        d="M 36,8 L 40,12 L 36,16" 
                        fill="none" 
                        stroke="#D4C5B0" 
                        strokeWidth="1"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ 
                          opacity: isPast || isActive ? 1 : 0,
                          x: isPast || isActive ? 0 : -5
                        }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

// --- Section E: Strategy Wizard ---
const StrategyWizard = () => {
  const [activeStep, setActiveStep] = useState(2); // Mock active state

  return (
    <Section className="bg-[#FAFAF9]">
      <Container>
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3 sticky top-32">
            <Badge>Efficiency</Badge>
            <Heading>A Sponsor Strategy in Minutes</Heading>
            <Subheading className="mb-8">
              AI suggests the best fit events and activations. Brands stay in control of approval and budget.
            </Subheading>
          </div>

          <div className="md:w-2/3 w-full space-y-4">
             {[
               "Add Brand Profile & URL",
               "Define Goals (Awareness vs Conversion)",
               "Select Matching Events",
               "Configure Activations",
               "Preview ROI Projection"
             ].map((text, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.4, delay: i * 0.1, ease: EASING }}
                 className={`p-6 rounded-lg border flex items-center gap-4 transition-all duration-300 ${
                   i <= activeStep 
                   ? "bg-white border-emerald-100 shadow-sm" 
                   : "bg-transparent border-gray-200 opacity-60"
                 }`}
               >
                 <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                   i <= activeStep ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300 text-gray-300"
                 }`}>
                   {i < activeStep ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs">{i + 1}</span>}
                 </div>
                 <span className={`text-sm font-medium ${i <= activeStep ? "text-gray-900" : "text-gray-400"}`}>{text}</span>
                 {i === activeStep && (
                   <motion.div layoutId="active-indicator" className="ml-auto text-xs font-bold uppercase text-emerald-600 tracking-wider">
                     Active
                   </motion.div>
                 )}
               </motion.div>
             ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

// --- Section F: Activations Grid ---
const Activations = () => {
  const items = [
    { title: "Runway Tagging", img: "https://images.unsplash.com/photo-1640511132634-9ee464276452?q=80&w=600" },
    { title: "Branded Moments", img: "https://images.unsplash.com/photo-1581529238021-433b692337a1?q=80&w=600" },
    { title: "VIP Lounge", img: "https://images.unsplash.com/photo-1560448204-e897cda51f87?q=80&w=600" },
    { title: "Creator Content", img: "https://images.unsplash.com/photo-1643288178515-8b4ba815313a?q=80&w=600" },
    { title: "Live Shopping", img: "https://images.unsplash.com/photo-1567182617421-5b55d6bc42e3?q=80&w=600" },
    { title: "Post-Event Campaigns", img: "https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=600" },
  ];

  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center mb-16">
          <Heading>Activations That Feel Native</Heading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASING }}
              className="group relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-serif">{item.title}</h3>
                <div className="h-[1px] w-0 bg-white mt-2 transition-all duration-300 group-hover:w-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Section G: Live Commerce ---
const LiveCommerce = () => {
  return (
    <Section className="bg-[#1A1A1A] text-white">
      <Container>
        <div className="text-center mb-16">
          <Badge>Commerce</Badge>
          <Heading className="text-white">From Runway to Purchase</Heading>
        </div>
        
        {/* Flow */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-20">
           {[
             { icon: Users, label: "Runway Look" },
             { icon: Target, label: "Product Tag" },
             { icon: Smartphone, label: "Mobile Cart" },
             { icon: ShoppingBag, label: "Checkout" }
           ].map((step, i) => (
             <React.Fragment key={i}>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">{step.label}</span>
                </motion.div>
                {i < 3 && <div className="hidden md:block w-16 h-[1px] bg-white/20" />}
             </React.Fragment>
           ))}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4 text-center border-t border-white/10 pt-10">
          {[
            { label: "Live Clicks", val: "3,420" },
            { label: "Purchases", val: "312" },
            { label: "Revenue", val: "$82.3k" }
          ].map((kpi, i) => (
            <div key={i}>
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">{kpi.label}</div>
              <div className="text-3xl font-serif">{kpi.val}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Section H: Distribution ---
const Distribution = () => {
  return (
    <Section className="bg-[#FAFAF9]">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <Heading>Reach Beyond the Venue</Heading>
            <Subheading>
              Automatically generate content packs for every channel. Amplify the event lifecycle.
            </Subheading>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="relative h-[400px] bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex items-center justify-center">
               <div className="absolute inset-0 flex items-center justify-center opacity-10">
                 <Globe className="w-64 h-64 text-gray-400" />
               </div>
               
               {/* Central Node */}
               <div className="z-10 bg-[#1A1A1A] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                 Event Source
               </div>

               {/* Orbiting Channels */}
               {[
                 { icon: Share2, label: "Instagram", x: -120, y: -80 },
                 { icon: MessageCircle, label: "WhatsApp", x: 120, y: -80 },
                 { icon: Mail, label: "Email", x: 0, y: 120 },
                 { icon: Repeat, label: "Retargeting", x: 0, y: -140 },
               ].map((node, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, scale: 0 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.15 }}
                   className="absolute bg-white p-3 rounded-lg shadow-md border border-gray-100 flex items-center gap-2"
                   style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
                 >
                   <node.icon className="w-4 h-4 text-gray-600" />
                   <span className="text-xs font-bold text-gray-800">{node.label}</span>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// --- Section I: ROI Dashboard ---
const ROI = () => {
  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center mb-16">
          <Heading>Defensible ROI</Heading>
          <Subheading className="mx-auto">Real-time performance tracking.</Subheading>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
           <div className="bg-[#FDFDFB] p-8 rounded-lg border border-gray-100">
             <div className="flex items-center justify-between mb-8">
               <h3 className="font-serif text-xl">Performance Overview</h3>
               <BarChart3 className="w-5 h-5 text-gray-400" />
             </div>
             
             {/* Progress Bars */}
             <div className="space-y-6">
               {[
                 { label: "Reach Goal", val: "125%", color: "bg-[#1A1A1A]" },
                 { label: "Engagement Rate", val: "84%", color: "bg-gray-400" },
                 { label: "Sales Attribution", val: "92%", color: "bg-[#D4C5B0]" }
               ].map((bar, i) => (
                 <div key={i}>
                   <div className="flex justify-between text-xs font-bold uppercase mb-2 text-gray-500">
                     <span>{bar.label}</span>
                     <span>{bar.val}</span>
                   </div>
                   <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: bar.val }}
                       viewport={{ once: true }}
                       transition={{ duration: 1, delay: 0.2 }}
                       className={`h-full ${bar.color}`} 
                     />
                   </div>
                 </div>
               ))}
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             {[
               { label: "Total Reach", val: "125k" },
               { label: "Engagements", val: "18.4k" },
               { label: "Qualified Leads", val: "2,150" },
               { label: "ROI Multiple", val: "3.2x", highlight: true }
             ].map((card, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className={`p-6 rounded-lg border flex flex-col justify-center ${
                   card.highlight ? "bg-emerald-50 border-emerald-100" : "bg-white border-gray-100"
                 }`}
               >
                 <div className="text-xs uppercase text-gray-400 tracking-wider mb-2">{card.label}</div>
                 <div className={`text-3xl font-serif ${card.highlight ? "text-emerald-800" : "text-[#1A1A1A]"}`}>{card.val}</div>
               </motion.div>
             ))}
           </div>
        </div>
      </Container>
    </Section>
  );
};

// --- Section J: AI Insights ---
const AIInsights = () => {
  return (
    <Section className="bg-[#1A1A1A] text-white">
      <Container className="text-center max-w-4xl">
        <Sparkles className="w-8 h-8 text-[#D4C5B0] mx-auto mb-6 animate-pulse" />
        <Heading className="text-white">Intelligence That Works Quietly</Heading>
        <div className="grid gap-4 mt-12 text-left">
           {[
             "Peak engagement happened during Look #7 (Givenchy Dress)",
             "Instagram Stories drove the highest ROI (4.2x) compared to feed posts",
             "Recommendation: Boost post-show content for next 48 hours"
           ].map((txt, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.15 }}
               className="bg-white/5 border border-white/10 p-6 rounded-sm flex items-center gap-4 hover:bg-white/10 transition-colors"
             >
               <Zap className="w-4 h-4 text-[#D4C5B0]" />
               <span className="text-gray-200 font-light">{txt}</span>
             </motion.div>
           ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Section K: Industries ---
const Industries = () => {
  return (
    <Section className="bg-[#FDFDFB]">
      <Container className="text-center">
        <div className="mb-12">
          <Badge>Industries</Badge>
          <Heading>Built for Premium Sponsors</Heading>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {["Beauty", "Automotive", "Beverages", "Jewelry", "Consumer Electronics"].map((ind, i) => (
            <span key={i} className="px-6 py-3 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-full">
              {ind}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Section L: Final CTA ---
const FinalCTA = () => {
  return (
    <Section className="bg-white border-t border-gray-100">
      <Container className="text-center">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: EASING }}
        >
          <Heading>Turn Sponsorship into Performance</Heading>
          <Subheading className="mx-auto mb-10">
            Start a sponsor strategy and preview projected ROI before you commit.
          </Subheading>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <ButtonPrimary>Start Sponsor Strategy</ButtonPrimary>
            <ButtonSecondary>Contact Partnerships</ButtonSecondary>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default function SponsorshipPageV3() {
  return (
    <div className="font-sans antialiased text-[#1A1A1A] selection:bg-[#D4C5B0] selection:text-white bg-[#FDFDFB]">
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <StrategyWizard />
      <Activations />
      <LiveCommerce />
      <Distribution />
      <ROI />
      <AIInsights />
      <Industries />
      <FinalCTA />
    </div>
  );
}
