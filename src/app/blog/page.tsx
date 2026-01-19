/* eslint-disable @next/next/no-img-element */
"use client";

import Navbar from "@/src/components/shared/Navbar";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Travel Tips", "Food Guides", "Hidden Gems", "Culture"];

const featuredPost = {
  title: "10 Hidden Waterfalls in Sylhet You Need to See",
  excerpt: "Discover the untouched beauty of Sylhet's tea gardens and secret waterfalls that aren't on the tourist map.",
  image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200",
  date: "Oct 24, 2023",
  author: "Sarah Jen",
  category: "Hidden Gems"
};

const posts = [
  {
    id: 1,
    title: "The Ultimate Street Food Guide to Old Dhaka",
    excerpt: "From Bakarkhani to Haji Biryani, here is what you need to eat.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600",
    date: "Oct 20, 2023",
    author: "Rahim Ahmed",
    category: "Food Guides"
  },
  {
    id: 2,
    title: "How to Pack Light for a Weekend Trek",
    excerpt: "Essential gear and tips for trekking in Bandarban without the heavy load.",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=600",
    date: "Oct 15, 2023",
    author: "Mike T.",
    category: "Travel Tips"
  },
  {
    id: 3,
    title: "Understanding Local Customs in Rural Bangladesh",
    excerpt: "A guide to etiquette and respect when visiting rural villages.",
    image: "https://images.unsplash.com/photo-1767330855462-978574a857f6?q=80&w=1170&auto=format&fit=crop",
    date: "Oct 10, 2023",
    author: "Anika S.",
    category: "Culture"
  },
  {
    id: 4,
    title: "Solo Female Travel in South Asia",
    excerpt: "Tips, safety advice, and destinations perfect for solo female travelers.",
    image: "https://images.unsplash.com/photo-1657589851226-681f80290921?q=80&w=687&auto=format&fit=crop",
    date: "Oct 05, 2023",
    author: "Jessica M.",
    category: "Travel Tips"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="pt-16 pb-10 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">TourBook Journal</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Stories, tips, and guides to inspire your next adventure.</p>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              className={`px-5 py-2 rounded-full text-sm font-bold transition ${
                i === 0 ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        
        {/* Featured Post */}
        <div className="group relative rounded-3xl overflow-hidden shadow-xl mb-12 cursor-pointer h-[500px]">
          <img src={featuredPost.image} alt="Featured" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              {featuredPost.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-indigo-200 transition">
              {featuredPost.title}
            </h2>
            <p className="text-slate-300 text-lg mb-6 line-clamp-2">{featuredPost.excerpt}</p>
            
            <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                   <User className="h-4 w-4 text-white" />
                </div>
                {featuredPost.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {featuredPost.date}
              </div>
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition duration-300 flex flex-col md:flex-row h-full md:h-64">
              <div className="w-full md:w-2/5 h-48 md:h-full relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-indigo-600 text-xs font-bold uppercase tracking-wide">{post.category}</span>
                  <span className="text-slate-400 text-xs">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition cursor-pointer">
                  Read Article <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[80px] opacity-20"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600 rounded-full blur-[80px] opacity-20"></div>
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold text-white mb-4">Subscribe to our Newsletter</h2>
             <p className="text-slate-400 mb-8">Get the latest travel tips, hidden gems, and exclusive deals delivered to your inbox.</p>
             
             <div className="flex flex-col sm:flex-row gap-3">
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:bg-white/20 outline-none transition"
               />
               <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg">
                 Subscribe
               </button>
             </div>
           </div>
        </div>

      </div>
    </main>
  );
}