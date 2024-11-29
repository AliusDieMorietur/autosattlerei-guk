import { grid } from "@/lib/utils";
import { GallerySpecificPage } from "./GallerySpecificPage";

export type GallerySpecificProps = {
  params: Promise<{
    locale: string;
    type: string;
  }>;
};

export default async function GallerySpecific({
  params,
}: GallerySpecificProps) {
  const { locale, type } = await params;
  return <GallerySpecificPage locale={locale} type={type} />;
}
