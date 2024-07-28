import axios from "axios";
import Book from "../models/bookModel";
import logger from "../config/logger";

interface ExternalBook {
  isbn: string;
  title: string;
  author: string;
  description: string;
}

export async function syncExternalData() {
  try {
    const response = await axios.get("https://api.example.com/books");
    const externalBooks: ExternalBook[] = response.data;

    const syncPromises = externalBooks.map((externalBook: ExternalBook) =>
      Book.findOneAndUpdate(
        { isbn: externalBook.isbn },
        {
          $set: {
            title: externalBook.title,
            author: externalBook.author,
            description: externalBook.description,
          },
        },
        { upsert: true, new: true }
      )
    );

    await Promise.all(syncPromises);

    logger.info(`Synced ${externalBooks.length} books from external source`);
  } catch (error) {
    logger.error("Error syncing external data:", error);
  }
}
