import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./app/app";
import { HeadContext, headTagsToHtml, staticHeadHtml, type HeadCollector } from "./app/head";

export { staticRoutes } from "./app/routes";
export { siteConfig, absoluteUrl, assetPath } from "./config/site";

/** Renders one route to HTML for scripts/prerender.mjs. */
export function render(url: string) {
  const collector: HeadCollector = {
    tags: [],
    set(tags) {
      this.tags = tags;
    },
  };
  const basename = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";
  // The router matches against the full URL, including the base path.
  const location = basename === "/" ? url : `${basename}${url}`;
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={collector}>
        <StaticRouter location={location} basename={basename}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  );
  return { html, head: `${headTagsToHtml(collector.tags)}\n    ${staticHeadHtml()}` };
}
