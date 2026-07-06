import { ArrowRightSVG, ArrowLeftSVG } from "@/assets/icons";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

const Testimonials = () => {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.2 });
  const [testimonialsRef, isTestimonialsInView] = useInView({ threshold: 0.2 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // Ignore the carousel's leading/trailing side padding so the first card
      // reads as "at the start" (left disabled) and the last as "at the end"
      // (right disabled), on both the centred mobile and start-aligned desktop
      // layouts.
      const edgeTolerance = 48;
      setCanScrollLeft(scrollLeft > edgeTolerance);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - edgeTolerance);
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

  // Measure the actual width of one card (plus the flex gap) so each tap
  // advances exactly one testimonial on both mobile (one-up) and desktop
  // (two-up). Using clientWidth/2 previously under-scrolled on mobile, so it
  // took several taps to move a single card into view.
  const getScrollStep = () => {
    const container = scrollContainerRef.current;
    if (!container) return 0;
    const card = container.querySelector<HTMLElement>(
      "[data-testimonial-card]"
    );
    const gap = 32; // gap-8
    return card ? card.offsetWidth + gap : container.clientWidth;
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -getScrollStep(),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: getScrollStep(),
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
      avatar: "/bffs.png",
      name: "Jordan Guess & Wyatt O'Rourke",
      title: "Hosts of Bitcoin for Financial Services Podcast",
      quote:
        "As active practitioners running CPA and Wealth Management firms, Jordan and Wyatt bridge the gap between traditional finance and Bitcoin. Recognizing a podcast was essential to their message, they needed a solution that wouldn't distract from their core businesses. They partnered with pod21 to design, launch, and manage the Bitcoin for Financial Services Podcast. The result is a professional weekly show that establishes authority, provides business exposure, and drives attendance to their annual Summit - all without them ever having to trade their spreadsheets for soundboards!",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative border-t border-stroke bg-bgPrimary"
    >
      <div className="relative max-w-[1440px] mx-auto overflow-hidden px-side-spacing-mobile md:px-side-spacing-tablet  py-side-spacing  scroll-mt-[120px] ">
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
            <p id="testimonials--eyebrow" className="eyebrow mb-6">
              07 <span className="slash-sep">{"//"}</span> Client spotlight
            </p>
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
            {/* Two deliberate choices here:
                - scroll-behavior stays default (auto): a CSS "smooth" fought the
                  scroll-snap and stalled our programmatic scrolls partway, so we
                  drive the smooth animation from JS instead.
                - snap-proximity (not mandatory): mandatory re-snapped the
                  carousel to a stale position whenever the page scrolled
                  vertically. Proximity still snaps swipes cleanly without that
                  cross-axis interference. */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide -mx-side-spacing-mobile md:-mx-side-spacing-tablet snap-x snap-proximity"
              onScroll={checkScrollButtons}
            >
              <div className="flex gap-8 px-side-spacing-mobile md:px-side-spacing-tablet pb-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    data-testimonial-card
                    className="flex flex-col items-center text-center p-6 flex-shrink-0 w-full md:w-[calc(50%-16px)] snap-center md:snap-start"
                    style={{
                      transitionDelay: `${index * 200}ms`,
                      opacity: isTestimonialsInView ? 1 : 0,
                      transform: isTestimonialsInView
                        ? "translateY(0)"
                        : "translateY(20px)",
                      transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                    }}
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-stroke">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-6 font-kanit text-[16px] font-medium uppercase tracking-[0.1em] text-boneWhite">
                      {testimonial.name}
                    </p>
                    <p className="readout mt-2 uppercase text-[#5c5a57]">
                      {testimonial.title}
                    </p>
                    <blockquote className="text-body-lg italic mt-8 leading-relaxed">
                      {testimonial.quote}
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - kept clear of the scroll area so the whole
                button stays tappable on touch devices */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                type="button"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={cn(
                  "w-11 h-11 md:w-12 md:h-12 rounded-full bg-bgPrimary border border-stroke flex items-center justify-center hover:bg-bgSecondary transition-all shadow-lg [&_svg]:pointer-events-none",
                  canScrollLeft
                    ? "opacity-100 cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                )}
                aria-label="Scroll left"
              >
                <ArrowLeftSVG width={20} height={20} className="text-boneWhite" />
              </button>

              <button
                type="button"
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={cn(
                  "w-11 h-11 md:w-12 md:h-12 rounded-full bg-bgPrimary border border-stroke flex items-center justify-center hover:bg-bgSecondary transition-all shadow-lg [&_svg]:pointer-events-none",
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

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
