/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Clock, Users, Star, Calendar } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { TourService } from "@/src/services/tour.service";
import { ReviewService } from "@/src/services/review.service";
import Navbar from "@/src/components/shared/Navbar";
import ReviewSection from "@/src/components/ui/ReviewSection";

export default function TourDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [tour, setTour] = useState<any>(null);
  
  // 1. Add State for Review Stats
  const [reviewStats, setReviewStats] = useState({ average: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Tour Data
        const tourData = await TourService.getTourById(id as string);
        setTour(tourData);

        // 2. Fetch Reviews to calculate stats
        const reviewsData = await ReviewService.getReviewsByTourId(id as string);
        
        // Calculate Stats
        if (reviewsData.length > 0) {
          const totalRating = reviewsData.reduce((acc: number, curr: any) => acc + curr.rating, 0);
          const avg = totalRating / reviewsData.length;
          setReviewStats({
            average: Number(avg.toFixed(1)), // e.g., 4.5
            count: reviewsData.length
          });
        }
      } catch (error) {
        console.error("Failed to load tour data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading || !tour) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image */}
            <div className="md:w-1/2 h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={tour.images?.[0] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80'} 
                alt={tour.title} 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Content */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  {tour.category}
                </span>
                
                {/* 3. SHOW REAL RATINGS HERE */}
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold text-slate-900">{reviewStats.average || "New"}</span>
                  <span className="text-slate-400 text-sm">
                    ({reviewStats.count} {reviewStats.count === 1 ? 'Review' : 'Reviews'})
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                {tour.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-8 text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  <span>{tour.meetingPoint}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  <span>{tour.duration} Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <span>Max {tour.maxGroupSize} People</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div className="bg-slate-50 px-6 py-3 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-bold">Price per person</p>
                  <p className="text-3xl font-bold text-indigo-600">${tour.price}</p>
                </div>

                {/* Book Now Button */}
                {user?.role === 'tourist' ? (
                  <Link 
                    href={`/booking/${tour._id}`} 
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition"
                  >
                    Book This Tour
                  </Link>
                ) : (
                   <button disabled className="flex-1 bg-slate-200 text-slate-400 text-center py-4 rounded-xl font-bold cursor-not-allowed">
                     {user?.role === 'guide' ? 'Guide View' : 'Login to Book as a tourist'}
                   </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details & Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Description + Reviews */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About this experience</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </div>

            {/* Reviews Component */}
            <ReviewSection tourId={id as string} />
          </div>

          {/* Right Column: Guide Info */}
          <div className="space-y-6">
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4">Your Local Guide</h3>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-slate-200 rounded-full overflow-hidden">
                     {/* Placeholder Avatar */}
                     <div className="h-full w-full bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                        {tour.guide?.name?.[0] || "G"}
                     </div>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-slate-900">{tour.guide?.name || "Expert Guide"}</p>
                    <p className="text-sm text-slate-500">Verified Host</p>
                  </div>
                </div>
                <button className="w-full mt-6 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl transition">
                  Contact Host
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}