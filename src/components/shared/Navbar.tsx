/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Menu, X, User, LogOut, Map, Calendar, 
  Settings, Heart 
} from "lucide-react";
import toast from "react-hot-toast"; // Ensure you have this installed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false
  const pathname = usePathname();
  const router = useRouter();

  // 1. Check if user is logged in (Run on client-side only)
  useEffect(() => {
    // Check if 'accessToken' exists in localStorage
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // 2. Handle Logout Logic
  const handleLogout = () => {
    // Remove token
    localStorage.removeItem("accessToken");
    
    // Update local state immediately
    setIsLoggedIn(false);
    setProfileOpen(false);
    setIsOpen(false);

    // Show success message
    toast.success("Logged out successfully");

    // Redirect to login page
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tours", path: "/tours" },
    { name: "Destinations", path: "/destinations" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 print:hidden transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg group-hover:bg-indigo-700 transition">
              <Map className="h-6 w-6" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              TourBook
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === route.path
                    ? "text-indigo-600 font-bold"
                    : "text-slate-600 hover:text-indigo-600"
                }`}
              >
                {route.name}
              </Link>
            ))}
          </div>

          {/* Right Side: Auth Logic */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              /* ✅ LOGGED IN STATE */
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 hover:shadow-md transition bg-white"
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center border border-indigo-200">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">My Account</span>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-sm font-bold text-slate-900">User</p>
                      <p className="text-xs text-slate-500 font-medium">Logged in</p>
                    </div>
                    
                    <div className="py-1">
                      <Link 
                        href="/dashboard" 
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition"
                      >
                        <Settings className="h-4 w-4" /> Dashboard
                      </Link>
                      <Link 
                        href="/dashboard/bookings" 
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition"
                      >
                        <Calendar className="h-4 w-4" /> My Bookings
                      </Link>
                      <Link 
                        href="/wishlist" 
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition"
                      >
                        <Heart className="h-4 w-4" /> Wishlist
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 mt-1 py-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 font-medium transition"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ✅ LOGGED OUT STATE */
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-indigo-600 px-3 py-2">
                  Log in
                </Link>
                <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                {route.name}
              </Link>
            ))}
            
            <div className="border-t border-slate-100 my-2 pt-2">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-2 px-3 py-3 text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">
                    <Settings className="h-4 w-4" /> Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-3 py-3 text-base font-medium text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-2">
                  <Link href="/login" className="w-full text-center py-3 border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50">
                    Log in
                  </Link>
                  <Link href="/register" className="w-full text-center py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-md">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}