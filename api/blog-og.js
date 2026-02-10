import { createClient } from "contentful";

const BASE_URL =
  process.env.VERCEL_URL && process.env.VERCEL_URL !== "pod21.xyz"
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

export default async function handler(req, res) {
  const slug = req.query?.slug;
  if (!slug) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(400).end("<h1>Missing slug</h1>");
    return;
  }

  const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
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
      include: 2, // resolve linked Assets so thumbnail has file.url
    });

    const post = response?.items?.[0];
    if (!post?.fields) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(404).end("<h1>Post not found</h1>");
      return;
    }

    const title = post.fields.title || "Blog | pod21";
    const description =
      post.fields.summary ||
      (post.fields.content
        ? plainTextFromRichText(post.fields.content).slice(0, 160)
        : "Read this article on pod21.");
    let imageUrl = DEFAULT_OG_IMAGE;
    const thumb = post.fields.thumbnail;
    if (thumb?.fields?.file?.url) {
      const raw = thumb.fields.file.url;
      imageUrl = raw.startsWith("http") ? raw : `https:${raw}`;
    }

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
    console.error("blog-og error:", err);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(500).end("<h1>Error loading post</h1>");
  }
}

function plainTextFromRichText(node) {
  if (!node) return "";
  if (node.nodeType === "text" && typeof node.value === "string") return node.value;
  if (Array.isArray(node.content)) {
    return node.content.map(plainTextFromRichText).join(" ");
  }
  return "";
}
