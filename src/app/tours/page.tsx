/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Clock, 
  Filter, 
  ArrowUpDown, 
  Star,
  Loader2 
} from "lucide-react";
import { TourService } from "@/src/services/tour.service";
import Navbar from "@/src/components/shared/Navbar";

export default function ExploreToursPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const categories = ["All", "Adventure", "Food", "History", "Art", "Nature"];

  useEffect(() => {
    fetchTours();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = [...tours];

    // 1. Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tour => 
        tour.title.toLowerCase().includes(query) || 
        tour.meetingPoint.toLowerCase().includes(query)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter(tour => tour.category === selectedCategory);
    }

    // 3. Sort by Price
    if (sortOrder) {
      result.sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    setFilteredTours(result);
  }, [tours, searchQuery, selectedCategory, sortOrder]);

  const fetchTours = async () => {
    try {
      const data = await TourService.getAllTours();
      setTours(data);
      setFilteredTours(data);
    } catch (error) {
      console.error("Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero / Header Section */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Explore the World</h1>
          <p className="text-slate-500 max-w-2xl text-lg">
            Discover unique local experiences, guided tours, and hidden gems currated by our expert guides.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search destination or tour..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
             {/* Category Dropdown (or Pills) */}
             <select 
               value={selectedCategory}
               onChange={(e) => setSelectedCategory(e.target.value)}
               className="px-4 py-3 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-slate-700 font-medium"
             >
               {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
             </select>

             {/* Sort Button */}
             <button 
               onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
               className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition text-slate-700 font-medium whitespace-nowrap"
             >
               <ArrowUpDown className="h-4 w-4" />
               Sort: {sortOrder === 'asc' ? 'Low to High' : sortOrder === 'desc' ? 'High to Low' : 'Default'}
             </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          </div>
        ) : (
          <>
            {/* Empty State */}
            {filteredTours.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-slate-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No tours found</h3>
                <p className="text-slate-500">Try adjusting your search or filters.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                  className="mt-4 text-indigo-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              /* Tour Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTours.map((tour) => (
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
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition">
                           {tour.title}
                         </h3>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {tour.meetingPoint}</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {tour.duration}h</span>
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold">From</p>
                          <p className="text-xl font-bold text-indigo-600">${tour.price}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}