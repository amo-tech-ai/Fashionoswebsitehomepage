/**
 * Deliverables Step — Photography, Video, Streaming, Social
 */

import { useForm } from "react-hook-form@7.55.0";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Camera, Video, Radio, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DeliverablesSchema,
  type Deliverables,
  type CreateEventRequest,
} from "@/lib/validation/event-schemas";

interface DeliverablesStepProps {
  data: Partial<CreateEventRequest>;
  onComplete: (data: Deliverables) => void;
  onPrevious: () => void;
}

const DELIVERABLES = [
  { id: "photography", label: "Photography", icon: Camera, description: "Professional event photography" },
  { id: "videography", label: "Videography", icon: Video, description: "High-quality video recording" },
  { id: "live_streaming", label: "Live Streaming", icon: Radio, description: "Real-time event broadcast" },
  { id: "social_media_content", label: "Social Media Content", icon: Share2, description: "Content for social platforms" },
] as const;

export function DeliverablesStep({ data, onComplete, onPrevious }: DeliverablesStepProps) {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Deliverables>({
    resolver: zodResolver(DeliverablesSchema),
    defaultValues: {
      photography: data.photography || false,
      videography: data.videography || false,
      live_streaming: data.live_streaming || false,
      social_media_content: data.social_media_content || false,
    },
  });

  const values = watch();

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      
      <div>
        <Label>Event Deliverables</Label>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Select at least one deliverable for your event
        </p>
        
        <div className="grid gap-4">
          {DELIVERABLES.map((deliverable) => {
            const Icon = deliverable.icon;
            const isChecked = values[deliverable.id];
            
            return (
              <div
                key={deliverable.id}
                onClick={() => setValue(deliverable.id, !isChecked)}
                className={`
                  p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${isChecked ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}
                `}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={deliverable.id}
                    checked={isChecked}
                    onCheckedChange={(checked) => setValue(deliverable.id, !!checked)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <Label htmlFor={deliverable.id} className="cursor-pointer font-medium">
                        {deliverable.label}
                      </Label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {deliverable.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {errors.photography && (
          <p className="text-sm text-red-600 mt-2">
            At least one deliverable must be selected
          </p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button type="submit">
          Next: Review
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
