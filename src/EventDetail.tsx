import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { 
  Calendar, 
  MapPin, 
  Users, 
  ShoppingBag,
  Clock,
  Download,
  Sparkles,
  Navigation,
  Info,
  HelpCircle,
  Star,
  Check,
  Instagram,
  Linkedin,
  Music,
  ArrowRight,
  Building2,
  Accessibility,
  Car,
  Ticket
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function EventDetail() {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const scheduleItems = [
    { time: "12:00", title: "Doors Open", description: "Registration and welcome drinks" },
    { time: "12:30", title: "Pre-Show Experience", description: "Exclusive designer showcase" },
    { time: "13:00", title: "Runway Show", description: "Spring/Summer collection reveal" },
    { time: "14:00", title: "Interviews / Backstage", description: "Meet the designers" },
    { time: "15:00", title: "Networking", description: "Industry connections and cocktails" }
  ];

  const ticketOptions = [
    {
      name: "General Admission",
      price: "$150",
      benefits: ["Event access", "Welcome drink", "Show seating", "Event booklet"],
      popular: false
    },
    {
      name: "VIP Experience",
      price: "$450",
      benefits: ["Priority seating", "Backstage access", "Meet & greet", "Gift bag", "Premium bar"],
      popular: true
    },
    {
      name: "Backstage Pass",
      price: "$850",
      benefits: ["Front row seating", "Full backstage access", "Private reception", "Photography rights", "Exclusive merchandise"],
      popular: false
    }
  ];

  const designers = [
    {
      name: "Isabella Laurent",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1674729446905-1cfcd533d90e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ4Nzc4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Marcus Chen",
      role: "Fashion Designer",
      image: "https://images.unsplash.com/photo-1758613655006-f11ab25018e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaGVyJTIwd29ya2luZ3xlbnwxfHx8fDE3NjQ4Nzk0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Sofia Rodriguez",
      role: "Lead Model",
      image: "https://images.unsplash.com/photo-1583981399285-7e22c78c9b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBydW53YXl8ZW58MXx8fHwxNzY0ODU5ODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const relatedEvents = [
    {
      title: "Paris Fashion Week: Haute Couture",
      date: "March 25, 2026",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwc2hvd3xlbnwxfHx8fDE3NjQ3ODkwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "New York Fashion Summit",
      date: "April 5, 2026",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1719613959577-434f93b266d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvdyUyMGJhY2tzdGFnZXxlbnwxfHx8fDE3NjQ4Nzk0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "London Design Festival",
      date: "April 12, 2026",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1717944097660-352ec0dc5c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZXZlbnQlMjBjcm93ZHxlbnwxfHx8fDE3NjQ4Nzk0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const infoCards = [
    {
      icon: Ticket,
      title: "Tickets & Entry",
      description: "Digital tickets sent via email. Arrive 30 minutes early."
    },
    {
      icon: Navigation,
      title: "Arrival & Transport",
      description: "Subway: Line 1, 2. Parking available. Valet service offered."
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Check our help center for common questions and policies."
    },
    {
      icon: Info,
      title: "What to Expect",
      description: "2-hour show with intermission. Cocktails and networking follow."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1741174174732-8f5dc8bd047b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxhbiUyMGZhc2hpb24lMjB3ZWVrJTIwcnVud2F5fGVufDF8fHx8MTc2NDg3OTQ1OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Milan Fashion Week"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16 w-full">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                      Runway
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                      Fashion Week
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full text-sm">
                      VIP
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-4">
                    Milan Fashion Week: Spring/Summer Finale
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>March 15-20, 2026 • 13:00 CET</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>Piazza del Duomo, Milan</span>
                    </div>
                  </div>

                  <p className="text-lg text-white/90 mb-8 max-w-2xl">
                    Experience the pinnacle of Italian fashion as renowned designers unveil their Spring/Summer collections on the world's most prestigious runway.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                      Get Tickets
                    </button>
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/30 hover:bg-white/20 transition-colors">
                      Add to Calendar
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Thumbnail Gallery */}
              <motion.div
                className="hidden lg:flex flex-col gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="aspect-video rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1719613959577-434f93b266d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvdyUyMGJhY2tzdGFnZXxlbnwxfHx8fDE3NjQ4Nzk0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Backstage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1626379461362-ad730c620569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdmVudWUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ4Nzk0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Venue"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. TWO-COLUMN LAYOUT: ABOUT + EVENT DETAILS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* LEFT COLUMN - ABOUT THE EVENT */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl mb-8 text-gray-900">About the Event</h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Milan Fashion Week Spring/Summer Finale represents the culmination of Italy's most celebrated fashion event, showcasing groundbreaking collections from both established luxury houses and emerging avant-garde designers.
                  </p>
                  <p>
                    This year's lineup features exclusive presentations from Prada, Versace, Dolce & Gabbana, and a curated selection of innovative new designers reshaping the future of Italian fashion. Attendees will witness the unveiling of next season's trends across ready-to-wear, accessories, and haute couture.
                  </p>
                  <p>
                    Beyond the runway, the event offers unprecedented access to the creative minds behind the collections through intimate designer talks, backstage tours, and exclusive networking opportunities with fashion's most influential figures.
                  </p>
                </div>
                <div className="mt-8 h-1 w-24 bg-gradient-to-r from-violet-400 to-purple-600 rounded-full" />
              </motion.div>
            </div>

            {/* RIGHT COLUMN - EVENT DETAILS + CTA BUTTON */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Get Tickets Button */}
                <button className="w-full px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg">
                  Get Tickets
                </button>

                {/* Event Detail Cards */}
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <Calendar className="w-8 h-8 text-violet-600 mb-3" />
                  <h3 className="text-sm text-gray-500 mb-1">Date & Time</h3>
                  <p className="text-lg text-gray-900">March 15, 2026</p>
                  <p className="text-sm text-gray-600">13:00 - 15:00 CET</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl">
                  <Building2 className="w-8 h-8 text-violet-600 mb-3" />
                  <h3 className="text-sm text-gray-500 mb-1">Venue</h3>
                  <p className="text-lg text-gray-900">Duomo Plaza</p>
                  <p className="text-sm text-gray-600">Milan, Italy</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl">
                  <Users className="w-8 h-8 text-violet-600 mb-3" />
                  <h3 className="text-sm text-gray-500 mb-1">Expected Attendance</h3>
                  <p className="text-lg text-gray-900">1,200+ Guests</p>
                  <p className="text-sm text-gray-600">Industry Insiders</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl">
                  <ShoppingBag className="w-8 h-8 text-violet-600 mb-3" />
                  <h3 className="text-sm text-gray-500 mb-1">Dress Code</h3>
                  <p className="text-lg text-gray-900">Fashion Forward</p>
                  <p className="text-sm text-gray-600">Creative Attire</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EVENT HIGHLIGHTS GALLERY */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl mb-12 text-gray-900">Event Highlights</h2>

          <div className="grid md:grid-cols-6 gap-6">
            {/* Large hero image */}
            <motion.div
              className="md:col-span-6 relative rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-[21/9] relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwc2hvd3xlbnwxfHx8fDE3NjQ3ODkwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Fashion show highlight"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Two medium images */}
            <motion.div
              className="md:col-span-3 relative rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1583981399285-7e22c78c9b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBydW53YXl8ZW58MXx8fHwxNzY0ODU5ODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Runway model"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-3 relative rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1717944097660-352ec0dc5c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZXZlbnQlMjBjcm93ZHxlbnwxfHx8fDE3NjQ4Nzk0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Event crowd"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Three smaller images */}
            <motion.div
              className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-square relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1719613959577-434f93b266d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvdyUyMGJhY2tzdGFnZXxlbnwxfHx8fDE3NjQ4Nzk0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Backstage"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-square relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1626379461362-ad730c620569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdmVudWUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ4Nzk0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Venue interior"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-square relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758613655006-f11ab25018e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaGVyJTIwd29ya2luZ3xlbnwxfHx8fDE3NjQ4Nzk0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Photography"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. AI EVENT ASSISTANT */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-violet-400" />
                  <span className="text-sm uppercase tracking-wider text-violet-400">Gemini Powered</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl mb-6">AI Event Intelligence</h2>
                
                <p className="text-lg text-white/80 mb-8">
                  Get real-time insights and recommendations powered by advanced AI to optimize your event experience.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm text-white mb-1">Attendance Prediction</h4>
                      <p className="text-xs text-white/70">Expected 95% capacity • 1,140 confirmed guests</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm text-white mb-1">Suggested Arrival</h4>
                      <p className="text-xs text-white/70">12:15 PM for optimal seating and check-in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm text-white mb-1">Crowd Flow</h4>
                      <p className="text-xs text-white/70">Peak entry: 12:30-12:45 • Plan accordingly</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm text-white mb-1">Weather Impact</h4>
                      <p className="text-xs text-white/70">Sunny, 22°C • Perfect outdoor experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. SCHEDULE & TIMELINE */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl mb-2 text-gray-900">Event Schedule</h2>
              <p className="text-lg text-gray-600">Full day itinerary</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-900 rounded-lg hover:border-gray-900 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>

          <div className="space-y-6">
            {scheduleItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-6 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  {index < scheduleItems.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-2" />
                  )}
                </div>

                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {item.time}
                    </span>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TICKET OPTIONS */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-violet-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mb-4 text-gray-900">Ticket Options</h2>
            <p className="text-lg text-gray-600">Choose the perfect experience for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ticketOptions.map((ticket, index) => (
              <motion.div
                key={index}
                className={`relative p-8 bg-white rounded-2xl transition-all cursor-pointer ${
                  ticket.popular 
                    ? 'ring-2 ring-violet-600 shadow-lg' 
                    : 'hover:shadow-lg'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedTicket(index)}
              >
                {ticket.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl text-gray-900 mb-2">{ticket.name}</h3>
                <div className="text-4xl text-gray-900 mb-6">{ticket.price}</div>

                <ul className="space-y-3 mb-8">
                  {ticket.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-violet-600 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full px-6 py-3 rounded-xl transition-colors ${
                  ticket.popular
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  Get Tickets
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FEATURED DESIGNERS / GUESTS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mb-4 text-gray-900">Featured Designers</h2>
            <p className="text-lg text-gray-600">Meet the creative minds behind the collections</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {designers.map((designer, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                  <ImageWithFallback
                    src={designer.image}
                    alt={designer.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl text-gray-900 mb-1">{designer.name}</h3>
                <p className="text-gray-600 mb-3">{designer.role}</p>
                <button className="text-violet-600 hover:text-violet-700 transition-colors inline-flex items-center gap-1">
                  View Profile
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. VENUE DETAILS */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl mb-12 text-gray-900">Venue Details</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-700">Piazza del Duomo, 20122 Milano MI, Italy</p>
                </div>

                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Transportation</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Navigation className="w-4 h-4" />
                      <span>Metro: M1, M3 - Duomo Station</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Car className="w-4 h-4" />
                      <span>Parking: Autorimessa Diurna, 2 min walk</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Accessibility</h3>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Accessibility className="w-4 h-4" />
                    <span>Wheelchair accessible • Elevators available</span>
                  </div>
                </div>

                <button className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
                  View on Map
                </button>
              </div>
            </motion.div>

            {/* Right - Venue Photos */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="col-span-2 aspect-video rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1626379461362-ad730c620569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdmVudWUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ4Nzk0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Venue interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwc2hvd3xlbnwxfHx8fDE3NjQ3ODkwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Venue seating"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1717944097660-352ec0dc5c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZXZlbnQlMjBjcm93ZHxlbnwxfHx8fDE3NjQ4Nzk0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Venue crowd"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. BEFORE YOU GO */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mb-4 text-gray-900">Before You Go</h2>
            <p className="text-lg text-gray-600">Everything you need to know for a seamless experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoCards.map((card, index) => {
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

      {/* 11. RELATED EVENTS */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl mb-2 text-gray-900">Related Events</h2>
              <p className="text-lg text-gray-600">You might also like</p>
            </div>
            <button className="hidden md:flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-900 rounded-lg hover:border-gray-900 transition-colors">
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedEvents.map((event, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl text-gray-900 mb-3">{event.title}</h3>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    View Event
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA BANNER */}
      <section className="py-24 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl text-white mb-4">Don't Miss the Show.</h2>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Join thousands of fashion insiders attending top global events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-violet-600 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                Get Tickets
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/30 hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <Star className="w-5 h-5" />
                Follow Event
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Column 1 - Brand */}
            <div className="md:col-span-1">
              <div className="text-2xl mb-4">FashionOS</div>
              <p className="text-white/70 text-sm">
                Connecting the fashion world through AI-powered creativity.
              </p>
            </div>

            {/* Column 2 - Explore */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-white/50">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Home</a></li>
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
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Retouching</a></li>
              </ul>
            </div>

            {/* Column 4 - For Creators */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-white/50">For Creators</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Create Account</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Add Event</a></li>
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
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}