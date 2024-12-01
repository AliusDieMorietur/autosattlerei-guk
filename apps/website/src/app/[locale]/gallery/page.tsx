import { Gallery } from "./Gallery";

export type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

const GalleryPage = async ({ params }: GalleryPageProps) => {
  const { locale } = await params;
  return <Gallery locale={locale} />;
};

export default GalleryPage;
