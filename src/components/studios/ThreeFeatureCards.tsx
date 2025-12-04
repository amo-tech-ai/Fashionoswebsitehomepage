import { motion } from "motion/react";
import { Camera, MapPin, Maximize } from "lucide-react";

export function ThreeFeatureCards() {
  const features = [
    {
      icon: Camera,
      title: "Equipment & Kits",
      description: "Professional Profoto lighting, backdrops, reflectors, and all the gear you need for a successful shoot included in every booking."
    },
    {
      icon: MapPin,
      title: "Great Location",
      description: "Conveniently located in the heart of the creative district with easy access, parking, and public transport nearby."
    },
    {
      icon: Maximize,
      title: "The Space",
      description: "2,500 sq ft of versatile space with 14ft ceilings, natural light options, and flexible layout to accommodate any creative vision."
    }
  ];

  return (
    <section className="bg-gray-50 py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
