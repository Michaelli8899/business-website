export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export const servicesNav: NavLink[] = [
  {
    label: "UI/UX Design",
    href: "/services/ux-design",
    description: "Research-led interface and experience design.",
  },
  {
    label: "Website Solutions",
    href: "/services/websites",
    description: "Design, development, deployment and care.",
  },
  {
    label: "AI & Automation",
    href: "/services/ai",
    description: "Practical systems that reduce repetitive work.",
  },
];

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services/ux-design", children: servicesNav },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const primaryCta: NavLink = { label: "Let's Talk", href: "/contact" };

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: servicesNav.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Studio",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Privacy Policy", href: "/privacy" }],
  },
];
