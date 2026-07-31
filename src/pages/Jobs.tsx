import { useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRightSVG } from "@/assets/icons";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import { openJobs } from "@/data/jobs";
import {
  generateBreadcrumbSchema,
  generateOrganizationSchema,
} from "@/lib/schemaMarkup";

const Jobs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const baseUrl = "https://pod21.xyz";
  const schemaMarkup = [
    generateOrganizationSchema(baseUrl),
    generateBreadcrumbSchema(
      [
        { name: "Home", url: "/" },
        { name: "Jobs", url: "/jobs" },
      ],
      baseUrl
    ),
  ];

  return (
    <>
      <SEO
        title="Jobs at pod21 - Open Roles"
        description="Open roles at pod21, a media production company making video podcasts and shortform video about Bitcoin and freedom technology."
        image="/og-image.png"
        imageAlt="Open roles at pod21"
        type="website"
        keywords="pod21 jobs, podcast production jobs, video editor jobs, remote video editing roles"
        canonicalUrl={`${baseUrl}/jobs`}
        schemaMarkup={schemaMarkup}
      />
      <Navbar />

      <main id="jobs" className="bg-bgPrimary">
        <section
          id="jobs--content"
          className={cn(
            "relative mx-auto max-w-[1440px] pb-side-spacing pt-[160px]",
            "px-side-spacing-mobile md:px-side-spacing-tablet"
          )}
        >
          <div id="jobs--header" className="mb-16 max-w-[720px]">
            <p id="jobs--header--eyebrow" className="eyebrow">
              Careers
            </p>
            <h1
              id="jobs--header--headline"
              className="mt-6 font-kanit text-h1 font-bold text-boneWhite"
            >
              Join the <span className="text-primary-100">crew.</span>
            </h1>
            <p
              id="jobs--header--intro"
              className="mt-6 text-body-lg text-textBody"
            >
              We hire a small number of contractors to help produce video
              podcasts and shortform video about Bitcoin and freedom technology.
              Everything below is remote and asynchronous.
            </p>
          </div>

          {openJobs.length > 0 ? (
            <ul id="jobs--list" className="border-t border-stroke">
              {openJobs.map((job) => (
                <li
                  key={job.slug}
                  className="proxy-id--jobs--list--item border-b border-stroke"
                >
                  <Link
                    to={`/jobs/${job.slug}`}
                    className={cn(
                      "proxy-id--jobs--list--item-link group flex flex-col gap-6 py-10",
                      "md:flex-row md:items-center md:justify-between"
                    )}
                  >
                    <div className="max-w-[720px]">
                      <h2 className="proxy-id--jobs--list--item-title font-kanit text-h4 font-bold text-boneWhite transition-colors group-hover:text-primary-100">
                        {job.title}
                      </h2>
                      <p className="proxy-id--jobs--list--item-summary mt-3 text-body-lg text-textBody">
                        {job.summary}
                      </p>
                      <p className="proxy-id--jobs--list--item-facts readout mt-4 text-[#5c5a57]">
                        {job.facts.map((fact, index) => (
                          <span key={fact.label}>
                            {index > 0 && (
                              <span className="slash-sep">{" // "}</span>
                            )}
                            {fact.value.toUpperCase()}
                          </span>
                        ))}
                      </p>
                    </div>
                    <span className="readout flex shrink-0 items-center gap-3 text-primary-100">
                      View role
                      <ArrowRightSVG width={14} height={10} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div id="jobs--empty" className="border-y border-stroke py-16">
              <h2
                id="jobs--empty--headline"
                className="font-kanit text-h4 font-bold text-boneWhite"
              >
                No open roles right now.
              </h2>
              <p id="jobs--empty--body" className="mt-3 text-body-lg text-textBody">
                We're not hiring at the moment. If you think you'd be a good
                fit anyway, get in touch and tell us what you do.
              </p>
            </div>
          )}
        </section>
      </main>

      <Contact />
      <Footer />
    </>
  );
};

export default Jobs;
