import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, Building2, Users, TrendingUp, Calendar, MapPin, Home, FileText, Key, Sparkles, ChevronDown, Check } from "lucide-react";
import AIIntelligenceLayerV2 from "../sections/AIIntelligenceLayerV2";

export default function RealEstateSponsorshipPage() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{
          background: "linear-gradient(90deg, #C9A961 0%, #8B9B7E 50%, #4A7C59 100%)",
          scaleX: scrollYProgress
        }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Market Failure */}
      <MarketFailureSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Activations Grid */}
      <ActivationsSection />

      {/* Attribution Flow (Dark) */}
      <AttributionFlowSection />

      {/* Omnichannel */}
      <OmnichannelSection />

      {/* Defensible ROI */}
      <ROISection />

      {/* AI Intelligence */}
      <AIIntelligenceLayerV2 />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <RealEstateFooter />
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
      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-[10%] w-96 h-96 rounded-full bg-[#C9A961]/5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute bottom-32 left-[8%] w-80 h-80 rounded-full bg-[#8B9B7E]/5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="text-xs tracking-[0.15em] uppercase text-[#6B6B6B] border border-[#E8E5E0] rounded-full px-4 py-2">
            Introducing FashionOS
          </span>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl mb-8 text-[#1A1A1A] leading-[1.1]"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          The Sponsorship<br />
          <span className="italic">Operating System</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-[#6B6B6B] max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Turn luxury real estate placements into measurable sales through fashion event activations and full purchase attribution
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="/contact/sales?intent=real-estate-sponsorship"
            className="px-8 py-4 bg-[#1A1A1A] text-[#FDFCFA] hover:bg-[#C9A961] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Request Access
          </a>
          <a
            href="/resources/playbook/real-estate"
            className="px-8 py-4 border border-[#E8E5E0] text-[#1A1A1A] hover:border-[#C9A961] transition-all duration-300 group"
          >
            <span className="group-hover:underline">or, explore features</span> ↓
          </a>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#6B6B6B]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#C9A961]" />
            <span>Avg. 3.2× ROI</span>
          </div>
          <div className="w-px h-4 bg-[#E8E5E0] hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#C9A961]" />
            <span>287 Viewings Booked</span>
          </div>
          <div className="w-px h-4 bg-[#E8E5E0] hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#C9A961]" />
            <span>$8.2M Attributed Sales</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MARKET FAILURE SECTION
// ============================================================================

function MarketFailureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const failures = [
    {
      badge: "01",
      title: "Exposure Without Path to Viewing",
      desc: "Traditional sponsorships end when the event ends. There's zero infrastructure to connect attendee interest to property viewings.",
      impact: "Result: $150K spent, $0 attributed revenue",
      color: "#C9A961"
    },
    {
      badge: "02",
      title: "High Spend, Low Buyer Quality",
      desc: "No income verification, no propensity scoring, no way to confirm buyer intent. Premium rates without buyer validation.",
      impact: "Result: 90% of attendees not in-market",
      color: "#8B9B7E"
    },
    {
      badge: "03",
      title: "No Attribution, No Repeat Budget",
      desc: "No data on which properties resonate or which channels work. Every campaign starts from scratch with blind assumptions.",
      impact: "Result: Impossible to optimize or justify",
      color: "#B8A99A"
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white border-t border-[#E8E5E0]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Georgia, serif' }}>
            Why Luxury Real Estate<br />Sponsorship Breaks
          </h2>
          <p className="text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            Luxury developers invest six figures in fashion event sponsorships, yet three critical gaps make ROI impossible to prove
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {failures.map((failure, i) => (
            <motion.div
              key={i}
              className="bg-[#FDFCFA] border border-[#E8E5E0] rounded-2xl p-8 hover:border-[#C9A961] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div 
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-6 text-lg transition-colors group-hover:bg-[#C9A961] group-hover:text-white group-hover:border-[#C9A961]"
                style={{ borderColor: failure.color, color: failure.color }}
              >
                {failure.badge}
              </div>
              <h3 className="text-xl mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Georgia, serif' }}>
                {failure.title}
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">
                {failure.desc}
              </p>
              <p className="text-sm italic" style={{ color: failure.color }}>
                {failure.impact}
              </p>
            </motion.div>
          ))}
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
    {
      badge: "01",
      icon: Target,
      title: "Identify High-Intent Buyers",
      desc: "AI analyzes attendee data to identify fashion event guests actively in-market for luxury real estate. Income verification and propensity scoring ensure qualified buyers.",
      metric: "87% buyer qualification accuracy",
      color: "#C9A961"
    },
    {
      badge: "02",
      icon: Building2,
      title: "Activate Premium Experiences",
      desc: "Create integrated property showcases at fashion events. From branded VIP lounges to exclusive viewing scheduling—every touchpoint designed for luxury alignment.",
      metric: "4,200 viewing bookings per campaign",
      color: "#8B9B7E"
    },
    {
      badge: "03",
      icon: TrendingUp,
      title: "Track Every Interaction",
      desc: "Mobile-first attribution captures every engagement from event interest to viewing to purchase. QR brochures, automated follow-up, and CRM integration.",
      metric: "2,847 interactions tracked per event",
      color: "#B8A99A"
    },
    {
      badge: "04",
      icon: Check,
      title: "Prove ROI with Attribution",
      desc: "Multi-touch attribution with 6-12 month tracking connects activations to purchases. See exactly which moment led to each sale with sales system integration.",
      metric: "3.2× ROI, $8.2M attributed per campaign",
      color: "#4A7C59"
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white border-t border-[#E8E5E0]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl text-[#1A1A1A] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            How It Works
          </h2>
          <p className="text-[#6B6B6B] max-w-2xl mx-auto">
            From audience discovery to purchase attribution—four connected steps that transform sponsorship into measurable performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-b from-white to-[#FDFCFA] border border-[#E8E5E0] rounded-2xl p-8 hover:border-[#C9A961] hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div 
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-6 text-lg"
                style={{ borderColor: step.color, color: step.color }}
              >
                {step.badge}
              </div>
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${step.color}15` }}
              >
                <step.icon className="w-6 h-6" style={{ color: step.color }} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Georgia, serif' }}>
                {step.title}
              </h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">
                {step.desc}
              </p>
              <div className="text-xs italic" style={{ color: step.color }}>
                {step.metric}
              </div>
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
      label: "VIP Property Lounge",
      subtext: "Curated property showcases",
      image: "https://images.unsplash.com/photo-1612895418748-fee2941fad20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXAlMjBsb3VuZ2UlMjBldmVudHxlbnwxfHx8fDE3NjYxODIwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Digital Wall",
      subtext: "Interactive property browsing",
      image: "https://images.unsplash.com/flagged/photo-1564161231394-4ace8c4aa680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW50ZXJhY3RpdmUlMjB3YWxsfGVufDF8fHx8MTc2NjIyMDc4MXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Exclusive Viewing QR",
      subtext: "Instant viewing booking via QR",
      image: "https://images.unsplash.com/photo-1710883734891-93709398496d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9wZXJ0eSUyMHZpZXdpbmd8ZW58MXx8fHwxNzY2MjIwNzgxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Developer Talks",
      subtext: "Panel discussions with visuals",
      image: "https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZXZlbnQlMjBwcmVtaXVtfGVufDF8fHx8MTc2NjIyMDc4MXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Red Carpet Arrival",
      subtext: "Branded arrival experiences",
      image: "https://images.unsplash.com/photo-1614115866447-c9a299154650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjYXJwZXQlMjBhcnJpdmFsfGVufDF8fHx8MTc2NjIyMDc4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      label: "Investor Preview Suite",
      subtext: "Private investor showcases",
      image: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDF8fHx8MTc2NjIxODM2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#FDFCFA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl text-[#1A1A1A]" style={{ fontFamily: 'Georgia, serif' }}>
            Activations That Feel Native
          </h2>
          <p className="text-[#6B6B6B] mt-4">
            Luxury property showcases designed to enhance—not interrupt—the fashion event experience
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {activations.map((activation, i) => (
            <motion.div
              key={i}
              className="group relative aspect-[9/11] overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <img
                src={activation.image}
                alt={activation.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-lg mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {activation.label}
                </div>
                <div className="text-xs opacity-90">{activation.subtext}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ATTRIBUTION FLOW SECTION (DARK)
// ============================================================================

function AttributionFlowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const flowNodes = [
    { icon: Users, label: "Fashion Event", desc: "Attendance & engagement" },
    { icon: Building2, label: "Property Showcase", desc: "Display interactions" },
    { icon: Home, label: "Interest Capture", desc: "QR scans & inquiries" },
    { icon: Calendar, label: "Viewing Booked", desc: "Scheduled appointments" },
    { icon: MapPin, label: "Property Visit", desc: "In-person tours" },
    { icon: FileText, label: "Offer Submitted", desc: "Financing applications" },
    { icon: Key, label: "Sale Closed", desc: "Attributed revenue" },
  ];

  // Counter animation
  useState(() => {
    if (isInView) {
      const timer1 = setTimeout(() => {
        const interval = setInterval(() => {
          setCount1(prev => {
            if (prev >= 2847) {
              clearInterval(interval);
              return 2847;
            }
            return prev + 50;
          });
        }, 20);
      }, 1500);

      const timer2 = setTimeout(() => {
        const interval = setInterval(() => {
          setCount2(prev => {
            if (prev >= 287) {
              clearInterval(interval);
              return 287;
            }
            return prev + 5;
          });
        }, 20);
      }, 1700);

      const timer3 = setTimeout(() => {
        const interval = setInterval(() => {
          setCount3(prev => {
            if (prev >= 8.2) {
              clearInterval(interval);
              return 8.2;
            }
            return prev + 0.2;
          });
        }, 30);
      }, 1900);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  });

  return (
    <section ref={ref} className="py-32 px-6 bg-[#1A1A1A] text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            From Runway to Purchase
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Real-time data flow connecting fashion event moments to luxury property sales
          </p>
        </motion.div>

        {/* Flow Nodes */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-20 overflow-x-auto pb-4">
          {flowNodes.map((node, i) => (
            <div key={i} className="flex items-center gap-4 flex-shrink-0">
              <motion.div
                className="flex flex-col items-center text-center min-w-[140px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4">
                  <node.icon className="w-7 h-7 text-[#C9A961]" strokeWidth={1.5} />
                </div>
                <div className="text-sm mb-1">{node.label}</div>
                <div className="text-xs text-white/60">{node.desc}</div>
              </motion.div>

              {i < flowNodes.length - 1 && (
                <motion.div
                  className="hidden md:block w-8 h-[2px] flex-shrink-0"
                  style={{
                    background: `linear-gradient(to right, #C9A961, #8B9B7E)`
                  }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
            <div className="text-5xl mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              {count1.toLocaleString()}
            </div>
            <div className="text-sm text-white/70">Event Interactions</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
            <div className="text-5xl mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              {count2.toLocaleString()}
            </div>
            <div className="text-sm text-white/70">Property Viewings Booked</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
            <div className="text-5xl mb-3 text-[#C9A961]" style={{ fontFamily: 'Georgia, serif' }}>
              ${count3.toFixed(1)}M
            </div>
            <div className="text-sm text-white/70">Attributed Sales</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// OMNICHANNEL SECTION
// ============================================================================

function OmnichannelSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const channels = [
    {
      icon: "📸",
      title: "Event Moments",
      desc: "Fashion week property showcases captured in real-time. Professional content distributed across all channels within hours.",
      metrics: ["2.4M impressions", "87% UHNW reach", "18.3% engagement"],
      color: "#C9A961"
    },
    {
      icon: "📱",
      title: "Social Media",
      desc: "Instagram, LinkedIn, TikTok content auto-generated from event footage and property renders with platform-optimized formatting.",
      metrics: ["840K social reach", "12K saves", "4.2% CTR"],
      color: "#8B9B7E"
    },
    {
      icon: "🌐",
      title: "Website Integration",
      desc: "Event content automatically published to developer website and property pages. Real-time updates drive traffic spikes.",
      metrics: ["34K visitors", "8.2 min session", "2,847 page views"],
      color: "#B8A99A"
    },
    {
      icon: "📧",
      title: "Email & Retargeting",
      desc: "Personalized property recommendations within 24 hours. Multi-channel retargeting follows interested buyers.",
      metrics: ["6,400 emails sent", "42% open rate", "287 appointments"],
      color: "#4A7C59"
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white border-t border-[#E8E5E0]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl text-[#1A1A1A] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Every Channel. One System.
          </h2>
          <p className="text-[#6B6B6B]">
            Property content automatically distributed with performance tracking at every touchpoint
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {channels.map((channel, i) => (
            <motion.div
              key={i}
              className="bg-[#FDFCFA] border border-[#E8E5E0] rounded-2xl p-8 hover:border-[#C9A961] hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-4xl mb-6">{channel.icon}</div>
              <h3 className="text-xl mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Georgia, serif' }}>
                {channel.title}
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                {channel.desc}
              </p>
              <div className="space-y-2">
                {channel.metrics.map((metric, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm" style={{ color: channel.color }}>
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: channel.color }} />
                    {metric}
                  </div>
                ))}
              </div>
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

  const kpis = [
    { label: "TOTAL ATTRIBUTED SALES", value: "$8.2M", change: "+340%", color: "#C9A961" },
    { label: "PROPERTY VIEWINGS", value: "287", change: "+520%", color: "#8B9B7E" },
    { label: "AVERAGE ROI MULTIPLE", value: "3.2×", change: "Avg. $2.8M property", color: "#4A7C59" }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#FDFCFA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl text-[#1A1A1A]" style={{ fontFamily: 'Georgia, serif' }}>
            Defensible ROI
          </h2>
          <p className="text-[#6B6B6B] mt-4">
            Real sponsor performance data—every metric backed by attribution data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {kpis.map((kpi, i) => (
            <motion.div
              key={i}
              className="bg-white border border-[#E8E5E0] rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-xs tracking-[0.08em] uppercase text-[#6B6B6B] mb-4">{kpi.label}</div>
              <div className="text-5xl mb-3 text-[#1A1A1A]" style={{ fontFamily: 'Georgia, serif' }}>
                {kpi.value}
              </div>
              <div className="text-sm" style={{ color: kpi.color }}>
                {kpi.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple Bar Chart Representation */}
        <motion.div
          className="bg-white border border-[#E8E5E0] rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-xl mb-8 text-[#1A1A1A]" style={{ fontFamily: 'Georgia, serif' }}>
            Attributed Sales by Property Type
          </h3>
          <div className="space-y-6">
            {[
              { label: "Luxury Condos", value: 41, amount: "$3.4M", color: "#C9A961" },
              { label: "Penthouse Units", value: 34, amount: "$2.8M", color: "#8B9B7E" },
              { label: "Townhomes", value: 15, amount: "$1.2M", color: "#B8A99A" },
              { label: "Villa/Estate", value: 7, amount: "$0.6M", color: "#4A7C59" },
              { label: "Commercial", value: 3, amount: "$0.2M", color: "#6B6B6B" }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#1A1A1A]">{item.label}</span>
                  <span style={{ color: item.color }}>{item.amount}</span>
                </div>
                <div className="h-2 bg-[#F5F3F0] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: item.value / 100 } : {}}
                    transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
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
    <section ref={ref} className="py-32 px-6 bg-[#1A1A1A] text-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8" style={{ fontFamily: 'Georgia, serif', lineHeight: 1.2 }}>
            Turn Sponsorship<br />Into Performance
          </h2>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Request access to FashionOS and see projected ROI for your next luxury real estate campaign—before committing a single dollar
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/contact/sales?intent=real-estate-sponsorship"
              className="px-8 py-4 bg-white text-[#1A1A1A] hover:bg-[#F5F3F0] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              Request Access
            </a>
            <a
              href="/resources/playbook/real-estate"
              className="px-8 py-4 border border-white/30 text-white hover:border-white hover:shadow-lg transition-all duration-300"
            >
              Download Real Estate Playbook
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/70">
            <span>Used by 40+ luxury developers</span>
            <div className="w-px h-4 bg-white/30 hidden sm:block" />
            <span>Average $8.2M attributed sales per campaign</span>
            <div className="w-px h-4 bg-white/30 hidden sm:block" />
            <span>Zero risk—preview ROI before launch</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FOOTER
// ============================================================================

function RealEstateFooter() {
  return (
    <footer className="bg-[#FDFCFA] border-t border-[#E8E5E0] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div>
            <h4 className="text-sm tracking-[0.1em] uppercase text-[#6B6B6B] mb-6">Platform</h4>
            <ul className="space-y-3">
              {[
                { text: "How It Works", href: "/how-it-works" },
                { text: "Event Activations", href: "/platform/event-activations" },
                { text: "Omnichannel", href: "/platform/omnichannel" },
                { text: "ROI Analytics", href: "/platform/roi-analytics" },
                { text: "AI Intelligence", href: "/platform/ai-intelligence" },
                { text: "Pricing", href: "/pricing" }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-[#1A1A1A] hover:text-[#C9A961] transition-colors">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.1em] uppercase text-[#6B6B6B] mb-6">Use Cases</h4>
            <ul className="space-y-3">
              {[
                { text: "Luxury Condos", href: "/use-cases/luxury-condos" },
                { text: "Penthouses", href: "/use-cases/penthouses" },
                { text: "Mixed-Use", href: "/use-cases/mixed-use" },
                { text: "International", href: "/use-cases/international" },
                { text: "Pre-Construction", href: "/use-cases/pre-construction" }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-[#1A1A1A] hover:text-[#C9A961] transition-colors">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.1em] uppercase text-[#6B6B6B] mb-6">Resources</h4>
            <ul className="space-y-3">
              {[
                { text: "RE Playbook", href: "/resources/playbook/real-estate" },
                { text: "Case Studies", href: "/resources/case-studies" },
                { text: "ROI Calculator", href: "/resources/roi-calculator" },
                { text: "Event Calendar", href: "/resources/event-calendar" },
                { text: "API Docs", href: "/docs/api" }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-[#1A1A1A] hover:text-[#C9A961] transition-colors">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.1em] uppercase text-[#6B6B6B] mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                { text: "About", href: "/about" },
                { text: "Careers", href: "/careers" },
                { text: "Press", href: "/press" },
                { text: "Contact Sales", href: "/contact/sales" },
                { text: "Privacy", href: "/legal/privacy" },
                { text: "Terms", href: "/legal/terms" }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-[#1A1A1A] hover:text-[#C9A961] transition-colors">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.1em] uppercase text-[#6B6B6B] mb-6">Connect</h4>
            <ul className="space-y-3">
              {[
                { text: "Newsletter", href: "/newsletter" },
                { text: "Partners", href: "/partners" }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-[#1A1A1A] hover:text-[#C9A961] transition-colors">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E8E5E0] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#6B6B6B]">
          <p>© 2024 FashionOS. All rights reserved.</p>
          <p className="italic">Made for luxury real estate developers.</p>
        </div>
      </div>
    </footer>
  );
}

// Missing import
const Target = Users;