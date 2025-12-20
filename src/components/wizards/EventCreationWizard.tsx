/**
 * Event Creation Wizard - Complete Implementation
 * 
 * Multi-step wizard for creating events with AI-powered assistance.
 * Integrates form validation, AI analysis, and realtime feedback.
 * 
 * Features:
 * - 4-step wizard flow
 * - Form validation with Zod
 * - AI task generation
 * - Risk analysis
 * - Success confirmation
 * - Mobile responsive
 * 
 * Usage:
 * ```tsx
 * <EventCreationWizard
 *   onComplete={(event) => navigate('/events/' + event.id)}
 *   onCancel={() => navigate('/events')}
 * />
 * ```
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Users, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useEventForm } from '../../lib/hooks/useFormValidation';
import { aiOrchestrator } from '../../lib/ai/workflows/AIOrchestrator';
import { AIResultsPanel } from '../ai/AIResultsPanel';
import { EventCreatedSuccess } from '../shared/SuccessScreen';
import { LoadingSkeleton } from '../shared/LoadingSkeleton';

// ============================================================================
// TYPES
// ============================================================================

export interface EventCreationWizardProps {
  onComplete: (event: any) => void;
  onCancel: () => void;
}

interface WizardStep {
  id: number;
  title: string;
  description: string;
}

const WIZARD_STEPS: WizardStep[] = [
  { id: 1, title: 'Basic Details', description: 'Event name, type, and date' },
  { id: 2, title: 'Venue & Logistics', description: 'Location and capacity' },
  { id: 3, title: 'Budget & Goals', description: 'Financial planning' },
  { id: 4, title: 'Review & AI Analysis', description: 'Confirm and generate plan' },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function EventCreationWizard({ onComplete, onCancel }: EventCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { form, onSubmit, isSubmitting } = useEventForm({
    onSuccess: async (data) => {
      // Run AI analysis
      setIsAnalyzing(true);
      try {
        const result = await aiOrchestrator.runEventCreationWorkflow({
          name: data.name,
          type: data.type,
          date: data.date || new Date().toISOString(),
          venue: data.venue,
          budget_total: data.budget_total,
          attendee_target: data.attendee_target,
        });

        setAiAnalysis(result.data);
        setIsAnalyzing(false);
        setShowSuccess(true);

        // Auto-complete after 3 seconds
        setTimeout(() => {
          onComplete(result.data?.event);
        }, 3000);
      } catch (error) {
        console.error('AI analysis failed:', error);
        setIsAnalyzing(false);
        // Still allow completion
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

  // Show success screen
  if (showSuccess && aiAnalysis) {
    return (
      <EventCreatedSuccess
        eventName={form.getValues('name')}
        tasksGenerated={aiAnalysis.tasks?.length || 0}
        onViewEvent={() => onComplete(aiAnalysis.event)}
        onCreateAnother={() => {
          setShowSuccess(false);
          setCurrentStep(1);
          form.reset();
        }}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {WIZARD_STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                    ${currentStep >= step.id
                      ? 'bg-[#111111] text-white'
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {step.id}
                </div>
                <div className="text-xs text-gray-600 mt-2 text-center max-w-[100px]">
                  {step.title}
                </div>
              </div>
              {index < WIZARD_STEPS.length - 1 && (
                <div
                  className={`
                    flex-1 h-1 mx-2 rounded
                    ${currentStep > step.id ? 'bg-[#111111]' : 'bg-gray-200'}
                  `}
                />
              )}
            </React.Fragment>
          ))}
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
          <form className="bg-white rounded-lg border border-gray-200 p-8">
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-gray-900 mb-2">Basic Event Details</h2>
                  <p className="text-sm text-gray-600">Let's start with the essentials</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Name *
                  </label>
                  <Input
                    {...form.register('name')}
                    placeholder="e.g., NYFW SS26 Emerging Designers Showcase"
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
                    Event Type *
                  </label>
                  <Select
                    onValueChange={(value) => form.setValue('type', value as any)}
                    defaultValue={form.getValues('type')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="runway_show">Runway Show</SelectItem>
                      <SelectItem value="photoshoot">Photoshoot</SelectItem>
                      <SelectItem value="popup">Pop-up Event</SelectItem>
                      <SelectItem value="activation">Brand Activation</SelectItem>
                      <SelectItem value="campaign">Campaign Launch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <Input
                    {...form.register('date')}
                    type="date"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    {...form.register('description')}
                    placeholder="Brief description of your event..."
                    rows={4}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Venue & Logistics */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-gray-900 mb-2">Venue & Logistics</h2>
                  <p className="text-sm text-gray-600">Where and how many people?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Venue / Location
                  </label>
                  <Input
                    {...form.register('venue')}
                    placeholder="e.g., Skylight Modern, New York"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Target Attendees
                  </label>
                  <Input
                    {...form.register('attendee_target', { valueAsNumber: true })}
                    type="number"
                    placeholder="e.g., 300"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Estimated number of guests/attendees
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Duration (hours)
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 3"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Budget & Goals */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-gray-900 mb-2">Budget & Goals</h2>
                  <p className="text-sm text-gray-600">Financial planning and objectives</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Total Budget
                  </label>
                  <Input
                    {...form.register('budget_total', { valueAsNumber: true })}
                    type="number"
                    placeholder="e.g., 50000"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    AI will help allocate budget across categories
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Goal
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="awareness">Brand Awareness</SelectItem>
                      <SelectItem value="sales">Drive Sales</SelectItem>
                      <SelectItem value="engagement">Community Engagement</SelectItem>
                      <SelectItem value="launch">Product Launch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Review & AI Analysis */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-gray-900 mb-2">Review & Confirm</h2>
                  <p className="text-sm text-gray-600">
                    AI will generate tasks, analyze risks, and create your event plan
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Event Name</div>
                    <div className="font-medium text-gray-900">{form.watch('name') || 'Not specified'}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Type</div>
                      <div className="text-sm text-gray-900 capitalize">
                        {form.watch('type')?.replace('_', ' ') || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date</div>
                      <div className="text-sm text-gray-900">
                        {form.watch('date') ? new Date(form.watch('date')).toLocaleDateString() : 'Not specified'}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Venue</div>
                      <div className="text-sm text-gray-900">{form.watch('venue') || 'TBD'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Budget</div>
                      <div className="text-sm text-gray-900">
                        {form.watch('budget_total') ? `$${form.watch('budget_total').toLocaleString()}` : 'Not specified'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Analysis Results */}
                {isAnalyzing && (
                  <LoadingSkeleton variant="card" count={1} />
                )}

                {aiAnalysis && !isAnalyzing && (
                  <AIResultsPanel
                    type="event-analysis"
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
                    className="bg-[#111111] hover:bg-black text-white"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Create Event'}
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
