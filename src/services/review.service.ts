import api from "./api";

export const ReviewService = {
  // Get all reviews for a specific tour
  getReviewsByTourId: async (tourId: string) => {
    const response = await api.get(`/reviews/${tourId}`);
    return response.data.data;
  },

  // Submit a new review
  createReview: async (data: { tourId: string; rating: number; comment: string }) => {
    const response = await api.post("/reviews", data);
    return response.data.data;
  }
};