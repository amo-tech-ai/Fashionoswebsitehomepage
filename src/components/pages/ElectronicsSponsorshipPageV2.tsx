import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function ElectronicsSponsorshipPageV2() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <HeroSection />

      {/* Why Sponsorship Underperforms */}
      <WhyUnderperformsSection />

      {/* One System Section */}
      <OneSystemSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Strategic Message */}
      <StrategySection />

      {/* Photo Grid - Activations */}
      <ActivationsGridSection />

      {/* Dark Journey Section */}
      <JourneySection />

      {/* ROI Metrics */}
      <ROISection />

      {/* Intelligence */}
      <IntelligenceSection />

      {/* Performance CTA */}
      <PerformanceCTASection />

      {/* Footer */}
      <EditorialFooter />
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
    <section ref={ref} className="min-h-[85vh] flex items-center justify-center px-6 pt-32 pb-20">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-[#525252]">Electronics & Tech</span>
        </motion.div>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 text-[#0A0A0A] leading-[0.95]" style={{ fontFamily: 'Georgia, serif' }}>
          The Sponsorship<br />Operating System
        </h1>
        
        <p className="text-lg md:text-xl text-[#525252] max-w-2xl mx-auto mb-12 leading-relaxed">
          A complete platform that connects product placement, audience data, and revenue attribution—designed for consumer electronics brands.
        </p>

        <motion.button
          className="px-8 py-4 bg-[#0A0A0A] text-white rounded-none hover:bg-[#2563EB] transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Schedule a Demo
        </motion.button>
      </motion.div>
    </section>
  );
}

// ============================================================================
// WHY UNDERPERFORMS SECTION
// ============================================================================

function WhyUnderperformsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const reasons = [
    {
      title: "No Attribution",
      desc: "Traditional sponsorships can't connect event exposure to actual purchases."
    },
    {
      title: "Manual Tracking",
      desc: "Spreadsheets and assumptions replace real-time performance data."
    },
    {
      title: "Delayed Insights",
      desc: "ROI reports arrive weeks after events end, too late to optimize."
    }
  ];

  return (
    <section ref={ref} className="py-24 px-6 border-t border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-[#0A0A0A]" style={{ fontFamily: 'Georgia, serif' }}>
            Why Sponsorship Underperforms
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="w-12 h-12 rounded-full border border-[#0A0A0A] flex items-center justify-center mx-auto mb-6">
                <span className="text-sm">{i + 1}</span>
              </div>
              <h3 className="text-xl mb-4 text-[#0A0A0A]">{reason.title}</h3>
              <p className="text-[#525252] leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ONE SYSTEM SECTION
// ============================================================================

function OneSystemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl mb-8 text-[#0A0A0A] leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            One System. Full Visibility.
          </h2>
          <p className="text-lg text-[#525252] leading-relaxed max-w-2xl mx-auto">
            FashionOS unifies event activations, audience capture, commerce flows, and ROI reporting—so every placement decision is informed by data, not assumptions.
          </p>
        </motion.div>
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
    { number: "01", title: "Match", desc: "AI identifies fashion events with tech-interested audiences" },
    { number: "02", title: "Plan", desc: "Strategic product placement across event zones" },
    { number: "03", title: "Track", desc: "Real-time monitoring of scans, engagement, and purchases" },
    { number: "04", title: "Measure", desc: "Complete attribution from placement to revenue" },
  ];

  return (
    <section ref={ref} className="py-24 px-6 border-t border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#0A0A0A]" style={{ fontFamily: 'Georgia, serif' }}>
            How It Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="text-sm tracking-[0.2em] uppercase text-[#A3A3A3] mb-4">{step.number}</div>
              <h3 className="text-2xl mb-4 text-[#0A0A0A]" style={{ fontFamily: 'Georgia, serif' }}>
                {step.title}
              </h3>
              <p className="text-[#525252] leading-relaxed">{step.desc}</p>
              
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-[1px] bg-[#E5E5E5]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// STRATEGY SECTION
// ============================================================================

function StrategySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-32 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-8 text-[#0A0A0A]" style={{ fontFamily: 'Georgia, serif' }}>
            A Message Strategy<br />in Minutes
          </h2>
          <p className="text-lg text-[#525252] leading-relaxed mb-8">
            Our AI analyzes event audiences, venue layouts, and historical performance to recommend optimal product placements—before the event even begins.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#E5E5E5]">
            <div>
              <div className="text-3xl mb-2 text-[#0A0A0A]">87%</div>
              <div className="text-sm text-[#525252]">Audience match accuracy</div>
            </div>
            <div>
              <div className="text-3xl mb-2 text-[#0A0A0A]">8 zones</div>
              <div className="text-sm text-[#525252]">Recommended per event</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// ACTIVATIONS GRID SECTION
// ============================================================================

function ActivationsGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const activations = [
    { 
      image: "https://images.unsplash.com/photo-1717944105945-669b3dd77bfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwcnVud2F5fGVufDF8fHx8MTc2NjEzMDkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
      label: "Runway Placement"
    },
    { 
      image: "https://images.unsplash.com/photo-1636614223954-db6a663293ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwcHJvZHVjdCUyMGRpc3BsYXl8ZW58MXx8fHwxNzY2MjE3NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      label: "Product Display"
    },
    { 
      image: "https://images.unsplash.com/photo-1761502479994-3a5e07ec243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBldmVudCUyMHNwYWNlfGVufDF8fHx8MTc2NjA5NzIyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      label: "Event Space"
    },
    { 
      image: "https://images.unsplash.com/photo-1719744755507-a4c856c57cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzY2MTM1Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      label: "Wearables"
    },
    { 
      image: "https://images.unsplash.com/photo-1759532338598-679140538775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZXZlbnQlMjBiYWNrc3RhZ2V8ZW58MXx8fHwxNzY2MjE3NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      label: "Backstage Access"
    },
    { 
      image: "https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzY2MTI2MjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      label: "Audio Demos"
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#0A0A0A]" style={{ fontFamily: 'Georgia, serif' }}>
            Activations That Feel Native
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {activations.map((activation, i) => (
            <motion.div
              key={i}
              className="group relative aspect-[4/5] overflow-hidden bg-[#F5F5F5]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={activation.image}
                alt={activation.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
// JOURNEY SECTION (DARK)
// ============================================================================

function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const journey = [
    { label: "Runway", value: "2,400 scans" },
    { label: "Backstage", value: "18 min dwell" },
    { label: "VIP Lounge", value: "340 conversions" },
    { label: "Commerce", value: "$487K revenue" },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#0A0A0A] text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            From Runway to Purchase
          </h2>
          <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto">
            Track the complete customer journey from first exposure to final transaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {journey.map((step, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="text-sm tracking-[0.2em] uppercase text-[#A3A3A3] mb-4">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-2xl mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                {step.label}
              </div>
              <div className="text-[#2563EB]">{step.value}</div>
            </motion.div>
          ))}
        </div>
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

  const metrics = [
    { value: "4.2×", label: "Average ROI", desc: "vs 1.5× baseline" },
    { value: "6.8%", label: "Conversion Rate", desc: "vs 1.2% industry" },
    { value: "94%", label: "Attribution Accuracy", desc: "Full chain tracking" },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-[#0A0A0A]" style={{ fontFamily: 'Georgia, serif' }}>
            Defendable ROI
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="text-5xl md:text-6xl mb-4 text-[#0A0A0A]" style={{ fontFamily: 'Georgia, serif' }}>
                {metric.value}
              </div>
              <div className="text-lg mb-2 text-[#0A0A0A]">{metric.label}</div>
              <div className="text-sm text-[#A3A3A3]">{metric.desc}</div>
            </motion.div>
          ))}
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

  return (
    <section ref={ref} className="py-32 px-6 border-t border-[#E5E5E5]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-8 text-[#0A0A0A]" style={{ fontFamily: 'Georgia, serif' }}>
            Intelligence That Works Quietly
          </h2>
          <p className="text-lg text-[#525252] leading-relaxed max-w-2xl mx-auto">
            Our AI continuously analyzes event data, audience behavior, and purchase patterns—optimizing placement recommendations without disrupting your workflow.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// PERFORMANCE CTA SECTION
// ============================================================================

function PerformanceCTASection() {
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
          <h2 className="text-4xl md:text-5xl mb-8 text-[#0A0A0A]" style={{ fontFamily: 'Georgia, serif' }}>
            Turn Sponsorship into Performance
          </h2>
          <p className="text-lg text-[#525252] mb-12 leading-relaxed">
            See how FashionOS transforms sponsorship from awareness spend to measurable revenue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-[#0A0A0A] text-white rounded-none hover:bg-[#2563EB] transition-colors duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Demo
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              className="px-8 py-4 border border-[#0A0A0A] text-[#0A0A0A] rounded-none hover:bg-[#0A0A0A] hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Case Studies
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// EDITORIAL FOOTER
// ============================================================================

function EditorialFooter() {
  return (
    <footer className="bg-[#0A0A0A] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="text-3xl mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              FashionOS
            </div>
            <p className="text-[#A3A3A3] leading-relaxed max-w-md">
              The operating system for fashion events, production, and commerce—designed for modern brands.
            </p>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-[#A3A3A3]">Platform</h4>
            <ul className="space-y-3">
              <li><a href="/sponsors/electronics" className="text-sm hover:text-[#2563EB] transition-colors">Electronics V1</a></li>
              <li><a href="/sponsors/electronics-v2" className="text-sm hover:text-[#2563EB] transition-colors">Electronics V2</a></li>
              <li><a href="/sponsors/cosmetics" className="text-sm hover:text-[#2563EB] transition-colors">Cosmetics</a></li>
              <li><a href="/sponsorship-v5" className="text-sm hover:text-[#2563EB] transition-colors">Sponsorship V5</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-[#A3A3A3]">Company</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-sm hover:text-[#2563EB] transition-colors">Home</a></li>
              <li><a href="/features" className="text-sm hover:text-[#2563EB] transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-sm hover:text-[#2563EB] transition-colors">Pricing</a></li>
              <li><a href="/contact" className="text-sm hover:text-[#2563EB] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#A3A3A3]">© 2025 FashionOS. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#A3A3A3] hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-[#A3A3A3] hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-[#A3A3A3] hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
