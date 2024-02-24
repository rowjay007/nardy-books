import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
  name: string;
  description: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  features: string[];
  restrictions: string[];
}

const planSchema: Schema<IPlan> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  billingCycle: { type: String, enum: ["monthly", "yearly"], required: true },
  features: { type: [String], default: [] },
  restrictions: { type: [String], default: [] },
});

const Plan = mongoose.model<IPlan>("Plan", planSchema);

export default Plan;
