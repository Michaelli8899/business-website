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

export type ProjectCategory = "websites" | "ai" | "product";

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
  { id: "websites", label: "Websites" },
  { id: "ai", label: "AI & Automation" },
  { id: "product", label: "Product Design" },
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
    slug: "noteful",
    title: "Noteful",
    category: "product",
    type: "Product Design · UX Research",
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
  {
    slug: "nio-in-vehicle-ai-agent",
    title: "NIO In-Vehicle AI Agent",
    category: "ai",
    type: "AI Product Design · Vehicle UX",
    engagement: "internship",
    summary:
      "Product design for NIO drivers: an in-car AI assistant that remembers places, schedules reminders and recommends short detours during a commute — designed for voice and visual interaction.",
    scope: ["Research", "Concept development", "Multimodal interaction design", "Prototyping"],
    role: "Designer, Researcher",
    team: "Michael Li with two designer mentors",
    timeline: "7 weeks",
    image: {
      src: "/work/nio/cover.webp",
      alt: "NIO in-car center display showing a navigation map with the assistant suggesting nearby places.",
      width: 1600,
      height: 630,
      focus: "78% 50%",
    },
    sourceUrl: "https://www.michaelmli.com/#/case/nio",
    caseStudy: {
      overview:
        "During a UI/UX internship at NIO, the team explored how improved assistive driving could free enough attention for richer in-vehicle services — ones that work better in the car than on a phone. Michael researched the opportunity and designed a concept for NOMI, NIO's in-car AI assistant.",
      challenge:
        "Drivers notice places and small leisure opportunities during their commutes, but busy routines make them easy to forget. NIO drivers often struggle to balance work and leisure, feel worn down by repetitive routines and want more chances to relax — yet planning is the friction.",
      approach: [
        {
          title: "Research the opportunity",
          description:
            "Competitor and EV market research highlighted three trends: GPT-style natural interaction, personalization, and assistive driving that gives drivers more freedom. Personas and a journey map grounded the concept in real commute scenarios.",
        },
        {
          title: "Focus a broad brief",
          description:
            "Two scenarios — forgetting a place you meant to visit, and after-work fatigue — narrowed the work into a loop of record, recommend and remind.",
        },
        {
          title: "Design for the car, not the phone",
          description:
            "Visuals carry essential information while NOMI provides detail by voice; choices start from what the driver wants to do; and flows adapt to location, timing, navigation state and whether the car is parked or moving.",
        },
      ],
      solution: [
        { title: "Explore & schedule", description: "Drivers ask NOMI about a place by voice and schedule a future visit while driving." },
        { title: "Reminders", description: "After planning a trip, the vehicle reminds the driver at an appropriate moment." },
        { title: "Route-aware recommendations", description: "Saved and frequently visited places become suggestions for short stops along the commute." },
        { title: "Task follow-through", description: "Once the driver picks a task, the vehicle turns it into a concrete destination update." },
      ],
      gallery: [
        { image: { src: "/work/nio/explore.webp", alt: "Annotated exploration flow: the driver asks the voice agent about a restaurant outside and confirms a future visit.", width: 1600, height: 573 }, caption: "Exploration and scheduling flow, annotated." },
        { image: { src: "/work/nio/multimodal.webp", alt: "Multimodal recommendation scenario: the visual display shows place options while paired audio from the assistant explains the choices.", width: 1600, height: 832 }, caption: "Visuals for essentials, voice for detail." },
        { image: { src: "/work/nio/context.webp", alt: "In-car display with a place card showing a photo, rating and options to navigate now or later.", width: 1600, height: 1000 }, caption: "Context-aware information about a place." },
        { image: { src: "/work/nio/task.webp", alt: "In-car map with the assistant offering photo-based recommendations for a stop.", width: 1600, height: 1000 }, caption: "Context-aware task recommendations during a commute." },
      ],
      goals: [
        "Use the car's context instead of copying a phone planning experience into the dashboard.",
        "Help drivers remember and act on places they notice.",
        "Keep interactions safe and low-effort while driving.",
      ],
      technology: ["Figma"],
      capabilities: ["Vehicle UX", "Conversational & voice design", "Multimodal prototyping", "User research"],
    },
  },
  {
    slug: "motionmend",
    title: "MotionMend",
    category: "product",
    type: "Mixed Reality · Product Design",
    engagement: "academic",
    summary:
      "A mixed-reality product concept that brings real-time physical therapy guidance into the home through immersive visuals, wearable sensors and haptic feedback.",
    scope: ["Research", "Concept design", "Interaction design", "Motion prototyping"],
    role: "Designer, Researcher",
    team: "Three designers",
    timeline: "6 weeks",
    image: {
      src: "/work/motionmend/cover.webp",
      alt: "Mixed-reality panels floating in a living room: a body diagram for wearable placement and an exercise card for a forearm stretch.",
      width: 1600,
      height: 632,
      focus: "50% 50%",
    },
    sourceUrl: "https://www.michaelmli.com/#/case/motionmend",
    caseStudy: {
      overview:
        "MotionMend is a Carnegie Mellon academic project to design a near-future product using spatial computing and IoT to address a real problem. The team narrowed from home life and health care to physical therapy patients, and designed a mixed-reality system that extends the guidance patients receive in the clinic into their at-home routines.",
      challenge:
        "Once physical therapy moves from the clinic to the home, patients lose guidance, correction and motivation. They may perform exercises incorrectly, risk hurting themselves, or disengage because of repetitive routines without feedback.",
      approach: [
        {
          title: "Map the current journey",
          description:
            "Literature and patient conversations identified four stages of at-home therapy and three main barriers: physiological, safety and engagement.",
        },
        {
          title: "Augment, don't replace",
          description:
            "Inspired by Bill Buxton's 'long nose' and Nick Foster's 'future mundane', the concept focuses on incremental improvements to current practice rather than pure futurism.",
        },
        {
          title: "Prototype with motion",
          description:
            "The team used concept movies and motion prototypes to iterate on the product's functionality and experience.",
        },
      ],
      solution: [
        { title: "Accountability", description: "Patients check in so the system can help them complete their routines." },
        { title: "Immersive guidance", description: "Mixed reality renders exercises in 3D so patients understand what is required." },
        { title: "Sensor intervention", description: "Wearable bands detect incorrect form and give timely vibration warnings and directional guidance." },
        { title: "Adaptive routines", description: "Questionnaire and sensor data help adjust the next routine to the patient's needs." },
      ],
      gallery: [
        { image: { src: "/work/motionmend/problem.webp", alt: "Chart of the current state: patients receive real-time therapist feedback only at weekly check-ins, with no feedback in between.", width: 1600, height: 885 }, caption: "Today: feedback only at clinic visits." },
        { image: { src: "/work/motionmend/outcome.webp", alt: "Chart with MotionMend: continuous feedback between clinic check-ins during at-home sessions.", width: 1600, height: 885 }, caption: "With MotionMend: continuous feedback between visits." },
        { image: { src: "/work/motionmend/guided.webp", alt: "Prototype wearable band worn on a forearm.", width: 1600, height: 1200 }, caption: "Wearable band concept for form detection and haptic guidance." },
      ],
      goals: [
        "Give patients real-time support between appointments.",
        "Reduce incorrect or unsafe exercise at home.",
        "Keep patients motivated and accountable.",
      ],
      technology: ["Figma", "Adobe After Effects"],
      capabilities: ["Spatial / mixed-reality design", "Haptic interaction design", "Research", "Motion prototyping"],
    },
  },
  {
    slug: "bumble-spots",
    title: "Bumble Spots",
    category: "product",
    type: "Mobile Product Design · New Feature",
    engagement: "academic",
    summary:
      "A concept feature for a dating app: users save places they love and match with people who share them — turning location from a distance signal into shared context and conversation starters.",
    scope: ["Research", "Concept ideation", "UI design", "Multi-platform prototyping"],
    role: "Research, concept ideation, UI design, prototyping",
    team: "Solo designer",
    timeline: "5 weeks",
    image: {
      src: "/work/bumble-spots/cover.webp",
      alt: "Two phones showing the Spots concept: a map of saved places and a match screen highlighting places both people love.",
      width: 1600,
      height: 682,
      focus: "65% 50%",
    },
    sourceUrl: "https://www.michaelmli.com/#/case/bumble",
    note: "An independent academic concept. Not affiliated with, commissioned or endorsed by Bumble.",
    caseStudy: {
      overview:
        "Bumble Spots is a five-week academic concept exploring how a dating app's location feature could add more meaningful value for premium subscribers. Rather than making location more precise, the concept reframes it as shared meaning: users curate places they want to visit or enjoyed, and connect with people who share them.",
      challenge:
        "The brief asked how sharpening location precision could lift premium subscriptions. Research into why people cancel dating-app subscriptions pointed elsewhere: users feel overwhelmed by the number of profiles, frustrated by a lack of compatible matches, and want to navigate the pool more efficiently.",
      approach: [
        {
          title: "Reframe the prompt",
          description:
            "Instead of location accuracy, the concept asks how shared, specific places could narrow the pool to people with common interests, within a reasonable distance, with something concrete to talk about.",
        },
        {
          title: "Ground it in a persona",
          description:
            "A busy professional whose interest in local galleries and craft shops gives the app a more meaningful way to surface compatible matches.",
        },
        {
          title: "Critique and refine",
          description:
            "A mid-fidelity concept was critiqued and refined around privacy, map legibility, category clarity and how much place detail to show on profiles.",
        },
      ],
      solution: [
        { title: "Explore Spots", description: "Browse places on a map or by search and add them to a personal list." },
        { title: "Match by Spots", description: "See people who share your spots, and add their places to your own list." },
        { title: "Date invites", description: "Send an invitation to a specific spot from within a conversation." },
        { title: "Multi-platform system", description: "Reusable components adapted for mobile, desktop and Apple Watch." },
      ],
      gallery: [
        { image: { src: "/work/bumble-spots/flow1.webp", alt: "Explore and add Spots flow: navigating a map, checking a spot's details and adding it to a personal list.", width: 1600, height: 622 }, caption: "Explore and add Spots." },
        { image: { src: "/work/bumble-spots/explore.webp", alt: "Match by Spots flow: browsing a profile that shows shared places and adding them to your own list.", width: 1600, height: 625 }, caption: "Match through shared places." },
        { image: { src: "/work/bumble-spots/desktop.webp", alt: "Desktop adaptation: a list of top spots beside a map with a place card and potential encounters.", width: 673, height: 438 }, caption: "Desktop adaptation for deeper browsing." },
      ],
      goals: [
        "Give premium subscribers a clearer reason to pay.",
        "Help users find more compatible matches through shared interests.",
        "Make it easier to turn a match into a first date.",
      ],
      technology: ["Figma", "FigJam"],
      capabilities: ["Product strategy", "Mobile UI design", "Design systems", "Multi-platform design"],
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
