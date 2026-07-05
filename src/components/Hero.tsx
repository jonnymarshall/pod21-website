import { Button } from "./ui/button";
import { PhoneSVG } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const Hero = () => {
  const navigate = useNavigate();

  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="bg-grid flex min-h-screen flex-col">
      <div
        className={cn(
          "mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-32 text-center"
        )}
      >
        <motion.p
          id="hero--eyebrow"
          className="eyebrow"
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={0.08}
        >
          Full-service podcast <span className="slash-sep">{"//"}</span> content
          production
        </motion.p>

        <motion.h1
          id="hero--headline"
          className="mt-8 font-kanit text-[44px] font-bold leading-[1.02] tracking-[-0.015em] text-boneWhite md:text-[64px] lg:text-[88px]"
          style={{ textWrap: "balance" }}
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          Production under
          <br />
          <span className="text-primary-100">total control.</span>
        </motion.h1>

        <motion.p
          id="hero--subhead"
          className="mt-8 max-w-[52ch] text-base leading-[1.75] text-textBody"
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={0.34}
        >
          Engineered rooms, versioned edits, loudness-true masters, and a
          delivery schedule your team can set a watch by. Pod21 runs your show
          like mission control.
        </motion.p>

        <motion.div
          id="hero--actions"
          className="mt-11 flex flex-wrap items-center justify-center gap-4"
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          <Button
            id="hero--cta-primary"
            variant="default"
            size="md"
            onClick={() => navigate("/contact")}
          >
            <PhoneSVG width={18} height={18} className="mr-1" />
            Start transmission
          </Button>
          <Button
            id="hero--cta-services"
            variant="outline"
            size="md"
            onClick={scrollToServices}
          >
            What we do
          </Button>
        </motion.div>
      </div>

      {/* Grounding line */}
      <motion.div
        id="hero--baseline"
        className="flex flex-wrap items-center justify-between gap-3 border-t border-stroke px-6 py-5 sm:px-10"
        variants={rise}
        initial="hidden"
        animate="visible"
        custom={0.68}
      >
        <p className="readout text-[10px] text-[#5c5a57]">
          EST. 2025 <span className="slash-sep">{"//"}</span> USA
        </p>
        <p className="readout text-[10px] text-[#5c5a57]">
          500+ EPISODES SHIPPED <span className="slash-sep">{"//"}</span>{" "}
          <span className="text-primary-100">ACCEPTING COMMISSIONS</span>
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
