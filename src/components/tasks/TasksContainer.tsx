import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Sparkles, Plus, Filter, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { TaskCard } from './TaskCard';
import { TaskCreateModal } from './TaskCreateModal';
import { TaskEditModal } from './TaskEditModal';
import { EventTask } from '../../lib/types/events.types';
import { fetchEventTasks, completeTask, createTask } from '../../lib/api/events';
import { generateEventTasks } from '../../lib/ai/taskGenerator';

interface TasksContainerProps {
  eventId: string;
  onNavigate?: (page: string) => void;
}

type WorkflowCategory = 'event_planning' | 'sponsorship' | 'marketing' | 'operations' | 'media';

export function TasksContainer({ eventId, onNavigate }: TasksContainerProps) {
  const [tasks, setTasks] = useState<EventTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<WorkflowCategory>('event_planning');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<EventTask | null>(null);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, [eventId]);

  async function loadTasks() {
    setLoading(true);
    try {
      const data = await fetchEventTasks(eventId);
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  async function handleCompleteTask(taskId: string) {
    try {
      // Optimistic update
      setTasks(prev => prev.map(t =>
        t.id === taskId
          ? { ...t, status: 'done' as const, completed_at: new Date().toISOString() }
          : t
      ));

      await completeTask(taskId);
      toast.success('Task completed! 🎉');
    } catch (error) {
      // Revert on error
      loadTasks();
      toast.error('Failed to complete task');
    }
  }

  async function handleGenerateAI() {
    setIsGenerating(true);
    toast.info('AI is generating tasks... (~10 seconds)', {
      duration: 10000
    });

    try {
      // Fetch event details
      const event = await fetchEvent(eventId);

      // Generate tasks with Gemini
      const generatedTasks = await generateEventTasks({
        eventType: event.type,
        startDate: event.start_date,
        budget: event.budget_total,
        attendeeTarget: event.attendee_target
      });

      // Save all generated tasks
      const savedTasks: EventTask[] = [];
      for (const task of generatedTasks) {
        const saved = await createTask(eventId, task);
        savedTasks.push(saved);
      }

      // Update local state
      setTasks(prev => [...prev, ...savedTasks]);

      toast.success(`Generated ${savedTasks.length} tasks! 🎉`);
    } catch (error) {
      console.error('Failed to generate tasks:', error);
      toast.error('Failed to generate tasks. Using mock generation for now.');
      
      // Fallback to mock data for development
      const mockTasks = await generateMockTasks(eventId);
      setTasks(prev => [...prev, ...mockTasks]);
    } finally {
      setIsGenerating(false);
    }
  }

  // Filter tasks by active tab and search
  const filteredTasks = tasks.filter(task => {
    const matchesTab = task.workflow_category === activeTab;
    const matchesSearch = searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Group tasks by status
  const tasksByStatus = {
    to_do: filteredTasks.filter(t => t.status === 'to_do'),
    in_progress: filteredTasks.filter(t => t.status === 'in_progress'),
    done: filteredTasks.filter(t => t.status === 'done')
  };

  // Calculate tab counts
  const tabCounts = {
    event_planning: tasks.filter(t => t.workflow_category === 'event_planning').length,
    sponsorship: tasks.filter(t => t.workflow_category === 'sponsorship').length,
    marketing: tasks.filter(t => t.workflow_category === 'marketing').length,
    operations: tasks.filter(t => t.workflow_category === 'operations').length,
    media: tasks.filter(t => t.workflow_category === 'media').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl">Tasks & Deliverables</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all tasks for this event
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </Button>
          
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create Task</span>
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button variant="outline" className="sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as WorkflowCategory)}>
        <TabsList className="w-full sm:w-auto grid grid-cols-5 sm:inline-grid">
          <TabsTrigger value="event_planning" className="relative">
            Event Planning
            <Badge variant="secondary" className="ml-2 text-xs">
              {tabCounts.event_planning}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="sponsorship" className="relative">
            Sponsorship
            <Badge variant="secondary" className="ml-2 text-xs">
              {tabCounts.sponsorship}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="marketing" className="relative">
            Marketing
            <Badge variant="secondary" className="ml-2 text-xs">
              {tabCounts.marketing}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="operations" className="relative">
            Operations
            <Badge variant="secondary" className="ml-2 text-xs">
              {tabCounts.operations}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="media" className="relative">
            Media
            <Badge variant="secondary" className="ml-2 text-xs">
              {tabCounts.media}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6 mt-6">
          {loading ? (
            // Loading skeletons
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredTasks.length === 0 ? (
            // Empty state
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks found</p>
              <Button
                variant="outline"
                onClick={handleGenerateAI}
                className="mt-4"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Tasks with AI
              </Button>
            </div>
          ) : (
            // Task lists grouped by status
            <div className="space-y-8">
              {/* To Do */}
              {tasksByStatus.to_do.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">
                    To Do ({tasksByStatus.to_do.length})
                  </h3>
                  <div className="space-y-3">
                    {tasksByStatus.to_do.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onComplete={handleCompleteTask}
                        onClick={setEditingTask}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* In Progress */}
              {tasksByStatus.in_progress.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">
                    In Progress ({tasksByStatus.in_progress.length})
                  </h3>
                  <div className="space-y-3">
                    {tasksByStatus.in_progress.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onComplete={handleCompleteTask}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Done */}
              {tasksByStatus.done.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">
                    Completed ({tasksByStatus.done.length})
                  </h3>
                  <div className="space-y-3">
                    {tasksByStatus.done.slice(0, 5).map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onComplete={handleCompleteTask}
                      />
                    ))}
                  </div>
                  {tasksByStatus.done.length > 5 && (
                    <Button variant="ghost" className="w-full mt-4">
                      Show {tasksByStatus.done.length - 5} more completed tasks
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Modals */}
      <TaskCreateModal
        eventId={eventId}
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={(newTask) => setTasks(prev => [...prev, newTask])}
        defaultCategory={activeTab}
      />
      
      {editingTask && (
        <TaskEditModal
          task={editingTask}
          open={true}
          onClose={() => setEditingTask(null)}
          onSuccess={(updated) => {
            setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
          }}
          onDelete={(taskId) => {
            setTasks(prev => prev.filter(t => t.id !== taskId));
          }}
        />
      )}
    </div>
  );
}

// Mock task generation for development
async function generateMockTasks(eventId: string): Promise<EventTask[]> {
  const { generateMockTasks } = await import('../../lib/data/mockEventData');
  return generateMockTasks(eventId);
}

// Temporary fetch event function (will use real API later)
async function fetchEvent(eventId: string) {
  const { mockEvents } = await import('../../lib/data/mockEventData');
  return mockEvents.find(e => e.id === eventId) || mockEvents[0];
}