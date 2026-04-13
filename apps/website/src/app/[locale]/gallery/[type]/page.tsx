import { GallerySpecific, GallerySpecificData } from "./GallerySpecific";
import { Metadata } from "next";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";
import { buildAlternates, localeToOgLocale } from "@/lib/seo";
import { config } from "@/lib/config";

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
  const cmsClient = serverApi();
  const result = await cmsClient.gallerySections({
    "where[slug][equals]": type,
    locale,
    limit: "1",
  });
  const section = result.unwrapOr({ docs: [] }).docs[0];
  const ogLocale = localeToOgLocale[locale] ?? "de_DE";
  if (!section) {
    return {
      title: "Gallery",
      alternates: buildAlternates(locale, `/gallery/${type}`),
    };
  }
  const title = section.title ?? "";
  const description = section.description
    ? `Autosattlerei Guk in Berlin – ${section.description}`
    : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, `/gallery/${type}`),
    openGraph: {
      title: `${title} | Autosattlerei Guk`,
      description,
      url: `${config.hostUrl}/${locale}/gallery/${type}`,
      type: "website",
      locale: ogLocale,
      images: [{ url: `${config.hostUrl}/logo.png`, width: 512, height: 512, alt: "Autosattlerei Guk" }],
    },
  };
};

export default async function GallerySpecificPage({
  params,
}: GallerySpecificPageProps) {
  const { locale, type } = await params;
  const cmsClient = serverApi();

  const result = await cmsClient.gallerySections({
    "where[slug][equals]": type,
    locale,
    limit: "1",
  });
  const section = result.unwrapOr({ docs: [] }).docs[0];

  let galleryData: GallerySpecificData | null = null;

  if (section) {
    const images = (section.images ?? []).map((img) => ({
      src: cmsMediaUrl(img.media?.url ?? ""),
    }));
    galleryData = {
      label: section.title ?? "",
      items: [{ images, viewMore: false }],
    };
  }

  return (
    <GallerySpecific locale={locale} type={type} galleryData={galleryData} />
  );
}
