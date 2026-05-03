import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // { medicine, quantity, pharmacy }

      // ─── Actions ──────────────────────────────────────────────────────
      addToCart: (medicine, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.medicine._id === medicine._id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.medicine._id === medicine._id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, { medicine, quantity }] });
        }
      },

      removeFromCart: (medicineId) => {
        set({ items: get().items.filter((i) => i.medicine._id !== medicineId) });
      },

      updateQuantity: (medicineId, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(medicineId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.medicine._id === medicineId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      // ─── Selectors ────────────────────────────────────────────────────
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.medicine.price * i.quantity, 0),
    }),
    { name: 'mq-cart' }
  )
);

export default useCartStore;
