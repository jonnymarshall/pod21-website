import { Button } from "./ui/button";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Process = () => {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.2 });
  const [stepsRef, isStepsInView] = useInView({ threshold: 0.1 });
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

          {/* The running order: one commission, five stages, in sequence */}
          <div
            id="work--steps"
            ref={stepsRef}
            className="mx-auto mt-[60px] max-w-5xl border-t border-stroke"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="proxy-id--work--steps--step grid grid-cols-[64px_1fr] items-baseline gap-x-6 border-b border-stroke py-8 md:grid-cols-[120px_260px_1fr]"
                initial={{ opacity: 0, y: 24 }}
                animate={
                  isStepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                }
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: isStepsInView ? 0.2 + index * 0.12 : 0,
                }}
              >
                <p className="font-mono text-[13px] tracking-[0.14em] text-primary-100">
                  {step.number} <span className="slash-sep">{"//"}</span>
                </p>
                <h3 className="font-kanit text-[18px] font-medium uppercase tracking-[0.08em] text-boneWhite">
                  {step.title}
                </h3>
                <p className="col-span-2 mt-2 text-body-sm text-textBody md:col-span-1 md:mt-0 md:text-body-lg">
                  {step.description}
                </p>
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
            <Link to="/contact">
              <Button id="work--cta" variant="default" size="md">
                Book a free call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
