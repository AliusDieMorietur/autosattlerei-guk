import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Gallery } from "./Gallery";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";

export type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Galerie - Autosattlerei Guk in Berlin",
    description:
      "Autosattlerei Guk in Berlin - Es wird eine große Anzahl von Arbeiten verschiedener Schwierigkeitsgrade präsentiert: Innenräume, Lenkräder, Türverkleidungen, Decken.",
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
