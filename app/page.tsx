import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/ui/Marquee";
import { HashScroll } from "@/components/layout/HashScroll";
import { marqueeTech } from "@/lib/data/skills";
import { site } from "@/lib/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.leetcode],
  alumniOf: site.education.school,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HashScroll />
      <Hero />
      <div className="border-y border-line py-6">
        <Marquee items={marqueeTech} />
      </div>
      <About />
      <Experience />
      <Skills />
      <WorkIndex />
      <Contact />
    </>
  );
}
