"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b17a217e-daa1-5d9b-89f1-b7f5e39271a2")}catch(e){}}();

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
exports.closeDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const env_1 = __importDefault(require("./env"));
const logger_1 = __importDefault(require("./logger"));
let mongoServer = null;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === "test") {
        // Running tests: Use MongoDB in-memory server
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        yield mongoose_1.default.connect(mongoUri);
    }
    else {
        // Production or other environments: Use real MongoDB URI
        try {
            yield mongoose_1.default.connect(env_1.default.MONGO_URI, {
            // Remove unnecessary options for production connection
            });
            logger_1.default.info("MongoDB connected successfully");
        }
        catch (error) {
            if (error instanceof Error) {
                logger_1.default.error(`Error connecting to MongoDB: ${error.message}`);
            }
            else {
                logger_1.default.error("Error connecting to MongoDB: An unknown error occurred");
            }
            process.exit(1);
        }
    }
});
exports.connectDB = connectDB;
const closeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === "test" && mongoServer !== null) {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }
    else {
        yield mongoose_1.default.disconnect();
    }
});
exports.closeDB = closeDB;
//# sourceMappingURL=db.js.map
//# debugId=b17a217e-daa1-5d9b-89f1-b7f5e39271a2
