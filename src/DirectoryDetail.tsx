import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { 
  Star, 
  MapPin, 
  Globe, 
  Instagram, 
  Share2, 
  Clock, 
  Award,
  CheckCircle,
  Linkedin,
  ArrowRight,
  Users,
  TrendingUp
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function DirectoryDetail() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetails: ""
  });

  const skills = [
    "Art Direction",
    "Portrait Lighting",
    "Editorial Retouching",
    "Capture One",
    "Beauty Photography",
    "Studio Lighting",
    "Creative Direction",
    "Color Grading",
    "Fashion Campaigns",
    "Commercial Photography"
  ];

  const portfolioImages = [
    {
      url: "https://images.unsplash.com/photo-1648046016726-9260b555902b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0ODc4NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Editorial Campaign"
    },
    {
      url: "https://images.unsplash.com/flagged/photo-1565241572347-2506e38cb16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwY2FtcGFpZ258ZW58MXx8fHwxNzY0ODc4NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Luxury Campaign"
    },
    {
      url: "https://images.unsplash.com/photo-1649217708362-4368faa2559b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZmFzaGlvbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDgwMDE0MXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "High Fashion Portrait"
    },
    {
      url: "https://images.unsplash.com/photo-1727791719116-39761d569f32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBmYXNoaW9uJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0ODc4NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Beauty Photography"
    },
    {
      url: "https://images.unsplash.com/photo-1717765697681-5a160db970d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R1ZGlvJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0ODQ2NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Studio Portrait"
    }
  ];

  const reviews = [
    {
      rating: 5,
      quote: "Elena's creative vision transformed our campaign into something truly exceptional. Her attention to detail and professional approach made the entire process seamless.",
      reviewer: "Sarah Mitchell",
      title: "Creative Director, Zara Studio",
      avatar: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2NDg0MDczNXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      rating: 5,
      quote: "Working with Elena was an absolute pleasure. Her editorial eye and technical expertise brought our collection to life in ways we never imagined.",
      reviewer: "Marcus Chen",
      title: "Brand Director, Balmain",
      avatar: "https://images.unsplash.com/photo-1733723501301-7fef40eefbe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0ODc4NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      rating: 5,
      quote: "Elena has an incredible ability to capture the essence of luxury. Every frame tells a story. Highly recommend for high-end editorial projects.",
      reviewer: "Isabella Laurent",
      title: "Editor-in-Chief, Vogue Spain",
      avatar: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2NDg0MDczNXww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const brands = ["Vogue", "Zara", "Balmain", "Sephora", "Burberry", "Elle"];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION - FULL WIDTH */}
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1733723501301-7fef40eefbe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0ODc4NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Elena Rodriguez"
          className="w-full h-full object-cover"
        />
      </section>

      {/* 2. PROFILE CARD + ABOUT SECTION */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN - ABOUT TEXT */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">About</h2>
                <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Elena Rodriguez is an award-winning fashion photographer based in Barcelona, specializing in editorial campaigns and high-end commercial work. With over 10 years of experience in the industry, she has collaborated with leading fashion houses and publications worldwide.
                  </p>
                  <p>
                    Her signature style combines dramatic lighting, refined composition, and an editorial sensibility that brings stories to life through imagery. Elena's work has been featured in Vogue, Elle, and Harper's Bazaar, and she has shot campaigns for brands including Balmain, Zara, and Sephora.
                  </p>
                  <p>
                    Known for her meticulous attention to detail and collaborative approach, Elena works closely with creative directors, stylists, and brands to deliver images that exceed expectations and drive results.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - PROFILE CARD */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 sticky top-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Profile Header */}
                <div className="mb-6">
                  <div className="flex items-start gap-2 mb-2">
                    <h1 className="text-3xl text-gray-900">Elena Rodriguez</h1>
                    <CheckCircle className="w-5 h-5 text-violet-600 fill-violet-600 flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-lg text-gray-600 mb-3">Photographer • Editorial & Campaign</p>
                  
                  <div className="flex flex-col gap-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Barcelona, Spain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-900">4.9</span>
                      <span className="text-gray-500">(24 reviews)</span>
                    </div>
                  </div>

                  <div className="inline-flex px-4 py-2 bg-gray-100 rounded-lg mb-6">
                    <span className="text-xl text-gray-900">$250/hr</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 mb-6">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all shadow-md">
                    Hire Me
                  </button>
                  <button className="w-full px-6 py-3 border border-gray-200 text-gray-900 rounded-xl hover:border-gray-900 transition-colors">
                    Message
                  </button>
                </div>

                {/* Social Icons */}
                <div className="flex gap-2 mb-6">
                  <button className="flex-1 p-3 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                    <Globe className="w-5 h-5 text-gray-700 mx-auto" />
                  </button>
                  <button className="flex-1 p-3 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                    <Instagram className="w-5 h-5 text-gray-700 mx-auto" />
                  </button>
                  <button className="flex-1 p-3 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                    <Linkedin className="w-5 h-5 text-gray-700 mx-auto" />
                  </button>
                  <button className="flex-1 p-3 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-700 mx-auto" />
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl text-gray-900 mb-1">10+</div>
                    <div className="text-xs text-gray-600">Years Exp.</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl text-gray-900 mb-1">45+</div>
                    <div className="text-xs text-gray-600">Projects</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-xl text-gray-900 mb-1">
                      <Clock className="w-4 h-4" />
                      <span>{"<2 hrs"}</span>
                    </div>
                    <div className="text-xs text-gray-600">Response</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl text-gray-900 mb-1">100%</div>
                    <div className="text-xs text-gray-600">Reliability</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS & TOOLS */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-8 text-gray-900">Skills & Tools</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-5 py-3 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-gray-900 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. PORTFOLIO SECTION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl mb-2 text-gray-900">Portfolio</h2>
              <p className="text-lg text-gray-600">Selected Works</p>
            </div>
            <button className="hidden md:flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-900 rounded-lg hover:border-gray-900 transition-colors">
              View Full Portfolio
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Editorial Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* One Large Image */}
            <motion.div
              className="md:col-span-6 relative group rounded-2xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-[21/9] relative">
                <ImageWithFallback
                  src={portfolioImages[0].url}
                  alt={portfolioImages[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl">{portfolioImages[0].title}</h3>
                </div>
              </div>
            </motion.div>

            {/* Two Medium Images */}
            {portfolioImages.slice(1, 3).map((item, index) => (
              <motion.div
                key={index}
                className="md:col-span-3 relative group rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-[4/3] relative">
                  <ImageWithFallback
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Two Smaller Images */}
            {portfolioImages.slice(3).map((item, index) => (
              <motion.div
                key={index}
                className="md:col-span-3 relative group rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-[4/3] relative">
                  <ImageWithFallback
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-sm">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLIENT REVIEWS SECTION */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-12 text-gray-900">Client Reviews</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{review.quote}"
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={review.avatar}
                      alt={review.reviewer}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-gray-900">{review.reviewer}</div>
                    <div className="text-sm text-gray-500">{review.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED BRANDS / SOCIAL PROOF */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <Award className="w-5 h-5 text-gray-400" />
              <p className="text-sm uppercase tracking-wider text-gray-500">Endorsed By Leading Brands</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-12">
              {brands.map((brand, index) => (
                <motion.div
                  key={index}
                  className="text-3xl text-gray-300 hover:text-gray-900 transition-colors cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {brand}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. CTA SECTION - BOOK A PROJECT */}
      <section className="py-20 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl mb-4 text-white">Ready to Work With Elena?</h2>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Get availability, request a quote, or start your next project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-violet-600 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                Hire Me
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/30 hover:bg-white/20 transition-colors">
                Message
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Column 1 - Brand */}
            <div className="md:col-span-1">
              <div className="text-2xl mb-4">FashionOS</div>
              <p className="text-white/70 text-sm">
                Connecting the fashion industry through AI-powered creativity and discovery.
              </p>
            </div>

            {/* Column 2 - Explore */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-white/50">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Directory</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Portfolio</a></li>
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-white/50">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Photography</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Video</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Web Design</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">eCommerce</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Social Media</a></li>
              </ul>
            </div>

            {/* Column 4 - For Creators */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-white/50">For Creators</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Create Account</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Add Directory</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">© 2025 FashionOS. All rights reserved.</p>
            
            <div className="flex gap-4">
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}