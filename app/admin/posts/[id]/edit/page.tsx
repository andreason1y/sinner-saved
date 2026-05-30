import { notFound } from "next/navigation";
import { getPostByIdForAdmin } from "@/lib/posts";
import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Edit tulisan" };

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { saved?: string };
}) {
  const post = await getPostByIdForAdmin(params.id);
  if (!post) notFound();

  return (
    <div className="px-6 py-10 lg:px-12 lg:py-14">
      <PostForm
        mode="edit"
        savedFlag={searchParams?.saved === "1"}
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          cover: post.cover ?? null,
          mainCategory: post.mainCategory,
          subCategory: post.subCategory,
          tags: post.tags,
          status: post.status,
          contentJson: post.contentJson,
          titleEn: post.titleEn ?? "",
          excerptEn: post.excerptEn ?? "",
          contentHtmlEn: post.contentHtmlEn ?? "",
        }}
      />
    </div>
  );
}
