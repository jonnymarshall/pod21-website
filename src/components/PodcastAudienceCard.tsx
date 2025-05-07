
import { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ChevronDownSVG } from "@/assets/icons";
import { cn } from "@/lib/utils";

interface FeatureItem {
  title: string;
  description: string;
}

interface PodcastAudienceCardProps {
  title: string;
  imageSrc: string;
  features: FeatureItem[];
  imageHeight?: string; // Add optional prop for image height
}

const PodcastAudienceCard = ({
  title,
  imageSrc,
  features,
  imageHeight = "h-[274px]", // Default height if not specified
}: PodcastAudienceCardProps) => {
  // Initialize an array of state values for each feature's description visibility
  const [visibleDescriptions, setVisibleDescriptions] = useState<boolean[]>(
    Array(features.length).fill(false)
  );

  // Toggle function for a specific feature's description
  const toggleDescription = (index: number) => {
    setVisibleDescriptions((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Check if any descriptions are visible to control the "See more/less" button
  const anyDescriptionVisible = visibleDescriptions.some((visible) => visible);

  // Toggle all descriptions at once
  const toggleAllDescriptions = () => {
    // If any are visible, hide all. Otherwise, show all.
    setVisibleDescriptions((prev) =>
      prev.some((visible) => visible)
        ? Array(features.length).fill(false)
        : Array(features.length).fill(true)
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Card Image */}
      <div className={cn("relative w-full overflow-hidden rounded-lg mb-6", imageHeight)}>
        <img
          src={imageSrc}
          alt={`${title} podcast`}
          className="podcast-card-image object-cover" // Added object-cover to ensure full coverage
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Card Content */}
      <h5 className="text-h5 text-boneWhite mb-4">{title}</h5>

      <div className="flex-1 mb-3">
        {features.map((feature, index) => (
          <div key={index} className="mb-3">
            <div
              className="flex items-start gap-x-[10px] cursor-pointer"
              onClick={() => toggleDescription(index)}
            >
              <Check className="h-5 w-5 text-boneWhite flex-shrink-0 mt-0.5" />
              <span className="text-boneWhite text-body-lg-medium">
                {feature.title}
              </span>
            </div>
            <AnimatePresence>
              {visibleDescriptions[index] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-7 text-body-sm text-textBody"
                >
                  {feature.description}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <button
        onClick={toggleAllDescriptions}
        className="flex flex-row items-center text-primary-100 text-body-lg-medium hover:text-boneWhite transition-colors mt-2 text-left gap-x-[10px]"
      >
        See {anyDescriptionVisible ? "less" : "more"}
        <motion.div
          animate={{ rotate: anyDescriptionVisible ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDownSVG height={8} width={8} />
        </motion.div>
      </button>
    </div>
  );
};

export default PodcastAudienceCard;
