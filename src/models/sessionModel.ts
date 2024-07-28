import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  sessionToken: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  sessionToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1d" }, 
  expiresAt: { type: Date, required: true },
});

export const SessionModel = mongoose.model<ISession>("Session", sessionSchema);
