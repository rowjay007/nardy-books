import * as NotificationRepository from "../repositories/notificationRepository";
import { INotification } from "../models/notificationModel";

interface QueryParams {
  filter?: Record<string, any>;
  sort?: Record<string, any>;
  page?: number;
  limit?: number;
}

export const createNotification = async (
  notificationData: Partial<INotification>
): Promise<INotification> => {
  return NotificationRepository.create(notificationData);
};

export const getNotificationById = async (
  id: string
): Promise<INotification | null> => {
  return NotificationRepository.findById(id);
};

export const getAllNotifications = async (
  queryParams: QueryParams
): Promise<INotification[]> => {
  return NotificationRepository.findAll(queryParams);
};

export const updateNotification = async (
  id: string,
  updateData: Partial<INotification>
): Promise<INotification | null> => {
  return NotificationRepository.update(id, updateData);
};

export const deleteNotification = async (id: string): Promise<void> => {
  await NotificationRepository.remove(id);
};
