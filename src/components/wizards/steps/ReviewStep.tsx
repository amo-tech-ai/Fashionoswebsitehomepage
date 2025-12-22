/**
 * Review Step — Final review and confirmation
 */

import { useForm } from "react-hook-form@7.55.0";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ReviewOptionsSchema,
  type ReviewOptions,
  type CreateEventRequest,
  formatBudget,
  calculateDaysUntilEvent,
} from "@/lib/validation/event-schemas";

interface ReviewStepProps {
  data: Partial<CreateEventRequest>;
  onComplete: (data: ReviewOptions) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export function ReviewStep({ data, onComplete, onPrevious, isSubmitting }: ReviewStepProps) {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ReviewOptions>({
    resolver: zodResolver(ReviewOptionsSchema),
    defaultValues: {
      generate_tasks_with_ai: true,
      terms_accepted: false,
    },
  });

  const generateWithAI = watch("generate_tasks_with_ai");
  const termsAccepted = watch("terms_accepted");

  const daysUntilEvent = data.event_date ? calculateDaysUntilEvent(data.event_date) : 0;

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      
      {/* Event Summary */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-lg">Event Summary</h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Event Name</p>
            <p className="font-medium">{data.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Event Type</p>
            <p className="font-medium capitalize">{data.event_type?.replace("_", " ")}</p>
          </div>
          <div>
            <p className="text-gray-500">Event Date</p>
            <p className="font-medium">{data.event_date} ({daysUntilEvent} days from now)</p>
          </div>
          <div>
            <p className="text-gray-500">Venue</p>
            <p className="font-medium">{data.venue || "TBD"}</p>
          </div>
          <div>
            <p className="text-gray-500">Expected Attendance</p>
            <p className="font-medium">{data.expected_attendance?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Budget</p>
            <p className="font-medium">{data.budget ? formatBudget(data.budget) : "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Models</p>
            <p className="font-medium">{data.number_of_models || 0}</p>
          </div>
          <div>
            <p className="text-gray-500">Deliverables</p>
            <div className="flex flex-wrap gap-1">
              {data.photography && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Photo</span>}
              {data.videography && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Video</span>}
              {data.live_streaming && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Live</span>}
              {data.social_media_content && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Social</span>}
            </div>
          </div>
        </div>
      </div>

      {/* AI Generation Option */}
      <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50">
        <div className="flex items-start gap-3">
          <Checkbox
            id="generate_tasks_with_ai"
            checked={generateWithAI}
            onCheckedChange={(checked) => setValue("generate_tasks_with_ai", !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="generate_tasks_with_ai" className="cursor-pointer flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="font-medium">Generate tasks automatically with AI</span>
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              {generateWithAI ? (
                <>
                  AI will analyze your event and generate a comprehensive task list (~120-150 tasks) 
                  across all 14 event phases. Estimated time: 10-15 seconds. Cost: ~$0.05.
                </>
              ) : (
                <>
                  You can add tasks manually after event creation, or enable AI generation later.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Terms Acceptance */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms_accepted"
          checked={termsAccepted}
          onCheckedChange={(checked) => setValue("terms_accepted", !!checked)}
        />
        <div className="flex-1">
          <Label htmlFor="terms_accepted" className="cursor-pointer">
            I accept the terms and conditions
          </Label>
          {errors.terms_accepted && (
            <p className="text-sm text-red-600 mt-1">{errors.terms_accepted.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrevious} disabled={isSubmitting}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button type="submit" disabled={isSubmitting || !termsAccepted}>
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Creating Event...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Create Event
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
