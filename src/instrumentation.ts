import type { Instrumentation } from "next";

/**
 * Server error monitoring hook. Next.js calls onRequestError for every
 * uncaught error in server components, route handlers and server actions.
 *
 * Errors are logged as structured JSON (visible in the hosting provider's
 * logs). To send them to a monitoring service such as Sentry, forward the
 * error from here — see README → Security → Error monitoring.
 */
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error(
    JSON.stringify({
      level: "error",
      event: "request.unhandled_error",
      time: new Date().toISOString(),
      message: err.message,
      digest: (error as { digest?: string }).digest,
      method: request.method,
      path: request.path.split("?")[0],
      routePath: context.routePath,
      routeType: context.routeType,
    }),
  );
};
