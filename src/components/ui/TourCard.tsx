import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";

// Define a type for the props if you want strict typing
interface TourCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  rating: number;
  duration: number;
}

const TourCard = ({ id, title, price, image, location, rating, duration }: TourCardProps) => {
  return (
    <Link href={`/tours/${id}`} className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
          ${price}/person
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
          <MapPin className="h-4 w-4 text-indigo-500" />
          {location}
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-slate-700">{rating}</span>
            <span className="text-sm text-slate-400">(24)</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <Clock className="h-4 w-4" />
            {duration} hours
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;