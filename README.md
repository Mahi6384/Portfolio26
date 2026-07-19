# Mahi Jain — Portfolio

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
| `RESEND_API_KEY` | Resend API key for the contact form. **Generate a fresh one** — never reuse an old/leaked key. |
| `CONTACT_TO_EMAIL` | Where contact messages are delivered. |
| `CONTACT_FROM_EMAIL` | Verified sender. Until a domain is verified in Resend, use `onboarding@resend.dev`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (used for OG images, sitemap, JSON-LD). |

## Content
All content lives in `lib/data/` — edit these, no component changes needed:
- `site.ts` — name, role, socials, résumé path, about copy
- `projects.ts` — case studies (add a screenshot at `public/work/<slug>/cover.png` to replace the branded placeholder)
- `experience.ts`, `skills.ts`

Swap the accent color in one place: `--accent` in `app/globals.css`.

## Deploy (Vercel, free)
1. Push to GitHub, import the repo in Vercel.
2. Add the env vars above in Project → Settings → Environment Variables.
3. Deploy.

## ⚠️ Before going live — two must-dos
1. **Rotate the Resend key.** The old portfolio committed a live `RESEND_API_KEY`; revoke it at
   https://resend.com/api-keys and use a new one here (only in `.env.local` / Vercel envs).
2. **Make the ParentCare repo public** if you want its "Source" button to work — it's currently private.

## Project structure
```
app/            routes (home, /work/[slug], /api/contact, OG images, sitemap, robots)
components/
  layout/       Nav, Footer, CommandPalette, Cursor, SmoothScroll, Theme
  sections/     Hero, About, Experience, Skills, WorkIndex, Contact
  work/         ProjectCover, LivePreview
  ui/           MagneticButton, Reveal, Marquee, Pill, Section, SectionHeading
lib/data/       site, projects, experience, skills   ·   lib/  motion, utils
public/         résumé, headshot, project covers, favicon
```
