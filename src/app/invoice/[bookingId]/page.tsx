/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, Printer, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "@/src/services/api";

export default function InvoicePage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // You might need to create this endpoint or use getSingleBooking
        // Assuming your backend supports GET /bookings/:id
        const response = await api.get(`/bookings/${bookingId}`); 
        setBooking(response.data.data);
      } catch (error) {
        toast.error("Failed to load invoice");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin h-8 w-8 text-indigo-600"/></div>;
  if (!booking) return <div className="text-center mt-20 font-bold text-red-500">Invoice not found</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-8 flex flex-col items-center">
      
      {/* 🖨️ Controls (Hidden when printing) */}
      <div className="w-full max-w-3xl mb-6 flex justify-between items-center print:hidden">
        <Link 
          href="/dashboard"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <button 
          onClick={handlePrint}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg transition"
        >
          <Printer className="h-5 w-5" /> Print Invoice
        </button>
      </div>

      {/* 📄 Invoice Paper (A4 Style) */}
      <div className="bg-white w-full max-w-3xl p-12 rounded-xl shadow-xl print:shadow-none print:w-full print:max-w-none print:p-0">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">INVOICE</h1>
            <p className="text-slate-500 text-sm">#{booking.transactionId || booking._id.slice(-8).toUpperCase()}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-indigo-600">TourBook Inc.</h2>
            <p className="text-slate-500 text-sm mt-1">123 Adventure Lane</p>
            <p className="text-slate-500 text-sm">New York, NY 10012</p>
            <p className="text-slate-500 text-sm">support@tourbook.com</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Billed To</p>
            <p className="font-bold text-slate-900 text-lg">{booking.tourist?.name || "Valued Customer"}</p>
            <p className="text-slate-500 text-sm">{booking.tourist?.email}</p>
            <p className="text-slate-500 text-sm mt-1">Payment Method: Card (Stripe)</p>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mr-4">Invoice Date:</span>
              <span className="font-bold text-slate-700">{new Date().toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mr-4">Tour Date:</span>
              <span className="font-bold text-slate-700">{new Date(booking.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="py-4 text-sm font-bold text-slate-500 uppercase">Description</th>
                <th className="py-4 text-sm font-bold text-slate-500 uppercase text-center">Guests</th>
                <th className="py-4 text-sm font-bold text-slate-500 uppercase text-right">Price</th>
                <th className="py-4 text-sm font-bold text-slate-500 uppercase text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50">
                <td className="py-6">
                  <p className="font-bold text-slate-900">{booking.tour?.title}</p>
                  <p className="text-sm text-slate-500">Guided Tour - {booking.tour?.duration} Hours</p>
                </td>
                <td className="py-6 text-center text-slate-700">{booking.slots}</td>
                <td className="py-6 text-right text-slate-700">${booking.tour?.price}</td>
                <td className="py-6 text-right font-bold text-slate-900">${booking.totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${booking.totalPrice}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Tax (0%)</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-slate-900 font-extrabold text-xl pt-4 border-t border-slate-200">
              <span>Total Paid</span>
              <span className="text-indigo-600">${booking.paidAmount || booking.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 pt-8 text-center">
          <p className="text-slate-500 text-sm mb-2">Thank you for your booking!</p>
          <p className="text-slate-400 text-xs">
            If you have any questions about this invoice, please contact our support team.
          </p>
        </div>

      </div>

      {/* Print Styles CSS Injection */}
      <style jsx global>{`
        @media print {
          @page { margin: 0; }
          body { background: white; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}