import { useSyncExternalStore } from "react";
import { useSearchParams } from "react-router";
import { serviceOptions, type ServiceValue } from "@/lib/contact/schema";
import { ContactForm } from "./contact-form";

const subscribe = () => () => {};

/**
 * Pre-selects services from ?service=… links (e.g. from the service pages).
 *
 * Prerendered HTML has no query string, so the form first hydrates without a
 * selection, then remounts with it — avoiding a hydration mismatch.
 */
export function ContactFormWithParams({ configured }: { configured: boolean }) {
  const [params] = useSearchParams();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const initialServices = hydrated
    ? params.getAll("service").filter((s): s is ServiceValue => serviceOptions.some((o) => o.value === s))
    : [];
  return (
    <ContactForm
      key={hydrated ? `client:${initialServices.join(",")}` : "server"}
      configured={configured}
      initialServices={initialServices}
    />
  );
}
