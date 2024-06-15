import mongoose, { Document, Schema, Types } from "mongoose";

interface IAuthor extends Document {
  name: string;
  biography: string;
  books: Types.ObjectId[];
}

const AuthorSchema: Schema<IAuthor> = new Schema({
  name: { type: String, required: true },
  biography: { type: String },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const Author = mongoose.model<IAuthor>("Author", AuthorSchema);

export default Author;
