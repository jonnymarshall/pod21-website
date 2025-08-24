import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

import PodcastAudienceCard from "./PodcastAudienceCard";
import { cn } from "@/lib/utils";
import { Button, RotatingIcon } from "./ui/button";
import { ArrowRightSVG } from "@/assets/icons";

const WhyPodcast = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const audienceCards = [
    {
      title: "For Individuals",
      imageSrc: "/why_start_a_podcast_for_individuals.png",
      features: [
        {
          title: "Build a Personal Brand",
          description:
            "Establish yourself as a thought leader in your community.",
        },
        {
          title: "Leave a Legacy",
          description:
            "Create something that lasts—a record of your thoughts, ideas and experiences. Everyone has a story - go and tell yours.",
        },
        {
          title: "Explore Deep Conversations",
          description:
            "Podcasts are the natural place to meditate on the deepest questions. Isn't that what life's all about?",
        },
        {
          title: "Grow Your Circle",
          description:
            "The worlds' most interesting people can be found in the podcast circuit. Podcasting is your chance to join them.",
        },
        {
          title: "Advocate for a Cause",
          description:
            "What you care about matters. Don't just sit at the back. Stand at the front and take up the mic.",
        },
        {
          title: "Document Your Journey",
          description:
            "Whether you're building a business, learning a skill, or exploring a topic - why not take people along for the ride?",
        },
        {
          title: "Generate passive income",
          description:
            "Any committed podcaster with an audience can earn from their work. As your show grows, so can your earning potential. Be it donations, sponsorships, or premium content, the sky is the limit.",
        },
      ],
    },
    {
      title: "For Businesses & Brands",
      imageSrc: "/why_start_a_podcast_for_business_brand.png",
      features: [
        {
          title: "Educate & Inform",
          description:
            "Teach your audience about your product, service, or industry in your own words, with your own energy. (Passion is contagious!)",
        },
        {
          title: "Showcase Your Authenticity",
          description:
            "Building brand credibility and trust takes time. Podcasting gives you the space to communicate your message in an open and unobtrusive way.",
        },
        {
          title: "Become a Thought Leader",
          description:
            "Though podcasting, you can build towards becoming an authority in your field - and lead the conversation in your industry.",
        },
        {
          title: "Convert listeners into customers",
          description:
            "With podcasting, the line between entertainment and advertising is blurred. Every listener is a potential customer (and that's a good thing)!",
        },
        {
          title: "Forge partnerships",
          description:
            "By having a space to share with people in your industry, invaluable business relationships are just waiting to be made.",
        },
        {
          title: "Podcasts = The Root of all Marketing",
          description:
            "Let your podcast be the springboard for all your marketing. Pull clips, generate articles, create videos (now with added authenticity).",
        },
        {
          title: "Monetize Your Show",
          description:
            "From sponsorships to premium content, a successful podcast can become a valuable revenue stream of its own.",
        },
      ],
    },
    {
      title: "For Artists, Musicians & Creators",
      imageSrc: "/why_start_a_podcast_for_artists_musicians_creators.png",
      features: [
        {
          title: "Deepen Your Connection with Fans",
          description:
            "Go beyond the art. Share stories, inspiration, and behind-the-scenes moments.",
        },
        {
          title: "Own Your Narrative",
          description:
            "Don't let media outlets define your story. Tell it yourself, on your terms.",
        },
        {
          title: "Convert listeners into fans",
          description:
            "Podcasting is a unique way to broaden your fanbase. Fans become listeners. Listeners become fans. Artistic cross-pollination in action. 👌",
        },
        {
          title: "Showcase Your Creative Process",
          description:
            "Bring fans into your world and let them discover how the art they love gets made.",
        },
        {
          title: '"Collab, bro!"',
          description:
            "Talent knows talent. Or at least it does when you're a podcaster. Invite fellow artists and let magic happen.",
        },
        {
          title: "Your social feed, sorted",
          description:
            "Social feeds love audio and video. Podcast clips are the perfect companion to a social feed lacking in engaging content.",
        },
      ],
    },
    {
      title: "For Organizations, Movements & Nonprofits",
      imageSrc:
        "/why_start_a_podcast_for_organizations_movements_nonprofits.png",
      features: [
        {
          title: "Raise Awareness",
          description:
            "Advocate for your cause and educate people about complex issues - without time constraints.",
        },
        {
          title: "Share Success Stories",
          description:
            "Podcasts are the perfect platform to inform your audience about the change you are driving.",
        },
        {
          title: "Counter the Lies",
          description:
            "Use your platform to set the record straight and dispel any misconceptions about your cause.",
        },
        {
          title: "Feed the feeds",
          description:
            "Never run out of things to post. Use clip from your podcast as a source of digital outreach.",
        },
        {
          title: "Monetize Your Show",
          description:
            "Turn your podcast into a fundraising hub for your cause.",
        },
      ],
    },
    {
      title: "For Educators, Coaches, Consultants",
      imageSrc: "/why_start_a_podcast_for_educators_coaches_consultants.png",
      features: [
        {
          title: "Teach & Inspire",
          description: "Share your knowledge in an easily digestible format.",
        },
        {
          title: "Build Trust & Authority",
          description:
            "Potential clients or students get a flavour for your expertise before they even sign up.",
        },
        {
          title: "Expand Your Reach",
          description:
            "Not everyone wants to read articles or watch videos. The best way to reach the podcast market is to have a podcast!",
        },
        {
          title: "Network with the Best",
          description:
            "A podcast is your opportunity to have conversations with the best in your field. Giving you credibility, as well as tapping into a mutually shared market.",
        },
        {
          title: "Drive traffic to your website",
          description:
            "More and more people are starting their learning and development journey with a podcast search. Don't be left out!",
        },
        {
          title: "Stand out from the Crowd",
          description:
            "Podcasting is a lot of work, that's why most coaches and educators stick to blogging. This presents a big opportunity for those willing to go the extra mile and embrace the pod!",
        },
      ],
    },
  ];

  return (
    <section
      id="why-podcast"
      ref={ref}
      className={cn(
        "py-side-spacing bg-bgPrimary scroll-mt-[100px]",
        "px-side-spacing-mobile md:px-side-spacing-tablet lg:px-side-spacing"
      )}
    >
      <div className="mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-[60px]"
        >
          <h2 className="text-h2 font-bold">
            Why start a <span className="text-primary-100">podcast</span>?
          </h2>
          <p className="text-base text-textBody mt-4">
            Podcasting is one of the most powerful mediums available today,
            offering a rare, direct line to a worldwise audience. Unlike
            fleeting social media posts, algorithm-controlled feeds, or (God
            forbid) paid commercials - a podcast is your space, your voice, and
            your rules. An authentic and unfiltered way to broadcast to the
            world.
          </p>
        </motion.div>

        {/* Top Cards Row */}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
          {audienceCards.slice(0, 2).map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              className="bg-bgSecondary rounded-xl p-6 cursor-pointer h-full"
            >
              <PodcastAudienceCard
                title={card.title}
                imageSrc={card.imageSrc}
                features={card.features}
                imageHeight="max-h-[220px] md:h-auto"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Cards Row */}
        <div className="grid grid-cols-1 gap-[20px] mt-[20px] md:grid-cols-3">
          {audienceCards.slice(2).map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
              className="bg-bgSecondary rounded-xl p-6 cursor-pointer h-full"
            >
              <PodcastAudienceCard
                title={card.title}
                imageSrc={card.imageSrc}
                features={card.features}
                imageHeight="max-h-[220px] md:h-[172px]" // Match top row height on mobile, keep original height on larger screens
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPodcast;
