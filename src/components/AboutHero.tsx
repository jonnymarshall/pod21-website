import { useEffect, useState } from "react";
import { ArrowRightSVG } from "@/assets/icons";
import { Button, RotatingIcon } from "./ui/button";
import { cn } from "@/lib/utils";
import AnimatedWordCycle from "./ui/AnimatedWordCycle";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const AboutHero = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [textRef, isTextInView] = useInView({ threshold: 0.2 });
  const [imageRef, isImageInView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const wordsList = ["pod21"];

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about-hero">
      <div
        className={cn(
          "relative flex items-end text-left overflow-hidden max-w-[1440px] mx-auto ",
          "px-side-spacing-mobile md:px-side-spacing-tablet  pt-32 lg:pt-40"
        )}
      >
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center   overflow-hidden">
          <div
            className={cn(
              "absolute -left-[100px] -bottom-[100px] w-[475px] h-[342px]",
              "block"
            )}
          >
            <img
              src="/tilt-arrow-lines.png"
              alt="Background pattern"
              className="w-full h-full object-contain"
            />
          </div>
          <motion.div
            ref={textRef}
            className="flex flex-col justify-center text-start order-1 lg:order-1"
            variants={textVariants}
            initial="hidden"
            animate={isTextInView ? "visible" : "hidden"}
          >
            <div className="mb-6">
              <motion.div
                className="flex flex-wrap justify-start"
                variants={itemVariants}
              >
                <h1 className="font-kanit font-bold text-h1 lg:text-banner text-boneWhite">
                  About{" "}
                  <span>
                    <AnimatedWordCycle
                      words={wordsList}
                      interval={3000}
                      className="font-kanit font-bold text-h1 lg:text-banner text-primary-100"
                    />
                  </span>
                </h1>
              </motion.div>
              <motion.p
                className="text-sm md:text-base text-textBody mt-[18px]"
                variants={itemVariants}
              >
                This is the story of how late nights, too much coffee, and the
                highs and lows of podcasting built pod21.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            ref={imageRef}
            className="relative z-10 flex justify-center lg:justify-end lg:items-end w-full order-2 lg:order-2"
            variants={imageVariants}
            initial="hidden"
            animate={isImageInView ? "visible" : "hidden"}
          >
            <img
              src="/about_pod21.png"
              alt="About Hero"
              className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[395px] lg:max-w-[395px] xl:max-w-[395px] h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
