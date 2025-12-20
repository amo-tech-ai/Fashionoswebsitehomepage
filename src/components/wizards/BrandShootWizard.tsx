/**
 * Brand Shoot Wizard - Complete Implementation
 * 
 * Multi-step wizard for planning brand photoshoot campaigns.
 * Integrates AI brand analysis, asset planning, and pricing.
 * 
 * Features:
 * - 5-step wizard flow
 * - AI brand signal analysis
 * - Asset recommendations
 * - Pricing calculator
 * - Campaign proposal generation
 * - Mobile responsive
 * 
 * Flow:
 * 1. Brand Discovery (URLs, social media)
 * 2. Campaign Goals (objectives, target audience)
 * 3. Asset Requirements (types, quantities)
 * 4. Budget & Timeline (investment, deadlines)
 * 5. AI Analysis & Proposal (review and generate)
 * 
 * Usage:
 * ```tsx
 * <BrandShootWizard
 *   onComplete={(campaign) => navigate('/campaigns/' + campaign.id)}
 *   onCancel={() => navigate('/campaigns')}
 * />
 * ```
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Instagram, 
  ShoppingBag, 
  Target, 
  Calendar,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Camera,
  Sparkles,
  CheckCircle,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { useBrandShootForm } from '../../lib/hooks/useFormValidation';
import { aiOrchestrator } from '../../lib/ai/workflows/AIOrchestrator';
import { AIResultsPanel } from '../ai/AIResultsPanel';
import { CampaignCreatedSuccess } from '../shared/SuccessScreen';
import { LoadingSkeleton } from '../shared/LoadingSkeleton';
import { FileUpload } from '../shared/UploadStates';
import { ImageLightbox, type LightboxImage } from '../shared/ImageLightbox';
import { uploadFile } from '../../lib/supabase/storage';
import { saveFileMetadata, addBrandShootFile } from '../../lib/supabase/fileQueries';

// ============================================================================
// TYPES
// ============================================================================

export interface BrandShootWizardProps {
  onComplete: (campaign: any) => void;
  onCancel: () => void;
}

interface WizardStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const WIZARD_STEPS: WizardStep[] = [
  { 
    id: 1, 
    title: 'Brand Discovery', 
    description: 'Tell us about your brand',
    icon: <Globe className="w-5 h-5" />,
  },
  { 
    id: 2, 
    title: 'Campaign Goals', 
    description: 'Define your objectives',
    icon: <Target className="w-5 h-5" />,
  },
  { 
    id: 3, 
    title: 'Asset Planning', 
    description: 'What you need to create',
    icon: <Camera className="w-5 h-5" />,
  },
  { 
    id: 4, 
    title: 'Budget & Timeline', 
    description: 'Investment and deadlines',
    icon: <DollarSign className="w-5 h-5" />,
  },
  { 
    id: 5, 
    title: 'AI Analysis', 
    description: 'Review & generate proposal',
    icon: <Sparkles className="w-5 h-5" />,
  },
];

const ASSET_TYPES = [
  { value: 'hero_shots', label: 'Hero Shots', description: 'Main product/brand imagery' },
  { value: 'lifestyle', label: 'Lifestyle Photos', description: 'Products in use' },
  { value: 'detail_shots', label: 'Detail Shots', description: 'Close-up features' },
  { value: 'flat_lays', label: 'Flat Lays', description: 'Styled arrangements' },
  { value: 'model_shots', label: 'Model Shots', description: 'On-person imagery' },
  { value: 'video_content', label: 'Video Content', description: 'Short-form videos' },
  { value: 'behind_scenes', label: 'Behind the Scenes', description: 'Process content' },
  { value: 'ugc_style', label: 'UGC Style', description: 'User-generated style' },
];

const CAMPAIGN_GOALS = [
  { value: 'product_launch', label: 'Product Launch', icon: '🚀' },
  { value: 'brand_awareness', label: 'Brand Awareness', icon: '📢' },
  { value: 'social_content', label: 'Social Content', icon: '📱' },
  { value: 'ecommerce', label: 'E-commerce Assets', icon: '🛍️' },
  { value: 'rebrand', label: 'Rebrand/Refresh', icon: '✨' },
  { value: 'seasonal', label: 'Seasonal Campaign', icon: '🗓️' },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function BrandShootWizard({ onComplete, onCancel }: BrandShootWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<LightboxImage[]>([]);

  const { form, onSubmit, isSubmitting } = useBrandShootForm({
    onSuccess: async (data) => {
      // Run AI analysis
      setIsAnalyzing(true);
      try {
        const result = await aiOrchestrator.runBrandShootWorkflow({
          website: data.website,
          instagram: data.instagram,
          commerce: data.commerce,
          budget: data.budget,
        });

        setAiAnalysis(result.data);
        setIsAnalyzing(false);
        setShowSuccess(true);

        // Auto-complete after 3 seconds
        setTimeout(() => {
          onComplete(result.data);
        }, 3000);
      } catch (error) {
        console.error('AI analysis failed:', error);
        setIsAnalyzing(false);
        onComplete(data);
      }
    },
  });

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    form.handleSubmit(onSubmit)();
  };

  const toggleAsset = (assetType: string) => {
    setSelectedAssets(prev =>
      prev.includes(assetType)
        ? prev.filter(a => a !== assetType)
        : [...prev, assetType]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleFileUpload = async (file: File) => {
    const uploadResult = await uploadFile(file);
    if (uploadResult) {
      const metadata = await saveFileMetadata(uploadResult);
      if (metadata) {
        const fileData = await addBrandShootFile(metadata);
        if (fileData) {
          setUploadedFiles(prev => [...prev, {
            id: fileData.id,
            url: fileData.url,
            name: fileData.name,
            type: fileData.type,
          }]);
        }
      }
    }
  };

  // Show success screen
  if (showSuccess && aiAnalysis) {
    return (
      <CampaignCreatedSuccess
        campaignName={form.getValues('name') || 'Brand Shoot Campaign'}
        assetsPlanned={aiAnalysis.asset_plan?.reduce((sum: number, a: any) => sum + a.count, 0) || 0}
        onViewCampaign={() => onComplete(aiAnalysis)}
        onCreateAnother={() => {
          setShowSuccess(false);
          setCurrentStep(1);
          form.reset();
        }}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {WIZARD_STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-medium
                    transition-all duration-300
                    ${currentStep >= step.id
                      ? 'bg-[#111111] text-white scale-110'
                      : 'bg-gray-200 text-gray-500 scale-100'
                    }
                  `}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="text-xs text-gray-600 mt-2 text-center max-w-[80px] hidden md:block">
                  {step.title}
                </div>
              </div>
              {index < WIZARD_STEPS.length - 1 && (
                <div
                  className={`
                    flex-1 h-1 mx-2 rounded transition-all duration-500
                    ${currentStep > step.id ? 'bg-[#111111]' : 'bg-gray-200'}
                  `}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Mobile Step Title */}
        <div className="text-center md:hidden">
          <h3 className="font-medium text-gray-900">{WIZARD_STEPS[currentStep - 1].title}</h3>
          <p className="text-sm text-gray-500">{WIZARD_STEPS[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <form className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
            {/* Step 1: Brand Discovery */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-gray-900 mb-2">Brand Discovery</h2>
                  <p className="text-sm text-gray-600">
                    Share your brand's digital presence so our AI can understand your aesthetic and voice
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Name *
                  </label>
                  <Input
                    {...form.register('name')}
                    placeholder="e.g., Spring 2025 Collection Launch"
                    className="w-full"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Brand Website
                  </label>
                  <Input
                    {...form.register('website')}
                    type="url"
                    placeholder="https://yourbrand.com"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    AI will analyze your brand voice and aesthetic
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Instagram className="w-4 h-4 inline mr-2" />
                    Instagram Handle
                  </label>
                  <Input
                    {...form.register('instagram')}
                    placeholder="@yourbrand"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Helps us understand your visual style
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ShoppingBag className="w-4 h-4 inline mr-2" />
                    E-commerce Store (Optional)
                  </label>
                  <Input
                    {...form.register('commerce')}
                    type="url"
                    placeholder="https://shop.yourbrand.com"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Shopify, WooCommerce, or custom store
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Brand Assets (Optional)
                  </label>
                  <FileUpload
                    onUpload={handleFileUpload}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Brand logos, images, or other relevant files
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
                    <ImageLightbox
                      images={uploadedFiles}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Campaign Goals */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-gray-900 mb-2">Campaign Goals</h2>
                  <p className="text-sm text-gray-600">
                    What do you want to achieve with this photoshoot?
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Primary Goals (Choose 1-3)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {CAMPAIGN_GOALS.map((goal) => (
                      <div
                        key={goal.value}
                        onClick={() => toggleGoal(goal.value)}
                        className={`
                          p-4 border-2 rounded-lg cursor-pointer transition-all
                          ${selectedGoals.includes(goal.value)
                            ? 'border-[#111111] bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{goal.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{goal.label}</div>
                          </div>
                          {selectedGoals.includes(goal.value) && (
                            <CheckCircle className="w-5 h-5 text-[#111111]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <Textarea
                    placeholder="e.g., Women 25-40, fashion-conscious, values sustainability..."
                    rows={3}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Message
                  </label>
                  <Input
                    placeholder="e.g., Sustainable luxury for modern living"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Asset Planning */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-gray-900 mb-2">Asset Planning</h2>
                  <p className="text-sm text-gray-600">
                    What types of content do you need?
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Asset Types (Choose all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ASSET_TYPES.map((asset) => (
                      <div
                        key={asset.value}
                        onClick={() => toggleAsset(asset.value)}
                        className={`
                          p-4 border-2 rounded-lg cursor-pointer transition-all
                          ${selectedAssets.includes(asset.value)
                            ? 'border-[#111111] bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedAssets.includes(asset.value)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{asset.label}</div>
                            <div className="text-sm text-gray-500">{asset.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Quantity
                    </label>
                    <Input
                      type="number"
                      placeholder="50"
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Total assets needed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Products to Feature
                    </label>
                    <Input
                      type="number"
                      placeholder="10"
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Number of products</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Budget & Timeline */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-gray-900 mb-2">Budget & Timeline</h2>
                  <p className="text-sm text-gray-600">
                    Let's plan your investment and schedule
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Total Budget
                  </label>
                  <Input
                    {...form.register('budget', { valueAsNumber: true })}
                    type="number"
                    placeholder="25000"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    AI will optimize allocation across production, talent, and post-production
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Flexibility
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flexibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strict">Strict - Cannot exceed</SelectItem>
                      <SelectItem value="flexible_10">Flexible - Up to 10% over</SelectItem>
                      <SelectItem value="flexible_20">Very Flexible - Up to 20% over</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Preferred Shoot Date
                    </label>
                    <Input
                      type="date"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Final Assets Needed By
                    </label>
                    <Input
                      type="date"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline Urgency
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (4-6 weeks)</SelectItem>
                      <SelectItem value="rush">Rush (2-3 weeks)</SelectItem>
                      <SelectItem value="urgent">Urgent (1 week) +20% cost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 5: AI Analysis & Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-gray-900 mb-2">Review & Generate Proposal</h2>
                  <p className="text-sm text-gray-600">
                    AI will analyze your brand and create a custom campaign proposal
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 space-y-4">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Campaign</div>
                    <div className="font-medium text-gray-900">{form.watch('name') || 'Unnamed Campaign'}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Goals</div>
                      <div className="text-sm text-gray-900">{selectedGoals.length} selected</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Assets</div>
                      <div className="text-sm text-gray-900">{selectedAssets.length} types</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Budget</div>
                      <div className="text-sm text-gray-900">
                        {form.watch('budget') ? `$${form.watch('budget').toLocaleString()}` : 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Brand URL</div>
                      <div className="text-sm text-gray-900 truncate">
                        {form.watch('website') || 'Not provided'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Analysis Results */}
                {isAnalyzing && (
                  <div className="space-y-4">
                    <LoadingSkeleton variant="card" count={1} />
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        🤖 AI is analyzing your brand and generating recommendations...
                      </p>
                    </div>
                  </div>
                )}

                {aiAnalysis && !isAnalyzing && (
                  <AIResultsPanel
                    type="brand-analysis"
                    data={aiAnalysis}
                    onAction={(action, data) => {
                      console.log('AI Action:', action, data);
                    }}
                  />
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <div>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                >
                  Cancel
                </Button>

                {currentStep < WIZARD_STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#111111] hover:bg-black text-white flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleFinish}
                    disabled={isSubmitting || isAnalyzing}
                    className="bg-[#111111] hover:bg-black text-white flex items-center gap-2"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Generate Proposal'}
                    <Sparkles className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}