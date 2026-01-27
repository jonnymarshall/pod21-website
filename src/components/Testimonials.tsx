import { Button, RotatingIcon } from "./ui/button";
import { ArrowRightSVG, ArrowLeftSVG } from "@/assets/icons";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const Testimonials = () => {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.2 });
  const [testimonialsRef, isTestimonialsInView] = useInView({ threshold: 0.2 });
  const [ctaRef, isCtaInView] = useInView({ threshold: 0.2 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth / 2;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth / 2;
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  const testimonials = [
    {
      avatar: "/nvk.png",
      name: "NVK",
      title: "CEO of Coinkite",
      quote:
        "NVK wanted to launch a podcast as a passion project for the Bitcoin community, but as a busy entrepreneur, he couldn’t afford to get bogged down in production. He handed off the entire process to us—and 90+ episodes later, his podcast remains one of the most respected in the space. The production quality skyrocketed, and we even launched a popular newsletter to expand its reach. Best of all? NVK never had to step away from running his business to make it happen.",
    },
    {
      avatar: "/swan.png",
      name: "Guy Swann",
      title: "Host of Bitcoin Audible",
      quote:
        "As one of Bitcoin’s most respected voices, Guy Swann built a powerhouse podcast. But as his influence grew, so did his commitments - investing, speaking engagements, and most importantly - family time. He brought us in to handle production, freeing him up to focus on what matters most. While we worked on production, including a newly created and highly popular episode series, Guy was able to focus on the bigger picture with his newfound time, ultimately securing several sponsorships which fund all of our production costs, and then some. All this while maintaining top-tier quality.",
    },
    {
      avatar: "/placeholder.svg",
      name: "Jordan Guess & Wyatt O'Rourke",
      title: "Hosts of Bitcoin for Financial Services Podcast",
      quote:
        "As active practitioners running their own CPA and Wealth Management firms, Jordan and Wyatt are more than just commentators—they're leaders in bridging the gap between traditional finance and Bitcoin. They recognized that a podcast was a must-have in their arsenal of communication tools to spread their message, but they couldn't afford to get lost in the complexities of podcasting, which would take time away from their core businesses. They turned to pod21 to design, launch and manage the Bitcoin for Financial Services Podcast. The result? A consistent, professional-grade weekly show built from scratch that establishes their authority, offers exposure for their businesses, and drives attendance to their annual Summit—all without them ever having to trade their spreadsheets for soundboards!",
    },
  ];

  return (
    <section id="testimonials" className={cn("relative bg-bgPrimary ", "")}>
      <div className="relative max-w-[1440px] mx-auto overflow-hidden px-side-spacing-mobile md:px-side-spacing-tablet  py-side-spacing  scroll-mt-[120px] ">
        {/* Background diagonal stripes - bottom right */}
        <div className="absolute -bottom-[90px] -right-[56px] w-[440px] h-[330px] opacity-20">
          <img
            src="/arrow-lines.png"
            alt="Background pattern"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="relative z-10">
          <div
            ref={titleRef}
            className={cn(
              "text-center transition-all duration-1000",
              isTitleInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <h2 className="text-h2">
              Real podcasts, real{" "}
              <span className="text-primary-100">results</span>
            </h2>
            <p className="text-base text-textBody mt-4">
              Creating a podcast is hard. Keeping one alive is even harder. 95%
              of podcasts don't make it past 21 episodes. With our help, you
              don't have to be a statistic. Here's how we've turned things
              around for our clients.
            </p>
          </div>

          <div
            ref={testimonialsRef}
            className={cn(
              "mt-[66px] transition-all duration-1000 relative",
              isTestimonialsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide -mx-side-spacing-mobile md:-mx-side-spacing-tablet scroll-smooth snap-x snap-mandatory"
              onScroll={checkScrollButtons}
              onWheel={(e) => {
                // Enable horizontal scrolling with vertical mouse wheel
                if (e.deltaY !== 0 && scrollContainerRef.current) {
                  e.preventDefault();
                  scrollContainerRef.current.scrollLeft += e.deltaY;
                }
              }}
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex gap-8 px-side-spacing-mobile md:px-side-spacing-tablet pb-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-6 flex-shrink-0 w-full md:w-[calc(50%-16px)] snap-start"
                    style={{
                      transitionDelay: `${index * 200}ms`,
                      opacity: isTestimonialsInView ? 1 : 0,
                      transform: isTestimonialsInView
                        ? "translateY(0)"
                        : "translateY(20px)",
                      transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                    }}
                  >
                    <div className="w-40 h-40 rounded-full overflow-hidden">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-body-lg-medium mt-6">{testimonial.name}</p>
                    <p className="text-base text-textBody mt-2">
                      {testimonial.title}
                    </p>
                    <blockquote className="text-body-lg italic mt-8 leading-relaxed">
                      {testimonial.quote}
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Positioned at bottom to avoid overlapping text */}
            <div className="flex justify-center items-center gap-4 -mt-6">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full bg-bgPrimary border border-stroke flex items-center justify-center hover:bg-bgSecondary transition-all shadow-lg",
                  canScrollLeft
                    ? "opacity-100 cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                )}
                aria-label="Scroll left"
              >
                <ArrowLeftSVG width={20} height={20} className="text-boneWhite" />
              </button>

              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full bg-bgPrimary border border-stroke flex items-center justify-center hover:bg-bgSecondary transition-all shadow-lg",
                  canScrollRight
                    ? "opacity-100 cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                )}
                aria-label="Scroll right"
              >
                <ArrowRightSVG width={20} height={20} className="text-boneWhite" />
              </button>
            </div>
          </div>

          {/* Call to action */}
          <div
            ref={ctaRef}
            className={cn(
              "text-center transition-all duration-1000 delay-200 mt-[60px]",
              isCtaInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <p className="text-base text-textBody mb-4">
              Want to launch, scale, or streamline your podcast?
            </p>
            <Link to="/contact">
              <Button variant="default" size="md">
                Get in touch
                <RotatingIcon>
                  <ArrowRightSVG width={14} height={10} />
                </RotatingIcon>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
