import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Footer } from "./components/Footer";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Instagram, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Heart, 
  Camera, 
  Video, 
  Smartphone, 
  Layers, 
  Zap, 
  Check, 
  Play,
  CreditCard,
  Eye,
  Share2
} from "lucide-react";
import React, { useState } from "react";

export default function InstagramServices() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    handle: "",
    website: "",
    message: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Instagram form submitted:", formData);
  };

  const photoServices = [
    {
      title: "Product Photography",
      description: "Clear, polished product shots that build trust and increase clicks.",
      image: "https://images.unsplash.com/photo-1629139033414-76f3c0eacf84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbGlmZXN0eWxlJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NDg5MDg4OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Lifestyle Photography",
      description: "Show customers how your product fits into their lives — boosting engagement.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NDg5MDg4OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Lookbook Shoots",
      description: "A cohesive brand identity that elevates your online presence.",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2t8ZW58MXx8fHwxNzY0ODkwODg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Styled Flatlays",
      description: "Scene styling that makes your products stand out instantly.",
      image: "https://images.unsplash.com/photo-1485125856598-63b7ec581083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGZsYXRsYXklMjBzdHlsZWR8ZW58MXx8fHwxNzY0ODkwODg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Influencer Style UGC",
      description: "Authentic visuals that improve relatability and drive conversions.",
      image: "https://images.unsplash.com/photo-1591348070112-aa76298737c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBmYXNoaW9uJTIwcmVlbCUyMGNvbnRlbnQlMjBtb2JpbGV8ZW58MXx8fHwxNzY0ODkwODg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Model Photography",
      description: "Professional, fashion-forward imagery designed to increase appeal.",
      image: "https://images.unsplash.com/photo-1664076423411-e570cfdfcbed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWwlMjBzaG9vdHxlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const videoServices = [
    {
      title: "Reels Production",
      description: "Short-form videos that maximize reach.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjByZWVsc3xlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Stories Video",
      description: "Real-time engagement that strengthens loyalty.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjB2aWRlb3xlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Product Demos",
      description: "Clear demonstrations that reduce confusion.",
      image: "https://images.unsplash.com/photo-1662466767400-27c176fab51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwdW5ib3hpbmclMjB2aWRlb3xlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "UGC-Style Videos",
      description: "Authentic social-native videos proven to convert.",
      image: "https://images.unsplash.com/photo-1693681866239-694107820b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMHNvY2lhbCUyMG1lZGlhJTIwc2Nyb2xsaW5nfGVufDF8fHx8MTc2NDg5MDg4OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Carousel Video",
      description: "Interactive posts that increase swipe-through rate.",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjB1aXxlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Ads Video",
      description: "Performance-optimized creatives designed to scale.",
      image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhbmFseXRpY3N8ZW58MXx8fHwxNzY0ODkwODg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const portfolioImages = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NDg5MDg4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1664076423411-e570cfdfcbed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWwlMjBzaG9vdHxlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1485125856598-63b7ec581083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGZsYXRsYXklMjBzdHlsZWR8ZW58MXx8fHwxNzY0ODkwODg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1591348070112-aa76298737c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBmYXNoaW9uJTIwcmVlbCUyMGNvbnRlbnQlMjBtb2JpbGV8ZW58MXx8fHwxNzY0ODkwODg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1629139033414-76f3c0eacf84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbGlmZXN0eWxlJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NDg5MDg4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2t8ZW58MXx8fHwxNzY0ODkwODg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjByZWVsc3xlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjB1aXxlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-[#F8F6F4] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full pt-20 md:pt-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold mb-6 uppercase tracking-wider">
                <Instagram className="w-3 h-3" />
                Official Instagram Partners
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 leading-[1.1]">
                Instagram Content That Drives Reach, Trust & Sales.
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                High-impact visuals that stop the scroll, grow your brand, and convert viewers into buyers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg text-lg font-medium">
                  Start Your Instagram Project
                </button>
                <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm text-lg font-medium">
                  View Portfolio
                </button>
              </div>
            </motion.div>

            {/* Hero Visual Collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[600px] w-full hidden lg:block"
            >
              <div className="absolute top-10 left-10 w-64 h-96 bg-white shadow-2xl rounded-2xl rotate-[-6deg] overflow-hidden z-10 transform hover:rotate-0 transition-all duration-500">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1664076423411-e570cfdfcbed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWwlMjBzaG9vdHxlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Editorial"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-20 right-20 w-60 h-80 bg-white shadow-2xl rounded-2xl rotate-[6deg] overflow-hidden z-20 transform hover:rotate-0 transition-all duration-500">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1591348070112-aa76298737c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBmYXNoaW9uJTIwcmVlbCUyMGNvbnRlbnQlMjBtb2JpbGV8ZW58MXx8fHwxNzY0ODkwODg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Reel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-white shadow-2xl rounded-2xl rotate-[-2deg] overflow-hidden z-30 transform hover:rotate-0 transition-all duration-500">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1485125856598-63b7ec581083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGZsYXRsYXklMjBzdHlsZWR8ZW58MXx8fHwxNzY0ODkwODg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
                  <ShoppingBag className="w-4 h-4 text-black" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WHY INSTAGRAM MATTERS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Stats */}
            <div className="space-y-8">
              <h2 className="text-3xl font-serif text-gray-900 mb-8">
                The Power of Visuals.
              </h2>
              {[
                { icon: TrendingUp, text: "Reels deliver up to 3× higher reach than static posts" },
                { icon: ShoppingBag, text: "High-quality visuals boost purchase intent by 58%" },
                { icon: Users, text: "70% of shoppers use Instagram to discover new products" },
                { icon: Heart, text: "Video posts generate 49% more interactions" },
                { icon: CreditCard, text: "Instagram Shops improve conversions by up to 30%" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 shrink-0">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-lg text-gray-700 font-medium">{stat.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Benefit Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#F8F6F4] rounded-3xl p-8 md:p-12 flex flex-col justify-center"
            >
              <h3 className="text-3xl font-serif text-gray-900 mb-6">
                Better Content = Better Results.
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                In a crowded feed, professional visuals are your competitive advantage. They increase visibility, drive saves and shares, and ultimately turn followers into loyal customers.
              </p>
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjByZWVsc3xlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Before After"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-medium">FashionOS Optimized Content</p>
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
            <span className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3 block">Photography</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Instagram Photography</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photoServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-4 h-4 text-gray-900" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VIDEO SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3 block">Video Production</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Instagram Video</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[9/16] rounded-2xl overflow-hidden relative shadow-lg mb-6">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTENT TYPES */}
      <section className="py-24 bg-[#F8F6F4]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Built for Every Format</h2>
            <p className="text-gray-600">Designed to perform across the entire Instagram ecosystem.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: "Single Posts", desc: "Brand Perception" },
              { title: "Carousels", desc: "Storytelling" },
              { title: "Reels", desc: "High Reach" },
              { title: "Stories", desc: "Engagement" },
              { title: "Shop Photos", desc: "Conversion" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OPTIMIZATION FEATURES */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Optimized Crop Ratios", desc: "Perfect framing for Feed, Reels, and Stories." },
              { title: "Mobile-First Grading", desc: "Vibrant, eye-catching visuals on any device." },
              { title: "Trend-Aware Creative", desc: "Content aligned with what Instagram is pushing." },
              { title: "Compression-Safe", desc: "Your content stays crisp after upload." }
            ].map((feat, i) => (
              <div key={i} className="text-left">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feat.title}</h4>
                <p className="text-sm text-gray-600">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SOCIAL COMMERCE INTEGRATION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif text-gray-900 mb-8">
                Content That Fuels Instagram Shops & Sales.
              </h2>
              <ul className="space-y-6">
                {[
                  "Increase product page engagement",
                  "Improve tap-through rates",
                  "Reduce buyer hesitation with lifestyle content",
                  "Drive more saves, shares, and follows",
                  "Strengthen brand identity across all placements"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3" />
                    </div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10 bg-white rounded-xl shadow-2xl overflow-hidden max-w-xs mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
                  <div className="font-bold text-sm">FashionOS Shop</div>
                  <ShoppingBag className="w-4 h-4 text-gray-400" />
                </div>
                <div className="aspect-square bg-gray-200 relative">
                   <ImageWithFallback
                     src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NDg5MDg4OHww&ixlib=rb-4.1.0&q=80&w=1080"
                     className="w-full h-full object-cover"
                     alt="Shop Product"
                   />
                   <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 rounded shadow text-xs font-bold">
                     $129.00
                   </div>
                </div>
                <div className="p-4">
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-50 rounded w-1/2"></div>
                  <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded text-sm font-medium">View on Website</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PORTFOLIO GRID */}
      <section className="py-24 bg-[#F8F6F4]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-serif text-gray-900 mb-12">See the Results for Yourself</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`relative rounded-lg overflow-hidden cursor-pointer group aspect-square ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`Portfolio ${i}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="text-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHY BRANDS CHOOSE US */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Expert Creative Direction", desc: "Every shoot planned for performance." },
              { title: "Brand Consistency", desc: "Visuals that strengthen your identity." },
              { title: "Fast Delivery", desc: "Social-ready content in as little as 72 hours." },
              { title: "Built for Ecommerce", desc: "Photos and videos optimized for conversion." }
            ].map((card, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center group">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <StarIcon i={i} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-24 bg-[#F8F6F4]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-8">Trusted by Growing Brands</h2>
          <blockquote className="text-3xl md:text-5xl font-serif text-gray-900 mb-10 leading-tight">
            "Our Instagram engagement increased by 40% after switching to FashionOS content. It's night and day."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
               <ImageWithFallback src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcGljdHVyZXxlbnwxfHx8fDE3NjQ4OTA4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080" className="w-full h-full object-cover" alt="Client" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900">Elena R.</div>
              <div className="text-sm text-gray-600">Founder, The Modern Edit</div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CONTACT FORM */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Let’s Create Content That Sells.</h2>
            <p className="text-gray-600 text-lg">Tell us your goals — we’ll design content that moves your audience to action.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6 bg-gray-50 p-8 md:p-12 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Instagram Handle</label>
                <input 
                  type="text" 
                  value={formData.handle}
                  onChange={(e) => setFormData({...formData, handle: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Website</label>
                <input 
                  type="url" 
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
              <textarea 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-all shadow-lg"
            >
              Start My Instagram Project
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StarIcon({ i }: { i: number }) {
  if (i === 0) return <Layers className="w-6 h-6" />;
  if (i === 1) return <Share2 className="w-6 h-6" />;
  if (i === 2) return <Zap className="w-6 h-6" />;
  return <ShoppingBag className="w-6 h-6" />;
}
