/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { TourService } from "@/src/services/tour.service";

export default function EditTourPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await TourService.getTourById(id as string);
        
        // Pre-fill the form with existing data
        reset({
          title: data.title,
          meetingPoint: data.meetingPoint,
          category: data.category,
          price: data.price,
          duration: data.duration,
          maxGroupSize: data.maxGroupSize,
          description: data.description,
          imageUrl: data.images?.[0] || ""
        });
      } catch (error) {
        toast.error("Failed to fetch tour details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTour();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        duration: Number(data.duration),
        maxGroupSize: Number(data.maxGroupSize),
        images: [data.imageUrl], // Update image array
      };

      await TourService.updateTour(id as string, payload);
      toast.success("Tour updated successfully!");
      
      // Redirect based on role
      if (user?.role === 'admin') {
        router.push("/dashboard/admin/tours");
      } else {
        router.push("/dashboard/listings");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center mt-10"><Loader2 className="animate-spin h-8 w-8 text-indigo-600"/></div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
           <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Edit Tour</h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tour Title</label>
          <input 
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Location & Category */}
        <div className="grid grid-cols-2 gap-4">
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Meeting Point</label>
            <input 
              {...register("meetingPoint", { required: true })}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
           </div>
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select 
              {...register("category")}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="Food">Food</option>
              <option value="Adventure">Adventure</option>
              <option value="History">History</option>
              <option value="Art">Art</option>
            </select>
           </div>
        </div>

        {/* Price & Duration */}
        <div className="grid grid-cols-3 gap-4">
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
            <input 
              type="number"
              {...register("price", { required: true })}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
           </div>
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Hours)</label>
            <input 
              type="number"
              {...register("duration", { required: true })}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
           </div>
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Max Group</label>
            <input 
              type="number"
              {...register("maxGroupSize", { required: true })}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
           </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea 
            {...register("description", { required: true })}
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image URL</label>
          <input 
            {...register("imageUrl")}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button 
          disabled={submitting}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save className="h-5 w-5" /> Save Changes</>}
        </button>

      </form>
    </div>
  );
}