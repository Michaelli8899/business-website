"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info, Mail } from "lucide-react";
import {
  contactMethodOptions,
  limits,
  serviceOptions,
  timelineOptions,
  validateContact,
  type ContactField,
  type ContactResponse,
  type FieldErrors,
  type ServiceValue,
} from "@/lib/contact/schema";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; code: string; message: string; mailto?: string };

const fieldOrder: ContactField[] = [
  "name",
  "email",
  "company",
  "services",
  "description",
  "website",
  "timeline",
  "contactMethod",
  "phone",
];

export function ContactForm({
  configured,
  initialServices = [],
}: {
  configured: boolean;
  initialServices?: ServiceValue[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState(false);
  const [services, setServices] = useState<ServiceValue[]>(initialServices);
  const [contactMethod, setContactMethod] = useState("");
  const [descLength, setDescLength] = useState(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Move focus to the success or error message once it has rendered.
  useEffect(() => {
    if (status.state === "success" || status.state === "error") statusRef.current?.focus();
  }, [status]);

  const read = () => {
    const fd = new FormData(formRef.current!);
    return {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      services: fd.getAll("services"),
      description: fd.get("description"),
      website: fd.get("website"),
      timeline: fd.get("timeline"),
      contactMethod: fd.get("contactMethod"),
      phone: fd.get("phone"),
      fax: fd.get("fax"),
    } as Record<string, unknown>;
  };

  // After a first submit attempt, re-validate as the user edits.
  const revalidate = () => {
    if (!touched) return;
    const result = validateContact(read());
    setErrors(result.ok ? {} : result.errors);
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = fieldOrder.find((f) => errs[f]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  const mailtoFallback = () => {
    if (!formRef.current) return `mailto:${siteConfig.contact.email}`;
    const fd = new FormData(formRef.current);
    const subject = `Project inquiry — ${fd.get("company") || ""}`;
    const body = `${fd.get("description") || ""}\n\n— ${fd.get("name") || ""}`;
    return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "submitting") return;
    setTouched(true);

    const raw = read();
    const result = validateContact(raw);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus({ state: "idle" });
      focusFirstError(result.errors);
      return;
    }
    setErrors({});
    setStatus({ state: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;

      if (res.ok && data?.ok) {
        setStatus({ state: "success" });
        formRef.current?.reset();
        setServices([]);
        setContactMethod("");
        setDescLength(0);
        setTouched(false);
        return;
      }

      if (data && !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          focusFirstError(data.errors);
        }
        setStatus({ state: "error", code: data.code, message: data.message, mailto: mailtoFallback() });
      } else {
        setStatus({
          state: "error",
          code: "unknown",
          mailto: mailtoFallback(),
          message: `Something went wrong. Please try again, or email ${siteConfig.contact.email}.`,
        });
      }
    } catch {
      setStatus({
        state: "error",
        code: "network",
        mailto: mailtoFallback(),
        message: `We couldn't reach the server. Check your connection and try again, or email ${siteConfig.contact.email}.`,
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-accent/40 bg-accent-soft p-8 outline-none md:p-12"
      >
        <CheckCircle2 aria-hidden="true" className="size-8 text-accent" strokeWidth={1.5} />
        <h2 className="mt-6 text-title font-semibold">Thank you — your message has been sent.</h2>
        <p className="mt-4 max-w-lg text-ink-soft">
          Your inquiry has been sent. {siteConfig.founder.name} will reply to you personally by email.
          If anything is urgent, email{" "}
          <a className="text-ink underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus({ state: "idle" })}>
          Send another message
        </Button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onChange={revalidate} aria-describedby="form-note" className="space-y-10">
      {!configured && (
        <Notice tone="info" icon={<Info aria-hidden="true" className="size-5" />}>
          <strong className="font-medium text-ink">Online inquiries are not connected yet.</strong> Submitting this form will
          not send a message until delivery is configured. In the meantime, please email{" "}
          <a className="text-ink underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          .
        </Notice>
      )}

      <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="assertive">
        {status.state === "error" && (
          <Notice tone="error" icon={<AlertCircle aria-hidden="true" className="size-5" />}>
            <p>{status.message}</p>
            {status.mailto && ["not_configured", "delivery_failed", "network", "unknown"].includes(status.code) && (
              <a
                href={status.mailto}
                className="mt-3 inline-flex items-center gap-2 font-medium text-ink underline underline-offset-4"
              >
                <Mail aria-hidden="true" className="size-4" /> Open in your email app instead
              </a>
            )}
          </Notice>
        )}
        {touched && errorCount > 0 && status.state !== "error" && (
          <Notice tone="error" icon={<AlertCircle aria-hidden="true" className="size-5" />}>
            Please check {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} below.
          </Notice>
        )}
      </div>

      <fieldset className="space-y-6">
        <legend className="mb-6 font-mono text-eyebrow uppercase text-ink-soft">About you</legend>
        <div className="grid gap-6 md:grid-cols-2">
          <TextField name="name" label="Full name" autoComplete="name" required error={errors.name} maxLength={limits.name.max} />
          <TextField
            name="email"
            type="email"
            label="Email address"
            autoComplete="email"
            inputMode="email"
            required
            error={errors.email}
            maxLength={limits.email.max}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            name="company"
            label="Company or business name"
            autoComplete="organization"
            required
            error={errors.company}
            maxLength={limits.company.max}
          />
          <TextField
            name="website"
            label="Existing website"
            optional
            placeholder="example.com"
            autoComplete="url"
            inputMode="url"
            error={errors.website}
            maxLength={limits.website.max}
          />
        </div>
      </fieldset>

      <fieldset aria-describedby={errors.services ? "services-error" : "services-hint"} aria-invalid={!!errors.services || undefined}>
        <legend className="font-mono text-eyebrow uppercase text-ink-soft">
          What can we help with? <span aria-hidden="true" className="text-accent">*</span>
          <span className="sr-only">(required)</span>
        </legend>
        <p id="services-hint" className="mt-2 text-sm text-ink-soft">Choose all that apply.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {serviceOptions.map((o) => {
            const checked = services.includes(o.value);
            return (
              <label
                key={o.value}
                className={cn(
                  "relative inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[0.9375rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                  checked ? "border-ink bg-ink text-canvas" : "border-line-strong bg-surface hover:border-ink",
                  errors.services && !checked && "border-danger/60",
                )}
              >
                <input
                  type="checkbox"
                  name="services"
                  value={o.value}
                  checked={checked}
                  onChange={(e) =>
                    setServices((s) => (e.target.checked ? [...s, o.value] : s.filter((v) => v !== o.value)))
                  }
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-4 place-items-center rounded-full border transition-colors",
                    checked ? "border-accent-on-dark bg-accent-on-dark" : "border-line-strong",
                  )}
                >
                  {checked && <span className="size-1.5 rounded-full bg-night" />}
                </span>
                {o.label}
              </label>
            );
          })}
        </div>
        {errors.services && <FieldError id="services-error">{errors.services}</FieldError>}
      </fieldset>

      <fieldset>
        <legend className="sr-only">Project details</legend>
        <Field
          id="description"
          label="Project description"
          required
          error={errors.description}
          hint="What are you looking to build or improve? Any goals, challenges or tools involved are helpful."
        >
          {(props) => (
            <>
              <textarea
                {...props}
                name="description"
                rows={6}
                maxLength={limits.description.max}
                onInput={(e) => setDescLength(e.currentTarget.value.length)}
                className={inputClass(!!errors.description, "min-h-40 resize-y py-3.5")}
              />
              <p className="mt-2 text-right font-mono text-xs text-ink-soft" aria-hidden="true">
                {descLength} / {limits.description.max}
              </p>
            </>
          )}
        </Field>
      </fieldset>

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="mb-6 font-mono text-eyebrow uppercase text-ink-soft">Preferences</legend>
        <SelectField name="timeline" label="Preferred timeline" error={errors.timeline} options={timelineOptions} />
        <SelectField
          name="contactMethod"
          label="Preferred contact method"
          error={errors.contactMethod}
          options={contactMethodOptions}
          onChange={setContactMethod}
        />
        {contactMethod === "phone" && (
          <div className="md:col-span-2 md:w-1/2 md:pr-3">
            <TextField
              name="phone"
              type="tel"
              label="Phone number"
              autoComplete="tel"
              inputMode="tel"
              required
              error={errors.phone}
              maxLength={limits.phone.max}
            />
          </div>
        )}
      </fieldset>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Fax number
          <input type="text" name="fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="max-w-md text-sm text-ink-soft">
          Fields marked <span className="text-accent">*</span> are required. Your details are only used to respond to your
          inquiry — see the{" "}
          <a href="/privacy" className="text-ink underline underline-offset-4">
            privacy policy
          </a>
          .
        </p>
        <Button type="submit" size="lg" arrow loading={status.state === "submitting"} loadingLabel="Sending…" className="shrink-0">
          Send inquiry
        </Button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function inputClass(invalid: boolean, extra?: string) {
  return cn(
    "block w-full rounded-md border bg-surface px-4 text-base text-ink placeholder:text-ink-soft/70 transition-[border-color,box-shadow] duration-200",
    "hover:border-ink/40 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15",
    "disabled:cursor-not-allowed disabled:opacity-60",
    invalid ? "border-danger focus:border-danger focus:ring-danger/15" : "border-line-strong",
    extra ?? "h-12",
  );
}

type ControlProps = {
  id: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
  required?: boolean;
  "aria-required"?: true;
};

function Field({
  id,
  label,
  required,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-2 text-[0.9375rem] font-medium text-ink">
        <span>
          {label}
          {required && (
            <>
              <span aria-hidden="true" className="ml-0.5 text-accent">*</span>
            </>
          )}
        </span>
        {optional && <span className="text-sm font-normal text-ink-soft">Optional</span>}
      </label>
      {hint && (
        <p id={hintId} className="-mt-1 mb-2 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required ? true : undefined,
      })}
      {error && <FieldError id={errorId!}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      {children}
    </p>
  );
}

function TextField({
  name,
  label,
  type = "text",
  required,
  optional,
  error,
  ...rest
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "url" | "tel";
  maxLength?: number;
}) {
  const id = useId();
  return (
    <Field id={id} label={label} required={required} optional={optional} error={error}>
      {(props) => <input {...props} {...rest} name={name} type={type} className={inputClass(!!error)} />}
    </Field>
  );
}

function SelectField({
  name,
  label,
  error,
  options,
  onChange,
}: {
  name: string;
  label: string;
  error?: string;
  options: readonly { value: string; label: string }[];
  onChange?: (v: string) => void;
}) {
  const id = useId();
  return (
    <Field id={id} label={label} optional error={error}>
      {(props) => (
        <div className="relative">
          <select
            {...props}
            name={name}
            defaultValue=""
            onChange={(e) => onChange?.(e.target.value)}
            className={inputClass(!!error, "h-12 appearance-none pr-10")}
          >
            <option value="">Select an option</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft"
          >
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </Field>
  );
}

function Notice({ tone, icon, children }: { tone: "info" | "error"; icon: ReactNode; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-md border p-4 text-[0.9375rem] leading-relaxed",
        tone === "info" ? "border-line-strong bg-surface text-ink-soft" : "border-danger/30 bg-danger-soft text-ink",
      )}
    >
      <span className={cn("mt-0.5 shrink-0", tone === "info" ? "text-accent" : "text-danger")}>{icon}</span>
      <div>{children}</div>
    </div>
  );
}
