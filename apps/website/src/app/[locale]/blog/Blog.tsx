"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

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

function PostMediaSlider({ media, title }: { media: BlogPostMedia[]; title: string }) {
  const items = media.filter((item) => item.type);
  const [current, setCurrent] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (index: number) => setCurrent((index + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    const thumb = thumbsRef.current?.children[current] as HTMLElement | undefined;
    thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [current]);

  if (items.length === 0) return null;
  const active = items[current];

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="relative w-full aspect-[4/5] tablet:aspect-[4/3] rounded-md overflow-hidden bg-black">
        {active.type === "video" ? (
          <video
            key={active.url}
            src={active.url}
            controls
            playsInline
            autoPlay={current > 0}
            muted
            loop
            className="w-full h-full object-contain"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={active.url} alt={title} className="w-full h-full object-contain" />
        )}
        {items.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Zurück"
              onClick={() => go(current - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Weiter"
              onClick={() => go(current + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-2 right-2 rounded-full bg-black/50 text-white text-xs px-2 py-0.5">
              {current + 1} / {items.length}
            </div>
          </>
        )}
      </div>
      {items.length > 1 && (
        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item, index) => (
            <button
              key={`${item.url}-${index}`}
              type="button"
              aria-label={`${index + 1} / ${items.length}`}
              aria-current={index === current}
              onClick={() => setCurrent(index)}
              className={`relative shrink-0 w-16 h-16 rounded-md overflow-hidden bg-black border-2 transition-opacity ${
                index === current ? "border-white opacity-100" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {item.type === "video" ? (
                <>
                  <video
                    src={`${item.url}#t=0.5`}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                    <Play size={16} fill="currentColor" />
                  </span>
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt="" className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PostCard({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <article className="flex flex-col gap-3 w-full border gk-stroke-neutral-low rounded-lg overflow-hidden gk-fill-neutral-xlow">
      <PostMediaSlider media={post.media} title={post.title} />
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
