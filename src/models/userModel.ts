import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string;
  refreshToken?: string;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, index: true }, 
  email: { type: String, required: true, unique: true, index: true }, 
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  resetPasswordToken: { type: String, index: true }, 
  resetPasswordExpires: { type: Date, index: true }, 
  verificationToken: { type: String, index: true },
  refreshToken: { type: String, index: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
