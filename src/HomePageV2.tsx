import { motion } from "motion/react";
import { Camera, Palette, Video, Sparkles, TrendingUp, Award, Play, ArrowRight, ChevronRight } from "lucide-react";

export default function HomePageV2() {
  // Import the Figma asset image
  const figmaImage = "figma:asset/f1f08475e65c0b8f3c78cd4eb727689fe7e240c4.png";

  return (
    <div className="bg-white">
      {/* Header/Navigation */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl tracking-tight">FashionOS</div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Services</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Directory</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Marketplace</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
            <button className="px-6 py-2.5 bg-black text-white rounded-lg text-sm hover:bg-gray-900 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1 - HERO / INTRO */}
      <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Block - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl leading-tight">
                Exceptional fashion creativity, brought to life.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Modern imagery, storytelling, and production — designed for designers, creators, and brands who want work that stands out.
              </p>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                <span>Campaign & editorial production</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                <span>Runway & event coverage</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                <span>Ecommerce & social content</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2">
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 border border-gray-300 rounded-xl hover:border-gray-900 transition-all duration-300">
                Browse Directory
              </button>
            </div>
          </motion.div>

          {/* Right Block - Image Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Large Image (top left, spans 2 rows) */}
            <div className="row-span-2 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1706099347777-002ab5e8190c?w=800&q=80"
                alt="Editorial fashion portrait"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top right image */}
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1764158302194-54b208aa7f2b?w=800&q=80"
                alt="Fashion runway"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom right image */}
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1614019781947-9d09ffb740d7?w=800&q=80"
                alt="Minimalist fashion"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - LATEST CAMPAIGNS */}
      <section className="bg-[#FAFAF9] py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl mb-2">Latest Campaigns</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Summer Editorial 24", label: "Campaign", image: "https://images.unsplash.com/photo-1630948688037-aa88dc433a57?w=800&q=80" },
              { title: "Milan Fashion Week", label: "Runway Coverage", image: "https://images.unsplash.com/photo-1676971751942-ce73a01d613d?w=800&q=80" },
              { title: "Urban Noir", label: "Editorial Series", image: "https://images.unsplash.com/photo-1652335543434-69331d29a41b?w=800&q=80" }
            ].map((campaign, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 mb-4 aspect-[4/3]">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-2">
                  <p className="text-xs text-gray-500 mb-1">{campaign.label}</p>
                  <h3 className="text-xl">{campaign.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - ABOUT SECTION */}
      <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Large Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4]"
          >
            <img
              src="https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?w=1200&q=80"
              alt="Fashion studio production"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Text Block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 lg:pt-12"
          >
            <h2 className="text-4xl lg:text-5xl leading-tight">About Us</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We help fashion creators, designers, and brands bring powerful visual stories to life. From campaigns and editorials to runway and ecommerce, we combine creativity and production expertise to deliver exceptional results — every time.
            </p>
          </motion.div>
        </div>

        {/* 3 Mini Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Palette,
              title: "Creative Direction",
              description: "Premium art direction for campaigns, editorials, and brand storytelling."
            },
            {
              icon: Camera,
              title: "Runway & Event Support",
              description: "Production tools for shows, fittings, schedules, and backstage flow."
            },
            {
              icon: Sparkles,
              title: "Visual Content Production",
              description: "Photography and video crafted for luxury, streetwear, and ecommerce."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-xl mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4 - PHOTOGRAPHY / CONTENT HIGHLIGHT (Dark Section) */}
      <section className="bg-[#1A1A1A] text-white py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl leading-tight">
                Ecommerce & Editorial Photography
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                High-quality imagery for product pages, campaigns, and lookbooks — optimized for fast delivery and brand consistency.
              </p>

              <ul className="space-y-4">
                {[
                  "Editorial and campaign photography",
                  "Ecommerce product sets",
                  "Backstage & runway coverage",
                  "Social-ready assets"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <button className="px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Right - 3 Image Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                "https://images.unsplash.com/photo-1680503504076-e5c61901c36d?w=600&q=80",
                "https://images.unsplash.com/photo-1671696564980-02ac81b3f629?w=600&q=80",
                "https://images.unsplash.com/photo-1758887953059-ca6f8e454207?w=600&q=80"
              ].map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden bg-gray-800 aspect-square">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - TESTIMONIAL */}
      <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-2xl lg:text-3xl leading-relaxed">
            "FashionOS Studio consistently delivers imagery that elevates every campaign. Their creative quality and reliability are unmatched."
          </blockquote>
          <div className="text-gray-600">
            <p className="font-medium text-gray-900">Creative Director, Veloire Studio</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 6 - CREATIVE SERVICES */}
      <section className="bg-[#FAFAF9] py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl">Creative Services</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Palette, title: "Campaigns", description: "Full production for brand storytelling" },
              { icon: Camera, title: "Runway", description: "Show coverage, backstage, fittings" },
              { icon: Award, title: "Ecommerce", description: "Product photography & video" },
              { icon: Video, title: "Video & Social", description: "Fashion films & social-first edits" }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - FASHION DIRECTORY */}
      <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl mb-3">Fashion Directory</h2>
              <p className="text-gray-600 max-w-2xl">
                Discover designers, models, photographers, stylists, and creative talent.
              </p>
            </div>
            <button className="px-6 py-3 border border-gray-300 rounded-xl hover:border-gray-900 transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap">
              View All Profiles
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Elena Rousseau", role: "Model", rating: 4.9, image: "https://images.unsplash.com/photo-1706099347777-002ab5e8190c?w=600&q=80" },
            { name: "Marcus Chen", role: "Photographer", rating: 5.0, image: "https://images.unsplash.com/photo-1652335543434-69331d29a41b?w=600&q=80" },
            { name: "Isabella Durant", role: "Designer", rating: 4.8, image: "https://images.unsplash.com/photo-1674729446905-1cfcd533d90e?w=600&q=80" },
            { name: "Julien Baptiste", role: "Stylist", rating: 4.9, image: "https://images.unsplash.com/photo-1676971751942-ce73a01d613d?w=600&q=80" }
          ].map((profile, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg mb-1">{profile.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{profile.role}</p>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">{profile.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 8 - FASHION MARKETPLACE */}
      <section className="bg-[#FAFAF9] py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl">Fashion Marketplace</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Studio Rentals", image: "https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?w=800&q=80" },
              { title: "Campaign Locations", image: "https://images.unsplash.com/photo-1618236444721-4a8dba415c15?w=800&q=80" },
              { title: "Creative Equipment", image: "https://images.unsplash.com/photo-1606316311441-236104803dad?w=800&q=80" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl text-white mb-2">{item.title}</h3>
                    <button className="text-white flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 - BEHIND THE SCENES (Video Preview) */}
      <section className="bg-[#1A1A1A] text-white py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <h2 className="text-4xl lg:text-5xl">Behind the scenes.</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A look into our process — from concept to runway-ready production.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden aspect-video bg-gray-800 group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80"
              alt="Behind the scenes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-8 left-8">
              <button className="px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors duration-300 inline-flex items-center gap-2">
                Watch Video
                <Play className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 10 - CALL TO ACTION */}
      <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 p-12 lg:p-16 text-center space-y-8 shadow-sm"
        >
          <h2 className="text-3xl lg:text-4xl leading-tight">
            Need something a little more creative?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Explore custom projects, advanced production setups, and tailored creative solutions designed around your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300">
              Start a Custom Project
            </button>
            <button className="px-8 py-4 border border-gray-300 rounded-xl hover:border-gray-900 transition-all duration-300">
              Book a Consultation
            </button>
          </div>
        </motion.div>
      </section>

      {/* SECTION 11 - FOOTER */}
      <footer className="bg-[#FAFAF9] border-t border-gray-200">
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-16">
            <div className="space-y-6">
              <h4 className="text-gray-900">About</h4>
              <ul className="space-y-3">
                {["Our Story", "Team", "Careers", "Press"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-gray-900">Services</h4>
              <ul className="space-y-3">
                {["Campaigns", "Runway", "Ecommerce", "Video & Social"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-gray-900">Directory</h4>
              <ul className="space-y-3">
                {["Models", "Photographers", "Designers", "Stylists"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-gray-900">Contact</h4>
              <ul className="space-y-3">
                {["hello@fashionos.com", "+1 (555) 123-4567", "New York, NY", "Book a Call"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-8">
              <div className="text-2xl tracking-tight">FashionOS</div>
              <p className="text-sm text-gray-500">
                © 2025 FashionOS. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
