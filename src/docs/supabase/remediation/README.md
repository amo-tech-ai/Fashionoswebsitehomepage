# Database Schema Remediation Plan — Executive Summary
## Assessment, Errors, and Staged Fix Strategy

**Created:** December 20, 2024  
**Status:** 📋 Planning Complete — Ready for Implementation  
**Risk Level:** 🟡 Medium (careful execution required)

---

## 🎯 EXECUTIVE SUMMARY

### Current State
- **Production:** 8 tables live, functioning
- **Documentation:** 2 schema docs (existing + proposed)
- **Quality:** ❌ Multiple best-practice violations identified
- **Security:** ❌ Critical RLS issues found
- **Risk:** 🔴 High if violations not fixed before expansion

### Violations Found

| Category | Count | Severity |
|----------|-------|----------|
| 🔴 Critical Security Issues | 5 | MUST FIX |
| 🟠 High-Priority Technical Debt | 5 | Fix before prod expansion |
| 🟡 Medium-Priority Style Issues | 5 | Fix in batch |
| 🟢 Low-Priority Documentation | 2 | Fix when convenient |
| **TOTAL** | **17** | - |

### Remediation Plan
- **Stages:** 6 (0-5 + ongoing)
- **Duration:** 15-20 days (full-time) or 4-6 weeks (part-time)
- **Migrations:** 53 files total
- **Tables After:** 52 (8 existing fixed + 44 new)
- **Risk Mitigation:** Each stage tested independently, rollback ready

---

## 🚨 CRITICAL FINDINGS

### 1. Security Violations (IMMEDIATE ACTION REQUIRED)

#### ❌ RLS Policies Missing `to authenticated`
- **Impact:** Implicit role binding, unpredictable access control
- **Found:** All existing RLS policies
- **Fix:** Add explicit role to every policy
- **Stage:** 1 (Existing Schema Fixes)

#### ❌ INSERT Policies Using `using` Instead of `with check`
- **Impact:** INSERT policies don't work correctly
- **Found:** All INSERT policies
- **Fix:** Replace `using` with `with check` for INSERT
- **Stage:** 1

#### ❌ Unwrapped `auth.uid()` Calls
- **Impact:** NULL comparison failures, security bypasses
- **Found:** All policies using auth.uid()
- **Fix:** Wrap in subquery: `(select auth.uid())`
- **Stage:** 1

#### ❌ Missing Join-Scoped RLS for Child Tables
- **Impact:** Multi-tenant isolation broken on child tables
- **Found:** tasks, sponsors, budget_items, assets (existing) + all proposed child tables
- **Fix:** Rewrite policies to join through parent tables
- **Stage:** 1 (existing), 3 (new tables)

#### ❌ Plaintext OAuth Tokens in Proposed Tables
- **Impact:** Credential leak, account takeover risk
- **Found:** Tier 3 social/commerce integration tables
- **Fix:** Remove token columns, use Supabase Vault
- **Stage:** 6

---

### 2. Technical Debt (HIGH PRIORITY)

#### ⚠️ Using Deprecated `uuid_generate_v4()`
- **Impact:** Requires uuid-ossp extension
- **Fix:** Replace with `gen_random_uuid()`
- **Stage:** 1

#### ⚠️ Unsafe Trigger Function (No search_path)
- **Impact:** Security vulnerability
- **Fix:** Add `set search_path = ''`
- **Stage:** 1

#### ⚠️ Array Dependency Anti-Pattern
- **Impact:** Poor performance, no referential integrity
- **Found:** tasks.dependency_task_ids uuid[]
- **Fix:** Create task_dependencies join table
- **Stage:** 4

#### ⚠️ date + time text Instead of timestamptz
- **Impact:** Timezone issues, query complexity
- **Found:** Proposed scheduling tables
- **Fix:** Use timestamptz
- **Stage:** 3

#### ⚠️ Using `for all` Instead of Granular Policies
- **Impact:** Over-permissive, harder to audit
- **Fix:** Split into separate operation policies
- **Stage:** 1

---

### 3. Style Violations (MEDIUM PRIORITY)

- Uppercase SQL keywords (all tables)
- Missing table comments (all tables)
- Missing column comments (key fields)
- Inconsistent index naming
- Inconsistent constraint naming

**Fix:** Stage 1 (existing), Stages 3-6 (new tables)

---

## 📊 ASSESSED RISKS

