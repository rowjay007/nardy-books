import mongoose, { Document, Schema, Types } from "mongoose";
import { IPlan } from "./plan.model";
import { IUser } from "./user.model";

export interface ISubscription extends Document {
  user: Types.ObjectId | IUser;
  plan: Types.ObjectId | IPlan;
  startDate: Date;
  endDate: Date;
  status: string;
  paymentDetails?: string;
}

const subscriptionSchema: Schema<ISubscription> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
  paymentDetails: { type: String },
});

const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);

export default Subscription;
