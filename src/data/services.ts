export type ServiceSummary = {
  id: "ux" | "websites" | "ai";
  index: string;
  title: string;
  description: string;
  capabilities: string[];
  cta: { label: string; href: string };
};

/** Homepage service overview cards. */
export const serviceSummaries: ServiceSummary[] = [
  {
    id: "ux",
    index: "01",
    title: "UI/UX Design",
    description:
      "Research-led interface and experience design for apps, websites and digital products — so people can understand, use and enjoy what you build.",
    capabilities: [
      "User research",
      "Usability testing",
      "Information architecture",
      "Interaction design",
      "Prototyping",
      "Design systems",
    ],
    cta: { label: "Explore UI/UX design", href: "/services/ux-design" },
  },
  {
    id: "websites",
    index: "02",
    title: "Website Design & Development",
    description:
      "Thoughtfully designed websites that help businesses establish credibility, connect with customers, and turn visitors into opportunities.",
    capabilities: [
      "Website design",
      "Website development",
      "Responsive design",
      "CMS integration",
      "Website deployment",
      "Website maintenance",
    ],
    cta: { label: "Explore website solutions", href: "/services/websites" },
  },
  {
    id: "ai",
    index: "03",
    title: "AI & Business Automation",
    description:
      "Practical, intelligent systems that reduce repetitive work, connect your existing tools, and simplify daily operations.",
    capabilities: [
      "Workflow automation",
      "AI assistants",
      "Customer inquiry management",
      "Lead management",
      "Document processing",
      "Business system integrations",
    ],
    cta: { label: "Explore AI solutions", href: "/services/ai" },
  },
];

export type Capability = {
  title: string;
  description?: string;
  items: string[];
  /** Label shown above the list, e.g. "Examples". */
  itemsLabel?: string;
};

export const uxCapabilities: Capability[] = [
  {
    title: "Research & Discovery",
    description: "Understand how people actually use your product today.",
    items: [
      "User interviews",
      "Think-aloud usability testing",
      "Heuristic evaluation",
      "Competitive analysis",
      "Journey mapping",
    ],
  },
  {
    title: "Information Architecture",
    description: "Structure content and features so people find what they need.",
    items: ["Sitemaps & navigation", "Content structure", "User & task flows", "Audience-based organization"],
  },
  {
    title: "Interaction Design & Prototyping",
    description: "Explore and refine how the experience works before it is built.",
    items: ["Sketching & wireframes", "Interactive Figma prototypes", "Motion prototypes", "Feedback & error states"],
  },
  {
    title: "UI Design",
    description: "Clear, consistent interfaces that reflect your brand.",
    items: ["Visual interface design", "Responsive & mobile UI", "Accessibility fundamentals", "Brand-consistent styling"],
  },
  {
    title: "Design Systems",
    description: "Reusable foundations that keep products consistent as they grow.",
    items: ["Component libraries", "Design tokens", "Usage documentation", "Developer handoff"],
  },
  {
    title: "Validation & Iteration",
    description: "Evidence, not guesswork, behind design decisions.",
    items: ["Rounds of usability testing", "Before-and-after comparisons", "Prioritized recommendations", "Iteration on findings"],
  },
];

export const websiteCapabilities: Capability[] = [
  {
    title: "Website Design",
    description: "A visual identity online that feels unmistakably yours.",
    items: [
      "Custom visual design",
      "UI/UX design",
      "Responsive layouts",
      "Brand consistency",
      "User journey optimization",
    ],
  },
  {
    title: "Website Development",
    description: "Fast, reliable builds using modern, well-supported tools.",
    items: [
      "Landing pages",
      "Small business websites",
      "Portfolio websites",
      "Service-based websites",
      "CMS implementation",
      "Contact and inquiry forms",
    ],
  },
  {
    title: "Business Integrations",
    description: "Connect your site to the tools you already run on.",
    items: [
      "Appointment booking",
      "Calendar integration",
      "CRM integration",
      "Payment platform integration where appropriate",
      "Analytics and tracking",
      "Newsletter signup",
    ],
  },
  {
    title: "Deployment & Launch",
    description: "Everything needed to go live properly — and stay live.",
    items: [
      "Domain configuration",
      "Hosting setup",
      "Production deployment",
      "HTTPS configuration",
      "Cross-device testing",
      "Basic search engine optimization",
    ],
  },
  {
    title: "Optimization",
    description: "Careful attention to the details visitors feel.",
    items: [
      "Performance improvements",
      "Accessibility fundamentals",
      "Mobile optimization",
      "Metadata configuration",
      "Image optimization",
    ],
  },
  {
    title: "Maintenance & Handover",
    description: "Ongoing care, or everything you need to run it yourself.",
    items: [
      "Managed website support",
      "Independent website management",
      "Editable CMS",
      "Training and documentation",
      "Client-owned accounts",
    ],
  },
];

