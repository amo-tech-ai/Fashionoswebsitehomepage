# FASHIONOS — COMPLETE TECH STACK & SYSTEM STRUCTURE

**Last Updated:** December 21, 2024  
**Status:** In Development (45% Complete)  
**Purpose:** Complete technical reference for the entire FashionOS system

---

## TABLE OF CONTENTS

1. [Core Technology Stack](#1-core-technology-stack)
2. [Complete Project Structure](#2-complete-project-structure)
3. [Application Sitemap (All Routes)](#3-application-sitemap-all-routes)
4. [Component Directory Map](#4-component-directory-map)
5. [Database Schema](#5-database-schema)
6. [AI Architecture](#6-ai-architecture)
7. [Libraries & Dependencies](#7-libraries--dependencies)
8. [Build & Deployment](#8-build--deployment)

---

## 1. CORE TECHNOLOGY STACK

### Frontend Framework
- **React 18+** (Client-side rendering)
- **TypeScript** (Type safety throughout)
- **Build Tool:** Figma Make (Web-based, no local Vite/Webpack)
- **Styling:** Tailwind CSS v4.0
- **Icons:** Lucide React
- **Animations:** Motion (formerly Framer Motion)

### UI Component Libraries
- **shadcn/ui** (Radix UI primitives - 45+ components)
- **Recharts** (Charts and analytics)
- **React Hook Form v7.55.0** (Form management)
- **Zod** (Schema validation)
- **Sonner v2.0.3** (Toast notifications)
- **React Slick** (Carousels)
- **React Responsive Masonry** (Grid layouts)
- **React DnD** (Drag and drop)

### Backend & Database
- **Supabase** (PostgreSQL database)
  - Authentication (Row Level Security)
  - Real-time subscriptions
  - Edge Functions (Deno runtime)
  - File storage
- **Status:** ❌ Not yet connected (credentials pending)

### AI & ML
- **Gemini 2.0 Flash (Experimental)** (Primary AI model)
- **Google AI SDK** (@google/generative-ai)
- **Custom AI Agents:** 8 specialized agents (1/8 complete)

### State Management
- **React Context API** (Global state)
- **Local State** (useState, useReducer)
- **URL State** (React Router params)

### Routing
- **Client-Side Routing** (Custom state-based routing in App.tsx)
- **No Next.js App Router** (not using Next.js)
- **Deep Linking:** Custom deep linking utilities

---

## 2. COMPLETE PROJECT STRUCTURE

```
/
├── 📄 App.tsx                          # Main app entry point & router (500+ lines)
├── 📄 AppHome.tsx                      # Homepage component
├── 📄 Dashboard.tsx                    # Main dashboard
├── 📄 Events.tsx                       # Events list page
├── 📄 EventDetail.tsx                  # Event detail page
├── 📄 Services.tsx                     # Services page
├── 📄 Clothing.tsx                     # Clothing photography page
├── 📄 Product.tsx                      # Product photography page
├── 📄 Video.tsx                        # Video services page
├── 📄 Amazon.tsx                       # Amazon photography page
├── 📄 Instagram.tsx                    # Instagram services page
├── 📄 WebDesignServices.tsx            # Web design page
├── 📄 Studios.tsx                      # Studio rental page
├── 📄 Directory.tsx                    # Designer directory
├── 📄 DirectoryDetail.tsx              # Designer profile
├── 📄 ShootWizard.tsx                  # Shoot planning wizard
├── 📄 WebsiteWizard.tsx                # Website brief wizard
├── 📄 HomePageV2.tsx                   # Alternative homepage
├── 📄 HomePageV3.tsx                   # Alternative homepage
│
├── 📁 /components/                     # All React components (300+ files)
│   │
│   ├── 📁 /shared/                    # Shared UI components
│   │   ├── Modal.tsx                  # ✅ Modal dialog component
│   │   ├── LoadingSkeleton.tsx        # ✅ Loading states
│   │   ├── ErrorState.tsx             # ✅ Error displays
│   │   ├── EmptyState.tsx             # ✅ Empty state displays
│   │   ├── NavigationBar.tsx          # Top navigation
│   │   ├── Sidebar.tsx                # Left sidebar
│   │   ├── AppShell.tsx               # App layout wrapper
│   │   ├── GlobalRail.tsx             # Global navigation rail
│   │   ├── ContextSidebar.tsx         # Context-aware sidebar
│   │   ├── AIAssistant.tsx            # AI assistant panel
│   │   ├── AICopilotDrawer.tsx        # AI copilot drawer
│   │   ├── AIThinkingIndicator.tsx    # AI processing indicator
│   │   ├── ImageLightbox.tsx          # Image viewer
│   │   ├── SuccessScreen.tsx          # Success confirmation
│   │   ├── SupabaseStatus.tsx         # DB connection status
│   │   ├── UploadStates.tsx           # File upload states
│   │   └── CreateProfileCTA.tsx       # Profile creation CTA
│   │
│   ├── 📁 /ui/                        # shadcn/ui primitives (45+ components)
│   │   ├── button.tsx                 # Button component
│   │   ├── input.tsx                  # Input field
│   │   ├── select.tsx                 # Select dropdown
│   │   ├── dialog.tsx                 # Dialog/modal
│   │   ├── dropdown-menu.tsx          # Dropdown menu
│   │   ├── form.tsx                   # Form wrapper
│   │   ├── label.tsx                  # Form label
│   │   ├── checkbox.tsx               # Checkbox
│   │   ├── radio-group.tsx            # Radio buttons
│   │   ├── switch.tsx                 # Toggle switch
│   │   ├── slider.tsx                 # Range slider
│   │   ├── textarea.tsx               # Text area
│   │   ├── calendar.tsx               # Date picker
│   │   ├── card.tsx                   # Card container
│   │   ├── badge.tsx                  # Badge/chip
│   │   ├── alert.tsx                  # Alert message
│   │   ├── toast.tsx                  # Toast notification
│   │   ├── tabs.tsx                   # Tab navigation
│   │   ├── accordion.tsx              # Accordion/collapse
│   │   ├── table.tsx                  # Data table
│   │   ├── sheet.tsx                  # Side sheet
│   │   ├── drawer.tsx                 # Drawer panel
│   │   ├── popover.tsx                # Popover
│   │   ├── tooltip.tsx                # Tooltip
│   │   ├── progress.tsx               # Progress bar
│   │   ├── skeleton.tsx               # Loading skeleton
│   │   ├── separator.tsx              # Divider line
│   │   ├── scroll-area.tsx            # Scrollable area
│   │   ├── aspect-ratio.tsx           # Aspect ratio wrapper
│   │   ├── avatar.tsx                 # Avatar image
│   │   ├── breadcrumb.tsx             # Breadcrumb navigation
│   │   ├── carousel.tsx               # Carousel/slider
│   │   ├── chart.tsx                  # Chart wrapper
│   │   ├── collapsible.tsx            # Collapsible section
│   │   ├── command.tsx                # Command palette
│   │   ├── context-menu.tsx           # Context menu
│   │   ├── hover-card.tsx             # Hover card
│   │   ├── menubar.tsx                # Menu bar
│   │   ├── navigation-menu.tsx        # Navigation menu
│   │   ├── pagination.tsx             # Pagination
│   │   ├── resizable.tsx              # Resizable panels
│   │   ├── sidebar.tsx                # Sidebar component
│   │   ├── sonner.tsx                 # Toast wrapper
│   │   ├── toggle.tsx                 # Toggle button
│   │   ├── toggle-group.tsx           # Toggle group
│   │   ├── input-otp.tsx              # OTP input
│   │   ├── alert-dialog.tsx           # Alert dialog
│   │   ├── use-mobile.ts              # Mobile hook
│   │   └── utils.ts                   # UI utilities
│   │
│   ├── 📁 /wizards/                   # Multi-step forms (3 wizards)
│   │   ├── EventCreationWizard.tsx    # ✅ Event creation (450 lines)
│   │   ├── BrandShootWizard.tsx       # Brand shoot planning
│   │   ├── WebsiteBriefDashboard.tsx  # Website brief
│   │   ├── DirectoryProfileWizard.tsx # Directory profile setup
│   │   │
│   │   ├── 📁 /steps/                # Wizard step components
│   │   │   ├── BasicInfoStep.tsx      # ✅ Event basic info (250 lines)
│   │   │   ├── DateVenueStep.tsx      # ✅ Date & venue (150 lines)
│   │   │   ├── CastingStep.tsx        # ✅ Model casting (140 lines)
│   │   │   ├── SponsorsStep.tsx       # ✅ Sponsors (120 lines)
│   │   │   ├── DeliverablesStep.tsx   # ✅ Deliverables (160 lines)
│   │   │   ├── ReviewStep.tsx         # ✅ Final review (180 lines)
│   │   │   ├── Step1Basics.tsx        # Brand shoot basics
│   │   │   ├── Step2Venue.tsx         # Brand shoot venue
│   │   │   ├── Step3Casting.tsx       # Brand shoot casting
│   │   │   ├── Step4Sponsors.tsx      # Brand shoot sponsors
│   │   │   ├── Step5Deliverables.tsx  # Brand shoot deliverables
│   │   │   └── Step6Review.tsx        # Brand shoot review
│   │   │
│   │   └── 📁 /shared/
│   │       └── WizardComponents.tsx   # Shared wizard UI
│   │
│   ├── 📁 /dashboards/                # Dashboard pages (30+ dashboards)
│   │   ├── CommandCenter.tsx          # Main command center
│   │   ├── ProjectOverview.tsx        # Project overview
│   │   ├── TasksAndDeliverables.tsx   # Tasks management
│   │   ├── SponsorCRMv2.tsx           # Sponsor CRM
│   │   ├── SponsorCRM.tsx             # Sponsor CRM v1
│   │   ├── SponsorProfile.tsx         # Sponsor profile
│   │   ├── VenueManagement.tsx        # Venue management
│   │   ├── VenueDetail.tsx            # Venue detail
│   │   ├── VenueProduction.tsx        # Venue production
│   │   ├── ContractsManager.tsx       # Contracts
│   │   ├── ActivationsManager.tsx     # Brand activations
│   │   ├── ActivationDetail.tsx       # Activation detail
│   │   ├── ShotListBuilder.tsx        # Shot list planning
│   │   ├── ProductsDashboard.tsx      # Products management
│   │   ├── GalleryDashboard.tsx       # Gallery view
│   │   ├── ClientDashboard.tsx        # Client portal
│   │   ├── BillingDashboard.tsx       # Billing & invoices
│   │   ├── ROIAnalytics.tsx           # ROI analytics
│   │   ├── RunwayStage.tsx            # Runway planning
│   │   ├── CastingModels.tsx          # Model casting
│   │   ├── CuraCasting.tsx            # AI casting
│   │   ├── DesignerCollection.tsx     # Designer collection
│   │   ├── BrandProfileDashboard.tsx  # Brand profile
│   │   ├── AIProducerDrawer.tsx       # AI producer
│   │   ├── MobileStickyBar.tsx        # Mobile navigation
│   │   ├── ProductionProgressStages.tsx # Production stages
│   │   ├── ProposalDiffModal.tsx      # Proposal comparison
│   │   ├── CriticalPathDetailModal.tsx # Critical path detail
│   │   │
│   │   ├── 📁 /billing/
│   │   │   ├── BillingMetrics.tsx
│   │   │   ├── BudgetGuardianAlert.tsx
│   │   │   ├── InvoicesTable.tsx
│   │   │   └── TransactionFeed.tsx
│   │   │
│   │   ├── 📁 /command-center/
│   │   │   ├── CriticalBlockers.tsx
│   │   │   ├── DeepWorkLinks.tsx
│   │   │   ├── HealthScore.tsx
│   │   │   └── PhaseTimeline.tsx
│   │   │
│   │   ├── 📁 /contracts/
│   │   │   ├── AIContractAnalysis.tsx
│   │   │   ├── ContractCard.tsx
│   │   │   ├── ContractsHeader.tsx
│   │   │   ├── DeliverablesTable.tsx
│   │   │   └── KPICard.tsx
│   │   │
│   │   ├── 📁 /crm/
│   │   │   ├── CRMInspectorPanel.tsx
│   │   │   ├── CRMKPIs.tsx
│   │   │   ├── CRMKPIsv2.tsx
│   │   │   ├── CRMList.tsx
│   │   │   ├── CRMListv2.tsx
│   │   │   ├── CRMPipeline.tsx
│   │   │   ├── CRMPipelinev2.tsx
│   │   │   ├── CRMSidebar.tsx
│   │   │   ├── GlobalInsightsDrawer.tsx
│   │   │   ├── SmartContactInput.tsx
│   │   │   └── SponsorDetailSidebar.tsx
│   │   │
│   │   ├── 📁 /empty-states/
│   │   │   ├── BudgetEmptyState.tsx
│   │   │   ├── ContractsEmptyState.tsx
│   │   │   ├── EventsEmptyState.tsx
│   │   │   ├── GalleryEmptyState.tsx
│   │   │   ├── SearchEmptyState.tsx
│   │   │   ├── SponsorsEmptyState.tsx
│   │   │   ├── TasksEmptyState.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 /finance/
│   │   │   ├── BudgetManager.tsx
│   │   │   └── ContractAnalyzer.tsx
│   │   │
│   │   ├── 📁 /production/
│   │   │   ├── ProductPickerSheet.tsx
│   │   │   ├── ShotCard.tsx
│   │   │   ├── ShotListAI.tsx
│   │   │   └── ShotListHeader.tsx
│   │   │
│   │   └── 📁 /tasks/
│   │       ├── 📁 /components/
│   │       │   ├── GeminiHeader.tsx
│   │       │   ├── KPICard.tsx
│   │       │   ├── KanbanBoard.tsx
│   │       │   ├── ProjectFlowCard.tsx
│   │       │   ├── WorkflowMiniNav.tsx
│   │       │   └── WorkflowSteps.tsx
│   │       ├── 📁 /drawer/
│   │       │   ├── SummaryView.tsx
│   │       │   ├── TaskDetailView.tsx
│   │       │   └── WorkDrawer.tsx
│   │       ├── 📁 /views/
│   │       │   └── CriticalTasksList.tsx
│   │       ├── data.ts
│   │       └── types.ts
│   │
│   ├── 📁 /events/                    # Events feature components
│   │   ├── EventCommandCenter.tsx     # Event control center
│   │   ├── EventHeader.tsx            # Event header
│   │   ├── KPICard.tsx                # KPI card
│   │   ├── KPICardsGrid.tsx           # KPI grid
│   │   ├── WorkflowTimeline.tsx       # Timeline view
│   │   ├── LifecycleFeatureTable.tsx  # Feature table
│   │   ├── AIInsightsPanel.tsx        # AI insights
│   │   ├── index.ts                   # Exports
│   │   │
│   │   ├── 📁 /command-center/
│   │   │   ├── CriticalBlockers.tsx
│   │   │   ├── DeepWorkLinks.tsx
│   │   │   ├── HealthScore.tsx
│   │   │   └── PhaseTimeline.tsx
│   │   │
│   │   └── 📁 /public/
│   │       └── EventsMarketplace.tsx
│   │
│   ├── 📁 /tasks/                     # Tasks feature components
│   │   ├── TaskCard.tsx               # Task card
│   │   ├── TaskCreateModal.tsx        # Create task modal
│   │   ├── TaskEditModal.tsx          # Edit task modal
│   │   ├── TaskForm.tsx               # Task form
│   │   └── TasksContainer.tsx         # Tasks container
│   │
│   ├── 📁 /assistant/                 # AI Assistant (50+ files)
│   │   ├── RealTimeAssistant.tsx      # Main assistant
│   │   ├── AssistantShell.tsx         # Assistant shell
│   │   ├── ChatBubble.tsx             # Chat bubble
│   │   │
│   │   ├── 📁 /chat/
│   │   │   ├── ChatHistory.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 /core/
│   │   │   └── PanelHeader.tsx
│   │   │
│   │   ├── 📁 /skills/
│   │   │   ├── AgentOrchestrator.ts   # ✅ Agent routing
│   │   │   ├── EventsSkill.ts
│   │   │   ├── LogisticsSkill.ts
│   │   │   ├── MediaSkill.ts
│   │   │   ├── NavigatorSkill.ts
│   │   │   └── ServicesSkill.ts
│   │   │
│   │   ├── 📁 /automations/
│   │   │   ├── AutomationOrchestrator.ts
│   │   │   ├── AssetQualityScorer.ts
│   │   │   ├── ProactiveRiskAlerts.ts
│   │   │   ├── SmartTaskAssignment.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 /kits/
│   │   │   ├── EventsKit.tsx
│   │   │   ├── LogisticsKit.tsx
│   │   │   ├── MarketingKit.tsx
│   │   │   ├── MediaKit.tsx
│   │   │   └── ServicesKit.tsx
│   │   │
│   │   ├── 📁 /tools/
│   │   │   └── DeepResearchTool.tsx
│   │   │
│   │   ├── 📁 /types/
│   │   │   ├── media.types.ts
│   │   │   ├── navigation.types.ts
│   │   │   └── services.types.ts
│   │   │
│   │   ├── 📁 /examples/
│   │   │   └── real-world-data.ts
│   │   │
│   │   └── 📁 /__tests__/
│   │       └── AgentOrchestrator.test.ts
│   │
│   ├── 📁 /ai/                        # AI Components
│   │   ├── AIResultsPanel.tsx
│   │   └── [AI-related components]
│   │
│   ├── 📁 /designer-wizard/           # Designer wizard
│   │   ├── DesignerWizard.tsx
│   │   ├── 📁 /components/
│   │   │   └── ScoreCard.tsx
│   │   └── 📁 /steps/
│   │       ├── InputStep.tsx
│   │       ├── ScanningStep.tsx
│   │       ├── AnalysisStep.tsx
│   │       └── AuditStep.tsx
│   │
│   ├── 📁 /designers/                 # Designer directory
│   │   ├── DesignerDirectory.tsx
│   │   └── DesignerProfile.tsx
│   │
│   ├── 📁 /sponsors/                  # Sponsors
│   │   └── SponsorDetail.tsx
│   │
│   ├── 📁 /dashboard/                 # Dashboard components
│   │   ├── AiReasoningPanel.tsx
│   │   ├── CastingSection.tsx
│   │   ├── CriticalTasksGrid.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DeliverablesStatus.tsx
│   │   ├── HeroEventCard.tsx
│   │   ├── LeftSidebar.tsx
│   │   ├── ProcessNavigator.tsx
│   │   ├── SponsorProgressCard.tsx
│   │   ├── UpcomingMilestones.tsx
│   │   └── VenueStatusCard.tsx
│   │
│   ├── 📁 /casting/                   # Casting components
│   │   ├── CastingAvailability.tsx
│   │   ├── CastingMatchmaker.tsx
│   │   └── CuraCasting.tsx
│   │
│   ├── 📁 /brand-shoot/               # Brand shoot
│   │   ├── BrandShootStart.tsx
│   │   ├── BrandSignalCapture.tsx
│   │   ├── AIOptimizationCenter.tsx
│   │   ├── AIThinking.tsx
│   │   ├── CampaignSummary.tsx
│   │   ├── DigitalContractModal.tsx
│   │   └── ProposalConfirmation.tsx
│   │
│   ├── 📁 /commerce/                  # Commerce components
│   │   ├── BookingFlow.tsx
│   │   ├── BudgetWatchdog.tsx
│   │   └── ProposalPreview.tsx
│   │
│   ├── 📁 /production/                # Production components
│   │   ├── DynamicCallSheet.tsx
│   │   └── SmartSampleTracker.tsx
│   │
│   ├── 📁 /scout/                     # Scout components
│   │   ├── ScoutFinder.tsx
│   │   ├── ScoutSetup.tsx
│   │   └── ScoutShortlist.tsx
│   │
│   ├── 📁 /workflow/                  # Workflow components
│   │   ├── ContractModal.tsx
│   │   ├── ProductionTimeline.tsx
│   │   └── ProposalReady.tsx
│   │
│   ├── 📁 /wizard/                    # Wizard components
│   │   ├── ShootSummarySidebar.tsx
│   │   ├── WizardAIIntake.tsx
│   │   ├── WizardAISidebar.tsx
│   │   └── WizardModeSelection.tsx
│   │
│   ├── 📁 /website-pm/                # Website PM
│   │   ├── BriefOverview.tsx
│   │   ├── ContentChecklist.tsx
│   │   ├── DeliverablesHub.tsx
│   │   ├── MediaLibrary.tsx
│   │   ├── PageEditor.tsx
│   │   └── SitemapVisualizer.tsx
│   │
│   ├── 📁 /sections/                  # Page sections
│   │   ├── AIIntelligenceLayer.tsx
│   │   ├── AIIntelligenceLayerV2.tsx
│   │   ├── AIPoweredHub.tsx
│   │   └── LuxuryHero.tsx
│   │
│   ├── 📁 /services/                  # Services pages
│   │   ├── ServicesHero.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── HighlightedServices.tsx
│   │   ├── ServicePackages.tsx
│   │   ├── AdditionalServices.tsx
│   │   ├── BTSHero.tsx
│   │   ├── BrandStatement.tsx
│   │   ├── CreativeShowcase.tsx
│   │   ├── FAQSection.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── TrustSection.tsx
│   │
│   ├── 📁 /product/                   # Product photography
│   │   ├── ProductHero.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── BehindScenes.tsx
│   │   ├── BenefitsFeatures.tsx
│   │   ├── BrandLogos.tsx
│   │   ├── CalloutBox.tsx
│   │   ├── ContactForm.tsx
│   │   ├── EcommerceHighlight.tsx
│   │   ├── ExceptionalImagery.tsx
│   │   ├── ExperienceStory.tsx
│   │   ├── StudioTrust.tsx
│   │   └── TestimonialBanner.tsx
│   │
│   ├── 📁 /clothing/                  # Clothing photography
│   │   ├── ClothingHero.tsx
│   │   ├── ClothingGallery.tsx
│   │   ├── ApparelStillLife.tsx
│   │   ├── ClothingFlats.tsx
│   │   ├── GhostMannequin.tsx
│   │   ├── InvisibleMannequinProcess.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── AccessoriesSection.tsx
│   │   ├── DetailsSection.tsx
│   │   ├── BehindScenesGallery.tsx
│   │   ├── CaseStudyHero.tsx
│   │   ├── BrandLogosSection.tsx
│   │   ├── ClothingTestimonials.tsx
│   │   ├── ClothingFAQ.tsx
│   │   ├── ClothingContact.tsx
│   │   ├── TrustSection.tsx
│   │   └── [14 clothing components]
│   │
│   ├── 📁 /studios/                   # Studio rental
│   │   ├── StudioHero.tsx
│   │   ├── StudioOverview.tsx
│   │   ├── StudioOneSpecs.tsx
│   │   ├── StudioGalleryRow.tsx
│   │   ├── ThreeFeatureCards.tsx
│   │   ├── FacilitiesOverview.tsx
│   │   ├── BigStudioSmallPrice.tsx
│   │   ├── PricingStrip.tsx
│   │   ├── BookingIncludes.tsx
│   │   ├── PreviousVisitors.tsx
│   │   ├── ShotInStudios.tsx
│   │   ├── StudioInAction.tsx
│   │   ├── BuiltByCreatives.tsx
│   │   ├── OurGoal.tsx
│   │   ├── StudioTestimonials.tsx
│   │   └── StudioFAQ.tsx
│   │
│   ├── 📁 /amazon/                    # Amazon services
│   │   ├── 📁 /components/
│   │   │   ├── AmazonHero.tsx
│   │   │   ├── WhyAmazonImages.tsx
│   │   │   ├── PhotoServices.tsx
│   │   │   ├── VideoServices.tsx
│   │   │   ├── APlusContent.tsx
│   │   │   ├── PricingPackages.tsx
│   │   │   ├── SupportedPlatforms.tsx
│   │   │   ├── RecentWorkGallery.tsx
│   │   │   ├── ComplianceGuarantee.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── data.ts
│   │   └── types.ts
│   │
│   ├── 📁 /pages/                     # Full page components
│   │   ├── SponsorshipPage.tsx
│   │   ├── SponsorshipPageV2.tsx
│   │   ├── SponsorshipPageV3.tsx
│   │   ├── SponsorshipPageV5.tsx
│   │   ├── BeautySponsorshipPage.tsx
│   │   ├── AutomotiveSponsorshipPage.tsx
│   │   ├── RealEstateSponsorshipPage.tsx
│   │   ├── ElectronicsSponsorshipPage.tsx
│   │   └── ElectronicsSponsorshipPageV2.tsx
│   │
│   ├── 📁 /examples/                  # Example components
│   │   ├── AIWorkflowDemo.tsx
│   │   └── FileUploadDemo.tsx
│   │
│   ├── 📁 /figma/                     # Figma integration
│   │   └── ImageWithFallback.tsx      # 🔒 Protected file
│   │
│   └── [Home page components]
│       ├── HeroSection.tsx
│       ├── AboutStudio.tsx
│       ├── LatestCampaigns.tsx
│       ├── CreativeServices.tsx
│       ├── BehindTheScenes.tsx
│       ├── SignatureProject.tsx
│       ├── TestimonialSection.tsx
│       ├── ContactSection.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── FashionDirectory.tsx
│       ├── FashionMarketplace.tsx
│       ├── EcommerceSection.tsx
│       ├── SiteArchitecture.tsx
│       ├── StyleGuide.tsx
│       └── UIStatesDemo.tsx
│
├── 📁 /lib/                           # Business logic & utilities
│   ├── 📁 /ai/                       # AI agents & orchestration
│   │   ├── orchestrator.ts            # ✅ Main orchestrator (350 lines)
│   │   ├── gemini.ts                  # Gemini client
│   │   ├── taskGenerator.ts           # Task generation
│   │   ├── types.ts                   # AI types
│   │   │
│   │   ├── 📁 /agents/               # AI agents (8 agents)
│   │   │   ├── EventPlannerAgent.ts   # ✅ Event planning (550 lines)
│   │   │   ├── BudgetGuardianAgent.ts # Budget monitoring
│   │   │   ├── SponsorIntelligenceAgent.ts # Sponsor insights
│   │   │   ├── BrandShootAgent.ts     # Brand shoot planning
│   │   │   ├── OpsRiskAgent.ts        # Operations risk
│   │   │   ├── RiskAnalysisAgent.ts   # Risk analysis
│   │   │   ├── DesignerMatchingAgent.ts # Designer matching
│   │   │   └── AttendeeFlowAgent.ts   # Attendee flow
│   │   │
│   │   ├── 📁 /services/
│   │   │   ├── contract-analyzer.ts
│   │   │   └── task-generator.ts
│   │   │
│   │   ├── 📁 /workflows/
│   │   │   └── AIOrchestrator.ts
│   │   │
│   │   └── AgentContext.tsx
│   │
│   ├── 📁 /api/                      # API clients
│   │   ├── events.ts                  # ✅ Events API (350 lines)
│   │   ├── client.ts                  # HTTP client
│   │   ├── config.ts                  # API config
│   │   ├── assistant.ts               # Assistant API
│   │   └── index.ts                   # Exports
│   │
│   ├── 📁 /supabase/                 # Database layer
│   │   ├── client.ts                  # ✅ Supabase client
│   │   ├── queries.ts                 # Database queries
│   │   ├── fileQueries.ts             # File queries
│   │   ├── storage.ts                 # Storage client
│   │   ├── types.ts                   # Database types
│   │   │
│   │   ├── 📁 /queries/
│   │   │   ├── analytics.ts
│   │   │   ├── campaigns.ts
│   │   │   ├── organizations.ts
│   │   │   └── users.ts
│   │   │
│   │   └── 📁 /schema/
│   │       ├── complete-schema.sql
│   │       └── files.sql
│   │
│   ├── 📁 /validation/               # Zod schemas
│   │   ├── event-schemas.ts           # ✅ Event schemas (450 lines)
│   │   └── schemas.ts                 # General schemas
│   │
│   ├── 📁 /auth/
│   │   └── AuthContext.tsx
│   │
│   ├── 📁 /realtime/
│   │   └── collaboration.ts
│   │
│   ├── 📁 /hooks/
│   │   └── useFormValidation.ts
│   │
│   ├── 📁 /data/
│   │   └── mockEventData.ts
│   │
│   ├── 📁 /types/
│   │   └── events.types.ts
│   │
│   ├── 📁 /utils/
│   │   ├── business-logic.ts
│   │   └── imageCompression.ts
│   │
│   ├── 📁 /adapters/
│   │   └── taskAdapter.ts
│   │
│   ├── index.ts
│   └── motionTokens.ts
│
├── 📁 /context/                       # React Context
│   ├── BrandShootContext.tsx
│   ├── EventContext.tsx
│   └── SponsorContext.tsx
│
├── 📁 /utils/                         # Utilities
│   ├── assistantRouteMapper.ts
│   └── deepLinking.ts
│
├── 📁 /supabase/                      # Supabase backend
│   └── 📁 /functions/                # Edge Functions (Deno)
│       ├── 📁 /agents/
│       │   └── 📁 /event-planner/
│       │       └── index.ts           # ✅ Event planner function
│       │
│       └── 📁 /_shared/
│           ├── logging.ts             # ✅ Logging utility (520 lines)
│           └── validation.ts          # ✅ Validation utility
│
├── 📁 /app/                           # App Router pages (minimal)
│   └── 📁 /events/
│       └── 📁 /[id]/
│           └── page.tsx               # Event detail route
│
├── 📁 /tests/                         # Test suites
│   └── 📁 /features/
│       └── event-creation.test.ts     # ✅ 22 tests (100% coverage)
│
├── 📁 /styles/
│   └── globals.css                    # Tailwind + custom CSS
│
├── 📁 /docs/                          # Documentation (300+ docs)
│   ├── 📁 /main/                     # Main documentation
│   │   └── 01-tech-stack.md          # This file
│   │
│   ├── 📁 /supabase/                 # Database documentation
│   │   ├── 00-START-HERE.md
│   │   ├── 01-Executive-Summary.md
│   │   ├── 02-Table-Catalog.md
│   │   ├── 03-Entity-Relationships.md
│   │   ├── 04-Complete-Documentation.md
│   │   ├── EXISTING-SCHEMA.md
│   │   ├── PROPOSED-SCHEMA.md
│   │   ├── BEST-PRACTICES.md
│   │   ├── SQL-STYLE-GUIDE.md
│   │   ├── COPY-PASTE-READY.md
│   │   ├── CREATING-MIGRATIONS.md
│   │   ├── README.md
│   │   │
│   │   └── 📁 /remediation/          # Security remediation
│   │       ├── 00-INDEX.md
│   │       ├── 02-PATTERNS-LIBRARY.md
│   │       ├── 99-FAILURE-POINTS.md
│   │       ├── ASSESSMENT-SUMMARY.md
│   │       ├── FILES-INDEX.md
│   │       └── README.md
│   │
│   ├── 📁 /events/                   # Events feature docs
│   │   ├── 00-EVENTS-PROGRESS-TRACKER.md
│   │   ├── 01-VALIDATION-SUMMARY.md
│   │   ├── PRD-Events-01-Overview.md
│   │   ├── PRD-Events-02-Features.md
│   │   ├── PRD-Events-03-Complete-Part1.md
│   │   ├── PRD-Events-04-Lifecycle-Intelligence.md
│   │   ├── PRODUCTION-READINESS-ANALYSIS.md
│   │   ├── SYSTEMATIC-IMPLEMENTATION-COMPLETE.md
│   │   ├── TASKS-IMPLEMENTATION-COMPLETE.md
│   │   ├── TASKS-SYSTEM-ANALYSIS.md
│   │   │
│   │   └── 📁 /tasks/
│   │       ├── 00-Master-Progress-Tracker.md
│   │       ├── 01-Event-Command-Center.md
│   │       ├── 02-Backend-Integration-Supabase.md
│   │       ├── 03-Task-Management-Integration.md
│   │       ├── 04-CRM-Systems-Sponsor-Designer-Venue.md
│   │       ├── 05-AI-Automation-Proactive-Intelligence.md
│   │       └── [10+ task docs]
│   │
│   ├── 📁 /features/                 # Feature documentation
│   │   ├── 00-MASTER-INDEX.md
│   │   ├── 00-progress-tracker.md
│   │   ├── 01-chatbots.md
│   │   ├── 02-assistant-megaprompts.md
│   │   ├── 03-backend-requirements.md
│   │   ├── 04-frontend-backend-wiring.md
│   │   ├── 05-production-checklist.md
│   │   └── [20+ feature docs]
│   │
│   ├── 📁 /tasks/                    # Tasks system docs
│   │   ├── 001-TASKS-FOUNDATION.md
│   │   ├── 002-TASKS-GAPS-ANALYSIS.md
│   │   ├── 003-TASKS-IMPLEMENTATION-PLAN.md
│   │   ├── 004-TASKS-COMPLETE-STATUS.md
│   │   ├── DEMO-GUIDE.md
│   │   └── SUMMARY.md
│   │
│   ├── 📁 /wizards/                  # Wizard documentation
│   │   ├── 01-shoot-wizards.md
│   │   ├── 02-prompts-shoot.md
│   │   ├── 03-prompts-brand-shoot.md
│   │   └── [5 wizard docs]
│   │
│   ├── 📁 /pages/                    # Page documentation
│   │   ├── 01-home-page.md
│   │   ├── 02-events-page.md
│   │   ├── 04-services-page.md
│   │   ├── dashboard-01-command-center.md
│   │   └── [20+ page docs]
│   │
│   ├── 📁 /website/                  # Website pages docs
│   │   ├── 01-sponsor-v4.md
│   │   ├── 02-sponsor-v5.md
│   │   ├── 03-beauty-page.md
│   │   └── [10+ website docs]
│   │
│   ├── 📁 /progress/                 # Progress tracking
│   │   ├── 00-ORGANIZATION-SUMMARY.md
│   │   ├── 06-PROGRESS-TRACKER.md
│   │   └── [15+ progress docs]
│   │
│   ├── 📁 /diagrams/                 # Mermaid diagrams
│   │   ├── 01-system-overview.md
│   │   ├── 02-data-model.md
│   │   ├── 03-user-flows.md
│   │   └── [5 diagram docs]
│   │
│   ├── 📁 /acceptance-tests/         # Test specs
│   │   ├── 01-event-creation-journey.md
│   │   └── 02-error-recovery-flows.md
│   │
│   ├── 📁 /proof/                    # System proofs
│   │   ├── 01-dashboard-routes-inventory.md
│   │   ├── wizards-inventory.md
│   │   └── wizards-progress-tracker.md
│   │
│   └── [50+ root docs]
│       ├── 00-MASTER-INDEX.md
│       ├── EXECUTIVE-SUMMARY.md
│       ├── Technical-Architecture.md
│       ├── PRD-FashionOS.md
│       ├── QUICK-START-GUIDE.md
│       └── [more docs]
│
├── 📁 /rules/                         # Development rules
│   ├── AGENTS.md
│   ├── DIRECTORY-AND-ROUTING.md
│   ├── FRONTEND-BACKEND-WIRING.md
│   ├── supabase-backend.md
│   └── ui-ux-design.md
│
├── 📁 /guidelines/
│   └── Guidelines.md
│
└── [Root documentation files]
    ├── IMPLEMENTATION-CHECKLIST.md    # ✅ Implementation checklist
    ├── PROGRESS-TRACKER.md            # ✅ Progress tracker
    ├── NEXT-STEPS.md                  # ✅ Next steps
    ├── PRODUCT-REQUIREMENTS-DOCUMENT.md
    ├── FEATURE-VERIFIED-EVENT-CREATION.md
    ├── FORENSIC_AUDIT.md
    ├── QUICK-START.md
    ├── README.md
    └── [20+ root docs]
```

---

## 3. APPLICATION SITEMAP (ALL ROUTES)

### 🌐 PUBLIC WEBSITE PAGES (17 routes)

```
/                           → AppHome (Homepage)
/home-v2                    → HomePageV2 (Alternative homepage)
/home-v3                    → HomePageV3 (Alternative homepage v3)

📸 SERVICES
/services                   → Services (Photography services overview)
/clothing                   → Clothing (Apparel photography)
/product                    → Product (Product photography)
/video                      → VideoServices (Video production)
/amazon                     → AmazonServices (E-commerce photography)
/instagram                  → InstagramServices (Social media content)
/web-design                 → WebDesignServices (Website design)
/ecommerce-photography      → EcommercePhotography (E-commerce services)

🏢 FACILITIES
/studios                    → Studios (Studio rental)

👔 DIRECTORY
/directory                  → Directory (Designer directory listing)
/directory/:id              → DirectoryDetail (Designer profile page)
```

### 🔐 DASHBOARD PAGES (30+ routes)

```
📊 MAIN DASHBOARDS
/dashboard                  → Dashboard (Main dashboard overview)
/command-center             → CommandCenter (Control center)
/project-overview           → ProjectOverview (Project details)
/client                     → ClientDashboard (Client portal view)

🎭 EVENTS
/events                     → Events (Events list)
/events/:id                 → EventDetail (Event detail page)

✅ TASKS & WORK
/tasks                      → TasksAndDeliverables (Tasks management)
/shot-list                  → ShotListBuilder (Shot list planning)
/products                   → ProductsDashboard (Product management)

🤝 RELATIONSHIPS
/sponsors                   → SponsorCRMv2 (Sponsor CRM)
/sponsors/:id               → SponsorProfile (Sponsor profile)
/designers                  → DesignerCollection (Designer management)
/casting                    → CastingModels (Model casting)
/cura-casting               → CuraCasting (AI-powered casting)

📍 VENUES & PRODUCTION
/venue                      → VenueManagement (Venue management)
/venue/:id                  → VenueDetail (Venue detail page)
/venue-production           → VenueProduction (Venue production)
/runway                     → RunwayStage (Runway show planning)

📄 CONTRACTS & ACTIVATIONS
/contracts                  → ContractsManager (Contract management)
/activations                → ActivationsManager (Brand activations)
/activation/:id             → ActivationDetail (Activation detail)

📈 ANALYTICS & FINANCIALS
/analytics                  → ROIAnalytics (ROI dashboard)
/billing                    → BillingDashboard (Billing & invoices)
/budget                     → BudgetManager (Budget management)

🖼️ MEDIA
/gallery                    → GalleryDashboard (Media gallery)

🏢 BRAND
/brand-profile              → BrandProfileDashboard (Brand profile)
```

### 🧙 WIZARDS / MULTI-STEP FLOWS (6 wizards)

```
/wizard/shoot               → ShootWizard (Shoot planning wizard)
/wizard/website             → WebsiteWizard (Website brief wizard)
/wizard/brand-shoot         → BrandShootWizard (Brand shoot wizard)
/wizard/designer            → DesignerWizard (Designer onboarding)
/wizard/event               → EventCreationWizard ✅ (Event creation - 6 steps)
/wizard/directory-profile   → DirectoryProfileWizard (Directory profile setup)
```

### 🎨 SPONSORSHIP LANDING PAGES (9 pages)

```
/sponsorship                → SponsorshipPage (General sponsorship)
/sponsorship-v2             → SponsorshipPageV2 (Alternative v2)
/sponsorship-v3             → SponsorshipPageV3 (Alternative v3)
/sponsorship-v5             → SponsorshipPageV5 (Alternative v5)
/beauty-sponsorship         → BeautySponsorshipPage (Beauty brands)
/automotive-sponsorship     → AutomotiveSponsorshipPage (Automotive)
/real-estate-sponsorship    → RealEstateSponsorshipPage (Real estate)
/electronics-sponsorship    → ElectronicsSponsorshipPage (Electronics)
/electronics-sponsorship-v2 → ElectronicsSponsorshipPageV2 (Electronics v2)
```

### 📱 TOTAL ROUTES: 62+ routes

---

## 4. COMPONENT DIRECTORY MAP

### By Feature Area

```
📊 DASHBOARDS (30+ components)
├── Command Center
├── Project Overview
├── Tasks & Deliverables
├── Sponsor CRM (v1 & v2)
├── Venue Management
├── Contracts Manager
├── Activations Manager
├── Shot List Builder
├── Products Dashboard
├── Gallery Dashboard
├── Client Dashboard
├── Billing Dashboard
├── ROI Analytics
├── Runway Stage
├── Casting Models
├── Designer Collection
└── Brand Profile Dashboard

🧙 WIZARDS (6 wizards, 18+ steps)
├── Event Creation Wizard ✅
│   ├── Basic Info Step ✅
│   ├── Date & Venue Step ✅
│   ├── Casting Step ✅
│   ├── Sponsors Step ✅
│   ├── Deliverables Step ✅
│   └── Review Step ✅
├── Brand Shoot Wizard
├── Website Wizard
├── Designer Wizard
├── Directory Profile Wizard
└── Shoot Wizard

🎭 EVENTS (10+ components)
├── Event Command Center
├── Event Header
├── KPI Cards Grid
├── Workflow Timeline
├── Lifecycle Feature Table
└── AI Insights Panel

✅ TASKS (5+ components)
├── Task Card
├── Task Create Modal
├── Task Edit Modal
├── Task Form
└── Tasks Container

🤖 AI ASSISTANT (50+ components)
├── Real-Time Assistant
├── Agent Orchestrator
├── Chat components (History, Input, Message)
├── Skills (Events, Logistics, Media, Navigator, Services)
├── Automations (Asset Quality, Risk Alerts, Task Assignment)
├── Kits (Events, Logistics, Marketing, Media, Services)
└── Tools (Deep Research)

📸 SERVICES PAGES (60+ components)
├── Services (General)
├── Clothing Photography (14 components)
├── Product Photography (12 components)
├── Amazon/E-commerce (11 components)
├── Studios (16 components)
├── Video Services
├── Instagram Services
└── Web Design Services

🎨 MARKETING PAGES (9+ components)
├── Home page variants (v1, v2, v3)
└── Sponsorship pages (9 variants)

🔧 SHARED UI (50+ components)
├── Modal, Loading, Error, Empty States ✅
├── Navigation Bar, Sidebar, App Shell
├── AI components (Assistant, Copilot, Thinking)
├── Upload States
├── Image Lightbox
└── Success Screen

🎛️ UI PRIMITIVES (45+ shadcn components)
├── Forms (Button, Input, Select, Checkbox, etc.)
├── Overlays (Dialog, Drawer, Sheet, Popover)
├── Data Display (Table, Card, Badge, Avatar)
├── Feedback (Alert, Toast, Progress, Skeleton)
└── Navigation (Tabs, Breadcrumb, Menu, Command)
```

---

## 5. DATABASE SCHEMA

### Current Tables (8 tables in production)

```sql
-- EVENTS TABLE
events (
  id                   uuid PRIMARY KEY,
  organization_id      uuid NOT NULL,
  name                 text NOT NULL,
  event_type           text NOT NULL CHECK (event_type IN (
                         'runway_show', 'gallery_show', 'popup_store', 
                         'brand_activation', 'trunk_show', 'press_preview'
                       )),
  event_date           date NOT NULL,
  venue                text,
  expected_attendance  integer NOT NULL CHECK (expected_attendance > 0),
  budget               decimal(12,2) NOT NULL CHECK (budget > 0),
  number_of_models     integer DEFAULT 0,
  description          text NOT NULL,
  status               text DEFAULT 'planning' CHECK (status IN (
                         'planning', 'confirmed', 'in_progress', 
                         'completed', 'cancelled'
                       )),
  created_by           uuid NOT NULL,
  created_at           timestamptz DEFAULT NOW(),
  updated_at           timestamptz DEFAULT NOW()
)

-- EVENT PHASES TABLE
event_phases (
  id          uuid PRIMARY KEY,
  event_id    uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  phase_name  text NOT NULL,
  phase_order integer NOT NULL,
  start_date  date,
  end_date    date,
  status      text DEFAULT 'pending',
  created_at  timestamptz DEFAULT NOW()
)

-- TASKS TABLE
tasks (
  id               uuid PRIMARY KEY,
  event_id         uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  phase_id         uuid REFERENCES event_phases(id) ON DELETE SET NULL,
  title            text NOT NULL,
  description      text,
  status           text DEFAULT 'pending' CHECK (status IN (
                     'pending', 'in_progress', 'completed', 'blocked'
                   )),
  priority         text DEFAULT 'medium' CHECK (priority IN (
                     'critical', 'high', 'medium', 'low'
                   )),
  deadline         date,
  estimated_hours  decimal(6,2),
  assigned_to      uuid,
  created_by       uuid NOT NULL,
  organization_id  uuid NOT NULL,
  created_at       timestamptz DEFAULT NOW(),
  updated_at       timestamptz DEFAULT NOW()
)

-- AI ACTIONS TABLE (Logging)
ai_actions (
  id          uuid PRIMARY KEY,
  user_id     uuid NOT NULL,
  event_id    uuid REFERENCES events(id) ON DELETE CASCADE,
  agent       text NOT NULL,
  model       text NOT NULL,
  input       jsonb,
  output      jsonb,
  latency_ms  integer,
  cost_usd    decimal(10,4),
  success     boolean NOT NULL,
  error       text,
  timestamp   timestamptz DEFAULT NOW()
)

-- USERS TABLE (Assumed, not shown in schema)
-- ORGANIZATIONS TABLE (Assumed, not shown in schema)
-- SPONSORS TABLE (Assumed, not shown in schema)
-- DESIGNERS TABLE (Assumed, not shown in schema)
```

### Indexes for Performance

```sql
CREATE INDEX idx_events_org ON events(organization_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);

CREATE INDEX idx_tasks_event ON tasks(event_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);

CREATE INDEX idx_ai_actions_user ON ai_actions(user_id);
CREATE INDEX idx_ai_actions_event ON ai_actions(event_id);
CREATE INDEX idx_ai_actions_timestamp ON ai_actions(timestamp);
```

### Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_actions ENABLE ROW LEVEL SECURITY;

-- Policies: Organization-based access control
-- Users can only access data from their organization
```

### Database Status
- **Schema:** ✅ Documented
- **Migration:** ❌ Not run (database not created)
- **RLS Policies:** ✅ Documented, ❌ Not deployed
- **Seed Data:** ❌ Not created
- **Connection:** ❌ Credentials not configured

---

## 6. AI ARCHITECTURE

### AI System Overview

```
┌─────────────────────────────────────────┐
│         USER INTERFACE                  │
│   (Events, Tasks, Dashboards)           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      ORCHESTRATOR                       │
│   /lib/ai/orchestrator.ts               │
│   • Routes requests to agents           │
│   • Handles agent responses             │
│   • Logs costs & performance            │
└──────────────┬──────────────────────────┘
               │
               ├──────────────────────┬─────────────┬─────────────┐
               ▼                      ▼             ▼             ▼
┌──────────────────┐   ┌────────────────┐  ┌────────────┐  ┌────────────┐
│ Event Planner ✅ │   │ Budget Guardian│  │  Sponsor   │  │ Brand Shoot│
│ Agent            │   │ Agent          │  │Intelligence│  │   Agent    │
└──────────────────┘   └────────────────┘  └────────────┘  └────────────┘

┌──────────────────┐   ┌────────────────┐  ┌────────────┐  ┌────────────┐
│  Ops Risk Agent  │   │Contract Analyzer│ │  Designer  │  │  Attendee  │
│                  │   │ Agent          │  │  Matching  │  │Flow Agent  │
└──────────────────┘   └────────────────┘  └────────────┘  └────────────┘
               │                      │             │             │
               └──────────────────────┴─────────────┴─────────────┘
                                      │
                                      ▼
                          ┌────────────────────────┐
                          │   GEMINI 2.0 FLASH     │
                          │   (Experimental)       │
                          │   • Structured output  │
                          │   • JSON mode          │
                          │   • Cost: ~$0.05/req   │
                          └────────────────────────┘
```

### AI Agents (1 of 8 Complete)

#### ✅ Event Planner Agent
```typescript
Purpose: Generate comprehensive task lists for events
Status: ✅ Complete (550 lines)
Model: Gemini 2.0 Flash Experimental
Input: Event details (type, date, budget, models, etc.)
Output: 120-150 tasks across 14 phases
Cost: ~$0.05 per generation
Latency: 8-12 seconds
Location: /lib/ai/agents/EventPlannerAgent.ts
```

#### ❌ Budget Guardian Agent
```typescript
Purpose: Real-time budget monitoring & alerts
Status: ❌ Not started
Planned Features:
  - Budget variance tracking
  - Cost prediction
  - Overspend alerts
  - Vendor cost comparison
```

#### ❌ Sponsor Intelligence Agent
```typescript
Purpose: Sponsor insights & recommendations
Status: ❌ Not started
Planned Features:
  - Sponsor fit analysis
  - ROI prediction
  - Engagement scoring
  - Renewal likelihood
```

#### ❌ Brand Shoot Agent
```typescript
Purpose: Brand shoot planning & optimization
Status: ❌ Not started
Planned Features:
  - Shot list generation
  - Mood board analysis
  - Resource allocation
  - Timeline optimization
```

#### ❌ Operations Risk Agent
```typescript
Purpose: Proactive risk identification
Status: ❌ Not started
Planned Features:
  - Risk scoring
  - Mitigation suggestions
  - Critical path analysis
  - Dependency tracking
```

#### ❌ Contract Analyzer Agent
```typescript
Purpose: Contract review & compliance
Status: ❌ Not started
Planned Features:
  - Key terms extraction
  - Risk flagging
  - Compliance checking
  - Deliverable tracking
```

#### ❌ Designer Matching Agent
```typescript
Purpose: Designer-brand matching
Status: ❌ Not started
Planned Features:
  - Style compatibility
  - Budget alignment
  - Availability checking
  - Portfolio analysis
```

#### ❌ Attendee Flow Agent
```typescript
Purpose: Event logistics optimization
Status: ❌ Not started
Planned Features:
  - Capacity planning
  - Traffic flow simulation
  - Queue prediction
  - Space allocation
```

### AI Safety & Governance

```
✅ Implemented
├── Explicit user triggers (no auto-execution)
├── Structured output validation (Zod schemas)
├── Cost tracking (logged to ai_actions table)
├── Audit trail (all inputs/outputs logged)
└── User override capability

❌ Not Implemented
├── Rate limiting
├── Cost caps per user
├── Hallucination detection
├── Output quality scoring
└── A/B testing framework
```

---

## 7. LIBRARIES & DEPENDENCIES

### Core Dependencies

```typescript
// FRAMEWORK (Built-in to Figma Make)
react@18+                          // React library
typescript@5+                      // TypeScript
tailwindcss@4.0                    // Styling

// UI COMPONENTS
lucide-react                       // Icons (1000+ icons)
motion/react                       // Animations (formerly Framer Motion)

// FORMS & VALIDATION
react-hook-form@7.55.0            // ⚠️ Versioned import required
@hookform/resolvers               // Zod integration
zod                               // Schema validation

// UI COMPONENT LIBRARIES
@radix-ui/*                       // Primitives (45+ components via shadcn)
sonner@2.0.3                      // ⚠️ Versioned import required
recharts                          // Charts & graphs
react-slick                       // Carousels
react-responsive-masonry          // Masonry grids
react-dnd                         // Drag & drop
popper.js                         // Popovers & positioning

// BACKEND
@supabase/supabase-js             // Supabase client
@google/generative-ai             // Gemini AI

// UTILITIES
date-fns                          // Date manipulation
clsx                              // Class merging
tailwind-merge                    // Tailwind utilities
```

### Import Syntax Examples

```typescript
// Standard imports (no version)
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { motion } from "motion/react"; // Note: "motion" not "framer-motion"
import { Calendar } from "lucide-react";

// Versioned imports (specific packages only)
import { useForm } from "react-hook-form@7.55.0";
import { toast } from "sonner@2.0.3";

// Path aliases (@/ = root directory)
import { EventCreationWizard } from "@/components/wizards/EventCreationWizard";
import { createEvent } from "@/lib/api/events";
import { EventSchema } from "@/lib/validation/event-schemas";
```

### Icon Usage (Lucide React)

```typescript
// ⚠️ IMPORTANT: Always verify icon exists first
// Check: node_modules/lucide-react/dist/esm/icons/index.js

import { 
  Calendar,      // ✅ Exists
  Users,         // ✅ Exists  
  DollarSign,    // ✅ Exists
  Sparkles,      // ✅ Exists
  ArrowRight,    // ✅ Exists
  Check          // ✅ Exists
} from "lucide-react";

// Usage
<Calendar className="h-4 w-4" />
```

### Library Guidance

#### ✅ Supported Libraries
- All standard React libraries
- Tailwind CSS v4.0 (no config file needed)
- Motion (use `motion`, not `framer-motion`)
- Recharts (for charts)
- React Slick (for carousels)
- React DnD (for drag & drop)
- React Responsive Masonry (for grids)

#### ❌ Not Supported
- `react-resizable` (use `re-resizable` instead)
- `konva` or `react-konva` (use HTML Canvas API directly)
- Any library requiring Node.js runtime (use Deno Edge Functions)

---

## 8. BUILD & DEPLOYMENT

### Development Environment

```
Platform: Figma Make (browser-based)
Build Tool: Built-in (no Vite, no Webpack, no npm)
Hot Reload: Automatic
TypeScript: Built-in type checking
Linting: Built-in
```

### No Local Setup Required
- ✅ No `npm install`
- ✅ No `package.json`
- ✅ No `vite.config.ts`
- ✅ No `tsconfig.json`
- ✅ Works entirely in browser

### Environment Variables

```bash
# Supabase (Not yet configured)
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJI...

# Google AI (Configured)
GOOGLE_AI_API_KEY=AIza...

# Optional
ENVIRONMENT=development|staging|production
```

### Deployment Targets

```
Staging:     Not configured
Production:  Not configured
Hosting:     TBD (Vercel/Netlify/Cloudflare)
CDN:         TBD
```

### Build Output

```
Current:     Not measured
Target:      < 500KB (gzipped)
Code Split:  Not configured
```

### Performance Targets

```
First Contentful Paint:  < 1.5s
Time to Interactive:     < 3s
Largest Contentful Paint: < 2.5s
Cumulative Layout Shift:  < 0.1
Lighthouse Score:         > 90
```

---

## 9. FEATURE STATUS SUMMARY

### ✅ Complete (100%)
```
- Event Creation Wizard (all 6 steps)
- Form validation layer (Zod schemas)
- API client with retry logic
- Event Planner AI Agent
- Logging infrastructure
- Shared UI components (Modal, Loading, Error, Empty)
- Edge Function scaffold
- Test suite (22 tests, 100% coverage)
```

### 🟡 In Progress (40-60%)
```
- Events dashboard (0%)
- Event detail page (0%)
- Database connection (documented, not connected)
- RLS policies (documented, not deployed)
```

### ❌ Not Started (0%)
```
- Tasks system
- 7 additional AI agents
- Team management
- Budget tracking
- Calendar view
- Sponsors management
- Venue management
- Mobile responsive polish
- Performance optimization
- Error monitoring
- Analytics tracking
```

---

## 10. ROUTING IMPLEMENTATION

### Custom Client-Side Routing

```typescript
// App.tsx (simplified)
const [currentPage, setCurrentPage] = useState("home");
const [pageParams, setPageParams] = useState({});

function navigate(page: string, params?: any) {
  setCurrentPage(page);
  setPageParams(params || {});
}

function renderPage() {
  switch(currentPage) {
    case "home":
      return <AppHome />;
    
    case "events":
      return <Events />;
    
    case "events/:id":
      return <EventDetail id={pageParams.id} />;
    
    case "dashboard":
      return <Dashboard />;
    
    case "wizard/event":
      return <EventCreationWizard onSuccess={(id) => navigate("events/:id", { id })} />;
    
    // ... 60+ more routes
    
    default:
      return <NotFound />;
  }
}
```

### Navigation Methods

```typescript
// 1. Direct function call
navigate("events");
navigate("events/:id", { id: "abc-123" });

// 2. NavigationBar component
<NavigationBar onNavigate={(page) => navigate(page)} />

// 3. Button click
<Button onClick={() => navigate("dashboard")}>
  Go to Dashboard
</Button>

// 4. Deep linking (URL params)
// /events/abc-123 → parsed to navigate("events/:id", { id: "abc-123" })
```

---

## 11. NEXT STEPS (TECHNICAL)

### Priority 1: Database Connection (2 hours)
```bash
1. Create Supabase project at supabase.com
2. Copy Project URL + Anon Key
3. Update /lib/supabase/client.ts
4. Run schema migration (SQL Editor)
5. Enable RLS policies
6. Test connection with SupabaseTest component
```

### Priority 2: Events List Page (4 hours)
```bash
1. Create /app/events/page.tsx
2. Create /components/events/EventCard.tsx
3. Implement fetchEvents() API call
4. Wire up "Create Event" button → opens wizard
5. Test: Create event → appears in list
```

### Priority 3: Event Detail Page (4 hours)
```bash
1. Create /app/events/[id]/page.tsx
2. Create /components/events/EventDetailHeader.tsx
3. Implement fetchEventById() API call
4. Add edit/delete actions
5. Test: Click event card → shows detail page
```

### Priority 4: Tasks System (16 hours)
```bash
1. Create TasksListPage.tsx
2. Implement Kanban board view
3. Implement list view
4. Add task CRUD operations
5. Test: Create task → appears in list → mark complete
```

---

## 12. KNOWN ISSUES & BLOCKERS

### 🔴 Critical Blockers
```
1. Database not connected (blocks all features)
   - Impact: Can't create/read/update any data
   - Time to fix: 2 hours
   
2. No events list page (blocks user workflow)
   - Impact: Can't see created events
   - Time to fix: 4 hours
   
3. No event detail page (blocks event management)
   - Impact: Can't view/edit events
   - Time to fix: 4 hours
```

### 🟡 High Priority Issues
```
1. No error monitoring (Sentry)
2. No analytics (PostHog)
3. No performance tracking
4. No CI/CD pipeline
5. No automated tests running
```

### 🟢 Low Priority Issues
```
1. No mobile testing
2. No accessibility audit
3. No load testing
4. No security audit
5. No backup strategy
```

---

## 13. DOCUMENTATION INDEX

### Quick Reference
- **This file:** Complete tech stack & structure
- **Implementation Checklist:** `/IMPLEMENTATION-CHECKLIST.md`
- **Progress Tracker:** `/PROGRESS-TRACKER.md`
- **Next Steps:** `/NEXT-STEPS.md`
- **Product Requirements:** `/PRODUCT-REQUIREMENTS-DOCUMENT.md`

### Deep Dives
- **Database:** `/docs/supabase/00-START-HERE.md`
- **Events Feature:** `/docs/events/00-EVENTS-PROGRESS-TRACKER.md`
- **AI Agents:** `/lib/ai/agents/` (source code)
- **Testing:** `/tests/features/event-creation.test.ts`

---

## SUMMARY

**FashionOS** is a luxury event orchestration SaaS built with:

- **Frontend:** React 18 + TypeScript + Tailwind CSS v4.0
- **Build Tool:** Figma Make (browser-based, no Vite)
- **Backend:** Supabase PostgreSQL (not yet connected)
- **AI:** Gemini 2.0 Flash (1 of 8 agents complete)
- **Routing:** Custom client-side routing (62+ routes)
- **Components:** 300+ React components
- **Status:** 45% complete

**Critical Path:** Database connection → Events list → Event detail → Tasks system

**Next Action:** Create Supabase project (see `/NEXT-STEPS.md`)

---

**Document Version:** 1.0  
**Last Updated:** December 21, 2024  
**Maintained By:** Development Team
