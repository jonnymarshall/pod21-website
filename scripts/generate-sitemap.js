/**
 * Generate Sitemap with Dynamic Blog Posts
 * 
 * This script fetches blog posts from Contentful and generates a complete sitemap.xml
 * Run this before building for production: `node scripts/generate-sitemap.js`
 */

import pkg from "contentful";
const { createClient } = pkg;
import fs from "fs";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

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
      content_type: "blogPost",
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
      {
        loc: `${BASE_URL}/jobs`,
        lastmod: now,
        priority: "0.6",
      },
    ];

    // Job listings (read from the same JSON the site renders)
    const jobs = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "src", "data", "jobs.json"), "utf8")
    );
    const jobPages = jobs
      .filter((job) => job.status === "open")
      .map((job) => ({
        loc: `${BASE_URL}/jobs/${job.slug}`,
        lastmod: job.datePosted,
        priority: "0.6",
      }));

    // Dynamic blog posts
    const blogPages = response.items.map((item) => ({
      loc: `${BASE_URL}/blog/${item.fields.slug}`,
      lastmod: item.sys.updatedAt.split("T")[0],
      priority: "0.7",
    }));

    const allPages = [...staticPages, ...jobPages, ...blogPages];

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
