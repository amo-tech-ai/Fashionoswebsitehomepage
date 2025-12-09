# FashionOS API Reference

**Version:** 1.0  
**Base URL:** `https://api.fashionos.com/v1`  
**Authentication:** Bearer Token (JWT)

---

## Table of Contents

1. [Authentication](#authentication)
2. [Events API](#events-api)
3. [Designers API](#designers-api)
4. [Sponsors API](#sponsors-api)
5. [Tasks API](#tasks-api)
6. [Venues API](#venues-api)
7. [AI Services API](#ai-services-api)
8. [Analytics API](#analytics-api)
9. [Media API](#media-api)
10. [Error Handling](#error-handling)

---

## Authentication

### POST `/auth/login`

Authenticate user and receive access token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 900,
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "role": "event_planner",
    "first_name": "Jane",
    "last_name": "Smith"
  }
}
```

---

### POST `/auth/refresh`

Refresh expired access token.

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 900
}
```

---

## Events API

### GET `/events`

List all events (with pagination and filtering).

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Results per page (default: 20, max: 100)
- `status` (string): Filter by status (planning, confirmed, in_progress, completed, cancelled)
- `from_date` (ISO date): Filter events starting from this date
- `to_date` (ISO date): Filter events ending before this date
- `organizer_id` (UUID): Filter by organizer

**Example Request:**
```
GET /events?status=in_progress&limit=10&page=1
```

**Response:**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Paris Fashion Week - Emerging Designers",
      "type": "runway_show",
      "date_start": "2026-09-10",
      "date_end": "2026-09-10",
      "venue": {
        "id": "venue-uuid",
        "name": "Grand Palais"
      },
      "status": "in_progress",
      "progress_percentage": 78,
      "budget": 500000,
      "target_attendees": 800,
      "created_at": "2025-06-01T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 47,
    "page": 1,
    "limit": 10,
    "total_pages": 5
  }
}
```

---

### POST `/events`

Create a new event.

**Request:**
```json
{
  "name": "Milan Fashion Summit 2026",
  "type": "runway_show",
  "description": "Showcase of 10 luxury designers",
  "date_start": "2026-10-15",
  "date_end": "2026-10-15",
  "venue_id": "venue-uuid-here",
  "budget": 750000,
  "target_attendees": 1200
}
```

**Response:**
```json
{
  "id": "new-event-uuid",
  "name": "Milan Fashion Summit 2026",
  "status": "planning",
  "progress_percentage": 0,
  "created_at": "2025-12-09T14:30:00Z",
  "tasks_generated": 127
}
```

---

### GET `/events/:id`

Get detailed information about a specific event.

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Paris Fashion Week - Emerging Designers",
  "type": "runway_show",
  "description": "A celebration of sustainable emerging talent",
  "date_start": "2026-09-10",
  "date_end": "2026-09-10",
  "venue": {
    "id": "venue-uuid",
    "name": "Grand Palais",
    "capacity": 800,
    "address": "Avenue Winston Churchill, Paris"
  },
  "organizer": {
    "id": "user-uuid",
    "name": "Jane Smith",
    "company": "Lumière Events"
  },
  "designers": [
    {
      "id": "designer-uuid",
      "name": "Aurelia Noir",
      "category": "Luxury Womenswear",
      "look_count": 12
    }
  ],
  "sponsors": [
    {
      "id": "sponsor-uuid",
      "company_name": "Chanel",
      "tier": "platinum",
      "investment_amount": 100000
    }
  ],
  "status": "in_progress",
  "progress_percentage": 78,
  "budget": 500000,
  "budget_spent": 320000,
  "target_attendees": 800,
  "tickets_sold": 654,
  "kpis": {
    "tasks_total": 127,
    "tasks_completed": 89,
    "tasks_overdue": 14,
    "deliverables_pending": 5
  },
  "created_at": "2025-06-01T10:00:00Z",
  "updated_at": "2025-12-09T14:30:00Z"
}
```

---

### PUT `/events/:id`

Update an existing event.

**Request:**
```json
{
  "status": "confirmed",
  "target_attendees": 850
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "confirmed",
  "target_attendees": 850,
  "updated_at": "2025-12-09T15:00:00Z"
}
```

---

### DELETE `/events/:id`

Cancel/delete an event.

**Response:**
```json
{
  "success": true,
  "message": "Event cancelled successfully",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## Designers API

### GET `/designers`

Search and filter designer directory.

**Query Parameters:**
- `search` (string): Search by name or category
- `category` (string): Filter by category
- `city` (string): Filter by location
- `tags` (array): Filter by tags (e.g., "Emerging Talent", "Sustainable")
- `status` (string): Filter by status (active, pending, inactive)
- `page` (number): Page number
- `limit` (number): Results per page

**Example Request:**
```
GET /designers?category=Luxury%20Womenswear&tags=Sustainable&limit=20
```

**Response:**
```json
{
  "data": [
    {
      "id": "designer-uuid-1",
      "name": "Aurelia Noir",
      "category": "Luxury Womenswear",
      "city": "Paris",
      "country": "France",
      "bio": "Sustainable luxury fashion with Parisian elegance",
      "tags": ["Emerging Talent", "Sustainable"],
      "events_count": 4,
      "collections_count": 2,
      "status": "active",
      "avatar_url": "https://cdn.fashionos.com/designers/aurelia-noir.jpg"
    }
  ],
  "pagination": {
    "total": 34,
    "page": 1,
    "limit": 20,
    "total_pages": 2
  }
}
```

---

### GET `/designers/:id`

Get full designer profile.

**Response:**
```json
{
  "id": "designer-uuid-1",
  "name": "Aurelia Noir",
  "category": "Luxury Womenswear",
  "city": "Paris",
  "country": "France",
  "bio": "Founded in 2022, Aurelia Noir represents the intersection of timeless elegance and conscious fashion...",
  "signature_style": "Sculptural silhouettes in sustainable fabrics with a noir color palette",
  "founded_year": 2022,
  "website": "https://aurelianoir.com",
  "instagram": "@aurelianoir",
  "awards": [
    {
      "name": "LVMH Prize - Finalist",
      "year": 2024
    }
  ],
  "sustainability_practices": "100% organic and recycled fabrics, carbon-neutral production, ethical labor practices",
  "tags": ["Emerging Talent", "Sustainable", "LVMH Finalist"],
  "status": "active",
  "contacts": {
    "agent": {
      "name": "Marie Dubois",
      "email": "marie@fashionagency.fr",
      "phone": "+33 1 42 86 99 00"
    },
    "pr_manager": {
      "name": "Sophie Laurent",
      "email": "sophie@luxepr.com"
    },
    "studio_address": "12 Rue de la Paix, 75002 Paris, France"
  },
  "collections": [
    {
      "id": "collection-uuid",
      "name": "Midnight Garden SS26",
      "season": "Spring/Summer 2026",
      "theme": "Nature's elegance after dark",
      "piece_count": 24,
      "lookbook_images": ["url1", "url2", "url3"]
    }
  ],
  "event_assignments": [
    {
      "event_id": "event-uuid",
      "event_name": "Paris Fashion Week - Emerging Designers",
      "date": "2026-09-10",
      "status": "confirmed"
    }
  ],
  "metrics": {
    "total_events": 4,
    "total_collections": 2,
    "instagram_followers": 45200,
    "press_mentions": 12
  },
  "created_at": "2024-01-15T10:00:00Z"
}
```

---

### POST `/designers`

Create a new designer profile.

**Request:**
```json
{
  "name": "Vesper Line",
  "category": "Minimalist Menswear",
  "city": "Berlin",
  "country": "Germany",
  "bio": "Redefinining modern menswear through minimalist design",
  "founded_year": 2023,
  "website": "https://vesperline.de",
  "instagram": "@vesperline",
  "tags": ["Emerging Talent", "Minimalist"]
}
```

**Response:**
```json
{
  "id": "new-designer-uuid",
  "name": "Vesper Line",
  "status": "pending",
  "created_at": "2025-12-09T16:00:00Z"
}
```

---

## Sponsors API

### GET `/sponsors`

List all sponsors with filtering.

**Query Parameters:**
- `status` (string): prospect, contacted, negotiating, confirmed
- `tier` (string): platinum, gold, silver, bronze
- `industry` (string): Filter by industry

**Response:**
```json
{
  "data": [
    {
      "id": "sponsor-uuid",
      "company_name": "Chanel",
      "logo_url": "https://cdn.fashionos.com/logos/chanel.png",
      "industry": "Luxury Fashion",
      "tier": "platinum",
      "status": "confirmed",
      "total_investment": 450000,
      "active_events": 3,
      "avg_roi": 4.8
    }
  ],
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 20
  }
}
```

---

### GET `/sponsors/:id/roi`

Get ROI metrics for a specific sponsor.

**Response:**
```json
{
  "sponsor_id": "sponsor-uuid",
  "company_name": "Chanel",
  "events": [
    {
      "event_id": "event-uuid",
      "event_name": "Paris Fashion Week - Emerging Designers",
      "date": "2026-09-10",
      "tier": "platinum",
      "investment": 100000,
      "metrics": {
        "attendance": 820,
        "media_impressions": 1200000,
        "social_impressions": 3200000,
        "media_value": 480000,
        "roi_multiplier": 4.8,
        "engagement_rate": 8.3
      }
    }
  ],
  "totals": {
    "total_investment": 450000,
    "total_media_value": 2160000,
    "avg_roi": 4.8,
    "total_events": 3
  }
}
```

---

## Tasks API

### GET `/tasks`

Get tasks with filtering.

**Query Parameters:**
- `event_id` (UUID): Filter by event
- `assigned_to` (UUID): Filter by assignee
- `category` (string): event_planning, sponsorship, marketing, operations, media
- `status` (string): todo, in_progress, review, done
- `priority` (string): low, medium, high
- `overdue` (boolean): Show only overdue tasks

**Response:**
```json
{
  "data": [
    {
      "id": "task-uuid",
      "event_id": "event-uuid",
      "title": "Finalize model walk order",
      "description": "Coordinate with creative director and designers",
      "category": "event_planning",
      "status": "in_progress",
      "priority": "high",
      "assigned_to": {
        "id": "user-uuid",
        "name": "Ella Martinez"
      },
      "due_date": "2026-09-08",
      "is_overdue": false,
      "dependencies": ["task-uuid-2"],
      "deliverables": [],
      "created_at": "2026-08-15T10:00:00Z"
    }
  ]
}
```

---

### POST `/tasks`

Create a new task.

**Request:**
```json
{
  "event_id": "event-uuid",
  "title": "Confirm backstage catering",
  "description": "Get final headcount and dietary restrictions",
  "category": "operations",
  "priority": "medium",
  "assigned_to": "user-uuid",
  "due_date": "2026-09-05"
}
```

**Response:**
```json
{
  "id": "new-task-uuid",
  "status": "todo",
  "created_at": "2025-12-09T17:00:00Z"
}
```

---

### PUT `/tasks/:id`

Update task status or details.

**Request:**
```json
{
  "status": "done",
  "deliverables": [
    "https://cdn.fashionos.com/files/catering-confirmation.pdf"
  ]
}
```

**Response:**
```json
{
  "id": "task-uuid",
  "status": "done",
  "completed_at": "2025-12-09T17:30:00Z"
}
```

---

## Venues API

### GET `/venues`

List all available venues.

**Response:**
```json
{
  "data": [
    {
      "id": "venue-uuid",
      "name": "Grand Palais",
      "address": "Avenue Winston Churchill, 75008 Paris, France",
      "city": "Paris",
      "country": "France",
      "capacity": 800,
      "features": ["Runway", "Backstage Rooms", "VIP Lounge", "Catering Kitchen"],
      "floor_plan_url": "https://cdn.fashionos.com/venues/grand-palais-floor-plan.pdf",
      "hourly_rate": 5000,
      "daily_rate": 35000,
      "availability": "available"
    }
  ]
}
```

---

### GET `/venues/:id/availability`

Check venue availability for specific dates.

**Query Parameters:**
- `from_date` (ISO date): Start date
- `to_date` (ISO date): End date

**Response:**
```json
{
  "venue_id": "venue-uuid",
  "venue_name": "Grand Palais",
  "availability": [
    {
      "date": "2026-09-10",
      "status": "booked",
      "event_name": "Paris Fashion Week"
    },
    {
      "date": "2026-09-11",
      "status": "available"
    }
  ]
}
```

---

## AI Services API

### POST `/ai/insights`

Generate AI insights for an event.

**Request:**
```json
{
  "event_id": "event-uuid",
  "insight_types": ["risk_detection", "predictions", "recommendations"]
}
```

**Response:**
```json
{
  "event_id": "event-uuid",
  "insights": {
    "risks": [
      {
        "type": "backstage_congestion",
        "severity": "high",
        "message": "Backstage congestion risk detected for Runway A",
        "recommendation": "Add 2 temporary dressing areas to reduce conflicts",
        "probability": 78,
        "related_step": "On-Site Ops"
      }
    ],
    "predictions": {
      "attendance": {
        "estimate": 1540,
        "confidence_range": [1420, 1680],
        "confidence_level": 85
      },
      "social_impressions": {
        "estimate": 2300000,
        "confidence_range": [2000000, 2600000]
      }
    },
    "recommendations": [
      "Consider adding sustainable designers to attract eco-conscious sponsors",
      "Increase social media budget by 10% for 15% higher reach"
    ]
  },
  "generated_at": "2025-12-09T18:00:00Z"
}
```

---

### POST `/ai/match-sponsors`

Get AI-powered sponsor recommendations for an event.

**Request:**
```json
{
  "event_id": "event-uuid"
}
```

**Response:**
```json
{
  "event_id": "event-uuid",
  "recommendations": [
    {
      "sponsor_id": "sponsor-uuid",
      "sponsor_name": "Montblanc",
      "compatibility_score": 92,
      "reasons": [
        "Target demographic aligns: Professional, 30-50 age range",
        "Brand values match: Luxury, craftsmanship, heritage",
        "Past success: 4.2x ROI in similar menswear events"
      ],
      "suggested_tier": "platinum",
      "estimated_roi": 4.5
    }
  ]
}
```

---

### POST `/ai/generate-content`

Generate marketing content using AI.

**Request:**
```json
{
  "content_type": "social_caption",
  "context": {
    "event_name": "Paris Fashion Week - Emerging Designers",
    "date": "2026-09-10",
    "venue": "Grand Palais",
    "designers": ["Aurelia Noir", "Kaelo Studios"],
    "tone": "luxury"
  }
}
```

**Response:**
```json
{
  "content": "✨ An evening of visionary fashion awaits ✨\n\nJoin us at the iconic Grand Palais as emerging design luminaries Aurelia Noir and Kaelo Studios unveil their latest collections. Where innovation meets artistry.\n\nSeptember 10 | Paris Fashion Week\n#FashionOS #PFW #EmergingDesigners",
  "alternative_versions": [
    "Version 2 here...",
    "Version 3 here..."
  ],
  "generated_at": "2025-12-09T18:30:00Z"
}
```

---

### POST `/ai/analyze-image`

Analyze and tag uploaded images.

**Request:**
```json
{
  "image_url": "https://cdn.fashionos.com/uploads/look-42.jpg"
}
```

**Response:**
```json
{
  "tags": [
    "evening gown",
    "silk",
    "emerald green",
    "asymmetric neckline",
    "floor-length",
    "luxury womenswear"
  ],
  "dominant_colors": ["#2D5F3E", "#1A1A1A", "#F5F5F5"],
  "suggested_caption": "Ethereal emerald silk gown with dramatic asymmetric draping",
  "garment_type": "evening wear",
  "season_suggestion": "Fall/Winter",
  "confidence": 0.94
}
```

---

## Analytics API

### GET `/analytics/events/:id`

Get comprehensive event analytics.

**Response:**
```json
{
  "event_id": "event-uuid",
  "event_name": "Paris Fashion Week - Emerging Designers",
  "metrics": {
    "attendance": {
      "target": 800,
      "actual": 820,
      "percentage": 102.5
    },
    "revenue": {
      "ticket_sales": 125000,
      "sponsorships": 450000,
      "merchandise": 18500,
      "total": 593500
    },
    "expenses": {
      "venue": 35000,
      "production": 85000,
      "marketing": 42000,
      "talent": 95000,
      "other": 63000,
      "total": 320000
    },
    "profit": 273500,
    "roi": 1.85,
    "social_media": {
      "impressions": 3200000,
      "engagement": 265600,
      "engagement_rate": 8.3,
      "hashtag_uses": 12400,
      "influencer_reach": 1800000
    },
    "media_coverage": {
      "articles": 27,
      "estimated_media_value": 1850000
    },
    "sponsor_roi": {
      "average_multiplier": 4.6,
      "total_sponsor_investment": 450000,
      "total_media_value": 2070000
    }
  },
  "generated_at": "2026-09-11T10:00:00Z"
}
```

---

## Media API

### POST `/media/upload`

Upload images or videos.

**Request (multipart/form-data):**
```
file: [binary data]
event_id: "event-uuid"
category: "runway" | "backstage" | "vip" | "details"
```

**Response:**
```json
{
  "id": "media-uuid",
  "url": "https://cdn.fashionos.com/events/event-uuid/runway/img-001.jpg",
  "thumbnail_url": "https://cdn.fashionos.com/events/event-uuid/runway/img-001-thumb.jpg",
  "file_size": 2458000,
  "dimensions": {
    "width": 3000,
    "height": 2000
  },
  "ai_tags": ["runway", "model", "fashion show", "luxury"],
  "uploaded_at": "2025-12-09T19:00:00Z"
}
```

---

### GET `/media`

Get media files with filtering.

**Query Parameters:**
- `event_id` (UUID): Filter by event
- `category` (string): runway, backstage, vip, details
- `tags` (array): Filter by AI-generated tags
- `from_date` (ISO date): Filter by upload date

**Response:**
```json
{
  "data": [
    {
      "id": "media-uuid",
      "url": "https://cdn.fashionos.com/events/event-uuid/runway/img-001.jpg",
      "thumbnail_url": "https://cdn.fashionos.com/events/event-uuid/runway/img-001-thumb.jpg",
      "category": "runway",
      "tags": ["runway", "evening wear", "emerald green"],
      "uploaded_at": "2026-09-10T20:30:00Z"
    }
  ],
  "pagination": {
    "total": 247,
    "page": 1,
    "limit": 50
  }
}
```

---

## Error Handling

### Error Response Format

All errors follow this structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional context"
    }
  }
}
```

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid auth token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate resource (e.g., email exists) |
| 422 | Unprocessable Entity | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Service temporarily down |

### Common Error Codes

| Code | Description |
|------|-------------|
| `AUTH_REQUIRED` | Authentication required |
| `INVALID_TOKEN` | JWT token invalid or expired |
| `INSUFFICIENT_PERMISSIONS` | User lacks required permissions |
| `RESOURCE_NOT_FOUND` | Requested resource doesn't exist |
| `VALIDATION_ERROR` | Input validation failed |
| `DUPLICATE_RESOURCE` | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | Too many requests in time window |
| `AI_SERVICE_ERROR` | Gemini API error or timeout |
| `FILE_TOO_LARGE` | Uploaded file exceeds size limit |
| `INVALID_FILE_TYPE` | File type not allowed |

### Example Error Responses

**401 Unauthorized:**
```json
{
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Access token expired. Please refresh your token.",
    "details": {
      "expired_at": "2025-12-09T18:00:00Z"
    }
  }
}
```

**422 Validation Error:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed for one or more fields",
    "details": {
      "email": "Invalid email format",
      "date_start": "Start date must be in the future"
    }
  }
}
```

**429 Rate Limit:**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please wait before retrying.",
    "details": {
      "limit": 60,
      "window": "1 minute",
      "retry_after": 42
    }
  }
}
```

---

## Rate Limits

| Endpoint Category | Limit | Window |
|------------------|-------|--------|
| Authentication | 10 requests | 1 minute |
| Standard API calls | 100 requests | 1 minute |
| AI Services | 10 requests | 1 minute |
| Media Upload | 50 requests | 1 hour |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1702140000
```

---

## Webhooks

FashionOS can send webhooks for important events.

### Webhook Events

| Event | Description |
|-------|-------------|
| `event.created` | New event created |
| `event.updated` | Event details updated |
| `event.completed` | Event marked as completed |
| `task.completed` | Task marked as done |
| `sponsor.confirmed` | Sponsor confirmed for event |
| `ai.alert.high` | High-severity AI alert generated |

### Webhook Payload Example

```json
{
  "event_type": "ai.alert.high",
  "timestamp": "2025-12-09T20:00:00Z",
  "data": {
    "event_id": "event-uuid",
    "alert": {
      "type": "backstage_congestion",
      "severity": "high",
      "message": "Backstage congestion risk detected for Runway A"
    }
  }
}
```

---

## Postman Collection

Download our Postman collection for easy API testing:
`https://api.fashionos.com/postman/FashionOS-API-Collection.json`

---

## Support

For API support, contact: [api-support@fashionos.com](mailto:api-support@fashionos.com)

**Last Updated:** December 9, 2025
