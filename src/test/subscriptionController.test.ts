import { Request, Response, NextFunction } from "express";
import * as subscriptionService from "../services/subscriptionService";
import * as subscriptionController from "../controllers/subscriptionController";
import AppError from "../utils/appError";
import { mockRequest, mockResponse } from "../utils/testHelpers";

jest.mock("../services/subscriptionService");

describe("Subscription Controller", () => {
  const next = jest.fn();

  describe("createSubscription", () => {
    it("should create a subscription and return it", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const subscriptionData = { plan: "premium", userId: "123" };
      const createdSubscription = { ...subscriptionData, _id: "sub1" };

      req.body = subscriptionData;
      (subscriptionService.createSubscription as jest.Mock).mockResolvedValue(
        createdSubscription
      );

      await subscriptionController.createSubscription(
        req as Request,
        res as Response,
        next
      );

      expect(subscriptionService.createSubscription).toHaveBeenCalledWith(
        subscriptionData
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdSubscription);
    });
  });

  describe("getSubscriptions", () => {
    it("should return all subscriptions", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const subscriptions = [{ _id: "sub1", plan: "premium" }];

      req.query = {
        filter: JSON.stringify({}),
        sort: JSON.stringify({ createdAt: -1 }),
        page: "1",
        limit: "10",
      };
      (subscriptionService.getSubscriptions as jest.Mock).mockResolvedValue(
        subscriptions
      );

      await subscriptionController.getSubscriptions(
        req as Request,
        res as Response,
        next
      );

      expect(subscriptionService.getSubscriptions).toHaveBeenCalledWith(
        {},
        { createdAt: -1 },
        1,
        10
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(subscriptions);
    });
  });

  describe("getSubscriptionById", () => {
    it("should return a subscription by ID", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const subscription = { _id: "sub1", plan: "premium" };

      req.params = { id: "sub1" };
      (subscriptionService.getSubscriptionById as jest.Mock).mockResolvedValue(
        subscription
      );

      await subscriptionController.getSubscriptionById(
        req as Request,
        res as Response,
        next
      );

      expect(subscriptionService.getSubscriptionById).toHaveBeenCalledWith(
        "sub1"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(subscription);
    });

    it("should return 404 if subscription not found", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = { id: "nonexistent" };
      (subscriptionService.getSubscriptionById as jest.Mock).mockResolvedValue(
        null
      );

      await subscriptionController.getSubscriptionById(
        req as Request,
        res as Response,
        next
      );

      expect(subscriptionService.getSubscriptionById).toHaveBeenCalledWith(
        "nonexistent"
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("Subscription not found", 404)
      );
    });
  });

  describe("updateSubscription", () => {
    it("should update a subscription and return it", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const updatedSubscription = { _id: "sub1", plan: "basic" };

      req.params = { id: "sub1" };
      req.body = { plan: "basic" };
      (subscriptionService.updateSubscription as jest.Mock).mockResolvedValue(
        updatedSubscription
      );

      await subscriptionController.updateSubscription(
        req as Request,
        res as Response,
        next
      );

      expect(subscriptionService.updateSubscription).toHaveBeenCalledWith(
        "sub1",
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedSubscription);
    });

    it("should return 404 if subscription not found", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = { id: "nonexistent" };
      req.body = { plan: "basic" };
      (subscriptionService.updateSubscription as jest.Mock).mockResolvedValue(
        null
      );

      await subscriptionController.updateSubscription(
        req as Request,
        res as Response,
        next
      );

      expect(subscriptionService.updateSubscription).toHaveBeenCalledWith(
        "nonexistent",
        req.body
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("Subscription not found", 404)
      );
    });
  });

  describe("deleteSubscription", () => {
    it("should delete a subscription and return success message", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = { id: "sub1" };
      (subscriptionService.deleteSubscription as jest.Mock).mockResolvedValue(
        true
      );

      await subscriptionController.deleteSubscription(
        req as Request,
        res as Response,
        next
      );

      expect(subscriptionService.deleteSubscription).toHaveBeenCalledWith(
        "sub1"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Subscription successfully deleted",
        data: null,
      });
    });

    it("should return 404 if subscription not found", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = { id: "nonexistent" };
      (subscriptionService.deleteSubscription as jest.Mock).mockResolvedValue(
        false
      );

      await subscriptionController.deleteSubscription(
        req as Request,
        res as Response,
        next
      );

      expect(subscriptionService.deleteSubscription).toHaveBeenCalledWith(
        "nonexistent"
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("Subscription not found", 404)
      );
    });
  });
});
