import PaymentRepository from "../repositories/paymentRepository";
import { IPayment } from "../models/paymentModel";
import { initializePayment, verifyPayment } from "../utils/paystack";
import {
  initializeFlutterwavePayment,
  verifyFlutterwavePayment,
} from "../utils/flutterwave";

class PaymentService {
  async createPayment(paymentData: Partial<IPayment>): Promise<IPayment> {
    return PaymentRepository.create(paymentData);
  }

  async getPaymentById(id: string): Promise<IPayment | null> {
    return PaymentRepository.findById(id);
  }

  async getAllPayments(): Promise<IPayment[]> {
    return PaymentRepository.findAll();
  }

  async updatePayment(
    id: string,
    updateData: Partial<IPayment>
  ): Promise<IPayment | null> {
    return PaymentRepository.update(id, updateData);
  }

  async deletePayment(id: string): Promise<IPayment | null> {
    return PaymentRepository.delete(id);
  }

  async processPaystackPayment(amount: number, email: string): Promise<any> {
    return initializePayment(amount, email);
  }

  async verifyPaystackPayment(reference: string): Promise<any> {
    return verifyPayment(reference);
  }

  async processFlutterwavePayment(amount: number, email: string): Promise<any> {
    return initializeFlutterwavePayment(amount, email);
  }

  async verifyFlutterwavePayment(reference: string): Promise<any> {
    return verifyFlutterwavePayment(reference);
  }
}

export default new PaymentService();
