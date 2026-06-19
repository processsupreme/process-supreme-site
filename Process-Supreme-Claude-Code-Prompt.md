# Process Supreme Website Build Prompt

> **SUPERSEDED (June 2026):** This document describes the original dispensary-only positioning and was used to build v1 of the site. Positioning, voice, and copy are now governed by `BRAND.md` at the repo root. Where this file conflicts with BRAND.md, BRAND.md wins. The tech stack and design system described here remain accurate to the built site.

## Overview

Build a complete marketing website for **Process Supreme**, a cannabis operations automation company. The site should feel premium, modern, and credible — like Ramp or Linear, but for cannabis operators.

**Read the following files before starting:**
- `docs/Process-Supreme-Website-Blueprint-v2.docx` — Full site structure, copy, and engine details
- `docs/Process-Supreme-Brand-Guidelines.docx` — Brand system and usage rules
- `assets/logos/` — Logo package with all variants

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** 
  - Playfair Display (headings) — Google Fonts
  - DM Sans (body) — Google Fonts
  - JetBrains Mono (code/data) — Google Fonts
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

---

## Brand System

### Colors

```css
:root {
  --wine: #722F37;        /* Primary — headlines, CTAs, accents */
  --bone: #E3DAC9;        /* Secondary — cards, highlights, hover states */
  --black: #0A0A0A;       /* Background (dark mode default) */
  --warm-grey: #A89F91;   /* Secondary text, borders */
  --grey: #4A4A4A;        /* Body text on light backgrounds */
  --white: #FFFFFF;       /* Text on dark backgrounds */
}
```

### Typography Scale

```css
/* Headings - Playfair Display */
.hero-headline { font-size: 80px; line-height: 1.1; font-weight: 700; }
.section-headline { font-size: 48px; line-height: 1.2; font-weight: 600; }
.card-headline { font-size: 24px; line-height: 1.3; font-weight: 600; }

/* Body - DM Sans */
.body-large { font-size: 20px; line-height: 1.6; }
.body { font-size: 16px; line-height: 1.6; }
.body-small { font-size: 14px; line-height: 1.5; }

/* Data/Code - JetBrains Mono */
.data { font-size: 14px; font-family: 'JetBrains Mono'; }
```

### Buttons

```jsx
// Primary Button
<button className="bg-wine text-white px-6 py-3 rounded-lg font-medium hover:bg-wine/90 transition-all">
  Book a Demo
</button>

// Secondary Button
<button className="border border-wine text-wine px-6 py-3 rounded-lg font-medium hover:bg-wine hover:text-white transition-all">
  Learn More
</button>

// Ghost Button
<button className="text-bone underline-offset-4 hover:underline transition-all">
  See Our Engines →
</button>
```

### Layout

- Max content width: 1200px
- Section padding: 80px (mobile) / 120px (desktop) vertical
- Card border radius: 12px
- Button border radius: 8px
- Grid: 12-column, 24px gutter
- Default mode: **Dark** (black background)

---

## Design Inspiration

Pull design patterns from these references:

### Ramp (ramp.com)
- Clean stat callouts with large numbers
- Minimal navigation
- Trust badges / logo bars
- Dark mode execution

### Linear (linear.app)
- Subtle gradient backgrounds
- Beautiful micro-animations
- Product screenshots with glow effects
- Keyboard shortcut hints as design elements

### Morningside AI (morningside.ai)
- Service card grids (bento box layout)
- "How it works" numbered steps
- Testimonial integration
- Clear CTA hierarchy

### Vercel (vercel.com)
- Terminal/code aesthetics
- Animated gradients
- "Deploy" button prominence
- Developer credibility signals

---

## Site Structure

### Pages to Build

```
/                       → Homepage
/engines                → Engines hub (all 7)
/engines/brand-analytics
/engines/daily-operations
/engines/business-intelligence
/engines/labor-optimization
/engines/hr-automation
/engines/bonus-calculator
/engines/ccb-reporting
/about                  → Our story
/results                → Case studies / metrics
/contact                → Contact form + Calendly embed
```

---

## Homepage Sections

### 1. Hero
- **Headline:** "Systems That Help Run Your Cannabis Operation"
- **Subheadline:** "Built by operators. Proven across multiple dispensaries."
- **Visual:** Animated dashboard mockup (abstract, stylized — use CSS/SVG, not real screenshots)
- **CTAs:** "See Our Engines" (primary), "Book a Demo" (ghost)
- **Animation:** Staggered fade-in, subtle floating elements

### 2. Problem Statement (Stat Callout)
- **Large stat:** "27%" with label "of cannabis operators were profitable in 2024"
- **Context:** "Down from 42% in 2022. The industry is in crisis."
- **Copy:** "Your systems weren't built by operators..."
- **Design:** Full-width dark section, stat in Wine color, large typography

### 3. Featured Engines (Bento Grid)
- 2x2 grid on desktop, stack on mobile
- Cards with:
  - Icon (Lucide)
  - Headline
  - One-line description
  - Subtle hover animation (scale 1.02, shadow)
