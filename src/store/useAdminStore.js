import { create } from 'zustand';
import { getAllUsers, getAllPharmacies, approvePharmacy, deleteUser, getAdminStats } from '../api/admin.api';
import { getAllOrders } from '../api/orders.api';

const useAdminStore = create((set) => ({
  users: [],
  pharmacies: [],
  orders: [],
  stats: { totalUsers: 0, totalPharmacies: 0, totalOrders: 0, totalRevenue: 0 },
  isLoading: false,
  error: null,

  // ─── Fetch Stats ──────────────────────────────────────────────────
  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const { data } = await getAdminStats();
      set({ stats: data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to load stats', isLoading: false });
    }
  },

  // ─── Users ───────────────────────────────────────────────────────
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await getAllUsers();
      set({ users: data.users || data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch users', isLoading: false });
    }
  },

  deleteUser: async (userId) => {
    try {
      await deleteUser(userId);
      set((state) => ({ users: state.users.filter((u) => u._id !== userId) }));
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to delete user' });
      return { success: false };
    }
  },

  // ─── Pharmacies ───────────────────────────────────────────────────
  fetchPharmacies: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await getAllPharmacies();
      set({ pharmacies: data.pharmacies || data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch pharmacies', isLoading: false });
    }
  },

  approvePharmacy: async (pharmacyId) => {
    try {
      await approvePharmacy(pharmacyId);
      set((state) => ({
        pharmacies: state.pharmacies.map((p) =>
          p._id === pharmacyId ? { ...p, isApproved: true } : p
        ),
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to approve pharmacy' });
      return { success: false };
    }
  },

  // ─── Orders ───────────────────────────────────────────────────────
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await getAllOrders();
      set({ orders: data.orders || data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch orders', isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAdminStore;
