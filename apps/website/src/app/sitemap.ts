import type { MetadataRoute } from "next";
import { config } from "@/lib/config";
import { serverApi } from "@/lib/api/server";

const STATIC_PATHS = ["/", "/gallery", "/blog", "/impressum"];

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
    priority: path === "/" ? 1.0 : 0.8,
  }));

  for (const slug of gallerySlugs) {
    entries.push({
      url: `${config.hostUrl}/gallery/${slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
