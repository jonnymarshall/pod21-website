# Pod21 Website Roadmap

This file keeps the current plan visible across AI sessions and future PRs.

## Current Priority

Improve Pod21's organic search visibility by fixing crawler/indexing issues first, then making key pages easier for Google and AI search tools to read.

## Recently Addressed

- Fixed blog crawler handling so Googlebot and Bingbot are not routed through the social-preview fallback page.
- Regenerated the sitemap with current blog and jobs URLs.
- Updated the sitemap generator so local builds can use the existing local environment setup.
- Added `.ai-handoff/` as an ignored folder for temporary files shared with AI tools.
- Added build-time prerendering for key pages (home, about, contact, blog index, each blog post, jobs index, each job post) so real HTML, meta tags, and schema are present before JavaScript runs.
- Verified live production serves that prerendered HTML, and that it wins over the SPA catch-all rewrite (Vercel checks the filesystem before rewrites).

## Next Steps

1. In Google Search Console, submit the sitemap and request indexing for the homepage and a few blog posts.
2. Create dedicated service landing pages for high-intent searches:
   - `/podcast-production`
   - `/podcast-editing`
   - `/video-podcast-production`
   - `/podcast-launch-service`
   - `/podcast-distribution`
   - `/social-clips-for-podcasts`
4. Add FAQ schema to the visible FAQ sections.
5. Improve Organization schema with real social links and contact details.
6. Add `llms.txt` for AI search/readability support.
7. Review bundle size and reduce JavaScript where practical.
8. Move `middleware.js` off Vercel's deprecated edge runtime to the Node.js runtime (build warning).

## Known Tradeoff

Prerendered pages show a brief on-brand static view before React replaces it. This is a loading-state compromise, not a bug. The longer-term fix is proper static generation or server rendering, which is the Astro/Next.js consideration below.

## Later Consideration

Evaluate moving the marketing/content side of the site to Astro or Next.js once the urgent SEO fixes and prerendering work are done.

Astro may be the best fit if the site stays mostly marketing pages and articles. Next.js may be better if the site becomes more app-like.

## AI Handoff Folder

Use `.ai-handoff/` for temporary files you want AI tools to inspect or work from. The folder is ignored by Git, so files placed there should not be committed.
