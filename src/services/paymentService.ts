import * as PaymentRepository from "../repositories/paymentRepository";
import { IPayment } from "../models/paymentModel";
import { initializePayment, verifyPayment } from "../utils/paystack";
import {
  initializeFlutterwavePayment as initFlutterwavePayment,
  verifyFlutterwavePayment as verifyFlutterwavePaymentUtil,
} from "../utils/flutterwave";

export const createPayment = async (
  paymentData: Partial<IPayment>
): Promise<IPayment> => {
  return PaymentRepository.create(paymentData);
};

export const getPaymentById = async (id: string): Promise<IPayment | null> => {
  return PaymentRepository.findById(id);
};

export const getAllPayments = async (
  filter: any, // Pass filters
  sort: any, // Pass sorting criteria
  page: number, // Pass pagination page
  limit: number // Pass pagination limit
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
