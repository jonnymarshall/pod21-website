import { Button, RotatingIcon } from "./ui/button";
import { ArrowRightSVG } from "@/assets/icons";
import { Card } from "@/components/ui/card";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Import our custom icons
import {
  SearchSVG,
  VideoSVG,
  RecordSVG,
  HostingSVG,
  NotesSVG,
  CalendarSVG,
  MusicSVG,
  ArtworkSVG,
  PromotionSVG,
} from "@/assets/icons";

const Services = () => {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.2 });
  const [servicesRef, isServicesInView] = useInView({ threshold: 0.1 });
  const [ctaRef, isCtaInView] = useInView({ threshold: 0.2 });

  const services = [
    {
      title: "Research",
      description:
        "In-depth research ensures your content is fresh and authoritative.",
      icon: <SearchSVG width={20} height={20} color="#F3EFEB" />,
    },
    {
      title: "Guest Scheduling",
      description: "We handle all the logistics and coordination.",
      icon: <CalendarSVG width={20} height={20} color="#F3EFEB" />,
    },
    {
      title: "Recording",
      description:
        "We can be on the call for audio checks, taking edit notes, and tech support.",
      icon: <RecordSVG width={20} height={20} color="#F3EFEB" />,
    },
    {
      title: "Hosting & Distribution",
      description: "Your show on every major platform, fully optimized.",
      icon: <HostingSVG width={20} height={20} color="#F3EFEB" />,
    },
    {
      title: "Scripting & Show Notes",
      description:
        "Engaging scripts, SEO-friendly titles/descriptions, and timestamped episodes.",
      icon: <NotesSVG width={20} height={20} color="#F3EFEB" />,
    },
    {
      title: "Video Magic",
      description:
        "Maximise reach with video versions of episodes for YouTube and beyond.",
      icon: <VideoSVG width={20} height={20} color="#F3EFEB" />,
    },
    {
      title: "Editing & Mastering",
      description:
        "Treat your audience to beautiful sounding, crafted episodes.",
      icon: <MusicSVG width={20} height={20} color="#F3EFEB" />,
    },
    {
      title: "Music & Copyright Handling",
      description: "Licensed tracks, custom themes, zero copyright headaches.",
      icon: <MusicSVG width={20} height={20} color="#F3EFEB" />,
    },
    {
      title: "Artwork & Branding",
      description: "Eye-catching cover art and episode visuals.",
      icon: <ArtworkSVG width={20} height={20} color="#FFFFFF" />,
    },
    {
      title: "Social Clips & Promotion",
      description: "High-impact clips, audiograms, and marketing assets.",
      icon: <PromotionSVG width={20} height={20} color="#FFFFFF" />,
    },
  ];

  return (
    <section id="services" className="bg-bgPrimary">
      <div
        className={cn(
          "relative  py-side-spacing overflow-hidden scroll-mt-[120px] max-w-[1440px] mx-auto",
          "px-side-spacing-mobile md:px-side-spacing-tablet "
        )}
      >
        {/* Red zigzag background at the bottom */}
        <div className="absolute -bottom-10 -right-14 w-[478px] h-[246px] overflow-hidden">
          <img
            src="/curley-lines.png"
            alt="Background pattern"
            className="w-full h-auto object-contain"
          />
        </div>

        <h2
          ref={titleRef}
          className={cn(
            "text-h2 text-center font-bold font-kanit transition-all duration-1000",
            isTitleInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          Our <span className="text-primary-100">Services</span>
        </h2>

        <div
          ref={servicesRef}
          className={cn("grid gap-6 mt-[60px]", "grid-cols-1 md:grid-cols-2")}
        >
          {services.map((service, index) => (
            <div key={index}>
              <Card
                className={cn(
                  "bg-bgSecondary p-6 flex items-center justify-between gap-[20px] rounded-xl group h-full",
                  "border-transparent hover:border-textBody hover:bg-bgPrimary"
                )}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: isServicesInView ? 1 : 0,
                  transform: isServicesInView
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                }}
              >
                <div className="flex-1">
                  <p className="text-body-lg-medium text-boneWhite">
                    {service.title}
                  </p>
                  <p className="text-base text-textBody mt-2">
                    {service.description}
                  </p>
                </div>
                <motion.div
                  className="bg-bgPrimary group-hover:bg-bgSecondary p-6 rounded-full flex-shrink-0"
                  whileHover={{
                    rotate: 5,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  {service.icon}
                </motion.div>
              </Card>
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
          <p className="text-base text-textBody mt-[60px] mb-4">
            Want to launch or level up your podcast?
          </p>
          <Link to="/contact">
            <Button variant="default" size="md">
              Let's talk
              <RotatingIcon>
                <ArrowRightSVG width={14} height={10} />
              </RotatingIcon>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
