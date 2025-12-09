import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Footer } from "./components/Footer";
import { motion } from "motion/react";
import { ArrowRight, Play, Video, Package, FileText, Lightbulb, Users, ShoppingBag, RotateCw, MessageSquare } from "lucide-react";
import React, { useState } from "react";

export default function VideoServices() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brand: "",
    message: ""
  });

  const videoTypes = [
    {
      icon: Video,
      title: "Product Overview Video",
      description: "A clear intro showing features and value.",
      image: "https://images.unsplash.com/photo-1618139731872-ccc79e73c123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwdmlkZW8lMjBmaWxtaW5nfGVufDF8fHx8MTc2NDg4NTk5NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Package,
      title: "Unboxing Video",
      description: "Reveals packaging, scale, and first impressions.",
      image: "https://images.unsplash.com/photo-1759563876826-30481c505545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmJveGluZyUyMGx1eHVyeSUyMHByb2R1Y3R8ZW58MXx8fHwxNzY0ODg1OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: FileText,
      title: "How-To / Setup Video",
      description: "Step-by-step usage or assembly instructions.",
      image: "https://images.unsplash.com/photo-1575320854760-bfffc3550640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY0ODU1MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Lightbulb,
      title: "Explainer Video",
      description: "Highlights the problem, solution, and benefits.",
      image: "https://images.unsplash.com/photo-1660286118182-11cdf887a9ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0JTIwY29tbWVyY2lhbHxlbnwxfHx8fDE3NjQ4ODU5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Users,
      title: "Lifestyle Video",
      description: "Shows real-life usage that inspires customers.",
      image: "https://images.unsplash.com/photo-1643432398338-623fbd492894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBmYXNoaW9uJTIwc2hvb3R8ZW58MXx8fHwxNzY0ODg1OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: ShoppingBag,
      title: "Comparison Video",
      description: "Side-by-side comparison to highlight advantages.",
      image: "https://images.unsplash.com/photo-1698581075105-924b6c70b5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwc2hvd2Nhc2V8ZW58MXx8fHwxNzY0ODg1OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: MessageSquare,
      title: "Testimonial & UGC Video",
      description: "Social-proof content from customers or influencers.",
      image: "https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBzdHVkaW8lMjBsaWdodGluZ3xlbnwxfHx8fDE3NjQ4ODU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: RotateCw,
      title: "360° Product Video",
      description: "Rotational product views for Amazon/ecommerce.",
      image: "https://images.unsplash.com/photo-1754923780529-f98eb8f05df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdmlkZW9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY0ODg1OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const platforms = [
    { name: "Amazon", logo: "🛒" },
    { name: "Shopify", logo: "🛍️" },
    { name: "Instagram", logo: "📷" },
    { name: "Facebook", logo: "👥" },
    { name: "TikTok", logo: "🎵" },
    { name: "YouTube", logo: "▶️" }
  ];

  const recentWork = [
    { title: "Beauty Campaign", category: "Fashion", image: "https://images.unsplash.com/photo-1660286118182-11cdf887a9ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0JTIwY29tbWVyY2lhbHxlbnwxfHx8fDE3NjQ4ODU5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { title: "Product Launch", category: "Ecommerce", image: "https://images.unsplash.com/photo-1618139731872-ccc79e73c123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwdmlkZW8lMjBmaWxtaW5nfGVufDF8fHx8MTc2NDg4NTk5NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { title: "Lifestyle Story", category: "Brand", image: "https://images.unsplash.com/photo-1643432398338-623fbd492894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBmYXNoaW9uJTIwc2hvb3R8ZW58MXx8fHwxNzY0ODg1OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { title: "Fashion Film", category: "Editorial", image: "https://images.unsplash.com/photo-1609062757924-6c2d01b3b422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmYXNoaW9uJTIwZmlsbXxlbnwxfHx8fDE3NjQ4ODU5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { title: "Unboxing Series", category: "Product", image: "https://images.unsplash.com/photo-1759563876826-30481c505545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmJveGluZyUyMGx1eHVyeSUyMHByb2R1Y3R8ZW58MXx8fHwxNzY0ODg1OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { title: "Tutorial Video", category: "How-To", image: "https://images.unsplash.com/photo-1575320854760-bfffc3550640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY0ODU1MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { title: "Brand Story", category: "Commercial", image: "https://images.unsplash.com/photo-1754923780529-f98eb8f05df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdmlkZW9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY0ODg1OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { title: "Product 360", category: "Ecommerce", image: "https://images.unsplash.com/photo-1698581075105-924b6c70b5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwc2hvd2Nhc2V8ZW58MXx8fHwxNzY0ODg1OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080" }
  ];

  const clientLogos = ["CHANEL", "GUCCI", "PRADA", "DIOR", "VERSACE", "BURBERRY"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1640888092372-d323d3f8354a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdmlkZW8lMjBwcm9kdWN0aW9ufGVufDF8fHx8MTc2NDg4NTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Video Production"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              FashionOS Video Production.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Cinematic, conversion-driven video creative for fashion, beauty, and ecommerce brands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all shadow-lg inline-flex items-center justify-center gap-2 group">
                Book Video Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/30 hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                View Recent Work
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRO SECTION - CONCEPT TO COMPLETION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl mb-8 text-gray-900">
                Concept to Completion.
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We produce high-impact video content designed for clarity, emotion, and conversion. Our team manages 
                everything — scripting, set design, filming, editing, and delivery.
              </p>
              <button className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all inline-flex items-center gap-2">
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1691180273080-aacef51379d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwY2FtZXJhJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjQ4NjkzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Behind the scenes"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE 8 CORE VIDEO TYPES */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-4xl md:text-6xl mb-16 text-gray-900 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The 8 Core Video Types
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTypes.map((video, index) => {
              const IconComponent = video.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-stone-100 relative">
                    <ImageWithFallback
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl mb-3 text-gray-900">{video.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{video.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CHANNELS WE SUPPORT */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
              Optimized for Every Platform.
            </h2>
            <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
              Our videos are crafted to perform across major ecommerce, retail, and social platforms.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {platforms.map((platform, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center gap-3 group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-5xl group-hover:scale-110 transition-transform">
                    {platform.logo}
                  </div>
                  <span className="text-sm text-gray-700">{platform.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. BEHIND-THE-SCENES */}
      <section className="relative py-32 md:py-40 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1574867022210-bd9ecc413bf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWhpbmQlMjBzY2VuZXMlMjBmaWxtJTIwc2V0fGVufDF8fHx8MTc2NDg4NTk5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Behind the scenes"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl text-white mb-6">
              Behind the Scenes.
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              A look into our production craft — lighting, motion, styling, and story.
            </p>
            <button className="px-10 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all inline-flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch BTS Reel
            </button>
          </motion.div>
        </div>
      </section>

      {/* 6. RECENT WORK - VIDEO GALLERY */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-4xl md:text-6xl mb-16 text-gray-900 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Recent Work
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentWork.map((work, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 mb-4 relative">
                  <ImageWithFallback
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs rounded-full">
                      {work.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg text-gray-900">{work.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLIENT LOGOS STRIP */}
      <section className="py-16 bg-stone-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="text-2xl tracking-widest text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIAL SECTION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="text-3xl md:text-4xl text-gray-900 mb-8 leading-relaxed italic">
              "The videos exceeded our expectations — stunning craftsmanship and flawless execution."
            </blockquote>
            <p className="text-lg text-gray-600">
              — Creative Director, Luxury Fashion Brand
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. CONTACT / INQUIRY SECTION */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl mb-12 text-gray-900 text-center">
              Start Your Video Project.
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors bg-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors resize-none bg-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg"
              >
                Start a Custom Video Brief
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <Footer />
    </div>
  );
}
