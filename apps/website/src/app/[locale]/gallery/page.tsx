import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Gallery } from "./Gallery";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";
import { buildAlternates, localeToOgLocale } from "@/lib/seo";
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
      url: `${config.hostUrl}/${locale}/gallery`,
      type: "website",
      locale: ogLocale,
      images: [{ url: `${config.hostUrl}/logo.png`, width: 512, height: 512, alt: "Autosattlerei Guk" }],
    },
  };
};

const GalleryPage = async ({ params }: GalleryPageProps) => {
  const { locale } = await params;
  const cmsClient = serverApi();

  const result = await cmsClient.gallerySections({ locale });
  const docs = result.unwrapOr({ docs: [] }).docs;

  const sections = docs.map((section, index) => ({
    title: section.title ?? "",
    slug: section.slug ?? "",
    images: (section.images ?? []).map((img) => ({
      src: cmsMediaUrl(img.media?.url ?? ""),
    })),
    autoStartDelay: index * 333,
  }));

  return <Gallery locale={locale} sections={sections} />;
};

export default GalleryPage;
