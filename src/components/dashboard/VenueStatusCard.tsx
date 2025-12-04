import { motion } from "motion/react";
import { Building2, Users, Clock, UtensilsCrossed, CheckCircle } from "lucide-react";

export function VenueStatusCard() {
  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
          <Building2 className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <h3 className="text-gray-900 mb-1">Venue Status</h3>
          <p className="text-sm text-gray-500">Chelsea Industrial</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">Capacity</span>
          </div>
          <span className="text-sm text-gray-900">1,200 guests</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">Setup Time</span>
          </div>
          <span className="text-sm text-gray-900">6 hours</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-700">Catering</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Confirmed</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}