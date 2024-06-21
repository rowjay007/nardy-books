import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPayment extends Document {
  amount: number;
  method: string;
  status: string;
  user: Types.ObjectId;
  date: Date;
}

const PaymentSchema: Schema<IPayment> = new Schema({
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  status: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
