# Mahi Jain · Portfolio

A bold-editorial personal portfolio built with **Next.js 15 (App Router) + TypeScript + Tailwind v4**,
Framer Motion, and Lenis smooth scroll. Dark-first with a light theme, a ⌘K command palette,
per-project case-study routes, dynamic OG images, and a working contact form.

## Stack
- **Framework:** Next.js 15 · React 19 · TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`) · self-hosted Google fonts via `next/font`
- **Motion:** Framer Motion · Lenis smooth scroll · custom cursor + magnetic buttons
- **Email:** Resend (contact form) · **Deploy:** Vercel (free hobby tier)

## Local dev
```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Environment variables (`.env.local`)
| Key | Purpose |
|-----|---------|
| `RESEND_API_KEY` | Resend API key for the contact form. **Generate a fresh one**, never reuse an old or leaked key. |
| `CONTACT_TO_EMAIL` | Where contact messages are delivered. |
| `CONTACT_FROM_EMAIL` | Verified sender. Until a domain is verified in Resend, use `onboarding@resend.dev`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (used for OG images, sitemap, JSON-LD). |

## Content
All content lives in `lib/data/`, edit these with no component changes needed:
- `site.ts`: name, role, socials, résumé path, about copy
- `projects.ts`: case studies
- `experience.ts`, `skills.ts`

Swap the accent color in one place: `--accent` in `app/globals.css`.

## Project media (real screenshots only)
Covers are **real captured screenshots**, never generated/stock art. Each project reads
`cover.src` from `projects.ts`; if it's absent, a clean branded placeholder renders instead.

To add or improve a shot, drop a file in and point `cover.src` at it:

```
public/work/<slug>/cover.webp
```

Current state:

| Project | Cover | Notes |
|---|---|---|
| ParentCare | ✅ real screenshot | Public landing page |
| JobPilot | ✅ real screenshot | Public sign-in / overview |
| InsightHire | ✅ real screenshot | Public "Your Interview Advantage" page |
| ATSync | ⬜ placeholder | Not deployed yet; add `public/work/atsync/cover.webp` |
| Marketplace | ⬜ branded | Private client build, no public link or screenshot (branded cover is intentional) |

Only the **public** pages could be captured. The logged-in dashboards (ParentCare's AI verification,
JobPilot's auto-apply queue, ATSync's scoring) are behind auth, so record those yourself
(screenshot or a short GIF/MP4), drop them in the folder above, and they'll appear.
Each live project also embeds its **real site in an iframe** on its case study, loaded eagerly.

## Deploy (Vercel, free)
1. Push to GitHub, import the repo in Vercel.
2. Add the env vars above in Project → Settings → Environment Variables.
3. Deploy.

## ⚠️ Before going live (two must-dos)
1. **Rotate the Resend key.** The old portfolio committed a live `RESEND_API_KEY`; revoke it at
   https://resend.com/api-keys and use a new one here (only in `.env.local` / Vercel envs).
2. **Make the ParentCare repo public** if you want its "Source" button to work; it's currently private.

## Project structure
```
app/            routes (home, /work/[slug], /api/contact, OG images, sitemap, robots)
components/
  layout/       Nav, Footer, CommandPalette, Cursor, SmoothScroll, Theme
  sections/     Hero, About, Experience, Skills, WorkIndex, Contact
  work/         ProjectCover, LivePreview
  ui/           MagneticButton, Reveal, Marquee, Pill, Section, SectionHeading, CodePanel
lib/data/       site, projects, experience, skills   ·   lib/  motion, utils
public/         résumé, real project screenshots, favicon
```
