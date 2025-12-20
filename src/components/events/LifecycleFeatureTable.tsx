import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Sparkles, Trophy, Target, Brain, ShieldCheck } from "lucide-react";

interface Feature {
  rank: number;
  feature: string;
  phase: string;
  unlocks: string;
  score: number;
}

const TIER_1_FEATURES: Feature[] = [
  { rank: 1, feature: "Digital Trunk (Sample Tracking)", phase: "Pre-Prod → Show Day", unlocks: "Prevents catastrophic sample loss", score: 98 },
  { rank: 2, feature: "AI Budget & Risk Orchestrator", phase: "Concept → Pre-Prod", unlocks: "Predicts true cost + budget leakage", score: 97 },
  { rank: 3, feature: "Run of Show (Live) + Cue Sheets", phase: "Show Day", unlocks: "Converts creative vision into reality", score: 96 },
  { rank: 4, feature: "Front Row View (Client Portal)", phase: "All Phases", unlocks: "Stakeholder confidence without chaos", score: 95 },
  { rank: 5, feature: "Backstage Cue Sheet Generator (AI)", phase: "Show Day", unlocks: "Automated technical cues", score: 95 },
];

const TIER_2_FEATURES: Feature[] = [
  { rank: 6, feature: "Autonomous Seating Optimizer (AI)", phase: "Runway / Press", unlocks: "Strategic relationship placement", score: 94 },
  { rank: 7, feature: "Critical Path AI Scanner", phase: "Pre-Prod → Show", unlocks: "Prevents silent blockers", score: 93 },
  { rank: 8, feature: "Dynamic Call Sheets (Live)", phase: "Show Day", unlocks: "Zero stale PDFs, instant sync", score: 93 },
  { rank: 9, feature: "EPK Architect (Press Kit AI)", phase: "Runway → PR", unlocks: "Instant, high-end media packages", score: 92 },
  { rank: 10, feature: "Asset-First Task Cards", phase: "Design → Production", unlocks: "Tasks grounded in physical looks", score: 91 },
  { rank: 11, feature: "Staffing Gap Detector (AI)", phase: "Pre-Prod / Ops", unlocks: "Prevents safety & ops failures", score: 90 },
];

const TIER_3_FEATURES: Feature[] = [
  { rank: 12, feature: "Wholesale Buy-Sheet Architect (AI)", phase: "Post-Runway → Retail", unlocks: "Runway moments → sellable product", score: 90 },
  { rank: 13, feature: "Butterfly Effect Simulator", phase: "All Phases", unlocks: "Predicts cascading failures", score: 89 },
  { rank: 14, feature: "ESG & Sustainability Auditor", phase: "Design → Retail", unlocks: "Compliance + brand trust", score: 88 },
  { rank: 15, feature: "Sponsor Activation Tracker", phase: "Pre-Runway → Post", unlocks: "Revenue protection", score: 88 },
  { rank: 16, feature: "Legal Talent Shield (AI)", phase: "Legal / Rights", unlocks: "Prevents global usage disputes", score: 87 },
  { rank: 17, feature: "Visual DAM (Collection Detail)", phase: "Design / Studio", unlocks: "Autonomous digital assets", score: 87 },
];

const TIER_4_FEATURES: Feature[] = [
  { rank: 18, feature: "Social Narrative Weaver (AI)", phase: "Marketing / PR", unlocks: "Platform-native storytelling", score: 86 },
  { rank: 19, feature: "Visual Casting Director (AI)", phase: "Casting", unlocks: "Better talent fit, faster", score: 85 },
  { rank: 20, feature: "Scenario Simulator (“What If?”)", phase: "Ops / Risk", unlocks: "Contingency planning", score: 84 },
];

