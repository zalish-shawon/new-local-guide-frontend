import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/shared/Navbar";
import TourCard from "../components/ui/TourCard";

export default function Home() {
  // Mock Data (Replace with API call later)
  const featuredTours = [
    {
      id: "1",
      title: "Midnight Street Food Crawl in Old Dhaka",
      price: 45,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
      location: "Dhaka, Bangladesh",
      rating: 4.8,
      duration: 3
    },
    {
      id: "2",
      title: "Hidden Art Galleries & Coffee Shops",
      price: 60,
      image: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?q=80&w=2020&auto=format&fit=crop",
      location: "Sylhet, Bangladesh",
      rating: 4.9,
      duration: 4
    },
    {
      id: "3",
      title: "Photography Walk: Sunset at the River",
      price: 35,
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
      location: "Chittagong, Bangladesh",
      rating: 4.7,
      duration: 2
    }
  ];

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
                placeholder="Where do you want to go?" 
                className="w-full outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-8 rounded-full font-bold transition flex items-center justify-center gap-2">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/tours" className="text-indigo-600 font-bold hover:text-indigo-700">
            View all tours →
          </Link>
        </div>
      </section>
    </main>
  );
}