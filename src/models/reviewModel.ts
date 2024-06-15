import mongoose, { Document, Schema, Types } from "mongoose";

interface IReview extends Document {
  reviewer: Types.ObjectId; 
  book: Types.ObjectId;
  rating: number;
  comments: string;
}

const ReviewSchema: Schema<IReview> = new Schema({
  reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  rating: { type: Number, required: true },
  comments: { type: String },
});

const Review = mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
