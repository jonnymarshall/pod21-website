import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRightSVG } from "@/assets/icons";
import { useBlogs } from "@/hooks/useBlogs";
import { getPlainTextFromContent } from "@/types/blog";
import { Helmet } from "react-helmet-async";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { Button, RotatingIcon } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const { blogPosts, isLoading, isError, featuredPost } = useBlogs();

  // Calculate total pages
  const totalPages = Math.ceil((blogPosts?.length || 0) / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Get plain text content for featured post
  const featuredPostSummary = getPlainTextFromContent(featuredPost.content);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle page change without scrolling
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById("blogs-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <SEO 
        title="Podcast Blog - Pod21"
        description="Read the latest articles about podcast production, tips and industry insights from Pod21."
      />
      <Navbar />

      <section
        className={cn(
          "relative pb-side-spacing pt-[218px] bg-bgPrimary",
          "px-side-spacing-mobile md:px-side-spacing-tablet lg:px-side-spacing"
        )}
      >
        {/* Featured Blog Post */}
        {isError ? (
          <div className="text-center py-10">
            <h2 className="text-h3 text-boneWhite mb-4">
              Error Loading Blog Posts
            </h2>
            <p className="text-textBody">
              Unable to load blog posts. Please try again later.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-[120px]">
              <div
                className={cn(
                  "relative w-full rounded-lg overflow-hidden",
                  "h-[240px] md:h-[340px]"
                )}
              >
                {isLoading ? (
                  <div className="animate-pulse bg-bgSecondary rounded-xl h-full w-full" />
                ) : (
                  <>
                    <img
                      src={featuredPost.thumbnail}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </>
                )}
              </div>

              {!isLoading && (
                <div className="flex flex-col justify-center">
                  <h1 className="text-h2 text-boneWhite mb-7">
                    {featuredPost.title}
                  </h1>
                  <p className="text-textBody text-body-lg mb-6">
                    {featuredPostSummary.substring(0, 200)}
                    {featuredPostSummary.length > 200 ? "..." : ""}
                  </p>
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Button
                      variant="default"
                      size="md"
                      className="self-start"
                      disabled={isLoading}
                    >
                      Read more
                      <RotatingIcon>
                        <ArrowRightSVG width={14} height={10} />
                      </RotatingIcon>
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Blog Grid */}
            <div
              id="blogs-grid"
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[20px]"
            >
              {isLoading ? (
                // Show loading state
                [...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-bgSecondary rounded-xl h-[240px]"
                  />
                ))
              ) : currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <BlogCard
                    disabled={isLoading}
                    key={post.id}
                    title={post.title}
                    image={post.thumbnail}
                    summary={
                      getPlainTextFromContent(post.content).substring(0, 100) +
                      "..."
                    }
                    category={post.publishedDate}
                    slug={post.slug}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <h2 className="text-h3 text-boneWhite mb-4">
                    No Blog Posts Found
                  </h2>
                  <p className="text-textBody">
                    Check back later for new content!
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!isLoading && blogPosts.length > 0 && (
              <div className="mt-16">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            handlePageChange(currentPage - 1);
                          }
                        }}
                        className={`${
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        } bg-transparent hover:bg-transparent !text-body-sm-medium text-boneWhite hover:text-boneWhite border-stroke`}
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i + 1);
                          }}
                          isActive={currentPage === i + 1}
                          className={`${
                            currentPage === i + 1
                              ? "bg-primary-100 text-bgPrimary hover:text-bgPrimary"
                              : "bg-transparent text-boneWhite border-stroke hover:text-boneWhite"
                          } cursor-pointer !text-body-sm-medium hover:text-boneWhite`}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <PaginationItem>
                          <span className="px-2 text-boneWhite">...</span>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(totalPages);
                            }}
                            className="bg-transparent text-boneWhite !text-body-sm-medium border-stroke cursor-pointer hover:text-boneWhite"
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) {
                            handlePageChange(currentPage + 1);
                          }
                        }}
                        className={`${
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        } bg-transparent hover:bg-transparent !text-body-sm-medium text-boneWhite hover:text-boneWhite border-stroke`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </section>

      <Contact />
      <Footer />
    </>
  );
};

export default Blogs;
