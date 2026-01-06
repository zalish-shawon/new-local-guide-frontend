"use client";

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Prevent auto-redirect to handle it manually
    });

    if (error) {
      toast.error(error.message || "Payment failed");
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      
      // 1. Notify Backend to confirm booking
      try {
        await api.post("/payments/confirm", {
          bookingId,
          transactionId: paymentIntent.id
        });

        toast.success("Payment Successful! Booking Confirmed.");
        router.push("/dashboard"); // Redirect to Dashboard
      } catch (err) {
        toast.error("Payment succeeded but confirmation failed. Contact support.");
      }
    } else {
      setLoading(false);
    }
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