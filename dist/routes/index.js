"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="de20440a-3cf9-5437-9543-795b50e3d3fd")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = __importDefault(require("../config/swaggerConfig"));
const authorRoutes_1 = __importDefault(require("./authorRoutes"));
const baseUrlRoutes_1 = __importDefault(require("./baseUrlRoutes"));
const bookRoutes_1 = __importDefault(require("./bookRoutes"));
const genreRoutes_1 = __importDefault(require("./genreRoutes"));
const healthRoutes_1 = __importDefault(require("./healthRoutes"));
const metricsRoutes_1 = __importDefault(require("./metricsRoutes"));
const paymentRoutes_1 = __importDefault(require("./paymentRoutes"));
const publisherRoutes_1 = __importDefault(require("./publisherRoutes"));
const reviewRoutes_1 = __importDefault(require("./reviewRoutes"));
const sentryRoutes_1 = __importDefault(require("./sentryRoutes"));
const subscriptionRoutes_1 = __importDefault(require("./subscriptionRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const cacheRoutes_1 = __importDefault(require("./cacheRoutes"));
const cookieRoutes_1 = __importDefault(require("./cookieRoutes"));
const router = express_1.default.Router();
const apiV1Router = express_1.default.Router();
apiV1Router.use("/", baseUrlRoutes_1.default);
apiV1Router.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
apiV1Router.use("/health", healthRoutes_1.default);
apiV1Router.use("/auth", userRoutes_1.default);
apiV1Router.use("/authors", authorRoutes_1.default);
apiV1Router.use("/books", bookRoutes_1.default);
apiV1Router.use("/genres", genreRoutes_1.default);
apiV1Router.use("/publishers", publisherRoutes_1.default);
apiV1Router.use("/reviews", reviewRoutes_1.default);
apiV1Router.use("/subscriptions", subscriptionRoutes_1.default);
apiV1Router.use("/payments", paymentRoutes_1.default);
apiV1Router.use("/cache", cacheRoutes_1.default);
apiV1Router.use("/cookies", cookieRoutes_1.default);
apiV1Router.use(metricsRoutes_1.default);
apiV1Router.use(sentryRoutes_1.default);
router.use("/api/v1", apiV1Router);
exports.default = router;
//# sourceMappingURL=index.js.map
//# debugId=de20440a-3cf9-5437-9543-795b50e3d3fd
