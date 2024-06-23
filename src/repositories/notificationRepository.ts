import Notification, { INotification } from "../models/notificationModel";

interface QueryParams {
  filter?: Record<string, any>;
  sort?: Record<string, any>;
  page?: number;
  limit?: number;
}

export const create = async (
  notificationData: Partial<INotification>
): Promise<INotification> => {
  const notification = new Notification(notificationData);
  return notification.save();
};

export const findById = async (id: string): Promise<INotification | null> => {
  return Notification.findById(id).populate("user").exec();
};

export const findAll = async ({
  filter = {},
  sort = {},
  page = 1,
  limit = 10,
}: QueryParams): Promise<INotification[]> => {
  const skip = (page - 1) * limit;
  return Notification.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("user")
    .exec();
};

export const update = async (
  id: string,
  updateData: Partial<INotification>
): Promise<INotification | null> => {
  return Notification.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

export const remove = async (id: string): Promise<INotification | null> => {
  return Notification.findByIdAndDelete(id).exec();
};
