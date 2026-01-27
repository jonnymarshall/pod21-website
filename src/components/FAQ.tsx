import { useInView } from "@/hooks/useInView";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.2 });

  const faqs = [
    {
      question:
        "Will my podcast be distributed on all major platforms (Apple, Spotify, etc.)?",
      answer:
        "Yes. We take care of podcast distribution and ensure it's propagated to all the biggest platforms.",
    },
    {
      question:
        "Do you only launch podcasts from scratch, or work with existing content creators?",
      answer:
        "Both. We work in setting up podcasts from scratch, as well as existing podcasters looking to outsource to an experienced team.",
    },
    {
      question: "Do you offer video podcast production, or just audio?",
      answer:
        "We offer both, and we optimize the workflow depending on whether we're dealing with audio-only or video content.",
    },
    {
      question: "Do you do any on-location work such as setting up a studio?",
      answer:
        "No. We can advise on considerations for setting up a studio, but we don't do any location work.",
    },
    {
      question:
        "Can you clean up and improve the sound quality of my recordings?",
      answer: `Absolutely. Our editors are pros in creating balanced, clean (free of "um"s and "ah"s) podcast-ready audio.`,
    },
    {
      question: "Can you help me to bring on guests?",
      answer:
        "Yes. We will contact and schedule specific guests as instructed, however in cases we don't have access, client cooperation is required.",
    },
    {
      question: "Do you offer coaching or consulting for podcast hosts?",
      answer:
        "Yes. We desire to know your content deeply, and we're always here to offer advise free of charge.",
    },
    {
      question: "Can you help promote my podcast and grow my audience?",
      answer:
        "We will come up with and implement a dedicated promotion strategy, however we do not guarantee any specific growth targets as this depends on many factors outside our control.",
    },
    {
      question: "Can you help me to land a sponsor?",
      answer:
        "No. We are not experts in sponsorship acquisition, but do we ensure sponsor content and responsibilities are managed effectively once acquired.",
    },
    {
      question:
        "Can you help with adjacent things, such as a newsletter or community management?",
      answer:
        "Yes. We can handle newsletters and manage/interact with the community on your behalf.",
    },
  ];

  return (
    <section id="faq" className="bg-bgSecondary">
      <div
        className={cn(
          "py-side-spacing scroll-mt-[120px]  relative max-w-[1440px] mx-auto",
          "px-side-spacing-mobile md:px-side-spacing-tablet "
        )}
      >
        <div
          ref={titleRef}
          className={cn(
            "text-center transition-all duration-1000",
            isTitleInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-h2 text-boneWhite">
            Frequently asked <span className="text-primary-100">questions</span>
          </h2>
          <p className="text-base text-textBody mt-4">
            Everything you need to know about our podcast production services
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-[60px] space-y-[10px]"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-0 bg-bgPrimary p-6 rounded-lg overflow-hidden"
            >
              <AccordionTrigger
                className={cn(
                  "text-left hover:no-underline",
                  "data-[state=open]:bg-bgPrimary"
                )}
              >
                <span className="text-body-lg-medium text-boneWhite">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
