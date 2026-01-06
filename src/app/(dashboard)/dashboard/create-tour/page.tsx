/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import api from "@/src/services/api";

export default function CreateTourPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Convert strings to numbers where necessary
      const payload = {
        ...data,
        price: Number(data.price),
        duration: Number(data.duration),
        maxGroupSize: Number(data.maxGroupSize),
        // For images, we are using a placeholder. 
        // Real app needs Cloudinary upload logic here.
        images: [data.imageUrl || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80"],
      };

      await api.post("/tours/create-tour", payload);
      toast.success("Tour created successfully!");
      router.push("/dashboard/listings"); // or /dashboard/admin/tours
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create tour");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Create New Tour</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tour Title</label>
          <input 
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Midnight Food Walk"
          />
        </div>

        {/* Location & Category */}
        <div className="grid grid-cols-2 gap-4">
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Meeting Point / City</label>
            <input 
              {...register("meetingPoint", { required: "Location is required" })}
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
              {...register("price", { required: true, min: 1 })}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
           </div>
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Hours)</label>
            <input 
              type="number"
              {...register("duration", { required: true, min: 1 })}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
           </div>
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Max Group</label>
            <input 
              type="number"
              {...register("maxGroupSize", { required: true, min: 1 })}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
           </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea 
            {...register("description", { required: "Description is required" })}
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe the experience..."
          />
        </div>

        {/* Image URL (Simple input for now) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image URL</label>
          <input 
            {...register("imageUrl")}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://..."
          />
          <p className="text-xs text-slate-400 mt-1">Paste a link to an image (Unsplash, etc.)</p>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Plus className="h-5 w-5" /> Publish Tour</>}
        </button>

      </form>
    </div>
  );
}