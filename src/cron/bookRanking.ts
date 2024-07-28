import Book from "../models/bookModel";
import logger from "../config/logger";
import { IReview } from "../models/reviewModel";

export async function updateBookRankings() {
  try {
    const books = await Book.find().populate("reviews").exec();

    const updatePromises = books.map(async (book) => {
      const reviews = book.reviews as unknown as IReview[];
      const averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;
      (book as any).ranking = averageRating;
      return book.save();
    });

    await Promise.all(updatePromises);

    logger.info("Updated book rankings successfully");
  } catch (error) {
    logger.error("Error updating book rankings:", error);
  }
}
