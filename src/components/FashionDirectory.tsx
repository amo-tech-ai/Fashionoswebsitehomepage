import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DirectoryProfile {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface FashionDirectoryProps {
  profiles: DirectoryProfile[];
}

export function FashionDirectory({ profiles }: FashionDirectoryProps) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex justify-between items-end"
        >
          <div>
            <h2>Fashion Directory</h2>
            <p className="text-xl text-gray-600 mt-4">
              Connect with leading creatives in the industry.
            </p>
          </div>
          <motion.button
            className="hidden lg:flex items-center gap-2 text-gray-900 hover:gap-4 transition-all duration-300"
            whileHover={{ x: 4 }}
          >
            Explore Directory
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <div className="space-y-1">
                <h4 className="group-hover:text-gray-600 transition-colors duration-300">
                  {profile.name}
                </h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  {profile.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 lg:hidden text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-all duration-300">
            Explore Directory
          </button>
        </motion.div>
      </div>
    </section>
  );
}
