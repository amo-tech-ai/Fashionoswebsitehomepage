import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EventSponsor } from '../lib/types/events.types';
import { mockSponsors } from '../lib/data/mockEventData';

// Extended type to match the new status fields we just added
// The mock data might still have old statuses, so we'll sanitize on load

interface SponsorContextType {
  sponsors: EventSponsor[];
  addSponsor: (sponsor: Omit<EventSponsor, 'id' | 'created_at'>) => void;
  updateSponsorStatus: (id: string, status: EventSponsor['status']) => void;
  updateSponsor: (id: string, updates: Partial<EventSponsor>) => void;
  getSponsorsByStage: (stage: EventSponsor['status']) => EventSponsor[];
  totalPipelineValue: number;
  closedWonValue: number;
}

const SponsorContext = createContext<SponsorContextType | undefined>(undefined);

export function SponsorProvider({ children }: { children: ReactNode }) {
  // Initialize with some expanded mock data to fill the board
  const [sponsors, setSponsors] = useState<EventSponsor[]>([
    ...mockSponsors.map(s => ({ ...s, status: s.status === 'confirmed' ? 'confirmed' : 'negotiation' as any, fit_score: 95 })),
    {
      id: 's-3',
      event_id: 'event-001',
      company_name: 'Gucci',
      tier: 'platinum',
      amount: 200000,
      status: 'discovery',
      contact_name: 'Marco B.',
      created_at: new Date().toISOString(),
      fit_score: 94
    },
    {
      id: 's-4',
      event_id: 'event-001',
      company_name: 'Puma',
      tier: 'gold',
      amount: 40000,
      status: 'qualified',
      created_at: new Date().toISOString(),
      fit_score: 71
    },
    {
      id: 's-5',
      event_id: 'event-001',
      company_name: 'Glossier',
      tier: 'silver',
      amount: 25000,
      status: 'lead',
      created_at: new Date().toISOString(),
      fit_score: 94
    },
    {
      id: 's-6',
      event_id: 'event-001',
      company_name: 'Samsung',
      tier: 'gold',
      amount: 100000,
      status: 'discovery',
      created_at: new Date().toISOString(),
      fit_score: 65
    }
  ]);

  const addSponsor = (newSponsor: Omit<EventSponsor, 'id' | 'created_at'>) => {
    const sponsor: EventSponsor = {
      ...newSponsor,
      id: `sponsor-${Date.now()}`,
      created_at: new Date().toISOString(),
      fit_score: Math.floor(Math.random() * 30) + 70 // Mock AI score
    };
    setSponsors(prev => [...prev, sponsor]);
  };

  const updateSponsorStatus = (id: string, status: EventSponsor['status']) => {
    setSponsors(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const updateSponsor = (id: string, updates: Partial<EventSponsor>) => {
    setSponsors(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const getSponsorsByStage = (stage: EventSponsor['status']) => {
    return sponsors.filter(s => s.status === stage);
  };

  const totalPipelineValue = sponsors.reduce((acc, s) => acc + s.amount, 0);
  const closedWonValue = sponsors
    .filter(s => s.status === 'confirmed' || s.status === 'fulfilled')
    .reduce((acc, s) => acc + s.amount, 0);

  return (
    <SponsorContext.Provider value={{
      sponsors,
      addSponsor,
      updateSponsorStatus,
      updateSponsor,
      getSponsorsByStage,
      totalPipelineValue,
      closedWonValue
    }}>
      {children}
    </SponsorContext.Provider>
  );
}

export function useSponsor() {
  const context = useContext(SponsorContext);
  if (context === undefined) {
    throw new Error('useSponsor must be used within a SponsorProvider');
  }
  return context;
}
