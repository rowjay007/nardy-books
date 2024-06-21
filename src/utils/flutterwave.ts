import axios from "axios";
import env from "../config/env";

const FLUTTERWAVE_TEST_SECRET_KEY = env.FLUTTERWAVE_TEST_SECRET_KEY;

export const initializeFlutterwavePayment = async (
  amount: number,
  email: string
) => {
  const response = await axios.post(
    "https://api.flutterwave.com/v3/payments",
    {
      tx_ref: `${Date.now()}`,
      amount,
      currency: "NGN",
      redirect_url: "https://your-redirect-url.com",
      customer: {
        email,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_TEST_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const verifyFlutterwavePayment = async (reference: string) => {
  const response = await axios.get(
    `https://api.flutterwave.com/v3/transactions/${reference}/verify`,
    {
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_TEST_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
