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
    role: "Full-Stack Developer",
    period: "Feb 2025 — Present",
    current: true,
    summary:
      "Ship production features end to end across a fast-moving AI product — payments, generative tooling, and the shared UI system.",
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Razorpay"],
    highlights: [
      "Integrated Razorpay subscription & order flows — lifted payment success rate 15% and handled seamless checkout for 500+ users.",
      "Built an AI persona generator letting users tune gender, age, and appearance to drive dynamic image generation.",
      "Shipped client-side image enhancement (brightness, crop, etc.) that cut backend load 30% and shaved ~2s off per-image wait.",
      "Designed a library of 15+ reusable UI components, accelerating frontend cycles an estimated 20% and unifying the platform look.",
      "Mentored 3 engineering interns through implementation support and code reviews to hold the code-quality bar.",
    ],
  },
  {
    company: "YouEkko Communication",
    role: "Frontend Developer Intern",
    period: "Apr 2023 — Jun 2023",
    summary:
      "Built responsive, SEO-friendly marketing surfaces and the export tooling behind user-generated assets.",
    stack: ["Next.js", "Tailwind CSS"],
    highlights: [
      "Built responsive, SEO-friendly pages hitting a Lighthouse performance score of 85+.",
      "Implemented secure authentication flows and form validation wired to backend services.",
      "Added multi-format export (PDF, PNG, SVG) for user-generated assets.",
    ],
  },
];
