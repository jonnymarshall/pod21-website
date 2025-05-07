
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

import {
  AmazonSVG,
  AppleSVG,
  FountainSVG,
  YoutubeSVG,
  PodchaserSVG,
  RumbleSVG,
  PodcastAddictSVG,
  PiSVG,
  CastboxSVG,
  IHeartRadioSVG,
  OvercastSVG,
  PlayerFMSVG,
  SpotifySVG,
} from "@/assets/icons";
import { cn } from "@/lib/utils";

const Platform = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const platforms = [
    {
      name: "iHeartRadio",
      icon: <IHeartRadioSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Castbox",
      icon: <CastboxSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Overcast",
      icon: <OvercastSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Player FM",
      icon: <PlayerFMSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Spotify",
      icon: <SpotifySVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Amazon",
      icon: <AmazonSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Apple",
      icon: <AppleSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Fountain",
      icon: <FountainSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Podchaser",
      icon: <PodchaserSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "YouTube",
      icon: <YoutubeSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Rumble",
      icon: <RumbleSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Podcast Addict",
      icon: <PodcastAddictSVG height={35} width={35} color="#aeaeae" />,
    },
    {
      name: "Pocket Casts",
      icon: <PiSVG height={35} width={35} color="#aeaeae" />,
    },
  ];

  return (
    <section
      ref={ref}
      className={cn(
        "py-side-spacing bg-bgSecondary relative overflow-hidden",
        "px-side-spacing-mobile md:px-side-spacing-tablet lg:px-side-spacing"
      )}
    >
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-[60px]"
        >
          <h2 className="text-h2">
            You have a <span className="text-primary-100">message.</span> We
            make it heard.
          </h2>
          <p className="text-base text-textBody mt-4">
            Get your expertly produced podcast on all the major platforms in
            just 7 days.
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="w-full overflow-hidden relative">
            <div 
              className="flex items-center"
              style={{
                width: "max-content", 
                animation: "marquee 80s linear infinite",
                paddingRight: "50px" // Add extra space for seamless transition
              }}
            >
              {[...platforms, ...platforms, ...platforms].map((platform, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center flex-shrink-0 mx-7"
                >
                  <span className="flex-shrink-0">{platform.icon}</span>
                  <span className="ml-[10px] text-body-sm text-textBody whitespace-nowrap">
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}} />
    </section>
  );
};

export default Platform;