### Risk Matrix

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Production data loss | Low | 🔴 Critical | Stage 1 changes are additive only |
| Breaking existing app | Medium | 🔴 Critical | Non-breaking change policy enforced |
| RLS misconfiguration | High | 🔴 Critical | Test suite + verification queries per stage |
| Performance regression | Low | 🟠 High | EXPLAIN ANALYZE all new policies |
| Token leakage | Medium | 🔴 Critical | Stage 6 blocked until security review |
| Migration order errors | Medium | 🟠 High | Dependency tracking in migration headers |

### Risk Mitigation Strategies

1. **Non-Breaking Change Policy**
   - Stage 0: Document naming conventions
   - No column renames without compatibility views
   - No table drops without app refactor first

2. **Incremental Testing**
   - Each stage tested independently
   - Local database reset before each stage
   - Rollback plan documented per migration

3. **Security Review Gates**
   - Stage 1: RLS test suite must pass 100%
   - Stage 6: Security lead approval required before token handling
   - All stages: Tenant isolation tests

4. **Performance Validation**
   - EXPLAIN ANALYZE on all new policies
   - No sequential scans on large tables
   - Index usage verification

---

## 🔄 REMEDIATION STAGES

### Stage 0: Foundation (1 day, Low Risk)
**Goal:** Establish naming conventions and compatibility plan

**Deliverables:**
- Naming decision: `users` (canonical) vs `profiles` (compatibility view if needed)
- Non-breaking change policy documented
- Migration convention defined
- Extension requirements (pgcrypto for gen_random_uuid())

**Verification:**
- [ ] Team consensus on naming
- [ ] Policy documented
- [ ] Extensions enabled

---

### Stage 1: Fix Existing Schema (2-3 days, Medium Risk)
**Goal:** Bring 8 production tables to best practices

**Tables:** organizations, users, events, tasks, sponsors, budget_items, assets, campaigns

**Fixes Per Table:**
- Convert SQL to lowercase
- Replace uuid_generate_v4() → gen_random_uuid()
- Add table + column comments
- Fix RLS: add `to authenticated`, use `with check` for INSERT
- Fix RLS: wrap auth.uid()
- Fix RLS: join-scoped for child tables
- Document trigger function with safe search_path

**Migrations:** 8 files (1 per table)

**Verification:**
- [ ] RLS test suite passes (select/insert/update/delete per table per role)
- [ ] No data access regression
- [ ] App works unchanged
- [ ] TypeScript types regenerated

**Rollback:** Drop new policies, recreate old ones (no data loss)

---

### Stage 2: Patterns Library (1 day, Low Risk)
**Goal:** Create reusable templates to prevent future violations

**Deliverables:**
- Migration header template
- Table creation template
- RLS pattern: org-scoped
- RLS pattern: join-scoped (1 level)
- RLS pattern: join-scoped (2 levels)
- RLS pattern: public read
- RLS pattern: user-scoped
- Trigger function template
- Index templates
- Constraint templates
- Verification query templates

**Verification:**
- [ ] All templates compile
- [ ] Templates match best practices

---

### Stage 3: Tier 1 Tables (3-4 days, Medium Risk)
**Goal:** Add core operations tables with correct RLS

**Tables:** 14 new tables
- Ticketing: ticket_tiers, registrations, payments
- Event structure: event_phases, event_schedules, event_rehearsals, event_assets
- Venues: venues, venue_availability
- Teams: stakeholders, event_stakeholders, task_assignees, organizer_teams, organizer_team_members

**Critical Requirements:**
- ALL policies join-scoped where org_id not present
- Replace date+time text with timestamptz
- Conflict detection for scheduling
- Capacity limits enforced

**Migrations:** 14 files

**Verification:**
- [ ] Tenant isolation works (cross-org blocked)
- [ ] Join-scoped policies correct (EXPLAIN ANALYZE)
- [ ] Schedule conflicts detected
- [ ] Capacity limits enforced
- [ ] Role permissions work

**Rollback:** Drop tables with cascade (no app dependencies)

---

### Stage 4: Anti-Pattern Fixes (2-3 days, High Risk)
**Goal:** Fix array dependencies and sponsorship structure

**Changes:**
1. **Task Dependencies** (Breaking)
   - Create task_dependencies join table
   - Migrate array data
   - Add compatibility view
   - Update app
   - Drop old column (later)

2. **Sponsorship** (Optional)
   - Decision: keep current OR split into sponsor_organizations + event_sponsors
   - Recommend: keep simple for now

**Migrations:** 3 files (dependencies table + data migration + view)

**Verification:**
- [ ] Dependency graph queries work
- [ ] Circular dependency prevention works
- [ ] App updated
- [ ] Old data migrated correctly

**Rollback:** Keep old column, use compatibility view

