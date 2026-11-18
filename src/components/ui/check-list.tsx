import { cn } from "@/lib/cn";

/** Simple list with a small accent tick — used for capabilities. */
export function CheckList({
  items,
  className,
  tone = "default",
  columns = 1,
}: {
  items: readonly string[];
  className?: string;
  tone?: "default" | "inverse";
  columns?: 1 | 2;
}) {
  return (
    <ul
      className={cn(
        "grid gap-x-8",
        columns === 2 && "sm:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex items-baseline gap-3 border-b py-3 text-[0.9375rem]",
            tone === "default" ? "border-line text-ink" : "border-night-line text-on-night",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "relative top-[-0.15em] size-1.5 shrink-0 rotate-45",
              tone === "default" ? "bg-accent" : "bg-accent-on-dark",
            )}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
