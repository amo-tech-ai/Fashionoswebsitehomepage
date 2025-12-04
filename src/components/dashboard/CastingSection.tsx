import { motion } from "motion/react";
import { Users, Clock, CheckCircle } from "lucide-react";

export function CastingSection() {
  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-gray-900 mb-6">Casting Overview</h3>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl text-green-900">32</div>
              <div className="text-xs text-green-700">Confirmed Models</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl text-amber-900">8</div>
              <div className="text-xs text-amber-700">Pending</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl text-gray-900">28 / 32</div>
              <div className="text-xs text-gray-700">Fittings Done</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}