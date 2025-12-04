import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, TrendingUp, AlertTriangle, DollarSign, Building2, ChevronDown, ArrowRight } from "lucide-react";

export function AiReasoningPanel() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const insights = [
    { label: "Attendance trending +45%", level: "high", color: "from-green-50 to-green-50", textColor: "text-green-900" },
    { label: "Risk: Deliverable delays", level: "high", color: "from-red-50 to-red-50", textColor: "text-red-900" },
    { label: "Sponsor growth opportunity", level: "medium", color: "from-amber-50 to-amber-50", textColor: "text-amber-900" },
    { label: "Budget pacing", level: "low", color: "from-gray-100 to-gray-100", textColor: "text-gray-900" }
  ];

  const reasoningCards = [
    {
      title: "Budget Forecast",
      status: "97% on track",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      insight: "Your current spend rate suggests you'll finish within budget. Consider allocating the remaining 3% to PR and last-minute marketing for maximum impact.",
      recommendation: "Increase PR spend by $15K"
    },
    {
      title: "Venue Risk",
      status: "Capacity concern",
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      insight: "With attendance up 45%, you're approaching venue capacity of 1,200. Current projections show 1,740 expected attendees.",
      recommendation: "Review overflow seating options"
    },
    {
      title: "Sponsor Efficiency",
      status: "Exceeding targets",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      insight: "Sponsors are responding 23% better than industry average. Their social media engagement is driving unexpected ticket sales.",
      recommendation: "Negotiate extended partnerships"
    }
  ];

  return (
    <aside className="sticky top-20 h-[calc(100vh-5rem)] w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900">AI Reasoning Engine</h3>
            <p className="text-xs text-gray-500">Gemini-Powered</p>
          </div>
        </div>

        {/* Live Insights */}
        <div>
          <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider">Live Insights</p>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-r ${insight.color} rounded-lg p-3 text-xs ${insight.textColor}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span>{insight.label}</span>
                  <span className="px-2 py-0.5 bg-white rounded-full text-[10px]">
                    {insight.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Reasoning Cards */}
        <div>
          <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider">AI Analysis</p>
          <div className="space-y-3">
            {reasoningCards.map((card, index) => {
              const Icon = card.icon;
              const isExpanded = expandedCard === index;

              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <button
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedCard(isExpanded ? null : index)}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-8 h-8 ${card.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${card.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{card.title}</p>
                        <p className="text-xs text-gray-500">{card.status}</p>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-100"
                      >
                        <div className="p-4 space-y-3">
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {card.insight}
                          </p>
                          <button className="flex items-center gap-2 text-xs text-purple-600 hover:text-purple-700">
                            <span>{card.recommendation}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View Plan Button */}
        <motion.button
          className="w-full bg-gray-900 text-white px-4 py-3 rounded-xl text-sm hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Full Plan →
        </motion.button>
      </div>
    </aside>
  );
}