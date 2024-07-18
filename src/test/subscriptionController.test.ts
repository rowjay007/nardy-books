import { Types } from "mongoose";
import * as publisherController from "../controllers/publisherController";
import * as PublisherService from "../services/publisherService";
import AppError from "../utils/appError";
import { mockRequest, mockResponse } from "../utils/testHelpers";

jest.mock("../services/publisherService");

describe("Publisher Controller", () => {
  const next = jest.fn();

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
        new AppError("Failed to create publisher", 500)
      );

      await publisherController.createPublisher(req as any, res as any, next);

      expect(PublisherService.createPublisher).toHaveBeenCalledWith(
        newPublisher
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("Failed to create publisher", 500)
      );
    });
  });

  describe("getPublisherById", () => {
    it("should get a publisher by ID", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const publisherId = new Types.ObjectId();
      const publisher = { _id: publisherId, name: "Test Publisher" };

      req.params = { id: publisherId.toHexString() };
      (PublisherService.getPublisherById as jest.Mock).mockResolvedValue(
        publisher
      );

      await publisherController.getPublisherById(req as any, res as any, next);

      expect(PublisherService.getPublisherById).toHaveBeenCalledWith(
        publisherId
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

      req.params = { id: publisherId.toHexString() };
      (PublisherService.getPublisherById as jest.Mock).mockResolvedValue(null);

      await publisherController.getPublisherById(req as any, res as any, next);

      expect(PublisherService.getPublisherById).toHaveBeenCalledWith(
        publisherId
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("No publisher found with that ID", 404)
      );
    });

    it("should handle invalid publisher ID format", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.params = { id: "invalidID" }; 

      await publisherController.getPublisherById(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(new AppError("Invalid ID format", 400));
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
        new AppError("Failed to fetch publishers", 500)
      );

      await publisherController.getAllPublishers(req as any, res as any, next);

      expect(PublisherService.getAllPublishers).toHaveBeenCalledWith(
        {},
        1,
        10,
        {}
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("Failed to fetch publishers", 500)
      );
    });
  });

  describe("updatePublisherById", () => {
    it("should update a publisher by ID", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const publisherId = new Types.ObjectId();
      const updatedPublisher = { _id: publisherId, name: "Updated Publisher" };

      req.params = { id: publisherId.toHexString() };
      req.body = { name: "Updated Publisher" };
      (PublisherService.updatePublisherById as jest.Mock).mockResolvedValue(
        updatedPublisher
      );

      await publisherController.updatePublisherById(
        req as any,
        res as any,
        next
      );

      expect(PublisherService.updatePublisherById).toHaveBeenCalledWith(
        publisherId,
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: {
          publisher: updatedPublisher,
        },
      });
    });

    it("should handle publisher not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const publisherId = new Types.ObjectId();

      req.params = { id: publisherId.toHexString() };
      req.body = { name: "Updated Publisher" };
      (PublisherService.updatePublisherById as jest.Mock).mockResolvedValue(
        null
      );

      await publisherController.updatePublisherById(
        req as any,
        res as any,
        next
      );

      expect(PublisherService.updatePublisherById).toHaveBeenCalledWith(
        publisherId,
        req.body
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("No publisher found with that ID", 404)
      );
    });

    it("should handle invalid publisher ID format", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.params = { id: "invalidID" }; 

      await publisherController.updatePublisherById(
        req as any,
        res as any,
        next
      );

      expect(next).toHaveBeenCalledWith(new AppError("Invalid ID format", 400));
    });
  });

  describe("deletePublisherById", () => {
    it("should delete a publisher by ID", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const publisherId = new Types.ObjectId();

      req.params = { id: publisherId.toHexString() };
      (PublisherService.deletePublisherById as jest.Mock).mockResolvedValue(
        true
      );

      await publisherController.deletePublisherById(
        req as any,
        res as any,
        next
      );

      expect(PublisherService.deletePublisherById).toHaveBeenCalledWith(
        publisherId
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Publisher successfully deleted",
        data: null,
      });
    });

    it("should handle publisher not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const publisherId = new Types.ObjectId();

      req.params = { id: publisherId.toHexString() };
      (PublisherService.deletePublisherById as jest.Mock).mockResolvedValue(
        false
      );

      await publisherController.deletePublisherById(
        req as any,
        res as any,
        next
      );

      expect(PublisherService.deletePublisherById).toHaveBeenCalledWith(
        publisherId
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("No publisher found with that ID", 404)
      );
    });

    it("should handle invalid publisher ID format", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.params = { id: "invalidID" }; 

      await publisherController.deletePublisherById(
        req as any,
        res as any,
        next
      );

      expect(next).toHaveBeenCalledWith(new AppError("Invalid ID format", 400));
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
      expect(next).toHaveBeenCalledWith(
        new AppError("No publisher found with that ID", 404)
      );
    });

    it("should handle invalid publisher ID format", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.params = { publisherId: "invalidID", bookId: "validID" }; 

      await publisherController.addBookToPublisher(
        req as any,
        res as any,
        next
      );

      expect(next).toHaveBeenCalledWith(new AppError("Invalid ID format", 400));
    });

    it("should handle invalid book ID format", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.params = { publisherId: "validID", bookId: "invalidID" }; 

      await publisherController.addBookToPublisher(
        req as any,
        res as any,
        next
      );

      expect(next).toHaveBeenCalledWith(new AppError("Invalid ID format", 400));
    });
  });
});
