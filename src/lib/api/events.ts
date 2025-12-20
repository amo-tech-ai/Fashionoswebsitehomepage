/**
 * Event API Functions
 * Fetch and update event data
 */

import { Event, EventTask, EventData, AIRisk } from '../types/events.types';
import { apiGet, apiPost, apiPut, apiDelete } from './client';
import { getMockEventData } from '../data/mockEventData';

/**
 * Fetch single event with full data
 * Used by Event Command Center
 */
export async function fetchEventData(eventId: string): Promise<EventData> {
  try {
    // TODO: Replace with real API call when backend ready
    // return await apiGet<EventData>(`/events/${eventId}`);
    
    // For now, return mock data
    return getMockEventData(eventId);
  } catch (error) {
    console.error('[API] fetchEventData failed:', error);
    // Fallback to mock data on error
    return getMockEventData(eventId);
  }
}

/**
 * Fetch all events for user
 */
export async function fetchEvents(filters?: {
  status?: Event['status'];
  type?: Event['type'];
  search?: string;
}): Promise<Event[]> {
  try {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.type) queryParams.append('type', filters.type);
    if (filters?.search) queryParams.append('search', filters.search);
    
    const endpoint = `/events${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiGet<Event[]>(endpoint);
  } catch (error) {
    console.error('[API] fetchEvents failed:', error);
    // Return mock events on error
    const { mockEvents } = await import('../data/mockEventData');
    return mockEvents;
  }
}

/**
 * Create new event
 */
export async function createEvent(data: Partial<Event>): Promise<Event> {
  try {
    return await apiPost<Event>('/events', data);
  } catch (error) {
    console.error('[API] createEvent failed:', error);
    throw error;
  }
}

/**
 * Update event
 */
export async function updateEvent(eventId: string, data: Partial<Event>): Promise<Event> {
  try {
    return await apiPut<Event>(`/events/${eventId}`, data);
  } catch (error) {
    console.error('[API] updateEvent failed:', error);
    throw error;
  }
}

/**
 * Archive event (soft delete)
 */
export async function archiveEvent(eventId: string): Promise<void> {
  try {
    await apiPut(`/events/${eventId}`, { status: 'archived' });
  } catch (error) {
    console.error('[API] archiveEvent failed:', error);
    throw error;
  }
}

/**
 * Fetch tasks for event
 */
export async function fetchEventTasks(
  eventId: string,
  filters?: {
    status?: EventTask['status'];
    priority?: EventTask['priority'];
    workflow_category?: EventTask['workflow_category'];
    workflow_phase?: EventTask['workflow_phase'];
  }
): Promise<EventTask[]> {
  try {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.priority) queryParams.append('priority', filters.priority);
    if (filters?.workflow_category) queryParams.append('category', filters.workflow_category);
    if (filters?.workflow_phase) queryParams.append('phase', filters.workflow_phase);
    
    const endpoint = `/events/${eventId}/tasks${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiGet<EventTask[]>(endpoint);
  } catch (error) {
    console.error('[API] fetchEventTasks failed:', error);
    // Return mock tasks on error
    const { generateMockTasks } = await import('../data/mockEventData');
    return generateMockTasks(eventId);
  }
}

/**
 * Create new task
 */
export async function createTask(eventId: string, data: Partial<EventTask>): Promise<EventTask> {
  try {
    return await apiPost<EventTask>(`/events/${eventId}/tasks`, data);
  } catch (error) {
    console.error('[API] createTask failed:', error);
    throw error;
  }
}

/**
 * Update task
 */
export async function updateTask(taskId: string, data: Partial<EventTask>): Promise<EventTask> {
  try {
    return await apiPut<EventTask>(`/tasks/${taskId}`, data);
  } catch (error) {
    console.error('[API] updateTask failed:', error);
    throw error;
  }
}

/**
 * Mark task as complete
 */
export async function completeTask(taskId: string): Promise<EventTask> {
  try {
    return await apiPut<EventTask>(`/tasks/${taskId}`, {
      status: 'done',
      completed_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('[API] completeTask failed:', error);
    throw error;
  }
}

/**
 * Fetch AI risks for event
 */
export async function fetchEventRisks(eventId: string): Promise<AIRisk[]> {
  try {
    return await apiGet<AIRisk[]>(`/events/${eventId}/risks`);
  } catch (error) {
    console.error('[API] fetchEventRisks failed:', error);
    // Return mock risks on error
    const { mockRisks } = await import('../data/mockEventData');
    return mockRisks[eventId] || [];
  }
}

/**
 * Trigger AI risk analysis
 */
export async function analyzeEventRisks(eventId: string): Promise<AIRisk[]> {
  try {
    return await apiPost<AIRisk[]>(`/events/${eventId}/analyze-risks`, {});
  } catch (error) {
    console.error('[API] analyzeEventRisks failed:', error);
    throw error;
  }
}

/**
 * Generate tasks with AI
 */
export async function generateEventTasks(
  eventId: string,
  params: {
    event_type: string;
    start_date: string;
    budget: number;
    attendee_target: number;
  }
): Promise<EventTask[]> {
  try {
    return await apiPost<EventTask[]>(`/events/${eventId}/generate-tasks`, params);
  } catch (error) {
    console.error('[API] generateEventTasks failed:', error);
    throw error;
  }
}
