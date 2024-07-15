import { isValid, parse } from "date-fns";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPayment extends Document {
  amount: number;
  method: string;
  status: string;
  user: Types.ObjectId;
  date: Date | string;
  reference: string;
}

const PaymentSchema: Schema<IPayment> = new Schema({
  amount: { type: Number, required: true, index: true },
  method: { type: String, required: true, index: true },
  status: { type: String, required: true, index: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  date: { type: Date, default: Date.now, index: true },
  reference: { type: String, required: true, unique: true },
});

PaymentSchema.pre<IPayment>("save", function (next) {
  if (typeof this.date === "string") {
    const parsedDate = parse(this.date, "dd-MM-yyyy", new Date());
    if (isValid(parsedDate)) {
      this.date = parsedDate;
    } else {
      return next(new Error("Invalid date format, should be DD-MM-YYYY"));
    }
  }
  next();
});

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
