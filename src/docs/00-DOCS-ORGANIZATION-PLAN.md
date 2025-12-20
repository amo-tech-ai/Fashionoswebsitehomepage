# Documentation Organization Plan
## Systematic File Renaming - December 20, 2024

This document maps all current /docs files to their new numbered names following logical progression.

---

## RENAMING STRATEGY

**Logical Order:**
1. Overview & Index (01-03)
2. PRD & Core Specs (04-08)
3. Technical Architecture (09-12)
4. Core Systems (13-18)
5. Dashboards (19-21)
6. Wizards & Flows (22-26)
7. Implementation Guides (27-30)
8. Production Readiness (31-34)
9. Summaries & Status (35-40)

---

## COMPLETE RENAMING MAP

### OVERVIEW & INDEX (01-03)

| Current Name | New Name |
|-------------|----------|
| `DOC-INDEX.md` | `01-DOC-INDEX.md` |
| `EXECUTIVE-SUMMARY.md` | `02-EXECUTIVE-SUMMARY.md` |
| `QUICK-REFERENCE.md` | `03-QUICK-REFERENCE.md` |

### PRD & CORE SPECS (04-09)

| Current Name | New Name |
|-------------|----------|
| `PRD-FashionOS.md` | `04-PRD-FashionOS.md` |
| `PRD-Services.md` | `05-PRD-Services.md` |
| `style-guide.md` | `06-style-guide.md` |
| `cta.md` | `07-cta.md` |
| `08-one-system-design-spec.md` | `08-one-system-design-spec.md` *(already numbered)* |
| `sitemap.md` | `09-sitemap.md` |

### TECHNICAL ARCHITECTURE (10-13)

| Current Name | New Name |
|-------------|----------|
| `Technical-Architecture.md` | `10-Technical-Architecture.md` |
| `API-Reference.md` | `11-API-Reference.md` |
| `sidebar-architecture.md` | `12-sidebar-architecture.md` |
| `sitemap-features.md` | `13-sitemap-features.md` |

### CORE SYSTEMS (14-19)

| Current Name | New Name |
|-------------|----------|
| `events-system.md` | `14-events-system.md` |
| `User-Guide.md` | `15-User-Guide.md` |
| `014-brand-wizard.md` | `16-brand-wizard.md` *(remove 014 prefix, use 16)* |
| `015-brand-wizard.md` | `17-brand-wizard-v2.md` *(clarify as v2)* |
| `shoot-01-ai-shoot-wizard.md` | `18-shoot-01-ai-shoot-wizard.md` |
| `shoot-builder-wizard.md` | `19-shoot-builder-wizard.md` |

### DASHBOARDS (20-22)

| Current Name | New Name |
|-------------|----------|
| `dashboards.md` | `20-dashboards.md` |
| `dashboard-style-guide.md` | `21-dashboard-style-guide.md` |
| `Executive-HQ-Implementation-Status.md` | `22-Executive-HQ-Implementation-Status.md` |

### WIZARDS & FLOWS (23-25)

| Current Name | New Name |
|-------------|----------|
| `website-wizard.md` | `23-website-wizard.md` |
| `website-pm.md` | `24-website-pm.md` |
| `SUPABASE-SETUP-GUIDE.md` | `25-SUPABASE-SETUP-GUIDE.md` |

### IMPLEMENTATION GUIDES (26-30)

| Current Name | New Name |
|-------------|----------|
| `QUICK-START-GUIDE.md` | `26-QUICK-START-GUIDE.md` |
| `README-PHASE-1.md` | `27-README-PHASE-1.md` |
| `IMPLEMENTATION-STATUS.md` | `28-IMPLEMENTATION-STATUS.md` |
| `PHASE-1-COMPLETE-SUMMARY.md` | `29-PHASE-1-COMPLETE-SUMMARY.md` |
| `SESSION-SUMMARY-DEC-20.md` | `30-SESSION-SUMMARY-DEC-20.md` |

### PRODUCTION READINESS (31-34)

| Current Name | New Name |
|-------------|----------|
| `PRODUCTION-READINESS-ROADMAP.md` | `31-PRODUCTION-READINESS-ROADMAP.md` |
| `Production-Readiness-Checklist.md` | `32-Production-Readiness-Checklist.md` |
| `Next-Steps-Systematic-Roadmap.md` | `33-Next-Steps-Systematic-Roadmap.md` |
| `PROGRESS-VISUALIZATION.md` | `34-PROGRESS-VISUALIZATION.md` |

### ERROR FIXES & DEBUGGING (35-36)

| Current Name | New Name |
|-------------|----------|
| `BUILD-ERRORS-FIXED.md` | `35-BUILD-ERRORS-FIXED.md` |
| `SUPABASE-ERROR-FIXED.md` | `36-SUPABASE-ERROR-FIXED.md` |

---

## SUBDIRECTORIES (NO CHANGES)

These folders remain unchanged:
- `/docs/diagrams/` - Mermaid diagram files
- `/docs/events/` - Event system documentation
- `/docs/features/` - Feature specifications
- `/docs/page/` - Page-specific docs
- `/docs/pages/` - Dashboard page specs
- `/docs/progress/` - Progress tracking (already organized)
- `/docs/proof/` - Proof of concept docs
- `/docs/tasks/` - Task management docs
- `/docs/website/` - Website documentation
- `/docs/wizards/` - Wizard specifications

---

## EXECUTION PLAN

1. Create new files with numbered names
2. Verify content preservation
3. Delete old unnumbered files
4. Update cross-references in documentation

---

## POST-RENAME STRUCTURE

```
/docs/
├── 00-DOCS-ORGANIZATION-PLAN.md      (this file)
├── 01-DOC-INDEX.md
├── 02-EXECUTIVE-SUMMARY.md
├── 03-QUICK-REFERENCE.md
├── 04-PRD-FashionOS.md
├── 05-PRD-Services.md
├── 06-style-guide.md
├── 07-cta.md
├── 08-one-system-design-spec.md
├── 09-sitemap.md
├── 10-Technical-Architecture.md
├── 11-API-Reference.md
├── 12-sidebar-architecture.md
├── 13-sitemap-features.md
├── 14-events-system.md
├── 15-User-Guide.md
├── 16-brand-wizard.md
├── 17-brand-wizard-v2.md
├── 18-shoot-01-ai-shoot-wizard.md
├── 19-shoot-builder-wizard.md
├── 20-dashboards.md
├── 21-dashboard-style-guide.md
├── 22-Executive-HQ-Implementation-Status.md
├── 23-website-wizard.md
├── 24-website-pm.md
├── 25-SUPABASE-SETUP-GUIDE.md
├── 26-QUICK-START-GUIDE.md
├── 27-README-PHASE-1.md
├── 28-IMPLEMENTATION-STATUS.md
├── 29-PHASE-1-COMPLETE-SUMMARY.md
├── 30-SESSION-SUMMARY-DEC-20.md
├── 31-PRODUCTION-READINESS-ROADMAP.md
├── 32-Production-Readiness-Checklist.md
├── 33-Next-Steps-Systematic-Roadmap.md
├── 34-PROGRESS-VISUALIZATION.md
├── 35-BUILD-ERRORS-FIXED.md
├── 36-SUPABASE-ERROR-FIXED.md
├── diagrams/
├── events/
├── features/
├── page/
├── pages/
├── progress/
├── proof/
├── tasks/
├── website/
└── wizards/
```

---

**Total Files to Rename:** 36 files  
**Status:** Ready for execution  
**Created:** December 20, 2024
