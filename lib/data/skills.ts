export type SkillGroup = {
  label: string;
  items: string[];
};

/** Grouped honestly, no fake percentage bars. Mirrors the resume's skill sections. */
export const skills: SkillGroup[] = [
  {
    label: "Core",
    items: ["C++", "SQL", "Data Structures & Algorithms", "DBMS", "OOP", "OS", "Design Principles"],
  },
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "Radix UI / ShadCN",
      "Accessibility",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Schema Design",
      "JWT Auth",
      "Webhooks",
      "Microservices",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    label: "Testing & Quality",
    items: ["Unit Testing", "Code Reviews", "API Validation"],
  },
  {
    label: "AI & Automation",
    items: ["LLM APIs (OpenRouter, Gemini Vision)", "Prompt Engineering", "MCP", "Playwright"],
  },
  {
    label: "Practices",
    items: ["Agile / Scrum", "CI/CD", "Git", "GitHub Actions", "Vercel", "Railway", "Cursor / Claude Code"],
  },
];

/** Tech names that get a marquee row in the hero / strip. */
export const marqueeTech: string[] = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Tailwind CSS",
  "Redux Toolkit",
  "Razorpay",
  "Gemini Vision",
  "OpenRouter",
  "Playwright",
  "JWT Auth",
  "MCP",
];
