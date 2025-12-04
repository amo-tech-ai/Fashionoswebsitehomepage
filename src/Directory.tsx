import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Search, Star, MapPin, Sparkles, Instagram, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Directory() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = [
    "All",
    "Designers",
    "Photographers",
    "Stylists",
    "Models",
    "Venues",
    "eCom",
    "Beauty",
    "Lifestyle",
    "Creative Directors"
  ];

  const featuredCreatives = [
    {
      name: "Ava Rodriguez",
      role: "Fashion Photographer",
      rating: 4.9,
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1610879328923-3de1e04c3ddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ4NjA0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Marcus Chen",
      role: "Fashion Designer",
      rating: 5.0,
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1624819951949-8a9e908bd151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcGhvdG9ncmFwaGVyfGVufDF8fHx8MTc2NDg3Nzg2OXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Isabella Laurent",
      role: "Creative Director",
      rating: 4.8,
      location: "Paris, FR",
      image: "https://images.unsplash.com/photo-1674729446905-1cfcd533d90e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ4Nzc4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const creators = [
    {
      name: "Sofia Martinez",
      role: "Model",
      tags: ["Editorial", "Runway", "Commercial"],
      rating: 4.9,
      location: "Milan, IT",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R5bGlzdHxlbnwxfHx8fDE3NjQ4Nzc4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "David Park",
      role: "Photographer",
      tags: ["Beauty", "Editorial", "Fashion"],
      rating: 4.8,
      location: "Seoul, KR",
      image: "https://images.unsplash.com/photo-1588992970837-27e122b58cef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY3JlYXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ4Nzc4NzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Elena Volkov",
      role: "Stylist",
      tags: ["Luxury", "Editorial", "Runway"],
      rating: 5.0,
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1706824265660-5ca5effaf122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtb2RlbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NDg3Nzg3MXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "James Wilson",
      role: "Fashion Designer",
      tags: ["Streetwear", "Sustainable", "Avant-garde"],
      rating: 4.7,
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1649660289179-54539943a58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NDg3Nzg3Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Amara Johnson",
      role: "Model",
      tags: ["Runway", "High Fashion", "Editorial"],
      rating: 4.9,
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1610879328923-3de1e04c3ddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ4NjA0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Luca Romano",
      role: "Photographer",
      tags: ["Commercial", "eCom", "Product"],
      rating: 4.6,
      location: "Milan, IT",
      image: "https://images.unsplash.com/photo-1624819951949-8a9e908bd151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcGhvdG9ncmFwaGVyfGVufDF8fHx8MTc2NDg3Nzg2OXww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const venues = [
    {
      name: "Studio 54 NYC",
      location: "New York, NY",
      capacity: "50 people",
      tags: ["Industrial", "Natural Light", "White Cyc"],
      image: "https://images.unsplash.com/photo-1620942617746-7784b7a1526f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMHdoaXRlfGVufDF8fHx8MTc2NDc4NzcxMnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "The Loft Creative Space",
      location: "Los Angeles, CA",
      capacity: "30 people",
      tags: ["Modern", "Rooftop", "City Views"],
      image: "https://images.unsplash.com/photo-1758627506826-0658170e5cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMHNwYWNlfGVufDF8fHx8MTc2NDg0MjA1NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Minimal Studio Berlin",
      location: "Berlin, DE",
      capacity: "40 people",
      tags: ["Minimalist", "Concrete", "High Ceilings"],
      image: "https://images.unsplash.com/photo-1706895040634-62055892cbbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY0ODc3ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-rose-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text & Search */}
            <div>
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Discover the People <span className="text-rose-400">Behind</span> the Style.
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Explore designers, photographers, models, stylists, brands, and venues — all in one place.
              </motion.p>

              {/* Search Bar */}
              <motion.div 
                className="relative flex gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, city, role, category…"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                  />
                </div>
                <button className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
                  Search
                </button>
              </motion.div>

              {/* Popular Tags */}
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-sm text-gray-500 mb-2">Popular:</p>
                <div className="flex flex-wrap gap-2">
                  {["Photography", "Designers", "Models", "Brands", "Venues"].map((tag) => (
                    <button
                      key={tag}
                      className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-700 hover:border-gray-900 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Image Collage */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-200/30 to-transparent z-10" />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1610879328923-3de1e04c3ddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ4NjA0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Fashion creative"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-200/30 to-transparent z-10" />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1624819951949-8a9e908bd151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcGhvdG9ncmFwaGVyfGVufDF8fHx8MTc2NDg3Nzg2OXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Fashion photographer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-200/30 to-transparent z-10" />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1674729446905-1cfcd533d90e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ4Nzc4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Fashion designer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CREATIVES SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mb-4 text-gray-900">Featured Creatives</h2>
            <p className="text-lg text-gray-600">A curated selection of standout talent.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredCreatives.map((creative, index) => (
              <motion.div
                key={index}
                className="relative group rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-[3/4] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <ImageWithFallback
                    src={creative.image}
                    alt={creative.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-sm">{creative.rating}</span>
                    </div>
                    <h3 className="text-xl text-white mb-1">{creative.name}</h3>
                    <p className="text-white/80 text-sm mb-3">{creative.role}</p>
                    <div className="flex items-center gap-1 text-white/70 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{creative.location}</span>
                    </div>
                    
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="flex-1 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                        Hire
                      </button>
                      <button className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg text-sm border border-white/20 hover:bg-white/20 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FASHION DIRECTORY FILTERS + TALENT SEARCH AI */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[300px,1fr] gap-8">
            {/* Left Panel - AI Search + Filters */}
            <div className="space-y-6">
              {/* Talent Search AI */}
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-6 text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-lg">Talent Scout AI</h3>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  Find the right creative instantly
                </p>
                <p className="text-white/80 text-sm mb-4">
                  Ask AI to recommend creators based on your brief.
                </p>
                <input
                  type="text"
                  placeholder="I need a photographer in NYC with a bold editorial style."
                  className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 text-sm mb-4 focus:outline-none focus:border-white/50"
                />
                <button className="w-full px-4 py-3 bg-white text-violet-600 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                  Find Creatives
                </button>
              </motion.div>

              {/* Filter Tags */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4">Filter by Role</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedFilter === filter
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Panel - Creator Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creators.map((creator, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <ImageWithFallback
                      src={creator.image}
                      alt={creator.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-900">{creator.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg text-gray-900 mb-1">{creator.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{creator.role}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {creator.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                      <MapPin className="w-3 h-3" />
                      <span>{creator.location}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                        Hire
                      </button>
                      <button className="flex-1 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:border-gray-900 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. VENUE CARDS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl mb-4 text-gray-900">Featured Venues</h2>
            <p className="text-lg text-gray-600">Premium spaces for your creative projects.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl text-gray-900 mb-2">{venue.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{venue.location} • {venue.capacity}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full px-4 py-2 border border-gray-200 text-gray-900 rounded-lg text-sm hover:border-gray-900 hover:bg-gray-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS - 3-STEP FLOW */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl mb-4">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-3">Search</h3>
              <p className="text-white/70">
                Browse thousands of verified fashion professionals by specialty, location, and role.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3">Connect</h3>
              <p className="text-white/70">
                Send messages, request quotes, and view detailed portfolios directly on the platform.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl mb-3">Collaborate</h3>
              <p className="text-white/70">
                Book contracts, manage deliveries, and produce amazing creative work seamlessly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. WHY JOIN FASHIONOS SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl mb-8 text-gray-900">Why Join FashionOS?</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-gray-900">Global Visibility</h3>
                    <p className="text-gray-600">Get discovered by top brands and agencies.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-gray-900">Portfolio Tools</h3>
                    <p className="text-gray-600">Showcase your best work in a premium layout.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-gray-900">Exclusive Events</h3>
                    <p className="text-gray-600">Gain access to fashion weeks + networking opportunities.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image + Testimonial */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R5bGlzdHxlbnwxfHx8fDE3NjQ4Nzc4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Fashion creative"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Testimonial Card */}
              <div className="absolute -bottom-6 -left-6 right-6 bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1674729446905-1cfcd533d90e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ4Nzc4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Testimonial"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      "FashionOS connected me with amazing brands I never thought I'd work with. Game changer!"
                    </p>
                    <p className="text-xs text-gray-500">— Sofia Martinez, Model</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CTA GRADIENT BANNER */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl mb-4 text-white">Become Part of the Network.</h2>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Join a curated platform where fashion meets opportunity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-violet-600 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                Join Directory
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/30 hover:bg-white/20 transition-colors">
                Explore Creators
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
                Connecting the fashion industry through AI-powered creativity and storytelling.
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
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-white/50">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Photography</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Video Production</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Web Design</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">eCommerce</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Social Media Marketing</a></li>
              </ul>
            </div>

            {/* Column 4 - For Creators */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-white/50">For Creators</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Create Account</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Add to Directory</a></li>
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
