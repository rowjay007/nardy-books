import { Types } from "mongoose";
import Publisher, { IPublisher } from "../models/publisherModel";
import * as PublisherRepository from "../repositories/publisherRepository";
import cache, { CACHE_TTL_SECONDS } from "../utils/cache";

export const createPublisher = async (publisherData: Partial<IPublisher>) => {
  const publisher = await PublisherRepository.createPublisher(publisherData);
  cache.flushAll();
  return publisher;
};

export const getPublisherById = async (
  id: Types.ObjectId
): Promise<IPublisher | null> => {
  const cacheKey = `publisher_${id.toString()}`;
  let publisher = cache.get<IPublisher | null>(cacheKey);

  if (publisher === undefined) {
    publisher = await PublisherRepository.getPublisherById(id);
    if (publisher) {
      cache.set(cacheKey, publisher, CACHE_TTL_SECONDS);
    }
  }

  return publisher;
};

export const getAllPublishers = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
  sort: Record<string, "asc" | "desc">
): Promise<IPublisher[]> => {
  const cacheKey = `allPublishers_${JSON.stringify({
    filter,
    page,
    limit,
    sort,
  })}`;
  let publishers = cache.get<IPublisher[]>(cacheKey);

  if (!publishers) {
    publishers = await PublisherRepository.getAllPublishers(
      filter,
      page,
      limit,
      sort
    );
    cache.set(cacheKey, publishers, CACHE_TTL_SECONDS);
  }

  return publishers;
};

export const updatePublisherById = async (
  id: Types.ObjectId,
  updateData: Partial<IPublisher>
) => {
  const publisher = await PublisherRepository.updatePublisherById(
    id,
    updateData
  );
  if (publisher) {
    cache.flushAll();
  }
  return publisher;
};

export const deletePublisherById = async (id: Types.ObjectId) => {
  await PublisherRepository.deletePublisherById(id);
  cache.flushAll();
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
  if (publisher) {
    cache.flushAll();
  }
  return publisher;
};
