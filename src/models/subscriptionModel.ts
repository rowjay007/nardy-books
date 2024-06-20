import mongoose, { Document, Schema, Types } from "mongoose";

export interface ISubscription extends Document {
  type: string;
  startDate: Date;
  endDate: Date;
  users: Types.ObjectId[]; 
}

const SubscriptionSchema: Schema<ISubscription> = new Schema({
  type: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);

export default Subscription;
