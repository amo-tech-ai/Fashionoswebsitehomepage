import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';

// Empty States
import {
  EventsEmptyState,
  SponsorsEmptyState,
  TasksEmptyState,
  GalleryEmptyState,
  BudgetEmptyState,
  ContractsEmptyState,
  SearchEmptyState,
} from './dashboards/empty-states';

// Loading Skeletons
import {
  CardSkeleton,
  TableSkeleton,
  ListItemSkeleton,
  ChartSkeleton,
  HeaderSkeleton,
  DashboardSkeleton,
} from './shared/LoadingSkeleton';

// Error States
import {
  ErrorState,
  FailedToLoadError,
  OfflineError,
  PermissionDeniedError,
  ServerError,
} from './shared/ErrorState';

/**
 * UI States Demo Component
 * 
 * Showcases all empty, loading, and error states created for FashionOS.
 * Used for design review and testing.
 * 
 * Navigate to /demo to view this page.
 */
export default function UIStatesDemo() {
  const [activeTab, setActiveTab] = useState('empty');

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
    alert(`Action: ${action}`);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-[#111111] mb-2">
            UI States Demo
          </h1>
          <p className="text-gray-600">
            Preview all empty, loading, and error states for FashionOS dashboards
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="empty">Empty States (7)</TabsTrigger>
            <TabsTrigger value="loading">Loading Skeletons (6)</TabsTrigger>
            <TabsTrigger value="errors">Error States (4)</TabsTrigger>
          </TabsList>

          {/* Empty States Tab */}
          <TabsContent value="empty" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Events Empty */}
              <Card className="p-6 bg-white">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Events Dashboard
                </h3>
                <EventsEmptyState
                  onCreateEvent={() => handleAction('Create Event')}
                  onLearnMore={() => handleAction('Learn More - Events')}
                />
              </Card>

              {/* Sponsors Empty */}
              <Card className="p-6 bg-white">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Sponsor CRM
                </h3>
                <SponsorsEmptyState
                  onAddSponsor={() => handleAction('Add Sponsor')}
                  onLearnMore={() => handleAction('Learn More - Sponsors')}
                />
              </Card>

              {/* Tasks Empty */}
              <Card className="p-6 bg-white">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Tasks Dashboard
                </h3>
                <TasksEmptyState
                  onCreateTask={() => handleAction('Create Task')}
                  onLearnMore={() => handleAction('Learn More - Tasks')}
                />
              </Card>

              {/* Gallery Empty */}
              <Card className="p-6 bg-white">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Gallery Dashboard
                </h3>
                <GalleryEmptyState
                  onUploadAssets={() => handleAction('Upload Assets')}
                  onLearnMore={() => handleAction('Learn More - Gallery')}
                />
              </Card>

              {/* Budget Empty */}
              <Card className="p-6 bg-white">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Budget Manager
                </h3>
                <BudgetEmptyState
                  onAddBudgetItem={() => handleAction('Add Budget Item')}
                  onLearnMore={() => handleAction('Learn More - Budget')}
                />
              </Card>

              {/* Contracts Empty */}
              <Card className="p-6 bg-white">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Contract Analyzer
                </h3>
                <ContractsEmptyState
                  onUploadContract={() => handleAction('Upload Contract')}
                  onLearnMore={() => handleAction('Learn More - Contracts')}
                />
              </Card>

              {/* Search Empty */}
              <Card className="p-6 bg-white lg:col-span-2">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Search Results (No Results)
                </h3>
                <SearchEmptyState
                  onClearFilters={() => handleAction('Clear Filters')}
                  searchQuery="fashion week 2025"
                />
              </Card>
            </div>
          </TabsContent>

          {/* Loading Skeletons Tab */}
          <TabsContent value="loading" className="space-y-8">
            {/* Header Skeleton */}
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                Header Skeleton
              </h3>
              <HeaderSkeleton />
            </div>

            {/* Card Skeleton */}
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                Card Skeleton (Grid of 3)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </div>

            {/* Chart Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Chart Skeleton
                </h3>
                <ChartSkeleton />
              </div>

              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  List Item Skeleton
                </h3>
                <ListItemSkeleton count={4} />
              </div>
            </div>

            {/* Table Skeleton */}
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                Table Skeleton
              </h3>
              <TableSkeleton rows={5} />
            </div>

            {/* Full Dashboard Skeleton */}
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                Complete Dashboard Skeleton
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <DashboardSkeleton />
              </div>
            </div>
          </TabsContent>

          {/* Error States Tab */}
          <TabsContent value="errors" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Failed to Load */}
              <Card className="p-6 bg-white">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Failed to Load Data
                </h3>
                <FailedToLoadError
                  message="Unable to fetch events from the database"
                  onRetry={() => handleAction('Retry - Failed')}
                />
              </Card>

              {/* Offline */}
              <Card className="p-6 bg-white">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  No Internet Connection
                </h3>
                <OfflineError onRetry={() => handleAction('Retry - Offline')} />
              </Card>

              {/* Permission Denied */}
              <Card className="p-6 bg-white">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Permission Denied
                </h3>
                <PermissionDeniedError
                  onRequestAccess={() => handleAction('Request Access')}
                />
              </Card>

              {/* Server Error */}
              <Card className="p-6 bg-white">
                <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                  Server Error (500)
                </h3>
                <ServerError
                  errorCode="500"
                  onRetry={() => handleAction('Retry - Server')}
                  onGoBack={() => handleAction('Go Back')}
                />
              </Card>
            </div>

            {/* All Error Types in One View */}
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-4 uppercase tracking-wide">
                All Error Types (Quick Reference)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="text-red-600 font-medium mb-2">Failed</div>
                  <p className="text-sm text-gray-600">Data fetch error</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="text-orange-600 font-medium mb-2">Offline</div>
                  <p className="text-sm text-gray-600">No connection</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="text-amber-600 font-medium mb-2">Permission</div>
                  <p className="text-sm text-gray-600">Access denied</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="text-red-600 font-medium mb-2">Server</div>
                  <p className="text-sm text-gray-600">500 error</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-serif text-[#111111] mb-1">7</div>
              <div className="text-sm text-gray-600">Empty States</div>
            </div>
            <div>
              <div className="text-3xl font-serif text-[#111111] mb-1">6</div>
              <div className="text-sm text-gray-600">Loading Skeletons</div>
            </div>
            <div>
              <div className="text-3xl font-serif text-[#111111] mb-1">4</div>
              <div className="text-sm text-gray-600">Error States</div>
            </div>
            <div>
              <div className="text-3xl font-serif text-[#111111] mb-1">22</div>
              <div className="text-sm text-gray-600">Total Components</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
