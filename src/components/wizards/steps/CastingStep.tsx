/**
 * Casting Step — Number of Models, Model Types
 */

import { useForm } from "react-hook-form@7.55.0";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CastingSchema,
  type Casting,
  type CreateEventRequest,
} from "@/lib/validation/event-schemas";

interface CastingStepProps {
  data: Partial<CreateEventRequest>;
  onComplete: (data: Casting) => void;
  onPrevious: () => void;
}

const MODEL_TYPES = [
  { value: "runway", label: "Runway" },
  { value: "fitting", label: "Fitting" },
  { value: "commercial", label: "Commercial" },
  { value: "editorial", label: "Editorial" },
] as const;

export function CastingStep({ data, onComplete, onPrevious }: CastingStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Casting>({
    resolver: zodResolver(CastingSchema),
    defaultValues: {
      number_of_models: data.number_of_models || 20,
      model_types: data.model_types || [],
      casting_director_id: data.casting_director_id || "",
    },
  });

  const selectedTypes = watch("model_types") || [];

  const toggleModelType = (type: string) => {
    const current = selectedTypes;
    const updated = current.includes(type as any)
      ? current.filter((t) => t !== type)
      : [...current, type as any];
    setValue("model_types", updated);
  };

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      
      <div>
        <Label htmlFor="number_of_models">
          Number of Models <span className="text-red-500">*</span>
        </Label>
        <Input
          id="number_of_models"
          type="number"
          {...register("number_of_models", { valueAsNumber: true })}
          placeholder="20"
          className={errors.number_of_models ? "border-red-500" : ""}
        />
        {errors.number_of_models && (
          <p className="text-sm text-red-600 mt-1">{errors.number_of_models.message}</p>
        )}
      </div>

      <div>
        <Label>Model Types</Label>
        <div className="space-y-2 mt-2">
          {MODEL_TYPES.map((type) => (
            <div key={type.value} className="flex items-center gap-2">
              <Checkbox
                id={`type-${type.value}`}
                checked={selectedTypes.includes(type.value)}
                onCheckedChange={() => toggleModelType(type.value)}
              />
              <Label htmlFor={`type-${type.value}`} className="cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.model_types && (
          <p className="text-sm text-red-600 mt-1">{errors.model_types.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button type="submit">
          Next: Sponsors
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
