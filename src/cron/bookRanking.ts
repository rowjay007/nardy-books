import Book from "../models/bookModel";
import logger from "../config/logger";

export async function updateBookRankings() {
  try {
    const books = await Book.find().populate("reviews");
    for (const book of books) {
      const averageRating =
        book.reviews.reduce(
          (sum: number, review: any) => sum + review.rating,
          0
        ) / book.reviews.length;
      (book as any).ranking = averageRating;
      await book.save();
    }
    logger.info("Updated book rankings successfully");
  } catch (error) {
    logger.error("Error updating book rankings:", error);
  }
}
