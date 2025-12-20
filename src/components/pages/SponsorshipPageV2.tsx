import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { 
  ArrowRight, 
  BarChart3, 
  Globe, 
  Zap, 
  ShoppingBag, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Play,
  Share2,
  Smartphone,
  Users,
  Camera,
  Layers,
  ChevronRight
} from "lucide-react";

import { LuxuryHero } from "../sections/LuxuryHero";

// --- Global Motion Tokens ---
const EASING = [0.22, 1, 0.36, 1]; // cubic-bezier(0.22, 1, 0.36, 1)

// --- Components ---

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
  <button className="group px-8 py-4 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-black transition-all flex items-center gap-2">
    {children}
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
  </button>
);

const ButtonSecondary = ({ children }: { children: React.ReactNode }) => (
  <button className="group px-8 py-4 bg-transparent border border-gray-200 text-[#1A1A1A] text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:border-[#1A1A1A] transition-all">
    {children}
  </button>
);

// --- Section 1: Hero ---
const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#FDFDFB] overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: EASING }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1660800149025-27505fe45601?q=80&w=2000&auto=format&fit=crop" 
            alt="Runway Background" 
            className="w-full h-full object-cover opacity-20 grayscale brightness-125"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFDFB]/80 via-[#FDFDFB]/50 to-[#FDFDFB]" />
        
        {/* Subtle Ambient Shapes */}
        <motion.div 
          animate={{ 
            x: [0, 12, 0], 
            y: [0, -8, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4C5B0] rounded-full blur-[120px] opacity-10" 
        />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASING }}
        >
          <h1 className="text-6xl md:text-8xl font-serif text-[#1A1A1A] leading-[0.95] mb-8 tracking-tight">
            The Sponsorship <br />
            <span className="italic font-light text-gray-400">Operating System</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: EASING }}
          className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Turn brand exposure into measurable ROI—across live events and digital channels.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: EASING }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <ButtonPrimary>Start Sponsor Strategy</ButtonPrimary>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] cursor-pointer transition-colors group">
            <Play className="w-3 h-3 group-hover:scale-110 transition-transform" />
            See How It Works
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

// --- Section 2: The Problem ---
const TheProblem = () => {
  const cards = [
    { title: "Unmeasured Exposure", desc: "Logos on walls don't translate to data. You're flying blind on actual impact." },
    { title: "Manual Chaos", desc: "Spreadsheets, PDFs, and disconnected emails make activations inconsistent." },
    { title: "Zero Retention", desc: "Without clear ROI proof, sponsors view events as a one-time expense, not an asset." }
  ];

  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center mb-16">
          <Heading>Why Sponsorship Underperforms</Heading>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: i * 0.08, ease: EASING }}
              className="group p-10 bg-[#FAFAF9] border border-gray-100 rounded-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300"
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

