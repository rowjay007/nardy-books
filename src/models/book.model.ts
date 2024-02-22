// book.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";
import { IAuthor } from "./author.model";

interface IBook extends Document {
  title: string;
  author: Types.ObjectId | IAuthor; 
  ISBN: string;
  genre: string[];
  description: string;
  publicationDate: Date;
  language: string;
  coverImageURL: string;
  averageRating: number;
  totalRatingsCount: number;
  totalReviewsCount: number;
}

const bookSchema: Schema<IBook> = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  ISBN: { type: String, required: true, unique: true },
  genre: { type: [String], default: [] },
  description: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  language: { type: String, required: true },
  coverImageURL: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  totalRatingsCount: { type: Number, default: 0 },
  totalReviewsCount: { type: Number, default: 0 },
});

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
