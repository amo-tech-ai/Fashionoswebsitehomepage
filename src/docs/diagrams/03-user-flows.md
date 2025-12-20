# User Flow Diagrams

## 1. Event Planner: Create Event Flow

```mermaid
flowchart TD
    START([Event Planner<br/>Wants to Create Event]) --> MARKETING[Browse Marketing Site]
    MARKETING --> EVENTS_PAGE[Visit /events Page]
    EVENTS_PAGE --> DECIDE{Have Account?}
    
    DECIDE -->|No| SIGNUP[Sign Up]
    DECIDE -->|Yes| LOGIN[Login]
    
    SIGNUP --> AUTH_CHECK
    LOGIN --> AUTH_CHECK
    
    AUTH_CHECK{Auth Success?} -->|No| ERROR1[Show Error]
    ERROR1 --> LOGIN
    
    AUTH_CHECK -->|Yes| DASHBOARD[Redirect to Dashboard]
    DASHBOARD --> CREATE_BTN[Click 'Create Event' Button]
    CREATE_BTN --> WIZARD[Event Creation Wizard]
    
    WIZARD --> STEP1[Step 1: Basic Info<br/>Title, Description, Type]
    STEP1 --> VALIDATE1{Valid Input?}
    VALIDATE1 -->|No| STEP1
    VALIDATE1 -->|Yes| STEP2
    
    STEP2[Step 2: Venue & Date<br/>Location, Date, Capacity] --> VALIDATE2{Valid Input?}
    VALIDATE2 -->|No| STEP2
    VALIDATE2 -->|Yes| STEP3
    
    STEP3[Step 3: Casting<br/>Select Models] --> STEP4
    
    STEP4[Step 4: Sponsors<br/>Add Sponsors] --> STEP5
    
    STEP5[Step 5: Deliverables<br/>Define Outputs] --> STEP6
    
    STEP6[Step 6: Review<br/>Confirm Details] --> SUBMIT{Submit Event?}
    
    SUBMIT -->|Cancel| DASHBOARD
    SUBMIT -->|Confirm| CREATE_DB[Create Event in Database]
    
    CREATE_DB --> TRIGGER1[Trigger: create_default_event_phases]
    TRIGGER1 --> PHASES[Generate 14 Event Phases]
    
    PHASES --> AI_GEN[AI: Generate Tasks<br/>Task Generator Service]
    AI_GEN --> TASKS[Create 120+ Tasks]
    
    TASKS --> COMMAND[Redirect to Event Command Center]
    COMMAND --> SHOW_DASH[Display Event Dashboard<br/>KPIs, Phases, Tasks]
    
    SHOW_DASH --> MANAGE[Event Planner<br/>Manages Event]
    
    MANAGE --> ACTION{Next Action?}
    ACTION -->|Assign Tasks| TASK_ASSIGN[Task Assignment Flow]
    ACTION -->|Add Sponsors| SPONSOR_FLOW[Sponsor CRM]
    ACTION -->|Cast Models| CASTING_FLOW[Casting Flow]
    ACTION -->|Schedule| SCHEDULE_FLOW[Schedule Management]
    
    style START fill:#E8D5F2,color:#000
    style WIZARD fill:#A8D5BA,color:#000
    style COMMAND fill:#D4A5A5,color:#000
    style MANAGE fill:#F8E8EE,color:#000
```

## 2. Designer: Create Profile Flow

