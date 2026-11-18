import { createMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { SelectedWork } from "@/components/sections/selected-work";
import { Process } from "@/components/sections/process";
import { Ownership } from "@/components/sections/ownership";
import { AboutPreview } from "@/components/sections/about-preview";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig, absoluteUrl } from "@/config/site";

export const metadata = createMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: siteConfig.name,
          description: siteConfig.description,
          email: siteConfig.contact.email,
          ...(siteConfig.url ? { url: absoluteUrl("/") } : {}),
          ...(siteConfig.contact.location
            ? { areaServed: siteConfig.contact.location, address: { "@type": "PostalAddress", addressLocality: siteConfig.contact.location } }
            : {}),
          founder: { "@type": "Person", name: siteConfig.founder.name },
          knowsAbout: ["Website design", "Web development", "Workflow automation", "AI integration"],
        }}
      />
      <Hero />
      <ServicesOverview />
      <SelectedWork />
      <Process />
      <Ownership />
      <AboutPreview />
      <CtaSection />
    </>
  );
}
