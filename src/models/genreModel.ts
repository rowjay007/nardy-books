import mongoose, { Document, Schema, Types } from "mongoose";

export interface IGenre extends Document {
  name: string;
  description: string;
  books: Types.ObjectId[];
}

const GenreSchema: Schema<IGenre> = new Schema({
  name: { type: String, required: true, index: true },
  description: { type: String },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const Genre = mongoose.model<IGenre>("Genre", GenreSchema);

export default Genre;