export function LifecycleFeatureTable() {
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-3xl font-serif font-medium text-gray-900">Lifecycle Intelligence Roadmap</h2>
        <p className="text-gray-500 max-w-2xl">
          A strategic ranking of high-leverage features transforming FashionOS into a complete lifecycle command center.
          Scored by Gemini 3 based on fashion-specific differentiation and business impact.
        </p>
      </div>

      {/* Tier 1 */}
      <Card className="border-l-4 border-l-amber-400 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <CardTitle>Tier 1 — Strategic, Platform-Defining</CardTitle>
              <CardDescription>Immediate, critical pain-point solvers. The "Command Center" core.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FeatureTable features={TIER_1_FEATURES} />
        </CardContent>
      </Card>

      {/* Tier 2 */}
      <Card className="border-l-4 border-l-indigo-400 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <CardTitle>Tier 2 — High-Impact Lifecycle Intelligence</CardTitle>
              <CardDescription>AI-leveraged operations optimization and silent failure prevention.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FeatureTable features={TIER_2_FEATURES} />
        </CardContent>
      </Card>

      {/* Tier 3 */}
      <Card className="border-l-4 border-l-emerald-400 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <CardTitle>Tier 3 — Commercial & Brand Multipliers</CardTitle>
              <CardDescription>Bridging the gap between the runway event and retail business impact.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FeatureTable features={TIER_3_FEATURES} />
        </CardContent>
      </Card>

      {/* Tier 4 */}
      <Card className="border-l-4 border-l-rose-400 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <CardTitle>Tier 4 — Marketing, Narrative & Growth</CardTitle>
              <CardDescription>Enhancing storytelling, growth, and scenario planning.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FeatureTable features={TIER_4_FEATURES} />
        </CardContent>
      </Card>

       {/* Competitive Landscape */}
       <div className="mt-12">
        <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gray-500" />
            Competitive Landscape
        </h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50/50">
                        <TableHead>Platform</TableHead>
                        <TableHead>Lifecycle Coverage</TableHead>
                        <TableHead>AI Depth</TableHead>
                        <TableHead>Fashion-Native</TableHead>
                        <TableHead>Calm Luxury</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium text-gray-600">Asana</TableCell>
                        <TableCell>Tasks only</TableCell>
                        <TableCell>Low</TableCell>
                        <TableCell>❌</TableCell>
                        <TableCell>❌</TableCell>
                        <TableCell className="text-right font-mono text-gray-500">45</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium text-gray-600">Monday</TableCell>
                        <TableCell>Tasks + views</TableCell>
                        <TableCell>Low</TableCell>
                        <TableCell>❌</TableCell>
                        <TableCell>❌</TableCell>
                        <TableCell className="text-right font-mono text-gray-500">48</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium text-gray-600">Notion</TableCell>
                        <TableCell>Docs + manual</TableCell>
                        <TableCell>Medium</TableCell>
                        <TableCell>❌</TableCell>
                        <TableCell>⚠️</TableCell>
                        <TableCell className="text-right font-mono text-gray-500">55</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-medium text-gray-600">Airtable</TableCell>
                        <TableCell>Data-centric</TableCell>
                        <TableCell>Medium</TableCell>
                        <TableCell>❌</TableCell>
                        <TableCell>❌</TableCell>
                        <TableCell className="text-right font-mono text-gray-500">58</TableCell>
                    </TableRow>
                     <TableRow className="bg-indigo-50/30 hover:bg-indigo-50/50">
                        <TableCell className="font-bold text-indigo-900">FashionOS</TableCell>
                        <TableCell className="text-indigo-700 font-medium">Concept → Retail</TableCell>
                        <TableCell className="text-indigo-700 font-medium">Gemini 3 Deep</TableCell>
                        <TableCell>✅ Yes</TableCell>
                        <TableCell>✅ Yes</TableCell>
                        <TableCell className="text-right font-mono font-bold text-indigo-600 text-lg">94</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
}

function FeatureTable({ features }: { features: Feature[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Rank</TableHead>
          <TableHead className="w-[300px]">Feature</TableHead>
          <TableHead>Lifecycle Phase</TableHead>
          <TableHead>What It Unlocks</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map((item) => (
          <TableRow key={item.rank}>
            <TableCell className="font-medium text-gray-500">#{item.rank}</TableCell>
            <TableCell className="font-semibold text-gray-900">{item.feature}</TableCell>
            <TableCell>
                <Badge variant="outline" className="font-normal bg-gray-50 text-gray-600 border-gray-200">
                    {item.phase}
                </Badge>
            </TableCell>
            <TableCell className="text-gray-600">{item.unlocks}</TableCell>
            <TableCell className="text-right">
              <Badge 
                variant="secondary" 
                className={`font-mono font-medium ${
                    item.score >= 95 ? 'bg-indigo-100 text-indigo-700' :
                    item.score >= 90 ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                }`}
              >
                {item.score}/100
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
