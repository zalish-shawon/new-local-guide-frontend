"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import api from "@/src/services/api";
import Navbar from "@/src/components/shared/Navbar";
import CheckoutForm from "./CheckoutForm";


// Replace with your actual Stripe Publishable Key (starts with pk_test_...)
// You can get this from your Stripe Dashboard
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function PaymentPage() {
  const { bookingId } = useParams();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (bookingId) {
      // Ask Backend for the Payment Intent
      api.post("/payments/create-payment-intent", { bookingId })
        .then((res) => {
          setClientSecret(res.data.data.clientSecret);
        })
        .catch((err) => console.error("Payment setup failed", err));
    }
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-xl mx-auto mt-20 p-6">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
          <div className="bg-indigo-600 p-6 text-white text-center">
            <h1 className="text-2xl font-bold">Secure Checkout</h1>
            <p className="opacity-90 mt-1">Complete your booking</p>
          </div>
          
          <div className="p-8">
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm bookingId={bookingId as string} />
              </Elements>
            ) : (
              <div className="flex justify-center py-10">Loading payment details...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}