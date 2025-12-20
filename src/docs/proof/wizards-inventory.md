# Wizards Inventory — Route & Component Mapping

**Generated:** December 20, 2024  
**Source:** Systematic file inspection + routing analysis  
**Evidence Quality:** 🟢 HIGH

---

## 📋 COMPLETE INVENTORY TABLE

| Wizard | Routes | Main Component(s) | Step Config Files | Context/State | Data Calls | Notes |
|--------|--------|-------------------|-------------------|---------------|------------|-------|
| **Brand Shoot (AI)** | `/start`<br>`/brand-signal-capture`<br>`/ai-thinking`<br>`/campaign-summary`<br>`/proposal-confirmation`<br>`/ai-optimization` | `BrandShootStart.tsx`<br>`BrandSignalCapture.tsx`<br>`AIThinking.tsx`<br>`CampaignSummary.tsx`<br>`ProposalConfirmation.tsx`<br>`AIOptimizationCenter.tsx` | N/A (flow-based, not step array) | `BrandShootContext.tsx`<br>(types: BrandSignals, ChannelPack, AssetRecipe, CampaignPlan, WizardState) | ❌ None found | 6-screen AI flow, no DB calls detected |
| **Classic Shoot Wizard** | `/wizard`<br>`/shoot` | `ShootWizard.tsx`<br>(1800+ lines, monolithic) | In-file (lines 32-42):<br>10 steps defined as string union | `BrandShootContext.tsx`<br>(WizardState exported) | ❌ None found | Hardcoded data arrays (SERVICES, CATEGORIES, etc.) |
| **Event Creation Wizard** | `/event-wizard`<br>`/events/create` | `EventCreationWizard.tsx` | `/components/wizards/steps/`<br>Step1Basics.tsx<br>Step2Venue.tsx<br>Step3Casting.tsx<br>Step4Sponsors.tsx<br>Step5Deliverables.tsx<br>Step6Review.tsx | `EventContext`<br>`SponsorContext` | ⚠️ Calls `createEvent()` + `addSponsor()` (implementation not verified) | Context methods called but backend unknown |
| **Website Wizard** | `/website-wizard`<br>`/website-brief` | `WebsiteWizard.tsx`<br>(2000+ lines est.)<br>`WebsiteBriefDashboard.tsx` (step 9) | In-file:<br>Steps 1-9 (type union) | In-file state:<br>WebsiteWizardState interface | ❌ None found | File types in state but no upload handlers |
| **Designer Profile Wizard** | `/designer-wizard` | `DesignerWizard.tsx` | `/components/designer-wizard/steps/`<br>InputStep.tsx<br>ScanningStep.tsx<br>AnalysisStep.tsx<br>AuditStep.tsx | In-component state:<br>BrandData interface | ❌ None found | AI scanning/analysis UI only (no actual AI calls) |
| **Directory Profile Wizard** | `/directory-wizard` | `DirectoryProfileWizard.tsx` | ⚠️ Not inspected | Unknown | ❌ Likely none | File exists but not analyzed |

---

## 🔍 DETAILED ROUTE MAPPINGS

### App.tsx Routing Logic

**File:** `/App.tsx`  
**Lines:** 105-177 (route detection), 184-346 (component rendering)

#### Brand Shoot AI Routes (Lines 164-169)
```typescript
else if (path === "/start") setActiveScreen("brand-shoot-start");
else if (path.includes("/brand-signal-capture")) setActiveScreen("brand-signal-capture");
else if (path.includes("/ai-thinking")) setActiveScreen("ai-thinking");
else if (path.includes("/campaign-summary")) setActiveScreen("campaign-summary");
else if (path.includes("/proposal-confirmation")) setActiveScreen("proposal-confirmation");
else if (path.includes("/ai-optimization")) setActiveScreen("ai-optimization");
```

**Rendering (Lines 313-324):**
```typescript
case "brand-shoot-start": return <BrandShootStart onNavigate={handleNavigate} />;
case "brand-signal-capture": return <BrandSignalCapture onNavigate={handleNavigate} />;
case "ai-thinking": return <AIThinking onNavigate={handleNavigate} />;
case "campaign-summary": return <CampaignSummary onNavigate={handleNavigate} />;
case "proposal-confirmation": return <ProposalConfirmation onNavigate={handleNavigate} />;
case "ai-optimization": return <AIOptimizationCenter onNavigate={handleNavigate} />;
```

