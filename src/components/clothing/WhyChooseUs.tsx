import { motion } from "motion/react";
import { Award, Zap, Users, CheckCircle, TrendingUp, Shield } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "Specialist Fashion Studio",
      description: "Dedicated exclusively to fashion and apparel photography with industry-leading expertise."
    },
    {
      icon: CheckCircle,
      title: "Consistent Quality",
      description: "Rigorous quality control ensures every image meets our exacting standards across all shoots."
    },
    {
      icon: Users,
      title: "Experience & Reliability",
      description: "20+ years working with fashion brands from emerging designers to global luxury labels."
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Efficient workflows and streamlined processes deliver your images when you need them."
    },
    {
      icon: TrendingUp,
      title: "Conversion Focused",
      description: "Photography specifically optimized to increase online sales and customer engagement."
    },
    {
      icon: Shield,
      title: "Full-Service Production",
      description: "From creative direction to final retouching, we handle every aspect of your shoot."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional clothing photography backed by decades of experience and a commitment to excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-3">{feature.title}</h3>
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
