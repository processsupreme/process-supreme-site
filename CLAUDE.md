# process-supreme-site

Marketing site for Process Supreme, a studio that builds custom software to cut operational fat out of businesses. Used by the Process Supreme team; the public site lives at https://process-supreme.vercel.app.

Always read `BRAND.md` before working on the site. It is the source of truth for positioning, voice, and design.

## Stack & local dev

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion/GSAP. Contact form emails via Resend; demo booking via a Calendly embed.

```bash
cd website
cp .env.example .env.local   # fill in RESEND_API_KEY and NEXT_PUBLIC_CALENDLY_URL
npm install
npm run dev                  # http://localhost:3000
```

## Layout

- `website/` — all app code. `src/app/` has the routes (`about`, `contact`, `engines`, `proof`, `styleguide`, plus `api/contact` for the Resend contact form); `src/components/` (animations, demos, layout, sections, ui); `src/data/`, `src/lib/`, `src/styles/`.
- `BRAND.md` — positioning/voice/design source of truth.
- `docs:/` — Brand Guidelines and original website blueprint (docx). The Brand Guidelines docx is still valid for logo usage and the color palette.
- `assets:/` — logo lockups and source marks.
- `email-signatures/` — HTML email signature drafts and previews (not part of the site build).
- `Process-Supreme-Claude-Code-Prompt.md` and the `docs:/` blueprint are the original dispensary-era brief, superseded by `BRAND.md` for positioning and copy.

Note: `docs:` and `assets:` have literal colons in their names — quote them in shell commands.

## Validating changes

No test suite. From `website/`:

```bash
npm run lint
npm run build   # must pass before pushing
```

Then manually check the affected pages with `npm run dev`.

## Non-negotiables

- Never commit `.env.local` or any secrets (Resend API key etc.). `.env*.local` is gitignored — keep it that way. This repo is public.
- Deployment: Vercel (project `process-supreme`, root directory `website/`). **Pushes to `main` deploy to production**; PRs get preview URLs. Don't push to `main` unless the change is ready to ship.
- Follow `BRAND.md` for all copy and design decisions; don't reintroduce dispensary-era positioning from the old brief.
