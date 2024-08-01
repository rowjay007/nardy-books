import { Types } from "mongoose";
import * as publisherController from "../../controllers/publisherController";
import * as PublisherService from "../../services/publisherService";
import AppError from "../../utils/appError";
import { mockRequest, mockResponse } from "../../utils/testHelpers";

jest.mock("../../services/publisherService");

describe("Publisher Controller", () => {
  let next: jest.Mock;

  beforeEach(() => {
    next = jest.fn();
  });

  describe("createPublisher", () => {
    it("should create a new publisher", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const newPublisher = {
        name: "Test Publisher",
        location: "Test Location",
      };
      const createdPublisher = { _id: new Types.ObjectId(), ...newPublisher };

      req.body = newPublisher;
      (PublisherService.createPublisher as jest.Mock).mockResolvedValue(
        createdPublisher
      );

      await publisherController.createPublisher(req as any, res as any, next);

      expect(PublisherService.createPublisher).toHaveBeenCalledWith(
        newPublisher
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: {
          publisher: createdPublisher,
        },
      });
    });

    it("should handle errors during publisher creation", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const newPublisher = {
        name: "Test Publisher",
        location: "Test Location",
      };

      req.body = newPublisher;
      (PublisherService.createPublisher as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      await publisherController.createPublisher(req as any, res as any, next);

      expect(PublisherService.createPublisher).toHaveBeenCalledWith(
        newPublisher
      );
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("Failed to create publisher");
      expect(next.mock.calls[0][0].statusCode).toBe(500);
    });
  });

  describe("getAllPublishers", () => {
    it("should get all publishers", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const publishers = [
        { _id: new Types.ObjectId(), name: "Publisher 1" },
        { _id: new Types.ObjectId(), name: "Publisher 2" },
      ];

      (PublisherService.getAllPublishers as jest.Mock).mockResolvedValue(
        publishers
      );

      await publisherController.getAllPublishers(req as any, res as any, next);

      expect(PublisherService.getAllPublishers).toHaveBeenCalledWith(
        {},
        1,
        10,
        {}
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: {
          publishers,
        },
      });
    });

    it("should handle errors during fetch of publishers", async () => {
      const req = mockRequest();
      const res = mockResponse();

      (PublisherService.getAllPublishers as jest.Mock).mockRejectedValue(
        new Error("Failed to fetch publishers")
      );

      await publisherController.getAllPublishers(req as any, res as any, next);

      expect(PublisherService.getAllPublishers).toHaveBeenCalledWith(
        {},
        1,
        10,
        {}
      );
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("Failed to fetch publishers");
      expect(next.mock.calls[0][0].statusCode).toBe(500);
    });
  });

  describe("addBookToPublisher", () => {
    it("should add a book to a publisher", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const publisherId = new Types.ObjectId();
      const bookId = new Types.ObjectId();
      const publisher = {
        _id: publisherId,
        name: "Test Publisher",
        books: [bookId],
      };

      req.params = {
        publisherId: publisherId.toHexString(),
        bookId: bookId.toHexString(),
      };
      (PublisherService.addBookToPublisher as jest.Mock).mockResolvedValue(
        publisher
      );

      await publisherController.addBookToPublisher(
        req as any,
        res as any,
        next
      );

      expect(PublisherService.addBookToPublisher).toHaveBeenCalledWith(
        publisherId,
        bookId
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: {
          publisher,
        },
      });
    });

    it("should handle publisher not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const publisherId = new Types.ObjectId();
      const bookId = new Types.ObjectId();

      req.params = {
        publisherId: publisherId.toHexString(),
        bookId: bookId.toHexString(),
      };
      (PublisherService.addBookToPublisher as jest.Mock).mockResolvedValue(
        null
      );

      await publisherController.addBookToPublisher(
        req as any,
        res as any,
        next
      );

      expect(PublisherService.addBookToPublisher).toHaveBeenCalledWith(
        publisherId,
        bookId
      );
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe(
        "No publisher found with that ID"
      );
      expect(next.mock.calls[0][0].statusCode).toBe(404);
    });

    it("should handle invalid publisher ID format", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.params = {
        publisherId: "invalidID",
        bookId: new Types.ObjectId().toHexString(),
      };

      await publisherController.addBookToPublisher(
        req as any,
        res as any,
        next
      );

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("Invalid ID format");
      expect(next.mock.calls[0][0].statusCode).toBe(400);
    });

    it("should handle invalid book ID format", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.params = {
        publisherId: new Types.ObjectId().toHexString(),
        bookId: "invalidID",
      };

      await publisherController.addBookToPublisher(
        req as any,
        res as any,
        next
      );

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("Invalid ID format");
      expect(next.mock.calls[0][0].statusCode).toBe(400);
    });
  });
});
