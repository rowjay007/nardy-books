import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Book from "../../models/bookModel"; // Import the Book model
import Author from "../../models/authorModel"; // Import the Author model

let mongoServer: MongoMemoryServer;

export const setupTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Ensure the models are registered
  mongoose.model("Book", Book.schema);
  mongoose.model("Author", Author.schema);
};

export const teardownTestDB = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
