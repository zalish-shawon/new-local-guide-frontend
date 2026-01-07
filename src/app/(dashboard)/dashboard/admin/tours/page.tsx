/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { Loader2, Trash2, ExternalLink, Edit } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { TourService } from "@/src/services/tour.service";
import { AdminService } from "@/src/services/admin.service";

export default function ManageToursPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const data = await TourService.getAllTours();
      setTours(data);
    } catch (error) {
      toast.error("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTour = async (tourId: string) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await AdminService.deleteTour(tourId);
      toast.success("Tour deleted successfully");
      fetchTours();
    } catch (error) {
      toast.error("Failed to delete tour");
    }
  };

  if (loading)
    return (
      <Loader2 className="animate-spin h-8 w-8 mx-auto mt-10 text-indigo-600" />
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Manage Tours</h1>
        <div className="text-slate-500 text-sm">
          {tours.length} Active Listings
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-slate-100 rounded-lg overflow-hidden">
                <img
                  src={tour.images?.[0] || "https://placehold.co/100"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{tour.title}</h3>
                <p className="text-sm text-slate-500">
                  Guide:{" "}
                  <span className="text-indigo-600 font-medium">
                    {tour.guide?.name || "Unknown"}
                  </span>{" "}
                  • ${tour.price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/tours/${tour._id}`}
                className="p-2 text-slate-400 hover:text-indigo-600 transition"
                title="View Live Page"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>

              <Link
                href={`/dashboard/edit-tour/${tour._id}`}
                className="p-2 text-slate-400 hover:text-indigo-600 transition"
                title="Edit Tour"
              >
                <Edit className="h-5 w-5" />
              </Link>

              <button
                onClick={() => handleDeleteTour(tour._id)}
                className="p-2 text-slate-400 hover:text-red-600 transition"
                title="Delete Tour"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
