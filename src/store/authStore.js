import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      // Login action
      login: (userData) => set({ 
        user: userData, 
        isAuthenticated: true 
      }),
      
      // Logout action
      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'auth-storage', // unique name for localStorage
    }
  )
);

export default useAuthStore;