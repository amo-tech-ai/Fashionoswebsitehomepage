import { motion } from "motion/react";
import { TrendingUp, DollarSign } from "lucide-react";

export function SponsorProgressCard() {
  const sponsors = [
    { name: "Sephora", amount: 150000, color: "bg-gray-700" },
    { name: "Nike Women", amount: 200000, color: "bg-gray-800" },
    { name: "Dior Beauty", amount: 85000, color: "bg-gray-600" }
  ];

  const total = sponsors.reduce((sum, s) => sum + s.amount, 0);
  const goal = 500000;
  const percentage = Math.round((total / goal) * 100);

  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-gray-900 mb-1">Sponsor Progress</h3>
          <p className="text-sm text-gray-500">Funding goal tracking</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-xs text-green-700">On Track</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <span className="text-sm text-gray-600">Current Progress</span>
          <span className="text-2xl text-gray-900">{percentage}%</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gray-900 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500">
            ${(total / 1000).toFixed(0)}K raised
          </span>
          <span className="text-sm text-gray-500">
            ${(goal / 1000).toFixed(0)}K goal
          </span>
        </div>
      </div>

      {/* Sponsor Contributions */}
      <div className="space-y-3">
        <p className="text-sm text-gray-600 mb-3">Top Contributors</p>
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.name}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${sponsor.color} rounded-lg flex items-center justify-center`}>
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-900">{sponsor.name}</span>
            </div>
            <span className="text-sm text-gray-900">
              ${(sponsor.amount / 1000).toFixed(0)}K
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}