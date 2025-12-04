import { motion } from "motion/react";
import { Sparkles, AlertTriangle, Lightbulb, Volume2, Eye, Users } from "lucide-react";

export function RunwayStage() {
  const layouts = [
    { name: "Layout A", type: "Classic Runway", seats: 1200, visibility: "95%" },
    { name: "Layout B", type: "Circular Stage", seats: 1400, visibility: "88%" },
    { name: "Layout C", type: "Split Runway", seats: 1100, visibility: "92%" },
    { name: "Layout D", type: "Theater Style", seats: 1600, visibility: "78%" }
  ];

  const warnings = [
    { text: "Low visibility seats detected in rear sections", level: "medium" },
    { text: "Backstage congestion risk: Medium", level: "medium" },
    { text: "Recommended: Add 2 camera positions", level: "low" }
  ];

  const controls = [
    { label: "Main Runway Lighting", value: 85, icon: Lightbulb },
    { label: "Backstage Lighting", value: 60, icon: Lightbulb },
    { label: "Audio System Volume", value: 75, icon: Volume2 },
    { label: "Stage Effects", value: 40, icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-[1920px] mx-auto px-6 py-8 space-y-6">
        
        {/* Header with AI Badge */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">Runway & Stage Layout</h1>
            <p className="text-sm text-gray-600">AI-optimized seating and stage configuration</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">AI Layout Optimizer Active</span>
          </div>
        </div>

        {/* 3D Runway Preview + Seating Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* 3D Runway Preview */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-gray-900 mb-4">3D Runway Preview</h3>
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Runway visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-16 bg-gray-800 rounded-lg relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-600" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full" />
                </div>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs text-gray-700">
                Classic Runway Layout
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg text-gray-900">48m</div>
                <div className="text-xs text-gray-600">Length</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg text-gray-900">3.5m</div>
                <div className="text-xs text-gray-600">Width</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg text-gray-900">0.9m</div>
                <div className="text-xs text-gray-600">Height</div>
              </div>
            </div>
          </motion.div>

          {/* Seating Layout Heatmap */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Visibility Heatmap</h3>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">95% optimal</span>
              </div>
            </div>
            <div className="aspect-video bg-gradient-to-br from-green-50 via-amber-50 to-red-50 rounded-lg flex items-center justify-center relative">
              {/* Heatmap visualization */}
              <div className="absolute inset-0 p-8 grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => {
                  const row = Math.floor(i / 8);
                  const isGreen = row < 3;
                  const isYellow = row >= 3 && row < 6;
                  return (
                    <div
                      key={i}
                      className={`rounded ${
                        isGreen ? 'bg-green-500 bg-opacity-60' :
                        isYellow ? 'bg-amber-500 bg-opacity-60' :
                        'bg-red-500 bg-opacity-40'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span className="text-gray-600">Excellent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded" />
                <span className="text-gray-600">Good</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded" />
                <span className="text-gray-600">Limited</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Backstage Flow Diagram */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-gray-900 mb-6">Backstage Flow Diagram</h3>
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
            {["Dressing Room", "Makeup Station", "Quick Change", "Stage Entry", "Runway", "Stage Exit", "Recovery Area"].map((area, index) => (
              <div key={index} className="flex items-center flex-shrink-0">
                <div className="px-6 py-4 bg-gray-50 border border-gray-200 rounded-lg text-center min-w-[140px]">
                  <Users className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-900 whitespace-nowrap">{area}</div>
                </div>
                {index < 6 && (
                  <div className="flex items-center mx-2">
                    <div className="w-8 h-0.5 bg-gray-300" />
                    <div className="w-2 h-2 border-2 border-gray-300 border-l-0 border-b-0 rotate-45 -ml-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lighting & Sound Control Panel */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-gray-900 mb-6">Lighting & Sound Control</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {controls.map((control, index) => {
              const Icon = control.icon;
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{control.label}</span>
                    </div>
                    <span className="text-sm text-gray-900">{control.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gray-900 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${control.value}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Suggested Layouts + Safety Warnings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Suggested Layouts */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-gray-700" />
              <h3 className="text-gray-900">AI-Suggested Layouts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layouts.map((layout, index) => (
                <motion.div
                  key={index}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 cursor-pointer transition-colors"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-sm text-gray-900 mb-1">{layout.name}</div>
                  <div className="text-xs text-gray-600 mb-3">{layout.type}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{layout.seats} seats</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                      {layout.visibility} visibility
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Safety Warnings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Safety & Visibility Warnings</h3>
            <div className="space-y-3">
              {warnings.map((warning, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    warning.level === "high" ? "bg-red-50 border-red-200 text-red-700" :
                    warning.level === "medium" ? "bg-amber-50 border-amber-200 text-amber-700" :
                    "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{warning.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
