import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = ({ amount = 25, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const axiousSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const amountInCents = amount * 100;

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    try {
      // Create payment intent
      const res = await axiousSecure.post("/create-payment-intent", {
        amountInCents,
      });

      const clientSecret = res.data.clientSecret;

      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "no-email@example.com",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        toast.error(result.error.message);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // Save payment to database
          const paymentData = {
            amount: amount,
            currency: "usd",
            paymentMethode:'Card',
            transactionId: result.paymentIntent.id,
            email: user?.email,
            name: user?.displayName,
            paymentDate: new Date(),
            status: "completed",
            purpose: "Charity Role Request",
          };

          const saveRes = await axiousSecure.post("/save-payment", paymentData);

          if (saveRes.data.success) {
            toast.success("Payment successful!");
            onPaymentSuccess(result.paymentIntent);
          } else {
            toast.error("Payment succeeded but failed to save record");
          }
        }
        setProcessing(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message);
      toast.error("Payment failed");
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md"
      >
        <div className="border rounded-lg p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn btn-primary w-full disabled:opacity-50"
        >
          {processing ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <p className="text-sm text-gray-500 text-center">
          Secure payment processed by Stripe
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;
