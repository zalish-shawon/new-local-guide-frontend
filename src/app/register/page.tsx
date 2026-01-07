/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Mail, Lock, User, Map, CheckCircle2 } from "lucide-react";
import { AuthService } from "@/src/services/auth.service";
import Navbar from "@/src/components/shared/Navbar";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"tourist" | "guide">("tourist");

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        role: selectedRole,
      };

      await AuthService.register(payload);
      
      toast.success("Account created successfully!");
      
      // Redirect to Login after short delay
      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-indigo-600 p-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-2">Join TourBook</h2>
          <p className="text-indigo-100">Start your journey with us today.</p>
        </div>

        <div className="p-8">
          
          {/* Role Selection Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setSelectedRole("tourist")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition duration-200 ${
                selectedRole === "tourist" 
                  ? "bg-white text-indigo-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <User className="h-4 w-4" /> I am a Tourist
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("guide")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition duration-200 ${
                selectedRole === "guide" 
                  ? "bg-white text-indigo-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Map className="h-4 w-4" /> I am a Guide
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Must be at least 6 characters" }
                  })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-bold hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
    
    
    </>
  );
}