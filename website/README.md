# Process Supreme Marketing Website

A production-quality Next.js marketing website for Process Supreme. We build custom software that cuts operational fat out of a business.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Playfair Display, DM Sans, JetBrains Mono (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── engines/           # Engines hub and dynamic engine pages
│   │   └── [slug]/        # Individual engine pages
│   ├── results/           # Results/metrics page
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/
│   ├── icons/             # Logo and icon components
│   ├── layout/            # Header, Footer, Container
│   ├── sections/          # Page sections (Hero, EngineGrid, etc.)
│   └── ui/                # Reusable UI components
├── data/
│   └── engines.ts         # Engine data and types
└── lib/
    └── utils.ts           # Utility functions
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, problem statement, featured engines, origin story, trust signals, CTA |
| `/engines` | All 7 engines overview |
| `/engines/[slug]` | Individual engine pages (brand-analytics, daily-operations, etc.) |
| `/about` | Company story and values |
| `/results` | Consolidated metrics and outcomes |
| `/contact` | Contact form and Calendly placeholder |

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Wine | `#722F37` | Primary accent, CTAs, headlines |
| Bone | `#E3DAC9` | Primary text on dark backgrounds |
| Black | `#0A0A0A` | Background (dark mode default) |
| Warm Grey | `#A89F91` | Secondary text, borders |
| Grey | `#4A4A4A` | Body text on light backgrounds |

### Typography

- **Display (Headlines):** Playfair Display
- **Body:** DM Sans
- **Monospace/Code:** JetBrains Mono

## Deployment

This project is configured for Vercel deployment:

```bash
# Deploy to Vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## TODO Items

- [ ] Add actual Calendly URL for demo booking
- [ ] Implement form submission backend (currently stubbed)
- [ ] Add Open Graph images (1200x630)
- [ ] Add analytics integration (Plausible/PostHog)
- [ ] Connect to processsupreme.com domain

## License

Copyright 2026 Process Supreme LLC. All rights reserved.
