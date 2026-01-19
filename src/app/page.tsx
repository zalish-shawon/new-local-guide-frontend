/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, MapPin, ShieldCheck, Users, Heart, ArrowRight, 
  Calendar, Star, Globe, CheckCircle2, TrendingUp, ChevronRight 
} from "lucide-react";
import Navbar from "../components/shared/Navbar";
import { TourService } from "../services/tour.service";

// ✅ FIXED: High-quality, reliable images
const destinations = [
  { name: "Sylhet", img: "https://images.unsplash.com/photo-1640536994405-a4626ebb16fe?q=80&w=735&auto=format&fit=crop", count: "45 Tours", desc: "Tea Gardens & Waterfalls" },
  { name: "Cox's Bazar", img: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?q=80&w=600&auto=format&fit=crop", count: "120 Tours", desc: "Longest Sea Beach" },
  { name: "Bandarban", img: "https://images.unsplash.com/photo-1558673810-9b0b6316d4f4?q=80&w=1074&auto=format&fit=crop", count: "30 Tours", desc: "Hills & Trekking" },
  { name: "Dhaka", img: "https://images.unsplash.com/photo-1564034503-e7c9edcb420c?q=80&w=1074&auto=format&fit=crop", count: "85 Tours", desc: "History & Culture" },
];

const stats = [
  { label: "Happy Travelers", value: "15k+", icon: Users },
  { label: "Tours Completed", value: "8,500", icon: CheckCircle2 },
  { label: "5-Star Reviews", value: "98%", icon: Star },
  { label: "Local Guides", value: "450+", icon: MapPin },
];

const reviews = [
  { name: "Alice Johnson", role: "Adventure Lover", text: "The local guide in Sylhet was phenomenal! Saw hidden gems I'd never find alone.", rating: 5, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" },
  { name: "Mark Smith", role: "Foodie", text: "Best food tour in Old Dhaka. Safe, delicious, and extremely well organized.", rating: 5, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100" },
  { name: "Sarah Lee", role: "Photographer", text: "Bandarban trek was challenging but the support team made it easy. Highly recommend.", rating: 4, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100" },
];

export default function Home() {
  const router = useRouter();
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await TourService.getAllTours();
        setTours(data.slice(0, 3)); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // ✅ FUNCTIONAL SEARCH
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (searchDate) params.set("startDate", searchDate); // Assuming backend expects 'startDate'
    
    // Push to tours page with query params
    router.push(`/tours?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover scale-105 animate-slow-zoom" // Add a slow zoom animation if you have custom css
            alt="Hero Background"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6 mt-10">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white/10 text-white text-sm font-semibold backdrop-blur-md border border-white/20 animate-fade-in">
            <Globe className="h-4 w-4 text-indigo-400" />
            <span>Discover the world&apos;s hidden gems</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl tracking-tight">
            Travel Like a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Local</span>, <br />
            Not a Tourist
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed">
            Connect with verified local guides for authentic, off-the-beaten-path experiences that guidebooks won&apos;t show you.
          </p>
        </div>
      </section>

      {/* 2. SEARCH BAR SECTION (Floating & Functional) */}
      <section className="relative z-20 -mt-16 px-4">
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-2xl shadow-indigo-900/10 border border-slate-100 flex flex-col md:flex-row gap-3 items-center">
          
          <div className="flex-1 w-full relative group">
            <div className="absolute left-4 top-3.5 bg-indigo-50 p-1.5 rounded-lg text-indigo-600 group-focus-within:bg-indigo-600 group-focus-within:text-white transition">
              <MapPin className="h-5 w-5" />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Where do you want to go?" 
              className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-transparent hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-2xl outline-none text-slate-900 font-medium transition"
            />
          </div>

          <div className="flex-1 w-full relative group">
             <div className="absolute left-4 top-3.5 bg-indigo-50 p-1.5 rounded-lg text-indigo-600 group-focus-within:bg-indigo-600 group-focus-within:text-white transition">
              <Calendar className="h-5 w-5" />
            </div>
            <input 
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-transparent hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-2xl outline-none text-slate-600 font-medium transition"
            />
          </div>

          <button 
            onClick={handleSearch}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-2xl transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95"
          >
            <Search className="h-5 w-5" />
            Search
          </button>
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS (Redesigned Cards) */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold tracking-wide uppercase text-sm">Find your next adventure</span>
          <h2 className="text-4xl font-extrabold text-slate-900 mt-2">Popular Destinations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <Link href={`/tours?location=${dest.name}`} key={dest.name} className="group relative h-80 w-full overflow-hidden rounded-3xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500">
              <img 
                src={dest.img} 
                alt={dest.name} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                <p className="text-slate-300 text-sm mb-2">{dest.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium border border-white/30">
                    {dest.count}
                  </span>
                  <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section className="bg-white py-24 border-y border-slate-100 relative overflow-hidden">
        {/* Background blobs for decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-rose-50 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900">Why Travel with TourBook?</h2>
            <p className="text-slate-500 mt-4 text-lg">We prioritize safety, authenticity, and fair pricing to ensure you have the best experience possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50", title: "100% Verified Guides", desc: "Every guide undergoes a strict background check and interview process." },
              { icon: Globe, color: "text-indigo-600", bg: "bg-indigo-50", title: "Authentic Local Experiences", desc: "Skip the tourist traps. Eat, walk, and live like a local." },
              { icon: Heart, color: "text-rose-600", bg: "bg-rose-50", title: "Flexible Cancellation", desc: "Plans change. Enjoy free cancellation up to 24 hours before your trip." }
            ].map((feature, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-slate-200 transition-all duration-300">
                <div className={`h-20 w-20 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition duration-300`}>
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRENDING TOURS (Improved Cards) */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2 uppercase tracking-wider text-xs">
              <TrendingUp className="h-4 w-4" /> Trending Now
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Hot Tours This Week</h2>
          </div>
          <Link href="/tours" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold transition group bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm hover:shadow-md">
            View All Tours <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => <div key={n} className="h-[420px] bg-slate-200 rounded-3xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Link href={`/tours/${tour._id}`} key={tour._id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                
                {/* Image Section */}
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={tour.images?.[0] || "https://placehold.co/600x400"} 
                    alt={tour.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-md">
                    {tour.category}
                  </div>
                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                    ${tour.price}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
                    <MapPin className="h-3 w-3" /> {tour.meetingPoint}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition">
                    {tour.title}
                  </h3>
                  
                  <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-bold text-slate-700">4.8</span>
                      <span className="text-xs text-slate-400">(120)</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition">
                      Details <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="bg-indigo-900 py-24 text-white overflow-hidden relative">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-16">How TourBook Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-700 rounded-full" />
            
            {[
              { step: "01", title: "Find a Tour", desc: "Search by destination or category to find the perfect match." },
              { step: "02", title: "Book Securely", desc: "Choose your dates and pay safely using our secure gateway." },
              { step: "03", title: "Enjoy the Trip", desc: "Meet your local guide and experience the city like never before." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="h-24 w-24 bg-indigo-900 border-4 border-indigo-400 rounded-full flex items-center justify-center text-3xl font-black mb-8 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-indigo-200 max-w-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STATS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="h-14 w-14 bg-slate-50 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  <stat.icon className="h-7 w-7" />
                </div>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-16">Stories from Happy Travelers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-lg relative mt-6">
              {/* Profile Image floating top */}
              <div className="absolute -top-6 left-10">
                <img src={review.img} alt={review.name} className="h-16 w-16 rounded-full border-4 border-white shadow-md object-cover" />
              </div>
              
              <div className="flex gap-1 text-amber-400 mb-6 mt-6">
                {[...Array(review.rating)].map((_, r) => <Star key={r} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-slate-600 mb-6 text-lg italic leading-relaxed">&quot;{review.text}&quot;</p>
              
              <div className="border-t border-slate-100 pt-4">
                <p className="font-bold text-slate-900 text-lg">{review.name}</p>
                <p className="text-sm text-indigo-600 font-medium">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CTA */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 opacity-20 transform translate-x-1/4 -translate-y-1/4">
             <div className="w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
              Share Your World. <br/> 
              <span className="text-indigo-400">Inspire Others.</span>
            </h2>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Become a guide on TourBook. Earn money doing what you love, meet fascinating people, and showcase the best of your city.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link href="/register?role=guide" className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition shadow-xl hover:scale-105 duration-300">
                Become a Guide
              </Link>
              <Link href="/about" className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition backdrop-blur-sm">
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}