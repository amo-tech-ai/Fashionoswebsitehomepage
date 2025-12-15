# Homepage Hero Section Design Spec
**Component:** `HeroSection`  
**Route:** `/` (Homepage)  
**Style:** Luxury Utility / Editorial Minimalist

## 1. Overview
The FashionOS Hero section is the digital "front door" of the platform. It must instantly communicate authority, style, and utility. The design follows an editorial layout similar to a high-end fashion magazine spread, utilizing whitespace, serif typography, and a layered image composition to create depth.

## 2. Layout Structure & Grid
The section uses a **2-Column Asymmetric Grid** (approx 40% Text / 60% Visuals on desktop).

### Desktop (lg+)
*   **Container:** `max-w-7xl mx-auto px-6`
*   **Vertical Padding:** `py-20` or `py-32` (Generous whitespace).
*   **Alignment:** Vertically centered content.

### Mobile (xs-md)
*   **Stack:** Text on top, Visuals below (or visuals hidden/simplified).
*   **Spacing:** Reduced padding `py-12`.

## 3. Visual Composition (The "Collage" Effect)
Based on the reference design, the visual side is not a single static image but a **layered composition of 3 distinct visual elements** that represent the breadth of services (Studio, Lifestyle, Editorial).

1.  **Layer 1 (Background - Anchor):**
    *   *Type:* Black & White Portrait.
    *   *Position:* Behind the main image, offset to the left.
    *   *Styling:* Low saturation, soft contrast. Acts as texture.
2.  **Layer 2 (Main - Focus):**
    *   *Type:* High-Impact Color Editorial (e.g., Teal backdrop, bold fashion).
    *   *Position:* Dominant right-side block.
    *   *Styling:* Sharp, vibrant colors.
3.  **Layer 3 (Foreground - Detail):**
    *   *Type:* Lifestyle/Outdoor shot (e.g., Floral dress, beach).
    *   *Position:* Overlapping the bottom-left corner of the main image.
    *   *Styling:* **Thick White Border** (4-8px) to separate it from layers behind. Adds a physical "photo print" feel.

## 4. Typography & Content Strategy

### Headlines
*   **Pre-Header:** `FASHIONOS STUDIO`
    *   *Style:* Uppercase, `text-xs` or `text-sm`, `tracking-[0.2em]`, `text-gray-500`, `font-sans`.
*   **Main Headline:** "Exceptional fashion imagery. **Every time.**"
    *   *Font:* `Playfair Display` (Serif).
    *   *Size:* `text-5xl` to `text-7xl`.
    *   *Styling:* Black ink. The "Every time." segment uses a **Pink/Purple Gradient** text effect to draw the eye.
*   **Subheadline:** "Runway, campaigns, ecommerce, and editorial — we help fashion brands look as premium as they feel."
    *   *Font:* `Inter` (Sans-serif).
    *   *Size:* `text-lg` or `text-xl`.
    *   *Color:* `text-gray-600`.
    *   *Leading:* Relaxed (`leading-relaxed`).

### Call to Action (CTA) Group
Two buttons side-by-side to cater to different user intents:
1.  **Primary:** "BOOK A DISCOVERY CALL"
    *   *Style:* Solid Black Background, White Text. Sharp corners or slight radius (`rounded-sm`).
    *   *Hover:* Scale or slight lighten.
2.  **Secondary:** "EXPLORE DIRECTORY"
    *   *Style:* Transparent Background, 1px Border (Gray-300), Dark Text.
    *   *Hover:* Border darken, Text darken.

### Trust Indicators (The List)
A small, bulleted list below the CTAs reinforces capabilities:
*   Runway & backstage coverage
*   Ecommerce & lookbooks
*   Campaigns, video & social content
*   *Style:* Small sans-serif, bullet points, gray text.

## 5. Implementation Prompt
*Use this prompt to generate the code for this section:*

> "Create a luxury fashion landing page hero section using React, Tailwind CSS, and Framer Motion. 
>
> **Layout:** Use a split 2-column layout (Text Left, Images Right).
> **Typography:** Use 'Playfair Display' for the H1 headline ('Exceptional fashion imagery. Every time.') and 'Inter' for body text. The words 'Every time.' should have a pink-to-purple gradient text clip.
> **Content:** Include a small uppercase kicker 'FASHIONOS STUDIO', a descriptive subheadline, two buttons ('Book a Discovery Call' - solid black, 'Explore Directory' - outline), and a bulleted list of 3 services below.
> **Imagery:** Create a 'collage' effect on the right side using 3 overlapping images:
> 1. A grayscale portrait in the background (offset left).
> 2. A large, vibrant fashion editorial shot (teal background) as the main anchor.
> 3. A smaller lifestyle shot (floral dress) positioned in the bottom-left foreground with a thick white border and shadow to make it pop.
> **Motion:** Add subtle entrance animations. Stagger the text elements. The images should float slightly or slide in.
> **Navigation:** Include a minimal top navbar with logo (left), links (center), and 'Log In' / 'Sign Up' / 'Book a Shoot' buttons (right)."

## 6. Asset References
*   **Teal Editorial:** `figma:asset/c712ee1283e470baf5b796efaa5ef5df4b3a148b.png` (or similar vibrant)
*   **B&W Portrait:** (Unsplash placeholder: High fashion studio portrait)
*   **Lifestyle:** (Unsplash placeholder: Outdoor natural light fashion)
