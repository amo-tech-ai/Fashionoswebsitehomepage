import { motion } from "motion/react";
import { Sparkles, Camera, ShoppingBag, Video } from "lucide-react";

export function CreativeServices() {
  const services = [
    {
      icon: Sparkles,
      title: "Campaigns",
      description: "End-to-end creative direction for seasonal campaigns and brand launches."
    },
    {
      icon: Camera,
      title: "Runway",
      description: "Fast-paced fashion show photography capturing every moment on the catwalk."
    },
    {
      icon: ShoppingBag,
      title: "Ecommerce",
      description: "Product photography optimized for digital retail and conversion."
    },
    {
      icon: Video,
      title: "Video & Social",
      description: "Dynamic content creation for social media and digital marketing."
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[rgb(var(--color-soft-gray))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2>Creative Services</h2>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Comprehensive photography solutions tailored to your brand's unique needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
              className="bg-white rounded-sm p-8 space-y-6 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full">
                <service.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="space-y-3">
                <h3>{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
