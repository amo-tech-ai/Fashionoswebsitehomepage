/**
 * Empty State Components for FashionOS Dashboards
 * 
 * Provides consistent empty state designs across all dashboards.
 * Each component follows the "Calm Luxury" design philosophy.
 * 
 * Usage:
 * ```tsx
 * import { EventsEmptyState } from './empty-states';
 * 
 * <EventsEmptyState 
 *   onCreateEvent={() => navigate('/events/new')}
 *   onLearnMore={() => navigate('/docs/events')}
 * />
 * ```
 */

export { EventsEmptyState } from './EventsEmptyState';
export { SponsorsEmptyState } from './SponsorsEmptyState';
export { TasksEmptyState } from './TasksEmptyState';
export { GalleryEmptyState } from './GalleryEmptyState';
export { BudgetEmptyState } from './BudgetEmptyState';
export { ContractsEmptyState } from './ContractsEmptyState';
export { SearchEmptyState } from './SearchEmptyState';

// Generic reusable empty state
export { EmptyState } from '../../shared/EmptyState';
