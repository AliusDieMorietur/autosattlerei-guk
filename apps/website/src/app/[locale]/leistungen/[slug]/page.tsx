import { BUSINESS } from "@/lib/business";
import { config } from "@/lib/config";
import { buildAlternates, defaultSocialImage, localeToOgLocale } from "@/lib/seo";
import { SERVICES, getService } from "@/lib/services";
import { LOCALES } from "@/i18n/routing";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "../../ContactSection";

type ServicePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const PROCESS_STEPS = [
  {
    title: "Anfrage",
    text: "Senden Sie uns Fotos und Ihre Wünsche über das Formular oder rufen Sie uns an.",
  },
  {
    title: "Beratung",
    text: "Wir besprechen Material, Farben und Ausführung und geben Ihnen eine Einschätzung.",
  },
  {
    title: "Umsetzung",
    text: "Wir fertigen Ihre Arbeit in unserer Werkstatt in Fredersdorf-Vogelsdorf.",
  },
  {
    title: "Übergabe",
    text: "Sie holen Ihr Fahrzeug oder Ihr Teil ab und prüfen das Ergebnis gemeinsam mit uns.",
  },
];

export const dynamicParams = false;

export const generateStaticParams = () =>
  LOCALES.flatMap((locale) =>
    SERVICES.map((service) => ({ locale, slug: service.slug })),
  );

export const generateMetadata = async ({
  params,
}: ServicePageProps): Promise<Metadata> => {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return { robots: { index: false, follow: false } };

  const path = `/leistungen/${service.slug}`;
  const firstImage = service.media.find((item) => item.type === "image");
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: `${service.metaTitle} | ${BUSINESS.name}`,
      description: service.metaDescription,
      url: `${config.hostUrl}${path}`,
      type: "website",
      locale: localeToOgLocale[locale] ?? "de_DE",
      images: [
        firstImage
          ? { url: new URL(firstImage.src, config.hostUrl).toString(), alt: firstImage.alt }
          : defaultSocialImage,
      ],
    },
  };
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const url = `${config.hostUrl}/leistungen/${service.slug}`;
  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.name,
        description: service.metaDescription,
        url,
        serviceType: service.name,
        provider: { "@id": `${config.hostUrl}/#business` },
        areaServed: [
          { "@type": "City", name: "Berlin" },
          { "@type": "State", name: "Brandenburg" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: config.hostUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Leistungen",
            item: `${config.hostUrl}/leistungen`,
          },
          { "@type": "ListItem", position: 3, name: service.name, item: url },
        ],
      },
    ],
  };

  return (
    <div className="px-5 desktopLg:px-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-c14 mb-6">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-white">Startseite</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/leistungen" className="hover:text-white">Leistungen</Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-white/70" aria-current="page">{service.name}</li>
        </ol>
      </nav>

      <header className="max-w-3xl mb-10">
        <h1 className="text-c7 text-2xl desktop:text-4xl mb-4">{service.name}</h1>
        <p className="text-white/80 text-lg">{service.intro}</p>
      </header>

      <div className="grid gap-10 desktop:grid-cols-[2fr_1fr] mb-12">
        <section aria-labelledby="beschreibung" className="flex flex-col gap-4">
          <h2 id="beschreibung" className="text-white text-xl desktop:text-2xl">
            So arbeiten wir
          </h2>
          {service.description.map((paragraph, index) => (
            <p key={index} className="text-white/70">{paragraph}</p>
          ))}
        </section>
        <section
          aria-labelledby="leistungsumfang"
          className="bg-c9 rounded-xl p-5 h-fit"
        >
          <h2 id="leistungsumfang" className="text-white text-lg mb-3">
            Leistungsumfang
          </h2>
          <ul className="flex flex-col gap-2 text-white/70 list-disc pl-5">
            {service.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      {service.media.length > 0 && (
        <section aria-labelledby="beispiele" className="mb-12">
          <h2 id="beispiele" className="text-white text-xl desktop:text-2xl mb-4">
            Beispiele
          </h2>
          <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
            {service.media.map((item) =>
              item.type === "video" ? (
                <video
                  key={item.src}
                  src={item.src}
                  poster={item.poster}
                  aria-label={item.alt}
                  controls
                  preload="none"
                  playsInline
                  className="w-full rounded-xl aspect-video object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full rounded-xl aspect-[4/3] object-cover"
                />
              ),
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="ablauf" className="mb-12">
        <h2 id="ablauf" className="text-white text-xl desktop:text-2xl mb-4">
          Ablauf
        </h2>
        <ol className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.title} className="bg-c9 rounded-xl p-5">
              <div className="text-c14 text-sm mb-1">Schritt {index + 1}</div>
              <h3 className="text-white mb-2">{step.title}</h3>
              <p className="text-white/70 text-sm">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq" className="mb-12 max-w-3xl">
        <h2 id="faq" className="text-white text-xl desktop:text-2xl mb-4">
          Häufige Fragen
        </h2>
        <div className="flex flex-col gap-4">
          {service.faq.map((item) => (
            <div key={item.question}>
              <h3 className="text-white mb-1">{item.question}</h3>
              <p className="text-white/70">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="weitere-leistungen" className="mb-12">
          <h2 id="weitere-leistungen" className="text-white text-xl desktop:text-2xl mb-4">
            Weitere Leistungen
          </h2>
          <ul className="flex flex-wrap gap-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/leistungen/${item.slug}`}
                  className="inline-block bg-c9 text-white rounded-full px-4 py-2 hover:bg-c12 hover:text-c8"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div id="contact-us" className="mb-[60px] desktop:mb-[120px]" />
      <ContactSection locale={locale} />
    </div>
  );
}
