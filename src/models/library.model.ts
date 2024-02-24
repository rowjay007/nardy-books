import mongoose, { Document, Schema, Types } from "mongoose";
import { IBook } from "./book.model";
import { IUser } from "./user.model";

interface ILibrary extends Document {
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
  dateAdded: Date;
  readingStatus: "read" | "currently reading" | "to-read";
  rating?: number;
  reviewText?: string;
  tags?: string[];
}

const librarySchema: Schema<ILibrary> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  dateAdded: { type: Date, default: Date.now },
  readingStatus: {
    type: String,
    enum: ["read", "currently reading", "to-read"],
    required: true,
  },
  rating: { type: Number },
  reviewText: { type: String },
  tags: { type: [String] },
});

const Library = mongoose.model<ILibrary>("Library", librarySchema);

export default Library;
