import * as PaymentRepository from "../repositories/paymentRepository";
import { IPayment } from "../models/paymentModel";
import { initializePayment, verifyPayment } from "../utils/paystack";
import {
  initializeFlutterwavePayment as initFlutterwavePayment,
  verifyFlutterwavePayment as verifyFlutterwavePaymentUtil,
} from "../utils/flutterwave";
import { generateUniqueReference } from "../utils/referenceTag";
import cache, { CACHE_TTL_SECONDS } from "../utils/cache";

export const createPayment = async (
  paymentData: Partial<IPayment>
): Promise<IPayment> => {
  const reference = generateUniqueReference("ADM_");
  paymentData.reference = reference;

  const payment = await PaymentRepository.create(paymentData);
  cache.flushAll();
  return payment;
};

export const getPaymentById = async (id: string): Promise<IPayment | null> => {
  const cacheKey = `payment_${id}`;
  let payment = cache.get<IPayment | null>(cacheKey);

  if (payment === undefined) {
    payment = await PaymentRepository.findById(id);
    if (payment) {
      cache.set(cacheKey, payment, CACHE_TTL_SECONDS);
    }
  }

  return payment;
};


export const getAllPayments = async (
  filter: any,
  sort: any,
  page: number,
  limit: number
): Promise<IPayment[]> => {
  const cacheKey = `allPayments_${JSON.stringify({
    filter,
    sort,
    page,
    limit,
  })}`;
  let payments = cache.get<IPayment[]>(cacheKey);

  if (!payments) {
    payments = await PaymentRepository.findAll(filter, sort, page, limit);
    cache.set(cacheKey, payments, CACHE_TTL_SECONDS);
  }

  return payments;
};

export const updatePayment = async (
  id: string,
  updateData: Partial<IPayment>
): Promise<IPayment | null> => {
  const payment = await PaymentRepository.update(id, updateData);
  if (payment) {
    cache.flushAll();
  }
  return payment;
};

export const deletePayment = async (id: string): Promise<void> => {
  await PaymentRepository.remove(id);
  cache.flushAll();
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
