import { useQuery } from "@tanstack/react-query";
import client from "@/configs/contentfulClient";
import type { BlogPost } from "@/types/blog";

const mapContentfulBlogPost = (item): BlogPost => {
  return {
    id: item.sys.id || "",
    title: item.fields.title || "",
    slug: item.fields.slug || "",
    thumbnail: item.fields.thumbnail?.fields?.file?.url
      ? `https:${item.fields.thumbnail.fields.file.url}`
      : "/placeholder.svg",
    content: item.fields.content || "",
    publishedDate: item.fields.publishedDate || "",
    isFeatured: item.fields.isFeatured || false,
  };
};

export const useContentfulBlogPosts = () => {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      try {
        const response = await client.getEntries({
          content_type: "blogPost",
        });
        return response.items.map(mapContentfulBlogPost);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        return [];
      }
    },
  });
};
