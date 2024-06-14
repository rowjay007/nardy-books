import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const dbUri = process.env.DATABASE_URL as string;
  await mongoose.connect(dbUri, {});
  console.log("Connected to MongoDB");
};
