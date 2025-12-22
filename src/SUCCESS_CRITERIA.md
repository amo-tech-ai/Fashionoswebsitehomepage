# SUCCESS CRITERIA — FashionOS Production Readiness

**Purpose:** Binary checklist. If any item is ❌, feature is NOT production-ready.

---

## ✅ FOUNDATION (Must Pass ALL)

### Database
- [ ] Supabase project exists
- [ ] 8 tables created (organizations, users, events, tasks, sponsors, budget_items, assets, campaigns)
- [ ] RLS policies enabled on all tables
- [ ] Test: Cross-tenant access blocked
- [ ] Storage bucket `event-assets` created
- [ ] Storage RLS policies enabled
- [ ] Environment variables set (URL, anon key)
- [ ] `<SupabaseStatus />` shows green

### Authentication
- [ ] Supabase Auth enabled
- [ ] Login page exists and works
- [ ] Signup page exists and works
- [ ] Password reset works
- [ ] Protected routes redirect to login
- [ ] User session persists on refresh
- [ ] Logout clears session

### Contexts (No Mock Data)
- [ ] EventContext uses Supabase queries
- [ ] SponsorContext uses Supabase queries
- [ ] BrandShootContext saves to campaigns table
- [ ] Real-time subscriptions active
- [ ] Test: Create event in tab 1, appears in tab 2

---

## 🎨 UI/UX (Must Pass ALL)

### Responsive Design
- [ ] Test all pages at 375px (mobile)
- [ ] Test all pages at 768px (tablet)
- [ ] Test all pages at 1440px (desktop)
- [ ] Navigation works on mobile (hamburger menu)
- [ ] Tables collapse to cards on mobile
- [ ] Forms usable on mobile (inputs not cut off)
- [ ] Touch targets ≥44px on mobile

### States (Every Component)
- [ ] Loading: Shows `<LoadingSkeleton />`
- [ ] Error: Shows `<ErrorState />`
- [ ] Empty: Shows `<EmptyState />`
- [ ] Success: Shows actual content

### Accessibility
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Focus indicators visible
- [ ] Color contrast ≥4.5:1 (WCAG AA)
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Errors announced to screen readers

---

## 🚀 CORE FEATURES (Must Pass ALL)

### Events System
- [ ] Create event → saves to Supabase
- [ ] Edit event → updates in Supabase
- [ ] Delete event → removes from Supabase
- [ ] Events list loads from Supabase
- [ ] Event detail page shows real data
- [ ] Event filters work (type, status, date)
- [ ] Event search works
- [ ] Real-time updates work

### Tasks System
- [ ] Create task → saves to Supabase
- [ ] Edit task → updates in Supabase
- [ ] Delete task → removes from Supabase
- [ ] Task status changes persist
- [ ] Task assignment works
- [ ] Task filters work (status, priority, assignee)
- [ ] Kanban board drag-and-drop persists
- [ ] Real-time updates work

### Sponsors CRM
- [ ] Create sponsor → saves to Supabase
- [ ] Edit sponsor → updates in Supabase
- [ ] Delete sponsor → removes from Supabase
- [ ] Pipeline stages update
- [ ] Drag-and-drop between stages persists
- [ ] Sponsor search works
- [ ] Sponsor filters work (tier, status, event)
- [ ] Real-time updates work

### Budget Tracking
- [ ] Add budget item → saves to Supabase
- [ ] Edit budget item → updates in Supabase
- [ ] Delete budget item → removes from Supabase
- [ ] Budget totals calculate correctly
- [ ] Variance shows correctly (budgeted vs actual)
- [ ] Budget categories work
- [ ] Budget alerts trigger correctly

### Gallery / Assets
- [ ] Upload file → saves to Supabase Storage
- [ ] File appears in gallery
- [ ] Thumbnail generates correctly
- [ ] Delete file → removes from storage
- [ ] File metadata saved to assets table
- [ ] File permissions respect RLS (org-scoped)
- [ ] Progress bar shows during upload
- [ ] Large files (>10MB) upload successfully

---

## 🤖 AI FEATURES (Must Pass ALL)

### Gemini API
- [ ] API key set in environment
- [ ] Test call succeeds
- [ ] Rate limiting configured
- [ ] Error handling for API failures
- [ ] Fallback to mock data if API down

### Brand Shoot Agent
- [ ] Analyzes brand signals (website, Instagram)
- [ ] Generates strategy recommendations
- [ ] Creates asset list
- [ ] Builds channel packs
- [ ] Calculates pricing
- [ ] Saves to campaigns table
- [ ] User can edit all AI outputs

### Task Generator
- [ ] Generates tasks for new event
- [ ] Creates 100+ tasks covering all phases
- [ ] Sets dependencies correctly
- [ ] Assigns to critical path
- [ ] User can edit before saving
- [ ] Tasks save to database

### Sponsor Intelligence
- [ ] Scores sponsor fit (0-100)
- [ ] Extracts contact info from description
- [ ] Suggests outreach strategy
- [ ] Predicts conversion likelihood
- [ ] User can override scores

### Risk Analysis
- [ ] Detects budget overruns
- [ ] Identifies timeline risks
- [ ] Calculates health score
- [ ] Generates mitigation steps
- [ ] Updates in real-time

### Contract Analyzer
- [ ] Extracts parties from contract text
- [ ] Identifies key financial terms
- [ ] Flags risk clauses
- [ ] Compares contracts side-by-side
- [ ] User can edit extracted data

---

## 🧪 DASHBOARDS (Must Pass ALL)

