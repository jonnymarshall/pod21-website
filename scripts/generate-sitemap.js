/**
 * Generate Sitemap with Dynamic Blog Posts
 * 
 * This script fetches blog posts from Contentful and generates a complete sitemap.xml
 * Run this before building for production: `node scripts/generate-sitemap.js`
 */

import { createClient } from "contentful";
import fs from "fs";
import path from "path";

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const BASE_URL = process.env.VITE_BASE_URL || "https://pod21.xyz";

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

async function generateSitemap() {
  try {
    console.log("Fetching blog posts from Contentful...");
    
    // Fetch all blog posts
    const response = await client.getEntries({
      content_type: "blog",
      limit: 1000,
    });

    const now = new Date().toISOString().split("T")[0];

    // Static pages
    const staticPages = [
      {
        loc: BASE_URL,
        lastmod: now,
        priority: "1.0",
      },
      {
        loc: `${BASE_URL}/about`,
        lastmod: now,
        priority: "0.9",
      },
      {
        loc: `${BASE_URL}/blog`,
        lastmod: now,
        priority: "0.9",
      },
      {
        loc: `${BASE_URL}/contact`,
        lastmod: now,
        priority: "0.8",
      },
    ];

    // Dynamic blog posts
    const blogPages = response.items.map((item) => ({
      loc: `${BASE_URL}/blog/${item.fields.slug}`,
      lastmod: item.sys.updatedAt.split("T")[0],
      priority: "0.7",
    }));

    const allPages = [...staticPages, ...blogPages];

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    allPages.forEach((page) => {
      xml += "  <url>\n";
      xml += `    <loc>${page.loc}</loc>\n`;
      xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += "  </url>\n";
    });

    xml += "</urlset>";

    // Write to public directory
    const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
    fs.writeFileSync(outputPath, xml);

    console.log(`✅ Sitemap generated successfully with ${allPages.length} URLs`);
    console.log(`📍 Saved to: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

generateSitemap();
