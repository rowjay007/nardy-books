import axios from "axios";
import env from "../config/env";

const PAYSTACK_TEST_SECRET_KEY = env.PAYSTACK_TEST_SECRET_KEY;

export const initializePayment = async (amount: number, email: string) => {
  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    {
      amount: amount * 100,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_TEST_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const verifyPayment = async (reference: string) => {
  const response = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_TEST_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
