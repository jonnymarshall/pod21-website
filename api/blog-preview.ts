import { createClient } from "contentful";

const BOT_UA =
  /bot|crawler|spider|crawling|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slurp|ia_archiver/i;

function getPlainText(node: any): string {
  if (!node) return "";
  if (node.nodeType === "text" && typeof node.value === "string") return node.value;
  if (Array.isArray(node.content)) return node.content.map(getPlainText).join(" ");
  return "";
}

type Req = { query: Record<string, string | string[] | undefined>; headers: Record<string, string | undefined> };
type Res = { setHeader: (n: string, v: string) => void; status: (c: number) => Res; send: (b: string) => void };

export default async function handler(req: Req, res: Res) {
  const slug = typeof req.query.slug === "string" ? req.query.slug : null;
  const userAgent = (req.headers["user-agent"] || "").toLowerCase();
  const isBot = BOT_UA.test(userAgent);
  const host = req.headers["x-forwarded-host"] || req.headers["host"] || "pod21.xyz";
  const baseUrl = host.includes("localhost") ? `http://${host}` : `https://${host}`;

  if (!slug) {
    res.status(404).send("Not found");
    return;
  }

  const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  if (!spaceId || !accessToken) {
    res.status(500).send("Contentful not configured");
    return;
  }

  const client = createClient({ space: spaceId, accessToken });

  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    });

    const post = response?.items?.[0] as { fields?: Record<string, unknown> } | undefined;
    if (!post?.fields) {
      res.status(404).send("Post not found");
      return;
    }

    let coverImageUrl = `${baseUrl}/og-image.png`;
    const thumb = post.fields.thumbnail as Record<string, unknown> | undefined;
    if (thumb && typeof thumb === "object" && thumb.fields && typeof thumb.fields === "object") {
      const file = (thumb.fields as Record<string, unknown>).file as { url?: string } | undefined;
      if (file?.url) coverImageUrl = `https:${file.url}`;
    }

    const title = (post.fields.title as string) || "Blog | pod21";
    const content = post.fields.content as { content?: unknown[] } | undefined;
    const desc = content?.content ? getPlainText({ content: content.content }) : "";
    const description = (desc || "").slice(0, 160).trim();
    const url = `${baseUrl}/blog/${encodeURIComponent(slug)}`;

    if (isBot) {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} | pod21</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:title" content="${escapeHtml(title)} | pod21" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(coverImageUrl)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeHtml(title)}" />
  <meta property="og:site_name" content="pod21" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)} | pod21" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(coverImageUrl)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(title)}" />
  <meta http-equiv="refresh" content="0;url=${escapeHtml(url)}" />
</head>
<body><p>Redirecting to <a href="${escapeHtml(url)}">${escapeHtml(title)}</a>...</p></body>
</html>`;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(200).send(html);
      return;
    }

    const indexRes = await fetch(baseUrl + "/", {
      headers: { "User-Agent": req.headers["user-agent"] || "Mozilla/5.0" },
    });
    const indexHtml = await indexRes.text();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(indexHtml);
  } catch (e) {
    console.error("blog-preview error:", e);
    res.status(500).send("Error");
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
