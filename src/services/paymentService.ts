import * as PaymentRepository from "../repositories/paymentRepository";
import { IPayment } from "../models/paymentModel";
import { initializePayment, verifyPayment } from "../utils/paystack";
import {
  initializeFlutterwavePayment as initFlutterwavePayment,
  verifyFlutterwavePayment as verifyFlutterwavePaymentUtil,
} from "../utils/flutterwave";
import { generateUniqueReference } from "../utils/referenceTag";

export const createPayment = async (
  paymentData: Partial<IPayment>
): Promise<IPayment> => {
  const reference = generateUniqueReference("ADM_");
  paymentData.reference = reference;

  return PaymentRepository.create(paymentData);
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
  const reference = generateUniqueReference("PSK_");
  const response = await initializePayment(amount, email, reference);
  return { response, reference };
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
  const reference = generateUniqueReference("FLW_");
  const response = await initFlutterwavePayment(amount, email, reference);
  return { response, reference };
};

export const verifyFlutterwavePayment = async (
  reference: string
): Promise<any> => {
  return verifyFlutterwavePaymentUtil(reference);
};