```mermaid
flowchart TD
    START([Designer<br/>Wants to Join Platform]) --> HOMEPAGE[Visit Homepage]
    HOMEPAGE --> DIRECTORY[Browse Directory Page]
    DIRECTORY --> JOIN[Click 'Join as Designer']
    
    JOIN --> AUTH{Have Account?}
    AUTH -->|No| SIGNUP[Sign Up Form]
    AUTH -->|Yes| LOGIN[Login]
    
    SIGNUP --> VERIFY[Email Verification]
    VERIFY --> PROFILE_WIZARD
    
    LOGIN --> PROFILE_WIZARD[Designer Profile Wizard]
    
    PROFILE_WIZARD --> S1[Step 1: Basic Info<br/>Name, Location, Bio]
    S1 --> S2[Step 2: Categories<br/>Select Specialties]
    S2 --> S3[Step 3: Collections<br/>Upload Lookbooks]
    S3 --> S4[Step 4: Brand Story<br/>Philosophy, Values]
    S4 --> S5[Step 5: Sustainability<br/>Practices, Certifications]
    S5 --> S6[Step 6: Media Library<br/>Photos, Videos, Press]
    S6 --> S7[Step 7: Preview<br/>Review Profile]
    
    S7 --> SUBMIT{Publish Profile?}
    SUBMIT -->|Cancel| DRAFT[Save as Draft]
    SUBMIT -->|Publish| CREATE[Create Designer Profile<br/>in Database]
    
    CREATE --> PROFILE_PAGE[Designer Profile Page Live]
    PROFILE_PAGE --> SEARCHABLE[Profile Appears in Directory]
    
    SEARCHABLE --> DISCOVERY[Discovery by:]
    DISCOVERY --> EVENT_PLANNERS[Event Planners]
    DISCOVERY --> SPONSORS[Sponsors]
    DISCOVERY --> PUBLIC[Public Browsing]
    
    EVENT_PLANNERS --> INVITE[Receive Event Invitations]
    SPONSORS --> COLLAB[Collaboration Opportunities]
    PUBLIC --> FOLLOWS[Followers & Engagement]
    
    INVITE --> RESPOND{Accept Invitation?}
    RESPOND -->|Yes| EVENT_ASSIGN[Assigned to Event]
    RESPOND -->|No| DECLINE[Decline]
    
    EVENT_ASSIGN --> DASHBOARD_ACCESS[Access Event Dashboard]
    DASHBOARD_ACCESS --> MANAGE[Manage Collection<br/>Tasks, Fittings, Schedules]
    
    style START fill:#E8D5F2,color:#000
    style PROFILE_WIZARD fill:#A8D5BA,color:#000
    style PROFILE_PAGE fill:#D4A5A5,color:#000
    style MANAGE fill:#F8E8EE,color:#000
```

## 3. Client: Book Photography Shoot Flow

```mermaid
flowchart TD
    START([Client<br/>Needs Photography]) --> LANDING[Visit Homepage]
    LANDING --> SERVICES[Browse Services Pages]
    
    SERVICES --> SELECT{Choose Service Type}
    SELECT -->|Clothing| CLOTHING[Clothing Photography Page]
    SELECT -->|Product| PRODUCT[Product Photography Page]
    SELECT -->|Amazon| AMAZON[Amazon Services Page]
    SELECT -->|Video| VIDEO[Video Services Page]
    
    CLOTHING --> CTA1[Click 'Book a Shoot']
    PRODUCT --> CTA1
    AMAZON --> CTA1
    VIDEO --> CTA1
    
    CTA1 --> WIZARD[Shoot Wizard]
    
    WIZARD --> W1[Step 1: Service Selection<br/>Choose Package]
    W1 --> W2[Step 2: Project Details<br/>Quantity, Style, Brief]
    W2 --> W3[Step 3: Date & Location<br/>Scheduling]
    W3 --> W4[Step 4: Requirements<br/>Special Needs]
    W4 --> W5[Step 5: Contact Info<br/>Details, Budget]
    W5 --> W6[Step 6: AI Optimization<br/>Brand Analysis]
    
    W6 --> AI[AI Brand Analysis<br/>Analyze Brand Signal]
    AI --> RECOMMENDATIONS[AI Recommendations<br/>Shot List, Styling]
    
    RECOMMENDATIONS --> SUMMARY[Campaign Summary<br/>Review Proposal]
    
    SUMMARY --> APPROVE{Approve Proposal?}
    APPROVE -->|No| W2
    APPROVE -->|Yes| CONTRACT[Digital Contract]
    
    CONTRACT --> SIGN[E-Signature]
    SIGN --> PAYMENT[Process Payment<br/>Stripe Integration]
    
    PAYMENT --> SUCCESS{Payment Success?}
    SUCCESS -->|No| RETRY[Retry Payment]
    RETRY --> PAYMENT
    
    SUCCESS -->|Yes| CREATE_SHOOT[Create Shoot<br/>in Database]
    CREATE_SHOOT --> PROJECT[Project Overview Dashboard]
    
    PROJECT --> TRACK[Track Project Status]
    TRACK --> MILESTONE{Current Milestone}
    
    MILESTONE -->|Planning| SHOTLIST[Shot List Builder]
    MILESTONE -->|Production| SCHEDULE[Production Schedule]
    MILESTONE -->|Review| GALLERY[Gallery Dashboard]
    MILESTONE -->|Delivery| DOWNLOAD[Download Finals]
    
    SHOTLIST --> APPROVE_SHOTS[Approve Shot List]
    APPROVE_SHOTS --> SCHEDULE
    
    SCHEDULE --> SHOOT_DAY[Shoot Day]
    SHOOT_DAY --> UPLOAD[Upload Previews]
    
    UPLOAD --> GALLERY
    GALLERY --> SELECT[Select Finals]
    SELECT --> RETOUCH[Retouching]
    
    RETOUCH --> DOWNLOAD
    DOWNLOAD --> COMPLETE([Shoot Complete])
    
    style START fill:#E8D5F2,color:#000
    style WIZARD fill:#A8D5BA,color:#000
    style PROJECT fill:#D4A5A5,color:#000
    style COMPLETE fill:#F8E8EE,color:#000
```

