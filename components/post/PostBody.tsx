/**
 * Renders Tiptap-generated HTML inside our `.post-prose` container.
 * Server component — runs once at request time, no client JS shipped.
 */
export function PostBody({ html }: { html: string }) {
  return (
    <div
      className="post-prose"
      // The HTML originates from our own Tiptap editor (admin-only) and is
      // re-serialized server-side — same trust model as a CMS body.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
