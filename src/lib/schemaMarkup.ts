/**
 * Schema Markup Generator for JSON-LD Structured Data
 * Helps with SEO by providing structured data for Google, Bing, etc.
 */

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint?: {
    "@type": string;
    contactType: string;
    telephone: string;
  };
  address?: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

export interface ArticleSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: {
    "@type": string;
    name: string;
  };
  publisher?: {
    "@type": string;
    name: string;
    logo?: {
      "@type": string;
      url: string;
    };
  };
}

export interface BreadcrumbSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate Organization Schema
 */
export const generateOrganizationSchema = (
  baseUrl: string = "https://pod21.xyz"
): OrganizationSchema => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "pod21",
    url: baseUrl,
    logo: `${baseUrl}/assets/logo.png`,
    description:
      "Professional podcast production services including editing, hosting, promotion and more.",
    sameAs: [
      "https://twitter.com/pod21",
      "https://www.linkedin.com/company/pod21",
      "https://www.facebook.com/pod21",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+1-XXX-XXX-XXXX", // Update with actual phone
    },
  };
};

/**
 * Generate Article Schema for Blog Posts
 */
export const generateArticleSchema = (
  article: {
    title: string;
    description: string;
    image: string;
    publishedDate: string;
    modifiedDate?: string;
    author?: string;
  },
  baseUrl: string = "https://pod21.xyz"
): ArticleSchema => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.image.startsWith("http")
      ? article.image
      : `${baseUrl}${article.image}`,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "pod21",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/logo.png`,
      },
    },
  };
};

/**
 * Generate Breadcrumb Schema
 */
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>,
  baseUrl: string = "https://pod21.xyz"
): BreadcrumbSchema => {
  const items = breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.url.startsWith("http") ? crumb.url : `${baseUrl}${crumb.url}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
};

/**
 * Generate WebPage Schema
 */
export const generateWebPageSchema = (
  page: {
    title: string;
    description: string;
    url: string;
  },
  baseUrl: string = "https://pod21.xyz"
): Record<string, unknown> => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: page.url.startsWith("http") ? page.url : `${baseUrl}${page.url}`,
    isPartOf: {
      "@type": "WebSite",
      name: "pod21",
      url: baseUrl,
    },
  };
};

/**
 * Generate LocalBusiness Schema (if applicable)
 */
export const generateLocalBusinessSchema = (
  baseUrl: string = "https://pod21.xyz"
): Record<string, unknown> => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "pod21",
    url: baseUrl,
    logo: `${baseUrl}/assets/logo.png`,
    description:
      "Professional podcast production services including editing, hosting, promotion and more.",
    image: `${baseUrl}/og-image.png`,
    telephone: "+1-XXX-XXX-XXXX", // Update with actual phone
    sameAs: [
      "https://twitter.com/pod21",
      "https://www.linkedin.com/company/pod21",
      "https://www.facebook.com/pod21",
    ],
  };
};
