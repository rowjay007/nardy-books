import { Types } from "mongoose";
import * as PublisherRepository from "../repositories/publisherRepository";
import Publisher, { IPublisher } from "../models/publisherModel";

export const createPublisher = async (publisherData: Partial<IPublisher>) => {
  return await PublisherRepository.createPublisher(publisherData);
};

export const getPublisherById = async (id: Types.ObjectId) => {
  return await PublisherRepository.getPublisherById(id);
};

export const getAllPublishers = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
  sort: Record<string, "asc" | "desc">
): Promise<IPublisher[]> => {
  return PublisherRepository.getAllPublishers(filter, page, limit, sort);
};



export const updatePublisherById = async (
  id: Types.ObjectId,
  updateData: Partial<IPublisher>
) => {
  return await PublisherRepository.updatePublisherById(id, updateData);
};

export const deletePublisherById = async (id: Types.ObjectId) => {
  return await PublisherRepository.deletePublisherById(id);
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
