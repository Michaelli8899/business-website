import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = Omit<ComponentPropsWithoutRef<typeof Link>, "children"> & {
  children: ReactNode;
  icon?: "arrow" | "external" | "none";
  tone?: "default" | "inverse";
};

/** Underlined inline link with an animated arrow. */
export function TextLink({
  children,
  className,
  icon = "arrow",
  tone = "default",
  ...rest
}: Props) {
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  return (
    <Link
      className={cn(
        "group/link inline-flex items-center gap-1.5 font-medium underline decoration-1 underline-offset-[6px] transition-colors duration-200",
        tone === "default"
          ? "text-ink decoration-line-strong hover:text-accent hover:decoration-accent"
          : "text-on-night decoration-night-line hover:text-accent-on-dark hover:decoration-accent-on-dark",
        className,
      )}
      {...rest}
    >
      {children}
      {icon !== "none" && (
        <Icon
          aria-hidden="true"
          className={cn(
            "size-4 transition-transform duration-200 ease-out-soft",
            icon === "external"
              ? "group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              : "group-hover/link:translate-x-0.5",
          )}
        />
      )}
    </Link>
  );
}
