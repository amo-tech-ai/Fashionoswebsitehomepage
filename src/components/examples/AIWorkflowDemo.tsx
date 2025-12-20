/**
 * AI Workflow Demo
 * 
 * Complete working demo of all AI features with real-world examples.
 * Demonstrates end-to-end workflows for:
 * - Event creation with AI analysis
 * - Brand shoot planning
 * - Designer matching
 * 
 * Usage:
 * ```tsx
 * <AIWorkflowDemo />
 * ```
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Camera, Users, Play, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { aiOrchestrator } from '../../lib/ai/workflows/AIOrchestrator';
import { AIResultsPanel } from '../ai/AIResultsPanel';
import { LoadingSkeleton } from '../shared/LoadingSkeleton';

export function AIWorkflowDemo() {
  const [activeDemo, setActiveDemo] = useState<'event' | 'brand' | 'designer' | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runEventDemo = async () => {
    setActiveDemo('event');
    setLoading(true);
    setResult(null);

    try {
      const demoEvent = {
        name: 'NYFW SS26 Emerging Designers Showcase',
        type: 'runway_show',
        date: '2026-09-15',
        venue: 'Skylight Modern, New York',
        budget_total: 75000,
        attendee_target: 300,
      };

      const analysisResult = await aiOrchestrator.runEventCreationWorkflow(demoEvent);
      setResult(analysisResult.data);
    } catch (error) {
      console.error('Demo failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const runBrandDemo = async () => {
    setActiveDemo('brand');
    setLoading(true);
    setResult(null);

    try {
      const demoBrand = {
        website: 'https://www.everlane.com',
        instagram: '@everlane',
        commerce: 'https://www.everlane.com/shop',
        budget: 25000,
      };

      const analysisResult = await aiOrchestrator.runBrandShootWorkflow(demoBrand);
      setResult(analysisResult.data);
    } catch (error) {
      console.error('Demo failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const runDesignerDemo = async () => {
    setActiveDemo('designer');
    setLoading(true);
    setResult(null);

    try {
      const demoDesigner = {
        name: 'Sarah Chen',
        brand_name: 'CHEN Studio',
        specialty: 'Sustainable Womenswear',
        style_keywords: ['minimalist', 'sustainable', 'contemporary'],
        years_experience: 5,
        price_range: '$1500-$4000',
        instagram: '@chenstudio',
        website: 'https://chenstudio.com',
      };

      const analysisResult = await aiOrchestrator.runDesignerMatchingWorkflow(demoDesigner);
      setResult(analysisResult.data);
    } catch (error) {
      console.error('Demo failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetDemo = () => {
    setActiveDemo(null);
    setResult(null);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Sparkles className="w-8 h-8 text-purple-600" />
          <h1 className="font-serif text-4xl text-gray-900">AI Workflows Demo</h1>
        </motion.div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience FashionOS's AI-powered intelligence. See how Gemini AI analyzes events,
          plans campaigns, and matches designers in real-time.
        </p>
      </div>

      {/* Demo Selection */}
      {!activeDemo && (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <DemoCard
            icon={<Calendar className="w-8 h-8" />}
            title="Event Creation AI"
            description="Generate task plans, analyze risks, and calculate health scores automatically"
            features={[
              '25+ tasks generated',
              'Risk analysis',
              'Health scoring',
              'Budget optimization',
            ]}
            onRun={runEventDemo}
            color="purple"
          />

          <DemoCard
            icon={<Camera className="w-8 h-8" />}
            title="Brand Shoot Planner"
            description="Analyze brand signals and create intelligent campaign strategies"
            features={[
              'Brand voice analysis',
              'Asset recommendations',
              'Channel strategy',
              'Pricing calculator',
            ]}
            onRun={runBrandDemo}
            color="blue"
          />

          <DemoCard
            icon={<Users className="w-8 h-8" />}
            title="Designer Matching"
            description="Match designers with perfect event opportunities using AI scoring"
            features={[
              'Fit score calculation',
              'Portfolio analysis',
              'Career recommendations',
              'Opportunity ranking',
            ]}
            onRun={runDesignerDemo}
            color="green"
          />
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <LoadingSkeleton variant="card" count={1} />
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              🤖 Gemini AI is analyzing your data...
            </p>
          </div>
        </motion.div>
      )}

      {/* Results */}
      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AIResultsPanel
            type={
              activeDemo === 'event' ? 'event-analysis' :
              activeDemo === 'brand' ? 'brand-analysis' :
              'designer-match'
            }
            data={result}
            onAction={(action, data) => {
              console.log('Demo action:', action, data);
              alert(`Action: ${action}\n\nThis would navigate to the appropriate screen in production.`);
            }}
          />

          <div className="flex justify-center mt-8">
            <Button
              onClick={resetDemo}
              variant="outline"
              className="rounded-lg"
            >
              Try Another Demo
            </Button>
          </div>
        </motion.div>
      )}

      {/* Feature Highlights */}
      {!activeDemo && !loading && (
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
          <h2 className="font-serif text-2xl text-gray-900 text-center mb-6">
            Powered by Google Gemini AI
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <FeatureHighlight
              icon={<Sparkles className="w-6 h-6 text-purple-600" />}
              title="Intelligent Analysis"
              description="Deep learning models analyze patterns and provide insights"
            />
            <FeatureHighlight
              icon={<CheckCircle className="w-6 h-6 text-green-600" />}
              title="Actionable Results"
              description="Get specific recommendations you can implement immediately"
            />
            <FeatureHighlight
              icon={<Calendar className="w-6 h-6 text-blue-600" />}
              title="Time-Saving"
              description="What takes hours manually happens in seconds with AI"
            />
            <FeatureHighlight
              icon={<Users className="w-6 h-6 text-orange-600" />}
              title="Personalized"
              description="Results tailored to your specific context and goals"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// DEMO CARD COMPONENT
// ============================================================================

function DemoCard({
  icon,
  title,
  description,
  features,
  onRun,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  onRun: () => void;
  color: 'purple' | 'blue' | 'green';
}) {
  const colorClasses = {
    purple: 'bg-purple-50 border-purple-200 hover:border-purple-300',
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-300',
    green: 'bg-green-50 border-green-200 hover:border-green-300',
  };

  const iconColorClasses = {
    purple: 'text-purple-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`border rounded-xl p-6 transition-all ${colorClasses[color]}`}
    >
      <div className={`mb-4 ${iconColorClasses[color]}`}>{icon}</div>
      <h3 className="font-serif text-xl text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <ul className="space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        onClick={onRun}
        className="w-full bg-[#111111] hover:bg-black text-white flex items-center justify-center gap-2"
      >
        <Play className="w-4 h-4" />
        Run Demo
      </Button>
    </motion.div>
  );
}

// ============================================================================
// FEATURE HIGHLIGHT COMPONENT
// ============================================================================

function FeatureHighlight({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
