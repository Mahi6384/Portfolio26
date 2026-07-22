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
    company: "Qureal AI",
    role: "Full Stack Developer",
    period: "Feb 2025 to Present",
    current: true,
    summary:
      "Ship production web apps end to end on a fast-moving AI product: billing and payments, generative AI tooling, production REST APIs, and the shared React component system the platform builds on.",
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Razorpay",
      "MCP",
    ],
    highlights: [
      "Built the Billing and Subscription UI end to end from Figma hi-fi designs: plan comparison, upgrade, downgrade, pause and cancel flows, realtime coupon validation and a pricing-preview modal, wired to Razorpay checkout and backend webhook handlers for async payment events.",
      "Designed and built the AI Image Studio, a multi-attribute generation configurator (aspect ratio, gender, age, skin tone) with live loading states, plus a multi-panel social scheduler with a draft, approve and publish workflow.",
      "Developed production REST APIs in Node.js, Express and TypeScript with JWT authentication and authorization, request validation and centralized error handling, modeling data across PostgreSQL and MongoDB.",
      "Set up MCP server integrations linking internal docs and databases to AI dev tools like Cursor and Claude Code for context-aware debugging, accelerating delivery across the team.",
      "Wrote unit tests across component behavior and API edge cases, reviewed PRs and mentored 2 interns through structured code reviews in an Agile and Scrum cycle.",
      "Built a library of 15+ reusable React components on Radix and ShadCN primitives that cut UI development time by 20%, plus client-side image editing tools that reduced backend load by 30%.",
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
