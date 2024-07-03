import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import env from "./env"; 

Sentry.init({
  dsn: env.SENTRY_DSN, // Replace with your Sentry DSN from Sentry Dashboard
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0, // Capture 100% of transactions for performance monitoring
  profilesSampleRate: 1.0, // Capture 100% of profiles
  environment: env.NODE_ENV, // Optional: Set environment (development, production, etc.)
});

export default Sentry;
