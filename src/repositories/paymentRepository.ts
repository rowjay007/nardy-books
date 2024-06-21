import Payment, { IPayment } from "../models/paymentModel";

class PaymentRepository {
  async create(paymentData: Partial<IPayment>): Promise<IPayment> {
    const payment = new Payment(paymentData);
    return payment.save();
  }

  async findById(id: string): Promise<IPayment | null> {
    return Payment.findById(id).populate("user").exec();
  }

  async findAll(): Promise<IPayment[]> {
    return Payment.find().populate("user").exec();
  }

  async update(
    id: string,
    updateData: Partial<IPayment>
  ): Promise<IPayment | null> {
    return Payment.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<IPayment | null> {
    return Payment.findByIdAndDelete(id).exec();
  }
}

export default new PaymentRepository();
