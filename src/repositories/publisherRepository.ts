import { Types } from "mongoose";
import Publisher, { IPublisher } from "../models/publisherModel";

export const createPublisher = async (publisherData: Partial<IPublisher>) => {
  return await Publisher.create(publisherData);
};

export const getPublisherById = async (id: Types.ObjectId) => {
  return await Publisher.findById(id).populate("books");
};
export const getAllPublishers = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
  sort: Record<string, "asc" | "desc">
): Promise<IPublisher[]> => {
  return Publisher.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("books");
};

export const updatePublisherById = async (
  id: Types.ObjectId,
  updateData: Partial<IPublisher>
) => {
  return await Publisher.findByIdAndUpdate(id, updateData, { new: true });
};

export const deletePublisherById = async (id: Types.ObjectId) => {
  return await Publisher.findByIdAndDelete(id);
};

export const addBookToPublisher = async (
  publisherId: Types.ObjectId,
  bookId: Types.ObjectId
) => {
  const publisher = await Publisher.findByIdAndUpdate(
    publisherId,
    { $push: { books: bookId } },
    { new: true }
  ).populate("books");
  return publisher;
};
