import express from "express";
import {
  collectDefaultMetrics,
  register,
  Histogram,
  Summary,
  Gauge,
  Counter,
} from "prom-client";

const router = express.Router();

collectDefaultMetrics();

const httpRequestDurationHistogram = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5],
});

const httpRequestDurationSummary = new Summary({
  name: "http_request_duration_summary_seconds",
  help: "Summary of HTTP request durations in seconds",
  labelNames: ["method", "route", "status_code"],
});

const activeRequestsGauge = new Gauge({
  name: "active_requests",
  help: "Number of active requests",
});

const requestCounter = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// Middleware to record metrics
router.use((req, res, next) => {
  const endHistogram = httpRequestDurationHistogram.startTimer();
  const endSummary = httpRequestDurationSummary.startTimer();

  activeRequestsGauge.inc();
  requestCounter.inc({
    method: req.method,
    route: req.path,
    status_code: res.statusCode,
  });

  res.on("finish", () => {
    endHistogram({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
    endSummary({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
    activeRequestsGauge.dec();
  });

  next();
});

router.get("/", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

export default router;
