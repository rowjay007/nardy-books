import mongoose, { Document, Schema, Types } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  subscription: Types.ObjectId; 
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
