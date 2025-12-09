import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Footer } from "./components/Footer";
import { motion } from "motion/react";
import { ArrowRight, Check, Camera, Box, ShoppingBag, Video, Layers, ShieldCheck, Zap, Star, Smartphone, RotateCw, LayoutTemplate, PenTool } from "lucide-react";
import React, { useState } from "react";

export default function AmazonServices() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    storeLink: "",
    category: "Apparel",
    message: ""
  });

  const categories = ["Apparel", "Beauty", "Jewelry", "Home & Kitchen", "Electronics", "Health & Personal Care", "Other"];

  const photoServices = [
    {
      icon: Camera,
      title: "White Background",
      description: "Amazon-compliant pure white images (RGB 255,255,255), high resolution, flawless lighting.",
      image: "https://images.unsplash.com/photo-1626897885636-dd68020cc52a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY0ODMyMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: ShoppingBag,
      title: "Lifestyle Photography",
      description: "Show your product in real-world environments to enhance buyer confidence.",
      image: "https://images.unsplash.com/photo-1624521793559-136bfe16fc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBhbWF6b258ZW58MXx8fHwxNzY0ODg3NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Layers,
      title: "Infographics",
      description: "Clean, easy-to-read graphics that highlight features, dimensions, and key benefits.",
      image: "https://images.unsplash.com/photo-1758297679787-12524226e30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbWFjcm8lMjBkZXRhaWwlMjBzaG90fGVufDF8fHx8MTc2NDg4NzQ5OXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Star,
      title: "Model Photography",
      description: "Professional styled shoots following Amazon apparel guidelines for fashion & beauty.",
      image: "https://images.unsplash.com/photo-1742540676438-722880414f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBzdHVkaW8lMjBzaG9vdHxlbnwxfHx8fDE3NjQ4ODc0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Box,
      title: "Detail & Macro",
      description: "Texture, materials, craftsmanship — captured in crystal-clear detail.",
      image: "https://images.unsplash.com/photo-1762522903557-891c8dc11f4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwb3J0cmFpdCUyMHJldG91Y2hpbmd8ZW58MXx8fHwxNzY0ODgzODQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: RotateCw,
      title: "360° Photography",
      description: "Interactive full-angle views for a richer shopping experience.",
      image: "https://images.unsplash.com/photo-1754923780529-f98eb8f05df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdmlkZW9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY0ODg1OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: PenTool,
      title: "Editing & Retouching",
      description: "Expert color correction, dust removal, sharpening, and listing-ready export.",
      image: "https://images.unsplash.com/photo-1636293875796-1cbaf6585779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRvdWNoaW5nJTIwd29ya3NwYWNlJTIwc3R1ZGlvfGVufDF8fHx8MTc2NDg4Mzg0NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Smartphone,
      title: "Mobile to Amazon",
      description: "Send us phone shots — we transform them into polished, compliant listing images.",
      image: "https://images.unsplash.com/photo-1567570671138-76c7e06caa3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwYWNrYWdpbmclMjB1bmJveGluZ3xlbnwxfHx8fDE3NjQ4ODc0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const videoServices = [
    {
      title: "Product Overview",
      description: "Simple, polished overview that highlights features.",
      image: "https://images.unsplash.com/photo-1618139731872-ccc79e73c123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwdmlkZW8lMjBmaWxtaW5nfGVufDF8fHx8MTc2NDg4NTk5NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Explainer Video",
      description: "Problem → solution format that drives engagement.",
      image: "https://images.unsplash.com/photo-1660286118182-11cdf887a9ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0JTIwY29tbWVyY2lhbHxlbnwxfHx8fDE3NjQ4ODU5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Unboxing Video",
      description: "Authentic first-impression experience.",
      image: "https://images.unsplash.com/photo-1759563876826-30481c505545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmJveGluZyUyMGx1eHVyeSUyMHByb2R1Y3R8ZW58MXx8fHwxNzY0ODg1OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "How-To Guide",
      description: "Step-by-step guide to reduce returns.",
      image: "https://images.unsplash.com/photo-1575320854760-bfffc3550640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY0ODU1MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Lifestyle Video",
      description: "Real-life scenes for emotional storytelling.",
      image: "https://images.unsplash.com/photo-1643432398338-623fbd492894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBmYXNoaW9uJTIwc2hvb3R8ZW58MXx8fHwxNzY0ODg1OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Comparison",
      description: "Side-by-side to show your advantage.",
      image: "https://images.unsplash.com/photo-1698581075105-924b6c70b5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwc2hvd2Nhc2V8ZW58MXx8fHwxNzY0ODg1OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const pricing = [
    {
      name: "Starter",
      description: "White background essentials.",
      includes: ["3 High-Res Photos", "Pure White Background", "Basic Retouching", "Amazon Compliant"],
      highlight: false
    },
    {
      name: "Growth",
      description: "Best for new product launches.",
      includes: ["7 High-Res Photos", "1 Lifestyle Shot", "1 Infographic", "Advanced Retouching", "A+ Content Module"],
      highlight: true
    },
    {
      name: "Premium",
      description: "Full Amazon optimization.",
      includes: ["10 High-Res Photos", "3 Lifestyle Shots", "2 Infographics", "Product Video (15s)", "Full A+ Content Design"],
      highlight: false
    }
  ];

  const platforms = ["Amazon", "Shopify", "Instagram", "Facebook", "TikTok", "YouTube"];

  const recentWork = [
    "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2NDg4Nzk4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMHdhdGNoJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ4ODc5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ4ODc5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwc2hvZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzY0ODg3OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcG9sYXJvaWR8ZW58MXx8fHwxNzY0ODg3OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ4ODc5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Amazon Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F4]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-3 gap-1 opacity-20 pointer-events-none">
          <ImageWithFallback src="https://images.unsplash.com/photo-1626897885636-dd68020cc52a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY0ODMyMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080" className="h-full w-full object-cover" alt="" />
          <ImageWithFallback src="https://images.unsplash.com/photo-1624521793559-136bfe16fc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBhbWF6b258ZW58MXx8fHwxNzY0ODg3NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080" className="h-full w-full object-cover hidden lg:block" alt="" />
          <ImageWithFallback src="https://images.unsplash.com/photo-1567570671138-76c7e06caa3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwYWNrYWdpbmclMjB1bmJveGluZ3xlbnwxfHx8fDE3NjQ4ODc0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080" className="h-full w-full object-cover hidden lg:block" alt="" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F6F4] via-white/80 to-white/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 tracking-tight">
              Amazon-Ready Images<br />& Videos That Convert.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Professional photography, editing, and videos engineered to meet Amazon’s strict requirements and boost your listing performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg inline-flex items-center justify-center gap-2 text-lg font-medium">
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-4 bg-white text-gray-900 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-2 text-lg font-medium shadow-sm">
                See Sample Work
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY AMAZON IMAGES MATTER */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 font-serif">
                Why visual quality is your #1 asset.
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                85% of buyers say product images influence their purchase decision. On a marketplace as crowded as Amazon, high-quality visuals are the difference between a scroll and a sale.
              </p>
              <ul className="space-y-4">
                {[
                  "Increase click-through rates (CTR)",
                  "Boost conversion rates instantly",
                  "Reduce return rates with accurate detail",
                  "Build brand trust and perceived value"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white p-4 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                   <ImageWithFallback
                     src="https://images.unsplash.com/photo-1601057836844-a8a336439a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwcGhvdG9ncmFwaHklMjBtYWNyb3xlbnwxfHx8fDE3NjQ4ODM4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                     alt="High quality product shot"
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                     FashionOS Quality
                   </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                   <div className="text-sm font-medium text-gray-900">Amazon Standards • Improved Conversions</div>
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PHOTOGRAPHY SERVICES */}
      <section className="py-24 bg-[#F8F6F4]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Photography Services</h2>
            <p className="text-lg text-gray-600">Comprehensive visual solutions for every part of your listing.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photoServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 text-gray-900" />
                      <h3 className="font-bold text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.description}</p>
                    <span className="text-xs font-semibold text-gray-900 border-b border-gray-200 group-hover:border-gray-900 transition-colors inline-block pb-0.5">
                      Learn More
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. VIDEO SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Video Production</h2>
            <p className="text-lg text-gray-600">Engage shoppers and reduce returns with high-clarity video.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoServices.map((video, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 relative shadow-md group-hover:shadow-lg transition-all mb-4">
                  <ImageWithFallback
                    src={video.image}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                      <Video className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. A+ CONTENT */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-6">
                <LayoutTemplate className="w-3 h-3" />
                <span>Brand Registry Enhanced</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif mb-8">
                A+ Content Designed to Maximize Conversion.
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Custom modules, lifestyle blocks, infographics, comparison tables, and storytelling layouts — optimized for mobile and Amazon Brand Registry. We turn your product page into a landing page.
              </p>
              <button className="px-8 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all font-medium">
                View A+ Examples
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 translate-y-8">
                <div className="bg-white/5 p-2 rounded-lg backdrop-blur border border-white/10">
                  <div className="h-32 bg-gray-800 rounded mb-2 w-full animate-pulse opacity-50"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4 opacity-50"></div>
                </div>
                <div className="bg-white/5 p-2 rounded-lg backdrop-blur border border-white/10">
                  <div className="h-48 bg-gray-800 rounded mb-2 w-full animate-pulse opacity-50"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2 opacity-50"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 p-2 rounded-lg backdrop-blur border border-white/10">
                  <div className="h-40 bg-gray-800 rounded mb-2 w-full animate-pulse opacity-50"></div>
                  <div className="h-4 bg-gray-800 rounded w-2/3 opacity-50"></div>
                </div>
                <div className="bg-white/5 p-2 rounded-lg backdrop-blur border border-white/10">
                  <div className="h-32 bg-gray-800 rounded mb-2 w-full animate-pulse opacity-50"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4 opacity-50"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. COMPLIANCE GUARANTEE */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-blue-50/50 rounded-3xl p-8 md:p-12 border border-blue-100 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-serif text-gray-900 mb-8">100% Amazon-Compliant Visuals.</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
              {[
                "Pure white backgrounds (255,255,255)",
                "No watermarks or text overlays",
                "Approved apparel photography rules",
                "Correct file dimensions (min 1000px)",
                "Mobile-optimized cropping",
                "Rejection prevention guarantee"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING PACKAGES */}
      <section className="py-24 bg-[#F8F6F4]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Simple Packages</h2>
            <p className="text-lg text-gray-600">Transparent pricing for every stage of growth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-8 shadow-sm flex flex-col ${pkg.highlight ? 'border-2 border-gray-900 shadow-xl scale-105 z-10' : 'border border-gray-200'}`}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                </div>
                <div className="flex-1 mb-8">
                  <ul className="space-y-4">
                    {pkg.includes.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${pkg.highlight ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                          <Check className="w-3 h-3" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={`w-full py-4 rounded-xl font-medium transition-all ${pkg.highlight ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}>
                  Book This Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RECENT WORK GALLERY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-serif text-gray-900 mb-12 text-center">Recent Amazon Projects</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentWork.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="aspect-square rounded-lg overflow-hidden group relative cursor-pointer"
              >
                <ImageWithFallback
                  src={src}
                  alt={`Work sample ${index}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium border-b border-white pb-0.5">View Project</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CHANNELS WE SUPPORT */}
      <section className="py-16 bg-stone-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-500 mb-8 uppercase tracking-widest text-xs">Content optimized for every major ecommerce platform</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
            {platforms.map((platform, index) => (
              <span key={index} className="text-2xl md:text-3xl font-serif text-gray-900">{platform}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 flex justify-center gap-1">
              {[1,2,3,4,5].map(star => <Star key={star} className="w-6 h-6 text-gray-900 fill-gray-900" />)}
            </div>
            <blockquote className="text-3xl md:text-4xl text-gray-900 mb-8 leading-relaxed font-serif">
              "The images helped us increase our Amazon conversions by 38% in just 30 days. Absolutely game-changing."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <ImageWithFallback src="https://images.unsplash.com/photo-1706099347777-002ab5e8190c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3NjQ3NzI0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080" className="w-full h-full object-cover" alt="User" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">Sarah Jenkins</div>
                <div className="text-sm text-gray-600">Founder, PureHome Essentials</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11. CONTACT FORM */}
      <section className="py-24 bg-[#F8F6F4]">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-serif text-gray-900 mb-4">Start Your Amazon Project</h2>
              <p className="text-gray-600">Tell us about your product. Average turnaround: 3–5 business days.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors bg-gray-50"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Amazon Storefront Link (Optional)</label>
                  <input
                    type="url"
                    value={formData.storeLink}
                    onChange={(e) => setFormData({ ...formData, storeLink: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Product Category</label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors bg-gray-50 appearance-none"
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors resize-none bg-gray-50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg text-lg font-medium flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Get My Quote
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <Footer />
    </div>
  );
}
