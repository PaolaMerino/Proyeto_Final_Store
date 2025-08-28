import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [], // each item: { id, title, price, quantity }

  // Add item to cart
  addItem: (item) => {
    const cart = get().cart;
    const existing = cart.find((i) => i.id === item.id);

    if (existing) {
      // increase quantity if item already exists
      set({
        cart: cart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({
        cart: [...cart, { ...item, quantity: 1 }],
      });
    }
  },

  setCart: (newCart) => set({ cart: newCart }),

  // Remove item from cart
  removeItem: (id) => {
    set({ cart: get().cart.filter((item) => item.id !== id) });
  },

  // Update quantity of a specific item
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      // remove if quantity is 0 or less
      get().removeItem(id);
    } else {
      set({
        cart: get().cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      });
    }
  },

  // Clear entire cart
  clearCart: () => set({ cart: [] }),

  // Get total items in cart
  getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),

  // Get total price of cart
  getTotalPrice: () =>
    get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));
