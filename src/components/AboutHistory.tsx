import { cn } from "@/lib/utils";
import MotivationalCard from "./MotivationalCard";
import WhyPodBornCard from "./WhyPodBornCard";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const AboutHistory = () => {
  const [textRef, isTextInView] = useInView({ threshold: 0.2 });
  const [imageRef, isImageInView] = useInView({ threshold: 0.2 });
  const [cardsRef, isCardsInView] = useInView({ threshold: 0.2 });
  const [finalTextRef, isFinalTextInView] = useInView({ threshold: 0.2 });

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about-history" className="bg-bgPrimary">
      <div
        className={cn(
          "py-side-spacing max-w-[1440px] mx-auto relative overflow-hidden",
          "px-side-spacing-mobile md:px-side-spacing-tablet "
        )}
      >
        <motion.div
          className="flex flex-col md:gap-[60px] gap-[48px]"
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div ref={textRef} className="" variants={itemVariants}>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-5">
              <motion.div
                className="col-span-1 xl:col-span-2"
                variants={fadeInUpVariants}
                initial="hidden"
                animate={isTextInView ? "visible" : "hidden"}
              >
                <p className="text-body-sm lg:text-body-md  text-textBody">
                  Back in early 2022, I was deep in the weeds working on my
                  podcast. The conversation was recorded, editing finished,
                  mastering done, notes written, artwork designed - and then I
                  realised I'd forgotten to cut out the part my guest asked me
                  to remove. It was past midnight. My coffee machine was on
                  overtime. And I remember thinking --
                  <strong>podcasting shouldn't be this hard.</strong>
                  <br />
                  <br />
                  At this point I should probably introduce myself. I'm Jonny,
                  the founder of pod21. I've been a podcast addict from as far
                  back as I remember, and one day I realised I wouldn't be
                  satisfied if I didn't try starting my own. So I started The
                  Staying Free Podcast - a podcast where I discuss ideas and
                  philosophy around freedom, spirituality, money, holistic
                  health, psychedelics, and everything in-between.
                  <motion.div
                    className="xl:hidden block my-8 "
                    variants={imageVariants}
                    initial="hidden"
                    animate={isImageInView ? "visible" : "hidden"}
                  >
                    <img src="/history.png" alt="About History" className="" />
                  </motion.div>
                  If you're reading this, then the desire to have a podcast is
                  probably as obvious to you as it was to me. The idea that I
                  could do what I love - talking about things that inspire me -
                  whilst also connecting with interesting people all around the
                  globe, learning, documenting my journey, and leaving something
                  that would outlast me… maybe even inspire someone else; that
                  was a package too good to turn down.
                  <br />
                  <br />
                  When I started my podcast in December 2021, I thought it would
                  be simple: hit record, talk about ideas I loved, and share
                  them with the world. But like most creators eventually learn,
                  podcasting is far more than just talking into a mic. It's a
                  demanding blend of skills, strategy, and time - and without
                  support, it can quickly become overwhelming.
                  <br />
                  <br />
                  At least I had some advantages. I have a 15 year background in
                  filmmaking, editing, and production. I was already comfortable
                  with workflows, creative tools, and technical details. Even
                  so, I found myself drowning in the endless to-do list of
                  running a professional podcast. For someone without that
                  background? The barriers often feel insurmountable.
                </p>
              </motion.div>
              <motion.div
                ref={imageRef}
                className="w-full col-span-1 xl:flex hidden items-center justify-center"
                variants={imageVariants}
                initial="hidden"
                animate={isImageInView ? "visible" : "hidden"}
              >
                <img src="/history.png" alt="About History" className="" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div ref={cardsRef} className=" " variants={itemVariants}>
            <MotivationalCard />
          </motion.div>

          <motion.div className=" " variants={itemVariants}>
            <WhyPodBornCard />
          </motion.div>

          <motion.div
            ref={finalTextRef}
            className="flex flex-col gap-[48px] md:gap-[60px] "
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isFinalTextInView ? "visible" : "hidden"}
          >
            <p className="text-body-sm lg:text-body-md text-textBody ">
              At pod21, we take care of the heavy lifting: editing, mastering,
              shownotes, artwork, guest scheduling, publishing, promotion - all
              the backstage chaos that eats your time and drains your energy. We
              build workflows tailored to you, so your podcast achieves it's
              goals whilst fitting into your life, instead of fighting against
              it.
              <br />
              <br />
              The name pod21 isn't an accident. Only 1% of podcasts make it past
              episode 21. Most stall out from burnout, lack of time, or lack of
              support. We think that's a waste. So everything we do is designed
              to help you smash through that barrier and keep going. So you can
              have a top performing, professional podcast without it costing
            </p>

            <motion.h2
              className="text-h3 italic text-center "
              variants={itemVariants}
            >
              "<span className="text-primary-100">pod21</span> exists so your
              podcast supports, not competes with, your mission."
            </motion.h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHistory;
