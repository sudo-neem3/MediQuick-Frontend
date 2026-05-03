import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser, getMe } from '../api/auth.api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: localStorage.getItem('mq_token') || null,
      isLoading: false,
      error: null,

      // ─── Actions ──────────────────────────────────────────────────────
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await loginUser(credentials);
          localStorage.setItem('mq_token', data.token);
          set({ user: data.user, token: data.token, isLoading: false });
          return { success: true, role: data.user.role };
        } catch (err) {
          const msg = err.response?.data?.message || 'Login failed';
          set({ error: msg, isLoading: false });
          return { success: false, message: msg };
        }
      },

      register: async (formData) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await registerUser(formData);
          localStorage.setItem('mq_token', data.token);
          set({ user: data.user, token: data.token, isLoading: false });
          return { success: true, role: data.user.role };
        } catch (err) {
          const msg = err.response?.data?.message || 'Registration failed';
          set({ error: msg, isLoading: false });
          return { success: false, message: msg };
        }
      },

      fetchMe: async () => {
        if (!get().token) return;
        set({ isLoading: true });
        try {
          const { data } = await getMe();
          set({ user: data.user, isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      },

      logout: () => {
        localStorage.removeItem('mq_token');
        set({ user: null, token: null, error: null });
      },

      clearError: () => set({ error: null }),

      // ─── Selectors ────────────────────────────────────────────────────
      isAuthenticated: () => !!get().token,
      isAdmin: () => get().user?.role === 'admin',
      isPharmacy: () => get().user?.role === 'pharmacy',
      isCustomer: () => get().user?.role === 'customer',
    }),
    {
      name: 'mq-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);

export default useAuthStore;
