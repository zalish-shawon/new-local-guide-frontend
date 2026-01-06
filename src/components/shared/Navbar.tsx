"use client";

import Link from "next/link";
import { Menu, X, MapPin, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Local<span className="text-indigo-600">Guide</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/tours"
              className="text-slate-600 hover:text-indigo-600 font-medium transition"
            >
              Explore Tours
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-lg transition"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      user.role === "admin"
                        ? "bg-red-500"
                        : user.role === "guide"
                        ? "bg-indigo-600"
                        : "bg-slate-600"
                    }`}
                  >
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                      {user.role === "tourist"
                        ? "My Trips"
                        : `${user.role} Dashboard`}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-red-500 transition"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              // Logged Out View
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-slate-900 font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 transition shadow-md shadow-indigo-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-lg">
          <Link href="/tours" className="block text-slate-600 font-medium">
            Explore Tours
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="block text-slate-600 font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left text-red-500 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-slate-600 font-medium">
                Log in
              </Link>
              <Link
                href="/register"
                className="block text-indigo-600 font-medium"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
