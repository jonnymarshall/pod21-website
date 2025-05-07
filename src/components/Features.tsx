import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Features = () => {
  const features = [
    {
      title: "Why start a podcast?",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3",
      benefits: [
        "Build loyal audience relationships",
        "Establish thought leadership",
        "Create on-demand content",
        "Low barrier to entry",
        "Monetize through sponsorships",
        "Reach audiences in multiple formats",
        "Network with industry leaders",
        "Drive traffic to your business",
      ],
    },
    {
      title: "Podcast Growth Opportunities",
      image:
        "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3",
      benefits: [
        "Cross-promote on social media",
        "Collaborate with other creators",
        "Optimize for search discoverability",
        "Develop premium subscriber content",
        "Participate in podcast networks",
        "Create valuable show notes",
        "Attend industry events",
        "Collect and use listener feedback",
      ],
    },
  ];

  // Additional feature boxes
  const additionalFeatures = [
    {
      title: "Pro Audio: Recording & Editing",
      items: [
        "Professional sound design",
        "Studio-quality equipment",
        "Noise reduction techniques",
        "Custom intro/outro music",
      ],
    },
    {
      title: "Distribution: Worldwide Reach",
      items: [
        "Multi-platform publishing",
        "RSS feed management",
        "Episode scheduling",
        "Distribution analytics",
      ],
    },
    {
      title: "Podcast Content Strategy",
      items: [
        "Topic research & planning",
        "Episode structuring",
        "Audience targeting",
        "Season mapping",
      ],
    },
  ];

  return (
    <section
      id="features"
      className={cn(
        "section-padding bg-podcast-black",
        "px-side-spacing-mobile md:px-side-spacing-tablet lg:px-side-spacing"
      )}
    >
      <div className="mx-auto">
        <h2 className="section-heading">Why start a podcast?</h2>

        {/* Main features */}
        <div className={cn("grid gap-10 mb-16", "md:grid-cols-2")}>
          {features.map((feature, index) => (
            <div key={index} className="glass-card overflow-hidden">
              <div className="h-48 overflow-hidden mb-6 rounded-lg">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-podcast-green mr-2 mt-1">
                      <Check size={16} />
                    </span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional features */}
        <div className={cn("grid gap-6", "md:grid-cols-3")}>
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="glass-card">
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <ul className="space-y-2">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-podcast-green mr-2 mt-1">
                      <Check size={16} />
                    </span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
