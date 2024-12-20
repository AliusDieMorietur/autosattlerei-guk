import { GallerySpecific } from "./GallerySpecific";
import { Metadata } from "next";

export type GallerySpecificPageProps = {
  params: Promise<{
    locale: string;
    type: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GallerySpecificPageProps): Promise<Metadata> => {
  const { type } = await params;
  const TYPE_TO_BASE: Record<string, string> = {
    "door-panel": "Türverkleidungen",
    wheel: "Lenkräder",
    salon: "Innenräume",
  };
  return {
    title: TYPE_TO_BASE[type] + " Autosattlerei Guk",
  };
};

export default async function GallerySpecificPage({
  params,
}: GallerySpecificPageProps) {
  const { locale, type } = await params;
  return <GallerySpecific locale={locale} type={type} />;
}
