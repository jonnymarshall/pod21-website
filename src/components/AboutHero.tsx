import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const AboutHero = () => {
  return (
    <section id="about-hero" className="bg-grid border-b border-stroke">
      <div
        className={cn(
          "relative mx-auto flex max-w-[1440px] flex-col items-center overflow-hidden text-center",
          "px-side-spacing-mobile pb-20 pt-40 md:px-side-spacing-tablet lg:pt-48"
        )}
      >
        <motion.h1
          id="about-hero--headline"
          className="font-kanit font-bold text-h1 lg:text-banner text-boneWhite"
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={0.08}
        >
          About <span className="text-primary-100">pod21</span>
        </motion.h1>
        <motion.p
          id="about-hero--subhead"
          className="mt-[18px] max-w-[52ch] text-sm text-textBody md:text-base"
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={0.22}
        >
          This is the story of how late nights, too much coffee, and the highs
          and lows of podcasting built pod21.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHero;
