import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social sharing image, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f7f7f2",
          color: "#20231f",
          backgroundImage:
            "linear-gradient(to right, rgba(32,35,31,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(32,35,31,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600 }}>
          <div style={{ width: 44, height: 44, borderRadius: 6, background: "#20231f", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#b4c9ae" }} />
          </div>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>
          <span>Better websites.</span>
          <span style={{ color: "#526b50" }}>Smarter businesses.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#62685f", letterSpacing: 3, textTransform: "uppercase" }}>
          Independent Digital Studio · Web Design · AI & Automation
        </div>
      </div>
    ),
    size,
  );
}
