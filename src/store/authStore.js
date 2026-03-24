import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  session: null,
  business: null,
  isAdmin: false,
  loading: true,

  loadSession: async () => {
    set({ loading: true });
    // MOCK: Load session from local storage
    const storedUser = localStorage.getItem('mock_user_session');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      set({
        session: { user: { id: user.id } },
        business: user,
        isAdmin: user.is_admin || false
      });
    } else {
      set({ session: null, business: null, isAdmin: false });
    }
    
    set({ loading: false });
  },

  signUp: async (name, owner_name, sector, phone, email, password) => {
    // MOCK: Create an account locally
    const newUser = {
      id: crypto.randomUUID(),
      name,
      owner_name,
      sector,
      phone,
      email,
      subscription_status: 'inactive',
      is_open: false,
      is_admin: false,
      is_suspended: false,
    };
    
    localStorage.setItem('mock_user_session', JSON.stringify(newUser));
    set({
      session: { user: { id: newUser.id } },
      business: newUser,
      isAdmin: false
    });

    return { id: newUser.id, email };
  },

  signIn: async (email, password) => {
    // MOCK: Fast login for frontend work
    const mockUser = {
      id: crypto.randomUUID(),
      name: "Mock Business Co",
      owner_name: "Test User",
      sector: "Both",
      phone: "0700000000",
      email: email,
      subscription_status: 'active',
      is_open: true,
      is_admin: email.includes('admin'),
      is_suspended: false,
    };

    localStorage.setItem('mock_user_session', JSON.stringify(mockUser));
    
    set({
      session: { user: { id: mockUser.id } },
      business: mockUser,
      isAdmin: mockUser.is_admin,
      loading: false
    });
    
    return { user: { id: mockUser.id } };
  },

  signOut: async () => {
    // MOCK: Sign out
    localStorage.removeItem('mock_user_session');
    set({ session: null, business: null, isAdmin: false });
  },
}));
