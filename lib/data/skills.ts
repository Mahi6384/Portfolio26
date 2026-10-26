export type SkillGroup = {
  label: string;
  items: string[];
};

/** Grouped honestly, no fake percentage bars. Mirrors the resume's skill sections. */
export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "React 19",
      "Next.js",
      "TypeScript",
      "Tailwind CSS v4",
      "TanStack (Table, Query, Router)",
      "Zustand",
      "Zod",
      "shadcn/ui",
      "Storybook",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Fastify",
      "REST",
      "JWT",
      "PostgreSQL",
      "Kysely",
      "Redis",
      "Supabase",
    ],
  },
  {
    label: "Testing & Platform",
    items: ["Vitest", "RTL", "MSW", "Playwright", "WebAuthn", "Web Push", "Service Workers", "PWA", "i18n"],
  },
  {
    label: "AI & Tools",
    items: [
      "LLM integration",
      "MCP",
      "Prompt engineering",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Vercel",
      "Firebase",
      "Postman",
    ],
  },
];

/** Tech names that get a marquee row in the hero / strip. */
export const marqueeTech: string[] = [
  "TypeScript",
  "React 19",
  "Next.js",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Supabase",
  "Tailwind CSS",
  "TanStack",
  "Storybook",
  "WebAuthn",
  "Razorpay",
  "Gemini Vision",
  "OpenRouter",
  "Playwright",
  "JWT Auth",
  "MCP",
];
