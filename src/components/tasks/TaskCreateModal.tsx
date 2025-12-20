import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { TaskForm } from './TaskForm';
import { EventTask } from '../../lib/types/events.types';
import { createTask } from '../../lib/api/events';
import { toast } from 'sonner';

interface TaskCreateModalProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
  onSuccess?: (task: EventTask) => void;
  defaultCategory?: EventTask['workflow_category'];
  defaultPhase?: EventTask['workflow_phase'];
}

export function TaskCreateModal({
  eventId,
  open,
  onClose,
  onSuccess,
  defaultCategory,
  defaultPhase
}: TaskCreateModalProps) {
  
  async function handleSubmit(data: Partial<EventTask>) {
    try {
      const newTask = await createTask(eventId, data);
      toast.success('Task created successfully!');
      onSuccess?.(newTask);
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.error('Failed to create task. Please try again.');
      throw error; // Re-throw to keep form in submitting state
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        
        <TaskForm
          eventId={eventId}
          initialValues={{
            workflow_category: defaultCategory,
            workflow_phase: defaultPhase
          }}
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitLabel="Create Task"
        />
      </DialogContent>
    </Dialog>
  );
}
