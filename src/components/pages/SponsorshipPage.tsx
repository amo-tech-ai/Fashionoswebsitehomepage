import React from "react";
import { motion } from "motion/react";
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
  Play
} from "lucide-react";

// --- Section 1: Hero ---
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#FDFDFB] overflow-hidden pt-20">
      {/* Background Ambience */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-50/40 rounded-full blur-[120px] opacity-60" />
      </motion.div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif font-medium text-[#1A1A1A] leading-[1.1] mb-6"
        >
          The Sponsorship Operating System <br />
          <span className="text-gray-400 italic">for Fashion Events</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 font-light"
        >
          Turn brand exposure into measurable ROI with a unified platform for activations, commerce, and analytics.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="px-8 py-4 bg-[#1A1A1A] text-white text-sm font-semibold tracking-wide uppercase rounded-sm hover:bg-black transition-all">
            Become a Sponsor
          </button>
          <button className="px-8 py-4 bg-white border border-gray-200 text-[#1A1A1A] text-sm font-semibold tracking-wide uppercase rounded-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            <Play className="w-3 h-3" fill="currentColor" />
            See How It Works
          </button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Scroll</span>
        <div className="w-px h-12 bg-gray-200" />
      </motion.div>
    </section>
  );
};

// --- Section 2: The Problem ---
const TheProblem = () => {
  const cards = [
    { title: "Blind Exposure", desc: "Sponsors pay for logos on walls, but never know who actually saw them." },
    { title: "Unclear ROI", desc: "Post-event reports are PDF graveyards with no actionable data." },
    { title: "Manual Activations", desc: "Connecting physical guests to digital checkouts is friction-heavy." }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 bg-[#F9F9F8] rounded-xl hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 group"
            >
              <div className="w-12 h-1 bg-gray-200 mb-6 group-hover:bg-[#1A1A1A] transition-colors" />
              <h3 className="text-xl font-serif font-medium text-[#1A1A1A] mb-3">{card.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Section 3: The Solution ---
const TheSolution = () => {
  return (
    <section className="py-32 bg-[#FDFDFB] border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-20">
          
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif font-medium text-[#1A1A1A] mb-6">
                Enter FashionOS
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                The first operating system that unifies the entire event lifecycle. 
                We connect the physical runway with digital commerce, giving brands 
                real-time visibility into engagement and sales.
              </p>
              
              <ul className="space-y-4">
                {['Unified Event Data', 'Direct-to-Consumer Commerce', 'Real-time Analytics'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-3 text-sm font-medium text-gray-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="md:w-1/2 relative h-[400px] w-full flex items-center justify-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative z-10 w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center border border-gray-100"
             >
               <span className="font-serif font-bold text-xl tracking-tight">FashionOS</span>
             </motion.div>
             
             {/* Orbiting Nodes */}
             {[
               { label: "Events", angle: 0 },
               { label: "Brands", angle: 72 },
               { label: "Media", angle: 144 },
               { label: "Commerce", angle: 216 },
               { label: "ROI", angle: 288 },
             ].map((node, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                 className="absolute w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-50"
                 style={{
                   top: `calc(50% + ${Math.sin(node.angle * (Math.PI / 180)) * 140}px - 48px)`,
                   left: `calc(50% + ${Math.cos(node.angle * (Math.PI / 180)) * 140}px - 48px)`,
                 }}
               >
                 {node.label}
                 {/* Connector Line */}
                 <div 
                    className="absolute top-1/2 left-1/2 w-[140px] h-px bg-gray-200 -z-10 origin-left"
                    style={{ 
                      transform: `rotate(${node.angle + 180}deg)`,
                      width: '140px' 
                    }} 
                 />
               </motion.div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Section 4: How It Works ---
const HowItWorks = () => {
  const steps = [
    { icon: Globe, label: "Brand Signup" },
    { icon: Sparkles, label: "AI Strategy" },
    { icon: Zap, label: "Live Activation" },
    { icon: ShoppingBag, label: "Commerce" },
    { icon: TrendingUp, label: "ROI Report" },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-serif font-medium mb-4">The Sponsorship Lifecycle</h2>
          <p className="text-gray-500">From signup to settlement in five automated steps.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-8 left-0 w-full h-px bg-gray-100 hidden md:block" />
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: "100%" }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
             className="absolute top-8 left-0 h-px bg-[#1A1A1A] hidden md:block"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="relative flex flex-col items-center text-center bg-white z-10"
              >
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-6 shadow-sm group hover:border-[#1A1A1A] transition-colors">
                  <step.icon className="w-6 h-6 text-gray-400 group-hover:text-[#1A1A1A] transition-colors" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900">{step.label}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 5: Activations ---
const Activations = () => {
  const items = [
    { title: "Runway Tagging", desc: "Instantly shop looks from the stream." },
    { title: "VIP Moments", desc: "Exclusive backstage access via QR." },
    { title: "Live Shopping", desc: "Contextual commerce overlays." },
    { title: "Influencer Push", desc: "Automated content distribution." }
  ];

  return (
    <section className="py-32 bg-[#F9F9F8]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-medium mb-4">Digital Activations</h2>
          <p className="text-gray-500 max-w-md">Seamlessly bridge the gap between the physical event and the digital consumer.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative aspect-[3/4] bg-white p-8 flex flex-col justify-end overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gray-100 -z-10 group-hover:scale-105 transition-transform duration-700" />
              {/* Placeholder for image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              
              <div className="relative z-10 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Section 6: Live Commerce ---
const LiveCommerce = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Revenue Engine</span>
          <h2 className="text-3xl font-serif font-medium mb-6">From Runway to Checkout</h2>
          <p className="text-gray-500 max-w-2xl">
            When a model walks, the product is live. Our commerce engine captures demand instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 items-center justify-center text-center">
            {['Runway Look', 'Product Tag', 'Mobile Cart', 'Shopify Checkout'].map((step, i) => (
               <React.Fragment key={i}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="p-6 border border-gray-100 rounded-lg bg-gray-50"
                  >
                     <div className="font-serif font-medium text-lg">{step}</div>
                  </motion.div>
                  {i < 3 && (
                    <div className="hidden md:flex justify-center">
                       <ArrowRight className="text-gray-300 w-5 h-5" />
                    </div>
                  )}
               </React.Fragment>
            ))}
        </div>

        <div className="mt-16 flex justify-center gap-12">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.6 }}
             className="text-center"
           >
              <div className="text-4xl font-serif font-bold text-[#1A1A1A] mb-1">$82K</div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Sales Generated</div>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.8 }}
             className="text-center"
           >
              <div className="text-4xl font-serif font-bold text-[#1A1A1A] mb-1">3.2x</div>
              <div className="text-xs uppercase tracking-wider text-gray-500">ROI Multiple</div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Section 7: ROI Dashboard ---
const ROIDashboard = () => {
  return (
    <section className="py-32 bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-serif font-medium mb-6">Transparent ROI</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              No more guessing. Give sponsors a real-time dashboard showing exactly how their investment is performing, from impressions to conversions.
            </p>
            <button className="text-white border-b border-white pb-1 text-sm hover:text-gray-300 hover:border-gray-300 transition-colors">
              Explore Analytics Features
            </button>
          </div>
          
          <div className="md:w-2/3 w-full">
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: "Total Reach", val: "1.2M", change: "+14%" },
                 { label: "Engagement", val: "84K", change: "+22%" },
                 { label: "Direct Leads", val: "450", change: "+8%" },
                 { label: "Conversion Value", val: "$124K", change: "+45%" },
               ].map((card, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                 >
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">{card.label}</div>
                    <div className="text-3xl font-serif mb-1">{card.val}</div>
                    <div className="text-xs text-emerald-400">{card.change} vs avg</div>
                    
                    {/* Fake Chart Line */}
                    <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: `${Math.random() * 40 + 40}%` }}
                         transition={{ duration: 1.5, delay: 0.5 }}
                         className="h-full bg-white/40" 
                       />
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 8: AI Advantage ---
const AIAdvantage = () => {
  return (
    <section className="py-32 bg-[#FDFDFB]">
       <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="bg-white p-12 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
             
             <Sparkles className="w-10 h-10 text-purple-600 mx-auto mb-6" />
             
             <h2 className="text-3xl font-serif font-medium mb-6 text-[#1A1A1A]">
               AI plans, optimizes, and reports — quietly.
             </h2>
             <p className="text-lg text-gray-500 mb-10 leading-relaxed">
               Our intelligent engine analyzes audience demographics to suggest the perfect sponsor matches, 
               adjusts activation strategies in real-time, and generates post-event reports automatically.
             </p>

             <div className="flex flex-wrap justify-center gap-3">
                {['Strategy Recs', 'Live Optimization', 'Automated Reporting', 'Risk Analysis'].map((tag, i) => (
                   <span key={i} className="px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-gray-600 border border-gray-100">
                     {tag}
                   </span>
                ))}
             </div>
          </motion.div>
       </div>
    </section>
  );
};

// --- Section 9: Who It's For ---
const Audience = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-12">Trusted by categories</h3>
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {['Beauty & Cosmetics', 'Automotive', 'Luxury Beverages', 'Consumer Tech', 'Jewelry'].map((brand, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="text-xl font-serif text-[#1A1A1A]"
             >
               {brand}
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

// --- Section 10: Final CTA ---
const FinalCTA = () => {
  return (
    <section className="py-32 bg-[#F9F9F8]">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif font-medium text-[#1A1A1A] mb-8"
        >
          Turn Sponsorship into Performance.
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="px-10 py-5 bg-[#1A1A1A] text-white text-base font-bold tracking-wide rounded-sm hover:bg-black transition-all shadow-lg hover:shadow-xl">
            Start Your Sponsor Strategy
          </button>
          <button className="px-10 py-5 bg-transparent text-[#1A1A1A] text-base font-bold tracking-wide border-b border-[#1A1A1A] hover:border-transparent transition-all">
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// --- Style Guide ---
const StyleGuideFooter = () => {
  return (
    <section className="py-20 bg-white border-t border-gray-100 mt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h4 className="text-xs font-bold uppercase text-gray-400 mb-8">Design System Preview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           <div>
              <div className="text-xs text-gray-400 mb-2">Typography</div>
              <div className="font-serif text-2xl mb-1">Playfair Display</div>
              <div className="font-sans text-sm text-gray-500">Inter / Sans-serif</div>
           </div>
           <div>
              <div className="text-xs text-gray-400 mb-2">Palette</div>
              <div className="flex gap-2">
                 <div className="w-8 h-8 bg-[#1A1A1A] rounded shadow-sm" title="Charcoal" />
                 <div className="w-8 h-8 bg-[#FDFDFB] rounded shadow-sm border border-gray-200" title="Ivory" />
                 <div className="w-8 h-8 bg-emerald-600 rounded shadow-sm" title="Accent" />
              </div>
           </div>
           <div>
              <div className="text-xs text-gray-400 mb-2">Components</div>
              <div className="flex gap-2">
                 <div className="px-3 py-1 bg-[#1A1A1A] text-white text-xs rounded-sm">Btn Primary</div>
                 <div className="px-3 py-1 border border-gray-200 text-xs rounded-sm">Btn Sec</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- Main Page Component ---
export default function SponsorshipPage() {
  return (
    <div className="font-sans bg-white min-h-screen selection:bg-[#1A1A1A] selection:text-white">
      <Hero />
      <TheProblem />
      <TheSolution />
      <HowItWorks />
      <Activations />
      <LiveCommerce />
      <ROIDashboard />
      <AIAdvantage />
      <Audience />
      <FinalCTA />
      <StyleGuideFooter />
    </div>
  );
}
