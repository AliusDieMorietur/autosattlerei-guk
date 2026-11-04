import { BUSINESS } from "@/lib/business";
import { config } from "@/lib/config";
import { buildAlternates, defaultSocialImage, localeToOgLocale } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "../ContactSection";

const TITLE = "Leistungen – Autosattlerei in Berlin & Brandenburg";
const DESCRIPTION =
  "Alle Leistungen der Autosattlerei Guk: Sitze, Dachhimmel, Lenkräder, Türverkleidungen, Armaturenbrett, Motorradsitze, Oldtimer-Restaurierung und mehr.";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildAlternates(locale, "/leistungen"),
    openGraph: {
      title: `${TITLE} | ${BUSINESS.name}`,
      description: DESCRIPTION,
      url: `${config.hostUrl}/leistungen`,
      type: "website",
      locale: localeToOgLocale[locale] ?? "de_DE",
      images: [defaultSocialImage],
    },
  };
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="px-5 desktopLg:px-0">
      <header className="max-w-3xl mb-10">
        <h1 className="text-c7 text-2xl desktop:text-4xl mb-4">
          Unsere Leistungen
        </h1>
        <p className="text-white/80 text-lg">
          Von der Sitzreparatur bis zur kompletten Oldtimer-Restaurierung:
          Das bieten wir in unserer Autosattlerei in Fredersdorf-Vogelsdorf bei Berlin an.
        </p>
      </header>
      <ul className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3 mb-12">
        {SERVICES.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/leistungen/${service.slug}`}
              className="flex flex-col h-full gap-2 bg-c9 rounded-xl p-5 hover:bg-c12 hover:text-c8 transition-colors"
            >
              <h2 className="text-white text-lg">{service.name}</h2>
              <p className="text-white/70 text-sm">{service.intro}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div id="contact-us" className="mb-[60px] desktop:mb-[120px]" />
      <ContactSection locale={locale} />
    </div>
  );
}
