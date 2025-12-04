import { motion } from "motion/react";
import { Search, Bell, User, Sparkles } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-2xl tracking-tight">FashionOS</div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs text-gray-700">AI-Powered</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sponsors, venues, tasks, contacts..."
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <motion.button
              className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>
            <motion.button
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}