import { Request, Response, NextFunction } from "express";
import * as NotificationService from "../services/notificationService";
import catchAsync from "../utils/catchAsync";

export const createNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const notification = await NotificationService.createNotification(req.body);
    res.status(201).json({ status: "success", data: { notification } });
  }
);

export const getNotificationById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const notification = await NotificationService.getNotificationById(
      req.params.id
    );
    res.status(200).json({ status: "success", data: { notification } });
  }
);

export const getAllNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { filter, sort, page, limit } = req.query;
    const queryParams = {
      filter: filter ? JSON.parse(filter as string) : {},
      sort: sort ? JSON.parse(sort as string) : {},
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
    };
    const notifications = await NotificationService.getAllNotifications(
      queryParams
    );
    res.status(200).json({ status: "success", data: { notifications } });
  }
);

export const updateNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const notification = await NotificationService.updateNotification(
      req.params.id,
      req.body
    );
    res.status(200).json({ status: "success", data: { notification } });
  }
);

export const deleteNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await NotificationService.deleteNotification(req.params.id);
    res.status(204).json({ status: "success", data: null });
  }
);
