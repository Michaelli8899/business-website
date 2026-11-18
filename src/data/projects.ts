/**
 * Portfolio projects.
 *
 * To add a project, append an entry to `projects`. The `slug` becomes the
 * URL (/work/[slug]). Set `isConcept: true` for self-initiated
 * demonstrations — they are labelled "Concept Project" everywhere and their
 * outcomes are presented as intended, not measured.
 *
 * `visual` selects an illustrated mockup from
 * src/components/visuals/project-visual.tsx. To use real screenshots
 * instead, add an `image` (path under /public) and it will take priority.
 */

export type ProjectCategory = "websites" | "ai";

export type ProjectVisualVariant = "fitness" | "cafe" | "leads" | "assistant";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Display label, e.g. "Web Design & Development". */
  type: string;
  isConcept: boolean;
  summary: string;
  highlights: string[];
  visual: ProjectVisualVariant;
  image?: { src: string; alt: string };
  caseStudy: {
    overview: string;
    challenge: string;
    approach: { title: string; description: string }[];
    solution: { title: string; description: string }[];
    /** Extra visuals shown in the gallery section. */
    gallery: { variant: ProjectVisualVariant | "workflow"; caption: string; view?: string }[];
    intendedOutcomes: string[];
    /** Only fill with genuinely measured results from real client work. */
    measuredResults?: string[];
    technology: string[];
    capabilities: string[];
  };
};

export const projectCategories: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "websites", label: "Websites" },
  { id: "ai", label: "AI & Automation" },
];

