import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Process = () => {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.2 });
  const [stepsRef, isStepsInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

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
    <section id="work" className="border-t border-stroke bg-bgPrimary">
      <div
        className={cn(
          "relative py-side-spacing overflow-hidden scroll-mt-[120px] max-w-[1440px] mx-auto",
          "px-side-spacing-mobile md:px-side-spacing-tablet "
        )}
      >
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
            <p id="work--eyebrow" className="eyebrow mb-6">
              06 <span className="slash-sep">{"//"}</span> The running order
            </p>
            <h2 className="text-h2">
              How We <span className="text-primary-100">Work</span>
            </h2>
            <p className="text-body-lg text-textBody mt-4">
              We make podcasting effortless so you can focus on what
              matters—your message.
            </p>
          </div>

          {/* The running order: a signal chain the eye follows step by step */}
          <div
            id="work--steps"
            ref={stepsRef}
            className="relative max-w-4xl mx-auto mt-[60px]"
          >
            {/* Vertical line, drawn in as the section enters */}
            <div
              className={cn(
                "absolute md:left-1/2 left-8 top-0 bottom-0 border-l-2 border-dashed border-stroke transform md:-translate-x-1/2 transition-all duration-1000",
                isStepsInView
                  ? "opacity-100 scale-y-100"
                  : "opacity-0 scale-y-0"
              )}
              style={{ transformOrigin: "top" }}
            ></div>

            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="proxy-id--work--steps--step relative mb-12 last:mb-0"
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
                {/* Connector dot */}
                <div
                  className={cn(
                    "absolute md:left-1/2 left-8 top-4 transform md:-translate-x-1/2 z-10",
                    "flex items-center justify-center"
                  )}
                >
                  <motion.div
                    className="absolute bg-bgSecondary border border-stroke rounded-full w-10 h-10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isStepsInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: isStepsInView ? 0.8 + (index * 0.3 + 0.2) : 0,
                    }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-primary-100 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={isStepsInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: isStepsInView ? 0.8 + (index * 0.3 + 0.3) : 0,
                      }}
                    />
                  </motion.div>
                </div>

                {/* Content: alternating sides on desktop */}
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
                          <div className="flex flex-row gap-x-4">
                            <p className="whitespace-nowrap font-mono text-[13px] tracking-[0.14em] text-primary-100 pt-1">
                              {step.number}{" "}
                              <span className="slash-sep">{"//"}</span>
                            </p>
                            <div>
                              <h3 className="text-start font-kanit text-[16px] font-medium uppercase tracking-[0.08em] text-boneWhite">
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
                          <div className="flex flex-row gap-x-4">
                            <p className="whitespace-nowrap font-mono text-[13px] tracking-[0.14em] text-primary-100 pt-1">
                              {step.number}{" "}
                              <span className="slash-sep">{"//"}</span>
                            </p>
                            <div>
                              <h3 className="text-start font-kanit text-[16px] font-medium uppercase tracking-[0.08em] text-boneWhite">
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

                  {/* Mobile/tablet layout */}
                  <div
                    className={cn("md:hidden flex items-center pl-16", "w-full")}
                  >
                    <div className="flex flex-row gap-x-4 items-start">
                      <p className="whitespace-nowrap font-mono text-[13px] tracking-[0.14em] text-primary-100 pt-1">
                        {step.number} <span className="slash-sep">{"//"}</span>
                      </p>
                      <div>
                        <h3 className="text-start font-kanit text-[16px] font-medium uppercase tracking-[0.08em] text-boneWhite">
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
        </div>
      </div>
    </section>
  );
};

export default Process;
