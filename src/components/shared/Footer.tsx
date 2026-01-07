"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">TourBook</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Discover the world&apos;s best experiences with our expert local guides. 
              We make travel simple, authentic, and unforgettable.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-indigo-400 transition">Home</Link></li>
              <li><Link href="/tours" className="hover:text-indigo-400 transition">Explore Tours</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition">About Us</Link></li>
              <li><Link href="/guides" className="hover:text-indigo-400 transition">Our Guides</Link></li>
              <li><Link href="/blog" className="hover:text-indigo-400 transition">Travel Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link href="/help" className="hover:text-indigo-400 transition">Help Center</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400 transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</Link></li>
              <li><Link href="/faq" className="hover:text-indigo-400 transition">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-indigo-500 shrink-0" />
                <span>123 Adventure Lane, Travel City, NY 10012, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>support@tourbook.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} TourBook. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/sitemap" className="hover:text-white transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}