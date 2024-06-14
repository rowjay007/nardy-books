import { Schema, model } from "mongoose";

const authSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiry: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Auth = model("Auth", authSchema);
