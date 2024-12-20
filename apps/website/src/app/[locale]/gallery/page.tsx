import { Metadata } from "next";
import { Gallery } from "./Gallery";

export type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Gallery Autosattlerei Guk",
  };
};

const GalleryPage = async ({ params }: GalleryPageProps) => {
  const { locale } = await params;
  return <Gallery locale={locale} />;
};

export default GalleryPage;
