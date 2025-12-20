import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { AlertCircle, Trash2 } from 'lucide-react';
import { TaskForm } from './TaskForm';
import { EventTask } from '../../lib/types/events.types';
import { updateTask } from '../../lib/api/events';
import { toast } from 'sonner';

interface TaskEditModalProps {
  task: EventTask;
  open: boolean;
  onClose: () => void;
  onSuccess?: (task: EventTask) => void;
  onDelete?: (taskId: string) => void;
}

export function TaskEditModal({
  task,
  open,
  onClose,
  onSuccess,
  onDelete
}: TaskEditModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(data: Partial<EventTask>) {
    try {
      const updated = await updateTask(task.id, data);
      toast.success('Task updated successfully!');
      onSuccess?.(updated);
      onClose();
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task. Please try again.');
      throw error;
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      // Soft delete: Mark as cancelled
      await updateTask(task.id, { status: 'cancelled' });
      toast.success('Task deleted');
      onDelete?.(task.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        {showDeleteConfirm ? (
          // Delete Confirmation
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm mb-1">Delete this task?</h4>
                <p className="text-sm text-gray-600">
                  This will mark the task as cancelled. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Task'}
              </Button>
            </div>
          </div>
        ) : (
          // Edit Form
          <>
            <TaskForm
              eventId={task.event_id}
              initialValues={task}
              onSubmit={handleSubmit}
              onCancel={onClose}
              submitLabel="Update Task"
            />

            {/* Delete Button (at bottom) */}
            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Task
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
