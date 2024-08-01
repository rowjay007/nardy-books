import mongoose from "mongoose";
import { closeDB, connectDB } from "../../config/db";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
