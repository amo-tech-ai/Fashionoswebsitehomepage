import { motion } from "motion/react";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  brand: string;
}

interface ClothingTestimonialsProps {
  testimonials: Testimonial[];
}

export function ClothingTestimonials({ testimonials }: ClothingTestimonialsProps) {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Quote className="w-10 h-10 text-gray-300 mb-6" />
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.brand}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
