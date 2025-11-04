import { useEffect, useState } from "react";
import { ArrowRightSVG } from "@/assets/icons";
import { Button, RotatingIcon } from "./ui/button";
import { cn } from "@/lib/utils";
import AnimatedWordCycle from "./ui/AnimatedWordCycle";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const wordsList = [
    "brand",
    "startup",
    "business",
    "vision",
    "mission",
    "message",
    "story",
    "idea",
    "passion",
    "project",
    "product",
    "journey",
    "community",
  ];

  return (
    <section id="hero" className="">
      <div
        className={cn(
          "relative md:py-[221px] py-[115px] flex items-center text-left overflow-hidden max-w-[1440px] mx-auto ",
          "px-side-spacing-mobile md:px-side-spacing-tablet "
        )}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-black/50">
          <img
            src="/hero-bg.png"
            alt="Podcast studio background"
            className="hidden sm:block h-full w-full object-cover object-center"
            loading="eager"
          />
          <img
            src="/hero-bg-mobile.png"
            alt="Podcast studio background for mobile"
            className="block sm:hidden h-full w-full object-cover object-center"
            loading="eager"
          />
        </div>

        <div className="relative z-10 text-start max-w-2xl">
          <div className="mb-6">
            <div className="flex flex-wrap justify-start">
              <h1 className="font-kanit font-bold text-[40px] text-h1 lg:text-banner text-boneWhite">
                A podcast
                <br />
                for your{" "}
                <span>
                  <AnimatedWordCycle
                    words={wordsList}
                    interval={3000}
                    className="font-kanit font-bold text-[40px] text-h1 lg:text-banner text-primary-100"
                  />
                </span>
              </h1>
            </div>
          </div>

          <p className="text-sm md:text-base text-textBody mt-[18px]">
            We are a team of podcast production experts ready to bring your show
            to life.
          </p>

          <p className="text-sm md:text-base mt-12 text-textBody mb-4">
            Sound like what you're looking for?
          </p>

          <div>
            <Button
              variant="default"
              size="md"
              onClick={() => navigate("/contact")}
            >
              Book a free call
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

export default Hero;
