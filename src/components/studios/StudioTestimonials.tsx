import { motion } from "motion/react";
import { Star } from "lucide-react";

interface Testimonial {
  rating: number;
  quote: string;
  author: string;
  brand: string;
}

interface StudioTestimonialsProps {
  testimonials: Testimonial[];
}

export function StudioTestimonials({ testimonials }: StudioTestimonialsProps) {
  return (
    <section className="py-20 lg:py-32 bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-200 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-700 pt-4">
                <p className="text-white mb-1">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.brand}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
