import { Event } from '../../types/events.types';
import { AttendeeFlowOutput } from '../types';

export function runAttendeeFlowAgent(
  event: Event
): AttendeeFlowOutput {
  // Logic: Mock predictive analysis based on attendee count vs capacity
  // We assume capacity is stored in venue data or roughly calculated
  
  const capacity = 500; // Mock capacity for now
  const registered = event.attendee_registered;
  const saturation = registered / capacity;

  let risk: 'low' | 'medium' | 'high' = 'low';
  let bottleneck = undefined;
  let delay = undefined;
  let mitigation = undefined;
  let requiresAction = false;
  let confidence: 'high' | 'medium' | 'low' = 'high';

  if (saturation > 1.1) {
    risk = 'high';
    requiresAction = true;
    bottleneck = 'Main Entrance / Coat Check';
    delay = '>25 minutes predicted at 7:00 PM peak';
    mitigation = 'Open secondary entrance B for VIPs only to offload main queue.';
  } else if (saturation > 0.9) {
    risk = 'medium';
    requiresAction = true;
    bottleneck = 'Bar Area 1';
    delay = '~15 minutes during intermission';
    mitigation = 'Pre-pour welcome drinks to reduce bar transaction time.';
  }

  return {
    agentId: 'attendee-flow',
    confidence,
    requires_action: requiresAction,
    experience_risk: risk,
    bottleneck_description: bottleneck,
    predicted_delay: delay,
    mitigation_option: mitigation
  };
}
