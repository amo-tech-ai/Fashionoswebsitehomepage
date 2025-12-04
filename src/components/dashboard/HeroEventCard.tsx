import { motion } from "motion/react";
import { Calendar, MapPin, TrendingUp, Users, CheckSquare } from "lucide-react";

export function HeroEventCard() {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Gradient Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-3 text-white">NYFW SS25 Runway Show</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-gray-300">March 15, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-gray-300">Chelsea Industrial, NYC</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white bg-opacity-10 rounded-full text-xs backdrop-blur-sm border border-white border-opacity-20">
                Fashion Show
              </span>
              <span className="px-3 py-1 bg-white bg-opacity-10 rounded-full text-xs backdrop-blur-sm border border-white border-opacity-20">
                Live
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl mb-1">42</div>
            <div className="text-sm text-gray-300">Days Until Event</div>
          </div>
        </div>

        {/* Sub-metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs text-green-300">+5%</span>
            </div>
            <div className="text-2xl mb-1">87%</div>
            <div className="text-xs text-purple-100">Overall Progress</div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-5 h-5" />
              <span className="text-xs text-green-300">+2</span>
            </div>
            <div className="text-2xl mb-1">12</div>
            <div className="text-xs text-gray-300">Active Sponsors</div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5" />
              <span className="text-xs text-green-300">+45%</span>
            </div>
            <div className="text-2xl mb-1">1,740</div>
            <div className="text-xs text-gray-300">Expected Attendees</div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div className="text-2xl mb-1">28</div>
            <div className="text-xs text-gray-300">Tasks Remaining</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Briefcase = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);