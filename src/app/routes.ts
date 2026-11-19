import { projects } from "@/data/projects";

/** Every route that is prerendered to static HTML. */
export const staticRoutes = [
  "/",
  "/services/ux-design",
  "/services/websites",
  "/services/ai",
  "/work",
  ...projects.map((p) => `/work/${p.slug}`),
  "/about",
  "/contact",
  "/privacy",
];
