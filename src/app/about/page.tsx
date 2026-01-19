"use client";

import Navbar from "@/src/components/shared/Navbar";
import { CheckCircle2, Globe, Heart, Users } from "lucide-react";

const stats = [
  { label: "Founded", value: "2020" },
  { label: "Active Guides", value: "450+" },
  { label: "Tours Booked", value: "15k" },
  { label: "Destinations", value: "40+" },
];

const team = [
  { name: "Alex Morgan", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400" },
  { name: "Sarah Lin", role: "Head of Operations", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" },
  { name: "David Chen", role: "Community Lead", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" },
  { name: "Emily Rose", role: "Product Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
          Changing the way <br /> <span className="text-indigo-600">the world travels.</span>
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          We believe travel should be authentic, sustainable, and connected. 
          TourBook bridges the gap between curious travelers and passionate local experts.
        </p>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-black text-slate-900">{stat.value}</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-100 rounded-full z-0"></div>
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-50 rounded-full z-0"></div>
             <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" 
               alt="Our Team" 
               className="relative z-10 rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500"
             />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Founded in 2020, TourBook started with a simple idea: the best travel experiences come from locals, not guidebooks.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              We provide a platform where guides can earn a fair income doing what they love, and travelers can discover the hidden heartbeat of a city.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                "100% Verified Locals",
                "Secure Payments",
                "24/7 Support",
                "Sustainable Tourism"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 font-bold text-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet the Team</h2>
          <p className="text-slate-500 mb-16 max-w-2xl mx-auto">The passionate travelers and techies behind the platform.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-indigo-50 group-hover:border-indigo-200 transition">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-indigo-600 font-medium text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-indigo-900 rounded-3xl text-white">
               <Globe className="h-10 w-10 mb-4 text-indigo-300" />
               <h3 className="text-xl font-bold mb-2">Global Community</h3>
               <p className="text-indigo-100">Connecting cultures across 40+ countries through shared experiences.</p>
            </div>
            <div className="p-8 bg-slate-100 rounded-3xl text-slate-900">
               <Heart className="h-10 w-10 mb-4 text-indigo-600" />
               <h3 className="text-xl font-bold mb-2">Passion First</h3>
               <p className="text-slate-600">We prioritize guides who are truly passionate about their cities.</p>
            </div>
            <div className="p-8 bg-slate-100 rounded-3xl text-slate-900">
               <Users className="h-10 w-10 mb-4 text-indigo-600" />
               <h3 className="text-xl font-bold mb-2">People Powered</h3>
               <p className="text-slate-600">Technology connects us, but people make the memories.</p>
            </div>
         </div>
      </section>
    </main>
  );
}