import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

/** Scrolls to the top on navigation, or to the #hash target when present. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      // Initial load: leave the browser's own scroll/hash handling alone.
      firstRender.current = false;
      return;
    }
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
    // Move focus to the main landmark so keyboard and screen-reader users
    // start at the new page's content.
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}
