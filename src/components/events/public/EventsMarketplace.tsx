import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Plus,
  Play,
  Sparkles,
  Instagram,
  Linkedin,
  Music,
  Users,
  Camera,
  Palette,
  Award,
  CreditCard,
  Map,
  Train,
  HelpCircle,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function EventsMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Trending");

  // Navigation helper
  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const quickFilters = ["Trending", "Free", "Workshop", "Exhibition", "AI-Powered"];

  const events = [
    {
      id: "event-001", 
      title: "Sustainable Fashion Trunk Show",
      date: "Dec 15, 2025",
      location: "New York, NY",
      category: "Pop-up",
      tags: ["Sustainable", "Pop-up"],
      image: "https://images.unsplash.com/photo-1565206776249-a01813727c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd29ya3Nob3B8ZW58MXx8fHwxNzY0Nzg0Nzc3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "event-002",
      title: "Emerging Designers Showcase",
      date: "Dec 18, 2025",
      location: "London, UK",
      category: "Runway",
      tags: ["Runway", "Emerging"],
      image: "https://images.unsplash.com/photo-1762430815620-fcca603c240c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcnVud2F5JTIwc2hvd3xlbnwxfHx8fDE3NjQ4Nzg3MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "event-003",
      title: "Street Style Meet & Greet",
      date: "Dec 20, 2025",
      location: "Tokyo, JP",
      category: "Meetup",
      tags: ["Street Style", "Meetup"],
      image: "https://images.unsplash.com/photo-1676808325981-3aa9a37347c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RyZWV0JTIwc3R5bGV8ZW58MXx8fHwxNzY0NzUyNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "event-004",
      title: "Fashion Photography Masterclass",
      date: "Dec 22, 2025",
      location: "Paris, FR",
      category: "Workshop",
      tags: ["Workshop", "Photography"],
      image: "https://images.unsplash.com/photo-1719613959577-434f93b266d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrc3RhZ2UlMjBmYXNoaW9ufGVufDF8fHx8MTc2NDg3ODczN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "event-005",
      title: "Vintage Fashion Fair",
      date: "Dec 25, 2025",
      location: "Milan, IT",
      category: "Exhibition",
      tags: ["Exhibition", "Vintage"],
      image: "https://images.unsplash.com/photo-1562347174-7370ad83dc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NjQ4MTc2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "event-006",
      title: "Fashion Tech Conference",
      date: "Dec 28, 2025",
      location: "San Francisco, CA",
      category: "Conference",
      tags: ["AI-Powered", "Tech"],
      image: "https://images.unsplash.com/photo-1762430790694-aedd36b4cb8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaW5kdXN0cnklMjBldmVudHxlbnwxfHx8fDE3NjQ4Nzg3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "event-007",
      title: "New Year Fashion Gala",
      date: "Dec 31, 2025",
      location: "Dubai, UAE",
      category: "Gala",
      tags: ["Gala", "Premium"],
      image: "https://images.unsplash.com/photo-1761574028992-1a72e1867b3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZ2FsYSUyMGV2ZW50fGVufDF8fHx8MTc2NDg3ODczOHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "event-008",
      title: "Luxury Pop-up Experience",
      date: "Jan 3, 2026",
      location: "Los Angeles, CA",
      category: "Pop-up",
      tags: ["Pop-up", "Luxury"],
      image: "https://images.unsplash.com/photo-1575111507952-2d4f371374f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9wdXAlMjBldmVudHxlbnwxfHx8fDE3NjQ4Nzg3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "event-009",
      title: "Fashion Week Opening Show",
      date: "Jan 5, 2026",
      location: "Barcelona, ES",
      category: "Runway",
      tags: ["Runway", "Fashion Week"],
      image: "https://images.unsplash.com/photo-1762430815537-e140755eedf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd2VlayUyMGV2ZW50fGVufDF8fHx8MTc2NDg3ODczNnww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const categories = [
    { name: "Runway Shows", icon: Users, count: 24, color: "bg-violet-100 text-violet-600" },
    { name: "Workshops", icon: Camera, count: 18, color: "bg-rose-100 text-rose-600" },
    { name: "Pop-up Events", icon: Award, count: 12, color: "bg-amber-100 text-amber-600" },
    { name: "Exhibitions", icon: Palette, count: 15, color: "bg-blue-100 text-blue-600" },
    { name: "Meetups", icon: Music, count: 9, color: "bg-green-100 text-green-600" }
  ];

  const planCards = [
    {
      icon: CreditCard,
      title: "Tickets & Pricing",
      description: "Easy booking and flexible payment options for all events."
    },
    {
      icon: Map,
      title: "Venue Maps",
      description: "Interactive maps and directions to all event locations."
    },
    {
      icon: Train,
      title: "Transport",
      description: "Public transport routes and parking information."
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Answers to your most common questions."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-violet-50 py-16 md:py-24">
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
                Discover Fashion Events <span className="text-violet-400">Near You</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                A curated collection of shows, exhibitions, workshops, and industry meetups.
              </motion.p>

              {/* Search Bar */}
              <motion.div 
                className="relative flex gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Try: sustainable events, runway shows…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                  />
                </div>
                <button className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
                  Search
                </button>
              </motion.div>

              {/* Quick Filters */}
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {quickFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedFilter === filter
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
                <button className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-gray-900 transition-colors flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  <span>Add Filter</span>
                </button>
              </motion.div>
            </div>

            {/* Right Column - Event Collage */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-200/30 to-transparent z-10" />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1762430815620-fcca603c240c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcnVud2F5JTIwc2hvd3xlbnwxfHx8fDE3NjQ4Nzg3MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Fashion event"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-200/30 to-transparent z-10" />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1562347174-7370ad83dc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NjQ4MTc2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Fashion exhibition"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-200/30 to-transparent z-10" />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1676808325981-3aa9a37347c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RyZWV0JTIwc3R5bGV8ZW58MXx8fHwxNzY0NzUyNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Street style"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED EVENT OF THE WEEK */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="relative rounded-3xl overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
          >
            <div className="aspect-[21/9] md:aspect-[21/7] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1762430815537-e140755eedf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd2VlayUyMGV2ZW50fGVufDF8fHx8MTc2NDg3ODczNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Milan Fashion Week"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute top-6 left-6 z-20">
                <div className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full text-sm">
                  Featured This Week
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-auto md:max-w-2xl z-20">
                <h2 className="text-3xl md:text-5xl text-white mb-4">
                  Milan Fashion Week: Spring/Summer Finale
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Experience the most anticipated runway show of the season featuring emerging designers and iconic fashion houses.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mb-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>March 15-20, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Milan, Italy</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                    Runway
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                    Fashion Week
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                    Premium
                  </span>
                </div>

                <button className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                  Get Tickets
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. EVENT CARDS GRID */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/marketplace/${event.id}`)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-900">
                    {event.category}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl text-gray-900 mb-3">{event.title}</h3>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      navigate(`/marketplace/${event.id}`);
                    }}
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <button className="px-8 py-4 border border-gray-200 text-gray-900 rounded-xl hover:border-gray-900 transition-colors inline-flex items-center gap-2">
              Load More Events
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. BROWSE BY CATEGORY */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mb-4 text-gray-900">Browse by Category</h2>
            <p className="text-lg text-gray-600">Find events tailored to your interests</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={index}
                  className="p-6 bg-white rounded-2xl hover:shadow-md transition-all group text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.count} Events</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PLAN YOUR VISIT */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mb-4 text-gray-900">Plan Your Visit</h2>
            <p className="text-lg text-gray-600">Everything you need for an effortless fashion experience.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {planCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={index}
                  className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. DISCOVER MORE EVENTS SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762430815620-fcca603c240c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcnVud2F5JTIwc2hvd3xlbnwxfHx8fDE3NjQ4Nzg3MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Fashion events background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl mb-6">
              See What's Happening in Fashion.
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              From runway shows to creative workshops — explore the best fashion events curated just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
                Browse Events
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  navigate("/events/create");
                }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/30 hover:bg-white/20 transition-colors"
              >
                Create Event
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
