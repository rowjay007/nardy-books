import mongoose, { Document, Schema, Types } from "mongoose";
import { IBook } from "./book.model";
import { IUser } from "./user.model";

export interface ITransaction extends Document {
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
  transactionType: "purchase" | "borrow" | "return";
  transactionDate: Date;
  dueDate?: Date;
  returnedDate?: Date;
  status: string;
  paymentDetails?: string;
}

const transactionSchema: Schema<ITransaction> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  transactionType: {
    type: String,
    enum: ["purchase", "borrow", "return"],
    required: true,
  },
  transactionDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  returnedDate: { type: Date },
  status: { type: String, required: true },
  paymentDetails: { type: String },
  // Add other fields as needed
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

export default Transaction;
