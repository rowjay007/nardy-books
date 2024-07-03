"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="02079d8e-a5b2-5fae-8751-ccc4f0d4d5d4")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/debug-sentry", (req, res) => {
    throw new Error("Nardy Book Sentry error!");
});
exports.default = router;
//# sourceMappingURL=sentryRoutes.js.map
//# debugId=02079d8e-a5b2-5fae-8751-ccc4f0d4d5d4
