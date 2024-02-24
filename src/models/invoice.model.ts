import mongoose, { Document, Schema, Types } from "mongoose";
import { ITransaction } from "./transaction.model";
import { IUser } from "./user.model";

interface IInvoice extends Document {
  user: Types.ObjectId | IUser;
  transaction: Types.ObjectId | ITransaction;
  invoiceNumber: string;
  totalAmount: number;
  paymentStatus: string;
  billingAddress: string;
  paymentMethod: string;
}

const invoiceSchema: Schema<IInvoice> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  transaction: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
  invoiceNumber: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  billingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

const Invoice = mongoose.model<IInvoice>("Invoice", invoiceSchema);

export default Invoice;
