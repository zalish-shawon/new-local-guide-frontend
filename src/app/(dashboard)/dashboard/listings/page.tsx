/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, MapPin, Clock, Edit, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/src/context/AuthContext";
import { TourService } from "@/src/services/tour.service";
import { AdminService } from "@/src/services/admin.service";

export default function MyListingsPage() {
  const { user } = useAuth();
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyTours();
  }, [user]);

  const fetchMyTours = async () => {
    try {
      // 1. Fetch all tours
      const allTours = await TourService.getAllTours();
      


const myTours = allTours.filter((tour: any) => {
        const tourGuideId = typeof tour.guide === 'object' ? tour.guide?._id : tour.guide;
        return tourGuideId === user?.userId;
      });
      
      setTours(myTours);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to delete this tour?")) return;
    try {
      await AdminService.deleteTour(id); // Reusing the delete service
      toast.success("Tour deleted");
      fetchMyTours(); // Refresh list
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <Loader2 className="h-8 w-8 animate-spin mx-auto mt-10 text-indigo-600" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Listings</h1>
          <p className="text-slate-500">Manage the tours you are hosting.</p>
        </div>
        <Link 
          href="/dashboard/create-tour" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition"
        >
          <Plus className="h-5 w-5" /> Create New
        </Link>
      </div>

      {tours.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500 mb-4">You havent created any tours yet.</p>
          <Link href="/dashboard/create-tour" className="text-indigo-600 font-bold hover:underline">
            Create your first tour
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tours.map((tour) => (
            <div key={tour._id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              {/* Image Area */}
              <div className="h-48 w-full bg-slate-200 relative">
                <img 
                  src={tour.images?.[0] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80"} 
                  alt={tour.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow-sm">
                  ${tour.price}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{tour.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {tour.meetingPoint}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {tour.duration}h</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                   <Link 
                     href={`/tours/${tour._id}`}
                     className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center gap-1"
                   >
                     View Live <ExternalLink className="h-3 w-3" />
                   </Link>
                   
                   <div className="flex gap-2">
                     <button 
                       onClick={() => handleDelete(tour._id)}
                       className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                       title="Delete"
                     >
                       <Trash2 className="h-4 w-4" />
                     </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}