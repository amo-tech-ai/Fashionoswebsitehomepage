# FashionOS Technical Architecture

**Version:** 1.0  
**Last Updated:** December 9, 2025  
**Status:** Production-Ready Blueprint

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Patterns](#architecture-patterns)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Database Design](#database-design)
7. [AI Integration](#ai-integration)
8. [Security Architecture](#security-architecture)
9. [Deployment & DevOps](#deployment--devops)
10. [Performance Optimization](#performance-optimization)
11. [Monitoring & Observability](#monitoring--observability)
12. [Scalability Strategy](#scalability-strategy)

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Web App     │  │  Mobile App  │  │  Admin Panel │      │
│  │  (React)     │  │  (React Nat.)│  │  (React)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   CDN / LOAD BALANCER                        │
│                  (Cloudflare / AWS CloudFront)               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY LAYER                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Rate Limiting │ Auth │ Request Validation │ Logging │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌──────────────────────┐    ┌──────────────────────┐
│  APPLICATION LAYER   │    │   AI SERVICES LAYER  │
│  ┌────────────────┐ │    │  ┌────────────────┐ │
│  │ REST API       │ │    │  │ Gemini AI API  │ │
│  │ (Express/      │ │    │  │ Integration    │ │
│  │  FastAPI)      │ │    │  └────────────────┘ │
│  └────────────────┘ │    │  ┌────────────────┐ │
│  ┌────────────────┐ │    │  │ AI Processing  │ │
│  │ WebSocket      │ │    │  │ Service        │ │
│  │ Server         │ │    │  └────────────────┘ │
│  └────────────────┘ │    └──────────────────────┘
└──────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │  Redis       │  │  S3 / GCS    │      │
│  │  (Primary DB)│  │  (Cache)     │  │  (Files)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│               EXTERNAL INTEGRATIONS                          │
│  Stripe │ SendGrid │ Social APIs │ Analytics │ Webhooks     │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Framework** | React | 18.x | UI library |
| **Language** | TypeScript | 5.x | Type safety |
| **Styling** | Tailwind CSS | 4.0 | Utility-first CSS |
| **State Management** | React Context + Hooks | - | Global state |
| **Routing** | Custom (state-based) | - | Client-side navigation |
| **Forms** | react-hook-form | 7.55.0 | Form validation |
| **Charts** | Recharts | Latest | Data visualization |
| **Icons** | lucide-react | Latest | Icon system |
| **Animations** | motion/react | Latest | UI animations |
| **HTTP Client** | Fetch API / Axios | - | API calls |
| **Date Handling** | date-fns | Latest | Date manipulation |

### Backend

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Runtime** | Node.js | 20.x LTS | JavaScript runtime |
| **Framework** | Express.js | 4.x | Web framework |
| **Alternative** | FastAPI (Python) | 0.100+ | High-performance async |
| **Language** | TypeScript / Python | 5.x / 3.11+ | Type-safe backend |
| **ORM** | Prisma / SQLAlchemy | Latest | Database abstraction |
| **Validation** | Zod / Pydantic | Latest | Schema validation |
| **Authentication** | JWT + Passport | Latest | Auth middleware |
| **WebSockets** | Socket.io | 4.x | Real-time updates |

### Database & Storage

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Primary DB** | PostgreSQL 15+ | Relational data storage |
| **Caching** | Redis 7+ | Session store, cache layer |
| **Search** | Elasticsearch 8+ | Full-text search (future) |
| **File Storage** | AWS S3 / Google Cloud Storage | Images, videos, documents |
| **CDN** | Cloudflare / CloudFront | Static asset delivery |

### AI & Machine Learning

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **AI Engine** | Google Gemini API | Text generation, analysis |
| **Vision API** | Gemini Vision | Image analysis and tagging |
| **Embeddings** | Gemini Embeddings | Semantic search, matching |

### DevOps & Infrastructure

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Hosting** | AWS ECS / Google Cloud Run | Container orchestration |
| **CI/CD** | GitHub Actions | Automated deployments |
| **Monitoring** | Datadog / New Relic | Performance monitoring |
| **Error Tracking** | Sentry | Error logging and alerts |
| **Logging** | CloudWatch / Stackdriver | Centralized logs |
| **Secrets** | AWS Secrets Manager | Credential management |

---

## Architecture Patterns

### Design Principles

1. **Microservices-Ready Monolith**
   - Start with monolithic architecture for simplicity
   - Design modules to be easily extracted into microservices
   - Clear separation of concerns (events, designers, sponsors, AI)

2. **API-First Design**
   - All features exposed via REST API
   - Frontend is thin client consuming APIs
   - Enables future mobile app without backend changes

3. **Event-Driven Architecture**
   - Use event bus for inter-module communication
   - Examples: `event.created` triggers task generation, notifications, AI analysis
   - Enables async processing and scalability

4. **Stateless Services**
   - No server-side session storage (use JWT)
   - Horizontal scaling without sticky sessions
   - Load balancer can route to any instance

5. **Cache-First Strategy**
   - Cache frequently accessed data (designer profiles, venue lists)
   - Invalidate cache on writes
   - Reduces database load by 70%+

---

## Frontend Architecture

### Component Structure

```
/src
  /components
    /dashboard              # Dashboard-specific widgets
      /AiReasoningPanel.tsx
      /CriticalTasksGrid.tsx
      /DashboardHeader.tsx
    /dashboards             # Full page dashboards
      /CommandCenter.tsx
      /DesignerDirectory.tsx
      /SponsorCRM.tsx
    /designers              # Designer-specific components
      /DesignerProfile.tsx
      /DesignerCard.tsx
    /sponsors               # Sponsor-specific components
      /SponsorDetail.tsx
    /shared                 # Reusable components
      /Sidebar.tsx
      /NavigationBar.tsx
    /ui                     # Base UI components (shadcn-style)
      /button.tsx
      /card.tsx
      /input.tsx
    /wizards                # Multi-step forms
      /EventCreationWizard.tsx
      /DirectoryProfileWizard.tsx
  /hooks                    # Custom React hooks
    /useAuth.ts
    /useEvents.ts
    /useAI.ts
  /lib                      # Utility functions
    /api.ts                 # API client
    /utils.ts               # Helper functions
    /constants.ts           # App constants
  /types                    # TypeScript type definitions
    /event.ts
    /designer.ts
    /sponsor.ts
  /styles
    /globals.css            # Global styles, Tailwind config
  /App.tsx                  # Main app component with routing
  /main.tsx                 # App entry point
```

### State Management Strategy

**Global State (React Context):**
- User authentication state
- Current event selection
- Theme preferences (light/dark mode)

**Local State (useState, useReducer):**
- Component-specific UI state
- Form inputs
- Modal open/close states

**Server State (React Query - Future):**
- API data caching
- Automatic refetching
- Optimistic updates

**Example: Auth Context**

```typescript
// /hooks/useAuth.ts
import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'event_planner' | 'designer' | 'sponsor' | 'venue_manager';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUserProfile(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

---

### API Client Pattern

```typescript
// /lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.fashionos.com/v1';

class APIClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: this.getHeaders()
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }
}

export const api = new APIClient();
```

---

## Backend Architecture

### Project Structure (Node.js/Express)

```
/server
  /src
    /controllers            # Route handlers
      /events.controller.ts
      /designers.controller.ts
      /sponsors.controller.ts
      /ai.controller.ts
    /services               # Business logic
      /events.service.ts
      /ai.service.ts
      /email.service.ts
    /models                 # Database models (Prisma)
      /schema.prisma
    /middleware             # Express middleware
      /auth.middleware.ts
      /rateLimiter.middleware.ts
      /validation.middleware.ts
    /routes                 # API routes
      /events.routes.ts
      /designers.routes.ts
      /ai.routes.ts
    /utils                  # Utility functions
      /jwt.util.ts
      /logger.util.ts
    /config                 # Configuration
      /database.config.ts
      /ai.config.ts
    /types                  # TypeScript types
      /express.d.ts
    /app.ts                 # Express app setup
    /server.ts              # Server entry point
  /tests
    /unit
    /integration
  /prisma
    /schema.prisma          # Database schema
    /migrations             # DB migrations
```

### Layered Architecture

```
┌─────────────────────────────────────┐
│         ROUTES LAYER                │
│  Define API endpoints               │
│  Map HTTP methods to controllers    │
└─────────────────────────────────────┘
              ▼
┌─────────────────────────────────────┐
│      CONTROLLERS LAYER              │
│  Handle HTTP requests/responses     │
│  Input validation                   │
│  Call appropriate services          │
└─────────────────────────────────────┘
              ▼
┌─────────────────────────────────────┐
│       SERVICES LAYER                │
│  Business logic                     │
│  Orchestrate operations             │
│  Call external APIs (AI, email)     │
└─────────────────────────────────────┘
              ▼
┌─────────────────────────────────────┐
│     DATA ACCESS LAYER (ORM)         │
│  Database queries                   │
│  Data transformation                │
└─────────────────────────────────────┘
              ▼
┌─────────────────────────────────────┐
│         DATABASE                    │
│  PostgreSQL                         │
└─────────────────────────────────────┘
```

### Example: Events Service

```typescript
// /services/events.service.ts
import { prisma } from '../config/database.config';
import { AIService } from './ai.service';
import { EventBus } from '../utils/eventBus';

export class EventsService {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  async createEvent(data: CreateEventDTO, userId: string) {
    // 1. Create event in database
    const event = await prisma.event.create({
      data: {
        ...data,
        organizer_id: userId,
        status: 'planning',
        progress_percentage: 0
      }
    });

    // 2. Generate tasks using AI
    const tasks = await this.aiService.generateEventTasks(event);
    await prisma.task.createMany({ data: tasks });

    // 3. Emit event for other services
    EventBus.emit('event.created', { eventId: event.id });

    // 4. Return created event with tasks
    return {
      ...event,
      tasks_generated: tasks.length
    };
  }

  async getEventById(eventId: string, userId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        venue: true,
        organizer: { select: { id: true, first_name: true, last_name: true, company: true } },
        designers: { include: { designer: true } },
        sponsors: { include: { sponsor: true } },
        tasks: { select: { id: true, status: true } }
      }
    });

    if (!event) throw new Error('Event not found');

    // Check authorization
    if (event.organizer_id !== userId) {
      throw new Error('Unauthorized');
    }

    // Calculate KPIs
    const kpis = this.calculateEventKPIs(event);

    return { ...event, kpis };
  }

  private calculateEventKPIs(event: any) {
    const tasksTotal = event.tasks.length;
    const tasksCompleted = event.tasks.filter((t: any) => t.status === 'done').length;
    const tasksOverdue = event.tasks.filter((t: any) => 
      t.status !== 'done' && new Date(t.due_date) < new Date()
    ).length;

    return {
      tasks_total: tasksTotal,
      tasks_completed: tasksCompleted,
      tasks_overdue: tasksOverdue,
      deliverables_pending: event.deliverables?.filter((d: any) => !d.completed).length || 0
    };
  }
}
```

---

## Database Design

### PostgreSQL Schema (Prisma)

```prisma
// /prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  password_hash String
  first_name    String
  last_name     String
  role          Role
  company       String?
  avatar_url    String?
  phone         String?
  created_at    DateTime @default(now())
  last_login    DateTime?

  // Relations
  organized_events Event[]     @relation("EventOrganizer")
  tasks            Task[]      @relation("TaskAssignee")
  designer         Designer?   @relation("DesignerUser")
  sponsor          Sponsor?    @relation("SponsorUser")
}

enum Role {
  event_planner
  designer
  sponsor
  venue_manager
  model
  admin
}

model Event {
  id                  String      @id @default(uuid())
  name                String
  type                EventType
  description         String?     @db.Text
  date_start          DateTime
  date_end            DateTime
  venue_id            String
  organizer_id        String
  budget              Decimal     @db.Decimal(12, 2)
  budget_spent        Decimal     @default(0) @db.Decimal(12, 2)
  target_attendees    Int
  tickets_sold        Int         @default(0)
  status              EventStatus
  progress_percentage Int         @default(0)
  created_at          DateTime    @default(now())
  updated_at          DateTime    @updatedAt

  // Relations
  venue           Venue            @relation(fields: [venue_id], references: [id])
  organizer       User             @relation("EventOrganizer", fields: [organizer_id], references: [id])
  tasks           Task[]
  designers       EventDesigner[]
  sponsors        EventSponsor[]
  contracts       Contract[]
  analytics       Analytics[]
  ai_insights     AIInsight[]
  runway_looks    RunwayLook[]

  @@index([organizer_id])
  @@index([date_start, date_end])
  @@index([status])
}

enum EventType {
  runway_show
  trunk_show
  activation
  pop_up
  photoshoot
}

enum EventStatus {
  planning
  confirmed
  in_progress
  completed
  cancelled
}

model Designer {
  id                      String   @id @default(uuid())
  user_id                 String?  @unique
  name                    String
  category                String
  city                    String
  country                 String
  bio                     String?  @db.Text
  signature_style         String?  @db.Text
  founded_year            Int?
  website                 String?
  instagram               String?
  awards                  Json?
  sustainability_practices String?  @db.Text
  tags                    String[]
  status                  DesignerStatus
  created_at              DateTime @default(now())

  // Relations
  user              User?            @relation("DesignerUser", fields: [user_id], references: [id])
  collections       Collection[]
  event_assignments EventDesigner[]

  @@index([category])
  @@index([city])
  @@index([status])
}

enum DesignerStatus {
  active
  pending
  inactive
}

model Collection {
  id              String   @id @default(uuid())
  designer_id     String
  name            String
  season          String
  theme           String?  @db.Text
  piece_count     Int
  lookbook_images Json     // Array of image URLs
  created_at      DateTime @default(now())

  // Relations
  designer     Designer     @relation(fields: [designer_id], references: [id])
  runway_looks RunwayLook[]

  @@index([designer_id])
}

model Sponsor {
  id             String        @id @default(uuid())
  user_id        String?       @unique
  company_name   String
  logo_url       String?
  industry       String?
  brand_values   Json?         // Array of values
  contact_name   String
  contact_email  String
  contact_phone  String?
  tier           SponsorTier?
  status         SponsorStatus
  created_at     DateTime      @default(now())

  // Relations
  user           User?          @relation("SponsorUser", fields: [user_id], references: [id])
  sponsorships   EventSponsor[]
  contracts      Contract[]

  @@index([status])
  @@index([tier])
}

enum SponsorTier {
  platinum
  gold
  silver
  bronze
}

enum SponsorStatus {
  prospect
  contacted
  negotiating
  confirmed
}

model EventSponsor {
  id                String   @id @default(uuid())
  event_id          String
  sponsor_id        String
  tier              SponsorTier
  investment_amount Decimal  @db.Decimal(12, 2)
  contract_id       String?
  deliverables      Json?    // Array of deliverables
  status            String
  created_at        DateTime @default(now())

  // Relations
  event    Event    @relation(fields: [event_id], references: [id])
  sponsor  Sponsor  @relation(fields: [sponsor_id], references: [id])
  contract Contract? @relation(fields: [contract_id], references: [id])

  @@index([event_id])
  @@index([sponsor_id])
}

model EventDesigner {
  id                  String   @id @default(uuid())
  event_id            String
  designer_id         String
  collection_id       String?
  look_count          Int
  walk_order_position Int?
  status              String   // invited, confirmed, declined
  created_at          DateTime @default(now())

  // Relations
  event      Event       @relation(fields: [event_id], references: [id])
  designer   Designer    @relation(fields: [designer_id], references: [id])
  collection Collection? @relation(fields: [collection_id], references: [id])

  @@index([event_id])
  @@index([designer_id])
}

model Venue {
  id             String   @id @default(uuid())
  name           String
  address        String
  city           String
  country        String
  capacity       Int
  floor_plan_url String?
  features       Json?    // Array of features
  hourly_rate    Decimal? @db.Decimal(10, 2)
  daily_rate     Decimal? @db.Decimal(10, 2)
  created_at     DateTime @default(now())

  // Relations
  events Event[]

  @@index([city])
}

model Task {
  id            String     @id @default(uuid())
  event_id      String
  title         String
  description   String?    @db.Text
  category      TaskCategory
  status        TaskStatus
  priority      TaskPriority
  assigned_to   String?
  due_date      DateTime
  dependencies  Json?      // Array of task IDs
  deliverables  Json?      // Array of file URLs
  created_at    DateTime   @default(now())
  completed_at  DateTime?

  // Relations
  event    Event  @relation(fields: [event_id], references: [id])
  assignee User?  @relation("TaskAssignee", fields: [assigned_to], references: [id])

  @@index([event_id])
  @@index([assigned_to])
  @@index([status])
  @@index([due_date])
}

enum TaskCategory {
  event_planning
  sponsorship
  marketing
  operations
  media
}

enum TaskStatus {
  todo
  in_progress
  review
  done
}

enum TaskPriority {
  low
  medium
  high
}

model Contract {
  id               String        @id @default(uuid())
  event_id         String
  type             ContractType
  party_name       String
  party_id         String        // Polymorphic reference
  contract_url     String
  signature_status SignatureStatus
  signed_date      DateTime?
  expiration_date  DateTime?
  value            Decimal?      @db.Decimal(12, 2)
  created_at       DateTime      @default(now())

  // Relations
  event          Event          @relation(fields: [event_id], references: [id])
  event_sponsors EventSponsor[]

  @@index([event_id])
  @@index([signature_status])
}

enum ContractType {
  designer
  model
  sponsor
  vendor
  venue
}

enum SignatureStatus {
  draft
  sent
  signed
  archived
}

model Model {
  id               String   @id @default(uuid())
  user_id          String?  @unique
  name             String
  agency           String?
  measurements     Json     // Height, bust, waist, hips, shoe
  portfolio_images Json?    // Array of image URLs
  availability     Json?    // Available dates
  hourly_rate      Decimal? @db.Decimal(10, 2)
  created_at       DateTime @default(now())

  // Relations
  runway_looks RunwayLook[]
}

model RunwayLook {
  id            String   @id @default(uuid())
  event_id      String
  designer_id   String
  collection_id String?
  model_id      String?
  look_number   Int
  description   String?  @db.Text
  music_cue     String?
  lighting_cue  String?
  image_url     String?
  created_at    DateTime @default(now())

  // Relations
  event      Event       @relation(fields: [event_id], references: [id])
  collection Collection? @relation(fields: [collection_id], references: [id])
  model      Model?      @relation(fields: [model_id], references: [id])

  @@index([event_id])
  @@index([model_id])
}

model Analytics {
  id           String   @id @default(uuid())
  event_id     String
  metric_type  String   // attendance, social_impressions, etc.
  metric_value Decimal  @db.Decimal(15, 2)
  timestamp    DateTime @default(now())
  source       String?  // Data source

  // Relations
  event Event @relation(fields: [event_id], references: [id])

  @@index([event_id])
  @@index([metric_type])
}

model AIInsight {
  id            String        @id @default(uuid())
  event_id      String
  insight_type  InsightType
  severity      Severity
  message       String        @db.Text
  related_data  Json?
  status        InsightStatus
  created_at    DateTime      @default(now())
  resolved_at   DateTime?

  // Relations
  event Event @relation(fields: [event_id], references: [id])

  @@index([event_id])
  @@index([status])
  @@index([severity])
}

enum InsightType {
  alert
  prediction
  recommendation
  trend
}

enum Severity {
  low
  medium
  high
}

enum InsightStatus {
  active
  resolved
  dismissed
}
```

---

## AI Integration

### Gemini API Service Layer

```typescript
// /services/ai.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

export class AIService {
  private client: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.model = this.client.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  /**
   * Detect risks for an event
   */
  async detectEventRisks(eventId: string) {
    // 1. Fetch event data
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { tasks: true, venue: true, designers: true }
    });

    // 2. Prepare context for AI
    const context = this.buildRiskDetectionContext(event);

    // 3. Call Gemini
    const prompt = `
      Analyze this fashion event for potential risks. Return JSON array of risks.
      
      ${context}
      
      Format: [{"type": "...", "severity": "high|medium|low", "message": "...", "recommendation": "...", "probability": 0-100}]
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Parse and store insights
    const risks = JSON.parse(text);
    
    for (const risk of risks) {
      await prisma.aIInsight.create({
        data: {
          event_id: eventId,
          insight_type: 'alert',
          severity: risk.severity,
          message: risk.message,
          related_data: { type: risk.type, recommendation: risk.recommendation },
          status: 'active'
        }
      });
    }

    return risks;
  }

  /**
   * Match sponsors to event
   */
  async matchSponsors(eventId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { designers: { include: { designer: true } } }
    });

    const sponsors = await prisma.sponsor.findMany({
      where: { status: 'confirmed' }
    });

    // Use embeddings for semantic matching
    const eventEmbedding = await this.generateEmbedding(
      this.buildEventDescription(event)
    );

    const matches = [];
    for (const sponsor of sponsors) {
      const sponsorEmbedding = await this.generateEmbedding(
        `${sponsor.company_name} ${JSON.stringify(sponsor.brand_values)}`
      );

      const compatibilityScore = this.cosineSimilarity(eventEmbedding, sponsorEmbedding);

      if (compatibilityScore > 0.7) {
        matches.push({
          sponsor_id: sponsor.id,
          sponsor_name: sponsor.company_name,
          compatibility_score: Math.round(compatibilityScore * 100),
          suggested_tier: this.suggestTier(compatibilityScore),
          estimated_roi: await this.estimateROI(sponsor.id, event.type)
        });
      }
    }

    return matches.sort((a, b) => b.compatibility_score - a.compatibility_score);
  }

  /**
   * Generate event tasks using AI
   */
  async generateEventTasks(event: any) {
    const prompt = `
      Generate a comprehensive task list for this fashion event:
      
      Event Type: ${event.type}
      Budget: $${event.budget}
      Attendees: ${event.target_attendees}
      Date: ${event.date_start}
      
      Return JSON array of tasks with: title, description, category, priority, due_date_offset (days from now)
      Categories: event_planning, sponsorship, marketing, operations, media
      Priorities: low, medium, high
      
      Generate 100+ tasks covering all 5 phases: Pre-Production, Venue & Logistics, Creative Design, On-Site Ops, Post-Event
    `;

    const result = await this.model.generateContent(prompt);
    const text = (await result.response).text();
    const tasks = JSON.parse(text);

    return tasks.map((task: any) => ({
      ...task,
      event_id: event.id,
      status: 'todo',
      due_date: new Date(Date.now() + task.due_date_offset * 24 * 60 * 60 * 1000)
    }));
  }

  /**
   * Generate content (captions, descriptions, etc.)
   */
  async generateContent(contentType: string, context: any) {
    const prompts = {
      social_caption: `Create an engaging Instagram caption for this fashion event: ${JSON.stringify(context)}. Tone: luxury, aspirational. Include emojis and hashtags.`,
      event_description: `Write a compelling event description for: ${JSON.stringify(context)}. Professional tone, 200-300 words.`,
      press_release: `Draft a press release for: ${JSON.stringify(context)}. Include headline, dateline, quotes, contact info.`
    };

    const result = await this.model.generateContent(prompts[contentType as keyof typeof prompts]);
    return (await result.response).text();
  }

  /**
   * Analyze image with Gemini Vision
   */
  async analyzeImage(imageUrl: string) {
    const imageData = await this.fetchImageAsBase64(imageUrl);

    const prompt = `
      Analyze this fashion image. Return JSON with:
      {
        "tags": ["tag1", "tag2", ...],
        "dominant_colors": ["#hex1", "#hex2", ...],
        "garment_type": "...",
        "suggested_caption": "...",
        "season_suggestion": "Spring/Summer or Fall/Winter"
      }
    `;

    const result = await this.model.generateContent([
      prompt,
      { inlineData: { data: imageData, mimeType: 'image/jpeg' } }
    ]);

    const text = (await result.response).text();
    return JSON.parse(text);
  }

  /**
   * Process natural language query
   */
  async processQuery(query: string, userId: string) {
    // Extract intent and entities using Gemini
    const intentPrompt = `
      Analyze this user query and extract: intent, entities, filters.
      Query: "${query}"
      
      Return JSON: {"intent": "...", "entities": {...}, "sql_hint": "..."}
    `;

    const result = await this.model.generateContent(intentPrompt);
    const parsed = JSON.parse((await result.response).text());

    // Execute database query based on intent
    const data = await this.executeQuery(parsed, userId);

    // Generate natural language response
    const responsePrompt = `
      User asked: "${query}"
      Data retrieved: ${JSON.stringify(data)}
      
      Generate a natural, conversational response explaining this data.
    `;

    const responseResult = await this.model.generateContent(responsePrompt);
    return (await responseResult.response).text();
  }

  // Helper methods
  private async generateEmbedding(text: string): Promise<number[]> {
    // Use Gemini Embeddings API
    const result = await this.client.getGenerativeModel({ model: 'embedding-001' })
      .embedContent(text);
    return result.embedding.values;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  private buildRiskDetectionContext(event: any): string {
    return `
      Event: ${event.name}
      Type: ${event.type}
      Date: ${event.date_start}
      Venue Capacity: ${event.venue?.capacity}
      Tickets Sold: ${event.tickets_sold}
      Designers: ${event.designers?.length}
      Tasks Total: ${event.tasks?.length}
      Tasks Overdue: ${event.tasks?.filter((t: any) => t.status !== 'done' && new Date(t.due_date) < new Date()).length}
      Budget: $${event.budget}, Spent: $${event.budget_spent}
    `;
  }
}
```

---

## Security Architecture

### Authentication Flow

```
┌────────────┐                           ┌────────────┐
│   Client   │                           │   Server   │
└────────────┘                           └────────────┘
       │                                        │
       │  POST /api/auth/login                 │
       │  {email, password}                    │
       │───────────────────────────────────────>│
       │                                        │
       │                                  Validate credentials
       │                                  Generate JWT tokens
       │                                        │
       │  200 OK                                │
       │  {access_token, refresh_token, user}   │
       │<───────────────────────────────────────│
       │                                        │
  Store tokens in                               │
  localStorage                                  │
       │                                        │
       │  GET /api/events                       │
       │  Header: Authorization: Bearer {token} │
       │───────────────────────────────────────>│
       │                                        │
       │                                  Verify JWT
       │                                  Extract user ID
       │                                  Fetch data
       │                                        │
       │  200 OK {events}                       │
       │<───────────────────────────────────────│
       │                                        │
  Token expires (15 min)                        │
       │                                        │
       │  POST /api/auth/refresh                │
       │  {refresh_token}                       │
       │───────────────────────────────────────>│
       │                                        │
       │                                  Verify refresh token
       │                                  Generate new access token
       │                                        │
       │  200 OK {access_token}                 │
       │<───────────────────────────────────────│
```

### Security Best Practices Implemented

1. **Password Security**
   - Bcrypt hashing with salt rounds = 12
   - Minimum password strength requirements
   - No password stored in plain text

2. **JWT Tokens**
   - Short-lived access tokens (15 minutes)
   - Long-lived refresh tokens (7 days)
   - Tokens signed with RS256 algorithm
   - Refresh tokens stored HTTP-only cookies (not localStorage)

3. **API Security**
   - Rate limiting: 100 requests/minute per IP
   - CORS configured for specific origins
   - Request validation using Zod/Pydantic
   - SQL injection prevention via parameterized queries (ORM)
   - XSS prevention via input sanitization

4. **Data Protection**
   - HTTPS enforced (TLS 1.3)
   - Sensitive data encrypted at rest (AES-256)
   - PII data access logged for audit

5. **RBAC (Role-Based Access Control)**
   - Roles: event_planner, designer, sponsor, venue_manager, admin
   - Permissions checked on every request
   - Resource-level authorization (can only access own events, etc.)

---

## Deployment & DevOps

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test
      - run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/

  deploy-frontend:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster fashionos-cluster \
            --service fashionos-api \
            --force-new-deployment
```

### Infrastructure as Code (Terraform)

```hcl
# terraform/main.tf
provider "aws" {
  region = "us-east-1"
}

# ECS Cluster
resource "aws_ecs_cluster" "fashionos" {
  name = "fashionos-cluster"
}

# RDS PostgreSQL
resource "aws_db_instance" "fashionos_db" {
  identifier           = "fashionos-db"
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.medium"
  allocated_storage    = 100
  storage_encrypted    = true
  username             = "fashionos_admin"
  password             = var.db_password
  multi_az             = true
  backup_retention_period = 7
  publicly_accessible  = false
}

# S3 Bucket for Media
resource "aws_s3_bucket" "fashionos_media" {
  bucket = "fashionos-media-production"
  acl    = "private"

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled = true
    transition {
      days          = 90
      storage_class = "STANDARD_IA"
    }
  }
}

