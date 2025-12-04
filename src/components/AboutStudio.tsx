import { motion } from "motion/react";
import { Camera, Clock, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutStudioProps {
  studioImage: string;
}

export function AboutStudio({ studioImage }: AboutStudioProps) {
  const features = [
    {
      icon: Target,
      title: "Creative Direction",
      description: "Visionary concepts tailored to your brand identity"
    },
    {
      icon: Clock,
      title: "Rapid Turnaround",
      description: "Professional delivery within tight timelines"
    },
    {
      icon: Camera,
      title: "Brand Consistency",
      description: "Cohesive visual language across all campaigns"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[rgb(var(--color-beige))]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <ImageWithFallback
                src={studioImage}
                alt="Fashion studio"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 space-y-12"
          >
            <div className="space-y-6">
              <h2>Our Studio</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                A creative sanctuary where fashion meets art. We specialize in bringing editorial
                visions to life through meticulous attention to detail and uncompromising quality.
              </p>
            </div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                      <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4>{feature.title}</h4>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
