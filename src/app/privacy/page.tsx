import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/sections/page-hero";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects information submitted through this website.`,
  path: "/privacy",
});

/** Last reviewed date — update whenever the policy changes. */
const LAST_UPDATED = "November 2026";

export default function PrivacyPage() {
  const { email } = siteConfig.contact;
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated ${LAST_UPDATED}.`}
      />
      <div className="container-site py-16 md:py-24">
        <div className="max-w-prose space-y-10 text-[1.0625rem] leading-relaxed text-ink-soft [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
          <p className="rounded-md border border-line bg-surface p-4 text-sm">
            This template is provided as a starting point and is not legal advice. Review it with a qualified professional and
            update it to reflect the services and tools you actually use before launch.
          </p>
          <section>
            <h2>Who we are</h2>
            <p>
              {siteConfig.name} is an independent digital studio{siteConfig.contact.location ? ` based in ${siteConfig.contact.location}` : ""}.
              This policy explains what information this website collects and how it is used. Questions can be sent to{" "}
              <a href={`mailto:${email}`} className="text-ink underline underline-offset-4">{email}</a>.
            </p>
          </section>
          <section>
            <h2>Information you provide</h2>
            <p>When you submit the project inquiry form, we collect:</p>
            <ul>
              <li>Your name, email address and company or business name</li>
              <li>The services you are interested in and your project description</li>
              <li>Optionally, your existing website, preferred timeline and preferred contact method</li>
              <li>A phone number, only if you choose to be contacted by phone</li>
            </ul>
            <p className="mt-3">We do not ask for budget information and we do not collect payment details through this website.</p>
          </section>
          <section>
            <h2>How we use it</h2>
            <p>
              Information submitted through the form is used solely to respond to your inquiry, discuss a potential project and
              keep a record of our correspondence. We do not sell your information or use it for unrelated marketing.
            </p>
          </section>
          <section>
            <h2>Service providers</h2>
            <p>
              Inquiries may be delivered using third-party services such as an email delivery provider or a workflow automation
              platform, and the website is hosted by a third-party hosting provider. These providers process data on our behalf
              and only as needed to provide their service.
            </p>
          </section>
          <section>
            <h2>Technical information</h2>
            <p>
              Like most websites, our hosting provider may automatically log technical information such as IP address, browser
              type and pages visited for security and performance purposes. IP addresses are also used briefly to prevent abuse
              of the contact form. This website does not use advertising cookies.
            </p>
          </section>
          <section>
            <h2>Retention</h2>
            <p>
              We keep inquiry information for as long as needed to respond and, where a project proceeds, for the duration of our
              working relationship and any legal record-keeping obligations.
            </p>
          </section>
          <section>
            <h2>Your choices</h2>
            <p>
              You can ask to access, correct or delete the information you have submitted at any time by emailing{" "}
              <a href={`mailto:${email}`} className="text-ink underline underline-offset-4">{email}</a>.
            </p>
          </section>
          <section>
            <h2>Changes</h2>
            <p>We may update this policy from time to time. The date at the top of this page shows when it was last revised.</p>
          </section>
        </div>
      </div>
    </>
  );
}