# CloudFront CDN
resource "aws_cloudfront_distribution" "fashionos_cdn" {
  origin {
    domain_name = aws_s3_bucket.fashionos_media.bucket_regional_domain_name
    origin_id   = "S3-fashionos-media"
  }

  enabled = true
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-fashionos-media"
    viewer_protocol_policy = "redirect-to-https"
  }
}
```

---

## Performance Optimization

### Frontend Optimization Strategies

1. **Code Splitting**
   ```typescript
   // Lazy load dashboard components
   const CommandCenter = lazy(() => import('./components/dashboards/CommandCenter'));
   const DesignerDirectory = lazy(() => import('./components/designers/DesignerDirectory'));
   
   // Wrap in Suspense
   <Suspense fallback={<LoadingSpinner />}>
     <CommandCenter />
   </Suspense>
   ```

2. **Image Optimization**
   - WebP format with JPEG fallback
   - Responsive images with srcset
   - Lazy loading below the fold
   - Thumbnail generation (S3 Lambda trigger)

3. **Caching Strategy**
   - Service Worker for offline capability
   - LocalStorage for user preferences
   - React Query for API response caching

4. **Bundle Optimization**
   - Tree shaking unused code
   - Minification and compression (Gzip/Brotli)
   - CDN for static assets

### Backend Optimization Strategies

1. **Database Query Optimization**
   - Proper indexing on frequently queried fields
   - Use of SELECT only needed columns
   - Pagination for large result sets
   - Connection pooling (max 20 connections)

2. **Caching with Redis**
   ```typescript
   // Cache designer directory for 10 minutes
   const cacheKey = `designers:${category}:${page}`;
   const cached = await redis.get(cacheKey);
   if (cached) return JSON.parse(cached);
   
   const designers = await prisma.designer.findMany({...});
   await redis.setex(cacheKey, 600, JSON.stringify(designers));
   ```

3. **API Response Compression**
   - Gzip compression for all JSON responses
   - Reduces payload size by ~70%

4. **Background Jobs**
   - Use Bull/BullMQ for async tasks
   - Examples: Send emails, generate reports, process AI insights
   - Prevents blocking main API thread

---

## Monitoring & Observability

### Metrics to Track

**Application Metrics:**
- API response times (p50, p95, p99)
- Error rates by endpoint
- AI API latency and success rate
- Database query performance

**Business Metrics:**
- Daily/monthly active users
- Events created per day
- AI insights generated
- Conversion rate (trial → paid)

**Infrastructure Metrics:**
- CPU and memory usage
- Database connection pool utilization
- Redis hit/miss ratio
- S3 storage usage

### Logging Strategy

```typescript
// Structured logging with Winston
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'fashionos-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Usage
logger.info('Event created', { eventId: event.id, userId: user.id });
logger.error('AI API failed', { error: err.message, eventId });
```

### Error Tracking with Sentry

```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1 // 10% of transactions
});

