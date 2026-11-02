import { BUSINESS } from "@/lib/business";
import { config } from "@/lib/config";
import { buildAlternates, defaultSocialImage, localeToOgLocale } from "@/lib/seo";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";
import { Home } from "./Home";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${config.hostUrl}/#business`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  description: BUSINESS.description,
  url: config.hostUrl,
  logo: `${config.hostUrl}/logo.png`,
  image: `${config.hostUrl}/logo.png`,
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    ...BUSINESS.address,
  },
  openingHoursSpecification: BUSINESS.openingHours.map((hours) => ({
    "@type": "OpeningHoursSpecification",
    ...hours,
  })),
  areaServed: [
    { "@type": "City", name: "Berlin" },
    { "@type": "State", name: "Brandenburg" },
  ],
  sameAs: BUSINESS.socialProfiles,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Autosattlerei-Leistungen",
    itemListElement: [
      "Fahrzeugsitze neu beziehen",
      "Lenkräder neu beziehen",
      "Türverkleidungen neu beziehen",
      "Dachhimmel erneuern",
      "Oldtimer-Innenräume restaurieren",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: HomePageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = localeToOgLocale[locale] ?? "de_DE";
  return {
    title: { absolute: t("homeTitle") },
    description: t("homeDescription"),
    alternates: buildAlternates(locale),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: config.hostUrl,
      type: "website",
      locale: ogLocale,
      images: [defaultSocialImage],
    },
  };
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />
      <Home locale={locale} slides={slides} cards={cards} />
    </>
  );
};

export default HomePage;
