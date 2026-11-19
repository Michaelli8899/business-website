/**
 * Portfolio projects.
 *
 * To add a project, append an entry to `projects`. The `slug` becomes the
 * URL (/work/[slug]); the page is prerendered automatically.
 *
 * Honesty rules:
 *  - `engagement` must describe how the work was actually done
 *    (client, internship, academic, personal or concept).
 *  - `caseStudy.goals` are what the work set out to achieve — never phrase
 *    them as results.
 *  - Only fill `caseStudy.measuredResults` with genuinely measured outcomes.
 *  - Only show work you are allowed to show publicly.
 *
 * Images live in public/work/<slug>/ (WebP, ~1600px wide for desktop
 * screenshots). Paths are root-relative; the base path is added at render.
 */

export type ProjectCategory = "ux" | "websites" | "ai";

export type Engagement = "client" | "internship" | "academic" | "personal" | "concept";

export const engagementLabels: Record<Engagement, string> = {
  client: "Client Project",
  internship: "Internship Project",
  academic: "Academic Project",
  personal: "Personal Project",
  concept: "Concept Project",
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used when the image is cropped, e.g. "70% 50%". */
  focus?: string;
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
  /** Link to a fuller write-up elsewhere (e.g. the original portfolio case study). */
  sourceUrl?: string;
  role?: string;
  team?: string;
  timeline?: string;
  /** Short clarification shown with the overview (e.g. affiliation). */
  note?: string;
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
  { id: "ux", label: "UI/UX Design" },
  { id: "websites", label: "Websites" },
  { id: "ai", label: "AI & Automation" },
];

export const projects: Project[] = [
  {
    slug: "pittsburgh-queer-history-project",
    title: "Pittsburgh Queer History Project",
    category: "websites",
    type: "Website Redesign",
    engagement: "client",
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
        "The Pittsburgh Queer History Project (PQHP) is an oral history and media initiative focused on LGBTQ after-hours nightlife in Pittsburgh from 1960 to 1990. Founded in 2012, it runs community programs such as Artist/Archivist Volunteer Nights and intergenerational archive screening events. The redesign was carried out for PQHP as a real client, as part of an academic program, and covered the site structure, visual design, WordPress implementation and handover documentation.",
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
    slug: "noteful",
    title: "Noteful",
    category: "ux",
    type: "UI/UX Design · UX Research",
    engagement: "client",
    summary:
      "A redesign of the sing-back and rhythm-tapping lessons in Noteful, a gamified music theory app — adding real-time feedback, clearer guidance and reusable lesson components.",
    scope: ["User research", "Interactive prototyping", "Usability testing", "Design system"],
    role: "Project Manager, Designer, Researcher",
    team: "Five-person CMU team",
    timeline: "HCI Capstone",
    image: {
      src: "/work/noteful/cover.webp",
      alt: "Two phones showing the redesigned Noteful app: a lesson map and a rhythm-tapping exercise with a music staff and a large tap pad.",
      width: 1600,
      height: 630,
      focus: "50% 50%",
    },
    sourceUrl: "https://www.michaelmli.com/#/case/noteful",
    caseStudy: {
      overview:
        "Noteful is a music theory education game. For an HCI Capstone at Carnegie Mellon, a five-person team worked with Noteful as a real client to redesign two learning modules — Sing-Back and Rhythm Tapping — along with general usability improvements. Michael served as project manager, designer and researcher.",
      challenge:
        "Learners lacked guidance, feedback and intuitive interactions. When they answered incorrectly there was often no explanation, it was unclear when to start an exercise, and the lessons offered little encouragement to retry — causing frustration and lowering retention.",
      approach: [
        {
          title: "Research with learners and educators",
          description:
            "Think-aloud testing with nine users aged 18–21, interviews with four professional music educators, heuristic evaluation, competitive analysis, a literature review and affinity diagramming.",
        },
        {
          title: "Three guiding insights",
          description:
            "Learners need useful, detailed feedback; visual and audio guidance so they feel confident; and intuitive, engaging interactions that keep them motivated.",
        },
        {
          title: "Iterate through testing",
          description:
            "Idea generation and sketching led to two rounds of prototyping and usability testing, comparing each lesson's progress and feedback screens before and after.",
        },
      ],
      solution: [
        { title: "Real-time feedback", description: "Learners see how they are doing during an exercise, not only at the end." },
        { title: "Comparable results", description: "Post-exercise feedback compares the learner's answer with the correct one, so mistakes are understandable." },
        { title: "Retry missed questions", description: "The progress bar shows lesson state and lets learners go back to questions they missed." },
        { title: "Hint flow", description: "A tooltip prompts learners to use hints when they get stuck, with guidance and instructions." },
        { title: "Lesson design system", description: "Reusable progress bars, navigation headings, layouts and lesson components prepare the system for future modules." },
      ],
      gallery: [
        { image: { src: "/work/noteful/before.webp", alt: "Original rhythm feedback screen: a red 'Incorrect' banner with the answer audio but no explanation of the mistake.", width: 951, height: 438 }, caption: "Before: rhythm feedback without explanation." },
        { image: { src: "/work/noteful/after.webp", alt: "Redesigned rhythm feedback screen: 'So close!' with the learner's rhythm shown directly above the correct answer for comparison.", width: 956, height: 440 }, caption: "After: comparable feedback shows exactly where the rhythm differed." },
        { image: { src: "/work/noteful/components.webp", alt: "Lesson component library: answer states, tap buttons, microphone controls and note-duration references.", width: 1600, height: 696 }, caption: "Reusable lesson components." },
        { image: { src: "/work/noteful/journey.webp", alt: "Journey map across discovering, placement, practice, frustration and quitting, with emotions, actions, quotes and opportunities.", width: 1600, height: 919 }, caption: "Journey map identifying where learners became frustrated." },
      ],
      goals: [
        "Help learners understand what they did right and wrong.",
        "Make it clear when and how to perform each exercise.",
        "Encourage retries instead of only showing errors.",
        "Create components that scale to future lessons.",
      ],
      measuredResults: [
        "Positive remarks (easy, clear, intuitive, helpful) increased 38% in usability testing.",
        "Negative remarks (confused, unsure, difficult) decreased 41%.",
        "Rhythm module success rate improved from 44% to 89%.",
        "Sing-back module success rate improved from 33% to 89%.",
      ],
      technology: ["Figma", "FigJam", "GarageBand", "HTML/CSS/JavaScript"],
      capabilities: ["User research", "Usability testing", "Interaction design", "Design systems", "Project management"],
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
