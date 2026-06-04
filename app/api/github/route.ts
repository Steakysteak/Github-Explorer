import { NextResponse } from "next/server";
import { cache, CACHE_TTL } from "@/lib/cache";
import { fetchGitHubData } from "@/lib/github-service";
import { isRateLimited } from "@/lib/rateLimitNative";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.toLowerCase().trim();
  const page = searchParams.get("page") || "1";

  if (!username) {
    return NextResponse.json(
      { error: "Username parameter is required" },
      { status: 400 },
    );
  }

  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  if (isRateLimited(ip, 4, 10000)) {
    return NextResponse.json({ error: "Slow down a little as you hit our server side rate limiting, try after sometime" }, { status: 429 });
  }

  // 1. Check Cache
  const cacheKey = `${username}_p${page}`;
  const now = Date.now();

  if (cache.has(cacheKey)) {
    const entry = cache.get(cacheKey)!;
    if (now < entry.expiresAt) {
      return NextResponse.json(
        { ...entry.data, fromCache: true },
        { headers: { "X-Cache": "HIT" } },
      );
    }
    cache.delete(cacheKey); // Evict stale item
  }

  // 2. Fetch Fresh Data from Service
  const result = await fetchGitHubData(username, page);

  if ("error" in result) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  // 3. Save to Cache
  cache.set(cacheKey, { data: result, expiresAt: now + CACHE_TTL });

  // 4. Return Response
  return NextResponse.json(result, { headers: { "X-Cache": "MISS" } });
}
