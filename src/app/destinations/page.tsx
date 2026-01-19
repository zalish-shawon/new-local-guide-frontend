/* eslint-disable @next/next/no-img-element */
"use client";

import Navbar from "@/src/components/shared/Navbar";
import { ArrowRight, Compass, Map, Sun, Wind } from "lucide-react";
import Link from "next/link";

// Expanded data to fill the 4-column grid
const destinations = [
  { id: 1, name: "Sylhet", count: 45, image: "https://images.unsplash.com/photo-1640536994405-a4626ebb16fe?q=80&w=735&auto=format&fit=crop", desc: "Tea Gardens & Green Hills" },
  { id: 2, name: "Cox's Bazar", count: 120, image: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?q=80&w=600&auto=format&fit=crop", desc: "World's Longest Beach" },
  { id: 3, name: "Bandarban", count: 32, image: "https://images.unsplash.com/photo-1558673810-9b0b6316d4f4?q=80&w=1074&auto=format&fit=crop", desc: "Trekking Paradise" },
  { id: 4, name: "Dhaka", count: 85, image: "https://images.unsplash.com/photo-1564034503-e7c9edcb420c?q=80&w=1074&auto=format&fit=crop", desc: "The City of History" },
  { id: 5, name: "Sundarbans", count: 18, image: "https://images.unsplash.com/photo-1706459671567-43529d418cd1?q=80&w=1415&auto=format&fit=crop", desc: "Home of the Royal Tiger" },
  { id: 6, name: "Saint Martin", count: 25, image: "https://images.unsplash.com/photo-1636903756822-11b3176e28f3?q=80&w=1074&auto=format&fit=crop", desc: "Coral Island Blue Water" },
  { id: 7, name: "Sajek Valley", count: 40, image: "https://images.unsplash.com/photo-1658383895221-173f07c6a9d0?q=80&w=1170&auto=format&fit=crop", desc: "Kingdom of Clouds" },
  { id: 8, name: "Rangamati", count: 22, image: "https://images.unsplash.com/photo-1642179335770-82d5ffc4b439?q=80&w=1074&auto=format&fit=crop", desc: "Lake & Indigenous Culture" },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-slate-900 pt-24 pb-20 px-4 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: "radial-gradient(#6366f1 1px, transparent 1px)", backgroundSize: "32px 32px" }}>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm">Discover Bangladesh</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Explore Top <span className="text-indigo-500">Destinations</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            From the cloud-touching hills of Bandarban to the endless waves of Cox's Bazar, find your perfect getaway.
          </p>
        </div>
      </section>

      {/* 2. MAIN DESTINATIONS GRID (4 Cards Per Row) */}
      <section className="py-20 px-4 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <Link 
              href={`/tours?location=${dest.name}`} 
              key={dest.id} 
              className="group relative h-96 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                <p className="text-slate-300 text-sm font-medium mb-3">{dest.desc}</p>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-indigo-400 text-sm font-bold">Explore {dest.count} Tours</span>
                  <ArrowRight className="h-4 w-4 text-indigo-400" />
                </div>
              </div>

              {/* Top Badge */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
                {dest.count} Tours
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED / EDITOR'S PICK (New Section) */}
      <section className="py-20 px-4 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative">
               <div className="absolute top-4 left-4 w-full h-full border-2 border-indigo-100 rounded-3xl z-0"></div>
               <img 
                 src="https://images.unsplash.com/photo-1562793171-b7fa2e3369d8?q=80&w=1332&auto=format&fit=crop" 
                 alt="Featured Destination" 
                 className="relative z-10 rounded-3xl shadow-xl w-full h-[400px] object-cover"
               />
               <div className="absolute bottom-10 -right-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 animate-bounce-slow">
                  <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
                    <Sun className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Best Season</p>
                    <p className="font-bold text-slate-900">Winter (Nov-Feb)</p>
                  </div>
               </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-indigo-600 font-bold tracking-wide uppercase text-sm bg-indigo-50 px-3 py-1 rounded-full">Editor's Pick</span>
              <h2 className="text-4xl font-extrabold text-slate-900">Experience the Calm of Rangamati</h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                Known as the "City of Lakes", Rangamati offers a serene escape with its hanging bridge, tribal culture, and kayaking opportunities on Kaptai Lake. It's the perfect spot for those looking to disconnect.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3">
                   <Compass className="h-5 w-5 text-indigo-600" />
                   <span className="font-medium text-slate-700">Guided Boat Tours</span>
                </div>
                <div className="flex items-center gap-3">
                   <Map className="h-5 w-5 text-indigo-600" />
                   <span className="font-medium text-slate-700">Tribal Markets</span>
                </div>
                <div className="flex items-center gap-3">
                   <Wind className="h-5 w-5 text-indigo-600" />
                   <span className="font-medium text-slate-700">Fresh Mountain Air</span>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/tours?location=Rangamati" className="btn-primary inline-flex">
                  View Rangamati Tours
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEWSLETTER CTA (New Section) */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-30"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-30"></div>

           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Unsure where to go next?</h2>
             <p className="text-slate-400 mb-10 max-w-xl mx-auto">
               Sign up for our weekly travel inspiration. We send hidden gems, discount codes, and seasonal guides straight to your inbox.
             </p>

             <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:bg-white/20 outline-none transition"
               />
               <button type="button" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg">
                 Subscribe
               </button>
             </form>
             <p className="text-slate-600 text-xs mt-4">No spam, unsubscribe anytime.</p>
           </div>
        </div>
      </section>

    </main>
  );
}