"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1f94dd30-0648-5163-8e3e-78dcbfe72085")}catch(e){}}();

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = require("mongoose");
const publisherController = __importStar(require("../controllers/publisherController"));
const PublisherService = __importStar(require("../services/publisherService"));
const appError_1 = __importDefault(require("../utils/appError"));
const testHelpers_1 = require("../utils/testHelpers");
jest.mock("../services/publisherService");
describe("Publisher Controller", () => {
    let next;
    beforeEach(() => {
        next = jest.fn();
    });
    describe("createPublisher", () => {
        it("should create a new publisher", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const newPublisher = {
                name: "Test Publisher",
                location: "Test Location",
            };
            const createdPublisher = Object.assign({ _id: new mongoose_1.Types.ObjectId() }, newPublisher);
            req.body = newPublisher;
            PublisherService.createPublisher.mockResolvedValue(createdPublisher);
            yield publisherController.createPublisher(req, res, next);
            expect(PublisherService.createPublisher).toHaveBeenCalledWith(newPublisher);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: {
                    publisher: createdPublisher,
                },
            });
        }));
        it("should handle errors during publisher creation", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const newPublisher = {
                name: "Test Publisher",
                location: "Test Location",
            };
            req.body = newPublisher;
            PublisherService.createPublisher.mockRejectedValue(new Error("Service error"));
            yield publisherController.createPublisher(req, res, next);
            expect(PublisherService.createPublisher).toHaveBeenCalledWith(newPublisher);
            expect(next).toHaveBeenCalledWith(expect.any(appError_1.default));
            expect(next.mock.calls[0][0].message).toBe("Failed to create publisher");
            expect(next.mock.calls[0][0].statusCode).toBe(500);
        }));
    });
    describe("getAllPublishers", () => {
        it("should get all publishers", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const publishers = [
                { _id: new mongoose_1.Types.ObjectId(), name: "Publisher 1" },
                { _id: new mongoose_1.Types.ObjectId(), name: "Publisher 2" },
            ];
            PublisherService.getAllPublishers.mockResolvedValue(publishers);
            yield publisherController.getAllPublishers(req, res, next);
            expect(PublisherService.getAllPublishers).toHaveBeenCalledWith({}, 1, 10, {});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: {
                    publishers,
                },
            });
        }));
        it("should handle errors during fetch of publishers", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            PublisherService.getAllPublishers.mockRejectedValue(new Error("Failed to fetch publishers"));
            yield publisherController.getAllPublishers(req, res, next);
            expect(PublisherService.getAllPublishers).toHaveBeenCalledWith({}, 1, 10, {});
            expect(next).toHaveBeenCalledWith(expect.any(appError_1.default));
            expect(next.mock.calls[0][0].message).toBe("Failed to fetch publishers");
            expect(next.mock.calls[0][0].statusCode).toBe(500);
        }));
    });
    describe("addBookToPublisher", () => {
        it("should add a book to a publisher", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const publisherId = new mongoose_1.Types.ObjectId();
            const bookId = new mongoose_1.Types.ObjectId();
            const publisher = {
                _id: publisherId,
                name: "Test Publisher",
                books: [bookId],
            };
            req.params = {
                publisherId: publisherId.toHexString(),
                bookId: bookId.toHexString(),
            };
            PublisherService.addBookToPublisher.mockResolvedValue(publisher);
            yield publisherController.addBookToPublisher(req, res, next);
            expect(PublisherService.addBookToPublisher).toHaveBeenCalledWith(publisherId, bookId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: {
                    publisher,
                },
            });
        }));
        it("should handle publisher not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const publisherId = new mongoose_1.Types.ObjectId();
            const bookId = new mongoose_1.Types.ObjectId();
            req.params = {
                publisherId: publisherId.toHexString(),
                bookId: bookId.toHexString(),
            };
            PublisherService.addBookToPublisher.mockResolvedValue(null);
            yield publisherController.addBookToPublisher(req, res, next);
            expect(PublisherService.addBookToPublisher).toHaveBeenCalledWith(publisherId, bookId);
            expect(next).toHaveBeenCalledWith(expect.any(appError_1.default));
            expect(next.mock.calls[0][0].message).toBe("No publisher found with that ID");
            expect(next.mock.calls[0][0].statusCode).toBe(404);
        }));
        it("should handle invalid publisher ID format", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = {
                publisherId: "invalidID",
                bookId: new mongoose_1.Types.ObjectId().toHexString(),
            };
            yield publisherController.addBookToPublisher(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(appError_1.default));
            expect(next.mock.calls[0][0].message).toBe("Invalid ID format");
            expect(next.mock.calls[0][0].statusCode).toBe(400);
        }));
        it("should handle invalid book ID format", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = {
                publisherId: new mongoose_1.Types.ObjectId().toHexString(),
                bookId: "invalidID",
            };
            yield publisherController.addBookToPublisher(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(appError_1.default));
            expect(next.mock.calls[0][0].message).toBe("Invalid ID format");
            expect(next.mock.calls[0][0].statusCode).toBe(400);
        }));
    });
});
//# sourceMappingURL=publisherController.test.js.map
//# debugId=1f94dd30-0648-5163-8e3e-78dcbfe72085
