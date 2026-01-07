/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Star, User, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/src/context/AuthContext";
import { ReviewService } from "@/src/services/review.service";

interface ReviewSectionProps {
  tourId: string;
}

export default function ReviewSection({ tourId }: ReviewSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [tourId]);

  const fetchReviews = async () => {
    try {
      const data = await ReviewService.getReviewsByTourId(tourId);
      setReviews(data);
    } catch (error) {
      console.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to leave a review");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setSubmitting(true);
    try {
      await ReviewService.createReview({ tourId, rating, comment });
      toast.success("Review submitted!");
      setComment("");
      setRating(5);
      fetchReviews(); // Refresh list
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mt-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Reviews ({reviews.length})
      </h3>

      {/* Review List */}
      <div className="space-y-6 mb-10">
        {loading ? (
          <p className="text-slate-400">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-slate-500 italic">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border-b border-slate-50 pb-6 last:border-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{review.userId?.name || "Anonymous"}</p>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < review.rating ? "fill-current" : "text-slate-200"}`} 
                      />
                    ))}
                  </div>
                </div>
                <span className="ml-auto text-xs text-slate-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed pl-13">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Write Review Form */}
      {user?.role === 'tourist' && (
        <div className="bg-slate-50 p-6 rounded-xl">
          <h4 className="font-bold text-slate-900 mb-4">Leave a Review</h4>
          <form onSubmit={handleSubmit}>
            
            {/* Star Rating Input */}
            <div className="flex items-center gap-1 mb-4">
              <span className="text-sm text-slate-500 mr-2">Your Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition ${star <= rating ? "text-amber-400" : "text-slate-300 hover:text-amber-200"}`}
                >
                  <Star className={`h-6 w-6 ${star <= rating ? "fill-current" : ""}`} />
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this tour..."
              className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] bg-white"
            />

            <button 
              disabled={submitting}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition ml-auto disabled:opacity-70"
            >
              <Send className="h-4 w-4" /> 
              {submitting ? "Posting..." : "Post Review"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}