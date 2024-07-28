import bcrypt from "bcrypt";
import mongoose, { CallbackError, Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  isEmailVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string;
  refreshToken?: string;
  subscription?: {
    expiresAt: Date;
  };
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  resetPasswordToken: { type: String, index: true },
  resetPasswordExpires: { type: Date, index: true },
  verificationToken: { type: String, index: true },
  refreshToken: { type: String, index: true },
  subscription: {
    expiresAt: { type: Date },
  },
});

UserSchema.pre<IUser>(
  "save",
  async function (next: (err?: CallbackError) => void) {
    if (!this.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error as CallbackError);
    }
  }
);

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
