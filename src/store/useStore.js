import { create } from 'zustand';

export const useStore = create((set) => ({
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  
  selectedBusiness: null,
  setSelectedBusiness: (business) => set({ selectedBusiness: business }),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