// Capture errors
try {
  await someRiskyOperation();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
```

---

## Scalability Strategy

### Horizontal Scaling

**Frontend:**
- Deployed to CDN (Vercel/Netlify)
- Automatically scales with traffic
- No server-side rendering required

**Backend:**
- Containerized with Docker
- Auto-scaling ECS tasks based on CPU usage
- Load balancer distributes traffic

**Database:**
- Read replicas for analytics queries
- Connection pooling to prevent exhaustion
- Sharding by event_id if needed (future)

### Vertical Scaling Limits

| Component | Current | Max Vertical Scale |
|-----------|---------|-------------------|
| App Server | t3.medium (2 vCPU, 4GB) | t3.2xlarge (8 vCPU, 32GB) |
| PostgreSQL | db.t3.medium | db.r6g.4xlarge (16 vCPU, 128GB) |
| Redis | cache.t3.small | cache.r6g.xlarge (4 vCPU, 25.88GB) |

### Microservices Migration Path (Future)

When monolith reaches limits, extract:
1. **AI Service** - Gemini integration and processing
2. **Media Service** - Image/video upload and processing
3. **Analytics Service** - ROI calculations and reporting
4. **Notification Service** - Email, SMS, push notifications

---

**End of Technical Architecture Document**

This architecture is designed for:
- **Rapid initial development** (monolith)
- **Production-grade security** (auth, encryption, RBAC)
- **AI-first capabilities** (Gemini integration)
- **Future scalability** (horizontal scaling, microservices-ready)

For implementation questions, contact: [tech@fashionos.com](mailto:tech@fashionos.com)
