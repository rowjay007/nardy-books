"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="99206c37-6dda-529d-bc24-6c4d049f2c35")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const http_status_1 = __importDefault(require("http-status"));
const morgan_1 = __importDefault(require("morgan"));
const rateLimiter_1 = __importDefault(require("./config/rateLimiter"));
const sentry_1 = __importDefault(require("./config/sentry"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const routes_1 = __importDefault(require("./routes"));
const appError_1 = __importDefault(require("./utils/appError"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://example.com", "http://www.example.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
sentry_1.default.setupExpressErrorHandler(app);
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, hpp_1.default)());
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    },
}));
app.use(rateLimiter_1.default);
app.use(routes_1.default);
sentry_1.default.setupExpressErrorHandler(app);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, http_status_1.default.NOT_FOUND));
});
app.use(errorMiddleware_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map
//# debugId=99206c37-6dda-529d-bc24-6c4d049f2c35
