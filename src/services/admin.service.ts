import api from "./api";

export const AdminService = {
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data.data;
  },

  blockUser: async (userId: string) => {
    // Check if you implemented this endpoint in Backend. 
    // If not, it should be PATCH /users/:id/block or PATCH /users/:id with { isBlocked: true }
    const response = await api.patch(`/users/${userId}`, { isBlocked: true });
    return response.data.data;
  },

  deleteTour: async (tourId: string) => {
    const response = await api.delete(`/tours/${tourId}`);
    return response.data.data;
  },

  getAllBookings: async () => {
    // Admin sees ALL bookings
    const response = await api.get("/bookings");
    return response.data.data;
  }
};