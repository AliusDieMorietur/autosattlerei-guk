"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { MediaSlider } from "@/components/MediaSlider";

export type BlogPostMedia = {
  url: string;
  type: "image" | "video" | null;
  width?: number;
  height?: number;
};

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  media: BlogPostMedia[];
  publishedAt: string;
};

type Props = {
  initialPosts: BlogPost[];
  initialHasNextPage: boolean;
  locale: string;
};

function PostCard({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <article className="flex flex-col gap-3 w-full border gk-stroke-neutral-low rounded-lg overflow-hidden gk-fill-neutral-xlow">
      <MediaSlider
        className="p-2"
        items={post.media.flatMap((item) =>
          item.type ? [{ type: item.type, src: item.url, alt: post.title }] : [],
        )}
      />
      <div className="flex flex-col gap-2 px-4 pb-4">
        {post.title && (
          <h2 className="gk-text-neutral-high text-lg font-semibold">{post.title}</h2>
        )}
        {post.description && (
          <p className="gk-text-neutral-medium text-sm whitespace-pre-line">{post.description}</p>
        )}
        {post.publishedAt && (
          <time className="gk-text-neutral-low text-xs" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </div>
    </article>
  );
}

export function Blog({ initialPosts, initialHasNextPage, locale }: Props) {
  const t = useTranslations("blog");
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasNextPage) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blog-posts?locale=${locale}&page=${page}`);
      if (!res.ok) return;
      const data = await res.json() as { posts: BlogPost[]; hasNextPage: boolean };
      setPosts((prev) => [...prev, ...data.posts]);
      setHasNextPage(data.hasNextPage);
      setPage((p) => p + 1);
    } finally {
      setLoading(false);
    }
  }, [loading, hasNextPage, locale, page]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="w-full flex flex-col items-center px-5 desktopLg:px-0 gap-5 desktop:gap-8">
      <h1 className="w-full gk-text-neutral-high text-xl desktop:text-2xl py-1.5">
        {t("heading")}
      </h1>
      {posts.length === 0 && !loading && (
        <div className="gk-text-neutral-low text-sm py-10">{t("empty")}</div>
      )}
      <div className="w-full flex flex-col gap-6 max-w-2xl">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
      <div ref={sentinelRef} className="w-full h-4" />
      {loading && (
        <div className="gk-text-neutral-low text-sm py-4">{t("loading")}</div>
      )}
    </div>
  );
}
