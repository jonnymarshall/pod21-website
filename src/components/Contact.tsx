import { Button, RotatingIcon } from "./ui/button";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { ArrowRightSVG } from "@/assets/icons";
import { Link } from "react-router-dom";

const Contact = () => {
  const [containerRef, isInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id="contact"
      className={cn(
        "py-side-spacing bg-bgPrimary relative overflow-hidden "
        // "px-side-spacing-mobile md:px-side-spacing-tablet lg:px-side-spacing"
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0">
        <img
          src="/pattern.png"
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-90"></div>
      </div>

      <div
        ref={containerRef}
        className={cn(
          "relative z-10 transition-all duration-1000  max-w-[1440px] mx-auto ",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "px-side-spacing-mobile md:px-side-spacing-tablet "
        )}
      >
        <div
          className={cn(
            "flex flex-col items-start justify-between gap-[22px]",
            "lg:flex-row lg:items-center"
          )}
        >
          <div className="max-w-[820px]">
            <h2 className="text-h2 text-boneWhite lg:text-banner">
              Let's <span className="text-primary-100">work</span> together
            </h2>
            <p className="text-body-lg text-textBody mt-6">
              You've heard the quote - "The graveyard is the richest place on
              earth, because it is here that you will find all the podcasts that
              were never created." ...Okay so I may be paraphrasing slightly,
              but still - you've got something to say. Something that matters. A
              message, a vision, a story that deserves to be heard. We make sure
              that it is.
            </p>
          </div>

          <Link to="/contact">
            <Button variant="default" size="md" className={cn("!p-[34px]")}>
              <RotatingIcon>
                <ArrowRightSVG className="!h-[30px] !w-[30px]" />
              </RotatingIcon>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
