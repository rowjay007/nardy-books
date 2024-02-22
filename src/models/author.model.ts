import mongoose, { Document, Schema } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  biography: string;
  dateOfBirth: Date;
  nationality: string;
  awards: string[];
}

const authorSchema: Schema<IAuthor> = new Schema({
  name: { type: String, required: true },
  biography: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true },
  awards: { type: [String], default: [] },
});

const Author = mongoose.model<IAuthor>("Author", authorSchema);

export default Author;