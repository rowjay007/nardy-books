import Payment, { IPayment } from "../models/paymentModel";
import { Query } from "mongoose";

export const create = async (
  paymentData: Partial<IPayment>
): Promise<IPayment> => {
  // Ensure amount is provided
  if (paymentData.amount === undefined) {
    throw new Error("Amount is required to create a payment");
  }

  const payment = new Payment(paymentData);
  return payment.save();
};


export const findById = async (id: string): Promise<IPayment | null> => {
  return Payment.findById(id).populate("user").exec();
};

export const findAll = async (
  filter: any, 
  sort: any, 
  page: number,
  limit: number
): Promise<IPayment[]> => {
  const query = buildQuery(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
  return query.exec();
};

export const update = async (
  id: string,
  updateData: Partial<IPayment>
): Promise<IPayment | null> => {
  return Payment.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

export const remove = async (id: string): Promise<IPayment | null> => {
  return Payment.findByIdAndDelete(id).exec();
};

function buildQuery(filter: any): Query<IPayment[], IPayment, {}> {
  let query = Payment.find();

  if (filter.method) {
    query = query.where("method").equals(filter.method);
  }
  if (filter.status) {
    query = query.where("status").equals(filter.status);
  }

  return query;
}
