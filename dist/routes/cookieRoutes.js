"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c4fb9b35-1f09-5d88-930a-377db67ef75b")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    const myCookie = req.cookies["myCookie"];
    if (myCookie) {
        res.status(200).json({
            status: "success",
            data: { myCookie },
        });
    }
    else {
        res.status(404).json({
            status: "error",
            message: "No cookie found",
        });
    }
});
router.post("/", (req, res) => {
    const { value } = req.body;
    res.cookie("myCookie", value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
        status: "success",
        message: "Cookie has been set",
    });
});
router.delete("/", (req, res) => {
    res.clearCookie("myCookie");
    res.status(200).json({
        status: "success",
        message: "Cookie has been deleted",
    });
});
exports.default = router;
//# sourceMappingURL=cookieRoutes.js.map
//# debugId=c4fb9b35-1f09-5d88-930a-377db67ef75b
