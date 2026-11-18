import "server-only";

/**
 * Minimal structured server logging.
 *
 * Emits single-line JSON so hosting log viewers (Vercel, Netlify, any
 * container platform) can filter and alert on `event`. Personal data
 * (names, emails, messages) must never be passed in `fields`.
 *
 * To forward errors to a monitoring service (e.g. Sentry), add the call in
 * `logError` — every server error path in the app goes through it, as does
 * `onRequestError` in src/instrumentation.ts.
 */

type Fields = Record<string, string | number | boolean | undefined | null>;

export function logEvent(event: string, fields: Fields = {}) {
  console.info(JSON.stringify({ level: "info", event, time: new Date().toISOString(), ...fields }));
}

export function logError(event: string, error: unknown, fields: Fields = {}) {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error(
    JSON.stringify({
      level: "error",
      event,
      time: new Date().toISOString(),
      message: err.message,
      name: err.name,
      ...fields,
    }),
  );
}
