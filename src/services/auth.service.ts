/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const AuthService = {
  // ... existing login method ...

  // Register New User
  register: async (data: any) => {
    // Backend endpoint likely expects: { name, email, password, role }
  
    const response = await api.post("/auth/register", data);
    return response.data;
  },
  
};