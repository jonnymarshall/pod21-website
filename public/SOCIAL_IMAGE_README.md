# Social share image (fixes Twitter/WhatsApp/Facebook preview)

## Why the preview shows no image
The current logo (`assets/logo.png`) is **72 x 40 pixels**.  
Twitter and other platforms require the preview image to be at least **300 x 157 px** (they recommend **1200 x 628**). Smaller images are ignored and a placeholder is shown.

## What you need to provide

1. **One image file** that will be used when someone shares https://pod21.xyz

2. **Requirements**
   - **Size:** 1200 x 630 pixels (or 1200 x 628)
   - **Format:** PNG or JPG
   - **File size:** Under 300 KB (important for WhatsApp)
   - **Content:** Your pod21 logo + tagline on a dark background (e.g. “pod21 - Professional Podcast Production”)

3. **Where to put it**
   - Save the file as: **`og-image.png`** (or **`og-image.jpg`**)
   - Place it in the **`public`** folder (same level as `index.html`)

4. **After you add the file**
   - Tell me the exact filename you used (`og-image.png` or `og-image.jpg`).
   - I’ll point the site’s meta tags to that file.
   - Then deploy and refresh the preview:
     - Twitter: https://cards-dev.twitter.com/validator → enter https://pod21.xyz/ → “Preview card”
     - Facebook: https://developers.facebook.com/tools/debug/ → enter URL → “Scrape Again”

## Quick way to create the image
- Use Canva (e.g. “Facebook Post” or “Open Graph” 1200x630), Figma, or any design tool.
- Export as PNG or JPG, under 300 KB.
- Name it `og-image.png` or `og-image.jpg` and put it in `public/`.
