import { useQuery } from "@tanstack/react-query";
import client from "@/configs/contentfulClient";
import { Entry } from "contentful";
import { getPlainTextFromContent } from "@/types/blog";

interface ContentfulBlogPost {
  id: string;
  title: string;
  publishedDate: string;
  author: string;
  coverImage: string;
  readTime: string;
  content: any;
  contentText: string;
}

export const useBlogPost = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      try {
        if (!slug) return null;

        const response = await client.getEntries({
          content_type: "blogPost",
          "fields.slug": slug,
          limit: 1,
        });

        if (!response.items || response.items.length === 0) {
          return null;
        }

        const post = response.items[0] as Entry<any>;
        if (!post || !post.fields) {
          return null;
        }

        let coverImageUrl = "/placeholder.svg";

        // Improved type checking for accessing nested properties
        if (
          post.fields.thumbnail &&
          typeof post.fields.thumbnail === "object" &&
          "fields" in post.fields.thumbnail
        ) {
          const thumbnailFields = post.fields.thumbnail.fields;

          if (
            thumbnailFields &&
            typeof thumbnailFields === "object" &&
            "file" in thumbnailFields
          ) {
            const file = thumbnailFields.file;

            if (file && typeof file === "object" && "url" in file) {
              coverImageUrl = `https:${file.url}`;
            }
          }
        }

        return {
          id: post.sys.id,
          title: post.fields.title || "",
          publishedDate: post.fields.publishedDate || "",
          coverImage: coverImageUrl,
          content: post.fields.content || "",
          contentText: getPlainTextFromContent(post.fields.content || ""),
        } as ContentfulBlogPost;
      } catch (err) {
        console.error("Error fetching blog post:", err);
        return null;
      }
    },
    enabled: !!slug,
  });
};
