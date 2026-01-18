/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import api from "@/src/services/api";

export default function CheckoutForm({ bookingId }: { bookingId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);

  // Inside your CheckoutForm component
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    // 1. Confirm Payment with Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // proper return URL is crucial if 3DS auth is required
        return_url: `${window.location.origin}/payment/success`,
      },
      redirect: "if_required", // <--- IMPORTANT: This prevents redirect for simple cards
    });

    if (error) {
      toast.error(error.message || "Payment failed");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // 2. 🚨 THE MISSING LINK: Call Backend to Save Record
      try {
        const saveResponse = await api.post("/payments/confirm", {
          transactionId: paymentIntent.id,
          bookingId: bookingId, // Ensure you have this ID available in props or params
          status: "paid",
        });

        console.log("Backend Response:", saveResponse.data); // Debug log
        toast.success("Payment Confirmed!");

        // 3. Redirect to Dashboard
        window.location.href = "/dashboard";
      } catch (err) {
        console.error("Failed to save to backend:", err);
        toast.error("Payment succeeded but failed to save record");
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
        <PaymentElement />
      </div>

      <button
        disabled={!stripe || loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition flex items-center justify-center gap-2 disabled:opacity-70"
      >
        <Lock className="h-4 w-4" />
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
