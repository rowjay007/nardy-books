"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3ac7b320-f89d-5b7e-81e0-5ab3abe3f4d5")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    console.log("Health route accessed");
    res.json({ message: "Health check endpoint up and running" });
});
exports.default = router;
//# sourceMappingURL=healthRoutes.js.map
//# debugId=3ac7b320-f89d-5b7e-81e0-5ab3abe3f4d5
