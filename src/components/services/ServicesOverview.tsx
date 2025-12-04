import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ServiceOverview {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ServicesOverviewProps {
  services: ServiceOverview[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <section className="py-24 lg:py-32 bg-[rgb(var(--color-beige))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2>Services Overview</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="space-y-5">
                {/* Lifestyle Image */}
                <div className="aspect-[3/4] overflow-hidden rounded-sm">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-sm p-6 space-y-3 group-hover:shadow-lg transition-shadow duration-300">
                  <h4>{service.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
