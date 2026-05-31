import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { getCategory } from "@/lib/categories";
import { SITE } from "@/lib/site";

// Social-share preview card. Next.js wires the og:image meta tag to this
// route automatically, so every shared link gets a branded 1200x630 image
// even when a post has no cover photo.
export const runtime = "nodejs";
export const alt = `${SITE.name} — Catatan Iman`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { main: string; slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  const title = post?.title ?? SITE.name;
  const category = getCategory(params.main)?.name ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
          padding: "80px",
          color: "#fafaf9",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#d6b370",
          }}
        >
          {category}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 64 : 80,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 32,
            fontWeight: 600,
            color: "#a8a29e",
          }}
        >
          {SITE.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