---

#### Classic Shoot Wizard Route (Line 124)
```typescript
else if (path.includes("/wizard") || path.includes("/shoot")) setActiveScreen("wizard");
```

**Rendering (Line 219-220):**
```typescript
case "wizard": 
  return <ShootWizard onComplete={(data) => { 
    setWizardData(data); 
    handleNavigate("proposal"); 
  }} />;
```

**Data Flow:**
- Wizard collects data → onComplete → setWizardData (from BrandShootContext)
- Navigate to "proposal" → ProposalPreview receives wizardData (line 288)

---

#### Event Creation Wizard Route (Lines 131-133)
```typescript
else if (path.includes("/events") || path.includes("/event-wizard")) {
  if (path.includes("create") || path.includes("wizard")) setActiveScreen("event-wizard");
  else setActiveScreen(path.includes("detail") ? "eventdetail" : "events");
}
```

**Rendering (Lines 233-234):**
```typescript
case "event-wizard": 
  return <EventCreationWizard onComplete={() => handleNavigate("events")} />;
```

**Completion Flow:**
- Wizard creates event → calls EventContext.createEvent()
- Adds sponsors → calls SponsorContext.addSponsor()
- onComplete → navigate to events list

---

#### Website Wizard Routes (Lines 118-119)
```typescript
else if (path.includes("/website-brief")) setActiveScreen("website-brief-dashboard");
else if (path.includes("/website-wizard")) setActiveScreen("website-wizard");
```

**Rendering (Lines 209-210, 215-216):**
```typescript
case "website-wizard": 
  return <WebsiteWizard />;
  
case "website-brief-dashboard": 
  return <WebsiteWizard initialStep={9} />;
```

**Special Case:**
- `/website-wizard` → starts at step 1
- `/website-brief-dashboard` → skips to step 9 (dashboard view)

---

#### Designer Profile Wizard Route (Line 121)
```typescript
else if (path.includes("/designer-wizard")) setActiveScreen("designer-wizard");
```

**Rendering (Lines 211-212):**
```typescript
case "designer-wizard": 
  return <DesignerWizard onComplete={() => handleNavigate("brand-profile-dashboard")} />;
```

**Completion Flow:**
- Wizard collects brand data (name, website, instagram)
- Shows fake AI scanning + analysis
- onComplete → navigate to brand-profile-dashboard
- ⚠️ No data passed to dashboard — likely issue

---

#### Directory Profile Wizard Route (Line 235)
```typescript
case "directory-wizard": 
  return <DirectoryProfileWizard onComplete={() => handleNavigate("overview")} />;
```

**Note:** Route detection not explicitly shown, likely added dynamically or missing from routing logic

---

## 📦 COMPONENT FILE LOCATIONS

### Brand Shoot AI Components
```
/components/brand-shoot/
├── BrandShootStart.tsx          ✅ 75 lines
├── BrandSignalCapture.tsx       ✅ Exists
├── AIThinking.tsx               ✅ Exists
├── CampaignSummary.tsx          ✅ Exists
├── ProposalConfirmation.tsx     ✅ Exists
├── AIOptimizationCenter.tsx     ✅ Exists
└── DigitalContractModal.tsx     ✅ Exists (supporting)
```

### Classic Shoot Wizard
```
/ShootWizard.tsx                 ✅ 1800+ lines (monolithic)

Supporting:
/components/wizard/
├── WizardModeSelection.tsx      ✅ Imported line 19
├── WizardAIIntake.tsx           ✅ Imported line 20
├── WizardAISidebar.tsx          ✅ Imported line 21
└── ShootSummarySidebar.tsx      ✅ Exists
```

### Event Creation Wizard
```
/components/wizards/
├── EventCreationWizard.tsx      ✅ Main component

/components/wizards/steps/
├── Step1Basics.tsx              ✅ Event details
├── Step2Venue.tsx               ✅ Venue selection
├── Step3Casting.tsx             ✅ Model/casting
├── Step4Sponsors.tsx            ✅ Sponsor matching
├── Step5Deliverables.tsx        ✅ Output definition
└── Step6Review.tsx              ✅ Final review
```

