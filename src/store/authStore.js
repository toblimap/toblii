import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  session: null,
  business: null,
  isAdmin: false,
  loading: true,

  loadSession: async () => {
    set({ loading: true });
    // Persistent login via LocalStorage for development
    const storedUser = localStorage.getItem('tobli_user_session');
    
    if (storedUser) {
      const data = JSON.parse(storedUser);
      set({
        session: { user: { id: data.business?.id } },
        business: data.business,
        isAdmin: data.isAdmin || false,
        loading: false
      });
    } else {
      set({ session: null, business: null, isAdmin: false, loading: false });
    }
  },

  signUp: async (name, owner_name, sector, phone, email, password) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, owner_name, sector, phone, email, password })
    });
    
    if (!res.ok) throw new Error('Registration failed');
    const data = await res.json();
    
    localStorage.setItem('tobli_user_session', JSON.stringify(data));
    set({
      session: { user: { id: data.business.id } },
      business: data.business,
      isAdmin: false
    });

    return data.user;
  },

  signIn: async (email, password) => {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Authentication failed');
    }
    
    const data = await res.json();
    localStorage.setItem('tobli_user_session', JSON.stringify(data));
    
    set({
      session: { user: { id: data.business.id } },
      business: data.business,
      isAdmin: data.isAdmin,
      loading: false
    });
    
    return data;
  },

  signOut: async () => {
    localStorage.removeItem('tobli_user_session');
    set({ session: null, business: null, isAdmin: false });
  },
}));
