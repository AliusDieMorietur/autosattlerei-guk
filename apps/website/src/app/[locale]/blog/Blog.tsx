"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: "image" | "video" | null;
  publishedAt: string;
};

type Props = {
  initialPosts: BlogPost[];
  initialHasNextPage: boolean;
  locale: string;
};

function PostCard({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <article className="flex flex-col gap-3 w-full border border-white/10 rounded-lg overflow-hidden bg-white/5">
      {post.mediaUrl && post.mediaType === "video" && (
        <video
          src={post.mediaUrl}
          controls
          playsInline
          className="w-full max-h-[480px] object-cover"
        />
      )}
      {post.mediaUrl && post.mediaType === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.mediaUrl}
          alt={post.title}
          className="w-full max-h-[480px] object-cover"
        />
      )}
      <div className="flex flex-col gap-2 px-4 pb-4">
        {post.title && (
          <h2 className="text-c7 text-lg font-semibold">{post.title}</h2>
        )}
        {post.description && (
          <p className="text-white/70 text-sm whitespace-pre-line">{post.description}</p>
        )}
        {post.publishedAt && (
          <time className="text-white/40 text-xs" dateTime={post.publishedAt}>
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
      <div className="w-full text-c7 text-xl desktop:text-2xl py-1.5">Blog</div>
      {posts.length === 0 && !loading && (
        <div className="text-white/50 text-sm py-10">No posts yet.</div>
      )}
      <div className="w-full flex flex-col gap-6 max-w-2xl">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
      <div ref={sentinelRef} className="w-full h-4" />
      {loading && (
        <div className="text-white/40 text-sm py-4">Loading...</div>
      )}
    </div>
  );
}
