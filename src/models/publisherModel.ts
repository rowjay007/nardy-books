import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPublisher extends Document {
  name: string;
  address: string;
  books: Types.ObjectId[];
}

const PublisherSchema: Schema<IPublisher> = new Schema({
  name: { type: String, required: true, index: true },
  address: { type: String },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const Publisher = mongoose.model<IPublisher>("Publisher", PublisherSchema);

export default Publisher;
