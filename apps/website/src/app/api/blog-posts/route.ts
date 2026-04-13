import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";

function toMediaType(mimeType?: string): "image" | "video" | null {
  if (!mimeType) return null;
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("image/")) return "image";
  return null;
}

function toPostMedia(doc: {
  mediaItems?: { media?: { url?: string; mimeType?: string; width?: number; height?: number } }[];
}) {
  return (doc.mediaItems ?? [])
    .map((item) => item.media)
    .filter(
      (
        item,
      ): item is { url?: string; mimeType?: string; width?: number; height?: number } => Boolean(item),
    )
    .filter((item) => Boolean(item.url))
    .map((item) => ({
      url: cmsMediaUrl(item.url ?? ""),
      type: toMediaType(item.mimeType),
      width: item.width,
      height: item.height,
    }));
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page = Number(searchParams.get("page") ?? "1");

  const cmsClient = serverApi();
  const result = await cmsClient.blogPosts({ page, limit: 10 });
  const data = result.unwrapOr({ docs: [], hasNextPage: false });

  const posts = data.docs.map((doc) => ({
    id: doc.id,
    title: doc.title ?? "",
    description: doc.description ?? "",
    media: toPostMedia(doc),
    publishedAt: doc.publishedAt ?? "",
  }));

  return NextResponse.json({ posts, hasNextPage: data.hasNextPage });
}
