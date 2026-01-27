import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogPost } from "@/hooks/useBlogPost";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import moment from "moment";
import SEO from "@/components/SEO";

import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MoreArticles from "@/components/MoreArticles";
import {
  ArrowLeftSVG,
  FacebookSVG,
  TwitterSVG,
  LinkedInSVG,
} from "@/assets/icons";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: currentPost, isLoading, error } = useBlogPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = currentPost
      ? `${currentPost.title} | pod21`
      : "Blog Post | pod21";
  }, [currentPost]);

  // Social sharing functionality
  const handleSocialShare = (platform: string) => {
    if (!currentPost) return;

    const currentUrl = window.location.href;
    const title = encodeURIComponent(currentPost.title);
    const description = encodeURIComponent(
      currentPost.contentText?.substring(0, 100) || ""
    );

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="pt-[150px] pb-[100px] bg-bgPrimary min-h-screen">
          <div className="container max-w-4xl mx-auto px-side-spacing-mobile md:px-side-spacing-tablet lg:px-0">
            <div className="animate-pulse">
              <div className="h-8 bg-bgSecondary rounded-md w-2/3 mb-8"></div>
              <div className="h-12 bg-bgSecondary rounded-md w-full mb-6"></div>
              <div className="h-4 bg-bgSecondary rounded-md w-1/2 mb-12"></div>
              <div className="h-80 bg-bgSecondary rounded-xl mb-12"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 bg-bgSecondary rounded-md w-full"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !currentPost) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-bgPrimary">
          <div className="text-center">
            <h1 className="text-h2 text-boneWhite mb-4">Blog Post Not Found</h1>
            <p className="text-body-lg text-textBody mb-6">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Link to="/blogs" className="inline-block">
              <button className="bg-primary-100 text-carbonBlack rounded-full px-6 py-3 flex items-center gap-2">
                <ArrowLeftSVG size={16} />
                Back to Blog
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Define rich text rendering options
  const renderOptions = {
    renderMark: {},
    renderNode: {},
  };

  // Render the content properly
  const renderContent = () => {
    if (!currentPost.content) {
      return <div className="text-textBody">No content available</div>;
    }

    // Check if content is a string (which would be wrong)
    if (typeof currentPost.content === "string") {
      return <div className="text-textBody">{currentPost.content}</div>;
    }

    // If the content is properly structured as a Contentful rich text document
    try {
      return documentToReactComponents(currentPost.content, renderOptions);
    } catch (e) {
      console.error("Error rendering rich text:", e);
      return (
        <div className="text-textBody">
          {currentPost.contentText || "Content rendering error"}
        </div>
      );
    }
  };

  // Generate meta description from content
  const metaDescription =
    currentPost?.contentText?.substring(0, 160) ||
    "Read our latest blog post on pod21";

  return (
    <>
      {currentPost && (
        <SEO
          title={`${currentPost.title} | pod21`}
          description={currentPost.contentText?.substring(0, 160)}
          image={currentPost.coverImage}
          type="article"
        />
      )}
      <Navbar />
      <div className="pt-[150px] pb-[100px] bg-bgPrimary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container max-w-4xl mx-auto px-side-spacing-mobile md:px-side-spacing-tablet lg:px-0"
        >
          {/* Back to blog link */}
          <Link
            to="/blogs"
            className="inline-flex flex-row items-center mb-[28px] gap-3 transition-colors cursor-pointer"
          >
            <div className="bg-bgSecondary p-2 rounded-lg border border-stroke">
              <ArrowLeftSVG className="h-4 w-4 " color="#f3efeb" />
            </div>
            <p className="text-boneWhite text-body-sm-medium hover:text-primary-100">
              Go Back
            </p>
          </Link>

          {/* Blog post header */}
          <div className="flex flex-wrap items-center gap-2 text-textBody text-body-sm mb-4">
            Published Date:
            <span className="text-boneWhite">
              {moment(currentPost?.publishedDate).format("LL")}
            </span>
          </div>

          {/* Featured image */}
          <div className="w-full h-[400px] rounded-xl overflow-hidden">
            <img
              src={currentPost?.coverImage}
              alt={currentPost?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-h2 lg:text-h1 text-boneWhite mt-[60px] mb-4">
            {currentPost?.title}
          </h1>

          {/* Blog content */}
          <article className="prose prose-lg max-w-none">
            {renderContent()}
          </article>

          {/* Share blog post */}
          <div className="mt-12 bg-bgSecondary p-6 border border-stroke rounded-lg gap-8 flex flex-col items-start md:flex-row md:items-center">
            <p className="text-body-lg-semiBold text-boneWhite">
              Share this Blog to:
            </p>
            <div className="flex flex-row items-center gap-8">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => handleSocialShare("facebook")}
              >
                <FacebookSVG color="#bbf298" className="h-8 w-8" />
                <p className="text-boneWhite text-body-sm">Facebook</p>
              </div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => handleSocialShare("twitter")}
              >
                <TwitterSVG color="#bbf298" className="h-8 w-8" />
                <p className="text-boneWhite text-body-sm">Twitter</p>
              </div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => handleSocialShare("linkedin")}
              >
                <LinkedInSVG color="#bbf298" className="h-8 w-8" />
                <p className="text-boneWhite text-body-sm">LinkedIn</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <MoreArticles />
      <Contact />
      <Footer />
    </>
  );
};

export default BlogPost;
