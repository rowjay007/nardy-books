import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  role: Types.ObjectId[];
  registrationDate: Date;
  lastLoginDate?: Date;
}

const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  role: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  registrationDate: { type: Date, default: Date.now },
  lastLoginDate: { type: Date },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
