import { motion } from "motion/react";
import { Clock, MapPin, Check } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ServicesHeroProps {
  heroImage: string;
  collageImages?: string[];
}

export function ServicesHero({ heroImage, collageImages }: ServicesHeroProps) {
  const badges = [
    { icon: Clock, text: "Fast turnaround" },
    { icon: MapPin, text: "Studio or On-Location" },
    { icon: Check, text: "Premium quality" }
  ];

  return (
    <section className="min-h-screen bg-[rgb(var(--color-beige))]">
      <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <h1>
                Ecommerce Fashion Photography & Video
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Premium product, editorial, and on-model photography designed to elevate your brand 
                and drive conversions across all digital channels.
              </p>
            </div>

            <motion.a
              href="/wizard"
              className="inline-block bg-black text-white px-12 py-5 rounded-full hover:bg-gray-800 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Shoot
            </motion.a>

            <div className="flex flex-wrap gap-6 pt-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <badge.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-gray-700">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Hero Image or Collage */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {collageImages ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-sm">
                  <ImageWithFallback
                    src={heroImage}
                    alt="Fashion photography"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-sm">
                  <ImageWithFallback
                    src={collageImages[0]}
                    alt="Fashion detail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-sm">
                  <ImageWithFallback
                    src={collageImages[1]}
                    alt="Fashion style"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="aspect-[4/5] overflow-hidden rounded-sm">
                <ImageWithFallback
                  src={heroImage}
                  alt="Fashion photography"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
