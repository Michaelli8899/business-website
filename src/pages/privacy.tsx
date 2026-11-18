import { Seo, type SeoProps } from "@/app/head";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/sections/page-hero";

const seo: SeoProps = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects information submitted through this website.`,
  path: "/privacy",
};

/**
 * Privacy policy tailored to how this website currently works: a static
 * site (hosting provider from VITE_HOSTING_PROVIDER), self-hosted fonts, no
 * analytics or tracking cookies, and a contact form that only transmits
 * data when VITE_CONTACT_ENDPOINT points at the Resend handler in
 * server/contact-handler.ts. If a different form service is used, name it
 * here instead.
 *
 * OWNER / LEGAL REVIEW REQUIRED BEFORE PUBLIC LAUNCH. Then set
 * VITE_PRIVACY_LAST_UPDATED (publication date) and VITE_PRIVACY_REVIEWED=true. If analytics, cookies, embedded
 * third-party content or new processors are added, update this page first.
 */
export default function PrivacyPage() {
  const { email, location } = siteConfig.contact;
  const { lastUpdated, reviewed, hostingProvider } = siteConfig.privacy;
  const formConnected = Boolean(siteConfig.contact.endpoint);
  const mail = (
    <a href={`mailto:${email}`} className="break-all text-ink underline underline-offset-4">
      {email}
    </a>
  );

  return (
    <>
      <Seo {...seo} />
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        eyebrow="Legal"
        title="Privacy Policy"
        description={lastUpdated ? `Last updated ${lastUpdated}.` : "Effective date to be confirmed at publication."}
      />
      <div className="container-site py-16 md:py-24">
        <div className="max-w-prose space-y-10 text-[1.0625rem] leading-relaxed text-ink-soft [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
          {!reviewed && (
            <p className="rounded-md border border-line bg-surface p-4 text-sm">
              This policy is pending final review and may be updated before it takes effect.
            </p>
          )}

          <section>
            <h2>Who we are</h2>
            <p>
              {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is an independent digital solutions studio
              {location ? ` based in ${location}` : ""}, run by {siteConfig.founder.name}. This policy explains what
              information this website collects, why, and how it is handled. If you have any questions, contact {mail}.
            </p>
          </section>

          <section>
            <h2>Information you provide through the contact form</h2>
            <p>When you send us a project inquiry, we collect the information you provide:</p>
            <ul>
              <li>Your full name, email address and company or business name</li>
              <li>The services you are interested in and your project description</li>
              <li>Optionally, your existing website address, preferred timeline and preferred contact method</li>
              <li>A phone number, only if you choose to be contacted by phone</li>
            </ul>
            <p className="mt-3">
              The time of your submission is also recorded. Please avoid including sensitive personal information in your
              message. We do not ask for budget or payment information, and this website does not process payments.
            </p>
          </section>

          <section>
            <h2>Why we collect it</h2>
            <p>
              We use inquiry information only to read and respond to your message, discuss a potential project with you, and
              keep a record of our correspondence. We do not sell your information, share it for advertising, or add you to
              marketing lists.
            </p>
          </section>

          <section>
            <h2>How inquiries reach us</h2>
            {formConnected ? (
              <p>
                When you submit the contact form, your inquiry is sent securely to a small form-processing service operated for
                the studio, which validates it and forwards it to us as an email using{" "}
                <a href="https://resend.com" className="text-ink underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                  Resend
                </a>
                , an email delivery service. Resend processes the contents of your submission in order to deliver it, under its
                own privacy and security terms. Inquiries are then received and stored in our email inbox. To protect the form
                from abuse, a one-way hashed form of your IP address is used briefly to limit how many submissions can be made
                in a short period.
              </p>
            ) : (
              <p>
                Online form submission is not currently enabled, so the contact form does not send your information anywhere.
                If you choose to contact us, you do so by email from your own email account, and your message is received and
                stored in our email inbox.
              </p>
            )}
          </section>

          <section>
            <h2>Website hosting and technical logs</h2>
            <p>
              This website is hosted on {hostingProvider}. As with most websites, the hosting provider may automatically record
              technical information when you visit — such as your IP address, browser type, the pages requested and the time of
              the request — for security, reliability and troubleshooting purposes, under its own privacy terms.
            </p>
          </section>

          <section>
            <h2>Cookies and analytics</h2>
            <p>
              This website does not use analytics, advertising or tracking cookies, and fonts are served from this website
              rather than a third-party font service. If that changes, this policy will be updated before those tools are
              enabled.
            </p>
          </section>

          <section>
            <h2>Third-party processing</h2>
            <p>
              Information may be processed by the service providers described above — our hosting provider,
              {formConnected ? " the form-processing service and Resend for email delivery," : ""} and our email provider —
              only as needed to provide their services. Their handling of data is governed
              by their own terms and privacy policies. We may also disclose information if required by law.
            </p>
          </section>

          <section>
            <h2>Information security</h2>
            <p>
              We take reasonable measures to protect the information you submit: the website is served over an encrypted
              connection (HTTPS),{formConnected ? " form submissions are validated on the server, credentials for connected services are kept on the server and never exposed in the browser," : ""}{" "}
              and access to inquiries is limited to the studio. No method
              of transmission or storage is completely secure, however, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>How long we keep information</h2>
            <p>
              We keep inquiry emails only for as long as they are needed to respond to you, to manage any resulting project
              and our working relationship, and to meet any legal or record-keeping obligations. When information is no longer
              needed, we delete it. You can ask us to delete your inquiry at any time.
            </p>
          </section>

          <section>
            <h2>Your privacy requests</h2>
            <p>
              You can ask to access, correct or delete the personal information you have submitted, or ask questions about how
              it is handled, by emailing {mail}. We will respond to reasonable requests and may need to confirm your identity
              before acting on them.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>
              We may update this policy as the website or our services change. The date at the top of this page shows when it
              was last updated. Significant changes will be reflected here before they take effect.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              {siteConfig.name}
              <br />
              {location}
              <br />
              {mail}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
