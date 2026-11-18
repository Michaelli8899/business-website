import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70dvh] flex-col justify-center py-24">
      <Eyebrow className="mb-6">404 — Page not found</Eyebrow>
      <h1 className="max-w-3xl text-headline font-semibold">This page doesn&apos;t exist — or has moved.</h1>
      <p className="mt-6 max-w-xl text-lede text-ink-soft">
        Try one of the links below, or head back to the homepage.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" arrow>
          Back to home
        </ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          View work
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact
        </ButtonLink>
      </div>
    </section>
  );
}
