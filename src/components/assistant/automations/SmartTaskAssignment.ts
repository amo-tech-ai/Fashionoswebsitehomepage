/**
 * SmartTaskAssignment - Intelligent task assignment based on skills & availability
 * 
 * Workflow 5: Smart Task Assignment
 * Trigger: When new task created OR team member availability changes
 * 
 * Algorithm:
 * 1. Analyze task requirements (skills, time, priority)
 * 2. Score team members (skill match + availability + workload)
 * 3. Suggest best assignments
 * 4. Detect overallocation and suggest rebalancing
 */

import type { Event, Task } from '../skills/EventsSkill';

// ============================================================================
// TEAM MEMBER TYPES
// ============================================================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[]; // e.g., ['photography', 'retouching', 'styling']
  skillLevels: Record<string, number>; // Skill proficiency (1-10)
  availability: number; // Hours available per week
  currentWorkload: number; // Hours already assigned
  hourlyRate: number;
  location: string;
  preferredTaskTypes?: string[];
}

export interface TaskRequirements {
  requiredSkills: string[];
  estimatedHours: number;
  priority: number; // 1-5, 1 being highest
  deadline?: Date;
  location?: string;
  budget?: number;
}

export interface AssignmentRecommendation {
  member: TeamMember;
  fitScore: number; // 0-100
  reasons: string[];
  warnings: string[];
  estimatedCost: number;
  availabilityMatch: boolean;
  skillMatch: number; // 0-100
  workloadImpact: 'none' | 'acceptable' | 'high' | 'overloaded';
}

// ============================================================================
// SKILL MATCHING ALGORITHM
// ============================================================================

function calculateSkillMatch(
  required: string[],
  member: TeamMember
): {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
} {
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  let totalScore = 0;

  for (const skill of required) {
    if (member.skills.includes(skill)) {
      matchedSkills.push(skill);
      // Weight by proficiency level
      const proficiency = member.skillLevels[skill] || 5;
      totalScore += proficiency * 10; // 0-100 scale
    } else {
      missingSkills.push(skill);
    }
  }

  // Calculate percentage match
  const matchPercentage = required.length > 0
    ? (matchedSkills.length / required.length) * 100
    : 100;

  // Weighted score: 50% coverage, 50% proficiency
  const score = (matchPercentage * 0.5) + (totalScore / required.length * 0.5);

  return {
    score: Math.min(score, 100),
    matchedSkills,
    missingSkills,
  };
}

// ============================================================================
// AVAILABILITY SCORING
// ============================================================================

function calculateAvailability(
  member: TeamMember,
  requiredHours: number
): {
  score: number;
  available: boolean;
  utilizationAfter: number;
} {
  const remainingHours = member.availability - member.currentWorkload;
  const utilizationAfter = ((member.currentWorkload + requiredHours) / member.availability) * 100;

  let score = 0;

  if (remainingHours >= requiredHours) {
    // Has enough time
    if (utilizationAfter <= 80) {
      score = 100; // Optimal utilization
    } else if (utilizationAfter <= 90) {
      score = 80; // High but acceptable
    } else if (utilizationAfter <= 100) {
      score = 60; // At capacity
    }
  } else {
    // Overallocated if assigned
    score = Math.max(0, (remainingHours / requiredHours) * 50);
  }

  return {
    score,
    available: remainingHours >= requiredHours,
    utilizationAfter,
  };
}

// ============================================================================
// COST SCORING
// ============================================================================

function calculateCostFit(
  member: TeamMember,
  requiredHours: number,
  budget?: number
): {
  score: number;
  estimatedCost: number;
  withinBudget: boolean;
} {
  const estimatedCost = member.hourlyRate * requiredHours;

  let score = 50; // Default neutral score
  let withinBudget = true;

  if (budget) {
    const costRatio = estimatedCost / budget;
    
    if (costRatio <= 0.8) {
      score = 100; // Well under budget
    } else if (costRatio <= 1.0) {
      score = 80; // Within budget
    } else if (costRatio <= 1.2) {
      score = 50; // Slightly over
      withinBudget = false;
    } else {
      score = 20; // Significantly over
      withinBudget = false;
    }
  }

  return {
    score,
    estimatedCost,
    withinBudget,
  };
}

