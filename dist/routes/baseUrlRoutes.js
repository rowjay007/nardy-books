"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f6e8a9bf-4b91-5cb4-b58a-5f7ca3a192eb")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to Nardy Book Management API",
        maintainedBy: "Rowland Adimoha",
    });
});
exports.default = router;
//# sourceMappingURL=baseUrlRoutes.js.map
//# debugId=f6e8a9bf-4b91-5cb4-b58a-5f7ca3a192eb
