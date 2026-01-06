/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Clock, Users, Star, Calendar, ShieldCheck, User as UserIcon } from "lucide-react";
import toast from "react-hot-toast";
import { TourService } from "@/src/services/tour.service";
import { useAuth } from "@/src/context/AuthContext";
import Navbar from "@/src/components/shared/Navbar";

export default function TourDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await TourService.getTourById(id as string);
        setTour(data);
      } catch (error) {
        toast.error("Failed to load tour details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTour();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login to book a tour");
      router.push("/login");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    setBookingLoading(true);
    try {
      // 1. Create the booking
      const booking = await TourService.createBooking(tour._id, selectedDate);
      toast.success("Booking requested!");
      
      router.push(`/payment/${booking._id}`); 

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!tour) return <div className="min-h-screen flex items-center justify-center">Tour not found</div>;

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Navbar />

      {/* Image Gallery (Simple Version) */}
      <div className="h-[400px] w-full bg-slate-200 relative">
         <img 
           src={tour.images?.[0] || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"} 
           alt={tour.title}
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{tour.title}</h1>
                    <div className="flex items-center text-slate-500 gap-4">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {tour.meetingPoint}</span>
                      <span className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-400" /> 4.8 (12 Reviews)</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 mt-6">
                <div className="text-center border-r border-slate-100">
                  <div className="flex justify-center mb-2"><Clock className="h-5 w-5 text-indigo-600" /></div>
                  <p className="text-sm text-slate-500">Duration</p>
                  <p className="font-semibold text-slate-900">{tour.duration} hours</p>
                </div>
                <div className="text-center border-r border-slate-100">
                  <div className="flex justify-center mb-2"><Users className="h-5 w-5 text-indigo-600" /></div>
                  <p className="text-sm text-slate-500">Group Size</p>
                  <p className="font-semibold text-slate-900">Up to {tour.maxGroupSize}</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2"><ShieldCheck className="h-5 w-5 text-indigo-600" /></div>
                  <p className="text-sm text-slate-500">Guide</p>
                  <p className="font-semibold text-slate-900">{tour.guide?.name || "Verified Guide"}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">About this experience</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {tour.description}
              </p>
            </div>

            {/* Guide Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex gap-6 items-start">
              <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <UserIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Hosted by {tour.guide?.name}</h3>
                <p className="text-slate-500 text-sm mb-2">Joined in 2024</p>
                <p className="text-slate-600">{tour.guide?.bio || "Passionate local guide eager to share the city's secrets."}</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50 sticky top-24">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-3xl font-bold text-slate-900">${tour.price}</span>
                  <span className="text-slate-500"> / person</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">
                   <Star className="h-3 w-3 text-amber-500" /> 4.9
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input 
                      type="datetime-local"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-600"
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                   <div className="flex justify-between mb-2 text-slate-600">
                      <span>${tour.price} x 1 Adult</span>
                      <span>${tour.price}</span>
                   </div>
                   <div className="flex justify-between font-bold text-lg text-slate-900 mt-4">
                      <span>Total</span>
                      <span>${tour.price}</span>
                   </div>
                </div>

                <button 
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {bookingLoading ? "Processing..." : "Book Now"}
                </button>
                
                <p className="text-center text-xs text-slate-400 mt-2">
                  You wont be charged yet
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}