import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import {
  Mail,
  Inbox,
  Tags,
  Database,
  PenLine,
  UserCheck,
  Send,
  Pause,
  Play,
  RotateCcw,
  Check,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Step = {
  id: string;
  title: string;
  description: string;
  actor: "Customer" | "Automation" | "AI" | "Person";
  icon: LucideIcon;
};

const steps: Step[] = [
  { id: "submit", title: "Customer submits inquiry", description: "A potential customer fills in the contact form on your website.", actor: "Customer", icon: Mail },
  { id: "capture", title: "Automation captures information", description: "The submission is received and stored in one place — no copying between inboxes.", actor: "Automation", icon: Inbox },
  { id: "classify", title: "AI classifies the request", description: "The request type and timing are identified, and key details are extracted into structured fields.", actor: "AI", icon: Tags },
  { id: "crm", title: "CRM record is created", description: "A contact and opportunity are created or updated, with the original message attached.", actor: "Automation", icon: Database },
  { id: "draft", title: "Response is drafted", description: "A reply is drafted using your approved tone, templates and business information.", actor: "AI", icon: PenLine },
  { id: "review", title: "Human reviews and approves", description: "A team member checks the draft, edits if needed, and approves it. Nothing is sent without a person.", actor: "Person", icon: UserCheck },
  { id: "send", title: "Customer receives response", description: "The approved reply is sent from your own email account, and the CRM is updated.", actor: "Automation", icon: Send },
];

const REVIEW_INDEX = steps.findIndex((s) => s.id === "review");
const STEP_MS = 2400;

const actorTone: Record<Step["actor"], string> = {
  Customer: "bg-surface text-ink border-line-strong",
  Automation: "bg-surface text-ink border-line-strong",
  AI: "bg-ink text-on-night border-ink",
  Person: "bg-clay text-surface border-clay",
};

export function WorkflowDemo() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [approved, setApproved] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  // Start autoplay once visible, unless the user prefers reduced motion.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && !reduce) {
          setPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Advance automatically; pause at the human review step until approved.
  useEffect(() => {
    if (!playing) return;
    if (active === REVIEW_INDEX && !approved) return;
    if (active >= steps.length - 1) return;
    const t = setTimeout(() => setActive((a) => a + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [playing, active, approved, inView]);

  const select = useCallback((i: number) => {
    setPlaying(false);
    setActive(i);
  }, []);

  const approve = () => {
    setApproved(true);
    setActive(REVIEW_INDEX + 1);
  };

  const replay = () => {
    setApproved(false);
    setActive(0);
    setPlaying(true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % steps.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + steps.length) % steps.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = steps.length - 1;
    if (next >= 0) {
      e.preventDefault();
      select(next);
      tabRefs.current[next]?.focus();
    }
  };

  const step = steps[active];
  const finished = active === steps.length - 1;
  const waitingForApproval = active === REVIEW_INDEX && !approved;

  return (
    <div ref={rootRef} className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-8">
        <p className="font-mono text-eyebrow uppercase text-ink-soft">Example workflow · Website inquiry</p>
        <div className="flex items-center gap-2">
          {finished ? (
            <button type="button" onClick={replay} className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-ink">
              <RotateCcw aria-hidden="true" className="size-3.5" /> Replay
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-ink"
            >
              {playing ? <Pause aria-hidden="true" className="size-3.5" /> : <Play aria-hidden="true" className="size-3.5" />}
              {playing ? "Pause" : "Play"}
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Step list */}
        <div
          role="tablist"
          aria-label="Workflow steps"
          aria-orientation="vertical"
          className="relative border-b border-line p-3 md:p-5 lg:col-span-5 lg:border-b-0 lg:border-r"
        >
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i < active;
            const current = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={current}
                aria-controls={`${baseId}-panel`}
                tabIndex={current ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "group relative flex w-full items-center gap-4 rounded-md px-3 py-3 text-left transition-colors duration-300",
                  current ? "bg-canvas" : "hover:bg-canvas/60",
                )}
              >
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-[1.9rem] top-[3.25rem] h-[calc(100%-2.5rem)] w-px transition-colors duration-500",
                      done ? "bg-accent" : "bg-line",
                    )}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-500",
                    current
                      ? actorTone[s.actor]
                      : done
                        ? "border-accent bg-accent text-canvas"
                        : "border-line bg-surface text-ink-soft",
                    current && "scale-110 shadow-soft",
                  )}
                >
                  {done ? <Check aria-hidden="true" className="size-3.5" /> : <Icon aria-hidden="true" className="size-3.5" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block text-[0.9375rem] font-medium leading-snug", current || done ? "text-ink" : "text-ink-soft")}>
                    {s.title}
                  </span>
                </span>
                <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-soft sm:block">
                  {s.actor}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="relative flex min-h-[26rem] flex-col bg-blueprint p-5 md:p-8 lg:col-span-7"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-accent">{String(active + 1).padStart(2, "0")}</span>
            <span className="h-px flex-1 bg-line" />
            <span className={cn("rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em]", actorTone[step.actor])}>
              {step.actor}
            </span>
          </div>
          <h3 className="mt-6 text-2xl font-semibold tracking-[-0.025em]">{step.title}</h3>
          <p className="mt-2 max-w-md text-ink-soft">{step.description}</p>

          <div key={step.id} className="mt-8 flex-1 animate-fade-up">
            <StepDetail id={step.id} approved={approved} onApprove={approve} />
          </div>

          {waitingForApproval && playing && (
            <p className="mt-4 text-sm text-ink-soft">Paused for human review — approve the draft to continue.</p>
          )}

          <div className="mt-6 h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out-soft"
              style={{ width: `${((active + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-md border border-line bg-surface p-5 shadow-soft", className)}>{children}</div>;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-sm last:border-b-0">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

function StepDetail({ id, approved, onApprove }: { id: string; approved: boolean; onApprove: () => void }) {
  switch (id) {
    case "submit":
      return (
        <Card>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-soft">New form submission · example</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
            &ldquo;Hi — we run a small physiotherapy clinic and our website is quite dated. We&apos;d like a redesign with online booking,
            ideally within the next couple of months. Could someone get in touch?&rdquo;
          </p>
          <p className="mt-4 text-sm text-ink-soft">— Alex, Example Clinic</p>
        </Card>
      );
    case "capture":
      return (
        <Card>
          <dl>
            <Field label="Received via" value="Website form" />
            <Field label="Name" value="Alex" />
            <Field label="Business" value="Example Clinic" />
            <Field label="Email" value="alex@example.com" />
            <Field label="Message" value="Stored with submission" />
          </dl>
        </Card>
      );
    case "classify":
      return (
        <Card>
          <p className="text-sm text-ink-soft">Classification</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Request: Website redesign", "Feature: Online booking", "Timing: Within 3 months", "Industry: Healthcare"].map((t) => (
              <span key={t} className="rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent-strong">{t}</span>
            ))}
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            Unclear or unusual requests are flagged for a person rather than guessed at.
          </p>
        </Card>
      );
    case "crm":
      return (
        <Card>
          <div className="flex items-center justify-between">
            <p className="font-medium">Example Clinic</p>
            <span className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-soft">New opportunity</span>
          </div>
          <dl className="mt-3">
            <Field label="Contact" value="Alex" />
            <Field label="Stage" value="Inquiry received" />
            <Field label="Interest" value="Website redesign + booking" />
            <Field label="Owner" value="Assigned automatically" />
          </dl>
        </Card>
      );
    case "draft":
      return (
        <Card>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-soft">Draft reply</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
            Hi Alex, thanks for getting in touch about a redesign for Example Clinic. Online booking is something we can definitely
            help with. Would you be available for a short call next week to talk through what you need?
          </p>
        </Card>
      );
    case "review":
      return (
        <Card className={cn(approved ? "border-accent" : "border-clay")}>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-soft">Awaiting approval</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
            Hi Alex, thanks for getting in touch about a redesign for Example Clinic&hellip;
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onApprove}
              disabled={approved}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-canvas transition-colors hover:bg-accent-strong disabled:bg-accent"
            >
              <Check aria-hidden="true" className="size-4" />
              {approved ? "Approved" : "Approve & send"}
            </button>
            <span className="inline-flex h-10 items-center px-2 text-sm text-ink-soft">or edit before sending</span>
          </div>
        </Card>
      );
    case "send":
      return (
        <Card>
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-accent text-canvas">
              <Check aria-hidden="true" className="size-4" />
            </span>
            <div>
              <p className="font-medium">Reply sent from your inbox</p>
              <p className="text-sm text-ink-soft">CRM updated · Follow-up reminder scheduled</p>
            </div>
          </div>
        </Card>
      );
    default:
      return null;
  }
}