## 4. Sponsor: Find & Sponsor Event Flow

```mermaid
flowchart TD
    START([Sponsor<br/>Looking for Events]) --> HOMEPAGE[Visit Homepage]
    HOMEPAGE --> EVENTS[Browse Events Page]
    
    EVENTS --> FILTER[Apply Filters]
    FILTER --> F1[Filter by Category]
    FILTER --> F2[Filter by Location]
    FILTER --> F3[Filter by Date]
    FILTER --> F4[Filter by Budget]
    
    F1 --> RESULTS[View Filtered Results]
    F2 --> RESULTS
    F3 --> RESULTS
    F4 --> RESULTS
    
    RESULTS --> SELECT[Select Event]
    SELECT --> EVENT_DETAIL[Event Detail Page]
    
    EVENT_DETAIL --> VIEW{Review Event Info}
    VIEW --> BASICS[Basic Info<br/>Title, Date, Venue]
    VIEW --> DESIGNERS[Featured Designers]
    VIEW --> AUDIENCE[Expected Audience]
    VIEW --> PACKAGES[Sponsorship Packages]
    
    PACKAGES --> ANALYZE[Analyze ROI Potential]
    ANALYZE --> AI_MATCH[AI Sponsor Matching<br/>Compatibility Score]
    
    AI_MATCH --> INTERESTED{Interested?}
    INTERESTED -->|No| RESULTS
    INTERESTED -->|Yes| CONTACT[Contact Event Planner]
    
    CONTACT --> AUTH{Have Account?}
    AUTH -->|No| SIGNUP[Sign Up]
    AUTH -->|Yes| LOGIN[Login]
    
    SIGNUP --> INQUIRY
    LOGIN --> INQUIRY
    
    INQUIRY[Send Inquiry] --> PLANNER_NOTIFIED[Event Planner Notified]
    PLANNER_NOTIFIED --> NEGOTIATE[Negotiation Phase]
    
    NEGOTIATE --> PROPOSAL[Receive Proposal]
    PROPOSAL --> REVIEW{Review Terms?}
    REVIEW -->|Reject| COUNTER[Counteroffer]
    COUNTER --> NEGOTIATE
    
    REVIEW -->|Accept| CONTRACT[Digital Contract]
    CONTRACT --> SIGN[E-Signature]
    SIGN --> PAYMENT[Process Payment]
    
    PAYMENT --> CONFIRM[Sponsorship Confirmed]
    CONFIRM --> CRM[Added to Sponsor CRM]
    
    CRM --> TRACK[Track Sponsorship]
    TRACK --> DELIVERABLES[Monitor Deliverables<br/>Logo, Booth, Mentions]
    
    DELIVERABLES --> EVENT_LIVE[Event Goes Live]
    EVENT_LIVE --> METRICS[Real-time Metrics<br/>Impressions, Engagement]
    
    METRICS --> POST_EVENT[Post-Event Report]
    POST_EVENT --> ROI[ROI Analysis<br/>Media Value, Reach]
    
    ROI --> END([Sponsorship Complete])
    
    style START fill:#E8D5F2,color:#000
    style EVENT_DETAIL fill:#A8D5BA,color:#000
    style CRM fill:#D4A5A5,color:#000
    style END fill:#F8E8EE,color:#000
```

## 5. Model: Get Cast in Event Flow

