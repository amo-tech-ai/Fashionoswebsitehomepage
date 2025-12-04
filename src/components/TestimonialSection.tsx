import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface TestimonialSectionProps {
  testimonial: Testimonial;
}

export function TestimonialSection({ testimonial }: TestimonialSectionProps) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-12"
        >
          <div className="space-y-8">
            <div className="text-6xl text-gray-300">"</div>
            <blockquote className="text-2xl lg:text-3xl text-gray-800 leading-relaxed italic">
              {testimonial.quote}
            </blockquote>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
              <ImageWithFallback
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-900">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
