import { motion } from "motion/react";
import { TrendingUp, Users, Shirt, DollarSign, Wrench, Sparkles, AlertTriangle, CheckCircle, Clock, Cloud, Package, UserCheck } from "lucide-react";

export function CommandCenter() {
  const kpis = [
    { label: "Tickets Sold", value: "1,740", change: "+45%", icon: Users, color: "text-green-600" },
    { label: "Designers Confirmed", value: "12", change: "", icon: Shirt, color: "text-gray-700" },
    { label: "Models Ready", value: "32", change: "", icon: UserCheck, color: "text-gray-700" },
    { label: "Active Sponsors", value: "12", change: "", icon: DollarSign, color: "text-gray-700" },
    { label: "Crew Status", value: "87%", change: "operational", icon: Wrench, color: "text-gray-700" }
  ];

  const recommendations = [
    { title: "Optimize seating arrangement", impact: "Improve guest visibility by 12%" },
    { title: "Increase runway lighting intensity", impact: "Better photo quality for media" },
    { title: "Send reminder to sponsor reps", impact: "Ensure VIP attendance confirmation" }
  ];

  const risks = [
    { label: "Weather Risk", level: "Low", color: "bg-green-50 text-green-700 border-green-200" },
    { label: "Deliverable Delays", level: "High", color: "bg-red-50 text-red-700 border-red-200" },
    { label: "Vendor Delay", level: "Medium", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ];

  const timeline = [
    { phase: "Concept", status: "complete" },
    { phase: "Fittings", status: "complete" },
    { phase: "Runway Build", status: "active" },
    { phase: "Rehearsal", status: "pending" },
    { phase: "Show Day", status: "pending" },
    { phase: "Media", status: "pending" }
  ];

  const activities = [
    { text: "Designer lineup approved", time: "2 hours ago", icon: CheckCircle, color: "text-green-600" },
    { text: "Casting updated - 4 new models added", time: "5 hours ago", icon: Users, color: "text-gray-600" },
    { text: "Sponsor contract uploaded by Nike", time: "1 day ago", icon: Package, color: "text-gray-600" },
    { text: "Venue walkthrough completed", time: "2 days ago", icon: CheckCircle, color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6">
        
        {/* Top KPI Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                  {kpi.change && (
                    <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full">
                      {kpi.change}
                    </span>
                  )}
                </div>
                <div className="text-2xl mb-1 text-gray-900">{kpi.value}</div>
                <div className="text-xs text-gray-500">{kpi.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Overview Strip */}
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">AI Insight</div>
              <div className="text-sm text-white">
                Attendance trending +45%, runway prep behind by 12%. Consider accelerating lighting setup.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid: Charts + Recommendations + Risks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Predictions Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Attendance & Revenue Forecast</h3>
            <div className="space-y-4">
              {/* Attendance Forecast */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Expected Attendance</span>
                  <span className="text-sm text-gray-900">1,740 / 1,200 capacity</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gray-900"
                    initial={{ width: 0 }}
                    animate={{ width: "87%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              {/* Revenue Forecast */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Projected Revenue</span>
                  <span className="text-sm text-gray-900">$485K / $500K goal</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-600"
                    initial={{ width: 0 }}
                    animate={{ width: "97%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>

              {/* AI Health Score */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Event Health Score</div>
                    <div className="text-3xl text-gray-900">92/100</div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white">
                    <Sparkles className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Risk Alerts</h3>
            <div className="space-y-3">
              {risks.map((risk, index) => (
                <motion.div
                  key={index}
                  className={`${risk.color} border rounded-lg p-3`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {risk.level === "High" && <AlertTriangle className="w-4 h-4" />}
                      {risk.level === "Medium" && <Clock className="w-4 h-4" />}
                      {risk.level === "Low" && <Cloud className="w-4 h-4" />}
                      <span className="text-sm">{risk.label}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-white rounded-full">{risk.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Smart Recommendations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">AI Smart Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-sm text-gray-900 mb-2">{rec.title}</div>
                <div className="text-xs text-gray-600">{rec.impact}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Flow Diagram */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Event Timeline</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {timeline.map((phase, index) => (
              <div key={index} className="flex items-center flex-shrink-0">
                <div className={`px-6 py-3 rounded-lg border-2 ${
                  phase.status === "complete" 
                    ? "bg-green-50 border-green-600 text-green-700" 
                    : phase.status === "active"
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}>
                  <div className="text-sm whitespace-nowrap">{phase.phase}</div>
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-200 mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                >
                  <Icon className={`w-4 h-4 mt-0.5 ${activity.color}`} />
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">{activity.text}</div>
                    <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}