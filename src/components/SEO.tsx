import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
}

const SEO = ({
  title = "Pod21 - Professional Podcast Production",
  description = "Pod21 - Professional podcast production services including editing, hosting, promotion and more. Take your podcast to the next level with pod21.",
  image = "/assets/logo.png",
  type = "website",
  url,
}: SEOProps) => {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://pod21.xyz"; // Fallback for SSR
  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : baseUrl);

  // Ensure image URL is absolute and includes cache-busting
  const timestamp = Date.now();
  let imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
  imageUrl += image.includes("?") ? `&v=${timestamp}` : `?v=${timestamp}`;

  // Debug logging
  if (typeof window !== "undefined") {
    console.log("SEO Meta Tags Generated:");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Base URL:", baseUrl);
    console.log("Image URL:", imageUrl);
    console.log("Current URL:", currentUrl);
  }

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="podcast, podcast production, podcast editing, podcast hosting, podcast promotion"
      />
      <meta name="author" content="pod21" />
      <link rel="canonical" href={currentUrl} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Pod21 Logo - Professional Podcast Production"
      />
      <meta property="og:site_name" content="Pod21" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:url" content={imageUrl} />
      <meta property="og:determiner" content="the" />
      <meta property="og:updated_time" content={new Date().toISOString()} />

      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@pod21" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta
        name="twitter:image:alt"
        content="Pod21 Logo - Professional Podcast Production"
      />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />

      {/* <!-- Additional meta tags --> */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;
