import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";
import { ResultAsync } from "neverthrow";

export type CmsOptions = {
  baseUrl: string;
  revalidate?: number;
};

export type SlideItem = {
  media?: { url?: string };
  title?: string;
  description?: string;
};
export type ServiceCardItem = {
  media?: { url?: string };
  title?: string;
  slug?: string;
};
export type GallerySectionDoc = {
  title?: string;
  description?: string;
  slug?: string;
  order?: number;
  images?: { media?: { url?: string } }[];
};
export type MediaDoc = {
  url?: string;
  mimeType?: string;
  width?: number;
  height?: number;
};
export type CmsCollection<T> = { docs: T[]; hasNextPage: boolean; nextPage?: number | null };
export type SlidesGlobal = { slides?: SlideItem[] };
export type ServiceCardsGlobal = { cards?: ServiceCardItem[] };
export type BlogPostDoc = {
  id: string;
  title?: string;
  description?: string;
  mediaItems?: { media?: MediaDoc }[];
  publishedAt?: string;
};

const toError = (e: unknown) => (e instanceof Error ? e : new Error(String(e)));

export const api = ({ baseUrl, revalidate = 60 }: CmsOptions) => {
  const client = wretch(baseUrl)
    .addon(QueryStringAddon)
    .options({ next: { revalidate } });

  return {
    slides: (_locale?: string) =>
      ResultAsync.fromPromise(
        client.url("/api/globals/slides").query({ depth: 1 }).get().json<SlidesGlobal>(),
        toError,
      ),

    serviceCards: (_locale?: string) =>
      ResultAsync.fromPromise(
        client.url("/api/globals/service-cards").query({ depth: 1 }).get().json<ServiceCardsGlobal>(),
        toError,
      ),

    gallerySections: (params: Record<string, string> = {}) =>
      ResultAsync.fromPromise(
        client
          .url("/api/gallery-sections")
          .query({ sort: "order", depth: 1, ...params })
          .get()
          .json<CmsCollection<GallerySectionDoc>>(),
        toError,
      ),

    blogPosts: (params: { locale?: string; page?: number; limit?: number } = {}) => {
      const { locale: _locale, ...rest } = params;
      return ResultAsync.fromPromise(
        client
          .url("/api/blog-posts")
          .query({ sort: "-publishedAt", depth: 1, limit: 10, ...rest })
          .get()
          .json<CmsCollection<BlogPostDoc>>(),
        toError,
      );
    },
  };
};
