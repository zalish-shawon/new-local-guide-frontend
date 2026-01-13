/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2, Printer, ReceiptText } from "lucide-react";
import api from "@/src/services/api";
import { QRCodeCanvas } from "qrcode.react";

export default function InvoicePage() {
  const params = useParams();
  const bookingId = (params?.bookingId as string) || "";

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
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

  const money = (n: any) => {
    const num = Number(n ?? 0);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number.isFinite(num) ? num : 0);
  };

  const invoiceNo = useMemo(() => {
    if (!booking) return "";
    return (
      booking.transactionId ||
      String(booking._id || "")
        .slice(-8)
        .toUpperCase()
    );
  }, [booking]);

  const invoiceDate = useMemo(() => new Date(), []);
  const tourDate = useMemo(
    () => (booking?.date ? new Date(booking.date) : null),
    [booking]
  );

  // IMPORTANT: don't use window in useMemo directly unless guarded.
  // QR will encode a useful verification text (safe for SSR/client).
  const qrValue = useMemo(() => {
    if (!booking) return "";
    const amount = booking?.paidAmount ?? booking?.totalPrice ?? "";
    return `INVOICE:${invoiceNo} | BOOKING:${bookingId} | AMOUNT:${amount}`;
  }, [booking, invoiceNo, bookingId]);

  const isPaid = useMemo(() => {
    // If you have booking.paymentStatus, replace this with that.
    return Boolean(booking?.paidAmount ?? booking?.totalPrice);
  }, [booking]);

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="flex items-center gap-3 text-slate-700">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-medium">Loading invoice...</span>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-4 text-red-700">
          <p className="font-bold">Invoice not found</p>
          <p className="text-sm text-red-600/90">
            Please check your booking ID and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="print:hidden sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-semibold shadow-sm hover:bg-indigo-700 active:scale-[0.99] transition"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>

      {/* Page */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 print:py-0">
        {/* Paper */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 print:shadow-none print:ring-0 print:rounded-none print:invoice-onepage">
          {/* subtle header gradient */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-indigo-600/10 via-slate-50 to-purple-600/10 print:hidden" />

          {/* Content */}
          <div className="relative p-6 sm:p-9 print:p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white grid place-items-center shadow-sm">
                  <ReceiptText className="h-5 w-5" />
                </div>

                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    Invoice
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                     Invoice number: #{invoiceNo}
                    </span>
                    <span>
                      Issued{" "}
                      <span className="font-semibold text-slate-700">
                        {invoiceDate.toLocaleDateString()}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <h2 className="text-base font-extrabold text-indigo-600">
                  TourBook Inc.
                </h2>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  123 Adventure Lane <br />
                  New York, NY 10012 <br />
                  support@tourbook.com
                </p>
              </div>
            </div>

            {/* Parties + QR */}
            <div className="mt-6 grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-7 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  Billed To
                </p>
                <p className="mt-1 text-base font-bold text-slate-900">
                  {booking.tourist?.name || "Valued Customer"}
                </p>
                <p className="text-xs text-slate-600">
                  {booking.tourist?.email || "-"}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200">
                    <span className="text-slate-500">Tour Date</span>
                    <span className="font-semibold text-slate-800">
                      {tourDate ? tourDate.toLocaleDateString() : "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200">
                    <span className="text-slate-500">Guests</span>
                    <span className="font-semibold text-slate-800">
                      {booking.slots ?? "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-5 rounded-xl border border-slate-100 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      Payment
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      Method:{" "}
                      <span className="font-semibold text-slate-800">
                        Stripe
                      </span>
                    </p>
                    <p className="text-xs text-slate-600">
                      Status:{" "}
                      <span className="font-semibold text-emerald-700">
                        {isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </p>
                    <p className="text-xs text-slate-600">
                      Ref:{" "}
                      <span className="font-semibold text-slate-800">
                        {invoiceNo}
                      </span>
                    </p>
                  </div>

                  {/* QR */}
                  <div className="shrink-0 rounded-xl bg-slate-50 p-2 ring-1 ring-slate-200">
                    <QRCodeCanvas value={qrValue} size={86} includeMargin />
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                  Scan to verify invoice details.
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-5 rounded-xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 px-4 py-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  Booking Summary
                </p>
              </div>

              <table className="w-full text-left">
                <thead className="border-b border-slate-100">
                  <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3 text-center">Guests</th>
                    <th className="px-4 py-3 text-right">Unit</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-50">
                    <td className="px-4 py-4">
                      <p className="font-bold text-slate-900 text-sm">
                        {booking.tour?.title || "Tour"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Guided Tour • {booking.tour?.duration ?? "-"} Hours
                      </p>
                    </td>
                    <td className="px-4 py-4 text-center font-semibold text-slate-700 text-sm">
                      {booking.slots ?? 0}
                    </td>
                    <td className="px-4 py-4 text-right text-slate-700 text-sm">
                      {money(booking.tour?.price)}
                    </td>
                    <td className="px-4 py-4 text-right font-extrabold text-slate-900 text-sm">
                      {money(booking.totalPrice)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals + Notes */}
            <div className="mt-5 grid grid-cols-12 gap-4 items-start">
              {/* Notes (PAID stamp placed here, right after text) */}
              <div className="col-span-12 sm:col-span-7 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-sm font-semibold text-slate-900">Notes</p>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  This invoice confirms your payment and reservation. For
                  support, email{" "}
                  <span className="font-semibold text-slate-800">
                    support@tourbook.com
                  </span>{" "}
                  with your invoice number.
                </p>

                {/* ✅ PAID stamp AFTER notes section */}
                {isPaid && (
                  <div className="mt-4 flex justify-center">
                    <div className="paid-stamp inline-flex items-center gap-2 rounded-lg border-2 border-red-600 px-4 py-2">
                      <span className="text-red-700 font-extrabold tracking-[0.35em] text-sm">
                        PAID
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="col-span-12 sm:col-span-5 rounded-xl border border-slate-200 bg-white p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-xs">Subtotal</span>
                    <span className="font-semibold text-xs">
                      {money(booking.totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-xs">Tax</span>
                    <span className="font-semibold text-xs">{money(0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-xs">Discount</span>
                    <span className="font-semibold text-xs">{money(0)}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">
                      Total Paid
                    </span>
                    <span className="font-extrabold text-indigo-600">
                      {money(booking.paidAmount ?? booking.totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  Payment received • Keep for your records
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-slate-100 pt-4 text-center">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} TourBook Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print rules: force single page */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          html,
          body {
            background: #fff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* Hide top controls */
          .print\\:hidden {
            display: none !important;
          }

          /* Force one page behavior */
          .print\\:invoice-onepage {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* Prevent internal blocks from breaking */
          table,
          tr,
          td,
          th {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* Slightly tighten spacing for print */
          .paid-stamp {
            transform: rotate(-6deg) !important;
          }
        }
      `}</style>
    </div>
  );
}
