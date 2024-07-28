import axios from "axios";
import Book from "../models/bookModel";
import logger from "../config/logger";

export async function syncExternalData() {
  try {
    const response = await axios.get("https://api.example.com/books");
    const externalBooks = response.data;

    for (const externalBook of externalBooks) {
      await Book.findOneAndUpdate(
        { isbn: externalBook.isbn },
        {
          $set: {
            title: externalBook.title,
            author: externalBook.author,
            description: externalBook.description,
          },
        },
        { upsert: true, new: true }
      );
    }
    logger.info(`Synced ${externalBooks.length} books from external source`);
  } catch (error) {
    logger.error("Error syncing external data:", error);
  }
}
