import React from 'react';
import { 
  ArrowRight, 
  Check, 
  Globe, 
  Zap, 
  Smartphone, 
  Layout, 
  ShoppingBag, 
  Code, 
  PenTool, 
  BarChart, 
  Layers,
  Monitor,
  Search,
  Settings,
  Repeat,
  Cpu,
  MoveRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function WebDesignServices() {
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <motion.div 
          className="lg:w-1/2 space-y-8 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            FashionOS Design Studio
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight text-gray-900">
            Fashion E-Commerce <br/>
            <span className="italic text-gray-500">Web Design</span>, <br/>
            Done Right.
          </h1>
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-light">
            Beautiful, fast, conversion-driven e-commerce experiences crafted specifically for modern fashion brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20 group">
              Get a Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm">
              View Our Work
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200 border border-white/50 aspect-[4/3] group">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1564518160120-94178fcdf5d4?auto=format&fit=crop&q=80&w=1200" 
              alt="Fashion E-Commerce Interface" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay UI Mockup Elements */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Conversion Rate</div>
                        <div className="text-2xl font-serif font-bold text-gray-900">+42.8%</div>
                    </div>
                    <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white">
                        <Zap className="w-5 h-5" />
                    </div>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="w-[75%] h-full bg-gray-900 rounded-full" />
                </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gray-200 rounded-full blur-3xl opacity-50 -z-10" />
        </motion.div>
      </section>

      {/* 2. Brand Logos Strip */}
      <section className="py-12 border-y border-gray-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Trusted by Premium Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {["Nerdy Banana", "Super Socks", "Snugzy", "Skinnify", "Nanobébé"].map((brand) => (
               <span key={brand} className="text-xl lg:text-2xl font-serif font-bold text-gray-800">{brand}</span>
             ))}
          </div>
        </div>
      </section>

      {/* 3. Value Proposition Cards */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          {...fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Why Fashion Brands Choose FashionOS</h2>
          <p className="text-lg text-gray-500 font-light">We don't just design websites. We build digital flagships that embody your brand's soul.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
            {[
                {
                    title: "Seamless User Experience",
                    desc: "Every click feels intentional. Designed to convert visitors into loyal customers through intuitive flows.",
                    icon: Layout,
                    image: "https://images.unsplash.com/photo-1554306274-f23873d9a26c?auto=format&fit=crop&q=80&w=800"
                },
                {
                    title: "Ultra-Fast Performance",
                    desc: "Built for growth and high-traffic retail seasons. 99.9% uptime and lightning fast page loads.",
                    icon: Zap,
                    image: "https://images.unsplash.com/photo-1696087225391-eb97abf5ba20?auto=format&fit=crop&q=80&w=800"
                },
                {
                    title: "Global Localization",
                    desc: "Multi-currency, multi-region, multi-language. Fashion goes everywhere, and so should your store.",
                    icon: Globe,
                    image: "https://images.unsplash.com/photo-1660150912355-83e1298d0115?auto=format&fit=crop&q=80&w=800"
                }
            ].map((card, idx) => (
                <motion.div 
                    key={idx} 
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                >
                    <div className="h-48 overflow-hidden relative">
                        <ImageWithFallback src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <div className="p-8">
                        <div className="w-12 h-12 bg-[#F8F5F1] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                            <card.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{card.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* 4. Who We Work With */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <h2 className="text-4xl font-serif text-gray-900 mb-2">Who We Work With</h2>
                    <p className="text-gray-500">Tailored solutions for every sector of the fashion industry.</p>
                </div>
                <button className="text-gray-900 font-medium flex items-center gap-2 hover:gap-4 transition-all">
                    View Case Studies <MoveRight className="w-4 h-4" />
                </button>
            </div>

            <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
            >
                {[
                    { label: "Apparel Brands", icon: ShoppingBag },
                    { label: "Global Retailers", icon: Globe },
                    { label: "Supply Chain", icon: Repeat },
                    { label: "Accessories", icon: Search },
                    { label: "Service Companies", icon: Settings },
                    { label: "Distributors", icon: Layers }
                ].map((item, i) => (
                    <motion.div 
                        key={i} 
                        variants={itemFade}
                        className="p-8 bg-[#F8F5F1] rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-gray-900 hover:text-white transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-800"
                    >
                        <item.icon className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span className="font-medium text-lg text-center">{item.label}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* 5. Solutions Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
                    How We Empower <br/>Your Business
                </h2>
                
                <div className="space-y-6">
                    {[
                        "Highly Personalized E-Commerce Experiences",
                        "Efficient Product Management Workflows",
                        "Fast, Headless Site Updates",
                        "Seamless Integrations & Automations",
                        "Advanced Localization & Currency",
                        "High-Traffic Scalability & Security"
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-lg text-gray-700 font-light">{item}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="lg:w-1/2 order-1 lg:order-2">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
                    <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000" 
                        alt="Empowering Business" 
                        className="w-full aspect-[4/5] object-cover"
                    />
                    
                    {/* Floating Badge */}
                    <motion.div 
                        className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                         <div className="flex justify-between items-center mb-2">
                             <div className="text-sm font-medium text-gray-900">Mobile Conversion</div>
                             <div className="text-sm font-bold text-green-600">+24%</div>
                         </div>
                         <div className="w-full bg-gray-100 h-2 rounded-full">
                             <div className="w-[65%] h-full bg-green-500 rounded-full" />
                         </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* 6. Services Grid */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <span className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-4 block">Our Expertise</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">What You Get With Our Fashion Web Design</h2>
                <p className="text-gray-400 font-light">Comprehensive digital solutions designed for the unique needs of the fashion industry.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Fashion E-Commerce", icon: ShoppingBag, text: "Bespoke storefronts that tell your brand story." },
                    { title: "Shopify for Fashion", icon: Layout, text: "Expert Shopify Plus customization and theme development." },
                    { title: "Fashion App Development", icon: Smartphone, text: "Native iOS and Android apps for mobile-first shopping." },
                    { title: "Headless Commerce", icon: Cpu, text: "Decoupled front-ends for ultimate speed and flexibility." },
                    { title: "Lookbook & Editorial", icon: Layers, text: "Immersive storytelling layouts for collections." },
                    { title: "Jamstack / Hydrogen", icon: Code, text: "Next-gen tech stack for instant page loads." },
                ].map((service, i) => (
                    <motion.div 
                        key={i}
                        className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <service.icon className="w-10 h-10 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{service.text}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 7. Milestone Roadmap */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Our E-Commerce Build Process</h2>
            <p className="text-gray-500 max-w-2xl">A transparent, agile workflow designed to get you to market faster.</p>
        </div>

        <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-[22px] left-0 right-0 h-0.5 bg-gray-200 hidden lg:block" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6">
                {[
                    { step: "01", title: "Discovery", desc: "Goals, KPIs, Audience" },
                    { step: "02", title: "Design", desc: "UX/UI, Prototyping" },
                    { step: "03", title: "Develop", desc: "Frontend, Integration" },
                    { step: "04", title: "Launch", desc: "QA, Go-Live, Growth" },
                ].map((phase, i) => (
                    <div key={i} className="relative group">
                        <div className="w-12 h-12 rounded-full bg-white border-4 border-[#F8F5F1] shadow-sm flex items-center justify-center font-bold text-gray-900 relative z-10 mb-6 group-hover:scale-110 group-hover:border-gray-900 transition-all">
                            {phase.step}
                        </div>
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{phase.title}</h3>
                        <p className="text-sm text-gray-500">{phase.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 8. Case Studies Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-serif text-gray-900 mb-12 text-center">Recent Transformations</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { name: "Lumina Jewels", metric: "+125% Traffic", image: "https://images.unsplash.com/photo-1758191570860-02636c34f03a?auto=format&fit=crop&q=80&w=600" },
                    { name: "Apex Streetwear", metric: "2x Conversion", image: "https://images.unsplash.com/photo-1763551229518-4a529c865e00?auto=format&fit=crop&q=80&w=600" },
                    { name: "Velvet Home", metric: "-40% Load Time", image: "https://images.unsplash.com/photo-1660150912355-83e1298d0115?auto=format&fit=crop&q=80&w=600" },
                ].map((study, i) => (
                    <motion.div 
                        key={i}
                        className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <ImageWithFallback src={study.image} alt={study.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                            <h3 className="text-2xl font-serif text-white mb-2">{study.name}</h3>
                            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-sm font-bold border border-white/10">
                                {study.metric}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 9. CTA Footer */}
      <section className="py-32 px-6 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight">
                Let’s Create a Stunning <br/>Fashion Website Together.
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
                Ready to elevate your brand? Schedule a consultation to discuss your vision and goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
                    Book a Consultation
                </button>
                <button className="px-10 py-5 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all">
                    Download Portfolio
                </button>
            </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900 rounded-full blur-[120px]" />
        </div>
      </section>

    </div>
  );
}
