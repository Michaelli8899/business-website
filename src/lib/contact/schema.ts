/**
 * Contact form schema — shared by the client form and the API route so
 * validation rules are identical on both sides.
 */

export const serviceOptions = [
  { value: "new-website", label: "New website" },
  { value: "website-redesign", label: "Website redesign" },
  { value: "ai-automation", label: "AI & workflow automation" },
  { value: "system-integration", label: "Business system integration" },
  { value: "maintenance", label: "Ongoing maintenance" },
  { value: "handover", label: "Self-managed handover" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "one-month", label: "Within one month" },
  { value: "three-months", label: "Within three months" },
  { value: "flexible", label: "Flexible" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const contactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "video", label: "Video call" },
] as const;

export type ServiceValue = (typeof serviceOptions)[number]["value"];
export type TimelineValue = (typeof timelineOptions)[number]["value"];
export type ContactMethodValue = (typeof contactMethodOptions)[number]["value"];

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  services: ServiceValue[];
  description: string;
  website?: string;
  timeline?: TimelineValue | "";
  contactMethod?: ContactMethodValue | "";
  phone?: string;
};

export type ContactField = keyof ContactInput;
export type FieldErrors = Partial<Record<ContactField, string>>;

export const limits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  company: { min: 1, max: 150 },
  description: { min: 20, max: 5000 },
  website: { max: 300 },
  phone: { max: 40 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,40}$/;

const isOneOf = <T extends string>(list: readonly { value: T }[], v: unknown): v is T =>
  typeof v === "string" && list.some((o) => o.value === v);

/** Single-line value: control characters (incl. CR/LF) collapsed to spaces. */
const str = (v: unknown) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s{2,}/g, " ").trim() : "";

/** Multi-line value: keeps newlines and tabs, strips other control characters. */
const multiline = (v: unknown) =>
  typeof v === "string"
    ? v.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim()
    : "";

/** Accepts "example.com" or a full URL; returns a normalised https URL or null. */
export function normaliseUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return "";
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Validates untrusted input. Returns either cleaned data or field errors.
 */
export function validateContact(
  raw: Record<string, unknown>,
): { ok: true; data: ContactInput } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const name = str(raw.name);
  if (!name) errors.name = "Please enter your name.";
  else if (name.length < limits.name.min) errors.name = "Please enter your full name.";
  else if (name.length > limits.name.max) errors.name = `Please keep this under ${limits.name.max} characters.`;

  const email = str(raw.email);
  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > limits.email.max || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address, like name@business.com.";

  const company = str(raw.company);
  if (!company) errors.company = "Please enter your company or business name.";
  else if (company.length > limits.company.max)
    errors.company = `Please keep this under ${limits.company.max} characters.`;

  const rawServices = Array.isArray(raw.services) ? raw.services : raw.services ? [raw.services] : [];
  const services = Array.from(new Set(rawServices.filter((s) => isOneOf(serviceOptions, s)))) as ServiceValue[];
  if (services.length === 0) errors.services = "Please choose at least one option.";

  const description = multiline(raw.description);
  if (!description) errors.description = "Please tell us a little about your project.";
  else if (description.length < limits.description.min)
    errors.description = `Please add a little more detail (at least ${limits.description.min} characters).`;
  else if (description.length > limits.description.max)
    errors.description = `Please keep this under ${limits.description.max} characters.`;

  const websiteRaw = str(raw.website);
  let website = "";
  if (websiteRaw) {
    const normalised = websiteRaw.length <= limits.website.max ? normaliseUrl(websiteRaw) : null;
    if (normalised === null) errors.website = "Please enter a valid web address, like example.com.";
    else website = normalised;
  }

  const timelineRaw = str(raw.timeline);
  const timeline = isOneOf(timelineOptions, timelineRaw) ? timelineRaw : "";
  if (timelineRaw && !timeline) errors.timeline = "Please choose a timeline from the list.";

  const methodRaw = str(raw.contactMethod);
  const contactMethod = isOneOf(contactMethodOptions, methodRaw) ? methodRaw : "";
  if (methodRaw && !contactMethod) errors.contactMethod = "Please choose a contact method from the list.";

  const phone = str(raw.phone);
  if (contactMethod === "phone") {
    if (!phone) errors.phone = "Please add a phone number so we can call you.";
    else if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      company,
      services,
      description,
      website,
      timeline,
      contactMethod,
      // Only keep the phone number when it is actually needed.
      phone: contactMethod === "phone" ? phone : "",
    },
  };
}

export const labelFor = {
  service: (v: string) => serviceOptions.find((o) => o.value === v)?.label ?? v,
  timeline: (v: string) => timelineOptions.find((o) => o.value === v)?.label ?? v,
  contactMethod: (v: string) => contactMethodOptions.find((o) => o.value === v)?.label ?? v,
};

/** Response shape returned by POST /api/contact. */
export type ContactResponse =
  | { ok: true }
  | {
      ok: false;
      code: "validation" | "not_configured" | "rate_limited" | "spam" | "delivery_failed" | "bad_request";
      message: string;
      errors?: FieldErrors;
    };
