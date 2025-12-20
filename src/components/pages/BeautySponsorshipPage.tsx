import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, Sparkles, TrendingUp, Users, Target, Eye, ShoppingCart, BarChart3 } from "lucide-react";

export default function BeautySponsorshipPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <HeroSection />

      {/* Problem Section */}
      <ProblemSection />

      {/* System Map */}
      <SystemMapSection />

      {/* How It Works Stepper */}
      <HowItWorksSection />

      {/* Activations Grid */}
      <ActivationsSection />

      {/* Runway to Purchase Infographic (Dark) */}
      <RunwayToPurchaseSection />

      {/* Defensible ROI */}
      <ROIProofSection />

      {/* AI Insights */}
      <AIInsightsSection />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <BeautyFooter />
    </div>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-[85vh] flex items-center justify-center px-6 py-32 overflow-hidden">
      {/* Subtle Background Gradient + Grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F5F0E8] to-[#FAF8F5] opacity-60" />
      
      {/* System Beam Visual */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-[#D4C5A9]/30 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Mini Flow Diagram */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs text-[#706F6C] opacity-0"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 0.5, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <span>Moment</span>
        <ArrowRight className="w-3 h-3" />
        <span>Tag</span>
        <ArrowRight className="w-3 h-3" />
        <span>Content</span>
        <ArrowRight className="w-3 h-3" />
        <span>Click</span>
        <ArrowRight className="w-3 h-3" />
        <span>Purchase</span>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-[#706F6C]">For Beauty Brands</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl mb-8 text-[#2D2D2D] leading-[0.95]"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          The Beauty Sponsorship<br />Operating System
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-[#706F6C] max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Turn runway beauty moments into measurable sell-through, attribution, and retention.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="px-8 py-4 bg-[#2D2D2D] text-white hover:bg-[#D4C5A9] transition-colors duration-300">
            Start Beauty Strategy
          </button>
          <button className="px-8 py-4 border border-[#E5E1DA] text-[#2D2D2D] hover:border-[#D4C5A9] transition-colors duration-300 flex items-center justify-center gap-2">
            See How It Works
            <ChevronDown className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          className="text-sm text-[#706F6C] flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <span>Looks tagged</span>
          <span className="w-1 h-1 rounded-full bg-[#D4C5A9]" />
          <span>Creators tracked</span>
          <span className="w-1 h-1 rounded-full bg-[#D4C5A9]" />
          <span>Shopify sales attributed</span>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// PROBLEM SECTION
// ============================================================================

function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const problems = [
    {
      title: "Unmeasured Exposure",
      desc: "Beautiful moments, no attribution."
    },
    {
      title: "Manual Chaos",
      desc: "Tags, creators, deliverables tracked in spreadsheets."
    },
    {
      title: "Zero Retention",
      desc: "Post-show interest dies with no automation."
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 border-t border-[#E5E1DA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#2D2D2D]" style={{ fontFamily: 'Georgia, serif' }}>
            Why Beauty Sponsorship Underperforms
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
            >
              <div className="w-12 h-12 rounded-full border border-[#D4C5A9] flex items-center justify-center mx-auto mb-6 text-[#706F6C]">
                {i + 1}
              </div>
              <h3 className="text-xl mb-4 text-[#2D2D2D]">{problem.title}</h3>
              <p className="text-[#706F6C] leading-relaxed">{problem.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SYSTEM MAP SECTION
// ============================================================================

function SystemMapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-[#2D2D2D]" style={{ fontFamily: 'Georgia, serif' }}>
            One System. Full Visibility.
          </h2>
          <p className="text-lg text-[#706F6C] max-w-3xl mx-auto leading-relaxed">
            FashionOS connects event activations, commerce, marketing channels, and ROI reporting — in one unified platform.
          </p>
        </motion.div>

        {/* Hub-and-Spoke Layout */}
        <div className="relative w-full max-w-5xl mx-auto" style={{ minHeight: '700px' }}>
          {/* Central Hub */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white border border-[#E5E1DA] flex items-center justify-center shadow-sm z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2 text-[#2D2D2D]" style={{ fontFamily: 'Georgia, serif' }}>
                FashionOS
              </div>
              <div className="text-sm text-[#706F6C] tracking-wider uppercase">
                Sponsorship System
              </div>
            </div>
          </motion.div>

          {/* Top-Left: Event Activations */}
          <motion.div
            className="absolute top-0 left-0 w-64 h-40"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-full h-full rounded-lg bg-white border border-[#E5E1DA] flex items-center justify-center hover:border-[#D4C5A9] transition-all duration-300">
              <span className="text-base text-[#2D2D2D]">Event Activations</span>
            </div>
            {/* Connector Line */}
            <svg className="absolute top-full left-1/2 w-1 h-32 -translate-x-1/2" style={{ overflow: 'visible' }}>
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="128"
                stroke="#E5E1DA"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </svg>
          </motion.div>

          {/* Top-Right: Live Commerce */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-40"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="w-full h-full rounded-lg bg-white border border-[#E5E1DA] flex items-center justify-center hover:border-[#D4C5A9] transition-all duration-300">
              <span className="text-base text-[#2D2D2D]">Live Commerce</span>
            </div>
            {/* Connector Line */}
            <svg className="absolute top-full right-1/2 w-1 h-32 translate-x-1/2" style={{ overflow: 'visible' }}>
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="128"
                stroke="#E5E1DA"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              />
            </svg>
          </motion.div>

          {/* Bottom-Left: Audience & Leads */}
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-40"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Connector Line */}
            <svg className="absolute bottom-full left-1/2 w-1 h-32 -translate-x-1/2" style={{ overflow: 'visible' }}>
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="128"
                stroke="#E5E1DA"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
            </svg>
            <div className="w-full h-full rounded-lg bg-white border border-[#E5E1DA] flex items-center justify-center hover:border-[#D4C5A9] transition-all duration-300">
              <span className="text-base text-[#2D2D2D]">Audience & Leads</span>
            </div>
          </motion.div>

          {/* Bottom-Right: ROI Analytics */}
          <motion.div
            className="absolute bottom-0 right-0 w-64 h-40"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {/* Connector Line */}
            <svg className="absolute bottom-full right-1/2 w-1 h-32 translate-x-1/2" style={{ overflow: 'visible' }}>
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="128"
                stroke="#E5E1DA"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              />
            </svg>
            <div className="w-full h-full rounded-lg bg-white border border-[#E5E1DA] flex items-center justify-center hover:border-[#D4C5A9] transition-all duration-300">
              <span className="text-base text-[#2D2D2D]">ROI Analytics</span>
            </div>
          </motion.div>

          {/* Center-Top: AI Agents (5th node) */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-56 w-64 h-40"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="w-full h-full rounded-lg bg-white border border-[#E5E1DA] flex items-center justify-center hover:border-[#D4C5A9] transition-all duration-300">
              <span className="text-base text-[#2D2D2D]">AI Agents</span>
            </div>
            {/* Connector Line */}
            <svg className="absolute top-full left-1/2 w-1 h-24 -translate-x-1/2" style={{ overflow: 'visible' }}>
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="96"
                stroke="#E5E1DA"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// HOW IT WORKS STEPPER
// ============================================================================

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Discover", desc: "AI identifies beauty moments with high engagement potential" },
    { title: "Plan", desc: "AI builds sponsor plan with shade/SKU recommendations" },
    { title: "Activate", desc: "Backstage + runway tagging with MUA partnerships" },
    { title: "Measure", desc: "Track performance by shade, channel, and creator" },
    { title: "Optimize", desc: "Insight-driven re-activation and budget allocation" },
  ];

  return (
    <section ref={ref} className="py-32 px-6 border-t border-[#E5E1DA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#2D2D2D]" style={{ fontFamily: 'Georgia, serif' }}>
            How It Works
          </h2>
        </motion.div>

        {/* Desktop: Horizontal Stepper */}
        <div className="hidden md:block">
          {/* Progress Line */}
          <div className="relative mb-16">
            <div className="h-[2px] bg-[#E5E1DA]">
              <motion.div
                className="h-full bg-[#D4C5A9]"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: (activeStep + 1) / steps.length } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Step Nodes */}
            <div className="absolute top-0 left-0 right-0 flex justify-between -translate-y-1/2">
              {steps.map((_, i) => (
                <motion.button
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    i <= activeStep 
                      ? 'bg-[#D4C5A9] border-[#D4C5A9]' 
                      : 'bg-white border-[#E5E1DA]'
                  }`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  onClick={() => setActiveStep(i)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`text-center transition-opacity duration-300 ${
                  i === activeStep ? 'opacity-100' : 'opacity-40'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: i === activeStep ? 1 : 0.4, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                <div className="text-xs tracking-[0.2em] uppercase text-[#706F6C] mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl mb-3 text-[#2D2D2D]" style={{ fontFamily: 'Georgia, serif' }}>
                  {step.title}
                </h3>
                <p className="text-sm text-[#706F6C] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Stepper */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#D4C5A9] bg-white flex items-center justify-center text-sm">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-[2px] flex-1 bg-[#E5E1DA] my-2" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <h3 className="text-lg mb-2 text-[#2D2D2D]">{step.title}</h3>
                <p className="text-sm text-[#706F6C] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ACTIVATIONS GRID
// ============================================================================

function ActivationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const activations = [
    { 
      label: "Runway Looks",
      image: "https://images.unsplash.com/photo-1715229900753-4d160b4f27d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcnVud2F5JTIwbWFrZXVwfGVufDF8fHx8MTc2NjIxNzk2NXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "VIP Moments",
      image: "https://images.unsplash.com/photo-1717177007172-d333206f67d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBiYWNrc3RhZ2UlMjBmYXNoaW9ufGVufDF8fHx8MTc2NjIxNzk2NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Influencer Content",
      image: "https://images.unsplash.com/photo-1758272421578-840698d05a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBpbmZsdWVuY2VyJTIwY29udGVudHxlbnwxfHx8fDE3NjYyMTc5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Live Shopping",
      image: "https://images.unsplash.com/photo-1523634118614-82b2685ee3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYWtldXAlMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzY2MjE3OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Backstage Capture",
      image: "https://images.unsplash.com/photo-1599847987657-881f11b92a75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHJvdXRpbmV8ZW58MXx8fHwxNzY2MTY1MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Digital Gift Bags",
      image: "https://images.unsplash.com/photo-1635796436337-50481b9fa2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZnJhZ3JhbmNlfGVufDF8fHx8MTc2NjIwOTUyMHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#2D2D2D]" style={{ fontFamily: 'Georgia, serif' }}>
            Activations That Feel Native
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {activations.map((activation, i) => (
            <motion.div
              key={i}
              className="group relative aspect-[4/5] overflow-hidden bg-[#F5F0E8] cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <img
                src={activation.image}
                alt={activation.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-sm tracking-wider uppercase">{activation.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// RUNWAY TO PURCHASE INFOGRAPHIC (DARK)
// ============================================================================

function RunwayToPurchaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const flowNodes = [
    { icon: Sparkles, label: "Runway Look", desc: "Beauty moment captured" },
    { icon: Target, label: "Product Tagged", desc: "Shade + SKU linked" },
    { icon: Users, label: "Creator Content", desc: "MUA tutorials posted" },
    { icon: Eye, label: "Mobile Click", desc: "Get-the-look traffic" },
    { icon: ShoppingCart, label: "Shopify Checkout", desc: "Attribution confirmed" },
  ];

  const kpis = [
    { value: "847K", label: "Product Views" },
    { value: "124K", label: "Clicks" },
    { value: "$487K", label: "Revenue" },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#2D2D2D] text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            From Runway to Purchase
          </h2>
          <p className="text-lg text-[#E5E1DA] max-w-2xl mx-auto">
            Track the complete journey from beauty moment to revenue attribution
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
          {flowNodes.map((node, i) => (
            <div key={i} className="flex items-center gap-4">
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                  <node.icon className="w-8 h-8 text-[#D4C5A9]" strokeWidth={1.5} />
                </div>
                <div className="text-sm mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {node.label}
                </div>
                <div className="text-xs text-[#E5E1DA]">{node.desc}</div>
              </motion.div>

              {i < flowNodes.length - 1 && (
                <motion.div
                  className="hidden md:block w-12 h-[2px] bg-[#D4C5A9]/30"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* KPI Tiles */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
              <div className="text-4xl mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                {kpi.value}
              </div>
              <div className="text-sm text-[#E5E1DA]">{kpi.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// ROI PROOF SECTION
// ============================================================================

function ROIProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const kpis = [
    { value: "2.4M", label: "Impressions", change: "+340%" },
    { value: "8.4%", label: "Engagement Rate", change: "+180%" },
    { value: "12,847", label: "Attributed Purchases", change: "+420%" },
    { value: "4.2×", label: "ROI Multiple", change: "+210%" },
  ];

  const bars = [
    { label: "Attribution Confidence", value: 94 },
    { label: "Creator Effectiveness", value: 87 },
    { label: "Shade Discovery Rate", value: 76 },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-8 text-[#2D2D2D]" style={{ fontFamily: 'Georgia, serif' }}>
              Defensible ROI
            </h2>
            <p className="text-lg text-[#706F6C] leading-relaxed mb-12">
              Every beauty moment is tracked from runway to revenue. No assumptions. No spreadsheets. Just clean attribution data your CFO will approve.
            </p>

            {/* Progress Bars */}
            <div className="space-y-6">
              {bars.map((bar, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#2D2D2D]">{bar.label}</span>
                    <span className="text-[#D4C5A9]">{bar.value}%</span>
                  </div>
                  <div className="h-2 bg-[#E5E1DA] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#D4C5A9] rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: bar.value / 100 } : {}}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: KPI Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {kpis.map((kpi, i) => (
              <div key={i} className="bg-white border border-[#E5E1DA] rounded-lg p-8">
                <div className="text-3xl mb-2 text-[#2D2D2D]" style={{ fontFamily: 'Georgia, serif' }}>
                  {kpi.value}
                </div>
                <div className="text-sm text-[#706F6C] mb-3">{kpi.label}</div>
                <div className="text-xs text-[#D4C5A9]">{kpi.change}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// AI INSIGHTS ACCORDION
// ============================================================================

function AIInsightsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const insights = [
    {
      title: "Top Performing Shade Family",
      content: "Warm neutrals drove 47% of attributed revenue. Recommend doubling allocation for next activation."
    },
    {
      title: "Best Creator for Conversion",
      content: "@beautybyalex delivered 6.2× average ROI with 18% click-to-purchase rate on tutorial content."
    },
    {
      title: "Optimal Re-Activation Window",
      content: "72 hours post-show: peak engagement. Automated follow-up campaigns convert 3.4× higher."
    },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white border-t border-[#E5E1DA]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#2D2D2D]" style={{ fontFamily: 'Georgia, serif' }}>
            Intelligence That Works Quietly
          </h2>
        </motion.div>

        <div className="space-y-4">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              className="border border-[#E5E1DA] rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <Sparkles className="w-5 h-5 text-[#D4C5A9]" />
                  <span className="text-lg text-[#2D2D2D]">{insight.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#706F6C]" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: expandedIndex === i ? 'auto' : 0,
                  opacity: expandedIndex === i ? 1 : 0
                }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 pt-2 text-[#706F6C] leading-relaxed">
                  {insight.content}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-32 px-6 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-8 text-[#2D2D2D]" style={{ fontFamily: 'Georgia, serif' }}>
            Turn Beauty Moments into Performance
          </h2>
          <p className="text-lg text-[#706F6C] mb-12 leading-relaxed">
            See how FashionOS transforms beauty sponsorship from awareness spend to measurable revenue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-8 py-4 bg-[#2D2D2D] text-white hover:bg-[#D4C5A9] transition-colors duration-300 flex items-center justify-center gap-2">
              Start Beauty Strategy
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 border border-[#E5E1DA] text-[#2D2D2D] hover:border-[#D4C5A9] transition-colors duration-300">
              Request Demo
            </button>
          </div>

          <p className="text-sm text-[#706F6C]">
            Preview ROI before committing budget.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// BEAUTY FOOTER
// ============================================================================

function BeautyFooter() {
  return (
    <footer className="bg-[#2D2D2D] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="text-3xl mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              FashionOS
            </div>
            <p className="text-[#E5E1DA] leading-relaxed max-w-md">
              The operating system for fashion events, production, and commerce—designed for beauty brands.
            </p>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-[#E5E1DA]">Beauty Sponsors</h4>
            <ul className="space-y-3">
              <li><a href="/sponsors/beauty/playbook" className="text-sm hover:text-[#D4C5A9] transition-colors">Beauty Playbook</a></li>
              <li><a href="/case-studies/beauty" className="text-sm hover:text-[#D4C5A9] transition-colors">Case Studies</a></li>
              <li><a href="/dashboard/sponsors" className="text-sm hover:text-[#D4C5A9] transition-colors">Sponsor Dashboard</a></li>
              <li><a href="/sponsors/beauty/start" className="text-sm hover:text-[#D4C5A9] transition-colors">Start Strategy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-[#E5E1DA]">Resources</h4>
            <ul className="space-y-3">
              <li><a href="/tools/roi-calculator" className="text-sm hover:text-[#D4C5A9] transition-colors">ROI Calculator</a></li>
              <li><a href="/events" className="text-sm hover:text-[#D4C5A9] transition-colors">Event Calendar</a></li>
              <li><a href="/resources/beauty-metrics" className="text-sm hover:text-[#D4C5A9] transition-colors">Beauty Metrics Guide</a></li>
              <li><a href="/sponsors/cosmetics" className="text-sm hover:text-[#D4C5A9] transition-colors">Cosmetics Variant</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#E5E1DA]">© 2025 FashionOS. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#E5E1DA] hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-[#E5E1DA] hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-[#E5E1DA] hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}