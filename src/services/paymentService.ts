import { IPayment } from "../models/paymentModel";
import * as PaymentRepository from "../repositories/paymentRepository";
import {
  initializeFlutterwavePayment as initFlutterwavePayment,
  verifyFlutterwavePayment as verifyFlutterwavePaymentUtil,
} from "../utils/flutterwave";
import { initializePayment, verifyPayment } from "../utils/paystack";
import { generateUniqueReference } from "../utils/referenceTag";

export const createPayment = async (
  paymentData: Partial<IPayment>
): Promise<IPayment> => {
  paymentData.reference = generateUniqueReference();

  const payment = await PaymentRepository.create(paymentData);
  return payment;
};

export const getPaymentById = async (id: string): Promise<IPayment | null> => {
  return PaymentRepository.findById(id);
};

export const getAllPayments = async (
  filter: any,
  sort: any,
  page: number,
  limit: number
): Promise<IPayment[]> => {
  return PaymentRepository.findAll(filter, sort, page, limit);
};

export const updatePayment = async (
  id: string,
  updateData: Partial<IPayment>
): Promise<IPayment | null> => {
  return PaymentRepository.update(id, updateData);
};

export const deletePayment = async (id: string): Promise<void> => {
  await PaymentRepository.remove(id);
};

export const processPaystackPayment = async (
  amount: number,
  email: string
): Promise<any> => {
  return initializePayment(amount, email);
};

export const verifyPaystackPayment = async (
  reference: string
): Promise<any> => {
  return verifyPayment(reference);
};

export const processFlutterwavePayment = async (
  amount: number,
  email: string
): Promise<any> => {
  return initFlutterwavePayment(amount, email);
};

export const verifyFlutterwavePayment = async (
  reference: string
): Promise<any> => {
  return verifyFlutterwavePaymentUtil(reference);
};
