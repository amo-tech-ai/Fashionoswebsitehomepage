# Manual Renaming Instructions for /docs Files

**Created:** December 20, 2024  
**Purpose:** Step-by-step guide to rename all /docs files with numeric prefixes

---

## LIMITATION NOTICE

Due to the tools available in this environment, bulk file renaming via bash scripts isn't possible. Files must be renamed one-by-one using read/write operations.

However, **you can execute the rename script manually** or via your local terminal.

---

## OPTION 1: Execute Rename Script (RECOMMENDED)

```bash
cd /docs
bash RENAME-SCRIPT.sh
```

This will rename all 36 files automatically.

---

## OPTION 2: Manual Renaming (if Option 1 fails)

Execute these commands in your terminal from the `/docs` directory:

### OVERVIEW & INDEX (01-03)
```bash
mv "DOC-INDEX.md" "01-DOC-INDEX.md"
mv "EXECUTIVE-SUMMARY.md" "02-EXECUTIVE-SUMMARY.md"
mv "QUICK-REFERENCE.md" "03-QUICK-REFERENCE.md"
```

### PRD & CORE SPECS (04-09)
```bash
mv "PRD-FashionOS.md" "04-PRD-FashionOS.md"
mv "PRD-Services.md" "05-PRD-Services.md"
mv "style-guide.md" "06-style-guide.md"
mv "cta.md" "07-cta.md"
# 08-one-system-design-spec.md already numbered - skip
mv "sitemap.md" "09-sitemap.md"
```

### TECHNICAL ARCHITECTURE (10-13)
```bash
mv "Technical-Architecture.md" "10-Technical-Architecture.md"
mv "API-Reference.md" "11-API-Reference.md"
mv "sidebar-architecture.md" "12-sidebar-architecture.md"
mv "sitemap-features.md" "13-sitemap-features.md"
```

### CORE SYSTEMS (14-19)
```bash
mv "events-system.md" "14-events-system.md"
mv "User-Guide.md" "15-User-Guide.md"
mv "014-brand-wizard.md" "16-brand-wizard.md"
mv "015-brand-wizard.md" "17-brand-wizard-v2.md"
mv "shoot-01-ai-shoot-wizard.md" "18-shoot-01-ai-shoot-wizard.md"
mv "shoot-builder-wizard.md" "19-shoot-builder-wizard.md"
```

### DASHBOARDS (20-22)
```bash
mv "dashboards.md" "20-dashboards.md"
mv "dashboard-style-guide.md" "21-dashboard-style-guide.md"
mv "Executive-HQ-Implementation-Status.md" "22-Executive-HQ-Implementation-Status.md"
```

### WIZARDS & FLOWS (23-25)
```bash
mv "website-wizard.md" "23-website-wizard.md"
mv "website-pm.md" "24-website-pm.md"
mv "SUPABASE-SETUP-GUIDE.md" "25-SUPABASE-SETUP-GUIDE.md"
```

### IMPLEMENTATION GUIDES (26-30)
```bash
mv "QUICK-START-GUIDE.md" "26-QUICK-START-GUIDE.md"
mv "README-PHASE-1.md" "27-README-PHASE-1.md"
mv "IMPLEMENTATION-STATUS.md" "28-IMPLEMENTATION-STATUS.md"
mv "PHASE-1-COMPLETE-SUMMARY.md" "29-PHASE-1-COMPLETE-SUMMARY.md"
mv "SESSION-SUMMARY-DEC-20.md" "30-SESSION-SUMMARY-DEC-20.md"
```

### PRODUCTION READINESS (31-34)
```bash
mv "PRODUCTION-READINESS-ROADMAP.md" "31-PRODUCTION-READINESS-ROADMAP.md"
mv "Production-Readiness-Checklist.md" "32-Production-Readiness-Checklist.md"
mv "Next-Steps-Systematic-Roadmap.md" "33-Next-Steps-Systematic-Roadmap.md"
mv "PROGRESS-VISUALIZATION.md" "34-PROGRESS-VISUALIZATION.md"
```