export const projects: Project[] = [
  {
    slug: "boutique-fitness-studio",
    title: "Boutique Fitness Studio",
    category: "websites",
    type: "Web Design & Development",
    isConcept: true,
    summary:
      "A responsive website for an independent fitness studio, bringing memberships, class schedules and booking together in one calm experience.",
    highlights: [
      "Responsive website",
      "Membership information",
      "Class schedules",
      "Booking integration",
    ],
    visual: "fitness",
    caseStudy: {
      overview:
        "This concept explores how a small fitness studio could present its classes and memberships with the polish of a larger brand, while keeping booking effortless on a phone.",
      challenge:
        "Independent studios often rely on social media posts and third-party booking pages that feel disconnected from their brand. Prospective members struggle to find class times, understand membership options, or book without downloading an app.",
      approach: [
        {
          title: "Mobile-first journeys",
          description:
            "Most visitors arrive from a phone. Core journeys — view today's classes, compare memberships, book a first session — were mapped for one-handed use first.",
        },
        {
          title: "Brand-led visual system",
          description:
            "A confident type scale and restrained palette let the studio's photography and personality lead, rather than template decoration.",
        },
        {
          title: "Integrate, don't rebuild",
          description:
            "Instead of custom booking software, the design embeds an established scheduling platform the studio already trusts, styled to match.",
        },
      ],
      solution: [
        {
          title: "Live class schedule",
          description:
            "A filterable weekly timetable by class type and instructor, synced from the booking platform.",
        },
        {
          title: "Clear membership comparison",
          description:
            "Membership options presented side by side with plain-language explanations, editable by staff in the CMS.",
        },
        {
          title: "Frictionless booking",
          description:
            "Book-a-class actions on every schedule entry, leading directly into the integrated booking flow.",
        },
        {
          title: "Instructor profiles",
          description:
            "Short, personable instructor pages to help newcomers feel comfortable before their first visit.",
        },
      ],
      gallery: [
        { variant: "fitness", caption: "Homepage with today's classes surfaced first.", view: "home" },
        { variant: "fitness", caption: "Weekly schedule with filters and booking actions.", view: "schedule" },
      ],
      intendedOutcomes: [
        "Make class times and membership options easy to find on any device.",
        "Reduce the number of steps between discovering the studio and booking a first class.",
        "Give staff an easy way to update schedules, pricing pages and announcements themselves.",
        "Present the studio with a consistent, recognisable brand.",
      ],
      technology: ["Next.js", "Headless CMS", "Scheduling platform embed", "Vercel"],
      capabilities: [
        "Website design",
        "Responsive development",
        "CMS integration",
        "Booking integration",
        "Deployment",
      ],
    },
  },
  {
    slug: "independent-cafe",
    title: "Independent Café",
    category: "websites",
    type: "Web Design & CMS",
    isConcept: true,
    summary:
      "A warm, brand-led website for a neighbourhood café with an always-current digital menu that staff can update in minutes.",
    highlights: [
      "Brand-led website",
      "Digital menu",
      "Location and contact information",
      "Editable content",
    ],
    visual: "cafe",
    caseStudy: {
      overview:
        "This concept imagines a website for an independent café that captures the feel of the space and keeps practical information — menu, hours, location — accurate without technical help.",
      challenge:
        "Café menus change often, but many small businesses publish them as PDFs or images that quickly go out of date, are hard to read on phones, and are invisible to search engines.",
      approach: [
        {
          title: "Atmosphere first",
          description:
            "Typography, colour and photography direction were chosen to echo the café's interior and packaging, so the site feels like an extension of the space.",
        },
        {
          title: "Structured, editable menu",
          description:
            "The menu is modelled as structured content — sections, items, dietary notes — so staff edit text, not files.",
        },
        {
          title: "Practical information always visible",
          description:
            "Hours, address and directions sit one tap away from every page.",
        },
      ],
      solution: [
        {
          title: "Digital menu",
          description:
            "A fast, accessible menu with dietary labels and seasonal specials, readable on any screen and indexable by search engines.",
        },
        {
          title: "Simple content editing",
          description:
            "A friendly CMS for menu items, opening hours, announcements and events.",
        },
        {
          title: "Location & contact",
          description:
            "Embedded map, directions, opening hours and contact details with structured data for local search.",
        },
        {
          title: "Story & gallery",
          description:
            "A short brand story and photo gallery that help first-time visitors know what to expect.",
        },
      ],
      gallery: [
        { variant: "cafe", caption: "Brand-led homepage with hours and location surfaced.", view: "home" },
        { variant: "cafe", caption: "Structured digital menu with dietary labels.", view: "menu" },
      ],
      intendedOutcomes: [
        "Keep menu, hours and announcements accurate without developer involvement.",
        "Make the café easier to discover in local search.",
        "Communicate the café's atmosphere before a first visit.",
        "Provide a mobile-friendly alternative to PDF menus.",
      ],
      technology: ["Next.js", "Headless CMS", "Structured data (schema.org)", "Maps embed"],
      capabilities: ["Brand-led web design", "CMS implementation", "Local SEO fundamentals", "Content training"],
    },
  },
  {
    slug: "intelligent-lead-management",
    title: "Intelligent Lead Management",
    category: "ai",
    type: "AI & Workflow Automation",
    isConcept: true,
    summary:
      "An automated pipeline that captures website inquiries, classifies and enriches them, updates the CRM and drafts a reply for human review.",
    highlights: [
      "Inquiry classification",
      "Lead information extraction",
      "CRM integration",
      "AI-assisted response drafting",
    ],
    visual: "leads",
    caseStudy: {
      overview:
        "This concept demonstrates how a service business could turn a busy inquiry inbox into an organised, consistent lead workflow — with a person approving every reply.",
      challenge:
        "Inquiries arrive through forms, email and social channels. Someone has to read each one, copy details into a CRM, decide who should follow up and write a response. It is repetitive, easy to delay, and inconsistent when the team is busy.",
      approach: [
        {
          title: "Map the current process",
          description:
            "Document how inquiries are handled today, which details matter, and where delays or errors typically creep in.",
        },
        {
          title: "Keep a human in the loop",
          description:
            "AI handles extraction, classification and first drafts. A team member reviews and approves every outbound message.",
        },
        {
          title: "Design for failure",
          description:
            "Low-confidence classifications and errors are flagged for manual handling instead of guessed at.",
        },
      ],
      solution: [
        {
          title: "Unified capture",
          description:
            "Form submissions and inquiry emails flow into a single automated workflow.",
        },
        {
          title: "Classification & extraction",
          description:
            "A language model identifies the request type and urgency, and extracts structured details such as name, company and service interest.",
        },
        {
          title: "CRM record creation",
          description:
            "A contact and opportunity are created or updated in the CRM, with the original message attached for context.",
        },
        {
          title: "Draft-and-approve replies",
          description:
            "A tailored response is drafted using approved templates and business information, then queued for a person to review, edit and send.",
        },
      ],
      gallery: [
        { variant: "workflow", caption: "End-to-end inquiry workflow with a human approval step." },
        { variant: "leads", caption: "Review queue showing classified leads and drafted replies.", view: "queue" },
      ],
      intendedOutcomes: [
        "Less manual copying of inquiry details into the CRM.",
        "Faster, more consistent first responses.",
        "No inquiries lost between inboxes.",
        "Better organised lead information for follow-up and reporting.",
      ],
      technology: ["Workflow automation platform", "LLM API", "CRM API", "Email integration"],
      capabilities: [
        "Workflow design",
        "AI classification & extraction",
        "CRM integration",
        "Prompt design",
        "Documentation & training",
      ],
    },
  },
  {
    slug: "customer-service-assistant",
    title: "Customer Service Assistant",
    category: "ai",
    type: "AI & System Integration",
    isConcept: true,
    summary:
      "A website assistant that answers common questions from a business knowledge base, routes complex requests and escalates to a person when needed.",
    highlights: [
      "Frequently asked questions",
      "Business knowledge base",
      "Customer inquiry routing",
      "Human escalation",
    ],
    visual: "assistant",
    caseStudy: {
      overview:
        "This concept explores a customer assistant that is genuinely helpful for routine questions, honest about its limits, and quick to bring in a person.",
      challenge:
        "Small teams answer the same questions — hours, services, policies, availability — over and over, often outside business hours. Generic chatbots frustrate customers by guessing or blocking access to a real person.",
      approach: [
        {
          title: "Grounded in real business knowledge",
          description:
            "Answers are drawn from a curated knowledge base the business controls — not the open internet.",
        },
        {
          title: "Clear boundaries",
          description:
            "The assistant is designed to say when it does not know, and offers a human handoff rather than improvising.",
        },
        {
          title: "Route, don't trap",
          description:
            "Complex or sensitive requests are routed to the right person with full context, so customers never repeat themselves.",
        },
      ],
      solution: [
        {
          title: "Knowledge-based answers",
          description:
            "Responses to frequently asked questions sourced from an editable knowledge base, with links to relevant pages.",
        },
        {
          title: "Inquiry routing",
          description:
            "Requests are categorised and sent to the appropriate inbox or team member.",
        },
        {
          title: "Human escalation",
          description:
            "One tap to reach a person; the conversation history and extracted details travel with the handoff.",
        },
        {
          title: "Conversation review",
          description:
            "Staff can review conversations to improve the knowledge base and spot recurring questions.",
        },
      ],
      gallery: [
        { variant: "assistant", caption: "Assistant answering from the knowledge base.", view: "chat" },
        { variant: "workflow", caption: "Routing and escalation flow for complex requests." },
      ],
      intendedOutcomes: [
        "Quicker answers to routine questions, including outside business hours.",
        "Fewer repetitive questions reaching staff inboxes.",
        "Smooth, context-rich handoffs to a person when needed.",
        "A clearer picture of what customers ask most often.",
      ],
      technology: ["LLM API", "Retrieval over knowledge base", "Website widget", "Helpdesk / email integration"],
      capabilities: [
        "Conversation design",
        "Knowledge base setup",
        "System integration",
        "Escalation workflows",
        "Monitoring & maintenance",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 2): Project[] {
  const current = getProject(slug);
  if (!current) return projects.slice(0, limit);
  const same = projects.filter((p) => p.slug !== slug && p.category === current.category);
  const other = projects.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...same, ...other].slice(0, limit);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}
