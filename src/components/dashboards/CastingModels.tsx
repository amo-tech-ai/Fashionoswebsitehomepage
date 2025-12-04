import { motion } from "motion/react";
import { Sparkles, User, CheckCircle, Clock, Calendar } from "lucide-react";

export function CastingModels() {
  const models = [
    { name: "Ava Chen", status: "confirmed", fitting: "complete", looks: 3 },
    { name: "Zara Kim", status: "confirmed", fitting: "complete", looks: 2 },
    { name: "Luna Martinez", status: "confirmed", fitting: "complete", looks: 4 },
    { name: "Jade Foster", status: "confirmed", fitting: "complete", looks: 2 },
    { name: "Maya Rivera", status: "confirmed", fitting: "pending", looks: 3 },
    { name: "Sofia Lee", status: "confirmed", fitting: "pending", looks: 2 },
    { name: "Emma Stone", status: "confirmed", fitting: "complete", looks: 3 },
    { name: "Olivia Park", status: "confirmed", fitting: "complete", looks: 2 },
    { name: "Isabella Cruz", status: "pending", fitting: "pending", looks: 0 },
    { name: "Mia Johnson", status: "pending", fitting: "pending", looks: 0 },
    { name: "Charlotte Wu", status: "confirmed", fitting: "complete", looks: 3 },
    { name: "Amelia Singh", status: "confirmed", fitting: "complete", looks: 2 }
  ];

  const walkOrder = [
    { position: 1, model: "Ava Chen", look: "Metallic Gown", designer: "Designer A" },
    { position: 2, model: "Zara Kim", look: "Minimalist Suit", designer: "Designer B" },
    { position: 3, model: "Luna Martinez", look: "Evening Dress", designer: "Designer A" },
    { position: 4, model: "Jade Foster", look: "Street Couture", designer: "Designer C" },
    { position: 5, model: "Maya Rivera", look: "Avant-Garde", designer: "Designer D" }
  ];

  const fittingSchedule = [
    { date: "Mar 1", time: "10:00 AM", models: "Ava, Zara, Luna", status: "complete" },
    { date: "Mar 2", time: "2:00 PM", models: "Jade, Maya, Sofia", status: "complete" },
    { date: "Mar 5", time: "11:00 AM", models: "Emma, Olivia, Charlotte", status: "scheduled" },
    { date: "Mar 6", time: "3:00 PM", models: "Isabella, Mia, Amelia", status: "scheduled" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-[1920px] mx-auto px-6 py-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">Casting & Models Management</h1>
            <p className="text-sm text-gray-600">AI-powered look matching and walk order optimization</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl text-gray-900">32</div>
              <div className="text-xs text-gray-600">Confirmed Models</div>
            </div>
            <div className="text-right">
              <div className="text-2xl text-amber-600">8</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-white" />
            <div className="text-sm text-white">
              AI detected 3 potential outfit clashes. Recommended walk order adjustments to optimize flow and change times.
            </div>
          </div>
        </motion.div>

        {/* Model Cards Grid */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Model Portfolio</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {models.map((model, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 cursor-pointer transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ y: -4 }}
              >
                {/* Avatar placeholder */}
                <div className="w-full aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div className="text-sm text-gray-900 mb-2">{model.name}</div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`px-2 py-0.5 rounded-full ${
                    model.status === "confirmed" 
                      ? "bg-green-50 text-green-700" 
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {model.status}
                  </span>
                  {model.looks > 0 && (
                    <span className="text-gray-600">{model.looks} looks</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  {model.fitting === "complete" ? (
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  ) : (
                    <Clock className="w-3 h-3 text-amber-600" />
                  )}
                  <span>Fitting {model.fitting}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Walk Order Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900">Walk Order Timeline</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm">
              <Sparkles className="w-4 h-4" />
              <span>AI Optimized</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex items-center gap-4 pb-4">
              {walkOrder.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-64 border border-gray-200 rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                      Position {item.position}
                    </span>
                    <span className="text-xs text-gray-600">{item.designer}</span>
                  </div>
                  <div className="text-sm text-gray-900 mb-1">{item.model}</div>
                  <div className="text-xs text-gray-600">{item.look}</div>
                </motion.div>
              ))}
              <div className="flex-shrink-0 w-48 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-gray-400 text-sm">
                + Add More
              </div>
            </div>
          </div>
        </div>

        {/* Fittings Schedule + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Fittings Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Fittings Schedule</h3>
            <div className="space-y-3">
              {fittingSchedule.map((fitting, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    fitting.status === "complete"
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-900">{fitting.date}</span>
                      <span className="text-xs text-gray-600">{fitting.time}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      fitting.status === "complete"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {fitting.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">Models: {fitting.models}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Model Availability Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Fitting Progress</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Fittings Completed</span>
                  <span className="text-sm text-gray-900">28 / 32</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-600"
                    initial={{ width: 0 }}
                    animate={{ width: "87.5%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Models Confirmed</span>
                  <span className="text-sm text-gray-900">32 / 40</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gray-900"
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl text-gray-900">4</div>
                    <div className="text-xs text-gray-600">Pending Fittings</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl text-gray-900">8</div>
                    <div className="text-xs text-gray-600">Pending Confirms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
