# UI/UX Plan: FashionOS Brand Designer Wizard
**Version:** 1.0  
**Date:** December 14, 2025  
**Designer Role:** Senior Product Designer (Luxury SaaS)  

---

## 1. Executive Summary

**Product:** FashionOS Brand Wizard  
**Objective:** A seamless, high-touch onboarding experience that transforms raw links into a strategic brand profile.  
**Design Philosophy:** "The Intelligent Mirror." The interface reflects the brand back to the designer, polished and analyzed, offering clarity rather than just data.  

**Core Metric:** Time-to-Value (TTV). The user should feel the value of the AI analysis within 30 seconds of entering the wizard.

---

## 2. User Flow Map

```mermaid
[Start] -> [1. Input Links] -> [2. AI Analysis (Magic Moment)] -> [3. Overview (Verification)] -> [4. Audit (Scoring)] -> [5. Timeline (Momentum)] -> [6. Dashboard (Control)]
```

---

## 3. Screen-by-Screen UX Specifications

### Screen 1: The Input (Zero Friction)
**Goal:** Low effort, high promise. Get the user started immediately.

*   **Layout:**
    *   **Center Stage:** A clean, focused modal. No sidebar distractions.
    *   **Hero Text:** Serif font, large. "Create Your Brand Profile."
    *   **Input Group:** Vertical stack. Large touch targets.
*   **Fields:**
    *   Brand Name (Text)
    *   Website URL (Text)
    *   Instagram Handle (Text + prefix `@`)
*   **Primary Action:**
    *   Button: "Analyze My Brand" (Black, full width).
    *   *Micro-copy:* "Free AI brand audit included."
*   **Sample Data:**
    *   *Placeholder:* "e.g., Aurelia Noir"
    *   *URL:* "https://aurelianoir.com"

### Screen 2: The Scanner (The "Magic" Moment)
**Goal:** Visualize the AI working to build trust in the result. Don't just spin; *show*.

*   **Layout:**
    *   **Center:** Abstract "Scanning" visualization (Radar/Pulse animation).
    *   **Progress:** Linear progress bar (thin, minimal).
*   **Dynamic Content:**
    *   Text cycles through steps:
        1.  "Reading website structure..."
        2.  "Analyzing color palette..."
        3.  "Measuring market sentiment..."
        4.  "Comparing against luxury tier..."
*   **UX Note:** Duration should be exactly 4 seconds—long enough to feel real, short enough to keep attention.

### Screen 3: Brand Overview (The Mirror)
**Goal:** Verification. "This is who we think you are. Is it right?"

*   **Layout:**
    *   **Header:** "Brand Overview & Market Perception".
    *   **2-Column Grid:**
        *   *Left (Identity):* Editable text fields that look like premium typography.
        *   *Right (AI Signals):* "Why we think this."
*   **Key Sections:**
    *   **Identity Card:** Brand Name, Bio (Editable), Location, Founded Year.
    *   **Market Position:**
        *   *Category:* e.g., "Contemporary Womenswear"
        *   *Aesthetic Tags:* [Minimalist] [Structural] [Sustainable]
        *   *Price:* $$-$$$ (Visual slider)
    *   **Evidence Dropdown:** "Based on 12 market signals" (Expandable to show sources).
*   **Primary Action:**
    *   Button: "Confirm & View Audit" (Sticky bottom bar on mobile, right aligned on desktop).

### Screen 4: Brand Audit (The Critique)
**Goal:** Constructive feedback. Highlighting gaps without being discouraging.

*   **Layout:**
    *   **Top:** Big Number. The "Brand Health Score".
    *   **Body:** Vertical stack of Insight Cards.
*   **Content:**
    *   **Score Circle:** Animated SVG chart. "72/100".
    *   **Benchmarking:** "+6 vs Category Average" (Green badge).
    *   **Insight Cards (3-4):**
        *   *Icon:* (Globe/Instagram/Chart)
        *   *Title:* "Website Conversion"
        *   *Status:* "Strong" or "Needs Focus"
        *   *AI Insight:* "Your product pages lack lifestyle context compared to competitors like Toteme."
*   **Primary Action:**
    *   Button: "See Improvements" or "View Timeline".

### Screen 5: Health Timeline (The Momentum)
**Goal:** Contextualize the score. It's not a grade; it's a trajectory.

*   **Layout:**
    *   **Vertical Timeline:** A clean line connecting past, present, and future.
*   **Nodes:**
    *   *Past:* "Initial Audit" (Date: Oct 12). Score: 72.
    *   *Present:* "Current Status". Score: 78 (Trending Up).
    *   *Future (Goal):* "Projected Q4". Score: 85.
*   **UX Note:** Clicking a future node suggests actions to get there (e.g., "Launch Campaign").

### Screen 6: Brand Profile Dashboard (The Command Center)
**Goal:** The permanent home for the brand. Action-oriented and "living."

*   **Layout:**
    *   **Masonry/Grid:** Modular cards that can be rearranged (conceptually).
*   **Components:**
    1.  **Header:** Identity summary + Edit button.
    2.  **Health Snapshot (Hero):** The Score + 3 Key sub-metrics (Web, Social, Market).
    3.  **Active Insights (Alerts):** "Trending: Silk Products", "Alert: Engagement Drop".
    4.  **Collections:** Horizontal scroll of current season lines.
    5.  **Growth Opportunities:** 3 cards from the Audit (Visual Consistency, Content Health).
    6.  **Action Footer (Dark Mode):** "Book Campaign", "Find Stylist".
*   **Primary Action:**
    *   This is an exploratory screen. Main calls to action are on the "Growth Opportunity" cards.

---

## 4. UI Component Specifications

### Typography
*   **Headings:** Serif (Premium, Editorial). e.g., *Playfair Display* or Custom Serif.
*   **Body:** Sans-serif (Clean, Legible). e.g., *Inter* or *Geist*.
*   **Labels:** Uppercase, tracking-wide, small size (10-12px).

### Color Palette
*   **Background:** Off-white / Alabaster (#F7F7F5) for paper-feel.
*   **Text:** Soft Black (#1A1A1A) for readability without harsh contrast.
*   **Accents:**
    *   *Success:* Muted Emerald.
    *   *Alert:* Burnt Amber.
    *   *Brand:* Indigo/Violet (Subtle usage in UI elements).

### Card Style
*   **Border:** 1px Solid Gray (#E5E7EB).
*   **Shadow:** Low diffusion, y-offset (Editorial depth).
*   **Rounding:** 12px (Modern but soft).

---

## 5. Sample Data (JSON Structure)

```json
{
  "brand": {
    "name": "Aurelia Noir",
    "description": "A contemporary womenswear brand focused on minimalist silhouettes and responsible production.",
    "location": "Paris, France",
    "score": 82,
    "metrics": {
      "website": "High",
      "instagram": "Improving",
      "market_fit": "Strong"
    }
  },
  "audit_results": [
    {
      "category": "Visual Consistency",
      "status": "warning",
      "insight": "Align website and Instagram visuals to increase premium perception.",
      "impact": "High"
    },
    {
      "category": "Market Gap",
      "status": "opportunity",
      "insight": "Capitalize on rising demand for sustainable silk in your category.",
      "impact": "High"
    }
  ]
}
```
