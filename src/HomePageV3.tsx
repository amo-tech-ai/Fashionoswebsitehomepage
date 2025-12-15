import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { 
  ArrowRight, 
  Camera, 
  Video, 
  Globe, 
  Share2, 
  Calendar, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Layers, 
  Zap, 
  BarChart3, 
  Image as ImageIcon,
  Play
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// --- SUB-COMPONENTS ---

// 2. FEATURE OVERVIEW CARD
function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <motion.div 
      variants={fadeIn}
      className="group p-8 border border-gray-100 hover:border-gray-900 bg-white transition-all duration-300"
    >
      <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
        <Icon strokeWidth={1} size={32} />
      </div>
      <h3 className="text-lg font-serif mb-2">{title}</h3>
      <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function HomePageV3() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleNavigation = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-gray-900 selection:text-white">
      <Header />

      {/* 1. HERO SECTION */}
      <section ref={containerRef} className="relative min-h-[90vh] flex items-center pt-28 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT CONTENT */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-12 max-w-xl"
            >
              <motion.div variants={fadeIn} className="flex flex-col gap-6">
                 <span className="text-xs tracking-[0.2em] uppercase text-gray-500 font-semibold">FASHIONOS</span>
                 
                 <h1 className="text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tight">
                   The <br/>
                   Operating <br/>
                   System for <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                     Fashion <br/> Intelligence
                   </span>
                 </h1>
              </motion.div>

              <motion.p variants={fadeIn} className="text-xl font-light text-gray-600 leading-relaxed">
                Runway to Retail • Creative to Commerce • AI-Driven features
              </motion.p>

              <motion.div variants={fadeIn}>
                <button 
                  onClick={() => handleNavigation("/signup")}
                  className="bg-black text-white px-10 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-gray-800 transition-colors"
                >
                  Sign Up
                </button>
              </motion.div>
              
              <motion.div variants={fadeIn} className="pt-8 border-t border-gray-100">
                 <h4 className="font-serif text-lg mb-2">Events & Runway</h4>
                 <p className="text-gray-500 font-light text-sm max-w-sm leading-relaxed">
                   Seamless orchestration for global fashion weeks and private showings.
                 </p>
              </motion.div>
            </motion.div>

            {/* RIGHT IMAGE COMPOSITION */}
            <div className="relative h-[600px] lg:h-[800px] hidden lg:block">
              
              {/* Image 1: Background Rack (Grayscale) */}
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1, delay: 0.2 }}
                 className="absolute left-0 top-[10%] w-[55%] h-[70%] z-0"
              >
                 <ImageWithFallback 
                   src="https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZmFzaGlvbiUyMGNsb3RoZXMlMjByYWNrJTIwYmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwxfHx8fDE3NjU4MzIwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                   alt="Fashion Rack"
                   className="w-full h-full object-cover grayscale"
                 />
              </motion.div>

              {/* Image 2: Main Model (Color) */}
              <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 0.4 }}
                 className="absolute right-0 top-0 w-[55%] h-[85%] z-10 shadow-2xl"
              >
                 <ImageWithFallback 
                   src="https://images.unsplash.com/photo-1654160655268-420e885f1f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBpbiUyMGJsYWNrJTIwc3VpdCUyMHBvc2luZyUyMHN0dWRpbyUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NjU4MzIwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                   alt="Fashion Model Editorial"
                   className="w-full h-full object-cover"
                 />
              </motion.div>

              {/* Image 3: Small Overlay (Nature/Color) */}
              <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1, delay: 0.6 }}
                 className="absolute left-[20%] bottom-[5%] w-[40%] aspect-[3/4] z-20 border-[8px] border-white shadow-xl"
              >
                 <ImageWithFallback 
                   src="https://images.unsplash.com/photo-1637852121227-d50c4639c606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBpbiUyMG5hdHVyZSUyMHdpdGglMjBmbG93ZXJzJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc2NTgzMjA2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                   alt="Editorial Detail"
                   className="w-full h-full object-cover"
                 />
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE OVERVIEW */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-8">
             <h2 className="text-4xl font-serif">One Platform. <br/> Every Fashion Workflow.</h2>
             <p className="text-gray-500 mt-4 md:mt-0 max-w-xs">End-to-end management for modern luxury brands.</p>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
          >
            <FeatureCard icon={Camera} title="Creative Services" desc="Book photographers, stylists, and studios instantly." />
            <FeatureCard icon={Layers} title="Shoots & Production" desc="Manage call sheets, shot lists, and assets in one place." />
            <FeatureCard icon={Calendar} title="Events & Runway" desc="Guest lists, seating charts, and backstage coordination." />
            <FeatureCard icon={ImageIcon} title="Media Intelligence" desc="Centralized DAM with AI tagging and usage rights." />
            <FeatureCard icon={ShoppingBag} title="Commerce" desc="Seamless integration with Shopify and wholesale platforms." />
            <FeatureCard icon={Users} title="Wholesale" desc="Digital showrooms connecting designers with global buyers." />
          </motion.div>
        </div>
      </section>

      {/* 3. CREATIVE SERVICES */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <h2 className="text-5xl font-serif">World-Class <br/> Creative Talent</h2>
               <p className="text-gray-600 font-light text-lg leading-relaxed">
                 Access a curated network of industry professionals. From editorial photographers to set designers, build your dream team in minutes.
               </p>
               <div className="grid grid-cols-2 gap-6 pt-4">
                  {['Photography', 'Video Production', 'Web Design', 'AI Marketing'].map((service) => (
                    <div key={service} className="flex items-center gap-3 py-3 border-b border-gray-100">
                      <ArrowRight size={16} />
                      <span className="uppercase tracking-wide text-xs">{service}</span>
                    </div>
                  ))}
               </div>
               <button onClick={() => handleNavigation("/services")} className="mt-8 bg-black text-white px-8 py-4 text-xs uppercase tracking-widest">
                 Book a Service
               </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4 mt-12">
                  <ImageWithFallback src="https://images.unsplash.com/photo-1529139574466-a302c27e3844?q=80&w=2072&auto=format&fit=crop" className="w-full aspect-[3/4] object-cover" alt="Service 1" />
                  <ImageWithFallback src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop" className="w-full aspect-[1] object-cover" alt="Service 2" />
               </div>
               <div className="space-y-4">
                  <ImageWithFallback src="https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=2059&auto=format&fit=crop" className="w-full aspect-[1] object-cover" alt="Service 3" />
                  <ImageWithFallback src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop" className="w-full aspect-[3/4] object-cover" alt="Service 4" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOOTS & PRODUCTION SYSTEM */}
      <section className="py-24 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Production, Simplified.</h2>
            <p className="text-gray-400 font-light">From concept to call sheet in one workflow.</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-800 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "01", title: "Book", desc: "Select talent & dates" },
                { step: "02", title: "Plan", desc: "Shot lists & moodboards" },
                { step: "03", title: "Shoot", desc: "Live capture integration" },
                { step: "04", title: "Deliver", desc: "Instant retouch & approval" }
              ].map((item, i) => (
                <div key={i} className="bg-gray-900 p-8 border border-gray-800 hover:border-white transition-colors">
                   <span className="text-4xl font-serif text-gray-700 block mb-4">{item.step}</span>
                   <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                   <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button onClick={() => handleNavigation("/wizard")} className="bg-white text-black px-8 py-4 text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors">
                Start a Shoot
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EVENTS & RUNWAYS */}
      <section className="relative h-screen min-h-[800px]">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1512413316925-fd4b93f31521?q=80&w=2574&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Runway Background"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center">
           <div className="container mx-auto px-6 lg:px-12">
              <div className="bg-white p-12 lg:p-16 max-w-xl">
                 <h2 className="text-5xl font-serif mb-6">Orchestrate <br/> The Moment</h2>
                 <p className="text-gray-600 mb-8 leading-relaxed">
                   Comprehensive tools for fashion weeks, private viewings, and global launches. Manage guest lists, seating, and press with military precision.
                 </p>
                 <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 text-sm tracking-wide"><span className="w-1.5 h-1.5 bg-black rounded-full"></span> Venue Management</li>
                    <li className="flex items-center gap-3 text-sm tracking-wide"><span className="w-1.5 h-1.5 bg-black rounded-full"></span> Smart Seating Charts</li>
                    <li className="flex items-center gap-3 text-sm tracking-wide"><span className="w-1.5 h-1.5 bg-black rounded-full"></span> Sponsor ROI Tracking</li>
                 </ul>
                 <button onClick={() => handleNavigation("/events")} className="border border-black px-8 py-4 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                   Plan an Event
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* 6. MEDIA & CONTENT INTELLIGENCE */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-serif mb-6">Intelligent Media Library</h2>
            <p className="text-gray-500 font-light text-lg">
              Stop digging through Dropboxes. Our AI-powered DAM organizes your assets by campaign, model, season, and usage rights automatically.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Thumbnail Grid - Simulating a DAM view */}
             {[
               "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1990&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=2065&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=2070&auto=format&fit=crop"
             ].map((src, i) => (
               <div key={i} className="aspect-square relative group overflow-hidden bg-gray-200">
                 <ImageWithFallback src={src} alt="Media Asset" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white p-2 rounded-full">
                     <Share2 size={16} />
                   </div>
                 </div>
               </div>
             ))}
          </div>
          
          <div className="text-center mt-12">
             <button className="border-b border-black pb-1 text-sm tracking-widest uppercase hover:text-gray-600 transition-colors">
               View Media Library
             </button>
          </div>
        </div>
      </section>

      {/* 7. WEBSITES & E-COMMERCE */}
      <section className="py-32">
         <div className="container mx-auto px-6 lg:px-12">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="order-2 lg:order-1 relative bg-gray-100 p-12 rounded-xl">
                  {/* Mockup */}
                  <div className="relative z-10 shadow-2xl bg-white aspect-[16/10] overflow-hidden border border-gray-200">
                     <ImageWithFallback src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Website Preview" />
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-1/3 aspect-[9/16] bg-black border-4 border-black rounded-3xl shadow-2xl overflow-hidden z-20">
                     <ImageWithFallback src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop" className="w-full h-full object-cover" alt="Mobile Preview" />
                  </div>
               </div>
               <div className="order-1 lg:order-2 space-y-8">
                  <Globe className="text-gray-400 mb-4" size={40} strokeWidth={1} />
                  <h2 className="text-5xl font-serif">Flagship Digital <br/> Experiences</h2>
                  <p className="text-gray-600 font-light text-lg">
                    Build immersive, editorial-first e-commerce sites. Optimized for storytelling and conversion, fully integrated with your inventory.
                  </p>
                  <button onClick={() => handleNavigation("/website-wizard")} className="bg-black text-white px-8 py-4 text-xs uppercase tracking-widest">
                    Build Your Website
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* 8. SOCIAL COMMERCE & AI MARKETING */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-8"></div>
            <h2 className="text-4xl font-serif mb-4">Social Commerce Intelligence</h2>
            <p className="text-gray-600 max-w-2xl">Turn your content into revenue. Automated tagging, scheduling, and performance analytics across all channels.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "AI Captioning", desc: "Generates on-brand copy for every platform instantly." },
              { title: "Product Tagging", desc: "Syncs visual assets with your Shopify catalog." },
              { title: "Multi-Channel", desc: "One-click publish to Instagram, TikTok, and Pinterest." }
            ].map((card, i) => (
              <div key={i} className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg">
                 <h3 className="text-lg font-serif mb-3">{card.title}</h3>
                 <p className="text-sm text-gray-500">{card.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <button className="text-purple-900 border border-purple-200 bg-white px-8 py-4 text-xs uppercase tracking-widest hover:border-purple-900 transition-colors">
               Launch a Campaign
             </button>
          </div>
        </div>
      </section>

      {/* 9. B2B DIRECTORY */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gray-200">
              <div className="p-16 border-b lg:border-b-0 lg:border-r border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer">
                 <h3 className="text-3xl font-serif mb-4">For Designers</h3>
                 <p className="text-gray-500 mb-8 max-w-sm">Showcase your collections to a global network of vetted retailers and buyers.</p>
                 <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
                   <span className="uppercase text-xs tracking-widest font-medium">Explore Opportunities</span>
                   <ArrowRight size={16} />
                 </div>
              </div>
              <div className="p-16 hover:bg-gray-50 transition-colors group cursor-pointer">
                 <h3 className="text-3xl font-serif mb-4">For Buyers</h3>
                 <p className="text-gray-500 mb-8 max-w-sm">Discover emerging talent and place wholesale orders directly through the platform.</p>
                 <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
                   <span className="uppercase text-xs tracking-widest font-medium">Join the Network</span>
                   <ArrowRight size={16} />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 10. AI INTELLIGENCE LAYER */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            <Zap className="mx-auto mb-8 text-yellow-400" size={48} strokeWidth={1} />
            <h2 className="text-5xl lg:text-7xl font-serif mb-8">Fashion, Powered by <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-500">Intelligence</span></h2>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-12 text-sm lg:text-base tracking-wide text-gray-300">
               <span>• Predictive Forecasting</span>
               <span>• Automated Retouching</span>
               <span>• Dynamic Pricing</span>
               <span>• Sustainability Tracking</span>
            </div>
         </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-5xl lg:text-6xl font-serif mb-12 text-gray-900">Ready to Run Fashion <br/> Like a System?</h2>
            
            <div className="flex flex-col items-center gap-6">
               <button 
                  onClick={() => handleNavigation("/designer-wizard")}
                  className="bg-black text-white px-12 py-5 text-sm uppercase tracking-widest hover:bg-gray-800 transition-all transform hover:scale-105"
               >
                  Create Your Brand Profile
               </button>
               
               <div className="flex gap-8 mt-4">
                  <button onClick={() => handleNavigation("/wizard")} className="text-gray-500 hover:text-black border-b border-transparent hover:border-black pb-1 transition-all text-sm">
                    Book a Shoot
                  </button>
                  <button onClick={() => handleNavigation("/events")} className="text-gray-500 hover:text-black border-b border-transparent hover:border-black pb-1 transition-all text-sm">
                    Plan an Event
                  </button>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
