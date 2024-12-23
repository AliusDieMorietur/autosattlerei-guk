import { Metadata } from "next";
import { Gallery } from "./Gallery";

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
  return <Gallery locale={locale} />;
};

export default GalleryPage;
