import { Button, RotatingIcon } from "./ui/button";
import {
  ThumbUpSVG,
  HandShakeSVG,
  AnalyticsSVG,
  ArrowRightSVG,
} from "@/assets/icons";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Counter animation hook
const useCounter = (
  endValue: number,
  duration: number = 2000,
  start: number = 0,
  shouldStart: boolean = false
) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    // Only start animation if shouldStart is true
    if (!shouldStart) {
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (endValue - start) + start);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration, start, shouldStart]);

  return count;
};

// Define an interface for the parsed stat value
interface ParsedStat {
  numericValue: number;
  numericSuffix: string; // "M" part
  additionalSuffix: string; // "+" part
  showHours: boolean;
}

// StatCard component to handle individual stat display
const StatCard = ({
  stat,
  index,
  isInView,
}: {
  stat: { label: string; value: string };
  index: number;
  isInView: boolean;
}) => {
  // Parse the stat value with improved logic
  const [parsedStat] = useState<ParsedStat>(() => {
    let displayVal = 0;
    let numSfx = "";
    let addSfx = "";
    let hours = false;

    // Check for "M+" pattern (millions plus)
    if (stat.value.includes("m+")) {
      displayVal = parseInt(stat.value.replace("m+", ""));
      numSfx = "m";
      addSfx = "+";
    }
    // Check for "M" pattern (millions)
    else if (stat.value.includes("m")) {
      displayVal = parseInt(stat.value.replace("m", ""));
      numSfx = "m";
    }
    // Check for "+" pattern (plus)
    else if (stat.value.includes("+")) {
      displayVal = parseInt(stat.value.replace("+", ""));
      addSfx = "+";
    }
    // Plain number
    else {
      displayVal = parseInt(stat.value);
      // Check if this is the turnaround time stat
      if (stat.label === "Fast Turnaround Time") {
        hours = true;
      }
    }

    return {
      numericValue: displayVal,
      numericSuffix: numSfx,
      additionalSuffix: addSfx,
      showHours: hours,
    };
  });

  // Initial value for display when not in view
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (isInView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [isInView, hasBeenInView]);

  // Use the counter hook with the numeric value, only start when in view
  const animatedValue = useCounter(
    parsedStat.numericValue,
    2000,
    0,
    hasBeenInView
  );

  // Function to render the stat value with proper formatting
  const renderStatValue = () => {
    if (parsedStat.numericSuffix && parsedStat.additionalSuffix) {
      // Cases like "2M +"
      return (
        <>
          {animatedValue}
          {parsedStat.numericSuffix} {parsedStat.additionalSuffix}
        </>
      );
    } else if (parsedStat.numericSuffix) {
      // Cases like "2M"
      return (
        <>
          {animatedValue}
          {parsedStat.numericSuffix}
        </>
      );
    } else if (parsedStat.additionalSuffix) {
      // Cases like "3 +"
      return (
        <>
          {animatedValue} {parsedStat.additionalSuffix}
        </>
      );
    } else if (parsedStat.showHours) {
      // Cases like "48 Hours"
      return <>{animatedValue} hours</>;
    } else {
      // Just a number
      return animatedValue;
    }
  };

  return (
    <div
      className="rounded-xl bg-bgPrimary p-6"
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
      }}
    >
      <p className="text-body-sm text-textBody">{stat.label}</p>
      <h3 className="text-h3 text-boneWhite mt-8">{renderStatValue()}</h3>
    </div>
  );
};

const WhyUs = () => {
  const navigate = useNavigate();
  const [titleRef, isTitleInView] = useInView({ threshold: 0.2 });
  const [statsRef, isStatsInView] = useInView({ threshold: 0.2 });
  const [featuresRef, isFeaturesInView] = useInView({ threshold: 0.2 });
  const [ctaRef, isCtaInView] = useInView({ threshold: 0.2 });

  const stats = [
    { label: "Fast Turnaround Time", value: "48" },
    { label: "Years in Industry", value: "3+" },
    { label: "Total Episodes", value: "500+" },
    { label: "Total Plays", value: "2m+" },
  ];

  const features = [
    {
      icon: <ThumbUpSVG height={20} width={20} />,
      title: "We Get It",
      description: "Built by podcasters, for podcasters. We know the grind.",
    },
    {
      icon: <HandShakeSVG height={20} width={20} />,
      title: "Full-Service, Pre to Post",
      description: "From guest booking to episode promotion, we do it all.",
    },
    {
      icon: <AnalyticsSVG height={20} width={20} />,
      title: "Custom & Scalable",
      description: "Built around your needs, not a one-size-fits-all approach.",
    },
  ];

  return (
    <section id="why" className="bg-bgSecondary">
      <div
        className={cn(
          "relative py-side-spacing  overflow-hidden scroll-mt-[120px] max-w-[1440px] mx-auto",
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

        <div className="mx-auto relative z-10">
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
            <h2 className="text-h2">
              Why <span className="text-primary-100">pod21?</span>
            </h2>
            <p className="text-body-lg text-textBody mt-4">
              We are a no-nonsense podcast production team built by podcasters,
              for podcasters. We're like your trusty sidekick who's been there,
              done that, and knows the game. We streamline and take on the often
              overwhelming production side of podcasting, so you can focus on
              the message.
            </p>
          </div>

          {/* Stats Section */}
          <div
            ref={statsRef}
            className={cn(
              "grid gap-[20px] transition-all duration-1000",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
              isStatsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                stat={stat}
                index={index}
                isInView={isStatsInView}
              />
            ))}
          </div>

          {/* Features Section */}
          <div
            ref={featuresRef}
            className={cn(
              "grid gap-[20px] mt-[20px] transition-all duration-1000",
              "grid-cols-1 md:grid-cols-3",
              isFeaturesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-row items-center bg-bgPrimary items-start rounded-xl p-6 gap-4"
                style={{
                  transitionDelay: `${index * 150}ms`,
                  opacity: isFeaturesInView ? 1 : 0,
                  transform: isFeaturesInView
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                }}
              >
                <div className="rounded-full bg-bgSecondary p-[20px]">
                  {feature.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-body-lg-medium text-boneWhite">
                    {feature.title}
                  </h3>
                  <p className="text-body-sm text-textBody mt-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div
            ref={ctaRef}
            className={cn(
              "text-center transition-all duration-1000 delay-200",
              isCtaInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <p className="text-body-sm-medium text-textBody mt-[60px] mb-4">
              Not convinced yet?
            </p>

            <Button
              variant="default"
              size="md"
              onClick={() => navigate("/contact")}
            >
              Tell us why on a free call
              <RotatingIcon>
                <ArrowRightSVG width={14} height={10} />
              </RotatingIcon>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
