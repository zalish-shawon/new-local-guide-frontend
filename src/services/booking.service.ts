import api from "./api";

export const BookingService = {
  // Get all bookings for the logged-in user (Tourist or Guide)
  getMyBookings: async () => {
    const response = await api.get("/bookings");
    return response.data.data;
  },

  // Update booking status (For Guides/Admins) - e.g., 'confirmed' or 'cancelled'
  updateStatus: async (bookingId: string, status: string) => {
    const response = await api.patch(`/bookings/${bookingId}/status`, { status });
    return response.data.data;
  }
};