import { Calendar, Mail, MapPin } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { isContactConfigured } from "@/lib/contact/deliver";
import { Suspense } from "react";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactFormWithParams } from "@/components/sections/contact-form-with-params";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

export const metadata = createMetadata({
  title: "Contact",
  description: "Tell us about your project — a new website, a redesign, or a business process you'd like to simplify.",
  path: "/contact",
});

const nextSteps = [
  `You'll receive a personal reply from ${siteConfig.founder.name}.`,
  "We'll arrange a short discovery call to understand your goals.",
  "You'll receive a written proposal with scope and timeline.",
];

export default function ContactPage() {
  // Delivery needs the server API route, which a static export doesn't have.
  const configured = !siteConfig.isStaticExport && isContactConfigured();
  const { email, location, bookingUrl } = siteConfig.contact;

  return (
    <section className="pb-24 md:pb-32">
      <div className="container-site pt-10 md:pt-14">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} className="mb-12 md:mb-20" />
        <div className="grid-site gap-y-14">
          <aside className="col-span-full lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow className="mb-6">Project inquiry</Eyebrow>
                <h1 className="text-headline font-semibold">Tell us about your project.</h1>
                <p className="mt-6 text-lede text-ink-soft">
                  Share a little about your business, what you&apos;re looking to build, or what you would like to improve.
                </p>
              </Reveal>

              <Reveal delay={100} className="mt-10 space-y-4 border-t border-line pt-8 text-[0.9375rem]">
                <a href={`mailto:${email}`} className="flex items-center gap-3 break-all hover:text-accent">
                  <Mail aria-hidden="true" className="size-4 text-accent" /> {email}
                </a>
                {location && (
                  <p className="flex items-center gap-3 text-ink-soft">
                    <MapPin aria-hidden="true" className="size-4 text-accent" /> {location}
                  </p>
                )}
                {bookingUrl && (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-medium underline underline-offset-4 hover:text-accent"
                  >
                    <Calendar aria-hidden="true" className="size-4 text-accent" /> Book a discovery call
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </Reveal>

              <Reveal delay={160} className="mt-10 hidden lg:block">
                <h2 className="font-mono text-eyebrow uppercase text-ink-soft">What happens next</h2>
                <ol className="mt-4 space-y-4">
                  {nextSteps.map((s, i) => (
                    <li key={s} className="flex gap-4 text-[0.9375rem] text-ink-soft">
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </aside>

          <Reveal delay={80} className="col-span-full lg:col-span-7 lg:col-start-6">
            <div className="rounded-lg border border-line bg-surface p-6 md:p-10">
              {/* ?service= pre-selection is read in the browser so the page stays static. */}
              <Suspense fallback={<ContactForm configured={configured} />}>
                <ContactFormWithParams configured={configured} />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
