import { GallerySpecific, GallerySpecificData } from "./GallerySpecific";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";
import { buildAlternates, defaultSocialImage, localeToOgLocale } from "@/lib/seo";
import { config } from "@/lib/config";
import { getTranslations } from "next-intl/server";

export type GallerySpecificPageProps = {
  params: Promise<{
    locale: string;
    type: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GallerySpecificPageProps): Promise<Metadata> => {
  const { locale, type } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  const cmsClient = serverApi();
  const result = await cmsClient.gallerySections({
    "where[slug][equals]": type,
    limit: "1",
  });
  const section = result.unwrapOr({ docs: [] }).docs[0];
  const ogLocale = localeToOgLocale[locale] ?? "de_DE";
  if (!section) {
    return {
      title: t("notFound"),
      robots: { index: false, follow: false },
    };
  }
  const title = section.title ?? t("workFallback");
  const description = section.description
    ? t("sectionDescription", { description: section.description })
    : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, `/gallery/${type}`),
    openGraph: {
      title: `${title} | Autosattlerei Guk`,
      description,
      url: `${config.hostUrl}/gallery/${type}`,
      type: "website",
      locale: ogLocale,
      images: [{
        url: section.images?.[0]?.media?.url
          ? new URL(cmsMediaUrl(section.images[0].media.url), config.hostUrl).toString()
          : defaultSocialImage.url,
        alt: `${title} – Autosattlerei Guk`,
      }],
    },
  };
};

export default async function GallerySpecificPage({
  params,
}: GallerySpecificPageProps) {
  const { locale, type } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  const cmsClient = serverApi();

  const result = await cmsClient.gallerySections({
    "where[slug][equals]": type,
    limit: "1",
  });
  const section = result.unwrapOr({ docs: [] }).docs[0];

  if (!section) notFound();

  const label = section.title ?? t("workFallback");
  const images = (section.images ?? []).map((img, index) => ({
    src: cmsMediaUrl(img.media?.url ?? ""),
      type: img.media?.mimeType?.startsWith("video/") ? ("video" as const) : ("image" as const),
    alt: t("workExample", { title: label, number: index + 1 }),
  }));
  const galleryData: GallerySpecificData = {
    label,
    description: section.description ?? "",
    items: [{ images, viewMore: false }],
  };

  return <GallerySpecific galleryData={galleryData} />;
}
