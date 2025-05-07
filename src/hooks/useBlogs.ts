
import { useContentfulBlogPosts } from "./useContentfulBlogPosts";

export const useBlogs = () => {
  const { data: blogPosts = [], isLoading, isError } = useContentfulBlogPosts();
  
  const featuredPost = blogPosts.find(post => post.isFeatured) || blogPosts[0] || {
    id: "",
    title: "Loading...",
    thumbnail: "/placeholder.svg",
    content: "",
    slug: "",
    publishedDate: "",
    isFeatured: false
  };

  return {
    blogPosts,
    isLoading,
    isError,
    featuredPost
  };
};
