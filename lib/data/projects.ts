export type Metric = { value: string; label: string };
export type Highlight = { title: string; body: string };
export type Cover = {
  /** Optional real screenshot placed under /public/work/<slug>/. If absent, a branded cover renders. */
  src?: string;
  alt: string;
  frame: "browser" | "phone";
  /** URL shown in the faux browser chrome. */
  chrome?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string; // short punch line for the work index
  blurb: string; // one sentence, what it is
  year: string;
  role: string;
  status: "Live" | "Private beta" | "In development";
  featured: boolean; // Tier-1 flagship
  liveUrl?: string;
  repoUrl?: string;
  linkedinUrl?: string;
  stack: string[];
  problem: string;
  approach: string;
  highlights: Highlight[];
  features: string[];
  metrics: Metric[];
  cover: Cover;
};

export const projects: Project[] = [
  {
    slug: "parentcare",
    name: "ParentCare",
    tagline: "Kids assign tasks. Parents complete them. AI verifies the proof.",
    blurb:
      "A health-accountability app for families living apart, with an agentic AI that verifies photo proof of care.",
    year: "2026",
    role: "Solo — full-stack, architecture & AI",
    status: "Live",
    featured: true,
    liveUrl: "https://parent-care-nine.vercel.app/",
    repoUrl: "https://github.com/Mahi6384/ParentCare",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase / Postgres",
      "Gemini",
      "BullMQ + Redis",
      "Express",
      "PWA",
    ],
    problem:
      "Adult children move to cities and abroad while their parents age at home. A checkbox 'I took my medicine' is too easy to fake — so nobody trusts it, and nobody actually follows through.",
    approach:
      "Turn care into verifiable proof. Kids create recurring health tasks; parents snap a photo (a plate of food, a medicine strip); an AI agent named Saathi verifies it with vision and streams a plain-language verdict — passed, flagged, or failed — back to the kid's dashboard in real time, with streaks, badges, and a weekly report.",
    highlights: [
      {
        title: "Async AI verification pipeline",
        body: "Photo submissions persist and return 201 instantly, then fire-and-forget to a worker. A 10–30s Gemini vision loop runs off the request path — modeled as an explicit task state machine (pending → submitted → passed/flagged/failed) so serverless timeouts never hold an LLM open and elderly users never watch a spinner.",
      },
      {
        title: "Agentic loop with 16 tools",
        body: "The verification agent runs a real Gemini tool-use loop — read tools (history, nutrition trend, health profile) and action tools (update result, flag concern, alert kid, generate meal plan / exercise routine, read medication label). Four distinct agent loops, every run audit-logged, with a safety net that force-flags if the model never returns a verdict.",
      },
      {
        title: "Queue with a zero-infra fallback",
        body: "Runs on BullMQ + Upstash Redis (retries, backoff, persistence) in production, and inline in-process when Redis isn't configured — identical HTTP contract both ways, so a fresh clone runs with no infrastructure.",
      },
      {
        title: "Security enforced in the database",
        body: "Row-Level Security on 20 of 25 Postgres tables with per-role policies, Storage RLS scoped to a photos/<parentId>/ path prefix, and a SECURITY DEFINER trigger that mirrors every auth signup into the app schema atomically.",
      },
    ],
    features: [
      "AI photo verification with per-submission reasoning + confidence",
      "Conversational health-profile onboarding",
      "AI weekly meal plans tuned to conditions & regional cuisine",
      "AI exercise routines with per-step modifications",
      "Streaks, badges, and a weekly 'streak freeze'",
      "Web-push + realtime toasts + emailed weekly reports",
      "Installable PWA with offline caching",
      "Hindi / English / Hinglish language toggle",
    ],
    metrics: [
      { value: "25", label: "Postgres tables" },
      { value: "16", label: "agent tools" },
      { value: "4", label: "backend services" },
      { value: "3", label: "notification channels" },
    ],
    cover: {
      alt: "ParentCare — parent submits photo proof, AI verifies it for the kid",
      frame: "phone",
      chrome: "parent-care-nine.vercel.app",
    },
  },

  {
    slug: "jobpilot",
    name: "JobPilot",
    tagline: "One-click auto-apply across LinkedIn, Naukri, Workday & more.",
    blurb:
      "A Manifest V3 Chrome extension + dashboard that auto-fills and submits job applications from your resume data.",
    year: "2025",
    role: "Solo — extension, backend & automation",
    status: "Live",
    featured: true,
    liveUrl: "https://jobpilot-wheat.vercel.app/",
    repoUrl: "https://github.com/Mahi6384/JobPilot",
    linkedinUrl:
      "https://www.linkedin.com/posts/mahijain6384_fullstackdevelopment-reactjs-nodejs-ugcPost-7453365213472661506-YRcb",
    stack: [
      "Chrome MV3",
      "React 19",
      "Vite",
      "Express 5",
      "MongoDB",
      "Playwright",
      "node-cron",
      "OpenRouter",
    ],
    problem:
      "Applying to jobs is soul-crushing repetition: the same resume fields, typed into a hundred slightly-different forms across LinkedIn, Naukri, Workday, Greenhouse and Lever.",
    approach:
      "Queue jobs from a dashboard; a Manifest V3 service worker picks them up, opens each in a background tab, injects platform-aware content scripts, maps the form to your resume data, and submits — while the server harvests fresh listings on a schedule.",
    highlights: [
      {
        title: "Panel Automation Kernel",
        body: "A shared automation core that does deep Shadow-DOM traversal (deepQuerySelectorAll), heuristic apply-surface scoring, and MutationObserver-based stability gating — so it waits for the real form to settle instead of racing it.",
      },
      {
        title: "React-safe form filling",
        body: "Fields are matched to resume data by regex maps, then set with native value setters + synthetic React events so controlled inputs actually register the change. LinkedIn Easy Apply is driven through its Shadow-DOM modal stepper; Naukri falls back to a contenteditable chatbot flow.",
      },
      {
        title: "Scheduled scraping with Playwright",
        body: "A server-side Playwright (chromium) service harvests LinkedIn + Naukri listings on a node-cron schedule and via a GitHub Actions workflow, persisting sessions so the queue always has fresh jobs.",
      },
      {
        title: "AI-answered screening questions",
        body: "Free-text screening questions are answered through OpenRouter (OpenAI-compatible) using the candidate's profile as context, with a graceful fallback.",
      },
    ],
    features: [
      "MV3 service-worker job queue (polls every ~15s)",
      "One-click apply from the dashboard",
      "LinkedIn, Naukri, Workday, Greenhouse & Lever support",
      "Google OAuth sign-in",
      "Resume parsing (pdf-parse) → structured profile",
      "Downloadable packaged extension build",
    ],
    metrics: [
      { value: "5+", label: "job platforms" },
      { value: "MV3", label: "Chrome extension" },
      { value: "15s", label: "queue poll" },
      { value: "3.0", label: "extension version" },
    ],
    cover: {
      src: "/work/jobpilot/cover.png",
      alt: "JobPilot dashboard — queued job applications",
      frame: "browser",
      chrome: "jobpilot-wheat.vercel.app",
    },
  },

  {
    slug: "atsync",
    name: "ATSync",
    tagline: "Beat the resume robots — instant ATS scoring & keyword gaps.",
    blurb:
      "An AI resume analyzer that scores your resume against a job description and tells you exactly what to fix.",
    year: "2025",
    role: "Solo — full-stack & AI",
    status: "In development",
    featured: false,
    repoUrl: "https://github.com/Mahi6384/ATSync",
    stack: [
      "Next.js 15",
      "TypeScript",
      "MongoDB Atlas",
      "Hugging Face",
      "Mistral-7B",
      "Recharts",
    ],
    problem:
      "Most resumes are rejected by an ATS before a human ever reads them — and candidates have no visibility into why.",
    approach:
      "Upload a resume, paste a job description, and get an instant 0–100 ATS score with a visual gauge, the exact missing keywords, and 5–7 concrete rewrite suggestions — then track your score as you iterate.",
    highlights: [
      {
        title: "Model with a rule-based fallback",
        body: "Analysis runs on Hugging Face's Mistral-7B, but a built-in rule-based scorer keeps the app fully functional even with no API key — the feature never hard-fails.",
      },
      {
        title: "Score history that shows progress",
        body: "Every analysis is persisted per user and charted over time with Recharts, so iterating on a resume becomes a measurable feedback loop instead of guesswork.",
      },
      {
        title: "Auth & route protection done right",
        body: "bcrypt-hashed passwords, JWT in HttpOnly cookies, and Next.js middleware protecting every dashboard / analyze / report route, with Zod validating API inputs server-side.",
      },
    ],
    features: [
      "0–100 ATS score with a visual gauge",
      "Color-coded keyword-gap analysis",
      "5–7 actionable AI rewrite suggestions",
      "Automatic skills extraction",
      "AI-generated tailored summary",
      "Score history analytics + PDF export",
    ],
    metrics: [
      { value: "0–100", label: "ATS score" },
      { value: "JWT", label: "secure auth" },
      { value: "2", label: "AI models + fallback" },
      { value: "PDF", label: "report export" },
    ],
    cover: {
      alt: "ATSync — ATS score gauge and keyword-gap analysis",
      frame: "browser",
      chrome: "atsync.app",
    },
  },

  {
    slug: "insighthire",
    name: "InsightHire",
    tagline: "Real interview experiences, structured and searchable.",
    blurb:
      "A community platform where candidates share company-wise interview rounds, questions, tips and media.",
    year: "2025",
    role: "Solo — full-stack",
    status: "Live",
    featured: false,
    liveUrl: "https://insight-hire-ten.vercel.app/",
    repoUrl: "https://github.com/Mahi6384/InsightHire",
    stack: [
      "React",
      "Tailwind CSS",
      "DaisyUI",
      "Express",
      "MongoDB",
      "Cloudinary",
      "Google Auth",
    ],
    problem:
      "Interview prep is full of generic question dumps but starved of real, structured accounts of what a specific company actually asks.",
    approach:
      "Let candidates publish structured experiences — rounds, questions, prep notes, tips, outcome — with optional image/video, then make the whole thing searchable and improvable through community feedback.",
    highlights: [
      {
        title: "Structured, not a text blob",
        body: "Experiences are modeled as rounds → questions → notes → tips → outcome, so the feed is filterable by company, role, and experience level instead of being an unsearchable wall of text.",
      },
      {
        title: "Media pipeline via Cloudinary",
        body: "Optional images and video are uploaded through Multer and stored in Cloudinary under a namespaced folder, keeping large media off the app server.",
      },
      {
        title: "Two ways to sign in",
        body: "Email/password with bcrypt plus Google ID-token verification via google-auth-library — one account, two front doors.",
      },
    ],
    features: [
      "Structured rounds / questions / tips / outcome",
      "Optional image + video uploads",
      "Community helpful / not-helpful + discussion",
      "Searchable feed by company, role, level",
      "Email + Google sign-in",
      "Light / dark theme",
    ],
    metrics: [
      { value: "5", label: "structured fields" },
      { value: "2", label: "auth methods" },
      { value: "img+vid", label: "media uploads" },
      { value: "Live", label: "in production" },
    ],
    cover: {
      src: "/work/insighthire/cover.png",
      alt: "InsightHire — searchable feed of interview experiences",
      frame: "browser",
      chrome: "insight-hire-ten.vercel.app",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
