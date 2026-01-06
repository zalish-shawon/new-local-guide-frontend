"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  Calendar, 
  Settings, 
  PlusCircle, 
  LogOut,
  Users,
  ShieldCheck
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/src/context/AuthContext";

const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const touristLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Trips", href: "/dashboard/trips", icon: Map },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const guideLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Listings", href: "/dashboard/listings", icon: Map },
    { name: "Create Tour", href: "/dashboard/create-tour", icon: PlusCircle },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
  ];

  const adminLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Manage Tours", href: "/dashboard/admin/tours", icon: Map },
    { name: "All Bookings", href: "/dashboard/admin/bookings", icon: Calendar },
  ];

  // Dynamically select links based on Role
  let links = touristLinks;
  if (user?.role === "guide") links = guideLinks;
  if (user?.role === "admin") links = adminLinks;

  return (
    <div className="w-64 bg-white h-[calc(100vh-64px)] border-r border-slate-200 flex-shrink-0 hidden md:flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6 px-2">
           <ShieldCheck className={clsx("h-5 w-5", {
             "text-indigo-600": user?.role === "guide",
             "text-green-600": user?.role === "tourist",
             "text-red-600": user?.role === "admin",
           })} />
           <span className="font-bold text-slate-700 capitalize">{user?.role} Portal</span>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium",
                  isActive 
                    ? "bg-indigo-50 text-indigo-600" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 w-full transition font-medium"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;