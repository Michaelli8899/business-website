"use client";

import { useSearchParams } from "next/navigation";
import { serviceOptions, type ServiceValue } from "@/lib/contact/schema";
import { ContactForm } from "./contact-form";

/** Pre-selects services from ?service=… links (e.g. from the service pages). */
export function ContactFormWithParams({ configured }: { configured: boolean }) {
  const params = useSearchParams();
  const initialServices = params
    .getAll("service")
    .filter((s): s is ServiceValue => serviceOptions.some((o) => o.value === s));
  return <ContactForm configured={configured} initialServices={initialServices} />;
}
