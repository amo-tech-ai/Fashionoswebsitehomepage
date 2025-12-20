import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, Check, Sparkles, Users, Target, Calendar, MapPin, TrendingUp, BarChart3, Car, Award, Zap } from "lucide-react";

export default function AutomotiveSponsorshipPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <HeroSection />

      {/* Problem Section */}
      <ProblemSection />

      {/* System Map */}
      <SystemMapSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Automotive Use Cases */}
      <UseCasesSection />

      {/* Activations Grid */}
      <ActivationsSection />

      {/* Event to Purchase Flow (Dark) */}
      <EventToPurchaseSection />

      {/* Defensible ROI */}
      <ROISection />

      {/* Intelligence Section */}
      <IntelligenceSection />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <AutomotiveFooter />
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
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      >
        <img
          src="https://images.unsplash.com/photo-1761671612738-2ac97bc59141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBmYXNoaW9uJTIwZXZlbnR8ZW58MXx8fHwxNzY2MjE4NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury automotive event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#FAFAFA]" />
        {/* Subtle grain texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20" />
      </motion.div>

      {/* Floating KPI Chips */}
      <motion.div
        className="absolute top-1/4 right-[10%] bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="text-2xl mb-1">$2.4M</div>
        <div className="text-xs opacity-80">Attributed Revenue</div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-[8%] bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="text-2xl mb-1">4,287</div>
        <div className="text-xs opacity-80">Test Drives</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-[15%] bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="text-2xl mb-1">47</div>
        <div className="text-xs opacity-80">Vehicles Attributed</div>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            For Automotive Brands
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl mb-8 text-white leading-[0.95] tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The Automotive Sponsorship<br />Operating System
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          FashionOS connects luxury auto brands to high-net-worth fashion audiences with full attribution from event → test drive → purchase.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="px-8 py-4 bg-[#0066FF] text-white hover:bg-[#0052CC] transition-colors duration-300">
            Start Sponsor Strategy
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2">
            See How It Works
            <ChevronDown className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          className="text-sm text-white/80 flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span>Luxury Events</span>
          <span className="w-1 h-1 rounded-full bg-white/60" />
          <span>VIP Lounges</span>
          <span className="w-1 h-1 rounded-full bg-white/60" />
          <span>Test Drives</span>
          <span className="w-1 h-1 rounded-full bg-white/60" />
          <span>Attribution</span>
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
      desc: "Beautiful brand moments with zero attribution to actual sales.",
      metric: "87% lack ROI data"
    },
    {
      title: "Manual Chaos",
      desc: "Activations, leads, and follow-ups tracked in spreadsheets.",
      metric: "avg 47 hours/event"
    },
    {
      title: "No Retention Loop",
      desc: "Post-event interest dies with no automated nurture system.",
      metric: "93% leads go cold"
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 border-t border-[#E6E6E6] bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#0F0F0F] mb-4 tracking-tight">
            Why Sponsorship Underperforms
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              className="bg-[#FAFAFA] border border-[#E6E6E6] rounded-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
            >
              <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 flex items-center justify-center mb-6 text-[#0066FF]">
                {i + 1}
              </div>
              <h3 className="text-xl mb-4 text-[#0F0F0F]">{problem.title}</h3>
              <p className="text-[#525252] leading-relaxed mb-4">{problem.desc}</p>
              <div className="text-sm text-[#0066FF]">{problem.metric}</div>
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

  const nodes = [
    { label: "Event Activations", position: "top" },
    { label: "Live Commerce", position: "right" },
    { label: "Audience & Leads", position: "bottom" },
    { label: "ROI Analytics", position: "left" },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-[#525252] border border-[#E6E6E6] rounded-full px-4 py-2">
            The Solution
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className="text-5xl md:text-6xl text-[#0F0F0F] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            One System. Full Visibility.
          </h2>
        </motion.div>

        {/* Subheading */}
        <motion.p
          className="text-center text-[#525252] max-w-2xl mx-auto mb-24 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        >
          FashionOS connects event activations, commerce, marketing channels, and ROI reporting — in one unified platform.
        </motion.p>

        {/* Hub Diagram */}
        <div className="relative w-full max-w-4xl mx-auto" style={{ minHeight: '600px' }}>
          {/* Center Circle */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white shadow-2xl flex items-center justify-center z-10"
            style={{ 
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                FashionOS
              </div>
              <div className="text-xs tracking-[0.15em] uppercase text-[#525252]">
                Sponsorship System
              </div>
            </div>
          </motion.div>

          {/* Top Card - Event Activations */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-56 bg-white rounded-lg shadow-lg p-6 text-center"
            style={{ 
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ 
              y: -4, 
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.3 }
            }}
          >
            <div className="text-sm text-[#0F0F0F]">{nodes[0].label}</div>
          </motion.div>

          {/* Connecting line - Top */}
          <motion.div
            className="absolute top-[72px] left-1/2 -translate-x-1/2 w-[2px] h-24 bg-gradient-to-b from-[#E6E6E6] to-transparent origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
          />

          {/* Right Card - Live Commerce */}
          <motion.div
            className="absolute top-1/2 right-0 -translate-y-1/2 w-56 bg-white rounded-lg shadow-lg p-6 text-center"
            style={{ 
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ 
              y: -4, 
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.3 }
            }}
          >
            <div className="text-sm text-[#0F0F0F]">{nodes[1].label}</div>
          </motion.div>

          {/* Connecting line - Right */}
          <motion.div
            className="absolute top-1/2 right-[224px] -translate-y-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent to-[#E6E6E6] origin-right"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
          />

          {/* Bottom Card - Audience & Leads */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 bg-white rounded-lg shadow-lg p-6 text-center"
            style={{ 
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ 
              y: -4, 
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.3 }
            }}
          >
            <div className="text-sm text-[#0F0F0F]">{nodes[2].label}</div>
          </motion.div>

          {/* Connecting line - Bottom */}
          <motion.div
            className="absolute bottom-[72px] left-1/2 -translate-x-1/2 w-[2px] h-24 bg-gradient-to-t from-[#E6E6E6] to-transparent origin-bottom"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.19, 1, 0.22, 1] }}
          />

          {/* Left Card - ROI Analytics */}
          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2 w-56 bg-white rounded-lg shadow-lg p-6 text-center"
            style={{ 
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ 
              y: -4, 
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.3 }
            }}
          >
            <div className="text-sm text-[#0F0F0F]">{nodes[3].label}</div>
          </motion.div>

          {/* Connecting line - Left */}
          <motion.div
            className="absolute top-1/2 left-[224px] -translate-y-1/2 w-24 h-[2px] bg-gradient-to-l from-transparent to-[#E6E6E6] origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.19, 1, 0.22, 1] }}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// HOW IT WORKS SECTION
// ============================================================================

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const steps = [
    "Add objectives",
    "Define audience + location",
    "AI matches events",
    "Configure activations",
    "Launch & track"
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white border-t border-[#E6E6E6]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Title Block */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-[#0F0F0F] tracking-tight">
              A Sponsor Strategy<br />in Minutes
            </h2>
            <p className="text-lg text-[#525252] leading-relaxed">
              From brief → plan → activation → reporting in one system.
            </p>
          </motion.div>

          {/* Right: Checklist */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 bg-[#FAFAFA] border border-[#E6E6E6] rounded-lg p-4 hover:border-[#0066FF] transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <div className="w-6 h-6 rounded-full bg-[#00D084] flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <span className="text-[#0F0F0F]">{step}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// USE CASES SECTION
// ============================================================================

function UseCasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const useCases = [
    {
      title: "EV Launch at Fashion Week",
      desc: "Position electric vehicles at premium fashion events with sustainability messaging",
      icon: Zap,
      color: "#00D084"
    },
    {
      title: "SUV Family Luxury Lounge",
      desc: "Create VIP family experiences showcasing space, comfort, and premium features",
      icon: Users,
      color: "#0066FF"
    },
    {
      title: "Performance Model Afterparty",
      desc: "Exclusive test drives and experiences for high-performance vehicle lines",
      icon: TrendingUp,
      color: "#D4AF37"
    },
    {
      title: "Dealership Partner Activation",
      desc: "Bridge events to local dealerships with automated lead routing and follow-up",
      icon: MapPin,
      color: "#0066FF"
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#0F0F0F] mb-4 tracking-tight">
            Automotive Use Cases
          </h2>
          <p className="text-lg text-[#525252] max-w-2xl mx-auto">
            Tailored activations for every vehicle segment and audience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              className="bg-white border border-[#E6E6E6] rounded-lg p-8 hover:border-[#0066FF] hover:shadow-xl transition-all group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${useCase.color}15` }}
              >
                <useCase.icon className="w-7 h-7" style={{ color: useCase.color }} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl mb-3 text-[#0F0F0F]">{useCase.title}</h3>
              <p className="text-[#525252] leading-relaxed">{useCase.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ACTIVATIONS SECTION
// ============================================================================

function ActivationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const activations = [
    { 
      label: "Valet Arrival Moments",
      image: "https://images.unsplash.com/photo-1761671612738-2ac97bc59141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBmYXNoaW9uJTIwZXZlbnR8ZW58MXx8fHwxNzY2MjE4NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "VIP Lounge & Hospitality",
      image: "https://images.unsplash.com/photo-1598299827130-5aa1d5149c8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXAlMjBsb3VuZ2UlMjBwcmVtaXVtfGVufDF8fHx8MTc2NjIxODQ1OXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Influencer Content",
      image: "https://images.unsplash.com/photo-1760893107459-083fc58dee41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd2VlayUyMHZpcHxlbnwxfHx8fDE3NjYyMTg0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Live Test-Drive Booking",
      image: "https://images.unsplash.com/photo-1733534816908-650eaf9271f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwdGVzdCUyMGRyaXZlfGVufDF8fHx8MTc2NjIxODQ1OXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Post-Event Retargeting",
      image: "https://images.unsplash.com/photo-1660120447916-123439b05c40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaG9zcGl0YWxpdHklMjBldmVudHxlbnwxfHx8fDE3NjYyMTg0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Digital Car Configurator",
      image: "https://images.unsplash.com/photo-1599912027667-755b68b4dd3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjYxOTQ4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white border-t border-[#E6E6E6]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#0F0F0F] tracking-tight">
            Activations That Feel Native
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {activations.map((activation, i) => (
            <motion.div
              key={i}
              className="group relative aspect-[4/5] overflow-hidden bg-[#F5F5F5] cursor-pointer rounded-lg"
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
                <div className="text-sm tracking-wider">{activation.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// EVENT TO PURCHASE FLOW (DARK)
// ============================================================================

function EventToPurchaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const flowNodes = [
    { icon: Users, label: "Event Audience", desc: "Fashion event attendees" },
    { icon: Sparkles, label: "Brand Interaction", desc: "Lounge + test drive" },
    { icon: Calendar, label: "Test Drive Scheduled", desc: "Calendar booking" },
    { icon: MapPin, label: "Dealership Visit", desc: "Local partner" },
    { icon: Car, label: "Vehicle Purchase", desc: "Full attribution" },
  ];

  const kpis = [
    { value: "12,400", label: "Audience Reached" },
    { value: "4,287", label: "Test Drives" },
    { value: "$2.4M", label: "Revenue" },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">
            From Event to Purchase
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Track the complete journey from brand moment to dealership revenue
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
                transition={{ duration: 0.4, delay: i * 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                  <node.icon className="w-8 h-8 text-[#0066FF]" strokeWidth={1.5} />
                </div>
                <div className="text-sm mb-1">{node.label}</div>
                <div className="text-xs text-white/60">{node.desc}</div>
              </motion.div>

              {i < flowNodes.length - 1 && (
                <motion.div
                  className="hidden md:block w-12 h-[2px] bg-[#0066FF]/30"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* KPI Blocks */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-8 text-center backdrop-blur-sm">
              <div className="text-4xl mb-3 tracking-tight">{kpi.value}</div>
              <div className="text-sm text-white/70">{kpi.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// ROI SECTION
// ============================================================================

function ROISection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const kpis = [
    { value: "125K", label: "Total Reach", change: "+340%" },
    { value: "18.4%", label: "Engagement", change: "+180%" },
    { value: "3.2×", label: "ROI Multiple", change: "+210%" },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-8 text-[#0F0F0F] tracking-tight">
              Defensible ROI
            </h2>
            <div className="space-y-4 text-[#525252] leading-relaxed">
              <p className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00D084] flex-shrink-0 mt-1" />
                <span>Every touchpoint tracked from event to dealership</span>
              </p>
              <p className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00D084] flex-shrink-0 mt-1" />
                <span>Full attribution confidence with privacy-safe tracking</span>
              </p>
              <p className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00D084] flex-shrink-0 mt-1" />
                <span>Real-time dashboards your CFO will approve</span>
              </p>
            </div>
          </motion.div>

          {/* Right: KPI Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                className="bg-white border border-[#E6E6E6] rounded-lg p-8 hover:border-[#0066FF] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-4xl mb-2 text-[#0F0F0F] tracking-tight">{kpi.value}</div>
                    <div className="text-sm text-[#525252]">{kpi.label}</div>
                  </div>
                  <div className="text-sm text-[#00D084]">{kpi.change}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// INTELLIGENCE SECTION
// ============================================================================

function IntelligenceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const insights = [
    {
      title: "Predict sponsor-fit by event + audience",
      content: "AI analyzes event demographics, attendee profiles, and historical performance to recommend optimal sponsorship opportunities for your vehicle segments."
    },
    {
      title: "Suggest best activation mix per vehicle line",
      content: "Get data-driven recommendations on activation types (test drives, lounges, content) based on your vehicle's target demographic and price point."
    },
    {
      title: "Recommend re-activation window + retargeting plan",
      content: "Automated follow-up timing optimized for conversion. System identifies the ideal moment to re-engage prospects with personalized offers."
    },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white border-t border-[#E6E6E6]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#0F0F0F] tracking-tight">
            Intelligence That Works Quietly
          </h2>
        </motion.div>

        <div className="space-y-4">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              className="border border-[#E6E6E6] rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[#FAFAFA] transition-colors"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <Sparkles className="w-5 h-5 text-[#0066FF]" />
                  <span className="text-lg text-[#0F0F0F]">{insight.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#525252]" />
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
                <div className="px-8 pb-6 pt-2 text-[#525252] leading-relaxed">
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
    <section ref={ref} className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-8 text-[#0F0F0F] tracking-tight">
            Turn Sponsorship into Performance
          </h2>
          <p className="text-lg text-[#525252] mb-12 leading-relaxed">
            Start an automotive sponsor strategy and preview projected ROI before committing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-8 py-4 bg-[#0066FF] text-white hover:bg-[#0052CC] transition-colors duration-300 flex items-center justify-center gap-2">
              Start Automotive Strategy
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 border border-[#E6E6E6] text-[#0F0F0F] hover:border-[#0066FF] transition-colors duration-300">
              Download Auto Playbook
            </button>
          </div>

          <p className="text-sm text-[#525252]">
            Used by luxury brands • measurable attribution • privacy-safe tracking
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// AUTOMOTIVE FOOTER
// ============================================================================

function AutomotiveFooter() {
  return (
    <footer className="bg-[#0F0F0F] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="text-2xl mb-6 tracking-tight">FashionOS</div>
            <p className="text-white/70 text-sm leading-relaxed">
              Sponsorship Operating System
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 text-white/70">Sponsors</h4>
            <ul className="space-y-3">
              <li><a href="/sponsors/beauty" className="text-sm hover:text-[#0066FF] transition-colors">Beauty</a></li>
              <li><a href="/sponsors/automotive" className="text-sm hover:text-[#0066FF] transition-colors">Automotive</a></li>
              <li><a href="/sponsors/hospitality" className="text-sm hover:text-[#0066FF] transition-colors">Hospitality</a></li>
              <li><a href="/sponsors/payments" className="text-sm hover:text-[#0066FF] transition-colors">Payments</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 text-white/70">Automotive</h4>
            <ul className="space-y-3">
              <li><a href="/resources/auto-playbook" className="text-sm hover:text-[#0066FF] transition-colors">Automotive Playbook</a></li>
              <li><a href="/case-studies" className="text-sm hover:text-[#0066FF] transition-colors">Case Studies</a></li>
              <li><a href="/dashboard/sponsors" className="text-sm hover:text-[#0066FF] transition-colors">Sponsor Dashboard</a></li>
              <li><a href="/sponsors/automotive#start" className="text-sm hover:text-[#0066FF] transition-colors">Start Strategy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 text-white/70">Resources</h4>
            <ul className="space-y-3">
              <li><a href="/resources/roi-calculator" className="text-sm hover:text-[#0066FF] transition-colors">ROI Calculator</a></li>
              <li><a href="/events" className="text-sm hover:text-[#0066FF] transition-colors">Event Calendar</a></li>
              <li><a href="/resources/metrics" className="text-sm hover:text-[#0066FF] transition-colors">Metrics Guide</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">© 2025 FashionOS — Sponsorship Operating System</p>
          <div className="flex gap-6">
            <a href="/platform" className="text-sm text-white/60 hover:text-white transition-colors">Platform</a>
            <a href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</a>
            <a href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}