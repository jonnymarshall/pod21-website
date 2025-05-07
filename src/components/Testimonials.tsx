import { Button, RotatingIcon } from "./ui/button";
import { ArrowRightSVG } from "@/assets/icons";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Testimonials = () => {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.2 });
  const [testimonialsRef, isTestimonialsInView] = useInView({ threshold: 0.2 });
  const [ctaRef, isCtaInView] = useInView({ threshold: 0.2 });

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
  ];

  return (
    <section
      id="testimonials"
      className={cn(
        "relative bg-bgPrimary py-side-spacing overflow-hidden",
        "px-side-spacing-mobile md:px-side-spacing-tablet lg:px-side-spacing"
      )}
    >
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
            Creating a podcast is hard. Keeping one alive is even harder. 95% of
            podcasts don't make it past 21 episodes. With our help, you don't
            have to be a statistic. Here's how we've turned things around for
            our clients.
          </p>
        </div>

        <div
          ref={testimonialsRef}
          className={cn(
            "grid gap-8 mt-[66px] transition-all duration-1000",
            "md:grid-cols-2",
            isTestimonialsInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6"
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
    </section>
  );
};

export default Testimonials;