---

### Stage 5: Tier 2 Tables (3-4 days, Medium Risk)
**Goal:** Add model casting, designers, shoots

**Tables:** 16 new tables
- Model casting: model_agencies, model_profiles, event_models, model_availability, call_times
- Designers: fashion_brands, designer_profiles, event_designers, designer_availability
- Sponsorship (if split): sponsor_organizations, event_sponsors_junction, sponsorship_packages
- Shoots: shoots, shoot_items, shoot_assets, shoot_payments

**Migrations:** 13-16 files

**Verification:**
- [ ] Model booking flow works
- [ ] Designer showcase works
- [ ] Shoot workflow complete
- [ ] Multi-tenant isolation works

**Rollback:** Drop tables (no dependencies)

---

### Stage 6: Tier 3 Tables (4-5 days, High Risk — Security Critical)
**Goal:** Social media, e-commerce, advanced media

**Tables:** 14 new tables
- Media: media_size_specs, asset_variants, cloudinary_assets, asset_links
- Social: instagram_connections, instagram_posts, facebook_connections, facebook_posts
- E-commerce: shopify_shops, shopify_products, shopify_media_links, amazon_connections, amazon_products, amazon_media_links

**CRITICAL SECURITY RULE:**
❌ NO plaintext OAuth tokens in client-readable tables
✅ Tokens in Supabase Vault or encrypted server-only table

**Token Handling Architecture:**
```
Frontend OAuth flow
  ↓
Edge Function exchanges code
  ↓
Store token in Vault (encrypted)
  ↓
Write connection metadata to DB (NO TOKEN)
  ↓
Client reads status only
  ↓
Edge Function reads Vault for API calls
```

**Additional Security:**
- Webhook idempotency
- Rate limiting
- Audit logging
- Token rotation

**Migrations:** 15 files

**Verification:**
- [ ] Client CANNOT read tokens (test with anon key)
- [ ] Edge Functions CAN access Vault
- [ ] OAuth flow works
- [ ] Webhook replay blocked
- [ ] Rate limits work

**Rollback:** Drop tables + vault entries (users must re-auth)

---

