import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Footer } from "./components/Footer";
import { motion } from "motion/react";
import { ArrowRight, Check, Camera, Palette, Sparkles, Package, Layers, Clock } from "lucide-react";
import { useState } from "react";

export default function Product() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: ""
  });

  const services = [
    {
      icon: Sparkles,
      title: "Skin & Beauty Retouching.",
      description: "Natural-looking edits enhancing skin, hair, makeup — perfect for lookbooks, campaigns & ecommerce.",
      image: "https://images.unsplash.com/photo-1762522903557-891c8dc11f4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwb3J0cmFpdCUyMHJldG91Y2hpbmd8ZW58MXx8fHwxNzY0ODgzODQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Camera,
      title: "Jewellery.",
      description: "Precision enhancements for jewellery photography — clarity, shine, reflection control, flawless presentation.",
      image: "https://images.unsplash.com/photo-1601057836844-a8a336439a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwcGhvdG9ncmFwaHklMjBtYWNyb3xlbnwxfHx8fDE3NjQ4ODM4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Palette,
      title: "Colour Grading & Matching.",
      description: "Tone consistency across platforms and collections; subtle corrections or full recoloring.",
      image: "https://images.unsplash.com/photo-1686831451910-be038fcaa48c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHByb2R1Y3QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjQ3Nzk0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Package,
      title: "Product Cleanup & Enhancement.",
      description: "Remove dust, scratches, reflections, creases; improve product shape & lighting.",
      image: "https://images.unsplash.com/photo-1680503504148-25f2d178ff05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0ODM5NTA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Layers,
      title: "Creative Compositing.",
      description: "Multi-image composites, background swaps, visual effects, and conceptual retouching.",
      image: "https://images.unsplash.com/photo-1648046016726-9260b555902b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzY0ODAzNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Clock,
      title: "Consistent Delivery.",
      description: "Final assets delivered to exact specs: crop ratios, naming conventions, formats.",
      image: "https://images.unsplash.com/photo-1636293875796-1cbaf6585779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRvdWNoaW5nJTIwd29ya3NwYWNlJTIwc3R1ZGlvfGVufDF8fHx8MTc2NDg4Mzg0NHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const beforeAfterGallery = [
    "https://images.unsplash.com/photo-1762522903557-891c8dc11f4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwb3J0cmFpdCUyMHJldG91Y2hpbmd8ZW58MXx8fHwxNzY0ODgzODQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1610879328923-3de1e04c3ddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ4NjA0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1686831451910-be038fcaa48c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHByb2R1Y3QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjQ3Nzk0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1680503504148-25f2d178ff05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0ODM5NTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1601057836844-a8a336439a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwcGhvdG9ncmFwaHklMjBtYWNyb3xlbnwxfHx8fDE3NjQ4ODM4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwbHV4dXJ5fGVufDF8fHx8MTc2NDgzNDczOXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1643949476021-cf19232e2b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBjbG9zZSUyMHVwJTIwYmVhdXR5fGVufDF8fHx8MTc2NDg4Mzg0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1751131964776-57e3cbca0a14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzY0ODUyNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758297679778-d308606a3f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3J5JTIwZ29sZHxlbnwxfHx8fDE3NjQ4ODM4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1648046016726-9260b555902b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzY0ODAzNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1762522916987-dcac71355ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzaG90JTIwZXllJTIwbWFrZXVwfGVufDF8fHx8MTc2NDg4Mzg0NXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1636293875796-1cbaf6585779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRvdWNoaW5nJTIwd29ya3NwYWNlJTIwc3R1ZGlvfGVufDF8fHx8MTc2NDg4Mzg0NHww&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  const btsImages = [
    "https://images.unsplash.com/photo-1636293875796-1cbaf6585779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRvdWNoaW5nJTIwd29ya3NwYWNlJTIwc3R1ZGlvfGVufDF8fHx8MTc2NDg4Mzg0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1643949476021-cf19232e2b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBjbG9zZSUyMHVwJTIwYmVhdXR5fGVufDF8fHx8MTc2NDg4Mzg0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1762522903557-891c8dc11f4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwb3J0cmFpdCUyMHJldG91Y2hpbmd8ZW58MXx8fHwxNzY0ODgzODQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1680503504148-25f2d178ff05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0ODM5NTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1601057836844-a8a336439a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwcGhvdG9ncmFwaHklMjBtYWNyb3xlbnwxfHx8fDE3NjQ4ODM4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1751131964776-57e3cbca0a14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzY0ODUyNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1648046016726-9260b555902b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzY0ODAzNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1762522916987-dcac71355ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzaG90JTIwZXllJTIwbWFrZXVwfGVufDF8fHx8MTc2NDg4Mzg0NXww&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="min-h-[90vh] bg-gradient-to-br from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 text-gray-900">
                Retouching.
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Beautiful, natural, premium finishing for over 20 years.
              </p>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed max-w-xl">
                High-end retouching for beauty, fashion, product & ecommerce. Our in-house team delivers precision, 
                consistency, and creative excellence across every project — from commercial campaigns to luxury editorial.
              </p>
              <button className="px-10 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg inline-flex items-center gap-2 group">
                Book Retouching
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1762522903557-891c8dc11f4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwb3J0cmFpdCUyMHJldG91Y2hpbmd8ZW58MXx8fHwxNzY0ODgzODQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Beauty Retouching"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. IN-HOUSE CREATIVE & COMMERCIAL RETOUCHING */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl mb-8 text-gray-900">
                In-House Creative & Commercial Retouching
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our senior retouchers work exclusively in-house, ensuring precision, consistency, and creative 
                enhancement across every image. From subtle skin refinement to complex compositing, we deliver 
                premium-quality finishing that elevates your brand.
              </p>
              <button className="px-8 py-3 border border-gray-900 text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition-all inline-flex items-center gap-2">
                View Samples
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl bg-stone-100">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1680503504148-25f2d178ff05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0ODM5NTA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Product Retouching"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR POST-PRODUCTION SERVICES */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-4xl md:text-6xl mb-16 text-gray-900 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Post-Production Services.
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. RETOUCHING SHOWCASE BANNER */}
      <section className="relative py-32 md:py-40 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762522916987-dcac71355ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzaG90JTIwZXllJTIwbWFrZXVwfGVufDF8fHx8MTc2NDg4Mzg0NXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Eye close up"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl text-white tracking-wider">
              RETOUCHING<br />SHOWCASE.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* 5. BEFORE & AFTER GALLERY */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-4xl md:text-6xl mb-16 text-gray-900 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Before and After.
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beforeAfterGallery.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Retouching example ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ADDITIONAL FEATURE HIGHLIGHTS */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-4 text-gray-900">Perfect for campaigns, e-commerce, and high-fashion editorial.</h3>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-4 text-gray-900">Handled entirely in-house by senior retouchers.</h3>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-4 text-gray-900">Trusted for premium-quality delivery every time.</h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. GET IN TOUCH FORM */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl mb-4 text-gray-900 text-center">Get in Touch.</h2>
            <p className="text-lg text-gray-600 mb-12 text-center">
              Tell us about your project — we reply within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 8. BEHIND THE SCENES */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-4xl md:text-6xl mb-16 text-gray-900 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Behind the scenes.
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {btsImages.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square rounded-xl overflow-hidden border border-gray-200 hover:border-gray-400 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Behind the scenes ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
}
