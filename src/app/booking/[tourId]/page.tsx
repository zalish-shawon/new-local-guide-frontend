/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Calendar, Users, CreditCard, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/src/context/AuthContext";
import { TourService } from "@/src/services/tour.service";
import Navbar from "@/src/components/shared/Navbar";
import api from "@/src/services/api";


export default function BookingPage() {
  const { tourId } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
console.log(guests);
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await TourService.getTourById(tourId as string);
        setTour(data);
      } catch (error) {
        toast.error("Failed to load tour details");
      } finally {
        setLoading(false);
      }
    };

    if (tourId) fetchTour();
  }, [tourId]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Create the Booking in Backend
      const payload = {
        tourId: tour._id,
        date: new Date(date).toISOString(), // Ensure date format matches backend expectations
        slots: guests, // or 'tickets' depending on your backend model
      };

      // We call the API directly or use BookingService if you updated it
      const response = await api.post("/bookings/create-booking", payload);
      
      const newBooking = response.data.data;
      toast.success("Booking initiated!");

      // 2. Redirect to Payment Page
      router.push(`/payment/${newBooking._id}`);

    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600 h-8 w-8"/></div>;
  if (!tour) return <div className="text-center mt-20">Tour not found</div>;

  const totalPrice = tour.price * guests;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Confirm Your Booking</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left: Tour Summary */}
          <div className="md:w-1/3 bg-slate-100 p-6 flex flex-col">
            <div className="h-32 w-full bg-white rounded-lg overflow-hidden mb-4">
               <img 
                 src={tour.images?.[0] || 'https://placehold.co/400'} 
                 alt={tour.title} 
                 className="w-full h-full object-cover" 
               />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{tour.title}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
               <MapPin className="h-4 w-4" /> {tour.meetingPoint}
            </div>
            <div className="mt-auto pt-4 border-t border-slate-200">
               <p className="text-xs text-slate-500 uppercase font-bold">Base Price</p>
               <p className="font-bold text-slate-900">${tour.price} / person</p>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="md:w-2/3 p-8">
            <form onSubmit={handleBooking} className="space-y-6">
              
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]} // Disable past dates
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Guests Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input 
                    type="number" 
                    min="1"
                    max={tour.maxGroupSize}
                    required
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-indigo-50 p-4 rounded-xl flex justify-between items-center">
                <span className="text-indigo-900 font-medium">Total to Pay</span>
                <span className="text-2xl font-bold text-indigo-700">${totalPrice}</span>
              </div>

              <button 
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition disabled:opacity-70"
              >
                {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : <><CreditCard className="h-5 w-5" /> Proceed to Payment</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}