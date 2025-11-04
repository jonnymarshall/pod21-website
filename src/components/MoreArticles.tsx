import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useBlogs } from "@/hooks/useBlogs";
import BlogCard from "./BlogCard";
import { Button, RotatingIcon } from "./ui/button";
import { getPlainTextFromContent } from "@/types/blog";
import { ArrowRightSVG } from "@/assets/icons";

const MoreArticles = () => {
  const { slug } = useParams<{ slug: string }>();
  const [titleRef, isTitleInView] = useInView({
    threshold: 0.2,
  });
  const { blogPosts, isLoading } = useBlogs();

  // Filter out current blog and get 4 random posts
  const relatedPosts = blogPosts
    .filter((post) => post.slug !== slug)
    .slice(0, 4);

  return (
    <section id="more-articles" className="bg-bgSecondary">
      <div
        className={cn(
          "relative py-side-spacing overflow-hidden flex flex-col items-center max-w-[1440px] mx-auto",
          "px-side-spacing-mobile md:px-side-spacing-tablet "
        )}
      >
        {/* Background diagonal stripes - top left */}
        <div className="absolute -top-[90px] -left-[60px] w-[224px] h-[300px] opacity-20">
          <img
            src="/straight-lines.png"
            alt="Background pattern"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Background diagonal stripes - bottom right */}
        <div className="absolute -bottom-[90px] -right-[60px] w-[224px] h-[300px] opacity-20">
          <img
            src="/straight-lines.png"
            alt="Background pattern"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mx-auto relative z-10 mb-[60px]">
          {/* Heading */}
          <div
            ref={titleRef}
            className={cn(
              "text-center mb-12 transition-all duration-1000",
              isTitleInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <h2 className="text-h2 text-boneWhite">
              More <span className="text-primary-100">articles</span> you may
              like
            </h2>
            <p className="text-body-lg text-textBody mt-4">
              Discover insightful articles on podcasting, marketing, growth, and
              success tips!
            </p>
          </div>

          {/* Blog Cards Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  image={post.thumbnail}
                  summary={
                    getPlainTextFromContent(post.content).substring(0, 150) +
                    "..."
                  }
                  slug={post.slug}
                />
              ))}
            </div>
          )}
        </div>
        <Link to="/blogs">
          <Button variant="default" size="md">
            See all articles
            <RotatingIcon>
              <ArrowRightSVG width={14} height={10} />
            </RotatingIcon>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default MoreArticles;
