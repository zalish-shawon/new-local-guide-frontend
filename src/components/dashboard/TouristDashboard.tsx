/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { BookingService } from "@/src/services/booking.service";

export default function TouristDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await BookingService.getMyBookings();
        setBookings(data);
      } catch (error) {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="p-8">Loading your trips...</div>;

  const totalSpent = bookings.reduce(
    (acc, curr) => acc + (curr.totalPrice || 0),
    0
  );
  const upcomingTrips = bookings.filter((b) => b.status === "confirmed").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Travels</h1>
        <p className="text-slate-500">Manage your trips and payments.</p>
      </div>

      {/* Tourist Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium">Total Trips</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {bookings.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium">
            Upcoming Confirmed
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {upcomingTrips}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium">Total Spent</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            ${totalSpent}
          </p>
        </div>
      </div>

      {/* Booking List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">My Trip History</h2>
        </div>

        {bookings.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            <p>You havent booked any trips yet.</p>
            <Link
              href="/tours"
              className="text-indigo-600 font-bold mt-2 inline-block"
            >
              Explore Tours
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {booking.tour?.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />{" "}
                        {new Date(booking.date).toLocaleDateString()}
                      </span>
                      <span className="font-medium text-slate-900">
                        ${booking.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4">
                    {booking.status === "confirmed" && (
                      <>
                        {/* Status Badge */}
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3" /> Confirmed
                        </span>

                        {/* Invoice Link (Only visible when confirmed) */}
                        <Link
                          href={`/invoice/${booking._id}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="View Invoice"
                        >
                          <FileText className="h-4 w-4" />
                        </Link>
                      </>
                    )}
                  </div>
                  {booking.status === "pending" && (
                    <Link
                      href={`/payment/${booking._id}`}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-200"
                    >
                      Pay Now
                    </Link>
                  )}
                  {booking.status === "cancelled" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                      <XCircle className="h-3 w-3" /> Cancelled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
