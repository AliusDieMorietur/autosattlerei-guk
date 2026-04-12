import { GallerySpecific, GallerySpecificData } from "./GallerySpecific";
import { Metadata } from "next";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";

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
  if (!section) {
    return { title: "Gallery - Autosattlerei Guk" };
  }
  return {
    title: `${section.title} - Autosattlerei Guk`,
    description: section.description
      ? `Autosattlerei Guk in Berlin - ${section.description}`
      : undefined,
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
