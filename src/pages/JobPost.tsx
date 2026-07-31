import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRightSVG } from "@/assets/icons";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button, RotatingIcon } from "@/components/ui/button";
import { getJobBySlug } from "@/data/jobs";
import { getJobPlainTextDescription, type JobBlock } from "@/types/job";
import {
  generateBreadcrumbSchema,
  generateJobPostingSchema,
  generateOrganizationSchema,
} from "@/lib/schemaMarkup";

const JobBlocks = ({ blocks = [] }: { blocks?: JobBlock[] }) => (
  <>
    {blocks.map((block, index) => {
      if (block.type === "paragraph") {
        return (
          <p
            key={index}
            className="proxy-id--job--block-paragraph mt-4 text-body-lg text-textBody"
          >
            {block.text}
          </p>
        );
      }

      if (block.type === "list") {
        return (
          <ul
            key={index}
            className="proxy-id--job--block-list mt-4 space-y-3 text-body-lg text-textBody"
          >
            {block.items.map((item) => (
              <li key={item} className="proxy-id--job--block-list-item flex gap-3">
                <span className="slash-sep mt-[2px] text-primary-100">{"//"}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <dl
          key={index}
          className="proxy-id--job--block-definitions mt-4 space-y-4 text-body-lg text-textBody"
        >
          {block.items.map((item) => (
            <div key={item.term} className="proxy-id--job--block-definition flex gap-3">
              <span className="slash-sep mt-[2px] text-primary-100">{"//"}</span>
              <div>
                <dt className="proxy-id--job--block-definition-term inline font-semibold text-boneWhite">
                  {item.term}:{" "}
                </dt>
                <dd className="proxy-id--job--block-definition-description inline">
                  {item.description}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      );
    })}
  </>
);

const JobPost = () => {
  const { slug } = useParams();
  const job = getJobBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const baseUrl = "https://pod21.xyz";

  if (!job) {
    return (
      <>
        <SEO
          title="Role not found - pod21"
          description="This role is no longer listed."
          noindex
        />
        <Navbar />
        <main
          id="job-not-found"
          className={cn(
            "mx-auto flex min-h-screen max-w-[1440px] flex-col justify-center bg-bgPrimary",
            "px-side-spacing-mobile md:px-side-spacing-tablet"
          )}
        >
          <p id="job-not-found--readout" className="readout text-[#5c5a57]">
            404 <span className="slash-sep">{"//"}</span> ROLE NOT FOUND
          </p>
          <h1
            id="job-not-found--headline"
            className="mt-6 font-kanit text-h2 font-bold text-boneWhite"
          >
            This role isn't <span className="text-primary-100">listed.</span>
          </h1>
          <Link id="job-not-found--jobs-link" to="/jobs" className="mt-8">
            <Button variant="default" size="md">
              See open roles
              <RotatingIcon>
                <ArrowRightSVG width={14} height={10} />
              </RotatingIcon>
            </Button>
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const jobUrl = `${baseUrl}/jobs/${job.slug}`;
  const applicantCountry = job.facts.find((fact) =>
    fact.value.toLowerCase().includes("mexico")
  )
    ? "Mexico"
    : undefined;

  const schemaMarkup = [
    generateOrganizationSchema(baseUrl),
    generateBreadcrumbSchema(
      [
        { name: "Home", url: "/" },
        { name: "Jobs", url: "/jobs" },
        { name: job.title, url: `/jobs/${job.slug}` },
      ],
      baseUrl
    ),
    generateJobPostingSchema(
      {
        title: job.title,
        description: getJobPlainTextDescription(job),
        datePosted: job.datePosted,
        validThrough: job.validThrough,
        applicantCountry,
        url: jobUrl,
      },
      baseUrl
    ),
  ];

  return (
    <>
      <SEO
        title={`${job.title} - Jobs at pod21`}
        description={job.summary}
        image="/og-image.png"
        imageAlt={`${job.title} role at pod21`}
        type="website"
        canonicalUrl={jobUrl}
        schemaMarkup={schemaMarkup}
        noindex={job.status !== "open"}
      />
      <Navbar />

      <main id="job" className="bg-bgPrimary">
        <article
          id="job--content"
          className={cn(
            "relative mx-auto max-w-[860px] pb-side-spacing pt-[160px]",
            "px-side-spacing-mobile md:px-side-spacing-tablet"
          )}
        >
          <header id="job--header">
            <Link
              id="job--header--back-link"
              to="/jobs"
              className="nav-link inline-block"
            >
              <span className="slash-sep">{"// "}</span>All roles
            </Link>
            <h1
              id="job--header--headline"
              className="mt-6 font-kanit text-h2 font-bold text-boneWhite"
            >
              {job.title}
            </h1>
            {job.status !== "open" && (
              <p id="job--header--closed" className="readout mt-4 text-red-100">
                THIS ROLE IS CLOSED
              </p>
            )}

            <dl
              id="job--header--facts"
              className="mt-10 grid gap-6 border-y border-stroke py-8 md:grid-cols-3"
            >
              {job.facts.map((fact) => (
                <div key={fact.label} className="proxy-id--job--header--fact">
                  <dt className="proxy-id--job--header--fact-label eyebrow">
                    {fact.label}
                  </dt>
                  <dd className="proxy-id--job--header--fact-value mt-3 text-body-sm text-boneWhite">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </header>

          {job.sections.map((section) => (
            <section
              key={section.heading}
              className="proxy-id--job--section mt-14"
            >
              <h2 className="proxy-id--job--section-heading font-kanit text-h5 font-bold text-boneWhite">
                {section.heading}
              </h2>
              <JobBlocks blocks={section.blocks} />

              {section.subsections?.map((subsection) => (
                <div
                  key={subsection.heading}
                  className="proxy-id--job--subsection mt-8 rounded-[4px] border border-stroke p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="proxy-id--job--subsection-heading font-kanit text-h6 font-bold text-boneWhite">
                      {subsection.heading}
                    </h3>
                    {subsection.tag && (
                      <span className="proxy-id--job--subsection-tag readout text-primary-100">
                        {subsection.tag}
                      </span>
                    )}
                  </div>
                  <JobBlocks blocks={subsection.blocks} />
                </div>
              ))}
            </section>
          ))}

          <section id="job--apply" className="mt-14 border-t border-stroke pt-10">
            <h2
              id="job--apply--heading"
              className="font-kanit text-h5 font-bold text-boneWhite"
            >
              How to apply
            </h2>
            <p id="job--apply--intro" className="mt-4 text-body-lg text-textBody">
              {job.howToApply.intro}
            </p>
            <ul
              id="job--apply--list"
              className="mt-4 space-y-3 text-body-lg text-textBody"
            >
              {job.howToApply.items.map((item) => (
                <li key={item} className="proxy-id--job--apply--item flex gap-3">
                  <span className="slash-sep mt-[2px] text-primary-100">{"//"}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link id="job--apply--contact-link" to="/contact" className="mt-8 inline-block">
              <Button variant="default" size="md">
                Apply via contact form
                <RotatingIcon>
                  <ArrowRightSVG width={14} height={10} />
                </RotatingIcon>
              </Button>
            </Link>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default JobPost;