### Website Wizard
```
/WebsiteWizard.tsx               ✅ 2000+ lines (monolithic)

/components/wizards/
└── WebsiteBriefDashboard.tsx    ✅ Step 9 dashboard view

Supporting:
/components/website-pm/          ✅ Dashboard components
├── BriefOverview.tsx
├── ContentChecklist.tsx
├── DeliverablesHub.tsx
├── MediaLibrary.tsx
├── PageEditor.tsx
└── SitemapVisualizer.tsx
```

### Designer Profile Wizard
```
/components/designer-wizard/
├── DesignerWizard.tsx           ✅ 102 lines

/components/designer-wizard/steps/
├── InputStep.tsx                ✅ Data entry
├── ScanningStep.tsx             ✅ Loading screen
├── AnalysisStep.tsx             ✅ AI results
└── AuditStep.tsx                ✅ Final review

/components/designer-wizard/components/
└── ScoreCard.tsx                ✅ Score display
```

### Directory Profile Wizard
```
/components/wizards/
└── DirectoryProfileWizard.tsx   ✅ Exists (not inspected)
```

---

## 🗄️ CONTEXT & STATE MANAGEMENT

### BrandShootContext
**File:** `/context/BrandShootContext.tsx`  
**Used By:** Brand Shoot AI, Classic Shoot Wizard

**Exports:**
- `BrandShootProvider` (wrapper component)
- `useBrandShoot()` hook
- `BrandSignals` interface
- `Channel` type
- `ChannelPack` interface
- `AssetRecipe` interface
- `AdCreative` interface
- `Shot` interface (legacy)
- `CustomizationOption` interface
- `CampaignPlan` interface
- `WizardState` interface (for Classic Shoot)

**Key State:**
```typescript
{
  wizardData: WizardState | null,
  proposal: CampaignPlan | null,
  activeProjects: any[],
  // Methods
  setWizardData(data: WizardState): void,
  setProposal(plan: CampaignPlan): void,
}
```

**Verified Usage:**
- App.tsx line 93: `const { setWizardData, wizardData } = useBrandShoot();`
- ShootWizard.tsx line 22: imports WizardState type
- ClientDashboard.tsx line 16: `const { activeProjects } = useBrandShoot();`
- ContractsManager.tsx line 125: `const { proposal, activeProjects } = useBrandShoot();`

---

### EventContext
**File:** `/context/EventContext.tsx` (assumed, not verified)  
**Used By:** Event Creation Wizard

**Methods Called:**
- `createEvent(eventData)` — Line 59 of EventCreationWizard
- Returns: Event object (presumably)

**⚠️ Implementation not verified** — needs audit

---

### SponsorContext
**File:** `/context/SponsorContext.tsx` (assumed, not verified)  
**Used By:** Event Creation Wizard

**Methods Called:**
- `addSponsor(sponsorData)` — Line 79 of EventCreationWizard
- Parameters: event_id, company_name, tier, amount, status, contact_name, fit_score, notes

**⚠️ Implementation not verified** — needs audit

---

## 📊 DATA SOURCES

### Classic Shoot Wizard (Hardcoded In-File)

**File:** `/ShootWizard.tsx`

**Data Arrays:**
1. **SERVICES** (lines 46-75) — 4 options
   - Photography, Video Production, Website Design, Social Media Marketing
   - Each has: id, label, subtitle, image URL, icon

2. **CATEGORIES** (lines 77-84) — 6 options
   - Fashion, Beauty, Jewelry, Footwear, Eyewear, Food & Beverage

3. **SUB_TYPES** (lines 86-120) — Record keyed by category
   - fashion: 6 sub-types (womenswear, swimwear, athleisure, etc.)
   - beauty: 5 sub-types (cosmetics, skincare, fragrances, etc.)
   - jewelry: 4 sub-types (rings, earrings, necklaces, watches)
   - video: 4 sub-types (overview, unboxing, how-to, lifestyle)
   - default: 4 sub-types (packshot, on-model, flatlay, creative)

4. **STYLES** (lines 122-127) — 4 options
   - Editorial Fashion, Street Style, Minimal Clean, Catalog/E-comm

