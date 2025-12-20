/**
 * AgentOrchestrator Tests - Verify intent detection and routing
 * 
 * Run with: npm test (if test runner configured)
 * Or manually verify with: node -r ts-node/register AgentOrchestrator.test.ts
 */

import { detectIntent, orchestrateResponse } from '../skills/AgentOrchestrator';
import type { OrchestratorContext } from '../skills/AgentOrchestrator';

// ============================================================================
// TEST DATA
// ============================================================================

const mockContext: OrchestratorContext = {
  currentKit: 'logistics',
  currentRoute: '/sample-tracker',
  samples: [
    {
      id: '1',
      name: 'Sample Dress 1',
      brand: 'Luxury Brand',
      category: 'Dresses',
      status: 'on_set',
      location: 'Studio A',
      dueDate: new Date('2025-12-20'),
      priority: 1,
    },
  ],
  userActivity: {
    visitedPages: ['/'],
    completedActions: [],
    createdProjects: 0,
    lastVisit: new Date(),
    accountAge: 2,
  },
};

// ============================================================================
// INTENT DETECTION TESTS
// ============================================================================

export function testIntentDetection() {
  console.log('🧪 Testing Intent Detection...\n');

  const tests = [
    {
      message: 'Are my samples ready for the shoot?',
      expectedIntent: 'logistics',
      context: { ...mockContext, currentKit: 'logistics' },
    },
    {
      message: 'What blockers are on the critical path?',
      expectedIntent: 'events',
      context: { ...mockContext, currentKit: 'events' },
    },
    {
      message: 'How is the asset quality?',
      expectedIntent: 'media',
      context: { ...mockContext, currentKit: 'media' },
    },
    {
      message: 'Which service package do you recommend?',
      expectedIntent: 'services',
      context: { ...mockContext, currentKit: 'services' },
    },
    {
      message: 'How do I get started?',
      expectedIntent: 'navigation',
      context: { ...mockContext, currentKit: 'marketing' },
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = detectIntent(test.message, test.context);
    const success = result.intent === test.expectedIntent;

    if (success) {
      console.log(`✅ PASS: "${test.message}"`);
      console.log(`   Intent: ${result.intent} (confidence: ${(result.confidence * 100).toFixed(0)}%)\n`);
      passed++;
    } else {
      console.log(`❌ FAIL: "${test.message}"`);
      console.log(`   Expected: ${test.expectedIntent}, Got: ${result.intent}\n`);
      failed++;
    }
  }

  console.log(`\n📊 Intent Detection Results: ${passed}/${tests.length} passed\n`);
  return { passed, failed };
}

// ============================================================================
// RESPONSE ORCHESTRATION TESTS
// ============================================================================

export function testResponseOrchestration() {
  console.log('🧪 Testing Response Orchestration...\n');

  const tests = [
    {
      message: 'Are my samples ready?',
      context: { ...mockContext, currentKit: 'logistics' },
      shouldInclude: ['ready', 'sample'],
    },
    {
      message: 'Help me get started',
      context: { ...mockContext, currentKit: 'marketing' },
      shouldInclude: ['started'],
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = orchestrateResponse(test.message, test.context);
    const responseLower = result.response.toLowerCase();
    
    const containsKeywords = test.shouldInclude.every(keyword => 
      responseLower.includes(keyword.toLowerCase())
    );

    if (result.response && result.response.length > 10) {
      console.log(`✅ PASS: "${test.message}"`);
      console.log(`   Intent: ${result.intent}`);
      console.log(`   Response: ${result.response.slice(0, 80)}...`);
      console.log(`   Actions: ${result.suggestedActions?.length || 0}\n`);
      passed++;
    } else {
      console.log(`❌ FAIL: "${test.message}"`);
      console.log(`   No response generated\n`);
      failed++;
    }
  }

  console.log(`\n📊 Orchestration Results: ${passed}/${tests.length} passed\n`);
  return { passed, failed };
}

// ============================================================================
// CONTEXT-AWARE ROUTING TESTS
// ============================================================================

export function testContextAwareRouting() {
  console.log('🧪 Testing Context-Aware Routing...\n');

  const message = 'What is ready?'; // Ambiguous message

  const contexts = [
    { kit: 'logistics', expectedIntent: 'logistics' },
    { kit: 'events', expectedIntent: 'events' },
    { kit: 'media', expectedIntent: 'media' },
  ];

  let passed = 0;
  let failed = 0;

  for (const ctx of contexts) {
    const context: OrchestratorContext = {
      ...mockContext,
      currentKit: ctx.kit,
    };

    const result = detectIntent(message, context);
    const success = result.intent === ctx.expectedIntent;

    if (success) {
      console.log(`✅ PASS: "${message}" in ${ctx.kit} kit`);
      console.log(`   Correctly routed to: ${result.intent}\n`);
      passed++;
    } else {
      console.log(`❌ FAIL: "${message}" in ${ctx.kit} kit`);
      console.log(`   Expected: ${ctx.expectedIntent}, Got: ${result.intent}\n`);
      failed++;
    }
  }

  console.log(`\n📊 Context-Aware Results: ${passed}/${contexts.length} passed\n`);
  return { passed, failed };
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================

export function runAllTests() {
  console.log('🚀 Running AgentOrchestrator Tests...\n');
  console.log('=' .repeat(60) + '\n');

  const intentResults = testIntentDetection();
  console.log('=' .repeat(60) + '\n');

  const orchestrationResults = testResponseOrchestration();
  console.log('=' .repeat(60) + '\n');

  const contextResults = testContextAwareRouting();
  console.log('=' .repeat(60) + '\n');

  const totalPassed = intentResults.passed + orchestrationResults.passed + contextResults.passed;
  const totalTests = intentResults.passed + intentResults.failed + 
                     orchestrationResults.passed + orchestrationResults.failed +
                     contextResults.passed + contextResults.failed;

  console.log(`\n🎯 OVERALL RESULTS: ${totalPassed}/${totalTests} tests passed\n`);

  if (totalPassed === totalTests) {
    console.log('✅ ALL TESTS PASSED! AgentOrchestrator is production ready.\n');
    return true;
  } else {
    console.log(`⚠️  ${totalTests - totalPassed} test(s) failed. Review and fix.\n`);
    return false;
  }
}

// Run tests if executed directly
if (typeof module !== 'undefined' && require.main === module) {
  runAllTests();
}
