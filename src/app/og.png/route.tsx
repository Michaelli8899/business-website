import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { wordmarkGlyphs } from "@/components/layout/brand-glyphs";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/**
 * Default social sharing image (/og.png), generated at build time.
 * Referenced from metadata only when an absolute site/deployment URL is
 * known — see ogImages() in src/lib/metadata.ts.
 */
export function GET() {
  const wmHeight = 44;
  const wmWidth = (wordmarkGlyphs.width / wordmarkGlyphs.height) * wmHeight;
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
          background: "#F7F7F2",
          color: "#20231F",
          backgroundImage:
            "linear-gradient(to right, rgba(32,35,31,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(32,35,31,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <svg width={wmWidth} height={wmHeight} viewBox={`0 0 ${wordmarkGlyphs.width} ${wordmarkGlyphs.height}`}>
          {wordmarkGlyphs.parts.map((p, i) => (
            <path key={i} d={p.d} fill={p.role === "ink" ? "#20231F" : "#526B50"} />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>
          <span>Better websites.</span>
          <span style={{ color: "#526B50" }}>Smarter businesses.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#62685F", letterSpacing: 3, textTransform: "uppercase" }}>
          {siteConfig.name} · Websites & Business Automation
        </div>
      </div>
    ),
    size,
  );
}