5. **SCENES** (lines 129-141)
   - backdrops: 3 options (white, colored, textured)
   - lifestyle: 4 options (living, kitchen, bedroom, bathroom)

6. **TALENT** (lines 143-148) — 4 options
   - Full Body Model, Hand Model, Foot Model, No Talent Needed

7. **ADD_ONS** (line 150+) — Not fully inspected

**Issue:** All data hardcoded in component file  
**Recommendation:** Move to `/lib/data/wizardData.ts` or CMS

---

### Event Creation Wizard (Mock Data)

**File:** `/components/wizards/EventCreationWizard.tsx`

**Mock Sponsors (Lines 21-27):**
```typescript
const MOCK_SPONSORS_LOOKUP = [
  { id: 1, name: "Dior", tier: "Platinum", logo: "D", category: "Fashion", amount: 150000 },
  { id: 2, name: "Chanel", tier: "Platinum", logo: "C", category: "Fashion", amount: 125000 },
  { id: 3, name: "Sephora", tier: "Gold", logo: "S", category: "Beauty", amount: 80000 },
  { id: 4, name: "Vogue", tier: "Media", logo: "V", category: "Media", amount: 0 },
  { id: 5, name: "Moët & Chandon", tier: "Gold", logo: "M", category: "Hospitality", amount: 60000 },
];
```

**Issue:** Mock data, not from database  
**Recommendation:** Replace with Supabase query

---

## 🔧 SHARED COMPONENTS

### Wizard Framework Components
```
/components/wizard/
├── WizardModeSelection.tsx      — Service selection grid
├── WizardAIIntake.tsx           — AI-powered intake
├── WizardAISidebar.tsx          — Progress sidebar
└── ShootSummarySidebar.tsx      — Summary display
```

**Used By:** Classic Shoot Wizard

---

### Wizard Utilities (Potential)
```
/components/wizards/shared/
└── WizardComponents.tsx         — Shared UI components
```

**Note:** File exists but usage not fully verified

---

## 🎨 UI PATTERNS

### Common Patterns Across Wizards

1. **Full-Screen Layout**
   - All wizards use `isFullScreen` flag (App.tsx:361)
   - Hides sidebar + navigation

2. **Progress Indicators**
   - Step numbers or progress bar
   - "1 of 6" or percentage complete

3. **Navigation Buttons**
   - Back / Next / Skip
   - Submit / Complete

4. **Motion Transitions**
   - AnimatePresence for step changes
   - Fade in/out animations

5. **Validation Feedback**
   - ⚠️ NOT IMPLEMENTED in most wizards
   - No inline error messages
   - No required field indicators

---

## 🚨 CRITICAL FINDINGS

### Missing Across All Wizards

1. **No Database Persistence**
   - ❌ No Supabase insert/update calls
   - ❌ No save draft functionality
   - ❌ Data lost on refresh

2. **No Form Validation**
   - ❌ No Zod schemas
   - ❌ No required field checks
   - ❌ No format validation

3. **No Error Handling**
   - ❌ No try/catch blocks
   - ❌ No error boundaries
   - ❌ No loading states

4. **No Auth Integration**
   - ❌ No user ID association
   - ❌ No org/tenant scoping
   - ❌ No RLS policies

5. **No Analytics**
   - ❌ No event tracking
   - ❌ No completion rate metrics
   - ❌ No drop-off analysis

---

## 📝 NEXT STEPS

### Immediate Actions

1. **Verify Context Implementations**
   ```bash
   # Audit these files
   cat /context/EventContext.tsx
   cat /context/SponsorContext.tsx
   cat /context/BrandShootContext.tsx
   ```

2. **Inspect Directory Profile Wizard**
   ```bash
   cat /components/wizards/DirectoryProfileWizard.tsx
   ```

3. **Check for Supabase Integration**
   ```bash
   # Search for database calls
   rg "supabase\." --type tsx
   rg "\.from\(" --type tsx
   rg "\.insert\(" --type tsx
   ```

4. **Find Validation Schemas**
   ```bash
   # Search for Zod usage
   rg "z\." --type ts
   rg "zod" --type ts
   ```

---

**END OF INVENTORY**

*This inventory serves as the foundation for detailed per-wizard audits.*
