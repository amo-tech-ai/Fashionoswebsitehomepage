import { EventSponsor } from '../../types/events.types';
import { SponsorIntelligenceOutput } from '../types';

export function runSponsorIntelligenceAgent(
  sponsors: EventSponsor[]
): SponsorIntelligenceOutput {
  // Find highest tier sponsor that is "negotiating" or "prospecting" but stuck
  const pendingPlatinum = sponsors.find(s => s.tier === 'platinum' && (s.status === 'negotiating' || s.status === 'prospecting'));

  let status: 'active' | 'pending' | 'at_risk' = 'active';
  let sponsorName = undefined;
  let blocking = undefined;
  let action = undefined;
  let requiresAction = false;
  let confidence: 'high' | 'medium' | 'low' = 'high';

  if (pendingPlatinum) {
    status = 'at_risk';
    requiresAction = true;
    sponsorName = pendingPlatinum.company_name;
    blocking = 'Contract awaiting legal redline review (5 days stale)';
    action = 'Nudge Legal Team for "End of Day" review completion.';
  } else {
    // Check for missing deliverables on confirmed sponsors
    const fulfillmentRisk = sponsors.find(s => s.status === 'confirmed' && (!s.deliverables_required || s.deliverables_required.length === 0));
    if (fulfillmentRisk) {
        status = 'pending';
        requiresAction = false; // Just info
        sponsorName = fulfillmentRisk.company_name;
        blocking = 'Deliverables list not defined in system';
        action = 'Import deliverables from contract.';
    }
  }

  return {
    agentId: 'sponsor-intelligence',
    confidence,
    requires_action: requiresAction,
    sponsor_name: sponsorName,
    status,
    blocking_item: blocking,
    recommended_action: action
  };
}
