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
export type CmsCollection<T> = { docs: T[]; hasNextPage: boolean; nextPage?: number | null };
export type SlidesGlobal = { slides?: SlideItem[] };
export type ServiceCardsGlobal = { cards?: ServiceCardItem[] };
export type BlogPostDoc = {
  id: string;
  title?: string;
  description?: string;
  media?: { url?: string; mimeType?: string };
  publishedAt?: string;
};

const toError = (e: unknown) => (e instanceof Error ? e : new Error(String(e)));

export const api = ({ baseUrl, revalidate = 60 }: CmsOptions) => {
  const client = wretch(baseUrl)
    .addon(QueryStringAddon)
    .options({ next: { revalidate } });

  return {
    slides: (locale: string) =>
      ResultAsync.fromPromise(
        client
          .url("/api/globals/slides")
          .query({ depth: 1, locale })
          .get()
          .json<SlidesGlobal>(),
        toError,
      ),

    serviceCards: (locale: string) =>
      ResultAsync.fromPromise(
        client
          .url("/api/globals/service-cards")
          .query({ depth: 1, locale })
          .get()
          .json<ServiceCardsGlobal>(),
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

    blogPosts: (params: { locale?: string; page?: number; limit?: number } = {}) =>
      ResultAsync.fromPromise(
        client
          .url("/api/blog-posts")
          .query({ sort: "-publishedAt", depth: 1, limit: 10, ...params })
          .get()
          .json<CmsCollection<BlogPostDoc>>(),
        toError,
      ),
  };
};
