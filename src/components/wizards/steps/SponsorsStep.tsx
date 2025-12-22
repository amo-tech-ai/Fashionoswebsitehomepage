/**
 * Sponsors Step — Add Event Sponsors (Optional)
 */

import { useForm } from "react-hook-form@7.55.0";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  SponsorsSchema,
  type Sponsors,
  type CreateEventRequest,
} from "@/lib/validation/event-schemas";

interface SponsorsStepProps {
  data: Partial<CreateEventRequest>;
  onComplete: (data: Sponsors) => void;
  onPrevious: () => void;
}

export function SponsorsStep({ data, onComplete, onPrevious }: SponsorsStepProps) {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<Sponsors>({
    resolver: zodResolver(SponsorsSchema),
    defaultValues: {
      sponsor_ids: data.sponsor_ids || [],
    },
  });

  const handleSkip = () => {
    onComplete({ sponsor_ids: [] });
  };

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      
      <div>
        <Label>Event Sponsors</Label>
        <p className="text-sm text-gray-500 mt-1">
          You can add sponsors now or later from the event detail page.
        </p>
        <div className="mt-4 p-8 border-2 border-dashed rounded-lg text-center">
          <p className="text-gray-400">
            Sponsor management coming soon
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleSkip}>
            Skip for now
          </Button>
          <Button type="submit">
            Next: Deliverables
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