### Command Center
- [ ] Shows real event data
- [ ] Health score calculates correctly
- [ ] Critical blockers update real-time
- [ ] Phase timeline accurate
- [ ] Deep work links functional
- [ ] No console errors

### Tasks & Deliverables
- [ ] Kanban board loads tasks from Supabase
- [ ] Drag-and-drop persists changes
- [ ] Task details drawer opens
- [ ] Create task modal works
- [ ] Filters apply correctly
- [ ] AI task generation works

### Sponsor CRM
- [ ] Pipeline shows sponsors from Supabase
- [ ] Drag-and-drop between stages persists
- [ ] Sponsor detail sidebar opens
- [ ] Create sponsor modal works
- [ ] Fit score calculates
- [ ] AI insights generate

### Gallery Dashboard
- [ ] Shows assets from Supabase
- [ ] Upload button works
- [ ] Images load with thumbnails
- [ ] Lightbox opens on click
- [ ] Delete confirms and removes
- [ ] AI quality score shows

### Billing Dashboard
- [ ] Budget items load from Supabase
- [ ] Totals calculate correctly
- [ ] Charts render correctly
- [ ] Add item modal works
- [ ] Export to CSV works

---

## 🔒 SECURITY (Must Pass ALL)

### Row Level Security
- [ ] Test: User A cannot see User B's org data
- [ ] Test: Viewer role cannot edit
- [ ] Test: Admin can edit org data
- [ ] Test: Owner can delete
- [ ] Test: Unauthenticated cannot access

### Input Validation
- [ ] All forms validate with Zod
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (sanitized inputs)
- [ ] CSRF tokens on sensitive actions
- [ ] File uploads validate type and size

### API Security
- [ ] Anon key used (not service role key)
- [ ] Rate limiting configured
- [ ] CORS configured correctly
- [ ] Security headers set (CSP, X-Frame-Options)
- [ ] HTTPS enforced

---

## ⚡ PERFORMANCE (Must Pass ALL)

### Lighthouse Scores
- [ ] Performance ≥90
- [ ] Accessibility ≥95
- [ ] Best Practices ≥95
- [ ] SEO ≥90

### Load Times
- [ ] First Contentful Paint <1.8s
- [ ] Largest Contentful Paint <2.5s
- [ ] Time to Interactive <3.8s
- [ ] Cumulative Layout Shift <0.1

### Optimization
- [ ] Code splitting implemented
- [ ] Images optimized (WebP, lazy load)
- [ ] Fonts preloaded
- [ ] Unused code eliminated
- [ ] Bundle size <500KB (main)

---

## 🧪 TESTING (Must Pass ALL)

### Manual Testing
- [ ] Create → Edit → Delete flow works for all entities
- [ ] Real-time updates work in 2 browser tabs
- [ ] Forms show validation errors
- [ ] File upload with 1MB, 10MB, 50MB files
- [ ] Mobile navigation works
- [ ] All links work (no 404s)

### Automated Testing
- [ ] Unit tests pass (60% coverage minimum)
- [ ] Integration tests pass
- [ ] E2E tests pass (critical paths)
- [ ] No console errors in production build
- [ ] No TypeScript errors

### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 📊 MONITORING (Must Pass ALL)

### Error Tracking
- [ ] Sentry configured
- [ ] Errors logged correctly
- [ ] Sourcemaps uploaded
- [ ] Alerts configured

### Analytics
- [ ] Google Analytics / Posthog configured
- [ ] Page views tracked
- [ ] Events tracked (button clicks, form submits)
- [ ] User flows tracked

### Performance Monitoring
- [ ] Web Vitals tracked
- [ ] API response times logged
- [ ] Database query times monitored
- [ ] Uptime monitoring configured

---

## 🚀 DEPLOYMENT (Must Pass ALL)

### Pre-Deploy
- [ ] `npm run build` succeeds
- [ ] Environment variables documented
- [ ] Database migrations documented
- [ ] Backup strategy defined
- [ ] Rollback plan defined

### Staging
- [ ] Deployed to staging environment
- [ ] Tested with production data snapshot
- [ ] No errors in staging logs
- [ ] Performance acceptable
- [ ] Stakeholders approved

### Production
- [ ] Deployed to production
- [ ] DNS configured correctly
- [ ] SSL certificate active
- [ ] CDN configured
- [ ] Health check endpoint responds
- [ ] Monitoring active

---

## 📚 DOCUMENTATION (Must Pass ALL)

### User Documentation
- [ ] Setup guide for new users
- [ ] Feature walkthroughs
- [ ] FAQ
- [ ] Video tutorials (optional)

### Developer Documentation
- [ ] README with setup instructions
- [ ] Architecture diagram
- [ ] API documentation
- [ ] Component Storybook (optional)
- [ ] Troubleshooting guide

---

## ✅ PRODUCTION READY DEFINITION

**A feature is production-ready when:**
1. ✅ All relevant checklist items pass
2. ✅ No known bugs
3. ✅ Tested by non-developer
4. ✅ Documented
5. ✅ Monitored

**If ANY checkbox is unchecked, feature is NOT production-ready.**

---

## 🎯 MILESTONE TARGETS

### MVP (70% Complete)
- [ ] Foundation (all items)
- [ ] Core Features (Events, Tasks, Sponsors)
- [ ] Basic dashboards (Command Center, Tasks)
- [ ] Authentication working
- [ ] No mock data

### Full Production (100% Complete)
- [ ] All checklist items ✅
- [ ] All dashboards functional
- [ ] All AI features working
- [ ] All tests passing
- [ ] Deployed and monitored

---

**Current Status:** Use this checklist to track progress.  
**Review:** Check against this file before marking anything "done."