- Featured engines:
  1. Brand Analytics — "See which brands actually make you money"
  2. Daily Ops Report — "Leadership informed by 7am"
  3. Business Intelligence — "5 reports, one command"
  4. Labor Optimization — "Staff smarter, spend less"
- Link to /engines for full list

### 4. Origin Story
- **Headline:** "We didn't start as a software company. We started as cannabis operators."
- **Copy:** "15+ years in the industry. Multiple dispensary locations. Tens of millions in revenue managed..."
- **Visual:** Abstract geometric design, data visualization elements, NO photos
- **CTA:** "Learn More About Us" → /about

### 5. Trust Signals
- Stats bar: "Multiple stores | Hundreds of employees | Tens of millions managed | 0 compliance violations"
- Integration logos: Flowhub, Deputy, ADP, Google Sheets (use placeholder boxes if no logos available)

### 6. Final CTA
- **Headline:** "Ready to stop fighting your systems?"
- **Single CTA:** "Book a Demo" (centered, Wine button)
- **Background:** Subtle gradient or pattern

---

## Engine Page Template

Each engine page (`/engines/[slug]`) should follow this structure:

1. **Hero**
   - Engine name + "FOR: [User Type]" badge
   - Headline (from blueprint)
   - Brief description

2. **The Problem**
   - What pain point does this solve?
   - Use the copy from the blueprint

3. **How It Works**
   - Numbered steps or bullet features
   - Consider animated diagram or flowchart

4. **What We Saw (Results)**
   - Metrics and outcomes
   - Use stat callouts similar to homepage

5. **CTA**
   - "See It In Action" or "Book a Demo"

---

## Animations (Framer Motion)

```jsx
// Fade up on scroll
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Staggered children
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Card hover
const cardHover = {
  whileHover: { scale: 1.02, boxShadow: "0 10px 40px rgba(114, 47, 55, 0.2)" }
};
```

- Use `prefers-reduced-motion` media query to disable for accessibility
- Keep animations subtle — this is a B2B site, not a portfolio

---

## Components to Build

```
components/
├── layout/
│   ├── Header.tsx        # Sticky nav, logo, CTA
│   ├── Footer.tsx        # Links, social, copyright
│   └── Container.tsx     # Max-width wrapper
├── ui/
│   ├── Button.tsx        # Primary, Secondary, Ghost variants
│   ├── Card.tsx          # Engine cards, feature cards
│   ├── StatCallout.tsx   # Large number + label
│   ├── Badge.tsx         # "FOR: Purchasing" labels
│   └── SectionHeading.tsx
├── sections/
│   ├── Hero.tsx
│   ├── ProblemStatement.tsx
│   ├── EngineGrid.tsx    # Bento box
│   ├── OriginStory.tsx
│   ├── TrustSignals.tsx
│   └── FinalCTA.tsx
└── engines/
    └── EnginePageTemplate.tsx
```

---

## Content Data

Create a `data/engines.ts` file with all engine information from the blueprint:

```typescript
export const engines = [
  {
    slug: "brand-analytics",
    name: "Brand Analytics",
    userType: "Purchasing Managers",
    headline: "Your POS shows sales. Ours shows which brands are actually making you money.",
    description: "Product-level margin analysis by category...",
    features: [...],
    results: [...],
    featured: true
  },
  // ... all 7 engines
];
```

---

## Responsive Breakpoints

```css
/* Mobile first */
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktops */
```

- Hero headline: 48px mobile → 80px desktop
- Section padding: 60px mobile → 120px desktop
- Bento grid: 1 col mobile → 2 col desktop
- Navigation: Hamburger mobile → Full nav desktop

---

## SEO Requirements

- Semantic HTML (proper heading hierarchy)
- Meta titles and descriptions for each page
- Open Graph images (1200x630)
- Structured data for organization
- Sitemap.xml
- robots.txt

---

## Files to Reference

Before writing any code, read these files in full:

1. **Blueprint:** `docs/Process-Supreme-Website-Blueprint-v2.docx`
   - Contains all copy, engine details, and page structure
   
2. **Brand Guidelines:** `docs/Process-Supreme-Brand-Guidelines.docx`
   - Logo usage rules, color specifications, typography details

3. **Logos:** `assets/logos/`
   - Use the appropriate logo variant for dark/light contexts
   - Primary logo for header
   - Logomark for favicon

---

## Deliverables

1. Complete Next.js project with all pages
2. Fully responsive (mobile-first)
3. Dark mode as default
4. All animations implemented
5. Ready to deploy to Vercel
6. README with setup instructions

---

## Example Prompt to Start

Once you have the folder structure ready, open Claude Code and run:

```
claude

> Read all files in the docs/ folder and assets/ folder. Then build a complete Next.js marketing website for Process Supreme following the specifications in PROMPT.md. Start with the project setup and core components, then build out each page. Use the exact copy from the blueprint document.
```

---

## Notes

- **No placeholder "Lorem ipsum"** — all copy comes from the blueprint
- **No stock photos** — use abstract designs, gradients, SVG illustrations
- **Performance matters** — lazy load below-fold content, optimize images
- **Accessibility** — proper contrast ratios, keyboard navigation, screen reader support

---

*Generated by Claude for Process Supreme LLC*
*January 2026*
