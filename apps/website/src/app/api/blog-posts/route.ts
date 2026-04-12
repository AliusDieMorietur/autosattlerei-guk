import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/lib/api/server";
import { cmsMediaUrl } from "@/lib/api/utils";

function toMediaType(mimeType?: string): "image" | "video" | null {
  if (!mimeType) return null;
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("image/")) return "image";
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const locale = searchParams.get("locale") ?? "de";
  const page = Number(searchParams.get("page") ?? "1");

  const cmsClient = serverApi();
  const result = await cmsClient.blogPosts({ locale, page, limit: 10 });
  const data = result.unwrapOr({ docs: [], hasNextPage: false });

  const posts = data.docs.map((doc) => ({
    id: doc.id,
    title: doc.title ?? "",
    description: doc.description ?? "",
    mediaUrl: doc.media?.url ? cmsMediaUrl(doc.media.url) : "",
    mediaType: toMediaType(doc.media?.mimeType),
    publishedAt: doc.publishedAt ?? "",
  }));

  return NextResponse.json({ posts, hasNextPage: data.hasNextPage });
}
