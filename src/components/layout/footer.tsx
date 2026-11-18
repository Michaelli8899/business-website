import { Link } from "@/components/ui/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/data/navigation";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  const { email, location } = siteConfig.contact;

  return (
    <footer className="on-night bg-night text-on-night">
      <div className="container-site">
        <div className="grid-site gap-y-12 py-16 md:py-20">
          <div className="col-span-full lg:col-span-5">
            <Logo tone="inverse" />
            <p className="mt-6 max-w-sm text-on-night-soft">{siteConfig.positioning}</p>
            <a
              href={`mailto:${email}`}
              className="group mt-8 inline-flex max-w-full items-center gap-2 break-all text-lg sm:text-xl font-medium tracking-[-0.01em] text-on-night underline decoration-night-line underline-offset-[6px] transition-colors hover:text-accent-on-dark hover:decoration-accent-on-dark lg:text-2xl"
            >
              {email}
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            {location && <p className="mt-3 text-sm text-on-night-soft">Based in {location}</p>}
          </div>

          <nav aria-label="Footer" className="col-span-full grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-6 lg:col-start-7">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-eyebrow uppercase text-on-night-soft">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] text-on-night transition-colors hover:text-accent-on-dark"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {siteConfig.social.length > 0 && (
              <div>
                <h2 className="font-mono text-eyebrow uppercase text-on-night-soft">Elsewhere</h2>
                <ul className="mt-4 space-y-3">
                  {siteConfig.social.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[0.9375rem] text-on-night transition-colors hover:text-accent-on-dark"
                      >
                        {s.label}
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-night-line py-6 text-sm text-on-night-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
