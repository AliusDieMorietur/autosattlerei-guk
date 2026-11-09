import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Gallery } from "./Gallery";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";
import { buildAlternates, defaultSocialImage, localeToOgLocale } from "@/lib/seo";
import { config } from "@/lib/config";

export type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: GalleryPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = localeToOgLocale[locale] ?? "de_DE";
  return {
    title: t("galleryTitle"),
    description: t("galleryDescription"),
    alternates: buildAlternates(locale, "/gallery"),
    openGraph: {
      title: `${t("galleryTitle")} | Autosattlerei Guk`,
      description: t("galleryDescription"),
      url: `${config.hostUrl}/gallery`,
      type: "website",
      locale: ogLocale,
      images: [defaultSocialImage],
    },
  };
};

const GalleryPage = async ({ params }: GalleryPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  const cmsClient = serverApi();

  const result = await cmsClient.gallerySections();
  const docs = result.unwrapOr({ docs: [] }).docs;

  const sections = docs.map((section, index) => ({
    title: section.title ?? "",
    description: section.description ?? "",
    slug: section.slug ?? "",
    images: (section.images ?? []).map((img, imageIndex) => ({
      src: cmsMediaUrl(img.media?.url ?? ""),
      type: img.media?.mimeType?.startsWith("video/") ? ("video" as const) : ("image" as const),
      alt: t("workExample", {
        title: section.title ?? t("workFallback"),
        number: imageIndex + 1,
      }),
    })),
    autoStartDelay: index * 333,
  }));

  return <Gallery locale={locale} sections={sections} />;
};

export default GalleryPage;
