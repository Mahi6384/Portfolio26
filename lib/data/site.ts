export const site = {
  name: "Mahi Jain",
  firstName: "Mahi",
  role: "Full-Stack Developer",
  location: "Bangalore, India",
  email: "mahijaincodes@gmail.com",
  resume: "/Mahi-Jain-Resume.pdf",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mahijain.vercel.app",

  // Current status shown in the hero pill.
  status: {
    label: "Full-Stack Developer @ Qureal AI",
    open: true, // shows an "open to work" dot
  },

  // One-liner used in metadata + share cards.
  tagline:
    "Full-stack developer building production AI-native web apps end to end, from database schema and REST APIs to pixel-perfect React interfaces.",

  // Longer About narrative (rewritten, punchier).
  about: [
    "I'm a full-stack developer who ships production web apps end to end: React and Next.js on the front, Node and Express REST APIs and real data models behind them.",
    "At Qureal AI I build revenue-critical features on a fast-moving AI product: Razorpay billing and subscription flows, an AI image studio, production APIs, and a reusable component system the whole platform builds on. I work from Figma hi-fi designs to pixel-perfect, accessible UI, and I model the PostgreSQL and MongoDB data behind it.",
    "Outside work I push the same stack further: an agentic AI health platform on Gemini Vision, a Chrome automation engine for job applications, and a freelance commerce build. Strong CS fundamentals in C++ and DSA keep the architecture honest, and lately most of my curiosity points at applied AI and the systems around it.",
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
    period: "2021 to 2025",
  },
} as const;

export type Social = keyof typeof site.socials;
