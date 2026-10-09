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

1. Create dedicated service landing pages for high-intent searches:
   - `/podcast-production`
   - `/podcast-editing`
   - `/video-podcast-production`
   - `/podcast-launch-service`
   - `/podcast-distribution`
   - `/social-clips-for-podcasts`
2. Add FAQ schema to the visible FAQ sections.
3. Improve Organization schema with real social links and contact details.
4. Add `llms.txt` for AI search/readability support.
5. Review bundle size and reduce JavaScript where practical.
6. Move `middleware.js` off Vercel's deprecated edge runtime to the Node.js runtime (build warning).

## Google Search Console

Setup done:
- Sitemap submitted as the full URL `https://pod21.xyz/sitemap.xml`. The short form `sitemap.xml` was rejected by the form.
- The sitemap lists all 12 URLs, including all 6 blog posts.
- Manual "Request indexing" was used on the homepage and two blog posts only.

Why the sitemap matters more than manual requests:
- The sitemap is the master list. It tells Google about every URL, so no per-page action is needed.
- "Request indexing" is a limited nudge (roughly ten a day; Google does not publish the exact number). It is for a few priority pages, not every page.

Check-in about a week later:
- Open Indexing > Pages. Report any blog posts still stuck as "Discovered" or "Crawled, not indexed".
- The earlier "Page with redirect" note was for `http://pod21.xyz/` and is expected. Leave it.

## Owner Actions (no code needed)

Roughly in priority order:

1. Google Business Profile, only if eligible (see notes below).
2. Third-party reviews (owner, do later): set up or claim profiles on Clutch, Trustpilot, and LinkedIn, then ask clients to leave reviews there. On-site testimonials are already collected from all clients.
3. Buyer-intent articles: write pages that match what people search when choosing a provider, for example "How much does podcast production cost", "Podcast agency vs freelancer", and "How to choose a podcast production company".
4. Case studies: write up a few client projects (the problem, what Pod21 did, the result). Real experience is a trust signal for both Google and buyers.
5. Directory and list placements: get listed in podcast industry directories and "best podcast production agencies" listicles. These are realistic first backlinks.
6. Internal links: from each blog post, link naturally to the contact page and, once built, the service pages.

Expect backlinks and rankings to take weeks to months. The fastest owner-side wins are the Google Business Profile, reviews, and buyer-intent content.

### Google Business Profile notes

- Eligibility: Google expects a business to either have a location customers can visit, or to travel to customers (a service-area business). A fully remote, online-only business does not clearly fit either, so a profile can be rejected or suspended.
- Do not use a registered-agent, accountant, or virtual-office address just to get listed. That is a common cause of suspension, and verification often fails.
- If Pod21 has a real place where work happens (even a home setup used for recording), it can be used, but expect video verification showing the actual space and equipment. The address can be hidden while still setting service areas.
- Accounts: any Google Account can own a profile, including a personal one. Simplest is the account already used for Search Console, then add the business email as a second owner so access is not tied to one person.
- Value for a remote business is mainly the brand panel and reviews, not local map rankings, because buyers search nationally rather than locally.
- If not eligible, put the effort into reviews elsewhere instead (Clutch, Trustpilot, LinkedIn, and on-site testimonials).

## Known Tradeoff

Prerendered pages show a brief on-brand static view before React replaces it. This is a loading-state compromise, not a bug. The longer-term fix is proper static generation or server rendering, which is the Astro/Next.js consideration below.

## Later Consideration

Evaluate moving the marketing/content side of the site to Astro or Next.js once the urgent SEO fixes and prerendering work are done.

Astro may be the best fit if the site stays mostly marketing pages and articles. Next.js may be better if the site becomes more app-like.

## AI Handoff Folder

Use `.ai-handoff/` for temporary files you want AI tools to inspect or work from. The folder is ignored by Git, so files placed there should not be committed.
