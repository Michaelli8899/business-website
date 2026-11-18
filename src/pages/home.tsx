import { Seo, type SeoProps } from "@/app/head";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { SelectedWork } from "@/components/sections/selected-work";
import { Process } from "@/components/sections/process";
import { Ownership } from "@/components/sections/ownership";
import { AboutPreview } from "@/components/sections/about-preview";
import { CtaSection } from "@/components/sections/cta-section";
import { siteConfig, absoluteUrl } from "@/config/site";

const seo: SeoProps = { path: "/" };

export default function HomePage() {
  return (
    <>
      <Seo
        {...seo}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: siteConfig.name,
          alternateName: siteConfig.displayName,
          slogan: siteConfig.tagline,
          description: siteConfig.description,
          email: siteConfig.contact.email,
          ...(siteConfig.url
            ? { url: absoluteUrl("/"), logo: absoluteUrl("/brand/frame-and-flow-wordmark.svg"), image: absoluteUrl("/og.png") }
            : {}),
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.contact.address.locality,
            addressRegion: siteConfig.contact.address.region,
            addressCountry: siteConfig.contact.address.country,
          },
          areaServed: "United States",
          founder: { "@type": "Person", name: siteConfig.founder.name, jobTitle: siteConfig.founder.role },
          ...(siteConfig.social.length > 0 ? { sameAs: siteConfig.social.map((s) => s.href) } : {}),
          knowsAbout: ["Website design", "Web development", "Website deployment", "Workflow automation", "AI integration"],
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
