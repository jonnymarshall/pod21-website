import { createClient } from "contentful";

// VERCEL_URL is set automatically by Vercel at runtime (you don't add it to .env).
// When missing (e.g. local) or when it's your production domain, we use pod21.xyz.
const BASE_URL =
  process.env.VERCEL_URL && !process.env.VERCEL_URL.startsWith("pod21")
    ? `https://${process.env.VERCEL_URL}`
    : "https://pod21.xyz";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

function escapeHtml(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Support both VITE_ (shared with frontend) and plain CONTENTFUL_ (server-only) env vars
function getContentfulConfig() {
  const spaceId =
    process.env.VITE_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID;
  const accessToken =
    process.env.VITE_CONTENTFUL_ACCESS_TOKEN ||
    process.env.CONTENTFUL_ACCESS_TOKEN;
  return { spaceId, accessToken };
}

function getImageUrlFromPost(post, response, defaultUrl) {
  const thumb = post?.fields?.thumbnail;
  if (!thumb) return defaultUrl;
  // Resolved asset: has fields.file.url
  if (thumb.fields?.file?.url) {
    const raw = thumb.fields.file.url;
    return raw.startsWith("http") ? raw : `https:${raw}`;
  }
  // Unresolved link: resolve from response.includes
  const id = thumb.sys?.id;
  if (id && response?.includes?.Asset) {
    const asset = response.includes.Asset.find((a) => a.sys?.id === id);
    const url = asset?.fields?.file?.url;
    if (url) return url.startsWith("http") ? url : `https:${url}`;
  }
  return defaultUrl;
}

function plainTextFromRichText(node, depth = 0) {
  if (!node || depth > 20) return "";
  try {
    if (node.nodeType === "text" && typeof node.value === "string")
      return node.value;
    if (Array.isArray(node.content))
      return node.content.map((n) => plainTextFromRichText(n, depth + 1)).join(" ");
  } catch (_) {
    return "";
  }
  return "";
}

export default async function handler(req, res) {
  const slug =
    typeof req.query?.slug === "string"
      ? req.query.slug
      : Array.isArray(req.query?.slug)
        ? req.query.slug[0]
        : null;
  if (!slug) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(400).end("<h1>Missing slug</h1>");
    return;
  }

  const { spaceId, accessToken } = getContentfulConfig();
  if (!spaceId || !accessToken) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(500).end("<h1>Server configuration error</h1>");
    return;
  }

  try {
    const client = createClient({ space: spaceId, accessToken });
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
      include: 2,
    });

    const post = response?.items?.[0];
    if (!post?.fields) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(404).end("<h1>Post not found</h1>");
      return;
    }

    const title = post.fields.title || "Blog | pod21";
    let description = "Read this article on pod21.";
    if (post.fields.summary && typeof post.fields.summary === "string") {
      description = post.fields.summary;
    } else if (post.fields.content) {
      try {
        const text = plainTextFromRichText(post.fields.content);
        if (text) description = text.slice(0, 160);
      } catch (_) {}
    }

    const imageUrl = getImageUrlFromPost(post, response, DEFAULT_OG_IMAGE);

    const pageUrl = `${BASE_URL}/blog/${encodeURIComponent(slug)}`;
    const safeTitle = escapeHtml(title);
    const safeDesc = escapeHtml(description);
    const safeImage = escapeHtml(imageUrl);
    const safeUrl = escapeHtml(pageUrl);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle} | pod21</title>
  <meta name="description" content="${safeDesc}" />
  <link rel="canonical" href="${safeUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${safeUrl}" />
  <meta property="og:title" content="${safeTitle} | pod21" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:image" content="${safeImage}" />
  <meta property="og:image:secure_url" content="${safeImage}" />
  <meta property="og:site_name" content="pod21" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@pod21" />
  <meta name="twitter:title" content="${safeTitle} | pod21" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:image" content="${safeImage}" />
  <meta http-equiv="refresh" content="0;url=${safeUrl}" />
</head>
<body><p>Redirecting to <a href="${safeUrl}">${safeTitle}</a>...</p></body>
</html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.status(200).send(html);
  } catch (err) {
    console.error("blog-og error:", err?.message || err);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(500).end("<h1>Error loading post</h1>");
  }
}
