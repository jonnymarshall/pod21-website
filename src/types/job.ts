/**
 * Types for job listings.
 *
 * Job content lives in `src/data/jobs.json` so that the sitemap generator
 * (a plain node script) can read the same source as the React pages.
 */

export type JobBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "definitions"; items: { term: string; description: string }[] };

export interface JobSubsection {
  heading: string;
  /** Short badge shown next to the subsection heading, e.g. a rate. */
  tag?: string;
  blocks: JobBlock[];
}

export interface JobSection {
  heading: string;
  blocks?: JobBlock[];
  subsections?: JobSubsection[];
}

export interface Job {
  slug: string;
  title: string;
  /** Closed roles stay reachable by URL but drop off the listing page. */
  status: "open" | "closed";
  datePosted: string;
  validThrough?: string;
  summary: string;
  /** Key/value pairs shown in the header strip, e.g. Location, Type. */
  facts: { label: string; value: string }[];
  sections: JobSection[];
  howToApply: {
    intro: string;
    items: string[];
  };
}

/**
 * Flatten a job into plain text, used for the JobPosting schema description.
 */
export const getJobPlainTextDescription = (job: Job): string => {
  const lines: string[] = [job.summary];

  const renderBlocks = (blocks: JobBlock[] = []) => {
    blocks.forEach((block) => {
      if (block.type === "paragraph") {
        lines.push(block.text);
      } else if (block.type === "list") {
        block.items.forEach((item) => lines.push(`- ${item}`));
      } else {
        block.items.forEach((item) =>
          lines.push(`- ${item.term}: ${item.description}`)
        );
      }
    });
  };

  job.sections.forEach((section) => {
    lines.push(section.heading);
    renderBlocks(section.blocks);
    section.subsections?.forEach((subsection) => {
      lines.push(
        subsection.tag
          ? `${subsection.heading} (${subsection.tag})`
          : subsection.heading
      );
      renderBlocks(subsection.blocks);
    });
  });

  lines.push("How to apply");
  lines.push(job.howToApply.intro);
  job.howToApply.items.forEach((item) => lines.push(`- ${item}`));

  return lines.join("\n");
};
