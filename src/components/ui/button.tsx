import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "outline-inverse";
type Size = "md" | "lg";

const base =
  "group/button relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out-soft select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas hover:bg-accent-strong focus-visible:bg-accent-strong",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-surface",
  ghost: "text-ink hover:bg-accent-soft",
  inverse: "bg-on-night text-night hover:bg-accent-on-dark",
  "outline-inverse":
    "border border-night-line text-on-night hover:border-on-night-soft hover:bg-night-soft",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Shows a trailing arrow that nudges on hover. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-200 ease-out-soft group-hover/button:translate-x-0.5"
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  loading = false,
  loadingLabel,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: CommonProps & { loading?: boolean; loadingLabel?: string } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {loading ? (
        <>
          <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          {loadingLabel ?? children}
        </>
      ) : (
        <>
          {children}
          {arrow && <Arrow />}
        </>
      )}
    </button>
  );
}
