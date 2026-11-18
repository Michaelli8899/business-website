/**
 * Portfolio projects.
 *
 * To add a project, append an entry to `projects`. The `slug` becomes the
 * URL (/work/[slug]); the page is prerendered automatically.
 *
 * Honesty rules:
 *  - `engagement` must describe how the work was actually done
 *    (client, academic, personal or concept).
 *  - `caseStudy.goals` are what the work set out to achieve — never phrase
 *    them as results.
 *  - Only fill `caseStudy.measuredResults` with genuinely measured outcomes.
 *  - Only show work you are allowed to show publicly.
 *
 * Images live in public/work/<slug>/ (WebP, ~1600px wide for desktop
 * screenshots). Paths are root-relative; the base path is added at render.
 */

export type ProjectCategory = "websites" | "ai";

export type Engagement = "client" | "academic" | "personal" | "concept";

export const engagementLabels: Record<Engagement, string> = {
  client: "Client Project",
  academic: "Academic Project",
  personal: "Personal Project",
  concept: "Concept Project",
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Display label, e.g. "Website Redesign". */
  type: string;
  engagement: Engagement;
  summary: string;
  /** Short list of what the work covered. */
  scope: string[];
  /** Cover image used on cards and the case study hero. */
  image: ProjectImage;
  /** Public URL of the live work, if it is online. */
  liveUrl?: string;
  caseStudy: {
    overview: string;
    challenge: string;
    approach: { title: string; description: string }[];
    solution: { title: string; description: string }[];
    gallery: { image: ProjectImage; caption: string; device?: "desktop" | "mobile" }[];
    goals: string[];
    /** Only genuinely measured results. */
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
    slug: "pittsburgh-queer-history-project",
    title: "Pittsburgh Queer History Project",
    category: "websites",
    type: "Website Redesign",
    engagement: "academic",
    summary:
      "A redesign of the website for the Pittsburgh Queer History Project, an oral history and media initiative documenting LGBTQ after-hours nightlife in Pittsburgh — from information architecture and visual design through a WordPress build and a documented handover.",
    scope: ["Visual & UX redesign", "Information architecture", "WordPress build", "Handover documentation"],
    image: {
      src: "/work/pqhp/home.webp",
      alt: "Pittsburgh Queer History Project homepage: deep burgundy navigation bar and a large condensed headline over an archival photograph with a halftone treatment.",
      width: 1600,
      height: 1000,
    },
    liveUrl: "https://pittsburghqueerhistory.com/",
    caseStudy: {
      overview:
        "The Pittsburgh Queer History Project (PQHP) is an oral history and media initiative focused on LGBTQ after-hours nightlife in Pittsburgh from 1960 to 1990. Founded in 2012, it runs community programs such as Artist/Archivist Volunteer Nights and intergenerational archive screening events. The website redesign was completed as an academic project and covered the site structure, visual design, WordPress implementation and handover documentation.",
      challenge:
        "A volunteer-driven archive has to serve several audiences at once: people looking for upcoming events, volunteers who want to help process collections, community members with materials to donate, and researchers looking for the project's publications. The site also needed to stay maintainable by the organization itself once the project ended, without ongoing developer support.",
      approach: [
        {
          title: "Structure around what visitors come to do",
          description:
            "The information architecture is organized into clear destinations — Events, Get Involved, Digital Archives, Publications and FAQs — so each audience has a direct path from the main navigation.",
        },
        {
          title: "A visual identity drawn from the archive",
          description:
            "Deep burgundy and pink, condensed uppercase headlines and archival photography with a halftone treatment give the site the character of the material it preserves, while keeping text readable.",
        },
        {
          title: "Built on a platform the organization can run",
          description:
            "The site is built on WordPress so volunteers can update events, pages and publications through a familiar editor rather than code.",
        },
        {
          title: "Designed for handoff",
          description:
            "The design was broken down into documented, reusable components, with documentation covering how the site is structured and how to maintain it after handover.",
        },
      ],
      solution: [
        {
          title: "Audience-based navigation",
          description: "Top-level navigation for events, getting involved, digital archives, publications and FAQs, with events highlighted as the primary call to action.",
        },
        {
          title: "Event listings",
          description: "Upcoming programs presented with a prominent date, event artwork, venue and a description, on both the homepage and a dedicated Events page.",
        },
        {
          title: "Ways to get involved",
          description: "A Get Involved page that explains volunteering and how to donate archival materials.",
        },
        {
          title: "Publications library",
          description: "Academic articles associated with the project listed with full citations and downloadable files.",
        },
        {
          title: "Componentized, documented design",
          description: "Reusable page components and maintenance documentation so the organization can keep the site current on its own.",
        },
      ],
      gallery: [
        {
          image: { src: "/work/pqhp/home-events.webp", alt: "Homepage section introducing PQHP programs, followed by a latest-events listing with a large date, event poster and venue details.", width: 1600, height: 1000 },
          caption: "Homepage programs introduction and latest-events listing.",
        },
        {
          image: { src: "/work/pqhp/events.webp", alt: "Events page with a magenta halftone hero image and an introduction to PQHP event programs.", width: 1600, height: 1000 },
          caption: "Events page introducing the project's community programs.",
        },
        {
          image: { src: "/work/pqhp/publications.webp", alt: "Publications page listing academic articles with citations and download buttons.", width: 1600, height: 1000 },
          caption: "Publications library with citations and downloads.",
        },
        {
          image: { src: "/work/pqhp/mobile.webp", alt: "Mobile view of the PQHP homepage with a collapsed menu and the archival hero image.", width: 780, height: 1688 },
          caption: "Responsive homepage on a phone.",
          device: "mobile",
        },
      ],
      goals: [
        "Give each audience — event-goers, volunteers, donors and researchers — a clear path from the main navigation.",
        "Make upcoming events and volunteer opportunities easy to find.",
        "Present the project's publications in one accessible place.",
        "Let the organization maintain the website independently after handoff.",
      ],
      technology: ["WordPress", "Fortunato theme (CrestaProject)", "Responsive design"],
      capabilities: ["Visual & UX design", "Information architecture", "WordPress development", "Component documentation", "Handover"],
    },
  },
  {
    slug: "michael-li-portfolio",
    title: "Michael Li — Product Design Portfolio",
    category: "websites",
    type: "Portfolio Website · Design & Development",
    engagement: "personal",
    summary:
      "A personal portfolio for product design and AI product management work — an interactive, editorial site with an explorable hero, scannable project summaries, structured case studies and a creative playground.",
    scope: ["Visual & interaction design", "Content structure", "Front-end development", "Responsive design"],
    image: {
      src: "/work/michaelmli/home.webp",
      alt: "Portfolio homepage: the oversized headline “Designing what’s next.” surrounded by scattered, draggable cards — a role statement, a portrait, a project preview and short monospace notes.",
      width: 1600,
      height: 1000,
    },
    liveUrl: "https://www.michaelmli.com/",
    caseStudy: {
      overview:
        "michaelmli.com is the personal portfolio for Michael Li's work as a product designer and AI product manager. It presents a set of in-depth product case studies, a Creative Playground for architecture, photography and visual studies, and an About page connecting HCI, business and code.",
      challenge:
        "A portfolio has to show range — research, interaction design, product thinking and hands-on prototyping — without losing a clear point of view. Visitors often skim quickly, so each project needs to communicate the role, timeline and focus at a glance, while still offering depth for people who want the full story.",
      approach: [
        {
          title: "An explorable first impression",
          description:
            "The homepage opens with an oversized headline surrounded by draggable “fragments” — a role statement, a portrait, a project preview and short notes — inviting visitors to interact before they scroll.",
        },
        {
          title: "An editorial type system",
          description:
            "A heavy grotesk for headlines, a serif for the personal voice and monospace for annotations create clear hierarchy and a distinctive tone.",
        },
        {
          title: "Scannable project summaries",
          description:
            "Each project leads with full-bleed imagery, a one-line outcome, a short description, the role, timeline and topic tags, with a direct link to the case study.",
        },
        {
          title: "Depth on demand",
          description:
            "Case studies open with a TL;DR — problem, product move, final design and why it matters — before the detailed process, so readers choose how deep to go.",
        },
      ],
      solution: [
        {
          title: "Interactive hero",
          description: "Draggable cards around the headline on desktop, re-flowing into a tidy grid on phones.",
        },
        {
          title: "Selected work",
          description: "Four product case studies, each introduced with imagery, role, timeline and tags.",
        },
        {
          title: "Structured case studies",
          description: "A consistent template with project context, team, tools, a TL;DR and the full design process.",
        },
        {
          title: "Creative Playground",
          description: "A separate space for architecture, photography and visual studies that sits alongside the product work.",
        },
        {
          title: "About & contact",
          description: "A concise professional path with personal texture, and clear calls to start a conversation.",
        },
      ],
      gallery: [
        {
          image: { src: "/work/michaelmli/work.webp", alt: "Selected work section: a full-bleed Noteful project image with the project title, outcome, description, role, timeline, tags and a View case study link.", width: 1600, height: 1000 },
          caption: "Full-bleed project summaries in Selected work.",
        },
        {
          image: { src: "/work/michaelmli/case.webp", alt: "Case study header for Noteful with a project label, large title, outcome line and topic tags above a hero image of the app.", width: 1600, height: 1000 },
          caption: "Case study template opening.",
        },
        {
          image: { src: "/work/michaelmli/playground.webp", alt: "Creative Playground page with a large headline and a short introduction to architecture, photography and visual studies.", width: 1600, height: 1000 },
          caption: "Creative Playground for visual and spatial work.",
        },
        {
          image: { src: "/work/michaelmli/mobile.webp", alt: "Mobile homepage with the headline stacked and the hero cards arranged in a grid.", width: 780, height: 1688 },
          caption: "On phones, the hero fragments re-flow into a grid.",
          device: "mobile",
        },
      ],
      goals: [
        "Communicate role, focus and impact within seconds of landing.",
        "Let visitors choose between a quick scan and a deep read.",
        "Show creative range alongside product work without diluting it.",
        "Leave a distinctive, personal impression.",
      ],
      technology: ["Vite", "Single-page application", "Responsive design"],
      capabilities: ["Visual design", "Interaction design", "Content structure", "Front-end development"],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 2): Project[] {
  const current = getProject(slug);
  const others = projects.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);
  const same = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}
