import mongoose, { Document, Schema, Types } from "mongoose";

interface IGenre extends Document {
  name: string;
  description: string;
  parentGenre?: Types.ObjectId | IGenre;
}

const genreSchema: Schema<IGenre> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  parentGenre: { type: Schema.Types.ObjectId, ref: "Genre" },
});

const Genre = mongoose.model<IGenre>("Genre", genreSchema);

export default Genre;
