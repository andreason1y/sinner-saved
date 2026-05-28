import { PostForm } from "@/components/admin/PostForm";

export const metadata = { title: "Admin · Tulisan baru" };

export default function NewPostPage() {
  return (
    <div className="px-6 py-10 lg:px-12 lg:py-14">
      <PostForm mode="create" />
    </div>
  );
}
