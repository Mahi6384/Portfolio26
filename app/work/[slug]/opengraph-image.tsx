import { ImageResponse } from "next/og";
import { getProject, projects } from "@/lib/data/projects";
import { site } from "@/lib/data/site";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  const name = p?.name ?? site.name;
  const tagline = p?.tagline ?? site.tagline;
  const status = p?.status ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#8f8f96", fontSize: 26, letterSpacing: 2, display: "flex" }}>
            MAHI JAIN · CASE STUDY
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#c7f94e" }} />
            <div style={{ color: "#c7f94e", fontSize: 26 }}>{status}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#fafaf8", fontSize: 120, fontWeight: 700, lineHeight: 1, letterSpacing: -4, textTransform: "uppercase", display: "flex" }}>
            {name}
          </div>
          <div style={{ color: "#c7f94e", fontSize: 38, marginTop: 28, maxWidth: 1000, display: "flex" }}>
            {tagline}
          </div>
        </div>

        <div style={{ color: "#8f8f96", fontSize: 28, display: "flex" }}>
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
