import mongoose, { Document, Schema, Types } from "mongoose";
import { IBook } from "./book.model";
import { IUser } from "./user.model";

interface IReview extends Document {
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
  text: string;
  rating: number;
  timestamp: Date;
  likesCount: number;
  commentsCount: number;
}

const reviewSchema: Schema<IReview> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
});

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