export const aiCapabilities: Capability[] = [
  {
    title: "Workflow Automation",
    description:
      "Automate repetitive business tasks and connect existing software tools.",
    itemsLabel: "Examples",
    items: [
      "Appointment reminders",
      "Email notifications",
      "Data synchronization",
      "Automated reporting",
    ],
  },
  {
    title: "AI Customer Assistants",
    description:
      "Help businesses respond to common customer questions and route more complex requests to the right person.",
    itemsLabel: "Examples",
    items: [
      "Frequently asked questions",
      "Service inquiries",
      "Customer support triage",
      "Human-assisted responses",
    ],
  },
  {
    title: "Lead Management",
    description:
      "Capture, organize, and follow up with potential customers more efficiently.",
    itemsLabel: "Examples",
    items: [
      "Form submissions",
      "Lead classification",
      "CRM updates",
      "AI-assisted follow-up emails",
    ],
  },
  {
    title: "Document Processing",
    description: "Reduce manual information entry.",
    itemsLabel: "Examples",
    items: [
      "Information extraction",
      "Document classification",
      "Structured data generation",
      "Document summarization",
    ],
  },
  {
    title: "System Integration",
    description: "Connect the tools businesses already use.",
    itemsLabel: "Examples",
    items: [
      "Email",
      "Spreadsheets",
      "CRM systems",
      "Calendars",
      "Forms",
      "Business databases",
    ],
  },
  {
    title: "AI Consultation",
    description:
      "Identify realistic opportunities for AI adoption based on existing business processes.",
    itemsLabel: "Includes",
    items: [
      "Process walkthroughs",
      "Opportunity mapping",
      "Tool recommendations",
      "Phased adoption plans",
    ],
  },
  {
    title: "Maintenance & Training",
    description: "Keep automations healthy as your business changes.",
    items: [
      "Workflow monitoring",
      "Error troubleshooting",
      "Integration maintenance",
      "Prompt updates",
      "Documentation",
      "Independent handover",
    ],
  },
];

export const aiPrinciples: { title: string; description: string }[] = [
  {
    title: "Human oversight where it matters",
    description:
      "Automations handle the routine. People stay in the loop for decisions, sensitive replies and anything a customer will read.",
  },
  {
    title: "Responsible data handling",
    description:
      "Business and customer data is handled deliberately — only what a workflow needs, stored in accounts you control.",
  },
  {
    title: "Reliable integrations",
    description:
      "Workflows are built with error handling, logging and alerts, so problems surface quickly instead of silently.",
  },
  {
    title: "Transparent workflows",
    description:
      "Every step is visible and explainable. You will always know what a system does and why.",
  },
  {
    title: "Client ownership",
    description:
      "Automations run in your accounts, with your credentials. You own the workflows, prompts and data.",
  },
  {
    title: "Clear documentation",
    description:
      "Each system ships with plain-language documentation describing how it works and how to change it.",
  },
  {
    title: "Proportionate solutions",
    description:
      "Sometimes the right answer is a simple automation — or no AI at all. Solutions are sized to the actual need.",
  },
];

export const aiOutcomes: string[] = [
  "Less manual data entry",
  "Faster inquiry processing",
  "More consistent follow-up",
  "Better organized information",
];
