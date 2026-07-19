export type SkillGroup = {
  label: string;
  items: string[];
};

/** Grouped honestly — no fake percentage bars. Names map to icons in the Skills component. */
export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "C++"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML", "CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "REST APIs", "JWT Auth"],
  },
  {
    label: "Data",
    items: ["MongoDB", "PostgreSQL", "Supabase", "Redis"],
  },
  {
    label: "AI & Automation",
    items: ["Gemini", "Hugging Face", "OpenRouter", "Playwright", "BullMQ"],
  },
  {
    label: "Tooling & Cloud",
    items: ["Git", "GitHub", "Vercel", "Railway", "Firebase", "Cloudinary"],
  },
];

/** Tech names that get a marquee row in the hero / strip. */
export const marqueeTech: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Gemini",
  "Playwright",
  "Redis",
  "Framer Motion",
];
