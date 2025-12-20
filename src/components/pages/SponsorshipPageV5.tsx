import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  Smartphone, 
  ShoppingBag, 
  BarChart3, 
  Zap,
  Search,
  Brain,
  Tag,
  TrendingUp,
  RefreshCw,
  Clock
} from "lucide-react";
import { motion as motionTokens, easing, parallax, transforms, fadeUp, fadeIn, stagger } from "../../lib/motionTokens";

// --- Design System ---
const colors = {
  ivory: "#F5F1E8",
  charcoal: "#2D2D2D",
  sand: "#D4C5A9",
  muted: "#8C8070"
};

// --- Reusable Components ---
const Section = ({ 
  children, 
  className = "", 
  id = "",
  noPadding = false 
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
  noPadding?: boolean;
}) => (
  <section id={id} className={`${noPadding ? '' : 'py-28'} relative ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-6 max-w-[1200px] ${className}`}>
    {children}
  </div>
);

const Heading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-4xl md:text-5xl text-[${colors.charcoal}] leading-tight mb-6 ${className}`}>
    {children}
  </h2>
);

const Subheading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed ${className}`}>
    {children}
  </p>
);

// --- Hero Section: Cinematic Entry with 3-Layer Parallax ---
const Hero = () => {
  const { scrollY } = useScroll();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Parallax layers
  const yBg = useTransform(scrollY, [0, 800], [0, 240]);  // lines slow
  const yMid = useTransform(scrollY, [0, 800], [0, 400]); // nodes medium

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const nodes = [
    { label: "Event Moment", tooltip: "Live fashion moments captured in real-time" },
    { label: "Audience Signal", tooltip: "Engagement & interest tracking" },
    { label: "Activation Channel", tooltip: "QR, WhatsApp, Instagram, web" },
    { label: "Commerce Action", tooltip: "Seamless checkout & purchase" },
    { label: "Measured ROI", tooltip: "Attribution, sales, performance" }
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#F5F1E8] via-[#F5F1E8] to-[#EDE7DC] overflow-hidden">
      
      {/* BG Layer - Background Lines */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: yBg }}
      >
        <svg 
          width="100%" 
          height="400" 
          viewBox="0 0 1200 400" 
          fill="none"
          className="opacity-20"
        >
          {/* Curved connecting lines */}
          <motion.path
            d="M 100 200 Q 300 150 500 200 T 900 200 T 1100 200"
            stroke="#D4C5A9"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isLoaded ? { pathLength: 1, opacity: 0.3 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M 100 250 Q 300 220 500 250 T 900 250 T 1100 250"
            stroke="#D4C5A9"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isLoaded ? { pathLength: 1, opacity: 0.2 } : {}}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </motion.div>

      {/* System Diagram - Nodes & Flow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: yMid }}
      >
        <div className="flex items-center gap-8 max-w-6xl mx-auto px-6">
          {nodes.map((node, index) => (
            <React.Fragment key={index}>
              {/* Node */}
              <motion.div
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + (index * 0.12),
                  ease: [0.16, 1, 0.3, 1]
                }}
                onMouseEnter={() => setHoveredNode(index)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Circle */}
                <motion.div
                  className={`
                    w-20 h-20 rounded-full border-2 flex items-center justify-center
                    transition-all duration-300 cursor-pointer
                    ${index === 4 ? 'border-[#D4C5A9] bg-[#D4C5A9]/10' : 'border-gray-300 bg-white'}
                    ${hoveredNode === index ? 'shadow-xl' : 'shadow-sm'}
                  `}
                  animate={{
                    scale: hoveredNode === index ? 1.02 : 1,
                    ...(index === 4 && isLoaded ? {
                      boxShadow: [
                        '0 0 0 0 rgba(212, 197, 169, 0)',
                        '0 0 0 8px rgba(212, 197, 169, 0.1)',
                        '0 0 0 0 rgba(212, 197, 169, 0)'
                      ]
                    } : {})
                  }}
                  transition={{
                    scale: { duration: 0.2 },
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <span className="text-2xl text-[#2D2D2D] font-light">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.div>

                {/* Node Label */}
                <div className="mt-3 text-center">
                  <div className="text-sm font-medium text-[#2D2D2D] whitespace-nowrap">
                    {node.label}
                  </div>
                </div>

                {/* Tooltip on Hover */}
                {hoveredNode === index && (
                  <motion.div
                    className="absolute top-full mt-8 w-48 p-3 rounded-lg bg-white border border-gray-200 shadow-xl z-20"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xs text-gray-600 leading-relaxed">
                      {node.tooltip}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Arrow Between Nodes */}
              {index < nodes.length - 1 && (
                <motion.svg
                  width="60"
                  height="24"
                  viewBox="0 0 60 24"
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.8 + (index * 0.12),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {/* Arrow Line */}
                  <motion.path
                    d="M 0 12 L 60 12"
                    stroke="#D4C5A9"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={isLoaded ? { pathLength: 1 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.8 + (index * 0.12),
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  {/* Arrow Head */}
                  <motion.polygon
                    points="56,9 60,12 56,15"
                    fill="#D4C5A9"
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : {}}
                    transition={{ delay: 1.0 + (index * 0.12) }}
                  />
                  
                  {/* Traveling Pulse */}
                  {isLoaded && (
                    <motion.circle
                      cx="0"
                      cy="12"
                      r="3"
                      fill="#D4C5A9"
                      animate={{
                        cx: [0, 60],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: 1.5 + (index * 0.3),
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Hero Text (Anchored) */}
      <Container className="relative z-30">
        <motion.div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <motion.h1 
            className="text-6xl md:text-7xl text-[#2D2D2D] mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 16 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Turn Sponsorship into <em className="not-italic opacity-70">Performance</em>
          </motion.h1>

          {/* Subhead */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Convert live fashion moments into measurable sales, attribution, and repeat sponsorship.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <CTAButton primary>
              Start Sponsor Strategy
              <ArrowRight className="w-4 h-4" />
            </CTAButton>

            <CTAButton>
              See How It Works ↓
            </CTAButton>
          </motion.div>

          {/* Trust Signal */}
          <motion.p
            className="text-sm text-gray-400 tracking-wide"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 0.6 } : {}}
            transition={{ delay: 1.0, duration: 0.4 }}
          >
            Trusted by fashion weeks, brands, and global sponsors
          </motion.p>
        </motion.div>
      </Container>
    </div>
  );
};

// --- CTA Button Component ---
const CTAButton = ({ 
  children, 
  primary = false 
}: { 
  children: React.ReactNode; 
  primary?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (primary) {
    return (
      <motion.button
        className="group px-8 py-4 bg-[#2D2D2D] text-white text-xs uppercase tracking-[0.15em] rounded-sm relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        {/* Hover underline */}
        <motion.div
          className="absolute bottom-2 left-8 right-8 h-[1px] bg-white/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
        />
      </motion.button>
    );
  }

  return (
    <motion.button
      className="px-8 py-4 bg-transparent border border-gray-300 text-[#2D2D2D] text-xs uppercase tracking-[0.15em] rounded-sm hover:border-[#2D2D2D] transition-colors"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

// --- Arrow Connector Component ---
const ArrowConnector = ({ isActive }: { isActive: boolean }) => {
  return (
    <svg 
      width="64" 
      height="24" 
      viewBox="0 0 64 24" 
      fill="none" 
      className="mx-8 hidden lg:block flex-shrink-0"
    >
      <motion.path
        d="M 0 12 L 64 12"
        stroke="#D4C5A9"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 0.6 : 0.2
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.polygon
        points="60,9 64,12 60,15"
        fill="#D4C5A9"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.6 : 0.2 }}
        transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
      />
    </svg>
  );
};

// --- Premium Process Card Component ---
interface PremiumProcessCardProps {
  step: number;
  title: string;
  summary: string;
  details: string;
  isActive: boolean;
  delay: number;
}

const PremiumProcessCard = ({ step, title, summary, details, isActive, delay }: PremiumProcessCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isFocused = isActive || isHovered;
  
  return (
    <motion.div
      className={`
        relative h-[280px] p-8 rounded-[14px] border bg-white
        transition-all duration-300 cursor-pointer
        ${isFocused 
          ? 'border-[#D4C5A9] shadow-xl' 
          : 'border-gray-200 shadow-sm'
        }
      `}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      animate={{
        opacity: isFocused ? 1 : 0.5,
        scale: isFocused ? 1 : 0.98
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Step Number */}
      <div className={`
        text-4xl mb-6 transition-colors duration-300 font-light
        ${isFocused ? 'text-[#2D2D2D]' : 'text-gray-300'}
      `}>
        {String(step).padStart(2, '0')}
      </div>

      {/* Title */}
      <h3 className={`
        font-serif text-2xl mb-4 transition-colors duration-300
        ${isFocused ? 'text-[#2D2D2D]' : 'text-gray-400'}
      `}>
        {title}
      </h3>

      {/* Summary (Always Visible) */}
      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        {summary}
      </p>

      {/* Details (Reveal on Hover - Inside Card) */}
      <motion.div
        className="absolute bottom-8 left-8 right-8 text-xs text-[#8C8070] leading-relaxed"
        initial={{ opacity: 0, y: 8 }}
        animate={{ 
          opacity: isFocused ? 1 : 0,
          y: isFocused ? 0 : 8
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {details}
      </motion.div>
    </motion.div>
  );
};

// --- How Sponsorship Works Section ---
const HowItWorks = () => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });

  // Auto-advance active card when in view
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 3500);

    return () => clearInterval(interval);
  }, [isInView]);

  const cards = [
    {
      step: 1,
      title: "Discover",
      summary: "Find where your brand fits",
      details: "AI matches events, audiences, and sponsorship tiers"
    },
    {
      step: 2,
      title: "Strategy",
      summary: "Know what will work before launch",
      details: "Channel mix, activations, ROI forecast"
    },
    {
      step: 3,
      title: "Activate",
      summary: "Be seen at the right moment",
      details: "Live runway tagging, QR, WhatsApp, Instagram"
    },
    {
      step: 4,
      title: "Measure",
      summary: "Prove the impact",
      details: "Sales, attribution, engagement dashboards"
    }
  ];

  return (
    <Section className="bg-[#F5F1E8]" id="how-it-works">
      <div ref={sectionRef}>
        <Container>
          {/* Section Header */}
          <motion.div 
            className="text-center mb-20"
            {...fadeUp}
          >
            <Heading>How Sponsorship Works</Heading>
            <Subheading className="mx-auto max-w-2xl">
              A simple, intelligent path from brand intent to measurable performance.
            </Subheading>
          </motion.div>

          {/* Desktop: Horizontal Cards with Arrows */}
          <div className="hidden lg:flex items-stretch justify-center max-w-6xl mx-auto">
            {cards.map((card, index) => (
              <React.Fragment key={card.step}>
                <div className="flex-1 max-w-[260px]">
                  <PremiumProcessCard
                    {...card}
                    isActive={activeCard === index}
                    delay={index * 0.1}
                  />
                </div>
                {index < cards.length - 1 && (
                  <div className="flex items-center">
                    <ArrowConnector isActive={activeCard >= index + 1} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: Stacked Cards */}
          <div className="lg:hidden space-y-6">
            {cards.map((card, index) => (
              <PremiumProcessCard
                key={card.step}
                {...card}
                isActive={activeCard === index}
                delay={index * 0.1}
              />
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
};

// --- AI Strategy Card Component ---
interface AIStrategyCardProps {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  whySignal: string;
  delay: number;
}

const AIStrategyCard = ({ icon, title, bullets, whySignal, delay }: AIStrategyCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [showWhy, setShowWhy] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative p-8 rounded-lg border border-gray-200 bg-white hover:border-[#D4C5A9] transition-all group"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: delay * 0.08, ease: easing.calmLuxury }}
      onMouseEnter={() => setShowWhy(true)}
      onMouseLeave={() => setShowWhy(false)}
      whileHover={{
        y: -4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
      }}
    >
      {/* Icon */}
      <div className="mb-4 text-[#2D2D2D]">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg mb-4 text-[#2D2D2D]">
        {title}
      </h3>

      {/* Bullets */}
      <ul className="space-y-2 mb-4">
        {bullets.map((bullet, i) => (
          <motion.li 
            key={i} 
            className="flex items-start gap-2 text-sm text-gray-600"
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: delay * 0.08 + 0.2 + (i * 0.1) }}
          >
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D4C5A9]" />
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>

      {/* "Why" Signal */}
      <motion.div
        className="text-xs text-[#8C8070] pt-4 border-t border-gray-200"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: showWhy ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <Sparkles className="w-3 h-3 inline mr-1" />
        {whySignal}
      </motion.div>
    </motion.div>
  );
};

// --- AI Strategy Builder Section ---
const AIStrategy = () => {
  const progressRef = useRef(null);
  const isInView = useInView(progressRef, { once: true, margin: "-10%" });

  return (
    <Section className="bg-[#F5F1E8]" id="ai-strategy">
      <Container>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          {...fadeUp}
        >
          <Heading>Your Strategy, Built Before You Spend</Heading>
          <Subheading className="mx-auto">
            AI analyzes your brand, audience, and goals to recommend the highest-impact activations.
          </Subheading>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <AIStrategyCard
            icon={<CheckCircle2 className="w-8 h-8" />}
            title="Brand & Goals Analyzed"
            bullets={[
              "AI cross-references audience overlap",
              "Identifies conversion-ready segments",
              "Maps brand values to event themes"
            ]}
            whySignal="Based on audience overlap analysis"
            delay={0}
          />
          <AIStrategyCard
            icon={<Target className="w-8 h-8" />}
            title="Activations Recommended"
            bullets={[
              "Suggests optimal touchpoints",
              "Ranks channels by predicted ROI",
              "Prioritizes high-engagement moments"
            ]}
            whySignal="Based on past event performance"
            delay={1}
          />
          <AIStrategyCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="ROI Projected Pre-Launch"
            bullets={[
              "Models attribution confidence",
              "Projects sales by activation type",
              "Forecasts reach and engagement"
            ]}
            whySignal="Based on similar sponsor outcomes"
            delay={2}
          />
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto" ref={progressRef}>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Strategy Confidence</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              94%
            </motion.span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#D4C5A9] rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 0.94 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                ease: easing.calmLuxury
              }}
              style={{ originX: 0 }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

// --- Flow Node Component ---
interface FlowNodeProps {
  image?: string;
  icon?: React.ReactNode;
  label: string;
  sublabel?: string;
  delay: number;
  isPulsing?: boolean;
  hasGlow?: boolean;
}

const FlowNode = ({ image, icon, label, sublabel, delay, isPulsing, hasGlow }: FlowNodeProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: easing.calmLuxury }}
    >
      {/* Node Visual */}
      <div className="relative">
        {image ? (
          <motion.div 
            className={`w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 ${hasGlow ? 'shadow-lg' : ''}`}
            animate={isPulsing ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src={image} 
              alt={label}
              className="w-full h-full object-cover"
            />
            {hasGlow && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4C5A9]/30 to-transparent" />
            )}
          </motion.div>
        ) : (
          <div className="w-24 h-24 rounded-lg border-2 border-gray-200 bg-white flex items-center justify-center text-[#2D2D2D]">
            {icon}
          </div>
        )}
      </div>

      {/* Labels */}
      <div className="text-center">
        <div className="text-sm font-medium text-[#2D2D2D]">{label}</div>
        {sublabel && (
          <div className="text-xs text-gray-400 mt-1">{sublabel}</div>
        )}
      </div>
    </motion.div>
  );
};

// --- Flow Arrow Component ---
const FlowArrow = ({ delay }: { delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <svg 
      ref={ref}
      width="60" 
      height="40" 
      viewBox="0 0 60 40" 
      fill="none"
      className="mx-2"
    >
      <motion.path
        d="M 0 20 L 60 20"
        stroke="#D4C5A9"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay, ease: easing.calmLuxury }}
      />
      <motion.polygon
        points="55,15 60,20 55,25"
        fill="#D4C5A9"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
      />
    </svg>
  );
};

// --- Live Activation Flow Section ---
const ActivationFlow = () => {
  return (
    <Section className="bg-white" id="activation-flow">
      <Container>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          {...fadeUp}
        >
          <Heading>From Runway to Revenue</Heading>
          <Subheading className="mx-auto">
            Watch sponsorship activations convert in real-time, from the runway moment to final purchase.
          </Subheading>
        </motion.div>

        {/* Flow Diagram */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <FlowNode
            image="https://images.unsplash.com/photo-1726194159025-506ff7792686?w=256&q=80"
            label="Runway Moment"
            sublabel="Live capture"
            delay={0}
            isPulsing={true}
          />
          <FlowArrow delay={0.2} />
          <FlowNode
            image="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=256&q=80"
            label="Product Tag"
            sublabel="AI recognition"
            delay={0.4}
            hasGlow={true}
          />
          <FlowArrow delay={0.6} />
          <FlowNode
            icon={<Smartphone className="w-10 h-10" />}
            label="Mobile Scan"
            sublabel="QR / WhatsApp / IG"
            delay={0.8}
          />
          <FlowArrow delay={1.0} />
          <FlowNode
            icon={<ShoppingBag className="w-10 h-10" />}
            label="Shopify Checkout"
            sublabel="Seamless purchase"
            delay={1.2}
          />
          <FlowArrow delay={1.4} />
          <FlowNode
            icon={<BarChart3 className="w-10 h-10" />}
            label="Revenue"
            sublabel="$12,847"
            delay={1.6}
          />
        </div>

        {/* Metrics */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.4, delay: 1.8, ease: easing.calmLuxury }}
        >
          <div className="text-center p-6 rounded-lg bg-[#F5F1E8]">
            <div className="text-3xl font-bold text-[#2D2D2D] mb-2">847</div>
            <div className="text-sm text-gray-500">Clicks</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-[#F5F1E8]">
            <div className="text-3xl font-bold text-[#2D2D2D] mb-2">124</div>
            <div className="text-sm text-gray-500">Purchases</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-[#F5F1E8]">
            <div className="text-3xl font-bold text-[#2D2D2D] mb-2">$12.8K</div>
            <div className="text-sm text-gray-500">Revenue</div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

// --- KPI Card Component ---
interface KPICardProps {
  label: string;
  value: string;
  defensibility: string;
  progress?: number;
  isLarge?: boolean;
  delay: number;
}

const KPICard = ({ label, value, defensibility, progress, isLarge, delay }: KPICardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={`p-8 rounded-lg border border-gray-200 bg-white ${isLarge ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: easing.calmLuxury }}
    >
      {/* Label */}
      <div className="text-sm text-gray-500 mb-2">{label}</div>

      {/* Value */}
      <div className={`font-bold text-[#2D2D2D] mb-4 ${isLarge ? 'text-5xl' : 'text-3xl'}`}>
        {value}
      </div>

      {/* Progress Bar (if applicable) */}
      {progress !== undefined && (
        <div className="mb-4">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#D4C5A9] rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: progress / 100 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: delay + 0.2,
                ease: easing.calmLuxury
              }}
              style={{ originX: 0 }}
            />
          </div>
        </div>
      )}

      {/* Defensibility Label */}
      <div className="flex items-start gap-2 text-xs text-[#8C8070]">
        <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
        <span>{defensibility}</span>
      </div>
    </motion.div>
  );
};

// --- ROI Dashboard Section ---
const ROIDashboard = () => {
  return (
    <Section className="bg-[#F5F1E8]" id="roi-dashboard">
      <Container>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          {...fadeUp}
        >
          <Heading>ROI You Can Defend</Heading>
          <Subheading className="mx-auto">
            FashionOS tracks every activation, every click, every sale—so you know what worked.
          </Subheading>
        </motion.div>

        {/* KPI Cards Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <KPICard
            label="Return on Investment"
            value="4.2×"
            defensibility="Direct attribution via QR, WhatsApp, IG clicks"
            progress={84}
            isLarge={true}
            delay={0}
          />
          <KPICard
            label="Engagement Rate"
            value="18.3%"
            defensibility="Tracked across all sponsor touchpoints"
            progress={73}
            delay={0.1}
          />
          <KPICard
            label="Conversion Rate"
            value="14.6%"
            defensibility="From event interaction to purchase"
            delay={0.2}
          />
          <KPICard
            label="Avg. Revenue/Event"
            value="$12.8K"
            defensibility="Aggregated from all sponsor activations"
            delay={0.3}
          />
        </div>
      </Container>
    </Section>
  );
};

// --- AI Insight Card Component ---
interface AIInsightCardProps {
  title: string;
  insight: string;
  recommendation: string;
  delay: number;
}

const AIInsightCard = ({ title, insight, recommendation, delay }: AIInsightCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className="p-8 rounded-lg border border-gray-200 bg-white hover:border-[#D4C5A9] transition-colors"
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: easing.calmLuxury }}
    >
      {/* AI Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E8] text-xs text-[#2D2D2D] mb-4">
        <Sparkles className="w-3 h-3" />
        AI Insight
      </div>

      {/* Title */}
      <h3 className="text-lg text-[#2D2D2D] mb-3">{title}</h3>

      {/* Insight */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {insight}
      </p>

      {/* Recommendation */}
      <div className="flex items-start gap-2 text-sm text-[#2D2D2D] pt-4 border-t border-gray-100">
        <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D4C5A9]" />
        <span className="italic">{recommendation}</span>
      </div>
    </motion.div>
  );
};

// --- AI Insights Section ---
const AIInsights = () => {
  return (
    <Section className="bg-white" id="ai-insights">
      <Container>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          {...fadeUp}
        >
          <Heading>Strategic Intelligence, Not Just Numbers</Heading>
          <Subheading className="mx-auto">
            AI identifies what's working—and what to do next—so every sponsorship gets smarter.
          </Subheading>
        </motion.div>

        {/* Insight Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <AIInsightCard
            title="Peak Engagement Windows"
            insight="Your audience is most active during runway segments (18:30-19:15) and after-party social posts (22:00-23:30)."
            recommendation="Concentrate activations in these windows for 2.3× higher engagement."
            delay={0}
          />
          <AIInsightCard
            title="Channel Performance"
            insight="WhatsApp outperforms Instagram for direct conversions (24% vs 11%), but Instagram drives 3× more initial awareness."
            recommendation="Use Instagram for discovery, WhatsApp for close—allocate budget accordingly."
            delay={0.1}
          />
          <AIInsightCard
            title="Audience Overlap Opportunity"
            insight="47% of this event's attendees match your ideal demographic. Similar sponsors saw 4.8× ROI in this segment."
            recommendation="Prioritize this event tier; consider long-term partnership."
            delay={0.2}
          />
        </div>
      </Container>
    </Section>
  );
};

// --- Industry Chip Component ---
interface IndustryChipProps {
  name: string;
  examples: string[];
  delay: number;
}

const IndustryChip = ({ name, examples, delay }: IndustryChipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: easing.calmLuxury }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Chip */}
      <div className={`
        px-6 py-3 rounded-full border-2 transition-all cursor-pointer
        ${isHovered ? 'border-[#2D2D2D] bg-[#2D2D2D] text-white' : 'border-gray-300 bg-white text-[#2D2D2D]'}
      `}>
        <span className="text-sm font-medium">{name}</span>
      </div>

      {/* Hover Examples */}
      {isHovered && (
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 p-4 rounded-lg bg-white border border-gray-200 shadow-lg z-10"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-xs text-gray-500 mb-2">Examples:</div>
          {examples.map((example, i) => (
            <div key={i} className="text-xs text-[#2D2D2D] mb-1">• {example}</div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// --- Industries Section ---
const Industries = () => {
  const industries = [
    { name: "Fashion & Apparel", examples: ["Runway sponsorships", "Designer collaborations", "Textile showcases"] },
    { name: "Beauty & Cosmetics", examples: ["Makeup activations", "Fragrance launches", "Skincare demos"] },
    { name: "Luxury Goods", examples: ["Handbag displays", "Jewelry showcases", "Watch exhibitions"] },
    { name: "Automotive", examples: ["Brand integrations", "VIP transportation", "Lifestyle partnerships"] },
    { name: "Lifestyle & Hospitality", examples: ["VIP lounge sponsors", "After-party hosts", "Venue partnerships"] }
  ];

  return (
    <Section className="bg-[#F5F1E8]" id="industries">
      <Container>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          {...fadeUp}
        >
          <Heading>Who Sponsors Fashion Events?</Heading>
          <Subheading className="mx-auto">
            From emerging designers to global luxury brands, FashionOS powers sponsorships across industries.
          </Subheading>
        </motion.div>

        {/* Industry Chips */}
        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((industry, index) => (
            <IndustryChip
              key={industry.name}
              name={industry.name}
              examples={industry.examples}
              delay={index * 0.08}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Final CTA Section ---
const FinalCTA = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Section className="bg-white" id="final-cta">
      <Container>
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: easing.calmLuxury }}
        >
          {/* Heading */}
          <Heading className="mb-6">
            Ready to Sponsor Smarter?
          </Heading>

          {/* Subheading */}
          <Subheading className="mx-auto mb-8">
            See how FashionOS can turn your next event sponsorship into a measurable, optimized revenue channel.
          </Subheading>

          {/* Reassurance Text */}
          <p className="text-sm text-[#8C8070] italic mb-10">
            No obligation. Strategy first. We'll show you what's possible before you commit.
          </p>

          {/* CTA Button */}
          <motion.div className="inline-block">
            <motion.button
              className="relative px-10 py-5 bg-[#2D2D2D] text-white rounded-lg overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              animate={{
                scale: isPressed ? 0.98 : 1
              }}
              transition={{ duration: 0.1 }}
              whileHover={{
                y: -2,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Your Strategy Brief
                <ArrowRight className="w-5 h-5" />
              </span>

              {/* Underline Draw Effect */}
              <motion.div
                className="absolute bottom-3 left-10 right-10 h-0.5 bg-white/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: easing.calmLuxury }}
                style={{ originX: 0 }}
              />
            </motion.button>
          </motion.div>

          {/* Additional Info */}
          <div className="mt-10 flex items-center justify-center gap-8 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4C5A9]" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4C5A9]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4C5A9]" />
              <span>Custom strategy in 48h</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

// --- Main Component ---
export default function SponsorshipPageV5() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Hero />
      
      {/* How Sponsorship Works */}
      <HowItWorks />
      
      {/* AI Strategy Builder */}
      <AIStrategy />
      
      {/* Live Activation Flow */}
      <ActivationFlow />
      
      {/* ROI Dashboard */}
      <ROIDashboard />
      
      {/* AI Insights */}
      <AIInsights />
      
      {/* Industries */}
      <Industries />
      
      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}