import { Link as RouterLink } from "react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * App-wide link. Internal paths ("/about") use client-side routing (the
 * router's basename adds any base path). Hashes, mailto: and external URLs
 * render as plain anchors.
 */
export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: ReactNode;
};

export function Link({ href, children, ...rest }: LinkProps) {
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <RouterLink to={href} {...rest}>
        {children}
      </RouterLink>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
