/**
 * Date & Venue Step — Event Date, Venue, Attendance, Budget
 */

import { useForm } from "react-hook-form@7.55.0";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DateVenueSchema,
  type DateVenue,
  type CreateEventRequest,
  formatBudget,
} from "@/lib/validation/event-schemas";

interface DateVenueStepProps {
  data: Partial<CreateEventRequest>;
  onComplete: (data: DateVenue) => void;
  onPrevious: () => void;
}

export function DateVenueStep({ data, onComplete, onPrevious }: DateVenueStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DateVenue>({
    resolver: zodResolver(DateVenueSchema),
    defaultValues: {
      event_date: data.event_date || "",
      venue: data.venue || "",
      expected_attendance: data.expected_attendance || 100,
      budget: data.budget || 50000,
    },
  });

  const budgetValue = watch("budget");

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      
      <div>
        <Label htmlFor="event_date">
          Event Date <span className="text-red-500">*</span>
        </Label>
        <Input
          id="event_date"
          type="date"
          {...register("event_date")}
          className={errors.event_date ? "border-red-500" : ""}
        />
        {errors.event_date && (
          <p className="text-sm text-red-600 mt-1">{errors.event_date.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Event date must be in the future
        </p>
      </div>

      <div>
        <Label htmlFor="venue">Venue</Label>
        <Input
          id="venue"
          {...register("venue")}
          placeholder="e.g., Skylight Modern"
          className={errors.venue ? "border-red-500" : ""}
        />
        {errors.venue && (
          <p className="text-sm text-red-600 mt-1">{errors.venue.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="expected_attendance">
          Expected Attendance <span className="text-red-500">*</span>
        </Label>
        <Input
          id="expected_attendance"
          type="number"
          {...register("expected_attendance", { valueAsNumber: true })}
          placeholder="300"
          className={errors.expected_attendance ? "border-red-500" : ""}
        />
        {errors.expected_attendance && (
          <p className="text-sm text-red-600 mt-1">{errors.expected_attendance.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="budget">
          Budget (USD) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="budget"
          type="number"
          {...register("budget", { valueAsNumber: true })}
          placeholder="150000"
          className={errors.budget ? "border-red-500" : ""}
        />
        {budgetValue && (
          <p className="text-sm text-gray-600 mt-1">
            {formatBudget(budgetValue)}
          </p>
        )}
        {errors.budget && (
          <p className="text-sm text-red-600 mt-1">{errors.budget.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button type="submit">
          Next: Casting
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
