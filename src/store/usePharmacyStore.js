import { create } from 'zustand';
import { getMedicines, addMedicine, updateMedicine, deleteMedicine } from '../api/medicines.api';
import { getPharmacyOrders, updateOrderStatus } from '../api/orders.api';

const usePharmacyStore = create((set, get) => ({
  medicines: [],
  orders: [],
  isLoading: false,
  error: null,
  stats: { totalMedicines: 0, pendingOrders: 0, completedOrders: 0, totalRevenue: 0 },

  // ─── Medicine Actions ─────────────────────────────────────────────
  fetchMedicines: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await getMedicines(params);
      const medicines = data.medicines || data;
      set({
        medicines,
        isLoading: false,
        stats: {
          ...get().stats,
          totalMedicines: medicines.length,
        },
      });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch medicines', isLoading: false });
    }
  },

  addMedicine: async (medicineData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await addMedicine(medicineData);
      set((state) => ({
        medicines: [...state.medicines, data.medicine || data],
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to add medicine', isLoading: false });
      return { success: false };
    }
  },

  updateMedicine: async (id, medicineData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await updateMedicine(id, medicineData);
      set((state) => ({
        medicines: state.medicines.map((m) => (m._id === id ? data.medicine || data : m)),
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to update medicine', isLoading: false });
      return { success: false };
    }
  },

  deleteMedicine: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteMedicine(id);
      set((state) => ({
        medicines: state.medicines.filter((m) => m._id !== id),
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to delete medicine', isLoading: false });
      return { success: false };
    }
  },

  // ─── Order Actions ────────────────────────────────────────────────
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await getPharmacyOrders();
      const orders = data.orders || data;
      const pending = orders.filter((o) => o.status === 'pending').length;
      const completed = orders.filter((o) => o.status === 'delivered').length;
      const revenue = orders
        .filter((o) => o.status === 'delivered')
        .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      set({
        orders,
        isLoading: false,
        stats: { ...get().stats, pendingOrders: pending, completedOrders: completed, totalRevenue: revenue },
      });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch orders', isLoading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      set((state) => ({
        orders: state.orders.map((o) => (o._id === orderId ? { ...o, status } : o)),
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to update order' });
      return { success: false };
    }
  },

  clearError: () => set({ error: null }),
}));

export default usePharmacyStore;
