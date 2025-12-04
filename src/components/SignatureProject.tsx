import { motion } from "motion/react";
import { Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SignatureProjectProps {
  portraitImage: string;
}

export function SignatureProject({ portraitImage }: SignatureProjectProps) {
  const strengths = [
    "Over two decades of editorial excellence",
    "Partnerships with leading fashion houses",
    "Featured in Vogue, Harper's Bazaar, and Elle",
    "Award-winning creative direction",
    "Global network of industry professionals"
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Black & White Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <ImageWithFallback
                src={portraitImage}
                alt="Fashion industry portrait"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </motion.div>

          {/* Right - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2>20+ years in the fashion industry</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                From runway to editorial, we've captured the essence of fashion's most iconic moments.
              </p>
            </div>

            <div className="space-y-5">
              {strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <p className="text-gray-700">
                    {strength}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              See Our Work
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
