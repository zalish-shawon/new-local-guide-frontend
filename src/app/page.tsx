/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";
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
        // Fetch all tours
        const data = await TourService.getAllTours();
        
        // Optional: Slice to show only first 3 or 6 as "Featured"
        // You can also filter by rating if you have that data
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
      // Redirect to the explore page with search query (if you implemented query params there)
      // For now, just redirecting to /tours
      router.push(`/tours`);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-4xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-sm">
            Discover a city like a <span className="text-indigo-400">Local</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Connect with passionate local guides for authentic, off-the-beaten-path experiences.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center px-4 h-12 md:border-r border-slate-200">
              <MapPin className="h-5 w-5 text-slate-400 mr-2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where do you want to go?" 
                className="w-full outline-none text-slate-700 placeholder:text-slate-400"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-8 rounded-full font-bold transition flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Trending Experiences</h2>
            <p className="text-slate-500">Highly rated tours people are loving right now.</p>
          </div>
          <Link href="/tours" className="text-indigo-600 font-bold hover:text-indigo-700 hidden md:block">
            View all tours →
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
                 className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
               >
                 {/* Image */}
                 <div className="h-56 overflow-hidden relative">
                   <img 
                     src={tour.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80"} 
                     alt={tour.title}
                     className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                   />
                   <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm text-slate-900">
                     {tour.category}
                   </div>
                 </div>

                 {/* Content */}
                 <div className="p-5 flex-1 flex flex-col">
                   <h3 className="font-bold text-lg text-slate-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition">
                     {tour.title}
                   </h3>
                   
                   <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                     <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {tour.meetingPoint}</span>
                   </div>

                   <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                     <p className="text-xl font-bold text-indigo-600">${tour.price}</p>
                     <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                       View
                     </span>
                   </div>
                 </div>
               </Link>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/tours" className="text-indigo-600 font-bold hover:text-indigo-700">
            View all tours →
          </Link>
        </div>
      </section>
    </main>
  );
}