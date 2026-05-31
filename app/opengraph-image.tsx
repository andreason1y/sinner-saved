import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// Default social-share card for the homepage and any page without its own.
export const runtime = "nodejs";
export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
          color: "#fafaf9",
          textAlign: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 36,
            color: "#d6b370",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          {SITE.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
