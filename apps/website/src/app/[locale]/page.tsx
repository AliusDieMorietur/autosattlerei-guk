import { config } from "@/lib/config";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";
import { Home } from "./Home";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Autosattlerei Guk",
  description:
    "Eine Werkstatt für das Neubeziehen von Fahrzeuginnenräumen. Arbeiten in allen Schwierigkeitsgraden. Vielfältige Arbeitsoptionen: Neubezug von Türverkleidungen, Sitzen, Lenkrädern, Armaturenbrettern, Dachhimmeln, Griffen, Schalthebeln und kompletten Innenräumen. Von Oldtimern bis hin zu Supersportwagen. Handwerkskunst auf höchstem Niveau.",
  url: config.hostUrl,
  logo: `${config.hostUrl}/logo.png`,
  image: `${config.hostUrl}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Seelenbinder str. 112",
    addressLocality: "Berlin",
    postalCode: "12555",
    addressCountry: "Deutchland",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "52.45498524061661",
    longitude: "13.592589044619203",
  },
  openingHours: "Mo-Fr 10.00-17.00",
  telephone: "0176-614-99059",
  sameAs: ["https://www.tiktok.com/@autosattlerei.guk1"],
  service: {
    "@type": "Service",
    name: "Autosattlerei Guk",
    description:
      "Eine Werkstatt für das Neubeziehen von Fahrzeuginnenräumen. Arbeiten in allen Schwierigkeitsgraden. Vielfältige Arbeitsoptionen: Neubezug von Türverkleidungen, Sitzen, Lenkrädern, Armaturenbrettern, Dachhimmeln, Griffen, Schalthebeln und kompletten Innenräumen. Von Oldtimern bis hin zu Supersportwagen. Handwerkskunst auf höchstem Niveau.",
  },
};

export type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const cmsClient = serverApi();

  const [slidesResult, cardsResult] = await Promise.all([
    cmsClient.slides(locale),
    cmsClient.serviceCards(locale),
  ]);

  const slides = (slidesResult.unwrapOr({ slides: [] }).slides ?? []).map((slide) => ({
    src: cmsMediaUrl(slide.media?.url ?? ""),
    title: slide.title ?? "",
    description: slide.description ?? "",
  }));

  const cards = (cardsResult.unwrapOr({ cards: [] }).cards ?? []).map((card) => ({
    src: cmsMediaUrl(card.media?.url ?? ""),
    title: card.title ?? "",
    slug: card.slug ?? "",
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Home locale={locale} slides={slides} cards={cards} />
    </>
  );
};

export default HomePage;
