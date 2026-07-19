export const site = {
  name: "Mahi Jain",
  firstName: "Mahi",
  role: "Full-Stack Developer",
  location: "Bangalore, India",
  email: "mahijaincodes@gmail.com",
  phone: "+91 9303400428",
  resume: "/Mahi-Jain-Resume.pdf",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mahijain.vercel.app",

  // Current status shown in the hero pill.
  status: {
    label: "Full-Stack Developer @ Qureal AI",
    open: true, // shows an "open to work" dot
  },

  // Rotating role words in the hero.
  roles: ["Full-Stack", "AI-native", "Product", "Systems"],

  // One-liner used in metadata + share cards.
  tagline:
    "Full-stack developer shipping AI-native products — from agentic pipelines to production payment flows.",

  // Longer About narrative (rewritten, punchier).
  about: [
    "I'm a full-stack developer who likes building things that actually run in production — not demos.",
    "At Qureal AI I ship revenue-critical features end to end: payment workflows, AI generation tools, and a reusable component system used across the platform. On the side I build systems that push further — an agentic AI verification pipeline, a Chrome automation engine, resume intelligence tooling.",
    "I care about clean architecture, honest performance numbers, and interfaces that feel effortless. Lately most of my curiosity points at applied AI and the infrastructure around it.",
  ],

  socials: {
    github: "https://github.com/Mahi6384",
    linkedin: "https://www.linkedin.com/in/mahijain6384/",
    leetcode: "https://leetcode.com/u/Mahij_12",
    // x: "", // none yet
  },

  education: {
    degree: "B.Tech",
    school: "Swami Vivekanand University",
    place: "Sagar, Madhya Pradesh",
    period: "2021 – 2025",
  },
} as const;

export type Social = keyof typeof site.socials;
