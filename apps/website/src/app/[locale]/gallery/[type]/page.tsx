import { GallerySpecific } from "./GallerySpecific";

export type GallerySpecificPageProps = {
  params: Promise<{
    locale: string;
    type: string;
  }>;
};

export default async function GallerySpecificPage({
  params,
}: GallerySpecificPageProps) {
  const { locale, type } = await params;
  return <GallerySpecific locale={locale} type={type} />;
}
