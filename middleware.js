import { rewrite, next } from "@vercel/functions";

const CRAWLER_UA =
  /facebookexternalhit|WhatsApp|Twitterbot|LinkedInBot|Slackbot|TelegramBot|Pinterest|Googlebot|bingbot/i;

export const config = {
  matcher: ["/blog/:slug*"],
};

export default function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Only /blog/:slug (one segment after /blog), not /blog or /blogs
  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (!blogMatch) {
    return next();
  }

  const ua = request.headers.get("user-agent") || "";
  if (!CRAWLER_UA.test(ua)) {
    return next();
  }

  const slug = blogMatch[1];
  const apiUrl = new URL(`/api/blog-og?slug=${encodeURIComponent(slug)}`, request.url);
  return rewrite(apiUrl);
}
