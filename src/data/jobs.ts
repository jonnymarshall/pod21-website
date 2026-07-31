import jobsData from "./jobs.json";
import type { Job } from "@/types/job";

export const jobs = jobsData as Job[];

export const openJobs = jobs.filter((job) => job.status === "open");

export const getJobBySlug = (slug?: string): Job | undefined =>
  jobs.find((job) => job.slug === slug);
