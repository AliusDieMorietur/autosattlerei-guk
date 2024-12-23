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
  const TYPE_TO_DATA: Record<
    string,
    {
      base: string;
      description: string;
    }
  > = {
    "door-panel": {
      base: "Türverkleidungen",
      description:
        "Showcases von neu bezogenen Türverkleidungen in verschiedenster Komplexität und aus unterschiedlichen Materialien.",
    },
    wheel: {
      base: "Lenkräder",
      description:
        "Showcases von Lenkrädern in verschiedenster Komplexität und aus unterschiedlichen Materialien.",
    },
    salon: {
      base: "Innenräume",
      description:
        "Showcases von neu bezogenen Fahrzeuginnenräumen in verschiedenster Komplexität. Verschiedene Arten von Innenräumen, verschiedene Stile aus allen möglichen Materialien – von Oldtimern bis hin zu Supersportwagen.",
    },
  };
  const data = TYPE_TO_DATA[type];
  if (!data) {
    return {
      title: "Gallery - Autosattlerei Guk",
    };
  }
  const { base, description } = data;
  return {
    title: base + " - Autosattlerei Guk",
    description: "Autosattlerei Guk in Berlin - " + description,
  };
};

export default async function GallerySpecificPage({
  params,
}: GallerySpecificPageProps) {
  const { locale, type } = await params;
  return <GallerySpecific locale={locale} type={type} />;
}
