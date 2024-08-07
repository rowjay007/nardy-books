import mongoose, { Document, Schema, Types } from "mongoose";

export interface IReview extends Document {
  reviewer: Types.ObjectId;
  book: Types.ObjectId;
  rating: number;
  comments: string;
}

const ReviewSchema: Schema<IReview> = new Schema({
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
    index: true,
  },
  rating: { type: Number, required: true, index: true },
  comments: { type: String },
});

const Review = mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
