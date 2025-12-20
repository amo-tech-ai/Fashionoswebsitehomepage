import { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { EventTask } from '../../lib/types/events.types';

interface TaskFormProps {
  eventId: string;
  initialValues?: Partial<EventTask>;
  onSubmit: (data: Partial<EventTask>) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function TaskForm({
  eventId,
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = 'Save Task'
}: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<EventTask>>({
    event_id: eventId,
    title: '',
    description: '',
    priority: 'medium',
    workflow_category: 'event_planning',
    workflow_phase: 'pre_production',
    status: 'to_do',
    is_critical_path: false,
    dependency_task_ids: [],
    ...initialValues
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    // Title validation
    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (formData.title && formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    // Deadline validation
    if (formData.deadline) {
      const deadline = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadline < today) {
        newErrors.deadline = 'Deadline must be today or in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<K extends keyof EventTask>(
    field: K,
    value: EventTask[K]
  ) {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="required">
          Task Title
        </Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="e.g., Book event venue"
          className={errors.title ? 'border-red-500' : ''}
          autoFocus
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Add details about this task..."
          rows={4}
        />
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <Label>Priority</Label>
        <RadioGroup
          value={formData.priority}
          onValueChange={(value) => updateField('priority', value as EventTask['priority'])}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="critical" id="priority-critical" />
            <Label htmlFor="priority-critical" className="cursor-pointer">
              <span className="px-2 py-1 text-xs bg-red-500 text-white rounded">
                Critical
              </span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="priority-high" />
            <Label htmlFor="priority-high" className="cursor-pointer">
              <span className="px-2 py-1 text-xs bg-orange-500 text-white rounded">
                High
              </span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="priority-medium" />
            <Label htmlFor="priority-medium" className="cursor-pointer">
              <span className="px-2 py-1 text-xs bg-yellow-500 text-white rounded">
                Medium
              </span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="priority-low" />
            <Label htmlFor="priority-low" className="cursor-pointer">
              <span className="px-2 py-1 text-xs bg-green-500 text-white rounded">
                Low
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Workflow Category & Phase - Side by Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Workflow Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Workflow Category</Label>
          <Select
            value={formData.workflow_category}
            onValueChange={(value) => updateField('workflow_category', value as EventTask['workflow_category'])}
          >
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="event_planning">Event Planning</SelectItem>
              <SelectItem value="sponsorship">Sponsorship</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="media">Media</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Workflow Phase */}
        <div className="space-y-2">
          <Label htmlFor="phase">Workflow Phase</Label>
          <Select
            value={formData.workflow_phase}
            onValueChange={(value) => updateField('workflow_phase', value as EventTask['workflow_phase'])}
          >
            <SelectTrigger id="phase">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pre_production">Pre-Production</SelectItem>
              <SelectItem value="venue_logistics">Venue & Logistics</SelectItem>
              <SelectItem value="creative_design">Creative Design</SelectItem>
              <SelectItem value="on_site">On-Site Operations</SelectItem>
              <SelectItem value="post_event">Post-Event</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Deadline & Status - Side by Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Deadline */}
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={formData.deadline || ''}
            onChange={(e) => updateField('deadline', e.target.value)}
            className={errors.deadline ? 'border-red-500' : ''}
          />
          {errors.deadline && (
            <p className="text-sm text-red-600">{errors.deadline}</p>
          )}
        </div>

        {/* Status (only show when editing) */}
        {initialValues.id && (
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => updateField('status', value as EventTask['status'])}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to_do">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Assigned To */}
      <div className="space-y-2">
        <Label htmlFor="assigned_to">Assigned To</Label>
        <Input
          id="assigned_to"
          value={formData.assigned_to || ''}
          onChange={(e) => updateField('assigned_to', e.target.value)}
          placeholder="e.g., user-001 or email@example.com"
        />
        <p className="text-xs text-gray-500">
          Enter user ID or email address
        </p>
      </div>

      {/* Critical Path Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="critical_path"
          checked={formData.is_critical_path || false}
          onCheckedChange={(checked) => updateField('is_critical_path', Boolean(checked))}
        />
        <Label
          htmlFor="critical_path"
          className="cursor-pointer text-sm"
        >
          Mark as <strong>Critical Path</strong> (task must complete before event)
        </Label>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
