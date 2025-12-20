import { AlertTriangle, AlertCircle, Lightbulb, Sparkles, RefreshCw, ChevronDown, ChevronUp, X } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface AIInsight {
  id: string;
  severity: "critical" | "warning" | "suggestion";
  category: string;
  title: string;
  description: string;
  impact: string;
  urgency: "now" | "3_days" | "7_days";
  recommendedActions: string[];
  riskScore: number;
}

interface AIInsightsPanelProps {
  insights: AIInsight[];
  loading?: boolean;
  lastUpdated?: Date;
  onRefresh?: () => void;
  onDismiss?: (insightId: string) => void;
  onActionClick?: (insightId: string, action: string) => void;
}

export function AIInsightsPanel({
  insights,
  loading = false,
  lastUpdated,
  onRefresh,
  onDismiss,
  onActionClick
}: AIInsightsPanelProps) {
  
  const [expandedInsights, setExpandedInsights] = useState<Set<string>>(new Set());

  const toggleExpand = (insightId: string) => {
    const newExpanded = new Set(expandedInsights);
    if (newExpanded.has(insightId)) {
      newExpanded.delete(insightId);
    } else {
      newExpanded.add(insightId);
    }
    setExpandedInsights(newExpanded);
  };

  // Severity styling
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          icon: AlertTriangle,
          iconColor: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-300",
          textColor: "text-red-700",
          badgeBg: "bg-red-600 text-white"
        };
      case "warning":
        return {
          icon: AlertCircle,
          iconColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-300",
          textColor: "text-yellow-700",
          badgeBg: "bg-yellow-600 text-white"
        };
      default: // suggestion
        return {
          icon: Lightbulb,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-300",
          textColor: "text-blue-700",
          badgeBg: "bg-blue-600 text-white"
        };
    }
  };

  // Urgency label
  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "now": return "Urgent - Act Now";
      case "3_days": return "Address in 3 days";
      case "7_days": return "Address in 7 days";
      default: return "Review when possible";
    }
  };

  // Empty state
  if (!loading && insights.length === 0) {
    return (
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-blue-200">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg mb-2">All Clear!</h3>
          <p className="text-sm text-gray-600 max-w-md">
            No critical issues detected. Your event is running smoothly. AI monitoring is active and will alert you of any risks.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-t-4 border-t-blue-500">
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-6 h-6 text-blue-600" />
          </motion.div>
          <div>
            <h2 className="text-xl">AI Insights & Recommendations</h2>
            <p className="text-xs text-gray-500">
              Powered by Gemini {lastUpdated && `• Updated ${lastUpdated.toLocaleTimeString()}`}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="w-20 h-6 bg-gray-200 rounded mb-4" />
              <div className="w-full h-8 bg-gray-200 rounded mb-2" />
              <div className="w-full h-4 bg-gray-200 rounded mb-2" />
              <div className="w-3/4 h-4 bg-gray-200 rounded" />
            </Card>
          ))}
        </div>
      )}

      {/* Insights Grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => {
            const config = getSeverityConfig(insight.severity);
            const Icon = config.icon;
            const isExpanded = expandedInsights.has(insight.id);

            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`p-6 border-l-4 ${config.borderColor} ${config.bgColor} hover:shadow-lg transition-shadow`}
                >
                  {/* Top Section */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${config.iconColor}`} />
                      <Badge className={config.badgeBg}>
                        {insight.severity.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Dismiss Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 -mt-2 -mr-2"
                      onClick={() => onDismiss?.(insight.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base mb-2 ${config.textColor} line-clamp-2`}>
                    {insight.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm text-gray-700 mb-4 ${isExpanded ? '' : 'line-clamp-3'}`}>
                    {insight.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                    <Badge variant="outline" className="text-xs">
                      Impact: {insight.impact}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getUrgencyLabel(insight.urgency)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Risk: {insight.riskScore}/100
                    </Badge>
                  </div>

                  {/* Recommended Actions (Expandable) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-300 pt-4 mb-4">
                          <h4 className="text-xs uppercase tracking-wide text-gray-600 mb-2">
                            Recommended Actions:
                          </h4>
                          <ul className="space-y-2">
                            {insight.recommendedActions.map((action, i) => (
                              <li 
                                key={i}
                                className="text-sm text-gray-700 flex items-start gap-2 cursor-pointer hover:text-blue-600"
                                onClick={() => onActionClick?.(insight.id, action)}
                              >
                                <span className="text-blue-600 shrink-0">•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Primary CTA Button */}
                  <Button
                    variant={insight.severity === "critical" ? "default" : "outline"}
                    className={`w-full ${insight.severity === "critical" ? 'bg-red-600 hover:bg-red-700' : ''}`}
                    onClick={() => toggleExpand(insight.id)}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        View Recommendations
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
