import Payment, { IPayment } from "../models/paymentModel";
import { isValid } from "date-fns";

export const create = async (
  paymentData: Partial<IPayment>
): Promise<IPayment> => {
  const payment = new Payment(paymentData);
  return payment.save();
};

export const findById = async (id: string): Promise<IPayment | null> => {
  return Payment.findById(id).populate("user").exec();
};

export const findAll = async (
  filter: any = {},
  sort: any = { date: -1 },
  page: number = 1,
  limit: number = 10
): Promise<IPayment[]> => {
  const skip = (page - 1) * limit;
  return Payment.find(filter)
    .populate("user")
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec();
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
