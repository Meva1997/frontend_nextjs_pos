import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Cupon, CuponResponseSchema, Product, ShoppingCart } from "./schemas";

interface Store {
  total: number;
  discount: number;
  contents: ShoppingCart;
  cupon: Cupon;
  addToCart: (product: Product) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  removeFromCart: (id: Product["id"]) => void;
  totalAmount: () => void;
  applyCupon: (cuponName: string) => Promise<void>;
  applyDiscount: () => void;
  clearOrder: () => void;
}

const initialState = {
  total: 0,
  discount: 0,
  contents: [],
  cupon: { name: "", message: "", percentage: 0 }, // Initial state for cupon
};

export const useStore = create<Store>()(
  devtools((set, get) => ({
    ...initialState,
    addToCart: (product) => {
      const { id: productId, categoryId, ...data } = product;
      let contents: ShoppingCart = [];

      const existingProduct = get().contents.findIndex(
        (item) => item.productId === productId
      );
      if (existingProduct >= 0) {
        if (
          get().contents[existingProduct].quantity >=
          get().contents[existingProduct].stock
        ) {
          return;
        }
        contents = get().contents.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        contents = [
          ...get().contents,
          {
            ...data,
            quantity: 1,
            productId,
          },
        ];
      }

      set(() => ({
        contents,
      }));

      get().totalAmount();
    },
    updateQuantity: (id, quantity) => {
      const contents = get().contents.map((item) =>
        item.productId === id
          ? {
              ...item,
              quantity,
            }
          : item
      );
      set(() => ({
        contents,
      }));

      get().totalAmount();
    },
    removeFromCart: (id) => {
      const contents = get().contents.filter((item) => item.productId !== id);
      if (!contents.length) {
        get().clearOrder();
        return;
      }

      set(() => ({
        contents,
      }));
      get().totalAmount();
    },
    totalAmount: () => {
      const total = get().contents.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      set(() => ({
        total,
      }));

      if (get().cupon.percentage) {
        get().applyDiscount();
      }
    },
    applyCupon: async (cuponName) => {
      const req = await fetch("/coupons/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cupon_name: cuponName,
        }),
      });
      const json = await req.json();
      const cupon = CuponResponseSchema.parse(json);
      set(() => ({ cupon }));
      if (cupon.percentage) {
        get().applyDiscount();
      }
    },
    applyDiscount: () => {
      const subTotal = get().contents.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      const discount = (get().cupon.percentage / 100) * subTotal;
      const total = subTotal - discount;
      set(() => ({ discount, total }));
    },
    clearOrder: () => set(() => ({ ...initialState })),
  }))
);
