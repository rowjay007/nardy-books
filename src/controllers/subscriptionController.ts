import { Request, Response } from "express";
import * as subscriptionService from "../services/subscriptionService";
import catchAsync from "../utils/catchAsync";
import AppError from "../middlewares/errorHandling";

export const createSubscription = catchAsync(
  async (req: Request, res: Response) => {
    const subscription = await subscriptionService.createSubscription(req.body);
    res.status(201).json(subscription);
  }
);

export const getSubscriptions = catchAsync(
  async (req: Request, res: Response) => {
    const { filter, sort, page, limit } = req.query;
    const subscriptions = await subscriptionService.getSubscriptions(
      filter ? JSON.parse(filter as string) : {},
      sort ? JSON.parse(sort as string) : { createdAt: -1 },
      parseInt(page as string, 10) || 1,
      parseInt(limit as string, 10) || 10
    );
    res.status(200).json(subscriptions);
  }
);

export const getSubscriptionById = catchAsync(
  async (req: Request, res: Response) => {
    const subscription = await subscriptionService.getSubscriptionById(
      req.params.id
    );
    if (!subscription) {
      throw new AppError("Subscription not found", 404);
    }
    res.status(200).json(subscription);
  }
);

export const updateSubscription = catchAsync(
  async (req: Request, res: Response) => {
    const subscription = await subscriptionService.updateSubscription(
      req.params.id,
      req.body
    );
    if (!subscription) {
      throw new AppError("Subscription not found", 404);
    }
    res.status(200).json(subscription);
  }
);

export const deleteSubscription = catchAsync(
  async (req: Request, res: Response) => {
    await subscriptionService.deleteSubscription(req.params.id);
    res.status(204).end();
  }
);