## 📋 IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Read all 6 remediation docs
- [ ] Review patterns library
- [ ] Understand failure points document
- [ ] Set up local Supabase environment
- [ ] Create backup of production database
- [ ] Schedule time blocks (don't rush)

### Per Stage
- [ ] Read stage task document fully
- [ ] Review failure points for that stage
- [ ] Write migration(s) using templates
- [ ] Test migration on local database
- [ ] Run verification queries
- [ ] Check RLS policies with test users
- [ ] Document any deviations
- [ ] Get peer review before deploying
- [ ] Deploy to staging (if available)
- [ ] Test app integration
- [ ] Deploy to production
- [ ] Verify production works
- [ ] Update progress table

### After All Stages
- [ ] Run full test suite
- [ ] Regenerate TypeScript types
- [ ] Update documentation
- [ ] Archive old schema docs
- [ ] Schedule retrospective

---

## 🎯 SUCCESS METRICS

### Code Quality
- ✅ 100% of SQL keywords lowercase
- ✅ 100% of tables have comments
- ✅ 100% of UUIDs use gen_random_uuid()
- ✅ 100% of indexes follow naming convention
- ✅ 100% of constraints follow naming convention

### Security
- ✅ 100% of tables have RLS enabled
- ✅ 100% of policies specify explicit role
- ✅ 100% of INSERT policies use `with check`
- ✅ 0 `for all` policies remain
- ✅ 0 unwrapped auth.uid() calls
- ✅ 0 plaintext tokens in client tables
- ✅ 100% tenant isolation tests pass

### Data Modeling
- ✅ 0 uuid[] arrays for relationships
- ✅ 0 date+time text fields
- ✅ 100% of foreign keys have indexes
- ✅ 100% of join-scoped policies correct

### Testing
- ✅ 100% RLS tests pass
- ✅ 100% constraint tests pass
- ✅ 0 performance regressions
- ✅ 100% app integration tests pass

---

## 📚 DOCUMENTATION STRUCTURE

```
/docs/supabase/remediation/
├── README.md                     ← You are here (Executive Summary)
├── 00-INDEX.md                   ← Detailed stage breakdown
├── 00-DECISIONS.md               ← Stage 0: Naming & conventions (TODO)
├── 01-EXISTING-FIXES.md          ← Stage 1: Fix 8 tables (TODO)
├── 02-PATTERNS-LIBRARY.md        ✅ Copy/paste templates (DONE)
├── 03-TIER-1-TABLES.md           ← Stage 3: Core ops (TODO)
├── 04-ANTI-PATTERN-FIXES.md      ← Stage 4: Dependencies (TODO)
├── 05-TIER-2-TABLES.md           ← Stage 5: Production features (TODO)
├── 06-TIER-3-TABLES.md           ← Stage 6: Advanced + security (TODO)
└── 99-FAILURE-POINTS.md          ✅ Known issues checklist (DONE)
```

**Status:**
- ✅ Complete: Index, Failure Points, Patterns Library, Executive Summary
- 📋 Pending: Stage 0-1, 3-6 detailed task files

---

## 🚀 NEXT STEPS

### Immediate (This Week)
1. **Review this plan** with engineering team
2. **Schedule kick-off meeting** to align on approach
3. **Complete Stage 0** (naming decisions) — **1 day**
4. **Assign ownership** for each stage

### Week 1-2 (Foundation)
1. Complete Stage 1 (fix existing 8 tables) — **2-3 days**
2. Deploy Stage 1 to staging
3. Test thoroughly before production deploy
4. Deploy Stage 1 to production

### Week 2-3 (Core Expansion)
1. Complete Stage 3 (Tier 1 tables) — **3-4 days**
2. Test tenant isolation rigorously
3. Deploy Stage 3

### Week 3-4 (Refactoring)
1. Complete Stage 4 (anti-patterns) — **2-3 days**
2. Coordinate with frontend team for app updates
3. Deploy with compatibility view

### Week 4-5 (Production Features)
1. Complete Stage 5 (Tier 2 tables) — **3-4 days**
2. Test model/designer workflows
3. Deploy Stage 5

### Week 5-6 (Advanced Features)
1. **Security review** before starting Stage 6
2. Complete Stage 6 (Tier 3 tables) — **4-5 days**
3. Test OAuth flows extensively
4. Deploy Stage 6 with monitoring

### Ongoing
- Monitor performance
- Update TypeScript types after each stage
- Document any issues encountered
- Share learnings with team

---

## ❓ FREQUENTLY ASKED QUESTIONS

### Q: Can we skip fixing the existing tables and just add new ones correctly?
**A:** ❌ No. The existing violations create security risks and set bad precedents. Fix them first (Stage 1), then expand with correct patterns (Stages 3-6).

### Q: Why so many stages? Can we batch them?
**A:** Each stage has different risk profiles. Batching increases risk of cascading failures. Better to test each stage independently.

### Q: What if Stage 1 breaks the app?
**A:** Stage 1 changes are designed to be non-breaking (additive). RLS policies are replaced, not removed. Test suite verifies no access regression. Rollback plan ready.

### Q: Do we have to do ALL stages?
**A:** Stages 0-1 are REQUIRED (fix security issues). Stages 3-6 are OPTIONAL (add features as needed). But if you add new tables, MUST follow patterns from Stage 2.

### Q: Can we deploy directly to production?
**A:** ❌ Not recommended. Deploy to staging first, test thoroughly, then production. Especially for Stage 1 (affects live data) and Stage 6 (security-critical).

### Q: What happens if we violate best practices again after this?
**A:** Use Stage 2 patterns library. Every new table should follow templates. Code review should catch violations. Consider adding automated checks (linters).

### Q: How do we handle the users vs profiles naming issue?
**A:** Stage 0 decides this. Recommend: keep `users` as canonical, create `profiles` VIEW if needed for compatibility. Document in 00-DECISIONS.md.

---

## 📞 SUPPORT & ESCALATION

### For Questions:
- Read relevant stage doc first
- Check patterns library for examples
- Review failure points for known issues
- Ask team lead if still unclear

### For Blockers:
- Document the blocker
- Check rollback plan
- Don't proceed if uncertain
- Escalate to senior engineer

### For Production Issues:
- Immediate rollback if data at risk
- Check monitoring/logs
- Run verification queries
- Review failure points checklist

---

## ✅ APPROVAL & SIGN-OFF

**Plan Status:** 📋 Draft — Pending Approval

**Required Approvals:**
- [ ] Engineering Lead (technical approach)
- [ ] Security Lead (Stage 6 token handling)
- [ ] Product Lead (timeline, priorities)
- [ ] CTO (overall risk assessment)

**Approval Criteria:**
- Remediation approach sound
- Risk mitigation adequate
- Timeline realistic
- Resources available
- Security review scheduled

---

**Plan Created:** December 20, 2024  
**Plan Author:** FashionOS Engineering  
**Next Review:** After Stage 0 complete  
**Status:** READY FOR TEAM REVIEW