```mermaid
flowchart TD
    START([Model<br/>Looking for Work]) --> PROFILE{Have Profile?}
    PROFILE -->|No| CREATE[Create Model Profile]
    PROFILE -->|Yes| LOGIN[Login]
    
    CREATE --> UPLOAD[Upload Portfolio]
    UPLOAD --> MEASUREMENTS[Enter Measurements]
    MEASUREMENTS --> AGENCY[Link Agency (Optional)]
    AGENCY --> PROFILE_LIVE[Profile Live]
    
    LOGIN --> DASHBOARD[Model Dashboard]
    PROFILE_LIVE --> DASHBOARD
    
    DASHBOARD --> OPPORTUNITIES[View Casting Calls]
    OPPORTUNITIES --> FILTER[Filter Opportunities]
    FILTER --> RESULTS[View Matching Events]
    
    RESULTS --> APPLY[Apply to Casting Call]
    APPLY --> AVAILABILITY[Set Availability]
    AVAILABILITY --> SUBMIT[Submit Application]
    
    SUBMIT --> CASTING_DIR[Casting Director Reviews]
    CASTING_DIR --> DECISION{Selected?}
    DECISION -->|No| DECLINE[Not Selected]
    DECISION -->|Yes| CONFIRM[Casting Confirmed]
    
    CONFIRM --> EVENT_ASSIGN[Assigned to Event]
    EVENT_ASSIGN --> NOTIFICATIONS[Receive Notifications]
    
    NOTIFICATIONS --> FITTING[Fitting Schedule]
    FITTING --> ATTEND[Attend Fitting]
    ATTEND --> REHEARSAL[Rehearsal Schedule]
    REHEARSAL --> CALL_TIME[Receive Call Time]
    
    CALL_TIME --> SHOW_DAY[Show Day]
    SHOW_DAY --> WALK[Walk Runway]
    WALK --> COMPLETE[Event Complete]
    
    COMPLETE --> PAYMENT_MODEL[Receive Payment]
    PAYMENT_MODEL --> PORTFOLIO[Add to Portfolio]
    
    style START fill:#E8D5F2,color:#000
    style DASHBOARD fill:#A8D5BA,color:#000
    style EVENT_ASSIGN fill:#D4A5A5,color:#000
    style COMPLETE fill:#F8E8EE,color:#000
```

## 6. AI Assistant: Proactive Workflow

```mermaid
flowchart TD
    START([User Interacts<br/>with Dashboard]) --> MONITOR[AI Monitors Context]
    MONITOR --> DETECT[Detect User Intent]
    
    DETECT --> ANALYZE{Analyze Situation}
    ANALYZE -->|Creating Event| EVENT_ASSIST[Event Planner Agent]
    ANALYZE -->|Budget Issue| BUDGET_ASSIST[Budget Guardian Agent]
    ANALYZE -->|Risk Detected| OPS_ASSIST[Operations Risk Agent]
    ANALYZE -->|Finding Sponsor| SPONSOR_ASSIST[Sponsor Intelligence Agent]
    ANALYZE -->|Booking Shoot| SHOOT_ASSIST[Brand Shoot Agent]
    
    EVENT_ASSIST --> SUGGEST1[Suggest Tasks<br/>Generate Timeline]
    BUDGET_ASSIST --> SUGGEST2[Alert Budget Overrun<br/>Suggest Cuts]
    OPS_ASSIST --> SUGGEST3[Flag Risks<br/>Recommend Solutions]
    SPONSOR_ASSIST --> SUGGEST4[Recommend Sponsors<br/>Match Criteria]
    SHOOT_ASSIST --> SUGGEST5[Optimize Shot List<br/>Brand Analysis]
    
    SUGGEST1 --> DISPLAY[Display in AI Panel]
    SUGGEST2 --> DISPLAY
    SUGGEST3 --> DISPLAY
    SUGGEST4 --> DISPLAY
    SUGGEST5 --> DISPLAY
    
    DISPLAY --> USER_ACTION{User Response}
    USER_ACTION -->|Accept| EXECUTE[Execute Recommendation]
    USER_ACTION -->|Modify| REFINE[Refine Suggestion]
    USER_ACTION -->|Reject| DISMISS[Dismiss]
    
    EXECUTE --> UPDATE_DB[Update Database]
    UPDATE_DB --> NOTIFY[Notify User]
    
    REFINE --> AI_ADJUST[AI Adjusts]
    AI_ADJUST --> DISPLAY
    
    DISMISS --> LEARN[AI Learns Preference]
    
    NOTIFY --> CONTINUE[Continue Monitoring]
    LEARN --> CONTINUE
    CONTINUE --> MONITOR
    
    style START fill:#E8D5F2,color:#000
    style MONITOR fill:#4285F4,color:#fff
    style DISPLAY fill:#A8D5BA,color:#000
    style UPDATE_DB fill:#3ECF8E,color:#000
```

## User Journey Statistics

```mermaid
pie title "Average Steps by User Flow"
    "Event Creation (12 steps)" : 12
    "Designer Profile (9 steps)" : 9
    "Photography Booking (15 steps)" : 15
    "Sponsor Engagement (14 steps)" : 14
    "Model Casting (11 steps)" : 11
```
