import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/routing";
import { config } from "@/lib/config";
import { serverApi } from "@/lib/api/server";

const STATIC_PATHS = ["", "/gallery", "/blog", "/impressum"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsClient = serverApi();
  const sectionsResult = await cmsClient.gallerySections();
  const gallerySlugs = sectionsResult
    .unwrapOr({ docs: [] })
    .docs.map((s) => s.slug)
    .filter(Boolean) as string[];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${config.hostUrl}/${locale}${path}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : 0.8,
      });
    }
    for (const slug of gallerySlugs) {
      entries.push({
        url: `${config.hostUrl}/${locale}/gallery/${slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
