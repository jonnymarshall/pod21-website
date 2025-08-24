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
  image = "/hero-bg.png",
  type = "website",
  url,
}: SEOProps) => {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://pod21.xyz"; // fallback for SSR
  // const currentUrl = url || window.location.href;
  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : baseUrl);
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
