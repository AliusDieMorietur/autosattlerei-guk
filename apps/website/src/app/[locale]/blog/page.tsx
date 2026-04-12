import { Metadata } from "next";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";
import { Blog, BlogPost } from "./Blog";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Blog - Autosattlerei Guk",
    description: "Neuigkeiten und Projekte von Autosattlerei Guk in Berlin.",
  };
};

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

function toMediaType(mimeType?: string): "image" | "video" | null {
  if (!mimeType) return null;
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("image/")) return "image";
  return null;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { locale } = await params;
  const cmsClient = serverApi();

  const result = await cmsClient.blogPosts({ locale, page: 1, limit: 10 });
  const data = result.unwrapOr({ docs: [], hasNextPage: false });

  const initialPosts: BlogPost[] = data.docs.map((doc) => ({
    id: doc.id,
    title: doc.title ?? "",
    description: doc.description ?? "",
    mediaUrl: doc.media?.url ? cmsMediaUrl(doc.media.url) : "",
    mediaType: toMediaType(doc.media?.mimeType),
    publishedAt: doc.publishedAt ?? "",
  }));

  return (
    <Blog
      initialPosts={initialPosts}
      initialHasNextPage={data.hasNextPage}
      locale={locale}
    />
  );
};

export default BlogPage;