### ERROR FIXES & DEBUGGING (35-36)
```bash
mv "BUILD-ERRORS-FIXED.md" "35-BUILD-ERRORS-FIXED.md"
mv "SUPABASE-ERROR-FIXED.md" "36-SUPABASE-ERROR-FIXED.md"
```

---

## OPTION 3: One-Line Command

Copy and paste this entire command block:

```bash
cd /docs && \
mv "DOC-INDEX.md" "01-DOC-INDEX.md" && \
mv "EXECUTIVE-SUMMARY.md" "02-EXECUTIVE-SUMMARY.md" && \
mv "QUICK-REFERENCE.md" "03-QUICK-REFERENCE.md" && \
mv "PRD-FashionOS.md" "04-PRD-FashionOS.md" && \
mv "PRD-Services.md" "05-PRD-Services.md" && \
mv "style-guide.md" "06-style-guide.md" && \
mv "cta.md" "07-cta.md" && \
mv "sitemap.md" "09-sitemap.md" && \
mv "Technical-Architecture.md" "10-Technical-Architecture.md" && \
mv "API-Reference.md" "11-API-Reference.md" && \
mv "sidebar-architecture.md" "12-sidebar-architecture.md" && \
mv "sitemap-features.md" "13-sitemap-features.md" && \
mv "events-system.md" "14-events-system.md" && \
mv "User-Guide.md" "15-User-Guide.md" && \
mv "014-brand-wizard.md" "16-brand-wizard.md" && \
mv "015-brand-wizard.md" "17-brand-wizard-v2.md" && \
mv "shoot-01-ai-shoot-wizard.md" "18-shoot-01-ai-shoot-wizard.md" && \
mv "shoot-builder-wizard.md" "19-shoot-builder-wizard.md" && \
mv "dashboards.md" "20-dashboards.md" && \
mv "dashboard-style-guide.md" "21-dashboard-style-guide.md" && \
mv "Executive-HQ-Implementation-Status.md" "22-Executive-HQ-Implementation-Status.md" && \
mv "website-wizard.md" "23-website-wizard.md" && \
mv "website-pm.md" "24-website-pm.md" && \
mv "SUPABASE-SETUP-GUIDE.md" "25-SUPABASE-SETUP-GUIDE.md" && \
mv "QUICK-START-GUIDE.md" "26-QUICK-START-GUIDE.md" && \
mv "README-PHASE-1.md" "27-README-PHASE-1.md" && \
mv "IMPLEMENTATION-STATUS.md" "28-IMPLEMENTATION-STATUS.md" && \
mv "PHASE-1-COMPLETE-SUMMARY.md" "29-PHASE-1-COMPLETE-SUMMARY.md" && \
mv "SESSION-SUMMARY-DEC-20.md" "30-SESSION-SUMMARY-DEC-20.md" && \
mv "PRODUCTION-READINESS-ROADMAP.md" "31-PRODUCTION-READINESS-ROADMAP.md" && \
mv "Production-Readiness-Checklist.md" "32-Production-Readiness-Checklist.md" && \
mv "Next-Steps-Systematic-Roadmap.md" "33-Next-Steps-Systematic-Roadmap.md" && \
mv "PROGRESS-VISUALIZATION.md" "34-PROGRESS-VISUALIZATION.md" && \
mv "BUILD-ERRORS-FIXED.md" "35-BUILD-ERRORS-FIXED.md" && \
mv "SUPABASE-ERROR-FIXED.md" "36-SUPABASE-ERROR-FIXED.md" && \
echo "✅ All 36 files renamed successfully!"
```

---

## VERIFICATION

After renaming, verify with:

```bash
ls -1 /docs/*.md | grep "^[0-9]"
```

You should see all numbered files from 00-36.

---

## TROUBLESHOOTING

**"File not found" errors:**
- The file may have already been renamed
- Check if the source file exists: `ls -la /docs/`
- Skip that rename command and continue

**"File already exists" errors:**
- The target file may already exist
- Check if rename was already done
- Skip that rename command

---

**Total Files to Rename:** 36 files  
**Estimated Time:** 2-3 minutes  
**Created:** December 20, 2024