// --- Section 3: The Solution (Diagram) ---
const TheSolution = () => {
  return (
    <Section className="bg-[#FDFDFB] overflow-hidden">
      <Container className="flex flex-col items-center">
        <div className="text-center mb-20 max-w-3xl">
          <Badge>The Solution</Badge>
          <Heading>One System. Full Visibility.</Heading>
          <Subheading className="mx-auto">
            FashionOS connects event activations, commerce, marketing channels, and ROI reporting — in one unified platform.
          </Subheading>
        </div>

        {/* System Diagram */}
        <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
          {/* Connector Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
             <motion.path 
               d="M450 250 L150 100" 
               stroke="#E5E5E5" strokeWidth="1" 
               initial={{ pathLength: 0 }} 
               whileInView={{ pathLength: 1 }} 
               transition={{ duration: 0.8, delay: 0.2 }}
             />
             <motion.path 
               d="M450 250 L750 100" 
               stroke="#E5E5E5" strokeWidth="1" 
               initial={{ pathLength: 0 }} 
               whileInView={{ pathLength: 1 }} 
               transition={{ duration: 0.8, delay: 0.2 }}
             />
             <motion.path 
               d="M450 250 L150 400" 
               stroke="#E5E5E5" strokeWidth="1" 
               initial={{ pathLength: 0 }} 
               whileInView={{ pathLength: 1 }} 
               transition={{ duration: 0.8, delay: 0.2 }}
             />
             <motion.path 
               d="M450 250 L750 400" 
               stroke="#E5E5E5" strokeWidth="1" 
               initial={{ pathLength: 0 }} 
               whileInView={{ pathLength: 1 }} 
               transition={{ duration: 0.8, delay: 0.2 }}
             />
          </svg>

          {/* Center Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASING }}
            className="relative z-10 w-64 h-64 bg-white rounded-full shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-[#F0F0F0] flex flex-col items-center justify-center text-center p-6"
          >
            <div className="text-3xl font-serif text-[#1A1A1A] mb-2">FashionOS</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-400">Sponsorship System</div>
          </motion.div>

          {/* Outer Nodes */}
          {[
            { label: "Event Activations", x: "left-0", y: "top-10" },
            { label: "Live Commerce", x: "right-0", y: "top-10" },
            { label: "Audience & Leads", x: "left-0", y: "bottom-10" },
            { label: "ROI Analytics", x: "right-0", y: "bottom-10" },
          ].map((node, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.96 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.3, delay: 0.2 + (i * 0.1), ease: EASING }}
               className={`absolute ${node.x} ${node.y} w-48 h-32 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-4`}
             >
               <span className="text-sm font-medium text-gray-800">{node.label}</span>
             </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Section 4: How It Works ---
const HowItWorks = () => {
  const steps = ["Discover", "Sign Up", "AI Strategy", "Activate", "Measure", "Renew"];

  return (
    <Section className="bg-white">
      <Container>
        <div className="mb-20">
          <Heading>How It Works</Heading>
        </div>

        <div className="relative">
          {/* Progress Line Background */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -translate-y-1/2" />
          
          {/* Progress Line Fill */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASING }}
            className="absolute top-1/2 left-0 w-full h-[1px] bg-[#1A1A1A] -translate-y-1/2 origin-left"
          />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.07, ease: EASING }}
                className="group relative"
              >
                <div className="w-4 h-4 bg-white border-2 border-[#1A1A1A] rounded-full mx-auto mb-6 relative z-10 group-hover:scale-125 transition-transform duration-300" />
                <div className="text-center">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">0{i+1}</span>
                  <span className="text-sm text-gray-500 font-medium group-hover:text-[#1A1A1A] transition-colors">{step}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

// --- Section 5: Sponsor Strategy Wizard ---
const StrategyWizard = () => {
  return (
    <Section className="bg-[#FAFAF9]">
      <Container>
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/3">
            <Badge>Efficiency</Badge>
            <Heading>A Sponsor Strategy in Minutes</Heading>
            <Subheading className="mb-8">
              AI suggests the best fit events and activations. Brands stay in control of approval and budget.
            </Subheading>
            <ButtonSecondary>Try The Demo</ButtonSecondary>
          </div>

          <div className="md:w-2/3 w-full">
            <div className="relative max-w-lg mx-auto">
              {/* Stacked Cards */}
              {[
                "1. Add Brand Profile", 
                "2. Define Goals (Awareness vs Conversion)", 
                "3. Select Matching Events", 
                "4. Configure Activations", 
                "5. Preview ROI Projection"
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1, ease: EASING }}
                  className="bg-white p-6 mb-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between"
                  style={{ marginLeft: i * 20 }} // Visual cascading effect
                >
                  <span className="text-sm font-medium text-gray-800">{step}</span>
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// --- Section 6: Activations ---
const Activations = () => {
  const items = [
    { title: "Runway Looks", img: "https://images.unsplash.com/photo-1640511132634-9ee464276452?q=80&w=800&auto=format&fit=crop" },
    { title: "VIP Moments", img: "https://images.unsplash.com/photo-1581529238021-433b692337a1?q=80&w=800&auto=format&fit=crop" },
    { title: "Influencer Content", img: "https://images.unsplash.com/photo-1643288178515-8b4ba815313a?q=80&w=800&auto=format&fit=crop" },
    { title: "Live Shopping", img: "https://images.unsplash.com/photo-1567182617421-5b55d6bc42e3?q=80&w=800&auto=format&fit=crop" },
    { title: "Post-Event Camp", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" },
    { title: "Digital Gift Bags", img: "https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center mb-16">
          <Heading>Activations That Feel Native</Heading>
          <Subheading className="mx-auto">Seamlessly integrated into the event experience.</Subheading>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08, ease: EASING }}
              className="group relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm cursor-pointer"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-white font-serif text-xl mb-2">{item.title}</h3>
                <p className="text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  View activation details &rarr;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Section 7: Live Commerce ---
const LiveCommerce = () => {
  return (
    <Section className="bg-[#1A1A1A] text-white">
      <Container>
        <div className="text-center mb-20">
          <Badge>Commerce</Badge>
          <Heading className="text-white">From Runway to Purchase</Heading>
        </div>

        <div className="grid md:grid-cols-4 gap-8 items-center text-center mb-24">
          {[
            { icon: Users, label: "Runway Look" },
            { icon: Target, label: "Product Tag" },
            { icon: Smartphone, label: "Mobile Cart" },
            { icon: ShoppingBag, label: "Checkout" }
          ].map((step, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.2, ease: EASING }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium tracking-wide uppercase">{step.label}</span>
              </motion.div>
              {i < 3 && (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.2 + 0.2 }}
                  className="hidden md:block h-[1px] bg-white/20 flex-1 mx-4" 
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Example KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Live Clicks", val: "3,420" },
            { label: "Purchases", val: "312" },
            { label: "Revenue", val: "$82,300" }
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.8 + (i * 0.1), ease: EASING }}
              className="bg-white/5 border border-white/10 p-8 rounded-sm text-center"
            >
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">{kpi.label}</div>
              <div className="text-3xl font-serif text-white">{kpi.val}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Section 9: ROI Dashboard ---
const ROIDashboard = () => {
  return (
    <Section className="bg-[#FDFDFB]">
      <Container className="flex flex-col md:flex-row items-center gap-20">
        <div className="md:w-1/2">
          <Badge>Analytics</Badge>
          <Heading>Defensible ROI</Heading>
          <Subheading className="mb-8">
            Prove value to sponsors with granular data. Track everything from initial reach to final conversion.
          </Subheading>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>Sales Attribution Confidence</span>
                <span>94%</span>
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "94%" }}
                  transition={{ duration: 1, delay: 0.2, ease: EASING }}
                  className="h-full bg-[#1A1A1A]" 
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>Cost Efficiency vs Benchmark</span>
                <span>+2.4x</span>
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  transition={{ duration: 1, delay: 0.4, ease: EASING }}
                  className="h-full bg-emerald-600" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
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
                 transition={{ duration: 0.3, delay: i * 0.1, ease: EASING }}
                 className={`p-8 bg-white border ${card.highlight ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100'} rounded-sm shadow-sm`}
               >
                 <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">{card.label}</div>
                 <div className={`text-3xl font-serif ${card.highlight ? 'text-emerald-700' : 'text-[#1A1A1A]'}`}>
                   {card.val}
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

// --- Section 10: AI Insights ---
const AIInsights = () => {
  const insights = [
    "Peak engagement happened during Look #7 (Givenchy Dress)",
    "Instagram Stories drove the highest ROI (4.2x)",
    "Recommendation: Boost post-show content for next 48 hours"
  ];

  return (
    <Section className="bg-[#FAFAF9]">
      <Container className="text-center max-w-4xl">
        <Sparkles className="w-8 h-8 text-[#D4C5B0] mx-auto mb-6" />
        <Heading>Intelligence That Works Quietly</Heading>
        
        <div className="grid gap-4 mt-12">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1, ease: EASING }}
              className="bg-white p-6 rounded-sm border border-gray-100 flex items-center gap-4 text-left shadow-sm"
            >
              <div className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full flex-shrink-0" />
              <span className="text-gray-700 font-medium">{insight}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Section 12: Final CTA ---
const FinalCTA = () => {
  return (
    <Section className="bg-[#FDFDFB] border-t border-gray-100">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASING }}
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

// --- Style Guide Section ---
const StyleGuide = () => {
  return (
    <Section className="bg-white border-t border-gray-200 py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Typography</h4>
            <div className="font-serif text-3xl mb-2">Editorial Display</div>
            <div className="text-sm text-gray-500">Inter / Sans Serif Body</div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Palette</h4>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#FDFDFB] border border-gray-200" title="Ivory" />
              <div className="w-8 h-8 bg-[#1A1A1A]" title="Charcoal" />
              <div className="w-8 h-8 bg-[#D4C5B0]" title="Sand Accent" />
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Motion Tokens</h4>
            <div className="text-xs font-mono text-gray-500 space-y-1">
              <div>EASING: [0.22, 1, 0.36, 1]</div>
              <div>FAST: 250ms</div>
              <div>STD: 400ms</div>
              <div>SLOW: 600ms</div>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Components</h4>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-[#1A1A1A] rounded-sm" />
              <div className="w-8 h-8 border border-gray-200 rounded-sm" />
              <div className="h-8 px-3 border border-[#D4C5B0] rounded-full flex items-center justify-center text-[10px]">BADGE</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default function SponsorshipPageV2() {
  return (
    <div className="font-sans antialiased text-[#1A1A1A] selection:bg-[#D4C5B0] selection:text-white">
      <LuxuryHero />
      <TheProblem />
      <TheSolution />
      <HowItWorks />
      <StrategyWizard />
      <Activations />
      <LiveCommerce />
      <ROIDashboard />
      <AIInsights />
      <FinalCTA />
      <StyleGuide />
    </div>
  );
}
