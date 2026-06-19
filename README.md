# Process Supreme

Marketing site for Process Supreme. We build custom software that cuts operational fat out of a business.

## Repo layout

| Path | What it is |
| --- | --- |
| `website/` | The live site (Next.js 14 App Router, Tailwind, Framer Motion). All app code lives here. |
| `BRAND.md` | Source of truth for positioning, voice, and design. Read before any site work. |
| `CLAUDE.md` | Working notes and conventions for this repo. |
| `docs/` | Brand guidelines and the original website blueprint. |
| `assets/` | Logo lockups and source marks. |
| `Process-Supreme-Claude-Code-Prompt.md` | Original dispensary-era brief (superseded by `BRAND.md`). |

## Deployment

- Hosted on **Vercel** (project `process-supreme`), root directory `website/`.
- **Pushes to `main` deploy to production.** Pull requests get preview URLs.
- Production: https://process-supreme.vercel.app

## Local development

```bash
cd website
cp .env.example .env.local   # fill in RESEND_API_KEY and NEXT_PUBLIC_CALENDLY_URL
npm install
npm run dev
```