// ============================================================================
// PRIORITY WEIGHTING
// ============================================================================

function calculatePriorityBoost(
  priority: number,
  member: TeamMember,
  task: TaskRequirements
): number {
  // High-priority tasks should go to most skilled members
  if (priority <= 2) {
    // Boost score for highly skilled members
    const avgSkillLevel = Object.values(member.skillLevels).reduce((a, b) => a + b, 0) / 
                          Object.keys(member.skillLevels).length;
    return avgSkillLevel >= 8 ? 10 : 0;
  }
  return 0;
}

// ============================================================================
// MAIN ASSIGNMENT ALGORITHM
// ============================================================================

export function recommendAssignments(
  task: TaskRequirements,
  team: TeamMember[]
): AssignmentRecommendation[] {
  const recommendations: AssignmentRecommendation[] = [];

  for (const member of team) {
    const reasons: string[] = [];
    const warnings: string[] = [];

    // 1. Skill matching (40% weight)
    const skillMatch = calculateSkillMatch(task.requiredSkills, member);
    if (skillMatch.matchedSkills.length === task.requiredSkills.length) {
      reasons.push(`Has all required skills: ${skillMatch.matchedSkills.join(', ')}`);
    } else if (skillMatch.missingSkills.length > 0) {
      warnings.push(`Missing skills: ${skillMatch.missingSkills.join(', ')}`);
    }

    // 2. Availability (30% weight)
    const availability = calculateAvailability(member, task.estimatedHours);
    if (!availability.available) {
      warnings.push(`Overallocated (${Math.round(availability.utilizationAfter)}% utilization)`);
    } else if (availability.utilizationAfter > 90) {
      warnings.push('Near capacity - limited flexibility');
    } else {
      reasons.push(`Available (${Math.round(100 - availability.utilizationAfter)}% capacity remaining)`);
    }

    // 3. Cost fit (20% weight)
    const costFit = calculateCostFit(member, task.estimatedHours, task.budget);
    if (costFit.withinBudget) {
      reasons.push(`Within budget ($${costFit.estimatedCost.toLocaleString()})`);
    } else {
      warnings.push(`Over budget ($${costFit.estimatedCost.toLocaleString()} vs ${task.budget?.toLocaleString()})`);
    }

    // 4. Location match (10% weight)
    let locationScore = 50; // Default neutral
    if (task.location && member.location === task.location) {
      locationScore = 100;
      reasons.push('Same location - no travel needed');
    } else if (task.location && member.location !== task.location) {
      locationScore = 30;
      warnings.push('Different location - travel required');
    }

    // 5. Priority boost
    const priorityBoost = calculatePriorityBoost(task.priority, member, task);

    // Calculate weighted fit score
    const fitScore = Math.min(
      (skillMatch.score * 0.4) +
      (availability.score * 0.3) +
      (costFit.score * 0.2) +
      (locationScore * 0.1) +
      priorityBoost,
      100
    );

    // Determine workload impact
    let workloadImpact: AssignmentRecommendation['workloadImpact'];
    if (availability.utilizationAfter >= 100) {
      workloadImpact = 'overloaded';
    } else if (availability.utilizationAfter >= 90) {
      workloadImpact = 'high';
    } else if (availability.utilizationAfter >= 70) {
      workloadImpact = 'acceptable';
    } else {
      workloadImpact = 'none';
    }

    recommendations.push({
      member,
      fitScore,
      reasons,
      warnings,
      estimatedCost: costFit.estimatedCost,
      availabilityMatch: availability.available,
      skillMatch: skillMatch.score,
      workloadImpact,
    });
  }

  // Sort by fit score
  recommendations.sort((a, b) => b.fitScore - a.fitScore);

  return recommendations;
}

// ============================================================================
// WORKLOAD BALANCING
// ============================================================================

