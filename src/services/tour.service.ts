/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const TourService = {
  getAllTours: async () => {
    const response = await api.get("/tours");
    return response.data.data;
  },
  
  getTourById: async (id: string) => {
    const response = await api.get(`/tours/${id}`);
    return response.data.data;
  },

  createBooking: async (tourId: string, date: string) => {
    const response = await api.post("/bookings/create-booking", {
      tourId,
      date
    });
    return response.data.data;
  },

  updateTour: async (id: string, data: any) => {
    const response = await api.patch(`/tours/${id}`, data);
    return response.data.data;
  },
};