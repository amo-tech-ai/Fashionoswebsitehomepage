import { Event, VenueBooking } from '../../types/events.types';
import { OpsRiskOutput } from '../types';

export function runOpsRiskAgent(
  event: Event,
  venueBooking?: VenueBooking
): OpsRiskOutput {
  // Logic: Check if venue is confirmed close to start date
  const today = new Date();
  const startDate = new Date(event.start_date);
  const daysUntilEvent = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  let riskLevel: 'green' | 'amber' | 'red' = 'green';
  let description = undefined;
  let impact = undefined;
  let tradeoff = undefined;
  let requiresAction = false;
  let confidence: 'high' | 'medium' | 'low' = 'high';

  // SCENARIO 1: Venue not confirmed 60 days out
  if (!venueBooking && daysUntilEvent < 60) {
    riskLevel = 'red';
    requiresAction = true;
    description = 'Venue not confirmed (Critical)';
    impact = 'Cannot finalize floor plan or lighting design.';
    tradeoff = 'Book fallback venue "Industrial Loft A" (+15% cost) to secure dates.';
  } 
  // SCENARIO 2: Timeline Compression (Mocked for demo)
  else if (daysUntilEvent < 14) {
    // Check if we have a "Run of Show" (mock check)
    // In a real app, we'd check the specific "Run of Show" object
    riskLevel = 'amber';
    requiresAction = true;
    description = 'Rehearsal window compressed';
    impact = 'Tech rehearsal overlaps with catering load-in.';
    tradeoff = 'Move lighting check to 6 AM or reduce rehearsal by 1 hour.';
  }

  return {
    agentId: 'ops-risk',
    confidence,
    requires_action: requiresAction,
    risk_level: riskLevel,
    risk_description: description,
    predicted_impact: impact,
    recommended_tradeoff: tradeoff
  };
}
