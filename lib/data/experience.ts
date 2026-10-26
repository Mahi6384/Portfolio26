export type Job = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  location?: string;
  summary: string;
  stack: string[];
  highlights: string[];
};

export const experience: Job[] = [
  {
    company: "Acowale",
    role: "SDE-2",
    period: "Present",
    current: true,
    location: "Bangalore, India",
    summary:
      "Multi-tenant ERP and accounting platform. I own the design system and the identity and frontend platform, and contribute to the NestJS and PostgreSQL accounting backend.",
    stack: [
      "React 19",
      "TypeScript",
      "TanStack",
      "Storybook",
      "NestJS",
      "Fastify",
      "PostgreSQL",
      "Kysely",
      "Redis",
      "WebAuthn",
    ],
    highlights: [
      "Built the design system (@acowale/ads) from an empty repo into a typed, versioned npm package published through CI on GitHub Packages, with 61+ components and 140+ Storybook stories used by every Acowale app.",
      "Designed a runtime theming engine with 7 independent axes (style, mode, base color, 17 brand hues, 17 chart palettes, radius, 26 fonts) using CSS cascade layers and root attributes, with zero theme-specific code in components.",
      "Architected a data-grid engine on TanStack Table and TanStack Virtual, designed for 10,000+ rows: one headless core powers 16 ERP tables with spreadsheet-style keyboard editing, range selection and Excel-style copy.",
      "Drove the move to a centralized SSO identity model (Acowale Passport, OAuth-style code exchange) and built the auth app: email-OTP signup, password and passkey (WebAuthn) login, device management and recovery.",
      "Designed httpOnly cookie sessions with a single-flight token refresh shared across concurrent requests, and hardened every auth path against open redirects and account enumeration.",
      "Set up the frontend architecture (React 19, TanStack Router and Query, Zustand) with 280 tests in Vitest, RTL and MSW.",
      "Worked on a multi-tenant accounting backend (229 endpoints, 70 tables): double-entry balance enforced by a deferred Postgres constraint trigger, an ltree chart of accounts with per-tenant overrides, and row locks on payments.",
      "Worked on RBAC with per-user overrides cached in Redis, multi-device sessions with revocation and request-scoped settings via AsyncLocalStorage; audited the API and reported prioritized fixes (open routes, SQL injection, an unverified webhook, unenforced RBAC).",
    ],
  },
  {
    company: "Qureal AI",
    role: "Full Stack Developer",
    period: "Feb 2025 to Jul 2025",
    summary:
      "Shipped production web apps end to end on a fast-moving AI content and marketing product: billing and payments, generative AI tooling and the shared React component system.",
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "Razorpay",
    ],
    highlights: [
      "Built the complete Billing and Subscription flow end to end (plan comparison, upgrade, downgrade, pause and cancel, real-time coupon validation, pricing preview) on Razorpay, including webhook handlers for async payment events.",
      "Built the AI Image Studio (multi-attribute configurator with real-time AI image generation across two modes) and a multi-channel Social Media Scheduler with a draft, approve and publish workflow and AI captions.",
      "Moved image editing (crop, rotate, brightness, contrast, resize) to the client, cutting backend load by 30% and saving 2s per image.",
      "Built 15+ reusable React components that cut UI development time by 20%, plus production REST APIs in Node.js, Express and JWT.",
    ],
  },
  {
    company: "YouEkko Communication",
    role: "Frontend Developer Intern",
    period: "Apr 2023 to Jun 2023",
    summary:
      "Built responsive, SEO-optimized marketing pages and reusable UI components with secure auth and form validation.",
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    highlights: [
      "Built 10+ reusable UI components and responsive, SEO-optimized pages with Next.js and Tailwind CSS, reaching a Lighthouse score of 85+.",
      "Implemented secure authentication flows and form validation, and added PDF, PNG and SVG export for user-generated assets.",
    ],
  },
];
