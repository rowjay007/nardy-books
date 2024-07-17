"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="522035a3-6d0f-55ed-998e-e1629c79afae")}catch(e){}}();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prom_client_1 = require("prom-client");
const router = express_1.default.Router();
(0, prom_client_1.collectDefaultMetrics)();
const httpRequestDurationHistogram = new prom_client_1.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.5, 1, 1.5, 2, 5],
});
const httpRequestDurationSummary = new prom_client_1.Summary({
    name: "http_request_duration_summary_seconds",
    help: "Summary of HTTP request durations in seconds",
    labelNames: ["method", "route", "status_code"],
});
const activeRequestsGauge = new prom_client_1.Gauge({
    name: "active_requests",
    help: "Number of active requests",
});
const requestCounter = new prom_client_1.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"],
});
/**
 * @swagger
 * tags:
 *   name: Metrics
 *   description: Metrics collection and reporting
 */
/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Get application metrics
 *     tags: [Metrics]
 *     responses:
 *       200:
 *         description: Metrics collected by Prometheus
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Some server error
 */
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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set("Content-Type", prom_client_1.register.contentType);
    res.end(yield prom_client_1.register.metrics());
}));
exports.default = router;
//# sourceMappingURL=metricsRoutes.js.map
//# debugId=522035a3-6d0f-55ed-998e-e1629c79afae
