export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const studioProcess: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the business, its customers, existing systems, challenges, and objectives.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Define the solution, establish the visual direction, and map the user experience or workflow.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop, integrate, and test the solution with regular opportunities for feedback.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Deploy the finished solution, provide documentation and training, and establish an ongoing support arrangement.",
  },
];

export const websiteProcess: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Clarify goals, audiences, content and any existing tools the site needs to work with.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Shape the sitemap, user journeys and visual direction, then refine full page designs together.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop a fast, responsive site, set up the CMS and integrations, and test across devices.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Configure your domain and hosting in your accounts, deploy, and hand over with training.",
  },
];

export const aiProcess: ProcessStep[] = [
  {
    number: "01",
    title: "Map",
    description:
      "Walk through how work actually happens today and identify the repetitive steps worth automating.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Define the workflow, data flows, review points and failure handling before anything is built.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Implement and test with real examples, refining prompts and rules alongside your team.",
  },
  {
    number: "04",
    title: "Operate",
    description:
      "Launch with monitoring and documentation, then support, adjust or hand over as you prefer.",
  },
];
