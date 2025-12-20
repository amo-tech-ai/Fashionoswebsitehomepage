import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { 
  Cpu, 
  Smartphone, 
  Headphones, 
  Watch,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Zap,
  CheckCircle2,
  ArrowRight,
  Calendar,
  MapPin,
  ShoppingCart,
  Camera,
  DollarSign,
  Activity,
  ArrowUpRight,
  ChevronDown,
  Sparkles
} from "lucide-react";

export default function ElectronicsSponsorshipPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA]">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Onboarding Timeline */}
      <OnboardingSection />

      {/* Activation Planning */}
      <ActivationPlanningSection />

      {/* Benefits Grid */}
      <BenefitsSection />

      {/* ROI Dashboard */}
      <ROIDashboardSection />

      {/* Process Flow (Dark) */}
      <ProcessFlowSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 300),   // Grid
      setTimeout(() => setAnimationStep(2), 600),   // Hub
      setTimeout(() => setAnimationStep(3), 1100),  // Lines
      setTimeout(() => setAnimationStep(4), 1600),  // Modules
      setTimeout(() => setAnimationStep(5), 2100),  // Text
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const modules = [
    { 
      icon: Calendar, 
      title: "Event Activations", 
      desc: "Product placement & experiential moments at fashion events",
      position: "top-left"
    },
    { 
      icon: ShoppingCart, 
      title: "Live Commerce", 
      desc: "Direct purchase flows from runway to checkout",
      position: "top-right"
    },
    { 
      icon: Users, 
      title: "Audience & Leads", 
      desc: "Tech-interested attendees identified & captured",
      position: "bottom-left"
    },
    { 
      icon: BarChart3, 
      title: "ROI Analytics", 
      desc: "Product-level attribution & performance forecast",
      position: "bottom-right"
    },
  ];

  return (
    <section className="relative min-h-[1000px] overflow-hidden bg-gradient-to-b from-[#F5F5F5] to-[#FAFAFA]">
      {/* Background Grid */}
      <motion.div 
        className="absolute inset-0 opacity-0"
        animate={{ opacity: animationStep >= 1 ? 0.03 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundImage: `radial-gradient(circle, #0A0A0A 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 py-32 relative">
        {/* Central Hub */}
        <div className="flex items-center justify-center mb-24">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: animationStep >= 2 ? 1 : 0, 
              scale: animationStep >= 2 ? 1 : 0.9 
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Outer Circle */}
            <div className="w-[240px] h-[240px] rounded-full border-2 border-[#2563EB] flex items-center justify-center relative">
              {/* Inner Circle */}
              <div className="w-[200px] h-[200px] rounded-full bg-white border border-[#E5E5E5] shadow-lg flex flex-col items-center justify-center">
                <div className="text-2xl tracking-tight mb-1">FashionOS</div>
                <div className="text-[11px] tracking-widest text-[#A3A3A3] uppercase">
                  Sponsorship System
                </div>
              </div>

              {/* Connection Lines to Modules */}
              {animationStep >= 3 && (
                <>
                  <ConnectionLine delay={0} toPosition={{ x: -280, y: -180 }} />
                  <ConnectionLine delay={0.1} toPosition={{ x: 280, y: -180 }} />
                  <ConnectionLine delay={0.2} toPosition={{ x: 280, y: 180 }} />
                  <ConnectionLine delay={0.3} toPosition={{ x: -280, y: 180 }} />
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {modules.map((module, i) => (
            <ModuleCard 
              key={i}
              module={module}
              delay={i * 0.1}
              isVisible={animationStep >= 4}
            />
          ))}
        </div>

        {/* Headline & Subhead */}
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: animationStep >= 5 ? 1 : 0, 
            y: animationStep >= 5 ? 0 : 20 
          }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl mb-6 text-[#0A0A0A]">
            One System. Full Visibility.
          </h1>
          <p className="text-lg md:text-xl text-[#525252]">
            FashionOS connects event activations, commerce, marketing channels, and ROI reporting — in one unified platform.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ConnectionLine({ delay, toPosition }: { delay: number; toPosition: { x: number; y: number } }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[2px] h-[200px] origin-top"
      style={{
        background: '#2563EB',
        opacity: 0.2,
        transform: `translate(-50%, -50%) rotate(${Math.atan2(toPosition.y, toPosition.x) * 180 / Math.PI + 90}deg)`,
      }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.7, delay }}
    />
  );
}

function ModuleCard({ module, delay, isVisible }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm cursor-pointer transition-all duration-200"
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? (isHovered ? 1.02 : 1) : 0.95,
        y: isVisible ? 0 : 12
      }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.1)',
        borderColor: '#2563EB'
      }}
    >
      <module.icon className="w-10 h-10 text-[#2563EB] mb-4" strokeWidth={1.5} />
      <h3 className="text-lg mb-2 text-[#0A0A0A]">{module.title}</h3>
      <p className="text-sm text-[#525252] leading-relaxed">{module.desc}</p>
    </motion.div>
  );
}

// ============================================================================
// HOW IT WORKS SECTION
// ============================================================================

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stages = [
    {
      badge: "01",
      icon: Target,
      title: "Discover Opportunities",
      desc: "AI matches your tech products with fashion events based on audience demographics and engagement patterns.",
      features: ["87% tech audience match", "Real-time event scanner", "Demographic analysis"],
      metric: "87% tech audience match"
    },
    {
      badge: "02",
      icon: MapPin,
      title: "Plan Activations",
      desc: "Strategic placement planning across event zones with predicted engagement and conversion forecasts.",
      features: ["8 activation zones", "Placement heat mapping", "Conversion forecasting"],
      metric: "8 activation zones recommended"
    },
    {
      badge: "03",
      icon: Activity,
      title: "Execute & Track",
      desc: "Live monitoring of product scans, interactions, and commerce activity throughout the event.",
      features: ["2,400 product scans", "Real-time dashboards", "Live conversion tracking"],
      metric: "2,400 product scans"
    },
    {
      badge: "04",
      icon: TrendingUp,
      title: "Measure ROI",
      desc: "Complete attribution from product placement to purchase with full revenue reporting and insights.",
      features: ["4.2× ROI confirmed", "Full attribution chain", "Revenue breakdowns"],
      metric: "4.2× ROI confirmed"
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-xs tracking-widest uppercase text-[#2563EB]">The System</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#0A0A0A]">
            How Electronics Sponsorship Works
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            From product placement to purchase attribution in 4 connected steps
          </p>
        </motion.div>

        {/* Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, i) => (
            <StageCard key={i} stage={stage} delay={i * 0.15} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StageCard({ stage, delay, isInView }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gradient-to-b from-white to-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-8 shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, borderColor: '#2563EB' }}
    >
      <div className="inline-block px-3 py-1 bg-[#2563EB] text-white rounded-full text-sm mb-6">
        {stage.badge}
      </div>
      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <stage.icon className="w-16 h-16 text-[#2563EB] mb-6" strokeWidth={1.5} />
      </motion.div>
      <h3 className="text-xl mb-4 text-[#0A0A0A]">{stage.title}</h3>
      <p className="text-sm text-[#525252] mb-6 leading-relaxed">{stage.desc}</p>
      <ul className="space-y-2 mb-6">
        {stage.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[#525252]">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="pt-4 border-t border-[#E5E5E5]">
        <div className="text-2xl text-[#2563EB]">{stage.metric}</div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// ONBOARDING TIMELINE SECTION
// ============================================================================

function OnboardingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const weeks = [
    {
      week: 0,
      title: "Discovery Call",
      desc: "Initial strategy session to understand your products, goals, and target events.",
      deliverables: ["Brand profile creation", "Product catalog setup", "Goal alignment"],
      metric: "1 hour kickoff"
    },
    {
      week: 1,
      title: "Event Matching",
      desc: "AI-powered event discovery and audience analysis to find perfect placement opportunities.",
      deliverables: ["Event recommendations", "Audience insights", "ROI forecasts"],
      metric: "12+ events analyzed"
    },
    {
      week: 2,
      title: "Activation Planning",
      desc: "Strategic placement design across event zones with predicted engagement metrics.",
      deliverables: ["Zone mapping", "Placement strategy", "Budget allocation"],
      metric: "8 zones planned"
    },
    {
      week: 3,
      title: "System Setup",
      desc: "Complete platform configuration with tracking, commerce, and reporting dashboards.",
      deliverables: ["Tracking integration", "Commerce flows", "Dashboard setup"],
      metric: "Full system live"
    },
    {
      week: 4,
      title: "Campaign Launch",
      desc: "Go live with real-time monitoring, support, and optimization throughout the event.",
      deliverables: ["Live monitoring", "Real-time support", "Performance optimization"],
      metric: "Campaign active"
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-[#FAFAFA] to-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-xs tracking-widest uppercase text-[#2563EB]">Get Started</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#0A0A0A]">
            Sponsor Onboarding in 4 Weeks
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            From first conversation to live campaign — here's how we work together
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          {/* Progress Bar */}
          <div className="relative mb-16">
            <div className="h-1 bg-[#E5E5E5] rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
            {/* Week Nodes */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2">
              {weeks.map((week, i) => (
                <motion.div
                  key={i}
                  className="w-6 h-6 rounded-full bg-white border-2 border-[#2563EB] shadow-md"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Week Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weeks.map((week, i) => (
              <WeekCard
                key={i}
                week={week}
                isExpanded={expandedWeek === i}
                onClick={() => setExpandedWeek(expandedWeek === i ? null : i)}
                delay={i * 0.1}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WeekCard({ week, isExpanded, onClick, delay, isInView }: any) {
  return (
    <motion.div
      className="bg-white border border-[#E5E5E5] rounded-xl p-5 cursor-pointer shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      whileHover={{ y: -4, borderColor: '#2563EB' }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs tracking-widest uppercase text-[#A3A3A3]">Week {week.week}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-[#525252]" />
        </motion.div>
      </div>
      <h4 className="text-base mb-2 text-[#0A0A0A]">{week.title}</h4>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-sm text-[#525252] mb-4 leading-relaxed">{week.desc}</p>
        <div className="space-y-2 mb-4">
          {week.deliverables.map((item: string, i: number) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-[#10B981] mt-1 flex-shrink-0" />
              <span className="text-xs text-[#525252]">{item}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-[#E5E5E5]">
          <span className="text-sm text-[#2563EB]">{week.metric}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// ACTIVATION PLANNING SECTION
// ============================================================================

function ActivationPlanningSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const zones = [
    { icon: Camera, name: "Runway", metric: "2,400 scans", desc: "Product placement during shows" },
    { icon: Headphones, name: "Backstage Lounge", metric: "18 min dwell", desc: "Charging stations & demos" },
    { icon: Users, name: "VIP Seating", metric: "24% conversion", desc: "Exclusive product access" },
    { icon: Sparkles, name: "Gift Suite", metric: "847 impressions", desc: "Premium product gifting" },
    { icon: MapPin, name: "Registration", metric: "92% tech interest", desc: "Audience data capture" },
    { icon: Camera, name: "Photo Wall", metric: "1,240 shares", desc: "Branded photo moments" },
    { icon: ShoppingCart, name: "Commerce Layer", metric: "340 purchases", desc: "Direct purchase flows" },
    { icon: BarChart3, name: "ROI Dashboard", metric: "4.2× ROI", desc: "Real-time performance" },
  ];

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-xs tracking-widest uppercase text-[#2563EB]">Activations</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#0A0A0A]">
            Every Placement. Fully Trackable.
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            See how we map tech products to event spaces and track every interaction
          </p>
        </motion.div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {zones.map((zone, i) => (
            <ZoneCard key={i} zone={zone} delay={i * 0.08} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ZoneCard({ zone, delay, isInView }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm cursor-pointer"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, borderColor: '#2563EB' }}
    >
      <zone.icon className="w-8 h-8 text-[#2563EB] mb-4" strokeWidth={1.5} />
      <h4 className="text-base mb-2 text-[#0A0A0A]">{zone.name}</h4>
      <p className="text-sm text-[#525252] mb-3">{zone.desc}</p>
      <div className="pt-3 border-t border-[#E5E5E5]">
        <span className="text-lg text-[#2563EB]">{zone.metric}</span>
      </div>

      {/* Hover Popup */}
      <motion.div
        className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-[#0A0A0A] text-white px-4 py-2 rounded-lg shadow-xl text-sm whitespace-nowrap pointer-events-none"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
        transition={{ duration: 0.2 }}
      >
        Click to view details
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#0A0A0A]" />
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// BENEFITS SECTION
// ============================================================================

function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    { 
      icon: Target, 
      metric: "87%", 
      title: "Audience Match", 
      desc: "Tech-interested attendees identified before event starts",
      source: "vs 34% industry avg"
    },
    { 
      icon: CheckCircle2, 
      metric: "94%", 
      title: "Attribution Accuracy", 
      desc: "Full chain tracking from placement to purchase",
      source: "vs 58% manual tracking"
    },
    { 
      icon: Zap, 
      metric: "4 weeks", 
      title: "Launch Speed", 
      desc: "From kickoff to live campaign in one month",
      source: "vs 12-16 week manual"
    },
    { 
      icon: TrendingUp, 
      metric: "92%", 
      title: "Forecast Accuracy", 
      desc: "AI-predicted ROI within 8% of actual results",
      source: "vs 45% traditional"
    },
    { 
      icon: DollarSign, 
      metric: "6.8%", 
      title: "Conversion Rate", 
      desc: "Event attendees to product purchases",
      source: "vs 1.2% standard"
    },
    { 
      icon: ArrowUpRight, 
      metric: "3.2×", 
      title: "Cross-Sell Rate", 
      desc: "Additional products purchased per customer",
      source: "vs 1.4× baseline"
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-[#FAFAFA] to-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-xs tracking-widest uppercase text-[#2563EB]">Benefits</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#0A0A0A]">
            Why Electronics Brands Choose FashionOS
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            Data-proven advantages across 100+ tech sponsor campaigns
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, i) => (
            <BenefitCard key={i} benefit={benefit} delay={i * 0.1} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ benefit, delay, isInView }: any) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const target = parseFloat(benefit.metric);
      const duration = 1200;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, benefit.metric, hasAnimated]);

  const displayValue = benefit.metric.includes('%') 
    ? `${Math.round(count)}%` 
    : benefit.metric.includes('×')
    ? `${count.toFixed(1)}×`
    : benefit.metric.includes('weeks')
    ? `${Math.round(count)} weeks`
    : benefit.metric;

  return (
    <motion.div
      className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -6, 
        borderColor: '#2563EB',
        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)'
      }}
    >
      <motion.div
        whileHover={{ rotate: 5, scale: 1.08 }}
        transition={{ duration: 0.2 }}
      >
        <benefit.icon className="w-12 h-12 text-[#2563EB] mb-6" strokeWidth={1.5} />
      </motion.div>
      <div className="text-5xl text-[#0A0A0A] mb-3">{displayValue}</div>
      <h3 className="text-xl mb-3 text-[#0A0A0A]">{benefit.title}</h3>
      <p className="text-sm text-[#525252] mb-4 leading-relaxed">{benefit.desc}</p>
      <div className="text-xs text-[#A3A3A3]">{benefit.source}</div>
    </motion.div>
  );
}

// ============================================================================
// ROI DASHBOARD SECTION
// ============================================================================

function ROIDashboardSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const kpis = [
    { icon: DollarSign, label: "Total Revenue", value: "$487K", change: "+127%", comparison: "vs $214K last event" },
    { icon: TrendingUp, label: "Avg ROI", value: "4.2×", change: "+180%", comparison: "vs 1.5× baseline" },
    { icon: Activity, label: "Product Activations", value: "2,847", change: "+340%", comparison: "vs 647 manual" },
    { icon: Target, label: "Conversion", value: "6.8%", change: "+467%", comparison: "vs 1.2% industry" },
  ];

  const revenueData = [
    { category: "Wearables", value: 92 },
    { category: "Audio", value: 78 },
    { category: "Mobile", value: 65 },
    { category: "Smart Home", value: 54 },
    { category: "Accessories", value: 42 },
  ];

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-xs tracking-widest uppercase text-[#2563EB]">Performance</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#0A0A0A]">
            Real Sponsor Results
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            Live data from electronics brands using FashionOS
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpis.map((kpi, i) => (
            <KPICard key={i} kpi={kpi} delay={i * 0.1} isInView={isInView} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueBarChart data={revenueData} isInView={isInView} />
          <ROILineChart isInView={isInView} />
        </div>
      </div>
    </section>
  );
}

function KPICard({ kpi, delay, isInView }: any) {
  return (
    <motion.div
      className="bg-gradient-to-br from-white to-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-6 shadow-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <kpi.icon className="w-8 h-8 text-[#2563EB] mb-4" strokeWidth={1.5} />
      <div className="text-xs uppercase tracking-widest text-[#A3A3A3] mb-2">{kpi.label}</div>
      <div className="text-4xl text-[#0A0A0A] mb-2">{kpi.value}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-[#10B981]">{kpi.change}</span>
        <ArrowUpRight className="w-4 h-4 text-[#10B981]" />
      </div>
      <div className="text-xs text-[#A3A3A3]">{kpi.comparison}</div>
    </motion.div>
  );
}

function RevenueBarChart({ data, isInView }: any) {
  return (
    <motion.div
      className="bg-white border border-[#E5E5E5] rounded-xl p-8 shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="text-lg mb-6 text-[#0A0A0A]">Revenue by Product Category</h3>
      <div className="space-y-4">
        {data.map((item: any, i: number) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#525252]">{item.category}</span>
              <span className="text-[#0A0A0A]">${item.value}K</span>
            </div>
            <div className="h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: item.value / 100 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.15 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ROILineChart({ isInView }: any) {
  const points = [
    { x: 0, y: 50, label: "Campaign 1", roi: "1.8×" },
    { x: 20, y: 40, label: "Campaign 2", roi: "2.4×" },
    { x: 40, y: 30, label: "Campaign 3", roi: "3.1×" },
    { x: 60, y: 25, label: "Campaign 4", roi: "3.6×" },
    { x: 80, y: 15, label: "Campaign 5", roi: "4.0×" },
    { x: 100, y: 10, label: "Campaign 6", roi: "4.2×" },
  ];

  return (
    <motion.div
      className="bg-white border border-[#E5E5E5] rounded-xl p-8 shadow-sm"
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="text-lg mb-6 text-[#0A0A0A]">ROI Progression (6 Campaigns)</h3>
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 100 60">
          {/* Grid Lines */}
          {[0, 20, 40, 60].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#E5E5E5" strokeWidth="0.5" />
          ))}
          
          {/* Line Path */}
          <motion.path
            d={`M ${points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          
          {/* Points */}
          {points.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="#2563EB"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
            />
          ))}
          
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PROCESS FLOW SECTION (DARK)
// ============================================================================

function ProcessFlowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const inputs = [
    { icon: Calendar, label: "Event Data" },
    { icon: Users, label: "Audience" },
    { icon: Smartphone, label: "Product Scans" },
    { icon: ShoppingCart, label: "Purchases" },
  ];

  const outputs = [
    { icon: BarChart3, label: "Dashboard" },
    { icon: TrendingUp, label: "Optimization" },
    { icon: Target, label: "Next Campaign" },
  ];

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] text-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full mb-6">
            <span className="text-xs tracking-widest uppercase text-[#2563EB]">Under The Hood</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6">
            How FashionOS Tracks Performance
          </h2>
          <p className="text-lg text-[#A3A3A3] max-w-3xl mx-auto">
            Real-time data flow from event activations to sponsor ROI dashboard
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Inputs */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-widest text-[#A3A3A3] mb-6">Inputs</h3>
              {inputs.map((input, i) => (
                <FlowNode key={i} node={input} delay={i * 0.1} isInView={isInView} />
              ))}
            </div>

            {/* Processing */}
            <div className="space-y-6">
              <motion.div
                className="bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Cpu className="w-12 h-12 text-[#2563EB] mx-auto mb-4" strokeWidth={1.5} />
                <div className="text-lg mb-2">AI Engine</div>
                <div className="text-sm text-[#A3A3A3]">Pattern Recognition</div>
              </motion.div>
              <motion.div
                className="bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Activity className="w-12 h-12 text-[#8B5CF6] mx-auto mb-4" strokeWidth={1.5} />
                <div className="text-lg mb-2">Attribution</div>
                <div className="text-sm text-[#A3A3A3]">Revenue Mapping</div>
              </motion.div>
            </div>

            {/* Outputs */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-widest text-[#A3A3A3] mb-6">Outputs</h3>
              {outputs.map((output, i) => (
                <FlowNode key={i} node={output} delay={0.9 + i * 0.1} isInView={isInView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowNode({ node, delay, isInView }: any) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, borderColor: 'rgba(37, 99, 235, 0.5)' }}
    >
      <node.icon className="w-6 h-6 text-[#2563EB]" strokeWidth={1.5} />
      <span className="text-sm">{node.label}</span>
    </motion.div>
  );
}

// ============================================================================
// FOOTER
// ============================================================================

function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-sm uppercase tracking-widest text-[#A3A3A3] mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-sm hover:text-[#2563EB] transition-colors">Home</a></li>
              <li><a href="/features" className="text-sm hover:text-[#2563EB] transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-sm hover:text-[#2563EB] transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-[#A3A3A3] mb-4">Sponsors</h4>
            <ul className="space-y-3">
              <li><a href="/sponsors/electronics" className="text-sm hover:text-[#2563EB] transition-colors">Electronics</a></li>
              <li><a href="/sponsors/cosmetics" className="text-sm hover:text-[#2563EB] transition-colors">Cosmetics</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-[#A3A3A3] mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-sm hover:text-[#2563EB] transition-colors">About</a></li>
              <li><a href="/contact" className="text-sm hover:text-[#2563EB] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-[#A3A3A3]">© 2025 FashionOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
