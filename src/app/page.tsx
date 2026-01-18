/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { 
  MapPin, 
  Search, 
  Loader2, 
  ShieldCheck, 
  Users, 
  Heart, 
  ArrowRight,
  Utensils,
  Mountain,
  Camera,
  History
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TourService } from "../services/tour.service";
import Navbar from "../components/shared/Navbar";

export default function Home() {
  const router = useRouter();
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        const data = await TourService.getAllTours();
        setTours(data.slice(0, 3)); 
      } catch (error) {
        console.error("Failed to fetch home tours");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/tours`);
    }
  };

  const categories = [
    { name: "Food & Drink", icon: Utensils, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800" },
    { name: "Adventure", icon: Mountain, img: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=800" },
    { name: "Photography", icon: Camera, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800" },
    { name: "History", icon: History, img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800" },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-150 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4 text-center mt-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
            Unlocking the <span className="text-indigo-400">Hidden Gems</span> <br/> of Every City
          </h1>
          <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto font-medium">
            Book unique private tours with verified locals who know the city best.
          </p>

          <div className="bg-white p-2 rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto border border-slate-200/20">
            <div className="flex-1 flex items-center px-6 h-14 md:border-r border-slate-200">
              <MapPin className="h-5 w-5 text-indigo-500 mr-3" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where are you going?" 
                className="w-full outline-none text-slate-700 placeholder:text-slate-400 text-lg"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white h-14 px-10 rounded-full font-bold transition flex items-center justify-center gap-2 text-lg shadow-md"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY CATEGORY SECTION (NEW) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link href={`/tours?category=${cat.name}`} key={cat.name} className="group cursor-pointer">
              <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <cat.icon className="h-10 w-10 text-white drop-shadow-md opacity-90" />
                </div>
              </div>
              <h3 className="font-bold text-slate-800 text-center group-hover:text-indigo-600 transition">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED TOURS SECTION (EXISTING) */}
      <section className="bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Trending Experiences</h2>
              <p className="text-slate-500">Highly rated tours people are loving right now.</p>
            </div>
            <Link href="/tours" className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1">
              View all tours <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
               <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
             </div>
          ) : tours.length === 0 ? (
             <div className="text-center py-10 text-slate-500">
                No tours available right now. Check back later!
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                 <Link 
                   href={`/tours/${tour._id}`} 
                   key={tour._id}
                   className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                 >
                   <div className="h-64 overflow-hidden relative">
                     <img 
                       src={tour.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80"} 
                       alt={tour.title}
                       className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                     />
                     <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm text-slate-900 border border-slate-200">
                       {tour.category}
                     </div>
                   </div>

                   <div className="p-6 flex-1 flex flex-col">
                     <h3 className="font-bold text-lg text-slate-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition">
                       {tour.title}
                     </h3>
                     
                     <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                       <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-indigo-500" /> {tour.meetingPoint}</span>
                     </div>

                     <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between">
                       <div>
                          <p className="text-xs text-slate-400 font-bold uppercase">From</p>
                          <p className="text-xl font-bold text-indigo-600">${tour.price}</p>
                       </div>
                       <span className="text-sm font-bold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition">
                         View Details
                       </span>
                     </div>
                   </div>
                 </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. WHY CHOOSE US (NEW) */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Why TourBook?</h2>
          <p className="text-slate-500 mt-2">We ensure your journey is safe, authentic, and memorable.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition">
            <div className="h-14 w-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Verified Guides</h3>
            <p className="text-slate-500 leading-relaxed">
              Every guide on our platform is vetted and verified to ensure safety and quality for your trips.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition">
            <div className="h-14 w-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Authentic Experiences</h3>
            <p className="text-slate-500 leading-relaxed">
              Don&apos;t just see the sights. Experience the culture like a local with custom tailored tours.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition">
            <div className="h-14 w-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Payments</h3>
            <p className="text-slate-500 leading-relaxed">
              Book with confidence using our secure payment system with money-back guarantees.
            </p>
          </div>
        </div>
      </section>

      {/* 5. BECOME A GUIDE CTA (NEW) */}
      <section className="bg-indigo-900 py-20 relative overflow-hidden">
         {/* Decorative background shapes */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>

         <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 text-white">
               <h2 className="text-4xl font-extrabold mb-4 leading-tight">
                 Are you a local expert? <br/>
                 <span className="text-indigo-300">Share your city with the world.</span>
               </h2>
               <p className="text-indigo-100 text-lg mb-8 max-w-lg">
                 Sign up as a guide, create your own tours, set your prices, and start earning money doing what you love.
               </p>
               <div className="flex gap-4">
                 <Link href="/register" className="bg-white text-indigo-900 px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg">
                   Become a Guide
                 </Link>
                 <Link href="#" className="border border-indigo-400 text-indigo-100 px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-800/50 transition">
                   Learn More
                 </Link>
               </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                 <img 
                   src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800" 
                   alt="Local Guide" 
                   className="rounded-2xl shadow-2xl rotate-3 w-80 h-96 object-cover border-4 border-white/20"
                 />
                 <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">2k+ Guides</p>
                      <p className="text-xs text-slate-500">Joined this month</p>
                    </div>
                 </div>
              </div>
            </div>
         </div>
      </section>
    </main>
  );
}