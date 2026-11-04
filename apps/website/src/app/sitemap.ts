import type { MetadataRoute } from "next";
import { config } from "@/lib/config";
import { serverApi } from "@/lib/api/server";
import { SERVICES } from "@/lib/services";

const STATIC_PATHS = ["/", "/gallery", "/leistungen", "/blog"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsClient = serverApi();
  const sectionsResult = await cmsClient.gallerySections();
  const gallerySlugs = sectionsResult
    .unwrapOr({ docs: [] })
    .docs.map((s) => s.slug)
    .filter(Boolean) as string[];

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${config.hostUrl}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : path === "/gallery" || path === "/leistungen" ? 0.9 : 0.7,
    alternates: {
      languages: {
        de: `${config.hostUrl}${path === "/" ? "" : path}`,
        "x-default": `${config.hostUrl}${path === "/" ? "" : path}`,
      },
    },
  }));

  for (const slug of gallerySlugs) {
    entries.push({
      url: `${config.hostUrl}/gallery/${slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          de: `${config.hostUrl}/gallery/${slug}`,
          "x-default": `${config.hostUrl}/gallery/${slug}`,
        },
      },
    });
  }

  for (const service of SERVICES) {
    const url = `${config.hostUrl}/leistungen/${service.slug}`;
    entries.push({
      url,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { de: url, "x-default": url } },
    });
  }

  return entries;
}