export function detectOverallocation(team: TeamMember[]): {
  overallocated: TeamMember[];
  underutilized: TeamMember[];
  balanced: TeamMember[];
  recommendations: string[];
} {
  const overallocated: TeamMember[] = [];
  const underutilized: TeamMember[] = [];
  const balanced: TeamMember[] = [];
  const recommendations: string[] = [];

  for (const member of team) {
    const utilization = (member.currentWorkload / member.availability) * 100;

    if (utilization > 100) {
      overallocated.push(member);
      recommendations.push(
        `${member.name} overallocated at ${Math.round(utilization)}% - reassign ${Math.round(member.currentWorkload - member.availability)}h`
      );
    } else if (utilization < 50) {
      underutilized.push(member);
      recommendations.push(
        `${member.name} underutilized at ${Math.round(utilization)}% - can take ${Math.round(member.availability - member.currentWorkload)}h more`
      );
    } else {
      balanced.push(member);
    }
  }

  return {
    overallocated,
    underutilized,
    balanced,
    recommendations,
  };
}

// ============================================================================
// AUTO-ASSIGNMENT (HIGH CONFIDENCE ONLY)
// ============================================================================

export function autoAssignTask(
  task: TaskRequirements,
  team: TeamMember[],
  confidenceThreshold: number = 85
): {
  assigned: boolean;
  assignedTo?: TeamMember;
  reason?: string;
  alternatives?: AssignmentRecommendation[];
} {
  const recommendations = recommendAssignments(task, team);

  // Only auto-assign if:
  // 1. Top recommendation has high fit score (>= threshold)
  // 2. No critical warnings
  // 3. Available

  const topChoice = recommendations[0];

  if (!topChoice) {
    return {
      assigned: false,
      reason: 'No suitable team members found',
    };
  }

  const hasCriticalWarnings = topChoice.warnings.some(w => 
    w.includes('Missing skills') || w.includes('Overallocated')
  );

  if (
    topChoice.fitScore >= confidenceThreshold &&
    !hasCriticalWarnings &&
    topChoice.availabilityMatch
  ) {
    return {
      assigned: true,
      assignedTo: topChoice.member,
      reason: `Auto-assigned based on ${Math.round(topChoice.fitScore)}% fit: ${topChoice.reasons[0]}`,
      alternatives: recommendations.slice(1, 3),
    };
  }

  return {
    assigned: false,
    reason: `Low confidence (${Math.round(topChoice.fitScore)}%) - manual review recommended`,
    alternatives: recommendations.slice(0, 3),
  };
}

// ============================================================================
// BULK ASSIGNMENT OPTIMIZATION
// ============================================================================

export function optimizeTeamAssignments(
  tasks: TaskRequirements[],
  team: TeamMember[]
): {
  assignments: Map<string, TeamMember>;
  unassigned: TaskRequirements[];
  totalCost: number;
  utilizationReport: {
    member: TeamMember;
    utilization: number;
    assignedTasks: number;
  }[];
} {
  const assignments = new Map<string, TeamMember>();
  const unassigned: TaskRequirements[] = [];
  let totalCost = 0;

  // Clone team to track workload changes
  const teamClone = team.map(m => ({ ...m }));

  // Sort tasks by priority (highest first)
  const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);

  for (const task of sortedTasks) {
    const result = autoAssignTask(task, teamClone, 75); // Lower threshold for bulk

    if (result.assigned && result.assignedTo) {
      const taskId = `task_${Math.random().toString(36).substr(2, 9)}`;
      assignments.set(taskId, result.assignedTo);
      
      // Update workload
      const memberIndex = teamClone.findIndex(m => m.id === result.assignedTo!.id);
      if (memberIndex >= 0) {
        teamClone[memberIndex].currentWorkload += task.estimatedHours;
        totalCost += result.assignedTo.hourlyRate * task.estimatedHours;
      }
    } else {
      unassigned.push(task);
    }
  }

  // Generate utilization report
  const utilizationReport = teamClone.map(member => ({
    member,
    utilization: (member.currentWorkload / member.availability) * 100,
    assignedTasks: Array.from(assignments.values()).filter(m => m.id === member.id).length,
  })).sort((a, b) => b.utilization - a.utilization);

  return {
    assignments,
    unassigned,
    totalCost,
    utilizationReport,
  };
}
