import { Metadata } from "next";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";
import { Blog, BlogPost } from "./Blog";
import { buildAlternates, localeToOgLocale } from "@/lib/seo";
import { config } from "@/lib/config";
import { getTranslations } from "next-intl/server";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: BlogPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = localeToOgLocale[locale] ?? "de_DE";
  return {
    title: t("blogTitle"),
    description: t("blogDescription"),
    alternates: buildAlternates(locale, "/blog"),
    openGraph: {
      title: `${t("blogTitle")} | Autosattlerei Guk`,
      description: t("blogDescription"),
      url: `${config.hostUrl}/blog`,
      type: "website",
      locale: ogLocale,
      images: [{ url: `${config.hostUrl}/logo.png`, width: 512, height: 512, alt: "Autosattlerei Guk" }],
    },
  };
};

function toMediaType(mimeType?: string): "image" | "video" | null {
  if (!mimeType) return null;
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("image/")) return "image";
  return null;
}

function toPostMedia(doc: {
  mediaItems?: { media?: { url?: string; mimeType?: string; width?: number; height?: number } }[];
}) {
  return (doc.mediaItems ?? [])
    .map((item) => item.media)
    .filter(
      (
        item,
      ): item is { url?: string; mimeType?: string; width?: number; height?: number } => Boolean(item),
    )
    .filter((item) => Boolean(item.url))
    .map((item) => ({
      url: cmsMediaUrl(item.url ?? ""),
      type: toMediaType(item.mimeType),
      width: item.width,
      height: item.height,
    }));
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
    media: toPostMedia(doc),
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
