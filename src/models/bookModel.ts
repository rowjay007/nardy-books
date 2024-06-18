import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: Types.ObjectId; 
  publisher: Types.ObjectId; 
  genre: Types.ObjectId; 
  reviews: Types.ObjectId[]; 
  price: number;
}

const BookSchema: Schema<IBook> = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  publisher: { type: Schema.Types.ObjectId, ref: "Publisher", required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  price: { type: Number, required: true },
});

const Book = mongoose.model<IBook>("Book", BookSchema);

export default Book;
