import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Campaign {
  id: string;
  title: string;
  label: string;
  image: string;
}

interface LatestCampaignsProps {
  campaigns: Campaign[];
}

export function LatestCampaigns({ campaigns }: LatestCampaignsProps) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2>Latest Campaigns</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <div className="space-y-2">
                <h3 className="group-hover:text-gray-600 transition-colors duration-300">
                  {campaign.title}
                </h3>
                <p className="text-gray-500 uppercase tracking-wider text-sm">
                  {campaign.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
