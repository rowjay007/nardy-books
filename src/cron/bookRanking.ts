import logger from "../config/logger";
import Book from "../models/bookModel";
import { IReview } from "../models/reviewModel";

export async function updateBookRankings() {
  try {
    const books = await Book.find().populate("reviews").exec();

    const updatePromises = books.map(async (book) => {
      const reviews = book.reviews as unknown as IReview[];
      if (reviews.length > 0) {
        const totalRating = reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const averageRating = totalRating / reviews.length;
        if (!isNaN(averageRating)) {
          (book as any).ranking = averageRating;
        } else {
          (book as any).ranking = 0;
          logger.warn(`Average rating is NaN for book: ${book._id}`);
        }
      } else {
        (book as any).ranking = 0;
      }
      return book.save();
    });

    await Promise.all(updatePromises);

    logger.info("Updated book rankings successfully");
  } catch (error) {
    logger.error("Error updating book rankings:", error);
  }
}
