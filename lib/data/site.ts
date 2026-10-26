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
    label: "SDE-2 @ Acowale",
    open: true, // shows an "open to work" dot
  },

  // One-liner used in metadata + share cards.
  tagline:
    "Full-stack developer building design systems, identity platforms and multi-tenant ERP software, from Postgres schemas and NestJS APIs to polished React interfaces.",

  // Longer About narrative (rewritten, punchier).
  about: [
    "I'm a full-stack developer who ships production software end to end: React and Next.js on the front, Node.js and NestJS services with PostgreSQL behind them.",
    "At Acowale, a multi-tenant ERP and accounting platform, I built the company-wide design system from an empty repo into a versioned npm package with 61+ components used by every app, drove the move to a centralized passkey-based SSO identity platform, and work on the double-entry accounting backend. Before that, at Qureal AI, I built Razorpay billing flows, an AI image studio and a social media scheduler.",
    "Outside work I push the same stack further: an installable AI health PWA for elderly parents and a job-automation platform with a browser extension. Lately most of my curiosity points at design systems, auth and security, and applied AI.",
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
