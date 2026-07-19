import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#c7f94e" }} />
            <div style={{ color: "#8f8f96", fontSize: 26, letterSpacing: 2 }}>
              {site.location.toUpperCase()}
            </div>
          </div>
          <div style={{ color: "#8f8f96", fontSize: 26 }}>{site.url.replace("https://", "")}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#fafaf8", fontSize: 130, fontWeight: 700, lineHeight: 1, letterSpacing: -4, display: "flex" }}>
            MAHI JAIN
          </div>
          <div style={{ color: "#c7f94e", fontSize: 44, marginTop: 24, display: "flex" }}>
            {site.role}
          </div>
        </div>

        <div style={{ color: "#8f8f96", fontSize: 30, maxWidth: 900, display: "flex" }}>
          Shipping AI-native products — from agentic pipelines to production payment flows.
        </div>
      </div>
    ),
    { ...size }
  );
}
