import { Button, RotatingIcon } from "./ui/button";
import { ArrowRightSVG } from "@/assets/icons";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Process = () => {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.2 });
  const [stepsRef, isStepsInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [ctaRef, isCtaInView] = useInView({ threshold: 0.2 });

  const steps = [
    {
      number: "01",
      title: "Custom Plan",
      description: "We design a package and workflow tailored to your needs.",
    },
    {
      number: "02",
      title: "Initial Setup",
      description: "We set up (or hand over) the host and social accounts.",
    },

    {
      number: "03",
      title: "Production Begins",
      description: "We get to work crafting your episodes.",
    },
    {
      number: "04",
      title: "Publishing & Promotion",
      description: "Episodes start rolling, and the social strategy begins.",
    },
    {
      number: "05",
      title: "Growth & Strategy",
      description: "Beyond production, we help you maximize reach.",
    },
  ];

  return (
    <section
      id="work"
      className={cn(
        "relative bg-bgSecondary py-side-spacing overflow-hidden",
        "px-side-spacing-mobile md:px-side-spacing-tablet lg:px-side-spacing"
      )}
    >
      {/* Background diagonal stripes - bottom left */}
      <div className="absolute -bottom-[80px] -left-[50px] w-[440px] h-[440px] opacity-20">
        <img
          src="/wifi-lines.png"
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
            How We <span className="text-primary-100">Work</span>
          </h2>
          <p className="text-body-lg text-textBody mt-4">
            We make podcasting effortless so you can focus on what matters—your
            message.
          </p>
        </div>

        <div ref={stepsRef} className="relative max-w-4xl mx-auto mt-[60px]">
          {/* Vertical line - Adjusted for mobile/tablet */}
          <div
            className={cn(
              "absolute md:left-1/2 left-8 top-0 bottom-0 border-l-2 border-dashed border-[#1E1E23] transform md:-translate-x-1/2 transition-all duration-1000",
              isStepsInView ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            )}
            style={{ transformOrigin: "top" }}
          ></div>

          {/* Steps with responsive layout */}
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative mb-12 last:mb-0"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isStepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: isStepsInView ? 0.8 + index * 0.3 : 0,
              }}
            >
              {/* Line connector dot - Fixed positioning for proper alignment */}
              <div
                className={cn(
                  "absolute md:left-1/2 left-8 top-9 transform md:-translate-x-1/2 z-10",
                  "flex items-center justify-center"
                )}
              >
                <motion.div
                  className="absolute bg-bgPrimary rounded-full w-10 h-10 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={isStepsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: isStepsInView ? 0.8 + (index * 0.3 + 0.2) : 0,
                  }}
                >
                  <motion.div
                    className="w-2 h-2 bg-boneWhite rounded-full"
                    initial={{ opacity: 0 }}
                    animate={isStepsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: isStepsInView ? 0.8 + (index * 0.3 + 0.3) : 0,
                    }}
                  />
                </motion.div>
              </div>

              {/* Content layout - Adjusted for mobile/tablet */}
              <div className={cn("flex items-start", "md:justify-center")}>
                {/* Desktop layout */}
                <div
                  className={cn(
                    "hidden md:flex items-start justify-center w-full",
                    "md:flex-row md:gap-x-12"
                  )}
                >
                  {index % 2 === 0 ? (
                    <>
                      <div className="w-[33%] flex justify-end mr-10">
                        <div className="flex flex-row gap-x-4 text-right">
                          <h1 className="text-h2 md:text-h1 lg:text-banner text-textBody opacity-25">
                            {step.number}
                          </h1>
                          <div>
                            <h3 className="text-start text-body-lg-medium text-boneWhite">
                              {step.title}
                            </h3>
                            <p className="text-start text-body-sm text-textBody mt-2">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-[33%]"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-[38%]"></div>
                      <div className="w-[33%]">
                        <div className="flex flex-row gap-x-4 text-right">
                          <h1 className="text-h2 md:text-h1 lg:text-banner text-textBody opacity-25">
                            {step.number}
                          </h1>
                          <div>
                            <h3 className="text-start text-body-lg-medium text-boneWhite">
                              {step.title}
                            </h3>
                            <p className="text-start text-body-sm text-textBody mt-2">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile/Tablet layout - Improved alignment */}
                <div
                  className={cn(
                    "md:hidden flex items-center pl-16 mt-3",
                    "w-full"
                  )}
                >
                  <div className="flex flex-row gap-x-4 items-start">
                    <h1 className="text-h2 text-textBody opacity-25 leading-none pt-0">
                      {step.number}
                    </h1>
                    <div>
                      <h3 className="text-start text-body-lg-medium text-boneWhite">
                        {step.title}
                      </h3>
                      <p className="text-start text-body-sm text-textBody mt-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
            Ready to make it happen?
          </p>
          <Button
            variant="default"
            size="md"
            onClick={() => window.open("https://calendly.com/pod21", "_blank")}
          >
            Book a free call
            <RotatingIcon>
              <ArrowRightSVG width={14} height={10} />
            </RotatingIcon>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;
