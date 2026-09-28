import pkg from "contentful";
const { createClient } = pkg;
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });
dotenv.config();

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const BASE_URL = process.env.VITE_BASE_URL || "https://pod21.xyz";
const DIST_DIR = path.join(process.cwd(), "dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.error(
    "Error: VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN are required"
  );
  process.exit(1);
}

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripHtml = (value = "") => String(value).replace(/<[^>]*>/g, "");

const truncate = (value = "", length = 155) => {
  const text = stripHtml(value).replace(/\s+/g, " ").trim();
  return text.length > length ? `${text.slice(0, length - 3).trim()}...` : text;
};

const plainTextFromRichText = (node) => {
  if (!node) return "";
  if (node.nodeType === "text") return node.value || "";
  if (!Array.isArray(node.content)) return "";
  return node.content.map(plainTextFromRichText).join(" ").replace(/\s+/g, " ").trim();
};

const richTextToHtml = (node) => {
  if (!node) return "";
  if (node.nodeType === "text") return escapeHtml(node.value || "");
  if (!Array.isArray(node.content)) return "";

  const children = node.content.map(richTextToHtml).join("");
  switch (node.nodeType) {
    case "heading-1":
      return `<h1>${children}</h1>`;
    case "heading-2":
      return `<h2>${children}</h2>`;
    case "heading-3":
      return `<h3>${children}</h3>`;
    case "unordered-list":
      return `<ul>${children}</ul>`;
    case "ordered-list":
      return `<ol>${children}</ol>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "blockquote":
      return `<blockquote>${children}</blockquote>`;
    case "paragraph":
      return children.trim() ? `<p>${children}</p>` : "";
    default:
      return children;
  }
};

const absoluteUrl = (url) => {
  if (!url) return `${BASE_URL}/og-image.png`;
  if (url.startsWith("http")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const jobBlocksToHtml = (blocks = []) =>
  blocks
    .map((block) => {
      if (block.type === "paragraph") return `<p>${escapeHtml(block.text)}</p>`;
      if (block.type === "list") {
        return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
      }
      if (block.type === "definitions") {
        return `<dl>${block.items
          .map(
            (item) =>
              `<dt>${escapeHtml(item.term)}</dt><dd>${escapeHtml(item.description)}</dd>`
          )
          .join("")}</dl>`;
      }
      return "";
    })
    .join("");

const jobToHtml = (job) =>
  job.sections
    .map((section) => {
      const subsections = (section.subsections || [])
        .map(
          (subsection) =>
            `<section><h3>${escapeHtml(subsection.heading)}</h3>${jobBlocksToHtml(
              subsection.blocks || []
            )}</section>`
        )
        .join("");
      return `<section><h2>${escapeHtml(section.heading)}</h2>${jobBlocksToHtml(
        section.blocks || []
      )}${subsections}</section>`;
    })
    .join("");

const setTag = (html, pattern, replacement) =>
  pattern.test(html) ? html.replace(pattern, replacement) : html;

// Keeps the prerendered shell on-brand while React boots, so users never see
// a white flash before the app replaces the static content.
const PRERENDER_STYLE = `
    <style>
      html, body { background: #0e0e10; color: #f3efeb; }
      .seo-prerender { max-width: 760px; margin: 0 auto; padding: 140px 24px 80px; line-height: 1.7; font-family: Roboto, system-ui, sans-serif; }
      .seo-prerender h1 { font-size: 34px; margin: 0 0 16px; }
      .seo-prerender h2 { font-size: 24px; margin: 28px 0 8px; }
      .seo-prerender h3 { font-size: 20px; margin: 24px 0 8px; }
      .seo-prerender p { margin: 12px 0; color: rgba(243, 239, 235, 0.7); }
      .seo-prerender ul { margin: 12px 0 12px 20px; }
      .seo-prerender a { color: #bbf298; }
    </style>`;

const injectSeo = (template, page) => {
  const canonical = `${BASE_URL}${page.path === "/" ? "/" : page.path}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const image = escapeHtml(absoluteUrl(page.image || "/og-image.png"));
  const type = escapeHtml(page.type || "website");
  const content = page.content || "";
  const schema = page.schema
    ? `\n    <script type="application/ld+json">${JSON.stringify(page.schema)}</script>`
    : "";

  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = setTag(
    html,
    /<meta\s+name="description"[\s\S]*?\/?>/,
    `<meta name="description" content="${description}" />`
  );
  html = setTag(
    html,
    /<link\s+rel="canonical"[\s\S]*?\/?>/,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`
  );
  html = setTag(html, /<meta\s+property="og:type"[\s\S]*?\/?>/, `<meta property="og:type" content="${type}" />`);
  html = setTag(html, /<meta\s+property="og:url"[\s\S]*?\/?>/, `<meta property="og:url" content="${escapeHtml(canonical)}" />`);
  html = setTag(html, /<meta\s+property="og:title"[\s\S]*?\/?>/, `<meta property="og:title" content="${title}" />`);
  html = setTag(html, /<meta\s+property="og:description"[\s\S]*?\/?>/, `<meta property="og:description" content="${description}" />`);
  html = setTag(html, /<meta\s+property="og:image"[\s\S]*?\/?>/, `<meta property="og:image" content="${image}" />`);
  html = setTag(html, /<meta\s+property="og:image:secure_url"[\s\S]*?\/?>/, `<meta property="og:image:secure_url" content="${image}" />`);
  html = setTag(html, /<meta\s+name="twitter:title"[\s\S]*?\/?>/, `<meta name="twitter:title" content="${title}" />`);
  html = setTag(html, /<meta\s+name="twitter:description"[\s\S]*?\/?>/, `<meta name="twitter:description" content="${description}" />`);
  html = setTag(html, /<meta\s+name="twitter:image"[\s\S]*?\/?>/, `<meta name="twitter:image" content="${image}" />`);
  html = html.replace("</head>", `${schema}${PRERENDER_STYLE}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  return html;
};

const writePage = (template, page) => {
  const outputDir = path.join(DIST_DIR, page.path === "/" ? "" : page.path);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), injectSeo(template, page));
};

const pageShell = ({ eyebrow, title, body, links = [] }) => `
<main class="seo-prerender">
  ${eyebrow ? `<p>${escapeHtml(eyebrow)}</p>` : ""}
  <h1>${escapeHtml(title)}</h1>
  ${body}
  ${links.length ? `<nav>${links.map((link) => `<a href="${link.href}">${escapeHtml(link.label)}</a>`).join(" ")}</nav>` : ""}
</main>`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "pod21",
  url: BASE_URL,
  logo: `${BASE_URL}/assets/logo.png`,
  description: "Full-service podcast and video podcast production for businesses, founders, and expert-led brands.",
};

async function prerender() {
  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
  const blogResponse = await client.getEntries({ content_type: "blogPost", limit: 1000 });
  const blogPosts = blogResponse.items.map((item) => {
    const text = plainTextFromRichText(item.fields.content);
    return {
      title: item.fields.title || "pod21 Blog",
      slug: item.fields.slug,
      date: item.fields.publishedDate || item.sys.updatedAt,
      image: item.fields.thumbnail?.fields?.file?.url || "/og-image.png",
      text,
      html: richTextToHtml(item.fields.content),
    };
  });

  const jobs = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "data", "jobs.json"), "utf8")
  );
  const openJobs = jobs.filter((job) => job.status === "open");

  const pages = [
    {
      path: "/",
      title: "Podcast Production Services for B2B Creators - pod21",
      description: "Professional podcast production services for businesses. We handle editing, hosting, promotion, and distribution. Launch your brand podcast today.",
      content: pageShell({
        eyebrow: "Full-service podcast content production",
        title: "Production under total control.",
        body: `<p>Pod21 runs podcast production for businesses, founders, and expert-led brands. We handle research, guest scheduling, recording support, editing, mastering, hosting, distribution, show notes, social clips, and promotion.</p>`,
        links: [
          { href: "/contact", label: "Start a podcast project" },
          { href: "/blog", label: "Read the podcast production blog" },
        ],
      }),
      schema: organizationSchema,
    },
    {
      path: "/about",
      title: "About pod21 - B2B Podcast Production Agency",
      description: "Learn how pod21 helps businesses launch and grow their podcasts. Our team specializes in podcast production, editing, and distribution.",
      content: pageShell({
        eyebrow: "About pod21",
        title: "A no-nonsense podcast production team.",
        body: `<p>Pod21 helps businesses and creators produce reliable, polished podcasts without carrying the production load in-house.</p>`,
        links: [{ href: "/contact", label: "Talk to pod21" }],
      }),
      schema: organizationSchema,
    },
    {
      path: "/contact",
      title: "Contact pod21 - Podcast Production Services",
      description: "Ready to launch your business podcast? Contact pod21 for a free consultation on podcast production, hosting, and distribution services.",
      content: pageShell({
        eyebrow: "Open a channel",
        title: "Let's talk.",
        body: `<p>Contact Pod21 to discuss podcast production, editing, hosting, distribution, video podcast workflows, and social clips.</p><p><a href="https://calendly.com/pod21/discoverycall">Book a free call</a></p>`,
      }),
      schema: organizationSchema,
    },
    {
      path: "/blog",
      title: "Podcast Production Blog - Tips for B2B Creators - pod21",
      description: "Expert articles on podcast production, editing, hosting, and distribution. Learn best practices for launching your business podcast.",
      content: pageShell({
        eyebrow: "The journal",
        title: "Podcast production articles from pod21.",
        body: `<ul>${blogPosts
          .map(
            (post) =>
              `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a><p>${escapeHtml(truncate(post.text, 120))}</p></li>`
          )
          .join("")}</ul>`,
      }),
      schema: organizationSchema,
    },
    {
      path: "/jobs",
      title: "Jobs at pod21 - Open Roles",
      description: "Open roles at pod21, a media production company making video podcasts and shortform video about Bitcoin and freedom technology.",
      content: pageShell({
        eyebrow: "Careers",
        title: "Join the crew.",
        body: `<ul>${openJobs
          .map(
            (job) =>
              `<li><a href="/jobs/${job.slug}">${escapeHtml(job.title)}</a><p>${escapeHtml(job.summary)}</p></li>`
          )
          .join("")}</ul>`,
      }),
      schema: organizationSchema,
    },
  ];

  blogPosts.forEach((post) => {
    pages.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} | pod21 Blog`,
      description: truncate(post.text || "Read this podcast production article from pod21."),
      type: "article",
      image: post.image,
      content: `<main class="seo-prerender"><article><p>Published ${escapeHtml(post.date)}</p><h1>${escapeHtml(post.title)}</h1>${post.html}</article></main>`,
      schema: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: truncate(post.text),
        image: absoluteUrl(post.image),
        datePublished: post.date,
        author: { "@type": "Organization", name: "pod21" },
        publisher: organizationSchema,
      },
    });
  });

  openJobs.forEach((job) => {
    pages.push({
      path: `/jobs/${job.slug}`,
      title: `${job.title} - Jobs at pod21`,
      description: job.summary,
      content: `<main class="seo-prerender"><article><h1>${escapeHtml(job.title)}</h1><p>${escapeHtml(job.summary)}</p>${jobToHtml(job)}</article></main>`,
      schema: {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: job.summary,
        datePosted: job.datePosted,
        validThrough: job.validThrough,
        hiringOrganization: organizationSchema,
        jobLocationType: "TELECOMMUTE",
        url: `${BASE_URL}/jobs/${job.slug}`,
      },
    });
  });

  pages.forEach((page) => writePage(template, page));
  console.log(`SEO prerendered ${pages.length} pages`);
}

prerender().catch((error) => {
  console.error("Error prerendering SEO pages:", error);
  process.exit(1);
});
